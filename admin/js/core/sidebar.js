import sidebarHtml from '../../../template/layout/sidebar.html?raw';
import { adminState } from './state.js';
import { applyRbacUi } from './rbac.js';
import { handleLogout } from './auth.js';
import { showAdminToast } from './utils.js';
import { loadCmsSettings } from '../pages/cms.js';
import { loadRoutePoints } from '../pages/routes.js';
import { loadNotificationSettings } from '../pages/notifications.js';
import { loadWhatsAppWebConsole } from '../pages/whatsapp-web.js';
import { loadNotificationLogs } from '../pages/notif-logs.js';
import { loadRacepackStats, stopRpcCamera } from '../pages/racepack.js';
import { loadRacepackQueue } from '../pages/racepack-view.js';
import { loadBibSettings } from '../pages/bib-settings.js';
import { loadGlobalSettings } from '../pages/countdown.js';
import { loadRoleMonitoring } from '../pages/role-monitoring.js';

export async function loadSidebar() {
  const mount = document.getElementById('sidebarMount');
  if (!mount) return;

  try {
    mount.innerHTML = sidebarHtml;
    initSidebar();
  } catch (err) {
    console.error('Sidebar load failed:', err);
  }
}

export function initSidebar() {
  if (adminState.profile) {
    const nameEl = document.getElementById('sidebarAdminFullName');
    const roleEl = document.getElementById('sidebarAdminRole');
    if (nameEl) nameEl.textContent = adminState.profile.fullName;
    if (roleEl) roleEl.textContent = adminState.profile.role?.name || 'ADMIN';
  }

  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav');
      if (target) {
        switchAdminTab(target);
        closeMobileSidebar();
      }
    });
  });

  document.getElementById('btnCloseSidebar')?.addEventListener('click', closeMobileSidebar);
  document.getElementById('btnSidebarLogout')?.addEventListener('click', handleLogout);

  if (adminState.profile) {
    applyRbacUi(adminState.profile);
    const roleName = adminState.profile.role?.name || '';
    const permissions = Array.isArray(adminState.profile.role?.permissions) ? adminState.profile.role.permissions : [];
    const isSuper = roleName === 'SUPERADMIN';
    if (!isSuper && !permissions.includes('page:dashboard')) {
      const firstAllowedTab = Array.from(document.querySelectorAll('.sidebar-nav .nav-item')).find(button => {
        const pageKey = button.getAttribute('data-page');
        return pageKey && permissions.includes(pageKey);
      })?.getAttribute('data-nav');
      if (firstAllowedTab) switchAdminTab(firstAllowedTab);
    }
  }
}

export function switchAdminTab(tabKey) {
  if (adminState.profile && adminState.profile.role) {
    const roleName = adminState.profile.role.name || '';
    const permissions = Array.isArray(adminState.profile.role.permissions) ? adminState.profile.role.permissions : [];
    const isSuper = roleName === 'SUPERADMIN';

    if (!isSuper) {
      const navButton = document.querySelector(`.sidebar-nav .nav-item[data-nav="${tabKey}"]`);
      const pageKey = navButton?.getAttribute('data-page') || `page:${tabKey}`;
      if (!permissions.includes(pageKey)) {
        showAdminToast('warning', 'Akses Dibatasi', `Role Anda (${roleName}) tidak memiliki izin mengakses modul ini.`);
        return;
      }
    }
  }

  adminState.activeTab = tabKey;

  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    if (btn.getAttribute('data-nav') === tabKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(`pane-${tabKey}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  const titleMap = {
    dashboard: { title: 'Dashboard Overview', sub: 'Portal Admin / Ringkasan Real-Time' },
    events: { title: 'Manajemen Event & Kategori', sub: 'Portal Admin / Manajemen Tiket Lomba' },
    participants: { title: 'Manajemen Peserta', sub: 'Portal Admin / Database Pelari & BIB' },
    racepack: { title: 'Pengambilan Racepack & Check-in', sub: 'Portal Admin / Validasi E-Tiket & Serah Terima RPC' },
    'racepack-view': { title: 'Live View Antrean Racepack', sub: 'Portal Admin / Pemantauan Antrean Real-Time' },
    orders: { title: 'Transaksi & Order', sub: 'Portal Admin / Status Pembayaran Tiket' },
    countdown: { title: 'Countdown & Status Event', sub: 'Portal Admin / Konfigurasi Race Day' },
    'bib-settings': { title: 'Pengaturan BIB & E-Tiket', sub: 'Portal Admin / Aturan BIB, Format QR & Petunjuk' },
    cms: { title: 'Konten Website & CMS', sub: 'Portal Admin / Pengaturan Teks, Peta & Media' },
    routes: { title: 'Manajemen Rute & Checkpoint', sub: 'Portal Admin / Titik Kumpul & Water Station' },
    notifications: { title: 'Konfigurasi Notifikasi & Gateway', sub: 'Portal Admin / WhatsApp & Email Gateway' },
    'notif-logs': { title: 'Log Pengiriman Notifikasi & Peserta', sub: 'Portal Admin / WhatsApp & Email Delivery Tracking' },
    'whatsapp-web': { title: 'WhatsApp Web Enterprise Console', sub: 'Portal Admin / Real-Time Messaging & Session Hub' },
    admins: { title: 'Kelola Admin & Hak Akses', sub: 'Portal Admin / Manajemen RBAC Superadmin' },
    'role-monitoring': { title: 'Pemantauan Semua Role', sub: 'Portal Admin / Sesi Online & Kontrol Akses' },
    logs: { title: 'Log Audit Sistem', sub: 'Portal Admin / Rekam Jejak Keamanan' }
  };

  const info = titleMap[tabKey] || titleMap.dashboard;
  const titleEl = document.getElementById('pageTitle');
  const breadEl = document.getElementById('pageBreadcrumb');
  if (titleEl) titleEl.textContent = info.title;
  if (breadEl) breadEl.textContent = info.sub;

  if (tabKey === 'cms') {
    loadCmsSettings();
  }
  if (tabKey === 'countdown') {
    loadGlobalSettings();
  }
  if (tabKey === 'bib-settings') {
    loadBibSettings();
  }
  if (tabKey === 'routes') {
    loadRoutePoints();
  }
  if (tabKey === 'racepack') {
    loadRacepackStats();
  } else {
    stopRpcCamera();
  }
  if (tabKey === 'racepack-view') {
    loadRacepackQueue();
  }
  if (tabKey === 'notifications') {
    loadNotificationSettings();
  } else if (tabKey === 'whatsapp-web') {
    loadWhatsAppWebConsole();
  }
  if (tabKey === 'notif-logs') {
    loadNotificationLogs();
  }
  if (tabKey === 'role-monitoring') {
    loadRoleMonitoring();
  }

  window.dispatchEvent(new CustomEvent('admin:tab-changed', { detail: { tabKey } }));
}

export function openMobileSidebar() {
  document.getElementById('adminSidebar')?.classList.add('open');
  document.getElementById('sidebarOverlay')?.classList.add('active');
}

export function closeMobileSidebar() {
  document.getElementById('adminSidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('active');
}

window.switchAdminTab = switchAdminTab;
