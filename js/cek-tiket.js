/**
 * CEK STATUS TIKET & E-TIKET CONTROLLER
 * Tegal Run 2027
 */

import { apiFetch } from './api.js';

function showToast(type = 'success', message = '') {
  const container = document.getElementById('cekToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'}"></i>
    </div>
    <div class="toast-content">
      <h5>${type === 'success' ? 'Berhasil' : 'Pemberitahuan'}</h5>
      <p>${message}</p>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
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

function maskNik(nik) {
  if (!nik || nik.length < 8) return nik || '';
  return nik.substring(0, 6) + '******' + nik.substring(nik.length - 4);
}

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num || 0);
}

// State
let lastSearchResults = [];
let currentCancelOrderId = null;

// Tab Type Configuration
const typeConfig = {
  all: {
    placeholder: 'Ketik Email, WhatsApp (08xxx), NIK (16 digit), atau Order ID',
    hint: 'Sistem akan otomatis mendeteksi format yang Anda masukkan.',
    icon: 'fa-solid fa-wand-magic-sparkles'
  },
  email: {
    placeholder: 'Masukkan Email pendaftar (contoh: pelari@gmail.com)',
    hint: 'Gunakan alamat email resmi yang Anda cantumkan saat checkout.',
    icon: 'fa-solid fa-envelope'
  },
  phone: {
    placeholder: 'Masukkan nomor WhatsApp aktif (contoh: 081234567890)',
    hint: 'Gunakan awalan 08 atau 628 dengan minimal 10 digit angka.',
    icon: 'fa-brands fa-whatsapp'
  },
  nik: {
    placeholder: 'Masukkan 16 digit NIK KTP Anda',
    hint: 'Wajib tepat 16 digit angka sesuai identitas KTP pendaftar.',
    icon: 'fa-solid fa-id-card'
  },
  orderId: {
    placeholder: 'Masukkan Order ID (contoh: TR-17283948...)',
    hint: 'Order ID dapat ditemukan pada notifikasi WhatsApp/Email atau invoice Midtrans.',
    icon: 'fa-solid fa-receipt'
  }
};

function setupTypeTabs() {
  const pills = document.querySelectorAll('#searchTypeTabs .type-pill');
  const hiddenInput = document.getElementById('selectedSearchType');
  const kwInput = document.getElementById('searchKeyword');
  const hintEl = document.querySelector('#searchFormatHint span');
  const iconEl = document.getElementById('searchIcon');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const t = pill.getAttribute('data-type') || 'all';
      if (hiddenInput) hiddenInput.value = t;

      const conf = typeConfig[t] || typeConfig.all;
      if (kwInput) {
        kwInput.placeholder = conf.placeholder;
        if (t === 'nik') {
          kwInput.maxLength = 16;
          kwInput.inputMode = 'numeric';
        } else if (t === 'phone') {
          kwInput.maxLength = 16;
          kwInput.inputMode = 'tel';
        } else {
          kwInput.removeAttribute('maxlength');
          kwInput.inputMode = 'text';
        }
      }
      if (hintEl) hintEl.textContent = conf.hint;
      if (iconEl) iconEl.className = conf.icon;
    });
  });
}

function validateSearchInput(keyword, type) {
  const clean = keyword.replace(/\s+/g, '');

  if (type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(keyword)) {
      return 'Format email tidak valid. Contoh yang benar: pelari@gmail.com';
    }
  } else if (type === 'nik') {
    if (!/^\d{16}$/.test(clean)) {
      return 'NIK KTP wajib terdiri dari tepat 16 digit angka. Anda memasukkan: ' + clean.length + ' digit.';
    }
  } else if (type === 'phone') {
    if (!/^(\+62|62|08)\d{8,13}$/.test(clean)) {
      return 'Nomor WhatsApp tidak valid. Gunakan format 08xxx atau 628xxx (minimal 10 digit).';
    }
  } else if (type === 'orderId') {
    if (keyword.length < 5) {
      return 'Format Order ID tidak valid.';
    }
  } else if (type === 'all') {
    // Validasi apakah cocok ke salah satu format
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(keyword);
    const isNik = /^\d{16}$/.test(clean);
    const isPhone = /^(\+62|62|08)\d{8,13}$/.test(clean);
    const isOrderId = /^TR-[\w-]+$/i.test(keyword) || keyword.length >= 20;

    if (!isEmail && !isNik && !isPhone && !isOrderId) {
      return 'Input tidak sesuai dengan format yang didukung. Masukkan Email valid, Nomor WhatsApp (10-14 digit), NIK KTP (16 digit), atau Order ID resmi.';
    }
  }
  return null;
}

