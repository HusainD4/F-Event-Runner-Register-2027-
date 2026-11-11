import { apiFetch } from '../../../js/api.js';
import { adminState } from './state.js';
import { showAdminToast } from './utils.js';
import { applyRbacUi } from './rbac.js';
import { loadDashboardData } from '../pages/dashboard.js';
import { loadSidebar } from './sidebar.js';

export async function handleLogin(e) {
  e.preventDefault();
  const identifier = document.getElementById('adminIdentifier').value.trim();
  const password = document.getElementById('adminPassword').value;
  const btn = document.getElementById('btnLoginSubmit');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Memverifikasi...';

  try {
    const res = await apiFetch('/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });

    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Masuk ke Dashboard Admin';

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      showAdminToast('error', 'Koneksi Gagal', 'Server backend belum siap atau tidak merespons JSON. Silakan coba beberapa saat lagi.');
      return;
    }

    if (!res.ok || data.status !== 'success') {
      showAdminToast('error', 'Login Gagal', data.message || 'Kredensial tidak valid');
      return;
    }

    adminState.token = data.data.token;
    localStorage.setItem('tegal_admin_token', data.data.token);
    adminState.profile = data.data.admin;

    showAdminToast('success', 'Selamat Datang!', `Berhasil masuk sebagai ${data.data.admin.fullName}`);
    checkAuthAndInit();
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Masuk ke Dashboard Admin';
    const msg = err.message && err.message.includes('Failed to fetch')
      ? 'Tidak dapat terhubung ke server backend. Silakan coba beberapa saat lagi.'
      : err.message;
    showAdminToast('error', 'Koneksi Gagal', msg);
  }
}

export function handleLogout() {
  adminState.token = null;
  adminState.profile = null;
  localStorage.removeItem('tegal_admin_token');
  const dash = document.getElementById('adminDashboardSection');
  const login = document.getElementById('adminLoginSection');
  if (dash) dash.style.display = 'none';
  if (login) login.style.display = 'flex';
}

export async function checkAuthAndInit() {
  if (!adminState.token) {
    const login = document.getElementById('adminLoginSection');
    const dash = document.getElementById('adminDashboardSection');
    if (login) login.style.display = 'flex';
    if (dash) dash.style.display = 'none';
    return;
  }

  try {
    const res = await apiFetch('/admin/auth/me', {
      headers: { 'Authorization': `Bearer ${adminState.token}` }
    });
    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      handleLogout();
      return;
    }

    adminState.profile = data.data;

    const login = document.getElementById('adminLoginSection');
    const dash = document.getElementById('adminDashboardSection');
    if (login) login.style.display = 'none';
    if (dash) dash.style.display = 'flex';

    const roleName = adminState.profile.role?.name || 'ADMIN';
    const badgeEl = document.getElementById('adminRoleBadge');
    const nameEl = document.getElementById('adminFullName');
    const userEl = document.getElementById('adminUsername');

    if (badgeEl) badgeEl.textContent = roleName;
    if (nameEl) nameEl.textContent = adminState.profile.fullName;
    if (userEl) userEl.textContent = `@${adminState.profile.username}`;

    await loadSidebar();
    applyRbacUi(adminState.profile);
    await loadDashboardData();
  } catch (err) {
    console.error('Failed to authenticate:', err);
    handleLogout();
  }
}
