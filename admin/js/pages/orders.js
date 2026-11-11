import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml, formatRupiah } from '../core/utils.js';
import { applyRbacUi } from '../core/rbac.js';
import { loadParticipants } from './participants.js';
import { loadEvents } from './events.js';

async function loadOrders() {
  try {
    const status = document.getElementById('filterOrderStatus')?.value || '';
    const search = document.getElementById('searchOrder')?.value || '';
    const query = new URLSearchParams({ limit: '50' });
    if (status) query.append('status', status);
    if (search) query.append('search', search);

    const res = await fetchAdmin(`/admin/orders?${query.toString()}`);
    if (res.status === 'success') {
      adminState.orders = res.data;
      renderOrdersTable(res.data);
    }
  } catch (err) {
    console.error('Failed to load orders:', err);
  }
}

function renderOrdersTable(orders) {
  const tbody = document.getElementById('adminOrdersTableBody');
  if (!tbody) return;

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: #94A3B8;">
          Belum ada data transaksi/order.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders.map((o, idx) => {
    const dateStr = new Date(o.createdAt).toLocaleString('id-ID');
    const isPaid = o.status === 'SETTLEMENT' || o.status === 'CAPTURE';
    const isCancel = o.status === 'CANCEL' || o.status === 'EXPIRE' || o.status === 'DENY';
    const statusClass = isPaid ? 'success' : (isCancel ? 'danger' : 'pending');
    const statusLabel = o.status === 'EXPIRE' ? 'EXPIRE (expired time)' : o.status;

    const isManual = !o.midtransOrderId || o.midtransOrderId.startsWith('OFFLINE-');
    const typeBadge = isManual
      ? `<span class="badge" style="background:#FFFBEB;color:#B45309;font-weight:700;border:1px solid #FDE68A;font-size:0.75rem;"><i class="fa-solid fa-user-pen"></i> Pendaftaran Manual</span>`
      : `<span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;border:1px solid #BFDBFE;font-size:0.75rem;"><i class="fa-solid fa-globe"></i> Website (Midtrans)</span>`;

    return `
      <tr>
        <td>${idx + 1}</td>
        <td><code>${escapeHtml(o.midtransOrderId || o.id.slice(0, 12))}</code></td>
        <td>${typeBadge}</td>
        <td><strong>${escapeHtml(o.user?.fullName || 'Anonim')}</strong></td>
        <td><small>${escapeHtml(o.user?.email || '-')}<br>${escapeHtml(o.user?.phoneNumber || '-')}</small></td>
        <td style="text-align: center;"><strong>${o.participantsCount}</strong> Peserta</td>
        <td><strong style="color: var(--color-primary);">${formatRupiah(o.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${statusClass}">
            ${escapeHtml(statusLabel)}
          </span>
        </td>
        <td><small style="color: #64748B;">${dateStr}</small></td>
        <td>
          <div class="table-actions">
            <button class="btn-icon btn-view-order-details" data-id="${escapeHtml(o.id)}" title="Lihat detail tiket">
              <i class="fa-solid fa-ticket"></i>
            </button>
            <button class="btn-icon edit btn-update-order-status" data-id="${o.id}" data-display="${escapeHtml(o.midtransOrderId || o.id)}" data-status="${o.status}" title="Ubah Status Order" data-permission="orders:update">
              <i class="fa-solid fa-file-pen"></i>
            </button>
            <button class="btn-icon delete btn-delete-order" data-id="${o.id}" title="Hapus Order" data-permission="orders:delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach Listeners
  tbody.querySelectorAll('.btn-view-order-details').forEach(btn => {
    btn.addEventListener('click', () => openOrderDetails(btn.dataset.id));
  });

  document.querySelectorAll('.btn-update-order-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const displayId = btn.getAttribute('data-display');
      const currentStatus = btn.getAttribute('data-status');
      openOrderStatusModal(id, displayId, currentStatus);
    });
  });

  document.querySelectorAll('.btn-delete-order').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');

      const confirmed = await showConfirmDialog({
        title: 'Hapus Data Transaksi?',
        message: 'PERINGATAN: Apakah Anda yakin ingin menghapus data transaksi ini dari riwayat keuangan?',
        confirmText: 'Ya, Hapus Transaksi',
        type: 'danger'
      });

      if (confirmed) {
        await deleteOrderApi(id);
      }
    });
  });

  applyRbacUi(adminState.profile);
}

async function openOrderDetails(id) {
  const content = document.getElementById('orderDetailsContent');
  const backdrop = document.getElementById('modalOrderDetailsBackdrop');
  if (!content || !backdrop) return;

  backdrop.classList.add('open');
  content.innerHTML = '<div style="text-align:center; color:#64748B; padding:24px;">Memuat detail tiket...</div>';
  try {
    const res = await fetchAdmin(`/admin/orders/${encodeURIComponent(id)}`);
    if (!res || res.status !== 'success' || !res.data) {
      throw new Error(res?.message || 'Detail transaksi tidak dapat dimuat.');
    }

    const order = res.data;
    const displayValue = (value) => escapeHtml(value === null || value === undefined || value === '' ? '-' : String(value));
    const dateValue = (value) => value ? new Date(value).toLocaleString('id-ID') : '-';
    const statusLabel = order.status === 'EXPIRE' ? 'EXPIRE (expired time)' : order.status;
    const detailRow = (label, value) => `<div style="padding:8px 0; border-bottom:1px solid #E2E8F0;"><strong>${label}:</strong> ${value}</div>`;
    const participants = Array.isArray(order.participants) ? order.participants : [];

    content.innerHTML = `
      <section style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:0 20px; margin-bottom:18px;">
        ${detailRow('Order ID', displayValue(order.midtransOrderId || order.id))}
        ${detailRow('Status pembayaran', displayValue(statusLabel))}
        ${detailRow('Total transaksi', formatRupiah(order.totalAmount))}
        ${detailRow('Waktu transaksi', displayValue(dateValue(order.createdAt)))}
        ${detailRow('Nama pemesan', displayValue(order.user?.fullName))}
        ${detailRow('Email / telepon', `${displayValue(order.user?.email)} / ${displayValue(order.user?.phoneNumber)}`)}
      </section>
      <h5 style="margin:12px 0;">Data Tiket &amp; Peserta (${participants.length})</h5>
      <div style="display:grid; gap:12px;">
        ${participants.length ? participants.map((participant, index) => `
          <article style="border:1px solid #E2E8F0; border-radius:12px; padding:14px;">
            <h6 style="margin:0 0 8px; color:#0F172A;">${index + 1}. ${displayValue(participant.fullNameKtp)}</h6>
            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:0 18px; font-size:.88rem;">
              ${detailRow('Kategori tiket', displayValue(participant.event?.ticketName || participant.event?.category))}
              ${detailRow('BIB', displayValue(participant.bibNumber))}
              ${detailRow('NIK', displayValue(participant.nik))}
              ${detailRow('Tanggal / tempat lahir', `${displayValue(participant.birthDate ? new Date(participant.birthDate).toLocaleDateString('id-ID') : '-')} / ${displayValue(participant.birthPlace)}`)}
              ${detailRow('Jenis kelamin / golongan darah', `${displayValue(participant.gender)} / ${displayValue(participant.bloodType)}`)}
              ${detailRow('Ukuran jersey', displayValue(participant.selectedSize))}
              ${detailRow('Nama jersey / jenis', `${displayValue(participant.jersey?.name)} / ${displayValue(participant.jersey?.type)}`)}
              ${detailRow('Komunitas', displayValue(participant.communityName))}
              ${detailRow('Kontak darurat', `${displayValue(participant.emergencyContactName)} / ${displayValue(participant.emergencyContactPhone)}`)}
              ${detailRow('Alamat', displayValue(participant.fullAddress))}
              ${detailRow('Riwayat medis', displayValue(participant.medicalHistory))}
            </div>
          </article>
        `).join('') : '<div style="color:#64748B;">Belum ada data peserta pada transaksi ini.</div>'}
      </div>
    `;
  } catch (error) {
    content.innerHTML = `<div style="color:#B91C1C;">${escapeHtml(error.message || 'Detail transaksi gagal dimuat.')}</div>`;
    showAdminToast('error', 'Gagal Memuat Detail', error.message || 'Detail transaksi gagal dimuat.');
  }
}

function openOrderStatusModal(id, displayId, currentStatus) {
  document.getElementById('orderFormId').value = id;
  document.getElementById('orderFormDisplayId').value = displayId;
  document.getElementById('orderFormStatus').value = currentStatus || 'SETTLEMENT';
  document.getElementById('orderFormReason').value = '';
  document.getElementById('modalOrderBackdrop')?.classList.add('open');
}

async function handleOrderStatusSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('orderFormId').value;
  const status = document.getElementById('orderFormStatus').value;
  const reason = document.getElementById('orderFormReason').value.trim();

  try {
    const res = await fetchAdmin(`/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, reason })
    });

    if (res.status === 'success') {
      showAdminToast('success', 'Status Diperbarui', `Status order berhasil diubah menjadi ${status}!`);
      document.getElementById('modalOrderBackdrop')?.classList.remove('open');
      loadOrders();
      loadParticipants();
      loadEvents();
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function deleteOrderApi(id) {
  try {
    const res = await fetchAdmin(`/admin/orders/${id}`, {
      method: 'DELETE'
    });

    if (res.status === 'success') {
      showAdminToast('success', 'Terhapus', 'Data transaksi berhasil dihapus!');
      loadOrders();
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}


export {
  loadOrders,
  renderOrdersTable,
  openOrderDetails,
  openOrderStatusModal,
  handleOrderStatusSubmit,
  deleteOrderApi
};
