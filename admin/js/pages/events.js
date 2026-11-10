import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';
import { applyRbacUi } from '../core/rbac.js';
import { updateKpis } from './dashboard.js';

async function loadEvents() {
  try {
    const res = await fetchAdmin('/admin/events');
    if (res.status === 'success') {
      adminState.events = res.data;
      renderEvents(res.data);
      updateKpis();

      // Populate Event Select Options for Participant Modal
      const eventSelect = document.getElementById('partFormEventId');
      if (eventSelect) {
        eventSelect.innerHTML = res.data.map(e => `
          <option value="${e.id}">${escapeHtml(e.ticketName)} (${escapeHtml(e.category)})</option>
        `).join('');
      }

      // Update badge on sidebar
      const navBadge = document.getElementById('navEventsCount');
      if (navBadge) navBadge.textContent = res.data.length;
    }
  } catch (err) {
    console.error('Failed to load events:', err);
  }
}

function renderEvents(events) {
  const container = document.getElementById('adminEventsContainer');
  if (!container) return;

  if (events.length === 0) {
    container.innerHTML = `<div style="grid-column: span 2; text-align: center; padding: 40px; color: #94A3B8;">Belum ada event/kategori yang ditambahkan.</div>`;
    return;
  }

  container.innerHTML = '';

  events.forEach(ev => {
    const card = document.createElement('div');
    card.className = `admin-event-card ${ev.isClosed ? 'closed-event' : ''}`;

    const eventDateStr = ev.eventDate ? new Date(ev.eventDate).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) + ' WIB' : 'Belum diatur';

    card.innerHTML = `
      <div class="admin-event-card-header">
        <div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0 0 4px 0;">
            ${escapeHtml(ev.ticketName)}
          </h4>
          <span style="font-size: 0.8rem; color: #64748B;">
            Kategori: <strong>${escapeHtml(ev.category)}</strong> • Pelaksanaan: <strong>${eventDateStr}</strong>
          </span>
        </div>
        <span class="event-status-tag ${ev.isClosed ? 'closed' : 'open'}">
          <i class="${ev.isClosed ? 'fa-solid fa-lock' : 'fa-solid fa-lock-open'}"></i>
          ${ev.isClosed ? 'Ditutup' : 'Dibuka'}
        </span>
      </div>

      <div class="admin-event-form">
        <div class="form-row">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Sisa Kuota Tiket (Stok)</label>
            <input type="number" class="form-input" id="eventStock-${ev.id}" value="${ev.stock}" min="0">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Harga Tiket (Rp)</label>
            <input type="number" class="form-input" id="eventPrice-${ev.id}" value="${ev.price}" min="0" step="5000">
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-subtle); padding-top: 16px; margin-top: 8px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm btn-quick-save-event" data-id="${ev.id}" data-permission="events:update">
              <i class="fa-solid fa-check"></i> Simpan
            </button>
            <button class="btn btn-secondary btn-sm btn-edit-event" data-id="${ev.id}" data-permission="events:update">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button class="btn btn-outline btn-sm btn-manage-benefits" data-id="${ev.id}" data-name="${escapeHtml(ev.ticketName)}" data-permission="benefits:manage" title="Kelola Fasilitas / Benefit Tiket" style="color: #4F46E5; border-color: #C7D2FE;">
              <i class="fa-solid fa-gift"></i> Benefit (${ev.benefits ? ev.benefits.length : (ev._count?.benefits || 0)})
            </button>
            <button class="btn btn-outline btn-sm btn-delete-event" data-id="${ev.id}" data-name="${escapeHtml(ev.ticketName)}" data-permission="events:delete" style="color: #EF4444; border-color: #FECACA;">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>

          <button class="btn ${ev.isClosed ? 'btn-secondary' : 'btn-outline'} btn-sm btn-toggle-close-event" data-id="${ev.id}" data-closed="${ev.isClosed}" data-permission="events:update">
            <i class="${ev.isClosed ? 'fa-solid fa-lock-open' : 'fa-solid fa-lock'}"></i>
            ${ev.isClosed ? 'Buka Kategori' : 'Tutup Kategori'}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach Listeners
  document.querySelectorAll('.btn-quick-save-event').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const stock = parseInt(document.getElementById(`eventStock-${id}`).value, 10);
      const price = parseFloat(document.getElementById(`eventPrice-${id}`).value);
      await updateEventApi(id, { stock, price }, 'Kuota dan harga kategori berhasil diperbarui!');
    });
  });

  document.querySelectorAll('.btn-toggle-close-event').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const isClosed = btn.getAttribute('data-closed') === 'true';
      const newState = !isClosed;

      const confirmed = await showConfirmDialog({
        title: newState ? 'Tutup Kategori Event?' : 'Buka Kategori Event?',
        message: `Apakah Anda yakin ingin ${newState ? 'MENUTUP' : 'MEMBUKA'} pendaftaran untuk kategori event ini?`,
        confirmText: newState ? 'Ya, Tutup Kategori' : 'Ya, Buka Kategori',
        type: newState ? 'danger' : 'warning'
      });

      if (confirmed) {
        await updateEventApi(id, { isClosed: newState }, newState ? 'Kategori ditutup!' : 'Kategori dibuka!');
      }
    });
  });

  document.querySelectorAll('.btn-manage-benefits').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      openEventBenefitsModal(id, name);
    });
  });

  document.querySelectorAll('.btn-edit-event').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const ev = adminState.events.find(e => e.id === id);
      if (ev) openEditEventModal(ev);
    });
  });

  document.querySelectorAll('.btn-delete-event').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');

      const confirmed = await showConfirmDialog({
        title: 'Hapus Kategori Event?',
        message: `PERINGATAN: Apakah Anda yakin ingin menghapus kategori "${name}"? Seluruh data yang terkait akan dihapus permanen.`,
        confirmText: 'Ya, Hapus Permanen',
        type: 'danger'
      });

      if (confirmed) {
        await deleteEventApi(id);
      }
    });
  });

  applyRbacUi(adminState.profile);
}

function openCreateEventModal() {
  document.getElementById('eventFormId').value = '';
  document.getElementById('modalEventTitle').innerHTML = '<i class="fa-solid fa-calendar-plus" style="color: var(--color-primary);"></i> Tambah Event Baru';
  document.getElementById('eventFormTicketName').value = '';
  document.getElementById('eventFormCategory').value = '10K';
  document.getElementById('eventFormStock').value = 500;
  document.getElementById('eventFormPrice').value = 250000;
  document.getElementById('eventFormDate').value = '';
  document.getElementById('eventFormTicketImage').value = '';
  document.getElementById('eventFormMedalImage').value = '';
  document.getElementById('eventFormIsClosed').checked = false;

  document.getElementById('modalEventBackdrop')?.classList.add('open');
}

function openEditEventModal(ev) {
  document.getElementById('eventFormId').value = ev.id;
  document.getElementById('modalEventTitle').innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Event: ${escapeHtml(ev.ticketName)}`;
  document.getElementById('eventFormTicketName').value = ev.ticketName;
  document.getElementById('eventFormCategory').value = ev.category;
  document.getElementById('eventFormStock').value = ev.stock;
  document.getElementById('eventFormPrice').value = ev.price;
  document.getElementById('eventFormTicketImage').value = ev.ticketImage || '';
  document.getElementById('eventFormMedalImage').value = ev.medalImage || '';

  if (ev.eventDate) {
    const d = new Date(ev.eventDate);
    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('eventFormDate').value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } else {
    document.getElementById('eventFormDate').value = '';
  }

  document.getElementById('eventFormIsClosed').checked = Boolean(ev.isClosed);
  document.getElementById('modalEventBackdrop')?.classList.add('open');
}

async function handleEventFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('eventFormId').value;
  const ticketName = document.getElementById('eventFormTicketName').value.trim();
  const category = document.getElementById('eventFormCategory').value.trim();
  const stock = parseInt(document.getElementById('eventFormStock').value, 10);
  const price = parseFloat(document.getElementById('eventFormPrice').value);
  const dateVal = document.getElementById('eventFormDate').value;
  const ticketImage = document.getElementById('eventFormTicketImage').value.trim() || null;
  const medalImage = document.getElementById('eventFormMedalImage').value.trim() || null;
  const isClosed = document.getElementById('eventFormIsClosed').checked;

  const payload = {
    ticketName,
    category,
    stock,
    price,
    ticketImage,
    medalImage,
    eventDate: dateVal ? new Date(dateVal).toISOString() : null,
    isClosed
  };

  try {
    let res;
    if (id) {
      res = await fetchAdmin(`/admin/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetchAdmin('/admin/events', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    }

    if (res.status === 'success') {
      showAdminToast('success', 'Berhasil', id ? 'Event berhasil diperbarui!' : 'Event baru berhasil ditambahkan!');
      document.getElementById('modalEventBackdrop')?.classList.remove('open');
      loadEvents();
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Validasi gagal');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function updateEventApi(id, payload, successMsg) {
  try {
    const res = await fetchAdmin(`/admin/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    if (res.status === 'success') {
      showAdminToast('success', 'Berhasil', successMsg);
      loadEvents();
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function deleteEventApi(id) {
  try {
    const res = await fetchAdmin(`/admin/events/${id}`, {
      method: 'DELETE'
    });

    if (res.status === 'success') {
      showAdminToast('success', 'Terhapus', 'Kategori event berhasil dihapus!');
      loadEvents();
    } else {
      showAdminToast('error', 'Gagal Menghapus', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

// --- EVENT BENEFITS CRUD ---
let currentBenefitEventId = null;
let currentEditingBenefitId = null;

async function openEventBenefitsModal(eventId, eventName) {
  currentBenefitEventId = eventId;
  currentEditingBenefitId = null;

  const eventInput = document.getElementById('benefitFormEventId');
  if (eventInput) eventInput.value = eventId;

  const idInput = document.getElementById('benefitFormId');
  if (idInput) idInput.value = '';

  const subTitle = document.getElementById('benefitModalSubtitle');
  if (subTitle) subTitle.textContent = `Kategori: ${eventName}`;

  resetBenefitForm();
  document.getElementById('modalEventBenefitsBackdrop')?.classList.add('open');
  await loadEventBenefits(eventId);
}

async function loadEventBenefits(eventId) {
  const tbody = document.getElementById('eventBenefitsTableBody');
  const countEl = document.getElementById('benefitListCount');
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 20px; color: #94A3B8;"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat benefit...</td></tr>`;
  }

  try {
    const res = await fetchAdmin(`/admin/events/${eventId}/benefits`);
    if (res.status === 'success') {
      const benefits = res.data || [];
      if (countEl) countEl.textContent = benefits.length;
      renderEventBenefitsTable(benefits);
    } else {
      showAdminToast('error', 'Gagal Memuat Benefit', res.message);
    }
  } catch (err) {
    console.error('Failed to load event benefits:', err);
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 20px; color: #EF4444;">Gagal memuat data: ${escapeHtml(err.message)}</td></tr>`;
    }
  }
}

function renderEventBenefitsTable(benefits) {
  const tbody = document.getElementById('eventBenefitsTableBody');
  if (!tbody) return;

  if (benefits.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 24px; color: #94A3B8;">Belum ada benefit untuk kategori ini. Tambahkan melalui form di atas.</td></tr>`;
    return;
  }

  tbody.innerHTML = benefits.map(b => `
    <tr>
      <td>
        <div style="font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 8px;">
          ${b.image ? `<img src="${escapeHtml(b.image)}" alt="" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px;">` : `<i class="fa-solid fa-medal" style="color: #F97316;"></i>`}
          <span>${escapeHtml(b.name)}</span>
        </div>
      </td>
      <td style="font-size: 0.85rem; color: #475569;">
        ${escapeHtml(b.description)}
      </td>
      <td style="text-align: center; white-space: nowrap;">
        <div style="display: flex; gap: 6px; justify-content: center;">
          <button type="button" class="btn btn-secondary btn-sm btn-edit-benefit" data-id="${b.id}" data-name="${escapeHtml(b.name)}" data-desc="${escapeHtml(b.description)}" data-image="${escapeHtml(b.image || '')}" style="padding: 4px 8px; font-size: 0.75rem;">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button type="button" class="btn btn-outline btn-sm btn-delete-benefit" data-id="${b.id}" data-name="${escapeHtml(b.name)}" style="padding: 4px 8px; font-size: 0.75rem; color: #EF4444; border-color: #FECACA;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.btn-edit-benefit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const desc = btn.getAttribute('data-desc');
      const image = btn.getAttribute('data-image');

      currentEditingBenefitId = id;
      const idInput = document.getElementById('benefitFormId');
      if (idInput) idInput.value = id;
      const nameInput = document.getElementById('benefitFormName');
      if (nameInput) nameInput.value = name;
      const descInput = document.getElementById('benefitFormDesc');
      if (descInput) descInput.value = desc;
      const imgInput = document.getElementById('benefitFormImage');
      if (imgInput) imgInput.value = image || '';

      const titleEl = document.getElementById('benefitFormTitle');
      if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-pen" style="color: var(--color-primary);"></i> Edit Benefit: ${escapeHtml(name)}`;
      const cancelBtn = document.getElementById('btnCancelBenefitEdit');
      if (cancelBtn) cancelBtn.style.display = 'inline-block';
      const saveBtn = document.getElementById('btnSaveBenefitSubmit');
      if (saveBtn) saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Perbarui Benefit';
    });
  });

  tbody.querySelectorAll('.btn-delete-benefit').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');

      const confirmed = await showConfirmDialog({
        title: 'Hapus Fasilitas / Benefit?',
        message: `Apakah Anda yakin ingin menghapus "${name}" dari fasilitas event ini?`,
        confirmText: 'Ya, Hapus',
        type: 'danger'
      });

      if (confirmed) {
        await deleteBenefitApi(id);
      }
    });
  });
}

