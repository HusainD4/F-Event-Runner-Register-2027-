import{f as qa,e as Ha,h as Ga,a as Wa,o as Ja,c as _a,l as Qa,b as w,d as Va,g as Ya,i as Xa,j as $a,k as Za,m as an,n as nn,p as en,q as tn,r as sn,s as ln,t as on,u as rn,D as dn,v as Na,w as cn,x as pn,y as mn,z as un,A as bn,B as gn,C as vn,E as fn,F as hn,G as kn,H as yn,I as k,J as xn,K as wn,L as En,M as Fn,N as An,O as Sn,P as Ma,Q as Pn,R as Tn,S as Cn,T as Bn,U as In,V as Rn,W as Ln,X as Nn,Y as Mn,Z as Dn,_ as Kn,$ as zn,a0 as On,a1 as E,a2 as jn,a3 as Da,a4 as Un,a5 as Gn,a6 as qn,a7 as Hn,a8 as Ka,a9 as Wn,aa as Jn,ab as _n,ac as Qn,ad as y,ae as Vn,af as Yn,ag as Xn,ah as $n,ai as Zn,aj as ae}from"./auth-B74jVeSt.js";import{a as ne,b as ee}from"./api-iQl_QkSJ.js";import{a as ie}from"./home-appearance-Db1ttUVV.js";const te=`<div class="admin-tab-pane active" id="pane-dashboard">
          <!-- Top KPI Grid: Pemisahan Jelas Total Biaya Layanan & Hasil Akhir Murni Bersih -->
          <div class="admin-kpi-grid">
            <div class="kpi-card" data-dashboard-widget="dashboard:participants">
              <div class="kpi-icon orange"><i class="fa-solid fa-users"></i></div>
              <div class="kpi-details">
                <span class="kpi-label">Peserta Terdaftar</span>
                <h3 class="kpi-val" id="kpiTotalParticipants">0</h3>
                <span class="kpi-sub">Total Pelari di Database</span>
              </div>
            </div>

            <div class="kpi-card" data-dashboard-widget="dashboard:revenue">
              <div class="kpi-icon blue"><i class="fa-solid fa-receipt"></i></div>
              <div class="kpi-details">
                <span class="kpi-label">Total Omzet Kotor</span>
                <h3 class="kpi-val" id="kpiTotalRevenue">Rp 0</h3>
                <span class="kpi-sub">Total Masuk Sebelum Potongan</span>
              </div>
            </div>

            <div class="kpi-card" data-dashboard-widget="dashboard:service-fee" style="border: 2px solid #FCD34D; background: #FFFBEB;">
              <div class="kpi-icon purple" style="background: #F59E0B; color: #FFFFFF;"><i class="fa-solid fa-hand-holding-dollar"></i></div>
              <div class="kpi-details">
                <span class="kpi-label" style="color: #92400E; font-weight: 700;">TOTAL BIAYA LAYANAN</span>
                <h3 class="kpi-val" id="kpiTotalServiceFee" style="color: #B45309;">Rp 0</h3>
                <span class="kpi-sub" style="color: #92400E;">Akumulasi Fee Sistem & Gateway</span>
              </div>
            </div>

            <div class="kpi-card" data-dashboard-widget="dashboard:net-revenue" style="border: 2px solid #86EFAC; background: #F0FDF4;">
              <div class="kpi-icon green" style="background: #22C55E; color: #FFFFFF;"><i class="fa-solid fa-vault"></i></div>
              <div class="kpi-details">
                <span class="kpi-label" style="color: #166534; font-weight: 700;">HASIL AKHIR MURNI (BERSIH)</span>
                <h3 class="kpi-val" id="kpiNetRevenue" style="color: #15803D;">Rp 0</h3>
                <span class="kpi-sub" style="color: #166534;">Omzet Bersih (Setelah Potong Biaya Layanan)</span>
              </div>
            </div>
          </div>

          <div class="dashboard-stats-error" id="dashboardStatsError" role="alert" hidden>
            <span>Statistik dashboard gagal dimuat.</span>
            <button type="button" class="btn btn-outline btn-sm" id="btnRetryDashboardStats">Coba lagi</button>
          </div>

          <!-- SECTION: REKONSILIASI KEUANGAN & RINCIAN TRANSAKSI (HANYA LUNAS, PENDING, BATAL, BIAYA LAYANAN) -->
          <div class="admin-section" data-dashboard-widget="dashboard:finance-breakdown" style="margin-top: 20px; border: 1px solid #E2E8F0; background: #FFFFFF; border-radius: var(--radius-xl);">
            <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 style="display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-scale-balanced" style="color: var(--color-primary);"></i>
                  Rekonsiliasi Keuangan &amp; Rincian Transaksi
                </h3>
                <p>Data keuangan terpisah rapi: Lunas, Menunggu Pembayaran, Dibatalkan, dan Akumulasi Biaya Layanan.</p>
              </div>
              <button type="button" class="btn btn-outline btn-sm btn-glow" id="btnSyncMidtransDashboard" data-permission="finance:read" title="Cek &amp; perbarui seluruh status transaksi dari server Midtrans">
                <i class="fa-solid fa-arrows-rotate"></i> Sinkronkan Status Midtrans
              </button>
            </div>

            <!-- Financial Breakdown Grid (4 Item: Lunas, Pending, Batal, Biaya Layanan) -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px;">
              <!-- 1. LUNAS -->
              <div class="glass-card" style="padding: 16px; border: 1px solid #BBF7D0; background: #F0FDF4; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.78rem; font-weight: 700; color: #166534; text-transform: uppercase;">
                    <i class="fa-solid fa-circle-check"></i> 1. Lunas (Settlement)
                  </span>
                  <span class="badge" style="background: #DCFCE7; color: #15803D; font-weight: 800; font-size: 0.7rem;" id="finSettledCount">0 Order</span>
                </div>
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #15803D; margin: 0 0 4px 0;" id="finSettledAmount">Rp 0</h3>
                <small style="color: #166534; font-size: 0.72rem;">Transaksi terverifikasi &amp; dana masuk</small>
              </div>

              <!-- 2. PENDING -->
              <div class="glass-card" style="padding: 16px; border: 1px solid #FDE68A; background: #FFFBEB; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.78rem; font-weight: 700; color: #92400E; text-transform: uppercase;">
                    <i class="fa-solid fa-clock"></i> 2. Pending (Menunggu)
                  </span>
                  <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 800; font-size: 0.7rem;" id="finPendingCount">0 Order</span>
                </div>
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #B45309; margin: 0 0 4px 0;" id="finPendingAmount">Rp 0</h3>
                <small style="color: #92400E; font-size: 0.72rem;">Belum dibayarkan oleh calon peserta</small>
              </div>

              <!-- 3. BATAL -->
              <div class="glass-card" style="padding: 16px; border: 1px solid #FECACA; background: #FEF2F2; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.78rem; font-weight: 700; color: #991B1B; text-transform: uppercase;">
                    <i class="fa-solid fa-ban"></i> 3. Batal / Expired
                  </span>
                  <span class="badge" style="background: #FEE2E2; color: #B91C1C; font-weight: 800; font-size: 0.7rem;" id="finCancelledCount">0 Order</span>
                </div>
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #B91C1C; margin: 0 0 4px 0;" id="finCancelledAmount">Rp 0</h3>
                <small style="color: #991B1B; font-size: 0.72rem;">Kadaluarsa atau dibatalkan sistem</small>
              </div>

              <!-- 4. BIAYA LAYANAN -->
              <div class="glass-card" style="padding: 16px; border: 1px solid #E9D5FF; background: #FAF5FF; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.78rem; font-weight: 700; color: #6B21A8; text-transform: uppercase;">
                    <i class="fa-solid fa-hand-holding-dollar"></i> 4. Biaya Layanan
                  </span>
                  <span class="badge" style="background: #F3E8FF; color: #7E22CE; font-weight: 800; font-size: 0.7rem;" id="finServiceFeeCount">0 Transaksi</span>
                </div>
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #7E22CE; margin: 0 0 4px 0;" id="finServiceFeeAmount">Rp 0</h3>
                <small style="color: #6B21A8; font-size: 0.72rem;">Total akumulasi biaya layanan</small>
              </div>
            </div>

            <!-- Reconciliation Formula Summary Banner -->
            <div style="padding: 14px 20px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge" style="background: #0F172A; color: #FFFFFF; font-weight: 700; padding: 6px 12px;">
                  <i class="fa-solid fa-calculator"></i> REKONSILIASI AKHIR
                </span>
                <span style="font-size: 0.88rem; color: #334155; font-weight: 600;">
                  Total Lunas (<span id="calcGross" style="color: #15803D;">Rp 0</span>) − Total Biaya Layanan (<span id="calcFee" style="color: #7E22CE;">Rp 0</span>) = HASIL AKHIR MURNI
                </span>
              </div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #059669;">
                Bersih Diterima: <span id="calcNetResult" style="font-size: 1.15rem; font-weight: 800;">Rp 0</span>
              </div>
            </div>
          </div>

          <div class="dashboard-insights-grid" data-dashboard-columns="3">
            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:registration-trend" data-dashboard-permission="participants:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-chart-line"></i> Tren Pendaftaran</h3>
                  <p>Pergerakan pendaftaran aktif selama 30 hari terakhir.</p>
                </div>
              </div>
              <div id="dashboardRegistrationTrend" class="dashboard-line-chart" aria-label="Grafik tren pendaftaran"></div>
            </section>

            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:revenue-trend" data-dashboard-permission-any="finance:read,orders:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-chart-area"></i> Tren Pemasukan</h3>
                  <p>Nilai transaksi lunas berdasarkan tanggal order dibuat, selama 30 hari terakhir.</p>
                </div>
              </div>
              <div id="dashboardRevenueTrend" class="dashboard-line-chart" aria-label="Grafik tren pemasukan"></div>
            </section>
            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:payment-status" data-dashboard-permission="orders:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-chart-pie"></i> Status Pembayaran</h3>
                  <p>Jumlah transaksi menurut status terakhir.</p>
                </div>
              </div>
              <div id="dashboardPaymentStatuses" class="dashboard-status-chart" aria-label="Grafik status pembayaran"></div>
            </section>

            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:conversion" data-dashboard-permission="orders:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-arrow-trend-up"></i> Konversi &amp; Nilai Transaksi</h3>
                  <p>Efektivitas transaksi dan rata-rata nilai pembayaran sukses.</p>
                </div>
              </div>
              <div id="dashboardConversionSummary" class="dashboard-summary-grid"></div>
            </section>

            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:racepack-checkin" data-dashboard-permission="participants:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-box-open"></i> Check-in Racepack</h3>
                  <p>Status pengambilan racepack untuk peserta yang sudah lunas.</p>
                </div>
              </div>
              <div id="dashboardRacepackSummary" class="dashboard-racepack-summary"></div>
            </section>
            <section class="admin-section dashboard-insight-card dashboard-insight-card--full-row" data-dashboard-widget="dashboard:team-presence">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-people-group"></i> Kru &amp; Kehadiran Online</h3>
                  <p id="dashboardTeamScope">Anggota role dan status koneksi saat ini.</p>
                </div>
              </div>
              <div id="dashboardTeamPresence" class="dashboard-team-list"></div>
            </section>

            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:participant-profile" data-dashboard-permission="participants:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-user-group"></i> Profil Peserta Aktif</h3>
                  <p>Komposisi peserta menurut gender dan kelompok usia.</p>
                </div>
              </div>
              <div class="dashboard-profile-grid">
                <div>
                  <h4>Gender</h4>
                  <div id="dashboardParticipantGender" class="dashboard-donut-chart"></div>
                </div>
                <div>
                  <h4>Kelompok Usia</h4>
                  <div id="dashboardParticipantAge" class="dashboard-bar-chart"></div>
                </div>
              </div>
            </section>

            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:jersey-sizes" data-dashboard-permission="participants:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-shirt"></i> Kebutuhan Ukuran Jersey</h3>
                  <p>Distribusi ukuran jersey dari pendaftar aktif untuk membantu perencanaan stok.</p>
                </div>
              </div>
              <div id="dashboardJerseySizes" class="dashboard-bar-chart"></div>
            </section>
            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:category-performance" data-dashboard-permission="events:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-chart-column"></i> Performa Kategori Event</h3>
                  <p>Perbandingan pendaftar aktif dengan kapasitas tiap kategori.</p>
                </div>
              </div>
              <div id="dashboardCategoryPerformance" class="dashboard-category-chart"></div>
            </section>

            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:event-performance" data-dashboard-permission="events:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-ticket"></i> Performa Event &amp; Kuota</h3>
                  <p>Pendaftar aktif, kapasitas, dan sisa kuota tiap kategori.</p>
                </div>
              </div>
              <div class="dashboard-table-wrap">
                <table class="dashboard-data-table">
                  <thead><tr><th>Event / Kategori</th><th>Pendaftar</th><th>Sisa Kuota</th><th>Terisi</th><th>Status</th></tr></thead>
                  <tbody id="dashboardEventPerformance"></tbody>
                </table>
              </div>
            </section>

            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:recent-orders" data-dashboard-permission="orders:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-receipt"></i> Transaksi Terbaru</h3>
                  <p>Delapan transaksi terakhir tanpa menampilkan data pribadi peserta.</p>
                </div>
              </div>
              <div class="dashboard-table-wrap">
                <table class="dashboard-data-table">
                  <thead><tr><th>Referensi</th><th>Status</th><th>Peserta</th><th>Total</th></tr></thead>
                  <tbody id="dashboardRecentOrders"></tbody>
                </table>
              </div>
            </section>

            <section class="admin-section dashboard-insight-card" data-dashboard-widget="dashboard:recent-activity" data-dashboard-permission="logs:read">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-clock-rotate-left"></i> Aktivitas Terbaru</h3>
                  <p>Aktivitas sistem terbaru.</p>
                </div>
              </div>
              <ul id="dashboardRecentActivity" class="dashboard-activity-list"></ul>
            </section>
          </div>

          <!-- Quick Overview Section -->
          <div class="admin-section" data-dashboard-widget="dashboard:quicklinks">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-bolt" style="color: var(--color-primary);"></i> Pintasan Cepat & Ringkasan Operasional</h3>
                <p>Navigasi cepat untuk mengelola event, peserta, dan transaksi secara real-time.</p>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
              <div class="kpi-card" data-dashboard-link="page:events" style="cursor: pointer;" onclick="switchAdminTab('events')">
                <div class="kpi-icon orange"><i class="fa-solid fa-calendar-days"></i></div>
                <div>
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Kelola Event & Tiket</h4>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Atur kuota, harga, dan buka/tutup kategori.</p>
                </div>
              </div>

              <div class="kpi-card" data-dashboard-link="page:participants" style="cursor: pointer;" onclick="switchAdminTab('participants')">
                <div class="kpi-icon blue"><i class="fa-solid fa-users"></i></div>
                <div>
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Database Peserta</h4>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Lihat NIK, nomor BIB, dan ekspor CSV.</p>
                </div>
              </div>

              <div class="kpi-card" data-dashboard-link="page:orders" style="cursor: pointer;" onclick="switchAdminTab('orders')">
                <div class="kpi-icon green"><i class="fa-solid fa-receipt"></i></div>
                <div>
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Transaksi & Pembayaran</h4>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Konfirmasi pembayaran dan status order.</p>
                </div>
              </div>

              <div class="kpi-card" data-dashboard-link="page:countdown" style="cursor: pointer;" onclick="switchAdminTab('countdown')">
                <div class="kpi-icon purple"><i class="fa-solid fa-stopwatch-20"></i></div>
                <div>
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Target Countdown Event</h4>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Atur tanggal race day dan status registrasi global.</p>
                </div>
              </div>
            </div>
          </div>
        </div>`,se=`<div class="admin-tab-pane" id="pane-events">
          <div class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-calendar-days" style="color: var(--color-primary);"></i> Manajemen Kategori Lomba & Tiket</h3>
                <p>Tambah, edit, hapus, atur kuota, harga, dan status buka/tutup per kategori.</p>
              </div>
              <div class="admin-action-bar">
                <button class="btn btn-secondary btn-sm" id="btnRefreshEvents">
                  <i class="fa-solid fa-rotate"></i> Segarkan
                </button>
                <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateEventModal" data-permission="events:create">
                  <i class="fa-solid fa-plus"></i> Tambah Event Baru
                </button>
              </div>
            </div>

            <!-- List of Event Cards -->
            <div class="admin-events-list" id="adminEventsContainer">
              <div style="text-align: center; padding: 40px; grid-column: span 2;">
                <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--color-primary);"></i>
                <p style="margin-top: 10px; color: var(--color-text-muted);">Memuat daftar event...</p>
              </div>
            </div>
          </div>
        </div>`,le=`<div class="admin-tab-pane" id="pane-participants">
  <div class="admin-section">
    <div class="admin-section-header" style="flex-wrap: wrap; gap: 14px;">
      <div>
        <h3 style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-users" style="color: var(--color-primary);"></i>
          Database Peserta &amp; Validasi Pelari
        </h3>
        <p>Kelola data lengkap pelari, nomor BIB, status verifikasi pembayaran Midtrans, dan status serah terima Racepack (Check-in).</p>
      </div>
      <div class="admin-action-bar" style="flex-wrap: wrap; gap: 8px;">
        <input type="text" class="form-input form-input-sm" id="searchParticipant" placeholder="Cari Nama, BIB, NIK, No. HP..." style="width: 230px;">
        <select class="form-input form-input-sm" id="filterParticipantCategory" style="width: 150px;">
          <option value="">Semua Kategori</option>
          <option value="10K">10K Only</option>
          <option value="5K">5K Only</option>
        </select>
        <button class="btn btn-secondary btn-sm" id="btnExportCsv">
          <i class="fa-solid fa-file-csv"></i> Unduh CSV
        </button>
        <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateParticipantModal" data-permission="participants:create">
          <i class="fa-solid fa-user-plus"></i> Tambah Peserta Manual
        </button>
      </div>
    </div>

    <!-- Segmented Tab Filter: Pisahkan per Status Pembayaran & Racepack -->
    <div class="participant-tabs-nav" style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; padding-bottom: 6px; border-bottom: 1px solid #E2E8F0;">
      <button type="button" class="btn btn-primary btn-sm part-tab-btn active" data-tab="ALL" id="partTabAll" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">
        <i class="fa-solid fa-layer-group"></i> Semua Peserta <span class="badge" style="background: rgba(255,255,255,0.3); color: #FFFFFF;" id="countPartAll">0</span>
      </button>
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="SETTLED" id="partTabSettled" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #86EFAC; color: #15803D;">
        <i class="fa-solid fa-circle-check"></i> Pembayaran Sukses (Lunas) <span class="badge" style="background: #DCFCE7; color: #166534;" id="countPartSettled">0</span>
      </button>
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="PENDING" id="partTabPending" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #FDE68A; color: #B45309;">
        <i class="fa-solid fa-clock"></i> Menunggu Bayar (Pending) <span class="badge" style="background: #FEF3C7; color: #92400E;" id="countPartPending">0</span>
      </button>
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="CANCELLED" id="partTabCancelled" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #FECACA; color: #B91C1C;">
        <i class="fa-solid fa-ban"></i> Dibatalkan / Expired <span class="badge" style="background: #FEE2E2; color: #991B1B;" id="countPartCancelled">0</span>
      </button>
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="RACEPACK_DONE" id="partTabRacepackDone" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #A7F3D0; color: #047857;">
        <i class="fa-solid fa-box-check"></i> Racepack Sudah Diambil <span class="badge" style="background: #D1FAE5; color: #065F46;" id="countPartRacepackDone">0</span>
      </button>
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="RACEPACK_PENDING" id="partTabRacepackPending" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #FED7AA; color: #C2410C;">
        <i class="fa-solid fa-box-open"></i> Racepack Belum Diambil <span class="badge" style="background: #FFEDD5; color: #9A3412;" id="countPartRacepackPending">0</span>
      </button>
    </div>

    <!-- Info Banner Aktif -->
    <div id="participantFilterBanner" style="padding: 10px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-md); margin-bottom: 14px; font-size: 0.82rem; color: #475569; display: flex; justify-content: space-between; align-items: center;">
      <div>
        Menampilkan tabel: <strong id="participantActiveTabTitle" style="color: #0F172A;">Semua Peserta Terdaftar</strong> (<span id="participantFilteredCount">0</span> peserta)
      </div>
      <div style="font-size: 0.78rem; color: #64748B;">
        <i class="fa-solid fa-info-circle"></i> Gunakan tab di atas untuk memfilter tabel atau tampilkan seluruhnya.
      </div>
    </div>

    <div class="table-responsive">
      <table class="admin-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Peserta (KTP)</th>
            <th>Nomor &amp; Nama BIB</th>
            <th>NIK (KTP)</th>
            <th>Kategori</th>
            <th>Gender &amp; Gol. Darah</th>
            <th>Jersey</th>
            <th>Kontak Darurat</th>
            <th>Status Pembayaran</th>
            <th>Status Racepack</th>
            <th style="text-align: center; min-width: 110px;">Aksi</th>
          </tr>
        </thead>
        <tbody id="adminParticipantsTableBody">
          <tr>
            <td colspan="11" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
              Memuat data peserta...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`,oe=`<div class="admin-tab-pane" id="pane-racepack">
  <div class="admin-section">
    <div class="admin-section-header" style="flex-wrap: wrap; gap: 14px;">
      <div>
        <h3 style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-box-open" style="color: var(--color-primary);"></i>
          Pengambilan Racepack &amp; Validasi E-Tiket (RPC)
        </h3>
        <p class="rpc-page-description">Pindai QR Code E-Tiket via kamera HP atau cari data peserta secara instan untuk verifikasi status bayar, ukuran jersey, dan serah terima paket lomba.</p>
      </div>
      <div class="admin-action-bar rpc-header-actions">
        <button type="button" class="btn btn-outline btn-sm rpc-info-trigger" id="btnRpcInfo" aria-label="Lihat informasi racepack" aria-haspopup="dialog">
          <i class="fa-solid fa-circle-info" aria-hidden="true"></i><span> Info</span>
        </button>
        <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshRacepackStats" aria-label="Segarkan statistik racepack">
          <i class="fa-solid fa-rotate"></i><span> Segarkan</span>
        </button>
      </div>
    </div>

    <!-- KPI Summary Grid -->
    <div class="admin-kpi-grid" style="margin-bottom: 20px;">
      <div class="kpi-card" style="border: 1px solid #BBF7D0; background: #F0FDF4;">
        <div class="kpi-icon green" style="background: #22C55E; color: #FFFFFF;"><i class="fa-solid fa-circle-check"></i></div>
        <div class="kpi-details">
          <span class="kpi-label" style="color: #166534; font-weight: 700;">SUDAH DIAMBIL (CHECK-IN)</span>
          <h3 class="kpi-val" id="rpcKpiCheckedIn" style="color: #15803D;">0</h3>
          <span class="kpi-sub" style="color: #166534;" id="rpcKpiPercentage">0% dari peserta lunas</span>
        </div>
      </div>

      <div class="kpi-card" style="border: 1px solid #FED7AA; background: #FFF7ED;">
        <div class="kpi-icon orange" style="background: #F97316; color: #FFFFFF;"><i class="fa-solid fa-box-open"></i></div>
        <div class="kpi-details">
          <span class="kpi-label" style="color: #9A3412; font-weight: 700;">BELUM DIAMBIL (SISA)</span>
          <h3 class="kpi-val" id="rpcKpiRemaining" style="color: #C2410C;">0</h3>
          <span class="kpi-sub" style="color: #9A3412;">Paket lomba siap diserahkan</span>
        </div>
      </div>

      <dialog class="rpc-info-dialog" id="rpcInfoDialog" aria-labelledby="rpcInfoTitle">
        <div class="rpc-info-dialog-header">
          <h4 id="rpcInfoTitle"><i class="fa-solid fa-circle-info"></i> Informasi Racepack</h4>
          <button type="button" class="rpc-info-close" id="btnCloseRpcInfo" aria-label="Tutup informasi">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <p class="rpc-info-description">Pastikan pembayaran peserta lunas. Pindai QR atau cari peserta, kirim ke Live View, lalu konfirmasi check-in setelah racepack diserahkan.</p>
        <div class="rpc-info-stats">
          <div><span>Sudah check-in</span><strong id="rpcInfoCheckedIn">0</strong><small id="rpcInfoPercentage">0% dari peserta lunas</small></div>
          <div><span>Belum diambil</span><strong id="rpcInfoRemaining">0</strong><small>Paket siap diserahkan</small></div>
          <div><span>Total peserta lunas</span><strong id="rpcInfoPaidTotal">0</strong><small>Pembayaran terverifikasi</small></div>
        </div>
      </dialog>

      <div class="kpi-card">
        <div class="kpi-icon blue"><i class="fa-solid fa-users"></i></div>
        <div class="kpi-details">
          <span class="kpi-label">Total Peserta Berhak (Lunas)</span>
          <h3 class="kpi-val" id="rpcKpiPaidTotal">0</h3>
          <span class="kpi-sub">Pembayaran terverifikasi</span>
        </div>
      </div>
    </div>

    <!-- Main 2-Column Interface: Left Scan/Search, Right Checklist Validation -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px; align-items: start;">
      
      <!-- LEFT COLUMN: CAMERA SCANNER & MANUAL SEARCH -->
      <div>
        <!-- Camera Scanner Card (Mobile First) -->
        <div class="glass-card" style="padding: 20px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h4 style="margin: 0; font-size: 1rem; color: #0F172A; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-camera" style="color: var(--color-primary);"></i>
              Kamera Scanner QR E-Tiket (HP / Tablet)
            </h4>
            <span class="badge" id="rpcCameraStatusBadge" style="background: #F1F5F9; color: #475569; font-size: 0.72rem; font-weight: 700;">
              Standby
            </span>
          </div>

          <!-- Video Camera Viewport -->
          <div id="rpcCameraContainer" style="position: relative; width: 100%; min-height: 270px; background: #0F172A; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; border: 2px dashed #CBD5E1;">
            <video id="rpcVideoElem" playsinline style="width: 100%; height: 100%; object-fit: cover; display: none;"></video>
            <canvas id="rpcCanvasElem" style="display: none;"></canvas>

            <!-- Crosshair Overlay Scan Guide -->
            <div id="rpcScanCrosshair" style="display: none; position: absolute; width: 180px; height: 180px; border: 3px solid #22C55E; border-radius: 16px; box-shadow: 0 0 0 9999px rgba(0,0,0,0.5); pointer-events: none; z-index: 10;">
              <div style="position: absolute; top: -28px; width: 100%; text-align: center; color: #22C55E; font-size: 0.72rem; font-weight: 700; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
                ARAHKAN KE QR CODE
              </div>
            </div>

            <!-- Placeholder saat kamera belum dinyalakan -->
            <div id="rpcCameraPlaceholder" style="text-align: center; padding: 24px; color: #94A3B8;">
              <i class="fa-solid fa-qrcode" style="font-size: 3.5rem; margin-bottom: 12px; color: #64748B; display: block;"></i>
              <strong style="color: #F8FAFC; display: block; font-size: 0.95rem; margin-bottom: 4px;">Kamera Siap Digunakan</strong>
              <span style="font-size: 0.78rem; color: #94A3B8;">Pilih salah satu mode di bawah: Live Video Scanner atau Foto Kamera HP.</span>
            </div>
          </div>

          <!-- Native Mobile Camera Input: Direct Camera Access on any Smartphone -->
          <input type="file" id="rpcNativeCameraInput" accept="image/*" capture="environment" style="display: none;">

          <!-- Camera Buttons -->
          <div class="rpc-camera-actions" style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary btn-glow" id="btnStartRpcCamera" style="flex: 1; min-width: 150px; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <i class="fa-solid fa-video"></i> Live Scanner
            </button>
            <button type="button" class="btn btn-secondary" id="btnTriggerNativeCamera" style="flex: 1; min-width: 150px; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <i class="fa-solid fa-camera"></i> Foto E-Tiket
            </button>
            <button type="button" class="btn btn-outline btn-sm" id="btnStopRpcCamera" style="display: none; color: #EF4444; border-color: #FECACA;">
              <i class="fa-solid fa-video-slash"></i> Matikan
            </button>
          </div>
        </div>

        <!-- Manual Search Box -->
        <div class="glass-card" style="padding: 20px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
          <h4 style="margin: 0 0 10px 0; font-size: 0.95rem; color: #0F172A; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-keyboard" style="color: #64748B;"></i>
            Pencarian Manual (Jika QR Tidak Terbaca)
          </h4>
          <p style="font-size: 0.78rem; color: #64748B; margin: 0 0 14px 0;">
            Masukkan Nomor BIB, Order ID, Invoice, NIK 16 digit, atau Nama lengkap pelari:
          </p>

          <form id="formRpcManualSearch" class="rpc-manual-search-form" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <input type="text" class="form-input" id="rpcSearchInput" placeholder="Contoh: 05-0012, ORDER-..., atau NIK" style="flex: 1; min-width: 180px; font-weight: 700;">
            <button type="submit" class="btn btn-secondary" id="btnRpcSearchSubmit" aria-label="Cari peserta">
              <i class="fa-solid fa-magnifying-glass"></i><span> Cari</span>
            </button>
          </form>
        </div>
      </div>

      <!-- RIGHT COLUMN: VERIFICATION DETAILS & RACEPACK CHECKLIST -->
      <div>
        <div class="glass-card" id="rpcVerificationContainer" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); min-height: 480px;">
          
          <!-- State 1: Belum Ada Data yang Di-scan -->
          <div id="rpcEmptyState" style="text-align: center; padding: 60px 20px; color: #94A3B8;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: #F1F5F9; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; color: #64748B; font-size: 2rem;">
              <i class="fa-solid fa-shirt"></i>
            </div>
            <h4 style="color: #0F172A; font-size: 1.15rem; margin: 0 0 6px 0;">Menunggu Scan E-Tiket Peserta</h4>
            <p style="font-size: 0.85rem; color: #64748B; max-width: 380px; margin: 0 auto 20px auto;">
              Arahkan kamera ke QR Code E-Tiket pelari atau ketikkan nomor BIB/Order ID pada kolom pencarian di sebelah kiri.
            </p>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: #FFF7ED; border: 1px solid #FED7AA; padding: 8px 16px; border-radius: 20px; font-size: 0.78rem; color: #9A3412;">
              <i class="fa-solid fa-triangle-exclamation"></i> Pastikan status pembayaran telah LUNAS sebelum menyerahkan racepack.
            </div>
          </div>

          <!-- State 2A: Tampilan QR Master (Banyak Peserta dalam 1 Order) -->
          <div id="rpcMasterState" style="display: none;"></div>

          <!-- State 2: Data Terverifikasi (Tampil setelah Scan / Search) -->
          <div id="rpcDetailsState" style="display: none;">
            <!-- Status Pembayaran Banner -->
            <div id="rpcPaymentBanner" style="padding: 14px 18px; border-radius: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span id="rpcPaymentIcon" style="font-size: 1.5rem;"></span>
                <div>
                  <div style="font-weight: 800; font-size: 0.95rem;" id="rpcPaymentTitle">MEMERIKSA PEMBAYARAN</div>
                  <div style="font-size: 0.76rem;" id="rpcPaymentSub">Status Midtrans</div>
                </div>
              </div>
              <span class="badge" id="rpcPaymentBadge" style="font-weight: 800; font-size: 0.76rem; padding: 6px 12px;"></span>
            </div>

            <!-- Participant Identity Profile -->
            <div style="border-bottom: 1px solid #E2E8F0; padding-bottom: 18px; margin-bottom: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                <div>
                  <span class="badge" style="background: #EFF6FF; color: #1D4ED8; font-weight: 800; font-size: 0.74rem; margin-bottom: 6px;" id="rpcEventCategory">Kategori 10K</span>
                  <h3 style="font-size: 1.4rem; font-weight: 800; color: #0F172A; margin: 0 0 4px 0;" id="rpcFullName">NAMA LENGKAP</h3>
                  <div style="font-size: 0.8rem; color: #64748B;">
                    NIK: <code id="rpcNik" style="font-weight: 700; color: #334155;">3328...</code> • Gender: <strong id="rpcGender">LAKI-LAKI</strong> • Gol. Darah: <strong id="rpcBloodType">O</strong>
                  </div>
                </div>
                <!-- Nomor BIB Display Besar -->
                <div style="background: linear-gradient(135deg, #0F172A 0%, #334155 100%); color: #FFFFFF; padding: 10px 18px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(15,23,42,0.15);">
                  <div style="font-size: 0.68rem; color: #94A3B8; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">NOMOR BIB</div>
                  <div style="font-size: 1.6rem; font-weight: 900; letter-spacing: 1px; color: #38BDF8;" id="rpcBibNumber">----</div>
                  <div style="font-size: 0.7rem; color: #E2E8F0;" id="rpcBibName">NAMA DADA</div>
                </div>
              </div>

              <!-- Kontak Darurat & Order ID -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.78rem; background: #F8FAFC; padding: 10px 14px; border-radius: 8px;">
                <div>
                  <span style="color: #64748B;">No. HP Peserta:</span> <strong id="rpcPhone">-</strong>
                </div>
                <div>
                  <span style="color: #64748B;">Kontak Darurat:</span> <strong id="rpcEmergency">-</strong>
                </div>
                <div style="grid-column: span 2;">
                  <span style="color: #64748B;">Order ID / Invoice:</span> <code id="rpcOrderId" style="font-size: 0.76rem;">-</code>
                </div>
              </div>
            </div>

            <!-- Jersey & Perlengkapan Checklist Box -->
            <div style="margin-bottom: 22px;">
              <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin: 0 0 12px 0; display: flex; align-items: center; justify-content: space-between;">
                <span><i class="fa-solid fa-list-check" style="color: var(--color-primary);"></i> Checklist Perlengkapan Racepack:</span>
                <span class="badge" style="background: #F1F5F9; color: #0F172A; font-size: 0.76rem;" id="rpcJerseyBadge">Size: M</span>
              </h4>

              <div style="display: flex; flex-direction: column; gap: 10px;" id="rpcChecklistGroup">
                <!-- Checklist 1: BIB -->
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">
                  <input type="checkbox" id="chkItemBib" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                  <div>
                    <strong style="font-size: 0.88rem; color: #0F172A;">Nomor Dada Lomba (BIB)</strong>
                    <div style="font-size: 0.74rem; color: #64748B;">Sesuai nomor yang tertera di layar (<span id="chkBibText">--</span>)</div>
                  </div>
                </label>

                <!-- Checklist 2: Jersey -->
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">
                  <input type="checkbox" id="chkItemJersey" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                  <div>
                    <strong style="font-size: 0.88rem; color: #0F172A;">Jersey Resmi Tegal Run 2026</strong>
                    <div style="font-size: 0.74rem; color: #64748B;">Ukuran: <strong id="chkJerseySizeText" style="color: var(--color-primary);">M</strong> • Tipe: <span id="chkJerseyTypeText">Dry-Fit Official</span></div>
                  </div>
                </label>

                <!-- Checklist 3: Timing Chip -->
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">
                  <input type="checkbox" id="chkItemChip" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                  <div>
                    <strong style="font-size: 0.88rem; color: #0F172A;">Timing Chip PASI</strong>
                    <div style="font-size: 0.74rem; color: #64748B;">Chip pencatat waktu di balik BIB untuk validasi finish</div>
                  </div>
                </label>

                <!-- Checklist 4: Goodie Bag & Panduan -->
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">
                  <input type="checkbox" id="chkItemBag" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                  <div>
                    <strong style="font-size: 0.88rem; color: #0F172A;">Drawstring Bag &amp; Race Guide</strong>
                    <div style="font-size: 0.74rem; color: #64748B;">Tas serut lomba, nomor penitipan bag drop, buku panduan race</div>
                  </div>
                </label>

                <!-- Checklist 5: Suplemen & Refreshment -->
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">
                  <input type="checkbox" id="chkItemRefreshment" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                  <div>
                    <strong style="font-size: 0.88rem; color: #0F172A;">Suplemen &amp; Produk Sponsor</strong>
                    <div style="font-size: 0.74rem; color: #64748B;">Minuman isotonik, gel energi, dan voucher mitra lomba</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Existing Checkin Status (Jika Sudah Check-in) -->
            <div id="rpcAlreadyCheckedInBox" style="display: none; padding: 14px 18px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; margin-bottom: 18px;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                <div>
                  <div style="font-weight: 800; font-size: 0.92rem; color: #166534; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-circle-check"></i> RACEPACK SUDAH DISERAHKAN
                  </div>
                  <div style="font-size: 0.76rem; color: #15803D; margin-top: 2px;" id="rpcCheckinTimestampText">
                    Diserahkan pada: -
                  </div>
                </div>
                <button type="button" class="btn btn-outline btn-sm" id="btnRevertRpcCheckin" style="color: #DC2626; border-color: #FECACA; font-size: 0.74rem;">
                  <i class="fa-solid fa-rotate-left"></i> Batalkan Check-in (Revert)
                </button>
              </div>
            </div>

            <!-- Action Confirm Button -->
            <div id="rpcActionBtnWrapper">
              <button type="button" class="btn btn-primary btn-glow" id="btnConfirmRpcCheckin" style="width: 100%; font-size: 1.05rem; padding: 14px 20px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px;">
                <i class="fa-solid fa-box-check" style="font-size: 1.25rem;"></i>
                Konfirmasi &amp; Serahkan Racepack Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`,re=`<div class="admin-tab-pane" id="pane-racepack-confirm">\r
  <div class="admin-section racepack-confirm-section">\r
    <div class="admin-section-header">\r
      <div class="racepack-confirm-heading">\r
        <h3>Konfirmasi Check-in Racepack</h3>\r
        <p>Antrean peserta lunas yang Anda kirim. Konfirmasikan setelah racepack diserahkan.</p>\r
      </div>\r
      <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshRacepackConfirmations" aria-label="Muat ulang daftar peserta">\r
        <i class="fa-solid fa-rotate"></i> Muat ulang\r
      </button>\r
    </div>\r
    <p id="racepackConfirmationsSummary" class="racepack-confirm-summary" aria-live="polite"></p>\r
    <div class="table-responsive">\r
      <table class="admin-table racepack-confirm-table">\r
        <thead>\r
          <tr>\r
            <th>Nama Peserta</th>\r
            <th>Nomor BIB</th>\r
            <th>Status</th>\r
            <th>Aksi</th>\r
          </tr>\r
        </thead>\r
        <tbody id="racepackConfirmationsTable">\r
          <tr><td colspan="4" class="text-center">Memuat daftar peserta...</td></tr>\r
        </tbody>\r
      </table>\r
    </div>\r
  </div>\r
</div>\r
`,de=`<div class="admin-tab-pane" id="pane-racepack-view">\r
  <div class="admin-section racepack-live-section">\r
    <div class="admin-section-header racepack-live-header">\r
      <div>\r
        <h3><i class="fa-solid fa-list-check" style="color:var(--color-primary);"></i> Antrean Pengambilan Racepack</h3>\r
        <p>Pantau antrean peserta secara real-time. Verifikasi dan konfirmasi check-in dilakukan di halaman Pengambilan Racepack &amp; Check-in.</p>\r
        <small id="racepackQueueLastUpdated" class="racepack-live-updated">Menunggu pembaruan...</small>\r
      </div>\r
      <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshRacepackQueue">\r
        <i class="fa-solid fa-rotate"></i> Segarkan\r
      </button>\r
      <a class="btn btn-primary btn-sm" href="/racepack-live.html" target="_blank" rel="noopener noreferrer">\r
        <i class="fa-solid fa-up-right-from-square"></i> Buka Live View\r
      </a>\r
    </div>\r
    <div id="racepackQueueContainer" class="racepack-live-grid">\r
      <div class="racepack-live-empty">Memuat antrean peserta...</div>\r
    </div>\r
  </div>\r
</div>\r
`,ce=`<div class="admin-tab-pane" id="pane-orders">
          <div class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-receipt" style="color: var(--color-primary);"></i> Transaksi & Pesanan Tiket</h3>
                <p>Verifikasi status pembayaran (Midtrans Payment Gateway) dan manajemen order manual.</p>
              </div>
              <div class="admin-action-bar">
                <select class="form-input form-input-sm" id="filterOrderStatus" style="width: 170px;">
                  <option value="">Semua Status</option>
                  <option value="SETTLEMENT">SETTLEMENT (Lunas)</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CANCEL">CANCEL (Batal)</option>
                  <option value="EXPIRE">EXPIRE (expired time)</option>
                  <option value="REFUND">REFUND</option>
                </select>
                <input type="text" class="form-input form-input-sm" id="searchOrder" placeholder="Cari Order ID / Nama..." style="width: 200px;">
                <button class="btn btn-secondary btn-sm" id="btnRefreshOrders">
                  <i class="fa-solid fa-rotate"></i> Segarkan
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Order ID / Invoice</th>
                    <th>Tipe Pendaftaran</th>
                    <th>Pemesan</th>
                    <th>Email & Telepon</th>
                    <th>Jumlah Peserta</th>
                    <th>Total Nominal</th>
                    <th>Status Pembayaran</th>
                    <th>Tanggal Transaksi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody id="adminOrdersTableBody">
                  <tr>
                    <td colspan="10" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
                      Memuat data transaksi...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>`,pe=`<div class="admin-tab-pane" id="pane-countdown">
          <div class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-stopwatch-20" style="color: var(--color-primary);"></i> Pengaturan Tanggal Event & Status Pendaftaran</h3>
                <p>Tersimpan langsung di database backend untuk mengontrol countdown landing page dan status penutupan.</p>
              </div>
              <span class="event-status-tag open" id="globalStatusBadge" style="font-size: 0.82rem; padding: 6px 14px;">
                <i class="fa-solid fa-signal"></i> Pendaftaran Aktif
              </span>
            </div>

            <div class="countdown-settings-layout">
              <div class="form-group countdown-date-field" style="margin-bottom: 0;">
                <label class="form-label">
                  <i class="fa-solid fa-calendar-days" style="color: var(--color-primary);"></i> Tanggal & Waktu Race Day (Target Hitung Mundur)
                </label>
                <input type="datetime-local" class="form-input" id="globalCountdownInput">
                <div class="form-hint">Waktu mengikuti zona waktu perangkat Anda (WIB untuk perangkat Indonesia).</div>
              </div>

              <div class="countdown-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="btnResetGlobalCountdown" data-permission="countdown:manage" title="Kosongkan tanggal countdown">
                  <i class="fa-solid fa-rotate-left"></i> Reset Tanggal
                </button>
                <button type="button" class="btn btn-outline btn-sm" id="btnToggleGlobalClosed" data-permission="countdown:manage">
                  <i class="fa-solid fa-lock"></i> Tutup Seluruh Pendaftaran
                </button>
                <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnSaveGlobalCountdown" data-permission="countdown:manage">
                  <i class="fa-solid fa-floppy-disk"></i> Simpan Tanggal Countdown
                </button>
              </div>
            </div>

            <!-- Preview Status Live Countdown -->
            <div class="countdown-live-preview">
              <div class="countdown-live-preview-label">
                <i class="fa-solid fa-eye" style="color: var(--color-primary); margin-right: 6px;"></i> Live Status Landing Page
              </div>
              <div id="adminCountdownLivePreview">
                Memuat status countdown...
              </div>
            </div>
          </div>

          <div class="admin-section" style="margin-top: 24px;">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-bullhorn" style="color: var(--color-primary);"></i> Informasi Pendaftaran Ditutup</h3>
                <p>Atur pesan dan jam operasional yang ditampilkan kepada calon peserta saat pendaftaran ditutup.</p>
              </div>
            </div>
            <div class="countdown-settings-layout">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="registrationClosedMessage">Pesan penutupan pendaftaran</label>
                <input class="form-input" id="registrationClosedMessage" maxlength="300" placeholder="Pendaftaran sedang ditutup sementara.">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="registrationOperatingHours">Jam operasional pendaftaran</label>
                <input class="form-input" id="registrationOperatingHours" maxlength="120" placeholder="Contoh: Senin–Jumat, 09.00–17.00 WIB">
                <div class="form-hint">Isi sesuai jadwal resmi. Informasi ini tampil pada halaman publik saat pendaftaran ditutup.</div>
              </div>
            </div>
            <div class="countdown-actions" style="margin-top: 18px;">
              <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnSaveWebsiteStatus" data-permission="countdown:manage">
                <i class="fa-solid fa-floppy-disk"></i> Simpan Informasi Pendaftaran
              </button>
            </div>
          </div>

          <div class="admin-section" style="margin-top: 24px;">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-screwdriver-wrench" style="color: var(--color-primary);"></i> Halaman Under Maintenance</h3>
                <p>Jika diaktifkan, halaman utama akan menampilkan informasi maintenance dan pendaftaran akan diblokir sementara.</p>
              </div>
              <label class="maintenance-toggle" for="maintenanceEnabled">
                <input type="checkbox" id="maintenanceEnabled" role="switch" aria-label="Aktifkan mode maintenance">
                <span class="maintenance-toggle-track" aria-hidden="true"><span></span></span>
                <span class="maintenance-toggle-label">Aktifkan maintenance</span>
              </label>
            </div>
            <div class="countdown-settings-layout">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="maintenanceType">Jenis maintenance</label>
                <select class="form-input" id="maintenanceType">
                  <option value="REPAIR">Perbaikan sistem</option>
                  <option value="ROUTINE">Perawatan rutin</option>
                  <option value="UPDATE">Pembaruan sistem</option>
                  <option value="OTHER">Lainnya</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="maintenanceTitle">Judul halaman</label>
                <input class="form-input" id="maintenanceTitle" maxlength="120" placeholder="Website sedang dalam pemeliharaan">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="maintenanceMessage">Keterangan untuk pengunjung</label>
                <textarea class="form-input" id="maintenanceMessage" maxlength="1000" rows="4" placeholder="Kami sedang melakukan perawatan agar layanan lebih baik. Silakan kembali beberapa saat lagi."></textarea>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="maintenanceExpectedEnd">Perkiraan selesai (opsional)</label>
                <input type="datetime-local" class="form-input" id="maintenanceExpectedEnd">
                <div class="form-hint">Masukkan waktu dalam WIB. Perkiraan ini ditampilkan kepada pengunjung.</div>
              </div>
            </div>
          </div>
          </div>`,me=`<div class="admin-tab-pane" id="pane-bib-settings">
  <div class="admin-section">
    <div class="admin-section-header" style="flex-wrap: wrap; gap: 14px;">
      <div>
        <h3 style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-id-badge" style="color: #6366F1;"></i>
          Pengaturan Nomor BIB, Format QR &amp; Petunjuk E-Tiket
        </h3>
        <p>Tentukan kapan dan bagaimana nomor BIB digenerate, atur awalan QR Code dengan token acak 10 digit, serta kelola teks petunjuk E-Tiket secara terpusat.</p>
      </div>
      <div class="admin-action-bar">
        <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshBibSettings">
          <i class="fa-solid fa-rotate"></i> Segarkan Pengaturan
        </button>
      </div>
    </div>

    <!-- KPI Summary Grid -->
    <div class="admin-kpi-grid" style="margin-bottom: 24px;">
      <div class="kpi-card" style="border: 1px solid #C7D2FE; background: #EEF2FF;">
        <div class="kpi-icon blue" style="background: #4F46E5; color: #FFFFFF;"><i class="fa-solid fa-id-card"></i></div>
        <div class="kpi-details">
          <span class="kpi-label" style="color: #3730A3; font-weight: 700;">TOTAL BIB SUDAH DITERBITKAN</span>
          <h3 class="kpi-val" id="kpiBibAssigned" style="color: #312E81;">0</h3>
          <span class="kpi-sub" style="color: #4338CA;">Peserta telah memegang nomor dada resmi</span>
        </div>
      </div>

      <div class="kpi-card" style="border: 1px solid #FED7AA; background: #FFF7ED;">
        <div class="kpi-icon orange" style="background: #EA580C; color: #FFFFFF;"><i class="fa-solid fa-clock-rotate-left"></i></div>
        <div class="kpi-details">
          <span class="kpi-label" style="color: #9A3412; font-weight: 700;">BELUM MEMILIKI BIB (LUNAS)</span>
          <h3 class="kpi-val" id="kpiBibUnassigned" style="color: #C2410C;">0</h3>
          <span class="kpi-sub" style="color: #9A3412;">Menunggu generate otomatis / manual</span>
        </div>
      </div>

      <div class="kpi-card" style="border: 1px solid #E2E8F0; background: #FFFFFF;">
        <div class="kpi-icon green" style="background: #10B981; color: #FFFFFF;"><i class="fa-solid fa-qrcode"></i></div>
        <div class="kpi-details">
          <span class="kpi-label">Format Aktif QR Code</span>
          <h3 class="kpi-val" id="kpiQrFormatPreview" style="font-size: 1.15rem; font-family: monospace; color: #0F172A;">TEGALRUN|##########</h3>
          <span class="kpi-sub" style="color: #059669;"><i class="fa-solid fa-shield-halved"></i> Token acak unik tersimpan di server</span>
        </div>
      </div>
    </div>

    <!-- Main Settings Layout (2 Columns) -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 24px; align-items: start;">
      
      <!-- COLUMN 1: PENGATURAN OTOMATISASI & FORMAT NOMOR BIB -->
      <div class="glass-card" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
        <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-gears" style="color: #6366F1;"></i>
          Aturan Generate Nomor BIB
        </h4>
        <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 20px;">
          Tentukan waktu generate nomor BIB peserta dan atur pola format penomoran sesuai regulasi lomba.
        </p>

        <form id="formBibGenerationSettings">
          <!-- Timing Selection -->
          <div class="form-group" style="margin-bottom: 18px;">
            <label class="form-label" style="font-weight: 700; color: #0F172A;">
              Kapan Nomor BIB Diterbitkan? <span style="color: #EF4444;">*</span>
            </label>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 6px;">
              <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1px solid #E2E8F0; border-radius: 10px; cursor: pointer; transition: all 0.2s ease;">
                <input type="radio" name="bibTiming" value="PAYMENT_SUCCESS" checked style="margin-top: 3px;">
                <div>
                  <strong style="display: block; font-size: 0.88rem; color: #0F172A;">Otomatis Saat Pembayaran Lunas (Recommended)</strong>
                  <span style="font-size: 0.78rem; color: #64748B;">Nomor BIB langsung diterbitkan begitu status pesanan di Midtrans menjadi SETTLEMENT / CAPTURE.</span>
                </div>
              </label>

              <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1px solid #E2E8F0; border-radius: 10px; cursor: pointer; transition: all 0.2s ease;">
                <input type="radio" name="bibTiming" value="RACEPACK_CHECKIN" style="margin-top: 3px;">
                <div>
                  <strong style="display: block; font-size: 0.88rem; color: #0F172A;">Otomatis Saat Pengambilan Racepack (RPC Check-in)</strong>
                  <span style="font-size: 0.78rem; color: #64748B;">Nomor BIB baru digenerate saat panitia memindai E-Tiket dan menyerahkan fisik racepack di booth.</span>
                </div>
              </label>

              <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1px solid #E2E8F0; border-radius: 10px; cursor: pointer; transition: all 0.2s ease;">
                <input type="radio" name="bibTiming" value="MANUAL" style="margin-top: 3px;">
                <div>
                  <strong style="display: block; font-size: 0.88rem; color: #0F172A;">Manual Dari Sistem Admin Saja</strong>
                  <span style="font-size: 0.78rem; color: #64748B;">Sistem tidak mengenerate otomatis. Admin menetapkan via tombol "Generate Massal" atau input per peserta.</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Format Rules -->
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <span style="font-size: 0.76rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">
              Pola Format Penomoran BIB Global:
            </span>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 12px;">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.78rem;">Prefix / Awalan</label>
                <input type="text" class="form-input" id="bibInputPrefix" placeholder="10-" value="10-" style="font-family: monospace;">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.78rem;">Panjang Digit Angka</label>
                <input type="number" class="form-input" id="bibInputDigitLength" min="2" max="6" value="4">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 12px;">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.78rem;">Nomor Mulai (Start)</label>
                <input type="number" class="form-input" id="bibInputStartNumber" min="1" value="1001">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.78rem;">Suffix / Akhiran (Opsional)</label>
                <input type="text" class="form-input" id="bibInputSuffix" placeholder="-2026" style="font-family: monospace;">
              </div>
            </div>

            <!-- Live Preview -->
            <div style="background: #FFFFFF; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.75rem; color: #64748B; font-weight: 600;">Contoh Hasil Nomor BIB:</span>
              <strong id="bibFormatPreviewText" style="font-family: monospace; font-size: 1.15rem; color: #FF6B00; font-weight: 800;">10-1001</strong>
            </div>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button type="submit" class="btn btn-primary" id="btnSaveBibSettings" data-permission="bib:manage" style="flex: 1;">
              <i class="fa-solid fa-floppy-disk"></i> Simpan Pengaturan BIB
            </button>
            <button type="button" class="btn btn-secondary" id="btnTriggerBulkGenerate" data-permission="bib:manage" style="flex: 1; border-color: #C7D2FE; color: #4338CA;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Massal Sekarang
            </button>
          </div>
        </form>
      </div>

      <!-- COLUMN 2: FORMAT QR CODE & TEKS PETUNJUK E-TIKET -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        
        <!-- CARD 2A: PENGATURAN AWALAN (PREFIX) QR CODE -->
        <div class="glass-card" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-qrcode" style="color: #10B981;"></i>
            Pengaturan Awalan (Prefix) &amp; Token QR Code
          </h4>
          <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 16px;">
            Ganti awalan QR Code dengan nama bebas. QR baru memakai format <code>PREFIX|10_digit_acak</code>. Token dipetakan di server dan dipindai melalui akun petugas yang berizin.
          </p>

          <form id="formQrPrefixSettings">
            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label" style="font-weight: 700; color: #0F172A;">
                Awalan (Prefix) Nama QR Code <span style="color: #EF4444;">*</span>
              </label>
              <div style="display: flex; gap: 10px;">
                <input type="text" class="form-input" id="qrInputPrefix" placeholder="TEGALRUN" value="TEGALRUN" required style="font-family: monospace; text-transform: uppercase; font-weight: 700;">
                <button type="submit" class="btn btn-primary" id="btnSaveQrPrefix" data-permission="bib:manage">
                  <i class="fa-solid fa-check"></i> Simpan
                </button>
              </div>
              <small style="color: #64748B; font-size: 0.74rem; display: block; margin-top: 5px;">
                Contoh: <code>TEGALRUN</code>, <code>TR2026</code>, <code>TEGALBAHARI</code>, dll.
              </small>
            </div>

            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 12px 14px; font-size: 0.8rem; color: #166534;">
              <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; margin-bottom: 4px;">
                <i class="fa-solid fa-shield-check"></i> Keamanan Enkripsi Kriptografi Aktif
              </div>
              <div>Format baru: <code><span id="qrPrefixExample">TEGALRUN</span>|1234567890</code>. Setiap token acak 10 digit unik dan diverifikasi terhadap data tiket di server. QR terenkripsi lama tetap dapat dipindai.</div>
            </div>
          </form>
        </div>

        <!-- CARD 2B: PENGATURAN TEKS PETUNJUK PENGAMBILAN RACEPACK & RACE DAY -->
        <div class="glass-card" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-list-check" style="color: var(--color-primary);"></i>
            Petunjuk Pengambilan Racepack &amp; Race Day
          </h4>
          <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 16px;">
            Sesuaikan teks petunjuk yang tampil pada bagian bawah E-Tiket peserta. Masukkan 1 poin per baris.
          </p>

          <form id="formRacepackInstructions">
            <div class="form-group" style="margin-bottom: 12px;">
              <label class="form-label" style="font-weight: 700; color: #0F172A;">Judul Petunjuk</label>
              <input type="text" class="form-input" id="rpcInstructionsTitle" value="Petunjuk Pengambilan Racepack &amp; Race Day:">
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" style="font-weight: 700; color: #0F172A;">Poin-Poin Petunjuk (1 baris per poin)</label>
              <textarea class="form-input" id="rpcInstructionsTextarea" rows="5" style="resize: vertical; font-size: 0.85rem; line-height: 1.6;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" id="btnSaveRpcInstructions" data-permission="bib:manage" style="width: 100%;">
              <i class="fa-solid fa-floppy-disk"></i> Simpan Petunjuk E-Tiket
            </button>
          </form>
        </div>

        <!-- CARD 2C: PENGATURAN BIAYA LAYANAN & TIMER PEMBAYARAN -->
        <div class="glass-card" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); margin-top: 24px;">
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-stopwatch-20" style="color: #EA580C;"></i>
            Batas Waktu Pembayaran &amp; Biaya Layanan
          </h4>
          <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 16px;">
            Atur countdown timer pembayaran untuk Midtrans serta konfigurasikan biaya layanan transaksi.
          </p>

          <form id="formPaymentFeeSettings">
            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label" style="font-weight: 700; color: #0F172A;">
                Batas Waktu Pembayaran (Menit) <span style="color: #EF4444;">*</span>
              </label>
              <input type="number" min="5" max="1440" class="form-input" id="settingPaymentTimerMinutes" value="30" required>
              <small style="color: #64748B; font-size: 0.74rem; display: block; margin-top: 4px;">
                Waktu yang diberikan kepada peserta untuk menyelesaikan pembayaran Midtrans (contoh: 15, 30, atau 60 menit).
              </small>
            </div>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <label style="font-weight: 700; font-size: 0.88rem; color: #0F172A; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" id="settingFeeEnabled">
                  <span>Aktifkan Biaya Layanan</span>
                </label>
                <span class="badge" id="badgeFeeStatus" style="background: #E2E8F0; color: #475569;">Nonaktif</span>
              </div>

              <div id="groupFeeConfig" style="display: none;">
                <div class="form-group" style="margin-bottom: 10px;">
                  <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">Metode Penerapan Biaya:</label>
                  <select class="form-select" id="settingFeeType">
                    <option value="PER_TRANSACTION">Per Transaksi (Dibebankan 1x per checkout)</option>
                    <option value="PER_TICKET">Per Tiket (Dikalikan dengan jumlah peserta)</option>
                  </select>
                </div>

                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">Nominal Biaya Layanan (Rp):</label>
                  <input type="number" min="0" step="500" class="form-input" id="settingFeeAmount" placeholder="5000" value="5000">
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" id="btnSavePaymentFeeSettings" data-permission="bib:manage" style="width: 100%;">
              <i class="fa-solid fa-floppy-disk"></i> Simpan Pengaturan Pembayaran
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</div>
`,ue=`<div class="admin-tab-pane" id="pane-cms">
          <form id="formCmsSettings">
    <div class="cms-submit-actions cms-submit-actions-top">
      <span class="cms-save-context"><i class="fa-solid fa-cloud-arrow-up"></i> Perubahan akan diterapkan setelah disimpan</span>
      <div class="cms-save-buttons">
        <a href="/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          <span>Buka Website</span>
        </a>
        <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveCmsSubmit" data-permission="cms:manage">
          <i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </div>
    <section class="cms-quick-actions" aria-labelledby="cmsQuickActionsTitle">
      <div class="cms-quick-actions-heading">
        <div>
          <span class="cms-quick-actions-eyebrow"><i class="fa-solid fa-wand-magic-sparkles"></i> PENGATURAN CEPAT</span>
          <h3 id="cmsQuickActionsTitle">Tampilan Website</h3>
          <p>Atur section yang terlihat tanpa mencari pengaturan satu per satu.</p>
        </div>
        <div class="cms-quick-actions-buttons">
          <button type="button" class="btn btn-secondary btn-sm" id="btnEnableAllCmsSections">
            <i class="fa-solid fa-eye"></i><span>Nyalakan semua</span>
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="btnDisableAllCmsSections">
            <i class="fa-solid fa-eye-slash"></i><span>Matikan semua</span>
          </button>
        </div>
      </div>
      <div class="cms-quick-toggle-grid">
        <label class="cms-quick-toggle"><span class="cms-quick-toggle-icon"><i class="fa-solid fa-panorama"></i></span><span class="cms-quick-toggle-label">Hero</span><input type="checkbox" id="cmsShowHero" checked><span class="cms-toggle-switch" aria-hidden="true"></span></label>
        <label class="cms-quick-toggle"><span class="cms-quick-toggle-icon"><i class="fa-solid fa-chart-line"></i></span><span class="cms-quick-toggle-label">Statistik</span><input type="checkbox" id="cmsShowStats" checked><span class="cms-toggle-switch" aria-hidden="true"></span></label>
        <label class="cms-quick-toggle"><span class="cms-quick-toggle-icon"><i class="fa-solid fa-route"></i></span><span class="cms-quick-toggle-label">Rute</span><input type="checkbox" id="cmsShowRoute" checked><span class="cms-toggle-switch" aria-hidden="true"></span></label>
        <label class="cms-quick-toggle"><span class="cms-quick-toggle-icon"><i class="fa-solid fa-gift"></i></span><span class="cms-quick-toggle-label">Fasilitas</span><input type="checkbox" id="cmsShowFacilities" checked><span class="cms-toggle-switch" aria-hidden="true"></span></label>
        <label class="cms-quick-toggle"><span class="cms-quick-toggle-icon"><i class="fa-solid fa-ticket"></i></span><span class="cms-quick-toggle-label">Kategori tiket</span><input type="checkbox" id="cmsShowTickets" checked><span class="cms-toggle-switch" aria-hidden="true"></span></label>
        <label class="cms-quick-toggle"><span class="cms-quick-toggle-icon"><i class="fa-solid fa-shield-halved"></i></span><span class="cms-quick-toggle-label">Legalitas</span><input type="checkbox" id="cmsShowLegal" checked><span class="cms-toggle-switch" aria-hidden="true"></span></label>
        <label class="cms-quick-toggle"><span class="cms-quick-toggle-icon"><i class="fa-solid fa-circle-question"></i></span><span class="cms-quick-toggle-label">FAQ</span><input type="checkbox" id="cmsShowFaq" checked><span class="cms-toggle-switch" aria-hidden="true"></span></label>
        <label class="cms-quick-toggle"><span class="cms-quick-toggle-icon"><i class="fa-solid fa-shoe-prints"></i></span><span class="cms-quick-toggle-label">Footer</span><input type="checkbox" id="cmsShowFooter" checked><span class="cms-toggle-switch" aria-hidden="true"></span></label>
      </div>
    </section>
    <!-- 1. Identitas & Hero Section -->
            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-heading" style="color: var(--color-primary);"></i> Identitas Website & Banner Hero Utama</h3>
                  <p>Atur judul website, slogan, teks hero banner, dan gambar latar depan.</p>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Judul Website (Title Browser Tab)</label>
                  <input type="text" class="form-input" id="cmsSiteTitle" placeholder="Tegal Run 2026 - Official Half Marathon">
                </div>
                <div class="form-group">
                  <label class="form-label">Tagline Slogan</label>
                  <input type="text" class="form-input" id="cmsSiteTagline" placeholder="Lari Bersama Menembus Batas di Kota Bahari">
                </div>
              </div>

              <div class="cms-branding-panel">
                <div class="cms-branding-heading">
                  <span class="cms-branding-symbol"><i class="fa-solid fa-swatchbook"></i></span>
                  <div>
                    <h4>Branding Navbar</h4>
                    <p>Atur nama dan identitas visual yang tampil di navbar website.</p>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="cmsNavbarTitle">Judul / Nama yang Tampil di Navbar</label>
                  <input type="text" class="form-input" id="cmsNavbarTitle" maxlength="80" placeholder="TEGAL RUN 2026">
                  <div class="form-hint">Nama navbar bisa berbeda dari judul tab browser.</div>
                </div>

                <fieldset class="cms-mode-fieldset">
                  <legend class="form-label">Tampilan ikon navbar</legend>
                  <div class="cms-mode-options">
                    <label class="cms-mode-option">
                      <input type="radio" name="cmsNavbarIconMode" value="ICON" checked>
                      <span class="cms-mode-card">
                        <i class="fa-solid fa-icons"></i>
                        <span><strong>Pilih ikon</strong><small>Gunakan ikon dari 20 pilihan</small></span>
                      </span>
                    </label>
                    <label class="cms-mode-option">
                      <input type="radio" name="cmsNavbarIconMode" value="IMAGE">
                      <span class="cms-mode-card">
                        <i class="fa-regular fa-image"></i>
                        <span><strong>Link gambar</strong><small>Gunakan logo dari URL gambar</small></span>
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div class="cms-branding-controls">
                  <div class="form-group" id="cmsNavbarIconField">
                    <label class="form-label">Pilih ikon (20 pilihan)</label>
                    <input type="hidden" id="cmsNavbarIcon" value="fa-person-running">
                    <div class="cms-icon-picker-grid" id="cmsNavbarIconPicker" role="group" aria-label="Pilih ikon navbar"></div>
                  </div>
                  <div class="form-group" id="cmsNavbarIconUrlField" hidden>
                    <label class="form-label" for="cmsNavbarIconUrl">URL Gambar Ikon / Logo Navbar</label>
                    <input type="url" class="form-input" id="cmsNavbarIconUrl" placeholder="https://domain.com/logo.png">
                    <div class="form-hint">Masukkan URL gambar yang dapat diakses publik (HTTP atau HTTPS).</div>
                  </div>
                </div>

                <div class="cms-brand-preview" aria-live="polite">
                  <span class="cms-preview-label">Pratinjau navbar</span>
                  <div class="cms-preview-brand">
                    <span class="cms-preview-icon" id="cmsNavbarIconPreview"><i class="fa-solid fa-person-running"></i></span>
                    <strong id="cmsNavbarTitlePreview">TEGAL RUN 2026</strong>
                  </div>
                </div>
              </div>

              <div class="cms-branding-panel cms-favicon-panel">
                <div class="cms-branding-heading">
                  <span class="cms-branding-symbol"><i class="fa-regular fa-window-maximize"></i></span>
                  <div>
                    <h4>Favicon Website</h4>
                    <p>Ikon kecil pada tab browser. Kosongkan URL untuk memakai favicon bawaan.</p>
                  </div>
                </div>
                <div class="cms-favicon-row">
                  <div class="form-group">
                    <label class="form-label" for="cmsFaviconUrl">URL Favicon</label>
                    <input type="url" class="form-input" id="cmsFaviconUrl" placeholder="https://domain.com/favicon.png">
                    <div class="form-hint">Gunakan gambar PNG, SVG, ICO, atau format favicon lain melalui URL HTTP/HTTPS.</div>
                  </div>
                  <div class="cms-favicon-preview-wrap">
                    <span class="cms-preview-label">Pratinjau</span>
                    <span class="cms-favicon-preview"><img id="cmsFaviconPreview" alt="Pratinjau favicon" hidden><i class="fa-solid fa-person-running" id="cmsFaviconFallback"></i></span>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Teks Badge Hero (Pill)</label>
                  <input type="text" class="form-input" id="cmsHeroBadge" placeholder="🔥 PENDAFTARAN RESMI DIBUKA">
                </div>
                <div class="form-group">
                  <label class="form-label">URL Gambar Banner Hero</label>
                  <input type="url" class="form-input" id="cmsHeroBgImage" placeholder="https://images.unsplash.com/...">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Judul Utama Hero (H1)</label>
                <input type="text" class="form-input" id="cmsHeroTitle" placeholder="Tegal Run 2026: Lari Bersama Menembus Batas">
              </div>

              <div class="cms-appearance-panel">
                <h4>Warna &amp; animasi halaman utama</h4>
                <p class="form-hint">Pratinjau mengikuti judul dan warna yang dipilih. Perubahan diterapkan setelah disimpan.</p>
                <div class="cms-palette-builder">
                  <h4>Template warna siap pakai</h4>
                  <p class="form-hint">Pilih template atau sesuaikan tiga warna. Palet lengkap dibuat otomatis dan dapat diedit lagi sebelum disimpan.</p>
                  <label class="cms-palette-select">Template
                    <select id="cmsPalettePreset" class="form-input">
                      <option value="ocean">Ocean Blue</option>
                      <option value="forest">Fresh Forest</option>
                      <option value="sunset">Sunset Energy</option>
                      <option value="violet">Violet Dream</option>
                      <option value="ruby">Ruby Festival</option>
                      <option value="custom">Warna sendiri</option>
                    </select>
                  </label>
                  <div class="cms-palette-seeds">
                    <label>Primer <input id="cmsPalettePrimary" type="color" value="#006fba"></label>
                    <label>Sekunder <input id="cmsPaletteSecondary" type="color" value="#062c65"></label>
                    <label>Tambahan / glow <input id="cmsPaletteAccent" type="color" value="#27c9e8"></label>
                  </div>
                  <div class="cms-theme-preview cms-palette-preview" id="cmsPalettePreview" aria-label="Pratinjau template warna">
                    <div class="cms-theme-preview-nav">RUN FEST <span>Beranda &nbsp; Informasi</span></div>
                    <div class="cms-theme-preview-content">
                      <strong class="cms-theme-preview-accent">AKSEN EVENT</strong>
                      <h5>Judul bagian event</h5>
                      <p>Teks utama dan <span>keterangan event</span></p>
                      <div class="cms-theme-preview-card">
                        <strong>Contoh kartu</strong><p>Detail informasi event</p>
                        <span class="cms-theme-preview-button">Tombol utama</span>
                        <span class="cms-theme-preview-secondary">Tombol sekunder</span>
                        <span class="cms-theme-preview-input">Contoh input</span>
                      </div>
                    </div>
                  </div>
                  <label class="cms-palette-reset-sections"><input type="checkbox" id="cmsPaletteResetSections"> Nonaktifkan warna khusus per bagian saat menerapkan template</label>
                  <p class="form-hint">Jika tidak dicentang, warna khusus per bagian tetap dipertahankan. Nilai tiga warna di atas hanya untuk membuat palet; yang disimpan adalah warna hasilnya.</p>
                  <button type="button" class="btn btn-primary btn-sm" id="btnApplyPalette">Terapkan template ke warna</button>
                </div>
                <h4>Penyesuaian warna lengkap</h4>
                <div class="cms-appearance-colors">
                  <label>Warna aksen <input data-theme-color="theme_primary_color" type="color" value="#ff6b00"></label>
                  <label>Latar halaman <input data-theme-color="theme_background_color" type="color" value="#f8fafc"></label>
                  <label>Latar kartu <input data-theme-color="theme_surface_color" type="color" value="#ffffff"></label>
                  <label>Garis kartu <input data-theme-color="theme_border_color" type="color" value="#e2e8f0"></label>
                  <label>Judul bagian <input data-theme-color="theme_heading_color" type="color" value="#0f172a"></label>
                  <label>Teks utama <input data-theme-color="theme_text_color" type="color" value="#334155"></label>
                  <label>Teks keterangan <input data-theme-color="theme_muted_color" type="color" value="#64748b"></label>
                  <label>Latar navigasi <input data-theme-color="theme_nav_color" type="color" value="#ffffff"></label>
                  <label>Latar tombol utama <input data-theme-color="theme_button_color" type="color" value="#ff6b00"></label>
                  <label>Teks tombol utama <input data-theme-color="theme_button_text_color" type="color" value="#ffffff"></label>
                  <label>Glow tombol &amp; judul <input data-theme-color="theme_glow_color" type="color" value="#006fba"></label>
                  <label>Cahaya latar <input data-theme-color="theme_ambient_color" type="color" value="#b4f0ff"></label>
                  <label>Bayangan kartu <input data-theme-color="theme_shadow_color" type="color" value="#062c65"></label>
                  <label>Latar tombol sekunder <input data-theme-color="theme_secondary_button_color" type="color" value="#ffffff"></label>
                  <label>Teks tombol sekunder <input data-theme-color="theme_secondary_text_color" type="color" value="#062c65"></label>
                  <label>Latar input <input data-theme-color="theme_input_color" type="color" value="#ffffff"></label>
                  <label>Teks input <input data-theme-color="theme_input_text_color" type="color" value="#152238"></label>
                  <label>Teks navigasi <input data-theme-color="theme_nav_text_color" type="color" value="#152238"></label>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="btnResetHomeColors">Kembalikan warna bawaan</button>
                <div class="cms-theme-preview" id="cmsThemePreview" aria-label="Contoh pratinjau warna halaman utama">
                  <div class="cms-theme-preview-nav">RUN FEST <span>Beranda &nbsp; Informasi</span></div>
                  <div class="cms-theme-preview-content">
                    <strong class="cms-theme-preview-accent">AKSEN EVENT</strong>
                    <h5>Judul bagian event</h5>
                    <p>Teks utama dan <span>keterangan event</span></p>
                    <div class="cms-theme-preview-card">
                      <strong>Contoh kartu</strong><p>Detail informasi event</p>
                      <span class="cms-theme-preview-button">Tombol utama</span>
                      <span class="cms-theme-preview-secondary">Tombol sekunder</span>
                      <span class="cms-theme-preview-input">Contoh input</span>
                    </div>
                  </div>
                </div>
                <p class="form-hint">Pratinjau ringkas memperlihatkan warna navigasi, teks, kartu, tombol, glow, dan input. Warna status, gambar, QR, dan beberapa komponen khusus tetap mengikuti desainnya.</p>
                <h4>Warna per bagian halaman utama</h4>
                <p class="form-hint">Aktifkan warna khusus untuk mengatur bagian secara terpisah. Jika tidak aktif, bagian mengikuti palet umum di atas.</p>
                <div id="cmsSectionColors" class="cms-section-colors"></div>
                <fieldset class="cms-animation-options">
                  <legend class="form-label">Template animasi judul</legend>
                  <div class="cms-animation-grid">
                    <label class="cms-animation-choice">
                      <input type="radio" name="cmsHeroAnimation" value="SPEED" checked>
                      <span class="cms-animation-preview" data-animation="SPEED"><span class="cms-animation-title"></span></span>
                      <strong>Speed Start</strong><small>Gerakan start dan jejak kecepatan</small>
                    </label>
                    <label class="cms-animation-choice">
                      <input type="radio" name="cmsHeroAnimation" value="PULSE">
                      <span class="cms-animation-preview" data-animation="PULSE"><span class="cms-animation-title"></span></span>
                      <strong>Energy Pulse</strong><small>Denyut dan cahaya lembut</small>
                    </label>
                    <label class="cms-animation-choice">
                      <input type="radio" name="cmsHeroAnimation" value="RISE">
                      <span class="cms-animation-preview" data-animation="RISE"><span class="cms-animation-title"></span></span>
                      <strong>Float Rise</strong><small>Gerakan mengambang perlahan</small>
                    </label>
                  </div>
                  <label class="cms-animation-none"><input type="radio" name="cmsHeroAnimation" value="NONE"> Tanpa animasi</label>
                </fieldset>
                <p class="form-hint">Pilih warna dengan kontras yang cukup agar teks tetap mudah dibaca. Animasi mengikuti pengaturan kurangi gerakan pada perangkat pengunjung.</p>
              </div>

              <div class="form-group">
                <label class="form-label">Subjudul Hero / Deskripsi Singkat</label>
                <textarea class="form-input" id="cmsHeroSubtitle" rows="2" placeholder="Kompetisi lari terbesar di Kota Bahari dengan standar race profesional..."></textarea>
              </div>
            </div>

            <!-- 1.5. Live Event Stats Grid (Bebas Tambah & Bisa Otomatis dari Data) -->
            <div class="admin-section">
              <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">
                <div>
                  <h3><i class="fa-solid fa-chart-line" style="color: var(--color-primary);"></i> Live Event Stats Grid (Banner Statistik Hero)</h3>
                  <p>Gunakan angka pendaftaran aktual yang diperbarui saat data berubah, atau buat informasi statistik kustom sesuai kebutuhan.</p>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="btnAddCmsStatItem">
                  <i class="fa-solid fa-plus"></i> Tambah Kartu Statistik
                </button>
              </div>
              <div class="cms-stats-source-note">
                <i class="fa-solid fa-circle-info"></i>
                <span>Data otomatis mengikuti pesanan aktif di database. Pendaftaran menunggu pembayaran tetap menghitung kuota; pesanan kedaluwarsa, batal, atau ditolak tidak dihitung.</span>
              </div>

              <!-- Dynamic Repeater Container -->
              <div id="cmsStatsItemsContainer" class="cms-repeater-grid">
                <!-- Di-render oleh cms.js -->
              </div>
            </div>

            <!-- 2. Rute Lari & Google Maps Embed -->
            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-map-location-dot" style="color: var(--color-primary);"></i> Manajemen Rute & Checkpoint</h3>
                  <p>Pengaturan peta, gambar A4, dan checkpoint manual kini dikelola bersama di halaman Manajemen Rute &amp; Checkpoint.</p>
                </div>
              </div>
              <p class="form-hint">Gunakan tab <strong>Manajemen Rute &amp; Checkpoint</strong> untuk memilih Google Maps atau gambar peta, mengatur mode checkpoint, dan mengelola media pratinjau.</p>
            </div>

            <!-- 3. Fasilitas, Kategori & Gambar Media -->
            <div class="admin-section">
              <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">
                <div>
                  <h3><i class="fa-solid fa-circle-question" style="color: var(--color-primary);"></i> Pertanyaan yang Sering Diajukan (FAQ)</h3>
                  <p>Kelola pertanyaan dan jawaban. Jika semua FAQ dimatikan, website menampilkan box EVENT COMING SOON.</p>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="btnAddCmsFaqItem">
                  <i class="fa-solid fa-plus"></i> Tambah FAQ
                </button>
              </div>
              <div id="cmsFaqItemsContainer" class="cms-repeater-grid"></div>
            </div>

            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-ticket" style="color: var(--color-primary);"></i> Tampilan Saat Semua Section Nonaktif</h3>
                  <p>Box tiket ini muncul otomatis jika seluruh section Konten Website &amp; CMS dimatikan.</p>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="cmsComingSoonTitle">Teks utama</label>
                  <input type="text" class="form-input" id="cmsComingSoonTitle" maxlength="100" placeholder="COMING SOON EVENT!">
                </div>
                <div class="form-group">
                  <label class="form-label" for="cmsComingSoonImageUrl">URL gambar (opsional)</label>
                  <input type="url" class="form-input" id="cmsComingSoonImageUrl" maxlength="2048" placeholder="https://domain.com/gambar-event.jpg">
                  <div class="form-hint">Gunakan link gambar publik dengan protokol HTTPS atau HTTP.</div>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="cmsComingSoonMessage">Teks deskripsi</label>
                <textarea class="form-input" id="cmsComingSoonMessage" rows="2" maxlength="500" placeholder="Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!"></textarea>
              </div>
              <div class="cms-coming-soon-preview" id="cmsComingSoonPreview" aria-live="polite">
                <div class="cms-coming-soon-preview-image">
                  <img id="cmsComingSoonPreviewImage" alt="Pratinjau gambar Coming Soon" hidden>
                  <i class="fa-solid fa-ticket" id="cmsComingSoonPreviewFallback" aria-hidden="true"></i>
                </div>
                <div>
                  <span>EVENT UPDATE</span>
                  <strong id="cmsComingSoonPreviewTitle">COMING SOON EVENT!</strong>
                  <p id="cmsComingSoonPreviewMessage">Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!</p>
                </div>
              </div>
            </div>

            <!-- 4. Kontak & Footer -->
            <div class="admin-section">
              <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">
                <div>
                  <h3><i class="fa-solid fa-images" style="color: var(--color-primary);"></i> Section Fasilitas, Kategori & Media Gambar</h3>
                  <p>Kustomisasi teks pengantar, media preview, dan daftar fasilitas pelari (bisa tambah/hapus kartu secara bebas).</p>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="btnAddCmsFacilityItem">
                  <i class="fa-solid fa-plus"></i> Tambah Kartu Fasilitas
                </button>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Judul Section Fasilitas</label>
                  <input type="text" class="form-input" id="cmsFacilitiesTitle" placeholder="Fasilitas & Layanan Unggulan">
                </div>
                <div class="form-group">
                  <label class="form-label">URL Gambar Fasilitas / Race Village</label>
                  <input type="url" class="form-input" id="cmsFacilitiesImage" placeholder="https://images.unsplash.com/...">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Deskripsi Section Fasilitas</label>
                <textarea class="form-input" id="cmsFacilitiesDesc" rows="2" placeholder="Kenyamanan dan keselamatan pelari adalah prioritas utama kami..."></textarea>
              </div>

              <!-- Dynamic Facilities Repeater Container -->
              <div style="margin-top: 16px; margin-bottom: 24px;">
                <label class="form-label" style="font-weight: 700; color: var(--color-primary);">Daftar Butir Fasilitas Pelari (Dynamic Cards)</label>
                <div id="cmsFacilitiesItemsContainer" class="cms-repeater-grid">
                  <!-- Di-render oleh cms.js -->
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Judul Section Tiket</label>
                  <input type="text" class="form-input" id="cmsTicketsTitle" placeholder="Pilih Tantangan Jarak Lari Anda">
                </div>
              </div>

              <div class="form-group cms-ticket-image-control">
                <label class="form-label" for="cmsMedalImage">Gambar Strip Kategori Tiket</label>
                <div class="cms-ticket-image-url-row">
                  <input type="url" class="form-input" id="cmsMedalImage" placeholder="https://domain.com/gambar-event.jpg">
                  <button type="button" class="btn btn-secondary btn-sm" id="btnClearCmsMedalImage" aria-label="Hapus gambar strip tiket" title="Hapus gambar">
                    <i class="fa-solid fa-trash-can" aria-hidden="true"></i><span>Hapus</span>
                  </button>
                </div>
                <div class="form-hint">Gunakan URL gambar publik. Gambar akan ditampilkan sebagai strip lebar penuh dari tepi kiri ke kanan.</div>
                <div class="cms-ticket-image-preview" id="cmsTicketImagePreview">
                  <img id="cmsTicketImagePreviewImg" alt="Pratinjau strip gambar kategori tiket" hidden>
                  <div class="cms-ticket-image-preview-empty" id="cmsTicketImagePreviewEmpty">
                    <i class="fa-regular fa-image" aria-hidden="true"></i>
                    <span>Pratinjau strip gambar full-width</span>
                  </div>
                  <span class="cms-ticket-image-preview-badge"><i class="fa-solid fa-arrows-left-right" aria-hidden="true"></i> FULL WIDTH</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Deskripsi Section Tiket</label>
                <textarea class="form-input" id="cmsTicketsDesc" rows="2" placeholder="Tersedia kategori kompetitif bagi atlet dan fun run santai..."></textarea>
              </div>
              <div class="form-group jersey-banner-form-group">
                <label class="form-label" for="cmsJerseyGalleryImages">Galeri jersey &amp; panduan ukuran (global)</label>
                <p class="form-hint">Masukkan maksimal 5 URL gambar publik, satu per baris, sesuai urutan tampilan. Gunakan gambar desain jersey dan tabel ukuran lengkap. Galeri ini sama untuk semua detail tiket dan tidak otomatis mengubah gambar pada kartu tipe jersey; gambar tersebut dapat diedit di menu Jersey kategori.</p>
                <textarea class="form-input" id="cmsJerseyGalleryImages" rows="4" placeholder="https://contoh.com/desain-jersey.jpg&#10;https://contoh.com/panduan-ukuran.jpg" aria-describedby="cmsJerseyGalleryError"></textarea>
                <p id="cmsJerseyGalleryError" class="jersey-admin-error" role="status" hidden></p>
                <p class="form-hint">Pratinjau langsung: gambar ditampilkan ke bawah sesuai urutan URL. Pilih gambar untuk memperbesar.</p>
                <div id="cmsJerseyGalleryPreview" hidden></div>
              </div>
              <div class="form-group jersey-banner-form-group">
                <label class="form-label" for="cmsBibPreviewImage">Gambar contoh kartu BIB (global, opsional)</label>
                <p class="form-hint">Masukkan satu URL gambar publik HTTP atau HTTPS. Contoh ini ditampilkan di semua detail tiket dan bukan nomor BIB peserta. Kosongkan untuk menyembunyikannya.</p>
                <input class="form-input" type="url" id="cmsBibPreviewImage" maxlength="2048" placeholder="https://contoh.com/desain-bib.jpg" aria-describedby="cmsBibPreviewError">
                <p id="cmsBibPreviewError" class="jersey-admin-error" role="status" hidden></p>
                <div id="cmsBibPreview" hidden></div>
              </div>
            </div>

            <!-- 3.5. Perizinan & Kepatuhan Hukum (Legal) -->
            <div class="admin-section">
              <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">
                <div>
                  <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary);"></i> Section Perizinan & Kepatuhan Hukum</h3>
                  <p>Pengaturan teks legalitas dan daftar poin kepatuhan hukum resmi (bisa tambah/hapus kartu secara bebas).</p>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="btnAddCmsLegalItem">
                  <i class="fa-solid fa-plus"></i> Tambah Poin Legalitas
                </button>
              </div>

              <div class="form-group">
                <label class="form-label">Label Badge Legalitas</label>
                <input type="text" class="form-input" id="cmsLegalBadge" placeholder="Kepatuhan Regulasi Indonesia">
              </div>

              <div class="form-group">
                <label class="form-label">Judul Utama Legalitas</label>
                <input type="text" class="form-input" id="cmsLegalTitle" placeholder="Perizinan & Kepatuhan Hukum Resmi">
              </div>

              <div class="form-group">
                <label class="form-label">Deskripsi Legalitas</label>
                <textarea class="form-input" id="cmsLegalDesc" rows="2" placeholder="Tegal Run 2026 diselenggarakan dengan izin resmi pemerintah daerah..."></textarea>
              </div>

              <!-- Dynamic Legal Repeater Container -->
              <div style="margin-top: 16px;">
                <label class="form-label" style="font-weight: 700; color: var(--color-primary);">Daftar Poin Kepatuhan Hukum (Dynamic Cards)</label>
                <div id="cmsLegalItemsContainer" class="cms-repeater-grid">
                  <!-- Di-render oleh cms.js -->
                </div>
                <div class="form-row" style="margin-top: 16px;">
                  <div class="form-group">
                    <label class="form-label">Tombol Kebijakan Privasi</label>
                    <input type="text" class="form-input" id="cmsLegalPrivacyButton" placeholder="Baca Kebijakan Privasi Lengkap (UU PDP)">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Tombol Syarat &amp; Ketentuan</label>
                    <input type="text" class="form-input" id="cmsLegalTermsButton" placeholder="Ketentuan Perlombaan & Pelepasan Tanggung Jawab">
                  </div>
                </div>
              </div>
            </div>

            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-file-shield" style="color: var(--color-primary);"></i> Dokumen Modal Legal</h3>
                  <p>Atur judul dan isi Kebijakan Privasi serta Syarat &amp; Ketentuan. Pisahkan paragraf dengan baris kosong, awali subjudul dengan angka (contoh: 1.), dan awali butir daftar dengan tanda -.</p>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Judul Kebijakan Privasi</label>
                  <input type="text" class="form-input" id="cmsPrivacyModalTitle" maxlength="160">
                </div>
                <div class="form-group">
                  <label class="form-label">Subjudul Kebijakan Privasi</label>
                  <input type="text" class="form-input" id="cmsPrivacyModalSubtitle" maxlength="240">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Isi Kebijakan Privasi</label>
                <textarea class="form-input" id="cmsPrivacyModalContent" rows="12" maxlength="12000"></textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Judul Syarat &amp; Ketentuan</label>
                  <input type="text" class="form-input" id="cmsTermsModalTitle" maxlength="160">
                </div>
                <div class="form-group">
                  <label class="form-label">Subjudul Syarat &amp; Ketentuan</label>
                  <input type="text" class="form-input" id="cmsTermsModalSubtitle" maxlength="240">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Isi Syarat &amp; Ketentuan</label>
                <textarea class="form-input" id="cmsTermsModalContent" rows="10" maxlength="12000"></textarea>
              </div>
            </div>

            <!-- 4. Kontak & Footer -->
            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-address-book" style="color: var(--color-primary);"></i> Informasi Kontak & Footer Website</h3>
                  <p>Alamat sekretariat, kontak panitia, dan hak cipta footer.</p>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Email Resmi Panitia</label>
                  <input type="email" class="form-input" id="cmsContactEmail" placeholder="kontak@tegalrun.id">
                </div>
                <div class="form-group">
                  <label class="form-label">WhatsApp / Telepon Panitia</label>
                  <input type="text" class="form-input" id="cmsContactPhone" placeholder="+62 812-3456-7890">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Alamat Sekretariat Pelaksana</label>
                <input type="text" class="form-input" id="cmsContactAddress" placeholder="Alun-Alun Kota Tegal, Jawa Tengah">
              </div>

              <div class="form-group">
                <label class="form-label">Teks Hak Cipta Footer</label>
                <input type="text" class="form-input" id="cmsFooterCopyright" placeholder="Hak Cipta Terpelihara © 2026 Panitia Resmi Tegal Run.">
              </div>
              <aside class="cms-live-preview is-open" id="cmsLivePreview" aria-label="Pratinjau halaman utama">
                <button type="button" class="cms-preview-handle" id="btnToggleCmsPreview"
                  aria-expanded="true" aria-controls="cmsPreviewPanel" aria-label="Lipat pratinjau halaman utama"
                  title="Tarik ke kanan untuk melipat; tarik ke kiri untuk memperlebar">
                  <span class="cms-preview-handle-pin"><i class="fa-solid fa-thumbtack"></i></span>
                  <span class="cms-preview-handle-label">LIPAT</span>
                  <i class="fa-solid fa-chevron-left cms-preview-handle-arrow" aria-hidden="true"></i>
                </button>
                <div class="cms-preview-panel" id="cmsPreviewPanel">
                  <div class="cms-preview-panel-heading">
                    <span class="cms-preview-summary-icon"><i class="fa-solid fa-display"></i></span>
                    <span class="cms-preview-summary-copy"><strong>Pratinjau halaman utama</strong><small>Pratinjau website publik</small></span>
                    <span class="cms-preview-summary-state"><i class="fa-solid fa-circle"></i> LIVE</span>
                  </div>
                  <div class="cms-preview-frame-toolbar">
                    <span><i class="fa-solid fa-globe"></i> Beranda publik · <span id="cmsPreviewUpdated">Memuat pratinjau sesuai pengaturan tersimpan</span></span>
                    <div class="cms-preview-toolbar-actions">
                      <div class="cms-device-switch" role="group" aria-label="Mode pratinjau">
                        <button type="button" class="cms-device-button is-active" data-preview-mode="mobile" aria-pressed="true">
                          <i class="fa-solid fa-mobile-screen-button"></i><span>Mobile</span>
                        </button>
                        <button type="button" class="cms-device-button" data-preview-mode="desktop" aria-pressed="false">
                          <i class="fa-solid fa-desktop"></i><span>Desktop</span>
                        </button>
                      </div>
                      <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshCmsPreview" aria-label="Muat ulang pratinjau" title="Muat ulang pratinjau"><i class="fa-solid fa-rotate"></i></button>
                    </div>
                  </div>
                  <div class="cms-preview-viewport is-mobile-mode" id="cmsPreviewViewport">
                    <iframe id="cmsWebsitePreview" src="/" title="Pratinjau langsung halaman utama website" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                  </div>
                </div>
              </aside>

            </div>
          </form>
        </div>`,be=`<div class="admin-tab-pane" id="pane-admins" data-role="SUPERADMIN">
          <!-- Sub-nav Tabs RBAC -->
          <div class="rbac-subnav" role="tablist" aria-label="Bagian pengelolaan admin">
            <button type="button" class="btn btn-primary btn-sm rbac-subnav-button" id="btnRbacTabUsers" role="tab" aria-controls="rbacSectionUsers" aria-selected="true" onclick="switchRbacSubTab('users')">
              <i class="fa-solid fa-users-gear"></i> Daftar Akun Staf Admin
            </button>
            <button type="button" class="btn btn-outline btn-sm rbac-subnav-button" id="btnRbacTabRoles" role="tab" aria-controls="rbacSectionRoles" aria-selected="false" onclick="switchRbacSubTab('roles')">
              <i class="fa-solid fa-key"></i> Pengaturan Hak Akses Role
            </button>
            <button type="button" class="btn btn-outline btn-sm rbac-subnav-button" id="btnRbacTabMatrix" role="tab" aria-controls="rbacSectionMatrix" aria-selected="false" onclick="switchRbacSubTab('matrix')">
              <i class="fa-solid fa-table-list"></i> Direktori &amp; Arti 12 Role
            </button>
          </div>

          <!-- SUB-SECTION 1: AKUN ADMIN -->
          <div id="rbacSectionUsers" class="admin-section rbac-panel" role="tabpanel" aria-labelledby="btnRbacTabUsers">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary);"></i> Manajemen Akun Petugas Admin</h3>
                <p>Kelola akun login staf operasional, divisi keuangan, dan staf lapangan.</p>
              </div>
              <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateAdminModal" data-role="SUPERADMIN">
                <i class="fa-solid fa-user-shield"></i> Tambah Akun Admin
              </button>
            </div>

            <div class="table-responsive rbac-table-scroll">
              <table class="admin-table rbac-table rbac-users-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Lengkap</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role / Peran</th>
                    <th>Status</th>
                    <th>Tanggal Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody id="adminUsersTableBody">
                  <tr>
                    <td colspan="8" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
                      Memuat daftar admin...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SUB-SECTION 2: MANAJEMEN ROLE & HAK AKSES HALAMAN -->
          <div id="rbacSectionRoles" class="admin-section rbac-panel" role="tabpanel" aria-labelledby="btnRbacTabRoles" style="display: none;">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-key" style="color: var(--color-primary);"></i> Pengaturan Hak Akses Halaman Role</h3>
                <p>Atur akses halaman, izin aksi API, dan widget dashboard setiap role secara terpisah.</p>
              </div>
              <div class="rbac-header-actions">
                <button type="button" class="btn btn-outline btn-sm" id="btnResetDefaultRoles">
                  <i class="fa-solid fa-rotate-left"></i> Reset ke 12 Role Default
                </button>
                <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateRoleModal">
                  <i class="fa-solid fa-plus"></i> Tambah Role Baru
                </button>
              </div>
            </div>

            <div class="table-responsive rbac-table-scroll">
              <table class="admin-table rbac-table rbac-roles-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Role</th>
                    <th>Deskripsi Tanggung Jawab</th>
                    <th>Halaman yang Diizinkan</th>
                    <th>Widget Dashboard</th>
                    <th>Jumlah Petugas</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody id="adminRolesTableBody">
                  <tr>
                    <td colspan="7" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
                      Memuat daftar role...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SUB-SECTION 3: DIREKTORI & PENJELASAN ARTI 12 ROLE -->
          <div id="rbacSectionMatrix" class="admin-section rbac-panel" role="tabpanel" aria-labelledby="btnRbacTabMatrix" style="display: none;">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-book-open-reader" style="color: var(--color-primary);"></i> Direktori &amp; Arti Tanggung Jawab 12 Role Resmi</h3>
                <p>Panduan peran resmi. Hak akses aktual mengikuti konfigurasi di tab Pengaturan Hak Akses.</p>
              </div>
            </div>

            <div class="table-responsive rbac-table-scroll">
              <table class="admin-table rbac-table rbac-directory-table">
                <thead>
                  <tr style="background: #F8FAFC;">
                    <th style="width: 170px;">Role / Peran</th>
                    <th style="min-width: 250px;">Tugas &amp; Tanggung Jawab Operasional</th>
                    <th style="min-width: 280px;">Cakupan Umum (Dapat Disesuaikan)</th>
                    <th style="min-width: 140px;">Tingkat Otoritas</th>
                  </tr>
                </thead>
                <tbody id="roleDirectoryTableBody">
                  <!-- Rendered dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>`,ge=`<div class="admin-tab-pane" id="pane-routes">
  <div class="admin-section route-settings-section">
    <div class="admin-section-header route-section-heading">
      <div>
        <span class="route-section-kicker">KONFIGURASI</span>
        <h3><i class="fa-solid fa-map-location-dot" aria-hidden="true"></i> Pengaturan rute</h3>
        <p>Atur informasi, peta, dan cara menampilkan checkpoint pada website.</p>
      </div>
    </div>
    <form id="routeSettingsForm">
      <div class="route-settings-fields">
        <div class="form-group">
          <label class="form-label" for="routeSettingsBadgeLabel">Label kecil di atas judul</label>
          <input class="form-input" id="routeSettingsBadgeLabel" maxlength="80" placeholder="Jalur Lari Steril">
        </div>
        <div class="form-group">
          <label class="form-label" for="routeSettingsTitle">Judul section rute</label>
          <input class="form-input" id="routeSettingsTitle" maxlength="160" placeholder="Rute Lari Resmi & Titik Kumpul">
        </div>
        <div class="form-group">
          <label class="form-label" for="routeSettingsGpx">Link unduh GPX (opsional)</label>
          <input class="form-input" id="routeSettingsGpx" placeholder="https://... atau /assets/rute.gpx">
        </div>
        <div class="form-group route-field-wide">
          <label class="form-label" for="routeSettingsDescription">Deskripsi rute</label>
          <textarea class="form-input" id="routeSettingsDescription" rows="2" maxlength="1000" placeholder="Ringkasan rute dan informasi penting untuk peserta"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label" for="routeMapMode">Peta utama</label>
          <select class="form-input" id="routeMapMode">
            <option value="GMAPS">Link / embed Google Maps</option>
            <option value="IMAGE">Gambar peta melalui link</option>
          </select>
        </div>
        <div class="form-group route-map-source" id="routeMapUrlField">
          <label class="form-label" for="routeSettingsGmaps">Link / embed Google Maps</label>
          <textarea class="form-input" id="routeSettingsGmaps" rows="2" placeholder="https://www.google.com/maps/embed?..."></textarea>
          <small class="form-hint">Tempel link Google Maps atau kode iframe embed.</small>
        </div>
        <div class="form-group route-map-source" id="routeMapImageField" hidden>
          <label class="form-label" for="routeSettingsMapImage">Link gambar peta</label>
          <input class="form-input" id="routeSettingsMapImage" type="url" maxlength="2048" placeholder="https://.../peta-rute.jpg">
          <div class="route-admin-image-preview" id="routeMapImagePreview" hidden><img alt="Pratinjau gambar peta rute"></div>
        </div>
        <div class="form-group">
          <label class="form-label" for="routeCheckpointMode">Tampilan checkpoint</label>
          <select class="form-input" id="routeCheckpointMode">
            <option value="MANUAL">Checkpoint manual dari daftar</option>
            <option value="IMAGE">Gambar rute/checkpoint ukuran A4</option>
          </select>
          <small class="form-hint">Pilih daftar titik atau satu gambar A4.</small>
        </div>
        <div class="form-group route-map-source" id="routeCheckpointImageField" hidden>
          <label class="form-label" for="routeSettingsCheckpointImage">Link gambar rute A4</label>
          <input class="form-input" id="routeSettingsCheckpointImage" type="url" maxlength="2048" placeholder="https://.../rute-a4.jpg">
          <div class="route-admin-image-preview route-admin-a4-preview" id="routeCheckpointImagePreview" hidden><img alt="Pratinjau gambar checkpoint ukuran A4"></div>
        </div>
      </div>
      <div class="route-settings-actions">
        <span><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Perubahan akan diterapkan ke halaman utama setelah disimpan.</span>
        <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveRouteSettings" data-permission="routes:manage"><i class="fa-solid fa-floppy-disk"></i> Simpan Pengaturan Rute</button>
      </div>
    </form>
  </div>

  <div class="admin-section route-checkpoints-section">
    <div class="admin-section-header route-section-heading">
      <div>
        <span class="route-section-kicker">TITIK RUTE</span>
        <h3><i class="fa-solid fa-map-pin" aria-hidden="true"></i> Manajemen checkpoint</h3>
        <p>Kelola titik rute, water station, dan pos medis.</p>
      </div>
      <button class="btn btn-primary btn-sm route-manual-only" id="btnOpenCreateRouteModal" data-permission="routes:manage">
        <i class="fa-solid fa-plus" aria-hidden="true"></i> Tambah titik
      </button>
    </div>

    <div class="table-responsive route-manual-only" id="routeManualCheckpointsPanel">
      <table class="admin-table route-checkpoints-table">
        <thead>
          <tr>
            <th style="width:50px;">No</th>
            <th>Nama Checkpoint</th>
            <th>Jarak (Km)</th>
            <th>Kategori</th>
            <th>Water Station</th>
            <th>Pos Medis</th>
            <th>Deskripsi</th>
            <th style="width:120px; text-align:center;">Aksi</th>
          </tr>
        </thead>
        <tbody id="routePointsTableBody">
          <tr><td colspan="8" class="route-table-message"><i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Memuat checkpoint...</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,ve=`<div class="admin-tab-pane" id="pane-notifications">
          <div class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-bell" style="color: var(--color-primary);"></i> Konfigurasi Notifikasi & Gateway E-Tiket</h3>
                <p>Pengaturan pengiriman otomatis/manual bukti E-Tiket, file PDF, ucapan terima kasih, dan WhatsApp Web Scan QR.</p>
              </div>
            </div>

            <!-- WhatsApp Web QR Code Pairing Box (Native Backend Direct) -->
            <div class="wa-qr-box" style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-lg); padding: 24px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
                <div>
                  <h4 style="margin: 0 0 6px 0; font-size: 1.1rem; color: #15803D; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.4rem; color: #22C55E;"></i> WhatsApp Dedicated Server Gateway (Native Multi-Device Engine)
                  </h4>
                  <p style="margin: 0; font-size: 0.85rem; color: #475569;">
                    Mesin server WhatsApp terintegrasi langsung pada backend engine tanpa perantara pihak ketiga. Pindai QR Code via <strong>Perangkat Tertaut (Linked Devices)</strong> pada aplikasi WhatsApp resmi di ponsel Anda.
                  </p>
                </div>
                <div id="waSessionStatusBadge">
                  <span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
                    <i class="fa-solid fa-circle-xmark"></i> Terputus (Belum Scan QR)
                  </span>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: center; flex-wrap: wrap;" id="waQrGrid">
                <!-- QR Code Box -->
                <div style="background: #FFFFFF; padding: 16px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 230px; min-height: 230px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #DCFCE7; text-align: center;">
                  <div id="waQrImageContainer">
                    <div style="color: #64748B; padding: 30px 10px; font-size: 0.85rem;">
                      <i class="fa-solid fa-qrcode" style="font-size: 3rem; margin-bottom: 10px; color: #94A3B8; display: block;"></i>
                      Klik tombol <strong>"Generate QR Code"</strong> di samping untuk memulai sesi WhatsApp Web langsung dari backend.
                    </div>
                  </div>
                  <small id="waQrCountdown" style="color: #64748B; font-size: 0.72rem; margin-top: 8px; display: none;">
                    QR Code aktif. Pindai dalam 60 detik.
                  </small>
                </div>

                <!-- Info & Actions -->
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  <div style="background: #FFFFFF; border: 1px solid #DCFCE7; border-radius: var(--radius-sm); padding: 14px 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                    <div style="font-size: 0.82rem; color: #64748B; margin-bottom: 4px;">Informasi WhatsApp Terhubung:</div>
                    <div style="font-size: 0.95rem; font-weight: 700; color: #0F172A;" id="waDeviceInfo">
                      Tidak ada nomor tertaut
                    </div>
                    <div style="font-size: 0.78rem; color: #64748B; margin-top: 2px;" id="waLastSyncInfo">
                      Status: Belum Terkoneksi
                    </div>
                  </div>

                  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnGenerateWaQr" data-permission="whatsapp:session">
                      <i class="fa-solid fa-qrcode"></i> Generate QR Code WhatsApp Web
                    </button>
                    <button type="button" class="btn btn-outline btn-sm" id="btnDisconnectWa" data-permission="whatsapp:session" style="display: none; border-color: #EF4444; color: #EF4444;">
                      <i class="fa-solid fa-arrow-right-from-bracket"></i> Putuskan Sesi (Logout)
                    </button>
                  </div>

                  <div style="font-size: 0.8rem; color: #475569; line-height: 1.5; background: #FFFFFF; padding: 10px 14px; border-radius: 8px; border: 1px solid #E2E8F0;">
                    <i class="fa-solid fa-circle-check" style="color: #22C55E;"></i> <strong>Koneksi Langsung:</strong>
                    Buka WhatsApp di ponsel &gt; Menu Titik Tiga / Pengaturan &gt; <em>Perangkat Tertaut (Linked Devices)</em> &gt; <em>Tautkan Perangkat</em> &gt; Pindai QR Code di layar.
                  </div>
                </div>
              </div>
            </div>

            <form id="formNotificationSettings">
              <!-- Dispatch Mode & Channel Selection -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 24px;">
                <!-- Mode Pengiriman: Otomatis vs Manual -->
                <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
                  <h4 style="margin-bottom: 12px; font-size: 0.95rem; color: #D97706; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-paper-plane"></i> Mode Pengiriman Notifikasi
                  </h4>
                  <div class="form-group" style="margin-bottom: 8px;">
                    <label class="form-label">Pilih Mode Eksekusi Pengiriman:</label>
                    <select class="form-input" id="notifSettingDispatchMode">
                      <option value="AUTO">Otomatis (Instant Auto Dispatch setelah pendaftaran / pembayaran)</option>
                      <option value="MANUAL">Manual (Admin kirim secara manual via Halaman Log Notifikasi)</option>
                    </select>
                    <small style="color: var(--color-text-muted); font-size: 0.76rem; display: block; margin-top: 6px;">
                      Jika memilih <strong>Manual</strong>, pesan akan disimpan ke antrean dan admin dapat meninjau serta menekan tombol "Kirim Sekarang" di tab <em>Log Notifikasi &amp; Peserta</em>.
                    </small>
                  </div>
                </div>

                <!-- Saluran Pengiriman Aktif -->
                <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
                  <h4 style="margin-bottom: 12px; font-size: 0.95rem; color: var(--color-text-title); display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-sliders"></i> Saluran Pengiriman Aktif
                  </h4>
                  <div class="form-group" style="margin-bottom: 8px;">
                    <label class="form-label">Kirim Notifikasi Melalui:</label>
                    <select class="form-input" id="notifSettingChannel">
                      <option value="WA">Hanya WhatsApp (Backend Direct)</option>
                      <option value="EMAIL">Hanya Email (SMTP App Password)</option>
                      <option value="BOTH">WhatsApp &amp; Email Sekaligus</option>
                      <option value="DISABLED">Nonaktifkan Semua Notifikasi</option>
                    </select>
                    <small style="color: var(--color-text-muted); font-size: 0.76rem; display: block; margin-top: 6px;">
                      Pilih media pengiriman yang akan menerima bukti tiket digital PDF dan pemberitahuan transaksi.
                    </small>
                  </div>
                </div>
              </div>

              <!-- Email SMTP Settings -->
              <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
                <h4 style="margin-bottom: 16px; font-size: 0.95rem; color: #0284C7; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-envelope" style="font-size: 1.1rem;"></i> Email SMTP (Gmail / Custom Server)
                </h4>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">SMTP Host</label>
                    <input type="text" class="form-input" id="notifSettingSmtpHost" placeholder="smtp.gmail.com">
                  </div>
                  <div class="form-group" style="max-width: 120px;">
                    <label class="form-label">Port</label>
                    <input type="number" class="form-input" id="notifSettingSmtpPort" placeholder="587">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">SMTP Email / Akun</label>
                    <input type="email" class="form-input" id="notifSettingSmtpUser" placeholder="panitia@tegalrun.id">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Password Aplikasi (App Password)</label>
                    <input type="password" class="form-input" id="notifSettingSmtpPass" placeholder="App password 16 digit">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Nama Pengirim (From Name)</label>
                    <input type="text" class="form-input" id="notifSettingEmailFromName" placeholder="Panitia Tegal Run 2026">
                  </div>
                </div>
              </div>

              <!-- Message Templates -->
              <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 16px;">
                  <h4 style="font-size: 1rem; color: var(--color-text-title);"><i class="fa-solid fa-comment-dots"></i> Template Pesan Otomatis (Status, Berkas PDF &amp; Ucapan)</h4>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{fullName}</span>
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{ticketName}</span>
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{bibNumber}</span>
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{orderId}</span>
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{totalAmount}</span>
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{eTicketUrl}</span>
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{pdfUrl}</span>
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{paymentUrl}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label"><i class="fa-solid fa-circle-check" style="color: #10B981;"></i> Template: Pembayaran Berhasil (E-Tiket Terbit, Berkas PDF &amp; Ucapan Terima Kasih)</label>
                  <textarea class="form-input" id="notifSettingTemplatePaid" rows="6" placeholder="Halo {fullName}! Pembayaran tiket {ticketName} ({orderId}) sebesar {totalAmount} telah BERHASIL diverifikasi! Nomor BIB Anda: {bibNumber}. Unduh E-Tiket di: {eTicketUrl}"></textarea>
                  <small style="color: var(--color-text-muted); font-size: 0.75rem;">Mencakup status lunas, nomor BIB resmi, tautan cetak file tiket digital PDF, serta ucapan terima kasih panitia.</small>
                </div>

                <div class="form-group">
                  <label class="form-label"><i class="fa-solid fa-clock" style="color: #F59E0B;"></i> Template: Menunggu Pembayaran (Pending Order)</label>
                  <textarea class="form-input" id="notifSettingTemplatePending" rows="4" placeholder="Halo {fullName}! Pendaftaran tiket {ticketName} ({orderId}) sedang menunggu pembayaran. Selesaikan di: {paymentUrl}"></textarea>
                </div>

                <div class="form-group">
                  <label class="form-label"><i class="fa-solid fa-ban" style="color: #EF4444;"></i> Template: Pesanan Dibatalkan (Cancel)</label>
                  <textarea class="form-input" id="notifSettingTemplateCancel" rows="3" placeholder="Halo {fullName}, pesanan tiket {ticketName} ({orderId}) telah dibatalkan. Kuota telah dilepaskan kembali."></textarea>
                </div>
              </div>

              <!-- Action Bar -->
              <div style="display: flex; gap: 12px; align-items: center; justify-content: flex-end; margin-bottom: 30px;">
                <button type="submit" class="btn btn-primary btn-glow" id="btnSaveNotifSettings" data-permission="notifications:manage">
                  <i class="fa-solid fa-floppy-disk"></i> Simpan Seluruh Konfigurasi Notifikasi
                </button>
              </div>
            </form>

            <!-- Test Notification Dispatch Box -->
            <div style="background: #EFF6FF; border: 1px dashed #93C5FD; border-radius: var(--radius-md); padding: 20px;">
              <h4 style="margin-bottom: 8px; font-size: 0.95rem; color: #1D4ED8;"><i class="fa-solid fa-paper-plane"></i> Uji Coba Pengiriman Pesan Langsung</h4>
              <p style="font-size: 0.8rem; color: #475569; margin-bottom: 16px;">Kirim pesan pengujian untuk memastikan WhatsApp Web langsung dari backend dan kredensial SMTP Email berfungsi dengan benar.</p>
              
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">
                <div class="form-group" style="min-width: 140px; margin-bottom: 0;">
                  <label class="form-label">Tipe Saluran</label>
                  <select class="form-input" id="testNotifChannel">
                    <option value="WA">WhatsApp</option>
                    <option value="EMAIL">Email</option>
                  </select>
                </div>
                <div class="form-group" style="flex: 1; min-width: 200px; margin-bottom: 0;">
                  <label class="form-label">Tujuan (No WA / Email)</label>
                  <input type="text" class="form-input" id="testNotifTarget" placeholder="Contoh: 08123456789 atau user@mail.com">
                </div>
                <div class="form-group" style="flex: 1.5; min-width: 250px; margin-bottom: 0;">
                  <label class="form-label">Pesan Uji Coba</label>
                  <input type="text" class="form-input" id="testNotifMessage" value="Ini adalah pesan tes notifikasi otomatis dari sistem Tegal Run 2026.">
                </div>
                <button type="button" class="btn btn-secondary" id="btnSendTestNotif" data-permission="notifications:manage">
                  <i class="fa-solid fa-vial"></i> Kirim Tes
                </button>
              </div>
            </div>
          </div>
        </div>`,fe=`<div class="admin-tab-pane" id="pane-notif-logs">
          <div class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-paper-plane" style="color: var(--color-primary);"></i> Log Pengiriman Notifikasi &amp; Status Peserta</h3>
                <p>Pantau data peserta yang sudah menerima e-tiket / notifikasi WhatsApp &amp; Email, serta kirim manual secara instan.</p>
              </div>
              <div class="admin-action-bar">
                <button class="btn btn-secondary btn-sm" id="btnRefreshNotifLogs">
                  <i class="fa-solid fa-rotate"></i> Segarkan Data
                </button>
                <button class="btn btn-primary btn-sm btn-glow" id="btnBatchSendNotif" data-permission="notifications:dispatch">
                  <i class="fa-solid fa-envelopes-bulk"></i> Kirim Semua yang Belum Terkirim
                </button>
              </div>
            </div>

            <!-- KPI Summary Cards -->
            <div class="admin-kpi-grid" style="margin-bottom: 24px;">
              <div class="kpi-card">
                <div class="kpi-icon blue"><i class="fa-solid fa-receipt"></i></div>
                <div class="kpi-details">
                  <span class="kpi-label">Total Pesanan / Pendaftar</span>
                  <h3 class="kpi-val" id="kpiNotifTotalOrders">0</h3>
                  <span class="kpi-sub">Seluruh transaksi terdata</span>
                </div>
              </div>

              <div class="kpi-card">
                <div class="kpi-icon green"><i class="fa-solid fa-circle-check"></i></div>
                <div class="kpi-details">
                  <span class="kpi-label">Notifikasi Terkirim</span>
                  <h3 class="kpi-val" id="kpiNotifSentCount" style="color: #10B981;">0</h3>
                  <span class="kpi-sub">WhatsApp / Email Sukses</span>
                </div>
              </div>

              <div class="kpi-card">
                <div class="kpi-icon orange"><i class="fa-solid fa-clock"></i></div>
                <div class="kpi-details">
                  <span class="kpi-label">Belum Terkirim / Pending</span>
                  <h3 class="kpi-val" id="kpiNotifPendingCount" style="color: #F59E0B;">0</h3>
                  <span class="kpi-sub">Menunggu pengiriman admin</span>
                </div>
              </div>

              <div class="kpi-card">
                <div class="kpi-icon purple"><i class="fa-brands fa-whatsapp"></i></div>
                <div class="kpi-details">
                  <span class="kpi-label">Mode Pengiriman Saat Ini</span>
                  <h3 class="kpi-val" id="kpiNotifDispatchMode" style="font-size: 1.15rem; color: #38BDF8;">OTOMATIS</h3>
                  <span class="kpi-sub" id="kpiNotifSessionStatus">Sesi WA: Memeriksa...</span>
                </div>
              </div>
            </div>

            <!-- Filter & Search Bar -->
            <div style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <input type="text" class="form-input form-input-sm" id="searchNotifLogs" placeholder="Cari Nama, No WA, Order ID, BIB..." style="width: 260px;">
                <select class="form-input form-input-sm" id="filterNotifDeliveryStatus" style="width: 190px;">
                  <option value="">Semua Status Pengiriman</option>
                  <option value="SENT">Sudah Terkirim (Sent)</option>
                  <option value="UNSENT">Belum Terkirim / Pending</option>
                </select>
              </div>
              <div style="font-size: 0.82rem; color: var(--color-text-muted);">
                <i class="fa-solid fa-circle-info"></i> Klik <strong>"Kirim Sekarang"</strong> untuk mengirim pesan WhatsApp berisi status pembayaran &amp; file PDF tiket.
              </div>
            </div>

            <!-- Table of Notification Logs -->
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th style="width: 45px;">No</th>
                    <th>Order ID / Invoice</th>
                    <th>Nama Peserta (KTP)</th>
                    <th>Kontak (WA &amp; Email)</th>
                    <th>Kategori &amp; BIB</th>
                    <th>Status Bayar</th>
                    <th>Status Kirim WA</th>
                    <th>Status Kirim Email</th>
                    <th>Waktu Terkirim</th>
                    <th style="text-align: center; width: 140px;">Aksi</th>
                  </tr>
                </thead>
                <tbody id="notifLogsTableBody">
                  <tr>
                    <td colspan="10" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
                      Memuat data log notifikasi...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>`,he=`<div class="admin-tab-pane" id="pane-whatsapp-web">
          <div class="admin-section" style="padding: 0; background: transparent; border: none; box-shadow: none;">
            <!-- Header Ringkasan Status Gateway -->
            <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              <div>
                <h3 style="margin: 0 0 4px 0; font-size: 1.25rem; color: #0F172A; display: flex; align-items: center; gap: 10px;">
                  <i class="fa-brands fa-whatsapp" style="color: #22C55E; font-size: 1.5rem;"></i>
                  WhatsApp Web Enterprise Console
                </h3>
                <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-muted);">
                  Pantau koneksi perangkat tertaut, database nomor peserta, dan kirim pesan interaktif langsung dari admin layaknya WhatsApp Web.
                </p>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div id="waWebHeaderStatus">
                  <span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; padding: 6px 14px; font-weight: 700;">
                    <i class="fa-solid fa-circle-xmark"></i> Status: Terputus
                  </span>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshWaWeb">
                  <i class="fa-solid fa-rotate"></i> Segarkan Status
                </button>
                <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnGoToWaQr">
                  <i class="fa-solid fa-qrcode"></i> Scan QR Baru
                </button>
              </div>
            </div>

            <!-- WhatsApp Web 2-Column Console Layout -->
            <div class="wa-web-layout">
              <!-- Left Sidebar: Profile & Contacts -->
              <div class="wa-web-sidebar">
                <div class="wa-web-profile-bar">
                  <div class="wa-web-profile-info">
                    <div class="wa-avatar" id="waWebMyAvatar">
                      <i class="fa-brands fa-whatsapp"></i>
                    </div>
                    <div>
                      <div style="font-weight: 700; font-size: 0.92rem; color: #0F172A;" id="waWebMyNumber">
                        Memuat nomor...
                      </div>
                      <div style="font-size: 0.72rem; color: #22C55E; font-weight: 600; display: flex; align-items: center; gap: 4px;" id="waWebMyStatusText">
                        <span style="width: 7px; height: 7px; background: #22C55E; border-radius: 50%; display: inline-block;"></span> Online &amp; Terhubung
                      </div>
                    </div>
                  </div>
                  <div>
                    <button type="button" class="btn-icon" id="btnWaWebSync" title="Sinkronisasi Sesi" style="background: none; border: none; cursor: pointer; color: #64748B; font-size: 1rem;">
                      <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                  </div>
                </div>

                <!-- Search Contact Box -->
                <div class="wa-web-search-box">
                  <div style="position: relative;">
                    <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 0.85rem;"></i>
                    <input type="text" class="form-input form-input-sm" id="waContactSearchInput" placeholder="Cari pelari / nomor HP..." style="padding-left: 34px; border-radius: 20px; background: #FFFFFF;">
                  </div>
                </div>

                <!-- Contact List Container -->
                <div class="wa-web-contact-list" id="waContactListContainer">
                  <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
                    <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--color-primary); display: block;"></i>
                    Memuat daftar kontak peserta...
                  </div>
                </div>
              </div>

              <!-- Right Area: Live Chat Messenger -->
              <div class="wa-web-main" id="waChatMainContainer">
                <!-- Chat Header -->
                <div class="wa-chat-header" id="waChatHeaderBar">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="wa-avatar" style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); width: 40px; height: 40px; font-size: 0.88rem;" id="waActiveAvatar">
                      TR
                    </div>
                    <div>
                      <div style="font-weight: 700; font-size: 0.95rem; color: #0F172A;" id="waActiveName">
                        Pilih Peserta untuk Chat
                      </div>
                      <div style="font-size: 0.78rem; color: #64748B; display: flex; align-items: center; gap: 8px;">
                        <span id="waActivePhone">-</span>
                        <span id="waActiveBadge"></span>
                      </div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px;" id="waChatHeaderActions">
                    <button type="button" class="btn btn-secondary btn-sm" id="btnQuickSendPaidTicket" title="Kirim E-Tiket PDF Lunas">
                      <i class="fa-solid fa-ticket" style="color: #22C55E;"></i> Kirim Tiket
                    </button>
                    <button type="button" class="btn btn-secondary btn-sm" id="btnQuickSendPending" title="Kirim Tagihan & Link Bayar">
                      <i class="fa-solid fa-clock" style="color: #F59E0B;"></i> Tagihan
                    </button>
                  </div>
                </div>

                <!-- Chat Messages Scroll Box -->
                <div class="wa-chat-scroll" id="waChatMessagesBox">
                  <div class="wa-system-pill">
                    <i class="fa-solid fa-lock"></i> Pesan terenkripsi end-to-end melalui WhatsApp Dedicated Server Gateway
                  </div>
                  <div style="text-align: center; color: #64748B; font-size: 0.85rem; margin: 40px auto; max-width: 360px; background: rgba(255,255,255,0.7); padding: 20px; border-radius: 12px;">
                    <i class="fa-brands fa-whatsapp" style="font-size: 3rem; color: #22C55E; margin-bottom: 12px; display: block;"></i>
                    <strong>Pilih kontak peserta di sebelah kiri</strong><br>
                    <span style="font-size: 0.8rem; color: #64748B;">Anda dapat mengirim notifikasi manual, update bukti bayar, atau chat pesan kustom langsung ke nomor WhatsApp peserta.</span>
                  </div>
                </div>

                <!-- Chat Input Footer -->
                <div class="wa-chat-input-bar" id="waChatInputArea">
                  <div style="display: flex; gap: 10px; align-items: center;">
                    <select class="form-input form-input-sm" id="waQuickTemplateSelect" style="max-width: 260px; font-size: 0.8rem;">
                      <option value="">⚡ Pilih Template Cepat...</option>
                      <option value="PAID_TICKET">🎫 Konfirmasi Pembayaran &amp; E-Tiket PDF</option>
                      <option value="PENDING_INVOICE">⏳ Pengingat Tagihan &amp; Link Pembayaran</option>
                      <option value="RACEPACK_INFO">🎽 Informasi Pengambilan Race Pack</option>
                      <option value="THANK_YOU">🙏 Ucapan Terima Kasih Panitia Tegal Run</option>
                    </select>
                    <small style="color: #64748B; font-size: 0.76rem;">Template otomatis terisi dengan nama &amp; data peserta</small>
                  </div>
                  <div class="wa-chat-input-row">
                    <textarea class="form-input" id="waDirectChatInput" rows="2" placeholder="Ketik pesan WhatsApp langsung ke peserta..." style="resize: none; font-size: 0.88rem;"></textarea>
                    <button type="button" class="btn btn-primary btn-glow" id="btnSendWaDirectMsg" data-permission="whatsapp:chat" style="height: 100%; min-height: 52px; padding: 0 20px;">
                      <i class="fa-solid fa-paper-plane"></i> Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`,ke=`<div class="admin-tab-pane" id="pane-logs">
          <div class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-clock-rotate-left" style="color: var(--color-primary);"></i> Rekam Jejak Audit & Keamanan Sistem</h3>
                <p>Audit trail untuk setiap perubahan konfigurasi, pendaftaran, dan mutasi data.</p>
              </div>
              <button class="btn btn-secondary btn-sm" id="btnRefreshLogs">
                <i class="fa-solid fa-rotate"></i> Segarkan Log
              </button>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Waktu (WIB)</th>
                    <th>Kode Aksi</th>
                    <th>Deskripsi Aktivitas</th>
                    <th>Pelaksana / Admin</th>
                  </tr>
                </thead>
                <tbody id="adminAuditLogsTableBody">
                  <tr>
                    <td colspan="4" style="text-align: center; padding: 20px; color: var(--color-text-muted);">
                      Memuat log audit...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>`,ye=`<div class="admin-tab-pane" id="pane-role-monitoring" data-role="SUPERADMIN">\r
  <section class="admin-section role-monitoring-section">\r
    <div class="admin-section-header role-monitoring-header">\r
      <div>\r
        <h3><i class="fa-solid fa-user-shield"></i> Pemantauan Semua Role</h3>\r
        <p>Pantau sesi admin secara realtime dan kelola akses per akun. Role SUPERADMIN selalu dilindungi.</p>\r
      </div>\r
      <button type="button" class="btn btn-outline btn-sm" id="btnRefreshRoleMonitoring">\r
        <i class="fa-solid fa-arrows-rotate"></i><span>Muat Ulang</span>\r
      </button>\r
    </div>\r
