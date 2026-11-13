import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';

// ==============================================================
// WHATSAPP WEB CONSOLE & LIVE MESSENGER
// ==============================================================
let waWebContacts = [];
let waActiveContact = null;

function initWhatsAppStatusDrawer() {
  const drawer = document.getElementById('waStatusDrawer');
  const button = document.getElementById('btnToggleWaStatus');
  const panel = document.getElementById('waStatusPanel');
  if (!drawer || !button || !panel) return;
  const setOpen = open => {
    drawer.classList.toggle('is-open', open);
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', `${open ? 'Tutup' : 'Buka'} panel koneksi WhatsApp`);
  };
  button.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
  drawer.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });
}

async function loadWhatsAppWebConsole() {
  const container = document.getElementById('waContactListContainer');
  if (container) {
    container.innerHTML = `
      <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--color-primary); display: block;"></i>
        Menghubungkan konsol WhatsApp Web...
      </div>
    `;
  }

  try {
    const sessionRes = await fetchAdmin('/admin/notifications/whatsapp/session');
    if (sessionRes && sessionRes.status === 'success' && sessionRes.data) {
      renderWhatsAppWebConsoleHeader(sessionRes.data);
    }

    const logsRes = await fetchAdmin('/admin/notifications/logs');
    if (logsRes && logsRes.status === 'success' && logsRes.data) {
      waWebContacts = logsRes.data.items || [];
      renderWhatsAppWebContactList(waWebContacts);
      const selected = waWebContacts.find(contact => contact.orderId === waActiveContact?.orderId);
      if (selected || waWebContacts.length > 0) selectWhatsAppContact(selected || waWebContacts[0]);
    }
  } catch (err) {
    console.warn('Gagal memuat konsol WhatsApp Web:', err);
    if (container) {
      container.innerHTML = `<div style="padding: 20px; text-align: center; color: #EF4444; font-size: 0.85rem;">Gagal memuat kontak: ${escapeHtml(err.message)}</div>`;
    }
  }
}

function renderWhatsAppWebConsoleHeader(session) {
  const headerStatus = document.getElementById('waWebHeaderStatus');
  const myNum = document.getElementById('waWebMyNumber');
  const myStatusText = document.getElementById('waWebMyStatusText');

  if (!session || session.status === 'DISCONNECTED') {
    if (headerStatus) {
      headerStatus.innerHTML = `
        <span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; padding: 6px 14px; font-weight: 700;">
          <i class="fa-solid fa-circle-xmark"></i> Status: Terputus
        </span>
      `;
    }
    if (myNum) myNum.textContent = 'WhatsApp Belum Terhubung';
    if (myStatusText) {
      myStatusText.innerHTML = `<span style="width: 7px; height: 7px; background: #DC2626; border-radius: 50%; display: inline-block;"></span> ${escapeHtml(session?.error || 'Offline (Klik Scan QR)')}`;
      myStatusText.style.color = '#DC2626';
    }
    return;
  }

  if (session.status === 'SCAN_QR') {
    if (headerStatus) {
      headerStatus.innerHTML = `
        <span class="badge" style="background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; padding: 6px 14px; font-weight: 700;">
          <i class="fa-solid fa-spinner fa-spin"></i> Menunggu Scan QR di Ponsel
        </span>
      `;
    }
    if (myNum) myNum.textContent = 'Menunggu Scan Ponsel...';
    if (myStatusText) {
      myStatusText.innerHTML = '<span style="width: 7px; height: 7px; background: #F59E0B; border-radius: 50%; display: inline-block;"></span> Pindai Kode QR';
      myStatusText.style.color = '#F59E0B';
    }
    return;
  }

  if (session.status === 'CONNECTED') {
    if (headerStatus) {
      headerStatus.innerHTML = `
        <span class="badge" style="background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; padding: 6px 14px; font-weight: 700;">
          <i class="fa-solid fa-circle-check"></i> Gateway Aktif (${session.connectedNumber || 'Online'})
        </span>
      `;
    }
    if (myNum) myNum.textContent = session.connectedNumber || 'Server WhatsApp Web';
    if (myStatusText) {
      myStatusText.innerHTML = '<span style="width: 7px; height: 7px; background: #22C55E; border-radius: 50%; display: inline-block;"></span> Online &amp; Terhubung';
      myStatusText.style.color = '#22C55E';
    }
  }
}

