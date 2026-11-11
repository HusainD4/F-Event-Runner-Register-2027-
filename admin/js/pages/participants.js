import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';
import { applyRbacUi } from '../core/rbac.js';
import { switchAdminTab } from '../core/sidebar.js';
import { verifyRacepackByCode } from './racepack.js';

let currentParticipantTab = 'ALL';

async function loadParticipants() {
  try {
    const res = await fetchAdmin('/admin/participants?limit=100');
    if (res.status === 'success') {
      adminState.participants = Array.isArray(res.data) ? res.data : (res.data?.participants || []);
      updateParticipantTabCounters(adminState.participants);
      applyParticipantFilters();

      const countEl = document.getElementById('kpiTotalParticipants');
      if (countEl) countEl.textContent = res.meta?.total || res.data?.pagination?.total || adminState.participants.length;
    }
  } catch (err) {
    console.error('Failed to load participants:', err);
  }
}

function updateParticipantTabCounters(participants) {
  const allCount = participants.length;
  let settledCount = 0;
  let pendingCount = 0;
  let cancelledCount = 0;
  let racepackDoneCount = 0;
  let racepackPendingCount = 0;

  participants.forEach(p => {
    const st = p.order?.status || 'PENDING';
    if (st === 'SETTLEMENT' || st === 'CAPTURE' || st === 'PAID') {
      settledCount++;
    } else if (st === 'CANCEL' || st === 'EXPIRE' || st === 'DENY' || st === 'REFUND') {
      cancelledCount++;
    } else {
      pendingCount++;
    }

    if (p.racepack?.checkedIn) {
      racepackDoneCount++;
    } else {
      racepackPendingCount++;
    }
  });

  const setBadge = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setBadge('countPartAll', allCount);
  setBadge('countPartSettled', settledCount);
  setBadge('countPartPending', pendingCount);
  setBadge('countPartCancelled', cancelledCount);
  setBadge('countPartRacepackDone', racepackDoneCount);
  setBadge('countPartRacepackPending', racepackPendingCount);
}

function switchParticipantFilterTab(tabKey) {
  currentParticipantTab = tabKey;

  document.querySelectorAll('.participant-tabs-nav .part-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabKey) {
      btn.className = 'btn btn-primary btn-sm part-tab-btn active';
    } else {
      btn.className = 'btn btn-outline btn-sm part-tab-btn';
    }
  });

  const titles = {
    ALL: 'Semua Peserta Terdaftar',
    SETTLED: 'Pembayaran Sukses / Lunas (Lomba & Tiket Terverifikasi)',
    PENDING: 'Menunggu Pembayaran (Pending Order)',
    CANCELLED: 'Dibatalkan / Kadaluarsa / Refund',
    RACEPACK_DONE: 'Racepack Sudah Diserahterimakan (Checked-in)',
    RACEPACK_PENDING: 'Racepack Belum Diambil'
  };

  const titleEl = document.getElementById('participantActiveTabTitle');
  if (titleEl) titleEl.textContent = titles[tabKey] || 'Semua Peserta Terdaftar';

  applyParticipantFilters();
}

