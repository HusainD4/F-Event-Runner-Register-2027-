import { fetchAdmin } from '../core/api.js';
import { adminState } from '../core/state.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';

let currentRacepackData = null;
let racepackConfirmationParticipants = [];
let racepackConfirmationLoadedAdminId = null;
let racepackConfirmationLoading = false;
let racepackStatsLoaded = false;
let racepackStatsLoading = false;
let html5QrScannerInstance = null;
let rawCameraStream = null;
let rawCameraLoopTimer = null;
let nativeBarcodeDetector = null;

function adjustRacepackStats(checkedInDelta) {
  const checkedEl = document.getElementById('rpcKpiCheckedIn');
  const remainingEl = document.getElementById('rpcKpiRemaining');
  const percentageEl = document.getElementById('rpcKpiPercentage');
  const checked = Number(checkedEl?.textContent);
  const remaining = Number(remainingEl?.textContent);
  const paid = Number(document.getElementById('rpcKpiPaidTotal')?.textContent);
  if (!Number.isFinite(checked) || !Number.isFinite(remaining)) return;

  const nextChecked = Math.max(0, checked + checkedInDelta);
  const nextRemaining = Math.max(0, remaining - checkedInDelta);
  if (checkedEl) checkedEl.textContent = String(nextChecked);
  if (remainingEl) remainingEl.textContent = String(nextRemaining);
  if (percentageEl && Number.isFinite(paid) && paid > 0) {
    percentageEl.textContent = `${Math.round((nextChecked / paid) * 100)}% dari peserta lunas`;
  }
  const infoChecked = document.getElementById('rpcInfoCheckedIn');
  const infoRemaining = document.getElementById('rpcInfoRemaining');
  const infoPercentage = document.getElementById('rpcInfoPercentage');
  if (infoChecked) infoChecked.textContent = String(nextChecked);
  if (infoRemaining) infoRemaining.textContent = String(nextRemaining);
  if (infoPercentage && Number.isFinite(paid) && paid > 0) {
    infoPercentage.textContent = `${Math.round((nextChecked / paid) * 100)}% dari peserta lunas`;
  }
}

// Cek apakah browser mendukung BarcodeDetector bawaan
if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
  try {
    nativeBarcodeDetector = new window.BarcodeDetector({ formats: ['qr_code', 'code_128', 'ean_13'] });
  } catch {
    nativeBarcodeDetector = null;
  }
}

/**
 * Muat ringkasan statistik Racepack
 */
export async function loadRacepackStats({ force = false } = {}) {
  if (racepackStatsLoading || (racepackStatsLoaded && !force)) return;
  racepackStatsLoading = true;
  try {
    const res = await fetchAdmin('/admin/racepack/stats');
    if (res && res.status === 'success' && res.data) {
      racepackStatsLoaded = true;
      const d = res.data;
      const elChecked = document.getElementById('rpcKpiCheckedIn');
      const elRemaining = document.getElementById('rpcKpiRemaining');
      const elPaid = document.getElementById('rpcKpiPaidTotal');
      const elPct = document.getElementById('rpcKpiPercentage');

      const setText = (element, value) => {
        if (element) element.textContent = value;
      };

      setText(elChecked, d.checkedInCount);
      setText(elRemaining, d.remainingToCollect);
      setText(elPaid, d.paidParticipants);
      setText(elPct, `${d.percentage}% dari peserta lunas`);
      setText(document.getElementById('rpcInfoCheckedIn'), d.checkedInCount);
      setText(document.getElementById('rpcInfoRemaining'), d.remainingToCollect);
      setText(document.getElementById('rpcInfoPaidTotal'), d.paidParticipants);
      setText(document.getElementById('rpcInfoPercentage'), `${d.percentage}% dari peserta lunas`);
    }
  } catch (err) {
    console.warn('Gagal memuat statistik racepack:', err);
  } finally {
    racepackStatsLoading = false;
  }
}

