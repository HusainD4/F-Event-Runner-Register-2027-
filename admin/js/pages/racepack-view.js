import { fetchAdmin } from '../core/api.js';
import { escapeHtml } from '../core/utils.js';

let queueRequestInProgress = false;

function renderQueue(queue) {
  const container = document.getElementById('racepackQueueContainer');
  if (!container) return;

  if (!queue.length) {
    container.innerHTML = '<div class="glass-card" style="padding:28px; text-align:center; color:#64748B;"><i class="fa-solid fa-inbox" style="font-size:2rem; display:block; margin-bottom:8px;"></i>Belum ada peserta di antrean.</div>';
    return;
  }

  container.innerHTML = queue.map((participant, index) => {
    const queuedAt = participant.queue?.queuedAt ? new Date(participant.queue.queuedAt).toLocaleString('id-ID') : '-';
    const eventName = participant.event?.ticketName || participant.event?.category || '-';
    return `
      <article class="glass-card" style="padding:18px; border:1px solid #E2E8F0; background:#FFFFFF; border-radius:14px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
          <div>
            <span class="badge" style="background:#FFF7ED; color:#C2410C; font-weight:800;">ANTREAN #${index + 1}</span>
            <h4 style="margin:8px 0 4px; color:#0F172A;">${escapeHtml(participant.fullNameKtp)}</h4>
            <div style="color:#475569; font-size:.86rem;">
              ${escapeHtml(eventName)} · BIB ${escapeHtml(participant.bibNumber || 'Belum diterbitkan')} · Jersey ${escapeHtml(participant.selectedSize || '-')}
            </div>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:8px; margin-top:14px; font-size:.82rem; color:#475569;">
          <div><strong>NIK:</strong> ${escapeHtml(participant.nik || '-')}</div>
          <div><strong>Jenis kelamin / golongan darah:</strong> ${escapeHtml(participant.gender || '-')} / ${escapeHtml(participant.bloodType || '-')}</div>
          <div><strong>Telepon peserta:</strong> ${escapeHtml(participant.phoneNumber || participant.order?.user?.phoneNumber || '-')}</div>
          <div><strong>Kontak darurat:</strong> ${escapeHtml(participant.emergencyContactName || '-')} (${escapeHtml(participant.emergencyContactPhone || '-')})</div>
          <div><strong>Nama BIB:</strong> ${escapeHtml(participant.bibName || '-')}</div>
          <div><strong>Komunitas:</strong> ${escapeHtml(participant.communityName || '-')}</div>
          <div><strong>Masuk antrean:</strong> ${escapeHtml(queuedAt)}</div>
          <div><strong>Dikirim petugas:</strong> ${escapeHtml(participant.queue?.queuedBy || '-')}</div>
        </div>
        <details style="margin-top:12px; color:#475569; font-size:.82rem;">
          <summary style="cursor:pointer; font-weight:700;">Informasi lengkap peserta &amp; tiket</summary>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:8px; margin-top:10px;">
            <div><strong>Tanggal lahir:</strong> ${escapeHtml(participant.birthDate ? new Date(participant.birthDate).toLocaleDateString('id-ID') : '-')}</div>
            <div><strong>Tempat lahir:</strong> ${escapeHtml(participant.birthPlace || '-')}</div>
            <div><strong>Alamat:</strong> ${escapeHtml(participant.fullAddress || '-')}</div>
            <div><strong>Riwayat medis:</strong> ${escapeHtml(participant.medicalHistory || '-')}</div>
            <div><strong>Pemesan:</strong> ${escapeHtml(participant.order?.user?.fullName || '-')}</div>
            <div><strong>Email pemesan:</strong> ${escapeHtml(participant.order?.user?.email || '-')}</div>
            <div><strong>Order:</strong> ${escapeHtml(participant.order?.midtransOrderId || participant.order?.id || '-')}</div>
            <div><strong>Status pembayaran:</strong> ${escapeHtml(participant.order?.status || '-')}</div>
            <div><strong>Nama / jenis jersey:</strong> ${escapeHtml(participant.jersey?.name || '-')} / ${escapeHtml(participant.jersey?.type || '-')}</div>
          </div>
        </details>
      </article>
    `;
  }).join('');

}

export async function loadRacepackQueue() {
  if (queueRequestInProgress || !document.getElementById('pane-racepack-view')?.classList.contains('active')) return;
  queueRequestInProgress = true;
  try {
    const res = await fetchAdmin('/admin/racepack/queue');
    if (!res || res.status !== 'success' || !Array.isArray(res.data)) {
      throw new Error(res?.message || 'Gagal memuat data antrean.');
    }
    renderQueue(res.data);
    const updated = document.getElementById('racepackQueueLastUpdated');
    if (updated) updated.textContent = `Diperbarui ${new Date().toLocaleTimeString('id-ID')}`;
  } catch (error) {
    const container = document.getElementById('racepackQueueContainer');
    if (container) {
      container.innerHTML = `<div class="glass-card" style="padding:20px; color:#B91C1C;">${escapeHtml(error.message)}</div>`;
    }
    console.error('Gagal memuat antrean racepack:', error);
  } finally {
    queueRequestInProgress = false;
  }
}
