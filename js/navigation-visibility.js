const SECTION_LINKS = {
  '#kategori': 'tickets',
  '#rute': 'route',
  '#fasilitas': 'facilities',
  '#faq': 'faq',
  '#legal': 'legal'
};
const HOME_SECTION_KEYS = ['hero', 'stats', 'route', 'facilities', 'tickets', 'legal', 'faq', 'footer'];

export function areAllHomeSectionsHidden(visibility) {
  return HOME_SECTION_KEYS.every(key => visibility[key] === false);
}

export function syncRegistrationCtaVisibility(visibility) {
  if (!areAllHomeSectionsHidden(visibility)) return;
  const navButton = document.getElementById('navDaftarBtn');
  if (!navButton) return;

  navButton.disabled = true;
  navButton.classList.remove('btn-primary', 'btn-glow');
  navButton.classList.add('is-event-status', 'is-coming-soon');
  navButton.setAttribute('aria-label', 'Informasi event segera hadir');
  navButton.title = 'Informasi event segera hadir';
  navButton.innerHTML = '<i class="fa-regular fa-clock" aria-hidden="true"></i><span>COMING SOON</span>';
}

export function syncNavigationVisibility(visibility) {
  const allSectionsOff = areAllHomeSectionsHidden(visibility);
  document.querySelectorAll('.top-navbar a, .mobile-bottom-dock a, .glass-footer a').forEach(link => {
    if (link.matches('.top-navbar a[href="/cek-tiket.html"]')) {
      const target = link.closest('li');
      if (target) target.hidden = allSectionsOff;
      return;
    }
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
