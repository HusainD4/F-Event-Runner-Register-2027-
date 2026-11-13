import { apiFetch, loadMidtransSdk } from './api.js';
import { loadWebsiteBranding } from './branding.js';

loadWebsiteBranding();

function showToast(type = 'success', message = '') {
  const container = document.getElementById('paymentToastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<div class="toast-icon"><i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'}"></i></div><div class="toast-content"><h5>${type === 'success' ? 'Berhasil' : 'Pemberitahuan'}</h5><p>${message}</p></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
}

let activeOrder = null;
let realtimePollingTimer = null;
let countdownTimerInterval = null;

function stopPaymentPolling() {
  if (realtimePollingTimer) {
    clearInterval(realtimePollingTimer);
    realtimePollingTimer = null;
  }
}

function stopCountdownTimer() {
  if (countdownTimerInterval) {
    clearInterval(countdownTimerInterval);
    countdownTimerInterval = null;
  }
}

function startPaymentCountdown(createdAt, timerMinutes = 30) {
  stopCountdownTimer();

  const createdTime = new Date(createdAt).getTime();
  const expiryTime = createdTime + (timerMinutes * 60 * 1000);
  const timerDisplay = document.getElementById('paymentTimerCountdown');
  const btnPay = document.getElementById('btnPayMidtransNow');

  function update() {
    const now = Date.now();
    const diff = Math.floor((expiryTime - now) / 1000);

    if (diff <= 0) {
      stopCountdownTimer();
      if (timerDisplay) {
        timerDisplay.textContent = '00:00 (WAKTU HABIS)';
        timerDisplay.style.color = '#DC2626';
      }
      if (btnPay) {
        btnPay.disabled = true;
        btnPay.style.opacity = '0.5';
        btnPay.style.cursor = 'not-allowed';
        btnPay.innerHTML = '<i class="fa-solid fa-clock"></i> Batas Waktu Pembayaran Telah Habis';
      }
      return;
    }

    const m = Math.floor(diff / 60);
    const s = diff % 60;
    const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (timerDisplay) {
      timerDisplay.textContent = str;
    }
  }

  update();
  countdownTimerInterval = setInterval(update, 1000);
}

function startPaymentPolling(orderId) {
  stopPaymentPolling();
  // Jalankan polling setiap 3 detik untuk mengecek status pembayaran secara realtime
  realtimePollingTimer = setInterval(async () => {
    try {
      const res = await apiFetch(`/orders/${orderId}/sync-midtrans`, { method: 'POST' });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        if (json.data.status === 'SETTLEMENT' || json.data.isPaid) {
          stopPaymentPolling();
          showToast('success', 'Pembayaran Lunas Terverifikasi! Mengarahkan ke E-Tiket...');
          setTimeout(() => {
            window.location.href = `/e-ticket.html?orderId=${orderId}`;
          }, 1200);
        } else if (json.data.status === 'CANCEL' || json.data.status === 'EXPIRE') {
          stopPaymentPolling();
          loadPaymentDetails();
        }
      }
    } catch (e) {
      // Background poll fail silent
    }
  }, 3000);
}

async function loadPaymentDetails() {
  const mount = document.getElementById('paymentContentMount');
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId') || params.get('id');

  if (!orderId) {
    mount.innerHTML = `
      <div class="payment-card" style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 2.5rem; color: #EF4444; margin-bottom: 12px;"></i>
        <h3>Order ID Tidak Valid</h3>
        <p style="color: #64748B;">Silakan periksa kembali tautan pembayaran Anda.</p>
        <a href="/cek-tiket.html" class="btn btn-secondary" style="margin-top: 16px;">
          <i class="fa-solid fa-search"></i> Cek Status Tiket
        </a>
      </div>
    `;
    return;
  }

  try {
    const res = await apiFetch(`/tickets/search?q=${encodeURIComponent(orderId)}&type=orderId`);
    const json = await res.json();

    if (!res.ok || json.status !== 'success' || !json.data || json.data.length === 0) {
      mount.innerHTML = `
        <div class="payment-card" style="text-align: center; padding: 40px;">
          <i class="fa-solid fa-circle-xmark" style="font-size: 2.5rem; color: #EF4444; margin-bottom: 12px;"></i>
          <h3>Pesanan Tidak Ditemukan</h3>
          <p style="color: #64748B; margin-bottom: 16px;">Order ID "${escapeHtml(orderId)}" tidak terdaftar di sistem.</p>
          <a href="/cek-tiket.html" class="btn btn-secondary">
            <i class="fa-solid fa-search"></i> Cari Tiket Lainnya
          </a>
        </div>
      `;
      return;
    }

    activeOrder = json.data[0];
    renderPaymentUI(activeOrder);
  } catch (err) {
    mount.innerHTML = `
      <div class="payment-card" style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 12px;"></i>
        <h3>Gagal Terhubung ke Server</h3>
        <p style="color: #64748B; margin-bottom: 16px;">${err.message}</p>
        <button class="btn btn-primary" onclick="loadPaymentDetails()">
          <i class="fa-solid fa-rotate"></i> Coba Lagi
        </button>
      </div>
    `;
  }
}

