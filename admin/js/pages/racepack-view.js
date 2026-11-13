import { fetchAdmin } from '../core/api.js';
import { adminState } from '../core/state.js';
import { escapeHtml } from '../core/utils.js';
import { connectRealtimeSocket } from '../../../js/realtime.js';

let queueRequestInProgress = false;
let queueLoaded = false;
let racepackQueue = [];
let pendingQueueEvents = [];

function formatQueueTime(value) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '-'
    : date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function renderQueue(queue) {
  const container = document.getElementById('racepackQueueContainer');
  if (!container) return;

  if (!queue.length) {
    container.innerHTML = `
      <div class="racepack-live-empty">
        <span class="racepack-live-empty-icon"><i class="fa-solid fa-inbox" aria-hidden="true"></i></span>
        <strong>Antrean masih kosong</strong>
        <span>Peserta yang dikirim dari halaman Pengambilan Racepack akan tampil di sini.</span>
      </div>
    `;
    return;
  }

  const cards = queue.map((participant, index) => {
    const gender = participant.gender === 'MALE'
      ? 'LAKI-LAKI'
      : participant.gender === 'FEMALE'
        ? 'PEREMPUAN'
        : participant.gender || '-';

    return `
      <article class="racepack-live-card" data-racepack-participant-id="${escapeHtml(participant.id || '')}">
        <div class="racepack-live-card-top">
          <strong class="racepack-live-position">ANTREAN #${index + 1}</strong>
          <small>Masuk antrean · ${escapeHtml(formatQueueTime(participant.queue?.queuedAt))}</small>
        </div>
        <div class="racepack-live-staff">
          <span class="racepack-live-cell-label">NAMA PETUGAS</span>
          <strong><i class="fa-solid fa-user-check" aria-hidden="true"></i>${escapeHtml(participant.queue?.queuedBy || '-')}</strong>
        </div>
        <div class="racepack-live-participant">
          <span class="racepack-live-cell-label">NAMA PESERTA</span>
          <strong>${escapeHtml(participant.fullNameKtp || '-')}</strong>
        </div>
        <div class="racepack-live-bib">
          <span class="racepack-live-cell-label">NOMOR BIB</span>
          <strong>${escapeHtml(participant.bibNumber || 'BELUM TERBIT')}</strong>
        </div>
        <div class="racepack-live-data-grid">
          <div class="racepack-live-data">
            <span class="racepack-live-cell-label">UKURAN JERSEY</span>
            <strong>${escapeHtml(participant.selectedSize || '-')}</strong>
          </div>
          <div class="racepack-live-data">
            <span class="racepack-live-cell-label">TIPE JERSEY</span>
            <strong>${escapeHtml(participant.jersey?.type || participant.jersey?.name || '-')}</strong>
          </div>
          <div class="racepack-live-data">
            <span class="racepack-live-cell-label">JENIS KELAMIN</span>
            <strong>${escapeHtml(gender)}</strong>
          </div>
          <div class="racepack-live-data">
            <span class="racepack-live-cell-label">NAMA BIB</span>
            <strong>${escapeHtml(participant.bibName || '-')}</strong>
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = cards;
}

export async function loadRacepackQueue({ force = false } = {}) {
  const pane = document.getElementById('pane-racepack-view');
  const standalonePage = document.body.classList.contains('racepack-live-page');
  if (queueRequestInProgress || (!standalonePage && !pane?.classList.contains('active'))) return;
  if (queueLoaded && !force) return;
  queueRequestInProgress = true;
  pendingQueueEvents = [];
  try {
    const res = await fetchAdmin('/admin/racepack/queue');
    if (!res || res.status !== 'success' || !Array.isArray(res.data)) {
      throw new Error(res?.message || 'Gagal memuat data antrean.');
    }
    racepackQueue = res.data;
    pendingQueueEvents.forEach(applyRacepackQueueEvent);
    pendingQueueEvents = [];
    queueLoaded = true;
    renderQueue(racepackQueue);
    const updated = document.getElementById('racepackQueueLastUpdated');
    if (updated) updated.textContent = `Diperbarui ${new Date().toLocaleTimeString('id-ID')}`;
  } catch (error) {
    const container = document.getElementById('racepackQueueContainer');
    if (container) {
      container.innerHTML = `<div class="racepack-live-error">${escapeHtml(error.message)}</div>`;
    }
    console.error('Gagal memuat antrean racepack:', error);
  } finally {
    queueRequestInProgress = false;
  }
}

function applyRacepackQueueEvent(event) {
  if (event.type === 'reset') {
    racepackQueue = [];
    return;
  }
  const participantId = event.participantId || event.participant?.id;
  if (!participantId) return;

  if (event.type === 'queued' && event.participant) {
    const index = racepackQueue.findIndex(participant => participant.id === participantId);
    if (index >= 0) racepackQueue[index] = { ...racepackQueue[index], ...event.participant };
    else racepackQueue.push(event.participant);
    racepackQueue.sort((a, b) => new Date(a.queue?.queuedAt || 0) - new Date(b.queue?.queuedAt || 0));
    return;
  }

  if (event.type === 'checked_in' || event.type === 'removed') {
    racepackQueue = racepackQueue.filter(participant => participant.id !== participantId);
  }
}

export function handleRacepackQueueSocketEvent(event) {
  if (!event) return;
  if (queueRequestInProgress) {
    pendingQueueEvents.push(event);
    return;
  }

  const previousLength = racepackQueue.length;
  const participantId = event.participantId || event.participant?.id;
  const previousParticipant = racepackQueue.find(participant => participant.id === participantId);
  applyRacepackQueueEvent(event);
  if (previousLength === racepackQueue.length && previousParticipant === racepackQueue.find(participant => participant.id === participantId)) {
    return;
  }

  renderQueue(racepackQueue);
  const updated = document.getElementById('racepackQueueLastUpdated');
  if (updated) updated.textContent = `Diperbarui ${new Date().toLocaleTimeString('id-ID')}`;
}

export function initRacepackLivePage() {
  if (!document.body.classList.contains('racepack-live-page')) return;
  const container = document.getElementById('racepackQueueContainer');
  const updated = document.getElementById('racepackQueueLastUpdated');
  const redirectToAdminLogin = () => {
    window.location.replace('/admin.html');
  };
  const showAccessError = message => {
    if (container) {
      container.innerHTML = `
        <div class="racepack-live-error">
          ${escapeHtml(message)}
          <a href="/admin.html" class="btn btn-secondary btn-sm">Buka halaman Admin</a>
        </div>
      `;
    }
    if (updated) updated.textContent = 'Tidak dapat memverifikasi akses.';
  };

  document.getElementById('btnRefreshRacepackQueue')?.addEventListener('click', () => {
    if (!adminState.isAuthenticated) {
      redirectToAdminLogin();
      return;
    }
    void loadRacepackQueue({ force: true });
  });

  void (async () => {
    try {
      const response = await fetchAdmin('/admin/auth/me');
      if (!response || response.status !== 'success' || !response.data?.id) {
        adminState.isAuthenticated = false;
        adminState.profile = null;
        redirectToAdminLogin();
        return;
      }

      adminState.isAuthenticated = true;
      adminState.profile = response.data;
      const role = response.data.role;
      const permissions = Array.isArray(role?.permissions) ? role.permissions : [];
      const canReadParticipants = role?.name === 'SUPERADMIN'
        || permissions.includes('participants:read')
        || permissions.includes('participants:*');
      if (!canReadParticipants) {
        showAccessError('Akun admin ini tidak memiliki izin untuk melihat antrean racepack.');
        return;
      }

      const socket = connectRealtimeSocket();
      socket.off('admin:racepack_queue_changed', handleRacepackQueueSocketEvent);
      socket.on('admin:racepack_queue_changed', handleRacepackQueueSocketEvent);
      window.addEventListener('pagehide', () => socket.off('admin:racepack_queue_changed', handleRacepackQueueSocketEvent), { once: true });
      await loadRacepackQueue();
    } catch (error) {
      console.error('Gagal memverifikasi sesi admin untuk Live View racepack:', error);
      if (!adminState.isAuthenticated) {
        redirectToAdminLogin();
        return;
      }
      showAccessError(error.message || 'Sesi admin tidak dapat diverifikasi. Silakan coba lagi.');
    }
  })();
}
