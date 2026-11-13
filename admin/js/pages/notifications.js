import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';
import { renderWhatsAppWebConsoleHeader } from './whatsapp-web.js';

// =============================================================================
// NOTIFICATION & GATEWAY SETTINGS + WHATSAPP WEB QR
// =============================================================================
let waQrTimer = null;
let defaultEmailTemplates = null;

async function loadNotificationSettings() {
  try {
    const res = await fetchAdmin('/admin/notifications/settings');
    if (res && res.status === 'success' && res.data) {
      const d = res.data;
      defaultEmailTemplates = d.email_template_defaults || null;
      const chEl = document.getElementById('notifSettingChannel');
      if (chEl && d.notif_channel) chEl.value = d.notif_channel;
      const pdfEl = document.getElementById('notifSettingPdfChannel');
      if (pdfEl) pdfEl.value = d.pdf_delivery_channel || 'DISABLED';

      const modeEl = document.getElementById('notifSettingDispatchMode');
      if (modeEl && d.wa_dispatch_mode) modeEl.value = d.wa_dispatch_mode;

      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
      };

      setVal('notifSettingWaUrl', d.wa_gateway_url);
      setVal('notifSettingWaToken', d.wa_api_token);
      setVal('notifSettingWaSender', d.wa_sender_number);
      setVal('notifSettingSmtpHost', d.email_smtp_host);
      setVal('notifSettingSmtpPort', d.email_smtp_port);
      setVal('notifSettingSmtpUser', d.email_smtp_user);
      setVal('notifSettingSmtpPass', d.email_smtp_pass);
      setVal('notifSettingEmailFromName', d.email_from_name);
      setVal('notifSettingTemplatePaid', d.template_msg_paid);
      setVal('notifSettingTemplatePending', d.template_msg_pending);
      setVal('notifSettingTemplateCancel', d.template_msg_cancel);
      setVal('notifSettingEmailTemplatePaid', d.template_email_paid);
      setVal('notifSettingEmailTemplatePending', d.template_email_pending);
      setVal('notifSettingEmailTemplateCancel', d.template_email_cancel);

      // Render WhatsApp Web session info
      lastKnownWaStatus = d.wa_session?.status || null;
      renderWhatsAppSession(d.wa_session);
    }
  } catch (err) {
    showAdminToast('error', 'Gagal Memuat Pengaturan', err.message);
  }
}

function handleFillDefaultEmailTemplates() {
  if (!defaultEmailTemplates) {
    showAdminToast('error', 'Gagal', 'Template default belum dimuat. Buka kembali halaman konfigurasi notifikasi.');
    return;
  }
  const fields = [
    ['notifSettingEmailTemplatePaid', 'PAID'],
    ['notifSettingEmailTemplatePending', 'PENDING'],
    ['notifSettingEmailTemplateCancel', 'CANCEL'],
  ];
  let filled = 0;
  for (const [id, key] of fields) {
    const field = document.getElementById(id);
    if (field && !field.value.trim() && typeof defaultEmailTemplates[key] === 'string') {
      field.value = defaultEmailTemplates[key];
      filled++;
    }
  }
  showAdminToast('success', 'Template Default', filled
    ? `${filled} template kosong diisi. Simpan konfigurasi untuk menerapkan perubahan.`
    : 'Tidak ada template kosong yang perlu diisi.');
}

