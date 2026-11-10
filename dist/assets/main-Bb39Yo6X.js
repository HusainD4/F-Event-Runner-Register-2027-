import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */const L=typeof window<"u"&&["5173","5174","5175","4173","3000"].includes(window.location.port)?"/api":"http://localhost:3000/api",F={async getWebsiteSettings(){try{const a=await fetch(`${L}/settings/website`,{method:"GET",headers:{Accept:"application/json"}});if(!a.ok)throw new Error("HTTP error "+a.status);return(await a.json()).data}catch(a){return console.warn("⚠️ Gagal mengambil pengaturan website CMS dari backend:",a),null}},async getCountdownSettings(){try{const a=await fetch(`${L}/settings/countdown`,{method:"GET",headers:{Accept:"application/json"}});if(!a.ok)throw new Error("HTTP error "+a.status);return(await a.json()).data}catch(a){return console.warn("⚠️ Gagal mengambil pengaturan countdown dari backend:",a),null}},async getCheckoutConfig(){try{const a=await fetch(`${L}/settings/checkout-config`,{method:"GET",headers:{Accept:"application/json"}});if(!a.ok)throw new Error("HTTP error "+a.status);return(await a.json()).data}catch(a){return console.warn("⚠️ Gagal mengambil pengaturan biaya layanan dari backend:",a),null}},async getEvents(){try{const a=await fetch(`${L}/events`,{method:"GET",headers:{Accept:"application/json"}});if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);const e=await a.json();return e.status==="success"&&Array.isArray(e.data)?e.data:[]}catch(a){return console.warn("⚠️ Gagal mengambil event langsung dari backend:",a),[]}},async getEventDetail(a){try{const e=await fetch(`${L}/events/${a}`,{headers:{Accept:"application/json"}});if(!e.ok)throw new Error("HTTP error "+e.status);return(await e.json()).data}catch(e){return console.warn("⚠️ Gagal mengambil detail event dari backend:",e),null}},async getRouteOverview(){try{const a=await fetch(`${L}/routes`,{headers:{Accept:"application/json"}});if(!a.ok)throw new Error("HTTP error "+a.status);return(await a.json()).data}catch(a){return console.warn("⚠️ Gagal mengambil data rute dari backend:",a),null}},async registerOrder(a){try{const e=await fetch(`${L}/register`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)}),t=await e.json().catch(()=>({}));if(e.status===429)return{success:!1,isRateLimited:!0,message:t.message||"🚨 Terlalu banyak percobaan war tiket. Mohon tunggu 1 menit sebelum mencoba lagi."};if(e.status===400){let s=t.message||"Data pendaftaran tidak valid.";return Array.isArray(t.errors)&&t.errors.length>0&&(s=t.errors.map(n=>`• ${n.field}: ${n.message}`).join(`
`)),{success:!1,message:s,rawErrors:t.errors}}return e.status===403?{success:!1,message:"🚨 Akses diblokir oleh sistem anti-bot. Pastikan tidak menggunakan script/ekstensi otomatis."}:e.status===201&&t.status==="success"?{success:!0,message:t.message,data:t.data}:{success:!1,message:t.message||"Terjadi kesalahan sistem saat memproses tiket."}}catch(e){return console.error("❌ API Request Error:",e),{success:!1,message:"Koneksi ke backend gagal. Pastikan server backend sedang aktif di http://localhost:3000"}}}},ha=`<!-- =========================================================================
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
</div>`,ya=`<!-- =========================================================================
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
</div>`,xa=`<!-- =========================================================================
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

`,wa=`<!-- =========================================================================
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
</div>`,Ea=`<!-- =========================================================================
     HERO SECTION (2-COLUMN SPLIT ATHLETIC SPORT DESIGN - ANTI AI SLOP)
     ========================================================================= -->
<section class="hero-section" id="beranda">
  <div class="container">
    <div class="hero-split-grid">
      <!-- SISI KIRI: Judul, Deskripsi, Tombol Aksi & Hitung Mundur Race Day -->
      <div class="hero-col-content">
        <div class="hero-pill-badge" id="heroStatusBadge">
          <span class="status-dot"></span>
          <i class="fa-solid fa-bolt badge-icon"></i>
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
          <button class="btn btn-sport-primary btn-glow" id="heroCtaBtn">
            <i class="fa-solid fa-ticket"></i> Amankan Slot Lari Sekarang
          </button>

          <button class="btn btn-sport-outline" id="btnOpenTerms">
            <i class="fa-solid fa-file-contract"></i> Syarat &amp; Ketentuan
          </button>
        </div>

        <!-- Clean Countdown Box -->
        <div class="countdown-box">
          <div class="countdown-header">
            <div class="countdown-title-wrap">
              <i class="fa-solid fa-stopwatch" style="color: #FF6B00;"></i>
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

      <!-- SISI KANAN: Visual Hero Sport Card dengan Gambar & Badges Atletik -->
      <div class="hero-col-visual">
        <div class="athletic-hero-card">
          <div class="athletic-hero-img-wrap">
            <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80" alt="Pelari Tegal Run" class="athletic-hero-img" id="heroDisplayImg" loading="eager">
            <div class="athletic-card-overlay"></div>
          </div>

          <!-- Floating Badges Atletik Sport -->
          <div class="sport-badge-float sport-badge-top-left">
            <div class="sport-badge-icon" style="background: rgba(34, 197, 94, 0.15); color: #16a34a;">
              <i class="fa-solid fa-certificate"></i>
            </div>
            <div>
              <div class="sport-badge-title">Standar PB PASI</div>
              <div class="sport-badge-sub">Rute Steril Bersertifikat</div>
            </div>
          </div>

          <div class="sport-badge-float sport-badge-bottom-right">
            <div class="sport-badge-icon" style="background: rgba(255, 107, 0, 0.15); color: #FF6B00;">
              <i class="fa-solid fa-microchip"></i>
            </div>
            <div>
              <div class="sport-badge-title">RFID Chip Timing</div>
              <div class="sport-badge-sub">Pencatatan Waktu Akurat</div>
            </div>
          </div>

          <div class="sport-badge-float sport-badge-mid-right">
            <div class="sport-badge-icon" style="background: rgba(59, 130, 246, 0.15); color: #2563eb;">
              <i class="fa-solid fa-medal"></i>
            </div>
            <div>
              <div class="sport-badge-title">Medali Finisher</div>
              <div class="sport-badge-sub">Logam Cor Eksklusif</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Event Stats Grid (Editable dari Admin CMS & Backend) -->
    <div class="stats-banner" id="statsBanner">
      <div class="stat-item">
        <div class="stat-num"><span id="statVal1">2,500+</span> <small id="statUnit1">Pelari Terdaftar</small></div>
        <div class="stat-desc" id="statDesc1">Antusiasme komunitas nasional</div>
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
        <div class="stat-num"><span id="statVal4">Rp 75Jt</span> <small id="statUnit4">Total Hadiah & Doorprize</small></div>
        <div class="stat-desc" id="statDesc4">Podium juara & ratusan hadiah menarik</div>
      </div>
    </div>
  </div>
</section>
`,Ta=`<!-- =========================================================================
     KATEGORI EVENT & TIKET
     ========================================================================= -->
<section class="tickets-section" id="kategori">
  <div class="container">
    <div class="section-header">
      <div class="section-tag">
        <i class="fa-solid fa-tags"></i> Tiket yang tersedia
      </div>
      <h2 class="section-title">Pilih Tantangan Jarak Lari Anda</h2>
      <p class="section-desc">
        Tersedia kategori kompetitif bagi atlet dan fun run santai bagi keluarga & komunitas. 
        Seluruh peserta yang finis sebelum batas waktu (Cut-Off Time) berhak atas Medali Finisher resmi.
      </p>
    </div>

    <!-- Container Tiket Dinamis -->
    <div class="tickets-grid" id="ticketsGrid">
      <!-- Loading Skeleton Cards -->
      <div class="glass-card ticket-card sk-card">
        <div class="sk" style="width: 120px; height: 24px; margin-bottom: 16px;"></div>
        <div class="sk" style="width: 80%; height: 36px; margin-bottom: 12px;"></div>
        <div class="sk" style="width: 50%; height: 48px; margin-bottom: 24px;"></div>
        <div class="sk" style="width: 100%; height: 180px; margin-bottom: 24px;"></div>
        <div class="sk" style="width: 100%; height: 50px; border-radius: 30px;"></div>
      </div>
      <div class="glass-card ticket-card sk-card">
        <div class="sk" style="width: 120px; height: 24px; margin-bottom: 16px;"></div>
        <div class="sk" style="width: 80%; height: 36px; margin-bottom: 12px;"></div>
        <div class="sk" style="width: 50%; height: 48px; margin-bottom: 24px;"></div>
        <div class="sk" style="width: 100%; height: 180px; margin-bottom: 24px;"></div>
        <div class="sk" style="width: 100%; height: 50px; border-radius: 30px;"></div>
      </div>
    </div>
  </div>
</section>

`,Sa=`<!-- =========================================================================
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

        <div class="route-specs-grid">
          <div class="route-spec-item">
            <span class="spec-label">Start / Flag-Off 10K</span>
            <span class="spec-val" id="routeStart10k">05:45 WIB</span>
          </div>
          <div class="route-spec-item">
            <span class="spec-label">Start / Flag-Off 5K</span>
            <span class="spec-val" id="routeStart5k">06:15 WIB</span>
          </div>
          <div class="route-spec-item">
            <span class="spec-label">Cut-Off Time (COT) 10K</span>
            <span class="spec-val" id="routeCot10k">2 Jam 30 Menit</span>
          </div>
          <div class="route-spec-item">
            <span class="spec-label">Cut-Off Time (COT) 5K</span>
            <span class="spec-val" id="routeCot5k">1 Jam 30 Menit</span>
          </div>
        </div>

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
`,Pa=`<!-- =========================================================================
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

    <!-- Container Grid yang diisi secara dinamis dari Backend -->
    <div class="facilities-grid" id="facilitiesContainer">
      <!-- Loading State Skeleton / Fallback -->
      <div class="facility-card" style="text-align: center; color: #94A3B8; font-size: 0.85rem; padding: 20px;">
        <i class="fa-solid fa-circle-notch fa-spin"></i> Memuat fasilitas pelari...
      </div>
    </div>
  </div>
</section>

`,Ba=`<!-- =========================================================================
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

      <div class="legal-grid">
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
`,Ia=`<!-- =========================================================================
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
</section>`,Aa=`<!-- =========================================================================
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

`,aa=document.getElementById("app");aa&&(aa.innerHTML=`
    <div class="ambient-glow ambient-1"></div>
    <div class="ambient-glow ambient-2"></div>
    <div class="toast-container" id="toastContainer"></div>
    ${ha}
    ${ya}
    ${Ea}
    ${Ta}
    ${Sa}
    ${Pa}
    ${Ba}
    ${Ia}
    ${xa}
    ${wa}
    ${Aa}
  `);const o={events:[],selectedEvent:null,currentStep:1,participantCount:1,isGlobalClosed:!1,countdownTarget:null,countdownInterval:null,feeSettings:{feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0,paymentTimerMinutes:30}};function ea(a){if(!a)return"";let e=String(a).trim().replace(/[\s\-()]/g,"");return e.startsWith("08")?"+628"+e.slice(2):e.startsWith("628")?"+"+e:e}function Y(a){!a||a._phoneFormatted||(a._phoneFormatted=!0,a.addEventListener("input",e=>{let t=e.target.value;t.startsWith("08")?e.target.value="+628"+t.substring(2):t.startsWith("628")&&(e.target.value="+628"+t.substring(3))}))}function u(a="success",e="",t=""){const s=document.getElementById("toastContainer");if(!s)return;const n=document.createElement("div");n.className=`toast toast-${a}`;const i={success:"fa-solid fa-circle-check",error:"fa-solid fa-triangle-exclamation",warning:"fa-solid fa-circle-exclamation"};n.innerHTML=`
    <div class="toast-icon">
      <i class="${i[a]||i.success}"></i>
    </div>
    <div class="toast-content">
      <h5>${x(e)}</h5>
      <p>${x(t)}</p>
    </div>
  `,s.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(40px)",setTimeout(()=>n.remove(),300)},4500)}function x(a){return a?a.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function I(a){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(a)}function U(a=null){a!==void 0&&(o.countdownTarget=a),o.countdownInterval&&(clearInterval(o.countdownInterval),o.countdownInterval=null);const e=document.getElementById("days"),t=document.getElementById("hours"),s=document.getElementById("minutes"),n=document.getElementById("seconds");if(!o.countdownTarget){e&&(e.textContent="--"),t&&(t.textContent="--"),s&&(s.textContent="--"),n&&(n.textContent="--");return}function i(){const r=new Date().getTime(),l=o.countdownTarget-r;if(l<=0){e&&(e.textContent="00"),t&&(t.textContent="00"),s&&(s.textContent="00"),n&&(n.textContent="00"),o.countdownInterval&&(clearInterval(o.countdownInterval),o.countdownInterval=null);return}const m=Math.floor(l/(1e3*60*60*24)),g=Math.floor(l%(1e3*60*60*24)/(1e3*60*60)),v=Math.floor(l%(1e3*60*60)/(1e3*60)),c=Math.floor(l%(1e3*60)/1e3),p=d=>String(d).padStart(2,"0");e&&(e.textContent=p(m)),t&&(t.textContent=p(g)),s&&(s.textContent=p(v)),n&&(n.textContent=p(c))}i(),o.countdownInterval=setInterval(i,1e3)}async function Ca(){const a=document.getElementById("eventDateDisplay");try{const e=await F.getCountdownSettings();if(e&&e.eventCountdownDate){const t=new Date(e.eventCountdownDate);if(isNaN(t.getTime()))U(null),a&&(a.textContent="TANGGAL BELUM DITENTUKAN",a.classList.add("badge-pending-date"));else{U(t.getTime());const s=t.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}),n=t.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});a&&(a.textContent=`${s.toUpperCase()} • ${n} WIB`,a.classList.remove("badge-pending-date"))}}else U(null),a&&(a.textContent="TANGGAL BELUM DITENTUKAN",a.classList.add("badge-pending-date"));if(e&&e.isRegistrationClosed){o.isGlobalClosed=!0;const t=document.getElementById("heroStatusBadge"),s=document.getElementById("heroStatusText");t&&(t.style.borderColor="#EF4444"),s&&(s.innerHTML='<span style="color:#EF4444; font-weight:800;">🚨 PENDAFTARAN RESMI TELAH RESMI DITUTUP PANITIA</span>');const n=document.getElementById("heroCtaBtn");n&&(n.disabled=!0,n.classList.remove("btn-glow"),n.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup');const i=document.getElementById("navDaftarBtn");i&&(i.disabled=!0,i.classList.remove("btn-glow"),i.innerHTML='<i class="fa-solid fa-lock"></i> Ditutup');const r=document.getElementById("dockDaftarBtn");r&&(r.style.opacity="0.6",r.style.pointerEvents="none")}}catch(e){console.warn("Gagal memuat pengaturan countdown dari backend:",e),U(null),a&&(a.textContent="TANGGAL BELUM DITENTUKAN",a.classList.add("badge-pending-date"))}}async function na(){const a=document.getElementById("pageSkeleton");try{const e=await F.getEvents();o.events=e,ia(e);try{const n=await(await fetch(`${L}/settings/checkout-config`)).json();n.status==="success"&&n.data&&(o.feeSettings=n.data)}catch{}const t=new URLSearchParams(window.location.search).get("register");if(t){const s=e.find(n=>n.id===t);s&&!s.isClosed&&!o.isGlobalClosed&&setTimeout(()=>W(s),400)}}catch(e){console.error("Failed to render events:",e)}finally{a&&setTimeout(()=>{a.classList.add("hide")},350)}}function ia(a){const e=document.getElementById("ticketsGrid");if(e){if(e.innerHTML="",!Array.isArray(a)||a.length===0){e.innerHTML=`
      <div style="text-align: center; grid-column: 1 / -1; padding: 60px 20px;">
        <i class="fa-solid fa-ticket-simple" style="font-size: 3rem; color: #94A3B8; margin-bottom: 16px;"></i>
        <h3 style="color: var(--color-text-title); font-size: 1.25rem; margin-bottom: 6px;">Tidak Ada Kategori Tiket</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Belum ada kategori lomba yang dibuka di database.</p>
      </div>
    `;return}a.forEach(t=>{const s=t.category==="10K",n=t.stock||0,i=typeof t.stock=="number"?t.stock:0,r=n>0?Math.max(0,Math.min(100,Math.round(i/n*100))):0,l=!!t.isClosed,m=document.createElement("div");m.className=`glass-card ticket-card ticket-pass-card ${s?"featured":""} ${l?"event-closed-card":""}`;const g=Array.isArray(t.benefits)&&t.benefits.length>0?t.benefits.map(p=>p.name):[],v=g.length>0?g.map(p=>`
          <li class="benefit-item">
            <div class="benefit-icon"><i class="fa-solid fa-check"></i></div>
            <span>${x(p)}</span>
          </li>
        `).join(""):'<li class="benefit-item" style="color: var(--color-text-muted); font-style: italic;">Belum ada benefit tercantum</li>',c=t.ticketImage?`
      <div class="ticket-card-banner">
        <img src="${x(t.ticketImage)}" alt="${x(t.ticketName)}" loading="lazy">
        <div class="ticket-card-banner-overlay">
          <span class="ticket-banner-badge"><i class="fa-solid fa-person-running"></i> ${x(t.category)} Marathon</span>
          ${t.medalImage?'<span class="ticket-banner-medal-badge"><i class="fa-solid fa-medal"></i> Medali Finisher</span>':""}
        </div>
      </div>
    `:"";m.innerHTML=`
      <!-- E-Tiket Stub Header -->
      <div class="ticket-stub-header">
        <div class="ticket-stub-brand">
          <i class="fa-solid fa-bolt" style="color: var(--color-primary);"></i> TEGAL RUN 2027
        </div>
        <div class="ticket-stub-tag">
          ${l?'<span style="color:#ef4444;"><i class="fa-solid fa-lock"></i> CLOSED</span>':s?'<span style="color:#ff6b00;"><i class="fa-solid fa-fire"></i> POPULAR</span>':"<span>OFFICIAL PASS</span>"}
        </div>
      </div>

      ${c}

      <div class="ticket-header">
        <span class="ticket-category-tag">${x(t.category)} MARATHON PASS</span>
        <h3 class="ticket-title">${x(t.ticketName)}</h3>
        <div class="ticket-price">
          <span class="price-currency">Rp</span>
          <span class="price-amount">${Number(t.price).toLocaleString("id-ID")}</span>
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
          <span class="stock-status" style="color: ${l?"#EF4444":"#10B981"};">
            <i class="${l?"fa-solid fa-lock":"fa-solid fa-fire"}"></i> 
            ${l?"Pendaftaran Ditutup":`${i} Tiket Tersedia`}
          </span>
        </div>
        <div class="stock-bar-bg">
          <div class="stock-bar-fill" style="width: ${l?100:r}%; background: ${l?"#EF4444":""};"></div>
        </div>
      </div>

      <ul class="ticket-benefits">
        ${v}
      </ul>

      <!-- Aesthetic Barcode Strip for Authentic Athletic Pass -->
      <div class="ticket-barcode-strip">
        <div class="ticket-barcode-lines"></div>
        <div class="ticket-barcode-serial">RACE PASS • VERIFIED PASI TIMING</div>
      </div>

      <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 14px;">
        <button class="btn btn-secondary btn-sm btn-view-ticket-detail" data-id="${t.id}" style="flex: 1;" title="Lihat Fasilitas & Rincian Lengkap">
          <i class="fa-solid fa-circle-info"></i> Detail Tiket
        </button>
        <button class="btn ${l?"btn-secondary":"btn-primary btn-glow"} btn-sm btn-select-ticket" data-id="${t.id}" ${l?"disabled":""} style="flex: 1.3;">
          <i class="${l?"fa-solid fa-lock":"fa-solid fa-ticket"}"></i> 
          ${l?"Ditutup":"Daftar Sekarang"}
        </button>
      </div>
    `,e.appendChild(m)}),document.querySelectorAll(".ticket-card").forEach(t=>{t.style.cursor="pointer",t.addEventListener("click",s=>{if(s.target.closest(".btn-select-ticket"))return;const n=t.querySelector(".btn-view-ticket-detail");if(n){const i=n.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${i}`}})}),document.querySelectorAll(".btn-view-ticket-detail").forEach(t=>{t.addEventListener("click",s=>{s.stopPropagation();const n=t.getAttribute("data-id");window.location.href=`/ticket-detail.html?id=${n}`})}),document.querySelectorAll(".btn-select-ticket").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation();const n=t.getAttribute("data-id"),i=o.events.find(r=>r.id===n);i&&!i.isClosed&&W(i)})})}}function W(a=null){if(o.isGlobalClosed){u("error","Pendaftaran Ditutup","Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.");return}const e=o.events.filter(n=>!n.isClosed);if(e.length===0){u("error","Pendaftaran Ditutup","Seluruh pendaftaran kategori event telah resmi ditutup oleh panitia.");return}o.selectedEvent=a&&!a.isClosed?a:e[0],o.currentStep=1,o.participantCount=1;const t=document.getElementById("regModal");if(!t)return;const s=document.getElementById("modalEventSelect");s&&(s.innerHTML=e.map(n=>`
      <option value="${n.id}" ${o.selectedEvent&&o.selectedEvent.id===n.id?"selected":""}>
        ${n.ticketName} - ${I(n.price)}
      </option>
    `).join("")),Q(),Z(),H(),t.classList.add("active"),document.body.style.overflow="hidden",F.getCheckoutConfig().then(n=>{n&&(o.feeSettings=n,H())}).catch(()=>{})}function J(){const a=document.getElementById("regModal");a&&(a.classList.remove("active"),document.body.style.overflow="auto")}function Q(){[1,2,3].forEach(n=>{const i=document.getElementById(`stepIndicator${n}`),r=document.getElementById(`stepSection${n}`);i&&(i.classList.remove("active","done"),n===o.currentStep&&i.classList.add("active"),n<o.currentStep&&i.classList.add("done")),r&&(r.style.display=n===o.currentStep?"block":"none")});const e=document.getElementById("btnModalPrev"),t=document.getElementById("btnModalNext"),s=document.getElementById("btnModalSubmit");e&&(e.style.display=o.currentStep>1?"inline-flex":"none"),t&&(t.style.display=o.currentStep<3?"inline-flex":"none"),s&&(s.style.display=o.currentStep===3?"inline-flex":"none")}function sa(){var n,i;const a=new Map(o.events.map(r=>[r.id,r]));let e=0;for(let r=0;r<o.participantCount;r++){const l=document.querySelector(`.p-event-select[data-index="${r}"]`),m=l?l.value:(n=o.selectedEvent)==null?void 0:n.id,g=a.get(m)||o.selectedEvent;g&&(e+=Number(g.price))}let t=0;(i=o.feeSettings)!=null&&i.feeEnabled&&o.feeSettings.feeAmount>0&&(o.feeSettings.feeType==="PER_TICKET"?t=o.feeSettings.feeAmount*o.participantCount:t=o.feeSettings.feeAmount);const s=e+t;return{ticketsSubtotal:e,serviceFee:t,grandTotal:s}}function H(){var m;if(!o.selectedEvent)return;const{ticketsSubtotal:a,serviceFee:e,grandTotal:t}=sa(),s=document.getElementById("modalTotalAmount");s&&(s.textContent=I(t));const n=document.getElementById("step1TicketsSubtotal"),i=document.getElementById("step1FeeLabel"),r=document.getElementById("step1FeeAmount"),l=document.getElementById("step1GrandTotal");if(n&&(n.textContent=I(a)),r)if(e>0){if(r.textContent=`+ ${I(e)}`,r.style.color="#EA580C",i){const g=((m=o.feeSettings)==null?void 0:m.feeType)||"PER_TRANSACTION";i.textContent=`Biaya Layanan (${g==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`}}else r.textContent="Gratis (Rp 0)",r.style.color="#10B981",i&&(i.textContent="Biaya Layanan:");l&&(l.textContent=I(t))}function O(){var r,l,m;if(!((r=document.getElementById("checkSameAsBooker"))==null?void 0:r.checked))return;const e=((l=document.getElementById("bookerName"))==null?void 0:l.value.trim())||"",t=((m=document.getElementById("bookerPhone"))==null?void 0:m.value.trim())||"",s=document.querySelector('.p-fullname[data-index="0"]'),n=document.querySelector('.p-phone[data-index="0"]'),i=document.querySelector('.p-bibname[data-index="0"]');s&&e&&(s.value=e),i&&e&&!i.value&&(i.value=e.substring(0,15).toUpperCase()),n&&t&&(n.value=t)}function Z(){var s,n,i;const a=document.getElementById("participantsContainer");if(!a)return;a.innerHTML="";const e=o.events.filter(r=>!r.isClosed),t=((s=o.selectedEvent)==null?void 0:s.id)||(((n=e[0])==null?void 0:n.id)??"");for(let r=0;r<o.participantCount;r++){const l=document.createElement("div");l.className="participant-box",l.innerHTML=`
      <div class="participant-box-header">
        <h4><i class="fa-solid fa-user-tag"></i> Data Peserta #${r+1}</h4>
        ${o.participantCount>1?`<span class="badge">Peserta ${r+1}</span>`:""}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Kategori Lari / Tiket <span class="req">*</span></label>
          <select class="form-select p-event-select" required data-index="${r}">
            ${e.map(v=>`
              <option value="${v.id}" ${v.id===t?"selected":""}>
                ${x(v.ticketName)} - ${I(v.price)}
              </option>
            `).join("")}
          </select>
          <div class="form-hint">Dapat memilih kategori lari berbeda untuk peserta ini.</div>
        </div>

        <div class="form-group">
          <label class="form-label">Nomor WhatsApp Peserta (Aktif) <span class="req">*</span></label>
          <input type="tel" class="form-input p-phone" required placeholder="Contoh: 081234567890" data-index="${r}">
          <div class="form-hint">Wajib nomor aktif untuk pengiriman QR E-Tiket pelari.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Lengkap (Sesuai KTP) <span class="req">*</span></label>
          <input type="text" class="form-input p-fullname" required placeholder="Contoh: Budi Santoso" data-index="${r}">
        </div>
        <div class="form-group">
          <label class="form-label">Nama BIB (Maks. 15 Karakter) <span class="req">*</span></label>
          <input type="text" maxlength="15" class="form-input p-bibname" required placeholder="Contoh: BUDI S" data-index="${r}">
          <div class="form-hint">Akan dicetak pada nomor dada Anda.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">NIK (16 Digit Angka) <span class="req">*</span></label>
          <input type="text" maxlength="16" class="form-input p-nik" required placeholder="3328xxxxxxxxxxxx" data-index="${r}">
          <div class="form-hint">Validasi KTP format resmi Disdukcapil (UU PDP).</div>
        </div>
        <div class="form-group">
          <label class="form-label">Jenis Kelamin <span class="req">*</span></label>
          <select class="form-select p-gender" required data-index="${r}">
            <option value="MALE">Laki-Laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Tempat Lahir <span class="req">*</span></label>
          <input type="text" class="form-input p-birthplace" required placeholder="Contoh: Tegal" data-index="${r}">
        </div>
        <div class="form-group">
          <label class="form-label">Tanggal Lahir <span class="req">*</span></label>
          <input type="date" class="form-input p-birthdate" required data-index="${r}">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Alamat Lengkap (Domisili KTP) <span class="req">*</span></label>
        <textarea rows="2" class="form-textarea p-address" required placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" data-index="${r}"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Golongan Darah (Untuk Medis) <span class="req">*</span></label>
          <select class="form-select p-blood" required data-index="${r}">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O" selected>O</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Ukuran Jersey Resmi</label>
          <select class="form-select p-size" data-index="${r}">
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
          <input type="text" class="form-input p-emg-name" required placeholder="Nama Keluarga / Kerabat" data-index="${r}">
        </div>
        <div class="form-group">
          <label class="form-label">No. HP Kontak Darurat (Format +628) <span class="req">*</span></label>
          <input type="text" class="form-input p-emg-phone" required placeholder="+628123456789" data-index="${r}">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Komunitas Lari (Opsional)</label>
          <input type="text" class="form-input p-community" placeholder="Contoh: Tegal Runners Club" data-index="${r}">
        </div>
        <div class="form-group">
          <label class="form-label">Riwayat Penyakit / Alergi (Opsional)</label>
          <input type="text" class="form-input p-medical" placeholder="Asma, Alergi, dsb (Jika ada)" data-index="${r}">
        </div>
      </div>
    `,a.appendChild(l);const m=l.querySelector(".p-phone"),g=l.querySelector(".p-emg-phone");Y(m),Y(g),(i=l.querySelector(".p-event-select"))==null||i.addEventListener("change",()=>{H()})}O()}function La(a){var e,t,s,n,i,r,l,m,g,v,c,p;if(a===1){const d=(e=document.getElementById("bookerName"))==null?void 0:e.value.trim(),k=(t=document.getElementById("bookerEmail"))==null?void 0:t.value.trim(),h=(s=document.getElementById("bookerPhone"))==null?void 0:s.value.trim();return!d||d.length<3?(u("error","Validasi Gagal","Nama pemesan minimal 3 karakter."),!1):!k||!k.includes("@")?(u("error","Validasi Gagal","Email pemesan tidak valid."),!1):!h||!/^(\+62|62|08)\d{8,13}$/.test(h.replace(/\s+/g,""))?(u("error","Validasi Gagal","Nomor WhatsApp tidak valid (gunakan awalan 08 atau +628, min 10 digit)."),!1):(O(),!0)}if(a===2){for(let d=0;d<o.participantCount;d++){const k=(n=document.querySelector(`.p-fullname[data-index="${d}"]`))==null?void 0:n.value.trim(),h=(i=document.querySelector(`.p-phone[data-index="${d}"]`))==null?void 0:i.value.trim(),f=(r=document.querySelector(`.p-bibname[data-index="${d}"]`))==null?void 0:r.value.trim(),T=(l=document.querySelector(`.p-nik[data-index="${d}"]`))==null?void 0:l.value.trim(),S=(m=document.querySelector(`.p-birthplace[data-index="${d}"]`))==null?void 0:m.value.trim(),P=(g=document.querySelector(`.p-birthdate[data-index="${d}"]`))==null?void 0:g.value.trim(),B=(v=document.querySelector(`.p-address[data-index="${d}"]`))==null?void 0:v.value.trim(),A=(c=document.querySelector(`.p-emg-name[data-index="${d}"]`))==null?void 0:c.value.trim(),C=(p=document.querySelector(`.p-emg-phone[data-index="${d}"]`))==null?void 0:p.value.trim();if(!k||k.length<3)return u("error",`Peserta #${d+1}`,"Nama lengkap KTP minimal 3 karakter."),!1;if(!h||!/^(\+62|62|08)\d{7,12}$/.test(h.replace(/\s+/g,"")))return u("error",`Peserta #${d+1}`,"Nomor WhatsApp peserta wajib diisi (contoh: 08123456789 atau +628123456789)."),!1;if(!f||f.length>15)return u("error",`Peserta #${d+1}`,"Nama BIB maksimal 15 karakter."),!1;if(!T||!/^\d{16}$/.test(T))return u("error",`Peserta #${d+1}`,"NIK harus tepat 16 digit angka sesuai KTP."),!1;if(!S||S.length<3)return u("error",`Peserta #${d+1}`,"Tempat lahir wajib diisi."),!1;if(!P)return u("error",`Peserta #${d+1}`,"Tanggal lahir wajib diisi."),!1;if(!B||B.length<10)return u("error",`Peserta #${d+1}`,"Alamat lengkap wajib diisi minimal 10 karakter."),!1;if(!A||A.length<3)return u("error",`Peserta #${d+1}`,"Nama kontak darurat wajib diisi."),!1;if(!C||!/^(\+62|62|08)\d{7,12}$/.test(C.replace(/\s+/g,"")))return u("error",`Peserta #${d+1}`,"Nomor kontak darurat harus diawali 08 atau +628."),!1}return!0}return!0}function Da(){var g,v,c,p,d,k,h;const a=document.getElementById("summaryReviewBox");if(!a||!o.selectedEvent)return;const e=(g=document.getElementById("bookerName"))==null?void 0:g.value.trim(),t=(v=document.getElementById("bookerEmail"))==null?void 0:v.value.trim(),s=(c=document.getElementById("bookerPhone"))==null?void 0:c.value.trim(),{ticketsSubtotal:n,serviceFee:i,grandTotal:r}=sa(),l=new Map(o.events.map(f=>[f.id,f]));let m="";for(let f=0;f<o.participantCount;f++){const T=((p=document.querySelector(`.p-fullname[data-index="${f}"]`))==null?void 0:p.value.trim())||`Peserta #${f+1}`,S=((d=document.querySelector(`.p-event-select[data-index="${f}"]`))==null?void 0:d.value)||o.selectedEvent.id,P=l.get(S)||o.selectedEvent,B=((k=document.querySelector(`.p-phone[data-index="${f}"]`))==null?void 0:k.value.trim())||"-";m+=`
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 6px 0; border-bottom: 1px dotted #CBD5E1;">
        <div>
          <strong>#${f+1} ${x(T)}</strong> (${x(B)})<br>
          <span style="color: #64748B; font-size: 0.78rem;">Kategori: ${x(P.ticketName)}</span>
        </div>
        <span style="font-weight: 700; color: #0F172A;">${I(P.price)}</span>
      </div>
    `}a.innerHTML=`
    <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 18px;">
      <h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-receipt"></i> Ringkasan Tiket & Pemesan</h4>
      <p style="font-size: 0.88rem; margin-bottom: 4px;"><strong>Penanggung Jawab:</strong> ${x(e)}</p>
      <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 12px;">${x(t)} | ${x(s)}</p>

      <div style="margin-bottom: 14px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: #475569; text-transform: uppercase;">Rincian Peserta:</span>
        <div style="margin-top: 6px;">
          ${m}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 8px;">
        <span style="color: #64748B;">Subtotal Tiket:</span>
        <strong>${I(n)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 4px; ${i>0?"color: #EA580C;":"color: #10B981;"}">
        <span>Biaya Layanan (${((h=o.feeSettings)==null?void 0:h.feeType)==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):</span>
        <strong>${i>0?`+ ${I(i)}`:"Gratis (Rp 0)"}</strong>
      </div>
      <div style="border-top: 1px solid var(--color-border-subtle); margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: var(--color-text-title);">
        <span>Total Pembayaran:</span>
        <span style="color: var(--color-primary);">${I(r)}</span>
      </div>
    </div>
  `}async function Fa(){var k,h,f,T,S,P,B,A,C,q,$,N,R,_,K,j,z,y,E,w,D;if((k=o.selectedEvent)!=null&&k.isClosed){u("error","Pendaftaran Ditutup","Pendaftaran untuk kategori ini telah resmi ditutup.");return}const a=(h=document.getElementById("checkConsentPDP"))==null?void 0:h.checked,e=(f=document.getElementById("checkConsentWaiver"))==null?void 0:f.checked;if(!a){u("warning","Persetujuan Diperlukan","Harap setujui Pemrosesan Data Pribadi sesuai UU PDP No. 27/2022.");return}if(!e){u("warning","Persetujuan Diperlukan","Harap setujui Pelepasan Tanggung Jawab Medis (Liability Waiver).");return}const t=document.getElementById("btnModalSubmit");t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses Pesanan...');const s=[];for(let b=0;b<o.participantCount;b++){const G=((T=document.querySelector(`.p-event-select[data-index="${b}"]`))==null?void 0:T.value)||o.selectedEvent.id,V=(S=document.querySelector(`.p-fullname[data-index="${b}"]`))==null?void 0:S.value.trim(),oa=ea((P=document.querySelector(`.p-phone[data-index="${b}"]`))==null?void 0:P.value.trim()),ra=(B=document.querySelector(`.p-bibname[data-index="${b}"]`))==null?void 0:B.value.trim().toUpperCase(),la=(A=document.querySelector(`.p-nik[data-index="${b}"]`))==null?void 0:A.value.trim(),da=(C=document.querySelector(`.p-gender[data-index="${b}"]`))==null?void 0:C.value,ca=(q=document.querySelector(`.p-birthplace[data-index="${b}"]`))==null?void 0:q.value.trim(),pa=($=document.querySelector(`.p-birthdate[data-index="${b}"]`))==null?void 0:$.value.trim(),ma=(N=document.querySelector(`.p-address[data-index="${b}"]`))==null?void 0:N.value.trim(),ua=(R=document.querySelector(`.p-blood[data-index="${b}"]`))==null?void 0:R.value,ga=(_=document.querySelector(`.p-size[data-index="${b}"]`))==null?void 0:_.value,fa=(K=document.querySelector(`.p-emg-name[data-index="${b}"]`))==null?void 0:K.value.trim(),va=ea((j=document.querySelector(`.p-emg-phone[data-index="${b}"]`))==null?void 0:j.value.trim()),ba=((z=document.querySelector(`.p-community[data-index="${b}"]`))==null?void 0:z.value.trim())||null,ka=((y=document.querySelector(`.p-medical[data-index="${b}"]`))==null?void 0:y.value.trim())||null;s.push({eventId:G,fullNameKtp:V,phoneNumber:oa,bibName:ra,nik:la,gender:da,birthPlace:ca,birthDate:pa,fullAddress:ma,bloodType:ua,selectedSize:ga,emergencyContactName:fa,emergencyContactPhone:va,communityName:ba,medicalHistory:ka})}const n=((E=document.getElementById("bookerName"))==null?void 0:E.value.trim())||"",i=((w=document.getElementById("bookerEmail"))==null?void 0:w.value.trim())||"",r=((D=document.getElementById("bookerPhone"))==null?void 0:D.value.trim())||"";if(!i||!r){u("warning","Data Pemesan Kurang","Harap lengkapi Nama, Email aktif, dan Nomor WhatsApp penanggung jawab.");return}const l={bookerName:n,bookerEmail:i,bookerPhone:r,eventId:o.selectedEvent.id,participants:s};u("warning","Menghubungkan Server","Mengamankan slot tiket Anda ke sistem database...");const m=await F.registerOrder(l);if(t&&(t.disabled=!1,t.innerHTML='<i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)'),!m.success){u("error","Gagal Memesan Tiket",m.message);return}u("success","Slot Tiket Diamankan!","Membuka gerbang pembayaran resmi Midtrans Snap...");const{paymentToken:g,paymentUrl:v,orderId:c,midtransOrderId:p}=m.data,d=c||p;window.snap&&typeof window.snap.pay=="function"?window.snap.pay(g,{onSuccess:function(){u("success","Pembayaran Berhasil!","Selamat! Membuka E-Tiket resmi Anda..."),J(),na(),setTimeout(()=>{window.location.href=`/e-ticket.html?orderId=${d}`},1200)},onPending:function(){u("warning","Menunggu Pembayaran","Mengarahkan ke halaman rincian instruksi pembayaran..."),J(),setTimeout(()=>{window.location.href=`/payment.html?orderId=${d}`},1200)},onError:function(){u("error","Pembayaran Gagal","Transaksi dibatalkan atau kedaluwarsa.")},onClose:function(){u("warning","Transaksi Tertunda","Mengarahkan ke halaman instruksi pembayaran & pembatalan..."),setTimeout(()=>{window.location.href=`/payment.html?orderId=${d}`},1e3)}}):v&&window.open(v,"_blank")}function X(a){const e=document.getElementById(a);e&&(e.classList.add("active"),document.body.style.overflow="hidden")}function M(a){const e=document.getElementById(a);e&&(e.classList.remove("active"),document.body.style.overflow="auto")}async function Ma(){try{const a=await F.getWebsiteSettings();if(!a)return;a.site_title&&(document.title=a.site_title);const e=document.getElementById("heroStatusText")||document.querySelector(".hero-pill-badge span:not(.status-dot)");e&&a.hero_badge&&(e.textContent=a.hero_badge);const t=document.querySelector(".hero-title");t&&a.hero_title&&(t.innerHTML=a.hero_title.replace(/\n/g,"<br>"));const s=document.querySelector(".hero-desc");s&&a.hero_subtitle&&(s.textContent=a.hero_subtitle);const n=document.getElementById("heroDisplayImg");n&&a.hero_bg_image&&(n.src=a.hero_bg_image);const i=(c,p)=>{const d=document.getElementById(c);d&&p!==void 0&&p!==null&&p!==""&&(d.textContent=p)};i("statVal1",a.stat_1_val),i("statUnit1",a.stat_1_unit),i("statDesc1",a.stat_1_desc),i("statVal2",a.stat_2_val),i("statUnit2",a.stat_2_unit),i("statDesc2",a.stat_2_desc),i("statVal3",a.stat_3_val),i("statUnit3",a.stat_3_unit),i("statDesc3",a.stat_3_desc),i("statVal4",a.stat_4_val),i("statUnit4",a.stat_4_unit),i("statDesc4",a.stat_4_desc);const r=document.getElementById("beranda");r&&a.hero_bg_image&&(r.style.backgroundImage=`radial-gradient(circle at 10% 20%, rgba(255, 107, 0, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 107, 0, 0.05) 0%, transparent 40%), linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.98) 100%), url('${a.hero_bg_image}')`,r.style.backgroundSize="cover",r.style.backgroundPosition="center");const l=document.getElementById("rute");if(l){const c=document.getElementById("routeSectionTitle")||l.querySelector(".section-title");c&&a.route_title&&(c.textContent=a.route_title);const p=document.getElementById("routeSectionDesc")||l.querySelector(".route-info-card > p");p&&a.route_desc&&(p.textContent=a.route_desc),i("routeStart10k",a.route_start_10k),i("routeStart5k",a.route_start_5k),i("routeCot10k",a.route_cot_10k),i("routeCot5k",a.route_cot_5k);const d=document.getElementById("btnDownloadGpx");d&&a.route_gpx_url&&(d.href=a.route_gpx_url,a.route_gpx_url==="#"||!a.route_gpx_url.startsWith("http")?d.onclick=f=>{f.preventDefault(),alert("File GPX Rute Tegal Run 2027 akan dapat diunduh pada H-14 perlombaan.")}:(d.setAttribute("target","_blank"),d.onclick=null));const k=l.querySelector(".route-visual-card"),h=a.route_gmaps_url||a.gmaps_embed_url;if(k&&h){let f=h.trim();const T=f.match(/src=["'](.*?)["']/);T&&T[1]&&(f=T[1]),k.innerHTML=`
          <div class="route-badge-float">
            <i class="fa-solid fa-location-dot"></i> Rute & Lokasi Google Maps
          </div>
          <div class="gmaps-responsive-wrapper">
            <iframe src="${f}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="width: 100%; height: 100%; min-height: 380px; border: 0; border-radius: 16px;"></iframe>
          </div>
        `}}const m=document.getElementById("fasilitas");if(m){const c=m.querySelector(".section-title");c&&a.facilities_title&&(c.textContent=a.facilities_title);const p=m.querySelector(".section-desc");p&&a.facilities_desc&&(p.textContent=a.facilities_desc)}const g=document.getElementById("facilitiesContainer");if(g){const c=[{icon:"fa-shirt",title:"Jersey Running Dry-Fit",desc:"Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh."},{icon:"fa-microchip",title:"Nomor Dada (BIB) & Timing Chip",desc:"Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online."},{icon:"fa-medal",title:"Medali Finisher Logam Cor",desc:"Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT."},{icon:"fa-bottle-water",title:"Water & Isotonic Station",desc:"Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar."},{icon:"fa-truck-medical",title:"Tim Medis & Ambulans Mobile",desc:"Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute."},{icon:"fa-utensils",title:"Refreshment & Finisher Feast",desc:"Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar."}];g.innerHTML=c.map(p=>`
        <div class="facility-card">
          <div class="facility-card-head">
            <div class="facility-icon-wrap">
              <i class="fa-solid ${p.icon}"></i>
            </div>
            <h4 class="facility-title">${p.title}</h4>
          </div>
          <p class="facility-desc">${p.desc}</p>
        </div>
      `).join("")}const v=document.getElementById("kategori");if(v){const c=v.querySelector(".section-title");c&&a.tickets_title&&(c.textContent=a.tickets_title);const p=v.querySelector(".section-desc");p&&a.tickets_desc&&(p.textContent=a.tickets_desc)}if(i("legalSectionTitle",a.legal_title),i("legalSectionDesc",a.legal_desc),i("legalItem1Title",a.legal_item_1_title),i("legalItem1Desc",a.legal_item_1_desc),i("legalItem2Title",a.legal_item_2_title),i("legalItem2Desc",a.legal_item_2_desc),i("legalItem3Title",a.legal_item_3_title),i("legalItem3Desc",a.legal_item_3_desc),i("legalItem4Title",a.legal_item_4_title),i("legalItem4Desc",a.legal_item_4_desc),a.contact_email&&document.querySelectorAll(".footer-email").forEach(c=>c.textContent=a.contact_email),a.contact_phone&&document.querySelectorAll(".footer-phone").forEach(c=>c.textContent=a.contact_phone),a.contact_address){const c=document.querySelector(".footer-address");c&&(c.textContent=a.contact_address)}if(a.footer_copyright){const c=document.querySelector(".footer-copyright-text")||document.querySelector(".footer-bottom > div:first-child");c&&(c.textContent=a.footer_copyright)}}catch(a){console.warn("Failed to apply website settings:",a)}}async function qa(){const a=document.getElementById("routeChecklistContainer");try{const e=await F.getRouteOverview();if(!e){a&&(a.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>');return}const t=document.getElementById("routeSectionTitle");t&&e.title&&(t.textContent=e.title);const s=document.getElementById("routeSectionDesc");s&&e.description&&(s.textContent=e.description),a&&(Array.isArray(e.points)&&e.points.length>0?a.innerHTML=e.points.map((n,i)=>`
          <div class="route-point">
            <div class="route-point-marker">${String(i+1).padStart(2,"0")}</div>
            <div class="route-point-content">
              <h4>${x(n.name)}${n.distanceKm>0?` <small style="font-weight:500;color:#64748B;">— Km ${n.distanceKm}</small>`:""}</h4>
              <p>${x(n.description||"")}</p>
              ${n.isWaterStation?'<span class="route-tag" style="display:inline-block;margin-top:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#EFF6FF;color:#3B82F6;font-weight:600;">💧 Water Station</span>':""}
              ${n.isMedicalSpot?'<span class="route-tag" style="display:inline-block;margin-top:4px;margin-left:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#F0FDF4;color:#16A34A;font-weight:600;">🏥 Pos Medis</span>':""}
            </div>
          </div>
        `).join(""):a.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>')}catch{a&&(a.innerHTML='<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>')}}function $a(){document.querySelectorAll(".nav-dropdown-toggle").forEach(a=>{a.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation();const t=a.closest(".nav-dropdown"),s=t.classList.contains("active");document.querySelectorAll(".nav-dropdown").forEach(n=>n.classList.remove("active")),s||t.classList.add("active")})}),document.addEventListener("click",()=>{document.querySelectorAll(".nav-dropdown").forEach(a=>a.classList.remove("active"))})}function ta(){var i,r,l,m,g,v,c,p,d,k,h,f,T,S,P,B,A,C,q,$,N,R,_,K,j,z;U(),Ca(),Ma(),qa(),na(),$a();const a=async y=>{if(y&&y.preventDefault(),o.isGlobalClosed){u("error","Pendaftaran Ditutup","Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.");return}if(o.events.length>0){const E=o.events.find(w=>!w.isClosed)||o.events[0];W(E)}else{const E=document.getElementById("kategori")||document.getElementById("ticketsSection");E&&E.scrollIntoView({behavior:"smooth"});try{const w=await F.getEvents();if(w&&w.length>0){o.events=w,ia(w);const D=w.find(b=>!b.isClosed)||w[0];W(D)}}catch{u("error","Gagal Memuat Kategori","Gagal memuat kategori tiket. Pastikan server backend aktif.")}}};(i=document.getElementById("heroCtaBtn"))==null||i.addEventListener("click",a),(r=document.getElementById("navDaftarBtn"))==null||r.addEventListener("click",a),(l=document.getElementById("dockDaftarBtn"))==null||l.addEventListener("click",a),(m=document.getElementById("modalCloseBtn"))==null||m.addEventListener("click",J),(g=document.getElementById("regModal"))==null||g.addEventListener("click",y=>{y.target.id==="regModal"&&J()}),(v=document.getElementById("modalEventSelect"))==null||v.addEventListener("change",y=>{const E=o.events.find(w=>w.id===y.target.value);E&&(o.selectedEvent=E,Z(),H())}),(c=document.getElementById("modalParticipantCount"))==null||c.addEventListener("change",y=>{o.participantCount=parseInt(y.target.value,10)||1,Z(),H()});const e=document.getElementById("bookerPhone");e&&Y(e),(p=document.getElementById("checkSameAsBooker"))==null||p.addEventListener("change",()=>{O()}),(d=document.getElementById("bookerName"))==null||d.addEventListener("input",()=>{O()}),(k=document.getElementById("bookerPhone"))==null||k.addEventListener("input",()=>{O()}),(h=document.getElementById("btnModalNext"))==null||h.addEventListener("click",()=>{La(o.currentStep)&&(o.currentStep++,o.currentStep===3&&Da(),Q())}),(f=document.getElementById("btnModalPrev"))==null||f.addEventListener("click",()=>{o.currentStep>1&&(o.currentStep--,Q())}),(T=document.getElementById("btnModalSubmit"))==null||T.addEventListener("click",Fa);const t=()=>X("privacyModal");(S=document.getElementById("btnOpenPrivacyModal"))==null||S.addEventListener("click",t),(P=document.getElementById("footerPrivacyLink"))==null||P.addEventListener("click",t),(B=document.getElementById("privacyCloseBtn"))==null||B.addEventListener("click",()=>M("privacyModal")),(A=document.getElementById("privacyOkBtn"))==null||A.addEventListener("click",()=>M("privacyModal"));const s=()=>X("termsModal");(C=document.getElementById("btnOpenTerms"))==null||C.addEventListener("click",s),(q=document.getElementById("btnOpenTermsModal"))==null||q.addEventListener("click",s),($=document.getElementById("footerTermsLink"))==null||$.addEventListener("click",s),(N=document.getElementById("footerWaiverLink"))==null||N.addEventListener("click",s),(R=document.getElementById("termsCloseBtn"))==null||R.addEventListener("click",()=>M("termsModal")),(_=document.getElementById("termsOkBtn"))==null||_.addEventListener("click",()=>M("termsModal")),(K=document.getElementById("btnOpenSizeChart"))==null||K.addEventListener("click",()=>X("sizeChartModal")),(j=document.getElementById("sizeChartCloseBtn"))==null||j.addEventListener("click",()=>M("sizeChartModal")),(z=document.getElementById("sizeChartOkBtn"))==null||z.addEventListener("click",()=>M("sizeChartModal")),document.querySelectorAll(".faq-question").forEach(y=>{y.addEventListener("click",()=>{y.parentElement.classList.toggle("active")})});const n=document.querySelectorAll("section[id]");window.addEventListener("scroll",()=>{const y=window.pageYOffset;n.forEach(E=>{const w=E.offsetHeight,D=E.offsetTop-120,b=E.getAttribute("id"),G=document.querySelector(`.mobile-bottom-dock a[href*="${b}"]`);G&&y>D&&y<=D+w&&(document.querySelectorAll(".mobile-bottom-dock a").forEach(V=>V.classList.remove("active")),G.classList.add("active"))})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ta):ta();
