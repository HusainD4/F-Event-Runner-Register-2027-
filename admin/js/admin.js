// =============================================================================
// MODULAR ADMIN PANEL ORCHESTRATOR - TEGAL RUN 2027
// =============================================================================

// 1. Raw HTML Templates for Modular Panes & Modals
import dashboardPane from '../pages/dashboard.html?raw';
import eventsPane from '../pages/events.html?raw';
import participantsPane from '../pages/participants.html?raw';
import racepackPane from '../pages/racepack.html?raw';
import racepackViewPane from '../pages/racepack-view.html?raw';
import ordersPane from '../pages/orders.html?raw';
import countdownPane from '../pages/countdown.html?raw';
import bibSettingsPane from '../pages/bib-settings.html?raw';
import cmsPane from '../pages/cms.html?raw';
import adminsPane from '../pages/admins.html?raw';
import routesPane from '../pages/routes.html?raw';
import notificationsPane from '../pages/notifications.html?raw';
import notifLogsPane from '../pages/notif-logs.html?raw';
import whatsappWebPane from '../pages/whatsapp-web.html?raw';
import logsPane from '../pages/logs.html?raw';
import modalsHtml from '../modals/modals.html?raw';

// 2. Core Modules
import { adminState } from './core/state.js';
import { handleLogin, checkAuthAndInit } from './core/auth.js';
import { openMobileSidebar, closeMobileSidebar, switchAdminTab } from './core/sidebar.js';

// 3. Page Modules
import { loadEvents, openCreateEventModal, handleEventFormSubmit, resetBenefitForm, handleBenefitFormSubmit } from './pages/events.js';
import { loadParticipants, renderParticipantsTable, openCreateParticipantModal, handleParticipantFormSubmit, exportParticipantsCsv, switchParticipantFilterTab, applyParticipantFilters } from './pages/participants.js';
import { loadRacepackStats, startRpcCamera, stopRpcCamera, triggerNativeCamera, handleNativeCameraFile, handleConfirmRacepackCheckin, handleRevertRacepackCheckin, verifyRacepackByCode } from './pages/racepack.js';
import { loadRacepackQueue } from './pages/racepack-view.js';
import { loadOrders, handleOrderStatusSubmit } from './pages/orders.js';
import { handleSaveGlobalCountdown, handleResetGlobalCountdown, handleToggleGlobalClosed } from './pages/countdown.js';
import { initBibSettingsListeners } from './pages/bib-settings.js';
import { handleCmsSubmit } from './pages/cms.js';
import { openCreateAdminUserModal, handleAdminUserSubmit, openCreateRoleModal, handleRoleSubmit, handleResetDefaultRoles, DEFAULT_ROLE_DIRECTORY } from './pages/admins.js';
import { openCreateRouteModal, handleRoutePointFormSubmit } from './pages/routes.js';
import { handleNotificationSettingsSubmit, handleSendTestNotif, handleGenerateWaQr, handleDisconnectWa, handleRealtimeWhatsAppSession } from './pages/notifications.js';
import { loadNotificationLogs, handleBatchSendNotif } from './pages/notif-logs.js';
import { loadWhatsAppWebConsole, handleSendDirectWaMessage, handleWaTemplateChange, handleQuickDispatchTicket, renderWhatsAppWebContactList, waWebContacts } from './pages/whatsapp-web.js';
import { loadAuditLogs } from './pages/logs.js';
import { handleSyncMidtransDashboard, loadDashboardStats } from './pages/dashboard.js';
import { loadAdminsAndRoles } from './pages/admins.js';
import { loadRoutePoints } from './pages/routes.js';
import { loadGlobalSettings } from './pages/countdown.js';
import { getRealtimeSocket } from '../../js/realtime.js';

let adminRefreshInProgress = false;
const pendingAdminTopics = new Set();