\r
    <div class="role-monitoring-summary" id="roleMonitoringSummary" aria-live="polite">\r
      <div class="role-monitoring-stat">\r
        <span class="role-monitoring-stat-icon"><i class="fa-solid fa-layer-group"></i></span>\r
        <span class="role-monitoring-stat-copy"><span>Role Terpantau</span><strong id="monitoringRoleCount">-</strong></span>\r
      </div>\r
      <div class="role-monitoring-stat">\r
        <span class="role-monitoring-stat-icon is-blue"><i class="fa-solid fa-user-check"></i></span>\r
        <span class="role-monitoring-stat-copy"><span>Akun Aktif</span><strong id="monitoringActiveCount">-</strong></span>\r
      </div>\r
      <div class="role-monitoring-stat">\r
        <span class="role-monitoring-stat-icon is-green"><i class="fa-solid fa-signal"></i></span>\r
        <span class="role-monitoring-stat-copy"><span>Sesi Online</span><strong id="monitoringOnlineCount">-</strong></span>\r
      </div>\r
    </div>\r
\r
    <div class="role-monitoring-list" id="roleMonitoringList" aria-live="polite">\r
      <p class="role-monitoring-empty">Memuat data pemantauan role...</p>\r
    </div>\r
  </section>\r
</div>\r
`,xe=`<div class="admin-tab-pane" id="pane-backups" data-role="SUPERADMIN">\r
  <section class="admin-section backup-section">\r
    <div class="admin-section-header backup-header">\r
      <div>\r
        <h3><i class="fa-solid fa-database" aria-hidden="true"></i> Backup Database</h3>\r
        <p>Unduh salinan seluruh tabel dan data database. Akses hanya tersedia untuk Superadmin.</p>\r
      </div>\r
      <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshBackupOverview">\r
        <i class="fa-solid fa-rotate" aria-hidden="true"></i> Periksa Database\r
      </button>\r
    </div>\r
