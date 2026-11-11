import { apiFetch } from './api.js';

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
      <h5>${type === 'success' ? 'Berhasil' : 'Peringatan'}</h5>
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
    document.getElementById('tdErrorMessage').textContent = 'ID tiket tidak ditemukan dalam URL. Silakan pilih tiket melalui landing page.';
    return;
  }

  try {
    const [res, cfgRes] = await Promise.all([
      apiFetch(`/events/${eventId}`),
      apiFetch('/settings/checkout-config').catch(() => null)
    ]);

    const text = await res.text();
    let result = null;
    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      throw new Error('Server backend tidak merespons JSON yang valid.');
    }

    if (!res.ok || result.status !== 'success' || !result.data) {
      loadingEl.style.display = 'none';
      errorEl.style.display = 'block';
      document.getElementById('tdErrorMessage').textContent = result.message || 'Data tiket tidak ditemukan di database backend.';
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

    const event = result.data;
    renderTicketData(event, feeSettings);

    loadingEl.style.display = 'none';
    contentEl.style.display = 'block';
  } catch (err) {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    document.getElementById('tdErrorMessage').textContent = `Gagal menghubungi server: ${err.message}. Silakan coba beberapa saat lagi.`;
  }
}

function renderTicketData(event, feeSettings = {}) {
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
  document.getElementById('tdCategoryTag').textContent = `${escapeHtml(event.category)} MARATHON`;
  document.getElementById('tdTicketName').textContent = event.ticketName;
  document.getElementById('tdTicketSubtitle').textContent = `Kategori Lomba Resmi • Kuota Total ${event.stock.toLocaleString('id-ID')} Peserta`;

  // Status Badge
  const statusBadge = document.getElementById('tdStatusBadge');
  if (event.isClosed) {
    statusBadge.className = 'td-badge closed';
    statusBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Pendaftaran Resmi Ditutup';
  } else {
    statusBadge.className = 'td-badge open';
    statusBadge.innerHTML = '<i class="fa-solid fa-lock-open"></i> Pendaftaran Sedang Buka';
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
      cardFeeAmount.textContent = 'Gratis (Rp 0)';
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
  const remaining = typeof event.remainingStock === 'number' ? event.remainingStock : event.stock;
  const registered = typeof event.registeredCount === 'number' ? event.registeredCount : 0;
  document.getElementById('tdStock').textContent = `${remaining.toLocaleString('id-ID')} Tiket`;
  document.getElementById('tdRegisteredCount').textContent = `${registered.toLocaleString('id-ID')} Peserta`;

  const totalCap = event.stock || 1;
  const pct = Math.max(10, Math.min(100, Math.round((remaining / totalCap) * 100)));
  document.getElementById('tdStockPercentage').textContent = `${pct}% Kuota Tersedia`;
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
    document.getElementById('tdEventDate').textContent = 'Belum ditentukan';
    document.getElementById('tdDays').textContent = '--';
    document.getElementById('tdHours').textContent = '--';
    document.getElementById('tdMinutes').textContent = '--';
    document.getElementById('tdSeconds').textContent = '--';
  }

  // Benefits List (strictly from event_benefits table)
  const benefitsContainer = document.getElementById('tdBenefitsContainer');
  if (Array.isArray(event.benefits) && event.benefits.length > 0) {
    benefitsContainer.innerHTML = event.benefits.map(b => `
      <div class="td-benefit-card">
        <div class="td-benefit-icon">
          <i class="fa-solid fa-check"></i>
        </div>
        <div>
          <strong style="color: var(--color-text-title); font-size: 0.95rem; display: block; margin-bottom: 2px;">
            ${escapeHtml(b.name)}
          </strong>
          <p style="font-size: 0.84rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">
            ${escapeHtml(b.description)}
          </p>
        </div>
      </div>
    `).join('');
  } else {
    benefitsContainer.innerHTML = `
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada fasilitas / benefit yang tercantum untuk kategori ini.
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
        sizes = ['S', 'M', 'L', 'XL'];
      }
      return `
        <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 1rem; color: var(--color-text-title);">${escapeHtml(j.name)}</strong>
            <span class="badge" style="background: #FFFFFF; font-weight: 700;">Tipe: ${escapeHtml(j.type)}</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 12px;">
            Bahan Dry-Fit Breathable Micro-fiber, anti-bakteri dan cepat kering.
          </p>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-muted);">Pilihan Ukuran Resmi:</span>
            ${sizes.map(s => `<span style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; color: var(--color-primary);">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  } else {
    jerseysContainer.innerHTML = `
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada data jersey resmi untuk kategori ini.
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
              Format Nomor Dada: <code>${escapeHtml(cfg.prefix)}${'0'.repeat(Math.max(0, (cfg.digitLength || 4) - 1))}1${escapeHtml(cfg.suffix || '')}</code>
            </div>
            <small style="color: #64748B;">Nomor BIB unik di-generate otomatis oleh sistem dan terhubung dengan chip RFID resmi.</small>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; border-top: 1px dashed var(--color-border-subtle); padding-top: 10px; margin-top: 10px;">
          <i class="fa-solid fa-triangle-exclamation" style="color: #F59E0B; margin-right: 4px;"></i>
          Nomor BIB tidak dapat dipindahtangankan demi keabsahan asuransi dan pencatatan rekor waktu finish.
        </div>
      </div>
    `;
  } else {
    bibContainer.innerHTML = `
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada konfigurasi nomor BIB untuk kategori ini.
      </p>
    `;
  }

  // Register Button Link
  const regBtn = document.getElementById('tdBtnRegisterNow');
  if (event.isClosed) {
    regBtn.classList.remove('btn-glow');
    regBtn.style.opacity = '0.6';
    regBtn.style.pointerEvents = 'none';
    regBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup';
  } else {
    regBtn.href = `/?register=${event.id}#kategori`;
    regBtn.innerHTML = `<i class="fa-solid fa-ticket"></i> Daftar Kategori ${escapeHtml(event.category)} Sekarang`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTicketDetail();

  // Share button
  document.getElementById('btnShareTicket')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('success', 'Tautan tiket berhasil disalin ke papan klip!');
  });
});