function renderWhatsAppSession(session) {
  const badgeContainer = document.getElementById('waSessionStatusBadge');
  const qrContainer = document.getElementById('waQrImageContainer');
  const qrCountdown = document.getElementById('waQrCountdown');
  const devInfo = document.getElementById('waDeviceInfo');
  const lastSync = document.getElementById('waLastSyncInfo');
  const btnDisconnect = document.getElementById('btnDisconnectWa');

  if (!session || session.status === 'DISCONNECTED') {
    if (badgeContainer) {
      badgeContainer.innerHTML = `
        <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-circle-xmark"></i> Terputus
        </span>
      `;
    }
    if (qrContainer) {
      qrContainer.innerHTML = `
        <div style="color: #64748B; padding: 30px 10px; font-size: 0.85rem;">
          <i class="fa-solid fa-qrcode" style="font-size: 3rem; margin-bottom: 10px; color: #94A3B8; display: block;"></i>
          ${session?.error ? escapeHtml(session.error) : 'Klik tombol <strong>"Generate QR Code"</strong> di samping untuk memulai sesi WhatsApp Web.'}
        </div>
      `;
    }
    if (qrCountdown) qrCountdown.style.display = 'none';
    if (devInfo) devInfo.textContent = 'Tidak ada nomor tertaut';
    if (lastSync) lastSync.textContent = 'Status: Belum Terkoneksi';
    if (btnDisconnect) btnDisconnect.style.display = 'none';
    return;
  }

  if (session.status === 'SCAN_QR') {
    if (badgeContainer) {
      badgeContainer.innerHTML = `
        <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-spinner fa-spin"></i> Menunggu Scan QR Code
        </span>
      `;
    }
    if (qrContainer && session.qrCodeUrl) {
      qrContainer.innerHTML = `
        <img src="${escapeHtml(session.qrCodeUrl)}" alt="WhatsApp Web QR Code" style="width: 220px; height: 220px; display: block; border-radius: 8px; margin: 0 auto; object-fit: contain;" />
      `;
    }
    if (qrCountdown) {
      qrCountdown.style.display = 'block';
      qrCountdown.innerHTML = `<i class="fa-solid fa-clock"></i> Buka WhatsApp &gt; <strong>Perangkat Tertaut (Linked Devices)</strong> &gt; Tautkan Perangkat &gt; Pindai QR.`;
    }
    if (devInfo) devInfo.textContent = 'Menunggu scan dari WhatsApp ponsel...';
    if (lastSync) lastSync.textContent = 'QR Code aktif dari server';
    if (btnDisconnect) btnDisconnect.style.display = 'inline-block';
    return;
  }

  if (session.status === 'CONNECTED') {
    if (badgeContainer) {
      badgeContainer.innerHTML = `
        <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-circle-check"></i> TERHUBUNG (WhatsApp Web Online)
        </span>
      `;
    }
    if (qrContainer) {
      qrContainer.innerHTML = `
        <div style="color: #10B981; padding: 25px 10px; font-size: 0.88rem; text-align: center;">
          <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; margin-bottom: 12px; color: #10B981; display: block;"></i>
          <strong>WhatsApp Web Aktif</strong><br>
          <span style="color: #64748B; font-size: 0.78rem;">Sesi siap digunakan untuk pengiriman tiket otomatis.</span>
        </div>
      `;
    }
    if (qrCountdown) qrCountdown.style.display = 'none';
    if (devInfo) {
      devInfo.innerHTML = `<span style="color: #10B981;"><i class="fa-solid fa-phone"></i> ${escapeHtml(session.connectedNumber || '+62 812-3456-7890')}</span> <small style="color:#64748B;">(${escapeHtml(session.deviceName || 'WhatsApp Web')})</small>`;
    }
    if (lastSync) {
      const syncDate = session.syncedAt ? new Date(session.syncedAt).toLocaleString('id-ID') : 'Hari ini';
      lastSync.textContent = `Tersinkronisasi sejak: ${syncDate}`;
    }
    if (btnDisconnect) btnDisconnect.style.display = 'inline-block';
  }
}