function renderRacepackConfirmations() {
  const table = document.getElementById('racepackConfirmationsTable');
  const summary = document.getElementById('racepackConfirmationsSummary');
  if (!table) return;

  const participants = racepackConfirmationParticipants;
  const role = adminState.profile?.role;
  const permissions = Array.isArray(role?.permissions) ? role.permissions : [];
  const canConfirm = role?.name === 'SUPERADMIN'
    || permissions.includes('racepack:checkin')
    || permissions.includes('racepack:*')
    || permissions.includes('*');
  if (participants.length === 0) {
    table.innerHTML = '<tr><td colspan="4" class="text-center">Belum ada peserta yang Anda kirim ke antrean.</td></tr>';
  } else {
    table.innerHTML = participants.map(participant => `
      <tr>
        <td>${escapeHtml(participant.fullNameKtp || '-')}</td>
        <td><strong>${escapeHtml(participant.bibNumber || 'Belum diterbitkan')}</strong></td>
        <td>${participant.checkedIn
          ? `<span class="status-pill success">Sudah diambil${participant.checkedInBy ? ` · ${escapeHtml(participant.checkedInBy)}` : ''}</span>`
          : '<span class="status-pill pending">Belum diambil</span>'}</td>
        <td>${participant.checkedIn
          ? '<span class="racepack-confirm-done">Selesai</span>'
          : canConfirm
          ? `<button type="button" class="btn btn-primary btn-sm" data-confirm-racepack-id="${escapeHtml(participant.id)}"><i class="fa-solid fa-check"></i> Konfirmasi</button>`
          : '<span class="form-hint">Tidak memiliki izin konfirmasi</span>'}</td>
      </tr>
    `).join('');
  }
  if (summary) {
    const completed = participants.filter(participant => participant.checkedIn).length;
    summary.textContent = `${participants.length} peserta antrean Anda · ${completed} sudah check-in · ${participants.length - completed} belum diambil`;
  }
}

export async function loadRacepackConfirmations({ force = false } = {}) {
  const table = document.getElementById('racepackConfirmationsTable');
  const summary = document.getElementById('racepackConfirmationsSummary');
  if (!table || racepackConfirmationLoading) return;

  const adminId = adminState.profile?.id;
  if (!adminId) {
    table.innerHTML = '<tr><td colspan="4" class="text-center">Sesi admin tidak valid. Silakan masuk kembali.</td></tr>';
    if (summary) summary.textContent = '';
    return;
  }
  if (!force && racepackConfirmationLoadedAdminId === adminId) {
    renderRacepackConfirmations();
    return;
  }

  table.innerHTML = '<tr><td colspan="4" class="text-center">Memuat antrean Anda...</td></tr>';
  racepackConfirmationLoading = true;
  try {
    const res = await fetchAdmin('/admin/racepack/confirmations');
    if (!res || res.status !== 'success' || !Array.isArray(res.data)) {
      throw new Error(res?.message || 'Gagal memuat daftar konfirmasi racepack.');
    }
    if (adminState.profile?.id !== adminId) return;
    racepackConfirmationParticipants = res.data;
    racepackConfirmationLoadedAdminId = adminId;
    renderRacepackConfirmations();
  } catch (error) {
    table.innerHTML = `<tr><td colspan="4" class="text-center">${escapeHtml(error.message || 'Gagal memuat daftar konfirmasi.')}</td></tr>`;
    if (summary) summary.textContent = '';
    console.error('Gagal memuat daftar konfirmasi racepack:', error);
  } finally {
    racepackConfirmationLoading = false;
  }
}

export function handleRacepackConfirmationSocketEvent(event) {
  const adminId = adminState.profile?.id;
  if (!adminId || racepackConfirmationLoadedAdminId !== adminId || !event) return;

  if (event.type === 'removed') {
    const filteredParticipants = racepackConfirmationParticipants
      .filter(participant => participant.id !== event.participantId);
    if (filteredParticipants.length === racepackConfirmationParticipants.length) return;
    racepackConfirmationParticipants = filteredParticipants;
  } else if (event.type === 'queued' || event.type === 'checked_in') {
    if (!event.participant?.id) return;
    const existingIndex = racepackConfirmationParticipants
      .findIndex(participant => participant.id === event.participant.id);
    const existing = racepackConfirmationParticipants[existingIndex];
    if (existing && existing.checkedIn === event.participant.checkedIn
      && existing.checkedInBy === event.participant.checkedInBy
      && existing.bibNumber === event.participant.bibNumber) return;
    const participant = {
      ...(existingIndex >= 0 ? racepackConfirmationParticipants[existingIndex] : {}),
      ...event.participant,
    };
    if (existingIndex >= 0) racepackConfirmationParticipants[existingIndex] = participant;
    else racepackConfirmationParticipants.push(participant);
    racepackConfirmationParticipants.sort((a, b) => (a.fullNameKtp || '').localeCompare(b.fullNameKtp || ''));
  } else {
    return;
  }

  if (adminState.activeTab === 'racepack-confirm') renderRacepackConfirmations();
}

