import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';
import { adminState } from '../core/state.js';
import { applyRbacUi } from '../core/rbac.js';


// =============================================================================
// ROUTE POINTS CRUD
// =============================================================================
let currentEditingRoutePointId = null;

function updateRouteSettingPreviews() {
  const mapMode = document.getElementById('routeMapMode');
  const checkpointMode = document.getElementById('routeCheckpointMode');
  const mapUrlField = document.getElementById('routeMapUrlField');
  const mapImageField = document.getElementById('routeMapImageField');
  const checkpointImageField = document.getElementById('routeCheckpointImageField');
  const manualPanels = document.querySelectorAll('.route-manual-only');
  if (!mapMode || !checkpointMode) return;

  mapUrlField.hidden = mapMode.value !== 'GMAPS';
  mapImageField.hidden = mapMode.value !== 'IMAGE';
  checkpointImageField.hidden = checkpointMode.value !== 'IMAGE';
  manualPanels.forEach(panel => { panel.hidden = checkpointMode.value !== 'MANUAL'; });

  const setPreview = (inputId, previewId) => {
    const url = document.getElementById(inputId)?.value.trim() || '';
    const preview = document.getElementById(previewId);
    const image = preview?.querySelector('img');
    let valid = false;
    try {
      valid = ['http:', 'https:'].includes(new URL(url).protocol);
    } catch {
      valid = false;
    }
    if (preview) preview.hidden = !valid;
    if (image) {
      if (valid) image.src = url;
      else image.removeAttribute('src');
    }
  };
  setPreview('routeSettingsMapImage', 'routeMapImagePreview');
  setPreview('routeSettingsCheckpointImage', 'routeCheckpointImagePreview');
}

async function loadRouteSettings() {
  try {
    const response = await fetchAdmin('/admin/settings/website');
    if (response.status !== 'success' || !response.data) {
      throw new Error(response.message || 'Pengaturan rute tidak dapat dimuat.');
    }
    const settings = response.data;
    document.getElementById('routeSettingsBadgeLabel').value = settings.route_badge_label || '';
    document.getElementById('routeSettingsTitle').value = settings.route_title || '';
    document.getElementById('routeSettingsDescription').value = settings.route_desc || '';
    document.getElementById('routeSettingsGpx').value = settings.route_gpx_url || '';
    document.getElementById('routeSettingsGmaps').value = settings.route_gmaps_url || settings.gmaps_embed_url || '';
    document.getElementById('routeSettingsMapImage').value = settings.route_map_image || '';
    document.getElementById('routeSettingsCheckpointImage').value = settings.route_checkpoint_image || '';
    document.getElementById('routeMapMode').value = settings.route_map_mode === 'IMAGE' ? 'IMAGE' : 'GMAPS';
    document.getElementById('routeCheckpointMode').value = settings.route_checkpoint_mode === 'IMAGE' ? 'IMAGE' : 'MANUAL';
    updateRouteSettingPreviews();
  } catch (error) {
    console.error('Failed to load route settings:', error);
    showAdminToast('error', 'Gagal Memuat Pengaturan Rute', error.message);
  }
}