async function refreshActiveAdminData() {
  if (!adminState.token || !adminState.profile || document.hidden || adminRefreshInProgress) return;
  const tabKey = adminState.activeTab;
  const pane = document.getElementById(`pane-${tabKey}`);
  if (!pane || document.querySelector('.admin-modal-backdrop.open, .confirm-modal-backdrop.open, dialog[open]')) return;
  const activeElement = document.activeElement;
  if (
    tabKey !== 'racepack' &&
    activeElement instanceof HTMLElement &&
    pane.contains(activeElement) &&
    activeElement.matches('input, textarea, select, [contenteditable="true"]')
  ) return;

  const loaders = {
    dashboard: { topics: ['dashboard'], load: loadDashboardStats },
    events: { topics: ['events'], load: loadEvents },
    participants: { topics: ['participants'], load: loadParticipants },
    orders: { topics: ['orders'], load: loadOrders },
    admins: { topics: ['admins'], load: loadAdminsAndRoles },
    logs: { topics: ['logs'], load: loadAuditLogs },
    routes: { topics: ['routes'], load: () => loadRoutePoints({ showLoading: false }) },
    countdown: { topics: ['countdown'], load: loadGlobalSettings },
    'notif-logs': { topics: ['notif-logs'], load: () => loadNotificationLogs({ showLoading: false }) },
    racepack: { topics: ['racepack'], load: loadRacepackStats },
    'racepack-view': { topics: ['racepack'], load: loadRacepackQueue }
  };
  const loader = loaders[tabKey];
  if (!loader || !loader.topics.some(topic => pendingAdminTopics.has(topic))) return;

  adminRefreshInProgress = true;
  try {
    loader.topics.forEach(topic => pendingAdminTopics.delete(topic));
    await loader.load();
  } catch (error) {
    console.error(`Failed to refresh admin tab "${tabKey}":`, error);
  } finally {
    adminRefreshInProgress = false;
    if (loader.topics.some(topic => pendingAdminTopics.has(topic))) refreshActiveAdminData();
  }
}

function handleAdminDataChanged({ topics = [] } = {}) {
  topics.forEach(topic => pendingAdminTopics.add(topic));
  refreshActiveAdminData();
}

// Global Modal Closer Helper
window.closeAdminModal = function(backdropId) {
  document.getElementById(backdropId)?.classList.remove('open');
};

