import { selectTab } from './tabs.js';

function applySectionTabs(tablist, prefix, sections, canRead, isSuper, permissions, marker) {
  if (!tablist) return;
  for (const [id, key] of Object.entries(sections)) {
    const tab = document.getElementById(`${prefix}Tab${id}`);
    const panel = document.getElementById(`${prefix}Panel${id}`);
    if (!tab || !panel) continue;
    const allowed = isSuper || (canRead && (!permissions.includes(marker) || permissions.includes(key)));
    tab.disabled = !allowed;
    tab.style.display = allowed ? '' : 'none';
    if (prefix === 'cms') panel.dataset.cmsDenied = String(!allowed);
    if (!allowed) panel.hidden = true;
  }
  const selected = tablist.querySelector('[role="tab"][aria-selected="true"]:not(:disabled)');
  const first = tablist.querySelector('[role="tab"]:not(:disabled)');
  if (selected || first) selectTab(tablist, (selected || first).id);
}

export function canAccessBibSection(profile, section) {
  const role = profile?.role;
  if (!role) return false;
  if (role.name === 'SUPERADMIN') return true;
  const permissions = Array.isArray(role.permissions) ? role.permissions : [];
  return (permissions.includes('bib:manage') || permissions.includes('bib:*'))
    && (!permissions.includes('section:bib-configured') || permissions.includes(section));
}

export function applyRbacUi(profile) {
  if (!profile || !profile.role) return;

  const roleName = profile.role.name || '';
  const permissions = Array.isArray(profile.role.permissions) ? profile.role.permissions : [];
  const isSuper = roleName === 'SUPERADMIN';
  const dashboardConfigured = permissions.includes('dashboard:configured');
  const dashboardPane = document.getElementById('pane-dashboard');
  if (dashboardPane) {
    dashboardPane.style.display = isSuper || permissions.includes('page:dashboard') ? '' : 'none';
  }

  // 1. Role-specific hiding (e.g. data-role="SUPERADMIN")
  document.querySelectorAll('[data-role]').forEach(el => {
    const reqRole = el.getAttribute('data-role');
    if (reqRole === 'SUPERADMIN' && !isSuper) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  });

  // 2. Page-specific hiding (e.g. data-page="page:events")
  document.querySelectorAll('[data-page]').forEach(el => {
    if (isSuper) {
      el.style.display = '';
      return;
    }
    const reqPage = el.getAttribute('data-page');
    const hasPage = permissions.includes(reqPage);
    if (!hasPage) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  });

  // 3. Permission-specific hiding (e.g. data-permission="events:create")
  document.querySelectorAll('[data-permission]').forEach(el => {
    if (isSuper) {
      el.style.display = '';
      return;
    }
    const reqPerm = el.getAttribute('data-permission');
    const [domain] = reqPerm.split(':');
    const hasPerm = permissions.includes(reqPerm) || permissions.includes(`${domain}:*`);
    if (!hasPerm) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  });

  document.querySelectorAll('[data-permission-all]').forEach(el => {
    const required = el.getAttribute('data-permission-all').split(',').map(permission => permission.trim()).filter(Boolean);
    el.style.display = isSuper || required.every(permission => {
      const [domain] = permission.split(':');
      return permissions.includes(permission) || permissions.includes(`${domain}:*`);
    }) ? '' : 'none';
  });

  document.querySelectorAll('[data-dashboard-widget]').forEach(el => {
    const widget = el.getAttribute('data-dashboard-widget');
    const canSeeDashboard = isSuper || permissions.includes('page:dashboard');
    const canSeeWidget = isSuper || !dashboardConfigured || permissions.includes(widget);
    const requiredPermission = el.getAttribute('data-dashboard-permission');
    const permissionAlternatives = (el.getAttribute('data-dashboard-permission-any') || '')
      .split(',')
      .map(permission => permission.trim())
      .filter(Boolean);
    const hasPermission = permission => {
      const [domain] = permission.split(':');
      return permissions.includes(permission) || permissions.includes(`${domain}:*`);
    };
    const canSeeData = (!requiredPermission && permissionAlternatives.length === 0)
      || isSuper
      || (requiredPermission && hasPermission(requiredPermission))
      || permissionAlternatives.some(hasPermission);
    el.style.display = canSeeDashboard && canSeeWidget && canSeeData ? '' : 'none';
  });

  document.querySelectorAll('[data-dashboard-link]').forEach(el => {
    const page = el.getAttribute('data-dashboard-link');
    el.style.display = isSuper || permissions.includes(page) ? '' : 'none';
  });

  document.querySelectorAll('[data-bib-section]').forEach(el => {
    el.style.display = canAccessBibSection(profile, el.dataset.bibSection) ? '' : 'none';
  });
  document.querySelectorAll('[data-countdown-section]').forEach(el => {
    const hasManage = permissions.includes('countdown:manage') || permissions.includes('countdown:*');
    const allowed = isSuper || (hasManage && (!permissions.includes('section:countdown-configured')
      || permissions.includes(el.dataset.countdownSection)));
    el.style.display = allowed ? '' : 'none';
  });
  document.querySelectorAll('[data-event-section]').forEach(el => {
    const sectionAllowed = isSuper || !permissions.includes('section:event-configured') || permissions.includes(el.dataset.eventSection);
    const required = el.getAttribute('data-permission');
    const permissionAllowed = !required || isSuper || permissions.includes(required) || permissions.includes(`${required.split(':')[0]}:*`);
    el.style.display = sectionAllowed && permissionAllowed ? '' : 'none';
  });

  applySectionTabs(document.querySelector('#pane-cms [role="tablist"]'), 'cms', {
    Visibility: 'section:cms-visibility', Hero: 'section:cms-hero', Stats: 'section:cms-stats',
    Route: 'section:cms-route', Faq: 'section:cms-faq', ComingSoon: 'section:cms-coming-soon',
    Media: 'section:cms-media', Legal: 'section:cms-legal', Documents: 'section:cms-documents', Contact: 'section:cms-contact',
  }, permissions.includes('page:cms') || permissions.includes('cms:manage') || permissions.includes('cms:*'),
  isSuper, permissions, 'section:cms-configured');

  applySectionTabs(document.querySelector('#pane-notifications [role="tablist"]'), 'notif', {
    Gateway: 'section:notification-gateway', Mode: 'section:notification-mode',
    Channel: 'section:notification-channel', Pdf: 'section:notification-pdf', Smtp: 'section:notification-smtp',
    WaTemplate: 'section:notification-wa-template', EmailTemplate: 'section:notification-email-template',
    Test: 'section:notification-test',
  }, permissions.includes('notifications:manage') || permissions.includes('notifications:*'),
  isSuper, permissions, 'section:notification-configured');

  updateDashboardGridLayout();
}

function updateDashboardGridLayout() {
  document.querySelectorAll('.dashboard-insights-grid').forEach(grid => {
    const visibleWidgets = Array.from(grid.children).filter(el => el.style.display !== 'none');
    const maxColumns = Number(grid.dataset.dashboardColumns) || 2;
    const deviceColumns = window.innerWidth <= 640 ? 1 : window.innerWidth <= 1100 ? 2 : 3;
    const columns = Math.min(visibleWidgets.length, maxColumns, deviceColumns);
    grid.style.display = columns ? 'grid' : 'none';
    grid.style.setProperty('--dashboard-columns', String(columns || 1));
  });
}

window.addEventListener('resize', updateDashboardGridLayout, { passive: true });
