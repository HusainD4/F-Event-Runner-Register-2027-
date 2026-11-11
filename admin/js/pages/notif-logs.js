import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';

// =============================================================================
// LOG PENGIRIMAN NOTIFIKASI & STATUS PESERTA (BARU)
// =============================================================================
let notifLogsState = {
  items: [],
  stats: {},
};

async function loadNotificationLogs({ showLoading = true } = {}) {
  const tbody = document.getElementById('notifLogsTableBody');
  if (tbody && showLoading) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
          <i class="fa-solid fa-spinner fa-spin"></i> Memuat log pengiriman notifikasi...
        </td>
      </tr>
    `;
  }

  const search = (document.getElementById('searchNotifLogs')?.value || '').trim();
  const status = document.getElementById('filterNotifDeliveryStatus')?.value || '';

  const q = new URLSearchParams();
  if (search) q.append('search', search);
  if (status) q.append('status', status);

  try {
    const res = await fetchAdmin(`/admin/notifications/logs?${q.toString()}`);
    if (res && res.status === 'success' && res.data) {
      notifLogsState.items = res.data.items || [];
      notifLogsState.stats = res.data.stats || {};

      // Update KPI
      const totalEl = document.getElementById('kpiNotifTotalOrders');
      const sentEl = document.getElementById('kpiNotifSentCount');
      const pendingEl = document.getElementById('kpiNotifPendingCount');
      const modeEl = document.getElementById('kpiNotifDispatchMode');

      if (totalEl) totalEl.textContent = res.data.stats.totalOrders || 0;
      if (sentEl) sentEl.textContent = res.data.stats.sentCount || 0;
      if (pendingEl) pendingEl.textContent = res.data.stats.pendingCount || 0;
      if (modeEl) {
        modeEl.textContent = res.data.stats.dispatchMode === 'MANUAL' ? 'MANUAL (ADMIN)' : 'OTOMATIS (INSTANT)';
        modeEl.style.color = res.data.stats.dispatchMode === 'MANUAL' ? '#F59E0B' : '#10B981';
      }

      // Check WhatsApp Web session
      const sessionRes = await fetchAdmin('/admin/notifications/whatsapp/session');
      const sessionStatusEl = document.getElementById('kpiNotifSessionStatus');
      if (sessionStatusEl && sessionRes?.data) {
        if (sessionRes.data.status === 'CONNECTED') {
          sessionStatusEl.innerHTML = `<span style="color: #10B981;"><i class="fa-solid fa-circle-check"></i> WA Web Online (${escapeHtml(sessionRes.data.connectedNumber || 'Aktif')})</span>`;
        } else {
          sessionStatusEl.innerHTML = `<span style="color: #EF4444;"><i class="fa-solid fa-circle-xmark"></i> WA Web Terputus</span>`;
        }
      }

      renderNotifLogsTable(notifLogsState.items);
    } else if (res) {
      console.error('Failed to load notification logs:', res.message || 'Unexpected response');
      if (tbody && showLoading) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:25px;color:#EF4444;">Gagal memuat log notifikasi.</td></tr>';
      }
    }
  } catch (err) {
    console.error('Failed to load notification logs:', err);
    if (tbody && showLoading) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 25px; color: #EF4444;">
            <i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat log notifikasi: ${escapeHtml(err.message)}
          </td>
        </tr>
      `;
    }
  }
}

