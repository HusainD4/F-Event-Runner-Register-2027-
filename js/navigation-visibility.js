const SECTION_LINKS = {
  '#kategori': 'tickets',
  '#rute': 'route',
  '#fasilitas': 'facilities',
  '#faq': 'faq',
  '#legal': 'legal'
};

export function syncNavigationVisibility(visibility) {
  document.querySelectorAll('.top-navbar a, .mobile-bottom-dock a, .glass-footer a').forEach(link => {
    const href = link.getAttribute('href');
    const key = SECTION_LINKS[href];
    if (!key) return;
    const target = link.closest('.nav-dropdown-menu') ? link : link.closest('li');
    if (target) target.hidden = visibility[key] === false;
    if (target?.hidden) {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const hasVisibleLinks = [...dropdown.querySelectorAll('.nav-dropdown-menu a')].some(link => !link.hidden);
    dropdown.hidden = !hasVisibleLinks;
    if (!hasVisibleLinks) dropdown.classList.remove('active');
  });

  document.querySelectorAll('.top-navbar .nav-brand, .mobile-bottom-dock a[aria-label="Beranda"], .glass-footer a[href="#beranda"], .glass-footer a[data-home-link]').forEach(link => {
    link.dataset.homeLink = '';
    link.setAttribute('href', visibility.hero === false ? '#' : '#beranda');
  });
}
