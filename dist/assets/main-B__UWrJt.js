import{b as j,a as xe,l as qe}from"./api-BxOmbn0x.js";/* empty css              */import{c as Oe}from"./realtime-nkavtrDT.js";import{a as Ue}from"./branding-CYeaw-kO.js";const ze=`<!-- =========================================================================
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
</div>`,Ke=`<!-- =========================================================================
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
      <div class="brand-text">TEGAL RUN <span>2027</span></div>
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
</div>`,Ge=`<!-- =========================================================================
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
          <div class="brand-text">TEGAL RUN <span>2027</span></div>
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
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-copyright-text">&copy; 2027 Komite Tegal Run. Hak Cipta Dilindungi Undang-Undang Republik Indonesia.</div>
      <div style="color: var(--color-text-muted);">
        Keamanan Transaksi Terenkripsi oleh <span style="color: var(--color-primary); font-weight: 700;">Midtrans Payment Gateway</span>
      </div>
    </div>
  </div>
</footer>

`,je=`<!-- =========================================================================
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
</div>`,He=`<section class="hero-section" id="beranda">\r
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
\r
      <div class="hero-col-visual" id="heroVisual" hidden>\r
        <div class="athletic-hero-card">\r
          <div class="athletic-hero-img-wrap">\r
            <img id="heroDisplayImg" class="athletic-hero-img" alt="" loading="eager">\r
            <div class="athletic-card-overlay" aria-hidden="true"></div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="stats-banner" id="statsBanner" hidden aria-label="Statistik event"></div>\r
  </div>\r
</section>\r
`,We=`<!-- =========================================================================
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
      <img id="ticketsCmsMedia" class="tickets-cms-media" alt="Preview medali finisher" loading="lazy" hidden>
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
</section>`,Je=`<!-- =========================================================================
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
            <h4 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">Peta Rute Tegal Run 2027</h4>
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
`,Ve=`<!-- =========================================================================
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
`,Ye=`<!-- =========================================================================
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
`,Xe=`<!-- =========================================================================
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
</section>`,Qe=`<section class="site-coming-soon" id="siteComingSoon" aria-live="polite" hidden>\r
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
`,Ze=`<!-- =========================================================================
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
            Pembayaran diamankan secara real-time via <strong>Midtrans Snap</strong> (QRIS, VA Bank BCA, BRI, Mandiri, BNI, Kartu Kredit).
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
`,fe=document.getElementById("app");fe&&(fe.innerHTML=`
    <div class="ambient-glow ambient-1"></div>
    <div class="ambient-glow ambient-2"></div>
    <div class="toast-container" id="toastContainer"></div>
    ${ze}
    ${Ke}
    ${Qe}
    ${He}
    ${We}
    ${Je}
    ${Ve}
    ${Ye}
    ${Xe}
    ${Ge}
    ${je}
    ${Ze}
  `);const t={events:[],selectedEvent:null,currentStep:1,participantCount:1,isGlobalClosed:!0,manualRegistrationClosed:!1,globalRegistrationPhase:"UPCOMING",globalCountdownTarget:null,countdownTarget:null,countdownInterval:null,registrationTimerInterval:null,registrationDeadline:null,registrationWarningShown:!1,checkoutSubmitting:!1,registrationExpiredDuringSubmit:!1,countdownSettingsLoaded:!1,cmsHeroBadge:"",cmsStatsItems:null,cmsVisibility:{},cmsRouteMapUrl:"",cmsRouteMapImage:"",cmsRouteMapMode:"GMAPS",cmsRouteCheckpointMode:"MANUAL",cmsRouteCheckpointImage:"",cmsComingSoonTitle:"COMING SOON EVENT!",cmsComingSoonMessage:"Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!",cmsComingSoonImageUrl:"",feeSettings:{feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0,paymentTimerMinutes:30}};function ve(e){if(!e)return"";let a=String(e).trim().replace(/[\s\-()]/g,"");return a.startsWith("08")?"+628"+a.slice(2):a.startsWith("628")?"+"+a:a}function le(e){!e||e._phoneFormatted||(e._phoneFormatted=!0,e.addEventListener("input",a=>{let i=a.target.value;i.startsWith("08")?a.target.value="+628"+i.substring(2):i.startsWith("628")&&(a.target.value="+628"+i.substring(3))}))}function k(e="success",a="",i=""){const o=document.getElementById("toastContainer");if(!o)return;const s=document.createElement("div");s.className=`toast toast-${e}`;const n={success:"fa-solid fa-circle-check",error:"fa-solid fa-triangle-exclamation",warning:"fa-solid fa-circle-exclamation"};s.innerHTML=`
    <div class="toast-icon">
      <i class="${n[e]||n.success}"></i>
    </div>
    <div class="toast-content">
      <h5>${v(a)}</h5>
      <p>${v(i)}</p>
    </div>
  `,o.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateX(40px)",setTimeout(()=>s.remove(),300)},4500)}function v(e){return e?e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function $(e){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e)}function be(e){const a=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Jakarta",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(e);return["year","month","day"].map(i=>{var o;return(o=a.find(s=>s.type===i))==null?void 0:o.value}).join("-")}function Z(e,a=new Date){return!e||Number.isNaN(e.getTime())||a<e?"UPCOMING":be(a)===be(e)?"RACE_DAY":"COMPLETED"}function X(e=null){e!==void 0&&(t.countdownTarget=e);const a=document.getElementById("heroCountdown");a&&(a.hidden=!Number.isFinite(t.countdownTarget)),t.countdownInterval&&(clearInterval(t.countdownInterval),t.countdownInterval=null);const i=document.getElementById("days"),o=document.getElementById("hours"),s=document.getElementById("minutes"),n=document.getElementById("seconds"),r=a==null?void 0:a.querySelector(".countdown-grid");if(!t.countdownTarget||!Number.isFinite(Number(t.countdownTarget))){i&&(i.textContent="--"),o&&(o.textContent="--"),s&&(s.textContent="--"),n&&(n.textContent="--"),r==null||r.classList.remove("countdown-sold");return}function l(){const c=new Date().getTime(),p=t.countdownTarget-c;if(p<=0){i&&(i.textContent="S"),o&&(o.textContent="O"),s&&(s.textContent="L"),n&&(n.textContent="D"),r==null||r.classList.add("countdown-sold"),de(),Z(new Date(t.countdownTarget))==="COMPLETED"&&t.countdownInterval&&(clearInterval(t.countdownInterval),t.countdownInterval=null);return}r==null||r.classList.remove("countdown-sold"),de();const g=Math.floor(p/(1e3*60*60*24)),f=Math.floor(p%(1e3*60*60*24)/(1e3*60*60)),h=Math.floor(p%(1e3*60*60)/(1e3*60)),m=Math.floor(p%(1e3*60)/1e3),b=w=>String(w).padStart(2,"0");i&&(i.textContent=b(g)),o&&(o.textContent=b(f)),s&&(s.textContent=b(h)),n&&(n.textContent=b(m))}l(),t.countdownInterval=setInterval(l,1e3)}async function se(){const e=document.getElementById("eventDateDisplay"),a=document.getElementById("heroCountdown");try{const i=await j.getCountdownSettings();if(t.countdownSettingsLoaded=!!(i!=null&&i.eventCountdownDate),t.globalCountdownTarget=i!=null&&i.eventCountdownDate?new Date(i.eventCountdownDate).getTime():null,i&&i.eventCountdownDate){const o=new Date(i.eventCountdownDate);if(isNaN(o.getTime()))e&&(a&&(a.hidden=!0),t.countdownTarget=null,t.countdownInterval&&(clearInterval(t.countdownInterval),t.countdownInterval=null),e.textContent="",e.classList.add("badge-pending-date"));else{t.countdownTarget!==o.getTime()&&X(o.getTime()),a&&(a.hidden=!1);const s=o.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),n=o.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});e&&(e.textContent=`${s.toUpperCase()} • ${n} WIB`,e.classList.remove("badge-pending-date"))}}else e&&(a&&(a.hidden=!0),t.countdownTarget=null,t.countdownInterval&&(clearInterval(t.countdownInterval),t.countdownInterval=null),e.textContent="",e.classList.add("badge-pending-date"));i&&(t.manualRegistrationClosed=i.manualRegistrationClosed===!0||String(i.manualRegistrationClosed).toLowerCase()==="true",de(),te(),z())}catch(i){console.warn("Gagal memuat pengaturan countdown dari backend:",i),t.isGlobalClosed=!0,t.manualRegistrationClosed=!0,t.globalRegistrationPhase="CLOSED",t.globalCountdownTarget=null,te(),z(),t.countdownTarget=null,t.countdownInterval&&(clearInterval(t.countdownInterval),t.countdownInterval=null),e&&(e.textContent="",e.classList.add("badge-pending-date")),a&&(a.hidden=!0)}finally{if(!t.countdownSettingsLoaded){const i=t.events.map(o=>new Date(o.eventDate).getTime()).filter(o=>Number.isFinite(o)&&o>Date.now()).sort((o,s)=>o-s)[0];i&&X(i)}}}function de(){const e=Number.isFinite(t.globalCountdownTarget)?new Date(t.globalCountdownTarget):null,a=Z(e);t.globalRegistrationPhase=a==="UPCOMING"&&t.manualRegistrationClosed?"CLOSED":a,t.isGlobalClosed=t.manualRegistrationClosed||a!=="UPCOMING"}async function he(){try{const e=await xe("/events",{method:"GET",headers:{Accept:"application/json"}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const a=await e.json();if(a.status!=="success"||!Array.isArray(a.data))throw new Error(a.message||"Respons data event tidak valid.");t.events=a.data;const i=document.getElementById("heroCtaBtn");if(i&&(i.hidden=a.data.length===0),ae(a.data),ge(t.cmsStatsItems),!t.countdownSettingsLoaded){const o=a.data.map(s=>new Date(s.eventDate).getTime()).filter(s=>Number.isFinite(s)&&s>Date.now()).sort((s,n)=>s-n);o.length>0&&o[0]!==t.countdownTarget&&X(o[0])}if(t.selectedEvent){const o=a.data.find(n=>n.id===t.selectedEvent.id),s=[...document.querySelectorAll(".p-event-select")].some(n=>{const r=a.data.find(l=>l.id===n.value);return!r||F(r)});if(!o||F(o)||s){if(t.checkoutSubmitting){t.registrationExpiredDuringSubmit=!0;const n=document.getElementById("registrationTimerMessage"),r=document.getElementById("registrationTimeRemaining");n&&(n.textContent="Kategori ditutup — memeriksa pendaftaran"),r&&(r.textContent="—");return}W(),U(),k("warning","Kategori Ditutup","Pendaftaran kategori ini ditutup saat formulir Anda terbuka. Isian belum dikirim.")}else t.selectedEvent=o,z()}}catch(e){console.warn("Gagal memperbarui daftar event publik:",e)}}function te(){const e=document.getElementById("heroStatusBadge"),a=document.getElementById("heroStatusText"),i=e==null?void 0:e.querySelector(".status-dot"),o=document.getElementById("heroCtaBtn"),s=document.getElementById("navDaftarBtn"),n=document.getElementById("dockDaftarBtn"),r=t.events.length>0&&t.events.every(F);if(t.isGlobalClosed||r){const l=t.isGlobalClosed?t.globalRegistrationPhase==="RACE_DAY"?{label:"ACARA TELAH DIMULAI",color:"#F97316",icon:"fa-flag-checkered"}:t.globalRegistrationPhase==="COMPLETED"?{label:"EVENT TELAH SELESAI • SOLD",color:"#EF4444",icon:"fa-ticket-slash"}:{label:"PENDAFTARAN RESMI DITUTUP",color:"#EF4444",icon:"fa-lock"}:{label:"PENDAFTARAN KATEGORI DITUTUP",color:"#EF4444",icon:"fa-lock"};e&&(e.hidden=!1,e.style.borderColor=l.color),a&&(a.textContent=l.label,a.style.color=l.color),i&&(i.style.background=l.color,i.style.boxShadow=`0 0 8px ${l.color}`),o&&(o.disabled=!0,o.classList.remove("btn-glow"),o.innerHTML=`<i class="fa-solid ${l.icon}"></i> ${l.label}`),s&&(s.disabled=!0,s.classList.remove("btn-glow"),s.innerHTML=`<i class="fa-solid ${l.icon}"></i> ${l.label}`),n&&(n.style.opacity="0.6",n.style.pointerEvents="none"),t.events.length&&ae(t.events);return}e&&(e.hidden=!1,e.style.borderColor=""),a&&(a.textContent=t.cmsHeroBadge||"PENDAFTARAN RESMI DIBUKA",a.style.color=""),i&&(i.style.background="",i.style.boxShadow=""),o&&(o.disabled=!1,o.classList.add("btn-glow"),o.innerHTML='<i class="fa-solid fa-ticket" aria-hidden="true"></i> Amankan Slot Lari Sekarang'),s&&(s.disabled=!1,s.classList.add("btn-glow"),s.innerHTML='<i class="fa-solid fa-bolt"></i> Daftar Tiket'),n&&(n.style.opacity="",n.style.pointerEvents=""),t.events.length&&ae(t.events)}async function we(){const e=document.getElementById("pageSkeleton");try{const a=await j.getEvents();t.events=Array.isArray(a)?a:[];const i=document.getElementById("heroCtaBtn");if(i&&(i.hidden=t.events.length===0),te(),ge(t.cmsStatsItems),!t.countdownTarget&&!t.countdownSettingsLoaded){const s=t.events.map(n=>new Date(n.eventDate).getTime()).filter(n=>Number.isFinite(n)&&n>Date.now()).sort((n,r)=>n-r);s.length>0&&X(s[0])}try{const n=await(await xe("/settings/checkout-config")).json();n.status==="success"&&n.data&&(t.feeSettings=n.data)}catch{}const o=new URLSearchParams(window.location.search).get("register");if(o){const s=a.find(n=>n.id===o);s&&!F(s)&&!t.isGlobalClosed&&setTimeout(()=>ne(s),400)}}catch(a){console.error("Failed to render events:",a)}finally{e&&setTimeout(()=>{e.classList.add("hide")},350)}}function ae(e){const a=document.getElementById("ticketsGrid");if(a){if(a.innerHTML="",!Array.isArray(e)||e.length===0){a.innerHTML=`
      <div style="text-align: center; grid-column: 1 / -1; padding: 60px 20px;">
        <i class="fa-solid fa-ticket-simple" style="font-size: 3rem; color: #94A3B8; margin-bottom: 16px;"></i>
        <h3 style="color: var(--color-text-title); font-size: 1.25rem; margin-bottom: 6px;">Tidak Ada Kategori Tiket</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Belum ada kategori lomba yang dibuka di database.</p>
      </div>
    `;return}e.forEach(i=>{const o=i.category==="10K",s=Number(i.remainingStock??i.stock??0),n=Number(i.totalCapacity??s+Number(i.registeredCount||0)),r=n>0?Math.max(0,Math.min(100,Math.round(s/n*100))):0,l=t.isGlobalClosed,c=i.registrationPhase||(i.eventDate?Z(new Date(i.eventDate)):"UPCOMING"),p=typeof i.registrationClosedByTimer=="boolean"?i.registrationClosedByTimer:c==="RACE_DAY"||c==="COMPLETED",f=(typeof i.registrationClosed=="boolean"?i.registrationClosed:!!i.isClosed||p)||l,h=t.globalRegistrationPhase==="RACE_DAY"?"ACARA TELAH DIMULAI":t.globalRegistrationPhase==="COMPLETED"?"SOLD":"PENDAFTARAN DITUTUP",m=l?h:c==="RACE_DAY"?"ACARA TELAH DIMULAI":c==="COMPLETED"?"SOLD":"PENDAFTARAN DITUTUP",b=i.eventDate?`${new Date(i.eventDate).toLocaleString("id-ID",{dateStyle:"long",timeStyle:"short",timeZone:"Asia/Jakarta"})} WIB`:"",w=l?t.globalRegistrationPhase:c,y=document.createElement("div");y.className=`glass-card ticket-card ticket-pass-card ${o?"featured":""} ${f?"event-closed-card ticket-sale-closed":""} ${l?"global-registration-closed":""} ${f?`registration-phase-${w.toLowerCase()}`:""}`;const I=Array.isArray(i.benefits)&&i.benefits.length>0?i.benefits.map(M=>M.name):[],L=I.length>0?I.map(M=>`
          <li class="benefit-item">
            <div class="benefit-icon"><i class="fa-solid fa-check"></i></div>
            <span>${v(M)}</span>
          </li>
        `).join(""):'<li class="benefit-item" style="color: var(--color-text-muted); font-style: italic;">Belum ada benefit tercantum</li>',P=i.ticketImage||i.medalImage,D=`
      <div class="ticket-card-banner${P?"":" ticket-card-banner-empty"}">
        ${P?`<img src="${v(P)}" alt="${v(i.ticketName)}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('ticket-card-banner-empty')">`:'<i class="fa-solid fa-person-running" aria-hidden="true"></i>'}
        <div class="ticket-card-banner-overlay">
          <span class="ticket-banner-badge"><i class="fa-solid fa-person-running"></i> ${v(i.category)} Marathon</span>
          ${i.medalImage?'<span class="ticket-banner-medal-badge"><i class="fa-solid fa-medal"></i> Medali Finisher</span>':""}
        </div>
      </div>
    `;y.innerHTML=`
      <!-- E-Tiket Stub Header -->
      <div class="ticket-stub-header">
        <div class="ticket-stub-brand">
          <i class="fa-solid fa-bolt" style="color: var(--color-primary);"></i> TEGAL RUN 2027
        </div>
        <div class="ticket-stub-tag">
          ${m==="SOLD"?'<span class="global-sold-stamp"><i class="fa-solid fa-ticket-slash"></i> SOLD</span>':f?`<span class="global-closed-stamp"><i class="${c==="RACE_DAY"||t.globalRegistrationPhase==="RACE_DAY"?"fa-solid fa-flag-checkered":"fa-solid fa-lock"}"></i> ${v(m)}</span>`:o?'<span style="color:#ff6b00;"><i class="fa-solid fa-fire"></i> POPULAR</span>':"<span>OFFICIAL PASS</span>"}
        </div>
      </div>

      ${D}

      <div class="ticket-header">
        <span class="ticket-category-tag">${v(i.category)} MARATHON PASS</span>
        <h3 class="ticket-title">${v(i.ticketName)}</h3>
        ${b?`<div class="ticket-event-date"><i class="fa-regular fa-calendar-check"></i> ${v(b)}${i.followGlobalTimer?'<span><i class="fa-solid fa-link"></i> Timer Global</span>':""}</div>`:""}
        <div class="ticket-price">
          <span class="price-currency">Rp</span>
          <span class="price-amount">${Number(i.price).toLocaleString("id-ID")}</span>
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
          <span class="stock-status" style="color: ${f?"#EF4444":"#10B981"};">
            <i class="${f?"fa-solid fa-lock":"fa-solid fa-fire"}"></i> 
            ${f?v(m):`${s} Tiket Tersedia`}
          </span>
        </div>
        <div class="stock-bar-bg">
          <div class="stock-bar-fill" style="width: ${f?100:r}%; background: ${f?"#EF4444":""};"></div>
        </div>
      </div>

      <ul class="ticket-benefits">
        ${L}
      </ul>

      <!-- Aesthetic Barcode Strip for Authentic Athletic Pass -->
      <div class="ticket-barcode-strip">
        <div class="ticket-barcode-lines"></div>
        <div class="ticket-barcode-serial">RACE PASS • VERIFIED PASI TIMING</div>
      </div>

      <div class="ticket-pass-actions" style="display: flex; gap: 8px; margin-top: auto; padding-top: 14px;">
        <button class="btn btn-secondary btn-sm btn-view-ticket-detail" data-id="${i.id}" ${l?'disabled aria-disabled="true" title="Detail tiket tidak tersedia saat pendaftaran ditutup"':'title="Lihat Fasilitas & Rincian Lengkap"'} style="flex: 1;">
          <i class="fa-solid ${l?"fa-lock":"fa-circle-info"}"></i> ${l?"Detail Ditutup":"Detail Tiket"}
        </button>
        <button class="btn ${f?"btn-secondary":"btn-primary btn-glow"} btn-sm btn-select-ticket" data-id="${i.id}" ${f?'disabled aria-disabled="true" title="Pendaftaran sedang ditutup"':""} style="flex: 1.3;">
          <i class="${f?"fa-solid fa-lock":"fa-solid fa-ticket"}"></i> 
          ${f?v(m):"Daftar Sekarang"}
        </button>
      </div>
    `,f&&m!=="SOLD"&&y.insertAdjacentHTML("beforeend",'<span class="global-sold-stamp"><i class="fa-solid fa-ticket-slash"></i> SOLD</span>'),a.appendChild(y)}),document.querySelectorAll(".ticket-card").forEach(i=>{i.style.cursor=t.isGlobalClosed?"default":"pointer",i.addEventListener("click",o=>{if(t.isGlobalClosed||o.target.closest(".btn-select-ticket"))return;const s=i.querySelector(".btn-view-ticket-detail");if(s){const n=s.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${n}`}})}),document.querySelectorAll(".btn-view-ticket-detail").forEach(i=>{i.addEventListener("click",o=>{if(o.stopPropagation(),t.isGlobalClosed){o.preventDefault();return}const s=i.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${s}`})}),document.querySelectorAll(".btn-select-ticket").forEach(i=>{i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const s=i.getAttribute("data-id"),n=t.events.find(r=>r.id===s);!t.isGlobalClosed&&n&&!n.isClosed?ne(n):t.isGlobalClosed&&k("error","Pendaftaran Ditutup","Seluruh pendaftaran saat ini ditutup oleh panitia.")})})}}function F(e){return typeof(e==null?void 0:e.registrationClosed)=="boolean"?e.registrationClosed:!!(e!=null&&e.isClosed)||Z(e!=null&&e.eventDate?new Date(e.eventDate):null)!=="UPCOMING"}function Ee(){var i;const e=[];Number.isFinite(t.globalCountdownTarget)&&e.push(t.globalCountdownTarget);const a=new Set([(i=t.selectedEvent)==null?void 0:i.id]);document.querySelectorAll(".p-event-select").forEach(o=>a.add(o.value)),a.delete(void 0);for(const o of a){const s=t.events.find(r=>r.id===o),n=s!=null&&s.eventDate?new Date(s.eventDate).getTime():NaN;Number.isFinite(n)&&e.push(n)}return e.length?Math.min(...e):null}function ce(){var a;const e=new Set([(a=t.selectedEvent)==null?void 0:a.id]);return document.querySelectorAll(".p-event-select").forEach(i=>e.add(i.value)),e.delete(void 0),[...e].map(i=>t.events.find(o=>o.id===i)).filter(Boolean)}function et(e){const a=Math.max(0,Math.floor(e/1e3)),i=a%60,o=Math.floor(a/60)%60,s=Math.floor(a/3600)%24,n=Math.floor(a/86400),r=[s,o,i].map(l=>String(l).padStart(2,"0")).join(":");return n>0?`${n} hari ${r}`:r}function W(){t.registrationTimerInterval&&(clearInterval(t.registrationTimerInterval),t.registrationTimerInterval=null),t.registrationDeadline=null}function z(){const e=document.getElementById("regModal"),a=document.getElementById("registrationTimeRemaining"),i=document.getElementById("registrationTimerMessage"),o=document.getElementById("btnModalSubmit");if(!(e!=null&&e.classList.contains("active"))||!a||!i)return;const s=Ee();if(t.registrationDeadline=s,t.isGlobalClosed||ce().some(F)){if(t.checkoutSubmitting){t.registrationExpiredDuringSubmit=!0,i.textContent="Batas pendaftaran tercapai — memeriksa status",a.textContent="—",o&&(o.disabled=!0);return}W(),U(),k("warning","Pendaftaran Ditutup","Waktu pendaftaran telah berakhir. Formulir Anda dibatalkan dan belum dikirim.");return}if(!Number.isFinite(s)){a.textContent="—",i.textContent="Batas waktu pendaftaran belum ditentukan",a.classList.remove("urgent");return}const n=s-Date.now();if(n<=0){if(t.checkoutSubmitting){t.registrationExpiredDuringSubmit=!0,i.textContent="Batas pendaftaran tercapai — memeriksa status",a.textContent="—",a.classList.add("urgent"),o&&(o.disabled=!0);return}W(),o&&(o.disabled=!0),U(),k("warning","Pendaftaran Berakhir","Waktu pendaftaran telah habis. Formulir Anda dibatalkan dan belum dikirim.");return}a.textContent=et(n),a.classList.toggle("urgent",n<600*1e3),i.textContent=n<600*1e3?"Pendaftaran akan segera ditutup":"Sisa waktu pendaftaran",n<600*1e3&&!t.registrationWarningShown&&(t.registrationWarningShown=!0,k("warning","Pendaftaran Hampir Ditutup","Waktu pendaftaran tersisa kurang dari 10 menit. Selesaikan formulir dan lanjutkan pembayaran segera."))}function tt(){var e;W(),t.registrationWarningShown=!1,t.registrationExpiredDuringSubmit=!1,z(),(e=document.getElementById("regModal"))!=null&&e.classList.contains("active")&&(t.registrationTimerInterval=setInterval(z,1e3))}function ne(e=null){if(t.isGlobalClosed){const s=t.globalRegistrationPhase==="RACE_DAY"?"Pendaftaran ditutup otomatis karena acara telah dimulai.":t.globalRegistrationPhase==="COMPLETED"?"Pendaftaran ditutup karena hari pelaksanaan acara telah lewat.":"Seluruh pendaftaran Tegal Run 2027 telah ditutup oleh panitia.";k("error","Pendaftaran Ditutup",s);return}const a=t.events.filter(s=>!F(s));if(a.length===0){const s=t.events.some(n=>typeof n.registrationClosedByTimer=="boolean"?n.registrationClosedByTimer:Z(n.eventDate?new Date(n.eventDate):null)!=="UPCOMING");k("error","Pendaftaran Ditutup",s?"Tanggal pelaksanaan seluruh kategori telah tiba atau lewat. Ubah tanggal kategori atau sinkronkan dengan timer global di halaman admin.":"Seluruh pendaftaran kategori event telah ditutup oleh panitia.");return}t.selectedEvent=e&&!F(e)?e:a[0],t.currentStep=1,t.participantCount=1;const i=document.getElementById("regModal");if(!i)return;const o=document.getElementById("modalEventSelect");o&&(o.innerHTML=a.map(s=>`
      <option value="${s.id}" ${t.selectedEvent&&t.selectedEvent.id===s.id?"selected":""}>
        ${s.ticketName} - ${$(s.price)}
      </option>
    `).join("")),me(),pe(),Q(),i.classList.add("active"),document.body.style.overflow="hidden",tt(),j.getCheckoutConfig().then(s=>{s&&(t.feeSettings=s,Q())}).catch(()=>{})}function U(){W();const e=document.getElementById("regModal");e&&(e.classList.remove("active"),document.body.style.overflow="auto")}function me(){[1,2,3].forEach(s=>{const n=document.getElementById(`stepIndicator${s}`),r=document.getElementById(`stepSection${s}`);n&&(n.classList.remove("active","done"),s===t.currentStep&&n.classList.add("active"),s<t.currentStep&&n.classList.add("done")),r&&(r.style.display=s===t.currentStep?"block":"none")});const a=document.getElementById("btnModalPrev"),i=document.getElementById("btnModalNext"),o=document.getElementById("btnModalSubmit");a&&(a.style.display=t.currentStep>1?"inline-flex":"none"),i&&(i.style.display=t.currentStep<3?"inline-flex":"none"),o&&(o.style.display=t.currentStep===3?"inline-flex":"none")}function Se(){var s,n;const e=new Map(t.events.map(r=>[r.id,r]));let a=0;for(let r=0;r<t.participantCount;r++){const l=document.querySelector(`.p-event-select[data-index="${r}"]`),c=l?l.value:(s=t.selectedEvent)==null?void 0:s.id,p=e.get(c)||t.selectedEvent;p&&(a+=Number(p.price))}let i=0;(n=t.feeSettings)!=null&&n.feeEnabled&&t.feeSettings.feeAmount>0&&(t.feeSettings.feeType==="PER_TICKET"?i=t.feeSettings.feeAmount*t.participantCount:i=t.feeSettings.feeAmount);const o=a+i;return{ticketsSubtotal:a,serviceFee:i,grandTotal:o}}function Q(){var c;if(!t.selectedEvent)return;const{ticketsSubtotal:e,serviceFee:a,grandTotal:i}=Se(),o=document.getElementById("modalTotalAmount");o&&(o.textContent=$(i));const s=document.getElementById("step1TicketsSubtotal"),n=document.getElementById("step1FeeLabel"),r=document.getElementById("step1FeeAmount"),l=document.getElementById("step1GrandTotal");if(s&&(s.textContent=$(e)),r)if(a>0){if(r.textContent=`+ ${$(a)}`,r.style.color="#EA580C",n){const p=((c=t.feeSettings)==null?void 0:c.feeType)||"PER_TRANSACTION";n.textContent=`Biaya Layanan (${p==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`}}else r.textContent="Gratis (Rp 0)",r.style.color="#10B981",n&&(n.textContent="Biaya Layanan:");l&&(l.textContent=$(i))}function Y(){var r,l,c;if(!((r=document.getElementById("checkSameAsBooker"))==null?void 0:r.checked))return;const a=((l=document.getElementById("bookerName"))==null?void 0:l.value.trim())||"",i=((c=document.getElementById("bookerPhone"))==null?void 0:c.value.trim())||"",o=document.querySelector('.p-fullname[data-index="0"]'),s=document.querySelector('.p-phone[data-index="0"]'),n=document.querySelector('.p-bibname[data-index="0"]');o&&a&&(o.value=a),n&&a&&!n.value&&(n.value=a.substring(0,15).toUpperCase()),s&&i&&(s.value=i)}function pe(){var o,s;const e=document.getElementById("participantsContainer");if(!e)return;e.innerHTML="";const a=t.events.filter(n=>!F(n)),i=((o=t.selectedEvent)==null?void 0:o.id)||(((s=a[0])==null?void 0:s.id)??"");for(let n=0;n<t.participantCount;n++){const r=document.createElement("div");r.className="participant-box",r.innerHTML=`
      <div class="participant-box-header">
        <h4><i class="fa-solid fa-user-tag"></i> Data Peserta #${n+1}</h4>
        ${t.participantCount>1?`<span class="badge">Peserta ${n+1}</span>`:""}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Kategori Lari / Tiket <span class="req">*</span></label>
          <select class="form-select p-event-select" required data-index="${n}">
            ${a.map(g=>`
              <option value="${g.id}" ${g.id===i?"selected":""}>
                ${v(g.ticketName)} - ${$(g.price)}
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
        <div class="form-group p-jersey-fields" data-index="${n}"></div>
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
    `,e.appendChild(r);const l=r.querySelector(".p-phone"),c=r.querySelector(".p-emg-phone");le(l),le(c);const p=r.querySelector(".p-event-select");ue(r,n,(p==null?void 0:p.value)||i),p==null||p.addEventListener("change",()=>{ue(r,n,p.value),Q()})}Y()}function at(e){if(Array.isArray(e==null?void 0:e.sizes))return e.sizes.filter(a=>typeof a=="string"&&a.trim());if(typeof(e==null?void 0:e.sizes)=="string")try{const a=JSON.parse(e.sizes);return Array.isArray(a)?a.filter(i=>typeof i=="string"&&i.trim()):[]}catch(a){console.warn("Ukuran jersey dari backend tidak valid:",a)}return[]}function ue(e,a,i,o="",s=""){var h;const n=e.querySelector(".p-jersey-fields");if(!n)return;const r=t.events.find(m=>m.id===i),l=Array.isArray(r==null?void 0:r.jerseys)?r.jerseys:[];if(l.length===0){n.innerHTML=`
      <label class="form-label" for="participantSize-${a}">Ukuran Jersey Resmi</label>
      <select class="form-select p-size" id="participantSize-${a}" data-index="${a}">
        <option value="XS">XS (46 x 66 cm)</option>
        <option value="S">S (48 x 68 cm)</option>
        <option value="M" selected>M (50 x 70 cm)</option>
        <option value="L">L (52 x 72 cm)</option>
        <option value="XL">XL (54 x 74 cm)</option>
        <option value="XXL">XXL (56 x 76 cm)</option>
      </select>
      <div class="form-hint">Ukuran jersey standar event.</div>
    `;return}const c=l.find(m=>m.id===o)||l[0],p=at(c),g=l.length>1?`<label class="form-label" for="participantJersey-${a}">Tipe Jersey</label>
       <select class="form-select p-jersey" id="participantJersey-${a}" data-index="${a}" required>
         ${l.map(m=>`<option value="${v(m.id)}" ${m.id===c.id?"selected":""}>${v(m.name)} — ${v(m.type)}</option>`).join("")}
       </select>`:`<input type="hidden" class="p-jersey-id" data-index="${a}" value="${v(c.id)}">
       <label class="form-label">Tipe Jersey</label>
       <div class="participant-jersey-type"><i class="fa-solid fa-shirt" aria-hidden="true"></i> ${v(c.name)} — ${v(c.type)}</div>`,f=c.image?`<img class="participant-jersey-preview" src="${v(c.image)}" alt="Pratinjau ${v(c.name)}" loading="lazy" onerror="this.hidden=true">`:"";n.innerHTML=`
    ${g}
    <label class="form-label" for="participantSize-${a}" style="margin-top:8px;">Ukuran Jersey Resmi</label>
    <select class="form-select p-size" id="participantSize-${a}" data-index="${a}" required ${p.length?"":"disabled"}>
      ${p.map(m=>`<option value="${v(m)}" ${m===s?"selected":""}>${v(m)}</option>`).join("")}
    </select>
    ${p.length?"":'<div class="form-hint">Ukuran untuk tipe ini belum tersedia. Hubungi panitia.</div>'}
    ${f}
  `,(h=n.querySelector(".p-jersey"))==null||h.addEventListener("change",m=>{var w;const b=((w=n.querySelector(".p-size"))==null?void 0:w.value)||"";ue(e,a,i,m.target.value,b)})}function nt(e){var a,i,o,s,n,r,l,c,p,g,f,h;if(e===1){const m=(a=document.getElementById("bookerName"))==null?void 0:a.value.trim(),b=(i=document.getElementById("bookerEmail"))==null?void 0:i.value.trim(),w=(o=document.getElementById("bookerPhone"))==null?void 0:o.value.trim();return!m||m.length<3?(k("error","Validasi Gagal","Nama pemesan minimal 3 karakter."),!1):!b||!b.includes("@")?(k("error","Validasi Gagal","Email pemesan tidak valid."),!1):!w||!/^(\+62|62|08)\d{8,13}$/.test(w.replace(/\s+/g,""))?(k("error","Validasi Gagal","Nomor WhatsApp tidak valid (gunakan awalan 08 atau +628, min 10 digit)."),!1):(Y(),!0)}if(e===2){for(let m=0;m<t.participantCount;m++){const b=(s=document.querySelector(`.p-fullname[data-index="${m}"]`))==null?void 0:s.value.trim(),w=(n=document.querySelector(`.p-phone[data-index="${m}"]`))==null?void 0:n.value.trim(),y=(r=document.querySelector(`.p-bibname[data-index="${m}"]`))==null?void 0:r.value.trim(),I=(l=document.querySelector(`.p-nik[data-index="${m}"]`))==null?void 0:l.value.trim(),L=(c=document.querySelector(`.p-birthplace[data-index="${m}"]`))==null?void 0:c.value.trim(),P=(p=document.querySelector(`.p-birthdate[data-index="${m}"]`))==null?void 0:p.value.trim(),D=(g=document.querySelector(`.p-address[data-index="${m}"]`))==null?void 0:g.value.trim(),M=(f=document.querySelector(`.p-emg-name[data-index="${m}"]`))==null?void 0:f.value.trim(),N=(h=document.querySelector(`.p-emg-phone[data-index="${m}"]`))==null?void 0:h.value.trim();if(!b||b.length<3)return k("error",`Peserta #${m+1}`,"Nama lengkap KTP minimal 3 karakter."),!1;if(!w||!/^(\+62|62|08)\d{7,12}$/.test(w.replace(/\s+/g,"")))return k("error",`Peserta #${m+1}`,"Nomor WhatsApp peserta wajib diisi (contoh: 08123456789 atau +628123456789)."),!1;if(!y||y.length>15)return k("error",`Peserta #${m+1}`,"Nama BIB maksimal 15 karakter."),!1;if(!I||!/^\d{16}$/.test(I))return k("error",`Peserta #${m+1}`,"NIK harus tepat 16 digit angka sesuai KTP."),!1;if(!L||L.length<3)return k("error",`Peserta #${m+1}`,"Tempat lahir wajib diisi."),!1;if(!P)return k("error",`Peserta #${m+1}`,"Tanggal lahir wajib diisi."),!1;if(!D||D.length<10)return k("error",`Peserta #${m+1}`,"Alamat lengkap wajib diisi minimal 10 karakter."),!1;if(!M||M.length<3)return k("error",`Peserta #${m+1}`,"Nama kontak darurat wajib diisi."),!1;if(!N||!/^(\+62|62|08)\d{7,12}$/.test(N.replace(/\s+/g,"")))return k("error",`Peserta #${m+1}`,"Nomor kontak darurat harus diawali 08 atau +628."),!1}return!0}return!0}function it(){var p,g,f,h,m,b,w;const e=document.getElementById("summaryReviewBox");if(!e||!t.selectedEvent)return;const a=(p=document.getElementById("bookerName"))==null?void 0:p.value.trim(),i=(g=document.getElementById("bookerEmail"))==null?void 0:g.value.trim(),o=(f=document.getElementById("bookerPhone"))==null?void 0:f.value.trim(),{ticketsSubtotal:s,serviceFee:n,grandTotal:r}=Se(),l=new Map(t.events.map(y=>[y.id,y]));let c="";for(let y=0;y<t.participantCount;y++){const I=((h=document.querySelector(`.p-fullname[data-index="${y}"]`))==null?void 0:h.value.trim())||`Peserta #${y+1}`,L=((m=document.querySelector(`.p-event-select[data-index="${y}"]`))==null?void 0:m.value)||t.selectedEvent.id,P=l.get(L)||t.selectedEvent,D=((b=document.querySelector(`.p-phone[data-index="${y}"]`))==null?void 0:b.value.trim())||"-";c+=`
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 6px 0; border-bottom: 1px dotted #CBD5E1;">
        <div>
          <strong>#${y+1} ${v(I)}</strong> (${v(D)})<br>
          <span style="color: #64748B; font-size: 0.78rem;">Kategori: ${v(P.ticketName)}</span>
        </div>
        <span style="font-weight: 700; color: #0F172A;">${$(P.price)}</span>
      </div>
    `}e.innerHTML=`
    <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 18px;">
      <h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-receipt"></i> Ringkasan Tiket & Pemesan</h4>
      <p style="font-size: 0.88rem; margin-bottom: 4px;"><strong>Penanggung Jawab:</strong> ${v(a)}</p>
      <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 12px;">${v(i)} | ${v(o)}</p>

      <div style="margin-bottom: 14px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: #475569; text-transform: uppercase;">Rincian Peserta:</span>
        <div style="margin-top: 6px;">
          ${c}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 8px;">
        <span style="color: #64748B;">Subtotal Tiket:</span>
        <strong>${$(s)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 4px; ${n>0?"color: #EA580C;":"color: #10B981;"}">
        <span>Biaya Layanan (${((w=t.feeSettings)==null?void 0:w.feeType)==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):</span>
        <strong>${n>0?`+ ${$(n)}`:"Gratis (Rp 0)"}</strong>
      </div>
      <div style="border-top: 1px solid var(--color-border-subtle); margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: var(--color-text-title);">
        <span>Total Pembayaran:</span>
        <span style="color: var(--color-primary);">${$(r)}</span>
      </div>
    </div>
  `}async function st(){var w,y,I,L,P,D,M,N,R,_,q,d,u,x,C,T,K,J,V,S,B,A;const e=Ee();if(t.isGlobalClosed||ce().some(F)||Number.isFinite(e)&&Date.now()>=e){z();return}const a=(w=document.getElementById("checkConsentPDP"))==null?void 0:w.checked,i=(y=document.getElementById("checkConsentWaiver"))==null?void 0:y.checked;if(!a){k("warning","Persetujuan Diperlukan","Harap setujui Pemrosesan Data Pribadi sesuai UU PDP No. 27/2022.");return}if(!i){k("warning","Persetujuan Diperlukan","Harap setujui Pelepasan Tanggung Jawab Medis (Liability Waiver).");return}const o=[];for(let E=0;E<t.participantCount;E++){const O=((I=document.querySelector(`.p-event-select[data-index="${E}"]`))==null?void 0:I.value)||t.selectedEvent.id,G=(L=document.querySelector(`.p-fullname[data-index="${E}"]`))==null?void 0:L.value.trim(),ie=ve((P=document.querySelector(`.p-phone[data-index="${E}"]`))==null?void 0:P.value.trim()),Ie=(D=document.querySelector(`.p-bibname[data-index="${E}"]`))==null?void 0:D.value.trim().toUpperCase(),Te=(M=document.querySelector(`.p-nik[data-index="${E}"]`))==null?void 0:M.value.trim(),Ae=(N=document.querySelector(`.p-gender[data-index="${E}"]`))==null?void 0:N.value,Pe=(R=document.querySelector(`.p-birthplace[data-index="${E}"]`))==null?void 0:R.value.trim(),Be=(_=document.querySelector(`.p-birthdate[data-index="${E}"]`))==null?void 0:_.value.trim(),Le=(q=document.querySelector(`.p-address[data-index="${E}"]`))==null?void 0:q.value.trim(),Me=(d=document.querySelector(`.p-blood[data-index="${E}"]`))==null?void 0:d.value,De=(u=document.querySelector(`.p-size[data-index="${E}"]`))==null?void 0:u.value,Ne=((x=document.querySelector(`.p-jersey[data-index="${E}"]`))==null?void 0:x.value)||((C=document.querySelector(`.p-jersey-id[data-index="${E}"]`))==null?void 0:C.value)||null,$e=(T=document.querySelector(`.p-emg-name[data-index="${E}"]`))==null?void 0:T.value.trim(),Fe=ve((K=document.querySelector(`.p-emg-phone[data-index="${E}"]`))==null?void 0:K.value.trim()),Re=((J=document.querySelector(`.p-community[data-index="${E}"]`))==null?void 0:J.value.trim())||null,_e=((V=document.querySelector(`.p-medical[data-index="${E}"]`))==null?void 0:V.value.trim())||null;o.push({eventId:O,fullNameKtp:G,phoneNumber:ie,bibName:Ie,nik:Te,gender:Ae,birthPlace:Pe,birthDate:Be,fullAddress:Le,bloodType:Me,jerseyId:Ne,selectedSize:De,emergencyContactName:$e,emergencyContactPhone:Fe,communityName:Re,medicalHistory:_e})}const s=((S=document.getElementById("bookerName"))==null?void 0:S.value.trim())||"",n=((B=document.getElementById("bookerEmail"))==null?void 0:B.value.trim())||"",r=((A=document.getElementById("bookerPhone"))==null?void 0:A.value.trim())||"";if(!n||!r){k("warning","Data Pemesan Kurang","Harap lengkapi Nama, Email aktif, dan Nomor WhatsApp penanggung jawab.");return}const l={bookerName:s,bookerEmail:n,bookerPhone:r,eventId:t.selectedEvent.id,participants:o},c=document.getElementById("btnModalSubmit");c&&(c.disabled=!0,c.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses Pesanan...'),k("warning","Menghubungkan Server","Mengamankan slot tiket Anda ke sistem database..."),t.checkoutSubmitting=!0,t.registrationExpiredDuringSubmit=!1;const p=await j.registerOrder(l);if(t.checkoutSubmitting=!1,c&&(c.disabled=!1,c.innerHTML='<i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)'),!p.success){if(t.registrationExpiredDuringSubmit||Number.isFinite(t.registrationDeadline)&&Date.now()>=t.registrationDeadline||t.isGlobalClosed||ce().some(F)){U(),k("warning","Pendaftaran Berakhir",p.message||"Waktu pendaftaran telah habis. Formulir Anda dibatalkan.");return}k("error","Gagal Memesan Tiket",p.message);return}W(),k("success","Slot Tiket Diamankan!","Membuka gerbang pembayaran resmi Midtrans Snap...");const{paymentToken:g,paymentUrl:f,orderId:h,midtransOrderId:m}=p.data,b=h||m;try{await qe()}catch(E){k("error","Gateway Pembayaran Tidak Tersedia",E.message),window.location.href=`/payment.html?orderId=${encodeURIComponent(b)}`;return}window.snap&&typeof window.snap.pay=="function"?window.snap.pay(g,{onSuccess:function(){k("success","Pembayaran Berhasil!","Selamat! Membuka E-Tiket resmi Anda..."),U(),we(),setTimeout(()=>{window.location.href=`/e-ticket.html?orderId=${b}`},1200)},onPending:function(){k("warning","Menunggu Pembayaran","Mengarahkan ke halaman rincian instruksi pembayaran..."),U(),setTimeout(()=>{window.location.href=`/payment.html?orderId=${b}`},1200)},onError:function(){k("error","Pembayaran Gagal","Transaksi dibatalkan atau kedaluwarsa.")},onClose:function(){k("warning","Transaksi Tertunda","Mengarahkan ke halaman instruksi pembayaran & pembatalan..."),setTimeout(()=>{window.location.href=`/payment.html?orderId=${b}`},1e3)}}):f&&window.open(f,"_blank")}function oe(e){const a=document.getElementById(e);a&&(a.classList.add("active"),document.body.style.overflow="hidden")}function H(e){const a=document.getElementById(e);a&&(a.classList.remove("active"),document.body.style.overflow="auto")}function ge(e){const a=document.getElementById("statsBanner");if(!a||!Array.isArray(e))return;const i=Array.isArray(t.events)?t.events:[];e=e.filter(n=>!n||typeof n!="object"||n.visible===!1||!!!String(n.unit||n.desc||"").trim()?!1:n.type==="AUTO"?["TOTAL_PARTICIPANTS","PAID_PARTICIPANTS","TOTAL_CATEGORIES","TOTAL_CAPACITY","AVAILABLE_SLOTS"].includes(n.autoKey):String(n.val??"").trim()!==""),a.replaceChildren(),a.hidden=e.length===0||t.cmsVisibility.stats===!1;const o=i.reduce((n,r)=>(n.participants+=Number(r.registeredCount||0),n.paid+=Number(r.paidCount||0),n.capacity+=Number(r.totalCapacity??Number(r.remainingStock??r.stock??0)+Number(r.registeredCount||0)),n.available+=Number(r.remainingStock??r.stock??0),n),{participants:0,paid:0,capacity:0,available:0}),s={TOTAL_PARTICIPANTS:o.participants,PAID_PARTICIPANTS:o.paid,TOTAL_CATEGORIES:i.length,TOTAL_CAPACITY:o.capacity,AVAILABLE_SLOTS:o.available};e.forEach((n,r)=>{const l=n.type==="AUTO"&&Object.hasOwn(s,n.autoKey),c=l?s[n.autoKey]:n.val,p=l?Number(c||0).toLocaleString("id-ID"):c,g=document.createElement("div");g.className="stat-item";const f=typeof n.icon=="string"&&/^[a-z0-9-]+$/.test(n.icon)?n.icon:"fa-chart-simple",h=document.createElement("span");h.className="stat-icon";const m=document.createElement("i");m.className=`fa-solid ${f}`,m.setAttribute("aria-hidden","true"),h.append(m);const b=document.createElement("div");b.className="stat-num",r<4&&(b.id=`statVal${r+1}`);const w=document.createElement("span");w.textContent=p==null?"":String(p);const y=document.createElement("small");y.textContent=n.unit||"",r<4&&(y.id=`statUnit${r+1}`),b.append(w,document.createTextNode(" "),y);const I=document.createElement("div");I.className="stat-desc",I.textContent=n.desc||"",r<4&&(I.id=`statDesc${r+1}`),g.append(h,b,I),a.append(g)})}function Ce(e,a){const i=document.querySelector("#rute .route-visual-card");if(!i)return;const o=String(e||"").trim(),s=t.cmsRouteMapMode;let n="";if(s==="GMAPS"&&o){const l=o.match(/src=["']([^"']+)["']/i),c=(l==null?void 0:l[1])||o;try{const p=new URL(c),g=p.hostname.toLowerCase(),f=g==="google.com"||g.endsWith(".google.com")||g==="maps.app.goo.gl"||g==="goo.gl";p.protocol==="https:"&&f&&(n=g.endsWith("google.com")&&p.pathname.startsWith("/maps/embed")?p.href:`https://www.google.com/maps?q=${encodeURIComponent(c)}&output=embed`)}catch(p){console.warn("Link Google Maps CMS tidak valid:",p)}}i.replaceChildren();const r=document.createElement("div");if(r.className="route-badge-float",r.innerHTML=s==="IMAGE"?'<i class="fa-solid fa-map"></i> Peta Rute':'<i class="fa-solid fa-location-dot"></i> Rute & Lokasi Google Maps',i.append(r),n){const l=document.createElement("div");l.className="gmaps-responsive-wrapper";const c=document.createElement("iframe");c.src=n,c.title="Peta rute lari",c.allowFullscreen=!0,c.loading="lazy",c.referrerPolicy="no-referrer-when-downgrade",l.append(c),i.append(l)}else if(s==="IMAGE"&&a){const l=document.createElement("img");l.className="route-map-image",l.src=a,l.alt="Gambar peta rute lari",l.loading="lazy",i.append(l)}else{const l=document.createElement("p");l.className="route-map-empty",l.textContent="Peta rute belum tersedia.",i.append(l)}}function ot(e){const a=document.getElementById("faq"),i=document.getElementById("faqList"),o=document.getElementById("faqComingSoon");if(!a||!i||!o)return;let s=e;if(typeof s=="string")try{s=JSON.parse(s)}catch(r){console.warn("Data FAQ CMS tidak valid:",r),i.replaceChildren(),i.hidden=!0,o.textContent="FAQ tidak dapat dimuat.",o.hidden=!1;return}if(!Array.isArray(s)){console.warn("Data FAQ CMS tidak berbentuk daftar."),i.replaceChildren(),i.hidden=!0,o.textContent="FAQ tidak dapat dimuat.",o.hidden=!1;return}const n=s.filter(r=>r&&typeof r=="object"&&r.enabled!==!1&&String(r.question||"").trim()&&String(r.answer||"").trim());i.replaceChildren(),o.textContent="EVENT COMING SOON!",o.hidden=n.length>0,i.hidden=n.length===0,n.forEach((r,l)=>{const c=document.createElement("article");c.className=`faq-item${l===0?" active":""}`,c.innerHTML=`
      <button class="faq-question" type="button" aria-expanded="${l===0}">
        <span>${v(r.question)}</span>
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div class="faq-answer-wrapper">
        <div class="faq-answer">${v(r.answer)}</div>
      </div>
    `,i.append(c)})}function rt(e){const a=document.getElementById("siteComingSoon");if(!a)return;const o=["hero","stats","route","facilities","tickets","legal","faq","footer"].every(p=>e[p]===!1);a.hidden=!o;const s=document.querySelector(".mobile-bottom-dock");if(s&&(s.hidden=o),!o)return;const n=document.getElementById("comingSoonTitle"),r=document.getElementById("comingSoonMessage"),l=document.getElementById("comingSoonImage"),c=document.getElementById("comingSoonImageFallback");n&&(n.textContent=t.cmsComingSoonTitle),r&&(r.textContent=t.cmsComingSoonMessage,r.hidden=!t.cmsComingSoonMessage),!(!l||!c)&&(l.onerror=()=>{l.hidden=!0,c.hidden=!1},t.cmsComingSoonImageUrl?(l.alt=t.cmsComingSoonTitle,l.src=t.cmsComingSoonImageUrl,l.hidden=!1,c.hidden=!0):(l.removeAttribute("src"),l.hidden=!0,c.hidden=!1))}function ke(e,a){if(!e||typeof a!="string")return;const i=document.createDocumentFragment();let o=null;a.split(/\r?\n/).forEach(s=>{const n=s.trim();if(!n){o=null;return}if(n.startsWith("- ")){o||(o=document.createElement("ul"),i.appendChild(o));const c=document.createElement("li");c.textContent=n.slice(2).trim(),o.appendChild(c);return}o=null;const r=n.match(/^\d+[.)]\s+/),l=document.createElement(r?"h4":"p");l.textContent=n,i.appendChild(l)}),e.replaceChildren(i)}async function re(){try{const e=await j.getWebsiteSettings();if(!e)return;let a={};try{a=e.cms_visibility?JSON.parse(e.cms_visibility):{}}catch(d){console.warn("Pengaturan visibilitas CMS tidak valid:",d)}if(t.cmsVisibility=a,t.cmsComingSoonTitle=typeof e.coming_soon_title=="string"&&e.coming_soon_title.trim()?e.coming_soon_title.trim():"COMING SOON EVENT!",t.cmsComingSoonMessage=typeof e.coming_soon_message=="string"?e.coming_soon_message.trim():"Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!",t.cmsComingSoonImageUrl="",typeof e.coming_soon_image_url=="string"&&e.coming_soon_image_url.trim())try{const d=new URL(e.coming_soon_image_url.trim());["http:","https:"].includes(d.protocol)&&(t.cmsComingSoonImageUrl=d.href)}catch(d){console.warn("URL gambar Coming Soon tidak valid:",d)}[["beranda","hero"],["rute","route"],["fasilitas","facilities"],["kategori","tickets"],["legal","legal"],["faq","faq"]].forEach(([d,u])=>{const x=document.getElementById(d);x&&(x.hidden=a[u]===!1)});const o=document.getElementById("statsBanner");o&&(o.hidden=a.stats===!1),document.querySelectorAll(".glass-footer").forEach(d=>{d.hidden=a.footer===!1}),rt(a),e.site_title&&(document.title=e.site_title);const s=document.querySelector(".top-navbar .nav-brand"),n=s==null?void 0:s.querySelector(".brand-text");n&&typeof e.navbar_title=="string"&&(n.textContent=e.navbar_title.trim());const r=s==null?void 0:s.querySelector(".brand-icon");if(r){const d=new Set(["fa-person-running","fa-medal","fa-trophy","fa-flag-checkered","fa-bolt","fa-fire","fa-star","fa-mountain-sun","fa-shoe-prints","fa-heart-pulse","fa-stopwatch","fa-award","fa-dumbbell","fa-route","fa-location-dot","fa-sun","fa-water","fa-compass","fa-crown","fa-leaf"]),u=typeof e.navbar_icon_url=="string"?e.navbar_icon_url.trim():"",x=e.navbar_icon_mode==="IMAGE"||!e.navbar_icon_mode&&!!u;let C="";if(x&&u)try{const T=new URL(u);["http:","https:"].includes(T.protocol)&&(C=T.href)}catch{C=""}if(C){const T=document.createElement("img");T.src=C,T.alt="",T.loading="lazy",T.style.cssText="width: 100%; height: 100%; padding: 4px; object-fit: contain; border-radius: inherit; background: #FFFFFF;",r.replaceChildren(T)}else{const T=document.createElement("i"),K=d.has(e.navbar_icon)?e.navbar_icon:"fa-person-running";T.className=`fa-solid ${K}`,r.replaceChildren(T)}}const l=document.getElementById("heroStatusText")||document.querySelector(".hero-pill-badge span:not(.status-dot)");t.cmsHeroBadge=e.hero_badge||"",l&&t.cmsHeroBadge&&(l.textContent=t.cmsHeroBadge),te();const c=document.querySelector(".hero-title");if(c){const d=typeof e.hero_title=="string"?e.hero_title.trim():"";c.textContent=d,c.hidden=!d}const p=document.querySelector(".hero-desc");if(p){const d=typeof e.hero_subtitle=="string"?e.hero_subtitle.trim():"";p.textContent=d,p.hidden=!d}const g=document.getElementById("heroDisplayImg"),f=document.getElementById("heroVisual"),h=document.querySelector("#beranda .hero-split-grid");if(g&&f){const d=typeof e.hero_bg_image=="string"?e.hero_bg_image.trim():"";f.hidden=!0,h==null||h.classList.toggle("hero-no-visual",!d),g.onload=()=>{f.hidden=!1,h==null||h.classList.remove("hero-no-visual")},g.onerror=()=>{f.hidden=!0,h==null||h.classList.add("hero-no-visual")},d?(g.alt=typeof e.hero_title=="string"?e.hero_title.trim():"",g.src=d,g.complete&&g.naturalWidth>0&&(f.hidden=!1,h==null||h.classList.remove("hero-no-visual"))):g.removeAttribute("src")}let m;try{m=e.stats_banner_items?JSON.parse(e.stats_banner_items):null,Array.isArray(m)||(m=null)}catch(d){console.warn("Data kartu statistik CMS tidak valid:",d),m=null}m||(m=[1,2,3,4].map(d=>({type:"CUSTOM",val:e[`stat_${d}_val`]||"",unit:e[`stat_${d}_unit`]||"",desc:e[`stat_${d}_desc`]||""})).filter(d=>d.val||d.unit||d.desc)),t.cmsStatsItems=m,ge(m);const b=document.getElementById("rute");if(b){const d=document.getElementById("routeSectionBadgeLabel");d&&typeof e.route_badge_label=="string"&&(d.textContent=e.route_badge_label,d.parentElement.hidden=!e.route_badge_label.trim());const u=document.getElementById("routeSectionTitle")||b.querySelector(".section-title");u&&typeof e.route_title=="string"&&(u.textContent=e.route_title,u.hidden=!e.route_title.trim());const x=document.getElementById("routeSectionDesc")||b.querySelector(".route-info-card > p");x&&typeof e.route_desc=="string"&&(x.textContent=e.route_desc,x.hidden=!e.route_desc.trim());const C=document.getElementById("btnDownloadGpx");C&&(C.hidden=!e.route_gpx_url||e.route_gpx_url==="#"),C&&e.route_gpx_url&&(C.href=e.route_gpx_url,e.route_gpx_url==="#"?C.onclick=T=>{T.preventDefault(),alert("File GPX Rute Tegal Run 2027 akan dapat diunduh pada H-14 perlombaan.")}:/^https?:\/\//i.test(e.route_gpx_url)?(C.setAttribute("target","_blank"),C.setAttribute("rel","noopener noreferrer"),C.onclick=null):(C.removeAttribute("target"),C.removeAttribute("rel"),C.onclick=null)),t.cmsRouteMapUrl=Object.hasOwn(e,"route_gmaps_url")?e.route_gmaps_url:e.gmaps_embed_url||"",t.cmsRouteMapImage=e.route_map_image||"",t.cmsRouteMapMode=e.route_map_mode==="IMAGE"?"IMAGE":"GMAPS",t.cmsRouteCheckpointMode=e.route_checkpoint_mode==="IMAGE"?"IMAGE":"MANUAL",t.cmsRouteCheckpointImage=e.route_checkpoint_image||"",Ce(t.cmsRouteMapUrl,t.cmsRouteMapImage)}ot(e.faq_items);const w=document.getElementById("fasilitas");if(w){const d=w.querySelector(".section-title");d&&typeof e.facilities_title=="string"&&(d.textContent=e.facilities_title,d.hidden=!e.facilities_title.trim());const u=w.querySelector(".section-desc");u&&typeof e.facilities_desc=="string"&&(u.textContent=e.facilities_desc,u.hidden=!e.facilities_desc.trim())}const y=document.getElementById("facilitiesMedia");y&&(y.hidden=!e.facilities_image,e.facilities_image&&(y.src=e.facilities_image));const I=document.getElementById("facilitiesContainer");if(I){const d=[{icon:"fa-shirt",title:"Jersey Running Dry-Fit",desc:"Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh."},{icon:"fa-microchip",title:"Nomor Dada (BIB) & Timing Chip",desc:"Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online."},{icon:"fa-medal",title:"Medali Finisher Logam Cor",desc:"Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT."},{icon:"fa-bottle-water",title:"Water & Isotonic Station",desc:"Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar."},{icon:"fa-truck-medical",title:"Tim Medis & Ambulans Mobile",desc:"Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute."},{icon:"fa-utensils",title:"Refreshment & Finisher Feast",desc:"Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar."}];let u;try{u=e.facilities_items?JSON.parse(e.facilities_items):d}catch(x){console.warn("Data fasilitas CMS tidak valid:",x),u=d}Array.isArray(u)||(u=d),I.innerHTML=u.filter(x=>x&&typeof x=="object"&&x.visible!==!1).map(x=>`
        <div class="facility-card">
          <div class="facility-card-head">
            <div class="facility-icon-wrap">
              <i class="fa-solid ${v(x.icon||"fa-gift")}"></i>
            </div>
            <h4 class="facility-title">${v(x.title||"")}</h4>
          </div>
          <p class="facility-desc">${v(x.desc||"")}</p>
        </div>
      `).join("")}const L=document.getElementById("kategori");if(L){const d=L.querySelector(".section-title");d&&typeof e.tickets_title=="string"&&(d.textContent=e.tickets_title,d.hidden=!e.tickets_title.trim());const u=L.querySelector(".section-desc");u&&typeof e.tickets_desc=="string"&&(u.textContent=e.tickets_desc,u.hidden=!e.tickets_desc.trim())}const P=document.getElementById("ticketsCmsMedia");P&&(P.hidden=!e.medal_image,e.medal_image&&(P.src=e.medal_image));const D=document.getElementById("legalSectionBadge");D&&typeof e.legal_badge_label=="string"&&(D.textContent=e.legal_badge_label);const M=document.getElementById("legalSectionTitle");M&&typeof e.legal_title=="string"&&(M.textContent=e.legal_title,M.hidden=!e.legal_title.trim());const N=document.getElementById("legalSectionDesc");N&&typeof e.legal_desc=="string"&&(N.textContent=e.legal_desc,N.hidden=!e.legal_desc.trim());const R=document.getElementById("legalGridContainer");if(R){let d;try{d=e.legal_items?JSON.parse(e.legal_items):null,Array.isArray(d)||(d=null)}catch(u){console.warn("Data legalitas CMS tidak valid:",u),d=null}d||(d=[1,2,3,4].map((u,x)=>({icon:["fa-certificate","fa-road-barrier","fa-shield-heart","fa-user-lock"][x],title:e[`legal_item_${u}_title`]||"",desc:e[`legal_item_${u}_desc`]||""})).filter(u=>u.title||u.desc)),d=d.filter(u=>u&&typeof u=="object"&&u.visible!==!1),R.innerHTML=d.map(u=>`
        <div class="legal-item">
          <i class="fa-solid ${v(u.icon||"fa-certificate")}"></i>
          <h4>${v(u.title||"")}</h4>
          <p>${v(u.desc||"")}</p>
        </div>
      `).join(""),R.hidden=d.length===0}const _=document.getElementById("legalPrivacyButtonLabel");_&&typeof e.legal_privacy_button=="string"&&(_.textContent=e.legal_privacy_button);const q=document.getElementById("legalTermsButtonLabel");if(q&&typeof e.legal_terms_button=="string"&&(q.textContent=e.legal_terms_button),[["privacyModalTitle",e.privacy_modal_title],["privacyModalSubtitle",e.privacy_modal_subtitle],["termsModalTitle",e.terms_modal_title],["termsModalSubtitle",e.terms_modal_subtitle]].forEach(([d,u])=>{const x=document.getElementById(d);x&&typeof u=="string"&&(x.textContent=u)}),ke(document.getElementById("privacyModalContent"),e.privacy_modal_content),ke(document.getElementById("termsModalContent"),e.terms_modal_content),e.contact_email&&document.querySelectorAll(".footer-email").forEach(d=>d.textContent=e.contact_email),e.contact_phone&&document.querySelectorAll(".footer-phone").forEach(d=>d.textContent=e.contact_phone),e.contact_address){const d=document.querySelector(".footer-address");d&&(d.textContent=e.contact_address)}if(e.footer_copyright){const d=document.querySelector(".footer-copyright-text")||document.querySelector(".footer-bottom > div:first-child");d&&(d.textContent=e.footer_copyright)}Ue(e)}catch(e){console.warn("Failed to apply website settings:",e)}}async function ee(){const e=document.getElementById("routeChecklistContainer");try{const a=await j.getRouteOverview();if(!a){e&&(e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>');return}t.cmsRouteMapUrl||(t.cmsRouteMapUrl=a.gmapsUrl||""),t.cmsRouteMapImage||(t.cmsRouteMapImage=a.routeMapImage||""),t.cmsRouteMapMode=a.mapMode==="IMAGE"?"IMAGE":"GMAPS",t.cmsRouteCheckpointMode=a.checkpointMode==="IMAGE"?"IMAGE":"MANUAL",t.cmsRouteCheckpointImage=a.checkpointImage||"";const i=document.getElementById("routeSectionBadgeLabel");if(i&&typeof a.badgeLabel=="string"&&(i.textContent=a.badgeLabel,i.parentElement.hidden=!a.badgeLabel.trim()),Ce(t.cmsRouteMapUrl,t.cmsRouteMapImage),e)if(t.cmsRouteCheckpointMode==="IMAGE"&&t.cmsRouteCheckpointImage){const o=document.createElement("img");o.className="route-checkpoint-image",o.src=t.cmsRouteCheckpointImage,o.alt="Peta checkpoint dan detail rute event",o.loading="lazy",e.replaceChildren(o)}else t.cmsRouteCheckpointMode==="IMAGE"?e.innerHTML='<p class="route-map-empty">Gambar checkpoint belum tersedia.</p>':Array.isArray(a.points)&&a.points.length>0?e.innerHTML=a.points.map((o,s)=>`
          <div class="route-point">
            <div class="route-point-marker">${String(s+1).padStart(2,"0")}</div>
            <div class="route-point-content">
              <h4>${v(o.name)}${o.distanceKm>0?` <small style="font-weight:500;color:#64748B;">— Km ${o.distanceKm}</small>`:""}</h4>
              <p>${v(o.description||"")}</p>
              ${o.isWaterStation?'<span class="route-tag" style="display:inline-block;margin-top:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#EFF6FF;color:#3B82F6;font-weight:600;">💧 Water Station</span>':""}
              ${o.isMedicalSpot?'<span class="route-tag" style="display:inline-block;margin-top:4px;margin-left:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#F0FDF4;color:#16A34A;font-weight:600;">🏥 Pos Medis</span>':""}
            </div>
          </div>
        `).join(""):e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>'}catch(a){console.error("Gagal memuat data rute:",a),e&&(e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Data rute gagal dimuat. Silakan coba beberapa saat lagi.</p>')}}function lt(){const e=document.getElementById("navMenu"),a=document.getElementById("navMobileToggle"),i=document.querySelectorAll(".nav-dropdown"),o=s=>{if(!e||!a)return;e.classList.toggle("mobile-open",s),a.setAttribute("aria-expanded",String(s)),a.setAttribute("aria-label",s?"Tutup menu":"Buka menu");const n=a.querySelector("i");n&&(n.className=s?"fa-solid fa-xmark":"fa-solid fa-bars")};a==null||a.addEventListener("click",s=>{s.stopPropagation(),o(!(e!=null&&e.classList.contains("mobile-open")))}),e==null||e.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>o(!1))}),i.forEach(s=>{const n=s.querySelector(".nav-dropdown-toggle");n==null||n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();const l=s.classList.contains("active");i.forEach(c=>c.classList.remove("active")),s.classList.toggle("active",!l)})}),document.addEventListener("click",()=>{i.forEach(s=>s.classList.remove("active")),o(!1)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&(i.forEach(n=>n.classList.remove("active")),o(!1))})}function ye(){var r,l,c,p,g,f,h,m,b,w,y,I,L,P,D,M,N,R,_,q,d,u,x,C,T,K,J,V;X(),se(),re(),ee(),we(),lt(),Oe().on("public:data_changed",({topics:S=[]}={})=>{S.includes("events")&&he(),S.includes("countdown")&&se(),S.includes("cms")&&(re(),ee()),S.includes("routes")&&ee()}),window.addEventListener("realtime:reconnected",()=>{Promise.all([he(),se(),re(),ee()])});const a=async S=>{if(S&&S.preventDefault(),t.isGlobalClosed){k("error","Pendaftaran Ditutup","Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.");return}if(t.events.length>0){const B=t.events.find(A=>!A.isClosed)||t.events[0];ne(B)}else{const B=document.getElementById("kategori")||document.getElementById("ticketsSection");B&&B.scrollIntoView({behavior:"smooth"});try{const A=await j.getEvents();if(A&&A.length>0){t.events=A,ae(A);const E=A.find(O=>!O.isClosed)||A[0];ne(E)}}catch{k("error","Gagal Memuat Kategori","Gagal memuat kategori tiket. Pastikan server backend aktif.")}}};(r=document.getElementById("heroCtaBtn"))==null||r.addEventListener("click",a),(l=document.getElementById("navDaftarBtn"))==null||l.addEventListener("click",a),(c=document.getElementById("dockDaftarBtn"))==null||c.addEventListener("click",a),(p=document.getElementById("modalCloseBtn"))==null||p.addEventListener("click",U),(g=document.getElementById("regModal"))==null||g.addEventListener("click",S=>{S.target.id==="regModal"&&U()}),(f=document.getElementById("modalEventSelect"))==null||f.addEventListener("change",S=>{const B=t.events.find(A=>A.id===S.target.value);B&&(t.selectedEvent=B,pe(),Q(),z())}),(h=document.getElementById("regModal"))==null||h.addEventListener("change",S=>{S.target.matches(".p-event-select")&&z()}),(m=document.getElementById("modalParticipantCount"))==null||m.addEventListener("change",S=>{t.participantCount=parseInt(S.target.value,10)||1,pe(),Q()});const i=document.getElementById("bookerPhone");i&&le(i),(b=document.getElementById("checkSameAsBooker"))==null||b.addEventListener("change",()=>{Y()}),(w=document.getElementById("bookerName"))==null||w.addEventListener("input",()=>{Y()}),(y=document.getElementById("bookerPhone"))==null||y.addEventListener("input",()=>{Y()}),(I=document.getElementById("btnModalNext"))==null||I.addEventListener("click",()=>{nt(t.currentStep)&&(t.currentStep++,t.currentStep===3&&it(),me())}),(L=document.getElementById("btnModalPrev"))==null||L.addEventListener("click",()=>{t.currentStep>1&&(t.currentStep--,me())}),(P=document.getElementById("btnModalSubmit"))==null||P.addEventListener("click",st);const o=()=>oe("privacyModal");(D=document.getElementById("btnOpenPrivacyModal"))==null||D.addEventListener("click",o),(M=document.getElementById("footerPrivacyLink"))==null||M.addEventListener("click",o),(N=document.getElementById("privacyCloseBtn"))==null||N.addEventListener("click",()=>H("privacyModal")),(R=document.getElementById("privacyOkBtn"))==null||R.addEventListener("click",()=>H("privacyModal"));const s=()=>oe("termsModal");(_=document.getElementById("btnOpenTerms"))==null||_.addEventListener("click",s),(q=document.getElementById("btnOpenTermsModal"))==null||q.addEventListener("click",s),(d=document.getElementById("footerTermsLink"))==null||d.addEventListener("click",s),(u=document.getElementById("footerWaiverLink"))==null||u.addEventListener("click",s),(x=document.getElementById("termsCloseBtn"))==null||x.addEventListener("click",()=>H("termsModal")),(C=document.getElementById("termsOkBtn"))==null||C.addEventListener("click",()=>H("termsModal")),(T=document.getElementById("btnOpenSizeChart"))==null||T.addEventListener("click",()=>oe("sizeChartModal")),(K=document.getElementById("sizeChartCloseBtn"))==null||K.addEventListener("click",()=>H("sizeChartModal")),(J=document.getElementById("sizeChartOkBtn"))==null||J.addEventListener("click",()=>H("sizeChartModal")),(V=document.getElementById("faqList"))==null||V.addEventListener("click",S=>{const B=S.target.closest(".faq-question");if(!B)return;const A=B.closest(".faq-item"),E=A.classList.contains("active");document.querySelectorAll("#faqList .faq-item.active").forEach(O=>{var G;O.classList.remove("active"),(G=O.querySelector(".faq-question"))==null||G.setAttribute("aria-expanded","false")}),E||(A.classList.add("active"),B.setAttribute("aria-expanded","true"))});const n=document.querySelectorAll("section[id]");window.addEventListener("scroll",()=>{const S=window.pageYOffset;n.forEach(B=>{const A=B.offsetHeight,E=B.offsetTop-120,O=B.getAttribute("id"),G=document.querySelector(`.mobile-bottom-dock a[href*="${O}"]`);G&&S>E&&S<=E+A&&(document.querySelectorAll(".mobile-bottom-dock a").forEach(ie=>ie.classList.remove("active")),G.classList.add("active"))})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ye):ye();