function applyParticipantFilters() {
  const q = (document.getElementById('searchParticipant')?.value || '').toLowerCase();
  const categoryFilter = document.getElementById('filterParticipantCategory')?.value || '';

  let list = adminState.participants || [];

  // 1. Tab filter
  if (currentParticipantTab === 'SETTLED') {
    list = list.filter(p => {
      const st = p.order?.status || 'PENDING';
      return st === 'SETTLEMENT' || st === 'CAPTURE' || st === 'PAID';
    });
  } else if (currentParticipantTab === 'PENDING') {
    list = list.filter(p => (p.order?.status || 'PENDING') === 'PENDING');
  } else if (currentParticipantTab === 'CANCELLED') {
    list = list.filter(p => {
      const st = p.order?.status || 'PENDING';
      return st === 'CANCEL' || st === 'EXPIRE' || st === 'DENY' || st === 'REFUND';
    });
  } else if (currentParticipantTab === 'RACEPACK_DONE') {
    list = list.filter(p => p.racepack?.checkedIn === true);
  } else if (currentParticipantTab === 'RACEPACK_PENDING') {
    list = list.filter(p => !p.racepack?.checkedIn);
  }

  // 2. Category filter
  if (categoryFilter) {
    list = list.filter(p => (p.event?.category || '').includes(categoryFilter));
  }

  // 3. Search query
  if (q) {
    list = list.filter(p =>
      p.fullNameKtp.toLowerCase().includes(q) ||
      (p.bibName && p.bibName.toLowerCase().includes(q)) ||
      (p.bibNumber && p.bibNumber.toLowerCase().includes(q)) ||
      p.nik.includes(q) ||
      (p.order?.midtransOrderId && p.order.midtransOrderId.toLowerCase().includes(q)) ||
      (p.emergencyContactPhone && p.emergencyContactPhone.includes(q))
    );
  }

  const countEl = document.getElementById('participantFilteredCount');
  if (countEl) countEl.textContent = list.length;

  renderParticipantsTable(list);
}

