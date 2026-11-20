import { apiFetch } from './api.js';
import { loadWebsiteBranding } from './branding.js';
import { isValidGalleryImageUrl, parseJerseyGallery, renderJerseyGallery } from './jersey-gallery.js';
import { connectRealtimeSocket, subscribeRealtimeEvent } from './realtime.js';

loadWebsiteBranding().then(settings => {
  const section = document.getElementById('tdJerseyGallerySection');
  const container = document.getElementById('tdJerseyGallery');
  const images = parseJerseyGallery(settings?.jersey_gallery_images);
  renderJerseyGallery(container, images);
  section.hidden = !images.length;
  const bibImage = settings?.bib_preview_image_url;
  const bibSection = document.getElementById('tdBibPreviewSection');
  if (bibImage && !isValidGalleryImageUrl(bibImage)) {
    console.warn('URL gambar contoh BIB tidak valid.');
  } else if (bibImage) {
    renderJerseyGallery(document.getElementById('tdBibPreview'), [bibImage], {
      subject: 'BIB', description: 'Contoh desain kartu BIB'
    });
    bibSection.hidden = false;
  }
});

function showToast(type = 'success', message = '') {
  const container = document.getElementById('ticketToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'}"></i>
    </div>
    <div class="toast-content">
      <h5>${type === 'success' ? 'Berhasil' : 'Perhatian'}</h5>
      <p>${message}</p>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num || 0);
}

let countdownInterval = null;
let ticketDetailRequestId = 0;
let activeEventId = null;

function startCountdown(targetDateStr) {
  clearInterval(countdownInterval);
  countdownInterval = null;
  if (!targetDateStr) return;
  const targetTime = new Date(targetDateStr).getTime();
  if (!Number.isFinite(targetTime)) return;

  function update() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      document.getElementById('tdDays').textContent = '00';
      document.getElementById('tdHours').textContent = '00';
      document.getElementById('tdMinutes').textContent = '00';
      document.getElementById('tdSeconds').textContent = '00';
      clearInterval(countdownInterval);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('tdDays').textContent = pad(d);
    document.getElementById('tdHours').textContent = pad(h);
    document.getElementById('tdMinutes').textContent = pad(m);
    document.getElementById('tdSeconds').textContent = pad(s);
  }

  update();
  countdownInterval = setInterval(update, 1000);
}

async function loadTicketDetail({ quiet = false } = {}) {
  const requestId = ++ticketDetailRequestId;
  const eventId = activeEventId;

  const loadingEl = document.getElementById('tdLoadingState');
  const errorEl = document.getElementById('tdErrorState');
  const contentEl = document.getElementById('tdContentSection');
  const statusEl = document.getElementById('tdRealtimeStatus');

  if (!eventId) {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    document.getElementById('tdErrorMessage').textContent = 'Tautan kategori tidak lengkap. Silakan kembali ke beranda dan pilih kategori yang tersedia.';
    return;
  }

  try {
    const [res, cfgRes, countdownRes] = await Promise.all([
      apiFetch(`/events/${encodeURIComponent(eventId)}`),
      apiFetch('/settings/checkout-config').catch(() => null),
      apiFetch('/settings/countdown').catch(() => null)
    ]);
    if (requestId !== ticketDetailRequestId) return;

    const text = await res.text();
    let result = null;
    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      throw new Error('Respons server tidak dapat dibaca.');
    }
    if (requestId !== ticketDetailRequestId) return;

    if (!res.ok || result.status !== 'success' || !result.data) {
      if (quiet && contentEl.style.display === 'block') {
        statusEl.textContent = 'Kategori ini sudah tidak tersedia. Kembali ke beranda untuk melihat pilihan tiket lainnya.';
        statusEl.hidden = false;
        return;
      }
      loadingEl.style.display = 'none';
      errorEl.style.display = 'block';
      document.getElementById('tdErrorMessage').textContent = 'Kategori ini tidak ditemukan atau sudah tidak tersedia. Silakan kembali ke beranda untuk melihat pilihan lainnya.';
      return;
    }

    let feeSettings = { feeEnabled: false, feeType: 'PER_TRANSACTION', feeAmount: 0 };
    if (cfgRes && cfgRes.ok) {
      try {
        const cfgJson = await cfgRes.json();
        if (cfgJson.status === 'success' && cfgJson.data) {
          feeSettings = cfgJson.data;
        }
      } catch {}
    }

    let isGlobalClosed = false;
    if (countdownRes?.ok) {
      try {
        const countdownJson = await countdownRes.json();
        isGlobalClosed = countdownJson.data?.isRegistrationClosed === true
          || String(countdownJson.data?.isRegistrationClosed).toLowerCase() === 'true';
      } catch (error) {
        console.warn('Gagal membaca status pendaftaran global:', error);
      }
    }
    if (requestId !== ticketDetailRequestId) return;

    if (isGlobalClosed) {
      if (quiet && contentEl.style.display === 'block') {
        renderTicketData(result.data, feeSettings, true);
        statusEl.hidden = true;
        return;
      }
      loadingEl.style.display = 'none';
      errorEl.style.display = 'block';
      const errorTitle = document.querySelector('#tdErrorState h3');
      if (errorTitle) errorTitle.textContent = 'Pendaftaran Telah Ditutup';
      document.getElementById('tdErrorMessage').textContent = 'Informasi pendaftaran kategori ini tidak tersedia karena pendaftaran telah ditutup.';
      return;
    }

    const event = result.data;
    renderTicketData(event, feeSettings, isGlobalClosed);

    loadingEl.style.display = 'none';
    errorEl.style.display = 'none';
    contentEl.style.display = 'block';
    statusEl.hidden = true;
    if (!contentEl.classList.contains('td-content-enter')) contentEl.classList.add('td-content-enter');
  } catch (err) {
    console.error('Gagal memuat detail tiket:', err);
    if (requestId !== ticketDetailRequestId) return;
    if (quiet && contentEl.style.display === 'block') {
      statusEl.textContent = 'Pembaruan tiket belum dapat dimuat. Informasi yang tampil mungkin belum terbaru.';
      statusEl.hidden = false;
      return;
    }
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    document.getElementById('tdErrorMessage').textContent = 'Informasi tiket belum dapat dimuat. Periksa koneksi internet Anda, lalu coba kembali.';
  }
}

