import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog } from '../core/utils.js';

let previewInterval = null;

/**
 * Memuat pengaturan countdown global dari server
 */
async function loadGlobalSettings() {
  try {
    // Konsisten menggunakan endpoint admin
    const res = await fetchAdmin('/admin/settings/countdown');
    if (res && (res.status === 'success' || res.success)) {
      const settingsData = res.data || res.settings || {};
      adminState.globalSettings = settingsData;
      renderGlobalSettings(settingsData);
    }
  } catch (err) {
    console.warn('Gagal memuat pengaturan global:', err);
  }
}

/**
 * Memperbarui tampilan preview countdown secara realtime di dashboard admin
 */
function updateCountdownPreview(isoDate) {
  const previewEl = document.getElementById('adminCountdownLivePreview');
  if (!previewEl) return;

  // Hentikan interval lama jika ada
  if (previewInterval) {
    clearInterval(previewInterval);
    previewInterval = null;
  }

  if (!isoDate) {
    previewEl.innerHTML = '<span style="color: #f59e0b;"><i class="fa-solid fa-clock-rotate-left"></i> TANGGAL BELUM DITENTUKAN</span> — Tampilan di website akan menampilkan status placeholder.';
    return;
  }

  const targetTime = new Date(isoDate).getTime();

  if (isNaN(targetTime)) {
    previewEl.innerHTML = '<span style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> FORMAT TANGGAL TIDAK VALID</span>';
    return;
  }

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

    const formattedDateStr = new Date(isoDate).toLocaleString('id-ID', { 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });

    previewEl.innerHTML = `<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> AKTIF:</span> ${days} Hari : ${hours} Jam : ${minutes} Menit : ${seconds} Detik (${formattedDateStr} WIB)`;
  };

  tick();
  previewInterval = setInterval(tick, 1000);
}

/**
 * Merender elemen-elemen UI form pengaturan global admin
 */
function renderGlobalSettings(settings = {}) {
  const input = document.getElementById('globalCountdownInput');
  const badge = document.getElementById('globalStatusBadge');
  const toggleBtn = document.getElementById('btnToggleGlobalClosed');

  if (input) {
    if (settings.eventCountdownDate) {
      const d = new Date(settings.eventCountdownDate);
      if (!isNaN(d.getTime())) {
        const pad = (n) => String(n).padStart(2, '0');
        input.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
      } else {
        input.value = '';
      }
    } else {
      input.value = '';
    }

    // Pasang listener input agar preview ter-update langsung saat tanggal diubah pengguna
    input.removeEventListener('change', handleInputChangePreview);
    input.addEventListener('change', handleInputChangePreview);
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

/**
 * Handler internal saat input tanggal diubah secara manual di Form
 */
function handleInputChangePreview(e) {
  const val = e.target.value;
  if (!val) {
    updateCountdownPreview(null);
  } else {
    updateCountdownPreview(new Date(val).toISOString());
  }
}

/**
 * Menyimpan tanggal target countdown baru ke server
 */
async function handleSaveGlobalCountdown() {
  const input = document.getElementById('globalCountdownInput');
  if (!input || !input.value) {
    showAdminToast('warning', 'Peringatan', 'Harap tentukan tanggal dan waktu countdown terlebih dahulu.');
    return;
  }

  const parsedDate = new Date(input.value);
  if (Number.isNaN(parsedDate.getTime())) {
    showAdminToast('warning', 'Tanggal Tidak Valid', 'Periksa kembali tanggal dan waktu Race Day.');
    return;
  }
  const isoDate = parsedDate.toISOString();
  const button = document.getElementById('btnSaveGlobalCountdown');
  const originalButtonHtml = button?.innerHTML;
  if (button) {
    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
  }

  try {
    const isClosed = adminState.globalSettings?.isRegistrationClosed || false;

    const res = await fetchAdmin('/admin/settings/countdown', {
      method: 'PUT',
      body: JSON.stringify({
        eventCountdownDate: isoDate,
        isRegistrationClosed: isClosed
      })
    });

    if (res && (res.status === 'success' || res.success)) {
      if (!adminState.globalSettings) adminState.globalSettings = {};
      adminState.globalSettings = { ...adminState.globalSettings, ...res.data };

      renderGlobalSettings(adminState.globalSettings);
      showAdminToast('success', 'Tersimpan', 'Tanggal target race day berhasil diperbarui!');
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Gagal menyimpan pengaturan countdown.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  } finally {
    if (button) {
      button.disabled = false;
      button.innerHTML = originalButtonHtml;
    }
  }
}

/**
 * Mengosongkan tanggal target countdown
 */
async function handleResetGlobalCountdown() {
  const confirmed = await showConfirmDialog({
    title: 'Kosongkan Tanggal Countdown?',
    message: 'Apakah Anda yakin ingin mengosongkan tanggal hitung mundur? Landing page akan menampilkan status "TANGGAL BELUM DITENTUKAN".',
    confirmText: 'Ya, Kosongkan Tanggal',
    type: 'warning'
  });

  if (!confirmed) return;

  try {
    const isClosed = adminState.globalSettings?.isRegistrationClosed || false;

    const res = await fetchAdmin('/admin/settings/countdown', {
      method: 'PUT',
      body: JSON.stringify({
        eventCountdownDate: null,
        isRegistrationClosed: isClosed
      })
    });

    if (res && (res.status === 'success' || res.success)) {
      if (!adminState.globalSettings) adminState.globalSettings = {};
      adminState.globalSettings = { ...adminState.globalSettings, ...res.data };

      const input = document.getElementById('globalCountdownInput');
      if (input) input.value = '';

      updateCountdownPreview(null);
      showAdminToast('success', 'Dikosongkan', 'Tanggal target race day telah dikosongkan.');
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Gagal mengosongkan tanggal.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

/**
 * Buka / Tutup Pendaftaran Event Secara Global
 */
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
    const currentDate = adminState.globalSettings?.eventCountdownDate || null;

    const res = await fetchAdmin('/admin/settings/countdown', {
      method: 'PUT',
      body: JSON.stringify({
        eventCountdownDate: currentDate,
        isRegistrationClosed: newStatus
      })
    });

    if (res && (res.status === 'success' || res.success)) {
      if (!adminState.globalSettings) adminState.globalSettings = {};
      adminState.globalSettings = { ...adminState.globalSettings, ...res.data };

      renderGlobalSettings(adminState.globalSettings);
      showAdminToast('success', 'Status Berubah', newStatus ? 'Pendaftaran resmi DITUTUP!' : 'Pendaftaran resmi DIBUKA!');
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Gagal mengubah status pendaftaran.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

/**
 * Hentikan timer preview saat berpindah halaman admin
 */
function destroyCountdownPreview() {
  if (previewInterval) {
    clearInterval(previewInterval);
    previewInterval = null;
  }
}

export {
  loadGlobalSettings,
  renderGlobalSettings,
  handleSaveGlobalCountdown,
  handleResetGlobalCountdown,
  handleToggleGlobalClosed,
  destroyCountdownPreview
};