export function handleRacepackScanSocketEvent(event) {
  const participant = currentRacepackData?.participant;
  const participantId = event?.participantId || event?.participant?.id;
  if (!participant || participant.id !== participantId) return;

  if (event.type === 'queued') {
    if (currentRacepackData.racepack?.queued) return;
    currentRacepackData.racepack = {
      ...currentRacepackData.racepack,
      queued: true,
      queuedAt: event.participant?.queue?.queuedAt,
    };
  } else if (event.type === 'checked_in') {
    if (currentRacepackData.racepack?.checkedIn) return;
    currentRacepackData.racepack = {
      ...currentRacepackData.racepack,
      ...event.participant,
      checkedIn: true,
      queued: false,
    };
    adjustRacepackStats(1);
  } else if (event.type === 'removed') {
    if (!currentRacepackData.racepack?.checkedIn && !currentRacepackData.racepack?.queued) return;
    if (currentRacepackData.racepack?.checkedIn) adjustRacepackStats(-1);
    currentRacepackData.racepack = {
      ...currentRacepackData.racepack,
      checkedIn: false,
      queued: false,
    };
  } else {
    return;
  }

  if (adminState.activeTab === 'racepack') renderRacepackDetails(currentRacepackData);
}

export async function handleConfirmRacepackTableCheckin(participantId) {
  if (!participantId) return;
  const confirmed = await showConfirmDialog({
    title: 'Konfirmasi Check-in Racepack',
    message: 'Pastikan racepack sudah diserahkan kepada peserta sebelum mengonfirmasi check-in.',
    confirmText: 'Ya, Konfirmasi',
    type: 'warning',
  });
  if (!confirmed) return;

  try {
    const res = await fetchAdmin('/admin/racepack/checkin', {
      method: 'POST',
      body: JSON.stringify({ participantId }),
    });
    if (!res || res.status !== 'success') {
      throw new Error(res?.message || 'Check-in racepack gagal dikonfirmasi.');
    }
    showAdminToast('success', 'Check-in Berhasil', res.message || 'Pengambilan racepack berhasil dikonfirmasi.');
    handleRacepackConfirmationSocketEvent({
      type: 'checked_in',
      participant: {
        ...racepackConfirmationParticipants.find(participant => participant.id === participantId),
        checkedIn: true,
        checkedInAt: res.data?.checkedInAt || new Date().toISOString(),
        checkedInBy: res.data?.checkedInBy || adminState.profile?.fullName || 'Admin',
        bibNumber: res.data?.bibNumber || racepackConfirmationParticipants.find(participant => participant.id === participantId)?.bibNumber,
      },
    });
  } catch (error) {
    showAdminToast('error', 'Gagal Check-in', error.message || 'Terjadi kesalahan saat mengonfirmasi racepack.');
  }
}

/**
 * Verifikasi kode E-Tiket / BIB / NIK
 */
export async function verifyRacepackByCode(code) {
  if (!code || !String(code).trim()) return;

  const rawInput = String(code).trim();
  const searchInput = document.getElementById('rpcManualSearchInput');
  if (searchInput) {
    if (rawInput.includes('|')) {
      const parts = rawInput.split('|').map((s) => s.trim()).filter(Boolean);
      // Tampilkan BIB atau Order ID di input agar rapi bagi admin
      searchInput.value = parts[2] || parts[1] || rawInput;
    } else {
      searchInput.value = rawInput;
    }
  }

  const searchBtn = document.getElementById('btnRpcSearchSubmit');
  const originalHtml = searchBtn ? searchBtn.innerHTML : '';
  if (searchBtn) {
    searchBtn.disabled = true;
    searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  }

  try {
    const res = await fetchAdmin(`/admin/racepack/verify/${encodeURIComponent(rawInput)}`);
    if (res && res.status === 'success' && res.data) {
      currentRacepackData = res.data;
      renderRacepackDetails(res.data);
      showAdminToast('success', 'E-Tiket Ditemukan', `Data pelari: ${res.data.participant?.fullNameKtp}`);
    } else {
      showAdminToast('error', 'Tidak Ditemukan', res?.message || 'Data peserta tidak ditemukan.');
    }
  } catch (err) {
    showAdminToast('error', 'Gagal Verifikasi', err.message || 'Terjadi kesalahan sistem.');
  } finally {
    if (searchBtn) {
      searchBtn.disabled = false;
      searchBtn.innerHTML = originalHtml;
    }
  }
}

/**
 * Render detail peserta & checklist serah terima
 */