async function handleSearchSubmit(e) {
  e.preventDefault();
  const keyword = document.getElementById('searchKeyword').value.trim();
  const searchType = document.getElementById('selectedSearchType')?.value || 'all';
  const container = document.getElementById('resultContainer');
  const btn = document.getElementById('btnSearchTiket');

  if (!keyword) return;

  // Validasi format ketat
  const validationErr = validateSearchInput(keyword, searchType);
  if (validationErr) {
    showToast('warning', validationErr);
    container.innerHTML = `
      <div class="ticket-result-card" style="text-align: center; padding: 40px; border: 1px dashed #EF4444;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #EF4444; margin-bottom: 14px;"></i>
        <h4 style="color: #991B1B;">Format Input Tidak Valid</h4>
        <p style="color: #64748B; font-size: 0.9rem; max-width: 520px; margin: 8px auto 0 auto;">
          ${escapeHtml(validationErr)}
        </p>
      </div>
    `;
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mencari Data...';
  container.innerHTML = `
    <div style="text-align: center; padding: 50px 20px; color: #64748B;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size: 2.2rem; color: var(--color-primary); margin-bottom: 12px;"></i>
      <h4 style="color: var(--color-text-title);">Memverifikasi Data Pendaftaran...</h4>
      <p style="font-size: 0.88rem;">Menghubungkan ke database resmi panitia Tegal Run 2027...</p>
    </div>
  `;

  try {
    const res = await apiFetch(`/tickets/search?q=${encodeURIComponent(keyword)}&type=${searchType}`);
    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      container.innerHTML = `
        <div class="ticket-result-card" style="text-align: center; padding: 40px;">
          <i class="fa-solid fa-circle-exclamation" style="font-size: 2.5rem; color: #EF4444; margin-bottom: 14px;"></i>
          <h4 style="color: var(--color-text-title);">Data Tiket Tidak Ditemukan</h4>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: 6px;">
            ${escapeHtml(data.message || 'Tidak ditemukan pesanan tiket dengan data tersebut.')}
          </p>
        </div>
      `;
      return;
    }

    lastSearchResults = data.data || [];
    renderSearchResults(lastSearchResults);
  } catch (err) {
    container.innerHTML = `
      <div class="ticket-result-card" style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 14px;"></i>
        <h4 style="color: var(--color-text-title);">Gagal Terhubung ke Server</h4>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">${err.message}</p>
      </div>
    `;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-search"></i> Cek Tiket Saya';
  }
}