function renderNotifLogsTable(items) {
  const tbody = document.getElementById('notifLogsTableBody');
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 35px; color: var(--color-text-muted);">
          <i class="fa-solid fa-inbox" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
          Tidak ada data pesanan atau log pengiriman yang cocok.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((it, idx) => {
    // WA delivery badge
    let waBadge = `<span class="badge" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A;"><i class="fa-solid fa-clock"></i> Belum Dikirim</span>`;
    if (it.whatsappSent) {
      waBadge = `<span class="badge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;"><i class="fa-solid fa-circle-check"></i> Terkirim (WA)</span>`;
    } else if (it.deliveryStatus === 'FAILED') {
      waBadge = `<span class="badge" style="background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA;"><i class="fa-solid fa-circle-xmark"></i> Gagal</span>`;
    }

    // Email delivery badge
    let emailBadge = `<span class="badge" style="background:#F8FAFC;color:#64748B;border:1px solid #E2E8F0;"><i class="fa-solid fa-minus"></i> -</span>`;
    if (it.emailSent) {
      emailBadge = `<span class="badge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;"><i class="fa-solid fa-envelope-circle-check"></i> Terkirim</span>`;
    }

    // Payment Status Badge
    const isPaid = it.orderStatus === 'SETTLEMENT' || it.orderStatus === 'CAPTURE';
    const payBadge = isPaid
      ? `<span class="badge" style="background:#ECFDF5;color:#047857;font-weight:700;">LUNAS</span>`
      : `<span class="badge" style="background:#FFFBEB;color:#B45309;font-weight:700;">PENDING</span>`;

    const sentTime = it.lastDispatchedAt
      ? new Date(it.lastDispatchedAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
      : '<span style="color: #94A3B8;">Belum Pernah</span>';

    return `
      <tr>
        <td>${idx + 1}</td>
        <td><code>${escapeHtml(it.midtransOrderId || it.orderId.slice(0, 10))}</code></td>
        <td><strong>${escapeHtml(it.customerName)}</strong></td>
        <td>
          <div style="font-size: 0.82rem;">
            <div><i class="fa-brands fa-whatsapp" style="color: #25D366;"></i> ${escapeHtml(it.customerPhone)}</div>
            <div style="color: #64748B; font-size: 0.76rem;"><i class="fa-solid fa-envelope" style="color: #38BDF8;"></i> ${escapeHtml(it.customerEmail)}</div>
          </div>
        </td>
        <td>
          <span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;">${escapeHtml(it.ticketCategory)}</span>
          <div style="font-size: 0.74rem; color: #64748B; margin-top: 2px;">BIB: ${escapeHtml(it.bibNumbers)}</div>
        </td>
        <td>${payBadge}</td>
        <td>${waBadge}</td>
        <td>${emailBadge}</td>
        <td style="font-size: 0.78rem;">${sentTime}</td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn btn-sm ${it.whatsappSent ? 'btn-secondary' : 'btn-primary'} btn-dispatch-single" data-id="${it.orderId}" data-name="${escapeHtml(it.customerName)}" title="Kirim Notifikasi via WhatsApp & Email">
              <i class="fa-solid fa-paper-plane"></i> ${it.whatsappSent ? 'Kirim Ulang' : 'Kirim'}
            </button>
            <a href="/e-ticket.html?orderId=${it.orderId}" target="_blank" class="btn btn-secondary btn-sm" title="Lihat E-Tiket Digital PDF">
              <i class="fa-solid fa-file-pdf"></i>
            </a>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach click listeners for single dispatch
  document.querySelectorAll('.btn-dispatch-single').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderId = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      handleDispatchSingle(orderId, name, btn);
    });
  });
}

async function handleDispatchSingle(orderId, name, btnEl) {
  if (btnEl) {
    btnEl.disabled = true;
    btnEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  }

  try {
    const res = await fetchAdmin('/admin/notifications/dispatch-single', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Terkirim!', `Notifikasi tiket untuk ${name || 'peserta'} berhasil dikirim.`);
      loadNotificationLogs();
    } else {
      showAdminToast('error', 'Gagal Mengirim', res?.message || 'Pengiriman notifikasi gagal.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan', err.message);
  } finally {
    if (btnEl) {
      btnEl.disabled = false;
      btnEl.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim';
    }
  }
}

async function handleBatchSendNotif() {
  const confirmed = await showConfirmDialog({
    title: 'Kirim Notifikasi Massal?',
    message: 'Apakah Anda ingin mengirimkan notifikasi tiket (WhatsApp & Email) untuk SEMUA peserta yang berstatus Lunas / Menunggu Pembayaran?',
    confirmText: 'Ya, Kirim Sekarang',
    type: 'warning',
  });

  if (!confirmed) return;

  const btn = document.getElementById('btnBatchSendNotif');
  const originalHtml = btn?.innerHTML;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses Batch...';
  }

  try {
    const res = await fetchAdmin('/admin/notifications/dispatch-batch', { method: 'POST' });
    if (res && res.status === 'success') {
      showAdminToast('success', 'Batch Selesai', res.message || 'Notifikasi massal berhasil diproses.');
      loadNotificationLogs();
    } else {
      showAdminToast('error', 'Gagal', res?.message || 'Gagal memproses pengiriman batch.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  }
}

export {
  loadNotificationLogs,
  renderNotifLogsTable,
  handleDispatchSingle,
  handleBatchSendNotif
};
