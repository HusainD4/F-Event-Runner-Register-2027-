// =============================================================================
// MODULAR ADMIN PANEL ORCHESTRATOR - TEGAL RUN 2026
// =============================================================================

// 1. Raw HTML Templates for Modular Panes & Modals
import dashboardPane from '../pages/dashboard.html?raw';
import eventsPane from '../pages/events.html?raw';
import participantsPane from '../pages/participants.html?raw';
import racepackPane from '../pages/racepack.html?raw';
import racepackConfirmPane from '../pages/racepack-confirm.html?raw';
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
import roleMonitoringPane from '../pages/role-monitoring.html?raw';
import backupsPane from '../pages/backups.html?raw';
import modalsHtml from '../modals/modals.html?raw';

// 2. Core Modules
import { adminState } from './core/state.js';
import { handleLogin, handleLogout, checkAuthAndInit } from './core/auth.js';
import { openMobileSidebar, closeMobileSidebar, switchAdminTab } from './core/sidebar.js';
import { showAdminToast } from './core/utils.js';

// 3. Page Modules
import { loadEvents, openCreateEventModal, handleEventFormSubmit, resetBenefitForm, handleBenefitFormSubmit, handleJerseyFormSubmit, resetJerseyForm, updateJerseyImagePreview, loadJerseyGalleryChoices, useJerseyGalleryChoice } from './pages/events.js';
import { loadParticipants, renderParticipantsTable, openCreateParticipantModal, handleParticipantFormSubmit, exportParticipantsCsv, switchParticipantFilterTab, applyParticipantFilters, openClearParticipantsDialog, handleClearParticipants } from './pages/participants.js';
import { loadRacepackStats, loadRacepackConfirmations, handleRacepackConfirmationSocketEvent, handleRacepackScanSocketEvent, handleConfirmRacepackTableCheckin, startRpcCamera, stopRpcCamera, triggerNativeCamera, handleNativeCameraFile, handleConfirmRacepackCheckin, handleRevertRacepackCheckin, verifyRacepackByCode } from './pages/racepack.js';
import { loadRacepackQueue, handleRacepackQueueSocketEvent } from './pages/racepack-view.js';
import { loadOrders, handleOrderStatusSubmit } from './pages/orders.js';
import { handleSaveGlobalCountdown, handleResetGlobalCountdown, handleToggleGlobalClosed, handleSaveRegistrationInfo, handleMaintenanceToggleChange } from './pages/countdown.js';
import { initBibSettingsListeners } from './pages/bib-settings.js';
import { handleCmsSubmit } from './pages/cms.js';
import { openCreateAdminUserModal, handleAdminUserSubmit, openCreateRoleModal, handleRoleSubmit, handleResetDefaultRoles, DEFAULT_ROLE_DIRECTORY } from './pages/admins.js';
import { openCreateRouteModal, handleRoutePointFormSubmit, handleRouteSettingsSubmit, updateRouteSettingPreviews } from './pages/routes.js';
import { handleNotificationSettingsSubmit, handleSendTestNotif, handleGenerateWaQr, handleDisconnectWa, handleRealtimeWhatsAppSession } from './pages/notifications.js';
import { loadNotificationLogs, handleBatchSendNotif } from './pages/notif-logs.js';
import { loadWhatsAppWebConsole, handleSendDirectWaMessage, handleWaTemplateChange, handleQuickDispatchTicket, renderWhatsAppWebContactList, waWebContacts } from './pages/whatsapp-web.js';
import { loadAuditLogs } from './pages/logs.js';
import { handleSyncMidtransDashboard, loadDashboardStats } from './pages/dashboard.js';
import { initBackupPage } from './pages/backups.js';
import { subscribeRealtimeEvent } from '../../js/realtime.js';
import { apiClient } from '../../js/api.js';
import { applyHomeAppearance } from '../../js/home-appearance.js';

apiClient.getWebsiteSettings().then(settings => {
  if (settings) applyHomeAppearance(settings);
});

function handleRacepackQueueChange(event) {
  handleRacepackQueueSocketEvent(event);
  handleRacepackScanSocketEvent(event);
}

function handleWhatsAppSessionUpdate(session) {
  if (['notifications', 'whatsapp-web'].includes(adminState.activeTab)) {
    handleRealtimeWhatsAppSession(session);
  }
}

function handleAdminForceLogout() {
  showAdminToast('warning', 'Sesi Diakhiri', 'Superadmin telah mengakhiri sesi Anda. Silakan login kembali jika diperlukan.');
  handleLogout();
}