function renderWhatsAppWebContactList(contacts) {
  const container = document.getElementById('waContactListContainer');
  if (!container) return;

  if (!contacts || contacts.length === 0) {
    container.innerHTML = `
      <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        Tidak ada kontak peserta ditemukan.
      </div>
    `;
    return;
  }

  container.innerHTML = contacts.map(c => {
    const isSelected = waActiveContact && waActiveContact.orderId === c.orderId;
    const initial = (c.customerName || 'P').charAt(0).toUpperCase();
    const isPaid = c.orderStatus === 'SETTLEMENT' || c.orderStatus === 'CAPTURE';
    const badgeColor = isPaid ? '#10B981' : '#F59E0B';
    const badgeBg = isPaid ? '#ECFDF5' : '#FFFBEB';
    const badgeText = isPaid ? 'LUNAS' : (c.orderStatus || 'PENDING');

    return `
      <div class="wa-contact-card ${isSelected ? 'active' : ''}" onclick="selectWhatsAppContactByOrderId('${c.orderId}')">
        <div class="wa-avatar" style="width: 38px; height: 38px; font-size: 0.85rem; background: ${isPaid ? '#22C55E' : '#64748B'};">
          ${initial}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <div style="font-weight: 700; font-size: 0.88rem; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(c.customerName)}
            </div>
            <span style="font-size: 0.68rem; background: ${badgeBg}; color: ${badgeColor}; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
              ${badgeText}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #64748B;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(c.ticketName)} • ${escapeHtml(c.customerPhone)}
            </span>
            ${c.whatsappSent ? '<i class="fa-solid fa-check-double" style="color: #38BDF8; font-size: 0.75rem;" title="Terkirim via WhatsApp"></i>' : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.selectWhatsAppContactByOrderId = function(orderId) {
  const contact = waWebContacts.find(c => c.orderId === orderId);
  if (contact) selectWhatsAppContact(contact);
};

function selectWhatsAppContact(c) {
  waActiveContact = c;
  renderWhatsAppWebContactList(waWebContacts);

  const activeName = document.getElementById('waActiveName');
  const activePhone = document.getElementById('waActivePhone');
  const activeBadge = document.getElementById('waActiveBadge');
  const activeAvatar = document.getElementById('waActiveAvatar');
  const chatMessagesBox = document.getElementById('waChatMessagesBox');

  if (activeName) activeName.textContent = c.customerName;
  if (activePhone) activePhone.textContent = c.customerPhone;
  if (activeAvatar) activeAvatar.textContent = (c.customerName || 'P').charAt(0).toUpperCase();

  const isPaid = c.orderStatus === 'SETTLEMENT' || c.orderStatus === 'CAPTURE';
  if (activeBadge) {
    activeBadge.innerHTML = `
      <span class="badge" style="background: ${isPaid ? '#ECFDF5' : '#FFFBEB'}; color: ${isPaid ? '#059669' : '#D97706'}; font-size: 0.7rem; padding: 2px 8px;">
        ${escapeHtml(c.ticketName)} • ${isPaid ? 'Lunas' : 'Belum Bayar'}
      </span>
    `;
  }

  if (chatMessagesBox) void loadWhatsAppHistory(c.orderId);
}

let historyRequest = 0;
async function loadWhatsAppHistory(orderId) {
  const box = document.getElementById('waChatMessagesBox');
  if (!box) return;
  const request = ++historyRequest;
  box.textContent = 'Memuat riwayat pesan...';
  try {
    const res = await fetchAdmin(`/admin/notifications/whatsapp/history/${encodeURIComponent(orderId)}`);
    if (request !== historyRequest || waActiveContact?.orderId !== orderId) return;
    if (res?.status !== 'success' || !Array.isArray(res.data?.items)) throw new Error(res?.message || 'Gagal memuat riwayat.');
    const items = res.data.items;
    box.innerHTML = `<div class="wa-system-pill">Maksimal 100 pesan keluar terbaru. Pesan lama sebelum fitur ini dan pesan masuk tidak tersedia.</div>` +
      (items.length ? items.map(item => {
        const data = item.metadata || {};
        const status = data.status === 'SENT' ? 'Diterima gateway' : 'Status tidak pasti; periksa WhatsApp';
        const time = new Date(item.createdAt).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
        return `<div class="wa-bubble wa-bubble-out">${data.kind === 'PDF' ? '<i class="fa-solid fa-file-pdf"></i> ' : ''}${escapeHtml(data.message || '').replace(/\n/g, '<br>')}<div class="wa-bubble-time">${escapeHtml(time)} &bull; ${escapeHtml(status)}</div></div>`;
      }).join('') : '<p class="wa-history-empty">Belum ada riwayat pesan keluar untuk pesanan ini.</p>');
    box.scrollTop = box.scrollHeight;
  } catch (error) {
    if (request !== historyRequest || waActiveContact?.orderId !== orderId) return;
    box.innerHTML = `<p class="wa-history-empty">Gagal memuat riwayat: ${escapeHtml(error.message)}</p>`;
  }
}

async function handleClearWaConsole() {
  if (!waActiveContact) {
    showAdminToast('warning', 'Pilih Peserta', 'Pilih peserta terlebih dahulu.');
    return;
  }
  const orderId = waActiveContact.orderId;
  const confirmed = await showConfirmDialog({
    title: 'Bersihkan Console?',
    message: `Hapus riwayat console untuk ${waActiveContact.customerName}? Pesan di WhatsApp tidak akan dihapus.`,
    confirmText: 'Ya, Bersihkan',
    type: 'danger',
  });
  if (!confirmed) return;
  const button = document.getElementById('btnClearWaConsole');
  if (button) button.disabled = true;
  try {
    const res = await fetchAdmin(`/admin/notifications/whatsapp/history/${encodeURIComponent(orderId)}`, { method: 'DELETE' });
    if (res?.status !== 'success') throw new Error(res?.message || 'Gagal membersihkan console.');
    showAdminToast('success', 'Console Dibersihkan', escapeHtml(res.message));
    if (waActiveContact?.orderId === orderId) await loadWhatsAppHistory(orderId);
  } catch (error) {
    showAdminToast('error', 'Gagal', escapeHtml(error.message));
  } finally {
    if (button) button.disabled = false;
  }
}

async function handleSendDirectWaMessage() {
  const input = document.getElementById('waDirectChatInput');
  const msg = input?.value?.trim();
  if (!msg) {
    showAdminToast('warning', 'Pesan Kosong', 'Tuliskan teks pesan WhatsApp terlebih dahulu.');
    return;
  }
  if (!waActiveContact || !waActiveContact.customerPhone) {
    showAdminToast('warning', 'Pilih Peserta', 'Pilih kontak peserta terlebih dahulu dari daftar di sebelah kiri.');
    return;
  }
  const orderId = waActiveContact.orderId;

  const btn = document.getElementById('btnSendWaDirectMsg');
  const originalHtml = btn?.innerHTML;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  }

  try {
    const res = await fetchAdmin('/admin/notifications/whatsapp/send-direct', {
      method: 'POST',
      body: JSON.stringify({
        orderId,
        message: msg
      })
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Diproses', 'Pesan diterima gateway WhatsApp.');
      if (input && waActiveContact?.orderId === orderId) input.value = '';
      if (waActiveContact?.orderId === orderId) await loadWhatsAppHistory(orderId);
    } else {
      showAdminToast('error', 'Gagal Kirim', escapeHtml(res?.message || 'Gagal mengirim pesan.'));
      if (waActiveContact?.orderId === orderId) await loadWhatsAppHistory(orderId);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan', escapeHtml(err.message));
    if (waActiveContact?.orderId === orderId) await loadWhatsAppHistory(orderId);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  }
}

function handleWaTemplateChange() {
  const select = document.getElementById('waQuickTemplateSelect');
  const input = document.getElementById('waDirectChatInput');
  if (!select || !input) return;
  const val = select.value;
  if (!val) return;

  const c = waActiveContact || {
    customerName: 'Peserta',
    ticketName: 'Tegal Run 2026',
    midtransOrderId: 'TR-ORD-001',
    bibNumbers: '10K-001',
    totalAmount: 250000
  };

  if (val === 'PAID_TICKET') {
    input.value = `Halo ${c.customerName},\n\nPembayaran tiket ${c.ticketName} (Order ID: ${c.midtransOrderId || c.orderId}) telah BERHASIL diverifikasi ✅.\n\nNomor BIB: ${c.bibNumbers || '-'}\nTotal: Rp${(c.totalAmount || 0).toLocaleString('id-ID')}\n\nE-Tiket resmi Anda siap digunakan untuk pengambilan Race Pack. Simpan bukti ini dengan baik. Sampai jumpa di Race Day Tegal Run 2026! 🏃‍♂️🔥`;
  } else if (val === 'PENDING_INVOICE') {
    input.value = `Halo ${c.customerName},\n\nPesanan tiket ${c.ticketName} Anda (Order ID: ${c.midtransOrderId || c.orderId}) masih menunggu pembayaran ⏳.\n\nTotal Tagihan: Rp${(c.totalAmount || 0).toLocaleString('id-ID')}\n\nMohon selesaikan pembayaran sebelum batas waktu berakhir agar slot Anda tidak dibatalkan otomatis oleh sistem. Terima kasih!`;
  } else if (val === 'RACEPACK_INFO') {
    input.value = `Halo ${c.customerName},\n\nPengambilan Race Pack (BIB, Jersey & Goodie Bag) Tegal Run 2026 akan dilaksanakan pada:\n📅 H-2 & H-1 Race Day\n📍 Race Village Alun-Alun Kota Tegal\n⏰ 09.00 - 18.00 WIB\n\nTunjukkan E-Tiket & KTP asli saat pengambilan. Terima kasih!`;
  } else if (val === 'THANK_YOU') {
    input.value = `Halo ${c.customerName},\n\nTerima kasih telah menjadi bagian dari Tegal Run 2026! Semangat berlatih dan jaga kesehatan menuju garis start. Jika membutuhkan bantuan, hubungi kami di sini. Salam Pelari! 🏅`;
  }
}

async function handleQuickDispatchTicket(type) {
  if (!waActiveContact) {
    showAdminToast('warning', 'Pilih Peserta', 'Pilih kontak peserta terlebih dahulu.');
    return;
  }

  const contact = waActiveContact;
  try {
    const res = await fetchAdmin('/admin/notifications/dispatch-single', {
      method: 'POST',
      body: JSON.stringify({ orderId: contact.orderId })
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Diproses', 'Notifikasi diproses. Periksa riwayat dan status pengiriman.');
      contact.whatsappSent = res.data?.whatsappSent === true;
      renderWhatsAppWebContactList(waWebContacts);
      if (waActiveContact?.orderId === contact.orderId) selectWhatsAppContact(contact);
    } else {
      showAdminToast('error', 'Gagal Kirim', escapeHtml(res?.message || 'Gagal mengirim notifikasi.'));
      if (waActiveContact?.orderId === contact.orderId) await loadWhatsAppHistory(contact.orderId);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan', escapeHtml(err.message));
  }
}


export {
  initWhatsAppStatusDrawer,
  loadWhatsAppWebConsole,
  renderWhatsAppWebConsoleHeader,
  renderWhatsAppWebContactList,
  selectWhatsAppContact,
  handleSendDirectWaMessage,
  handleWaTemplateChange,
  handleQuickDispatchTicket,
  handleClearWaConsole,
  waWebContacts
};