\r
    <div class="backup-warning" role="alert">\r
      <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>\r
      <div>\r
        <strong>File backup berisi data sangat sensitif.</strong>\r
        <p>Termasuk data peserta, konfigurasi, dan hash password admin. Simpan di tempat terenkripsi dan jangan bagikan file secara publik.</p>\r
      </div>\r
    </div>\r
\r
    <div class="backup-download-grid">\r
      <article class="backup-download-card">\r
        <span class="backup-download-icon"><i class="fa-solid fa-file-code" aria-hidden="true"></i></span>\r
        <div>\r
          <h4>Backup SQL lengkap</h4>\r
          <p>Skema tabel dan seluruh record dalam format SQL. Impor ke database kosong.</p>\r
        </div>\r
        <button type="button" class="btn btn-primary" id="btnDownloadSqlBackup">\r
          <i class="fa-solid fa-download" aria-hidden="true"></i> Unduh SQL\r
        </button>\r
      </article>\r
      <article class="backup-download-card">\r
        <span class="backup-download-icon backup-csv-icon"><i class="fa-solid fa-file-csv" aria-hidden="true"></i></span>\r
        <div>\r
          <h4>Backup CSV gabungan</h4>\r
          <p>Semua tabel dalam satu CSV; kolom <code>table_name</code> membedakan jenis record.</p>\r
        </div>\r
        <button type="button" class="btn btn-secondary" id="btnDownloadCsvBackup">\r
          <i class="fa-solid fa-download" aria-hidden="true"></i> Unduh CSV\r
        </button>\r
      </article>\r
    </div>\r