function subscribeAdminRealtimeEvents() {
  return [
    subscribeRealtimeEvent('admin:racepack_confirmation_changed', handleRacepackConfirmationSocketEvent),
    subscribeRealtimeEvent('admin:racepack_queue_changed', handleRacepackQueueChange),
    subscribeRealtimeEvent('admin:whatsapp_session', handleWhatsAppSessionUpdate),
    subscribeRealtimeEvent('admin:force_logout', handleAdminForceLogout),
  ];
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
      racepackConfirmPane,
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
      logsPane,
      roleMonitoringPane,
      backupsPane
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
  initBackupPage();

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
  document.getElementById('btnClearParticipants')?.addEventListener('click', openClearParticipantsDialog);
  document.getElementById('formClearParticipants')?.addEventListener('submit', handleClearParticipants);
  document.getElementById('btnCancelClearParticipants')?.addEventListener('click', () => document.getElementById('clearParticipantsDialog')?.close());
  document.getElementById('clearParticipantsDialog')?.addEventListener('cancel', event => {
    if (document.getElementById('btnConfirmClearParticipants')?.disabled) event.preventDefault();
  });

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
      cb.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  document.getElementById('btnClearAllPages')?.addEventListener('click', () => {
    document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(cb => {
      cb.checked = false;
      cb.dispatchEvent(new Event('change', { bubbles: true }));
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

    document.querySelectorAll('#roleApiPermissionsContainer input[type="checkbox"]:not(:disabled)').forEach(cb => {
      cb.checked = false;
      cb.closest('.role-permission-option')?.classList.remove('checked');
    });

    document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(cb => {
      const match = pagesToSelect.includes(cb.value);
      cb.checked = match;
      cb.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  document.getElementById('formCmsSettings')?.addEventListener('submit', handleCmsSubmit);
  document.getElementById('formWebsiteCms')?.addEventListener('submit', handleCmsSubmit);
  document.getElementById('formNotificationSettings')?.addEventListener('submit', handleNotificationSettingsSubmit);
  document.getElementById('btnSendTestNotif')?.addEventListener('click', handleSendTestNotif);
  document.getElementById('formEventBenefit')?.addEventListener('submit', handleBenefitFormSubmit);
  document.getElementById('btnCancelBenefitEdit')?.addEventListener('click', resetBenefitForm);
  document.getElementById('formEventJersey')?.addEventListener('submit', handleJerseyFormSubmit);
  document.getElementById('btnCancelJerseyEdit')?.addEventListener('click', resetJerseyForm);
  document.getElementById('jerseyFormImage')?.addEventListener('input', updateJerseyImagePreview);
  document.getElementById('btnLoadJerseyGallery')?.addEventListener('click', loadJerseyGalleryChoices);
  document.getElementById('btnUseJerseyGallery')?.addEventListener('click', useJerseyGalleryChoice);
  document.getElementById('formRoutePoint')?.addEventListener('submit', handleRoutePointFormSubmit);
  document.getElementById('routeSettingsForm')?.addEventListener('submit', handleRouteSettingsSubmit);
  document.getElementById('routeMapMode')?.addEventListener('change', updateRouteSettingPreviews);
  document.getElementById('routeCheckpointMode')?.addEventListener('change', updateRouteSettingPreviews);
  document.getElementById('routeSettingsMapImage')?.addEventListener('input', updateRouteSettingPreviews);
  document.getElementById('routeSettingsCheckpointImage')?.addEventListener('input', updateRouteSettingPreviews);

  // Countdown & Global Closed
  document.getElementById('btnSaveGlobalCountdown')?.addEventListener('click', handleSaveGlobalCountdown);
  document.getElementById('btnResetGlobalCountdown')?.addEventListener('click', handleResetGlobalCountdown);
  document.getElementById('btnToggleGlobalClosed')?.addEventListener('click', handleToggleGlobalClosed);
  document.getElementById('btnSaveWebsiteStatus')?.addEventListener('click', handleSaveRegistrationInfo);
  document.getElementById('maintenanceEnabled')?.addEventListener('change', handleMaintenanceToggleChange);

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
  document.getElementById('btnRefreshRacepackStats')?.addEventListener('click', () => loadRacepackStats({ force: true }));
  document.getElementById('btnRefreshRacepackConfirmations')?.addEventListener('click', () => loadRacepackConfirmations({ force: true }));
  document.getElementById('racepackConfirmationsTable')?.addEventListener('click', event => {
    const button = event.target.closest('[data-confirm-racepack-id]');
    if (button) void handleConfirmRacepackTableCheckin(button.dataset.confirmRacepackId);
  });
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
  document.getElementById('btnRefreshRacepackQueue')?.addEventListener('click', () => loadRacepackQueue({ force: true }));
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
  let removeAdminSocketListeners = subscribeAdminRealtimeEvents();
  window.addEventListener('pagehide', () => removeAdminSocketListeners.forEach(remove => remove()), { once: true });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    removeAdminSocketListeners.forEach(remove => remove());
    removeAdminSocketListeners = subscribeAdminRealtimeEvents();
  });
  checkAuthAndInit();
});