function resetBenefitForm() {
  currentEditingBenefitId = null;
  const idInput = document.getElementById('benefitFormId');
  if (idInput) idInput.value = '';
  const nameInput = document.getElementById('benefitFormName');
  if (nameInput) nameInput.value = '';
  const descInput = document.getElementById('benefitFormDesc');
  if (descInput) descInput.value = '';
  const imgInput = document.getElementById('benefitFormImage');
  if (imgInput) imgInput.value = '';

  const titleEl = document.getElementById('benefitFormTitle');
  if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Fasilitas / Benefit Baru`;
  const cancelBtn = document.getElementById('btnCancelBenefitEdit');
  if (cancelBtn) cancelBtn.style.display = 'none';
  const saveBtn = document.getElementById('btnSaveBenefitSubmit');
  if (saveBtn) saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Simpan Benefit';
}

async function handleBenefitFormSubmit(e) {
  e.preventDefault();
  const eventId = currentBenefitEventId || document.getElementById('benefitFormEventId')?.value;
  const benefitId = currentEditingBenefitId || document.getElementById('benefitFormId')?.value;
  const name = document.getElementById('benefitFormName')?.value.trim();
  const description = document.getElementById('benefitFormDesc')?.value.trim();
  const image = document.getElementById('benefitFormImage')?.value.trim() || null;

  if (!eventId) {
    showAdminToast('warning', 'Peringatan', 'Event ID tidak terdeteksi.');
    return;
  }

  if (!name || !description) {
    showAdminToast('warning', 'Validasi Gagal', 'Nama dan deskripsi benefit wajib diisi.');
    return;
  }

  const payload = { name, description, image };
  const btn = document.getElementById('btnSaveBenefitSubmit');
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Menyimpan...';
  }

  try {
    let res;
    if (benefitId) {
      res = await fetchAdmin(`/admin/benefits/${benefitId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetchAdmin(`/admin/events/${eventId}/benefits`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    }

    if (res.status === 'success') {
      showAdminToast('success', 'Berhasil', benefitId ? 'Benefit berhasil diperbarui!' : 'Benefit baru berhasil ditambahkan!');
      resetBenefitForm();
      await loadEventBenefits(eventId);
      await loadEvents();
    } else {
      showAdminToast('error', 'Gagal Menyimpan Benefit', res.message || 'Terjadi kesalahan');
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

async function deleteBenefitApi(benefitId) {
  try {
    const res = await fetchAdmin(`/admin/benefits/${benefitId}`, {
      method: 'DELETE'
    });

    if (res.status === 'success') {
      showAdminToast('success', 'Dihapus', 'Benefit berhasil dihapus dari database.');
      if (currentBenefitEventId) {
        await loadEventBenefits(currentBenefitEventId);
      }
      await loadEvents();
    } else {
      showAdminToast('error', 'Gagal Menghapus', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan', err.message);
  }
}


window.openEventBenefitsModal = openEventBenefitsModal;

export {
  loadEvents,
  renderEvents,
  openCreateEventModal,
  openEditEventModal,
  handleEventFormSubmit,
  updateEventApi,
  deleteEventApi,
  openEventBenefitsModal,
  loadEventBenefits,
  renderEventBenefitsTable,
  resetBenefitForm,
  handleBenefitFormSubmit,
  deleteBenefitApi
};
