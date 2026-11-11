import{b as M,a as ye,l as xe}from"./api-Ub7T_Sm5.js";/* empty css              */const we=`<!-- =========================================================================\r
     PAGE SKELETON LOADER (MINIMALIST & ANIMATED)\r
     ========================================================================= -->\r
<div class="page-skeleton" id="pageSkeleton">\r
  <style>\r
    .page-skeleton { padding: 40px 16px; width: 100%; display: flex; justify-content: center; }\r
    .page-skeleton-inner { width: 100%; max-width: 900px; margin: 0 auto; }\r
    .sk { background: #E2E8F0; background: linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 37%, #E2E8F0 63%); background-size: 400% 100%; animation: skShimmer 1.4s ease infinite; border-radius: 12px; }\r
    @keyframes skShimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }\r
    .page-skeleton-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }\r
    .page-skeleton-card { height: 220px; border-radius: 16px; }\r
    @media (max-width: 576px) {\r
      .page-skeleton { padding: 20px 12px; }\r
      .sk-title { height: 36px !important; }\r
      .sk-banner { height: 120px !important; }\r
      .page-skeleton-grid { grid-template-columns: 1fr; gap: 14px; }\r
    }\r
  </style>\r
\r
  <div class="page-skeleton-inner">\r
    <div class="sk" style="width: 160px; height: 28px; margin: 0 auto 16px; border-radius: 99px;"></div>\r
    <div class="sk sk-title" style="width: 75%; height: 44px; margin: 0 auto 12px;"></div>\r
    <div class="sk" style="width: 55%; height: 20px; margin: 0 auto 30px;"></div>\r
    <div class="sk sk-banner" style="width: 100%; height: 150px; margin-bottom: 28px; border-radius: 20px;"></div>\r
    <div class="page-skeleton-grid">\r
      <div class="sk page-skeleton-card"></div>\r
      <div class="sk page-skeleton-card"></div>\r
    </div>\r
  </div>\r
</div>`,Ee=`<!-- =========================================================================\r
     TOP FLOATING GLASS NAVBAR (MINIMALIST & LEGA)\r
     ========================================================================= -->\r
<div class="top-navbar-container">\r
  <style>\r
    :root { --nav-bg: rgba(255, 255, 255, 0.75); --nav-border: rgba(226, 232, 240, 0.8); --nav-text: #334155; --nav-text-active: #FF6B00; --nav-hover-bg: rgba(255, 107, 0, 0.08); --shadow-glass: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03); --shadow-dropdown: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04); --radius-nav: 99px; --radius-menu: 16px; }\r
    .top-navbar-container { position: fixed; top: 16px; left: 0; right: 0; z-index: 1000; display: flex; justify-content: center; padding: 0 16px; pointer-events: none; }\r
    .top-navbar { pointer-events: auto; width: 100%; max-width: 1080px; background: var(--nav-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--nav-border); border-radius: var(--radius-nav); padding: 8px 14px 8px 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-glass); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\r
    .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #0F172A; font-weight: 800; font-size: 0.95rem; letter-spacing: -0.2px; transition: transform 0.2s ease; }\r
    .nav-brand:hover { transform: scale(1.02); }\r
    .brand-icon { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #FF6B00 0%, #FF852D 100%); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(255, 107, 0, 0.3); }\r
    .brand-text span { color: #FF6B00; }\r
    .nav-links { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }\r
    .nav-links > li { position: relative; }\r
    .nav-link { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 99px; font-size: 0.85rem; font-weight: 600; color: var(--nav-text); text-decoration: none; background: transparent; border: none; cursor: pointer; font-family: inherit; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }\r
    .nav-link:hover { color: var(--nav-text-active); background: var(--nav-hover-bg); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(255, 107, 0, 0.12); }\r
    .nav-link:active { transform: translateY(0); }\r
    .nav-link.active { color: var(--nav-text-active); background: rgba(255, 107, 0, 0.1); }\r
    .nav-dropdown-toggle .chevron { font-size: 0.7rem; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin-left: 2px; }\r
    .nav-dropdown:hover .nav-dropdown-toggle .chevron, .nav-dropdown.active .nav-dropdown-toggle .chevron { transform: rotate(180deg); }\r
    .nav-dropdown-menu { position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%) translateY(8px) scale(0.96); width: 240px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: var(--radius-menu); padding: 8px; box-shadow: var(--shadow-dropdown); opacity: 0; visibility: hidden; pointer-events: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }\r
    .nav-dropdown-menu::before { content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 10px; height: 10px; background: #FFF; border-left: 1px solid var(--nav-border); border-top: 1px solid var(--nav-border); }\r
    .nav-dropdown:hover .nav-dropdown-menu, .nav-dropdown.active .nav-dropdown-menu { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0) scale(1); }\r
    .nav-dropdown-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; text-decoration: none; color: #334155; transition: all 0.2s ease; }\r
    .nav-dropdown-item i { font-size: 1rem; color: #FF6B00; width: 24px; height: 24px; border-radius: 6px; background: rgba(255, 107, 0, 0.08); display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }\r
    .nav-dropdown-item:hover { background: #F8FAFC; transform: translateX(4px); }\r
    .nav-dropdown-item:hover i { background: #FF6B00; color: #FFF; transform: scale(1.08); }\r
    .nav-dropdown-item strong { display: block; font-size: 0.825rem; color: #0F172A; font-weight: 700; }\r
    .btn-glow { box-shadow: 0 4px 14px rgba(255, 107, 0, 0.35); transition: all 0.25s ease; }\r
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(255, 107, 0, 0.45); transform: translateY(-2px); }\r
    .nav-mobile-toggle { display: none; background: transparent; border: none; font-size: 1.2rem; color: #0F172A; cursor: pointer; padding: 6px 10px; }\r
    @media (max-width: 868px) {\r
      .top-navbar-container { top: 10px; padding: 0 10px; }\r
      .nav-mobile-toggle { display: block; }\r
      .nav-links { position: absolute; top: calc(100% + 10px); left: 0; right: 0; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: 20px; padding: 14px; flex-direction: column; align-items: stretch; gap: 6px; box-shadow: var(--shadow-dropdown); opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\r
      .nav-links.mobile-open { opacity: 1; visibility: visible; transform: translateY(0); }\r
      .nav-link { width: 100%; justify-content: space-between; padding: 10px 16px; border-radius: 12px; }\r
      .nav-dropdown-menu { position: static; transform: none !important; width: 100%; box-shadow: none; border: none; background: #F8FAFC; margin-top: 4px; display: none; opacity: 1; visibility: visible; pointer-events: auto; }\r
      .nav-dropdown-menu::before { display: none; }\r
      .nav-dropdown.active .nav-dropdown-menu { display: block; }\r
    }\r
  </style>\r
\r
  <nav class="top-navbar">\r
    <a href="#beranda" class="nav-brand">\r
      <div class="brand-icon"><i class="fa-solid fa-person-running"></i></div>\r
      <div class="brand-text">TEGAL RUN <span>2027</span></div>\r
    </a>\r
\r
    <ul class="nav-links" id="navMenu">\r
      <li>\r
        <a href="#kategori" class="nav-link">\r
          <span><i class="fa-solid fa-ticket" style="font-size: 0.85rem; margin-right: 4px;"></i> Kategori Tiket</span>\r
        </a>\r
      </li>\r
      <li>\r
        <a href="/cek-tiket.html" class="nav-link">\r
          <span><i class="fa-solid fa-magnifying-glass" style="font-size: 0.85rem; margin-right: 4px;"></i> Cek Tiket</span>\r
        </a>\r
      </li>\r
      <li class="nav-dropdown">\r
        <button type="button" class="nav-link nav-dropdown-toggle">\r
          <span><i class="fa-solid fa-circle-info" style="font-size: 0.85rem; margin-right: 4px;"></i> Informasi Event</span>\r
          <i class="fa-solid fa-chevron-down chevron"></i>\r
        </button>\r
        <div class="nav-dropdown-menu">\r
          <a href="#rute" class="nav-dropdown-item">\r
            <i class="fa-solid fa-route"></i>\r
            <div><strong>Rute &amp; Google Maps</strong><small style="display: block; color: #94A3B8; font-size: 0.72rem;">Jalur lomba &amp; titik flag-off</small></div>\r
          </a>\r
          <a href="#fasilitas" class="nav-dropdown-item">\r
            <i class="fa-solid fa-gift"></i>\r
            <div><strong>Fasilitas &amp; Race Pack</strong><small style="display: block; color: #94A3B8; font-size: 0.72rem;">Jersey, medali &amp; asuransi</small></div>\r
          </a>\r
        </div>\r
      </li>\r
      <li class="nav-dropdown">\r
        <button type="button" class="nav-link nav-dropdown-toggle">\r
          <span><i class="fa-solid fa-hand-holding-hand" style="font-size: 0.85rem; margin-right: 4px;"></i> Bantuan &amp; Legal</span>\r
          <i class="fa-solid fa-chevron-down chevron"></i>\r
        </button>\r
        <div class="nav-dropdown-menu">\r
          <a href="#faq" class="nav-dropdown-item">\r
            <i class="fa-solid fa-circle-question"></i>\r
            <div><strong>Tanya Jawab (FAQ)</strong><small style="display: block; color: #94A3B8; font-size: 0.72rem;">Seputar race pack &amp; aturan</small></div>\r
          </a>\r
          <a href="#legal" class="nav-dropdown-item">\r
            <i class="fa-solid fa-shield-halved"></i>\r
            <div><strong>Privasi Data (UU PDP)</strong><small style="display: block; color: #94A3B8; font-size: 0.72rem;">Keamanan data pribadi pelari</small></div>\r
          </a>\r
        </div>\r
      </li>\r
    </ul>\r
\r
    <div class="nav-actions" style="display: flex; align-items: center; gap: 8px;">\r
      <button class="btn btn-primary btn-sm btn-glow" id="navDaftarBtn"><i class="fa-solid fa-bolt"></i> Daftar Tiket</button>\r
      <button type="button" class="nav-mobile-toggle" id="navMobileToggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>\r
    </div>\r
  </nav>\r
\r
  <script>\r
    document.addEventListener('DOMContentLoaded', () => {\r
      const mobileToggle = document.getElementById('navMobileToggle'), navMenu = document.getElementById('navMenu'), dropdowns = document.querySelectorAll('.nav-dropdown');\r
      if (mobileToggle && navMenu) {\r
        mobileToggle.addEventListener('click', (e) => {\r
          e.stopPropagation(); navMenu.classList.toggle('mobile-open');\r
          mobileToggle.querySelector('i').className = navMenu.classList.contains('mobile-open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';\r
        });\r
      }\r
      dropdowns.forEach(dropdown => {\r
        dropdown.querySelector('.nav-dropdown-toggle').addEventListener('click', (e) => {\r
          e.stopPropagation(); dropdowns.forEach(other => { if (other !== dropdown) other.classList.remove('active'); });\r
          dropdown.classList.toggle('active');\r
        });\r
      });\r
      document.addEventListener('click', () => {\r
        if (navMenu) navMenu.classList.remove('mobile-open');\r
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));\r
        if (mobileToggle) mobileToggle.querySelector('i').className = 'fa-solid fa-bars';\r
      });\r
    });\r
  <\/script>\r
</div>`,Se=`<!-- =========================================================================\r
     FOOTER (LIGHT THEME ELEGANT)\r
     ========================================================================= -->\r
<footer class="glass-footer">\r
  <div class="container">\r
    <div class="footer-grid">\r
      <div class="footer-brand">\r
        <a href="#beranda" class="nav-brand">\r
          <div class="brand-icon">\r
            <i class="fa-solid fa-person-running"></i>\r
          </div>\r
          <div class="brand-text">TEGAL RUN <span>2027</span></div>\r
        </a>\r
        <p>\r
          Diselenggarakan oleh Komite Olahraga & Pariwisata Kota Tegal berkolaborasi dengan komunitas lari bahari. \r
          Ajang olahraga sehat berskala nasional berstandar PASI.\r
        </p>\r
        <div class="social-links">\r
          <a href="https://instagram.com" target="_blank" class="social-icon-btn"><i class="fa-brands fa-instagram"></i></a>\r
          <a href="https://facebook.com" target="_blank" class="social-icon-btn"><i class="fa-brands fa-facebook"></i></a>\r
          <a href="https://tiktok.com" target="_blank" class="social-icon-btn"><i class="fa-brands fa-tiktok"></i></a>\r
          <a href="https://youtube.com" target="_blank" class="social-icon-btn"><i class="fa-brands fa-youtube"></i></a>\r
        </div>\r
      </div>\r
\r
      <div>\r
        <h4 class="footer-title">Navigasi Utama</h4>\r
        <ul class="footer-links">\r
          <li><a href="#beranda"><i class="fa-solid fa-chevron-right"></i> Beranda</a></li>\r
          <li><a href="#kategori"><i class="fa-solid fa-chevron-right"></i> Kategori Lomba</a></li>\r
          <li><a href="/cek-tiket.html"><i class="fa-solid fa-chevron-right"></i> Cek Status Tiket & E-Tiket</a></li>\r
          <li><a href="#rute"><i class="fa-solid fa-chevron-right"></i> Rute & Checkpoint</a></li>\r
          <li><a href="#fasilitas"><i class="fa-solid fa-chevron-right"></i> Fasilitas & Racepack</a></li>\r
        </ul>\r
      </div>\r
\r
      <div>\r
        <h4 class="footer-title">Legal & Kepatuhan</h4>\r
        <ul class="footer-links">\r
          <li><a href="javascript:void(0)" id="footerPrivacyLink"><i class="fa-solid fa-shield-halved"></i> Kebijakan Privasi (UU PDP)</a></li>\r
          <li><a href="javascript:void(0)" id="footerTermsLink"><i class="fa-solid fa-file-lines"></i> Syarat & Ketentuan Lari</a></li>\r
          <li><a href="javascript:void(0)" id="footerWaiverLink"><i class="fa-solid fa-heart-pulse"></i> Pernyataan Pelepasan Medis</a></li>\r
          <li><a href="#faq"><i class="fa-solid fa-question"></i> FAQ & Bantuan</a></li>\r
        </ul>\r
      </div>\r
\r
      <div>\r
        <h4 class="footer-title">Sekretariat Pelaksana</h4>\r
        <p class="footer-address" style="color: var(--color-text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 10px;">\r
          Gedung Dinas Kepemudaan, Olahraga dan Pariwisata (Disporapar), Kompleks Balaikota, Jl. Ki Gede Sebayu No. 12, Tegal 52123.\r
        </p>\r
        <p style="color: var(--color-text-muted); font-size: 0.88rem; margin-bottom: 6px;">\r
          <i class="fa-solid fa-envelope" style="color: var(--color-primary); margin-right: 6px;"></i> <span class="footer-email">helpdesk@tegalrun.id</span>\r
        </p>\r
        <p style="color: var(--color-text-muted); font-size: 0.88rem;">\r
          <i class="fa-brands fa-whatsapp" style="color: #10B981; margin-right: 6px;"></i> <span class="footer-phone">+62 812-3456-7890</span> (Hotline)\r
        </p>\r
      </div>\r
    </div>\r
\r
    <div class="footer-bottom">\r
      <div class="footer-copyright-text">&copy; 2027 Komite Tegal Run. Hak Cipta Dilindungi Undang-Undang Republik Indonesia.</div>\r
      <div style="color: var(--color-text-muted);">\r
        Keamanan Transaksi Terenkripsi oleh <span style="color: var(--color-primary); font-weight: 700;">Midtrans Payment Gateway</span>\r
      </div>\r
    </div>\r
  </div>\r
</footer>\r
\r
`,Te=`<!-- =========================================================================\r
     FLOATING BOTTOM MOBILE DOCK NAVBAR (MODERN GLASS STYLE)\r
     ========================================================================= -->\r
<div class="mobile-bottom-dock">\r
  <style>\r
    .mobile-bottom-dock { position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 999; width: calc(100% - 24px); max-width: 440px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(226, 232, 240, 0.8); border-radius: 99px; padding: 6px; box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04); display: none; }\r
    .dock-items { display: flex; align-items: center; justify-content: space-between; list-style: none; margin: 0; padding: 0; }\r
    .dock-item { flex: 1; text-align: center; }\r
    .dock-item a { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; padding: 8px 4px; border-radius: 99px; text-decoration: none; color: #64748B; font-size: 0.7rem; font-weight: 600; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); position: relative; }\r
    .dock-item a i { font-size: 1.05rem; transition: transform 0.25s ease, color 0.25s ease; }\r
    .dock-item a:hover { color: #FF6B00; transform: translateY(-2px); }\r
    .dock-item a.active { color: #FF6B00; background: rgba(255, 107, 0, 0.1); font-weight: 700; }\r
    .dock-item a.active i { transform: scale(1.15); color: #FF6B00; }\r
    .dock-item.dock-cta a { background: linear-gradient(135deg, #FF6B00 0%, #FF852D 100%); color: #FFF; font-weight: 700; padding: 9px 6px; box-shadow: 0 4px 12px rgba(255, 107, 0, 0.35); }\r
    .dock-item.dock-cta a:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 6px 16px rgba(255, 107, 0, 0.45); color: #FFF; }\r
    .dock-item.dock-cta a i { color: #FFF; }\r
    @media (max-width: 868px) { .mobile-bottom-dock { display: block; } }\r
  </style>\r
\r
  <ul class="dock-items">\r
    <li class="dock-item">\r
      <a href="#beranda" class="active">\r
        <i class="fa-solid fa-house"></i>\r
        <span>Beranda</span>\r
      </a>\r
    </li>\r
    <li class="dock-item">\r
      <a href="#kategori">\r
        <i class="fa-solid fa-ticket"></i>\r
        <span>Kategori</span>\r
      </a>\r
    </li>\r
    <li class="dock-item">\r
      <a href="#rute">\r
        <i class="fa-solid fa-map"></i>\r
        <span>Rute</span>\r
      </a>\r
    </li>\r
    <li class="dock-item">\r
      <a href="/cek-tiket.html">\r
        <i class="fa-solid fa-magnifying-glass"></i>\r
        <span>Cek Tiket</span>\r
      </a>\r
    </li>\r
    <li class="dock-item dock-cta">\r
      <a href="#" id="dockDaftarBtn">\r
        <i class="fa-solid fa-bolt"></i>\r
        <span>Daftar</span>\r
      </a>\r
    </li>\r
  </ul>\r
</div>`,Ie=`<!-- =========================================================================\r
     HERO SECTION (2-COLUMN SPLIT ATHLETIC SPORT DESIGN)\r
     File: template/sections/hero.html\r
     ========================================================================= -->\r
<section class="hero-section" id="beranda">\r
  <div class="container">\r
    <div class="hero-split-grid">\r
      \r
      <!-- SISI KIRI: Judul, Deskripsi, Tombol Aksi & Hitung Mundur Race Day -->\r
      <div class="hero-col-content">\r
        <div class="hero-pill-badge" id="heroStatusBadge">\r
          <span class="status-dot"></span>\r
          <i class="fa-solid fa-bolt badge-icon" aria-hidden="true"></i>\r
          <span id="heroStatusText">PENDAFTARAN RESMI DIBUKA</span>\r
        </div>\r
\r
        <h1 class="hero-title">\r
          Tegal Run 2027<br>\r
          <span class="gradient-orange">Lari Bersama Menembus Batas</span>\r
        </h1>\r
\r
        <p class="hero-desc">\r
          Kompetisi lari terbesar di Kota Bahari dengan standar race profesional, timing chip akurat, dan medali finisher eksklusif.\r
        </p>\r
\r
        <div class="hero-actions">\r
          <button class="btn btn-primary btn-glow" id="heroCtaBtn">\r
            <i class="fa-solid fa-ticket" aria-hidden="true"></i> Amankan Slot Lari Sekarang\r
          </button>\r
\r
          <button class="btn btn-secondary" id="btnOpenTerms">\r
            <i class="fa-solid fa-file-contract" aria-hidden="true"></i> Syarat &amp; Ketentuan\r
          </button>\r
        </div>\r
\r
        <!-- Countdown Box (Hitung Mundur Race Day) -->\r
        <div class="countdown-box">\r
          <div class="countdown-header">\r
            <div class="countdown-title-wrap">\r
              <i class="fa-solid fa-stopwatch" aria-hidden="true"></i>\r
              <span>HITUNG MUNDUR MENUJU RACE DAY:</span>\r
            </div>\r
            <div class="event-date-pill badge-pending-date" id="eventDateDisplay">TANGGAL BELUM DITENTUKAN</div>\r
          </div>\r
          <div class="countdown-grid">\r
            <div class="countdown-card">\r
              <div class="countdown-num" id="days">--</div>\r
              <div class="countdown-text">Hari</div>\r
            </div>\r
            <div class="countdown-card">\r
              <div class="countdown-num" id="hours">--</div>\r
              <div class="countdown-text">Jam</div>\r
            </div>\r
            <div class="countdown-card">\r
              <div class="countdown-num" id="minutes">--</div>\r
              <div class="countdown-text">Menit</div>\r
            </div>\r
            <div class="countdown-card">\r
              <div class="countdown-num" id="seconds">--</div>\r
              <div class="countdown-text">Detik</div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- SISI KANAN: Visual Hero Sport Card dengan Gambar & Floating Badges -->\r
      <div class="hero-col-visual">\r
        <div class="athletic-hero-card">\r
          <div class="athletic-hero-img-wrap">\r
            <img src="public/images/lari.png" alt="Pelari Tegal Run 2027" class="athletic-hero-img" id="heroDisplayImg" loading="eager">\r
            <div class="athletic-card-overlay"></div>\r
          </div>\r
\r
          <!-- Floating Sport Badges -->\r
          <div class="sport-badge-float sport-badge-top-left">\r
            <div class="sport-badge-icon" style="background: rgba(34, 197, 94, 0.15); color: #16a34a;">\r
              <i class="fa-solid fa-certificate" aria-hidden="true"></i>\r
            </div>\r
            <div>\r
              <div class="sport-badge-title">Standar PB PASI</div>\r
              <div class="sport-badge-sub">Rute Steril Bersertifikat</div>\r
            </div>\r
          </div>\r
\r
          <div class="sport-badge-float sport-badge-mid-right">\r
            <div class="sport-badge-icon" style="background: rgba(59, 130, 246, 0.15); color: #2563eb;">\r
              <i class="fa-solid fa-medal" aria-hidden="true"></i>\r
            </div>\r
            <div>\r
              <div class="sport-badge-title">Medali Finisher</div>\r
              <div class="sport-badge-sub">Logam Cor Eksklusif</div>\r
            </div>\r
          </div>\r
\r
          <div class="sport-badge-float sport-badge-bottom-right">\r
            <div class="sport-badge-icon" style="background: rgba(255, 107, 0, 0.15); color: #FF6B00;">\r
              <i class="fa-solid fa-microchip" aria-hidden="true"></i>\r
            </div>\r
            <div>\r
              <div class="sport-badge-title">RFID Chip Timing</div>\r
              <div class="sport-badge-sub">Pencatatan Waktu Akurat</div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
    </div>\r
\r
    <!-- Live Event Stats Grid (Dinamis dari Backend / CMS) -->\r
    <div class="stats-banner" id="statsBanner">\r
      <div class="stat-item">\r
        <div class="stat-num"><span id="statVal1">2,500+</span> <small id="statUnit1">Pelari</small></div>\r
        <div class="stat-desc" id="statDesc1">Terdaftar</div>\r
      </div>\r
      <div class="stat-item">\r
        <div class="stat-num"><span id="statVal2">2</span> <small id="statUnit2">Kategori Utama</small></div>\r
        <div class="stat-desc" id="statDesc2">Half Marathon 10K & Fun Run 5K</div>\r
      </div>\r
      <div class="stat-item">\r
        <div class="stat-num"><span id="statVal3">100%</span> <small id="statUnit3">Steril & Aman</small></div>\r
        <div class="stat-desc" id="statDesc3">Pengawalan Dishub & Polresta</div>\r
      </div>\r
      <div class="stat-item">\r
        <div class="stat-num"><span id="statVal4">Rp 75Jt</span> <small id="statUnit4">Total Hadiah</small></div>\r
        <div class="stat-desc" id="statDesc4">&amp; Doorprize</div>\r
      </div>\r
    </div>\r
  </div>\r
</section>`,Be=`<!-- =========================================================================\r
     KATEGORI EVENT & TIKET\r
     ========================================================================= -->\r
<section class="tickets-section" id="kategori">\r
  <div class="container">\r
    <div class="section-header text-center">\r
      <div class="section-tag">\r
        <i class="fa-solid fa-tags" aria-hidden="true"></i> Tiket yang Tersedia\r
      </div>\r
      <h2 class="section-title">Pilih Tantangan Jarak Lari Anda</h2>\r
      <p class="section-desc">\r
        Tersedia kategori kompetitif bagi atlet dan fun run santai bagi keluarga & komunitas. \r
        Seluruh peserta yang finis sebelum batas waktu (Cut-Off Time) berhak atas Medali Finisher resmi.\r
      </p>\r
      <img id="ticketsCmsMedia" class="tickets-cms-media" alt="Preview medali finisher" loading="lazy" hidden>\r
    </div>\r
\r
    <!-- Container Tiket Dinamis (Di-render via JavaScript) -->\r
    <div \r
      class="tickets-grid" \r
      id="ticketsGrid" \r
      aria-live="polite" \r
      aria-busy="true"\r
    >\r
      <!-- Loading Skeleton Card 1 -->\r
      <div class="glass-card ticket-card sk-card">\r
        <div class="sk" style="width: 100px; height: 24px; border-radius: 12px; margin-bottom: 16px;"></div>\r
        <div class="sk" style="width: 75%; height: 32px; border-radius: 8px; margin-bottom: 12px;"></div>\r
        <div class="sk" style="width: 50%; height: 44px; border-radius: 8px; margin-bottom: 24px;"></div>\r
        <div class="ticket-features-sk" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">\r
          <div class="sk" style="width: 100%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 90%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 95%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 80%; height: 20px; border-radius: 4px;"></div>\r
        </div>\r
        <div class="sk" style="width: 100%; height: 48px; border-radius: 30px;"></div>\r
      </div>\r
\r
      <!-- Loading Skeleton Card 2 -->\r
      <div class="glass-card ticket-card sk-card">\r
        <div class="sk" style="width: 100px; height: 24px; border-radius: 12px; margin-bottom: 16px;"></div>\r
        <div class="sk" style="width: 75%; height: 32px; border-radius: 8px; margin-bottom: 12px;"></div>\r
        <div class="sk" style="width: 50%; height: 44px; border-radius: 8px; margin-bottom: 24px;"></div>\r
        <div class="ticket-features-sk" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">\r
          <div class="sk" style="width: 100%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 90%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 95%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 80%; height: 20px; border-radius: 4px;"></div>\r
        </div>\r
        <div class="sk" style="width: 100%; height: 48px; border-radius: 30px;"></div>\r
      </div>\r
\r
      <!-- Loading Skeleton Card 3 -->\r
      <div class="glass-card ticket-card sk-card">\r
        <div class="sk" style="width: 100px; height: 24px; border-radius: 12px; margin-bottom: 16px;"></div>\r
        <div class="sk" style="width: 75%; height: 32px; border-radius: 8px; margin-bottom: 12px;"></div>\r
        <div class="sk" style="width: 50%; height: 44px; border-radius: 8px; margin-bottom: 24px;"></div>\r
        <div class="ticket-features-sk" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">\r
          <div class="sk" style="width: 100%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 90%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 95%; height: 20px; border-radius: 4px;"></div>\r
          <div class="sk" style="width: 80%; height: 20px; border-radius: 4px;"></div>\r
        </div>\r
        <div class="sk" style="width: 100%; height: 48px; border-radius: 30px;"></div>\r
      </div>\r
    </div>\r
\r
    <!-- Template State Kosong / Pendaftaran Ditutup (Hidden by default) -->\r
    <template id="ticketClosedTemplate">\r
      <div class="empty-tickets-notice text-center p-8 bg-white/5 rounded-xl border border-white/10">\r
        <i class="fa-solid fa-lock text-4xl text-yellow-500 mb-3" aria-hidden="true"></i>\r
        <h3 class="text-xl font-bold text-white mb-2">Pendaftaran Resmi Ditutup</h3>\r
        <p class="text-gray-400 max-w-md mx-auto">\r
          Kuota pendaftaran untuk seluruh kategori lari telah terpenuhi atau masa pendaftaran telah berakhir.\r
        </p>\r
      </div>\r
    </template>\r
  </div>\r
</section>`,Pe=`<!-- =========================================================================\r
     RUTE & MAP CHECKPOINTS\r
     ========================================================================= -->\r
<section class="route-section" id="rute">\r
  <div class="container">\r
    <div class="route-container">\r
      <div class="glass-card route-info-card">\r
        <div class="section-tag" style="margin-bottom: 12px;">\r
          <i class="fa-solid fa-route"></i> Jalur Lari Steril\r
        </div>\r
        <h2 class="section-title" id="routeSectionTitle" style="text-align: left; font-size: 2rem;">\r
          Rute Datar Pesisir Pantura Tegal\r
        </h2>\r
        <p id="routeSectionDesc" style="color: var(--color-text-muted); font-size: 0.95rem;">\r
          Jalur lari disterilkan bekerja sama dengan Satlantas Polres Tegal Kota dan Dishub, \r
          menjamin keamanan pelari dari polusi dan kendaraan bermotor.\r
        </p>\r
\r
        <div class="route-checklist" id="routeChecklistContainer">\r
          <!-- Loaded dynamically from /api/routes -->\r
        </div>\r
      </div>\r
\r
      <div class="glass-card route-visual-card">\r
        <div class="route-badge-float">\r
          <i class="fa-solid fa-certificate"></i> Terverifikasi PASI\r
        </div>\r
        <div class="route-map-mock">\r
          <svg class="route-path-svg" viewBox="0 0 500 400" fill="none">\r
            <circle cx="90" cy="310" r="14" fill="#FF6B00" opacity="0.2"/>\r
            <circle cx="90" cy="310" r="7" fill="#FF6B00"/>\r
            <circle cx="240" cy="200" r="14" fill="#FF851B" opacity="0.2"/>\r
            <circle cx="240" cy="200" r="7" fill="#FF851B"/>\r
            <circle cx="420" cy="110" r="14" fill="#10B981" opacity="0.2"/>\r
            <circle cx="420" cy="110" r="7" fill="#10B981"/>\r
            <path d="M 90 310 Q 160 270 240 200 T 420 110" stroke="#FF6B00" stroke-width="4" stroke-dasharray="6 6"/>\r
            <path d="M 420 110 C 370 200 230 330 90 310" stroke="#0F172A" stroke-width="3" stroke-opacity="0.25"/>\r
          </svg>\r
\r
          <div style="z-index: 2; text-align: center; padding: 24px;">\r
            <div class="map-icon-circle">\r
              <i class="fa-solid fa-map-location"></i>\r
            </div>\r
            <h4 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">Peta Rute Tegal Run 2027</h4>\r
            <p style="font-size: 0.85rem; color: #64748B; max-width: 320px; margin: 0 auto 16px auto;">\r
              Unduh rute digital GPX untuk jam tangan Garmin, Coros, Polar, atau aplikasi Strava Anda.\r
            </p>\r
            <a href="#" class="btn btn-sm btn-secondary" id="btnDownloadGpx">\r
              <i class="fa-solid fa-download"></i> Unduh File GPX (Strava/Garmin)\r
            </a>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
`,Ae=`<!-- =========================================================================\r
     FASILITAS & RACEPACK SHOWCASE (DYNAMIC FROM BACKEND)\r
     ========================================================================= -->\r
<section class="facilities-section" id="fasilitas">\r
  <style>\r
    .facilities-section { padding: 48px 0; background: var(--color-bg, #F8FAFC); }\r
    .facilities-section .section-header { text-align: center; margin-bottom: 28px; }\r
    .facilities-section .section-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,107,0,0.08); color: var(--color-primary, #FF6B00); padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }\r
    .facilities-section .section-title { font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight: 800; color: var(--color-text-title, #0F172A); margin-bottom: 6px; }\r
    .facilities-section .section-desc { color: var(--color-text-muted, #64748B); font-size: 0.875rem; max-width: 560px; margin: 0 auto; line-height: 1.4; }\r
\r
    /* Compact Grid Layout */\r
    .facilities-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 20px; }\r
    \r
    /* Compact Cards */\r
    .facility-card { background: #FFFFFF; border: 1px solid var(--color-border, #E2E8F0); border-radius: 12px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: transform 0.2s ease, box-shadow 0.2s ease; display: flex; flex-direction: column; }\r
    .facility-card:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.06); border-color: rgba(255,107,0,0.3); }\r
    \r
    .facility-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }\r
    .facility-icon-wrap { width: 34px; height: 34px; min-width: 34px; border-radius: 8px; background: rgba(255,107,0,0.1); color: var(--color-primary, #FF6B00); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; }\r
    .facility-title { font-size: 0.925rem; font-weight: 700; color: var(--color-text-title, #0F172A); margin: 0; line-height: 1.3; }\r
    .facility-desc { font-size: 0.8rem; color: var(--color-text-body, #475569); line-height: 1.45; margin: 0; flex-grow: 1; }\r
    \r
    .btn-text-link { display: inline-flex; align-items: center; gap: 5px; background: transparent; border: none; color: var(--color-primary, #FF6B00); font-size: 0.775rem; font-weight: 700; margin-top: 10px; padding: 0; cursor: pointer; text-decoration: none; font-family: inherit; }\r
    .btn-text-link:hover { text-decoration: underline; }\r
\r
    @media (max-width: 576px) {\r
      .facilities-grid { grid-template-columns: 1fr; gap: 10px; }\r
      .facility-card { padding: 14px; }\r
    }\r
  </style>\r
\r
  <div class="container">\r
    <div class="section-header">\r
      <div class="section-tag">\r
        <i class="fa-solid fa-gift"></i> Informasi\r
      </div>\r
      <h2 class="section-title">Racepack Premium &amp; Fasilitas Pelari</h2>\r
      <p class="section-desc">\r
        Setiap nomor BIB dicetak khusus atas nama peserta, dilengkapi asuransi jiwa perlindungan medis selama perlombaan berlangsung.\r
      </p>\r
    </div>\r
\r
    <img id="facilitiesMedia" class="facilities-media" alt="Fasilitas dan race village" loading="lazy" hidden>\r
\r
    <!-- Container Grid yang diisi secara dinamis dari Backend -->\r
    <div class="facilities-grid" id="facilitiesContainer">\r
      <!-- Loading State Skeleton / Fallback -->\r
      <div class="facility-card" style="text-align: center; color: #94A3B8; font-size: 0.85rem; padding: 20px;">\r
        <i class="fa-solid fa-circle-notch fa-spin"></i> Memuat fasilitas pelari...\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
`,Ce=`<!-- =========================================================================\r
     KEPATUHAN HUKUM & PERLINDUNGAN DATA (UU PDP & UU ITE INDONESIA)\r
     ========================================================================= -->\r
<section class="legal-section" id="legal">\r
  <div class="container">\r
    <div class="legal-box glass-card">\r
      <div class="section-header" style="margin-bottom: 24px;">\r
        <div class="section-tag">\r
          <i class="fa-solid fa-shield-halved"></i> Kepatuhan Regulasi Indonesia\r
        </div>\r
        <h2 class="section-title" id="legalSectionTitle" style="font-size: 2rem;">Perizinan &amp; Kepatuhan Hukum Resmi</h2>\r
        <p class="section-desc" id="legalSectionDesc">\r
          Tegal Run 2027 diselenggarakan dengan izin resmi pemerintah daerah, PASI, dan standar keselamatan medis internasional. Pengumpulan data NIK dan kontak darurat semata-mata untuk verifikasi BIB dan penerbitan polis asuransi.\r
        </p>\r
      </div>\r
\r
      <div class="legal-grid" id="legalGridContainer">\r
        <div class="legal-item">\r
          <i class="fa-solid fa-certificate"></i>\r
          <h4 id="legalItem1Title">Rekomendasi Resmi PB PASI</h4>\r
          <p id="legalItem1Desc">Tersertifikasi standar teknis rute dan aturan perlombaan atletik resmi nasional.</p>\r
        </div>\r
        <div class="legal-item">\r
          <i class="fa-solid fa-road-barrier"></i>\r
          <h4 id="legalItem2Title">Izin Kepolisian &amp; Dishub</h4>\r
          <p id="legalItem2Desc">Pengamanan jalur dan rekayasa lalu lintas penuh demi keselamatan pelari.</p>\r
        </div>\r
        <div class="legal-item">\r
          <i class="fa-solid fa-shield-heart"></i>\r
          <h4 id="legalItem3Title">Asuransi Medis Peserta</h4>\r
          <p id="legalItem3Desc">Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri selama perlombaan berlangsung.</p>\r
        </div>\r
        <div class="legal-item">\r
          <i class="fa-solid fa-user-lock"></i>\r
          <h4 id="legalItem4Title">Perlindungan Data Pribadi (UU PDP)</h4>\r
          <p id="legalItem4Desc">Enkripsi data pendaftaran dan kepatuhan penuh undang-undang perlindungan data konsumen.</p>\r
        </div>\r
      </div>\r
\r
      <div class="legal-cta-box">\r
        <button class="btn btn-outline btn-sm" id="btnOpenPrivacyModal">\r
          <i class="fa-solid fa-file-shield"></i> Baca Kebijakan Privasi Lengkap (UU PDP)\r
        </button>\r
        <button class="btn btn-outline btn-sm" id="btnOpenTermsModal">\r
          <i class="fa-solid fa-scale-balanced"></i> Ketentuan Perlombaan &amp; Pelepasan Tanggung Jawab\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
`,Le=`<!-- =========================================================================\r
     FAQ SECTION (GENERAL & EXCLUSIVE ACCORDION)\r
     ========================================================================= -->\r
<section class="faq-section" id="faq">\r
  <style>\r
    .faq-section { padding: 48px 0; background: var(--color-bg, #F8FAFC); }\r
    .faq-section .section-header { text-align: center; margin-bottom: 28px; }\r
    .faq-section .section-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,107,0,0.08); color: var(--color-primary, #FF6B00); padding: 4px 12px; border-radius: 99px; font-size: 0.775rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }\r
    .faq-section .section-title { font-size: clamp(1.3rem, 3.5vw, 1.8rem); font-weight: 800; color: var(--color-text-title, #0F172A); margin-bottom: 6px; line-height: 1.25; }\r
    .faq-section .section-desc { color: var(--color-text-muted, #64748B); font-size: clamp(0.825rem, 2vw, 0.9rem); max-width: 560px; margin: 0 auto; line-height: 1.4; }\r
    .faq-list { max-width: 760px; margin: 20px auto 0; display: flex; flex-direction: column; gap: 10px; }\r
    .faq-item { background: #FFFFFF; border: 1px solid var(--color-border, #E2E8F0); border-radius: 12px; overflow: hidden; transition: border-color 0.25s ease, box-shadow 0.25s ease; }\r
    .faq-item:hover { border-color: rgba(255, 107, 0, 0.4); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); }\r
    .faq-item.active { border-color: var(--color-primary, #FF6B00); box-shadow: 0 4px 16px rgba(255, 107, 0, 0.1); }\r
    .faq-question { padding: 14px 16px; font-size: 0.9rem; font-weight: 700; color: var(--color-text-title, #0F172A); cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; user-select: none; transition: color 0.2s ease; }\r
    .faq-question:hover { color: var(--color-primary, #FF6B00); }\r
    .faq-question i { font-size: 0.8rem; color: #94A3B8; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease; }\r
    .faq-item.active .faq-question i { transform: rotate(180deg); color: var(--color-primary, #FF6B00); }\r
    .faq-answer-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\r
    .faq-item.active .faq-answer-wrapper { grid-template-rows: 1fr; }\r
    .faq-answer { overflow: hidden; font-size: 0.85rem; color: var(--color-text-body, #475569); line-height: 1.5; padding: 0 16px; transition: padding 0.3s ease; }\r
    .faq-item.active .faq-answer { padding: 0 16px 14px 16px; }\r
    @media (max-width: 576px) {\r
      .faq-section { padding: 32px 0; }\r
      .faq-list { gap: 8px; }\r
      .faq-question { padding: 12px 14px; font-size: 0.85rem; }\r
      .faq-answer { font-size: 0.8rem; }\r
      .faq-item.active .faq-answer { padding: 0 14px 12px 14px; }\r
    }\r
  </style>\r
\r
  <div class="container">\r
    <div class="section-header">\r
      <div class="section-tag">\r
        <i class="fa-solid fa-circle-question"></i> Pusat Informasi\r
      </div>\r
      <h2 class="section-title">Pertanyaan yang Sering Diajukan (FAQ)</h2>\r
      <p class="section-desc">\r
        Temukan informasi umum mengenai pendaftaran tiket, racepack, aturan lomba, dan kebijakan acara.\r
      </p>\r
    </div>\r
\r
    <div class="faq-list">\r
      <div class="faq-item active">\r
        <div class="faq-question">\r
          <span>Apakah tiket atau BIB perlombaan dapat dipindahtangankan?</span>\r
          <i class="fa-solid fa-chevron-down"></i>\r
        </div>\r
        <div class="faq-answer-wrapper">\r
          <div class="faq-answer">\r
            Demi alasan keselamatan medis dan validitas data peserta, tiket dan nomor BIB terdaftar resmi tidak dapat dipindahtangankan atau diwakilkan kepada orang lain tanpa persetujuan dari panitia.\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="faq-item">\r
        <div class="faq-question">\r
          <span>Bagaimana prosedur pengambilan Race Pack (RPC)?</span>\r
          <i class="fa-solid fa-chevron-down"></i>\r
        </div>\r
        <div class="faq-answer-wrapper">\r
          <div class="faq-answer">\r
            Informasi mengenai jadwal dan lokasi pengambilan racepack diumumkan melalui kanal resmi event. Peserta wajib membawa e-tiket resmi dan identitas diri yang sah saat pengambilan.\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="faq-item">\r
        <div class="faq-question">\r
          <span>Apakah ada ketentuan kualifikasi fisik bagi peserta?</span>\r
          <i class="fa-solid fa-chevron-down"></i>\r
        </div>\r
        <div class="faq-answer-wrapper">\r
          <div class="faq-answer">\r
            Setiap peserta bertanggung jawab atas kondisi fisik dan kesehatannya masing-masing. Peserta diimbau melakukan pemeriksaan medis mandiri dan memastikan stamina tubuh prima sebelum mengikuti perlombaan.\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="faq-item">\r
        <div class="faq-question">\r
          <span>Bagaimana kebijakan acara jika terjadi keadaan kahar (Force Majeure)?</span>\r
          <i class="fa-solid fa-chevron-down"></i>\r
        </div>\r
        <div class="faq-answer-wrapper">\r
          <div class="faq-answer">\r
            Jika terjadi cuaca ekstrem, kendala keamanan, atau situasi darurat yang tidak memungkinkan acara berlangsung, panitia berhak menyesuaikan jadwal atau rute demi keselamatan seluruh peserta sesuai regulasi yang berlaku.\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="faq-item">\r
        <div class="faq-question">\r
          <span>Bagaimana kerahasiaan data pribadi peserta dilindungi?</span>\r
          <i class="fa-solid fa-chevron-down"></i>\r
        </div>\r
        <div class="faq-answer-wrapper">\r
          <div class="faq-answer">\r
            Seluruh data pribadi yang dikumpulkan saat pendaftaran dijaga kerahasiaannya dan hanya digunakan untuk keperluan operasional acara, keselamatan medis, serta verifikasi tiket sesuai peraturan yang berlaku.\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <script>\r
    document.addEventListener('DOMContentLoaded', () => {\r
      const faqItems = document.querySelectorAll('.faq-item');\r
      faqItems.forEach(item => {\r
        item.querySelector('.faq-question').addEventListener('click', () => {\r
          const isActive = item.classList.contains('active');\r
          // Melipat/menutup semua item lain yang sedang terbuka\r
          faqItems.forEach(other => other.classList.remove('active'));\r
          // Toggle item yang sedang diklik\r
          if (!isActive) item.classList.add('active');\r
        });\r
      });\r
    });\r
  <\/script>\r
</section>`,Me=`<!-- =========================================================================\r
     MODAL 1: CHECKOUT & WAR TIKET FORM (3-STEP WITH UU PDP CONSENT)\r
     ========================================================================= -->\r
<div class="modal-overlay" id="regModal">\r
  <div class="modal-container">\r
    <div class="modal-header">\r
      <div class="modal-title-group">\r
        <h3><i class="fa-solid fa-bolt" style="color: var(--color-primary); margin-right: 8px;"></i> Formulir Pendaftaran Tegal Run 2027</h3>\r
        <p>Lengkapi identitas penanggung jawab & pelari sesuai data KTP asli.</p>\r
      </div>\r
      <button class="modal-close-btn" id="modalCloseBtn">\r
        <i class="fa-solid fa-xmark"></i>\r
      </button>\r
    </div>\r
\r
    <!-- Stepper Navigation -->\r
    <div class="modal-steps">\r
      <div class="step-indicator active" id="stepIndicator1">\r
        <div class="step-num">1</div>\r
        <span>Kategori & Pemesan</span>\r
      </div>\r
      <div class="step-indicator" id="stepIndicator2">\r
        <div class="step-num">2</div>\r
        <span>Data Peserta</span>\r
      </div>\r
      <div class="step-indicator" id="stepIndicator3">\r
        <div class="step-num">3</div>\r
        <span>Persetujuan & Bayar</span>\r
      </div>\r
    </div>\r
\r
    <!-- Modal Body -->\r
    <div class="modal-body">\r
      <!-- STEP 1: PILIH KATEGORI & DATA PEMESAN -->\r
      <div id="stepSection1">\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label class="form-label">Kategori Lari <span class="req">*</span></label>\r
            <select class="form-select" id="modalEventSelect"></select>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Jumlah Tiket / Peserta <span class="req">*</span></label>\r
            <select class="form-select" id="modalParticipantCount">\r
              <option value="1">1 Orang Peserta</option>\r
              <option value="2">2 Orang Peserta</option>\r
              <option value="3">3 Orang Peserta</option>\r
              <option value="4">4 Orang Peserta</option>\r
              <option value="5">5 Orang Peserta</option>\r
            </select>\r
          </div>\r
        </div>\r
\r
        <div class="card-embedded">\r
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 14px;">\r
            <i class="fa-solid fa-user-shield" style="color: var(--color-primary);"></i> Data Penanggung Jawab Pemesanan\r
          </h4>\r
\r
          <div class="form-group">\r
            <label class="form-label">Nama Lengkap Pemesan <span class="req">*</span></label>\r
            <input type="text" class="form-input" id="bookerName" placeholder="Contoh: Budi Santoso" required>\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Alamat Email Aktif <span class="req">*</span></label>\r
              <input type="email" class="form-input" id="bookerEmail" placeholder="nama@gmail.com" required>\r
              <div class="form-hint">E-Tiket & invoice otomatis dikirim ke email ini.</div>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Nomor WhatsApp Aktif <span class="req">*</span></label>\r
              <input type="tel" class="form-input" id="bookerPhone" placeholder="Contoh: 081234567890" required>\r
              <div class="form-hint">Digunakan untuk menerima notifikasi E-Tiket via WhatsApp.</div>\r
            </div>\r
          </div>\r
\r
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #CBD5E1;">\r
            <label class="checkbox-container" style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">\r
              <input type="checkbox" id="checkSameAsBooker">\r
              <span class="checkmark"></span>\r
              <span class="checkbox-label" style="font-weight: 700; font-size: 0.9rem; color: #1E293B;">\r
                Gunakan Data Penanggung Jawab Pemesanan sebagai Peserta #1\r
              </span>\r
            </label>\r
            <div class="form-hint" style="margin-left: 28px; margin-top: 2px;">\r
              Nama dan nomor WhatsApp penanggung jawab akan otomatis mengisi data formulir Peserta #1.\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Rincian Biaya & Layanan Step 1 -->\r
        <div class="card-embedded" style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); margin-top: 14px; padding: 16px;">\r
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">\r
            <i class="fa-solid fa-receipt" style="color: var(--color-primary);"></i> Estimasi Rincian Biaya &amp; Layanan\r
          </h4>\r
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 6px;">\r
            <span style="color: var(--color-text-muted);">Subtotal Tiket:</span>\r
            <strong id="step1TicketsSubtotal" style="color: #0F172A;">Rp 0</strong>\r
          </div>\r
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 8px;">\r
            <span style="color: var(--color-text-muted);" id="step1FeeLabel">Biaya Layanan:</span>\r
            <strong id="step1FeeAmount" style="color: #EA580C;">Rp 0</strong>\r
          </div>\r
          <div style="border-top: 1px dashed #CBD5E1; padding-top: 8px; display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 1.05rem;">\r
            <span style="color: #0F172A;">Total Tagihan:</span>\r
            <span style="color: var(--color-primary);" id="step1GrandTotal">Rp 0</span>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- STEP 2: DATA PESERTA (REPEATER) -->\r
      <div id="stepSection2" style="display: none;">\r
        <div id="participantsContainer"></div>\r
      </div>\r
\r
      <!-- STEP 3: RINGKASAN & PERSETUJUAN UU PDP -->\r
      <div id="stepSection3" style="display: none;">\r
        <div id="summaryReviewBox"></div>\r
\r
        <!-- UU PDP Mandatory Consent Checkbox -->\r
        <div class="consent-box">\r
          <label class="checkbox-container">\r
            <input type="checkbox" id="checkConsentPDP" required>\r
            <span class="checkmark"></span>\r
            <span class="checkbox-label">\r
              <strong>Persetujuan Pemrosesan Data Pribadi (UU PDP No. 27/2022)</strong><br>\r
              Saya memberikan persetujuan eksplisit kepada Komite Tegal Run 2027 untuk memproses data NIK, \r
              kontak darurat, dan data medis yang saya serahkan demi kepentingan identifikasi nomor BIB, \r
              penanganan gawat darurat medis di lintasan, serta penerbitan polis asuransi perlombaan.\r
            </span>\r
          </label>\r
        </div>\r
\r
        <div class="consent-box" style="margin-top: 12px;">\r
          <label class="checkbox-container">\r
            <input type="checkbox" id="checkConsentWaiver" required>\r
            <span class="checkmark"></span>\r
            <span class="checkbox-label">\r
              <strong>Pelepasan Tanggung Jawab Medis (Liability Waiver)</strong><br>\r
              Saya menyatakan dalam kondisi fisik yang sehat dan terlatih untuk menyelesaikan kategori lari ini. \r
              Saya memahami risiko olahraga maraton dan mematuhi seluruh peraturan panitia penyelenggara.\r
            </span>\r
          </label>\r
        </div>\r
\r
        <div class="midtrans-badge-box">\r
          <i class="fa-solid fa-lock" style="color: #10B981; font-size: 1.2rem;"></i>\r
          <span style="font-size: 0.85rem; color: #475569;">\r
            Pembayaran diamankan secara real-time via <strong>Midtrans Snap</strong> (QRIS, VA Bank BCA, BRI, Mandiri, BNI, Kartu Kredit).\r
          </span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Modal Footer -->\r
    <div class="modal-footer">\r
      <div class="order-total-preview">\r
        <span class="total-label">Total Tagihan</span>\r
        <span class="total-amount" id="modalTotalAmount">Rp 0</span>\r
      </div>\r
\r
      <div class="modal-footer-actions" style="display: flex; gap: 10px;">\r
        <button type="button" class="btn btn-secondary btn-sm" id="btnModalPrev" style="display: none;">\r
          <i class="fa-solid fa-arrow-left"></i> Kembali\r
        </button>\r
        <button type="button" class="btn btn-primary btn-sm" id="btnModalNext">\r
          Lanjut <i class="fa-solid fa-arrow-right"></i>\r
        </button>\r
        <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnModalSubmit" style="display: none;">\r
          <i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- =========================================================================\r
     MODAL 2: KEBIJAKAN PRIVASI (UU PDP NO. 27 TAHUN 2022)\r
     ========================================================================= -->\r
<div class="modal-overlay" id="privacyModal">\r
  <div class="modal-container" style="max-width: 800px;">\r
    <div class="modal-header">\r
      <div class="modal-title-group">\r
        <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary); margin-right: 8px;"></i> Kebijakan Privasi Data Pribadi (UU PDP)</h3>\r
        <p>Berdasarkan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022</p>\r
      </div>\r
      <button class="modal-close-btn" id="privacyCloseBtn">\r
        <i class="fa-solid fa-xmark"></i>\r
      </button>\r
    </div>\r
\r
    <div class="modal-body legal-document-text">\r
      <h4>1. Pengendali Data Pribadi</h4>\r
      <p>\r
        Pengendali Data Pribadi untuk seluruh aktivitas pendaftaran Tegal Run 2027 adalah <strong>Komite Pelaksana Tegal Run 2027</strong> yang berkedudukan di Tegal, Jawa Tengah. Kami berkomitmen melindungi data pribadi Anda sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) dan UU No. 1 Tahun 2024 tentang ITE.\r
      </p>\r
\r
      <h4>2. Data Pribadi yang Dikumpulkan</h4>\r
      <p>Data yang kami kumpulkan mencakup:</p>\r
      <ul>\r
        <li><strong>Data Pribadi Umum:</strong> Nama Lengkap sesuai KTP, Nomor Induk Kependudukan (NIK 16 digit), Tempat & Tanggal Lahir, Jenis Kelamin, Alamat Lengkap Domisili, Nomor Telepon/WhatsApp, dan Alamat Surel (Email).</li>\r
        <li><strong>Data Pribadi Spesifik/Sensitif:</strong> Golongan Darah dan Riwayat Penyakit/Alergi Medis yang diserahkan secara sukarela untuk penanganan darurat tim medis ambulans di rute perlombaan.</li>\r
      </ul>\r
\r
      <h4>3. Dasar Hukum dan Tujuan Pemrosesan</h4>\r
      <p>Pemrosesan data pribadi Anda dilakukan berdasarkan persetujuan eksplisit (Consent) untuk tujuan:</p>\r
      <ul>\r
        <li>Verifikasi kepemilikan nomor dada (BIB) resmi guna mencegah pemalsuan identitas atau praktik joki atletik.</li>\r
        <li>Penerbitan polis asuransi perlindungan kecelakaan olahraga selama berlangsungnya perlombaan.</li>\r
        <li>Penyelamatan jiwa (Vital Interest) oleh tim dokter darurat jika terjadi kolaps medis di lintasan.</li>\r
        <li>Pengiriman hasil waktu lomba (Race Timing) dan e-Certificate resmi.</li>\r
      </ul>\r
\r
      <h4>4. Keamanan dan Batas Masa Retensi Data</h4>\r
      <p>\r
        Data disimpan pada server terenkripsi dengan protokol SSL/TLS 256-bit dan pembatasan akses ketat. \r
        Masa simpan (retensi) data maksimal adalah 1 (satu) tahun kalender setelah event selesai untuk kebutuhan audit keselamatan dan keuangan resmi, setelah itu data dianonimkan atau dimusnahkan secara aman.\r
      </p>\r
\r
      <h4>5. Hak Anda sebagai Subjek Data</h4>\r
      <p>\r
        Berdasarkan Pasal 5 s.d. Pasal 13 UU PDP, Anda berhak mengakses, memperbaiki kesalahan data, menolak pemrosesan otomatis, serta mengajukan permohonan penghapusan data Anda. Hubungi Petugas Perlindungan Data kami melalui surel resmi: <code>dpo@tegalrun.id</code>.\r
      </p>\r
    </div>\r
\r
    <div class="modal-footer" style="justify-content: flex-end;">\r
      <button class="btn btn-secondary btn-sm" id="privacyOkBtn">Tutup Dokumen</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- =========================================================================\r
     MODAL 3: SYARAT & KETENTUAN (TERMS & CONDITIONS)\r
     ========================================================================= -->\r
<div class="modal-overlay" id="termsModal">\r
  <div class="modal-container" style="max-width: 800px;">\r
    <div class="modal-header">\r
      <div class="modal-title-group">\r
        <h3><i class="fa-solid fa-file-contract" style="color: var(--color-primary); margin-right: 8px;"></i> Syarat & Ketentuan Peserta Lari</h3>\r
        <p>Regulasi Resmi Perlombaan Tegal Run 2027</p>\r
      </div>\r
      <button class="modal-close-btn" id="termsCloseBtn">\r
        <i class="fa-solid fa-xmark"></i>\r
      </button>\r
    </div>\r
\r
    <div class="modal-body legal-document-text">\r
      <h4>1. Ketentuan Umum Kepesertaan</h4>\r
      <p>\r
        Pendaftaran terbuka untuk Warga Negara Indonesia (WNI) dan Warga Negara Asing (WNA) yang memiliki identitas resmi (KTP/SIM/Paspor). \r
        Peserta wajib memilih kategori yang sesuai dengan kemampuan fisik dan mematuhi batas waktu Cut-Off Time (COT).\r
      </p>\r
\r
      <h4>2. Larangan Praktik Joki & Pengalihan BIB</h4>\r
      <p>\r
        Nomor BIB bersifat personal dan tidak dapat diperjualbelikan atau dialihkan kepada pihak lain tanpa persetujuan tertulis resmi panitia. \r
        Pelanggaran terhadap pasal ini akan mengakibatkan diskualifikasi instan, pencabutan hak medali finisher, dan hilangnya perlindungan santunan asuransi.\r
      </p>\r
\r
      <h4>3. Pelepasan Tanggung Jawab Medis (Waiver of Liability)</h4>\r
      <p>\r
        Dengan menyelesaikan pendaftaran, peserta menyadari bahwa lari maraton adalah aktivitas fisik berkategori intensitas tinggi. \r
        Peserta membebaskan panitia penyelenggara, sponsor, dan aparat pengamanan dari tuntutan hukum perdata maupun pidana atas cedera fisik, kehilangan harta benda, atau insiden yang diakibatkan oleh kondisi kesehatan bawaan peserta yang tidak diungkapkan kepada tim medis.\r
      </p>\r
\r
      <h4>4. Kebijakan Keadaan Kahar (Force Majeure)</h4>\r
      <p>\r
        Apabila terjadi keadaan darurat bencana alam, kebakaran, kerusuhan sosial, atau kebijakan pemerintah terkait keamanan wilayah yang menyebabkan acara dibatalkan, panitia tidak berkewajiban mengembalikan biaya pendaftaran yang telah digunakan untuk produksi racepack dan operasional awal.\r
      </p>\r
    </div>\r
\r
    <div class="modal-footer" style="justify-content: flex-end;">\r
      <button class="btn btn-secondary btn-sm" id="termsOkBtn">Saya Mengerti</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- =========================================================================\r
     MODAL 4: SIZE CHART JERSEY\r
     ========================================================================= -->\r
<div class="modal-overlay" id="sizeChartModal">\r
  <div class="modal-container" style="max-width: 600px;">\r
    <div class="modal-header">\r
      <div class="modal-title-group">\r
        <h3><i class="fa-solid fa-ruler-combined" style="color: var(--color-primary); margin-right: 8px;"></i> Panduan Ukuran Jersey (Size Chart)</h3>\r
        <p>Standar Athletic Fit Dewasa (Toleransi Ukuran ±1-2 cm)</p>\r
      </div>\r
      <button class="modal-close-btn" id="sizeChartCloseBtn">\r
        <i class="fa-solid fa-xmark"></i>\r
      </button>\r
    </div>\r
\r
    <div class="modal-body">\r
      <table class="size-chart-table">\r
        <thead>\r
          <tr>\r
            <th>Ukuran</th>\r
            <th>Lebar Dada (cm)</th>\r
            <th>Panjang Baju (cm)</th>\r
            <th>Rekomendasi Berat (kg)</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          <tr>\r
            <td><strong>XS</strong></td>\r
            <td>46 cm</td>\r
            <td>66 cm</td>\r
            <td>45 - 52 kg</td>\r
          </tr>\r
          <tr>\r
            <td><strong>S</strong></td>\r
            <td>48 cm</td>\r
            <td>68 cm</td>\r
            <td>53 - 62 kg</td>\r
          </tr>\r
          <tr>\r
            <td><strong>M</strong> (Standar)</td>\r
            <td>50 cm</td>\r
            <td>70 cm</td>\r
            <td>63 - 72 kg</td>\r
          </tr>\r
          <tr>\r
            <td><strong>L</strong></td>\r
            <td>52 cm</td>\r
            <td>72 cm</td>\r
            <td>73 - 82 kg</td>\r
          </tr>\r
          <tr>\r
            <td><strong>XL</strong></td>\r
            <td>54 cm</td>\r
            <td>74 cm</td>\r
            <td>83 - 92 kg</td>\r
          </tr>\r
          <tr>\r
            <td><strong>XXL</strong></td>\r
            <td>56 cm</td>\r
            <td>76 cm</td>\r
            <td>93 - 105 kg</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
      <p class="form-hint" style="margin-top: 14px;">\r
        *Tips: Jika Anda menyukai jersey yang lebih leluasa saat berlari, kami menyarankan memilih 1 tingkat ukuran lebih besar.\r
      </p>\r
    </div>\r
\r
    <div class="modal-footer" style="justify-content: flex-end;">\r
      <button class="btn btn-secondary btn-sm" id="sizeChartOkBtn">Tutup</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- =========================================================================\r
     MODAL 5: DETAIL LENGKAP & RINCIAN TIKET\r
     ========================================================================= -->\r
<div class="modal-overlay" id="ticketDetailModal">\r
  <div class="modal-container" style="max-width: 760px;">\r
    <div class="modal-header">\r
      <div class="modal-title-group">\r
        <h3 id="tdModalTitle"><i class="fa-solid fa-circle-info" style="color: var(--color-primary); margin-right: 8px;"></i> Rincian Lengkap Tiket</h3>\r
        <p id="tdModalCategory">Kategori Lari & Fasilitas Resmi Tegal Run 2027</p>\r
      </div>\r
      <button class="modal-close-btn" id="ticketDetailCloseBtn">\r
        <i class="fa-solid fa-xmark"></i>\r
      </button>\r
    </div>\r
\r
    <div class="modal-body" id="ticketDetailBody">\r
      <div style="text-align: center; padding: 30px;">\r
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--color-primary);"></i>\r
        <p style="margin-top: 10px; color: var(--color-text-muted);">Memuat rincian tiket dari server...</p>\r
      </div>\r
    </div>\r
\r
    <div class="modal-footer" style="justify-content: space-between;">\r
      <button class="btn btn-secondary btn-sm" id="ticketDetailCloseBtn2">Tutup</button>\r
      <button class="btn btn-primary btn-sm btn-glow" id="tdModalRegisterBtn">\r
        <i class="fa-solid fa-ticket"></i> Daftar Kategori Ini Sekarang\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
\r
`,Z=document.getElementById("app");Z&&(Z.innerHTML=`
    <div class="ambient-glow ambient-1"></div>
    <div class="ambient-glow ambient-2"></div>
    <div class="toast-container" id="toastContainer"></div>
    ${we}
    ${Ee}
    ${Ie}
    ${Be}
    ${Pe}
    ${Ae}
    ${Ce}
    ${Le}
    ${Se}
    ${Te}
    ${Me}
  `);const r={events:[],selectedEvent:null,currentStep:1,participantCount:1,isGlobalClosed:!1,countdownTarget:null,countdownInterval:null,countdownSettingsLoaded:!1,cmsStatsItems:null,cmsVisibility:{},cmsRouteMapUrl:"",cmsRouteMapImage:"",feeSettings:{feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0,paymentTimerMinutes:30}};function ee(e){if(!e)return"";let t=String(e).trim().replace(/[\s\-()]/g,"");return t.startsWith("08")?"+628"+t.slice(2):t.startsWith("628")?"+"+t:t}function V(e){!e||e._phoneFormatted||(e._phoneFormatted=!0,e.addEventListener("input",t=>{let a=t.target.value;a.startsWith("08")?t.target.value="+628"+a.substring(2):a.startsWith("628")&&(t.target.value="+628"+a.substring(3))}))}function v(e="success",t="",a=""){const s=document.getElementById("toastContainer");if(!s)return;const i=document.createElement("div");i.className=`toast toast-${e}`;const o={success:"fa-solid fa-circle-check",error:"fa-solid fa-triangle-exclamation",warning:"fa-solid fa-circle-exclamation"};i.innerHTML=`
    <div class="toast-icon">
      <i class="${o[e]||o.success}"></i>
    </div>
    <div class="toast-content">
      <h5>${w(t)}</h5>
      <p>${w(a)}</p>
    </div>
  `,s.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateX(40px)",setTimeout(()=>i.remove(),300)},4500)}function w(e){return e?e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function C(e){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e)}function Q(e=null){e!==void 0&&(r.countdownTarget=e),r.countdownInterval&&(clearInterval(r.countdownInterval),r.countdownInterval=null);const t=document.getElementById("days"),a=document.getElementById("hours"),s=document.getElementById("minutes"),i=document.getElementById("seconds");if(!r.countdownTarget||!Number.isFinite(Number(r.countdownTarget))){t&&(t.textContent="--"),a&&(a.textContent="--"),s&&(s.textContent="--"),i&&(i.textContent="--");return}function o(){const n=new Date().getTime(),d=r.countdownTarget-n;if(d<=0){t&&(t.textContent="00"),a&&(a.textContent="00"),s&&(s.textContent="00"),i&&(i.textContent="00"),r.countdownInterval&&(clearInterval(r.countdownInterval),r.countdownInterval=null);return}const c=Math.floor(d/(1e3*60*60*24)),u=Math.floor(d%(1e3*60*60*24)/(1e3*60*60)),f=Math.floor(d%(1e3*60*60)/(1e3*60)),b=Math.floor(d%(1e3*60)/1e3),h=p=>String(p).padStart(2,"0");t&&(t.textContent=h(c)),a&&(a.textContent=h(u)),s&&(s.textContent=h(f)),i&&(i.textContent=h(b))}o(),r.countdownInterval=setInterval(o,1e3)}async function De(){const e=document.getElementById("eventDateDisplay");try{const t=await M.getCountdownSettings();if(r.countdownSettingsLoaded=!!t,t&&t.eventCountdownDate){const a=new Date(t.eventCountdownDate);if(isNaN(a.getTime()))e&&(e.textContent="TANGGAL BELUM DITENTUKAN",e.classList.add("badge-pending-date"));else{Q(a.getTime());const s=a.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),i=a.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});e&&(e.textContent=`${s.toUpperCase()} • ${i} WIB`,e.classList.remove("badge-pending-date"))}}else e&&(e.textContent="TANGGAL BELUM DITENTUKAN",e.classList.add("badge-pending-date"));if(t&&t.isRegistrationClosed){r.isGlobalClosed=!0;const a=document.getElementById("heroStatusBadge"),s=document.getElementById("heroStatusText");a&&(a.style.borderColor="#EF4444"),s&&(s.innerHTML='<span style="color:#EF4444; font-weight:800;">🚨 PENDAFTARAN RESMI TELAH RESMI DITUTUP PANITIA</span>');const i=document.getElementById("heroCtaBtn");i&&(i.disabled=!0,i.classList.remove("btn-glow"),i.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup');const o=document.getElementById("navDaftarBtn");o&&(o.disabled=!0,o.classList.remove("btn-glow"),o.innerHTML='<i class="fa-solid fa-lock"></i> Ditutup');const n=document.getElementById("dockDaftarBtn");n&&(n.style.opacity="0.6",n.style.pointerEvents="none")}}catch(t){console.warn("Gagal memuat pengaturan countdown dari backend:",t),e&&(e.textContent="TANGGAL BELUM DITENTUKAN",e.classList.add("badge-pending-date"))}}async function te(){const e=document.getElementById("pageSkeleton");try{const t=await M.getEvents();if(r.events=t,ne(t),re(r.cmsStatsItems),!r.countdownTarget&&!r.countdownSettingsLoaded&&Array.isArray(t)){const s=t.map(i=>new Date(i.eventDate).getTime()).filter(i=>Number.isFinite(i)&&i>Date.now()).sort((i,o)=>i-o);s.length>0&&Q(s[0])}try{const i=await(await ye("/settings/checkout-config")).json();i.status==="success"&&i.data&&(r.feeSettings=i.data)}catch{}const a=new URLSearchParams(window.location.search).get("register");if(a){const s=t.find(i=>i.id===a);s&&!s.isClosed&&!r.isGlobalClosed&&setTimeout(()=>H(s),400)}}catch(t){console.error("Failed to render events:",t)}finally{e&&setTimeout(()=>{e.classList.add("hide")},350)}}function ne(e){const t=document.getElementById("ticketsGrid");if(t){if(t.innerHTML="",!Array.isArray(e)||e.length===0){t.innerHTML=`
      <div style="text-align: center; grid-column: 1 / -1; padding: 60px 20px;">
        <i class="fa-solid fa-ticket-simple" style="font-size: 3rem; color: #94A3B8; margin-bottom: 16px;"></i>
        <h3 style="color: var(--color-text-title); font-size: 1.25rem; margin-bottom: 6px;">Tidak Ada Kategori Tiket</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Belum ada kategori lomba yang dibuka di database.</p>
      </div>
    `;return}e.forEach(a=>{const s=a.category==="10K",i=a.stock||0,o=typeof a.stock=="number"?a.stock:0,n=i>0?Math.max(0,Math.min(100,Math.round(o/i*100))):0,d=!!a.isClosed,c=document.createElement("div");c.className=`glass-card ticket-card ticket-pass-card ${s?"featured":""} ${d?"event-closed-card":""}`;const u=Array.isArray(a.benefits)&&a.benefits.length>0?a.benefits.map(p=>p.name):[],f=u.length>0?u.map(p=>`
          <li class="benefit-item">
            <div class="benefit-icon"><i class="fa-solid fa-check"></i></div>
            <span>${w(p)}</span>
          </li>
        `).join(""):'<li class="benefit-item" style="color: var(--color-text-muted); font-style: italic;">Belum ada benefit tercantum</li>',b=a.ticketImage||a.medalImage,h=`
      <div class="ticket-card-banner${b?"":" ticket-card-banner-empty"}">
        ${b?`<img src="${w(b)}" alt="${w(a.ticketName)}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('ticket-card-banner-empty')">`:'<i class="fa-solid fa-person-running" aria-hidden="true"></i>'}
        <div class="ticket-card-banner-overlay">
          <span class="ticket-banner-badge"><i class="fa-solid fa-person-running"></i> ${w(a.category)} Marathon</span>
          ${a.medalImage?'<span class="ticket-banner-medal-badge"><i class="fa-solid fa-medal"></i> Medali Finisher</span>':""}
        </div>
      </div>
    `;c.innerHTML=`
      <!-- E-Tiket Stub Header -->
      <div class="ticket-stub-header">
        <div class="ticket-stub-brand">
          <i class="fa-solid fa-bolt" style="color: var(--color-primary);"></i> TEGAL RUN 2027
        </div>
        <div class="ticket-stub-tag">
          ${d?'<span style="color:#ef4444;"><i class="fa-solid fa-lock"></i> CLOSED</span>':s?'<span style="color:#ff6b00;"><i class="fa-solid fa-fire"></i> POPULAR</span>':"<span>OFFICIAL PASS</span>"}
        </div>
      </div>

      ${h}

      <div class="ticket-header">
        <span class="ticket-category-tag">${w(a.category)} MARATHON PASS</span>
        <h3 class="ticket-title">${w(a.ticketName)}</h3>
        <div class="ticket-price">
          <span class="price-currency">Rp</span>
          <span class="price-amount">${Number(a.price).toLocaleString("id-ID")}</span>
          <span class="price-unit">/ tiket</span>
        </div>
      </div>

      <!-- Perforated Notch Divider -->
      <div class="ticket-perforated-divider">
        <span class="notch notch-left"></span>
        <div class="perforation-line"></div>
        <span class="notch notch-right"></span>
      </div>

      <div class="stock-wrapper">
        <div class="stock-info">
          <span>Status Kuota</span>
          <span class="stock-status" style="color: ${d?"#EF4444":"#10B981"};">
            <i class="${d?"fa-solid fa-lock":"fa-solid fa-fire"}"></i> 
            ${d?"Pendaftaran Ditutup":`${o} Tiket Tersedia`}
          </span>
        </div>
        <div class="stock-bar-bg">
          <div class="stock-bar-fill" style="width: ${d?100:n}%; background: ${d?"#EF4444":""};"></div>
        </div>
      </div>

      <ul class="ticket-benefits">
        ${f}
      </ul>

      <!-- Aesthetic Barcode Strip for Authentic Athletic Pass -->
      <div class="ticket-barcode-strip">
        <div class="ticket-barcode-lines"></div>
        <div class="ticket-barcode-serial">RACE PASS • VERIFIED PASI TIMING</div>
      </div>

      <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 14px;">
        <button class="btn btn-secondary btn-sm btn-view-ticket-detail" data-id="${a.id}" style="flex: 1;" title="Lihat Fasilitas & Rincian Lengkap">
          <i class="fa-solid fa-circle-info"></i> Detail Tiket
        </button>
        <button class="btn ${d?"btn-secondary":"btn-primary btn-glow"} btn-sm btn-select-ticket" data-id="${a.id}" ${d?"disabled":""} style="flex: 1.3;">
          <i class="${d?"fa-solid fa-lock":"fa-solid fa-ticket"}"></i> 
          ${d?"Ditutup":"Daftar Sekarang"}
        </button>
      </div>
    `,t.appendChild(c)}),document.querySelectorAll(".ticket-card").forEach(a=>{a.style.cursor="pointer",a.addEventListener("click",s=>{if(s.target.closest(".btn-select-ticket"))return;const i=a.querySelector(".btn-view-ticket-detail");if(i){const o=i.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${o}`}})}),document.querySelectorAll(".btn-view-ticket-detail").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();const i=a.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${i}`})}),document.querySelectorAll(".btn-select-ticket").forEach(a=>{a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const i=a.getAttribute("data-id"),o=r.events.find(n=>n.id===i);o&&!o.isClosed&&H(o)})})}}function H(e=null){if(r.isGlobalClosed){v("error","Pendaftaran Ditutup","Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.");return}const t=r.events.filter(i=>!i.isClosed);if(t.length===0){v("error","Pendaftaran Ditutup","Seluruh pendaftaran kategori event telah resmi ditutup oleh panitia.");return}r.selectedEvent=e&&!e.isClosed?e:t[0],r.currentStep=1,r.participantCount=1;const a=document.getElementById("regModal");if(!a)return;const s=document.getElementById("modalEventSelect");s&&(s.innerHTML=t.map(i=>`
      <option value="${i.id}" ${r.selectedEvent&&r.selectedEvent.id===i.id?"selected":""}>
        ${i.ticketName} - ${C(i.price)}
      </option>
    `).join("")),X(),Y(),j(),a.classList.add("active"),document.body.style.overflow="hidden",M.getCheckoutConfig().then(i=>{i&&(r.feeSettings=i,j())}).catch(()=>{})}function G(){const e=document.getElementById("regModal");e&&(e.classList.remove("active"),document.body.style.overflow="auto")}function X(){[1,2,3].forEach(i=>{const o=document.getElementById(`stepIndicator${i}`),n=document.getElementById(`stepSection${i}`);o&&(o.classList.remove("active","done"),i===r.currentStep&&o.classList.add("active"),i<r.currentStep&&o.classList.add("done")),n&&(n.style.display=i===r.currentStep?"block":"none")});const t=document.getElementById("btnModalPrev"),a=document.getElementById("btnModalNext"),s=document.getElementById("btnModalSubmit");t&&(t.style.display=r.currentStep>1?"inline-flex":"none"),a&&(a.style.display=r.currentStep<3?"inline-flex":"none"),s&&(s.style.display=r.currentStep===3?"inline-flex":"none")}function ie(){var i,o;const e=new Map(r.events.map(n=>[n.id,n]));let t=0;for(let n=0;n<r.participantCount;n++){const d=document.querySelector(`.p-event-select[data-index="${n}"]`),c=d?d.value:(i=r.selectedEvent)==null?void 0:i.id,u=e.get(c)||r.selectedEvent;u&&(t+=Number(u.price))}let a=0;(o=r.feeSettings)!=null&&o.feeEnabled&&r.feeSettings.feeAmount>0&&(r.feeSettings.feeType==="PER_TICKET"?a=r.feeSettings.feeAmount*r.participantCount:a=r.feeSettings.feeAmount);const s=t+a;return{ticketsSubtotal:t,serviceFee:a,grandTotal:s}}function j(){var c;if(!r.selectedEvent)return;const{ticketsSubtotal:e,serviceFee:t,grandTotal:a}=ie(),s=document.getElementById("modalTotalAmount");s&&(s.textContent=C(a));const i=document.getElementById("step1TicketsSubtotal"),o=document.getElementById("step1FeeLabel"),n=document.getElementById("step1FeeAmount"),d=document.getElementById("step1GrandTotal");if(i&&(i.textContent=C(e)),n)if(t>0){if(n.textContent=`+ ${C(t)}`,n.style.color="#EA580C",o){const u=((c=r.feeSettings)==null?void 0:c.feeType)||"PER_TRANSACTION";o.textContent=`Biaya Layanan (${u==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`}}else n.textContent="Gratis (Rp 0)",n.style.color="#10B981",o&&(o.textContent="Biaya Layanan:");d&&(d.textContent=C(a))}function z(){var n,d,c;if(!((n=document.getElementById("checkSameAsBooker"))==null?void 0:n.checked))return;const t=((d=document.getElementById("bookerName"))==null?void 0:d.value.trim())||"",a=((c=document.getElementById("bookerPhone"))==null?void 0:c.value.trim())||"",s=document.querySelector('.p-fullname[data-index="0"]'),i=document.querySelector('.p-phone[data-index="0"]'),o=document.querySelector('.p-bibname[data-index="0"]');s&&t&&(s.value=t),o&&t&&!o.value&&(o.value=t.substring(0,15).toUpperCase()),i&&a&&(i.value=a)}function Y(){var s,i,o;const e=document.getElementById("participantsContainer");if(!e)return;e.innerHTML="";const t=r.events.filter(n=>!n.isClosed),a=((s=r.selectedEvent)==null?void 0:s.id)||(((i=t[0])==null?void 0:i.id)??"");for(let n=0;n<r.participantCount;n++){const d=document.createElement("div");d.className="participant-box",d.innerHTML=`
      <div class="participant-box-header">
        <h4><i class="fa-solid fa-user-tag"></i> Data Peserta #${n+1}</h4>
        ${r.participantCount>1?`<span class="badge">Peserta ${n+1}</span>`:""}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Kategori Lari / Tiket <span class="req">*</span></label>
          <select class="form-select p-event-select" required data-index="${n}">
            ${t.map(f=>`
              <option value="${f.id}" ${f.id===a?"selected":""}>
                ${w(f.ticketName)} - ${C(f.price)}
              </option>
            `).join("")}
          </select>
          <div class="form-hint">Dapat memilih kategori lari berbeda untuk peserta ini.</div>
        </div>

        <div class="form-group">
          <label class="form-label">Nomor WhatsApp Peserta (Aktif) <span class="req">*</span></label>
          <input type="tel" class="form-input p-phone" required placeholder="Contoh: 081234567890" data-index="${n}">
          <div class="form-hint">Wajib nomor aktif untuk pengiriman QR E-Tiket pelari.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Lengkap (Sesuai KTP) <span class="req">*</span></label>
          <input type="text" class="form-input p-fullname" required placeholder="Contoh: Budi Santoso" data-index="${n}">
        </div>
        <div class="form-group">
          <label class="form-label">Nama BIB (Maks. 15 Karakter) <span class="req">*</span></label>
          <input type="text" maxlength="15" class="form-input p-bibname" required placeholder="Contoh: BUDI S" data-index="${n}">
          <div class="form-hint">Akan dicetak pada nomor dada Anda.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">NIK (16 Digit Angka) <span class="req">*</span></label>
          <input type="text" maxlength="16" class="form-input p-nik" required placeholder="3328xxxxxxxxxxxx" data-index="${n}">
          <div class="form-hint">Validasi KTP format resmi Disdukcapil (UU PDP).</div>
        </div>
        <div class="form-group">
          <label class="form-label">Jenis Kelamin <span class="req">*</span></label>
          <select class="form-select p-gender" required data-index="${n}">
            <option value="MALE">Laki-Laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Tempat Lahir <span class="req">*</span></label>
          <input type="text" class="form-input p-birthplace" required placeholder="Contoh: Tegal" data-index="${n}">
        </div>
        <div class="form-group">
          <label class="form-label">Tanggal Lahir <span class="req">*</span></label>
          <input type="date" class="form-input p-birthdate" required data-index="${n}">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Alamat Lengkap (Domisili KTP) <span class="req">*</span></label>
        <textarea rows="2" class="form-textarea p-address" required placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" data-index="${n}"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Golongan Darah (Untuk Medis) <span class="req">*</span></label>
          <select class="form-select p-blood" required data-index="${n}">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O" selected>O</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Ukuran Jersey Resmi</label>
          <select class="form-select p-size" data-index="${n}">
            <option value="XS">XS (46 x 66 cm)</option>
            <option value="S">S (48 x 68 cm)</option>
            <option value="M" selected>M (50 x 70 cm)</option>
            <option value="L">L (52 x 72 cm)</option>
            <option value="XL">XL (54 x 74 cm)</option>
            <option value="XXL">XXL (56 x 76 cm)</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Kontak Darurat <span class="req">*</span></label>
          <input type="text" class="form-input p-emg-name" required placeholder="Nama Keluarga / Kerabat" data-index="${n}">
        </div>
        <div class="form-group">
          <label class="form-label">No. HP Kontak Darurat (Format +628) <span class="req">*</span></label>
          <input type="text" class="form-input p-emg-phone" required placeholder="+628123456789" data-index="${n}">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Komunitas Lari (Opsional)</label>
          <input type="text" class="form-input p-community" placeholder="Contoh: Tegal Runners Club" data-index="${n}">
        </div>
        <div class="form-group">
          <label class="form-label">Riwayat Penyakit / Alergi (Opsional)</label>
          <input type="text" class="form-input p-medical" placeholder="Asma, Alergi, dsb (Jika ada)" data-index="${n}">
        </div>
      </div>
    `,e.appendChild(d);const c=d.querySelector(".p-phone"),u=d.querySelector(".p-emg-phone");V(c),V(u),(o=d.querySelector(".p-event-select"))==null||o.addEventListener("change",()=>{j()})}z()}function Fe(e){var t,a,s,i,o,n,d,c,u,f,b,h;if(e===1){const p=(t=document.getElementById("bookerName"))==null?void 0:t.value.trim(),k=(a=document.getElementById("bookerEmail"))==null?void 0:a.value.trim(),E=(s=document.getElementById("bookerPhone"))==null?void 0:s.value.trim();return!p||p.length<3?(v("error","Validasi Gagal","Nama pemesan minimal 3 karakter."),!1):!k||!k.includes("@")?(v("error","Validasi Gagal","Email pemesan tidak valid."),!1):!E||!/^(\+62|62|08)\d{8,13}$/.test(E.replace(/\s+/g,""))?(v("error","Validasi Gagal","Nomor WhatsApp tidak valid (gunakan awalan 08 atau +628, min 10 digit)."),!1):(z(),!0)}if(e===2){for(let p=0;p<r.participantCount;p++){const k=(i=document.querySelector(`.p-fullname[data-index="${p}"]`))==null?void 0:i.value.trim(),E=(o=document.querySelector(`.p-phone[data-index="${p}"]`))==null?void 0:o.value.trim(),y=(n=document.querySelector(`.p-bibname[data-index="${p}"]`))==null?void 0:n.value.trim(),B=(d=document.querySelector(`.p-nik[data-index="${p}"]`))==null?void 0:d.value.trim(),P=(c=document.querySelector(`.p-birthplace[data-index="${p}"]`))==null?void 0:c.value.trim(),l=(u=document.querySelector(`.p-birthdate[data-index="${p}"]`))==null?void 0:u.value.trim(),m=(f=document.querySelector(`.p-address[data-index="${p}"]`))==null?void 0:f.value.trim(),g=(b=document.querySelector(`.p-emg-name[data-index="${p}"]`))==null?void 0:b.value.trim(),A=(h=document.querySelector(`.p-emg-phone[data-index="${p}"]`))==null?void 0:h.value.trim();if(!k||k.length<3)return v("error",`Peserta #${p+1}`,"Nama lengkap KTP minimal 3 karakter."),!1;if(!E||!/^(\+62|62|08)\d{7,12}$/.test(E.replace(/\s+/g,"")))return v("error",`Peserta #${p+1}`,"Nomor WhatsApp peserta wajib diisi (contoh: 08123456789 atau +628123456789)."),!1;if(!y||y.length>15)return v("error",`Peserta #${p+1}`,"Nama BIB maksimal 15 karakter."),!1;if(!B||!/^\d{16}$/.test(B))return v("error",`Peserta #${p+1}`,"NIK harus tepat 16 digit angka sesuai KTP."),!1;if(!P||P.length<3)return v("error",`Peserta #${p+1}`,"Tempat lahir wajib diisi."),!1;if(!l)return v("error",`Peserta #${p+1}`,"Tanggal lahir wajib diisi."),!1;if(!m||m.length<10)return v("error",`Peserta #${p+1}`,"Alamat lengkap wajib diisi minimal 10 karakter."),!1;if(!g||g.length<3)return v("error",`Peserta #${p+1}`,"Nama kontak darurat wajib diisi."),!1;if(!A||!/^(\+62|62|08)\d{7,12}$/.test(A.replace(/\s+/g,"")))return v("error",`Peserta #${p+1}`,"Nomor kontak darurat harus diawali 08 atau +628."),!1}return!0}return!0}function qe(){var u,f,b,h,p,k,E;const e=document.getElementById("summaryReviewBox");if(!e||!r.selectedEvent)return;const t=(u=document.getElementById("bookerName"))==null?void 0:u.value.trim(),a=(f=document.getElementById("bookerEmail"))==null?void 0:f.value.trim(),s=(b=document.getElementById("bookerPhone"))==null?void 0:b.value.trim(),{ticketsSubtotal:i,serviceFee:o,grandTotal:n}=ie(),d=new Map(r.events.map(y=>[y.id,y]));let c="";for(let y=0;y<r.participantCount;y++){const B=((h=document.querySelector(`.p-fullname[data-index="${y}"]`))==null?void 0:h.value.trim())||`Peserta #${y+1}`,P=((p=document.querySelector(`.p-event-select[data-index="${y}"]`))==null?void 0:p.value)||r.selectedEvent.id,l=d.get(P)||r.selectedEvent,m=((k=document.querySelector(`.p-phone[data-index="${y}"]`))==null?void 0:k.value.trim())||"-";c+=`
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 6px 0; border-bottom: 1px dotted #CBD5E1;">
        <div>
          <strong>#${y+1} ${w(B)}</strong> (${w(m)})<br>
          <span style="color: #64748B; font-size: 0.78rem;">Kategori: ${w(l.ticketName)}</span>
        </div>
        <span style="font-weight: 700; color: #0F172A;">${C(l.price)}</span>
      </div>
    `}e.innerHTML=`
    <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 18px;">
      <h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-receipt"></i> Ringkasan Tiket & Pemesan</h4>
      <p style="font-size: 0.88rem; margin-bottom: 4px;"><strong>Penanggung Jawab:</strong> ${w(t)}</p>
      <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 12px;">${w(a)} | ${w(s)}</p>

      <div style="margin-bottom: 14px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: #475569; text-transform: uppercase;">Rincian Peserta:</span>
        <div style="margin-top: 6px;">
          ${c}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 8px;">
        <span style="color: #64748B;">Subtotal Tiket:</span>
        <strong>${C(i)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 4px; ${o>0?"color: #EA580C;":"color: #10B981;"}">
        <span>Biaya Layanan (${((E=r.feeSettings)==null?void 0:E.feeType)==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):</span>
        <strong>${o>0?`+ ${C(o)}`:"Gratis (Rp 0)"}</strong>
      </div>
      <div style="border-top: 1px solid var(--color-border-subtle); margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: var(--color-text-title);">
        <span>Total Pembayaran:</span>
        <span style="color: var(--color-primary);">${C(n)}</span>
      </div>
    </div>
  `}async function Ne(){var k,E,y,B,P,l,m,g,A,F,q,N,$,R,K,_,U,S,I,T,L;if((k=r.selectedEvent)!=null&&k.isClosed){v("error","Pendaftaran Ditutup","Pendaftaran untuk kategori ini telah resmi ditutup.");return}const e=(E=document.getElementById("checkConsentPDP"))==null?void 0:E.checked,t=(y=document.getElementById("checkConsentWaiver"))==null?void 0:y.checked;if(!e){v("warning","Persetujuan Diperlukan","Harap setujui Pemrosesan Data Pribadi sesuai UU PDP No. 27/2022.");return}if(!t){v("warning","Persetujuan Diperlukan","Harap setujui Pelepasan Tanggung Jawab Medis (Liability Waiver).");return}const a=document.getElementById("btnModalSubmit");a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses Pesanan...');const s=[];for(let x=0;x<r.participantCount;x++){const O=((B=document.querySelector(`.p-event-select[data-index="${x}"]`))==null?void 0:B.value)||r.selectedEvent.id,J=(P=document.querySelector(`.p-fullname[data-index="${x}"]`))==null?void 0:P.value.trim(),oe=ee((l=document.querySelector(`.p-phone[data-index="${x}"]`))==null?void 0:l.value.trim()),le=(m=document.querySelector(`.p-bibname[data-index="${x}"]`))==null?void 0:m.value.trim().toUpperCase(),de=(g=document.querySelector(`.p-nik[data-index="${x}"]`))==null?void 0:g.value.trim(),ce=(A=document.querySelector(`.p-gender[data-index="${x}"]`))==null?void 0:A.value,pe=(F=document.querySelector(`.p-birthplace[data-index="${x}"]`))==null?void 0:F.value.trim(),me=(q=document.querySelector(`.p-birthdate[data-index="${x}"]`))==null?void 0:q.value.trim(),ue=(N=document.querySelector(`.p-address[data-index="${x}"]`))==null?void 0:N.value.trim(),ge=($=document.querySelector(`.p-blood[data-index="${x}"]`))==null?void 0:$.value,fe=(R=document.querySelector(`.p-size[data-index="${x}"]`))==null?void 0:R.value,ve=(K=document.querySelector(`.p-emg-name[data-index="${x}"]`))==null?void 0:K.value.trim(),be=ee((_=document.querySelector(`.p-emg-phone[data-index="${x}"]`))==null?void 0:_.value.trim()),he=((U=document.querySelector(`.p-community[data-index="${x}"]`))==null?void 0:U.value.trim())||null,ke=((S=document.querySelector(`.p-medical[data-index="${x}"]`))==null?void 0:S.value.trim())||null;s.push({eventId:O,fullNameKtp:J,phoneNumber:oe,bibName:le,nik:de,gender:ce,birthPlace:pe,birthDate:me,fullAddress:ue,bloodType:ge,selectedSize:fe,emergencyContactName:ve,emergencyContactPhone:be,communityName:he,medicalHistory:ke})}const i=((I=document.getElementById("bookerName"))==null?void 0:I.value.trim())||"",o=((T=document.getElementById("bookerEmail"))==null?void 0:T.value.trim())||"",n=((L=document.getElementById("bookerPhone"))==null?void 0:L.value.trim())||"";if(!o||!n){v("warning","Data Pemesan Kurang","Harap lengkapi Nama, Email aktif, dan Nomor WhatsApp penanggung jawab.");return}const d={bookerName:i,bookerEmail:o,bookerPhone:n,eventId:r.selectedEvent.id,participants:s};v("warning","Menghubungkan Server","Mengamankan slot tiket Anda ke sistem database...");const c=await M.registerOrder(d);if(a&&(a.disabled=!1,a.innerHTML='<i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)'),!c.success){v("error","Gagal Memesan Tiket",c.message);return}v("success","Slot Tiket Diamankan!","Membuka gerbang pembayaran resmi Midtrans Snap...");const{paymentToken:u,paymentUrl:f,orderId:b,midtransOrderId:h}=c.data,p=b||h;try{await xe()}catch(x){v("error","Gateway Pembayaran Tidak Tersedia",x.message),window.location.href=`/payment.html?orderId=${encodeURIComponent(p)}`;return}window.snap&&typeof window.snap.pay=="function"?window.snap.pay(u,{onSuccess:function(){v("success","Pembayaran Berhasil!","Selamat! Membuka E-Tiket resmi Anda..."),G(),te(),setTimeout(()=>{window.location.href=`/e-ticket.html?orderId=${p}`},1200)},onPending:function(){v("warning","Menunggu Pembayaran","Mengarahkan ke halaman rincian instruksi pembayaran..."),G(),setTimeout(()=>{window.location.href=`/payment.html?orderId=${p}`},1200)},onError:function(){v("error","Pembayaran Gagal","Transaksi dibatalkan atau kedaluwarsa.")},onClose:function(){v("warning","Transaksi Tertunda","Mengarahkan ke halaman instruksi pembayaran & pembatalan..."),setTimeout(()=>{window.location.href=`/payment.html?orderId=${p}`},1e3)}}):f&&window.open(f,"_blank")}function W(e){const t=document.getElementById(e);t&&(t.classList.add("active"),document.body.style.overflow="hidden")}function D(e){const t=document.getElementById(e);t&&(t.classList.remove("active"),document.body.style.overflow="auto")}function re(e){const t=document.getElementById("statsBanner");if(!t||!Array.isArray(e))return;e=e.filter(o=>o&&typeof o=="object"&&o.visible!==!1),t.replaceChildren(),t.hidden=e.length===0||r.cmsVisibility.stats===!1;const a=Array.isArray(r.events)?r.events:[],s=a.reduce((o,n)=>(o.participants+=Number(n.registeredCount||0),o.capacity+=Number(n.stock||0),o.available+=Number(n.remainingStock??Math.max(0,Number(n.stock||0)-Number(n.registeredCount||0))),o),{participants:0,capacity:0,available:0}),i={TOTAL_PARTICIPANTS:s.participants,TOTAL_CATEGORIES:a.length,TOTAL_CAPACITY:s.capacity,AVAILABLE_SLOTS:s.available};e.forEach((o,n)=>{const d=o.type==="AUTO"&&Object.hasOwn(i,o.autoKey),c=d?i[o.autoKey]:o.val,u=d?Number(c||0).toLocaleString("id-ID"):c,f=document.createElement("div");f.className="stat-item";const b=document.createElement("div");b.className="stat-num",n<4&&(b.id=`statVal${n+1}`);const h=document.createElement("span");h.textContent=u==null?"":String(u);const p=document.createElement("small");p.textContent=o.unit||"",n<4&&(p.id=`statUnit${n+1}`),b.append(h,document.createTextNode(" "),p);const k=document.createElement("div");k.className="stat-desc",k.textContent=o.desc||"",n<4&&(k.id=`statDesc${n+1}`),f.append(b,k),t.append(f)})}function se(e,t){const a=document.querySelector("#rute .route-visual-card");if(!a)return;const s=String(e||"").trim();let i="";if(s){const n=s.match(/src=["']([^"']+)["']/i),d=(n==null?void 0:n[1])||s;try{const c=new URL(d),u=c.hostname.toLowerCase(),f=u==="google.com"||u.endsWith(".google.com")||u==="maps.app.goo.gl"||u==="goo.gl";c.protocol==="https:"&&f&&(i=u.endsWith("google.com")&&c.pathname.startsWith("/maps/embed")?c.href:`https://www.google.com/maps?q=${encodeURIComponent(d)}&output=embed`)}catch(c){console.warn("Link Google Maps CMS tidak valid:",c)}}a.replaceChildren();const o=document.createElement("div");if(o.className="route-badge-float",o.innerHTML='<i class="fa-solid fa-location-dot"></i> Rute & Lokasi Google Maps',a.append(o),i){const n=document.createElement("div");n.className="gmaps-responsive-wrapper";const d=document.createElement("iframe");d.src=i,d.title="Peta rute lari",d.allowFullscreen=!0,d.loading="lazy",d.referrerPolicy="no-referrer-when-downgrade",n.append(d),a.append(n)}else if(t){const n=document.createElement("img");n.className="route-map-image",n.src=t,n.alt="Gambar peta rute lari",n.loading="lazy",a.append(n)}else{const n=document.createElement("p");n.className="route-map-empty",n.textContent="Peta rute belum tersedia.",a.append(n)}}async function $e(){try{const e=await M.getWebsiteSettings();if(!e)return;let t={};try{t=e.cms_visibility?JSON.parse(e.cms_visibility):{}}catch(l){console.warn("Pengaturan visibilitas CMS tidak valid:",l)}r.cmsVisibility=t,[["beranda","hero"],["rute","route"],["fasilitas","facilities"],["kategori","tickets"],["legal","legal"]].forEach(([l,m])=>{const g=document.getElementById(l);g&&t[m]===!1&&(g.hidden=!0)});const s=document.getElementById("statsBanner");s&&t.stats===!1&&(s.hidden=!0),document.querySelectorAll(".glass-footer").forEach(l=>{t.footer===!1&&(l.hidden=!0)}),e.site_title&&(document.title=e.site_title);const i=document.getElementById("heroStatusText")||document.querySelector(".hero-pill-badge span:not(.status-dot)");i&&e.hero_badge&&(i.textContent=e.hero_badge);const o=document.querySelector(".hero-title");o&&e.hero_title&&(o.innerHTML=e.hero_title.replace(/\n/g,"<br>"));const n=document.querySelector(".hero-desc");n&&e.hero_subtitle&&(n.textContent=e.hero_subtitle);const d=document.getElementById("heroDisplayImg");d&&e.hero_bg_image&&(d.src=e.hero_bg_image);let c;try{c=e.stats_banner_items?JSON.parse(e.stats_banner_items):null,Array.isArray(c)||(c=null)}catch(l){console.warn("Data kartu statistik CMS tidak valid:",l),c=null}c||(c=[1,2,3,4].map(l=>({type:"CUSTOM",val:e[`stat_${l}_val`]||"",unit:e[`stat_${l}_unit`]||"",desc:e[`stat_${l}_desc`]||""})).filter(l=>l.val||l.unit||l.desc)),r.cmsStatsItems=c,re(c);const u=document.getElementById("beranda");u&&e.hero_bg_image&&(u.style.backgroundImage=`radial-gradient(circle at 10% 20%, rgba(255, 107, 0, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 107, 0, 0.05) 0%, transparent 40%), linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.98) 100%), url('${e.hero_bg_image}')`,u.style.backgroundSize="cover",u.style.backgroundPosition="center");const f=document.getElementById("rute");if(f){const l=document.getElementById("routeSectionTitle")||f.querySelector(".section-title");l&&typeof e.route_title=="string"&&(l.textContent=e.route_title,l.hidden=!e.route_title.trim());const m=document.getElementById("routeSectionDesc")||f.querySelector(".route-info-card > p");m&&typeof e.route_desc=="string"&&(m.textContent=e.route_desc,m.hidden=!e.route_desc.trim());const g=document.getElementById("btnDownloadGpx");g&&(g.hidden=!e.route_gpx_url||e.route_gpx_url==="#"),g&&e.route_gpx_url&&(g.href=e.route_gpx_url,e.route_gpx_url==="#"?g.onclick=A=>{A.preventDefault(),alert("File GPX Rute Tegal Run 2027 akan dapat diunduh pada H-14 perlombaan.")}:/^https?:\/\//i.test(e.route_gpx_url)?(g.setAttribute("target","_blank"),g.setAttribute("rel","noopener noreferrer"),g.onclick=null):(g.removeAttribute("target"),g.removeAttribute("rel"),g.onclick=null)),r.cmsRouteMapUrl=Object.hasOwn(e,"route_gmaps_url")?e.route_gmaps_url:e.gmaps_embed_url||"",r.cmsRouteMapImage=e.route_map_image||"",se(r.cmsRouteMapUrl,r.cmsRouteMapImage)}const b=document.getElementById("fasilitas");if(b){const l=b.querySelector(".section-title");l&&typeof e.facilities_title=="string"&&(l.textContent=e.facilities_title,l.hidden=!e.facilities_title.trim());const m=b.querySelector(".section-desc");m&&typeof e.facilities_desc=="string"&&(m.textContent=e.facilities_desc,m.hidden=!e.facilities_desc.trim())}const h=document.getElementById("facilitiesMedia");h&&(h.hidden=!e.facilities_image,e.facilities_image&&(h.src=e.facilities_image));const p=document.getElementById("facilitiesContainer");if(p){const l=[{icon:"fa-shirt",title:"Jersey Running Dry-Fit",desc:"Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh."},{icon:"fa-microchip",title:"Nomor Dada (BIB) & Timing Chip",desc:"Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online."},{icon:"fa-medal",title:"Medali Finisher Logam Cor",desc:"Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT."},{icon:"fa-bottle-water",title:"Water & Isotonic Station",desc:"Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar."},{icon:"fa-truck-medical",title:"Tim Medis & Ambulans Mobile",desc:"Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute."},{icon:"fa-utensils",title:"Refreshment & Finisher Feast",desc:"Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar."}];let m;try{m=e.facilities_items?JSON.parse(e.facilities_items):l}catch(g){console.warn("Data fasilitas CMS tidak valid:",g),m=l}Array.isArray(m)||(m=l),p.innerHTML=m.filter(g=>g&&typeof g=="object"&&g.visible!==!1).map(g=>`
        <div class="facility-card">
          <div class="facility-card-head">
            <div class="facility-icon-wrap">
              <i class="fa-solid ${w(g.icon||"fa-gift")}"></i>
            </div>
            <h4 class="facility-title">${w(g.title||"")}</h4>
          </div>
          <p class="facility-desc">${w(g.desc||"")}</p>
        </div>
      `).join("")}const k=document.getElementById("kategori");if(k){const l=k.querySelector(".section-title");l&&typeof e.tickets_title=="string"&&(l.textContent=e.tickets_title,l.hidden=!e.tickets_title.trim());const m=k.querySelector(".section-desc");m&&typeof e.tickets_desc=="string"&&(m.textContent=e.tickets_desc,m.hidden=!e.tickets_desc.trim())}const E=document.getElementById("ticketsCmsMedia");E&&(E.hidden=!e.medal_image,e.medal_image&&(E.src=e.medal_image));const y=document.getElementById("legalSectionTitle");y&&typeof e.legal_title=="string"&&(y.textContent=e.legal_title,y.hidden=!e.legal_title.trim());const B=document.getElementById("legalSectionDesc");B&&typeof e.legal_desc=="string"&&(B.textContent=e.legal_desc,B.hidden=!e.legal_desc.trim());const P=document.getElementById("legalGridContainer");if(P){let l;try{l=e.legal_items?JSON.parse(e.legal_items):null,Array.isArray(l)||(l=null)}catch(m){console.warn("Data legalitas CMS tidak valid:",m),l=null}l||(l=[1,2,3,4].map((m,g)=>({icon:["fa-certificate","fa-road-barrier","fa-shield-heart","fa-user-lock"][g],title:e[`legal_item_${m}_title`]||"",desc:e[`legal_item_${m}_desc`]||""})).filter(m=>m.title||m.desc)),l=l.filter(m=>m&&typeof m=="object"&&m.visible!==!1),P.innerHTML=l.map(m=>`
        <div class="legal-item">
          <i class="fa-solid ${w(m.icon||"fa-certificate")}"></i>
          <h4>${w(m.title||"")}</h4>
          <p>${w(m.desc||"")}</p>
        </div>
      `).join(""),P.hidden=l.length===0}if(e.contact_email&&document.querySelectorAll(".footer-email").forEach(l=>l.textContent=e.contact_email),e.contact_phone&&document.querySelectorAll(".footer-phone").forEach(l=>l.textContent=e.contact_phone),e.contact_address){const l=document.querySelector(".footer-address");l&&(l.textContent=e.contact_address)}if(e.footer_copyright){const l=document.querySelector(".footer-copyright-text")||document.querySelector(".footer-bottom > div:first-child");l&&(l.textContent=e.footer_copyright)}}catch(e){console.warn("Failed to apply website settings:",e)}}async function Re(){const e=document.getElementById("routeChecklistContainer");try{const t=await M.getRouteOverview();if(!t){e&&(e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>');return}r.cmsRouteMapUrl||(r.cmsRouteMapUrl=t.gmapsUrl||""),r.cmsRouteMapImage||(r.cmsRouteMapImage=t.routeMapImage||""),se(r.cmsRouteMapUrl,r.cmsRouteMapImage),e&&(Array.isArray(t.points)&&t.points.length>0?e.innerHTML=t.points.map((a,s)=>`
          <div class="route-point">
            <div class="route-point-marker">${String(s+1).padStart(2,"0")}</div>
            <div class="route-point-content">
              <h4>${w(a.name)}${a.distanceKm>0?` <small style="font-weight:500;color:#64748B;">— Km ${a.distanceKm}</small>`:""}</h4>
              <p>${w(a.description||"")}</p>
              ${a.isWaterStation?'<span class="route-tag" style="display:inline-block;margin-top:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#EFF6FF;color:#3B82F6;font-weight:600;">💧 Water Station</span>':""}
              ${a.isMedicalSpot?'<span class="route-tag" style="display:inline-block;margin-top:4px;margin-left:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#F0FDF4;color:#16A34A;font-weight:600;">🏥 Pos Medis</span>':""}
            </div>
          </div>
        `).join(""):e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>')}catch{e&&(e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>')}}function Ke(){document.querySelectorAll(".nav-dropdown-toggle").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const a=e.closest(".nav-dropdown"),s=a.classList.contains("active");document.querySelectorAll(".nav-dropdown").forEach(i=>i.classList.remove("active")),s||a.classList.add("active")})}),document.addEventListener("click",()=>{document.querySelectorAll(".nav-dropdown").forEach(e=>e.classList.remove("active"))})}function ae(){var o,n,d,c,u,f,b,h,p,k,E,y,B,P,l,m,g,A,F,q,N,$,R,K,_,U;Q(),De(),$e(),Re(),te(),Ke();const e=async S=>{if(S&&S.preventDefault(),r.isGlobalClosed){v("error","Pendaftaran Ditutup","Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.");return}if(r.events.length>0){const I=r.events.find(T=>!T.isClosed)||r.events[0];H(I)}else{const I=document.getElementById("kategori")||document.getElementById("ticketsSection");I&&I.scrollIntoView({behavior:"smooth"});try{const T=await M.getEvents();if(T&&T.length>0){r.events=T,ne(T);const L=T.find(x=>!x.isClosed)||T[0];H(L)}}catch{v("error","Gagal Memuat Kategori","Gagal memuat kategori tiket. Pastikan server backend aktif.")}}};(o=document.getElementById("heroCtaBtn"))==null||o.addEventListener("click",e),(n=document.getElementById("navDaftarBtn"))==null||n.addEventListener("click",e),(d=document.getElementById("dockDaftarBtn"))==null||d.addEventListener("click",e),(c=document.getElementById("modalCloseBtn"))==null||c.addEventListener("click",G),(u=document.getElementById("regModal"))==null||u.addEventListener("click",S=>{S.target.id==="regModal"&&G()}),(f=document.getElementById("modalEventSelect"))==null||f.addEventListener("change",S=>{const I=r.events.find(T=>T.id===S.target.value);I&&(r.selectedEvent=I,Y(),j())}),(b=document.getElementById("modalParticipantCount"))==null||b.addEventListener("change",S=>{r.participantCount=parseInt(S.target.value,10)||1,Y(),j()});const t=document.getElementById("bookerPhone");t&&V(t),(h=document.getElementById("checkSameAsBooker"))==null||h.addEventListener("change",()=>{z()}),(p=document.getElementById("bookerName"))==null||p.addEventListener("input",()=>{z()}),(k=document.getElementById("bookerPhone"))==null||k.addEventListener("input",()=>{z()}),(E=document.getElementById("btnModalNext"))==null||E.addEventListener("click",()=>{Fe(r.currentStep)&&(r.currentStep++,r.currentStep===3&&qe(),X())}),(y=document.getElementById("btnModalPrev"))==null||y.addEventListener("click",()=>{r.currentStep>1&&(r.currentStep--,X())}),(B=document.getElementById("btnModalSubmit"))==null||B.addEventListener("click",Ne);const a=()=>W("privacyModal");(P=document.getElementById("btnOpenPrivacyModal"))==null||P.addEventListener("click",a),(l=document.getElementById("footerPrivacyLink"))==null||l.addEventListener("click",a),(m=document.getElementById("privacyCloseBtn"))==null||m.addEventListener("click",()=>D("privacyModal")),(g=document.getElementById("privacyOkBtn"))==null||g.addEventListener("click",()=>D("privacyModal"));const s=()=>W("termsModal");(A=document.getElementById("btnOpenTerms"))==null||A.addEventListener("click",s),(F=document.getElementById("btnOpenTermsModal"))==null||F.addEventListener("click",s),(q=document.getElementById("footerTermsLink"))==null||q.addEventListener("click",s),(N=document.getElementById("footerWaiverLink"))==null||N.addEventListener("click",s),($=document.getElementById("termsCloseBtn"))==null||$.addEventListener("click",()=>D("termsModal")),(R=document.getElementById("termsOkBtn"))==null||R.addEventListener("click",()=>D("termsModal")),(K=document.getElementById("btnOpenSizeChart"))==null||K.addEventListener("click",()=>W("sizeChartModal")),(_=document.getElementById("sizeChartCloseBtn"))==null||_.addEventListener("click",()=>D("sizeChartModal")),(U=document.getElementById("sizeChartOkBtn"))==null||U.addEventListener("click",()=>D("sizeChartModal")),document.querySelectorAll(".faq-question").forEach(S=>{S.addEventListener("click",()=>{S.parentElement.classList.toggle("active")})});const i=document.querySelectorAll("section[id]");window.addEventListener("scroll",()=>{const S=window.pageYOffset;i.forEach(I=>{const T=I.offsetHeight,L=I.offsetTop-120,x=I.getAttribute("id"),O=document.querySelector(`.mobile-bottom-dock a[href*="${x}"]`);O&&S>L&&S<=L+T&&(document.querySelectorAll(".mobile-bottom-dock a").forEach(J=>J.classList.remove("active")),O.classList.add("active"))})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ae):ae();
