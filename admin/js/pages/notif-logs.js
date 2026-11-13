import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';
import { applyRbacUi } from '../core/rbac.js';

// =============================================================================
// LOG PENGIRIMAN NOTIFIKASI & STATUS PESERTA (BARU)
// =============================================================================
let notifLogsState = {
  items: [],
  stats: {},
};

const channelLabels = { WA: 'WhatsApp', EMAIL: 'Email', BOTH: 'WA + Email', DISABLED: 'Nonaktif' };

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
  const channel = notifLogsState.stats.notificationChannel;
  const channelLabel = channelLabels[channel] || 'Tidak tersedia';
  const canSendPdf = ['WA', 'EMAIL', 'BOTH'].includes(channel);

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
    const pdfStatus = channel => {
      const delivery = (it.pdfDeliveries || []).find(item => item.channel === channel);
      if (!delivery) return '';
      const labels = { PENDING: 'Antrean', PROCESSING: 'Membuat PDF', SENDING: 'Mengirim', SENT: 'Terkirim', FAILED: 'Gagal / periksa' };
      return `<div style="font-size:0.72rem;margin-top:4px;" title="${escapeHtml(delivery.error || '')}">PDF: ${escapeHtml(labels[delivery.status] || delivery.status)}${delivery.error ? ` - ${escapeHtml(delivery.error)}` : ''}</div>`;
    };

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
        <td data-label="No">${idx + 1}</td>
        <td data-label="Order ID"><code>${escapeHtml(it.midtransOrderId || it.orderId.slice(0, 10))}</code></td>
        <td data-label="Peserta"><strong>${escapeHtml(it.customerName)}</strong></td>
        <td data-label="Kontak">
          <div style="font-size: 0.82rem;">
            <div><i class="fa-brands fa-whatsapp" style="color: #25D366;"></i> ${escapeHtml(it.customerPhone)}</div>
            <div style="color: #64748B; font-size: 0.76rem;"><i class="fa-solid fa-envelope" style="color: #38BDF8;"></i> ${escapeHtml(it.customerEmail)}</div>
          </div>
        </td>
        <td data-label="Kategori & BIB">
          <span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;">${escapeHtml(it.ticketCategory)}</span>
          <div style="font-size: 0.74rem; color: #64748B; margin-top: 2px;">BIB: ${escapeHtml(it.bibNumbers)}</div>
        </td>
        <td data-label="Pembayaran">${payBadge}</td>
        <td data-label="WhatsApp"><div>${waBadge}${pdfStatus('WA')}</div></td>
        <td data-label="Email"><div>${emailBadge}${pdfStatus('EMAIL')}</div></td>
        <td data-label="Waktu terkirim" style="font-size: 0.78rem;">${sentTime}</td>
        <td data-label="Aksi" class="notif-log-cell-actions">
          <div class="notif-log-row-actions">
            <div class="notif-log-send-box" data-permission="notifications:dispatch">
              <span class="notif-log-channel">Kirim via ${escapeHtml(channelLabel)}</span>
              <div class="notif-log-send-buttons">
                <button class="btn btn-sm btn-secondary btn-dispatch-single" data-id="${escapeHtml(it.orderId)}" data-name="${escapeHtml(it.customerName)}" title="Kirim notifikasi sesuai konfigurasi">
                  <i class="fa-solid fa-paper-plane"></i> Notifikasi
                </button>
                <button type="button" class="btn btn-secondary btn-sm btn-dispatch-pdf" data-index="${idx}" ${isPaid && canSendPdf ? '' : 'disabled'} title="${!isPaid ? 'PDF hanya tersedia untuk pesanan lunas' : canSendPdf ? 'Kirim PDF sesuai saluran notifikasi aktif' : 'Aktifkan saluran notifikasi di konfigurasi'}">
                  <i class="fa-solid fa-file-arrow-up"></i> PDF
                </button>
              </div>
            </div>
            <a href="/e-ticket.html?orderId=${encodeURIComponent(it.orderId)}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm notif-log-view" title="Buka pratinjau E-Tiket">
              <i class="fa-solid fa-eye"></i> Preview
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
  document.querySelectorAll('.btn-dispatch-pdf').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items[Number(btn.dataset.index)];
      if (item && canSendPdf) handleDispatchPdf(item, channel, btn);
    });
  });
  applyRbacUi(adminState.profile);
}

async function handleDispatchPdf(item, channel, btnEl) {
  const original = btnEl.innerHTML;
  btnEl.disabled = true;
  const targets = channel === 'BOTH' ? ['WA', 'EMAIL'] : [channel];
  const retry = (item.pdfDeliveries || []).filter(delivery =>
    targets.includes(delivery.channel) && ['SENT', 'FAILED'].includes(delivery.status));
  const retryWarning = retry.length
    ? ' Ada PDF yang sudah terkirim atau gagal. Pengiriman sebelumnya mungkin sudah diterima dan mengirim ulang dapat menghasilkan duplikat; periksa status dan penerima terlebih dahulu.'
    : '';
  try {
    const confirmed = await showConfirmDialog({
      title: 'Kirim PDF E-Tiket?',
      message: `PDF untuk ${item.customerName} akan dikirim ke kontak pembeli melalui ${channel === 'BOTH' ? 'WhatsApp dan email' : channel === 'WA' ? 'WhatsApp' : 'email'}.${retryWarning}`,
      confirmText: retry.length ? 'Ya, Kirim Ulang' : 'Ya, Antrekan PDF',
      type: 'warning',
    });
    if (!confirmed) return;
    btnEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses';
    const res = await fetchAdmin('/admin/notifications/dispatch-pdf', {
      method: 'POST',
      body: JSON.stringify({ orderId: item.orderId, channel, confirmResend: retry.length > 0 }),
    });
    if (res?.status === 'success') {
      showAdminToast('success', 'Permintaan PDF Diproses', escapeHtml(res.message));
      await loadNotificationLogs({ showLoading: false });
    } else {
      showAdminToast('error', 'Gagal Mengirim PDF', escapeHtml(res?.message || 'Gagal memasukkan PDF ke antrean.'));
      await loadNotificationLogs({ showLoading: false });
    }
  } catch (error) {
    showAdminToast('error', 'Kesalahan', escapeHtml(error.message));
  } finally {
    btnEl.disabled = false;
    btnEl.innerHTML = original;
  }
}

async function handleDispatchSingle(orderId, name, btnEl) {
  const original = btnEl?.innerHTML;
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
      showAdminToast('success', 'Diproses', res.message || `Permintaan untuk ${name || 'peserta'} diproses.`);
      loadNotificationLogs();
    } else {
      showAdminToast('error', 'Gagal Mengirim', res?.message || 'Pengiriman notifikasi gagal.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan', err.message);
  } finally {
    if (btnEl) {
      btnEl.disabled = false;
      btnEl.innerHTML = original;
    }
  }
}

async function handleBatchSendNotif() {
  const confirmed = await showConfirmDialog({
    title: 'Kirim Notifikasi Massal?',
    message: 'Kirim notifikasi untuk maksimal 50 pesanan terbaru. PDF yang gagal akan diantrikan lagi. Periksa dulu status pengiriman yang tidak pasti agar tidak terjadi pengiriman ganda.',
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
