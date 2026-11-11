import{b as M,a as ye,l as xe}from"./api-KOLSX-Q2.js";/* empty css              */const we=`<!-- =========================================================================
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
</div>`,Ee=`<!-- =========================================================================
     TOP FLOATING GLASS NAVBAR (MINIMALIST & LEGA)
     ========================================================================= -->
<div class="top-navbar-container">
  <style>
    :root { --nav-bg: rgba(255, 255, 255, 0.75); --nav-border: rgba(226, 232, 240, 0.8); --nav-text: #334155; --nav-text-active: #FF6B00; --nav-hover-bg: rgba(255, 107, 0, 0.08); --shadow-glass: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03); --shadow-dropdown: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04); --radius-nav: 99px; --radius-menu: 16px; }
    .top-navbar-container { position: fixed; top: 16px; left: 0; right: 0; z-index: 1000; display: flex; justify-content: center; padding: 0 16px; pointer-events: none; }
    .top-navbar { pointer-events: auto; width: 100%; max-width: 1080px; background: var(--nav-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--nav-border); border-radius: var(--radius-nav); padding: 8px 14px 8px 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-glass); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #0F172A; font-weight: 800; font-size: 0.95rem; letter-spacing: -0.2px; transition: transform 0.2s ease; }
    .nav-brand:hover { transform: scale(1.02); }
    .brand-icon { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #FF6B00 0%, #FF852D 100%); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(255, 107, 0, 0.3); }
    .brand-text span { color: #FF6B00; }
    .nav-links { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }
    .nav-links > li { position: relative; }
    .nav-link { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 99px; font-size: 0.85rem; font-weight: 600; color: var(--nav-text); text-decoration: none; background: transparent; border: none; cursor: pointer; font-family: inherit; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
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
    .nav-mobile-toggle { display: none; background: transparent; border: none; font-size: 1.2rem; color: #0F172A; cursor: pointer; padding: 6px 10px; }
    @media (max-width: 868px) {
      .top-navbar-container { top: 10px; padding: 0 10px; }
      .nav-mobile-toggle { display: block; }
      .nav-links { position: absolute; top: calc(100% + 10px); left: 0; right: 0; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: 20px; padding: 14px; flex-direction: column; align-items: stretch; gap: 6px; box-shadow: var(--shadow-dropdown); opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .nav-links.mobile-open { opacity: 1; visibility: visible; transform: translateY(0); }
      .nav-link { width: 100%; justify-content: space-between; padding: 10px 16px; border-radius: 12px; }
      .nav-dropdown-menu { position: static; transform: none !important; width: 100%; box-shadow: none; border: none; background: #F8FAFC; margin-top: 4px; display: none; opacity: 1; visibility: visible; pointer-events: auto; }
      .nav-dropdown-menu::before { display: none; }
      .nav-dropdown.active .nav-dropdown-menu { display: block; }
    }
  </style>

  <nav class="top-navbar">
    <a href="#beranda" class="nav-brand">
      <div class="brand-icon"><i class="fa-solid fa-person-running"></i></div>
      <div class="brand-text">TEGAL RUN <span>2027</span></div>
    </a>

    <ul class="nav-links" id="navMenu">
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
      <button type="button" class="nav-mobile-toggle" id="navMobileToggle" aria-label="Toggle Menu"><i class="fa-solid fa-bars"></i></button>
    </div>
  </nav>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const mobileToggle = document.getElementById('navMobileToggle'), navMenu = document.getElementById('navMenu'), dropdowns = document.querySelectorAll('.nav-dropdown');
      if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
          e.stopPropagation(); navMenu.classList.toggle('mobile-open');
          mobileToggle.querySelector('i').className = navMenu.classList.contains('mobile-open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
      }
      dropdowns.forEach(dropdown => {
        dropdown.querySelector('.nav-dropdown-toggle').addEventListener('click', (e) => {
          e.stopPropagation(); dropdowns.forEach(other => { if (other !== dropdown) other.classList.remove('active'); });
          dropdown.classList.toggle('active');
        });
      });
      document.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('mobile-open');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        if (mobileToggle) mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  <\/script>
</div>`,Se=`<!-- =========================================================================
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

`,Te=`<!-- =========================================================================
     FLOATING BOTTOM MOBILE DOCK NAVBAR (MODERN GLASS STYLE)
     ========================================================================= -->
<div class="mobile-bottom-dock">
  <style>
    .mobile-bottom-dock { position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 999; width: calc(100% - 24px); max-width: 440px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(226, 232, 240, 0.8); border-radius: 99px; padding: 6px; box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04); display: none; }
    .dock-items { display: flex; align-items: center; justify-content: space-between; list-style: none; margin: 0; padding: 0; }
    .dock-item { flex: 1; text-align: center; }
    .dock-item a { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; padding: 8px 4px; border-radius: 99px; text-decoration: none; color: #64748B; font-size: 0.7rem; font-weight: 600; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); position: relative; }
    .dock-item a i { font-size: 1.05rem; transition: transform 0.25s ease, color 0.25s ease; }
    .dock-item a:hover { color: #FF6B00; transform: translateY(-2px); }
    .dock-item a.active { color: #FF6B00; background: rgba(255, 107, 0, 0.1); font-weight: 700; }
    .dock-item a.active i { transform: scale(1.15); color: #FF6B00; }
    .dock-item.dock-cta a { background: linear-gradient(135deg, #FF6B00 0%, #FF852D 100%); color: #FFF; font-weight: 700; padding: 9px 6px; box-shadow: 0 4px 12px rgba(255, 107, 0, 0.35); }
    .dock-item.dock-cta a:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 6px 16px rgba(255, 107, 0, 0.45); color: #FFF; }
    .dock-item.dock-cta a i { color: #FFF; }
    @media (max-width: 868px) { .mobile-bottom-dock { display: block; } }
  </style>

  <ul class="dock-items">
    <li class="dock-item">
      <a href="#beranda" class="active">
        <i class="fa-solid fa-house"></i>
        <span>Beranda</span>
      </a>
    </li>
    <li class="dock-item">
      <a href="#kategori">
        <i class="fa-solid fa-ticket"></i>
        <span>Kategori</span>
      </a>
    </li>
    <li class="dock-item">
      <a href="#rute">
        <i class="fa-solid fa-map"></i>
        <span>Rute</span>
      </a>
    </li>
    <li class="dock-item">
      <a href="/cek-tiket.html">
        <i class="fa-solid fa-magnifying-glass"></i>
        <span>Cek Tiket</span>
      </a>
    </li>
    <li class="dock-item dock-cta">
      <a href="#" id="dockDaftarBtn">
        <i class="fa-solid fa-bolt"></i>
        <span>Daftar</span>
      </a>
    </li>
  </ul>
</div>`,Ie=`<!-- =========================================================================
     HERO SECTION (2-COLUMN SPLIT ATHLETIC SPORT DESIGN)
     File: template/sections/hero.html
     ========================================================================= -->
<section class="hero-section" id="beranda">
  <div class="container">
    <div class="hero-split-grid">
      
      <!-- SISI KIRI: Judul, Deskripsi, Tombol Aksi & Hitung Mundur Race Day -->
      <div class="hero-col-content">
        <div class="hero-pill-badge" id="heroStatusBadge">
          <span class="status-dot"></span>
          <i class="fa-solid fa-bolt badge-icon" aria-hidden="true"></i>
          <span id="heroStatusText">PENDAFTARAN RESMI DIBUKA</span>
        </div>

        <h1 class="hero-title">
          Tegal Run 2027<br>
          <span class="gradient-orange">Lari Bersama Menembus Batas</span>
        </h1>

        <p class="hero-desc">
          Kompetisi lari terbesar di Kota Bahari dengan standar race profesional, timing chip akurat, dan medali finisher eksklusif.
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary btn-glow" id="heroCtaBtn">
            <i class="fa-solid fa-ticket" aria-hidden="true"></i> Amankan Slot Lari Sekarang
          </button>

          <button class="btn btn-secondary" id="btnOpenTerms">
            <i class="fa-solid fa-file-contract" aria-hidden="true"></i> Syarat &amp; Ketentuan
          </button>
        </div>

        <!-- Countdown Box (Hitung Mundur Race Day) -->
        <div class="countdown-box">
          <div class="countdown-header">
            <div class="countdown-title-wrap">
              <i class="fa-solid fa-stopwatch" aria-hidden="true"></i>
              <span>HITUNG MUNDUR MENUJU RACE DAY:</span>
            </div>
            <div class="event-date-pill badge-pending-date" id="eventDateDisplay">TANGGAL BELUM DITENTUKAN</div>
          </div>
          <div class="countdown-grid">
            <div class="countdown-card">
              <div class="countdown-num" id="days">--</div>
              <div class="countdown-text">Hari</div>
            </div>
            <div class="countdown-card">
              <div class="countdown-num" id="hours">--</div>
              <div class="countdown-text">Jam</div>
            </div>
            <div class="countdown-card">
              <div class="countdown-num" id="minutes">--</div>
              <div class="countdown-text">Menit</div>
            </div>
            <div class="countdown-card">
              <div class="countdown-num" id="seconds">--</div>
              <div class="countdown-text">Detik</div>
            </div>
          </div>
        </div>
      </div>

      <!-- SISI KANAN: Visual Hero Sport Card dengan Gambar & Floating Badges -->
      <div class="hero-col-visual">
        <div class="athletic-hero-card">
          <div class="athletic-hero-img-wrap">
            <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80" alt="Pelari Tegal Run 2027" class="athletic-hero-img" id="heroDisplayImg" loading="eager">
            <div class="athletic-card-overlay"></div>
          </div>

          <!-- Floating Sport Badges -->
          <div class="sport-badge-float sport-badge-top-left">
            <div class="sport-badge-icon" style="background: rgba(34, 197, 94, 0.15); color: #16a34a;">
              <i class="fa-solid fa-certificate" aria-hidden="true"></i>
            </div>
            <div>
              <div class="sport-badge-title">Standar PB PASI</div>
              <div class="sport-badge-sub">Rute Steril Bersertifikat</div>
            </div>
          </div>

          <div class="sport-badge-float sport-badge-mid-right">
            <div class="sport-badge-icon" style="background: rgba(59, 130, 246, 0.15); color: #2563eb;">
              <i class="fa-solid fa-medal" aria-hidden="true"></i>
            </div>
            <div>
              <div class="sport-badge-title">Medali Finisher</div>
              <div class="sport-badge-sub">Logam Cor Eksklusif</div>
            </div>
          </div>

          <div class="sport-badge-float sport-badge-bottom-right">
            <div class="sport-badge-icon" style="background: rgba(255, 107, 0, 0.15); color: #FF6B00;">
              <i class="fa-solid fa-microchip" aria-hidden="true"></i>
            </div>
            <div>
              <div class="sport-badge-title">RFID Chip Timing</div>
              <div class="sport-badge-sub">Pencatatan Waktu Akurat</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Live Event Stats Grid (Dinamis dari Backend / CMS) -->
    <div class="stats-banner" id="statsBanner">
      <div class="stat-item">
        <div class="stat-num"><span id="statVal1">2,500+</span> <small id="statUnit1">Pelari</small></div>
        <div class="stat-desc" id="statDesc1">Terdaftar</div>
      </div>
      <div class="stat-item">
        <div class="stat-num"><span id="statVal2">2</span> <small id="statUnit2">Kategori Utama</small></div>
        <div class="stat-desc" id="statDesc2">Half Marathon 10K & Fun Run 5K</div>
      </div>
      <div class="stat-item">
        <div class="stat-num"><span id="statVal3">100%</span> <small id="statUnit3">Steril & Aman</small></div>
        <div class="stat-desc" id="statDesc3">Pengawalan Dishub & Polresta</div>
      </div>
      <div class="stat-item">
        <div class="stat-num"><span id="statVal4">Rp 75Jt</span> <small id="statUnit4">Total Hadiah</small></div>
        <div class="stat-desc" id="statDesc4">&amp; Doorprize</div>
      </div>
    </div>
  </div>
</section>`,Be=`<!-- =========================================================================
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
</section>`,Pe=`<!-- =========================================================================
     RUTE & MAP CHECKPOINTS
     ========================================================================= -->
<section class="route-section" id="rute">
  <div class="container">
    <div class="route-container">
      <div class="glass-card route-info-card">
        <div class="section-tag" style="margin-bottom: 12px;">
          <i class="fa-solid fa-route"></i> Jalur Lari Steril
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
`,Ae=`<!-- =========================================================================
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
`,Ce=`<!-- =========================================================================
     KEPATUHAN HUKUM & PERLINDUNGAN DATA (UU PDP & UU ITE INDONESIA)
     ========================================================================= -->
<section class="legal-section" id="legal">
  <div class="container">
    <div class="legal-box glass-card">
      <div class="section-header" style="margin-bottom: 24px;">
        <div class="section-tag">
          <i class="fa-solid fa-shield-halved"></i> Kepatuhan Regulasi Indonesia
        </div>
        <h2 class="section-title" id="legalSectionTitle" style="font-size: 2rem;">Perizinan &amp; Kepatuhan Hukum Resmi</h2>
        <p class="section-desc" id="legalSectionDesc">
          Tegal Run 2027 diselenggarakan dengan izin resmi pemerintah daerah, PASI, dan standar keselamatan medis internasional. Pengumpulan data NIK dan kontak darurat semata-mata untuk verifikasi BIB dan penerbitan polis asuransi.
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
          <i class="fa-solid fa-file-shield"></i> Baca Kebijakan Privasi Lengkap (UU PDP)
        </button>
        <button class="btn btn-outline btn-sm" id="btnOpenTermsModal">
          <i class="fa-solid fa-scale-balanced"></i> Ketentuan Perlombaan &amp; Pelepasan Tanggung Jawab
        </button>
      </div>
    </div>
  </div>
</section>
`,Le=`<!-- =========================================================================
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
    .faq-item { background: #FFFFFF; border: 1px solid var(--color-border, #E2E8F0); border-radius: 12px; overflow: hidden; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
    .faq-item:hover { border-color: rgba(255, 107, 0, 0.4); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); }
    .faq-item.active { border-color: var(--color-primary, #FF6B00); box-shadow: 0 4px 16px rgba(255, 107, 0, 0.1); }
    .faq-question { padding: 14px 16px; font-size: 0.9rem; font-weight: 700; color: var(--color-text-title, #0F172A); cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; user-select: none; transition: color 0.2s ease; }
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

    <div class="faq-list">
      <div class="faq-item active">
        <div class="faq-question">
          <span>Apakah tiket atau BIB perlombaan dapat dipindahtangankan?</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="faq-answer-wrapper">
          <div class="faq-answer">
            Demi alasan keselamatan medis dan validitas data peserta, tiket dan nomor BIB terdaftar resmi tidak dapat dipindahtangankan atau diwakilkan kepada orang lain tanpa persetujuan dari panitia.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          <span>Bagaimana prosedur pengambilan Race Pack (RPC)?</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="faq-answer-wrapper">
          <div class="faq-answer">
            Informasi mengenai jadwal dan lokasi pengambilan racepack diumumkan melalui kanal resmi event. Peserta wajib membawa e-tiket resmi dan identitas diri yang sah saat pengambilan.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          <span>Apakah ada ketentuan kualifikasi fisik bagi peserta?</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="faq-answer-wrapper">
          <div class="faq-answer">
            Setiap peserta bertanggung jawab atas kondisi fisik dan kesehatannya masing-masing. Peserta diimbau melakukan pemeriksaan medis mandiri dan memastikan stamina tubuh prima sebelum mengikuti perlombaan.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          <span>Bagaimana kebijakan acara jika terjadi keadaan kahar (Force Majeure)?</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="faq-answer-wrapper">
          <div class="faq-answer">
            Jika terjadi cuaca ekstrem, kendala keamanan, atau situasi darurat yang tidak memungkinkan acara berlangsung, panitia berhak menyesuaikan jadwal atau rute demi keselamatan seluruh peserta sesuai regulasi yang berlaku.
          </div>
        </div>
      </div>

      <div class="faq-item">
        <div class="faq-question">
          <span>Bagaimana kerahasiaan data pribadi peserta dilindungi?</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="faq-answer-wrapper">
          <div class="faq-answer">
            Seluruh data pribadi yang dikumpulkan saat pendaftaran dijaga kerahasiaannya dan hanya digunakan untuk keperluan operasional acara, keselamatan medis, serta verifikasi tiket sesuai peraturan yang berlaku.
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          // Melipat/menutup semua item lain yang sedang terbuka
          faqItems.forEach(other => other.classList.remove('active'));
          // Toggle item yang sedang diklik
          if (!isActive) item.classList.add('active');
        });
      });
    });
  <\/script>
</section>`,Me=`<!-- =========================================================================
     MODAL 1: CHECKOUT & WAR TIKET FORM (3-STEP WITH UU PDP CONSENT)
     ========================================================================= -->
<div class="modal-overlay" id="regModal">
  <div class="modal-container">
    <div class="modal-header">
      <div class="modal-title-group">
        <h3><i class="fa-solid fa-bolt" style="color: var(--color-primary); margin-right: 8px;"></i> Formulir Pendaftaran Tegal Run 2027</h3>
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
              Saya memberikan persetujuan eksplisit kepada Komite Tegal Run 2027 untuk memproses data NIK, 
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
        <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary); margin-right: 8px;"></i> Kebijakan Privasi Data Pribadi (UU PDP)</h3>
        <p>Berdasarkan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022</p>
      </div>
      <button class="modal-close-btn" id="privacyCloseBtn">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="modal-body legal-document-text">
      <h4>1. Pengendali Data Pribadi</h4>
      <p>
        Pengendali Data Pribadi untuk seluruh aktivitas pendaftaran Tegal Run 2027 adalah <strong>Komite Pelaksana Tegal Run 2027</strong> yang berkedudukan di Tegal, Jawa Tengah. Kami berkomitmen melindungi data pribadi Anda sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) dan UU No. 1 Tahun 2024 tentang ITE.
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
        <h3><i class="fa-solid fa-file-contract" style="color: var(--color-primary); margin-right: 8px;"></i> Syarat & Ketentuan Peserta Lari</h3>
        <p>Regulasi Resmi Perlombaan Tegal Run 2027</p>
      </div>
      <button class="modal-close-btn" id="termsCloseBtn">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="modal-body legal-document-text">
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
        <p id="tdModalCategory">Kategori Lari & Fasilitas Resmi Tegal Run 2027</p>
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
  `);const s={events:[],selectedEvent:null,currentStep:1,participantCount:1,isGlobalClosed:!1,countdownTarget:null,countdownInterval:null,countdownSettingsLoaded:!1,cmsStatsItems:null,cmsVisibility:{},cmsRouteMapUrl:"",cmsRouteMapImage:"",feeSettings:{feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0,paymentTimerMinutes:30}};function ee(e){if(!e)return"";let t=String(e).trim().replace(/[\s\-()]/g,"");return t.startsWith("08")?"+628"+t.slice(2):t.startsWith("628")?"+"+t:t}function V(e){!e||e._phoneFormatted||(e._phoneFormatted=!0,e.addEventListener("input",t=>{let a=t.target.value;a.startsWith("08")?t.target.value="+628"+a.substring(2):a.startsWith("628")&&(t.target.value="+628"+a.substring(3))}))}function v(e="success",t="",a=""){const o=document.getElementById("toastContainer");if(!o)return;const i=document.createElement("div");i.className=`toast toast-${e}`;const r={success:"fa-solid fa-circle-check",error:"fa-solid fa-triangle-exclamation",warning:"fa-solid fa-circle-exclamation"};i.innerHTML=`
    <div class="toast-icon">
      <i class="${r[e]||r.success}"></i>
    </div>
    <div class="toast-content">
      <h5>${w(t)}</h5>
      <p>${w(a)}</p>
    </div>
  `,o.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateX(40px)",setTimeout(()=>i.remove(),300)},4500)}function w(e){return e?e.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function C(e){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e)}function Q(e=null){e!==void 0&&(s.countdownTarget=e),s.countdownInterval&&(clearInterval(s.countdownInterval),s.countdownInterval=null);const t=document.getElementById("days"),a=document.getElementById("hours"),o=document.getElementById("minutes"),i=document.getElementById("seconds");if(!s.countdownTarget||!Number.isFinite(Number(s.countdownTarget))){t&&(t.textContent="--"),a&&(a.textContent="--"),o&&(o.textContent="--"),i&&(i.textContent="--");return}function r(){const n=new Date().getTime(),d=s.countdownTarget-n;if(d<=0){t&&(t.textContent="00"),a&&(a.textContent="00"),o&&(o.textContent="00"),i&&(i.textContent="00"),s.countdownInterval&&(clearInterval(s.countdownInterval),s.countdownInterval=null);return}const c=Math.floor(d/(1e3*60*60*24)),u=Math.floor(d%(1e3*60*60*24)/(1e3*60*60)),f=Math.floor(d%(1e3*60*60)/(1e3*60)),b=Math.floor(d%(1e3*60)/1e3),h=p=>String(p).padStart(2,"0");t&&(t.textContent=h(c)),a&&(a.textContent=h(u)),o&&(o.textContent=h(f)),i&&(i.textContent=h(b))}r(),s.countdownInterval=setInterval(r,1e3)}async function De(){const e=document.getElementById("eventDateDisplay");try{const t=await M.getCountdownSettings();if(s.countdownSettingsLoaded=!!t,t&&t.eventCountdownDate){const a=new Date(t.eventCountdownDate);if(isNaN(a.getTime()))e&&(e.textContent="TANGGAL BELUM DITENTUKAN",e.classList.add("badge-pending-date"));else{Q(a.getTime());const o=a.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),i=a.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});e&&(e.textContent=`${o.toUpperCase()} • ${i} WIB`,e.classList.remove("badge-pending-date"))}}else e&&(e.textContent="TANGGAL BELUM DITENTUKAN",e.classList.add("badge-pending-date"));if(t&&t.isRegistrationClosed){s.isGlobalClosed=!0;const a=document.getElementById("heroStatusBadge"),o=document.getElementById("heroStatusText");a&&(a.style.borderColor="#EF4444"),o&&(o.innerHTML='<span style="color:#EF4444; font-weight:800;">🚨 PENDAFTARAN RESMI TELAH RESMI DITUTUP PANITIA</span>');const i=document.getElementById("heroCtaBtn");i&&(i.disabled=!0,i.classList.remove("btn-glow"),i.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup');const r=document.getElementById("navDaftarBtn");r&&(r.disabled=!0,r.classList.remove("btn-glow"),r.innerHTML='<i class="fa-solid fa-lock"></i> Ditutup');const n=document.getElementById("dockDaftarBtn");n&&(n.style.opacity="0.6",n.style.pointerEvents="none")}}catch(t){console.warn("Gagal memuat pengaturan countdown dari backend:",t),e&&(e.textContent="TANGGAL BELUM DITENTUKAN",e.classList.add("badge-pending-date"))}}async function te(){const e=document.getElementById("pageSkeleton");try{const t=await M.getEvents();if(s.events=t,ne(t),se(s.cmsStatsItems),!s.countdownTarget&&!s.countdownSettingsLoaded&&Array.isArray(t)){const o=t.map(i=>new Date(i.eventDate).getTime()).filter(i=>Number.isFinite(i)&&i>Date.now()).sort((i,r)=>i-r);o.length>0&&Q(o[0])}try{const i=await(await ye("/settings/checkout-config")).json();i.status==="success"&&i.data&&(s.feeSettings=i.data)}catch{}const a=new URLSearchParams(window.location.search).get("register");if(a){const o=t.find(i=>i.id===a);o&&!o.isClosed&&!s.isGlobalClosed&&setTimeout(()=>H(o),400)}}catch(t){console.error("Failed to render events:",t)}finally{e&&setTimeout(()=>{e.classList.add("hide")},350)}}function ne(e){const t=document.getElementById("ticketsGrid");if(t){if(t.innerHTML="",!Array.isArray(e)||e.length===0){t.innerHTML=`
      <div style="text-align: center; grid-column: 1 / -1; padding: 60px 20px;">
        <i class="fa-solid fa-ticket-simple" style="font-size: 3rem; color: #94A3B8; margin-bottom: 16px;"></i>
        <h3 style="color: var(--color-text-title); font-size: 1.25rem; margin-bottom: 6px;">Tidak Ada Kategori Tiket</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Belum ada kategori lomba yang dibuka di database.</p>
      </div>
    `;return}e.forEach(a=>{const o=a.category==="10K",i=a.stock||0,r=typeof a.stock=="number"?a.stock:0,n=i>0?Math.max(0,Math.min(100,Math.round(r/i*100))):0,d=!!a.isClosed,c=document.createElement("div");c.className=`glass-card ticket-card ticket-pass-card ${o?"featured":""} ${d?"event-closed-card":""}`;const u=Array.isArray(a.benefits)&&a.benefits.length>0?a.benefits.map(p=>p.name):[],f=u.length>0?u.map(p=>`
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
          ${d?'<span style="color:#ef4444;"><i class="fa-solid fa-lock"></i> CLOSED</span>':o?'<span style="color:#ff6b00;"><i class="fa-solid fa-fire"></i> POPULAR</span>':"<span>OFFICIAL PASS</span>"}
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
            ${d?"Pendaftaran Ditutup":`${r} Tiket Tersedia`}
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
    `,t.appendChild(c)}),document.querySelectorAll(".ticket-card").forEach(a=>{a.style.cursor="pointer",a.addEventListener("click",o=>{if(o.target.closest(".btn-select-ticket"))return;const i=a.querySelector(".btn-view-ticket-detail");if(i){const r=i.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${r}`}})}),document.querySelectorAll(".btn-view-ticket-detail").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation();const i=a.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${i}`})}),document.querySelectorAll(".btn-select-ticket").forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const i=a.getAttribute("data-id"),r=s.events.find(n=>n.id===i);r&&!r.isClosed&&H(r)})})}}function H(e=null){if(s.isGlobalClosed){v("error","Pendaftaran Ditutup","Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.");return}const t=s.events.filter(i=>!i.isClosed);if(t.length===0){v("error","Pendaftaran Ditutup","Seluruh pendaftaran kategori event telah resmi ditutup oleh panitia.");return}s.selectedEvent=e&&!e.isClosed?e:t[0],s.currentStep=1,s.participantCount=1;const a=document.getElementById("regModal");if(!a)return;const o=document.getElementById("modalEventSelect");o&&(o.innerHTML=t.map(i=>`
      <option value="${i.id}" ${s.selectedEvent&&s.selectedEvent.id===i.id?"selected":""}>
        ${i.ticketName} - ${C(i.price)}
      </option>
    `).join("")),X(),Y(),j(),a.classList.add("active"),document.body.style.overflow="hidden",M.getCheckoutConfig().then(i=>{i&&(s.feeSettings=i,j())}).catch(()=>{})}function G(){const e=document.getElementById("regModal");e&&(e.classList.remove("active"),document.body.style.overflow="auto")}function X(){[1,2,3].forEach(i=>{const r=document.getElementById(`stepIndicator${i}`),n=document.getElementById(`stepSection${i}`);r&&(r.classList.remove("active","done"),i===s.currentStep&&r.classList.add("active"),i<s.currentStep&&r.classList.add("done")),n&&(n.style.display=i===s.currentStep?"block":"none")});const t=document.getElementById("btnModalPrev"),a=document.getElementById("btnModalNext"),o=document.getElementById("btnModalSubmit");t&&(t.style.display=s.currentStep>1?"inline-flex":"none"),a&&(a.style.display=s.currentStep<3?"inline-flex":"none"),o&&(o.style.display=s.currentStep===3?"inline-flex":"none")}function ie(){var i,r;const e=new Map(s.events.map(n=>[n.id,n]));let t=0;for(let n=0;n<s.participantCount;n++){const d=document.querySelector(`.p-event-select[data-index="${n}"]`),c=d?d.value:(i=s.selectedEvent)==null?void 0:i.id,u=e.get(c)||s.selectedEvent;u&&(t+=Number(u.price))}let a=0;(r=s.feeSettings)!=null&&r.feeEnabled&&s.feeSettings.feeAmount>0&&(s.feeSettings.feeType==="PER_TICKET"?a=s.feeSettings.feeAmount*s.participantCount:a=s.feeSettings.feeAmount);const o=t+a;return{ticketsSubtotal:t,serviceFee:a,grandTotal:o}}function j(){var c;if(!s.selectedEvent)return;const{ticketsSubtotal:e,serviceFee:t,grandTotal:a}=ie(),o=document.getElementById("modalTotalAmount");o&&(o.textContent=C(a));const i=document.getElementById("step1TicketsSubtotal"),r=document.getElementById("step1FeeLabel"),n=document.getElementById("step1FeeAmount"),d=document.getElementById("step1GrandTotal");if(i&&(i.textContent=C(e)),n)if(t>0){if(n.textContent=`+ ${C(t)}`,n.style.color="#EA580C",r){const u=((c=s.feeSettings)==null?void 0:c.feeType)||"PER_TRANSACTION";r.textContent=`Biaya Layanan (${u==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`}}else n.textContent="Gratis (Rp 0)",n.style.color="#10B981",r&&(r.textContent="Biaya Layanan:");d&&(d.textContent=C(a))}function z(){var n,d,c;if(!((n=document.getElementById("checkSameAsBooker"))==null?void 0:n.checked))return;const t=((d=document.getElementById("bookerName"))==null?void 0:d.value.trim())||"",a=((c=document.getElementById("bookerPhone"))==null?void 0:c.value.trim())||"",o=document.querySelector('.p-fullname[data-index="0"]'),i=document.querySelector('.p-phone[data-index="0"]'),r=document.querySelector('.p-bibname[data-index="0"]');o&&t&&(o.value=t),r&&t&&!r.value&&(r.value=t.substring(0,15).toUpperCase()),i&&a&&(i.value=a)}function Y(){var o,i,r;const e=document.getElementById("participantsContainer");if(!e)return;e.innerHTML="";const t=s.events.filter(n=>!n.isClosed),a=((o=s.selectedEvent)==null?void 0:o.id)||(((i=t[0])==null?void 0:i.id)??"");for(let n=0;n<s.participantCount;n++){const d=document.createElement("div");d.className="participant-box",d.innerHTML=`
      <div class="participant-box-header">
        <h4><i class="fa-solid fa-user-tag"></i> Data Peserta #${n+1}</h4>
        ${s.participantCount>1?`<span class="badge">Peserta ${n+1}</span>`:""}
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
    `,e.appendChild(d);const c=d.querySelector(".p-phone"),u=d.querySelector(".p-emg-phone");V(c),V(u),(r=d.querySelector(".p-event-select"))==null||r.addEventListener("change",()=>{j()})}z()}function Fe(e){var t,a,o,i,r,n,d,c,u,f,b,h;if(e===1){const p=(t=document.getElementById("bookerName"))==null?void 0:t.value.trim(),k=(a=document.getElementById("bookerEmail"))==null?void 0:a.value.trim(),E=(o=document.getElementById("bookerPhone"))==null?void 0:o.value.trim();return!p||p.length<3?(v("error","Validasi Gagal","Nama pemesan minimal 3 karakter."),!1):!k||!k.includes("@")?(v("error","Validasi Gagal","Email pemesan tidak valid."),!1):!E||!/^(\+62|62|08)\d{8,13}$/.test(E.replace(/\s+/g,""))?(v("error","Validasi Gagal","Nomor WhatsApp tidak valid (gunakan awalan 08 atau +628, min 10 digit)."),!1):(z(),!0)}if(e===2){for(let p=0;p<s.participantCount;p++){const k=(i=document.querySelector(`.p-fullname[data-index="${p}"]`))==null?void 0:i.value.trim(),E=(r=document.querySelector(`.p-phone[data-index="${p}"]`))==null?void 0:r.value.trim(),y=(n=document.querySelector(`.p-bibname[data-index="${p}"]`))==null?void 0:n.value.trim(),B=(d=document.querySelector(`.p-nik[data-index="${p}"]`))==null?void 0:d.value.trim(),P=(c=document.querySelector(`.p-birthplace[data-index="${p}"]`))==null?void 0:c.value.trim(),l=(u=document.querySelector(`.p-birthdate[data-index="${p}"]`))==null?void 0:u.value.trim(),m=(f=document.querySelector(`.p-address[data-index="${p}"]`))==null?void 0:f.value.trim(),g=(b=document.querySelector(`.p-emg-name[data-index="${p}"]`))==null?void 0:b.value.trim(),A=(h=document.querySelector(`.p-emg-phone[data-index="${p}"]`))==null?void 0:h.value.trim();if(!k||k.length<3)return v("error",`Peserta #${p+1}`,"Nama lengkap KTP minimal 3 karakter."),!1;if(!E||!/^(\+62|62|08)\d{7,12}$/.test(E.replace(/\s+/g,"")))return v("error",`Peserta #${p+1}`,"Nomor WhatsApp peserta wajib diisi (contoh: 08123456789 atau +628123456789)."),!1;if(!y||y.length>15)return v("error",`Peserta #${p+1}`,"Nama BIB maksimal 15 karakter."),!1;if(!B||!/^\d{16}$/.test(B))return v("error",`Peserta #${p+1}`,"NIK harus tepat 16 digit angka sesuai KTP."),!1;if(!P||P.length<3)return v("error",`Peserta #${p+1}`,"Tempat lahir wajib diisi."),!1;if(!l)return v("error",`Peserta #${p+1}`,"Tanggal lahir wajib diisi."),!1;if(!m||m.length<10)return v("error",`Peserta #${p+1}`,"Alamat lengkap wajib diisi minimal 10 karakter."),!1;if(!g||g.length<3)return v("error",`Peserta #${p+1}`,"Nama kontak darurat wajib diisi."),!1;if(!A||!/^(\+62|62|08)\d{7,12}$/.test(A.replace(/\s+/g,"")))return v("error",`Peserta #${p+1}`,"Nomor kontak darurat harus diawali 08 atau +628."),!1}return!0}return!0}function qe(){var u,f,b,h,p,k,E;const e=document.getElementById("summaryReviewBox");if(!e||!s.selectedEvent)return;const t=(u=document.getElementById("bookerName"))==null?void 0:u.value.trim(),a=(f=document.getElementById("bookerEmail"))==null?void 0:f.value.trim(),o=(b=document.getElementById("bookerPhone"))==null?void 0:b.value.trim(),{ticketsSubtotal:i,serviceFee:r,grandTotal:n}=ie(),d=new Map(s.events.map(y=>[y.id,y]));let c="";for(let y=0;y<s.participantCount;y++){const B=((h=document.querySelector(`.p-fullname[data-index="${y}"]`))==null?void 0:h.value.trim())||`Peserta #${y+1}`,P=((p=document.querySelector(`.p-event-select[data-index="${y}"]`))==null?void 0:p.value)||s.selectedEvent.id,l=d.get(P)||s.selectedEvent,m=((k=document.querySelector(`.p-phone[data-index="${y}"]`))==null?void 0:k.value.trim())||"-";c+=`
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
      <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 12px;">${w(a)} | ${w(o)}</p>

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
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 4px; ${r>0?"color: #EA580C;":"color: #10B981;"}">
        <span>Biaya Layanan (${((E=s.feeSettings)==null?void 0:E.feeType)==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):</span>
        <strong>${r>0?`+ ${C(r)}`:"Gratis (Rp 0)"}</strong>
      </div>
      <div style="border-top: 1px solid var(--color-border-subtle); margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: var(--color-text-title);">
        <span>Total Pembayaran:</span>
        <span style="color: var(--color-primary);">${C(n)}</span>
      </div>
    </div>
  `}async function Ne(){var k,E,y,B,P,l,m,g,A,F,q,N,$,R,K,_,U,S,I,T,L;if((k=s.selectedEvent)!=null&&k.isClosed){v("error","Pendaftaran Ditutup","Pendaftaran untuk kategori ini telah resmi ditutup.");return}const e=(E=document.getElementById("checkConsentPDP"))==null?void 0:E.checked,t=(y=document.getElementById("checkConsentWaiver"))==null?void 0:y.checked;if(!e){v("warning","Persetujuan Diperlukan","Harap setujui Pemrosesan Data Pribadi sesuai UU PDP No. 27/2022.");return}if(!t){v("warning","Persetujuan Diperlukan","Harap setujui Pelepasan Tanggung Jawab Medis (Liability Waiver).");return}const a=document.getElementById("btnModalSubmit");a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses Pesanan...');const o=[];for(let x=0;x<s.participantCount;x++){const O=((B=document.querySelector(`.p-event-select[data-index="${x}"]`))==null?void 0:B.value)||s.selectedEvent.id,J=(P=document.querySelector(`.p-fullname[data-index="${x}"]`))==null?void 0:P.value.trim(),re=ee((l=document.querySelector(`.p-phone[data-index="${x}"]`))==null?void 0:l.value.trim()),le=(m=document.querySelector(`.p-bibname[data-index="${x}"]`))==null?void 0:m.value.trim().toUpperCase(),de=(g=document.querySelector(`.p-nik[data-index="${x}"]`))==null?void 0:g.value.trim(),ce=(A=document.querySelector(`.p-gender[data-index="${x}"]`))==null?void 0:A.value,pe=(F=document.querySelector(`.p-birthplace[data-index="${x}"]`))==null?void 0:F.value.trim(),me=(q=document.querySelector(`.p-birthdate[data-index="${x}"]`))==null?void 0:q.value.trim(),ue=(N=document.querySelector(`.p-address[data-index="${x}"]`))==null?void 0:N.value.trim(),ge=($=document.querySelector(`.p-blood[data-index="${x}"]`))==null?void 0:$.value,fe=(R=document.querySelector(`.p-size[data-index="${x}"]`))==null?void 0:R.value,ve=(K=document.querySelector(`.p-emg-name[data-index="${x}"]`))==null?void 0:K.value.trim(),be=ee((_=document.querySelector(`.p-emg-phone[data-index="${x}"]`))==null?void 0:_.value.trim()),he=((U=document.querySelector(`.p-community[data-index="${x}"]`))==null?void 0:U.value.trim())||null,ke=((S=document.querySelector(`.p-medical[data-index="${x}"]`))==null?void 0:S.value.trim())||null;o.push({eventId:O,fullNameKtp:J,phoneNumber:re,bibName:le,nik:de,gender:ce,birthPlace:pe,birthDate:me,fullAddress:ue,bloodType:ge,selectedSize:fe,emergencyContactName:ve,emergencyContactPhone:be,communityName:he,medicalHistory:ke})}const i=((I=document.getElementById("bookerName"))==null?void 0:I.value.trim())||"",r=((T=document.getElementById("bookerEmail"))==null?void 0:T.value.trim())||"",n=((L=document.getElementById("bookerPhone"))==null?void 0:L.value.trim())||"";if(!r||!n){v("warning","Data Pemesan Kurang","Harap lengkapi Nama, Email aktif, dan Nomor WhatsApp penanggung jawab.");return}const d={bookerName:i,bookerEmail:r,bookerPhone:n,eventId:s.selectedEvent.id,participants:o};v("warning","Menghubungkan Server","Mengamankan slot tiket Anda ke sistem database...");const c=await M.registerOrder(d);if(a&&(a.disabled=!1,a.innerHTML='<i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)'),!c.success){v("error","Gagal Memesan Tiket",c.message);return}v("success","Slot Tiket Diamankan!","Membuka gerbang pembayaran resmi Midtrans Snap...");const{paymentToken:u,paymentUrl:f,orderId:b,midtransOrderId:h}=c.data,p=b||h;try{await xe()}catch(x){v("error","Gateway Pembayaran Tidak Tersedia",x.message),window.location.href=`/payment.html?orderId=${encodeURIComponent(p)}`;return}window.snap&&typeof window.snap.pay=="function"?window.snap.pay(u,{onSuccess:function(){v("success","Pembayaran Berhasil!","Selamat! Membuka E-Tiket resmi Anda..."),G(),te(),setTimeout(()=>{window.location.href=`/e-ticket.html?orderId=${p}`},1200)},onPending:function(){v("warning","Menunggu Pembayaran","Mengarahkan ke halaman rincian instruksi pembayaran..."),G(),setTimeout(()=>{window.location.href=`/payment.html?orderId=${p}`},1200)},onError:function(){v("error","Pembayaran Gagal","Transaksi dibatalkan atau kedaluwarsa.")},onClose:function(){v("warning","Transaksi Tertunda","Mengarahkan ke halaman instruksi pembayaran & pembatalan..."),setTimeout(()=>{window.location.href=`/payment.html?orderId=${p}`},1e3)}}):f&&window.open(f,"_blank")}function W(e){const t=document.getElementById(e);t&&(t.classList.add("active"),document.body.style.overflow="hidden")}function D(e){const t=document.getElementById(e);t&&(t.classList.remove("active"),document.body.style.overflow="auto")}function se(e){const t=document.getElementById("statsBanner");if(!t||!Array.isArray(e))return;e=e.filter(r=>r&&typeof r=="object"&&r.visible!==!1),t.replaceChildren(),t.hidden=e.length===0||s.cmsVisibility.stats===!1;const a=Array.isArray(s.events)?s.events:[],o=a.reduce((r,n)=>(r.participants+=Number(n.registeredCount||0),r.capacity+=Number(n.stock||0),r.available+=Number(n.remainingStock??Math.max(0,Number(n.stock||0)-Number(n.registeredCount||0))),r),{participants:0,capacity:0,available:0}),i={TOTAL_PARTICIPANTS:o.participants,TOTAL_CATEGORIES:a.length,TOTAL_CAPACITY:o.capacity,AVAILABLE_SLOTS:o.available};e.forEach((r,n)=>{const d=r.type==="AUTO"&&Object.hasOwn(i,r.autoKey),c=d?i[r.autoKey]:r.val,u=d?Number(c||0).toLocaleString("id-ID"):c,f=document.createElement("div");f.className="stat-item";const b=document.createElement("div");b.className="stat-num",n<4&&(b.id=`statVal${n+1}`);const h=document.createElement("span");h.textContent=u==null?"":String(u);const p=document.createElement("small");p.textContent=r.unit||"",n<4&&(p.id=`statUnit${n+1}`),b.append(h,document.createTextNode(" "),p);const k=document.createElement("div");k.className="stat-desc",k.textContent=r.desc||"",n<4&&(k.id=`statDesc${n+1}`),f.append(b,k),t.append(f)})}function oe(e,t){const a=document.querySelector("#rute .route-visual-card");if(!a)return;const o=String(e||"").trim();let i="";if(o){const n=o.match(/src=["']([^"']+)["']/i),d=(n==null?void 0:n[1])||o;try{const c=new URL(d),u=c.hostname.toLowerCase(),f=u==="google.com"||u.endsWith(".google.com")||u==="maps.app.goo.gl"||u==="goo.gl";c.protocol==="https:"&&f&&(i=u.endsWith("google.com")&&c.pathname.startsWith("/maps/embed")?c.href:`https://www.google.com/maps?q=${encodeURIComponent(d)}&output=embed`)}catch(c){console.warn("Link Google Maps CMS tidak valid:",c)}}a.replaceChildren();const r=document.createElement("div");if(r.className="route-badge-float",r.innerHTML='<i class="fa-solid fa-location-dot"></i> Rute & Lokasi Google Maps',a.append(r),i){const n=document.createElement("div");n.className="gmaps-responsive-wrapper";const d=document.createElement("iframe");d.src=i,d.title="Peta rute lari",d.allowFullscreen=!0,d.loading="lazy",d.referrerPolicy="no-referrer-when-downgrade",n.append(d),a.append(n)}else if(t){const n=document.createElement("img");n.className="route-map-image",n.src=t,n.alt="Gambar peta rute lari",n.loading="lazy",a.append(n)}else{const n=document.createElement("p");n.className="route-map-empty",n.textContent="Peta rute belum tersedia.",a.append(n)}}async function $e(){try{const e=await M.getWebsiteSettings();if(!e)return;let t={};try{t=e.cms_visibility?JSON.parse(e.cms_visibility):{}}catch(l){console.warn("Pengaturan visibilitas CMS tidak valid:",l)}s.cmsVisibility=t,[["beranda","hero"],["rute","route"],["fasilitas","facilities"],["kategori","tickets"],["legal","legal"]].forEach(([l,m])=>{const g=document.getElementById(l);g&&t[m]===!1&&(g.hidden=!0)});const o=document.getElementById("statsBanner");o&&t.stats===!1&&(o.hidden=!0),document.querySelectorAll(".glass-footer").forEach(l=>{t.footer===!1&&(l.hidden=!0)}),e.site_title&&(document.title=e.site_title);const i=document.getElementById("heroStatusText")||document.querySelector(".hero-pill-badge span:not(.status-dot)");i&&e.hero_badge&&(i.textContent=e.hero_badge);const r=document.querySelector(".hero-title");r&&e.hero_title&&(r.innerHTML=e.hero_title.replace(/\n/g,"<br>"));const n=document.querySelector(".hero-desc");n&&e.hero_subtitle&&(n.textContent=e.hero_subtitle);const d=document.getElementById("heroDisplayImg");d&&e.hero_bg_image&&(d.src=e.hero_bg_image);let c;try{c=e.stats_banner_items?JSON.parse(e.stats_banner_items):null,Array.isArray(c)||(c=null)}catch(l){console.warn("Data kartu statistik CMS tidak valid:",l),c=null}c||(c=[1,2,3,4].map(l=>({type:"CUSTOM",val:e[`stat_${l}_val`]||"",unit:e[`stat_${l}_unit`]||"",desc:e[`stat_${l}_desc`]||""})).filter(l=>l.val||l.unit||l.desc)),s.cmsStatsItems=c,se(c);const u=document.getElementById("beranda");u&&e.hero_bg_image&&(u.style.backgroundImage=`radial-gradient(circle at 10% 20%, rgba(255, 107, 0, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 107, 0, 0.05) 0%, transparent 40%), linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.98) 100%), url('${e.hero_bg_image}')`,u.style.backgroundSize="cover",u.style.backgroundPosition="center");const f=document.getElementById("rute");if(f){const l=document.getElementById("routeSectionTitle")||f.querySelector(".section-title");l&&typeof e.route_title=="string"&&(l.textContent=e.route_title,l.hidden=!e.route_title.trim());const m=document.getElementById("routeSectionDesc")||f.querySelector(".route-info-card > p");m&&typeof e.route_desc=="string"&&(m.textContent=e.route_desc,m.hidden=!e.route_desc.trim());const g=document.getElementById("btnDownloadGpx");g&&(g.hidden=!e.route_gpx_url||e.route_gpx_url==="#"),g&&e.route_gpx_url&&(g.href=e.route_gpx_url,e.route_gpx_url==="#"?g.onclick=A=>{A.preventDefault(),alert("File GPX Rute Tegal Run 2027 akan dapat diunduh pada H-14 perlombaan.")}:/^https?:\/\//i.test(e.route_gpx_url)?(g.setAttribute("target","_blank"),g.setAttribute("rel","noopener noreferrer"),g.onclick=null):(g.removeAttribute("target"),g.removeAttribute("rel"),g.onclick=null)),s.cmsRouteMapUrl=Object.hasOwn(e,"route_gmaps_url")?e.route_gmaps_url:e.gmaps_embed_url||"",s.cmsRouteMapImage=e.route_map_image||"",oe(s.cmsRouteMapUrl,s.cmsRouteMapImage)}const b=document.getElementById("fasilitas");if(b){const l=b.querySelector(".section-title");l&&typeof e.facilities_title=="string"&&(l.textContent=e.facilities_title,l.hidden=!e.facilities_title.trim());const m=b.querySelector(".section-desc");m&&typeof e.facilities_desc=="string"&&(m.textContent=e.facilities_desc,m.hidden=!e.facilities_desc.trim())}const h=document.getElementById("facilitiesMedia");h&&(h.hidden=!e.facilities_image,e.facilities_image&&(h.src=e.facilities_image));const p=document.getElementById("facilitiesContainer");if(p){const l=[{icon:"fa-shirt",title:"Jersey Running Dry-Fit",desc:"Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh."},{icon:"fa-microchip",title:"Nomor Dada (BIB) & Timing Chip",desc:"Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online."},{icon:"fa-medal",title:"Medali Finisher Logam Cor",desc:"Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT."},{icon:"fa-bottle-water",title:"Water & Isotonic Station",desc:"Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar."},{icon:"fa-truck-medical",title:"Tim Medis & Ambulans Mobile",desc:"Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute."},{icon:"fa-utensils",title:"Refreshment & Finisher Feast",desc:"Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar."}];let m;try{m=e.facilities_items?JSON.parse(e.facilities_items):l}catch(g){console.warn("Data fasilitas CMS tidak valid:",g),m=l}Array.isArray(m)||(m=l),p.innerHTML=m.filter(g=>g&&typeof g=="object"&&g.visible!==!1).map(g=>`
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
      `).join(""),P.hidden=l.length===0}if(e.contact_email&&document.querySelectorAll(".footer-email").forEach(l=>l.textContent=e.contact_email),e.contact_phone&&document.querySelectorAll(".footer-phone").forEach(l=>l.textContent=e.contact_phone),e.contact_address){const l=document.querySelector(".footer-address");l&&(l.textContent=e.contact_address)}if(e.footer_copyright){const l=document.querySelector(".footer-copyright-text")||document.querySelector(".footer-bottom > div:first-child");l&&(l.textContent=e.footer_copyright)}}catch(e){console.warn("Failed to apply website settings:",e)}}async function Re(){const e=document.getElementById("routeChecklistContainer");try{const t=await M.getRouteOverview();if(!t){e&&(e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>');return}s.cmsRouteMapUrl||(s.cmsRouteMapUrl=t.gmapsUrl||""),s.cmsRouteMapImage||(s.cmsRouteMapImage=t.routeMapImage||""),oe(s.cmsRouteMapUrl,s.cmsRouteMapImage),e&&(Array.isArray(t.points)&&t.points.length>0?e.innerHTML=t.points.map((a,o)=>`
          <div class="route-point">
            <div class="route-point-marker">${String(o+1).padStart(2,"0")}</div>
            <div class="route-point-content">
              <h4>${w(a.name)}${a.distanceKm>0?` <small style="font-weight:500;color:#64748B;">— Km ${a.distanceKm}</small>`:""}</h4>
              <p>${w(a.description||"")}</p>
              ${a.isWaterStation?'<span class="route-tag" style="display:inline-block;margin-top:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#EFF6FF;color:#3B82F6;font-weight:600;">💧 Water Station</span>':""}
              ${a.isMedicalSpot?'<span class="route-tag" style="display:inline-block;margin-top:4px;margin-left:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#F0FDF4;color:#16A34A;font-weight:600;">🏥 Pos Medis</span>':""}
            </div>
          </div>
        `).join(""):e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>')}catch{e&&(e.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>')}}function Ke(){document.querySelectorAll(".nav-dropdown-toggle").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const a=e.closest(".nav-dropdown"),o=a.classList.contains("active");document.querySelectorAll(".nav-dropdown").forEach(i=>i.classList.remove("active")),o||a.classList.add("active")})}),document.addEventListener("click",()=>{document.querySelectorAll(".nav-dropdown").forEach(e=>e.classList.remove("active"))})}function ae(){var r,n,d,c,u,f,b,h,p,k,E,y,B,P,l,m,g,A,F,q,N,$,R,K,_,U;Q(),De(),$e(),Re(),te(),Ke();const e=async S=>{if(S&&S.preventDefault(),s.isGlobalClosed){v("error","Pendaftaran Ditutup","Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.");return}if(s.events.length>0){const I=s.events.find(T=>!T.isClosed)||s.events[0];H(I)}else{const I=document.getElementById("kategori")||document.getElementById("ticketsSection");I&&I.scrollIntoView({behavior:"smooth"});try{const T=await M.getEvents();if(T&&T.length>0){s.events=T,ne(T);const L=T.find(x=>!x.isClosed)||T[0];H(L)}}catch{v("error","Gagal Memuat Kategori","Gagal memuat kategori tiket. Pastikan server backend aktif.")}}};(r=document.getElementById("heroCtaBtn"))==null||r.addEventListener("click",e),(n=document.getElementById("navDaftarBtn"))==null||n.addEventListener("click",e),(d=document.getElementById("dockDaftarBtn"))==null||d.addEventListener("click",e),(c=document.getElementById("modalCloseBtn"))==null||c.addEventListener("click",G),(u=document.getElementById("regModal"))==null||u.addEventListener("click",S=>{S.target.id==="regModal"&&G()}),(f=document.getElementById("modalEventSelect"))==null||f.addEventListener("change",S=>{const I=s.events.find(T=>T.id===S.target.value);I&&(s.selectedEvent=I,Y(),j())}),(b=document.getElementById("modalParticipantCount"))==null||b.addEventListener("change",S=>{s.participantCount=parseInt(S.target.value,10)||1,Y(),j()});const t=document.getElementById("bookerPhone");t&&V(t),(h=document.getElementById("checkSameAsBooker"))==null||h.addEventListener("change",()=>{z()}),(p=document.getElementById("bookerName"))==null||p.addEventListener("input",()=>{z()}),(k=document.getElementById("bookerPhone"))==null||k.addEventListener("input",()=>{z()}),(E=document.getElementById("btnModalNext"))==null||E.addEventListener("click",()=>{Fe(s.currentStep)&&(s.currentStep++,s.currentStep===3&&qe(),X())}),(y=document.getElementById("btnModalPrev"))==null||y.addEventListener("click",()=>{s.currentStep>1&&(s.currentStep--,X())}),(B=document.getElementById("btnModalSubmit"))==null||B.addEventListener("click",Ne);const a=()=>W("privacyModal");(P=document.getElementById("btnOpenPrivacyModal"))==null||P.addEventListener("click",a),(l=document.getElementById("footerPrivacyLink"))==null||l.addEventListener("click",a),(m=document.getElementById("privacyCloseBtn"))==null||m.addEventListener("click",()=>D("privacyModal")),(g=document.getElementById("privacyOkBtn"))==null||g.addEventListener("click",()=>D("privacyModal"));const o=()=>W("termsModal");(A=document.getElementById("btnOpenTerms"))==null||A.addEventListener("click",o),(F=document.getElementById("btnOpenTermsModal"))==null||F.addEventListener("click",o),(q=document.getElementById("footerTermsLink"))==null||q.addEventListener("click",o),(N=document.getElementById("footerWaiverLink"))==null||N.addEventListener("click",o),($=document.getElementById("termsCloseBtn"))==null||$.addEventListener("click",()=>D("termsModal")),(R=document.getElementById("termsOkBtn"))==null||R.addEventListener("click",()=>D("termsModal")),(K=document.getElementById("btnOpenSizeChart"))==null||K.addEventListener("click",()=>W("sizeChartModal")),(_=document.getElementById("sizeChartCloseBtn"))==null||_.addEventListener("click",()=>D("sizeChartModal")),(U=document.getElementById("sizeChartOkBtn"))==null||U.addEventListener("click",()=>D("sizeChartModal")),document.querySelectorAll(".faq-question").forEach(S=>{S.addEventListener("click",()=>{S.parentElement.classList.toggle("active")})});const i=document.querySelectorAll("section[id]");window.addEventListener("scroll",()=>{const S=window.pageYOffset;i.forEach(I=>{const T=I.offsetHeight,L=I.offsetTop-120,x=I.getAttribute("id"),O=document.querySelector(`.mobile-bottom-dock a[href*="${x}"]`);O&&S>L&&S<=L+T&&(document.querySelectorAll(".mobile-bottom-dock a").forEach(J=>J.classList.remove("active")),O.classList.add("active"))})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ae):ae();