export function renderRacepackDetails(data) {
  const emptyState = document.getElementById('rpcEmptyState');
  const detailsState = document.getElementById('rpcDetailsState');
  const masterState = document.getElementById('rpcMasterState');

  // Jika scan adalah QR Master (Order dengan banyak peserta)
  if (data.isMaster && Array.isArray(data.participants)) {
    if (emptyState) emptyState.style.display = 'none';
    if (detailsState) detailsState.style.display = 'none';
    if (masterState) {
      masterState.style.display = 'block';
      renderMasterRacepackView(data, masterState);
    }
    return;
  }

  if (masterState) masterState.style.display = 'none';
  if (emptyState) emptyState.style.display = 'none';
  if (detailsState) detailsState.style.display = 'block';

  const p = data.participant;
  const isPaid = data.isPaid;
  const rpc = data.racepack;

  // 1. Status Pembayaran Banner
  const banner = document.getElementById('rpcPaymentBanner');
  const payIcon = document.getElementById('rpcPaymentIcon');
  const payTitle = document.getElementById('rpcPaymentTitle');
  const paySub = document.getElementById('rpcPaymentSub');
  const payBadge = document.getElementById('rpcPaymentBadge');
  const confirmBtn = document.getElementById('btnConfirmRpcCheckin');
  const actionWrapper = document.getElementById('rpcActionBtnWrapper');

  if (banner && payIcon && payTitle && payBadge) {
    if (isPaid) {
      banner.style.background = '#F0FDF4';
      banner.style.border = '1px solid #BBF7D0';
      banner.style.color = '#15803D';
      payIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #22C55E;"></i>';
      payTitle.textContent = 'PEMBAYARAN TERVERIFIKASI & LUNAS';
      if (paySub) paySub.textContent = `Status Midtrans: ${p.order?.status || 'SETTLEMENT'} • Berhak mengambil racepack resmi.`;
      payBadge.style.background = '#DCFCE7';
      payBadge.style.color = '#15803D';
      payBadge.textContent = 'LUNAS (PAID)';

      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.style.opacity = '1';
        confirmBtn.style.cursor = 'pointer';
      }
    } else {
      const isPending = p.order?.status === 'PENDING';
      banner.style.background = isPending ? '#FFFBEB' : '#FEF2F2';
      banner.style.border = `1px solid ${isPending ? '#FDE68A' : '#FECACA'}`;
      banner.style.color = isPending ? '#B45309' : '#B91C1C';
      payIcon.innerHTML = isPending
        ? '<i class="fa-solid fa-clock" style="color: #F59E0B;"></i>'
        : '<i class="fa-solid fa-triangle-exclamation" style="color: #EF4444;"></i>';
      payTitle.textContent = isPending
        ? 'PERINGATAN: PEMBAYARAN MASIH MENUNGGU (PENDING)'
        : `DIBATALKAN (${p.order?.status || 'EXPIRED'})`;
      if (paySub) paySub.textContent = 'DILARANG menyerahkan racepack sebelum pembayaran berstatus LUNAS.';
      payBadge.style.background = isPending ? '#FEF3C7' : '#FEE2E2';
      payBadge.style.color = isPending ? '#92400E' : '#991B1B';
      payBadge.textContent = p.order?.status || 'BELUM LUNAS';

      if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.style.opacity = '0.6';
        confirmBtn.style.cursor = 'not-allowed';
      }
    }
  }

  // 2. Data Pelari
  const setEl = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || '-';
  };

  setEl('rpcFullName', p.fullNameKtp);
  setEl('rpcBibNumber', p.bibNumber || 'BELUM ADA');
  setEl('rpcBibName', p.bibName || p.fullNameKtp);
  setEl('rpcNik', p.nik);
  setEl('rpcGender', p.gender === 'MALE' ? 'LAKI-LAKI' : 'PEREMPUAN');
  setEl('rpcBloodType', p.bloodType || 'O');
  setEl('rpcEventCategory', `Kategori ${p.event?.category || '10K'}`);
  setEl('rpcPhone', p.order?.user?.phoneNumber || '-');
  setEl('rpcEmergency', `${p.emergencyContactName} (${p.emergencyContactPhone})`);
  setEl('rpcOrderId', p.order?.midtransOrderId || p.orderId);

  // 3. Jersey
  const size = p.selectedSize || 'M';
  setEl('rpcJerseyBadge', `Ukuran Jersey: ${size}`);
  setEl('chkJerseySizeText', size);
  setEl('chkJerseyTypeText', p.jersey?.name || 'Dry-Fit Official Tegal Run');
  setEl('chkBibText', p.bibNumber || 'Auto-assigned');

  // 4. Status Check-in Sebelumnya
  const alreadyBox = document.getElementById('rpcAlreadyCheckedInBox');
  const alreadyText = document.getElementById('rpcCheckinTimestampText');

  if (rpc && rpc.checkedIn) {
    if (alreadyBox) alreadyBox.style.display = 'block';
    if (actionWrapper) actionWrapper.style.display = 'none';
    if (alreadyText) {
      const dtStr = new Date(rpc.checkedInAt).toLocaleString('id-ID');
      alreadyText.textContent = `Diserahkan pada: ${dtStr} WIB oleh Petugas: ${rpc.checkedInBy || 'Admin'}`;
    }
    if (confirmBtn) {
      confirmBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Perbarui Catatan Serah Terima';
      confirmBtn.className = 'btn btn-secondary btn-sm';
    }
  } else {
    if (alreadyBox) alreadyBox.style.display = 'none';
    if (actionWrapper) actionWrapper.style.display = 'block';
    if (confirmBtn) {
      if (rpc?.queued) {
        confirmBtn.innerHTML = '<i class="fa-solid fa-box-check"></i> Konfirmasi Check-in';
        confirmBtn.className = 'btn btn-primary btn-glow';
        confirmBtn.disabled = false;
        confirmBtn.style.opacity = '1';
        confirmBtn.style.cursor = 'pointer';
      } else {
        confirmBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim ke Antrean';
        confirmBtn.className = 'btn btn-primary btn-glow';
        confirmBtn.disabled = !isPaid;
      }
    }
  }
}