\r
    <div class="backup-overview">\r
      <div class="backup-overview-heading">\r
        <div>\r
          <h4>Cakupan backup</h4>\r
          <p id="backupTablesStatus" aria-live="polite">Memuat daftar tabel...</p>\r
        </div>\r
        <strong id="backupTableCount">-</strong>\r
      </div>\r
      <ul id="backupTablesList" class="backup-table-list" aria-label="Daftar tabel yang akan dicadangkan"></ul>\r
    </div>\r
  </section>\r
</div>\r
`,we=`<!-- MODAL 1: EVENT CREATE / EDIT -->
  <div class="admin-modal-backdrop" id="modalEventBackdrop">
    <div class="admin-modal-dialog">
      <div class="admin-modal-header">
        <h4 id="modalEventTitle"><i class="fa-solid fa-calendar-plus" style="color: var(--color-primary);"></i> Form Kategori Event</h4>
        <button class="admin-modal-close" onclick="closeAdminModal('modalEventBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form id="formEvent">
        <input type="hidden" id="eventFormId">
        <div class="admin-modal-body">
          <div class="form-group">
            <label class="form-label">Nama Tiket / Kategori Event <span class="req">*</span></label>
            <input type="text" class="form-input" id="eventFormTicketName" placeholder="Contoh: 10K Open Marathon 2026" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Kategori Jarak <span class="req">*</span></label>
              <input type="text" class="form-input" id="eventFormCategory" placeholder="10K / 5K / 21K" required>
            </div>
            <div class="form-group">
              <label class="form-label">Total Kuota (Stok) <span class="req">*</span></label>
              <input type="number" class="form-input" id="eventFormStock" min="1" placeholder="500" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Harga Tiket (Rp) <span class="req">*</span></label>
              <input type="number" class="form-input" id="eventFormPrice" min="0" step="5000" placeholder="250000" required>
            </div>
            <div class="form-group">
              <label class="form-label">Tanggal Pelaksanaan</label>
              <input type="datetime-local" class="form-input" id="eventFormDate">
            </div>
            <div class="form-group event-follow-timer-group">
              <label class="form-label">Tanggal Mengikuti Timer Global</label>
              <label class="event-follow-toggle">
                <input type="checkbox" id="eventFormFollowGlobalTimer">
                <span class="event-follow-toggle-track" aria-hidden="true"></span>
                <span>Ikuti waktu timer acara</span>
              </label>
              <small id="eventFollowTimerHint" class="event-follow-timer-hint">Gunakan tanggal pelaksanaan khusus untuk kategori ini.</small>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">URL Gambar Tiket / Cover Kategori</label>
              <input type="url" class="form-input" id="eventFormTicketImage" placeholder="https://images.unsplash.com/...">
            </div>
            <div class="form-group">
              <label class="form-label">URL Gambar Medali Finisher</label>
              <input type="url" class="form-input" id="eventFormMedalImage" placeholder="https://images.unsplash.com/...">
            </div>
          </div>
          <div class="form-row event-image-previews">
            <div class="event-image-preview" id="eventTicketImagePreview" hidden>
              <img alt="Pratinjau gambar tiket">
              <span>Pratinjau cover tiket</span>
            </div>
            <div class="event-image-preview" id="eventMedalImagePreview" hidden>
              <img alt="Pratinjau gambar medali">
              <span>Pratinjau medali finisher</span>
            </div>
          </div>
          <div class="form-group">
            <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">
              <input type="checkbox" id="eventFormIsClosed">
              <span>Tutup pendaftaran untuk kategori ini</span>
            </label>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalEventBackdrop')">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveEventSubmit">
            <i class="fa-solid fa-floppy-disk"></i> Simpan Event
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL 2: PARTICIPANT CREATE / EDIT -->
  <div class="admin-modal-backdrop" id="modalParticipantBackdrop">
    <div class="admin-modal-dialog" style="max-width: 700px;">
      <div class="admin-modal-header">
        <h4 id="modalParticipantTitle"><i class="fa-solid fa-user-plus" style="color: var(--color-primary);"></i> Form Data Peserta</h4>
        <button class="admin-modal-close" onclick="closeAdminModal('modalParticipantBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form id="formParticipant">
        <input type="hidden" id="partFormId">
        <div class="admin-modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Pilih Kategori Event <span class="req">*</span></label>
              <select class="form-input" id="partFormEventId" required>
                <!-- Populated dynamically -->
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Nama BIB Dada <span class="req">*</span></label>
              <input type="text" class="form-input" id="partFormBibName" maxlength="15" placeholder="Maks. 15 karakter" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nama Lengkap (Sesuai KTP) <span class="req">*</span></label>
              <input type="text" class="form-input" id="partFormFullName" placeholder="Nama KTP" required>
            </div>
            <div class="form-group">
              <label class="form-label">Nomor Induk Kependudukan (NIK 16 Digit) <span class="req">*</span></label>
              <input type="text" class="form-input" id="partFormNik" maxlength="16" pattern="\\d{16}" placeholder="16 digit angka" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Jenis Kelamin <span class="req">*</span></label>
              <select class="form-input" id="partFormGender" required>
                <option value="MALE">Laki-Laki (MALE)</option>
                <option value="FEMALE">Perempuan (FEMALE)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Golongan Darah <span class="req">*</span></label>
              <select class="form-input" id="partFormBloodType" required>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ukuran Jersey <span class="req">*</span></label>
              <select class="form-input" id="partFormSize" required>
                <option value="S">S</option>
                <option value="M" selected>M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Tempat Lahir</label>
              <input type="text" class="form-input" id="partFormBirthPlace" placeholder="Tegal" value="Tegal">
            </div>
            <div class="form-group">
              <label class="form-label">Tanggal Lahir</label>
              <input type="date" class="form-input" id="partFormBirthDate" value="1995-05-15">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Alamat Lengkap</label>
            <input type="text" class="form-input" id="partFormAddress" placeholder="Jl. Pancasila No. 12" value="Jl. Pancasila No. 12, Tegal">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nama Kontak Darurat <span class="req">*</span></label>
              <input type="text" class="form-input" id="partFormEmergencyName" placeholder="Contoh: Budi Santoso" required>
            </div>
            <div class="form-group">
              <label class="form-label">No. HP Kontak Darurat <span class="req">*</span></label>
              <input type="tel" class="form-input" id="partFormEmergencyPhone" placeholder="Contoh: 081234567890" required>
            </div>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalParticipantBackdrop')">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSavePartSubmit">
            <i class="fa-solid fa-floppy-disk"></i> Simpan Data Peserta
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL 3: ORDER STATUS UPDATE -->
  <div class="admin-modal-backdrop" id="modalOrderBackdrop">
    <div class="admin-modal-dialog" style="max-width: 480px;">
      <div class="admin-modal-header">
        <h4><i class="fa-solid fa-file-pen" style="color: var(--color-primary);"></i> Update Status Transaksi</h4>
        <button class="admin-modal-close" onclick="closeAdminModal('modalOrderBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form id="formOrderStatus">
        <input type="hidden" id="orderFormId">
        <div class="admin-modal-body">
          <div class="form-group">
            <label class="form-label">Order ID</label>
            <input type="text" class="form-input" id="orderFormDisplayId" readonly style="background: #F1F5F9; font-weight: 700;">
          </div>
          <div class="form-group">
            <label class="form-label">Status Pembayaran Baru <span class="req">*</span></label>
            <select class="form-input" id="orderFormStatus" required>
              <option value="SETTLEMENT">SETTLEMENT (Pembayaran Berhasil / Lunas)</option>
              <option value="PENDING">PENDING (Menunggu Pembayaran)</option>
              <option value="CANCEL">CANCEL (Dibatalkan)</option>
              <option value="REFUND">REFUND (Pengembalian Dana)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Alasan / Catatan Perubahan</label>
            <input type="text" class="form-input" id="orderFormReason" placeholder="Contoh: Konfirmasi manual transfer bank">
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalOrderBackdrop')">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm btn-glow">
            <i class="fa-solid fa-check"></i> Perbarui Status
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="admin-modal-backdrop" id="modalOrderDetailsBackdrop">
    <div class="admin-modal-dialog" style="max-width: 900px; max-height: 90vh; overflow:auto;">
      <div class="admin-modal-header">
        <h4><i class="fa-solid fa-ticket" style="color:var(--color-primary);"></i> Detail Transaksi &amp; Tiket</h4>
        <button class="admin-modal-close" onclick="closeAdminModal('modalOrderDetailsBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="admin-modal-body" id="orderDetailsContent">
        <div style="text-align:center; color:#64748B; padding:24px;">Memuat detail tiket...</div>
      </div>
      <div class="admin-modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalOrderDetailsBackdrop')">Tutup</button>
      </div>
    </div>
  </div>

  <!-- MODAL 4: ADMIN USER CREATE / EDIT (SUPERADMIN ONLY) -->
  <div class="admin-modal-backdrop" id="modalAdminUserBackdrop">
    <div class="admin-modal-dialog" style="max-width: 520px;">
      <div class="admin-modal-header">
        <h4 id="modalAdminUserTitle"><i class="fa-solid fa-user-shield" style="color: var(--color-primary);"></i> Form Akun Petugas Admin</h4>
        <button class="admin-modal-close" onclick="closeAdminModal('modalAdminUserBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form id="formAdminUser">
        <input type="hidden" id="adminUserFormId">
        <div class="admin-modal-body">
          <div class="form-group">
            <label class="form-label">Nama Lengkap Petugas <span class="req">*</span></label>
            <input type="text" class="form-input" id="adminUserFullName" placeholder="Nama Petugas" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Username <span class="req">*</span></label>
              <input type="text" class="form-input" id="adminUserUsername" placeholder="username_admin" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email Petugas <span class="req">*</span></label>
              <input type="email" class="form-input" id="adminUserEmail" placeholder="admin@tegalrun.id" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Pilih Peran / Role Akses <span class="req">*</span></label>
            <select class="form-input" id="adminUserRoleId" required>
              <!-- Populated dynamically from /admin/roles -->
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Kata Sandi (Password) <span class="req" id="adminPasswordReq">*</span></label>
            <input type="password" class="form-input" id="adminUserPassword" placeholder="Minimal 8 karakter">
            <div class="form-hint" id="adminPasswordHint">Wajib diisi untuk akun baru. Kosongkan jika tidak ingin mengubah password saat edit.</div>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalAdminUserBackdrop')">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm btn-glow">
            <i class="fa-solid fa-user-check"></i> Simpan Akun Admin
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL: ROLE CREATE / EDIT PERMISSIONS (SUPERADMIN ONLY) -->
  <div class="admin-modal-backdrop" id="modalRoleBackdrop">
    <div class="admin-modal-dialog role-editor-dialog">
      <div class="admin-modal-header">
        <h4 id="modalRoleTitle"><i class="fa-solid fa-key" style="color: var(--color-primary);"></i> Atur Hak Akses Halaman Role</h4>
        <button class="admin-modal-close" onclick="closeAdminModal('modalRoleBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form id="formRole">
        <input type="hidden" id="roleFormId">
        <div class="admin-modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nama Role <span class="req">*</span></label>
              <input type="text" class="form-input" id="roleFormName" placeholder="CONTOH: SPONSORSHIP" required style="font-weight: 700; text-transform: uppercase;">
              <small class="form-hint" id="roleNameHint">Gunakan huruf kapital (A-Z) dan underscore (_).</small>
            </div>
            <div class="form-group">
              <label class="form-label">Deskripsi Singkat Tanggung Jawab</label>
              <input type="text" class="form-input" id="roleFormDesc" placeholder="Contoh: Mengelola promosi sponsor dan exposure website">
            </div>
          </div>

          <section class="role-editor-section">
            <div class="role-editor-section-heading">
              <div>
                <h5>Halaman Admin</h5>
                <p>Menentukan menu yang terlihat dan dapat dibuka oleh role ini.</p>
              </div>
              <div class="role-editor-actions">
                <button type="button" class="btn btn-outline btn-sm" id="btnSelectAllPages">Pilih Semua</button>
                <button type="button" class="btn btn-outline btn-sm" id="btnClearAllPages">Bersihkan</button>
                <button type="button" class="btn btn-outline btn-sm" id="btnPresetDefaultPages">Preset Role</button>
              </div>
            </div>
            <div id="roleModulesContainer" class="role-module-grid"></div>
          </section>

          <section class="role-editor-section">
            <div class="role-editor-section-heading">
              <div>
                <h5>Izin Aksi API</h5>
                <p>Atur kemampuan baca, tambah, ubah, dan hapus secara terpisah dari akses halaman.</p>
              </div>
            </div>
            <div id="roleApiPermissionsContainer" class="role-permission-grid"></div>
          </section>

          <section class="role-editor-section">
            <div class="role-editor-section-heading">
              <div>
                <h5>Widget Dashboard</h5>
                <p>Pilih ringkasan yang ditampilkan. Data keuangan hanya dikirim untuk widget yang diizinkan.</p>
              </div>
            </div>
            <div id="roleDashboardWidgetsContainer" class="role-widget-grid"></div>
          </section>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalRoleBackdrop')">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveRoleSubmit">
            <i class="fa-solid fa-floppy-disk"></i> Simpan Hak Akses ke Database
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL: KELOLA BENEFIT & FASILITAS EVENT (CRUD LENGKAP) -->
  <div class="admin-modal-backdrop" id="modalEventBenefitsBackdrop">
    <div class="admin-modal-dialog" style="max-width: 680px;">
      <div class="admin-modal-header">
        <div>
          <h4 id="benefitModalHeaderTitle"><i class="fa-solid fa-gift" style="color: var(--color-primary);"></i> Kelola Benefit & Race Pack</h4>
          <span style="font-size: 0.8rem; color: #64748B;" id="benefitModalSubtitle">Event Kategori</span>
        </div>
        <button class="admin-modal-close" onclick="closeAdminModal('modalEventBenefitsBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="admin-modal-body" style="padding-top: 16px;">
        <!-- Form Tambah / Edit Benefit -->
        <div class="glass-card" style="padding: 18px; border: 1px solid var(--border-glass-orange); background: #FFF7ED; border-radius: var(--radius-lg); margin-bottom: 20px;">
          <h5 style="font-size: 0.92rem; font-weight: 800; color: #0F172A; margin: 0 0 12px 0; display: flex; align-items: center; justify-content: space-between;">
            <span id="benefitFormTitle"><i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Fasilitas / Benefit Baru</span>
            <button type="button" class="btn btn-outline btn-sm" id="btnCancelBenefitEdit" style="display: none; padding: 2px 8px; font-size: 0.72rem;">Batal Edit</button>
          </h5>

          <form id="formEventBenefit">
            <input type="hidden" id="benefitFormEventId">
            <input type="hidden" id="benefitFormId">

            <div class="form-row">
              <div class="form-group" style="margin-bottom: 10px;">
                <label class="form-label">Nama Fasilitas / Benefit <span class="req">*</span></label>
                <input type="text" class="form-input" id="benefitFormName" placeholder="Contoh: Official Race Singlet Dry-Fit" required>
              </div>
              <div class="form-group" style="margin-bottom: 10px;">
                <label class="form-label">URL Gambar / Icon (Opsional)</label>
                <input type="url" class="form-input" id="benefitFormImage" placeholder="https://...">
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 12px;">
              <label class="form-label">Deskripsi Fasilitas <span class="req">*</span></label>
              <textarea class="form-input" id="benefitFormDesc" rows="2" placeholder="Contoh: Bahan dry-fit breathable anti-bakteri dengan sablon reflektif" required></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveBenefitSubmit">
                <i class="fa-solid fa-check"></i> Simpan Benefit
              </button>
            </div>
          </form>
        </div>

        <!-- Tabel Daftar Benefit yang Tersimpan di Database -->
        <div>
          <h5 style="font-size: 0.88rem; font-weight: 800; color: #0F172A; margin: 0 0 10px 0;">
            <i class="fa-solid fa-list-check" style="color: var(--color-primary);"></i> Daftar Benefit yang Tersimpan di Database (<span id="benefitListCount">0</span>)
          </h5>
          <div class="table-responsive" style="max-height: 280px; overflow-y: auto;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th style="width: 35%;">Nama Benefit</th>
                  <th>Deskripsi</th>
                  <th style="width: 80px; text-align: center;">Aksi</th>
                </tr>
              </thead>
              <tbody id="eventBenefitsTableBody">
                <!-- Populated dynamically via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="admin-modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalEventBenefitsBackdrop')">Tutup</button>
      </div>
    </div>
  </div>

  <!-- MODAL: JERSEY TYPES, IMAGE PREVIEW & SIZES -->
  <div class="admin-modal-backdrop" id="modalEventJerseysBackdrop">
    <div class="admin-modal-dialog" style="max-width: 760px;">
      <div class="admin-modal-header">
        <h4><i class="fa-solid fa-shirt" style="color: var(--color-primary);"></i> Kelola Jersey Kategori</h4>
        <button class="admin-modal-close" type="button" onclick="closeAdminModal('modalEventJerseysBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="admin-modal-body">
        <p id="jerseyModalSubtitle" class="form-hint"></p>
        <form id="formEventJersey">
          <input type="hidden" id="jerseyFormId">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="jerseyFormName">Nama / label jersey</label>
              <input class="form-input" id="jerseyFormName" type="text" maxlength="100" placeholder="Contoh: Jersey Pria" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="jerseyFormType">Tipe jersey</label>
              <input class="form-input" id="jerseyFormType" type="text" maxlength="100" placeholder="Contoh: Dry-Fit Race Tee" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="jerseyFormSizes">Ukuran tersedia</label>
            <input class="form-input" id="jerseyFormSizes" type="text" placeholder="XS, S, M, L, XL, XXL" required>
            <small class="form-hint">Pisahkan dengan koma. Setiap tipe jersey memiliki daftar ukuran sendiri.</small>
          </div>
          <div class="form-group">
            <label class="form-label" for="jerseyFormImage">Gambar untuk tipe jersey ini (opsional)</label>
            <input class="form-input" id="jerseyFormImage" type="url" maxlength="2048" placeholder="https://contoh.com/jersey.jpg">
            <small class="form-hint">Gambar kecil pada kartu tipe jersey menggunakan URL ini, bukan otomatis dari banner global. Edit tipe jersey dan simpan untuk menggantinya.</small>
            <div class="jersey-gallery-picker">
              <button type="button" class="btn btn-outline btn-sm" id="btnLoadJerseyGallery">Pilih dari galeri global</button>
              <label for="jerseyGalleryChoice" class="sr-only">Pilih gambar galeri global</label>
              <select id="jerseyGalleryChoice" class="form-input" hidden></select>
              <button type="button" class="btn btn-secondary btn-sm" id="btnUseJerseyGallery" hidden>Gunakan gambar ini</button>
              <small id="jerseyGalleryPickerStatus" class="form-hint" role="status"></small>
            </div>
          </div>
          <div class="jersey-image-preview" id="jerseyImagePreview" hidden>
            <img alt="Pratinjau gambar jersey">
            <span>Pratinjau jersey</span>
          </div>
          <p class="jersey-admin-error" id="jerseyImagePreviewError" role="status" hidden></p>
          <p class="form-hint">Banner desain jersey dan panduan ukuran diatur secara global di CMS, terpisah dari tipe dan ukuran jersey.</p>
          <div class="admin-modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" id="btnCancelJerseyEdit" hidden>Batal edit</button>
            <button type="submit" class="btn btn-primary btn-sm" id="btnSaveJersey">
              <i class="fa-solid fa-plus"></i> Tambah Jersey
            </button>
          </div>
        </form>
        <div class="jersey-admin-list" id="eventJerseysList" aria-live="polite"></div>
      </div>
    </div>
  </div>

  <!-- MODAL: ROUTE POINT CREATE / EDIT -->
  <div class="admin-modal-backdrop" id="modalRoutePointBackdrop">
    <div class="admin-modal-dialog" style="max-width: 640px;">
      <div class="admin-modal-header">
        <h4 id="modalRoutePointTitle"><i class="fa-solid fa-map-pin" style="color: var(--color-primary);"></i> Form Checkpoint Rute</h4>
        <button class="admin-modal-close" onclick="closeAdminModal('modalRoutePointBackdrop')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form id="formRoutePoint">
        <input type="hidden" id="routeFormId">
        <div class="admin-modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nomor Urutan <span class="req">*</span></label>
              <input type="number" class="form-input" id="routeFormOrderIndex" min="1" placeholder="1" required>
            </div>
            <div class="form-group">
              <label class="form-label">Jarak (Km) <span class="req">*</span></label>
              <input type="number" class="form-input" id="routeFormDistanceKm" step="0.1" min="0" placeholder="2.5" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Nama Checkpoint <span class="req">*</span></label>
            <input type="text" class="form-input" id="routeFormName" placeholder="Contoh: Start & Finish: Alun-Alun Kota Tegal" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Kategori <span class="req">*</span></label>
              <select class="form-input" id="routeFormCategory" required>
                <option value="ALL">ALL (10K &amp; 5K)</option>
                <option value="10K">10K Only</option>
                <option value="5K">5K Only</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Icon (Emoji / FA class)</label>
              <input type="text" class="form-input" id="routeFormIcon" placeholder="🏁 atau fa-flag">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Deskripsi Checkpoint</label>
            <textarea class="form-input" id="routeFormDescription" rows="2" placeholder="Keterangan titik checkpoint..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">URL Gambar Checkpoint (Opsional)</label>
            <input type="url" class="form-input" id="routeFormImage" placeholder="https://images.unsplash.com/...">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label style="display:flex;align-items:center;gap:8px;font-weight:600;cursor:pointer;">
                <input type="checkbox" id="routeFormIsWaterStation">
                <span>💧 Water Station</span>
              </label>
            </div>
            <div class="form-group">
              <label style="display:flex;align-items:center;gap:8px;font-weight:600;cursor:pointer;">
                <input type="checkbox" id="routeFormIsMedicalSpot">
                <span>🏥 Pos Medis</span>
              </label>
            </div>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalRoutePointBackdrop')">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveRouteSubmit" data-permission="routes:manage">
            <i class="fa-solid fa-floppy-disk"></i> Simpan Checkpoint
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL 5: CUSTOM ACTION CONFIRMATION DIALOG -->
  <div class="confirm-modal-backdrop" id="confirmModalBackdrop">
    <div class="confirm-modal-card">
      <div class="confirm-modal-icon warning" id="confirmModalIcon">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      <h4 class="confirm-modal-title" id="confirmModalTitle">Konfirmasi Tindakan</h4>
      <p class="confirm-modal-desc" id="confirmModalMessage">Apakah Anda yakin ingin melanjutkan tindakan ini?</p>
      <div class="confirm-modal-actions">
        <button type="button" class="btn btn-secondary btn-sm" id="btnConfirmCancel">Batal</button>
        <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnConfirmOk">Ya, Lanjutkan</button>
      </div>
    </div>
  </div>`;let F=!1,za=!1;async function Oa(){var o;const a=document.getElementById("backupTablesStatus"),i=document.getElementById("backupTableCount"),t=document.getElementById("backupTablesList");if(!(!t||F)){F=!0,a&&(a.textContent="Memuat daftar tabel...");try{const e=await qa("/admin/backups");if(!e||e.status!=="success"||!Array.isArray((o=e.data)==null?void 0:o.tables))throw new Error((e==null?void 0:e.message)||"Daftar tabel backup gagal dimuat.");const r=e.data.tables;i&&(i.textContent=String(r.length)),a&&(a.textContent="Semua tabel database akan disertakan pada kedua format backup."),t.innerHTML=r.map(l=>`<li>${Ha(l)}</li>`).join("")}catch(e){a&&(a.textContent=e.message||"Daftar tabel gagal dimuat."),i&&(i.textContent="-"),t.replaceChildren(),console.error("Gagal memuat cakupan backup database:",e)}finally{F=!1}}}async function ja(a){var r;if(!window.confirm(`Unduh backup ${a.toUpperCase()} seluruh database? File memuat data sensitif dan harus disimpan secara aman.`))return;const t=a==="sql"?"btnDownloadSqlBackup":"btnDownloadCsvBackup",o=document.getElementById(t),e=document.getElementById("backupTablesStatus");o&&(o.disabled=!0),e&&(e.textContent=`Menyiapkan backup ${a.toUpperCase()}...`);try{const l=await ne(`/admin/backups/${a}`,{method:"POST",credentials:"include",headers:{Accept:a==="csv"?"text/csv":"text/plain","X-Backup-Request":"download"}});if(l.status===401)throw Ga({revoke:!1}),new Error("Sesi admin telah berakhir. Silakan login kembali.");if(!l.ok){let b=`Unduhan backup gagal (HTTP ${l.status}).`;try{const g=await l.json();g.message&&(b=g.message)}catch{}throw new Error(b)}const v=await l.blob(),f=((r=(l.headers.get("Content-Disposition")||"").match(/filename="([^"]+)"/))==null?void 0:r[1])||`tegal-run-backup.${a}`,u=URL.createObjectURL(v),d=document.createElement("a");d.href=u,d.download=f,document.body.appendChild(d),d.click(),d.remove(),URL.revokeObjectURL(u),e&&(e.textContent=`Backup ${a.toUpperCase()} berhasil disiapkan.`)}catch(l){e&&(e.textContent=l.message||"Unduhan backup gagal."),console.error(`Gagal mengunduh backup ${a.toUpperCase()}:`,l)}finally{o&&(o.disabled=!1)}}function Ee(){var a,i,t;(a=document.getElementById("btnRefreshBackupOverview"))==null||a.addEventListener("click",Oa),(i=document.getElementById("btnDownloadSqlBackup"))==null||i.addEventListener("click",()=>ja("sql")),(t=document.getElementById("btnDownloadCsvBackup"))==null||t.addEventListener("click",()=>ja("csv")),window.addEventListener("admin:tab-changed",o=>{var e;((e=o.detail)==null?void 0:e.tabKey)==="backups"&&!za&&(za=!0,Oa())})}ee.getWebsiteSettings().then(a=>{a&&ie(a)});function Fe(a){Yn(a),Xn(a)}function Ae(a){["notifications","whatsapp-web"].includes($n.activeTab)&&Zn(a)}function Se(){ae("warning","Sesi Diakhiri","Superadmin telah mengakhiri sesi Anda. Silakan login kembali jika diperlukan."),Ga()}function Ua(){return[y("admin:racepack_confirmation_changed",Vn),y("admin:racepack_queue_changed",Fe),y("admin:whatsapp_session",Ae),y("admin:force_logout",Se)]}window.closeAdminModal=function(a){var i;(i=document.getElementById(a))==null||i.classList.remove("open")};function Pe(){const a=document.getElementById("adminPanesContainer")||document.querySelector(".admin-content-body");a&&a.children.length===0&&(a.innerHTML=[te,se,le,oe,re,de,ce,pe,me,ue,be,ge,ve,fe,he,ke,ye,xe].join(`