async function handleRouteSettingsSubmit(event) {
  event.preventDefault();
  const button = document.getElementById('btnSaveRouteSettings');
  const originalHtml = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
  const payload = {
    route_badge_label: document.getElementById('routeSettingsBadgeLabel').value.trim(),
    route_title: document.getElementById('routeSettingsTitle').value.trim(),
    route_desc: document.getElementById('routeSettingsDescription').value.trim(),
    route_gpx_url: document.getElementById('routeSettingsGpx').value.trim(),
    route_gmaps_url: document.getElementById('routeSettingsGmaps').value.trim(),
    route_map_image: document.getElementById('routeSettingsMapImage').value.trim(),
    route_map_mode: document.getElementById('routeMapMode').value,
    route_checkpoint_mode: document.getElementById('routeCheckpointMode').value,
    route_checkpoint_image: document.getElementById('routeSettingsCheckpointImage').value.trim(),
  };
  try {
    const response = await fetchAdmin('/admin/settings/website', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    if (response.status !== 'success') throw new Error(response.message || 'Pengaturan rute gagal disimpan.');
    showAdminToast('success', 'Pengaturan Rute Tersimpan', 'Peta dan mode checkpoint sudah tersinkron ke website.');
    await loadRoutePoints({ showLoading: false, loadSettings: false });
  } catch (error) {
    showAdminToast('error', 'Gagal Menyimpan Rute', error.message);
  } finally {
    button.disabled = false;
    button.innerHTML = originalHtml;
  }
}

async function loadRoutePoints({ showLoading = true, loadSettings = true } = {}) {
  const tbody = document.getElementById('routePointsTableBody');
  if (!tbody) return;
  if (loadSettings) await loadRouteSettings();
  if (showLoading) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--color-text-muted);">Memuat data...</td></tr>';
  }
  try {
    const res = await fetchAdmin('/admin/routes/points');
    if (res.status === 'success') {
      adminState.routePoints = res.data;
      renderRoutePointsTable(res.data);
    } else if (showLoading) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:20px;color:#EF4444;">Gagal memuat data checkpoint.</td></tr>';
    } else {
      console.error('Failed to refresh route points:', res.message || 'Unexpected response');
    }
  } catch (err) {
    console.error('Failed to load route points:', err);
    if (showLoading) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:20px;color:#EF4444;">${err.message}</td></tr>`;
    }
  }
}