function renderPaymentUI(order) {
  const mount = document.getElementById('paymentContentMount');
  const isPaid = order.status === 'SETTLEMENT' || order.status === 'PAID';
  const isPending = order.status === 'PENDING';
  const isCancel = order.status === 'CANCEL' || order.status === 'EXPIRE';

  const firstP = order.participants?.[0];
  const category = firstP?.event?.category || '10K';
  const ticketName = firstP?.event?.ticketName || 'Tegal Run 2026';

  const subtotalTickets = (order.participants || []).reduce((acc, p) => acc + (Number(p.event?.price) || 0), 0);
  const serviceFee = subtotalTickets > 0 ? Math.max(0, Number(order.totalAmount) - subtotalTickets) : 0;

  if (isPaid) {
    stopPaymentPolling();
    stopCountdownTimer();
    mount.innerHTML = `
      <div class="payment-card" style="text-align: center;">
        <div style="width: 72px; height: 72px; background: #DCFCE7; color: #16A34A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.4rem; margin: 0 auto 16px auto;">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">Pembayaran Berhasil / Lunas!</h2>
        <p style="color: #64748B; font-size: 0.95rem; margin-bottom: 20px;">
          Selamat! Tiket lomba <strong>${escapeHtml(ticketName)}</strong> Anda telah resmi terverifikasi dan aktif di sistem.
        </p>

        <div class="order-summary-box" style="text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #64748B;">Order ID:</span>
            <strong style="font-family: monospace;">${escapeHtml(order.midtransOrderId || order.id)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #64748B;">Total Terbayar:</span>
            <strong style="color: var(--color-primary); font-size: 1.05rem;">${formatRupiah(order.totalAmount)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748B;">Status Pembayaran:</span>
            <span style="color: #16A34A; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-circle-check"></i> LUNAS (SETTLEMENT)
            </span>
          </div>
        </div>

        <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 24px; text-align: left; font-size: 0.85rem; color: #92400E;">
          <i class="fa-solid fa-lock"></i> <strong>Informasi Keamanan:</strong> Tiket yang sudah berstatus <strong>Lunas</strong> tidak dapat dibatalkan secara mandiri. Apabila memerlukan konfirmasi medis darurat, wajib menghubungi panitia pelaksana.
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="/e-ticket.html?orderId=${order.id}" class="btn btn-primary btn-glow" style="min-width: 220px;">
            <i class="fa-solid fa-file-pdf"></i> Unduh / Cetak E-Tiket Resmi
          </a>
          <a href="/cek-tiket.html" class="btn btn-secondary">
            <i class="fa-solid fa-search"></i> Cek Status Tiket
          </a>
        </div>
      </div>
    `;
    return;
  }

  if (isCancel) {
    stopPaymentPolling();
    stopCountdownTimer();
    mount.innerHTML = `
      <div class="payment-card" style="text-align: center;">
        <div style="width: 72px; height: 72px; background: #FEE2E2; color: #DC2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 16px auto;">
          <i class="fa-solid fa-ban"></i>
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">Pesanan Dibatalkan</h2>
        <p style="color: #64748B; font-size: 0.95rem; margin-bottom: 20px;">
          Pesanan tiket ini telah dibatalkan / kedaluwarsa dan kuota telah dikembalikan ke publik.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="/#kategori" class="btn btn-primary btn-glow">
            <i class="fa-solid fa-ticket"></i> Daftar Ulang Tiket Baru
          </a>
          <a href="/cek-tiket.html" class="btn btn-secondary">
            <i class="fa-solid fa-search"></i> Cari Tiket Lain
          </a>
        </div>
      </div>
    `;
    return;
  }

  // PENDING - Mulai Realtime Polling & Countdown Timer
  startPaymentPolling(order.id);

  // Ambil timer setting untuk countdown
  apiFetch('/settings/checkout-config')
    .then(r => r.json())
    .then(cfg => {
      const minutes = (cfg && cfg.status === 'success' && cfg.data?.paymentTimerMinutes) ? cfg.data.paymentTimerMinutes : 30;
      startPaymentCountdown(order.createdAt, minutes);
    })
    .catch(() => {
      startPaymentCountdown(order.createdAt, 30);
    });

  mount.innerHTML = `
    <div class="payment-card">
      <div style="text-align: center; margin-bottom: 20px;">
        <div class="realtime-status-pill">
          <span class="pulse-dot"></span> Memantau Pembayaran Realtime...
        </div>
        <div style="width: 64px; height: 64px; background: #FEF3C7; color: #D97706; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 12px auto;">
          <i class="fa-solid fa-clock-rotate-left"></i>
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-title);">Menunggu Pembayaran Tiket</h2>
        <p style="color: #64748B; font-size: 0.9rem;">Selesaikan pembayaran Anda. Sistem akan otomatis mendeteksi ketika transaksi berhasil.</p>
      </div>

      <!-- Expiry Countdown Timer Widget -->
      <div id="paymentTimerBox" style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 20px; text-align: center;">
        <div style="font-size: 0.82rem; color: #991B1B; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fa-solid fa-stopwatch fa-spin" style="--fa-animation-duration: 4s;"></i> Batas Waktu Pembayaran (Expiry):
        </div>
        <div id="paymentTimerCountdown" style="font-size: 1.8rem; font-weight: 900; font-family: monospace; color: #DC2626; margin: 4px 0;">
          Memuat...
        </div>
        <div style="font-size: 0.78rem; color: #7F1D1D;">
          Selesaikan transaksi sebelum timer habis agar pesanan tidak dibatalkan otomatis oleh sistem.
        </div>
      </div>

      <div class="order-summary-box">
        <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 12px; color: #0F172A;">Rincian Pesanan:</h4>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Nama Event:</span>
          <strong>${escapeHtml(ticketName)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Kategori Lomba:</span>
          <strong>${escapeHtml(category)} Marathon</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Jumlah Pelari:</span>
          <strong>${order.participants?.length || 1} Orang</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Order ID Resmi:</span>
          <code style="font-weight: 700; background: #E2E8F0; padding: 2px 6px; border-radius: 4px;">${escapeHtml(order.midtransOrderId || order.id)}</code>
        </div>
        ${subtotalTickets > 0 ? `
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Subtotal Tiket:</span>
          <strong style="color: #0F172A;">${formatRupiah(subtotalTickets)}</strong>
        </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem; ${serviceFee > 0 ? 'color: #EA580C;' : 'color: #10B981;'}">
          <span>Biaya Layanan:</span>
          <strong>${serviceFee > 0 ? `+ ${formatRupiah(serviceFee)}` : 'Gratis (Rp 0)'}</strong>
        </div>
        <div style="border-top: 1px dashed #CBD5E1; margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: #0F172A;">
          <span>Total Tagihan:</span>
          <span style="color: var(--color-primary);">${formatRupiah(order.totalAmount)}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <button class="btn btn-primary btn-glow" id="btnPayMidtransNow" style="width: 100%; padding: 14px; font-size: 1.05rem; margin-bottom: 12px;">
        <i class="fa-solid fa-credit-card"></i> Bayar Sekarang via Midtrans Snap (QRIS, VA, E-Wallet)
      </button>

      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <button class="btn btn-outline btn-sm" id="btnSyncPayment" style="flex: 1;">
          <i class="fa-solid fa-rotate"></i> Cek Status Terkini Sekarang
        </button>
        <button class="btn btn-sm" id="btnOpenCancelOrder" style="background: #FEE2E2; color: #DC2626; border: 1px solid #FECACA; flex: 1;">
          <i class="fa-solid fa-ban"></i> Batalkan Pesanan
        </button>
      </div>
    </div>
  `;

  // Manual Sync Button
  document.getElementById('btnSyncPayment')?.addEventListener('click', async () => {
    const btn = document.getElementById('btnSyncPayment');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengecek Status...';
    try {
      const res = await apiFetch(`/orders/${order.id}/sync-midtrans`, { method: 'POST' });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        if (json.data.status === 'SETTLEMENT' || json.data.isPaid) {
          showToast('success', 'Pembayaran Terverifikasi! Mengarahkan ke E-Tiket...');
          stopPaymentPolling();
          stopCountdownTimer();
          setTimeout(() => {
            window.location.href = `/e-ticket.html?orderId=${order.id}`;
          }, 1200);
          return;
        }
        showToast('warning', `Status Pembayaran: ${json.data.status || 'PENDING'}`);
      } else {
        showToast('warning', json.message || 'Belum ada perubahan status.');
      }
    } catch (err) {
      showToast('error', err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Cek Status Terkini Sekarang';
    }
  });

  document.getElementById('btnOpenCancelOrder')?.addEventListener('click', () => {
    document.getElementById('modalCancelBackdrop').classList.add('open');
  });

  document.getElementById('btnPayMidtransNow')?.addEventListener('click', async () => {
    const btn = document.getElementById('btnPayMidtransNow');
    const origHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Membuka Midtrans Snap...';

    try {
      let snapToken = order.snapToken;

      // Jika snapToken belum tersedia, request ke server untuk generate token
      if (!snapToken) {
        const res = await apiFetch(`/orders/${order.id}/snap-token`, { method: 'POST' });
        const json = await res.json();
        if (json.status === 'success' && json.data?.snapToken) {
          snapToken = json.data.snapToken;
          order.snapToken = snapToken;
        } else {
          showToast('error', json.message || 'Token pembayaran tidak dapat dimuat.');
          btn.disabled = false;
          btn.innerHTML = origHtml;
          return;
        }
      }

      await loadMidtransSdk();
      if (window.snap && typeof window.snap.pay === 'function') {
        window.snap.pay(snapToken, {
          onSuccess: async () => {
            showToast('success', 'Pembayaran berhasil dikonfirmasi! Memvalidasi...');
            stopPaymentPolling();
            stopCountdownTimer();
            await apiFetch(`/orders/${order.id}/sync-midtrans`, { method: 'POST' });
            window.location.href = `/e-ticket.html?orderId=${order.id}`;
          },
          onPending: async () => {
            showToast('warning', 'Menunggu transaksi Anda selesai diverifikasi.');
            startPaymentPolling(order.id);
          },
          onError: () => {
            showToast('error', 'Pembayaran gagal diproses melalui gateway Midtrans.');
          },
          onClose: () => {
            showToast('warning', 'Jendela pembayaran ditutup. Sistem tetap memantau secara realtime.');
            startPaymentPolling(order.id);
          }
        });
      } else {
        showToast('error', 'Library Midtrans Snap sedang memuat. Silakan tunggu 2 detik dan coba lagi.');
      }
    } catch (err) {
      showToast('error', 'Gagal membuka pembayaran: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
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
  if (!activeOrder) return;
  const reasonSelect = document.getElementById('cancelReasonSelect').value;
  const customReason = document.getElementById('cancelCustomReason').value.trim();
  const finalReason = reasonSelect === 'Lainnya' ? customReason : reasonSelect;

  const btn = document.getElementById('btnSubmitCancelOrder');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Membatalkan...';

  try {
    const res = await apiFetch(`/orders/${activeOrder.id}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: finalReason })
    });
    const json = await res.json();

    if (json.status === 'success') {
      showToast('success', json.message);
      document.getElementById('modalCancelBackdrop').classList.remove('open');
      stopPaymentPolling();
      await loadPaymentDetails();
    } else {
      showToast('error', json.message);
    }
  } catch (err) {
    showToast('error', err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-ban"></i> Ya, Batalkan Pesanan';
  }
});

window.addEventListener('beforeunload', stopPaymentPolling);
document.addEventListener('DOMContentLoaded', loadPaymentDetails);
