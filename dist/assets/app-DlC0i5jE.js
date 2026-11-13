import{b as X,a as ze,l as Ke}from"./api-iQl_QkSJ.js";import{a as je}from"./branding-Bfj0bFPs.js";import{a as Ge,s as We}from"./home-appearance-Db1ttUVV.js";/* empty css                       */const Je=`<!-- =========================================================================
     PAGE SKELETON LOADER (MINIMALIST & ANIMATED)
     ========================================================================= -->
<div class="page-skeleton" id="pageSkeleton">
  <style>
    .page-skeleton { padding: 40px 16px; width: 100%; display: flex; justify-content: center; }
    .page-skeleton-inner { width: 100%; max-width: 900px; margin: 0 auto; }
    .sk { background: #E2E8F0; background: linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 37%, #E2E8F0 63%); background-size: 400% 100%; animation: skShimmer 1.4s ease infinite; border-radius: 12px; }
    @keyframes skShimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
    .page-skeleton-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .page-skeleton-card { height: 220px; border-radius: 16px; }
    @media (max-width: 576px) {
      .page-skeleton { padding: 20px 12px; }
      .sk-title { height: 36px !important; }
      .sk-banner { height: 120px !important; }
      .page-skeleton-grid { grid-template-columns: 1fr; gap: 14px; }
    }
  </style>

  <div class="page-skeleton-inner">
    <div class="sk" style="width: 160px; height: 28px; margin: 0 auto 16px; border-radius: 99px;"></div>
    <div class="sk sk-title" style="width: 75%; height: 44px; margin: 0 auto 12px;"></div>
    <div class="sk" style="width: 55%; height: 20px; margin: 0 auto 30px;"></div>
    <div class="sk sk-banner" style="width: 100%; height: 150px; margin-bottom: 28px; border-radius: 20px;"></div>
    <div class="page-skeleton-grid">
      <div class="sk page-skeleton-card"></div>
      <div class="sk page-skeleton-card"></div>
    </div>
  </div>
</div>`,Ye=`<!-- =========================================================================
     TOP FLOATING GLASS NAVBAR (MINIMALIST & LEGA)
     ========================================================================= -->
<div class="top-navbar-container">
  <style>
    :root { --nav-bg: rgba(255, 255, 255, 0.75); --nav-border: rgba(226, 232, 240, 0.8); --nav-text: #334155; --nav-text-active: #FF6B00; --nav-hover-bg: rgba(255, 107, 0, 0.08); --shadow-glass: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03); --shadow-dropdown: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04); --radius-nav: 99px; --radius-menu: 16px; }
    .top-navbar-container { position: fixed; top: 16px; left: 0; right: 0; z-index: 1000; display: flex; justify-content: center; padding: 0 16px; pointer-events: none; }
    .top-navbar { pointer-events: auto; width: 100%; max-width: 1080px; min-height: 60px; background: var(--nav-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--nav-border); border-radius: var(--radius-nav); padding: 7px 12px 7px 18px; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: var(--shadow-glass); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #0F172A; font-weight: 800; font-size: 0.95rem; letter-spacing: -0.2px; transition: transform 0.2s ease; }
    .nav-brand:hover { transform: scale(1.02); }
    .brand-icon { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #FF6B00 0%, #FF852D 100%); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(255, 107, 0, 0.3); }
    .top-navbar .brand-text { max-width: min(42vw, 280px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .brand-text span { color: #FF6B00; }
    .nav-links { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }
    .nav-links > li { position: relative; }
    .nav-link { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 99px; font-size: 0.82rem; font-weight: 600; color: var(--nav-text); text-decoration: none; background: transparent; border: none; cursor: pointer; font-family: inherit; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
    .nav-link:hover { color: var(--nav-text-active); background: var(--nav-hover-bg); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(255, 107, 0, 0.12); }
    .nav-link:active { transform: translateY(0); }
    .nav-link.active { color: var(--nav-text-active); background: rgba(255, 107, 0, 0.1); }
    .nav-dropdown-toggle .chevron { font-size: 0.7rem; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin-left: 2px; }
    .nav-dropdown:hover .nav-dropdown-toggle .chevron, .nav-dropdown.active .nav-dropdown-toggle .chevron { transform: rotate(180deg); }
    .nav-dropdown-menu { position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%) translateY(8px) scale(0.96); width: 240px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: var(--radius-menu); padding: 8px; box-shadow: var(--shadow-dropdown); opacity: 0; visibility: hidden; pointer-events: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
    .nav-dropdown-menu::before { content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 10px; height: 10px; background: #FFF; border-left: 1px solid var(--nav-border); border-top: 1px solid var(--nav-border); }
    .nav-dropdown:hover .nav-dropdown-menu, .nav-dropdown.active .nav-dropdown-menu { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0) scale(1); }
    .nav-dropdown-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 10px; text-decoration: none; color: #334155; transition: all 0.2s ease; }
    .nav-dropdown-item i { font-size: 1rem; color: #FF6B00; width: 24px; height: 24px; border-radius: 6px; background: rgba(255, 107, 0, 0.08); display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
    .nav-dropdown-item:hover { background: #F8FAFC; transform: translateX(4px); }
    .nav-dropdown-item:hover i { background: #FF6B00; color: #FFF; transform: scale(1.08); }
    .nav-dropdown-item strong { display: block; font-size: 0.825rem; color: #0F172A; font-weight: 700; }
    .btn-glow { box-shadow: 0 4px 14px rgba(255, 107, 0, 0.35); transition: all 0.25s ease; }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(255, 107, 0, 0.45); transform: translateY(-2px); }
    .nav-mobile-toggle { display: none; width: 40px; height: 40px; align-items: center; justify-content: center; background: #F8FAFC; border: 1px solid var(--nav-border); border-radius: 50%; font-size: 1rem; color: #0F172A; cursor: pointer; }
    @media (max-width: 868px) {
      .top-navbar-container { top: 10px; padding: 0 10px; }
      .top-navbar { min-height: 54px; padding: 6px 8px 6px 14px; }
      .nav-mobile-toggle { display: inline-flex; flex: 0 0 auto; }
      .nav-links { position: absolute; top: calc(100% + 8px); left: 10px; right: 10px; max-height: min(70vh, 480px); overflow-y: auto; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: 18px; padding: 10px; flex-direction: column; align-items: stretch; gap: 4px; box-shadow: var(--shadow-dropdown); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease; }
      .nav-links.mobile-open { opacity: 1; visibility: visible; transform: translateY(0); }
      .nav-links > li { width: 100%; }
      .nav-link { width: 100%; min-height: 42px; justify-content: space-between; padding: 9px 12px; border-radius: 12px; text-align: left; }
      .nav-link:hover { transform: none; box-shadow: none; }
      .nav-dropdown-menu { position: static; transform: none !important; width: 100%; box-shadow: none; border: none; background: #F8FAFC; margin-top: 3px; display: none; opacity: 1; visibility: visible; pointer-events: auto; }
      .nav-dropdown-menu::before { display: none; }
      .nav-dropdown.active .nav-dropdown-menu { display: block; }
    }
    @media (max-width: 380px) {
      .top-navbar-container { padding: 0 8px; }
      .nav-brand { gap: 7px; font-size: 0.85rem; }
      .brand-icon { width: 30px; height: 30px; font-size: 0.8rem; }
      .nav-actions { gap: 6px !important; }
      #navDaftarBtn { padding: 8px 10px; font-size: 0.75rem; }
    }
  </style>

  <nav class="top-navbar">
    <a href="#beranda" class="nav-brand">
      <div class="brand-icon" aria-hidden="true"><i class="fa-solid fa-person-running"></i></div>
      <div class="brand-text">TEGAL RUN <span>2026</span></div>
    </a>

    <ul class="nav-links" id="navMenu" aria-label="Navigasi utama">
      <li>
        <a href="#kategori" class="nav-link">
          <span><i class="fa-solid fa-ticket" style="font-size: 0.85rem; margin-right: 4px;"></i> Kategori Tiket</span>
        </a>
      </li>
      <li>
        <a href="/cek-tiket.html" class="nav-link">
          <span><i class="fa-solid fa-magnifying-glass" style="font-size: 0.85rem; margin-right: 4px;"></i> Cek Tiket</span>
        </a>
      </li>
      <li class="nav-dropdown">
        <button type="button" class="nav-link nav-dropdown-toggle">
          <span><i class="fa-solid fa-circle-info" style="font-size: 0.85rem; margin-right: 4px;"></i> Informasi Event</span>
          <i class="fa-solid fa-chevron-down chevron"></i>
        </button>
        <div class="nav-dropdown-menu">
          <a href="#rute" class="nav-dropdown-item">
            <i class="fa-solid fa-route"></i>
            <div><strong>Rute &amp; Google Maps</strong><small style="display: block; color: #94A3B8; font-size: 0.72rem;">Jalur lomba &amp; titik flag-off</small></div>
          </a>
          <a href="#fasilitas" class="nav-dropdown-item">
            <i class="fa-solid fa-gift"></i>
            <div><strong>Fasilitas &amp; Race Pack</strong><small style="display: block; color: #94A3B8; font-size: 0.72rem;">Jersey, medali &amp; asuransi</small></div>
          </a>
        </div>
      </li>
      <li class="nav-dropdown">
        <button type="button" class="nav-link nav-dropdown-toggle">
          <span><i class="fa-solid fa-hand-holding-hand" style="font-size: 0.85rem; margin-right: 4px;"></i> Bantuan &amp; Legal</span>
          <i class="fa-solid fa-chevron-down chevron"></i>
        </button>
        <div class="nav-dropdown-menu">
          <a href="#faq" class="nav-dropdown-item">
            <i class="fa-solid fa-circle-question"></i>
            <div><strong>Tanya Jawab (FAQ)</strong><small style="display: block; color: #94A3B8; font-size: 0.72rem;">Seputar race pack &amp; aturan</small></div>
          </a>
          <a href="#legal" class="nav-dropdown-item">
            <i class="fa-solid fa-shield-halved"></i>
            <div><strong>Privasi Data (UU PDP)</strong><small style="display: block; color: #94A3B8; font-size: 0.72rem;">Keamanan data pribadi pelari</small></div>
          </a>
        </div>
      </li>
    </ul>

    <div class="nav-actions" style="display: flex; align-items: center; gap: 8px;">
      <button class="btn btn-primary btn-sm btn-glow" id="navDaftarBtn"><i class="fa-solid fa-bolt"></i> Daftar Tiket</button>
      <button type="button" class="nav-mobile-toggle" id="navMobileToggle" aria-label="Buka menu" aria-controls="navMenu" aria-expanded="false"><i class="fa-solid fa-bars" aria-hidden="true"></i></button>
    </div>
  </nav>
</div>`,Ve=`<!-- =========================================================================
     FOOTER (LIGHT THEME ELEGANT)
     ========================================================================= -->
<footer class="glass-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#beranda" class="nav-brand">
          <div class="brand-icon">
            <i class="fa-solid fa-person-running"></i>
          </div>
          <div class="brand-text">TEGAL RUN <span>2026</span></div>
        </a>
        <p>
          Diselenggarakan oleh Komite Olahraga & Pariwisata Kota Tegal berkolaborasi dengan komunitas lari bahari. 
          Ajang olahraga sehat berskala nasional berstandar PASI.
        </p>
        <div class="social-links">
          <a href="https://instagram.com" target="_blank" class="social-icon-btn"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank" class="social-icon-btn"><i class="fa-brands fa-facebook"></i></a>
          <a href="https://tiktok.com" target="_blank" class="social-icon-btn"><i class="fa-brands fa-tiktok"></i></a>
          <a href="https://youtube.com" target="_blank" class="social-icon-btn"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>

      <div>
        <h4 class="footer-title">Navigasi Utama</h4>
        <ul class="footer-links">
          <li><a href="#beranda"><i class="fa-solid fa-chevron-right"></i> Beranda</a></li>
          <li><a href="#kategori"><i class="fa-solid fa-chevron-right"></i> Kategori Lomba</a></li>
          <li><a href="/cek-tiket.html"><i class="fa-solid fa-chevron-right"></i> Cek Status Tiket & E-Tiket</a></li>
          <li><a href="#rute"><i class="fa-solid fa-chevron-right"></i> Rute & Checkpoint</a></li>
          <li><a href="#fasilitas"><i class="fa-solid fa-chevron-right"></i> Fasilitas & Racepack</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-title">Legal & Kepatuhan</h4>
        <ul class="footer-links">
          <li><a href="javascript:void(0)" id="footerPrivacyLink"><i class="fa-solid fa-shield-halved"></i> Kebijakan Privasi (UU PDP)</a></li>
          <li><a href="javascript:void(0)" id="footerTermsLink"><i class="fa-solid fa-file-lines"></i> Syarat & Ketentuan Lari</a></li>
          <li><a href="javascript:void(0)" id="footerWaiverLink"><i class="fa-solid fa-heart-pulse"></i> Pernyataan Pelepasan Medis</a></li>
          <li><a href="#faq"><i class="fa-solid fa-question"></i> FAQ & Bantuan</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-title">Sekretariat Pelaksana</h4>
        <p class="footer-address" style="color: var(--color-text-muted); font-size: 0.88rem; line-height: 1.6; margin-bottom: 10px;">
          Gedung Dinas Kepemudaan, Olahraga dan Pariwisata (Disporapar), Kompleks Balaikota, Jl. Ki Gede Sebayu No. 12, Tegal 52123.
        </p>
        <p style="color: var(--color-text-muted); font-size: 0.88rem; margin-bottom: 6px;">
          <i class="fa-solid fa-envelope" style="color: var(--color-primary); margin-right: 6px;"></i> <span class="footer-email">helpdesk@tegalrun.id</span>
        </p>
        <p style="color: var(--color-text-muted); font-size: 0.88rem;">
          <i class="fa-brands fa-whatsapp" style="color: #10B981; margin-right: 6px;"></i> <span class="footer-phone">+62 812-3456-7890</span> (Hotline)
        </p>
        <p class="footer-registration-hours" id="footerRegistrationHours" hidden>
          <i class="fa-solid fa-clock" aria-hidden="true"></i>
          <strong>Jam operasional pendaftaran:</strong>
          <span id="footerRegistrationHoursValue"></span>
        </p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-copyright-text">&copy; 2026 Komite Tegal Run. Hak Cipta Dilindungi Undang-Undang Republik Indonesia.</div>
      <div style="color: var(--color-text-muted);">
        Keamanan Transaksi Terenkripsi oleh <span style="color: var(--color-primary); font-weight: 700;">Midtrans Payment Gateway</span>
      </div>
    </div>
  </div>
</footer>
`,Xe=`<!-- =========================================================================
     FLOATING BOTTOM MOBILE DOCK NAVBAR (MODERN GLASS STYLE)
     ========================================================================= -->
<div class="mobile-bottom-dock">
  <ul class="dock-items" aria-label="Navigasi mobile">
    <li class="dock-item">
      <a href="#beranda" class="active" aria-label="Beranda" aria-current="page">
        <i class="fa-solid fa-house" aria-hidden="true"></i>
        <span>Beranda</span>
      </a>
    </li>
    <li class="dock-item">
      <a href="#kategori" aria-label="Kategori tiket">
        <i class="fa-solid fa-ticket" aria-hidden="true"></i>
        <span>Kategori</span>
      </a>
    </li>
    <li class="dock-item">
      <a href="#rute" aria-label="Rute event">
        <i class="fa-solid fa-map" aria-hidden="true"></i>
        <span>Rute</span>
      </a>
    </li>
    <li class="dock-item">
      <a href="/cek-tiket.html" aria-label="Cek tiket">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <span>Cek Tiket</span>
      </a>
    </li>
    <li class="dock-item dock-cta">
      <a href="#" id="dockDaftarBtn" aria-label="Daftar tiket">
        <i class="fa-solid fa-bolt" aria-hidden="true"></i>
        <span>Daftar</span>
      </a>
    </li>
  </ul>
</div>`,Qe=`<section class="hero-section" id="beranda">\r
  <div class="container">\r
    <div class="hero-split-grid hero-no-visual">\r
      <div class="hero-col-content">\r
        <div class="hero-pill-badge" id="heroStatusBadge" hidden>\r
          <span class="status-dot" aria-hidden="true"></span>\r
          <i class="fa-solid fa-bolt badge-icon" aria-hidden="true"></i>\r
          <span id="heroStatusText"></span>\r
        </div>\r
\r
        <h1 class="hero-title" hidden></h1>\r
        <p class="hero-desc" hidden></p>\r
\r
        <div class="hero-actions">\r
          <button class="btn btn-primary btn-glow" id="heroCtaBtn" hidden>\r
            <i class="fa-solid fa-ticket" aria-hidden="true"></i> Amankan Slot Lari Sekarang\r
          </button>\r
          <button class="btn btn-secondary" id="btnOpenTerms">\r
            <i class="fa-solid fa-file-contract" aria-hidden="true"></i> Syarat &amp; Ketentuan\r
          </button>\r
        </div>\r
\r
        <div class="countdown-box" id="heroCountdown" hidden>\r
          <div class="countdown-header">\r
            <div class="countdown-title-wrap">\r
              <i class="fa-solid fa-stopwatch" aria-hidden="true"></i>\r
              <span>MENUJU HARI PERLOMBAAN</span>\r
            </div>\r
            <div class="event-date-pill" id="eventDateDisplay"></div>\r
          </div>\r
          <div class="countdown-grid" aria-label="Hitung mundur menuju hari perlombaan">\r
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
      <div class="hero-col-visual" id="heroVisual" hidden>\r
        <div class="athletic-hero-card">\r
          <div class="athletic-hero-img-wrap">\r
            <img id="heroDisplayImg" class="athletic-hero-img" alt="" loading="eager">\r
            <div class="athletic-card-overlay" aria-hidden="true"></div>\r
          </div>\r
        </div>\r
        <div class="hero-countdown-overlay" id="heroCountdownOverlay"></div>\r
      </div>\r
    </div>\r
\r
    <div class="stats-banner" id="statsBanner" hidden aria-label="Statistik event"></div>\r
  </div>\r
</section>\r
`,Ze=`<!-- =========================================================================
     KATEGORI EVENT & TIKET
     ========================================================================= -->
<section class="tickets-section" id="kategori">
  <div class="container">
    <div class="section-header text-center">
      <div class="section-tag">
        <i class="fa-solid fa-tags" aria-hidden="true"></i> Tiket yang Tersedia
      </div>
      <h2 class="section-title">Pilih Tantangan Jarak Lari Anda</h2>
      <p class="section-desc">
        Tersedia kategori kompetitif bagi atlet dan fun run santai bagi keluarga & komunitas. 
        Seluruh peserta yang finis sebelum batas waktu (Cut-Off Time) berhak atas Medali Finisher resmi.
      </p>
    </div>

    <div class="tickets-cms-media-wrap" id="ticketsCmsMediaWrap" hidden>
      <img id="ticketsCmsMedia" class="tickets-cms-media" alt="Gambar kategori dan medali finisher" loading="eager" hidden>
    </div>

    <!-- Container Tiket Dinamis (Di-render via JavaScript) -->
    <div 
      class="tickets-grid" 
      id="ticketsGrid" 
      aria-live="polite" 
      aria-busy="true"
    >
      <!-- Loading Skeleton Card 1 -->
      <div class="glass-card ticket-card sk-card">
        <div class="sk" style="width: 100px; height: 24px; border-radius: 12px; margin-bottom: 16px;"></div>
        <div class="sk" style="width: 75%; height: 32px; border-radius: 8px; margin-bottom: 12px;"></div>
        <div class="sk" style="width: 50%; height: 44px; border-radius: 8px; margin-bottom: 24px;"></div>
        <div class="ticket-features-sk" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
          <div class="sk" style="width: 100%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 90%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 95%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 80%; height: 20px; border-radius: 4px;"></div>
        </div>
        <div class="sk" style="width: 100%; height: 48px; border-radius: 30px;"></div>
      </div>

      <!-- Loading Skeleton Card 2 -->
      <div class="glass-card ticket-card sk-card">
        <div class="sk" style="width: 100px; height: 24px; border-radius: 12px; margin-bottom: 16px;"></div>
        <div class="sk" style="width: 75%; height: 32px; border-radius: 8px; margin-bottom: 12px;"></div>
        <div class="sk" style="width: 50%; height: 44px; border-radius: 8px; margin-bottom: 24px;"></div>
        <div class="ticket-features-sk" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
          <div class="sk" style="width: 100%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 90%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 95%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 80%; height: 20px; border-radius: 4px;"></div>
        </div>
        <div class="sk" style="width: 100%; height: 48px; border-radius: 30px;"></div>
      </div>

      <!-- Loading Skeleton Card 3 -->
      <div class="glass-card ticket-card sk-card">
        <div class="sk" style="width: 100px; height: 24px; border-radius: 12px; margin-bottom: 16px;"></div>
        <div class="sk" style="width: 75%; height: 32px; border-radius: 8px; margin-bottom: 12px;"></div>
        <div class="sk" style="width: 50%; height: 44px; border-radius: 8px; margin-bottom: 24px;"></div>
        <div class="ticket-features-sk" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
          <div class="sk" style="width: 100%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 90%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 95%; height: 20px; border-radius: 4px;"></div>
          <div class="sk" style="width: 80%; height: 20px; border-radius: 4px;"></div>
        </div>
        <div class="sk" style="width: 100%; height: 48px; border-radius: 30px;"></div>
      </div>
    </div>

    <div id="registrationClosedNotice" class="registration-closed-notice" hidden aria-live="polite">
      <i class="fa-solid fa-clock" aria-hidden="true"></i>
      <div>
        <h3 id="registrationClosedNoticeTitle">Pendaftaran sedang ditutup</h3>
        <p>Pendaftaran saat ini belum tersedia. Buka informasi untuk melihat pesan dari panitia dan jam operasional.</p>
        <button type="button" class="registration-notice-button" id="btnShowRegistrationNotice">
          <i class="fa-solid fa-circle-info" aria-hidden="true"></i> Tampilkan informasi
        </button>
      </div>
    </div>
    <dialog class="registration-notice-dialog" id="registrationNoticeDialog" aria-labelledby="registrationNoticeDialogTitle" aria-describedby="registrationClosedNoticeMessage registrationOperatingHoursNotice">
      <div class="registration-notice-dialog-content">
        <button type="button" class="registration-notice-dialog-close" id="btnCloseRegistrationNotice" aria-label="Tutup informasi">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <span class="registration-notice-dialog-icon"><i class="fa-solid fa-bullhorn" aria-hidden="true"></i></span>
        <span class="registration-notice-dialog-label">INFORMASI EVENT</span>
        <h3 id="registrationNoticeDialogTitle">Informasi Pendaftaran</h3>
        <p id="registrationClosedNoticeMessage"></p>
        <p id="registrationOperatingHoursNotice" hidden></p>
        <form method="dialog">
          <button type="submit" class="registration-notice-dialog-action">Saya mengerti</button>
        </form>
      </div>
    </dialog>

    <!-- Template State Kosong / Pendaftaran Ditutup (Hidden by default) -->
    <template id="ticketClosedTemplate">
      <div class="empty-tickets-notice text-center p-8 bg-white/5 rounded-xl border border-white/10">
        <i class="fa-solid fa-lock text-4xl text-yellow-500 mb-3" aria-hidden="true"></i>
        <h3 class="text-xl font-bold text-white mb-2">Pendaftaran Resmi Ditutup</h3>
        <p class="text-gray-400 max-w-md mx-auto">
          Kuota pendaftaran untuk seluruh kategori lari telah terpenuhi atau masa pendaftaran telah berakhir.
        </p>
      </div>
    </template>
  </div>
</section>`,et=`<!-- =========================================================================
     RUTE & MAP CHECKPOINTS
     ========================================================================= -->
<section class="route-section" id="rute">
  <div class="container">
    <div class="route-container">
      <div class="glass-card route-info-card">
        <div class="section-tag" style="margin-bottom: 12px;">
          <i class="fa-solid fa-route"></i> <span id="routeSectionBadgeLabel">Jalur Lari Steril</span>
        </div>
        <h2 class="section-title" id="routeSectionTitle" style="text-align: left; font-size: 2rem;">
          Rute Datar Pesisir Pantura Tegal
        </h2>
        <p id="routeSectionDesc" style="color: var(--color-text-muted); font-size: 0.95rem;">
          Jalur lari disterilkan bekerja sama dengan Satlantas Polres Tegal Kota dan Dishub, 
          menjamin keamanan pelari dari polusi dan kendaraan bermotor.
        </p>

        <div class="route-checklist" id="routeChecklistContainer">
          <!-- Loaded dynamically from /api/routes -->
        </div>
      </div>

      <div class="glass-card route-visual-card">
        <div class="route-badge-float">
          <i class="fa-solid fa-certificate"></i> Terverifikasi PASI
        </div>
        <div class="route-map-mock">
          <svg class="route-path-svg" viewBox="0 0 500 400" fill="none">
            <circle cx="90" cy="310" r="14" fill="#FF6B00" opacity="0.2"/>
            <circle cx="90" cy="310" r="7" fill="#FF6B00"/>
            <circle cx="240" cy="200" r="14" fill="#FF851B" opacity="0.2"/>
            <circle cx="240" cy="200" r="7" fill="#FF851B"/>
            <circle cx="420" cy="110" r="14" fill="#10B981" opacity="0.2"/>
            <circle cx="420" cy="110" r="7" fill="#10B981"/>
            <path d="M 90 310 Q 160 270 240 200 T 420 110" stroke="#FF6B00" stroke-width="4" stroke-dasharray="6 6"/>
            <path d="M 420 110 C 370 200 230 330 90 310" stroke="#0F172A" stroke-width="3" stroke-opacity="0.25"/>
          </svg>

          <div style="z-index: 2; text-align: center; padding: 24px;">
            <div class="map-icon-circle">
              <i class="fa-solid fa-map-location"></i>
            </div>
            <h4 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">Peta Rute Tegal Run 2026</h4>
            <p style="font-size: 0.85rem; color: #64748B; max-width: 320px; margin: 0 auto 16px auto;">
              Unduh rute digital GPX untuk jam tangan Garmin, Coros, Polar, atau aplikasi Strava Anda.
            </p>
            <a href="#" class="btn btn-sm btn-secondary" id="btnDownloadGpx">
              <i class="fa-solid fa-download"></i> Unduh File GPX (Strava/Garmin)
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`,tt=`<!-- =========================================================================
     FASILITAS & RACEPACK SHOWCASE (DYNAMIC FROM BACKEND)
     ========================================================================= -->
<section class="facilities-section" id="fasilitas">
  <style>
    .facilities-section { padding: 48px 0; background: var(--color-bg, #F8FAFC); }
    .facilities-section .section-header { text-align: center; margin-bottom: 28px; }
    .facilities-section .section-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,107,0,0.08); color: var(--color-primary, #FF6B00); padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .facilities-section .section-title { font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight: 800; color: var(--color-text-title, #0F172A); margin-bottom: 6px; }
    .facilities-section .section-desc { color: var(--color-text-muted, #64748B); font-size: 0.875rem; max-width: 560px; margin: 0 auto; line-height: 1.4; }

    /* Compact Grid Layout */
    .facilities-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 20px; }
    
    /* Compact Cards */
    .facility-card { background: #FFFFFF; border: 1px solid var(--color-border, #E2E8F0); border-radius: 12px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: transform 0.2s ease, box-shadow 0.2s ease; display: flex; flex-direction: column; }
    .facility-card:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.06); border-color: rgba(255,107,0,0.3); }
    
    .facility-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .facility-icon-wrap { width: 34px; height: 34px; min-width: 34px; border-radius: 8px; background: rgba(255,107,0,0.1); color: var(--color-primary, #FF6B00); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; }
    .facility-title { font-size: 0.925rem; font-weight: 700; color: var(--color-text-title, #0F172A); margin: 0; line-height: 1.3; }
    .facility-desc { font-size: 0.8rem; color: var(--color-text-body, #475569); line-height: 1.45; margin: 0; flex-grow: 1; }
    
    .btn-text-link { display: inline-flex; align-items: center; gap: 5px; background: transparent; border: none; color: var(--color-primary, #FF6B00); font-size: 0.775rem; font-weight: 700; margin-top: 10px; padding: 0; cursor: pointer; text-decoration: none; font-family: inherit; }
    .btn-text-link:hover { text-decoration: underline; }

    @media (max-width: 576px) {
      .facilities-grid { grid-template-columns: 1fr; gap: 10px; }
      .facility-card { padding: 14px; }
    }
  </style>

  <div class="container">
    <div class="section-header">
      <div class="section-tag">
        <i class="fa-solid fa-gift"></i> Informasi
      </div>
      <h2 class="section-title">Racepack Premium &amp; Fasilitas Pelari</h2>
      <p class="section-desc">
        Setiap nomor BIB dicetak khusus atas nama peserta, dilengkapi asuransi jiwa perlindungan medis selama perlombaan berlangsung.
      </p>
    </div>

    <img id="facilitiesMedia" class="facilities-media" alt="Fasilitas dan race village" loading="lazy" hidden>

    <!-- Container Grid yang diisi secara dinamis dari Backend -->
    <div class="facilities-grid" id="facilitiesContainer">
      <!-- Loading State Skeleton / Fallback -->
      <div class="facility-card" style="text-align: center; color: #94A3B8; font-size: 0.85rem; padding: 20px;">
        <i class="fa-solid fa-circle-notch fa-spin"></i> Memuat fasilitas pelari...
      </div>
    </div>
  </div>
</section>
`,at=`<!-- =========================================================================
     KEPATUHAN HUKUM & PERLINDUNGAN DATA (UU PDP & UU ITE INDONESIA)
     ========================================================================= -->
<section class="legal-section" id="legal">
  <div class="container">
    <div class="legal-box glass-card">
      <div class="section-header" style="margin-bottom: 24px;">
        <div class="section-tag">
          <i class="fa-solid fa-shield-halved"></i> <span id="legalSectionBadge">Kepatuhan Regulasi Indonesia</span>
        </div>
        <h2 class="section-title" id="legalSectionTitle" style="font-size: 2rem;">Perizinan &amp; Kepatuhan Hukum Resmi</h2>
        <p class="section-desc" id="legalSectionDesc">
           diselenggarakan dengan izin resmi pemerintah daerah, PASI, dan standar keselamatan medis internasional. Pengumpulan data NIK dan kontak darurat semata-mata untuk verifikasi BIB dan penerbitan polis asuransi.
        </p>
      </div>

      <div class="legal-grid" id="legalGridContainer">
        <div class="legal-item">
          <i class="fa-solid fa-certificate"></i>
          <h4 id="legalItem1Title">Rekomendasi Resmi PB PASI</h4>
          <p id="legalItem1Desc">Tersertifikasi standar teknis rute dan aturan perlombaan atletik resmi nasional.</p>
        </div>
        <div class="legal-item">
          <i class="fa-solid fa-road-barrier"></i>
          <h4 id="legalItem2Title">Izin Kepolisian &amp; Dishub</h4>
          <p id="legalItem2Desc">Pengamanan jalur dan rekayasa lalu lintas penuh demi keselamatan pelari.</p>
        </div>
        <div class="legal-item">
          <i class="fa-solid fa-shield-heart"></i>
          <h4 id="legalItem3Title">Asuransi Medis Peserta</h4>
          <p id="legalItem3Desc">Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri selama perlombaan berlangsung.</p>
        </div>
        <div class="legal-item">
          <i class="fa-solid fa-user-lock"></i>
          <h4 id="legalItem4Title">Perlindungan Data Pribadi (UU PDP)</h4>
          <p id="legalItem4Desc">Enkripsi data pendaftaran dan kepatuhan penuh undang-undang perlindungan data konsumen.</p>
        </div>
      </div>

      <div class="legal-cta-box">
        <button class="btn btn-outline btn-sm" id="btnOpenPrivacyModal">
          <i class="fa-solid fa-file-shield"></i> <span id="legalPrivacyButtonLabel">Baca Kebijakan Privasi Lengkap (UU PDP)</span>
        </button>
        <button class="btn btn-outline btn-sm" id="btnOpenTermsModal">
          <i class="fa-solid fa-scale-balanced"></i> <span id="legalTermsButtonLabel">Ketentuan Perlombaan &amp; Pelepasan Tanggung Jawab</span>
        </button>
      </div>
    </div>
  </div>
</section>
`,nt=`<!-- =========================================================================
     FAQ SECTION (GENERAL & EXCLUSIVE ACCORDION)
     ========================================================================= -->
<section class="faq-section" id="faq">
  <style>
    .faq-section { padding: 48px 0; background: var(--color-bg, #F8FAFC); }
    .faq-section .section-header { text-align: center; margin-bottom: 28px; }
    .faq-section .section-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,107,0,0.08); color: var(--color-primary, #FF6B00); padding: 4px 12px; border-radius: 99px; font-size: 0.775rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .faq-section .section-title { font-size: clamp(1.3rem, 3.5vw, 1.8rem); font-weight: 800; color: var(--color-text-title, #0F172A); margin-bottom: 6px; line-height: 1.25; }
    .faq-section .section-desc { color: var(--color-text-muted, #64748B); font-size: clamp(0.825rem, 2vw, 0.9rem); max-width: 560px; margin: 0 auto; line-height: 1.4; }
    .faq-list { max-width: 760px; margin: 20px auto 0; display: flex; flex-direction: column; gap: 10px; }
    .faq-list[hidden], .faq-coming-soon[hidden] { display: none !important; }
    .faq-item { background: #FFFFFF; border: 1px solid var(--color-border, #E2E8F0); border-radius: 12px; overflow: hidden; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
    .faq-item:hover { border-color: rgba(255, 107, 0, 0.4); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); }
    .faq-item.active { border-color: var(--color-primary, #FF6B00); box-shadow: 0 4px 16px rgba(255, 107, 0, 0.1); }
    .faq-question { width: 100%; padding: 14px 16px; border: 0; background: transparent; text-align: left; font: inherit; font-size: 0.9rem; font-weight: 700; color: var(--color-text-title, #0F172A); cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; user-select: none; transition: color 0.2s ease; }
    .faq-question:hover { color: var(--color-primary, #FF6B00); }
    .faq-question i { font-size: 0.8rem; color: #94A3B8; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease; }
    .faq-item.active .faq-question i { transform: rotate(180deg); color: var(--color-primary, #FF6B00); }
    .faq-answer-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .faq-item.active .faq-answer-wrapper { grid-template-rows: 1fr; }
    .faq-answer { overflow: hidden; font-size: 0.85rem; color: var(--color-text-body, #475569); line-height: 1.5; padding: 0 16px; transition: padding 0.3s ease; }
    .faq-item.active .faq-answer { padding: 0 16px 14px 16px; }
    @media (max-width: 576px) {
      .faq-section { padding: 32px 0; }
      .faq-list { gap: 8px; }
      .faq-question { padding: 12px 14px; font-size: 0.85rem; }
      .faq-answer { font-size: 0.8rem; }
      .faq-item.active .faq-answer { padding: 0 14px 12px 14px; }
    }
  </style>

  <div class="container">
    <div class="section-header">
      <div class="section-tag">
        <i class="fa-solid fa-circle-question"></i> Pusat Informasi
      </div>
      <h2 class="section-title">Pertanyaan yang Sering Diajukan (FAQ)</h2>
      <p class="section-desc">
        Temukan informasi umum mengenai pendaftaran tiket, racepack, aturan lomba, dan kebijakan acara.
      </p>
    </div>

    <div class="faq-list" id="faqList"></div>
    <div class="faq-coming-soon" id="faqComingSoon" hidden>
      <span>EVENT COMING SOON!</span>
    </div>
  </div>
</section>`,it=`<section class="site-coming-soon" id="siteComingSoon" aria-live="polite" hidden>\r
  <div class="container">\r
    <article class="coming-soon-ticket">\r
      <div class="coming-soon-ticket-image" id="comingSoonImageWrap">\r
        <img id="comingSoonImage" alt="" hidden>\r
        <span class="coming-soon-ticket-image-fallback" id="comingSoonImageFallback" aria-hidden="true">\r
          <i class="fa-solid fa-ticket"></i>\r
        </span>\r
      </div>\r
      <div class="coming-soon-ticket-content">\r
        <span class="coming-soon-eyebrow"><i class="fa-solid fa-sparkles"></i> EVENT UPDATE</span>\r
        <h1 id="comingSoonTitle">COMING SOON EVENT!</h1>\r
        <p id="comingSoonMessage">Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!</p>\r
        <span class="coming-soon-ticket-stamp"><i class="fa-solid fa-ticket"></i> STAY TUNED</span>\r
      </div>\r
    </article>\r
  </div>\r
</section>\r
`,st=`<!-- =========================================================================
     MODAL 1: CHECKOUT & WAR TIKET FORM (3-STEP WITH UU PDP CONSENT)
     ========================================================================= -->
<div class="modal-overlay" id="regModal">
  <div class="modal-container">
    <div class="modal-header">
      <div class="modal-title-group">
        <h3><i class="fa-solid fa-bolt" style="color: var(--color-primary); margin-right: 8px;"></i> Formulir Pendaftaran </h3>
        <p>Lengkapi identitas penanggung jawab & pelari sesuai data KTP asli.</p>
      </div>
      <button class="modal-close-btn" id="modalCloseBtn">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- Stepper Navigation -->
    <div class="modal-steps">
      <div class="step-indicator active" id="stepIndicator1">
        <div class="step-num">1</div>
        <span>Kategori & Pemesan</span>
      </div>
      <div class="step-indicator" id="stepIndicator2">
        <div class="step-num">2</div>
        <span>Data Peserta</span>
      </div>
      <div class="step-indicator" id="stepIndicator3">
        <div class="step-num">3</div>
        <span>Persetujuan & Bayar</span>
      </div>
    </div>

    <!-- Modal Body -->
    <div class="modal-body">
      <!-- STEP 1: PILIH KATEGORI & DATA PEMESAN -->
      <div id="stepSection1">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Kategori Lari <span class="req">*</span></label>
            <select class="form-select" id="modalEventSelect"></select>
          </div>
          <div class="form-group">
            <label class="form-label">Jumlah Tiket / Peserta <span class="req">*</span></label>
            <select class="form-select" id="modalParticipantCount">
              <option value="1">1 Orang Peserta</option>
              <option value="2">2 Orang Peserta</option>
              <option value="3">3 Orang Peserta</option>
              <option value="4">4 Orang Peserta</option>
              <option value="5">5 Orang Peserta</option>
            </select>
          </div>
        </div>

        <div class="card-embedded">
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 14px;">
            <i class="fa-solid fa-user-shield" style="color: var(--color-primary);"></i> Data Penanggung Jawab Pemesanan
          </h4>

          <div class="form-group">
            <label class="form-label">Nama Lengkap Pemesan <span class="req">*</span></label>
            <input type="text" class="form-input" id="bookerName" placeholder="Contoh: Budi Santoso" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Alamat Email Aktif <span class="req">*</span></label>
              <input type="email" class="form-input" id="bookerEmail" placeholder="nama@email.com" required>
              <div class="form-hint">E-Tiket & invoice Midtrans otomatis dikirim ke email ini.</div>
            </div>
            <div class="form-group">
              <label class="form-label">Nomor WhatsApp Aktif <span class="req">*</span></label>
              <input type="tel" class="form-input" id="bookerPhone" placeholder="Contoh: 081234567890" required>
              <div class="form-hint">Digunakan untuk menerima notifikasi E-Tiket via WhatsApp.</div>
            </div>
          </div>

          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #CBD5E1;">
            <label class="checkbox-container" style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="checkSameAsBooker">
              <span class="checkmark"></span>
              <span class="checkbox-label" style="font-weight: 700; font-size: 0.9rem; color: #1E293B;">
                Gunakan Data Penanggung Jawab Pemesanan sebagai Peserta #1
              </span>
            </label>
            <div class="form-hint" style="margin-left: 28px; margin-top: 2px;">
              Nama dan nomor WhatsApp penanggung jawab akan otomatis mengisi data formulir Peserta #1.
            </div>
          </div>
        </div>

        <!-- Rincian Biaya & Layanan Step 1 -->
        <div class="card-embedded" style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); margin-top: 14px; padding: 16px;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-receipt" style="color: var(--color-primary);"></i> Estimasi Rincian Biaya &amp; Layanan
          </h4>
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 6px;">
            <span style="color: var(--color-text-muted);">Subtotal Tiket:</span>
            <strong id="step1TicketsSubtotal" style="color: #0F172A;">Rp 0</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 8px;">
            <span style="color: var(--color-text-muted);" id="step1FeeLabel">Biaya Layanan:</span>
            <strong id="step1FeeAmount" style="color: #EA580C;">Rp 0</strong>
          </div>
          <div style="border-top: 1px dashed #CBD5E1; padding-top: 8px; display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 1.05rem;">
            <span style="color: #0F172A;">Total Tagihan:</span>
            <span style="color: var(--color-primary);" id="step1GrandTotal">Rp 0</span>
          </div>
        </div>
      </div>

      <!-- STEP 2: DATA PESERTA (REPEATER) -->
      <div id="stepSection2" style="display: none;">
        <div id="participantsContainer"></div>
      </div>

      <!-- STEP 3: RINGKASAN & PERSETUJUAN UU PDP -->
      <div id="stepSection3" style="display: none;">
        <div id="summaryReviewBox"></div>

        <!-- UU PDP Mandatory Consent Checkbox -->
        <div class="consent-box">
          <label class="checkbox-container">
            <input type="checkbox" id="checkConsentPDP" required>
            <span class="checkmark"></span>
            <span class="checkbox-label">
              <strong>Persetujuan Pemrosesan Data Pribadi (UU PDP No. 27/2022)</strong><br>
              Saya memberikan persetujuan eksplisit kepada Komite  untuk memproses data NIK, 
              kontak darurat, dan data medis yang saya serahkan demi kepentingan identifikasi nomor BIB, 
              penanganan gawat darurat medis di lintasan, serta penerbitan polis asuransi perlombaan.
            </span>
          </label>
        </div>

        <div class="consent-box" style="margin-top: 12px;">
          <label class="checkbox-container">
            <input type="checkbox" id="checkConsentWaiver" required>
            <span class="checkmark"></span>
            <span class="checkbox-label">
              <strong>Pelepasan Tanggung Jawab Medis (Liability Waiver)</strong><br>
              Saya menyatakan dalam kondisi fisik yang sehat dan terlatih untuk menyelesaikan kategori lari ini. 
              Saya memahami risiko olahraga maraton dan mematuhi seluruh peraturan panitia penyelenggara.
            </span>
          </label>
        </div>

        <div class="midtrans-badge-box">
          <i class="fa-solid fa-lock" style="color: #10B981; font-size: 1.2rem;"></i>
          <span style="font-size: 0.85rem; color: #475569;">
            Metode pembayaran melalui <strong>Midtrans</strong>.
          </span>
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="modal-footer">
      <div class="registration-timer-info" role="status" aria-live="polite">
        <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
        <span class="registration-timer-copy">
          <span id="registrationTimerMessage">Sisa waktu pendaftaran</span>
          <strong id="registrationTimeRemaining">—</strong>
        </span>
      </div>
      <div class="order-total-preview">
        <span class="total-label">Total Tagihan</span>
        <span class="total-amount" id="modalTotalAmount">Rp 0</span>
      </div>

      <div class="modal-footer-actions" style="display: flex; gap: 10px;">
        <button type="button" class="btn btn-secondary btn-sm" id="btnModalPrev" style="display: none;">
          <i class="fa-solid fa-arrow-left"></i> Kembali
        </button>
        <button type="button" class="btn btn-primary btn-sm" id="btnModalNext">
          Lanjut <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnModalSubmit" style="display: none;">
          <i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)
        </button>
      </div>
    </div>
  </div>
</div>

<!-- =========================================================================
     MODAL 2: KEBIJAKAN PRIVASI (UU PDP NO. 27 TAHUN 2022)
     ========================================================================= -->
<div class="modal-overlay" id="privacyModal">
  <div class="modal-container" style="max-width: 800px;">
    <div class="modal-header">
      <div class="modal-title-group">
        <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary); margin-right: 8px;"></i> <span id="privacyModalTitle">Kebijakan Privasi Data Pribadi (UU PDP)</span></h3>
        <p id="privacyModalSubtitle">Berdasarkan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022</p>
      </div>
      <button class="modal-close-btn" id="privacyCloseBtn">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="modal-body legal-document-text" id="privacyModalContent">
      <h4>1. Pengendali Data Pribadi</h4>
      <p>
        Pengendali Data Pribadi untuk seluruh aktivitas pendaftaran  adalah <strong>Komite Pelaksana </strong> yang berkedudukan di Tegal, Jawa Tengah. Kami berkomitmen melindungi data pribadi Anda sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) dan UU No. 1 Tahun 2024 tentang ITE.
      </p>

      <h4>2. Data Pribadi yang Dikumpulkan</h4>
      <p>Data yang kami kumpulkan mencakup:</p>
      <ul>
        <li><strong>Data Pribadi Umum:</strong> Nama Lengkap sesuai KTP, Nomor Induk Kependudukan (NIK 16 digit), Tempat & Tanggal Lahir, Jenis Kelamin, Alamat Lengkap Domisili, Nomor Telepon/WhatsApp, dan Alamat Surel (Email).</li>
        <li><strong>Data Pribadi Spesifik/Sensitif:</strong> Golongan Darah dan Riwayat Penyakit/Alergi Medis yang diserahkan secara sukarela untuk penanganan darurat tim medis ambulans di rute perlombaan.</li>
      </ul>

      <h4>3. Dasar Hukum dan Tujuan Pemrosesan</h4>
      <p>Pemrosesan data pribadi Anda dilakukan berdasarkan persetujuan eksplisit (Consent) untuk tujuan:</p>
      <ul>
        <li>Verifikasi kepemilikan nomor dada (BIB) resmi guna mencegah pemalsuan identitas atau praktik joki atletik.</li>
        <li>Penerbitan polis asuransi perlindungan kecelakaan olahraga selama berlangsungnya perlombaan.</li>
        <li>Penyelamatan jiwa (Vital Interest) oleh tim dokter darurat jika terjadi kolaps medis di lintasan.</li>
        <li>Pengiriman hasil waktu lomba (Race Timing) dan e-Certificate resmi.</li>
      </ul>

      <h4>4. Keamanan dan Batas Masa Retensi Data</h4>
      <p>
        Data disimpan pada server terenkripsi dengan protokol SSL/TLS 256-bit dan pembatasan akses ketat. 
        Masa simpan (retensi) data maksimal adalah 1 (satu) tahun kalender setelah event selesai untuk kebutuhan audit keselamatan dan keuangan resmi, setelah itu data dianonimkan atau dimusnahkan secara aman.
      </p>

      <h4>5. Hak Anda sebagai Subjek Data</h4>
      <p>
        Berdasarkan Pasal 5 s.d. Pasal 13 UU PDP, Anda berhak mengakses, memperbaiki kesalahan data, menolak pemrosesan otomatis, serta mengajukan permohonan penghapusan data Anda. Hubungi Petugas Perlindungan Data kami melalui surel resmi: <code>dpo@tegalrun.id</code>.
      </p>
    </div>

    <div class="modal-footer" style="justify-content: flex-end;">
      <button class="btn btn-secondary btn-sm" id="privacyOkBtn">Tutup Dokumen</button>
    </div>
  </div>
</div>

<!-- =========================================================================
     MODAL 3: SYARAT & KETENTUAN (TERMS & CONDITIONS)
     ========================================================================= -->
<div class="modal-overlay" id="termsModal">
  <div class="modal-container" style="max-width: 800px;">
    <div class="modal-header">
      <div class="modal-title-group">
        <h3><i class="fa-solid fa-file-contract" style="color: var(--color-primary); margin-right: 8px;"></i> <span id="termsModalTitle">Syarat &amp; Ketentuan Peserta Lari</span></h3>
        <p id="termsModalSubtitle">Regulasi Resmi Perlombaan</p>
      </div>
      <button class="modal-close-btn" id="termsCloseBtn">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="modal-body legal-document-text" id="termsModalContent">
      <h4>1. Ketentuan Umum Kepesertaan</h4>
      <p>
        Pendaftaran terbuka untuk Warga Negara Indonesia (WNI) dan Warga Negara Asing (WNA) yang memiliki identitas resmi (KTP/SIM/Paspor). 
        Peserta wajib memilih kategori yang sesuai dengan kemampuan fisik dan mematuhi batas waktu Cut-Off Time (COT).
      </p>

      <h4>2. Larangan Praktik Joki & Pengalihan BIB</h4>
      <p>
        Nomor BIB bersifat personal dan tidak dapat diperjualbelikan atau dialihkan kepada pihak lain tanpa persetujuan tertulis resmi panitia. 
        Pelanggaran terhadap pasal ini akan mengakibatkan diskualifikasi instan, pencabutan hak medali finisher, dan hilangnya perlindungan santunan asuransi.
      </p>

      <h4>3. Pelepasan Tanggung Jawab Medis (Waiver of Liability)</h4>
      <p>
        Dengan menyelesaikan pendaftaran, peserta menyadari bahwa lari maraton adalah aktivitas fisik berkategori intensitas tinggi. 
        Peserta membebaskan panitia penyelenggara, sponsor, dan aparat pengamanan dari tuntutan hukum perdata maupun pidana atas cedera fisik, kehilangan harta benda, atau insiden yang diakibatkan oleh kondisi kesehatan bawaan peserta yang tidak diungkapkan kepada tim medis.
      </p>

      <h4>4. Kebijakan Keadaan Kahar (Force Majeure)</h4>
      <p>
        Apabila terjadi keadaan darurat bencana alam, kebakaran, kerusuhan sosial, atau kebijakan pemerintah terkait keamanan wilayah yang menyebabkan acara dibatalkan, panitia tidak berkewajiban mengembalikan biaya pendaftaran yang telah digunakan untuk produksi racepack dan operasional awal.
      </p>
    </div>

    <div class="modal-footer" style="justify-content: flex-end;">
      <button class="btn btn-secondary btn-sm" id="termsOkBtn">Saya Mengerti</button>
    </div>
  </div>
</div>

<!-- =========================================================================
     MODAL 4: SIZE CHART JERSEY
     ========================================================================= -->
<div class="modal-overlay" id="sizeChartModal">
  <div class="modal-container" style="max-width: 600px;">
    <div class="modal-header">
      <div class="modal-title-group">
        <h3><i class="fa-solid fa-ruler-combined" style="color: var(--color-primary); margin-right: 8px;"></i> Panduan Ukuran Jersey (Size Chart)</h3>
        <p>Standar Athletic Fit Dewasa (Toleransi Ukuran ±1-2 cm)</p>
      </div>
      <button class="modal-close-btn" id="sizeChartCloseBtn">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="modal-body">
      <table class="size-chart-table">
        <thead>
          <tr>
            <th>Ukuran</th>
            <th>Lebar Dada (cm)</th>
            <th>Panjang Baju (cm)</th>
            <th>Rekomendasi Berat (kg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>XS</strong></td>
            <td>46 cm</td>
            <td>66 cm</td>
            <td>45 - 52 kg</td>
          </tr>
          <tr>
            <td><strong>S</strong></td>
            <td>48 cm</td>
            <td>68 cm</td>
            <td>53 - 62 kg</td>
          </tr>
          <tr>
            <td><strong>M</strong> (Standar)</td>
            <td>50 cm</td>
            <td>70 cm</td>
            <td>63 - 72 kg</td>
          </tr>
          <tr>
            <td><strong>L</strong></td>
            <td>52 cm</td>
            <td>72 cm</td>
            <td>73 - 82 kg</td>
          </tr>
          <tr>
            <td><strong>XL</strong></td>
            <td>54 cm</td>
            <td>74 cm</td>
            <td>83 - 92 kg</td>
          </tr>
          <tr>
            <td><strong>XXL</strong></td>
            <td>56 cm</td>
            <td>76 cm</td>
            <td>93 - 105 kg</td>
          </tr>
        </tbody>
      </table>
      <p class="form-hint" style="margin-top: 14px;">
        *Tips: Jika Anda menyukai jersey yang lebih leluasa saat berlari, kami menyarankan memilih 1 tingkat ukuran lebih besar.
      </p>
    </div>

    <div class="modal-footer" style="justify-content: flex-end;">
      <button class="btn btn-secondary btn-sm" id="sizeChartOkBtn">Tutup</button>
    </div>
  </div>
</div>

<!-- =========================================================================
     MODAL 5: DETAIL LENGKAP & RINCIAN TIKET
     ========================================================================= -->
<div class="modal-overlay" id="ticketDetailModal">
  <div class="modal-container" style="max-width: 760px;">
    <div class="modal-header">
      <div class="modal-title-group">
        <h3 id="tdModalTitle"><i class="fa-solid fa-circle-info" style="color: var(--color-primary); margin-right: 8px;"></i> Rincian Lengkap Tiket</h3>
        <p id="tdModalCategory">Kategori Lari & Fasilitas Resmi </p>
      </div>
      <button class="modal-close-btn" id="ticketDetailCloseBtn">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="modal-body" id="ticketDetailBody">
      <div style="text-align: center; padding: 30px;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--color-primary);"></i>
        <p style="margin-top: 10px; color: var(--color-text-muted);">Memuat rincian tiket dari server...</p>
      </div>
    </div>

    <div class="modal-footer" style="justify-content: space-between;">
      <button class="btn btn-secondary btn-sm" id="ticketDetailCloseBtn2">Tutup</button>
      <button class="btn btn-primary btn-sm btn-glow" id="tdModalRegisterBtn">
        <i class="fa-solid fa-ticket"></i> Daftar Kategori Ini Sekarang
      </button>
    </div>
  </div>
</div>
`,ie=document.getElementById("app");ie&&(ie.innerHTML=`
    <div class="ambient-glow ambient-1"></div>
    <div class="ambient-glow ambient-2"></div>
    <div class="toast-container" id="toastContainer"></div>
    ${Je}
    ${Ye}
    ${it}
    ${Qe}
    ${Ze}
    ${et}
    ${tt}
    ${at}
    ${nt}
    ${Ve}
    ${Xe}
    ${st}
  `);const n={events:[],selectedEvent:null,currentStep:1,participantCount:1,isGlobalClosed:!0,manualRegistrationClosed:!1,globalRegistrationPhase:"UPCOMING",globalCountdownTarget:null,registrationOperatingHours:"",registrationClosedMessage:"",countdownTarget:null,countdownInterval:null,registrationTimerInterval:null,registrationDeadline:null,registrationWarningShown:!1,checkoutSubmitting:!1,registrationExpiredDuringSubmit:!1,countdownSettingsLoaded:!1,cmsHeroBadge:"",cmsStatsItems:null,cmsVisibility:{},cmsRouteMapUrl:"",cmsRouteMapImage:"",cmsRouteMapMode:"GMAPS",cmsRouteCheckpointMode:"MANUAL",cmsRouteCheckpointImage:"",cmsComingSoonTitle:"COMING SOON EVENT!",cmsComingSoonMessage:"Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!",cmsComingSoonImageUrl:"",feeSettings:{feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0,paymentTimerMinutes:30}};function ke(e){if(!e)return"";let t=String(e).trim().replace(/[\s\-()]/g,"");return t.startsWith("08")?"+628"+t.slice(2):t.startsWith("628")?"+"+t:t}function pe(e){!e||e._phoneFormatted||(e._phoneFormatted=!0,e.addEventListener("input",t=>{let a=t.target.value;a.startsWith("08")?t.target.value="+628"+a.substring(2):a.startsWith("628")&&(t.target.value="+628"+a.substring(3))}))}function C(e="success",t="",a=""){const o=document.getElementById("toastContainer");if(!o)return;const s=document.createElement("div");s.className=`toast toast-${e}`;const i={success:"fa-solid fa-circle-check",error:"fa-solid fa-triangle-exclamation",warning:"fa-solid fa-circle-exclamation"};s.innerHTML=`
    <div class="toast-icon">
      <i class="${i[e]||i.success}"></i>
    </div>
    <div class="toast-content">
      <h5>${E(t)}</h5>
      <p>${E(a)}</p>
    </div>
  `,o.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(40px)",setTimeout(()=>s.remove(),300)},4500)}function E(e){return e?e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function O(e){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e)}function xe(e){const t=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Jakarta",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(e);return["year","month","day"].map(a=>{var o;return(o=t.find(s=>s.type===a))==null?void 0:o.value}).join("-")}function ne(e,t=new Date){return!e||Number.isNaN(e.getTime())||t<e?"UPCOMING":xe(t)===xe(e)?"RACE_DAY":"COMPLETED"}function se(e=null){e!==void 0&&(n.countdownTarget=e);const t=document.getElementById("heroCountdown");t&&(t.hidden=!Number.isFinite(n.countdownTarget)),n.countdownInterval&&(clearInterval(n.countdownInterval),n.countdownInterval=null);const a=document.getElementById("days"),o=document.getElementById("hours"),s=document.getElementById("minutes"),i=document.getElementById("seconds"),r=t==null?void 0:t.querySelector(".countdown-grid");if(!n.countdownTarget||!Number.isFinite(Number(n.countdownTarget))){a&&(a.textContent="--"),o&&(o.textContent="--"),s&&(s.textContent="--"),i&&(i.textContent="--"),r==null||r.classList.remove("countdown-sold");return}function l(){const d=new Date().getTime(),g=n.countdownTarget-d;if(g<=0){a&&(a.textContent="S"),o&&(o.textContent="O"),s&&(s.textContent="L"),i&&(i.textContent="D"),r==null||r.classList.add("countdown-sold"),ge(),ne(new Date(n.countdownTarget))==="COMPLETED"&&n.countdownInterval&&(clearInterval(n.countdownInterval),n.countdownInterval=null);return}r==null||r.classList.remove("countdown-sold"),ge();const k=Math.floor(g/(1e3*60*60*24)),p=Math.floor(g%(1e3*60*60*24)/(1e3*60*60)),m=Math.floor(g%(1e3*60*60)/(1e3*60)),u=Math.floor(g%(1e3*60)/1e3),v=S=>String(S).padStart(2,"0");a&&(a.textContent=v(k)),o&&(o.textContent=v(p)),s&&(s.textContent=v(m)),i&&(i.textContent=v(u))}l(),n.countdownInterval=setInterval(l,1e3)}async function ot(){const e=document.getElementById("eventDateDisplay"),t=document.getElementById("heroCountdown");try{const a=await X.getCountdownSettings();if(n.countdownSettingsLoaded=!!(a!=null&&a.eventCountdownDate),n.globalCountdownTarget=a!=null&&a.eventCountdownDate?new Date(a.eventCountdownDate).getTime():null,a&&a.eventCountdownDate){const o=new Date(a.eventCountdownDate);if(isNaN(o.getTime()))e&&(t&&(t.hidden=!0),n.countdownTarget=null,n.countdownInterval&&(clearInterval(n.countdownInterval),n.countdownInterval=null),e.textContent="",e.classList.add("badge-pending-date"));else{n.countdownTarget!==o.getTime()&&se(o.getTime()),t&&(t.hidden=!1);const s=o.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),i=o.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});e&&(e.textContent=`${s.toUpperCase()} • ${i} WIB`,e.classList.remove("badge-pending-date"))}}else e&&(t&&(t.hidden=!0),n.countdownTarget=null,n.countdownInterval&&(clearInterval(n.countdownInterval),n.countdownInterval=null),e.textContent="",e.classList.add("badge-pending-date"));a&&(n.registrationOperatingHours=a.registrationOperatingHours||"",n.registrationClosedMessage=a.registrationClosedMessage||"",n.manualRegistrationClosed=a.manualRegistrationClosed===!0||String(a.manualRegistrationClosed).toLowerCase()==="true",ge(),oe(),V(),rt(a))}catch(a){console.warn("Gagal memuat pengaturan countdown dari backend:",a),n.isGlobalClosed=!0,n.manualRegistrationClosed=!0,n.globalRegistrationPhase="CLOSED",n.globalCountdownTarget=null,oe(),V(),n.countdownTarget=null,n.countdownInterval&&(clearInterval(n.countdownInterval),n.countdownInterval=null),e&&(e.textContent="",e.classList.add("badge-pending-date")),t&&(t.hidden=!0)}finally{if(!n.countdownSettingsLoaded){const a=n.events.map(o=>new Date(o.eventDate).getTime()).filter(o=>Number.isFinite(o)&&o>Date.now()).sort((o,s)=>o-s)[0];a&&se(a)}}}function ge(){const e=Number.isFinite(n.globalCountdownTarget)?new Date(n.globalCountdownTarget):null,t=ne(e);n.globalRegistrationPhase=t==="UPCOMING"&&n.manualRegistrationClosed?"CLOSED":t,n.isGlobalClosed=n.manualRegistrationClosed||t!=="UPCOMING",Ce()}function Ce(){const e=document.getElementById("registrationClosedNotice"),t=document.getElementById("registrationClosedNoticeMessage"),a=document.getElementById("registrationOperatingHoursNotice"),o=document.getElementById("footerRegistrationHours"),s=document.getElementById("footerRegistrationHoursValue");!e||!t||!a||(e.hidden=!n.isGlobalClosed,t.textContent=n.registrationClosedMessage||"Pendaftaran sedang ditutup untuk sementara.",a.textContent=n.registrationOperatingHours?`Jam operasional pendaftaran: ${n.registrationOperatingHours}`:"Informasi jam operasional akan diumumkan melalui kanal resmi.",a.hidden=!n.registrationOperatingHours,o&&s&&(s.textContent=n.registrationOperatingHours,o.hidden=!n.registrationOperatingHours))}function rt(e={}){const t=document.getElementById("siteMaintenancePage"),a=document.getElementById("siteMaintenanceTitle"),o=document.getElementById("siteMaintenanceType"),s=document.getElementById("siteMaintenanceMessage"),i=document.getElementById("siteMaintenanceExpectedEnd"),r=e.maintenanceEnabled===!0||String(e.maintenanceEnabled).toLowerCase()==="true";if(!t||!a||!o||!s||!i)return;const l={REPAIR:"PERBAIKAN SISTEM",ROUTINE:"PERAWATAN RUTIN",UPDATE:"PEMBARUAN SISTEM",OTHER:"INFORMASI LAYANAN"};a.textContent=e.maintenanceTitle||"Website Sedang Dalam Pemeliharaan",o.textContent=l[e.maintenanceType]||l.OTHER,s.textContent=e.maintenanceMessage||"Kami sedang melakukan pemeliharaan. Silakan kembali beberapa saat lagi.",e.maintenanceExpectedEnd&&!Number.isNaN(new Date(e.maintenanceExpectedEnd).getTime())?(i.textContent=`Perkiraan layanan kembali: ${new Date(e.maintenanceExpectedEnd).toLocaleString("id-ID",{dateStyle:"full",timeStyle:"short",timeZone:"Asia/Jakarta"})} WIB`,i.hidden=!1):(i.textContent="",i.hidden=!0),t.hidden=!r,ie&&(ie.hidden=r)}function oe(){const e=document.getElementById("heroStatusBadge"),t=document.getElementById("heroStatusText"),a=e==null?void 0:e.querySelector(".status-dot"),o=document.getElementById("heroCtaBtn"),s=document.getElementById("navDaftarBtn"),i=document.getElementById("dockDaftarBtn"),r=n.events.length>0&&n.events.every(z);if(Ce(),n.isGlobalClosed||r){const l=n.isGlobalClosed?n.globalRegistrationPhase==="RACE_DAY"?{label:"ACARA TELAH DIMULAI",color:"#F97316",icon:"fa-flag-checkered"}:n.globalRegistrationPhase==="COMPLETED"?{label:"EVENT TELAH SELESAI • SOLD",color:"#EF4444",icon:"fa-ticket-slash"}:{label:"PENDAFTARAN RESMI DITUTUP",color:"#EF4444",icon:"fa-lock"}:{label:"PENDAFTARAN KATEGORI DITUTUP",color:"#EF4444",icon:"fa-lock"};e&&(e.hidden=!1,e.style.borderColor=l.color),t&&(t.textContent=l.label,t.style.color=l.color),a&&(a.style.background=l.color,a.style.boxShadow=`0 0 8px ${l.color}`),o&&(o.disabled=!0,o.classList.remove("btn-glow"),o.classList.add("is-event-status"),o.innerHTML=`<i class="fa-solid ${l.icon}" aria-hidden="true"></i><span>${l.label}</span>`),s&&(s.disabled=!0,s.classList.remove("btn-glow"),s.classList.add("is-event-status"),s.innerHTML=`<i class="fa-solid ${l.icon}" aria-hidden="true"></i><span>${l.label}</span>`),i&&(i.style.opacity="0.6",i.style.pointerEvents="none"),n.events.length&&fe(n.events);return}e&&(e.hidden=!1,e.style.borderColor=""),t&&(t.textContent=n.cmsHeroBadge||"PENDAFTARAN RESMI DIBUKA",t.style.color=""),a&&(a.style.background="",a.style.boxShadow=""),o&&(o.disabled=!1,o.classList.remove("is-event-status"),o.classList.add("btn-glow"),o.innerHTML='<i class="fa-solid fa-ticket" aria-hidden="true"></i> Amankan Slot Lari Sekarang'),s&&(s.disabled=!1,s.classList.remove("is-event-status"),s.classList.add("btn-glow"),s.innerHTML='<i class="fa-solid fa-bolt"></i> Daftar Tiket'),i&&(i.style.opacity="",i.style.pointerEvents=""),n.events.length&&fe(n.events)}async function Te(){const e=document.getElementById("pageSkeleton");try{const t=await X.getEvents();n.events=Array.isArray(t)?t:[];const a=document.getElementById("heroCtaBtn");if(a&&(a.hidden=n.events.length===0),oe(),Me(n.cmsStatsItems),!n.countdownTarget&&!n.countdownSettingsLoaded){const s=n.events.map(i=>new Date(i.eventDate).getTime()).filter(i=>Number.isFinite(i)&&i>Date.now()).sort((i,r)=>i-r);s.length>0&&se(s[0])}try{const i=await(await ze("/settings/checkout-config")).json();i.status==="success"&&i.data&&(n.feeSettings=i.data)}catch{}const o=new URLSearchParams(window.location.search).get("register");if(o){const s=t.find(i=>i.id===o);s&&!z(s)&&!n.isGlobalClosed&&setTimeout(()=>re(s),400)}}catch(t){console.error("Failed to render events:",t)}finally{e&&setTimeout(()=>{e.classList.add("hide")},350)}}function fe(e){const t=document.getElementById("ticketsGrid");if(t){if(t.innerHTML="",!Array.isArray(e)||e.length===0){t.innerHTML=`
      <div style="text-align: center; grid-column: 1 / -1; padding: 60px 20px;">
        <i class="fa-solid fa-ticket-simple" style="font-size: 3rem; color: #94A3B8; margin-bottom: 16px;"></i>
        <h3 style="color: var(--color-text-title); font-size: 1.25rem; margin-bottom: 6px;">Tidak Ada Kategori Tiket</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Belum ada kategori lomba yang dibuka di database.</p>
      </div>
    `;return}e.forEach(a=>{const o=a.category==="10K",s=Number(a.remainingStock??a.stock??0),i=Number(a.totalCapacity??s+Number(a.registeredCount||0)),r=i>0?Math.max(0,Math.min(100,Math.round(s/i*100))):0,l=n.isGlobalClosed,d=a.registrationPhase||(a.eventDate?ne(new Date(a.eventDate)):"UPCOMING"),g=typeof a.registrationClosedByTimer=="boolean"?a.registrationClosedByTimer:d==="RACE_DAY"||d==="COMPLETED",p=(typeof a.registrationClosed=="boolean"?a.registrationClosed:!!a.isClosed||g)||l,m=n.globalRegistrationPhase==="RACE_DAY"?"ACARA TELAH DIMULAI":n.globalRegistrationPhase==="COMPLETED"?"SOLD":"PENDAFTARAN DITUTUP",u=l?m:d==="RACE_DAY"?"ACARA TELAH DIMULAI":d==="COMPLETED"?"SOLD":"PENDAFTARAN DITUTUP",v=a.eventDate?`${new Date(a.eventDate).toLocaleString("id-ID",{dateStyle:"long",timeStyle:"short",timeZone:"Asia/Jakarta"})} WIB`:"",S=l?n.globalRegistrationPhase:d,x=document.createElement("div");x.className=`glass-card ticket-card ticket-pass-card ${o?"featured":""} ${p?"event-closed-card ticket-sale-closed":""} ${l?"global-registration-closed":""} ${p?`registration-phase-${S.toLowerCase()}`:""}`;const b=Array.isArray(a.benefits)&&a.benefits.length>0?a.benefits.map(D=>D.name):[],h=b.length>0?b.map(D=>`
          <li class="benefit-item">
            <div class="benefit-icon"><i class="fa-solid fa-check"></i></div>
            <span>${E(D)}</span>
          </li>
        `).join(""):'<li class="benefit-item" style="color: var(--color-text-muted); font-style: italic;">Belum ada benefit tercantum</li>',I=a.ticketImage||a.medalImage,B=`
      <div class="ticket-card-banner${I?"":" ticket-card-banner-empty"}">
        ${I?`<img src="${E(I)}" alt="${E(a.ticketName)}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('ticket-card-banner-empty')">`:'<i class="fa-solid fa-person-running" aria-hidden="true"></i>'}
        <div class="ticket-card-banner-overlay">
          <span class="ticket-banner-badge"><i class="fa-solid fa-person-running"></i> ${E(a.category)} Marathon</span>
          ${a.medalImage?'<span class="ticket-banner-medal-badge"><i class="fa-solid fa-medal"></i> Medali Finisher</span>':""}
        </div>
      </div>
    `;x.innerHTML=`
      <!-- E-Tiket Stub Header -->
      <div class="ticket-stub-header">
        <div class="ticket-stub-brand">
          <i class="fa-solid fa-bolt" style="color: var(--color-primary);"></i> TEGAL RUN 2026
        </div>
        <div class="ticket-stub-tag">
          ${u==="SOLD"?'<span class="global-sold-stamp"><i class="fa-solid fa-ticket-slash"></i> SOLD</span>':p?`<span class="global-closed-stamp"><i class="${d==="RACE_DAY"||n.globalRegistrationPhase==="RACE_DAY"?"fa-solid fa-flag-checkered":"fa-solid fa-lock"}"></i> ${E(u)}</span>`:o?'<span style="color:#ff6b00;"><i class="fa-solid fa-fire"></i> POPULAR</span>':"<span>OFFICIAL PASS</span>"}
        </div>
      </div>

      ${B}

      <div class="ticket-header">
        <span class="ticket-category-tag">${E(a.category)} MARATHON PASS</span>
        <h3 class="ticket-title">${E(a.ticketName)}</h3>
        ${v?`<div class="ticket-event-date"><i class="fa-regular fa-calendar-check"></i> ${E(v)}${a.followGlobalTimer?'<span><i class="fa-solid fa-link"></i> Timer Global</span>':""}</div>`:""}
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
          <span class="stock-status" style="color: ${p?"#EF4444":"#10B981"};">
            <i class="${p?"fa-solid fa-lock":"fa-solid fa-fire"}"></i> 
            ${p?E(u):`${s} Tiket Tersedia`}
          </span>
        </div>
        <div class="stock-bar-bg">
          <div class="stock-bar-fill" style="width: ${p?100:r}%; background: ${p?"#EF4444":""};"></div>
        </div>
      </div>

      <ul class="ticket-benefits">
        ${h}
      </ul>

      <!-- Aesthetic Barcode Strip for Authentic Athletic Pass -->
      <div class="ticket-barcode-strip">
        <div class="ticket-barcode-lines"></div>
        <div class="ticket-barcode-serial">RACE PASS • VERIFIED PASI TIMING</div>
      </div>

      <div class="ticket-pass-actions" style="display: flex; gap: 8px; margin-top: auto; padding-top: 14px;">
        <button class="btn btn-secondary btn-sm btn-view-ticket-detail" data-id="${a.id}" ${l?'disabled aria-disabled="true" title="Detail tiket tidak tersedia saat pendaftaran ditutup"':'title="Lihat Fasilitas & Rincian Lengkap"'} style="flex: 1;">
          <i class="fa-solid ${l?"fa-lock":"fa-circle-info"}"></i> ${l?"Detail Ditutup":"Detail Tiket"}
        </button>
        <button class="btn ${p?"btn-secondary":"btn-primary btn-glow"} btn-sm btn-select-ticket" data-id="${a.id}" ${p?'disabled aria-disabled="true" title="Pendaftaran sedang ditutup"':""} style="flex: 1.3;">
          <i class="${p?"fa-solid fa-lock":"fa-solid fa-ticket"}"></i> 
          ${p?E(u):"Daftar Sekarang"}
        </button>
      </div>
    `,t.appendChild(x)}),document.querySelectorAll(".ticket-card").forEach(a=>{a.style.cursor=n.isGlobalClosed?"default":"pointer",a.addEventListener("click",o=>{if(n.isGlobalClosed||o.target.closest(".btn-select-ticket"))return;const s=a.querySelector(".btn-view-ticket-detail");if(s){const i=s.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${i}`}})}),document.querySelectorAll(".btn-view-ticket-detail").forEach(a=>{a.addEventListener("click",o=>{if(o.stopPropagation(),n.isGlobalClosed){o.preventDefault();return}const s=a.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${s}`})}),document.querySelectorAll(".btn-select-ticket").forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const s=a.getAttribute("data-id"),i=n.events.find(r=>r.id===s);!n.isGlobalClosed&&i&&!i.isClosed?re(i):n.isGlobalClosed&&C("error","Pendaftaran Ditutup","Seluruh pendaftaran saat ini ditutup oleh panitia.")})})}}function z(e){return typeof(e==null?void 0:e.registrationClosed)=="boolean"?e.registrationClosed:!!(e!=null&&e.isClosed)||ne(e!=null&&e.eventDate?new Date(e.eventDate):null)!=="UPCOMING"}function Ae(){var a;const e=[];Number.isFinite(n.globalCountdownTarget)&&e.push(n.globalCountdownTarget);const t=new Set([(a=n.selectedEvent)==null?void 0:a.id]);document.querySelectorAll(".p-event-select").forEach(o=>t.add(o.value)),t.delete(void 0);for(const o of t){const s=n.events.find(r=>r.id===o),i=s!=null&&s.eventDate?new Date(s.eventDate).getTime():NaN;Number.isFinite(i)&&e.push(i)}return e.length?Math.min(...e):null}function be(){var t;const e=new Set([(t=n.selectedEvent)==null?void 0:t.id]);return document.querySelectorAll(".p-event-select").forEach(a=>e.add(a.value)),e.delete(void 0),[...e].map(a=>n.events.find(o=>o.id===a)).filter(Boolean)}function lt(e){const t=Math.max(0,Math.floor(e/1e3)),a=t%60,o=Math.floor(t/60)%60,s=Math.floor(t/3600)%24,i=Math.floor(t/86400),r=[s,o,a].map(l=>String(l).padStart(2,"0")).join(":");return i>0?`${i} hari ${r}`:r}function te(){n.registrationTimerInterval&&(clearInterval(n.registrationTimerInterval),n.registrationTimerInterval=null),n.registrationDeadline=null}function V(){const e=document.getElementById("regModal"),t=document.getElementById("registrationTimeRemaining"),a=document.getElementById("registrationTimerMessage"),o=document.getElementById("btnModalSubmit");if(!(e!=null&&e.classList.contains("active"))||!t||!a)return;const s=Ae();if(n.registrationDeadline=s,n.isGlobalClosed||be().some(z)){if(n.checkoutSubmitting){n.registrationExpiredDuringSubmit=!0,a.textContent="Batas pendaftaran tercapai — memeriksa status",t.textContent="—",o&&(o.disabled=!0);return}te(),J(),C("warning","Pendaftaran Ditutup","Waktu pendaftaran telah berakhir. Formulir Anda dibatalkan dan belum dikirim.");return}if(!Number.isFinite(s)){t.textContent="—",a.textContent="Batas waktu pendaftaran belum ditentukan",t.classList.remove("urgent");return}const i=s-Date.now();if(i<=0){if(n.checkoutSubmitting){n.registrationExpiredDuringSubmit=!0,a.textContent="Batas pendaftaran tercapai — memeriksa status",t.textContent="—",t.classList.add("urgent"),o&&(o.disabled=!0);return}te(),o&&(o.disabled=!0),J(),C("warning","Pendaftaran Berakhir","Waktu pendaftaran telah habis. Formulir Anda dibatalkan dan belum dikirim.");return}t.textContent=lt(i),t.classList.toggle("urgent",i<600*1e3),a.textContent=i<600*1e3?"Pendaftaran akan segera ditutup":"Sisa waktu pendaftaran",i<600*1e3&&!n.registrationWarningShown&&(n.registrationWarningShown=!0,C("warning","Pendaftaran Hampir Ditutup","Waktu pendaftaran tersisa kurang dari 10 menit. Selesaikan formulir dan lanjutkan pembayaran segera."))}function dt(){var e;te(),n.registrationWarningShown=!1,n.registrationExpiredDuringSubmit=!1,V(),(e=document.getElementById("regModal"))!=null&&e.classList.contains("active")&&(n.registrationTimerInterval=setInterval(V,1e3))}function re(e=null){var i,r;if(n.isGlobalClosed){const l=n.globalRegistrationPhase==="RACE_DAY"?"Pendaftaran ditutup otomatis karena acara telah dimulai.":n.globalRegistrationPhase==="COMPLETED"?"Pendaftaran ditutup karena hari pelaksanaan acara telah lewat.":"Seluruh pendaftaran Tegal Run 2026 telah ditutup oleh panitia.";C("error","Pendaftaran Ditutup",l);return}const t=n.events.filter(l=>!z(l));if(t.length===0){const l=n.events.some(d=>typeof d.registrationClosedByTimer=="boolean"?d.registrationClosedByTimer:ne(d.eventDate?new Date(d.eventDate):null)!=="UPCOMING");C("error","Pendaftaran Ditutup",l?"Tanggal pelaksanaan seluruh kategori telah tiba atau lewat. Ubah tanggal kategori atau sinkronkan dengan timer global di halaman admin.":"Seluruh pendaftaran kategori event telah ditutup oleh panitia.");return}n.selectedEvent=e&&!z(e)?e:t[0],n.currentStep=1,n.participantCount=1;const a=document.getElementById("regModal");if(!a)return;Y();const o=document.getElementById("modalParticipantCount");o&&(o.value="1",(i=o._customSelectRefresh)==null||i.call(o));const s=document.getElementById("modalEventSelect");s&&(s.innerHTML=t.map(l=>`
      <option value="${l.id}" ${n.selectedEvent&&n.selectedEvent.id===l.id?"selected":""}>
        ${l.ticketName} - ${O(l.price)}
      </option>
    `).join(""),(r=s._customSelectRefresh)==null||r.call(s)),he(),ve(),ae(),a.classList.add("active"),document.body.style.overflow="hidden",dt(),X.getCheckoutConfig().then(l=>{l&&(n.feeSettings=l,ae())}).catch(()=>{})}function J(){Y(),te();const e=document.getElementById("regModal");e&&(e.classList.remove("active"),document.body.style.overflow="auto")}function he(){[1,2,3].forEach(s=>{const i=document.getElementById(`stepIndicator${s}`),r=document.getElementById(`stepSection${s}`);i&&(i.classList.remove("active","done"),s===n.currentStep&&i.classList.add("active"),s<n.currentStep&&i.classList.add("done")),r&&(r.style.display=s===n.currentStep?"block":"none")});const t=document.getElementById("btnModalPrev"),a=document.getElementById("btnModalNext"),o=document.getElementById("btnModalSubmit");t&&(t.style.display=n.currentStep>1?"inline-flex":"none"),a&&(a.style.display=n.currentStep<3?"inline-flex":"none"),o&&(o.style.display=n.currentStep===3?"inline-flex":"none")}function Be(){var s,i;const e=new Map(n.events.map(r=>[r.id,r]));let t=0;for(let r=0;r<n.participantCount;r++){const l=document.querySelector(`.p-event-select[data-index="${r}"]`),d=l?l.value:(s=n.selectedEvent)==null?void 0:s.id,g=e.get(d)||n.selectedEvent;g&&(t+=Number(g.price))}let a=0;(i=n.feeSettings)!=null&&i.feeEnabled&&n.feeSettings.feeAmount>0&&(n.feeSettings.feeType==="PER_TICKET"?a=n.feeSettings.feeAmount*n.participantCount:a=n.feeSettings.feeAmount);const o=t+a;return{ticketsSubtotal:t,serviceFee:a,grandTotal:o}}function ae(){var d;if(!n.selectedEvent)return;const{ticketsSubtotal:e,serviceFee:t,grandTotal:a}=Be(),o=document.getElementById("modalTotalAmount");o&&(o.textContent=O(a));const s=document.getElementById("step1TicketsSubtotal"),i=document.getElementById("step1FeeLabel"),r=document.getElementById("step1FeeAmount"),l=document.getElementById("step1GrandTotal");if(s&&(s.textContent=O(e)),r)if(t>0){if(r.textContent=`+ ${O(t)}`,r.style.color="#EA580C",i){const g=((d=n.feeSettings)==null?void 0:d.feeType)||"PER_TRANSACTION";i.textContent=`Biaya Layanan (${g==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`}}else r.textContent="Gratis (Rp 0)",r.style.color="#10B981",i&&(i.textContent="Biaya Layanan:");l&&(l.textContent=O(a))}function ee(){var r,l,d;if(!((r=document.getElementById("checkSameAsBooker"))==null?void 0:r.checked))return;const t=((l=document.getElementById("bookerName"))==null?void 0:l.value.trim())||"",a=((d=document.getElementById("bookerPhone"))==null?void 0:d.value.trim())||"",o=document.querySelector('.p-fullname[data-index="0"]'),s=document.querySelector('.p-phone[data-index="0"]'),i=document.querySelector('.p-bibname[data-index="0"]');o&&t&&(o.value=t),i&&t&&!i.value&&(i.value=t.substring(0,15).toUpperCase()),s&&a&&(s.value=a)}function ce(e){if(!e)return"";const[t,a,o]=e.split("-").map(Number);return new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"long",year:"numeric"}).format(new Date(t,a-1,o))}let we=!1;function ct(){we||(document.addEventListener("pointerdown",e=>{document.querySelectorAll(".birthdate-picker.is-open").forEach(t=>{var o;if(t.contains(e.target))return;t.classList.remove("is-open"),t.classList.remove("opens-up"),(o=t.querySelector(".birthdate-trigger"))==null||o.setAttribute("aria-expanded","false");const a=t.querySelector(".birthdate-popover");a==null||a.setAttribute("hidden",""),a&&(a.style.maxHeight="")})}),we=!0)}function Pe(e,t,a,o){const s=a.closest(".modal-body");if(!s)return;const i=e.getBoundingClientRect(),r=s.getBoundingClientRect(),l=r.bottom-i.bottom-12,d=i.top-r.top-12,g=Math.min(o,t.scrollHeight),k=l<g&&d>l,p=k?d:l;a.classList.toggle("opens-up",k),t.style.maxHeight=`${Math.max(120,Math.min(o,p-16))}px`}function ut(e){ct();const t=e.querySelector(".birthdate-picker"),a=t==null?void 0:t.querySelector(".p-birthdate"),o=t==null?void 0:t.querySelector(".birthdate-trigger"),s=t==null?void 0:t.querySelector(".birthdate-trigger-value"),i=t==null?void 0:t.querySelector(".birthdate-popover");if(!t||!a||!o||!s||!i)return;const r=new Date;r.setHours(0,0,0,0);const l=1900,d=r.getFullYear(),g=Array.from({length:12},(x,b)=>new Intl.DateTimeFormat("id-ID",{month:"long"}).format(new Date(2024,b,1))),k=["Min","Sen","Sel","Rab","Kam","Jum","Sab"];let p=a.value?new Date(`${a.value}T00:00:00`):null,m=p?new Date(p):new Date(r.getFullYear()-18,r.getMonth(),1),u="days",v=Math.min(d,Math.max(l,m.getFullYear()));const S=(x=!1)=>{const b=m.getFullYear(),h=m.getMonth(),I=new Date(b,h-1,1),B=new Date(b,h+1,1),D=I.getFullYear()>=l,N=B<=new Date(r.getFullYear(),r.getMonth(),1);if(u==="days"){const $=new Date(b,h,1).getDay(),T=new Date(b,h+1,0).getDate(),R=new Date(b,h,0).getDate(),q=Array.from({length:42},(F,c)=>{const f=c-$+1,w=f<1?new Date(b,h-1,R+f):f>T?new Date(b,h+1,f-T):new Date(b,h,f),A=[w.getFullYear(),String(w.getMonth()+1).padStart(2,"0"),String(w.getDate()).padStart(2,"0")].join("-"),P=w.getMonth()===h,_=p&&w.getFullYear()===p.getFullYear()&&w.getMonth()===p.getMonth()&&w.getDate()===p.getDate(),K=w.toDateString()===r.toDateString(),j=w>r||w.getFullYear()<l;return`<button type="button" class="birthdate-day${P?"":" is-outside"}${_?" is-selected":""}${K?" is-today":""}" data-action="select-day" data-date="${A}" aria-label="${ce(A)}"${_?' aria-pressed="true"':""}${j?" disabled":""}>${w.getDate()}</button>`}).join("");i.innerHTML=`
        <div class="birthdate-calendar-header">
          <button type="button" class="birthdate-nav-button" data-action="previous-month" aria-label="Bulan sebelumnya"${D?"":" disabled"}>
            <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
          <div class="birthdate-calendar-heading">
            <button type="button" class="birthdate-heading-button" data-action="show-months">${g[h]}</button>
            <button type="button" class="birthdate-heading-button birthdate-year-heading" data-action="show-years">${b}</button>
          </div>
          <button type="button" class="birthdate-nav-button" data-action="next-month" aria-label="Bulan berikutnya"${N?"":" disabled"}>
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
        <div class="birthdate-weekdays" aria-hidden="true">${k.map(F=>`<span>${F}</span>`).join("")}</div>
        <div class="birthdate-days-grid">${q}</div>
        <div class="birthdate-calendar-footer">
          <span><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Pilih tanggal lahir</span>
          <button type="button" data-action="today">Hari ini</button>
        </div>
      `}else if(u==="months")i.innerHTML=`
        <div class="birthdate-calendar-header birthdate-picker-header">
          <button type="button" class="birthdate-nav-button" data-action="previous-year" aria-label="Tahun sebelumnya"${b<=l?" disabled":""}>
            <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button type="button" class="birthdate-heading-button birthdate-year-heading" data-action="show-years">${b}</button>
          <button type="button" class="birthdate-nav-button" data-action="next-year" aria-label="Tahun berikutnya"${b>=d?" disabled":""}>
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
        <div class="birthdate-months-grid">${g.map(($,T)=>{const R=b===d&&T>r.getMonth();return`<button type="button" class="birthdate-month${T===h?" is-selected":""}" data-action="select-month" data-month="${T}"${R?" disabled":""}>${$}</button>`}).join("")}</div>
        <div class="birthdate-calendar-footer"><button type="button" data-action="show-days"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Kembali ke kalender</button></div>
      `;else{const $=Array.from({length:d-l+1},(T,R)=>d-R);i.innerHTML=`
        <div class="birthdate-calendar-header birthdate-picker-header">
          <button type="button" class="birthdate-nav-button" data-action="previous-year-page" aria-label="Tahun lebih lama"${v<=l?" disabled":""}>
            <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
          <span class="birthdate-years-title">Pilih tahun</span>
          <button type="button" class="birthdate-nav-button" data-action="next-year-page" aria-label="Tahun lebih baru"${v>=d?" disabled":""}>
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
        <div class="birthdate-years-list" role="listbox" aria-label="Pilih tahun lahir">
          ${$.map(T=>`<button type="button" role="option" aria-selected="${T===b}" class="birthdate-year-option${T===b?" is-selected":""}" data-action="select-year" data-year="${T}">${T}</button>`).join("")}
        </div>
        <div class="birthdate-calendar-footer"><button type="button" data-action="show-days"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Kembali ke kalender</button></div>
      `,x&&requestAnimationFrame(()=>{var T;return(T=i.querySelector(".birthdate-year-option.is-selected"))==null?void 0:T.scrollIntoView({block:"center"})})}};p&&(s.textContent=ce(a.value)),o.addEventListener("click",()=>{const x=o.getAttribute("aria-expanded")==="true";document.querySelectorAll('.birthdate-trigger[aria-expanded="true"]').forEach(b=>{var h,I,B;b.setAttribute("aria-expanded","false"),(h=b.closest(".birthdate-picker"))==null||h.classList.remove("is-open"),(B=(I=b.closest(".birthdate-picker"))==null?void 0:I.querySelector(".birthdate-popover"))==null||B.setAttribute("hidden","")}),!x&&(u="days",m=p?new Date(p):new Date(r.getFullYear()-18,r.getMonth(),1),o.setAttribute("aria-expanded","true"),t.classList.add("is-open"),i.removeAttribute("hidden"),S(),Pe(o,i,t,360))}),t.addEventListener("click",x=>{const b=x.target.closest("button[data-action]");if(!b||b.disabled)return;const h=b.dataset.action;if(h==="previous-month")m=new Date(m.getFullYear(),m.getMonth()-1,1);else if(h==="next-month")m=new Date(m.getFullYear(),m.getMonth()+1,1);else if(h==="show-months")u="months";else if(h==="show-years")u="years",v=m.getFullYear();else if(h==="previous-year"||h==="next-year")m=new Date(m.getFullYear()+(h==="previous-year"?-1:1),m.getMonth(),1);else if(h==="previous-year-page"||h==="next-year-page")v=Math.min(d,Math.max(l,v+(h==="previous-year-page"?-12:12))),m=new Date(v,m.getMonth(),1);else if(h==="select-month")m=new Date(m.getFullYear(),Number(b.dataset.month),1),u="days";else if(h==="select-year")m=new Date(Number(b.dataset.year),m.getMonth(),1),u="months";else if(h==="show-days")u="days";else if(h==="today"){b.dataset.date=[r.getFullYear(),String(r.getMonth()+1).padStart(2,"0"),String(r.getDate()).padStart(2,"0")].join("-"),b.dataset.action="select-day",b.click();return}else if(h==="select-day"){const I=b.dataset.date;p=new Date(`${I}T00:00:00`),a.value=I,s.textContent=ce(I),o.classList.add("has-value"),o.setAttribute("aria-expanded","false"),t.classList.remove("is-open"),t.classList.remove("opens-up"),i.style.maxHeight="",i.setAttribute("hidden",""),a.dispatchEvent(new Event("change",{bubbles:!0}));return}S(h==="show-years"||h==="previous-year-page"||h==="next-year-page")}),t.addEventListener("keydown",x=>{x.key==="Escape"&&o.getAttribute("aria-expanded")==="true"&&(o.setAttribute("aria-expanded","false"),t.classList.remove("is-open"),t.classList.remove("opens-up"),i.style.maxHeight="",i.setAttribute("hidden",""),o.focus())})}let ue=0;function le(e=document){e.querySelectorAll("select.form-select").forEach(t=>{var k;if(!t.closest("#regModal")||t.dataset.customSelect==="true")return;const a=document.createElement("div");a.className="custom-select";const o=t.parentNode;if(!o)return;o.insertBefore(a,t),a.appendChild(t),t.classList.add("form-select-native"),t.hidden=!0,t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.dataset.customSelect="true";const s=document.createElement("button");s.type="button",s.className="custom-select-trigger",s.id=`registrationSelectTrigger-${++ue}`,s.setAttribute("aria-haspopup","listbox"),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-required",String(t.required));const i=(k=t.closest(".form-group"))==null?void 0:k.querySelector(".form-label");i?(i.id||(i.id=`registrationSelectLabel-${ue}`),i.setAttribute("for",s.id),s.setAttribute("aria-labelledby",i.id)):s.setAttribute("aria-label",t.getAttribute("aria-label")||"Pilih opsi");const r=t.options[t.selectedIndex];s.innerHTML=`
      <span class="custom-select-icon" aria-hidden="true"><i class="${mt(t)}"></i></span>
      <span class="custom-select-value">${E((r==null?void 0:r.textContent.trim())||"Pilih opsi")}</span>
      <i class="fa-solid fa-chevron-down custom-select-chevron" aria-hidden="true"></i>
    `,a.appendChild(s);const l=document.createElement("div");l.className="custom-select-menu",l.setAttribute("role","listbox"),l.hidden=!0;const d=`custom-select-menu-${ue}`;l.id=d,s.setAttribute("aria-controls",d),a.appendChild(l);const g=()=>{var p;l.innerHTML=Array.from(t.options,(m,u)=>{const v=m.value===t.value,S=m.disabled;return`<button type="button" class="custom-select-option${v?" is-selected":""}" role="option" aria-selected="${v}" data-option-index="${u}"${S?" disabled":""}>
          <span>${E(m.textContent.trim())}</span>
          ${v?'<i class="fa-solid fa-check" aria-hidden="true"></i>':""}
        </button>`}).join(""),s.querySelector(".custom-select-value").textContent=((p=t.options[t.selectedIndex])==null?void 0:p.textContent.trim())||"Pilih opsi",s.disabled=t.disabled,s.classList.toggle("is-disabled",t.disabled),s.setAttribute("aria-disabled",String(t.disabled))};g(),s.addEventListener("click",()=>{const p=l.hidden;if(Y(),!p||t.disabled)return;l.hidden=!1,s.setAttribute("aria-expanded","true"),a.classList.add("is-open"),Pe(s,l,a,280);const m=l.querySelector(".is-selected:not(:disabled)")||l.querySelector(".custom-select-option:not(:disabled)");m==null||m.focus()}),l.addEventListener("click",p=>{const m=p.target.closest(".custom-select-option");if(!m||m.disabled)return;const u=t.options[Number(m.dataset.optionIndex)];u&&(t.value=u.value,t.dispatchEvent(new Event("change",{bubbles:!0})),g(),Y(),s.focus())}),l.addEventListener("keydown",p=>{var v,S;const m=[...l.querySelectorAll(".custom-select-option:not(:disabled)")],u=m.indexOf(document.activeElement);if(p.key==="Escape")Y(),s.focus();else if(p.key==="ArrowDown"||p.key==="ArrowUp"){p.preventDefault();const x=p.key==="ArrowDown"?1:-1;if(m.length){const b=u<0?x>0?0:m.length-1:(u+x+m.length)%m.length;(v=m[b])==null||v.focus()}}else(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),(S=document.activeElement)==null||S.click())}),t.addEventListener("change",g),t.addEventListener("input",g),t._customSelectRefresh=g})}function mt(e){return e.matches("#modalEventSelect, .p-event-select")?"fa-solid fa-person-running":e.matches("#modalParticipantCount")?"fa-solid fa-users":e.matches(".p-gender")?"fa-solid fa-venus-mars":e.matches(".p-blood")?"fa-solid fa-droplet":e.matches(".p-jersey")?"fa-solid fa-shirt":e.matches(".p-size")?"fa-solid fa-ruler-combined":"fa-solid fa-list-check"}function Y(){document.querySelectorAll("#regModal .custom-select.is-open").forEach(e=>{var a;e.classList.remove("is-open"),e.classList.remove("opens-up"),(a=e.querySelector(".custom-select-trigger"))==null||a.setAttribute("aria-expanded","false");const t=e.querySelector(".custom-select-menu");t&&(t.hidden=!0,t.style.maxHeight="")})}let Ee=!1;function pt(){Ee||(document.addEventListener("pointerdown",e=>{e.target.closest("#regModal .custom-select")||Y()}),document.addEventListener("keydown",e=>{var s;if(e.key!=="Tab")return;const t=document.querySelector("#regModal .custom-select.is-open"),a=t==null?void 0:t.querySelector(".custom-select-trigger"),o=(s=t==null?void 0:t.querySelector(".custom-select-menu"))==null?void 0:s.contains(document.activeElement);Y(),o&&(a==null||a.focus())}),Ee=!0)}function ve(){var o,s;const e=document.getElementById("participantsContainer");if(!e)return;e.innerHTML="";const t=n.events.filter(i=>!z(i)),a=((o=n.selectedEvent)==null?void 0:o.id)||(((s=t[0])==null?void 0:s.id)??"");for(let i=0;i<n.participantCount;i++){const r=document.createElement("div");r.className="participant-box",r.innerHTML=`
      <div class="participant-box-header">
        <h4><i class="fa-solid fa-user-tag"></i> Data Peserta #${i+1}</h4>
        ${n.participantCount>1?`<span class="badge">Peserta ${i+1}</span>`:""}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Kategori Lari / Tiket <span class="req">*</span></label>
          <select class="form-select p-event-select" required data-index="${i}">
            ${t.map(k=>`
              <option value="${k.id}" ${k.id===a?"selected":""}>
                ${E(k.ticketName)} - ${O(k.price)}
              </option>
            `).join("")}
          </select>
          <div class="form-hint">Dapat memilih kategori lari berbeda untuk peserta ini.</div>
        </div>

        <div class="form-group">
          <label class="form-label">Nomor WhatsApp Peserta (Aktif) <span class="req">*</span></label>
          <input type="tel" class="form-input p-phone" required placeholder="Contoh: 081234567890" data-index="${i}">
          <div class="form-hint">Wajib nomor aktif untuk pengiriman QR E-Tiket pelari.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Lengkap (Sesuai KTP) <span class="req">*</span></label>
          <input type="text" class="form-input p-fullname" required placeholder="Contoh: Budi Santoso" data-index="${i}">
        </div>
        <div class="form-group">
          <label class="form-label">Nama BIB (Maks. 15 Karakter) <span class="req">*</span></label>
          <input type="text" maxlength="15" class="form-input p-bibname" required placeholder="Contoh: BUDI S" data-index="${i}">
          <div class="form-hint">Akan dicetak pada nomor dada Anda.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">NIK (16 Digit Angka) <span class="req">*</span></label>
          <input type="text" maxlength="16" class="form-input p-nik" required placeholder="3328xxxxxxxxxxxx" data-index="${i}">
          <div class="form-hint">Validasi KTP format resmi Disdukcapil (UU PDP).</div>
        </div>
        <div class="form-group">
          <label class="form-label">Jenis Kelamin <span class="req">*</span></label>
          <select class="form-select p-gender" required data-index="${i}">
            <option value="MALE">Laki-Laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Tempat Lahir <span class="req">*</span></label>
          <input type="text" class="form-input p-birthplace" required placeholder="Contoh: Tegal" data-index="${i}">
        </div>
        <div class="form-group">
          <label class="form-label" id="participantBirthdateLabel-${i}">Tanggal Lahir <span class="req">*</span></label>
          <div class="birthdate-picker">
            <input type="hidden" class="p-birthdate" required data-index="${i}">
            <button type="button" class="birthdate-trigger" id="participantBirthdateTrigger-${i}" aria-labelledby="participantBirthdateLabel-${i} participantBirthdateValue-${i}" aria-haspopup="dialog" aria-expanded="false">
              <span class="birthdate-trigger-icon"><i class="fa-solid fa-calendar-days" aria-hidden="true"></i></span>
              <span class="birthdate-trigger-copy">
                <span class="birthdate-trigger-caption">Tanggal lahir peserta</span>
                <strong class="birthdate-trigger-value" id="participantBirthdateValue-${i}">Pilih tanggal</strong>
              </span>
              <i class="fa-solid fa-chevron-down birthdate-trigger-chevron" aria-hidden="true"></i>
            </button>
            <div class="birthdate-popover" role="dialog" aria-label="Pilih tanggal lahir" hidden></div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Alamat Lengkap (Domisili KTP) <span class="req">*</span></label>
        <textarea rows="2" class="form-textarea p-address" required placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" data-index="${i}"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Golongan Darah (Untuk Medis) <span class="req">*</span></label>
          <select class="form-select p-blood" required data-index="${i}">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O" selected>O</option>
          </select>
        </div>
        <div class="form-group p-jersey-fields" data-index="${i}"></div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Kontak Darurat <span class="req">*</span></label>
          <input type="text" class="form-input p-emg-name" required placeholder="Nama Keluarga / Kerabat" data-index="${i}">
        </div>
        <div class="form-group">
          <label class="form-label">No. HP Kontak Darurat (Format +628) <span class="req">*</span></label>
          <input type="text" class="form-input p-emg-phone" required placeholder="+628123456789" data-index="${i}">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Komunitas Lari (Opsional)</label>
          <input type="text" class="form-input p-community" placeholder="Contoh: Tegal Runners Club" data-index="${i}">
        </div>
        <div class="form-group">
          <label class="form-label">Riwayat Penyakit / Alergi (Opsional)</label>
          <input type="text" class="form-input p-medical" placeholder="Asma, Alergi, dsb (Jika ada)" data-index="${i}">
        </div>
      </div>
    `,e.appendChild(r),ut(r);const l=r.querySelector(".p-phone"),d=r.querySelector(".p-emg-phone");pe(l),pe(d);const g=r.querySelector(".p-event-select");ye(r,i,(g==null?void 0:g.value)||a),le(r),g==null||g.addEventListener("change",()=>{ye(r,i,g.value),ae()})}ee()}function gt(e){if(Array.isArray(e==null?void 0:e.sizes))return e.sizes.filter(t=>typeof t=="string"&&t.trim());if(typeof(e==null?void 0:e.sizes)=="string")try{const t=JSON.parse(e.sizes);return Array.isArray(t)?t.filter(a=>typeof a=="string"&&a.trim()):[]}catch(t){console.warn("Ukuran jersey dari backend tidak valid:",t)}return[]}function ye(e,t,a,o="",s=""){var m;const i=e.querySelector(".p-jersey-fields");if(!i)return;const r=n.events.find(u=>u.id===a),l=Array.isArray(r==null?void 0:r.jerseys)?r.jerseys:[];if(l.length===0){i.innerHTML=`
      <label class="form-label" for="participantSize-${t}">Ukuran Jersey Resmi</label>
      <select class="form-select p-size" id="participantSize-${t}" data-index="${t}">
        <option value="XS">XS (46 x 66 cm)</option>
        <option value="S">S (48 x 68 cm)</option>
        <option value="M" selected>M (50 x 70 cm)</option>
        <option value="L">L (52 x 72 cm)</option>
        <option value="XL">XL (54 x 74 cm)</option>
        <option value="XXL">XXL (56 x 76 cm)</option>
      </select>
      <div class="form-hint">Ukuran jersey standar event.</div>
    `,le(i);return}const d=l.find(u=>u.id===o)||l[0],g=gt(d),k=l.length>1?`<label class="form-label" for="participantJersey-${t}">Tipe Jersey</label>
       <select class="form-select p-jersey" id="participantJersey-${t}" data-index="${t}" required>
         ${l.map(u=>`<option value="${E(u.id)}" ${u.id===d.id?"selected":""}>${E(u.name)} — ${E(u.type)}</option>`).join("")}
       </select>`:`<input type="hidden" class="p-jersey-id" data-index="${t}" value="${E(d.id)}">
       <label class="form-label">Tipe Jersey</label>
       <div class="participant-jersey-type"><i class="fa-solid fa-shirt" aria-hidden="true"></i> ${E(d.name)} — ${E(d.type)}</div>`,p=d.image?`<img class="participant-jersey-preview" src="${E(d.image)}" alt="Pratinjau ${E(d.name)}" loading="lazy" onerror="this.hidden=true">`:"";i.innerHTML=`
    ${k}
    <label class="form-label" for="participantSize-${t}" style="margin-top:8px;">Ukuran Jersey Resmi</label>
    <select class="form-select p-size" id="participantSize-${t}" data-index="${t}" required ${g.length?"":"disabled"}>
      ${g.map(u=>`<option value="${E(u)}" ${u===s?"selected":""}>${E(u)}</option>`).join("")}
    </select>
    ${g.length?"":'<div class="form-hint">Ukuran untuk tipe ini belum tersedia. Hubungi panitia.</div>'}
    ${p}
  `,le(i),(m=i.querySelector(".p-jersey"))==null||m.addEventListener("change",u=>{var S;const v=((S=i.querySelector(".p-size"))==null?void 0:S.value)||"";ye(e,t,a,u.target.value,v)})}function ft(e){var t,a,o,s,i,r,l,d,g,k,p,m;if(e===1){const u=(t=document.getElementById("bookerName"))==null?void 0:t.value.trim(),v=(a=document.getElementById("bookerEmail"))==null?void 0:a.value.trim(),S=(o=document.getElementById("bookerPhone"))==null?void 0:o.value.trim();return!u||u.length<3?(C("error","Validasi Gagal","Nama pemesan minimal 3 karakter."),!1):!v||!v.includes("@")?(C("error","Validasi Gagal","Email pemesan tidak valid."),!1):!S||!/^(\+62|62|08)\d{8,13}$/.test(S.replace(/\s+/g,""))?(C("error","Validasi Gagal","Nomor WhatsApp tidak valid (gunakan awalan 08 atau +628, min 10 digit)."),!1):(ee(),!0)}if(e===2){for(let u=0;u<n.participantCount;u++){const v=(s=document.querySelector(`.p-fullname[data-index="${u}"]`))==null?void 0:s.value.trim(),S=(i=document.querySelector(`.p-phone[data-index="${u}"]`))==null?void 0:i.value.trim(),x=(r=document.querySelector(`.p-bibname[data-index="${u}"]`))==null?void 0:r.value.trim(),b=(l=document.querySelector(`.p-nik[data-index="${u}"]`))==null?void 0:l.value.trim(),h=(d=document.querySelector(`.p-birthplace[data-index="${u}"]`))==null?void 0:d.value.trim(),I=(g=document.querySelector(`.p-birthdate[data-index="${u}"]`))==null?void 0:g.value.trim(),B=(k=document.querySelector(`.p-address[data-index="${u}"]`))==null?void 0:k.value.trim(),D=(p=document.querySelector(`.p-emg-name[data-index="${u}"]`))==null?void 0:p.value.trim(),N=(m=document.querySelector(`.p-emg-phone[data-index="${u}"]`))==null?void 0:m.value.trim();if(!v||v.length<3)return C("error",`Peserta #${u+1}`,"Nama lengkap KTP minimal 3 karakter."),!1;if(!S||!/^(\+62|62|08)\d{7,12}$/.test(S.replace(/\s+/g,"")))return C("error",`Peserta #${u+1}`,"Nomor WhatsApp peserta wajib diisi (contoh: 08123456789 atau +628123456789)."),!1;if(!x||x.length>15)return C("error",`Peserta #${u+1}`,"Nama BIB maksimal 15 karakter."),!1;if(!b||!/^\d{16}$/.test(b))return C("error",`Peserta #${u+1}`,"NIK harus tepat 16 digit angka sesuai KTP."),!1;if(!h||h.length<3)return C("error",`Peserta #${u+1}`,"Tempat lahir wajib diisi."),!1;if(!I)return C("error",`Peserta #${u+1}`,"Tanggal lahir wajib diisi."),!1;if(!B||B.length<10)return C("error",`Peserta #${u+1}`,"Alamat lengkap wajib diisi minimal 10 karakter."),!1;if(!D||D.length<3)return C("error",`Peserta #${u+1}`,"Nama kontak darurat wajib diisi."),!1;if(!N||!/^(\+62|62|08)\d{7,12}$/.test(N.replace(/\s+/g,"")))return C("error",`Peserta #${u+1}`,"Nomor kontak darurat harus diawali 08 atau +628."),!1}return!0}return!0}function bt(){var g,k,p,m,u,v,S;const e=document.getElementById("summaryReviewBox");if(!e||!n.selectedEvent)return;const t=(g=document.getElementById("bookerName"))==null?void 0:g.value.trim(),a=(k=document.getElementById("bookerEmail"))==null?void 0:k.value.trim(),o=(p=document.getElementById("bookerPhone"))==null?void 0:p.value.trim(),{ticketsSubtotal:s,serviceFee:i,grandTotal:r}=Be(),l=new Map(n.events.map(x=>[x.id,x]));let d="";for(let x=0;x<n.participantCount;x++){const b=((m=document.querySelector(`.p-fullname[data-index="${x}"]`))==null?void 0:m.value.trim())||`Peserta #${x+1}`,h=((u=document.querySelector(`.p-event-select[data-index="${x}"]`))==null?void 0:u.value)||n.selectedEvent.id,I=l.get(h)||n.selectedEvent,B=((v=document.querySelector(`.p-phone[data-index="${x}"]`))==null?void 0:v.value.trim())||"-";d+=`
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 6px 0; border-bottom: 1px dotted #CBD5E1;">
        <div>
          <strong>#${x+1} ${E(b)}</strong> (${E(B)})<br>
          <span style="color: #64748B; font-size: 0.78rem;">Kategori: ${E(I.ticketName)}</span>
        </div>
        <span style="font-weight: 700; color: #0F172A;">${O(I.price)}</span>
      </div>
    `}e.innerHTML=`
    <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 18px;">
      <h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-receipt"></i> Ringkasan Tiket & Pemesan</h4>
      <p style="font-size: 0.88rem; margin-bottom: 4px;"><strong>Penanggung Jawab:</strong> ${E(t)}</p>
      <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 12px;">${E(a)} | ${E(o)}</p>

      <div style="margin-bottom: 14px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: #475569; text-transform: uppercase;">Rincian Peserta:</span>
        <div style="margin-top: 6px;">
          ${d}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 8px;">
        <span style="color: #64748B;">Subtotal Tiket:</span>
        <strong>${O(s)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 4px; ${i>0?"color: #EA580C;":"color: #10B981;"}">
        <span>Biaya Layanan (${((S=n.feeSettings)==null?void 0:S.feeType)==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):</span>
        <strong>${i>0?`+ ${O(i)}`:"Gratis (Rp 0)"}</strong>
      </div>
      <div style="border-top: 1px solid var(--color-border-subtle); margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: var(--color-text-title);">
        <span>Total Pembayaran:</span>
        <span style="color: var(--color-primary);">${O(r)}</span>
      </div>
    </div>
  `}async function ht(){var S,x,b,h,I,B,D,N,$,T,R,q,F,c,f,w,A,P,_,K,j,Z;const e=Ae();if(n.isGlobalClosed||be().some(z)||Number.isFinite(e)&&Date.now()>=e){V();return}const t=(S=document.getElementById("checkConsentPDP"))==null?void 0:S.checked,a=(x=document.getElementById("checkConsentWaiver"))==null?void 0:x.checked;if(!t){C("warning","Persetujuan Diperlukan","Harap setujui Pemrosesan Data Pribadi sesuai UU PDP No. 27/2022.");return}if(!a){C("warning","Persetujuan Diperlukan","Harap setujui Pelepasan Tanggung Jawab Medis (Liability Waiver).");return}const o=[];for(let y=0;y<n.participantCount;y++){const M=((b=document.querySelector(`.p-event-select[data-index="${y}"]`))==null?void 0:b.value)||n.selectedEvent.id,L=(h=document.querySelector(`.p-fullname[data-index="${y}"]`))==null?void 0:h.value.trim(),U=ke((I=document.querySelector(`.p-phone[data-index="${y}"]`))==null?void 0:I.value.trim()),H=(B=document.querySelector(`.p-bibname[data-index="${y}"]`))==null?void 0:B.value.trim().toUpperCase(),G=(D=document.querySelector(`.p-nik[data-index="${y}"]`))==null?void 0:D.value.trim(),de=(N=document.querySelector(`.p-gender[data-index="${y}"]`))==null?void 0:N.value,De=($=document.querySelector(`.p-birthplace[data-index="${y}"]`))==null?void 0:$.value.trim(),$e=(T=document.querySelector(`.p-birthdate[data-index="${y}"]`))==null?void 0:T.value.trim(),Ne=(R=document.querySelector(`.p-address[data-index="${y}"]`))==null?void 0:R.value.trim(),Re=(q=document.querySelector(`.p-blood[data-index="${y}"]`))==null?void 0:q.value,Fe=(F=document.querySelector(`.p-size[data-index="${y}"]`))==null?void 0:F.value,qe=((c=document.querySelector(`.p-jersey[data-index="${y}"]`))==null?void 0:c.value)||((f=document.querySelector(`.p-jersey-id[data-index="${y}"]`))==null?void 0:f.value)||null,_e=(w=document.querySelector(`.p-emg-name[data-index="${y}"]`))==null?void 0:w.value.trim(),Oe=ke((A=document.querySelector(`.p-emg-phone[data-index="${y}"]`))==null?void 0:A.value.trim()),Ue=((P=document.querySelector(`.p-community[data-index="${y}"]`))==null?void 0:P.value.trim())||null,He=((_=document.querySelector(`.p-medical[data-index="${y}"]`))==null?void 0:_.value.trim())||null;o.push({eventId:M,fullNameKtp:L,phoneNumber:U,bibName:H,nik:G,gender:de,birthPlace:De,birthDate:$e,fullAddress:Ne,bloodType:Re,jerseyId:qe,selectedSize:Fe,emergencyContactName:_e,emergencyContactPhone:Oe,communityName:Ue,medicalHistory:He})}const s=((K=document.getElementById("bookerName"))==null?void 0:K.value.trim())||"",i=((j=document.getElementById("bookerEmail"))==null?void 0:j.value.trim())||"",r=((Z=document.getElementById("bookerPhone"))==null?void 0:Z.value.trim())||"";if(!i||!r){C("warning","Data Pemesan Kurang","Harap lengkapi Nama, Email aktif, dan Nomor WhatsApp penanggung jawab.");return}const l={bookerName:s,bookerEmail:i,bookerPhone:r,eventId:n.selectedEvent.id,participants:o},d=document.getElementById("btnModalSubmit");d&&(d.disabled=!0,d.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses Pesanan...'),C("warning","Menghubungkan Server","Mengamankan slot tiket Anda ke sistem database..."),n.checkoutSubmitting=!0,n.registrationExpiredDuringSubmit=!1;const g=await X.registerOrder(l);if(n.checkoutSubmitting=!1,d&&(d.disabled=!1,d.innerHTML='<i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)'),!g.success){if(n.registrationExpiredDuringSubmit||Number.isFinite(n.registrationDeadline)&&Date.now()>=n.registrationDeadline||n.isGlobalClosed||be().some(z)){J(),C("warning","Pendaftaran Berakhir",g.message||"Waktu pendaftaran telah habis. Formulir Anda dibatalkan.");return}C("error","Gagal Memesan Tiket",g.message);return}te(),C("success","Slot Tiket Diamankan!","Membuka gerbang pembayaran resmi Midtrans Snap...");const{paymentToken:k,paymentUrl:p,orderId:m,midtransOrderId:u}=g.data,v=m||u;try{await Ke()}catch(y){C("error","Gateway Pembayaran Tidak Tersedia",y.message),window.location.href=`/payment.html?orderId=${encodeURIComponent(v)}`;return}window.snap&&typeof window.snap.pay=="function"?window.snap.pay(k,{onSuccess:function(){C("success","Pembayaran Berhasil!","Selamat! Membuka E-Tiket resmi Anda..."),J(),Te(),setTimeout(()=>{window.location.href=`/e-ticket.html?orderId=${v}`},1200)},onPending:function(){C("warning","Menunggu Pembayaran","Mengarahkan ke halaman rincian instruksi pembayaran..."),J(),setTimeout(()=>{window.location.href=`/payment.html?orderId=${v}`},1200)},onError:function(){C("error","Pembayaran Gagal","Transaksi dibatalkan atau kedaluwarsa.")},onClose:function(){C("warning","Transaksi Tertunda","Mengarahkan ke halaman instruksi pembayaran & pembatalan..."),setTimeout(()=>{window.location.href=`/payment.html?orderId=${v}`},1e3)}}):p&&window.open(p,"_blank")}function me(e){const t=document.getElementById(e);t&&(t.classList.add("active"),document.body.style.overflow="hidden")}function Q(e){const t=document.getElementById(e);t&&(t.classList.remove("active"),document.body.style.overflow="auto")}function Me(e){const t=document.getElementById("statsBanner");if(!t||!Array.isArray(e))return;const a=Array.isArray(n.events)?n.events:[];e=e.filter(i=>!i||typeof i!="object"||i.visible===!1||!!!String(i.unit||i.desc||"").trim()?!1:i.type==="AUTO"?["TOTAL_PARTICIPANTS","PAID_PARTICIPANTS","TOTAL_CATEGORIES","TOTAL_CAPACITY","AVAILABLE_SLOTS"].includes(i.autoKey):String(i.val??"").trim()!==""),t.replaceChildren(),t.hidden=e.length===0||n.cmsVisibility.stats===!1;const o=a.reduce((i,r)=>(i.participants+=Number(r.registeredCount||0),i.paid+=Number(r.paidCount||0),i.capacity+=Number(r.totalCapacity??Number(r.remainingStock??r.stock??0)+Number(r.registeredCount||0)),i.available+=Number(r.remainingStock??r.stock??0),i),{participants:0,paid:0,capacity:0,available:0}),s={TOTAL_PARTICIPANTS:o.participants,PAID_PARTICIPANTS:o.paid,TOTAL_CATEGORIES:a.length,TOTAL_CAPACITY:o.capacity,AVAILABLE_SLOTS:o.available};e.forEach((i,r)=>{const l=i.type==="AUTO"&&Object.hasOwn(s,i.autoKey),d=l?s[i.autoKey]:i.val,g=l?Number(d||0).toLocaleString("id-ID"):d,k=document.createElement("div");k.className="stat-item";const p=typeof i.icon=="string"&&/^[a-z0-9-]+$/.test(i.icon)?i.icon:"fa-chart-simple",m=document.createElement("span");m.className="stat-icon";const u=document.createElement("i");u.className=`fa-solid ${p}`,u.setAttribute("aria-hidden","true"),m.append(u);const v=document.createElement("div");v.className="stat-num",r<4&&(v.id=`statVal${r+1}`);const S=document.createElement("span");S.textContent=g==null?"":String(g);const x=document.createElement("small");x.textContent=i.unit||"",r<4&&(x.id=`statUnit${r+1}`),v.append(S,document.createTextNode(" "),x);const b=document.createElement("div");b.className="stat-desc",b.textContent=i.desc||"",r<4&&(b.id=`statDesc${r+1}`),k.append(m,v,b),t.append(k)})}function Le(e,t){const a=document.querySelector("#rute .route-visual-card");if(!a)return;const o=String(e||"").trim(),s=n.cmsRouteMapMode;let i="";if(s==="GMAPS"&&o){const l=o.match(/src=["']([^"']+)["']/i),d=(l==null?void 0:l[1])||o;try{const g=new URL(d),k=g.hostname.toLowerCase(),p=k==="google.com"||k.endsWith(".google.com")||k==="maps.app.goo.gl"||k==="goo.gl";g.protocol==="https:"&&p&&(i=k.endsWith("google.com")&&g.pathname.startsWith("/maps/embed")?g.href:`https://www.google.com/maps?q=${encodeURIComponent(d)}&output=embed`)}catch(g){console.warn("Link Google Maps CMS tidak valid:",g)}}a.replaceChildren();const r=document.createElement("div");if(r.className="route-badge-float",r.innerHTML=s==="IMAGE"?'<i class="fa-solid fa-map"></i> Peta Rute':'<i class="fa-solid fa-location-dot"></i> Rute & Lokasi Google Maps',a.append(r),i){const l=document.createElement("div");l.className="gmaps-responsive-wrapper";const d=document.createElement("iframe");d.src=i,d.title="Peta rute lari",d.allowFullscreen=!0,d.loading="lazy",d.referrerPolicy="no-referrer-when-downgrade",l.append(d),a.append(l)}else if(s==="IMAGE"&&t){const l=document.createElement("img");l.className="route-map-image",l.src=t,l.alt="Gambar peta rute lari",l.loading="lazy",a.append(l)}else{const l=document.createElement("p");l.className="route-map-empty",l.textContent="Peta rute belum tersedia.",a.append(l)}}function vt(e){const t=document.getElementById("faq"),a=document.getElementById("faqList"),o=document.getElementById("faqComingSoon");if(!t||!a||!o)return;let s=e;if(typeof s=="string")try{s=JSON.parse(s)}catch(r){console.warn("Data FAQ CMS tidak valid:",r),a.replaceChildren(),a.hidden=!0,o.textContent="FAQ tidak dapat dimuat.",o.hidden=!1;return}if(!Array.isArray(s)){console.warn("Data FAQ CMS tidak berbentuk daftar."),a.replaceChildren(),a.hidden=!0,o.textContent="FAQ tidak dapat dimuat.",o.hidden=!1;return}const i=s.filter(r=>r&&typeof r=="object"&&r.enabled!==!1&&String(r.question||"").trim()&&String(r.answer||"").trim());a.replaceChildren(),o.textContent="EVENT COMING SOON!",o.hidden=i.length>0,a.hidden=i.length===0,i.forEach((r,l)=>{const d=document.createElement("article");d.className=`faq-item${l===0?" active":""}`,d.innerHTML=`
      <button class="faq-question" type="button" aria-expanded="${l===0}">
        <span>${E(r.question)}</span>
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div class="faq-answer-wrapper">
        <div class="faq-answer">${E(r.answer)}</div>
      </div>
    `,a.append(d)})}function yt(e){const t=document.getElementById("siteComingSoon");if(!t)return;const o=["hero","stats","route","facilities","tickets","legal","faq","footer"].every(g=>e[g]===!1);t.hidden=!o;const s=document.querySelector(".mobile-bottom-dock");if(s&&(s.hidden=o),!o)return;const i=document.getElementById("comingSoonTitle"),r=document.getElementById("comingSoonMessage"),l=document.getElementById("comingSoonImage"),d=document.getElementById("comingSoonImageFallback");i&&(i.textContent=n.cmsComingSoonTitle),r&&(r.textContent=n.cmsComingSoonMessage,r.hidden=!n.cmsComingSoonMessage),!(!l||!d)&&(l.onerror=()=>{l.hidden=!0,d.hidden=!1},n.cmsComingSoonImageUrl?(l.alt=n.cmsComingSoonTitle,l.src=n.cmsComingSoonImageUrl,l.hidden=!1,d.hidden=!0):(l.removeAttribute("src"),l.hidden=!0,d.hidden=!1))}function Se(e,t){if(!e||typeof t!="string")return;const a=document.createDocumentFragment();let o=null;t.split(/\r?\n/).forEach(s=>{const i=s.trim();if(!i){o=null;return}if(i.startsWith("- ")){o||(o=document.createElement("ul"),a.appendChild(o));const d=document.createElement("li");d.textContent=i.slice(2).trim(),o.appendChild(d);return}o=null;const r=i.match(/^\d+[.)]\s+/),l=document.createElement(r?"h4":"p");l.textContent=i,a.appendChild(l)}),e.replaceChildren(a)}function W(){const e=document.getElementById("heroCountdown"),t=document.querySelector("#beranda .hero-actions"),a=document.getElementById("heroVisual"),o=document.getElementById("heroDisplayImg"),s=document.getElementById("heroCountdownOverlay");if(!e||!t)return;const i=a&&!a.hidden&&(o==null?void 0:o.complete)&&o.naturalWidth>0;if(window.matchMedia("(max-width: 576px)").matches&&i&&s){s.append(e);return}(e.parentElement!==t.parentElement||t.nextElementSibling!==e)&&t.after(e)}async function kt(){try{const e=await X.getWebsiteSettings();if(!e)return;Ge(e);let t={};try{t=e.cms_visibility?JSON.parse(e.cms_visibility):{}}catch(c){console.warn("Pengaturan visibilitas CMS tidak valid:",c)}if(n.cmsVisibility=t,n.cmsComingSoonTitle=typeof e.coming_soon_title=="string"&&e.coming_soon_title.trim()?e.coming_soon_title.trim():"COMING SOON EVENT!",n.cmsComingSoonMessage=typeof e.coming_soon_message=="string"?e.coming_soon_message.trim():"Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!",n.cmsComingSoonImageUrl="",typeof e.coming_soon_image_url=="string"&&e.coming_soon_image_url.trim())try{const c=new URL(e.coming_soon_image_url.trim());["http:","https:"].includes(c.protocol)&&(n.cmsComingSoonImageUrl=c.href)}catch(c){console.warn("URL gambar Coming Soon tidak valid:",c)}[["beranda","hero"],["rute","route"],["fasilitas","facilities"],["kategori","tickets"],["legal","legal"],["faq","faq"]].forEach(([c,f])=>{const w=document.getElementById(c);w&&(w.hidden=t[f]===!1)});const o=document.getElementById("statsBanner");o&&(o.hidden=t.stats===!1),document.querySelectorAll(".glass-footer").forEach(c=>{c.hidden=t.footer===!1}),yt(t),e.site_title&&(document.title=e.site_title);const s=document.querySelector(".top-navbar .nav-brand"),i=s==null?void 0:s.querySelector(".brand-text");i&&typeof e.navbar_title=="string"&&(i.textContent=e.navbar_title.trim());const r=s==null?void 0:s.querySelector(".brand-icon");if(r){const c=new Set(["fa-person-running","fa-medal","fa-trophy","fa-flag-checkered","fa-bolt","fa-fire","fa-star","fa-mountain-sun","fa-shoe-prints","fa-heart-pulse","fa-stopwatch","fa-award","fa-dumbbell","fa-route","fa-location-dot","fa-sun","fa-water","fa-compass","fa-crown","fa-leaf"]),f=typeof e.navbar_icon_url=="string"?e.navbar_icon_url.trim():"",w=e.navbar_icon_mode==="IMAGE"||!e.navbar_icon_mode&&!!f;let A="";if(w&&f)try{const P=new URL(f);["http:","https:"].includes(P.protocol)&&(A=P.href)}catch{A=""}if(A){const P=document.createElement("img");P.src=A,P.alt="",P.loading="lazy",P.style.cssText="width: 100%; height: 100%; padding: 4px; object-fit: contain; border-radius: inherit; background: #FFFFFF;",r.replaceChildren(P)}else{const P=document.createElement("i"),_=c.has(e.navbar_icon)?e.navbar_icon:"fa-person-running";P.className=`fa-solid ${_}`,r.replaceChildren(P)}}const l=document.getElementById("heroStatusText")||document.querySelector(".hero-pill-badge span:not(.status-dot)");n.cmsHeroBadge=e.hero_badge||"",l&&n.cmsHeroBadge&&(l.textContent=n.cmsHeroBadge),oe();const d=document.querySelector(".hero-title");if(d){const c=typeof e.hero_title=="string"?e.hero_title.trim():"";We(d,c,e.hero_animation),d.hidden=!c}const g=document.querySelector(".hero-desc");if(g){const c=typeof e.hero_subtitle=="string"?e.hero_subtitle.trim():"";g.textContent=c,g.hidden=!c}const k=document.getElementById("heroDisplayImg"),p=document.getElementById("heroVisual"),m=document.querySelector("#beranda .hero-split-grid");if(k&&p){const c=typeof e.hero_bg_image=="string"?e.hero_bg_image.trim():"";p.hidden=!0,m==null||m.classList.toggle("hero-no-visual",!c),k.onload=()=>{p.hidden=!1,m==null||m.classList.remove("hero-no-visual"),W()},k.onerror=()=>{p.hidden=!0,m==null||m.classList.add("hero-no-visual"),W()},c?(k.alt=typeof e.hero_title=="string"?e.hero_title.trim():"",k.src=c,k.complete&&k.naturalWidth>0&&(p.hidden=!1,m==null||m.classList.remove("hero-no-visual"),W())):(k.removeAttribute("src"),W())}let u;try{u=e.stats_banner_items?JSON.parse(e.stats_banner_items):null,Array.isArray(u)||(u=null)}catch(c){console.warn("Data kartu statistik CMS tidak valid:",c),u=null}u||(u=[1,2,3,4].map(c=>({type:"CUSTOM",val:e[`stat_${c}_val`]||"",unit:e[`stat_${c}_unit`]||"",desc:e[`stat_${c}_desc`]||""})).filter(c=>c.val||c.unit||c.desc)),n.cmsStatsItems=u,Me(u);const v=document.getElementById("rute");if(v){const c=document.getElementById("routeSectionBadgeLabel");c&&typeof e.route_badge_label=="string"&&(c.textContent=e.route_badge_label,c.parentElement.hidden=!e.route_badge_label.trim());const f=document.getElementById("routeSectionTitle")||v.querySelector(".section-title");f&&typeof e.route_title=="string"&&(f.textContent=e.route_title,f.hidden=!e.route_title.trim());const w=document.getElementById("routeSectionDesc")||v.querySelector(".route-info-card > p");w&&typeof e.route_desc=="string"&&(w.textContent=e.route_desc,w.hidden=!e.route_desc.trim());const A=document.getElementById("btnDownloadGpx");A&&(A.hidden=!e.route_gpx_url||e.route_gpx_url==="#"),A&&e.route_gpx_url&&(A.href=e.route_gpx_url,e.route_gpx_url==="#"?A.onclick=P=>{P.preventDefault(),alert("File GPX Rute Tegal Run 2026 akan dapat diunduh pada H-14 perlombaan.")}:/^https?:\/\//i.test(e.route_gpx_url)?(A.setAttribute("target","_blank"),A.setAttribute("rel","noopener noreferrer"),A.onclick=null):(A.removeAttribute("target"),A.removeAttribute("rel"),A.onclick=null)),n.cmsRouteMapUrl=Object.hasOwn(e,"route_gmaps_url")?e.route_gmaps_url:e.gmaps_embed_url||"",n.cmsRouteMapImage=e.route_map_image||"",n.cmsRouteMapMode=e.route_map_mode==="IMAGE"?"IMAGE":"GMAPS",n.cmsRouteCheckpointMode=e.route_checkpoint_mode==="IMAGE"?"IMAGE":"MANUAL",n.cmsRouteCheckpointImage=e.route_checkpoint_image||"",Le(n.cmsRouteMapUrl,n.cmsRouteMapImage)}vt(e.faq_items);const S=document.getElementById("fasilitas");if(S){const c=S.querySelector(".section-title");c&&typeof e.facilities_title=="string"&&(c.textContent=e.facilities_title,c.hidden=!e.facilities_title.trim());const f=S.querySelector(".section-desc");f&&typeof e.facilities_desc=="string"&&(f.textContent=e.facilities_desc,f.hidden=!e.facilities_desc.trim())}const x=document.getElementById("facilitiesMedia");x&&(x.hidden=!e.facilities_image,e.facilities_image&&(x.src=e.facilities_image));const b=document.getElementById("facilitiesContainer");if(b){const c=[{icon:"fa-shirt",title:"Jersey Running Dry-Fit",desc:"Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh."},{icon:"fa-microchip",title:"Nomor Dada (BIB) & Timing Chip",desc:"Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online."},{icon:"fa-medal",title:"Medali Finisher Logam Cor",desc:"Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT."},{icon:"fa-bottle-water",title:"Water & Isotonic Station",desc:"Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar."},{icon:"fa-truck-medical",title:"Tim Medis & Ambulans Mobile",desc:"Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute."},{icon:"fa-utensils",title:"Refreshment & Finisher Feast",desc:"Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar."}];let f;try{f=e.facilities_items?JSON.parse(e.facilities_items):c}catch(w){console.warn("Data fasilitas CMS tidak valid:",w),f=c}Array.isArray(f)||(f=c),b.innerHTML=f.filter(w=>w&&typeof w=="object"&&w.visible!==!1).map(w=>`
        <div class="facility-card">
          <div class="facility-card-head">
            <div class="facility-icon-wrap">
              <i class="fa-solid ${E(w.icon||"fa-gift")}"></i>
            </div>
            <h4 class="facility-title">${E(w.title||"")}</h4>
          </div>
          <p class="facility-desc">${E(w.desc||"")}</p>
        </div>
      `).join("")}const h=document.getElementById("kategori");if(h){const c=h.querySelector(".section-title");c&&typeof e.tickets_title=="string"&&(c.textContent=e.tickets_title,c.hidden=!e.tickets_title.trim());const f=h.querySelector(".section-desc");f&&typeof e.tickets_desc=="string"&&(f.textContent=e.tickets_desc,f.hidden=!e.tickets_desc.trim())}const I=document.getElementById("ticketsCmsMedia"),B=document.getElementById("ticketsCmsMediaWrap");if(I&&B){let c="";try{const f=new URL(typeof e.medal_image=="string"?e.medal_image.trim():"");["http:","https:"].includes(f.protocol)&&(c=f.href)}catch{c=""}I.onerror=()=>{I.hidden=!0,B.hidden=!0},I.onload=()=>{I.hidden=!1,B.hidden=!1},c?(B.hidden=!1,I.hidden=!1,I.loading="eager",I.src=c):(I.removeAttribute("src"),I.hidden=!0,B.hidden=!0)}const D=document.getElementById("legalSectionBadge");D&&typeof e.legal_badge_label=="string"&&(D.textContent=e.legal_badge_label);const N=document.getElementById("legalSectionTitle");N&&typeof e.legal_title=="string"&&(N.textContent=e.legal_title,N.hidden=!e.legal_title.trim());const $=document.getElementById("legalSectionDesc");$&&typeof e.legal_desc=="string"&&($.textContent=e.legal_desc,$.hidden=!e.legal_desc.trim());const T=document.getElementById("legalGridContainer");if(T){let c;try{c=e.legal_items?JSON.parse(e.legal_items):null,Array.isArray(c)||(c=null)}catch(f){console.warn("Data legalitas CMS tidak valid:",f),c=null}c||(c=[1,2,3,4].map((f,w)=>({icon:["fa-certificate","fa-road-barrier","fa-shield-heart","fa-user-lock"][w],title:e[`legal_item_${f}_title`]||"",desc:e[`legal_item_${f}_desc`]||""})).filter(f=>f.title||f.desc)),c=c.filter(f=>f&&typeof f=="object"&&f.visible!==!1),T.innerHTML=c.map(f=>`
        <div class="legal-item">
          <i class="fa-solid ${E(f.icon||"fa-certificate")}"></i>
          <h4>${E(f.title||"")}</h4>
          <p>${E(f.desc||"")}</p>
        </div>
      `).join(""),T.hidden=c.length===0}const R=document.getElementById("legalPrivacyButtonLabel");R&&typeof e.legal_privacy_button=="string"&&(R.textContent=e.legal_privacy_button);const q=document.getElementById("legalTermsButtonLabel");if(q&&typeof e.legal_terms_button=="string"&&(q.textContent=e.legal_terms_button),[["privacyModalTitle",e.privacy_modal_title],["privacyModalSubtitle",e.privacy_modal_subtitle],["termsModalTitle",e.terms_modal_title],["termsModalSubtitle",e.terms_modal_subtitle]].forEach(([c,f])=>{const w=document.getElementById(c);w&&typeof f=="string"&&(w.textContent=f)}),Se(document.getElementById("privacyModalContent"),e.privacy_modal_content),Se(document.getElementById("termsModalContent"),e.terms_modal_content),e.contact_email&&document.querySelectorAll(".footer-email").forEach(c=>c.textContent=e.contact_email),e.contact_phone&&document.querySelectorAll(".footer-phone").forEach(c=>c.textContent=e.contact_phone),e.contact_address){const c=document.querySelector(".footer-address");c&&(c.textContent=e.contact_address)}if(e.footer_copyright){const c=document.querySelector(".footer-copyright-text")||document.querySelector(".footer-bottom > div:first-child");c&&(c.textContent=e.footer_copyright)}je(e);const F=document.querySelector(".hero-title .event-title-text");F&&(F.dataset.text=F.textContent)}catch(e){console.warn("Failed to apply website settings:",e)}}async function xt(){const e=document.getElementById("routeChecklistContainer");try{const t=await X.getRouteOverview();if(!t){e&&(e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>');return}n.cmsRouteMapUrl||(n.cmsRouteMapUrl=t.gmapsUrl||""),n.cmsRouteMapImage||(n.cmsRouteMapImage=t.routeMapImage||""),n.cmsRouteMapMode=t.mapMode==="IMAGE"?"IMAGE":"GMAPS",n.cmsRouteCheckpointMode=t.checkpointMode==="IMAGE"?"IMAGE":"MANUAL",n.cmsRouteCheckpointImage=t.checkpointImage||"";const a=document.getElementById("routeSectionBadgeLabel");if(a&&typeof t.badgeLabel=="string"&&(a.textContent=t.badgeLabel,a.parentElement.hidden=!t.badgeLabel.trim()),Le(n.cmsRouteMapUrl,n.cmsRouteMapImage),e)if(n.cmsRouteCheckpointMode==="IMAGE"&&n.cmsRouteCheckpointImage){const o=document.createElement("img");o.className="route-checkpoint-image",o.src=n.cmsRouteCheckpointImage,o.alt="Peta checkpoint dan detail rute event",o.loading="lazy",e.replaceChildren(o)}else n.cmsRouteCheckpointMode==="IMAGE"?e.innerHTML='<p class="route-map-empty">Gambar checkpoint belum tersedia.</p>':Array.isArray(t.points)&&t.points.length>0?e.innerHTML=t.points.map((o,s)=>`
          <div class="route-point">
            <div class="route-point-marker">${String(s+1).padStart(2,"0")}</div>
            <div class="route-point-content">
              <h4>${E(o.name)}${o.distanceKm>0?` <small style="font-weight:500;color:#64748B;">— Km ${o.distanceKm}</small>`:""}</h4>
              <p>${E(o.description||"")}</p>
              ${o.isWaterStation?'<span class="route-tag" style="display:inline-block;margin-top:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#EFF6FF;color:#3B82F6;font-weight:600;">💧 Water Station</span>':""}
              ${o.isMedicalSpot?'<span class="route-tag" style="display:inline-block;margin-top:4px;margin-left:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#F0FDF4;color:#16A34A;font-weight:600;">🏥 Pos Medis</span>':""}
            </div>
          </div>
        `).join(""):e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>'}catch(t){console.error("Gagal memuat data rute:",t),e&&(e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Data rute gagal dimuat. Silakan coba beberapa saat lagi.</p>')}}function wt(){const e=document.getElementById("navMenu"),t=document.getElementById("navMobileToggle"),a=document.querySelectorAll(".nav-dropdown"),o=s=>{if(!e||!t)return;e.classList.toggle("mobile-open",s),t.setAttribute("aria-expanded",String(s)),t.setAttribute("aria-label",s?"Tutup menu":"Buka menu");const i=t.querySelector("i");i&&(i.className=s?"fa-solid fa-xmark":"fa-solid fa-bars")};t==null||t.addEventListener("click",s=>{s.stopPropagation(),o(!(e!=null&&e.classList.contains("mobile-open")))}),e==null||e.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>o(!1))}),a.forEach(s=>{const i=s.querySelector(".nav-dropdown-toggle");i==null||i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const l=s.classList.contains("active");a.forEach(d=>d.classList.remove("active")),s.classList.toggle("active",!l)})}),document.addEventListener("click",()=>{a.forEach(s=>s.classList.remove("active")),o(!1)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&(a.forEach(i=>i.classList.remove("active")),o(!1))})}function Ie(){var r,l,d,g,k,p,m,u,v,S,x,b,h,I,B,D,N,$,T,R,q,F,c,f,w,A,P,_,K,j,Z;pt(),le();const e=window.matchMedia("(max-width: 576px)");W(),e.addEventListener("change",W),window.addEventListener("resize",W),se(),ot(),kt(),xt(),Te(),wt(),(r=document.getElementById("btnShowRegistrationNotice"))==null||r.addEventListener("click",()=>{const y=document.getElementById("registrationNoticeDialog");y instanceof HTMLDialogElement&&!y.open&&y.showModal()}),(l=document.getElementById("btnCloseRegistrationNotice"))==null||l.addEventListener("click",()=>{const y=document.getElementById("registrationNoticeDialog");y instanceof HTMLDialogElement&&y.open&&y.close()}),(d=document.getElementById("registrationNoticeDialog"))==null||d.addEventListener("click",y=>{const M=y.currentTarget;y.target===M&&M instanceof HTMLDialogElement&&M.close()});const t=async y=>{if(y&&y.preventDefault(),n.isGlobalClosed){C("error","Pendaftaran Ditutup","Mohon maaf, seluruh pendaftaran Tegal Run 2026 telah resmi ditutup oleh panitia.");return}if(n.events.length>0){const M=n.events.find(L=>!L.isClosed)||n.events[0];re(M)}else{const M=document.getElementById("kategori")||document.getElementById("ticketsSection");M&&M.scrollIntoView({behavior:"smooth"});try{const L=await X.getEvents();if(L&&L.length>0){n.events=L,fe(L);const U=L.find(H=>!H.isClosed)||L[0];re(U)}}catch{C("error","Gagal Memuat Kategori","Gagal memuat kategori tiket. Pastikan server backend aktif.")}}};(g=document.getElementById("heroCtaBtn"))==null||g.addEventListener("click",t),(k=document.getElementById("navDaftarBtn"))==null||k.addEventListener("click",t),(p=document.getElementById("dockDaftarBtn"))==null||p.addEventListener("click",t),(m=document.getElementById("modalCloseBtn"))==null||m.addEventListener("click",J),(u=document.getElementById("regModal"))==null||u.addEventListener("click",y=>{y.target.id==="regModal"&&J()}),(v=document.getElementById("modalEventSelect"))==null||v.addEventListener("change",y=>{const M=n.events.find(L=>L.id===y.target.value);M&&(n.selectedEvent=M,ve(),ae(),V())}),(S=document.getElementById("regModal"))==null||S.addEventListener("change",y=>{y.target.matches(".p-event-select")&&V()}),(x=document.getElementById("modalParticipantCount"))==null||x.addEventListener("change",y=>{n.participantCount=parseInt(y.target.value,10)||1,ve(),ae()});const a=document.getElementById("bookerPhone");a&&pe(a),(b=document.getElementById("checkSameAsBooker"))==null||b.addEventListener("change",()=>{ee()}),(h=document.getElementById("bookerName"))==null||h.addEventListener("input",()=>{ee()}),(I=document.getElementById("bookerPhone"))==null||I.addEventListener("input",()=>{ee()}),(B=document.getElementById("btnModalNext"))==null||B.addEventListener("click",()=>{ft(n.currentStep)&&(n.currentStep++,n.currentStep===3&&bt(),he())}),(D=document.getElementById("btnModalPrev"))==null||D.addEventListener("click",()=>{n.currentStep>1&&(n.currentStep--,he())}),(N=document.getElementById("btnModalSubmit"))==null||N.addEventListener("click",ht);const o=()=>me("privacyModal");($=document.getElementById("btnOpenPrivacyModal"))==null||$.addEventListener("click",o),(T=document.getElementById("footerPrivacyLink"))==null||T.addEventListener("click",o),(R=document.getElementById("privacyCloseBtn"))==null||R.addEventListener("click",()=>Q("privacyModal")),(q=document.getElementById("privacyOkBtn"))==null||q.addEventListener("click",()=>Q("privacyModal"));const s=()=>me("termsModal");(F=document.getElementById("btnOpenTerms"))==null||F.addEventListener("click",s),(c=document.getElementById("btnOpenTermsModal"))==null||c.addEventListener("click",s),(f=document.getElementById("footerTermsLink"))==null||f.addEventListener("click",s),(w=document.getElementById("footerWaiverLink"))==null||w.addEventListener("click",s),(A=document.getElementById("termsCloseBtn"))==null||A.addEventListener("click",()=>Q("termsModal")),(P=document.getElementById("termsOkBtn"))==null||P.addEventListener("click",()=>Q("termsModal")),(_=document.getElementById("btnOpenSizeChart"))==null||_.addEventListener("click",()=>me("sizeChartModal")),(K=document.getElementById("sizeChartCloseBtn"))==null||K.addEventListener("click",()=>Q("sizeChartModal")),(j=document.getElementById("sizeChartOkBtn"))==null||j.addEventListener("click",()=>Q("sizeChartModal")),(Z=document.getElementById("faqList"))==null||Z.addEventListener("click",y=>{const M=y.target.closest(".faq-question");if(!M)return;const L=M.closest(".faq-item"),U=L.classList.contains("active");document.querySelectorAll("#faqList .faq-item.active").forEach(H=>{var G;H.classList.remove("active"),(G=H.querySelector(".faq-question"))==null||G.setAttribute("aria-expanded","false")}),U||(L.classList.add("active"),M.setAttribute("aria-expanded","true"))});const i=document.querySelectorAll("section[id]");window.addEventListener("scroll",()=>{const y=window.pageYOffset;i.forEach(M=>{const L=M.offsetHeight,U=M.offsetTop-120,H=M.getAttribute("id"),G=document.querySelector(`.mobile-bottom-dock a[href*="${H}"]`);G&&y>U&&y<=U+L&&(document.querySelectorAll(".mobile-bottom-dock a").forEach(de=>de.classList.remove("active")),G.classList.add("active"))})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ie):Ie();export{C as showToast};
