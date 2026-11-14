import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';
import { applyRbacUi } from '../core/rbac.js';
import { switchAdminTab } from '../core/sidebar.js';
import { tabForKey } from '../core/tabs.js';
import { apiFetch } from '../../../js/api.js';
import { handleLogout } from '../core/auth.js';
import { verifyRacepackByCode } from './racepack.js';

let currentParticipantTab = 'ALL';
let participantPage = 1;
let participantPageSize = 100;
let participantPages = 1;
let participantRequestId = 0;

function openClearParticipantsDialog() {
  if (adminState.profile?.role?.name !== 'SUPERADMIN') return;
  const dialog = document.getElementById('clearParticipantsDialog');
  document.getElementById('clearParticipantsConfirmation').value = '';
  document.getElementById('clearParticipantsError').hidden = true;
  dialog.showModal();
}

async function handleClearParticipants(event) {
  event.preventDefault();
  const input = document.getElementById('clearParticipantsConfirmation');
  const error = document.getElementById('clearParticipantsError');
  if (input.value !== 'KOSONGKAN DATA PESERTA') {
    error.textContent = 'Ketik KOSONGKAN DATA PESERTA dengan tepat.';
    error.hidden = false;
    input.focus();
    return;
  }
  const button = document.getElementById('btnConfirmClearParticipants');
  const cancel = document.getElementById('btnCancelClearParticipants');
  const dialog = document.getElementById('clearParticipantsDialog');
  button.disabled = true;
  cancel.disabled = true;
  error.hidden = true;
  try {
    const result = await fetchAdmin('/admin/participants/clear', {
      method: 'POST',
      body: JSON.stringify({ confirmation: input.value })
    });
    if (result.status !== 'success') throw new Error(result.message || 'Pengosongan data gagal.');
    dialog.close();
    showAdminToast('success', 'Data dikosongkan', `${result.data.participants} peserta dan ${result.data.orders} pesanan dihapus; ${result.data.restoredStock} kuota dikembalikan.`);
    await loadParticipants();
  } catch (err) {
    error.textContent = `${err.message || 'Pengosongan data gagal.'} Periksa data dan log audit sebelum mencoba lagi.`;
    error.hidden = false;
  } finally {
    button.disabled = false;
    cancel.disabled = false;
  }
}

async function loadParticipants() {
  const requestId = ++participantRequestId;
  const query = new URLSearchParams({
    page: String(participantPage), limit: String(participantPageSize), tab: currentParticipantTab,
    category: document.getElementById('filterParticipantCategory')?.value || '',
    search: document.getElementById('searchParticipant')?.value || '',
  });
  const requestedPage = participantPage;
  const requestedPageSize = participantPageSize;
  const hint = document.getElementById('participantFilterHint');
  if (hint) hint.textContent = 'Memuat data sesuai filter; tabel sebelumnya masih ditampilkan.';
  try {
    const res = await fetchAdmin(`/admin/participants?${query}`);
    if (requestId !== participantRequestId) return false;
    if (query.get('tab') !== currentParticipantTab ||
        requestedPage !== participantPage || requestedPageSize !== participantPageSize ||
        query.get('search') !== (document.getElementById('searchParticipant')?.value || '') ||
        query.get('category') !== (document.getElementById('filterParticipantCategory')?.value || '')) return false;
    if (res?.status !== 'success') throw new Error(res?.message || 'Data peserta tidak dapat dimuat.');
    const participants = Array.isArray(res.data) ? res.data : res.data?.participants;
    if (!Array.isArray(participants)) throw new Error('Respons data peserta tidak valid.');
    if (participantPage > Math.max(1, res.meta.totalPages)) {
      participantPage = Math.max(1, res.meta.totalPages);
      return loadParticipants();
    }
    adminState.participants = participants;
    updateParticipantTabCounters(res.meta.tabCounts);
    document.getElementById('participantFilteredCount').textContent = res.meta.total;
    participantPages = Math.max(1, res.meta.totalPages);
    document.getElementById('participantPageInfo').textContent = `Halaman ${participantPage} dari ${participantPages} • ${res.meta.total} peserta`;
    document.getElementById('btnParticipantPrevious').disabled = participantPage <= 1;
    document.getElementById('btnParticipantNext').disabled = participantPage >= participantPages;
    renderParticipantsTable(participants);
    if (hint) hint.textContent = 'Jumlah tab mengikuti pencarian dan kategori; CSV mengikuti semua filter aktif.';
    return true;
  } catch (err) {
    if (requestId !== participantRequestId) return false;
    if (hint) hint.textContent = 'Gagal memuat filter terbaru. Tabel sebelumnya masih ditampilkan; coba segarkan.';
    console.error('Failed to load participants:', err);
    showAdminToast('error', 'Gagal Memuat Peserta', escapeHtml(err.message || 'Data peserta tidak dapat dimuat. Data sebelumnya masih ditampilkan.'));
    return false;
  }
}