`));const i=document.getElementById("rpcInfoDialog");i&&i.parentElement!==document.body&&document.body.appendChild(i);const t=document.getElementById("adminModalsContainer");t&&t.children.length===0&&(t.innerHTML=we)}document.addEventListener("DOMContentLoaded",()=>{var t,o,e,r,l,v,x,f,u,d,b,g,A,S,P,T,C,B,I,R,L,N,M,D,K,z,O,j,U,G,q,H,W,J,_,Q,V,Y,X,$,Z,aa,na,ea,ia,ta,sa,la,oa,ra,da,ca,pa,ma,ua,ba,ga,va,fa,ha,ka,ya,xa,wa,Ea,Fa,Aa,Sa,Pa,Ta,Ca,Ba,Ia,Ra,La;Pe(),Ee(),(t=document.getElementById("adminLoginForm"))==null||t.addEventListener("submit",Wa),(o=document.getElementById("btnToggleSidebar"))==null||o.addEventListener("click",Ja),(e=document.getElementById("sidebarOverlay"))==null||e.addEventListener("click",_a),(r=document.getElementById("btnRefreshEvents"))==null||r.addEventListener("click",Qa),(l=document.getElementById("btnRefreshOrders"))==null||l.addEventListener("click",w),(v=document.getElementById("btnRefreshLogs"))==null||v.addEventListener("click",Va),(x=document.getElementById("btnExportCsv"))==null||x.addEventListener("click",Ya),(f=document.getElementById("btnOpenCreateEventModal"))==null||f.addEventListener("click",Xa),(u=document.getElementById("btnOpenCreateParticipantModal"))==null||u.addEventListener("click",$a),(d=document.getElementById("btnOpenCreateAdminModal"))==null||d.addEventListener("click",Za),(b=document.getElementById("btnOpenCreateRouteModal"))==null||b.addEventListener("click",an),(g=document.getElementById("btnOpenCreateRoleModal"))==null||g.addEventListener("click",nn),(A=document.getElementById("btnResetDefaultRoles"))==null||A.addEventListener("click",en),(S=document.getElementById("formEvent"))==null||S.addEventListener("submit",tn),(P=document.getElementById("formParticipant"))==null||P.addEventListener("submit",sn),(T=document.getElementById("formOrderStatus"))==null||T.addEventListener("submit",ln),(C=document.getElementById("formAdminUser"))==null||C.addEventListener("submit",on),(B=document.getElementById("formRole"))==null||B.addEventListener("submit",rn),(I=document.getElementById("btnSelectAllPages"))==null||I.addEventListener("click",()=>{document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(n=>{n.checked=!0,n.dispatchEvent(new Event("change",{bubbles:!0}))})}),(R=document.getElementById("btnClearAllPages"))==null||R.addEventListener("click",()=>{document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(n=>{n.checked=!1,n.dispatchEvent(new Event("change",{bubbles:!0}))})}),(L=document.getElementById("btnPresetDefaultPages"))==null||L.addEventListener("click",()=>{var m;const n=((m=document.getElementById("roleFormName"))==null?void 0:m.value.trim().toUpperCase())||"",p=dn.find(c=>c.name===n)?n==="ADMINISTRATOR"?["page:dashboard","page:events","page:participants","page:racepack","page:orders","page:notif-logs","page:whatsapp-web","page:cms","page:countdown","page:routes"]:n==="FINANCE"?["page:dashboard","page:orders","page:logs"]:n==="SPONSORSHIP"?["page:dashboard","page:cms","page:events","page:notif-logs"]:n==="RACEPACK_OFFICER"?["page:dashboard","page:racepack","page:participants","page:whatsapp-web"]:n==="GATE_OPERATOR"?["page:dashboard","page:participants","page:racepack"]:n==="RACE_DIRECTOR"?["page:dashboard","page:routes","page:countdown","page:participants","page:events","page:racepack"]:n==="TIMING_JUDGE"?["page:dashboard","page:participants","page:routes"]:n==="MEDICAL_OFFICER"?["page:dashboard","page:participants","page:routes"]:n==="VOLUNTEER"?["page:dashboard","page:participants","page:racepack"]:n==="BAG_DROP_OFFICER"?["page:dashboard","page:participants"]:n==="CUSTOMER_SERVICE"?["page:dashboard","page:whatsapp-web","page:notif-logs","page:participants","page:orders","page:racepack"]:["page:dashboard"]:["page:dashboard"];document.querySelectorAll('#roleApiPermissionsContainer input[type="checkbox"]:not(:disabled)').forEach(c=>{var h;c.checked=!1,(h=c.closest(".role-permission-option"))==null||h.classList.remove("checked")}),document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(c=>{const h=p.includes(c.value);c.checked=h,c.dispatchEvent(new Event("change",{bubbles:!0}))})}),(N=document.getElementById("formCmsSettings"))==null||N.addEventListener("submit",Na),(M=document.getElementById("formWebsiteCms"))==null||M.addEventListener("submit",Na),(D=document.getElementById("formNotificationSettings"))==null||D.addEventListener("submit",cn),(K=document.getElementById("btnSendTestNotif"))==null||K.addEventListener("click",pn),(z=document.getElementById("formEventBenefit"))==null||z.addEventListener("submit",mn),(O=document.getElementById("btnCancelBenefitEdit"))==null||O.addEventListener("click",un),(j=document.getElementById("formEventJersey"))==null||j.addEventListener("submit",bn),(U=document.getElementById("btnCancelJerseyEdit"))==null||U.addEventListener("click",gn),(G=document.getElementById("jerseyFormImage"))==null||G.addEventListener("input",vn),(q=document.getElementById("btnLoadJerseyGallery"))==null||q.addEventListener("click",fn),(H=document.getElementById("btnUseJerseyGallery"))==null||H.addEventListener("click",hn),(W=document.getElementById("formRoutePoint"))==null||W.addEventListener("submit",kn),(J=document.getElementById("routeSettingsForm"))==null||J.addEventListener("submit",yn),(_=document.getElementById("routeMapMode"))==null||_.addEventListener("change",k),(Q=document.getElementById("routeCheckpointMode"))==null||Q.addEventListener("change",k),(V=document.getElementById("routeSettingsMapImage"))==null||V.addEventListener("input",k),(Y=document.getElementById("routeSettingsCheckpointImage"))==null||Y.addEventListener("input",k),(X=document.getElementById("btnSaveGlobalCountdown"))==null||X.addEventListener("click",xn),($=document.getElementById("btnResetGlobalCountdown"))==null||$.addEventListener("click",wn),(Z=document.getElementById("btnToggleGlobalClosed"))==null||Z.addEventListener("click",En),(aa=document.getElementById("btnSaveWebsiteStatus"))==null||aa.addEventListener("click",Fn),(na=document.getElementById("maintenanceEnabled"))==null||na.addEventListener("change",An),(ea=document.getElementById("filterOrderStatus"))==null||ea.addEventListener("change",w),(ia=document.getElementById("searchOrder"))==null||ia.addEventListener("input",()=>{clearTimeout(window._searchOrderTimer),window._searchOrderTimer=setTimeout(w,300)}),document.querySelectorAll(".participant-tabs-nav .part-tab-btn").forEach(n=>{n.addEventListener("click",()=>{const s=n.getAttribute("data-tab");s&&Sn(s)})}),(ta=document.getElementById("filterParticipantCategory"))==null||ta.addEventListener("change",Ma),(sa=document.getElementById("searchParticipant"))==null||sa.addEventListener("input",()=>{clearTimeout(window._searchParticipantTimer),window._searchParticipantTimer=setTimeout(Ma,250)}),(la=document.getElementById("btnRefreshRacepackStats"))==null||la.addEventListener("click",()=>Pn({force:!0})),(oa=document.getElementById("btnRefreshRacepackConfirmations"))==null||oa.addEventListener("click",()=>Tn({force:!0})),(ra=document.getElementById("racepackConfirmationsTable"))==null||ra.addEventListener("click",n=>{const s=n.target.closest("[data-confirm-racepack-id]");s&&Cn(s.dataset.confirmRacepackId)});const a=document.getElementById("rpcInfoDialog");(da=document.getElementById("btnRpcInfo"))==null||da.addEventListener("click",()=>{a instanceof HTMLDialogElement&&!a.open&&a.showModal()}),(ca=document.getElementById("btnCloseRpcInfo"))==null||ca.addEventListener("click",()=>{a instanceof HTMLDialogElement&&a.close()}),a==null||a.addEventListener("click",n=>{n.target===a&&a instanceof HTMLDialogElement&&a.close()}),(pa=document.getElementById("btnStartRpcCamera"))==null||pa.addEventListener("click",Bn),(ma=document.getElementById("btnStopRpcCamera"))==null||ma.addEventListener("click",In),(ua=document.getElementById("btnTriggerNativeCamera"))==null||ua.addEventListener("click",Rn),(ba=document.getElementById("rpcNativeCameraInput"))==null||ba.addEventListener("change",Ln),(ga=document.getElementById("btnConfirmRpcCheckin"))==null||ga.addEventListener("click",Nn),(va=document.getElementById("btnRefreshRacepackQueue"))==null||va.addEventListener("click",()=>Mn({force:!0})),(fa=document.getElementById("btnRevertRpcCheckin"))==null||fa.addEventListener("click",Dn),(ha=document.getElementById("formRpcManualSearch"))==null||ha.addEventListener("submit",n=>{n.preventDefault();const s=document.getElementById("rpcSearchInput"),p=s?s.value.trim():"";p&&Kn(p)}),(ka=document.getElementById("btnGenerateWaQr"))==null||ka.addEventListener("click",zn),(ya=document.getElementById("btnDisconnectWa"))==null||ya.addEventListener("click",On),(xa=document.getElementById("btnRefreshNotifLogs"))==null||xa.addEventListener("click",E),(wa=document.getElementById("btnBatchSendNotif"))==null||wa.addEventListener("click",jn),(Ea=document.getElementById("filterNotifDeliveryStatus"))==null||Ea.addEventListener("change",E),(Fa=document.getElementById("searchNotifLogs"))==null||Fa.addEventListener("input",()=>{clearTimeout(window._searchNotifTimer),window._searchNotifTimer=setTimeout(E,300)}),(Aa=document.getElementById("btnRefreshWaWeb"))==null||Aa.addEventListener("click",Da),(Sa=document.getElementById("btnWaWebSync"))==null||Sa.addEventListener("click",Da),(Pa=document.getElementById("btnGoToWaQr"))==null||Pa.addEventListener("click",()=>Un("notifications")),(Ta=document.getElementById("btnSyncMidtransDashboard"))==null||Ta.addEventListener("click",Gn),(Ca=document.getElementById("btnSendWaDirectMsg"))==null||Ca.addEventListener("click",qn),(Ba=document.getElementById("waQuickTemplateSelect"))==null||Ba.addEventListener("change",Hn),(Ia=document.getElementById("btnQuickSendPaidTicket"))==null||Ia.addEventListener("click",()=>Ka()),(Ra=document.getElementById("btnQuickSendPending"))==null||Ra.addEventListener("click",()=>Ka()),(La=document.getElementById("waContactSearchInput"))==null||La.addEventListener("input",n=>{const s=(n.target.value||"").toLowerCase(),p=Wn.filter(m=>m.customerName.toLowerCase().includes(s)||m.customerPhone.includes(s)||m.ticketName.toLowerCase().includes(s));Jn(p)}),_n();let i=Ua();window.addEventListener("pagehide",()=>i.forEach(n=>n()),{once:!0}),window.addEventListener("pageshow",n=>{n.persisted&&(i.forEach(s=>s()),i=Ua())}),Qn()});
