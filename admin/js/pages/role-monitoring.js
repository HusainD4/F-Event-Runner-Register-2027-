import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { escapeHtml, showAdminToast, showConfirmDialog } from '../core/utils.js';

let listenersInitialized = false;

export async function loadRoleMonitoring() {
  const list = document.getElementById('roleMonitoringList');
  if (!list) return;
  if (!listenersInitialized) {
    document.getElementById('btnRefreshRoleMonitoring')?.addEventListener('click', loadRoleMonitoring);
    list.addEventListener('click', handleRoleMonitoringAction);
    listenersInitialized = true;
  }

  list.innerHTML = '<p class="role-monitoring-empty">Memuat data pemantauan role...</p>';
  try {
    const response = await fetchAdmin('/admin/role-monitoring');
    if (response.status !== 'success' || !Array.isArray(response.data)) {
      throw new Error(response.message || 'Data pemantauan role tidak tersedia.');
    }
    renderRoleMonitoring(response.data);
  } catch (error) {
    console.error('Gagal memuat pemantauan role:', error);
    list.innerHTML = '<p class="role-monitoring-empty is-error">Pemantauan role gagal dimuat. Silakan coba muat ulang.</p>';
    showAdminToast('error', 'Gagal Memuat', 'Data pemantauan role tidak dapat dimuat.');
  }
}

function renderRoleMonitoring(roles) {
  const activeCount = roles.reduce((total, role) => total + role.activeAdmins, 0);
  const onlineCount = roles.reduce((total, role) => total + role.onlineAdmins, 0);
  const roleCountEl = document.getElementById('monitoringRoleCount');
  const activeCountEl = document.getElementById('monitoringActiveCount');
  const onlineCountEl = document.getElementById('monitoringOnlineCount');
  if (roleCountEl) roleCountEl.textContent = roles.length.toLocaleString('id-ID');
  if (activeCountEl) activeCountEl.textContent = activeCount.toLocaleString('id-ID');
  if (onlineCountEl) onlineCountEl.textContent = onlineCount.toLocaleString('id-ID');

  const currentAdminId = adminState.profile?.id;
  const cards = roles.map(role => {
    const members = role.admins.length
      ? role.admins.map(admin => {
        const isCurrentAdmin = admin.id === currentAdminId;
        const cannotForceLogout = role.name === 'SUPERADMIN' || isCurrentAdmin || !admin.isActive;
        const state = admin.isOnline
          ? '<span class="role-monitoring-presence is-online">Online</span>'
          : '<span class="role-monitoring-presence">Offline</span>';
        const activeState = admin.isActive
          ? ''
          : '<span class="role-monitoring-account-state">Nonaktif</span>';
        const forceLogoutButton = role.name === 'SUPERADMIN'
          ? '<span class="role-monitoring-protected">Dilindungi</span>'
          : isCurrentAdmin
            ? '<span class="role-monitoring-protected">Sesi Anda</span>'
            : `<button type="button" class="btn btn-outline btn-sm btn-force-admin-logout" data-force-logout-admin="${escapeHtml(admin.id)}" data-role-id="${escapeHtml(role.id)}" data-role-name="${escapeHtml(role.name)}" data-admin-name="${escapeHtml(admin.fullName)}" ${cannotForceLogout ? 'disabled' : ''}>
                <i class="fa-solid fa-right-from-bracket"></i> Logout Paksa
              </button>`;
        return `
          <li class="role-monitoring-member">
            <span class="dashboard-presence-dot ${admin.isOnline ? 'online' : 'offline'}"></span>
            <span class="role-monitoring-member-name">
              <strong>${escapeHtml(admin.fullName)}</strong>
              <small>@${escapeHtml(admin.username)}${isCurrentAdmin ? ' · Sesi Anda' : ''}</small>
            </span>
            <span class="role-monitoring-member-actions">${state}${activeState}${forceLogoutButton}</span>
          </li>
        `;
      }).join('')
      : '<li class="role-monitoring-empty">Belum ada akun pada role ini.</li>';
    return `
      <article class="role-monitoring-card">
        <header class="role-monitoring-card-header">
          <div>
            <h4>${escapeHtml(role.name)}</h4>
            <p>${role.onlineAdmins} sesi online · ${role.activeAdmins} akun aktif · ${role.totalAdmins} total akun</p>
          </div>
          <span class="role-monitoring-online-count"><i class="fa-solid fa-circle"></i>${role.onlineAdmins} online</span>
        </header>
        <ul class="role-monitoring-members">${members}</ul>
        <footer class="role-monitoring-card-footer">
          <span>${role.name === 'SUPERADMIN' ? '<i class="fa-solid fa-lock"></i> Role ini dilindungi dari logout paksa.' : '<i class="fa-solid fa-circle-info"></i> Logout paksa tersedia per akun aktif.'}</span>
        </footer>
      </article>
    `;
  });
  const list = document.getElementById('roleMonitoringList');
  if (list) list.innerHTML = cards.join('') || '<p class="role-monitoring-empty">Belum ada role untuk dipantau.</p>';
}

async function handleRoleMonitoringAction(event) {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest('[data-force-logout-admin]');
  if (!(button instanceof HTMLButtonElement) || button.disabled) return;

  const roleId = button.dataset.roleId;
  const adminId = button.dataset.forceLogoutAdmin;
  const roleName = button.dataset.roleName || 'role ini';
  const adminName = button.dataset.adminName || 'akun ini';
  if (!roleId || !adminId) return;
  const confirmed = await showConfirmDialog({
    title: 'Logout Paksa Akun',
    message: `Cabut sesi akun ${adminName} dengan role ${roleName}? Tindakan ini tidak dapat diterapkan pada role SUPERADMIN.`,
    confirmText: 'Ya, Cabut Sesi',
    type: 'danger',
  });
  if (!confirmed) return;

  button.disabled = true;
  try {
    const response = await fetchAdmin(`/admin/role-monitoring/${encodeURIComponent(roleId)}/admins/${encodeURIComponent(adminId)}/force-logout`, { method: 'POST' });
    if (response.status !== 'success') throw new Error(response.message || 'Sesi role gagal dicabut.');
    showAdminToast('success', 'Logout Paksa Berhasil', escapeHtml(response.message || `Sesi ${adminName} berhasil dicabut.`));
    await loadRoleMonitoring();
  } catch (error) {
    console.error('Gagal melakukan logout paksa akun:', error);
    showAdminToast('error', 'Logout Paksa Gagal', 'Sesi akun tidak dapat dicabut. Silakan coba lagi.');
    button.disabled = false;
  }
}
