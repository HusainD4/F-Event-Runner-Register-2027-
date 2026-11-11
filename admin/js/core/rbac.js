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
