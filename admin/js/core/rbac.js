export function applyRbacUi(profile) {
  if (!profile || !profile.role) return;

  const roleName = profile.role.name || '';
  const permissions = Array.isArray(profile.role.permissions) ? profile.role.permissions : [];
  const isSuper = roleName === 'SUPERADMIN' || permissions.includes('*');

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
}