function renderSearchResults(orders) {
  const container = document.getElementById('resultContainer');
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="ticket-result-card" style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-ticket-simple" style="font-size: 2.5rem; color: #94A3B8; margin-bottom: 14px;"></i>
        <h4 style="color: var(--color-text-title);">Tidak Ada Pesanan Ditemukan</h4>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Pastikan data yang dimasukkan persis sama dengan saat pendaftaran.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const isPaid = order.status === 'SETTLEMENT' || order.status === 'PAID';
    const isPending = order.status === 'PENDING';
    const isCancel = order.status === 'CANCEL' || order.status === 'EXPIRE';

    const statusBadge = isPaid
      ? '<span class="ticket-badge-pill paid"><i class="fa-solid fa-circle-check"></i> LUNAS (TERVERIFIKASI)</span>'
      : (isPending
        ? '<span class="ticket-badge-pill pending"><i class="fa-solid fa-clock"></i> MENUNGGU PEMBAYARAN</span>'
        : '<span class="ticket-badge-pill cancel"><i class="fa-solid fa-ban"></i> DIBATALKAN</span>');

    const participantsHtml = (order.participants || []).map((p, idx) => `
      <div class="participant-row">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; color: #94A3B8; display: block;">PESERTA #${idx + 1}</span>
          <strong style="color: #0F172A; font-size: 1.05rem;">${escapeHtml(p.fullNameKtp)}</strong>
          ${p.bibName ? `<span style="font-size: 0.85rem; color: #64748B;"> (${escapeHtml(p.bibName)})</span>` : ''}
          <div style="font-size: 0.8rem; color: #64748B; margin-top: 2px;">
            NIK: <code>${maskNik(p.nik)}</code> • Jersey: <strong>${escapeHtml(p.selectedSize || 'M')}</strong> • Gol. Darah: <strong>${escapeHtml(p.bloodType || '-')}</strong>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="display: block; font-size: 0.75rem; color: #94A3B8; font-weight: 700;">NOMOR BIB RESMI</span>
          <strong style="font-size: 1.25rem; color: var(--color-primary); font-family: monospace;">
            ${escapeHtml(p.bibNumber || (isPaid ? 'Sedang Digenerate' : 'Setelah Lunas'))}
          </strong>
        </div>
      </div>
    `).join('');

    const firstP = order.participants?.[0];
    const ticketName = firstP?.event?.ticketName || 'Tegal Run 2027';
    const category = firstP?.event?.category || '10K';

    return `
      <div class="ticket-result-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-size: 0.78rem; font-family: monospace; color: #64748B; font-weight: 700;">
              ORDER ID: ${escapeHtml(order.midtransOrderId || order.id)}
            </span>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin-top: 4px;">
              ${escapeHtml(ticketName)} <span style="font-size: 0.9rem; color: var(--color-primary);">(${escapeHtml(category)} Marathon)</span>
            </h3>
            <span style="font-size: 0.84rem; color: #64748B;">
              Tanggal Pesan: ${new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
            </span>
          </div>
          <div>${statusBadge}</div>
        </div>

        <div style="margin-bottom: 20px;">
          <h5 style="font-size: 0.88rem; font-weight: 800; color: #334155; margin-bottom: 8px;">
            <i class="fa-solid fa-users"></i> Daftar Pelari Terdaftar (${order.participants?.length || 0}):
          </h5>
          ${participantsHtml}
        </div>

        <div style="border-top: 1px solid #E2E8F0; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <span style="font-size: 0.8rem; color: #64748B; display: block;">Total Pembayaran:</span>
            <strong style="font-size: 1.25rem; color: var(--color-primary); font-weight: 800;">
              ${formatRupiah(order.totalAmount)}
            </strong>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${isPaid ? `
              <a href="/e-ticket.html?orderId=${order.id}" class="btn btn-primary btn-sm btn-glow">
                <i class="fa-solid fa-file-pdf"></i> Unduh / Cetak E-Tiket (PDF)
              </a>
            ` : (isPending ? `
              <button type="button" class="btn btn-outline btn-sm btn-sync-midtrans" data-id="${order.id}">
                <i class="fa-solid fa-rotate"></i> Cek Status Terkini
              </button>
              <button type="button" class="btn btn-danger btn-sm btn-open-cancel" data-id="${order.id}" style="background:#FEE2E2;color:#DC2626;border:1px solid #FECACA;">
                <i class="fa-solid fa-ban"></i> Batalkan
              </button>
              <a href="/payment.html?orderId=${order.id}" class="btn btn-primary btn-sm btn-glow">
                <i class="fa-solid fa-credit-card"></i> Bayar Sekarang
              </a>
            ` : `
              <span style="font-size: 0.82rem; color: #94A3B8; font-style: italic;">
                Pesanan telah dibatalkan / kedaluwarsa.
              </span>
            `)}
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachActionListeners();
}

function attachActionListeners() {
  document.querySelectorAll('.btn-sync-midtrans').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengecek...';

      try {
        const res = await apiFetch(`/orders/${id}/sync-midtrans`, { method: 'POST' });
        const result = await res.json();
        if (result.status === 'success') {
          showToast('success', result.message);
          if (result.data?.status === 'SETTLEMENT') {
            window.location.href = `/e-ticket.html?orderId=${id}`;
            return;
          }
          document.getElementById('formCekTiket').dispatchEvent(new Event('submit'));
        } else {
          showToast('warning', result.message);
        }
      } catch (err) {
        showToast('error', err.message);
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Cek Status Terkini';
      }
    });
  });

  document.querySelectorAll('.btn-open-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCancelOrderId = btn.getAttribute('data-id');
      document.getElementById('cancelTargetOrderId').value = currentCancelOrderId;
      document.getElementById('modalCancelBackdrop').classList.add('open');
    });
  });
}

// Modal Cancel Handlers
document.getElementById('btnCloseCancelModal')?.addEventListener('click', () => {
  document.getElementById('modalCancelBackdrop').classList.remove('open');
});
document.getElementById('btnDismissCancelModal')?.addEventListener('click', () => {
  document.getElementById('modalCancelBackdrop').classList.remove('open');
});

document.getElementById('cancelReasonSelect')?.addEventListener('change', (e) => {
  const customGroup = document.getElementById('groupCancelCustomReason');
  if (e.target.value === 'Lainnya') {
    customGroup.style.display = 'block';
    document.getElementById('cancelCustomReason').required = true;
  } else {
    customGroup.style.display = 'none';
    document.getElementById('cancelCustomReason').required = false;
  }
});

document.getElementById('formCancelOrder')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const orderId = document.getElementById('cancelTargetOrderId').value;
  const reasonSelect = document.getElementById('cancelReasonSelect').value;
  const customReason = document.getElementById('cancelCustomReason').value.trim();
  const finalReason = reasonSelect === 'Lainnya' ? customReason : reasonSelect;

  const btn = document.getElementById('btnSubmitCancelOrder');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Membatalkan...';

  try {
    const res = await apiFetch(`/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: finalReason })
    });
    const result = await res.json();

    if (result.status === 'success') {
      showToast('success', result.message);
      document.getElementById('modalCancelBackdrop').classList.remove('open');
      document.getElementById('formCekTiket').dispatchEvent(new Event('submit'));
    } else {
      showToast('error', result.message || 'Gagal membatalkan pesanan.');
    }
  } catch (err) {
    showToast('error', err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-ban"></i> Ya, Batalkan Pesanan';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setupTypeTabs();
  document.getElementById('formCekTiket')?.addEventListener('submit', handleSearchSubmit);

  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q') || urlParams.get('orderId');
  if (q) {
    document.getElementById('searchKeyword').value = q;
    document.getElementById('formCekTiket').dispatchEvent(new Event('submit'));
  }
});