function renderRoutePointsTable(points) {
  const tbody = document.getElementById('routePointsTableBody');
  if (!tbody) return;
  if (!points || points.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--color-text-muted);">Belum ada checkpoint. Klik "Tambah Checkpoint" untuk menambahkan.</td></tr>';
    return;
  }
  tbody.innerHTML = points.map(pt => `
    <tr>
      <td style="font-weight:700;">${pt.orderIndex}</td>
      <td><strong>${pt.name}</strong></td>
      <td>${pt.distanceKm} Km</td>
      <td><span class="status-badge" style="background:${pt.category==='10K'?'#FFF7ED':pt.category==='5K'?'#EFF6FF':'#F0FDF4'};color:${pt.category==='10K'?'#C2410C':pt.category==='5K'?'#2563EB':'#15803D'};">${pt.category}</span></td>
      <td style="text-align:center;">${pt.isWaterStation ? '<span style="color:#2563EB;font-size:1.1rem;">💧</span>' : '<span style="color:#CBD5E1;">—</span>'}</td>
      <td style="text-align:center;">${pt.isMedicalSpot ? '<span style="color:#16A34A;font-size:1.1rem;">🏥</span>' : '<span style="color:#CBD5E1;">—</span>'}</td>
      <td style="color:#64748B;font-size:0.82rem;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${pt.description || '—'}</td>
      <td>
        <div style="display:flex;gap:6px;justify-content:center;">
          <button class="btn btn-secondary btn-sm" data-permission="routes:manage" onclick="openEditRoutePoint(${JSON.stringify(JSON.stringify(pt))})" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-sm" data-permission="routes:manage" style="background:#FEE2E2;color:#EF4444;border:1px solid #FECACA;" onclick="deleteRoutePointApi('${pt.id}')" title="Hapus">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
  applyRbacUi(adminState.profile);
}

function openCreateRouteModal() {
  currentEditingRoutePointId = null;
  const title = document.getElementById('modalRoutePointTitle');
  if (title) title.innerHTML = '<i class="fa-solid fa-map-pin" style="color:var(--color-primary);"></i> Tambah Checkpoint Baru';
  document.getElementById('routeFormId').value = '';
  document.getElementById('routeFormOrderIndex').value = '';
  document.getElementById('routeFormDistanceKm').value = '';
  document.getElementById('routeFormName').value = '';
  document.getElementById('routeFormCategory').value = 'ALL';
  document.getElementById('routeFormIcon').value = '';
  document.getElementById('routeFormDescription').value = '';
  document.getElementById('routeFormImage').value = '';
  document.getElementById('routeFormIsWaterStation').checked = false;
  document.getElementById('routeFormIsMedicalSpot').checked = false;
  document.getElementById('modalRoutePointBackdrop').classList.add('open');
}

function openEditRoutePoint(ptJson) {
  const pt = typeof ptJson === 'string' ? JSON.parse(ptJson) : ptJson;
  currentEditingRoutePointId = pt.id;
  const title = document.getElementById('modalRoutePointTitle');
  if (title) title.innerHTML = '<i class="fa-solid fa-pen" style="color:var(--color-primary);"></i> Edit Checkpoint';
  document.getElementById('routeFormId').value = pt.id;
  document.getElementById('routeFormOrderIndex').value = pt.orderIndex;
  document.getElementById('routeFormDistanceKm').value = pt.distanceKm;
  document.getElementById('routeFormName').value = pt.name;
  document.getElementById('routeFormCategory').value = pt.category || 'ALL';
  document.getElementById('routeFormIcon').value = pt.icon || '';
  document.getElementById('routeFormDescription').value = pt.description || '';
  document.getElementById('routeFormImage').value = pt.image || '';
  document.getElementById('routeFormIsWaterStation').checked = Boolean(pt.isWaterStation);
  document.getElementById('routeFormIsMedicalSpot').checked = Boolean(pt.isMedicalSpot);
  document.getElementById('modalRoutePointBackdrop').classList.add('open');
}

async function handleRoutePointFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSaveRouteSubmit');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...'; }

  const payload = {
    orderIndex: parseInt(document.getElementById('routeFormOrderIndex').value, 10),
    distanceKm: parseFloat(document.getElementById('routeFormDistanceKm').value),
    name: document.getElementById('routeFormName').value.trim(),
    category: document.getElementById('routeFormCategory').value,
    icon: document.getElementById('routeFormIcon').value.trim() || null,
    description: document.getElementById('routeFormDescription').value.trim() || null,
    image: document.getElementById('routeFormImage').value.trim() || null,
    isWaterStation: document.getElementById('routeFormIsWaterStation').checked,
    isMedicalSpot: document.getElementById('routeFormIsMedicalSpot').checked
  };

  try {
    let res;
    if (currentEditingRoutePointId) {
      res = await fetchAdmin(`/admin/routes/points/${currentEditingRoutePointId}`, 'PUT', payload);
    } else {
      res = await fetchAdmin('/admin/routes/points', 'POST', payload);
    }

    if (res.status === 'success') {
      showAdminToast('success', 'Berhasil!', currentEditingRoutePointId ? 'Checkpoint berhasil diperbarui.' : 'Checkpoint baru berhasil ditambahkan.');
      document.getElementById('modalRoutePointBackdrop').classList.remove('open');
      await loadRoutePoints();
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Terjadi kesalahan.');
    }
  } catch (err) {
    showAdminToast('error', 'Error', err.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Checkpoint'; }
  }
}

async function deleteRoutePointApi(id) {
  const confirmed = await showConfirmDialog({
    title: 'Hapus Checkpoint',
    message: 'Checkpoint ini akan dihapus permanen dari database. Lanjutkan?',
    confirmText: 'Ya, Hapus',
    type: 'danger'
  });
  if (!confirmed) return;

  try {
    const res = await fetchAdmin(`/admin/routes/points/${id}`, 'DELETE');
    if (res.status === 'success') {
      showAdminToast('success', 'Dihapus!', 'Checkpoint berhasil dihapus.');
      await loadRoutePoints();
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Gagal menghapus checkpoint.');
    }
  } catch (err) {
    showAdminToast('error', 'Error', err.message);
  }
}

window.openEditRoutePoint = openEditRoutePoint;
window.deleteRoutePointApi = deleteRoutePointApi;

export {
  loadRoutePoints,
  loadRouteSettings,
  handleRouteSettingsSubmit,
  updateRouteSettingPreviews,
  renderRoutePointsTable,
  openCreateRouteModal,
  openEditRoutePoint,
  handleRoutePointFormSubmit,
  deleteRoutePointApi
};