// Mount Panes & Modals if container exists
function mountModularContent() {
  const panesContainer = document.getElementById('adminPanesContainer') || document.querySelector('.admin-content-body');
  if (panesContainer && panesContainer.children.length === 0) {
    panesContainer.innerHTML = [
      dashboardPane,
      eventsPane,
      participantsPane,
      racepackPane,
      racepackViewPane,
      ordersPane,
      countdownPane,
      bibSettingsPane,
      cmsPane,
      adminsPane,
      routesPane,
      notificationsPane,
      notifLogsPane,
      whatsappWebPane,
      logsPane
    ].join('\n');
  }

  const rpcInfoDialog = document.getElementById('rpcInfoDialog');
  if (rpcInfoDialog && rpcInfoDialog.parentElement !== document.body) {
    document.body.appendChild(rpcInfoDialog);
  }

  const modalsContainer = document.getElementById('adminModalsContainer');
  if (modalsContainer && modalsContainer.children.length === 0) {
    modalsContainer.innerHTML = modalsHtml;
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  // Mount modular HTML panes & modals
  mountModularContent();

  // Login & Logout
  document.getElementById('adminLoginForm')?.addEventListener('submit', handleLogin);

  // Sidebar Toggles
  document.getElementById('btnToggleSidebar')?.addEventListener('click', openMobileSidebar);
  document.getElementById('sidebarOverlay')?.addEventListener('click', closeMobileSidebar);

  // Refresh & Export
  document.getElementById('btnRefreshEvents')?.addEventListener('click', loadEvents);
  document.getElementById('btnRefreshOrders')?.addEventListener('click', loadOrders);
  document.getElementById('btnRefreshLogs')?.addEventListener('click', loadAuditLogs);
  document.getElementById('btnExportCsv')?.addEventListener('click', exportParticipantsCsv);

  // Modals Open Triggers
  document.getElementById('btnOpenCreateEventModal')?.addEventListener('click', openCreateEventModal);
  document.getElementById('btnOpenCreateParticipantModal')?.addEventListener('click', openCreateParticipantModal);
  document.getElementById('btnOpenCreateAdminModal')?.addEventListener('click', openCreateAdminUserModal);
  document.getElementById('btnOpenCreateRouteModal')?.addEventListener('click', openCreateRouteModal);
  document.getElementById('btnOpenCreateRoleModal')?.addEventListener('click', openCreateRoleModal);
  document.getElementById('btnResetDefaultRoles')?.addEventListener('click', handleResetDefaultRoles);

  // Form Submissions
  document.getElementById('formEvent')?.addEventListener('submit', handleEventFormSubmit);
  document.getElementById('formParticipant')?.addEventListener('submit', handleParticipantFormSubmit);
  document.getElementById('formOrderStatus')?.addEventListener('submit', handleOrderStatusSubmit);
  document.getElementById('formAdminUser')?.addEventListener('submit', handleAdminUserSubmit);
  document.getElementById('formRole')?.addEventListener('submit', handleRoleSubmit);

  // Role Permissions Modal Helper Buttons
  document.getElementById('btnSelectAllPages')?.addEventListener('click', () => {
    document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(cb => {
      cb.checked = true;
      cb.closest('.role-module-card')?.classList.add('checked');
    });
  });

  document.getElementById('btnClearAllPages')?.addEventListener('click', () => {
    document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(cb => {
      if (cb.value === 'page:dashboard') {
        cb.checked = true;
        cb.closest('.role-module-card')?.classList.add('checked');
      } else {
        cb.checked = false;
        cb.closest('.role-module-card')?.classList.remove('checked');
      }
    });
  });

  document.getElementById('btnPresetDefaultPages')?.addEventListener('click', () => {
    const roleName = document.getElementById('roleFormName')?.value.trim().toUpperCase() || '';
    const preset = DEFAULT_ROLE_DIRECTORY.find(d => d.name === roleName);
    const pagesToSelect = preset ? (
      roleName === 'ADMINISTRATOR' ? ['page:dashboard', 'page:events', 'page:participants', 'page:racepack', 'page:orders', 'page:notif-logs', 'page:whatsapp-web', 'page:cms', 'page:countdown', 'page:routes'] :
      roleName === 'FINANCE' ? ['page:dashboard', 'page:orders', 'page:logs'] :
      roleName === 'SPONSORSHIP' ? ['page:dashboard', 'page:cms', 'page:events', 'page:notif-logs'] :
      roleName === 'RACEPACK_OFFICER' ? ['page:dashboard', 'page:racepack', 'page:participants', 'page:whatsapp-web'] :
      roleName === 'GATE_OPERATOR' ? ['page:dashboard', 'page:participants', 'page:racepack'] :
      roleName === 'RACE_DIRECTOR' ? ['page:dashboard', 'page:routes', 'page:countdown', 'page:participants', 'page:events', 'page:racepack'] :
      roleName === 'TIMING_JUDGE' ? ['page:dashboard', 'page:participants', 'page:routes'] :
      roleName === 'MEDICAL_OFFICER' ? ['page:dashboard', 'page:participants', 'page:routes'] :
      roleName === 'VOLUNTEER' ? ['page:dashboard', 'page:participants', 'page:racepack'] :
      roleName === 'BAG_DROP_OFFICER' ? ['page:dashboard', 'page:participants'] :
      roleName === 'CUSTOMER_SERVICE' ? ['page:dashboard', 'page:whatsapp-web', 'page:notif-logs', 'page:participants', 'page:orders', 'page:racepack'] :
      ['page:dashboard']
    ) : ['page:dashboard'];

    document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(cb => {
      const match = pagesToSelect.includes(cb.value);
      cb.checked = match;
      if (match) {
        cb.closest('.role-module-card')?.classList.add('checked');
      } else {
        cb.closest('.role-module-card')?.classList.remove('checked');
      }
    });
  });

  document.getElementById('formCmsSettings')?.addEventListener('submit', handleCmsSubmit);
  document.getElementById('formWebsiteCms')?.addEventListener('submit', handleCmsSubmit);
  document.getElementById('formNotificationSettings')?.addEventListener('submit', handleNotificationSettingsSubmit);
  document.getElementById('btnSendTestNotif')?.addEventListener('click', handleSendTestNotif);
  document.getElementById('formEventBenefit')?.addEventListener('submit', handleBenefitFormSubmit);
  document.getElementById('btnCancelBenefitEdit')?.addEventListener('click', resetBenefitForm);
  document.getElementById('formRoutePoint')?.addEventListener('submit', handleRoutePointFormSubmit);

  // Countdown & Global Closed
  document.getElementById('btnSaveGlobalCountdown')?.addEventListener('click', handleSaveGlobalCountdown);
  document.getElementById('btnResetGlobalCountdown')?.addEventListener('click', handleResetGlobalCountdown);
  document.getElementById('btnToggleGlobalClosed')?.addEventListener('click', handleToggleGlobalClosed);

  // Filter & Search Orders
  document.getElementById('filterOrderStatus')?.addEventListener('change', loadOrders);
  document.getElementById('searchOrder')?.addEventListener('input', () => {
    clearTimeout(window._searchOrderTimer);
    window._searchOrderTimer = setTimeout(loadOrders, 300);
  });

  // Participant Filter Tabs & Search
  document.querySelectorAll('.participant-tabs-nav .part-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) switchParticipantFilterTab(tab);
    });
  });

  document.getElementById('filterParticipantCategory')?.addEventListener('change', applyParticipantFilters);
  document.getElementById('searchParticipant')?.addEventListener('input', () => {
    clearTimeout(window._searchParticipantTimer);
    window._searchParticipantTimer = setTimeout(applyParticipantFilters, 250);
  });

  // Racepack Collection & Check-in Controls
  document.getElementById('btnRefreshRacepackStats')?.addEventListener('click', loadRacepackStats);
  const rpcInfoDialog = document.getElementById('rpcInfoDialog');
  document.getElementById('btnRpcInfo')?.addEventListener('click', () => {
    if (rpcInfoDialog instanceof HTMLDialogElement && !rpcInfoDialog.open) {
      rpcInfoDialog.showModal();
    }
  });
  document.getElementById('btnCloseRpcInfo')?.addEventListener('click', () => {
    if (rpcInfoDialog instanceof HTMLDialogElement) rpcInfoDialog.close();
  });
  rpcInfoDialog?.addEventListener('click', (event) => {
    if (event.target === rpcInfoDialog && rpcInfoDialog instanceof HTMLDialogElement) {
      rpcInfoDialog.close();
    }
  });
  document.getElementById('btnStartRpcCamera')?.addEventListener('click', startRpcCamera);
  document.getElementById('btnStopRpcCamera')?.addEventListener('click', stopRpcCamera);
  document.getElementById('btnTriggerNativeCamera')?.addEventListener('click', triggerNativeCamera);
  document.getElementById('rpcNativeCameraInput')?.addEventListener('change', handleNativeCameraFile);
  document.getElementById('btnConfirmRpcCheckin')?.addEventListener('click', handleConfirmRacepackCheckin);
  document.getElementById('btnRefreshRacepackQueue')?.addEventListener('click', loadRacepackQueue);
  document.getElementById('btnRevertRpcCheckin')?.addEventListener('click', handleRevertRacepackCheckin);
  document.getElementById('formRpcManualSearch')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('rpcSearchInput');
    const val = input ? input.value.trim() : '';
    if (val) verifyRacepackByCode(val);
  });

  // WhatsApp Web QR & Session
  document.getElementById('btnGenerateWaQr')?.addEventListener('click', handleGenerateWaQr);
  document.getElementById('btnDisconnectWa')?.addEventListener('click', handleDisconnectWa);

  // Notification Logs & Batch Dispatch
  document.getElementById('btnRefreshNotifLogs')?.addEventListener('click', loadNotificationLogs);
  document.getElementById('btnBatchSendNotif')?.addEventListener('click', handleBatchSendNotif);
  document.getElementById('filterNotifDeliveryStatus')?.addEventListener('change', loadNotificationLogs);
  document.getElementById('searchNotifLogs')?.addEventListener('input', () => {
    clearTimeout(window._searchNotifTimer);
    window._searchNotifTimer = setTimeout(loadNotificationLogs, 300);
  });

  // WhatsApp Web Console & Direct Messenger
  document.getElementById('btnRefreshWaWeb')?.addEventListener('click', loadWhatsAppWebConsole);
  document.getElementById('btnWaWebSync')?.addEventListener('click', loadWhatsAppWebConsole);
  document.getElementById('btnGoToWaQr')?.addEventListener('click', () => switchAdminTab('notifications'));
  document.getElementById('btnSyncMidtransDashboard')?.addEventListener('click', handleSyncMidtransDashboard);
  document.getElementById('btnSendWaDirectMsg')?.addEventListener('click', handleSendDirectWaMessage);
  document.getElementById('waQuickTemplateSelect')?.addEventListener('change', handleWaTemplateChange);
  document.getElementById('btnQuickSendPaidTicket')?.addEventListener('click', () => handleQuickDispatchTicket('PAID'));
  document.getElementById('btnQuickSendPending')?.addEventListener('click', () => handleQuickDispatchTicket('PENDING'));
  document.getElementById('waContactSearchInput')?.addEventListener('input', (e) => {
    const q = (e.target.value || '').toLowerCase();
    const filtered = waWebContacts.filter(c =>
      c.customerName.toLowerCase().includes(q) ||
      c.customerPhone.includes(q) ||
      c.ticketName.toLowerCase().includes(q)
    );
    renderWhatsAppWebContactList(filtered);
  });

  // Inisialisasi Pengaturan BIB & E-Tiket
  initBibSettingsListeners();

  // Check auth and initialize portal
  const realtimeSocket = getRealtimeSocket();
  realtimeSocket.on('admin:data_changed', handleAdminDataChanged);
  realtimeSocket.on('admin:whatsapp_session', handleRealtimeWhatsAppSession);
  window.addEventListener('admin:tab-changed', refreshActiveAdminData);
  document.addEventListener('focusout', refreshActiveAdminData);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshActiveAdminData();
  });
  window.addEventListener('realtime:reconnected', () => {
    handleAdminDataChanged({ topics: ['dashboard', 'events', 'participants', 'orders', 'admins', 'logs', 'routes', 'notif-logs', 'racepack'] });
  });
  checkAuthAndInit();
});