function renderTicketData(event, feeSettings = {}, isGlobalClosed = false) {
  const isClosed = Boolean(event.isClosed) || isGlobalClosed;
  // Page Title
  document.title = `${event.ticketName} - Tegal Run 2026`;

  // Ticket Cover Image
  const coverImg = document.getElementById('tdTicketCoverImg');
  const cover = document.getElementById('tdTicketCover');
  if (coverImg) {
    const coverUrl = event.ticketImage;
    if (coverUrl) {
      coverImg.onerror = () => {
        coverImg.hidden = true;
        if (cover) cover.classList.add('td-ticket-cover-empty');
      };
      coverImg.onload = () => {
        coverImg.hidden = false;
        if (cover) cover.classList.remove('td-ticket-cover-empty');
      };
      coverImg.src = coverUrl;
      coverImg.style.display = 'block';
    } else {
      coverImg.style.display = 'none';
      coverImg.hidden = true;
      if (cover) cover.classList.add('td-ticket-cover-empty');
    }
  }

  const medalHighlight = document.getElementById('tdMedalHighlight');
  const medalImage = document.getElementById('tdMedalImage');
  if (medalHighlight && medalImage) {
    if (event.medalImage) {
      medalImage.hidden = false;
      medalImage.alt = `Medali finisher ${event.category || ''}`.trim();
      medalImage.onerror = () => {
        medalImage.hidden = true;
      };
      medalImage.src = event.medalImage;
      medalHighlight.hidden = false;
    } else {
      medalHighlight.hidden = true;
      medalImage.removeAttribute('src');
      medalImage.hidden = true;
    }
  }

  // Basic Header Info
  document.getElementById('tdCategoryTag').textContent = event.category || 'Kategori Lomba';
  document.getElementById('tdTicketName').textContent = event.ticketName;
  const remaining = Number(event.remainingStock ?? event.stock ?? 0);
  const registered = Number(event.registeredCount ?? 0);
  const totalCap = Number(event.totalCapacity ?? (remaining + registered));
  document.getElementById('tdTicketSubtitle').textContent = `Total kuota: ${totalCap.toLocaleString('id-ID')} peserta`;

  // Status Badge
  const statusBadge = document.getElementById('tdStatusBadge');
  if (isClosed) {
    statusBadge.className = 'td-badge closed';
    statusBadge.innerHTML = isGlobalClosed
      ? '<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup'
      : '<i class="fa-solid fa-lock"></i> Kategori Ditutup';
  } else {
    statusBadge.className = 'td-badge open';
    statusBadge.innerHTML = '<i class="fa-solid fa-lock-open"></i> Pendaftaran Dibuka';
  }

  // Prices & Service Fee Calculation
  const basePrice = Number(event.price) || 0;
  const isFeeActive = !!(feeSettings.feeEnabled && Number(feeSettings.feeAmount) > 0);
  const feeAmount = isFeeActive ? Number(feeSettings.feeAmount) : 0;
  const feeType = feeSettings.feeType || 'PER_TRANSACTION';
  const totalPrice = basePrice + feeAmount;

  // In Key Metrics Box
  document.getElementById('tdPrice').textContent = formatRupiah(basePrice);

  // In Action Card: Base Price, Fee, and Total
  const cardBasePrice = document.getElementById('tdCardBasePrice');
  if (cardBasePrice) cardBasePrice.textContent = formatRupiah(basePrice);

  const cardFeeLabel = document.getElementById('tdCardFeeLabel');
  const cardFeeAmount = document.getElementById('tdCardFeeAmount');

  if (cardFeeAmount) {
    if (isFeeActive) {
      cardFeeAmount.textContent = `+ ${formatRupiah(feeAmount)}`;
      cardFeeAmount.style.color = '#EA580C';
      if (cardFeeLabel) {
        cardFeeLabel.textContent = `Biaya Layanan (${feeType === 'PER_TICKET' ? 'Per Tiket' : 'Per Transaksi'}):`;
      }
    } else {
      cardFeeAmount.textContent = 'Tidak dikenakan biaya';
      cardFeeAmount.style.color = '#10B981';
      if (cardFeeLabel) {
        cardFeeLabel.textContent = 'Biaya Layanan:';
      }
    }
  }

  const cardPrice = document.getElementById('tdCardPrice');
  if (cardPrice) {
    cardPrice.textContent = formatRupiah(totalPrice);
  }

  // Stocks & Registration counts (strictly from DB)
  document.getElementById('tdStock').textContent = `${remaining.toLocaleString('id-ID')} tiket`;
  document.getElementById('tdRegisteredCount').textContent = `${registered.toLocaleString('id-ID')} peserta`;

  const stockRatio = totalCap > 0 ? Math.max(0, Math.min(1, remaining / totalCap)) : 0;
  const pct = stockRatio * 100;
  const percentageDigits = totalCap > 0
    ? Math.min(6, Math.max(1, Math.ceil(Math.log10(totalCap)) - 2))
    : 0;
  const formattedPercentage = pct.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: percentageDigits,
  });
  document.getElementById('tdStockPercentage').textContent = `${formattedPercentage}% tersedia`;
  document.getElementById('tdStockFill').style.width = `${pct}%`;

  // Event Date
  if (event.eventDate) {
    const d = new Date(event.eventDate);
    document.getElementById('tdEventDate').textContent = d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    startCountdown(event.eventDate);
  } else {
    document.getElementById('tdEventDate').textContent = 'Belum diumumkan';
    document.getElementById('tdDays').textContent = '--';
    document.getElementById('tdHours').textContent = '--';
    document.getElementById('tdMinutes').textContent = '--';
    document.getElementById('tdSeconds').textContent = '--';
    startCountdown(null);
  }

  // Fasilitas beserta gambar mengikuti data benefit dari backend.
  const benefitsContainer = document.getElementById('tdBenefitsContainer');
  if (Array.isArray(event.benefits) && event.benefits.length > 0) {
    benefitsContainer.innerHTML = event.benefits.map(b => `
      <div class="td-benefit-card">
        <div class="td-benefit-media">
          ${b.image
            ? `<img class="td-benefit-image" src="${escapeHtml(b.image)}" alt="${escapeHtml(b.name)}" loading="lazy">`
            : '<span class="td-benefit-icon" aria-hidden="true"><i class="fa-solid fa-gift"></i></span>'}
        </div>
        <div class="td-benefit-content">
          <strong class="td-benefit-name">
            ${escapeHtml(b.name)}
          </strong>
          <p class="td-benefit-description">
            ${escapeHtml(b.description)}
          </p>
        </div>
      </div>
    `).join('');
    benefitsContainer.querySelectorAll('.td-benefit-image').forEach(image => {
      image.addEventListener('error', () => {
        const fallback = document.createElement('span');
        fallback.className = 'td-benefit-icon';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.innerHTML = '<i class="fa-solid fa-gift"></i>';
        image.replaceWith(fallback);
      }, { once: true });
    });
  } else {
    benefitsContainer.innerHTML = `
      <p class="td-empty-state">
        Informasi fasilitas untuk kategori ini belum tersedia.
      </p>
    `;
  }

  // Jersey Details (strictly from jerseys table)
  const jerseysContainer = document.getElementById('tdJerseysContainer');
  if (Array.isArray(event.jerseys) && event.jerseys.length > 0) {
    jerseysContainer.innerHTML = event.jerseys.map(j => {
      let sizes = [];
      try {
        sizes = Array.isArray(j.sizes) ? j.sizes : JSON.parse(j.sizes);
      } catch {
        sizes = [];
      }
      return `
        <article class="td-jersey-card">
          <div class="td-jersey-media">
            ${j.image
              ? `<img class="td-jersey-image" src="${escapeHtml(j.image)}" alt="${escapeHtml(j.name)}" loading="lazy">`
              : '<span class="td-jersey-image-fallback" aria-hidden="true"><i class="fa-solid fa-shirt"></i></span>'}
          </div>
          <div class="td-jersey-content">
            <div class="td-jersey-heading">
              <strong class="td-jersey-name">${escapeHtml(j.name)}</strong>
              <span class="td-jersey-type">Jenis: ${escapeHtml(j.type)}</span>
            </div>
          ${sizes.length ? `
            <div class="td-jersey-sizes">
              <span class="td-jersey-size-label">Pilihan ukuran:</span>
              <div class="td-jersey-size-list">
                ${sizes.map(s => `<span class="td-jersey-size">${escapeHtml(s)}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          </div>
        </article>
      `;
    }).join('');
    jerseysContainer.querySelectorAll('.td-jersey-image').forEach(image => {
      image.addEventListener('error', () => {
        const fallback = document.createElement('span');
        fallback.className = 'td-jersey-image-fallback';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.innerHTML = '<i class="fa-solid fa-shirt"></i>';
        image.replaceWith(fallback);
      }, { once: true });
    });
  } else {
    jerseysContainer.innerHTML = `
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Informasi jersey untuk kategori ini belum tersedia.
      </p>
    `;
  }

  // BIB Configuration (strictly from bib_configurations table)
  const bibContainer = document.getElementById('tdBibContainer');
  if (event.bibConfig) {
    const cfg = event.bibConfig;
    bibContainer.innerHTML = `
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--color-primary-subtle); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800;">
            ${escapeHtml(cfg.prefix || 'BIB')}
          </div>
          <div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-title);">
              Format Nomor Dada: <code>${escapeHtml(cfg.prefix)}${String(cfg.startNumber || 1).padStart(Math.max(1, cfg.digitLength || 4), '0')}${escapeHtml(cfg.suffix || '')}</code>
            </div>
            <small style="color: #64748B;">Nomor dada peserta mengikuti format yang ditetapkan untuk kategori ini.</small>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; border-top: 1px dashed var(--color-border-subtle); padding-top: 10px; margin-top: 10px;">
          <i class="fa-solid fa-triangle-exclamation" style="color: #F59E0B; margin-right: 4px;"></i>
          Nomor dada peserta ditetapkan untuk keperluan identifikasi selama perlombaan.
        </div>
      </div>
    `;
  } else {
    bibContainer.innerHTML = `
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Nomor BIB ditetapkan melalui sistem setelah pendaftaran, sesuai waktu yang ditentukan panitia.
      </p>
    `;
  }

  // Register Button Link
  const regBtn = document.getElementById('tdBtnRegisterNow');
  if (isClosed) {
    regBtn.classList.remove('btn-glow');
    regBtn.style.opacity = '0.6';
    regBtn.style.pointerEvents = 'none';
    regBtn.setAttribute('aria-disabled', 'true');
    regBtn.removeAttribute('href');
    regBtn.innerHTML = isGlobalClosed
      ? '<i class="fa-solid fa-ban"></i> Pendaftaran Ditutup'
      : '<i class="fa-solid fa-lock"></i> Kategori Ditutup';
  } else {
    regBtn.removeAttribute('aria-disabled');
    regBtn.style.opacity = '';
    regBtn.style.pointerEvents = '';
    regBtn.href = `/?register=${event.id}#kategori`;
    regBtn.innerHTML = `<i class="fa-solid fa-ticket"></i> Daftar Kategori ${escapeHtml(event.category)}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  activeEventId = new URLSearchParams(window.location.search).get('id');
  loadTicketDetail();
  const refreshTicket = event => {
    if (!Array.isArray(event?.topics)) return;
    if (event.topics.some(topic => ['events', 'countdown'].includes(topic))) {
      loadTicketDetail({ quiet: true });
    }
  };
  subscribeRealtimeEvent('public:data_changed', refreshTicket);
  window.addEventListener('realtime:reconnected', () => loadTicketDetail({ quiet: true }));
  connectRealtimeSocket();

  // Share button
  document.getElementById('btnShareTicket')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('success', 'Tautan kategori berhasil disalin.');
    } catch (error) {
      console.error('Gagal menyalin tautan kategori:', error);
      showToast('error', 'Tautan tidak dapat disalin. Silakan salin alamat halaman ini secara manual.');
    }
  });
});