/**
 * Render Tampilan Khusus QR Code Master (Banyak Peserta dalam 1 Order)
 */
function renderMasterRacepackView(data, mountEl) {
  const order = data.order;
  const participants = data.participants || [];
  const isPaid = data.isPaid;
  const orderRef = order.midtransOrderId || order.id;

  const allChecked = participants.every(pt => pt.racepack?.checkedIn);

  mountEl.innerHTML = `
    <!-- Master Header Banner -->
    <div style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); color: #FFFFFF; border-radius: 14px; padding: 18px 20px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
        <span style="background: #FEF3C7; color: #92400E; font-size: 0.72rem; font-weight: 900; padding: 4px 10px; border-radius: 9999px;">
          <i class="fa-solid fa-layer-group"></i> QR CODE MASTER (${participants.length} PESERTA)
        </span>
        <span class="badge" style="background: ${isPaid ? '#DCFCE7' : '#FEE2E2'}; color: ${isPaid ? '#15803D' : '#991B1B'}; font-weight: 800; font-size: 0.74rem;">
          ${isPaid ? 'LUNAS (PAID)' : order.status || 'BELUM LUNAS'}
        </span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0 0 4px 0;">ORDER REF: ${escapeHtml(orderRef)}</h3>
      <p style="font-size: 0.8rem; color: #E0E7FF; margin: 0;">Pemesan: <strong>${escapeHtml(order.user?.fullName || '-')}</strong> (${escapeHtml(order.user?.phoneNumber || order.user?.email || '-')})</p>
    </div>

    <!-- Participant List Table -->
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
        <span>Daftar Peserta dalam Pesanan (${participants.length} Orang):</span>
        <span style="font-size: 0.78rem; font-weight: 600; color: #64748B;">
          ${participants.filter(pt => pt.racepack?.checkedIn).length} / ${participants.length} Sudah Diambil
        </span>
      </h4>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${participants.map((pt, idx) => {
          const isCheckin = pt.racepack?.checkedIn;
          return `
            <div style="background: ${isCheckin ? '#F0FDF4' : '#F8FAFC'}; border: 1px solid ${isCheckin ? '#BBF7D0' : '#E2E8F0'}; border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <strong style="color: #0F172A; font-size: 0.95rem;">#${idx + 1} ${escapeHtml(pt.fullNameKtp)}</strong>
                  <span style="background: #E0F2FE; color: #0369A1; font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
                    ${escapeHtml(pt.event?.category || '10K')}
                  </span>
                </div>
                <div style="font-size: 0.76rem; color: #64748B; margin-top: 3px;">
                  BIB: <strong style="color: #FF6B00; font-family: monospace;">${escapeHtml(pt.bibNumber || 'Saat RPC')}</strong> &bull; Size: <strong>${escapeHtml(pt.selectedSize || 'M')}</strong> (${escapeHtml(pt.jersey?.type || 'Jersey')})
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge" style="background: ${isCheckin ? '#DCFCE7' : '#FEF3C7'}; color: ${isCheckin ? '#15803D' : '#92400E'}; font-size: 0.72rem; font-weight: 800;">
                  <i class="fa-solid ${isCheckin ? 'fa-check' : 'fa-clock'}"></i> ${isCheckin ? 'Sudah Diambil' : 'Belum Diambil'}
                </span>
                <button type="button" class="btn btn-outline btn-sm btnViewSingleRunner" data-participant-id="${pt.id}" style="font-size: 0.74rem; padding: 4px 8px;">
                  Detail
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Batch Checkin Button -->
    <div style="background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 16px; text-align: center;">
      ${allChecked ? `
        <div style="color: #15803D; font-weight: 800; font-size: 0.95rem; margin-bottom: 6px;">
          <i class="fa-solid fa-circle-check" style="font-size: 1.5rem; display: block; margin-bottom: 6px; color: #22C55E;"></i>
          Seluruh Peserta (${participants.length}) Sudah Menyelesaikan Check-in Racepack!
        </div>
      ` : `
        <button type="button" class="btn btn-primary btn-glow" id="btnBatchCheckinAll" style="width: 100%; padding: 14px; font-size: 1rem; font-weight: 800;" ${!isPaid ? 'disabled style="opacity: 0.5;"' : ''}>
          <i class="fa-solid fa-paper-plane"></i> Kirim Semua ke Antrean
        </button>
        <span style="font-size: 0.75rem; color: #64748B; margin-top: 8px; display: block;">
          Pilih detail peserta untuk konfirmasi check-in setelah racepack diserahkan.
        </span>
      `}
    </div>
  `;

  // Attach button events
  mountEl.querySelectorAll('.btnViewSingleRunner').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-participant-id');
      const selected = participants.find(p => p.id === pId);
      if (selected) {
        currentRacepackData = {
          isMaster: false,
          participant: selected,
          isPaid,
          racepack: selected.racepack || { checkedIn: false }
        };
        renderRacepackDetails(currentRacepackData);
      }
    });
  });

  const batchBtn = document.getElementById('btnBatchCheckinAll');
  if (batchBtn) {
    batchBtn.addEventListener('click', () => handleBatchRacepackCheckin(data));
  }
}

/**
 * Kirim peserta dalam QR Master ke antrean konfirmasi.
 */
async function handleBatchRacepackCheckin(data) {
  const participants = data.participants || [];
  const pendingParticipants = participants.filter(pt => !pt.racepack?.checkedIn);

  const btn = document.getElementById('btnBatchCheckinAll');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim peserta ke antrean...';
  }

  try {
    let queuedCount = 0;
    for (const participant of pendingParticipants) {
      const res = await fetchAdmin('/admin/racepack/queue', {
        method: 'POST',
        body: JSON.stringify({ participantId: participant.id }),
      });
      if (!res || res.status !== 'success') {
        throw new Error(`${res?.message || 'Gagal mengirim peserta ke antrean.'} (${queuedCount} peserta sudah terkirim)`);
      }
      queuedCount += 1;
      participant.racepack = { ...participant.racepack, queued: true };
    }
    showAdminToast('success', 'Peserta Dikirim ke Antrean', `${queuedCount} peserta dikirim ke Live View Antrean Racepack.`);
    renderRacepackDetails(data);
  } catch (err) {
    showAdminToast('error', 'Pengiriman Antrean Gagal', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

export async function handleConfirmRacepackCheckin() {
  if (!currentRacepackData || !currentRacepackData.participant) {
    showAdminToast('warning', 'Peringatan', 'Tidak ada data peserta yang sedang dipilih.');
    return;
  }

  const p = currentRacepackData.participant;
  const isPaid = currentRacepackData.isPaid;

  if (!isPaid) {
    showAdminToast('error', 'Dilarang', 'Pembayaran tiket belum lunas!');
    return;
  }

  const btn = document.getElementById('btnConfirmRpcCheckin');
  const queued = Boolean(currentRacepackData.racepack?.queued);

  if (queued) {
    const confirmed = await showConfirmDialog({
      title: 'Konfirmasi Check-in Racepack',
      message: `Pastikan racepack sudah diserahkan kepada ${p.fullNameKtp}. Konfirmasi check-in sekarang?`,
      confirmText: 'Ya, Konfirmasi Check-in',
      type: 'warning',
    });
    if (!confirmed) return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = queued
      ? '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan check-in...'
      : '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim ke antrean...';
  }

  try {
    if (!queued) {
      const res = await fetchAdmin('/admin/racepack/queue', {
        method: 'POST',
        body: JSON.stringify({ participantId: p.id }),
      });
      if (!res || res.status !== 'success') {
        throw new Error(res?.message || 'Gagal mengirim peserta ke antrean.');
      }

      currentRacepackData.racepack = { ...currentRacepackData.racepack, queued: true };
      renderRacepackDetails(currentRacepackData);
      showAdminToast('success', 'Dikirim ke Antrean', `${p.fullNameKtp} siap dikonfirmasi di halaman ini.`);
    } else {
      const items = [
        ['chkItemBib', 'Nomor BIB'],
        ['chkItemJersey', 'Jersey'],
        ['chkItemChip', 'Timing Chip'],
        ['chkItemBag', 'Drawstring Bag & Race Guide'],
        ['chkItemRefreshment', 'Suplemen & Refreshment'],
      ]
        .filter(([id]) => document.getElementById(id)?.checked)
        .map(([, item]) => item);
      const res = await fetchAdmin('/admin/racepack/checkin', {
        method: 'POST',
        body: JSON.stringify({
          participantId: p.id,
          items,
          notes: 'Serah terima dikonfirmasi melalui halaman Pengambilan Racepack & Check-in.',
        }),
      });
      if (!res || res.status !== 'success') {
        throw new Error(res?.message || 'Gagal menyimpan check-in racepack.');
      }

      const wasCheckedIn = Boolean(currentRacepackData.racepack?.checkedIn);
      currentRacepackData.racepack = res.data;
      if (res.data?.bibNumber) p.bibNumber = res.data.bibNumber;
      if (!wasCheckedIn) adjustRacepackStats(1);
      renderRacepackDetails(currentRacepackData);
      showAdminToast('success', 'Racepack Diserahkan', res.message);
    }
  } catch (err) {
    showAdminToast('error', queued ? 'Gagal Check-in' : 'Gagal Mengirim', err.message);
  } finally {
    if (btn && !currentRacepackData.racepack?.checkedIn) {
      btn.disabled = false;
      btn.innerHTML = currentRacepackData.racepack?.queued
        ? '<i class="fa-solid fa-box-check"></i> Konfirmasi Check-in'
        : '<i class="fa-solid fa-paper-plane"></i> Kirim ke Antrean';
    }
  }
}

/**
 * Handle Revert / Batalkan status Check-in
 */
export async function handleRevertRacepackCheckin() {
  if (!currentRacepackData || !currentRacepackData.participant) return;

  const confirmed = await showConfirmDialog({
    title: 'Batalkan Status Check-in?',
    message: `Apakah Anda yakin ingin membatalkan status pengambilan racepack untuk "${currentRacepackData.participant.fullNameKtp}"?`,
    confirmText: 'Ya, Batalkan Check-in',
    type: 'danger'
  });

  if (!confirmed) return;

  try {
    const res = await fetchAdmin('/admin/racepack/revert', {
      method: 'POST',
      body: JSON.stringify({ participantId: currentRacepackData.participant.id })
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Dibatalkan', 'Status pengambilan racepack berhasil dibatalkan.');
      if (currentRacepackData.racepack?.checkedIn) adjustRacepackStats(-1);
      currentRacepackData.racepack = { checkedIn: false };
      renderRacepackDetails(currentRacepackData);
    } else {
      showAdminToast('error', 'Gagal', res?.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan', err.message);
  }
}

/**
 * START CAMERA SCANNER (CROSS-BROWSER: HTML5-QRCode + Fallback)
 */
export async function startRpcCamera() {
  const container = document.getElementById('rpcCameraContainer');
  const placeholder = document.getElementById('rpcCameraPlaceholder');
  const crosshair = document.getElementById('rpcScanCrosshair');
  const badge = document.getElementById('rpcCameraStatusBadge');
  const startBtn = document.getElementById('btnStartRpcCamera');
  const stopBtn = document.getElementById('btnStopRpcCamera');

  // 1. Prioritas 1: Jika Html5Qrcode tersedia (library universal cross-browser)
  if (typeof window !== 'undefined' && window.Html5Qrcode) {
    try {
      if (placeholder) placeholder.style.display = 'none';
      if (crosshair) crosshair.style.display = 'none';

      // Pastikan instance lama dihentikan
      if (html5QrScannerInstance) {
        try { await html5QrScannerInstance.stop(); } catch {}
        html5QrScannerInstance = null;
      }

      html5QrScannerInstance = new window.Html5Qrcode('rpcCameraContainer');
      const config = {
        fps: 15,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const size = Math.min(320, Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.82));
          return { width: size, height: size };
        },
        aspectRatio: 1.0,
      };

      await html5QrScannerInstance.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          playBeepSound();
          stopRpcCamera();
          verifyRacepackByCode(decodedText);
        },
        () => {} // abaikan frame tanpa QR
      );

      if (startBtn) startBtn.style.display = 'none';
      if (stopBtn) stopBtn.style.display = 'inline-flex';
      if (badge) {
        badge.textContent = 'Kamera Live Aktif';
        badge.style.background = '#DCFCE7';
        badge.style.color = '#15803D';
      }
      showAdminToast('success', 'Kamera Aktif', 'Arahkan kamera ke QR Code E-Tiket pelari.');
      return;
    } catch (err) {
      console.warn('Html5Qrcode live camera start failed, trying fallback stream...', err);
    }
  }

  // 2. Prioritas 2: Native navigator.mediaDevices fallback
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showAdminToast('warning', 'Live Stream Memerlukan HTTPS', 'Browser HP Anda membatasi live camera pada HTTP lokal. Silakan gunakan tombol "Foto E-Tiket" di samping.');
    triggerNativeCamera();
    return;
  }

  try {
    const video = document.getElementById('rpcVideoElem');
    const placeholderEl = document.getElementById('rpcCameraPlaceholder');

    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
    } catch {
      // Fallback constraint tanpa facingMode
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }

    rawCameraStream = stream;
    if (video) {
      video.srcObject = rawCameraStream;
      video.setAttribute('playsinline', 'true');
      await video.play();
      video.style.display = 'block';
    }

    if (placeholderEl) placeholderEl.style.display = 'none';
    if (crosshair) crosshair.style.display = 'block';
    if (startBtn) startBtn.style.display = 'none';
    if (stopBtn) stopBtn.style.display = 'inline-flex';
    if (badge) {
      badge.textContent = 'Kamera Aktif';
      badge.style.background = '#DCFCE7';
      badge.style.color = '#15803D';
    }

    showAdminToast('success', 'Kamera Aktif', 'Arahkan kamera ke QR Code E-Tiket pelari.');
    scanCameraFrame();
  } catch (err) {
    console.error('Camera access error:', err);
    showAdminToast('error', 'Izin Kamera Ditolak / Gagal', 'Tidak dapat mengakses live stream kamera. Silakan gunakan tombol "Foto E-Tiket".');
    triggerNativeCamera();
  }
}

/**
 * Loop scanner untuk fallback video element
 */
async function scanCameraFrame() {
  const video = document.getElementById('rpcVideoElem');
  if (!video || !rawCameraStream || video.paused || video.ended) return;

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    // 1. Coba BarcodeDetector jika ada
    if (nativeBarcodeDetector) {
      try {
        const barcodes = await nativeBarcodeDetector.detect(video);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          playBeepSound();
          stopRpcCamera();
          verifyRacepackByCode(barcodes[0].rawValue);
          return;
        }
      } catch {}
    }
  }

  rawCameraLoopTimer = setTimeout(scanCameraFrame, 100);
}

/**
 * STOP CAMERA (Menghentikan seluruh stream live)
 */
export async function stopRpcCamera() {
  if (rawCameraLoopTimer) {
    clearTimeout(rawCameraLoopTimer);
    rawCameraLoopTimer = null;
  }

  // Hentikan Html5Qrcode jika sedang berjalan
  if (html5QrScannerInstance) {
    try {
      await html5QrScannerInstance.stop();
      html5QrScannerInstance.clear();
    } catch {}
    html5QrScannerInstance = null;
  }

  // Hentikan native media stream
  if (rawCameraStream) {
    rawCameraStream.getTracks().forEach((track) => track.stop());
    rawCameraStream = null;
  }

  const video = document.getElementById('rpcVideoElem');
  const placeholder = document.getElementById('rpcCameraPlaceholder');
  const crosshair = document.getElementById('rpcScanCrosshair');
  const badge = document.getElementById('rpcCameraStatusBadge');
  const startBtn = document.getElementById('btnStartRpcCamera');
  const stopBtn = document.getElementById('btnStopRpcCamera');

  if (video) {
    video.pause();
    video.srcObject = null;
    video.style.display = 'none';
  }
  if (placeholder) placeholder.style.display = 'block';
  if (crosshair) crosshair.style.display = 'none';
  if (startBtn) startBtn.style.display = 'inline-flex';
  if (stopBtn) stopBtn.style.display = 'none';
  if (badge) {
    badge.textContent = 'Standby';
    badge.style.background = '#F1F5F9';
    badge.style.color = '#475569';
  }
}

/**
 * Pemicu Kamera HP Native (Snapshot Foto Langsung)
 */
export function triggerNativeCamera() {
  const fileInput = document.getElementById('rpcNativeCameraInput');
  if (fileInput) {
    fileInput.value = '';
    fileInput.click();
  }
}

/**
 * Handler ketika foto QR diambil via kamera HP
 */
export async function handleNativeCameraFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  showAdminToast('info', 'Memindai Foto QR...', 'Sedang membaca kode QR dari foto kamera...');

  // 1. Coba decode via Html5Qrcode.scanFile
  if (typeof window !== 'undefined' && window.Html5Qrcode) {
    try {
      const html5QrCode = new window.Html5Qrcode('rpcCameraContainer');
      const decodedText = await html5QrCode.scanFile(file, true);
      if (decodedText) {
        playBeepSound();
        verifyRacepackByCode(decodedText);
        return;
      }
    } catch (err) {
      console.warn('Html5Qrcode file scan failed, trying BarcodeDetector fallback...', err);
    }
  }

  // 2. Fallback: Buat ImageBitmap dan decode via BarcodeDetector
  if (nativeBarcodeDetector) {
    try {
      const bitmap = await createImageBitmap(file);
      const barcodes = await nativeBarcodeDetector.detect(bitmap);
      if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
        playBeepSound();
        verifyRacepackByCode(barcodes[0].rawValue);
        return;
      }
    } catch {}
  }

  // 3. Fallback: Preview gambar dan minta ketik manual jika tidak terdeteksi
  showAdminToast('warning', 'QR Tidak Terbaca Jelas', 'Pastikan foto QR E-Tiket fokus dan tidak buram, atau masukkan kode secara manual.');
}

/**
 * Audio Beep Sound Effect on QR Read
 */
function playBeepSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch {}
}

// Global expose
window.verifyRacepackByCode = verifyRacepackByCode;