async function handleRefreshParticipants() {
  const button = document.getElementById('btnRefreshParticipants');
  if (!button || button.disabled) return;
  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Memuat...';
  try {
    if (await loadParticipants()) {
      showAdminToast('success', 'Data Diperbarui', 'Data peserta berhasil dimuat ulang.');
    }
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
}

function updateParticipantTabCounters(counts) {
  const setBadge = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setBadge('countPartAll', counts.ALL);
  setBadge('countPartSettled', counts.SETTLED);
  setBadge('countPartPending', counts.PENDING);
  setBadge('countPartCancelled', counts.CANCELLED);
  setBadge('countPartRacepackDone', counts.RACEPACK_DONE);
  setBadge('countPartRacepackPending', counts.RACEPACK_PENDING);
}

function switchParticipantFilterTab(tabKey) {
  const tabs = [...document.querySelectorAll('.participant-tabs-nav .part-tab-btn')];
  const selected = tabs.find(btn => btn.dataset.tab === tabKey);
  if (!selected) return;
  currentParticipantTab = tabKey;
  tabs.forEach(btn => {
    const active = btn === selected;
    btn.setAttribute('aria-selected', String(active));
    btn.tabIndex = active ? 0 : -1;
  });
  document.getElementById('participantResults')?.setAttribute('aria-labelledby', selected.id);

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

function initParticipantFilterTabs(tablist) {
  if (!tablist) return;
  tablist.addEventListener('click', event => {
    const tab = event.target.closest('.part-tab-btn');
    if (tab && tablist.contains(tab)) switchParticipantFilterTab(tab.dataset.tab);
  });
  tablist.addEventListener('keydown', event => {
    const tab = tabForKey(tablist, event.key);
    if (!tab) return;
    event.preventDefault();
    switchParticipantFilterTab(tab.dataset.tab);
    tab.focus();
  });
}

function applyParticipantFilters() {
  participantPage = 1;
  void loadParticipants();
}

function changeParticipantPage(delta) {
  const next = Math.max(1, Math.min(participantPages, participantPage + delta));
  if (next === participantPage) return;
  participantPage = next;
  void loadParticipants();
}

function changeParticipantPageSize() {
  const size = Number(document.getElementById('participantPageSize')?.value);
  if (![10, 50, 100, 500].includes(size)) return;
  participantPageSize = size;
  participantPage = 1;
  void loadParticipants();
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
        <td>${(participantPage - 1) * participantPageSize + idx + 1}</td>
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

async function exportParticipantsCsv() {
  const button = document.getElementById('btnExportCsv');
  if (!button || button.disabled) return;
  const original = button.innerHTML;
  button.disabled = true;
  try {
    const confirmed = await showConfirmDialog({
      title: 'Unduh Data Peserta?',
      message: 'CSV berisi seluruh peserta sesuai filter aktif, termasuk NIK, riwayat kesehatan, kontak, dan transaksi. Simpan dan bagikan file secara aman.',
      confirmText: 'Ya, Unduh CSV',
      type: 'warning',
    });
    if (!confirmed) return;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyiapkan CSV...';
    const response = await apiFetch('/admin/participants/export-csv', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'Accept': 'text/csv' },
      body: JSON.stringify({
        tab: currentParticipantTab,
        category: document.getElementById('filterParticipantCategory')?.value || '',
        search: document.getElementById('searchParticipant')?.value || '',
      }),
    });
    if (response.status === 401) {
      handleLogout({ revoke: false });
      throw new Error('Sesi admin telah berakhir. Silakan login kembali.');
    }
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      throw new Error(result?.message || `Unduhan gagal (HTTP ${response.status}).`);
    }
    if (!response.headers.get('content-type')?.toLowerCase().includes('text/csv')) {
      throw new Error('Respons unduhan bukan CSV. Periksa backend.');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `peserta-transaksi-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showAdminToast('success', 'CSV Disiapkan', 'Data sesuai filter aktif berhasil diunduh.');
  } catch (error) {
    console.error('Gagal mengunduh CSV peserta:', error);
    showAdminToast('error', 'Unduhan Gagal', escapeHtml(error.message || 'CSV tidak dapat diunduh.'));
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
}

export {
  openClearParticipantsDialog,
  handleClearParticipants,
  loadParticipants,
  handleRefreshParticipants,
  renderParticipantsTable,
  openCreateParticipantModal,
  openEditParticipantModal,
  handleParticipantFormSubmit,
  deleteParticipantApi,
  exportParticipantsCsv,
  switchParticipantFilterTab,
  initParticipantFilterTabs,
  applyParticipantFilters,
  changeParticipantPage,
  changeParticipantPageSize
};
