import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog } from '../core/utils.js';

let previewInterval = null;

async function loadGlobalSettings() {
  try {
    const res = await fetchAdmin('/settings/countdown');
    if (res.status === 'success') {
      adminState.globalSettings = res.data;
      renderGlobalSettings(res.data);
    }
  } catch (err) {
    console.warn('Gagal memuat pengaturan global:', err);
  }
}

function updateCountdownPreview(isoDate) {
  const previewEl = document.getElementById('adminCountdownLivePreview');
  if (!previewEl) return;

  if (previewInterval) {
    clearInterval(previewInterval);
    previewInterval = null;
  }

  if (!isoDate) {
    previewEl.innerHTML = '<span style="color: #f59e0b;"><i class="fa-solid fa-clock-rotate-left"></i> TANGGAL BELUM DITENTUKAN</span> — Tampilan di website menampilkan placeholder status -- Hari -- Jam.';
    return;
  }

  const targetTime = new Date(isoDate).getTime();
  const tick = () => {
    const now = Date.now();
    const diff = targetTime - now;
    if (diff <= 0) {
      previewEl.innerHTML = '<span style="color: #ef4444;"><i class="fa-solid fa-flag-checkered"></i> RACE DAY SUDAH LEWAT / SEDANG BERLANGSUNG</span>';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    previewEl.innerHTML = `<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> AKTIF:</span> ${days} Hari : ${hours} Jam : ${minutes} Menit : ${seconds} Detik (${new Date(isoDate).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })} WIB)`;
  };

  tick();
  previewInterval = setInterval(tick, 1000);
}

function renderGlobalSettings(settings) {
  const input = document.getElementById('globalCountdownInput');
  const badge = document.getElementById('globalStatusBadge');
  const toggleBtn = document.getElementById('btnToggleGlobalClosed');

  if (input) {
    if (settings.eventCountdownDate) {
      const d = new Date(settings.eventCountdownDate);
      const pad = (n) => String(n).padStart(2, '0');
      input.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } else {
      input.value = '';
    }
  }

  updateCountdownPreview(settings.eventCountdownDate);

  if (badge) {
    if (settings.isRegistrationClosed) {
      badge.className = 'event-status-tag closed';
      badge.innerHTML = '<i class="fa-solid fa-lock"></i> Pendaftaran Resmi Ditutup';
    } else {
      badge.className = 'event-status-tag open';
      badge.innerHTML = '<i class="fa-solid fa-signal"></i> Pendaftaran Aktif / Buka';
    }
  }

  if (toggleBtn) {
    if (settings.isRegistrationClosed) {
      toggleBtn.className = 'btn btn-secondary btn-sm';
      toggleBtn.innerHTML = '<i class="fa-solid fa-lock-open"></i> Buka Kembali Pendaftaran';
    } else {
      toggleBtn.className = 'btn btn-outline btn-sm';
      toggleBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Tutup Seluruh Pendaftaran';
    }
  }
}

async function handleSaveGlobalCountdown() {
  const input = document.getElementById('globalCountdownInput');
  if (!input || !input.value) {
    showAdminToast('warning', 'Peringatan', 'Harap tentukan tanggal dan waktu countdown, atau klik tombol Belum Ditentukan.');
    return;
  }

  const isoDate = new Date(input.value).toISOString();

  try {
    const res = await fetchAdmin('/admin/settings/countdown', {
      method: 'PUT',
      body: JSON.stringify({
        eventCountdownDate: isoDate,
        isRegistrationClosed: adminState.globalSettings?.isRegistrationClosed || false
      })
    });

    if (res.status === 'success') {
      adminState.globalSettings.eventCountdownDate = isoDate;
      updateCountdownPreview(isoDate);
      showAdminToast('success', 'Tersimpan', 'Tanggal target race day berhasil diperbarui di database!');
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function handleResetGlobalCountdown() {
  const confirmed = await showConfirmDialog({
    title: 'Kosongkan Tanggal Countdown?',
    message: 'Apakah Anda yakin ingin mengosongkan tanggal hitung mundur? Landing page akan menampilkan status "TANGGAL BELUM DITENTUKAN".',
    confirmText: 'Ya, Kosongkan Tanggal',
    type: 'warning'
  });

  if (!confirmed) return;

  try {
    const res = await fetchAdmin('/admin/settings/countdown', {
      method: 'PUT',
      body: JSON.stringify({
        eventCountdownDate: null,
        isRegistrationClosed: adminState.globalSettings?.isRegistrationClosed || false
      })
    });

    if (res.status === 'success') {
      adminState.globalSettings.eventCountdownDate = null;
      const input = document.getElementById('globalCountdownInput');
      if (input) input.value = '';
      updateCountdownPreview(null);
      showAdminToast('success', 'Dikosongkan', 'Tanggal target race day telah dikosongkan. Landing page menampilkan status belum ditentukan.');
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function handleToggleGlobalClosed() {
  const currentStatus = adminState.globalSettings?.isRegistrationClosed || false;
  const newStatus = !currentStatus;

  const confirmed = await showConfirmDialog({
    title: newStatus ? 'Tutup Seluruh Pendaftaran?' : 'Buka Kembali Pendaftaran?',
    message: newStatus 
      ? 'Apakah Anda yakin ingin MENUTUP seluruh pendaftaran website? Calon peserta tidak akan dapat mendaftar lagi.'
      : 'Apakah Anda ingin MEMBUKA KEMBALI seluruh pendaftaran website?',
    confirmText: newStatus ? 'Ya, Tutup Pendaftaran' : 'Ya, Buka Pendaftaran',
    type: newStatus ? 'danger' : 'warning'
  });

  if (!confirmed) return;

  try {
    const res = await fetchAdmin('/admin/settings/countdown', {
      method: 'PUT',
      body: JSON.stringify({
        eventCountdownDate: adminState.globalSettings?.eventCountdownDate || null,
        isRegistrationClosed: newStatus
      })
    });

    if (res.status === 'success') {
      adminState.globalSettings.isRegistrationClosed = newStatus;
      renderGlobalSettings(adminState.globalSettings);
      showAdminToast('success', 'Status Berubah', newStatus ? 'Pendaftaran resmi DITUTUP!' : 'Pendaftaran resmi DIBUKA!');
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

export {
  loadGlobalSettings,
  renderGlobalSettings,
  handleSaveGlobalCountdown,
  handleResetGlobalCountdown,
  handleToggleGlobalClosed
};