async function handleGenerateWaQr() {
  const btn = document.getElementById('btnGenerateWaQr');
  const originalHtml = btn?.innerHTML;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Membuat QR...';
  }

  try {
    const res = await fetchAdmin('/admin/notifications/whatsapp/qr', { method: 'POST' });
    if (res && res.status === 'success' && res.data) {
      renderWhatsAppSession(res.data);
      renderWhatsAppWebConsoleHeader(res.data);
      showAdminToast('success', 'QR Code Siap', 'Silakan buka WhatsApp di ponsel dan scan QR Code di layar.');
    } else {
      showAdminToast('error', 'Gagal', res?.message || 'Gagal menghasilkan QR code.');
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

async function handleDisconnectWa() {
  const confirmed = await showConfirmDialog({
    title: 'Putuskan Sesi WhatsApp?',
    message: 'Apakah Anda yakin ingin memutuskan (logout) sesi WhatsApp Web ini? Pengiriman otomatis via WhatsApp Web akan dijeda sampai Anda scan ulang.',
    confirmText: 'Ya, Putuskan Sesi',
    type: 'danger',
  });

  if (!confirmed) return;

  try {
    const res = await fetchAdmin('/admin/notifications/whatsapp/disconnect', { method: 'POST' });
    if (res && res.status === 'success' && res.data) {
      renderWhatsAppSession(res.data);
      renderWhatsAppWebConsoleHeader(res.data);
      showAdminToast('success', 'Sesi Diputuskan', 'Sesi WhatsApp Web telah berhasil keluar (logout).');
    }
  } catch (err) {
    showAdminToast('error', 'Gagal', err.message);
  }
}

// ==============================================================
// WHATSAPP AUTO DETECTOR (POLLING DETEKSI OTOMATIS SAAT SCAN)
// ==============================================================
let lastKnownWaStatus = null;

function handleRealtimeWhatsAppSession(session) {
  const previousStatus = lastKnownWaStatus;
  lastKnownWaStatus = session.status;
  renderWhatsAppSession(session);
  renderWhatsAppWebConsoleHeader(session);

  if (previousStatus === 'SCAN_QR' && session.status === 'CONNECTED') {
    showAdminToast('success', 'WhatsApp Terhubung Otomatis!', `Perangkat ${session.connectedNumber || ''} berhasil diverifikasi dan siap kirim.`);
  }
}

async function handleNotificationSettingsSubmit(e) {
  e.preventDefault();
  const getVal = (id) => (document.getElementById(id)?.value || '').trim();

  const settings = {
    notif_channel: document.getElementById('notifSettingChannel')?.value || 'WA',
    pdf_delivery_channel: document.getElementById('notifSettingPdfChannel')?.value || 'DISABLED',
    wa_dispatch_mode: document.getElementById('notifSettingDispatchMode')?.value || 'AUTO',
    email_smtp_host: getVal('notifSettingSmtpHost'),
    email_smtp_port: getVal('notifSettingSmtpPort'),
    email_smtp_user: getVal('notifSettingSmtpUser'),
    email_smtp_pass: getVal('notifSettingSmtpPass'),
    email_from_name: getVal('notifSettingEmailFromName'),
    template_msg_paid: getVal('notifSettingTemplatePaid'),
    template_msg_pending: getVal('notifSettingTemplatePending'),
    template_msg_cancel: getVal('notifSettingTemplateCancel'),
    template_email_paid: getVal('notifSettingEmailTemplatePaid'),
    template_email_pending: getVal('notifSettingEmailTemplatePending'),
    template_email_cancel: getVal('notifSettingEmailTemplateCancel'),
  };

  const btn = document.getElementById('btnSaveNotifSettings');
  const originalText = btn?.innerHTML;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
  }

  try {
    const res = await fetchAdmin('/admin/notifications/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Berhasil', 'Seluruh konfigurasi notifikasi, mode pengiriman & template pesan berhasil disimpan.');
    } else {
      showAdminToast('error', 'Gagal Menyimpan', res?.message || 'Terjadi kesalahan.');
    }
  } catch (err) {
    showAdminToast('error', 'Gagal', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

async function handleSendTestNotif() {
  const channel = document.getElementById('testNotifChannel')?.value || 'WA';
  const targetPhone = (document.getElementById('testNotifTarget')?.value || '').trim();
  const message = (document.getElementById('testNotifMessage')?.value || '').trim();

  if (!targetPhone) {
    showAdminToast('warning', 'Validasi Gagal', 'Harap isi nomor WhatsApp atau alamat Email tujuan uji coba.');
    return;
  }

  const btn = document.getElementById('btnSendTestNotif');
  const originalText = btn?.innerHTML;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
  }

  try {
    const res = await fetchAdmin('/admin/notifications/test', {
      method: 'POST',
      body: JSON.stringify({ channel, targetPhone, targetEmail: targetPhone, message }),
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Uji Coba Berhasil', res.message || 'Pesan tes berhasil dikirim!');
    } else {
      showAdminToast('error', 'Uji Coba Gagal', res?.message || 'Gagal mengirim pesan pengujian.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

export {
  loadNotificationSettings,
  renderWhatsAppSession,
  handleGenerateWaQr,
  handleDisconnectWa,
  handleRealtimeWhatsAppSession,
  handleNotificationSettingsSubmit,
  handleFillDefaultEmailTemplates,
  handleSendTestNotif
};
