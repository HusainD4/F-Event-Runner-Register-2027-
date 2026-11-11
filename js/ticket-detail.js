import { apiFetch } from './api.js';
import { loadWebsiteBranding } from './branding.js';

loadWebsiteBranding();

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

function startCountdown(targetDateStr) {
  if (!targetDateStr) return;
  const targetTime = new Date(targetDateStr).getTime();

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

async function loadTicketDetail() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('id');

  const loadingEl = document.getElementById('tdLoadingState');
  const errorEl = document.getElementById('tdErrorState');
  const contentEl = document.getElementById('tdContentSection');

  if (!eventId) {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    document.getElementById('tdErrorMessage').textContent = 'Tautan kategori tidak lengkap. Silakan kembali ke beranda dan pilih kategori yang tersedia.';
    return;
  }

  try {
    const [res, cfgRes, countdownRes] = await Promise.all([
      apiFetch(`/events/${eventId}`),
      apiFetch('/settings/checkout-config').catch(() => null),
      apiFetch('/settings/countdown').catch(() => null)
    ]);

    const text = await res.text();
    let result = null;
    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      throw new Error('Respons server tidak dapat dibaca.');
    }

    if (!res.ok || result.status !== 'success' || !result.data) {
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

    if (isGlobalClosed) {
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
    contentEl.style.display = 'block';
    contentEl.classList.add('td-content-enter');
  } catch (err) {
    console.error('Gagal memuat detail tiket:', err);
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    document.getElementById('tdErrorMessage').textContent = 'Informasi tiket belum dapat dimuat. Periksa koneksi internet Anda, lalu coba kembali.';
  }
}

function renderTicketData(event, feeSettings = {}, isGlobalClosed = false) {
  const isClosed = Boolean(event.isClosed) || isGlobalClosed;
  // Page Title
  document.title = `${event.ticketName} - Tegal Run 2027`;

  // Ticket Cover Image
  const coverImg = document.getElementById('tdTicketCoverImg');
  const cover = document.getElementById('tdTicketCover');
  if (coverImg) {
    const coverUrl = event.ticketImage || event.medalImage;
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

  // Basic Header Info
  document.getElementById('tdCategoryTag').textContent = event.category || 'Kategori Lomba';
  document.getElementById('tdTicketName').textContent = event.ticketName;
  document.getElementById('tdTicketSubtitle').textContent = `Total kuota: ${Number(event.stock || 0).toLocaleString('id-ID')} peserta`;

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
  const remaining = typeof event.remainingStock === 'number' ? event.remainingStock : event.stock;
  const registered = typeof event.registeredCount === 'number' ? event.registeredCount : 0;
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

  const totalCap = Number(event.stock) || 0;
  const pct = totalCap > 0 ? Math.max(0, Math.min(100, Math.round((remaining / totalCap) * 100))) : 0;
  document.getElementById('tdStockPercentage').textContent = `${pct}% tersedia`;
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
        <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 1rem; color: var(--color-text-title);">${escapeHtml(j.name)}</strong>
            <span class="badge" style="background: #FFFFFF; font-weight: 700;">Jenis: ${escapeHtml(j.type)}</span>
          </div>
          ${sizes.length ? `
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-muted);">Pilihan ukuran:</span>
              ${sizes.map(s => `<span style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; color: var(--color-primary);">${escapeHtml(s)}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
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
        Informasi nomor dada untuk kategori ini belum tersedia.
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
  loadTicketDetail();

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