function renderParticipantsTable(participants) {
  const tbody = document.getElementById('adminParticipantsTableBody');
  if (!tbody) return;

  if (participants.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="11" style="text-align: center; padding: 40px; color: #94A3B8;">
          <i class="fa-solid fa-users-slash" style="font-size: 2rem; margin-bottom: 8px; color: #CBD5E1; display: block;"></i>
          Tidak ada data peserta untuk filter yang dipilih.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = participants.map((p, idx) => {
    const isManual = !p.order?.midtransOrderId || p.order?.midtransOrderId?.startsWith('OFFLINE-');
    const isPaid = p.order?.status === 'SETTLEMENT' || p.order?.status === 'CAPTURE' || p.order?.status === 'PAID';
    const isCancel = p.order?.status === 'CANCEL' || p.order?.status === 'EXPIRE' || p.order?.status === 'DENY' || p.order?.status === 'REFUND';
    const statusPillClass = isPaid ? 'success' : (isCancel ? 'danger' : 'pending');
    const paymentStatusLabel = p.order?.status === 'EXPIRE' ? 'EXPIRE (expired time)' : (p.order?.status || 'PENDING');

    // Status Racepack Badge
    const isRpcDone = p.racepack && p.racepack.checkedIn;
    const rpcActor = isRpcDone
      ? `<small style="display:block; margin-top:4px; color:#475569;">Diserahkan oleh: <strong>${escapeHtml(p.racepack.checkedInBy || 'Admin')}</strong><br>${escapeHtml(p.racepack.checkedInAt ? new Date(p.racepack.checkedInAt).toLocaleString('id-ID') : '-')}</small>`
      : '';
    const rpcBadge = isRpcDone
      ? `<span class="badge" style="background:#DCFCE7; color:#15803D; font-weight:800; font-size:0.75rem; border:1px solid #BBF7D0; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-check"></i> Sudah Check-in</span>${rpcActor}`
      : `<span class="badge" style="background:#FFEDD5; color:#C2410C; font-weight:700; font-size:0.75rem; border:1px solid #FED7AA; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-box-open"></i> Belum Check-in</span>`;

    const bibDisplay = p.bibNumber 
      ? `<span class="badge" style="background:#0F172A; color:#38BDF8; font-weight:800; font-size:0.78rem; letter-spacing:0.5px;">${escapeHtml(p.bibNumber)}</span>`
      : `<span class="badge" style="background:#F1F5F9; color:#94A3B8; font-size:0.74rem;">-</span>`;

    return `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <strong style="color: #0F172A; font-size: 0.9rem;">${escapeHtml(p.fullNameKtp)}</strong>
          ${isManual ? '<span class="badge" style="background:#FFFBEB;color:#B45309;font-size:0.68rem;margin-left:4px;">Manual</span>' : ''}
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            ${bibDisplay}
            <small style="color: #64748B; font-size: 0.74rem;">${escapeHtml(p.bibName || '-')}</small>
          </div>
        </td>
        <td><code>${escapeHtml(p.nik)}</code></td>
        <td><strong style="color: var(--color-primary);">${escapeHtml(p.event?.category || '10K')}</strong></td>
        <td>
          <span style="font-size: 0.8rem; color: #334155;">
            ${p.gender === 'MALE' ? 'L (Pria)' : 'P (Wanita)'} • Gol: <strong>${p.bloodType || '-'}</strong>
          </span>
        </td>
        <td>
          <span class="badge" style="background: #F1F5F9; color: #0F172A; font-weight: 700;">Size ${p.selectedSize || 'M'}</span>
        </td>
        <td>
          <small style="color: #64748B; display: block;">
            ${escapeHtml(p.emergencyContactName || '-')}<br>
            <strong>${escapeHtml(p.emergencyContactPhone || '-')}</strong>
          </small>
        </td>
        <td>
          <span class="status-pill ${statusPillClass}">
            ${escapeHtml(paymentStatusLabel)}
          </span>
        </td>
        <td>
          ${rpcBadge}
        </td>
        <td>
          <div class="table-actions" style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn-icon btn-direct-rpc" data-id="${p.id}" data-bib="${escapeHtml(p.bibNumber || p.id)}" title="Buka Validasi Racepack" style="color: #EA580C; background: #FFEDD5;" data-permission="participants:update">
              <i class="fa-solid fa-box-open"></i>
            </button>
            <button class="btn-icon edit btn-edit-part" data-id="${p.id}" title="Edit Data Peserta" data-permission="participants:update">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-icon delete btn-delete-part" data-id="${p.id}" data-name="${escapeHtml(p.fullNameKtp)}" title="Hapus Peserta" data-permission="participants:delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach Listeners
  tbody.querySelectorAll('.btn-direct-rpc').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) {
        switchAdminTab('racepack');
        verifyRacepackByCode(id);
      }
    });
  });

  tbody.querySelectorAll('.btn-edit-part').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const p = adminState.participants.find(item => item.id === id);
      if (p) openEditParticipantModal(p);
    });
  });

  tbody.querySelectorAll('.btn-delete-part').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');

      const confirmed = await showConfirmDialog({
        title: 'Hapus Data Peserta?',
        message: `Apakah Anda yakin ingin menghapus data peserta "${name}"? Nomor BIB dan data peserta ini akan dihapus dari sistem.`,
        confirmText: 'Ya, Hapus Peserta',
        type: 'danger'
      });

      if (confirmed) {
        await deleteParticipantApi(id);
      }
    });
  });

  applyRbacUi(adminState.profile);
}

function openCreateParticipantModal() {
  document.getElementById('partFormId').value = '';
  document.getElementById('modalParticipantTitle').innerHTML = '<i class="fa-solid fa-user-plus" style="color: var(--color-primary);"></i> Tambah Peserta Manual';
  document.getElementById('partFormFullName').value = '';
  document.getElementById('partFormBibName').value = '';
  document.getElementById('partFormNik').value = '';
  document.getElementById('partFormEmergencyName').value = '';
  document.getElementById('partFormEmergencyPhone').value = '';

  document.getElementById('modalParticipantBackdrop')?.classList.add('open');
}

function openEditParticipantModal(p) {
  document.getElementById('partFormId').value = p.id;
  document.getElementById('modalParticipantTitle').innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Data Peserta: ${escapeHtml(p.fullNameKtp)}`;
  document.getElementById('partFormEventId').value = p.eventId || '';
  document.getElementById('partFormFullName').value = p.fullNameKtp;
  document.getElementById('partFormBibName').value = p.bibName || '';
  document.getElementById('partFormNik').value = p.nik;
  document.getElementById('partFormGender').value = p.gender || 'MALE';
  document.getElementById('partFormBloodType').value = p.bloodType || 'O';
  document.getElementById('partFormSize').value = p.selectedSize || 'M';
  document.getElementById('partFormBirthPlace').value = p.birthPlace || 'Tegal';
  document.getElementById('partFormBirthDate').value = p.birthDate ? p.birthDate.slice(0, 10) : '1995-05-15';
  document.getElementById('partFormAddress').value = p.fullAddress || 'Jl. Pancasila No. 12, Tegal';
  document.getElementById('partFormEmergencyName').value = p.emergencyContactName || '';
  document.getElementById('partFormEmergencyPhone').value = p.emergencyContactPhone || '';

  document.getElementById('modalParticipantBackdrop')?.classList.add('open');
}

async function handleParticipantFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('partFormId').value;

  const payload = {
    eventId: document.getElementById('partFormEventId').value,
    fullNameKtp: document.getElementById('partFormFullName').value.trim(),
    bibName: document.getElementById('partFormBibName').value.trim(),
    nik: document.getElementById('partFormNik').value.trim(),
    gender: document.getElementById('partFormGender').value,
    bloodType: document.getElementById('partFormBloodType').value,
    selectedSize: document.getElementById('partFormSize').value,
    birthPlace: document.getElementById('partFormBirthPlace').value.trim(),
    birthDate: document.getElementById('partFormBirthDate').value,
    fullAddress: document.getElementById('partFormAddress').value.trim(),
    country: 'Indonesia',
    emergencyContactName: document.getElementById('partFormEmergencyName').value.trim(),
    emergencyContactPhone: document.getElementById('partFormEmergencyPhone').value.trim(),
  };

  try {
    let res;
    if (id) {
      res = await fetchAdmin(`/admin/participants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetchAdmin('/admin/participants', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    }

    if (res.status === 'success') {
      showAdminToast('success', 'Berhasil', id ? 'Data peserta diperbarui!' : 'Peserta baru berhasil didaftarkan manual!');
      document.getElementById('modalParticipantBackdrop')?.classList.remove('open');
      loadParticipants();
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Validasi data peserta gagal');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function deleteParticipantApi(id) {
  try {
    const res = await fetchAdmin(`/admin/participants/${id}`, {
      method: 'DELETE'
    });

    if (res.status === 'success') {
      showAdminToast('success', 'Terhapus', 'Data peserta berhasil dihapus!');
      loadParticipants();
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

function exportParticipantsCsv() {
  if (adminState.participants.length === 0) {
    showAdminToast('warning', 'Peringatan', 'Tidak ada data peserta untuk diunduh.');
    return;
  }

  const headers = ['No', 'Nama KTP', 'Nomor BIB', 'BIB Name', 'NIK', 'Kategori', 'Gender', 'Gol Darah', 'Size Jersey', 'Emergency Contact', 'Status Bayar', 'Status Racepack'];
  const rows = adminState.participants.map((p, idx) => [
    idx + 1,
    `"${p.fullNameKtp}"`,
    `"${p.bibNumber || ''}"`,
    `"${p.bibName || ''}"`,
    `'${p.nik}`,
    `"${p.event?.category || ''}"`,
    p.gender,
    p.bloodType,
    p.selectedSize,
    `"${p.emergencyContactPhone || ''}"`,
    p.order?.status || 'PENDING',
    p.racepack?.checkedIn ? 'Sudah Check-in' : 'Belum Check-in'
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `peserta_tegal_run_2027_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export {
  loadParticipants,
  renderParticipantsTable,
  openCreateParticipantModal,
  openEditParticipantModal,
  handleParticipantFormSubmit,
  deleteParticipantApi,
  exportParticipantsCsv,
  switchParticipantFilterTab,
  applyParticipantFilters
};
