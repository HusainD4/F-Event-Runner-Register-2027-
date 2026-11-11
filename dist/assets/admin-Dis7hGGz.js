import{a as na}from"./api-BxOmbn0x.js";import{c as Pt,d as Ft,g as Nt}from"./realtime-nkavtrDT.js";const Lt=`<div class="admin-tab-pane active" id="pane-dashboard">
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
        </div>`,Mt=`<div class="admin-tab-pane" id="pane-events">
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
        </div>`,Dt=`<div class="admin-tab-pane" id="pane-participants">
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
`,Rt=`<div class="admin-tab-pane" id="pane-racepack">
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
                    <strong style="font-size: 0.88rem; color: #0F172A;">Jersey Resmi Tegal Run 2027</strong>
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
`,$t=`<div class="admin-tab-pane" id="pane-racepack-view">\r
  <div class="admin-section">\r
    <div class="admin-section-header" style="align-items:center; gap:12px; flex-wrap:wrap;">\r
      <div>\r
        <h3><i class="fa-solid fa-list-check" style="color:var(--color-primary);"></i> Antrean Pengambilan Racepack</h3>\r
        <p>Pantau antrean peserta secara real-time. Verifikasi dan konfirmasi check-in dilakukan di halaman Pengambilan Racepack &amp; Check-in.</p>\r
        <small id="racepackQueueLastUpdated" style="color:#64748B;">Menunggu pembaruan...</small>\r
      </div>\r
      <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshRacepackQueue">\r
        <i class="fa-solid fa-rotate"></i> Segarkan\r
      </button>\r
    </div>\r
    <div id="racepackQueueContainer" style="display:grid; gap:14px;">\r
      <div class="glass-card" style="padding:24px; text-align:center; color:#64748B;">Memuat antrean peserta...</div>\r
    </div>\r
  </div>\r
</div>\r
`,Ot=`<div class="admin-tab-pane" id="pane-orders">
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
        </div>`,Kt=`<div class="admin-tab-pane" id="pane-countdown">
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
        </div>`,Ht=`<div class="admin-tab-pane" id="pane-bib-settings">
  <div class="admin-section">
    <div class="admin-section-header" style="flex-wrap: wrap; gap: 14px;">
      <div>
        <h3 style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-id-badge" style="color: #6366F1;"></i>
          Pengaturan Nomor BIB, Format QR &amp; Petunjuk E-Tiket
        </h3>
        <p>Tentukan kapan dan bagaimana nomor BIB digenerate, atur awalan QR Code terenkripsi (<code>BEBASNAMA|enkripsi_teks</code>), serta kelola teks petunjuk E-Tiket secara terpusat.</p>
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
          <h3 class="kpi-val" id="kpiQrFormatPreview" style="font-size: 1.15rem; font-family: monospace; color: #0F172A;">TEGALRUN|...</h3>
          <span class="kpi-sub" style="color: #059669;"><i class="fa-solid fa-lock"></i> AES-256 Enkripsi Aman</span>
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
                <input type="text" class="form-input" id="bibInputSuffix" placeholder="-2027" style="font-family: monospace;">
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
            Pengaturan Awalan (Prefix) &amp; Enkripsi QR Code
          </h4>
          <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 16px;">
            Ganti awalan QR Code dengan nama bebas. Format yang dihasilkan berupa <code>BEBASNAMA|enkripsi_teks</code> yang terlindungi enkripsi kriptografi AES-256.
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
                Contoh: <code>TEGALRUN</code>, <code>TR2027</code>, <code>TEGALBAHARI</code>, dll.
              </small>
            </div>

            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 12px 14px; font-size: 0.8rem; color: #166534;">
              <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; margin-bottom: 4px;">
                <i class="fa-solid fa-shield-check"></i> Keamanan Enkripsi Kriptografi Aktif
              </div>
              <div>QR Code yang di-generate menggunakan format <code><span id="qrPrefixExample">TEGALRUN</span>|&lt;ciphertext_aes256&gt;</code> untuk menjamin keaslian tiket dari pemalsuan.</div>
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
`,Ut=`<div class="admin-tab-pane" id="pane-cms">
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
                  <input type="text" class="form-input" id="cmsSiteTitle" placeholder="Tegal Run 2027 - Official Half Marathon">
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
                  <input type="text" class="form-input" id="cmsNavbarTitle" maxlength="80" placeholder="TEGAL RUN 2027">
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
                    <strong id="cmsNavbarTitlePreview">TEGAL RUN 2027</strong>
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
                <input type="text" class="form-input" id="cmsHeroTitle" placeholder="Tegal Run 2027: Lari Bersama Menembus Batas">
              </div>

              <div class="form-group">
                <label class="form-label">Subjudul Hero / Deskripsi Singkat</label>
                <textarea class="form-input" id="cmsHeroSubtitle" rows="2" placeholder="Kompetisi lari terbesar di Kota Bahari dengan standar race profesional..."></textarea>
              </div>
              <label class="cms-toggle">
                <input type="checkbox" id="cmsShowHero" checked>
                <span class="cms-toggle-switch" aria-hidden="true"></span>
                <span class="cms-toggle-label">Tampilkan section Hero di website</span>
              </label>
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
              <label class="cms-toggle cms-toggle-spaced">
                <input type="checkbox" id="cmsShowStats" checked>
                <span class="cms-toggle-switch" aria-hidden="true"></span>
                <span class="cms-toggle-label">Tampilkan banner statistik</span>
              </label>
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
              <label class="cms-toggle">
                <input type="checkbox" id="cmsShowRoute" checked>
                <span class="cms-toggle-switch" aria-hidden="true"></span>
                <span class="cms-toggle-label">Tampilkan section rute</span>
              </label>
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
              <label class="cms-toggle cms-toggle-spaced">
                <input type="checkbox" id="cmsShowFaq" checked>
                <span class="cms-toggle-switch" aria-hidden="true"></span>
                <span class="cms-toggle-label">Tampilkan section FAQ</span>
              </label>
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
                <label class="cms-toggle">
                  <input type="checkbox" id="cmsShowFacilities" checked>
                  <span class="cms-toggle-switch" aria-hidden="true"></span>
                  <span class="cms-toggle-label">Tampilkan section fasilitas</span>
                </label>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Judul Section Tiket</label>
                  <input type="text" class="form-input" id="cmsTicketsTitle" placeholder="Pilih Tantangan Jarak Lari Anda">
                </div>
                <div class="form-group">
                  <label class="form-label">URL Gambar Preview Medali Finisher</label>
                  <input type="url" class="form-input" id="cmsMedalImage" placeholder="https://images.unsplash.com/...">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Deskripsi Section Tiket</label>
                <textarea class="form-input" id="cmsTicketsDesc" rows="2" placeholder="Tersedia kategori kompetitif bagi atlet dan fun run santai..."></textarea>
              </div>
              <label class="cms-toggle">
                <input type="checkbox" id="cmsShowTickets" checked>
                <span class="cms-toggle-switch" aria-hidden="true"></span>
                <span class="cms-toggle-label">Tampilkan section kategori tiket</span>
              </label>
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
                <label class="form-label">Judul Utama Legalitas</label>
                <input type="text" class="form-input" id="cmsLegalTitle" placeholder="Perizinan & Kepatuhan Hukum Resmi">
              </div>

              <div class="form-group">
                <label class="form-label">Deskripsi Legalitas</label>
                <textarea class="form-input" id="cmsLegalDesc" rows="2" placeholder="Tegal Run 2027 diselenggarakan dengan izin resmi pemerintah daerah..."></textarea>
              </div>

              <!-- Dynamic Legal Repeater Container -->
              <div style="margin-top: 16px;">
                <label class="form-label" style="font-weight: 700; color: var(--color-primary);">Daftar Poin Kepatuhan Hukum (Dynamic Cards)</label>
                <div id="cmsLegalItemsContainer" class="cms-repeater-grid">
                  <!-- Di-render oleh cms.js -->
                </div>
                <label class="cms-toggle cms-toggle-spaced">
                  <input type="checkbox" id="cmsShowLegal" checked>
                  <span class="cms-toggle-switch" aria-hidden="true"></span>
                  <span class="cms-toggle-label">Tampilkan section perizinan &amp; kepatuhan</span>
                </label>
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
                <input type="text" class="form-input" id="cmsFooterCopyright" placeholder="Hak Cipta Terpelihara © 2027 Panitia Resmi Tegal Run.">
              </div>
              <label class="cms-toggle">
                <input type="checkbox" id="cmsShowFooter" checked>
                <span class="cms-toggle-switch" aria-hidden="true"></span>
                <span class="cms-toggle-label">Tampilkan footer website</span>
              </label>

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
        </div>`,_t=`<div class="admin-tab-pane" id="pane-admins" data-role="SUPERADMIN">
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
        </div>`,Gt=`<div class="admin-tab-pane" id="pane-routes">
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
</div>`,jt=`<div class="admin-tab-pane" id="pane-notifications">
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
                    <input type="text" class="form-input" id="notifSettingEmailFromName" placeholder="Panitia Tegal Run 2027">
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
                  <input type="text" class="form-input" id="testNotifMessage" value="Ini adalah pesan tes notifikasi otomatis dari sistem Tegal Run 2027.">
                </div>
                <button type="button" class="btn btn-secondary" id="btnSendTestNotif" data-permission="notifications:manage">
                  <i class="fa-solid fa-vial"></i> Kirim Tes
                </button>
              </div>
            </div>
          </div>
        </div>`,zt=`<div class="admin-tab-pane" id="pane-notif-logs">
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
        </div>`,qt=`<div class="admin-tab-pane" id="pane-whatsapp-web">
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
        </div>`,Wt=`<div class="admin-tab-pane" id="pane-logs">
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
        </div>`,Jt=`<div class="admin-tab-pane" id="pane-role-monitoring" data-role="SUPERADMIN">\r
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
`,Qt=`<!-- MODAL 1: EVENT CREATE / EDIT -->
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
            <input type="text" class="form-input" id="eventFormTicketName" placeholder="Contoh: 10K Open Marathon 2027" required>
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
            <label class="form-label" for="jerseyFormImage">Link gambar jersey (opsional)</label>
            <input class="form-input" id="jerseyFormImage" type="url" maxlength="2048" placeholder="https://contoh.com/jersey.jpg">
          </div>
          <div class="jersey-image-preview" id="jerseyImagePreview" hidden>
            <img alt="Pratinjau gambar jersey">
            <span>Pratinjau jersey</span>
          </div>
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
  </div>`,f={token:localStorage.getItem("tegal_admin_token")||null,profile:null,activeTab:"dashboard",globalSettings:{eventCountdownDate:null,isRegistrationClosed:!1},events:[],participants:[],orders:[],admins:[],roles:[],auditLogs:[]};function p(t="success",a="",e=""){const n=document.getElementById("adminToastContainer");if(!n)return;const i=document.createElement("div");i.className=`toast toast-${t}`,i.innerHTML=`
    <div class="toast-icon">
      <i class="${t==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${a}</h5>
      <p>${e}</p>
    </div>
  `,n.appendChild(i),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),300)},4e3)}function K({title:t="Konfirmasi Tindakan",message:a="Apakah Anda yakin ingin melanjutkan tindakan ini?",confirmText:e="Ya, Lanjutkan",cancelText:n="Batal",type:i="warning"}={}){return new Promise(s=>{const o=document.getElementById("confirmModalBackdrop"),r=document.getElementById("confirmModalTitle"),l=document.getElementById("confirmModalMessage"),c=document.getElementById("confirmModalIcon"),m=document.getElementById("btnConfirmOk"),d=document.getElementById("btnConfirmCancel");if(!o){s(window.confirm(a));return}r&&(r.textContent=t),l&&(l.textContent=a),m&&(m.textContent=e),d&&(d.textContent=n),c&&(c.className=`confirm-modal-icon ${i}`,c.innerHTML=i==="danger"?'<i class="fa-solid fa-trash-can"></i>':'<i class="fa-solid fa-triangle-exclamation"></i>'),m&&(m.style.background=i==="danger"?"#EF4444":"",m.style.borderColor=i==="danger"?"#EF4444":""),o.classList.add("open");const u=()=>{y(),s(!0)},g=()=>{y(),s(!1)},y=()=>{o.classList.remove("open"),m==null||m.removeEventListener("click",u),d==null||d.removeEventListener("click",g)};m==null||m.addEventListener("click",u),d==null||d.addEventListener("click",g)})}function b(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function H(t){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(t||0)}function te(t){if(!t||!t.role)return;const a=t.role.name||"",e=Array.isArray(t.role.permissions)?t.role.permissions:[],n=a==="SUPERADMIN",i=e.includes("dashboard:configured"),s=document.getElementById("pane-dashboard");s&&(s.style.display=n||e.includes("page:dashboard")?"":"none"),document.querySelectorAll("[data-role]").forEach(o=>{o.getAttribute("data-role")==="SUPERADMIN"&&!n?o.style.display="none":o.style.display=""}),document.querySelectorAll("[data-page]").forEach(o=>{if(n){o.style.display="";return}const r=o.getAttribute("data-page");e.includes(r)?o.style.display="":o.style.display="none"}),document.querySelectorAll("[data-permission]").forEach(o=>{if(n){o.style.display="";return}const r=o.getAttribute("data-permission"),[l]=r.split(":");e.includes(r)||e.includes(`${l}:*`)?o.style.display="":o.style.display="none"}),document.querySelectorAll("[data-dashboard-widget]").forEach(o=>{const r=o.getAttribute("data-dashboard-widget"),l=n||e.includes("page:dashboard"),c=n||!i||e.includes(r),m=o.getAttribute("data-dashboard-permission"),d=(o.getAttribute("data-dashboard-permission-any")||"").split(",").map(y=>y.trim()).filter(Boolean),u=y=>{const[v]=y.split(":");return e.includes(y)||e.includes(`${v}:*`)},g=!m&&d.length===0||n||m&&u(m)||d.some(u);o.style.display=l&&c&&g?"":"none"}),document.querySelectorAll("[data-dashboard-link]").forEach(o=>{const r=o.getAttribute("data-dashboard-link");o.style.display=n||e.includes(r)?"":"none"}),ut()}function ut(){document.querySelectorAll(".dashboard-insights-grid").forEach(t=>{const a=Array.from(t.children).filter(s=>s.style.display!=="none"),e=Number(t.dataset.dashboardColumns)||2,n=window.innerWidth<=640?1:window.innerWidth<=1100?2:3,i=Math.min(a.length,e,n);t.style.display=i?"grid":"none",t.style.setProperty("--dashboard-columns",String(i||1))})}window.addEventListener("resize",ut,{passive:!0});async function h(t,a={},e=null){let n={};typeof a=="string"?n={method:a,...e?{body:JSON.stringify(e)}:{}}:n=a||{};const i={Accept:"application/json","Content-Type":"application/json",...n.headers};f.token&&(i.Authorization=`Bearer ${f.token}`);try{const s=await na(t,{...n,headers:i});if(s.status===401)throw ke(),new Error("Sesi autentikasi telah habis. Silakan login kembali.");const o=await s.text();let r;try{r=o?JSON.parse(o):{}}catch{throw new Error(`Server tidak merespons JSON (HTTP ${s.status}). Pastikan backend aktif.`)}return r}catch(s){throw s.message.includes("Failed to fetch")||s.message.includes("NetworkError")?new Error("Gagal terhubung ke server backend. Silakan coba beberapa saat lagi."):s}}let we=null;function tt(t){const a=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Jakarta",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(t);return["year","month","day"].map(e=>{var n;return(n=a.find(i=>i.type===e))==null?void 0:n.value}).join("-")}function ia(t){if(!t)return"UPCOMING";const a=new Date(t);return Number.isNaN(a.getTime())||Date.now()<a.getTime()?"UPCOMING":tt(new Date)===tt(a)?"RACE_DAY":"COMPLETED"}function Vt(t=f.globalSettings||{}){const a=ia(t.eventCountdownDate);return a==="UPCOMING"&&t.manualRegistrationClosed?"CLOSED":a}async function sa(){try{const t=await h("/admin/settings/countdown");if(t&&(t.status==="success"||t.success)){const a=t.data||t.settings||{};f.globalSettings=a,Oe(a)}}catch(t){console.warn("Gagal memuat pengaturan global:",t)}}function Ye(t){const a=document.getElementById("adminCountdownLivePreview");if(!a)return;if(we&&(clearInterval(we),we=null),!t){a.innerHTML='<span style="color: #f59e0b;"><i class="fa-solid fa-clock-rotate-left"></i> TANGGAL BELUM DITENTUKAN</span> — Tampilan di website akan menampilkan status placeholder.';return}const e=new Date(t).getTime();if(isNaN(e)){a.innerHTML='<span style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> FORMAT TANGGAL TIDAK VALID</span>';return}const n=()=>{const i=Date.now(),s=e-i,o=ia(t);if(gt(),s<=0){a.innerHTML=o==="RACE_DAY"?'<span style="color: #f97316;"><i class="fa-solid fa-flag-checkered"></i> ACARA TELAH DIMULAI — PENDAFTARAN OTOMATIS DITUTUP</span>':'<span style="color: #ef4444;"><i class="fa-solid fa-ticket-slash"></i> HARI ACARA TELAH LEWAT — SOLD</span>';return}const r=Math.floor(s/(1e3*60*60*24)),l=Math.floor(s%(1e3*60*60*24)/(1e3*60*60)),c=Math.floor(s%(1e3*60*60)/(1e3*60)),m=Math.floor(s%(1e3*60)/1e3),d=new Date(t).toLocaleString("id-ID",{dateStyle:"full",timeStyle:"short"});a.innerHTML=`<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> AKTIF:</span> ${r} Hari : ${l} Jam : ${c} Menit : ${m} Detik (${d} WIB)`};n(),we=setInterval(n,1e3)}function Oe(t={}){const a=document.getElementById("globalCountdownInput");if(a){if(t.eventCountdownDate){const e=new Date(t.eventCountdownDate);if(isNaN(e.getTime()))a.value="";else{const n=i=>String(i).padStart(2,"0");a.value=`${e.getFullYear()}-${n(e.getMonth()+1)}-${n(e.getDate())}T${n(e.getHours())}:${n(e.getMinutes())}`}}else a.value="";a.removeEventListener("change",nt),a.addEventListener("change",nt)}Ye(t.eventCountdownDate),gt(t)}function gt(t=f.globalSettings||{}){const a=document.getElementById("globalStatusBadge"),e=document.getElementById("btnToggleGlobalClosed"),n=Vt(t);a&&(n==="RACE_DAY"?(a.className="event-status-tag closed",a.innerHTML='<i class="fa-solid fa-flag-checkered"></i> Acara Telah Dimulai'):n==="COMPLETED"?(a.className="event-status-tag closed",a.innerHTML='<i class="fa-solid fa-ticket-slash"></i> Event Selesai • SOLD'):n==="CLOSED"?(a.className="event-status-tag closed",a.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Resmi Ditutup'):(a.className="event-status-tag open",a.innerHTML='<i class="fa-solid fa-signal"></i> Pendaftaran Aktif / Buka')),e&&(n!=="UPCOMING"&&n!=="CLOSED"?(e.className="btn btn-secondary btn-sm",e.innerHTML='<i class="fa-solid fa-lock"></i> Ditutup Otomatis oleh Timer',e.disabled=!0,e.title="Pendaftaran hanya dapat dibuka kembali dengan mengubah tanggal countdown."):n==="CLOSED"?(e.disabled=!1,e.title="",e.className="btn btn-secondary btn-sm",e.innerHTML='<i class="fa-solid fa-lock-open"></i> Buka Kembali Pendaftaran'):(e.disabled=!1,e.title="",e.className="btn btn-outline btn-sm",e.innerHTML='<i class="fa-solid fa-lock"></i> Tutup Seluruh Pendaftaran'))}function nt(t){const a=t.target.value;Ye(a?new Date(a).toISOString():null)}async function Yt(){var s;const t=document.getElementById("globalCountdownInput");if(!t||!t.value){p("warning","Peringatan","Harap tentukan tanggal dan waktu countdown terlebih dahulu.");return}const a=new Date(t.value);if(Number.isNaN(a.getTime())){p("warning","Tanggal Tidak Valid","Periksa kembali tanggal dan waktu Race Day.");return}const e=a.toISOString(),n=document.getElementById("btnSaveGlobalCountdown"),i=n==null?void 0:n.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const o=((s=f.globalSettings)==null?void 0:s.manualRegistrationClosed)||!1,r=await h("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:e,isRegistrationClosed:o})});r&&(r.status==="success"||r.success)?(f.globalSettings||(f.globalSettings={}),f.globalSettings={...f.globalSettings,...r.data},Oe(f.globalSettings),p("success","Tersimpan","Tanggal target race day berhasil diperbarui!")):p("error","Gagal",r.message||"Gagal menyimpan pengaturan countdown.")}catch(o){p("error","Kesalahan Server",o.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}async function Xt(){var a;if(await K({title:"Kosongkan Tanggal Countdown?",message:'Apakah Anda yakin ingin mengosongkan tanggal hitung mundur? Landing page akan menampilkan status "TANGGAL BELUM DITENTUKAN".',confirmText:"Ya, Kosongkan Tanggal",type:"warning"}))try{const e=((a=f.globalSettings)==null?void 0:a.manualRegistrationClosed)||!1,n=await h("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:null,isRegistrationClosed:e})});if(n&&(n.status==="success"||n.success)){f.globalSettings||(f.globalSettings={}),f.globalSettings={...f.globalSettings,...n.data};const i=document.getElementById("globalCountdownInput");i&&(i.value=""),Oe(f.globalSettings),p("success","Dikosongkan","Tanggal target race day telah dikosongkan.")}else p("error","Gagal",n.message||"Gagal mengosongkan tanggal.")}catch(e){p("error","Kesalahan Server",e.message)}}async function Zt(){var i,s,o;const t=((i=f.globalSettings)==null?void 0:i.manualRegistrationClosed)||!1;if(ia((s=f.globalSettings)==null?void 0:s.eventCountdownDate)!=="UPCOMING"){p("warning","Timer Event Aktif","Pendaftaran ditutup otomatis. Ubah tanggal countdown jika ingin membuka kembali pendaftaran.");return}const e=!t;if(await K({title:e?"Tutup Seluruh Pendaftaran?":"Buka Kembali Pendaftaran?",message:e?"Apakah Anda yakin ingin MENUTUP seluruh pendaftaran website? Calon peserta tidak akan dapat mendaftar lagi.":"Apakah Anda ingin MEMBUKA KEMBALI seluruh pendaftaran website?",confirmText:e?"Ya, Tutup Pendaftaran":"Ya, Buka Pendaftaran",type:e?"danger":"warning"}))try{const r=((o=f.globalSettings)==null?void 0:o.eventCountdownDate)||null,l=await h("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:r,isRegistrationClosed:e})});l&&(l.status==="success"||l.success)?(f.globalSettings||(f.globalSettings={}),f.globalSettings={...f.globalSettings,...l.data},Oe(f.globalSettings),p("success","Status Berubah",e?"Pendaftaran resmi DITUTUP!":"Pendaftaran resmi DIBUKA!")):p("error","Gagal",l.message||"Gagal mengubah status pendaftaran.")}catch(r){p("error","Kesalahan Server",r.message)}}let it=!1;async function bt(){var t;if(!it)try{const a=await h("/admin/settings/countdown");if(!a||a.status!=="success"&&!a.success)throw new Error((a==null?void 0:a.message)||"Gagal memuat tanggal timer global.");f.globalSettings=a.data||a.settings||{},it=!0,(t=document.getElementById("modalEventBackdrop"))!=null&&t.classList.contains("open")&&oa()}catch(a){p("error","Timer Tidak Dapat Dimuat",a.message)}}async function W(){try{const t=await h("/admin/events");if(t.status==="success"){f.events=t.data,en(t.data),Ui();const a=document.getElementById("partFormEventId");a&&(a.innerHTML=t.data.map(n=>`
          <option value="${n.id}">${b(n.ticketName)} (${b(n.category)})</option>
        `).join(""));const e=document.getElementById("navEventsCount");e&&(e.textContent=t.data.length)}}catch(t){console.error("Failed to load events:",t)}}function en(t){const a=document.getElementById("adminEventsContainer");if(a){if(t.length===0){a.innerHTML='<div style="grid-column: span 2; text-align: center; padding: 40px; color: #94A3B8;">Belum ada event/kategori yang ditambahkan.</div>';return}a.innerHTML="",t.forEach(e=>{var m,d;const n=typeof e.registrationClosed=="boolean"?e.registrationClosed:!!e.isClosed,i=!!e.registrationClosedByTimer,s=e.registrationPhase||(e.isClosed?"CLOSED":"UPCOMING"),o=s==="RACE_DAY"?"Acara Telah Dimulai":s==="COMPLETED"?"SOLD":n?"Ditutup":"Dibuka",r=document.createElement("div");r.className=`admin-event-card ${n?"closed-event":""}`;const l=e.eventDate?`${new Date(e.eventDate).toLocaleString("id-ID",{dateStyle:"long",timeStyle:"short",timeZone:"Asia/Jakarta"})} WIB`:"Belum diatur",c=e.ticketImage||e.medalImage;r.innerHTML=`
      <div class="admin-event-card-header">
        <div class="admin-event-image">
          ${c?`<img src="${b(c)}" alt="${b(e.ticketName)}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('admin-event-image-empty')">`:'<i class="fa-solid fa-person-running" aria-hidden="true"></i>'}
        </div>
        <div>
          <h4 class="admin-event-title">
            ${b(e.ticketName)}
          </h4>
          <span class="admin-event-meta">
            Kategori: <strong>${b(e.category)}</strong> • Pelaksanaan: <strong>${b(l)}</strong>
            ${e.followGlobalTimer?'<span class="admin-event-timer-badge"><i class="fa-solid fa-link"></i> Ikuti timer</span>':""}
          </span>
        </div>
        <span class="event-status-tag ${n?"closed":"open"}">
          <i class="${n?"fa-solid fa-lock":"fa-solid fa-lock-open"}"></i>
          ${o}
        </span>
      </div>

      <div class="admin-event-form">
        <div class="form-row">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Sisa Kuota Tiket (Stok)</label>
            <input type="number" class="form-input" id="eventStock-${e.id}" value="${e.stock}" min="0">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Harga Tiket (Rp)</label>
            <input type="number" class="form-input" id="eventPrice-${e.id}" value="${e.price}" min="0" step="5000">
          </div>
        </div>

        <div class="admin-event-actions">
          <div class="admin-event-actions-primary">
            <button class="btn btn-primary btn-sm btn-quick-save-event" data-id="${e.id}" data-permission="events:update">
              <i class="fa-solid fa-check"></i> Simpan
            </button>
            <button class="btn btn-secondary btn-sm btn-edit-event" data-id="${e.id}" data-permission="events:update">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button class="btn btn-outline btn-sm btn-manage-benefits" data-id="${e.id}" data-name="${b(e.ticketName)}" data-permission="benefits:manage" title="Kelola Fasilitas / Benefit Tiket" style="color: #4F46E5; border-color: #C7D2FE;">
              <i class="fa-solid fa-gift"></i> Benefit (${e.benefits?e.benefits.length:((m=e._count)==null?void 0:m.benefits)||0})
            </button>
            <button class="btn btn-outline btn-sm btn-manage-jerseys" data-id="${e.id}" data-name="${b(e.ticketName)}" data-permission="jerseys:manage" title="Kelola tipe dan ukuran jersey">
              <i class="fa-solid fa-shirt"></i> Jersey (${((d=e.jerseys)==null?void 0:d.length)||0})
            </button>
            <button class="btn btn-outline btn-sm btn-delete-event" data-id="${e.id}" data-name="${b(e.ticketName)}" data-permission="events:delete" style="color: #EF4444; border-color: #FECACA;">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>

          <button class="btn ${e.isClosed?"btn-secondary":"btn-outline"} btn-sm btn-toggle-close-event" data-id="${e.id}" data-closed="${e.isClosed}" data-timer-closed="${i}" data-permission="events:update" ${i?'disabled title="Kategori ditutup oleh timer. Perbarui tanggal atau aktifkan Ikuti Timer Global untuk menyinkronkannya."':""}>
            <i class="${i?"fa-solid fa-stopwatch":e.isClosed?"fa-solid fa-lock-open":"fa-solid fa-lock"}"></i>
            ${i?"Ditutup oleh Timer":e.isClosed?"Buka Kategori":"Tutup Kategori"}
          </button>
        </div>
      </div>
    `,a.appendChild(r)}),document.querySelectorAll(".btn-quick-save-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=parseInt(document.getElementById(`eventStock-${n}`).value,10),s=parseFloat(document.getElementById(`eventPrice-${n}`).value);await st(n,{stock:i,price:s},"Kuota dan harga kategori berhasil diperbarui!")})}),document.querySelectorAll(".btn-toggle-close-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),s=!(e.getAttribute("data-closed")==="true");await K({title:s?"Tutup Kategori Event?":"Buka Kategori Event?",message:`Apakah Anda yakin ingin ${s?"MENUTUP":"MEMBUKA"} pendaftaran untuk kategori event ini?`,confirmText:s?"Ya, Tutup Kategori":"Ya, Buka Kategori",type:s?"danger":"warning"})&&await st(n,{isClosed:s},s?"Kategori ditutup!":"Kategori dibuka!")})}),document.querySelectorAll(".btn-manage-benefits").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");yt(n,i)}),document.querySelectorAll(".btn-manage-jerseys").forEach(n=>{n.addEventListener("click",()=>{ft(n.dataset.id,n.dataset.name||"Kategori")})})}),document.querySelectorAll(".btn-edit-event").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=f.events.find(s=>s.id===n);i&&tn(i)})}),document.querySelectorAll(".btn-delete-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await K({title:"Hapus Kategori Event?",message:`PERINGATAN: Apakah Anda yakin ingin menghapus kategori "${i}"? Seluruh data yang terkait akan dihapus permanen.`,confirmText:"Ya, Hapus Permanen",type:"danger"})&&await sn(n)})}),te(f.profile)}}function an(){var t;document.getElementById("eventFormId").value="",document.getElementById("modalEventTitle").innerHTML='<i class="fa-solid fa-calendar-plus" style="color: var(--color-primary);"></i> Tambah Event Baru',document.getElementById("eventFormTicketName").value="",document.getElementById("eventFormCategory").value="10K",document.getElementById("eventFormStock").value=500,document.getElementById("eventFormPrice").value=25e4,document.getElementById("eventFormDate").value="",document.getElementById("eventFormFollowGlobalTimer").checked=!1,document.getElementById("eventFormTicketImage").value="",document.getElementById("eventFormMedalImage").value="",document.getElementById("eventFormIsClosed").checked=!1,oa(),(t=document.getElementById("modalEventBackdrop"))==null||t.classList.add("open"),bt()}function tn(t){var a;if(document.getElementById("eventFormId").value=t.id,document.getElementById("modalEventTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Event: ${b(t.ticketName)}`,document.getElementById("eventFormTicketName").value=t.ticketName,document.getElementById("eventFormCategory").value=t.category,document.getElementById("eventFormStock").value=t.stock,document.getElementById("eventFormPrice").value=t.price,document.getElementById("eventFormTicketImage").value=t.ticketImage||"",document.getElementById("eventFormMedalImage").value=t.medalImage||"",document.getElementById("eventFormFollowGlobalTimer").checked=!!t.followGlobalTimer,t.eventDate){const e=new Date(t.eventDate),n=i=>String(i).padStart(2,"0");document.getElementById("eventFormDate").value=`${e.getFullYear()}-${n(e.getMonth()+1)}-${n(e.getDate())}T${n(e.getHours())}:${n(e.getMinutes())}`}else document.getElementById("eventFormDate").value="";document.getElementById("eventFormIsClosed").checked=!!t.isClosed,oa(),(a=document.getElementById("modalEventBackdrop"))==null||a.classList.add("open"),bt()}function oa(){const t=document.getElementById("eventFormFollowGlobalTimer"),a=document.getElementById("eventFormDate"),e=document.getElementById("eventFollowTimerHint"),n=()=>{var o;const s=(o=f.globalSettings)==null?void 0:o.eventCountdownDate;a.disabled=t.checked,t.checked&&s?e.textContent=`Kategori ini otomatis memakai ${new Date(s).toLocaleString("id-ID",{dateStyle:"long",timeStyle:"short",timeZone:"Asia/Jakarta"})} WIB dari timer global.`:t.checked?e.textContent="Atur tanggal countdown di halaman Countdown terlebih dahulu.":e.textContent="Gunakan tanggal pelaksanaan khusus untuk kategori ini."};t.onchange=n,n();const i=(s,o)=>{const r=document.getElementById(s),l=document.getElementById(o),c=l.querySelector("img"),m=()=>{const d=r.checkValidity()&&/^https?:\/\//i.test(r.value.trim());l.hidden=!d,d?c.src=r.value:c.removeAttribute("src")};r.oninput=m,m()};i("eventFormTicketImage","eventTicketImagePreview"),i("eventFormMedalImage","eventMedalImagePreview")}async function nn(t){var u;t.preventDefault();const a=document.getElementById("eventFormId").value,e=document.getElementById("eventFormTicketName").value.trim(),n=document.getElementById("eventFormCategory").value.trim(),i=parseInt(document.getElementById("eventFormStock").value,10),s=parseFloat(document.getElementById("eventFormPrice").value),o=document.getElementById("eventFormDate").value,r=document.getElementById("eventFormTicketImage").value.trim()||null,l=document.getElementById("eventFormMedalImage").value.trim()||null,c=document.getElementById("eventFormIsClosed").checked,m=document.getElementById("eventFormFollowGlobalTimer").checked,d={ticketName:e,category:n,stock:i,price:s,ticketImage:r,medalImage:l,eventDate:m?null:o?new Date(o).toISOString():null,followGlobalTimer:m,isClosed:c};try{let g;a?g=await h(`/admin/events/${a}`,{method:"PUT",body:JSON.stringify(d)}):g=await h("/admin/events",{method:"POST",body:JSON.stringify(d)}),g.status==="success"?(p("success","Berhasil",a?"Event berhasil diperbarui!":"Event baru berhasil ditambahkan!"),(u=document.getElementById("modalEventBackdrop"))==null||u.classList.remove("open"),W()):p("error","Gagal",g.message||"Validasi gagal")}catch(g){p("error","Kesalahan Server",g.message)}}async function st(t,a,e){try{const n=await h(`/admin/events/${t}`,{method:"PUT",body:JSON.stringify(a)});n.status==="success"?(p("success","Berhasil",e),W()):p("error","Gagal",n.message)}catch(n){p("error","Kesalahan Server",n.message)}}async function sn(t){try{const a=await h(`/admin/events/${t}`,{method:"DELETE"});a.status==="success"?(p("success","Terhapus","Kategori event berhasil dihapus!"),W()):p("error","Gagal Menghapus",a.message)}catch(a){p("error","Kesalahan Server",a.message)}}let ge=null,Fe=null,Xe=[];async function ft(t,a){var e;ge=t,document.getElementById("jerseyModalSubtitle").textContent=`Kategori: ${a}. Tambahkan satu atau beberapa tipe jersey beserta ukuran dan gambar masing-masing.`,da(),(e=document.getElementById("modalEventJerseysBackdrop"))==null||e.classList.add("open"),await ra(t)}async function ra(t){const a=document.getElementById("eventJerseysList");a&&(a.innerHTML='<p class="form-hint">Memuat data jersey...</p>');try{const e=await h("/admin/jerseys");if(e.status!=="success"||!Array.isArray(e.data))throw new Error(e.message||"Gagal memuat data jersey.");Xe=e.data.filter(n=>n.eventId===t),on(Xe)}catch(e){console.error("Failed to load jerseys:",e),a&&(a.innerHTML=`<p class="jersey-admin-error">${b(e.message)}</p>`),p("error","Gagal Memuat Jersey",e.message)}}function on(t){const a=document.getElementById("eventJerseysList");if(a){if(!t.length){a.innerHTML='<div class="jersey-admin-empty">Belum ada tipe jersey untuk kategori ini.</div>';return}a.innerHTML=t.map((e,n)=>{const i=Array.isArray(e.sizes)?e.sizes:[];return`
      <article class="jersey-admin-card">
        <div class="jersey-admin-card-image ${e.image?"":"is-empty"}">
          ${e.image?`<img src="${b(e.image)}" alt="${b(e.name)}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('is-empty')">`:""}
          <i class="fa-solid fa-shirt" aria-hidden="true"></i>
        </div>
        <div class="jersey-admin-card-content">
          <strong>${b(e.name)}</strong>
          <span>${b(e.type)}</span>
          <small>Ukuran: ${b(i.join(", "))}</small>
        </div>
        <div class="jersey-admin-card-actions">
          <button type="button" class="btn btn-secondary btn-sm btn-edit-jersey" data-index="${n}" aria-label="Edit jersey ${b(e.name)}"><i class="fa-solid fa-pen"></i></button>
          <button type="button" class="btn btn-outline btn-sm btn-delete-jersey" data-id="${e.id}" data-name="${b(e.name)}" aria-label="Hapus jersey ${b(e.name)}"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </article>
    `}).join(""),a.querySelectorAll(".btn-edit-jersey").forEach(e=>{e.addEventListener("click",()=>{const n=Xe[Number(e.dataset.index)];n&&rn(n)})}),a.querySelectorAll(".btn-delete-jersey").forEach(e=>{e.addEventListener("click",async()=>{await K({title:"Hapus tipe jersey?",message:`Hapus "${e.dataset.name}"? Jersey yang sudah dipilih peserta akan dilindungi dan tidak dapat dihapus.`,confirmText:"Ya, Hapus",type:"danger"})&&await dn(e.dataset.id)})})}}function la(){const t=document.getElementById("jerseyFormImage"),a=document.getElementById("jerseyImagePreview"),e=a==null?void 0:a.querySelector("img"),n=(t==null?void 0:t.value.trim())||"",i=!!(n&&(t!=null&&t.checkValidity())&&/^https?:\/\//i.test(n));a&&(a.hidden=!i),e&&(i?e.src=n:e.removeAttribute("src"))}function da(){Fe=null;const t=document.getElementById("formEventJersey");t==null||t.reset(),document.getElementById("jerseyFormId").value="",document.getElementById("btnSaveJersey").innerHTML='<i class="fa-solid fa-plus"></i> Tambah Jersey',document.getElementById("btnCancelJerseyEdit").hidden=!0,la()}function rn(t){Fe=t.id,document.getElementById("jerseyFormId").value=t.id,document.getElementById("jerseyFormName").value=t.name,document.getElementById("jerseyFormType").value=t.type,document.getElementById("jerseyFormSizes").value=(Array.isArray(t.sizes)?t.sizes:[]).join(", "),document.getElementById("jerseyFormImage").value=t.image||"",document.getElementById("btnSaveJersey").innerHTML='<i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan',document.getElementById("btnCancelJerseyEdit").hidden=!1,la()}async function ln(t){t.preventDefault();const a=document.getElementById("jerseyFormName").value.trim(),e=document.getElementById("jerseyFormType").value.trim(),n=[...new Set(document.getElementById("jerseyFormSizes").value.split(",").map(r=>r.trim()).filter(Boolean))],i=document.getElementById("jerseyFormImage").value.trim()||null;if(!ge||!a||!e||!n.length){p("warning","Data Belum Lengkap","Nama, tipe, dan minimal satu ukuran jersey wajib diisi.");return}const s=document.getElementById("btnSaveJersey"),o=s.innerHTML;s.disabled=!0,s.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';try{const r={eventId:ge,name:a,type:e,sizes:n,image:i},l=Fe?await h(`/admin/jerseys/${Fe}`,{method:"PUT",body:JSON.stringify(r)}):await h("/admin/jerseys",{method:"POST",body:JSON.stringify(r)});if(l.status!=="success")throw new Error(l.message||"Gagal menyimpan jersey.");p("success","Jersey Tersimpan",l.message),da(),await Promise.all([ra(ge),W()])}catch(r){p("error","Gagal Menyimpan Jersey",r.message)}finally{s.disabled=!1,s.innerHTML=o}}async function dn(t){try{const a=await h(`/admin/jerseys/${t}`,{method:"DELETE"});if(a.status!=="success")throw new Error(a.message||"Gagal menghapus jersey.");p("success","Jersey Dihapus",a.message),await Promise.all([ra(ge),W()])}catch(a){p("error","Jersey Tidak Dapat Dihapus",a.message)}}let Ne=null,Ke=null;async function yt(t,a){var s;Ne=t,Ke=null;const e=document.getElementById("benefitFormEventId");e&&(e.value=t);const n=document.getElementById("benefitFormId");n&&(n.value="");const i=document.getElementById("benefitModalSubtitle");i&&(i.textContent=`Kategori: ${a}`),ma(),(s=document.getElementById("modalEventBenefitsBackdrop"))==null||s.classList.add("open"),await ca(t)}async function ca(t){const a=document.getElementById("eventBenefitsTableBody"),e=document.getElementById("benefitListCount");a&&(a.innerHTML='<tr><td colspan="3" style="text-align: center; padding: 20px; color: #94A3B8;"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat benefit...</td></tr>');try{const n=await h(`/admin/events/${t}/benefits`);if(n.status==="success"){const i=n.data||[];e&&(e.textContent=i.length),cn(i)}else p("error","Gagal Memuat Benefit",n.message)}catch(n){console.error("Failed to load event benefits:",n),a&&(a.innerHTML=`<tr><td colspan="3" style="text-align: center; padding: 20px; color: #EF4444;">Gagal memuat data: ${b(n.message)}</td></tr>`)}}function cn(t){const a=document.getElementById("eventBenefitsTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="3" style="text-align: center; padding: 24px; color: #94A3B8;">Belum ada benefit untuk kategori ini. Tambahkan melalui form di atas.</td></tr>';return}a.innerHTML=t.map(e=>`
    <tr>
      <td>
        <div style="font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 8px;">
          ${e.image?`<img src="${b(e.image)}" alt="" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px;">`:'<i class="fa-solid fa-medal" style="color: #F97316;"></i>'}
          <span>${b(e.name)}</span>
        </div>
      </td>
      <td style="font-size: 0.85rem; color: #475569;">
        ${b(e.description)}
      </td>
      <td style="text-align: center; white-space: nowrap;">
        <div style="display: flex; gap: 6px; justify-content: center;">
          <button type="button" class="btn btn-secondary btn-sm btn-edit-benefit" data-id="${e.id}" data-name="${b(e.name)}" data-desc="${b(e.description)}" data-image="${b(e.image||"")}" style="padding: 4px 8px; font-size: 0.75rem;">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button type="button" class="btn btn-outline btn-sm btn-delete-benefit" data-id="${e.id}" data-name="${b(e.name)}" style="padding: 4px 8px; font-size: 0.75rem; color: #EF4444; border-color: #FECACA;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join(""),a.querySelectorAll(".btn-edit-benefit").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name"),s=e.getAttribute("data-desc"),o=e.getAttribute("data-image");Ke=n;const r=document.getElementById("benefitFormId");r&&(r.value=n);const l=document.getElementById("benefitFormName");l&&(l.value=i);const c=document.getElementById("benefitFormDesc");c&&(c.value=s);const m=document.getElementById("benefitFormImage");m&&(m.value=o||"");const d=document.getElementById("benefitFormTitle");d&&(d.innerHTML=`<i class="fa-solid fa-pen" style="color: var(--color-primary);"></i> Edit Benefit: ${b(i)}`);const u=document.getElementById("btnCancelBenefitEdit");u&&(u.style.display="inline-block");const g=document.getElementById("btnSaveBenefitSubmit");g&&(g.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Perbarui Benefit')})}),a.querySelectorAll(".btn-delete-benefit").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await K({title:"Hapus Fasilitas / Benefit?",message:`Apakah Anda yakin ingin menghapus "${i}" dari fasilitas event ini?`,confirmText:"Ya, Hapus",type:"danger"})&&await pn(n)})})}}function ma(){Ke=null;const t=document.getElementById("benefitFormId");t&&(t.value="");const a=document.getElementById("benefitFormName");a&&(a.value="");const e=document.getElementById("benefitFormDesc");e&&(e.value="");const n=document.getElementById("benefitFormImage");n&&(n.value="");const i=document.getElementById("benefitFormTitle");i&&(i.innerHTML='<i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Fasilitas / Benefit Baru');const s=document.getElementById("btnCancelBenefitEdit");s&&(s.style.display="none");const o=document.getElementById("btnSaveBenefitSubmit");o&&(o.innerHTML='<i class="fa-solid fa-check"></i> Simpan Benefit')}async function mn(t){var c,m,d,u,g;t.preventDefault();const a=Ne||((c=document.getElementById("benefitFormEventId"))==null?void 0:c.value),e=Ke||((m=document.getElementById("benefitFormId"))==null?void 0:m.value),n=(d=document.getElementById("benefitFormName"))==null?void 0:d.value.trim(),i=(u=document.getElementById("benefitFormDesc"))==null?void 0:u.value.trim(),s=((g=document.getElementById("benefitFormImage"))==null?void 0:g.value.trim())||null;if(!a){p("warning","Peringatan","Event ID tidak terdeteksi.");return}if(!n||!i){p("warning","Validasi Gagal","Nama dan deskripsi benefit wajib diisi.");return}const o={name:n,description:i,image:s},r=document.getElementById("btnSaveBenefitSubmit"),l=r?r.innerHTML:"";r&&(r.disabled=!0,r.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Menyimpan...');try{let y;e?y=await h(`/admin/benefits/${e}`,{method:"PUT",body:JSON.stringify(o)}):y=await h(`/admin/events/${a}/benefits`,{method:"POST",body:JSON.stringify(o)}),y.status==="success"?(p("success","Berhasil",e?"Benefit berhasil diperbarui!":"Benefit baru berhasil ditambahkan!"),ma(),await ca(a),await W()):p("error","Gagal Menyimpan Benefit",y.message||"Terjadi kesalahan")}catch(y){p("error","Kesalahan",y.message)}finally{r&&(r.disabled=!1,r.innerHTML=l)}}async function pn(t){try{const a=await h(`/admin/benefits/${t}`,{method:"DELETE"});a.status==="success"?(p("success","Dihapus","Benefit berhasil dihapus dari database."),Ne&&await ca(Ne),await W()):p("error","Gagal Menghapus",a.message)}catch(a){p("error","Kesalahan",a.message)}}window.openEventBenefitsModal=yt;window.openEventJerseysModal=ft;const un=`<!-- =========================================================================
     MODULAR ADMIN SIDEBAR - TEGAL RUN 2027
     ========================================================================= -->
<aside class="admin-sidebar" id="adminSidebar">
  <!-- Sidebar Header / Branding -->
  <div class="sidebar-header">
    <div class="sidebar-brand">
      <div class="brand-icon">
        <i class="fa-solid fa-person-running"></i>
      </div>
      <div class="brand-text">
        TEGAL RUN <span>2027</span>
        <div class="brand-tag">PORTAL ADMIN</div>
      </div>
    </div>
    <button class="sidebar-close-btn" id="btnCloseSidebar" title="Tutup Menu">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>

  <!-- Sidebar User Profile Snapshot -->
  <div class="sidebar-profile">
    <div class="profile-avatar">
      <i class="fa-solid fa-user-shield"></i>
    </div>
    <div class="profile-details">
      <h4 id="sidebarAdminFullName">Administrator</h4>
      <span class="role-badge" id="sidebarAdminRole">SUPERADMIN</span>
    </div>
  </div>

  <!-- Navigation Menu -->
  <nav class="sidebar-nav">
    <div class="nav-section-title">MENU UTAMA</div>

    <button class="nav-item active" data-nav="dashboard" data-page="page:dashboard">
      <i class="fa-solid fa-gauge-high"></i>
      <span>Dashboard Overview</span>
    </button>

    <button class="nav-item" data-nav="events" data-page="page:events">
      <i class="fa-solid fa-calendar-days"></i>
      <span>Manajemen Event</span>
      <span class="nav-badge" id="navEventsCount">2</span>
    </button>

    <button class="nav-item" data-nav="participants" data-page="page:participants">
      <i class="fa-solid fa-users"></i>
      <span>Manajemen Peserta</span>
    </button>

    <button class="nav-item" data-nav="racepack" data-page="page:racepack">
      <i class="fa-solid fa-box-open" style="color: #F97316;"></i>
      <span>Racepack</span>
      <span class="badge" style="background: #FFEDD5; color: #EA580C; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; margin-left: auto;">SCAN</span>
    </button>
    <button class="nav-item" data-nav="racepack-view" data-page="page:racepack-view">
      <i class="fa-solid fa-list-check" style="color:#0EA5E9;"></i>
      <span>Live View Antrean Racepack</span>
    </button>

    <button class="nav-item" data-nav="orders" data-page="page:orders">
      <i class="fa-solid fa-receipt"></i>
      <span>Transaksi & Order</span>
    </button>

    <button class="nav-item" data-nav="notif-logs" data-page="page:notif-logs">
      <i class="fa-solid fa-paper-plane"></i>
      <span>Log Notifikasi & Peserta</span>
    </button>

    <button class="nav-item" data-nav="whatsapp-web" data-page="page:whatsapp-web">
      <i class="fa-brands fa-whatsapp" style="color: #22C55E;"></i>
      <span>WhatsApp Web Console</span>
    </button>

    <div class="nav-section-title">KONFIGURASI</div>

    <button class="nav-item" data-nav="bib-settings" data-page="page:bib-settings">
      <i class="fa-solid fa-id-badge" style="color: #6366F1;"></i>
      <span>Pengaturan BIB &amp; E-Tiket</span>
    </button>

    <button class="nav-item" data-nav="cms" data-page="page:cms">
      <i class="fa-solid fa-pen-ruler"></i>
      <span>Konten Website & CMS</span>
    </button>

    <button class="nav-item" data-nav="countdown" data-page="page:countdown">
      <i class="fa-solid fa-stopwatch-20"></i>
      <span>Countdown & Status Event</span>
    </button>

    <button class="nav-item" data-nav="notifications" data-page="page:notifications">
      <i class="fa-solid fa-bell"></i>
      <span>Konfigurasi Notifikasi</span>
    </button>

    <button class="nav-item" data-nav="admins" data-page="page:admins" data-role="SUPERADMIN">
      <i class="fa-solid fa-shield-halved"></i>
      <span>Kelola Admin & RBAC</span>
    </button>

    <button class="nav-item" data-nav="role-monitoring" data-page="page:role-monitoring" data-role="SUPERADMIN">
      <i class="fa-solid fa-users-viewfinder"></i>
      <span>Pemantauan Semua Role</span>
    </button>

    <button class="nav-item" data-nav="routes" data-page="page:routes">
      <i class="fa-solid fa-map-pin"></i>
      <span>Rute &amp; Checkpoint</span>
    </button>

    <button class="nav-item" data-nav="logs" data-page="page:logs">
      <i class="fa-solid fa-clock-rotate-left"></i>
      <span>Log Audit Sistem</span>
    </button>
  </nav>

  <!-- Sidebar Footer -->
  <div class="sidebar-footer">
    <a href="/" target="_blank" class="sidebar-action-btn" title="Buka Landing Page">
      <i class="fa-solid fa-arrow-up-right-from-square"></i>
      <span>Lihat Website</span>
    </a>
    <button type="button" class="sidebar-action-btn logout-btn" id="btnSidebarLogout" title="Keluar dari Portal Admin">
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
      <span>Keluar</span>
    </button>
  </div>
</aside>
`;let T=[],G=[],$=[],q=[],ot=!1;const rt=[{icon:"fa-shirt",title:"Jersey Running Dry-Fit",desc:"Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh."},{icon:"fa-microchip",title:"Nomor Dada (BIB) & Timing Chip",desc:"Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online."},{icon:"fa-medal",title:"Medali Finisher Logam Cor",desc:"Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT."},{icon:"fa-bottle-water",title:"Water & Isotonic Station",desc:"Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar."},{icon:"fa-truck-medical",title:"Tim Medis & Ambulans Mobile",desc:"Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute."},{icon:"fa-utensils",title:"Refreshment & Finisher Feast",desc:"Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar."}],gn=[{icon:"fa-certificate",title:"Rekomendasi Resmi PB PASI",desc:"Tersertifikasi standar teknis rute dan aturan perlombaan atletik resmi nasional."},{icon:"fa-road-barrier",title:"Izin Kepolisian & Dishub",desc:"Pengamanan jalur dan rekayasa lalu lintas penuh demi keselamatan pelari."},{icon:"fa-shield-heart",title:"Asuransi Medis Peserta",desc:"Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri selama perlombaan berlangsung."},{icon:"fa-user-lock",title:"Perlindungan Data Pribadi (UU PDP)",desc:"Enkripsi data pendaftaran dan kepatuhan penuh undang-undang perlindungan data konsumen."}],Z=["fa-person-running","fa-medal","fa-trophy","fa-flag-checkered","fa-bolt","fa-fire","fa-star","fa-mountain-sun","fa-shoe-prints","fa-heart-pulse","fa-stopwatch","fa-award","fa-dumbbell","fa-route","fa-location-dot","fa-sun","fa-water","fa-compass","fa-crown","fa-leaf"],Te=["Pelari","Medali","Piala","Bendera finis","Petir","Api","Bintang","Gunung","Jejak kaki","Jantung","Stopwatch","Penghargaan","Dumbbell","Rute","Lokasi","Matahari","Ombak","Kompas","Mahkota","Daun"],bn={TOTAL_PARTICIPANTS:{label:"Total peserta aktif",unit:"Peserta Terdaftar",desc:"Termasuk pendaftaran menunggu pembayaran"},PAID_PARTICIPANTS:{label:"Peserta sudah membayar",unit:"Peserta Lunas",desc:"Peserta dengan transaksi lunas atau diterima"},TOTAL_CATEGORIES:{label:"Kategori event",unit:"Kategori Lomba",desc:"Jumlah kategori event di website"},TOTAL_CAPACITY:{label:"Total kuota awal",unit:"Total Kuota",desc:"Kapasitas seluruh kategori event"},AVAILABLE_SLOTS:{label:"Sisa kuota tersedia",unit:"Slot Tersedia",desc:"Kuota yang masih dapat didaftarkan"}},ht={hero:"cmsShowHero",stats:"cmsShowStats",route:"cmsShowRoute",facilities:"cmsShowFacilities",tickets:"cmsShowTickets",legal:"cmsShowLegal",faq:"cmsShowFaq",footer:"cmsShowFooter"},We=[{question:"Apakah tiket atau BIB perlombaan dapat dipindahtangankan?",answer:"Tiket dan nomor BIB terdaftar resmi tidak dapat dipindahtangankan tanpa persetujuan panitia.",enabled:!0},{question:"Bagaimana prosedur pengambilan Race Pack (RPC)?",answer:"Peserta wajib membawa e-tiket resmi dan identitas diri yang sah saat pengambilan racepack.",enabled:!0},{question:"Apakah ada ketentuan kualifikasi fisik bagi peserta?",answer:"Peserta bertanggung jawab atas kondisi fisik dan kesehatannya sebelum mengikuti perlombaan.",enabled:!0},{question:"Bagaimana kebijakan acara jika terjadi keadaan kahar?",answer:"Panitia dapat menyesuaikan jadwal atau rute demi keselamatan seluruh peserta sesuai regulasi yang berlaku.",enabled:!0},{question:"Bagaimana kerahasiaan data pribadi peserta dilindungi?",answer:"Data peserta dijaga kerahasiaannya dan hanya digunakan untuk keperluan operasional acara sesuai peraturan.",enabled:!0}];function j(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function He(t,a,e){const n=Z.indexOf(e),i=n>=0?Te[n]:"Ikon tersimpan",s=/^[a-z0-9-]+$/.test(e||"")?e:"fa-icons";return`
    <div class="cms-icon-dropdown" data-icon-target="${t}" data-idx="${a}">
      <button type="button" class="cms-icon-dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
        <span class="cms-icon-dropdown-selected"><i class="fa-solid ${s}"></i><span>${i}</span></span>
        <i class="fa-solid fa-chevron-down cms-icon-dropdown-chevron" aria-hidden="true"></i>
      </button>
      <div class="cms-icon-dropdown-menu" role="listbox" aria-label="Pilih ikon">
        ${Z.map((o,r)=>`
          <button type="button" class="cms-icon-choice${e===o?" is-selected":""}"
            data-icon="${o}" role="option" aria-selected="${e===o}" aria-label="${Te[r]}"
            title="${Te[r]}">
            <i class="fa-solid ${o}"></i>
            <span>${Te[r]}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `}function Ue(t,a,e,n){t.querySelectorAll(`.cms-icon-dropdown[data-icon-target="${a}"]`).forEach(i=>{const s=i.querySelector(".cms-icon-dropdown-trigger"),o=i.querySelector(".cms-icon-dropdown-menu");s==null||s.addEventListener("click",()=>{const r=i.classList.toggle("is-open");s.setAttribute("aria-expanded",String(r))}),o==null||o.querySelectorAll(".cms-icon-choice").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.icon;if(a==="navbar"){const m=document.getElementById("cmsNavbarIcon");if(!m||!l)return;m.value=l,ua(),le();return}const c=Number(i.dataset.idx);!Number.isInteger(c)||!e[c]||!l||(e[c].icon=l,n())})})})}function be(){const t=document.getElementById("cmsStatsItemsContainer");if(t){if(T.length===0){t.innerHTML='<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada kartu statistik. Klik "Tambah Kartu Statistik" di atas.</div>';return}t.innerHTML=T.map((a,e)=>`
    <div class="cms-item-card cms-stat-card">
      <div class="cms-item-card-header">
        <span class="cms-item-card-title">
          <span class="cms-item-card-icon"><i class="fa-solid ${j(a.icon||"fa-chart-simple")}"></i></span>
          Kartu Statistik #${e+1}
        </span>
        <div class="cms-item-card-actions">
          <label class="cms-toggle cms-toggle-compact">
            <input type="checkbox" class="stat-input-visible" data-idx="${e}" ${a.visible!==!1?"checked":""}>
            <span class="cms-toggle-switch" aria-hidden="true"></span>
            <span class="cms-toggle-label">Tampilkan</span>
          </label>
          <button type="button" class="btn btn-outline btn-sm btn-delete-stat cms-delete-button" data-idx="${e}" title="Hapus kartu ini" aria-label="Hapus kartu statistik">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Sumber data</label>
        <select class="form-input stat-input-type" data-idx="${e}">
          <option value="CUSTOM" ${a.type!=="AUTO"?"selected":""}>Isi manual / informasi kustom</option>
          <option value="AUTO_PARTICIPANTS" ${a.autoKey==="TOTAL_PARTICIPANTS"?"selected":""}>Live: Total peserta aktif</option>
          <option value="AUTO_PAID_PARTICIPANTS" ${a.autoKey==="PAID_PARTICIPANTS"?"selected":""}>Live: Peserta sudah membayar</option>
          <option value="AUTO_CATEGORIES" ${a.autoKey==="TOTAL_CATEGORIES"?"selected":""}>Live: Jumlah kategori event</option>
          <option value="AUTO_CAPACITY" ${a.autoKey==="TOTAL_CAPACITY"?"selected":""}>Live: Total kuota awal</option>
          <option value="AUTO_AVAILABLE" ${a.autoKey==="AVAILABLE_SLOTS"?"selected":""}>Live: Sisa kuota tersedia</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Ikon kartu</label>
        ${He("stat",e,a.icon||"fa-chart-simple")}
      </div>

      <div class="form-group">
        <label class="form-label">Nilai statistik ${a.type==="AUTO"?"(otomatis dari backend)":"(bebas diisi)"}</label>
        <input type="text" class="form-input stat-input-val" data-idx="${e}" value="${j(a.val||"")}" placeholder="Contoh: 2.500+, 100%, atau Rp 75 juta" ${a.type==="AUTO"?"disabled":""}>
      </div>

      <div class="form-group">
        <label class="form-label">Judul / satuan</label>
        <input type="text" class="form-input stat-input-unit" data-idx="${e}" value="${j(a.unit||"")}" placeholder="Contoh: Pelari Terdaftar">
      </div>

      <div class="form-group cms-last-form-group">
        <label class="form-label">Keterangan tambahan</label>
        <input type="text" class="form-input stat-input-desc" data-idx="${e}" value="${j(a.desc||"")}" placeholder="Teks pendukung opsional">
      </div>
    </div>
  `).join(""),Ue(t,"stat",T,be),t.querySelectorAll(".btn-delete-stat").forEach(a=>{a.addEventListener("click",()=>{const e=Number(a.getAttribute("data-idx"));T.splice(e,1),be()})}),t.querySelectorAll(".stat-input-type").forEach(a=>{a.addEventListener("change",()=>{const e=Number(a.getAttribute("data-idx")),n=a.value;if(n==="AUTO_PARTICIPANTS"?(T[e].type="AUTO",T[e].autoKey="TOTAL_PARTICIPANTS"):n==="AUTO_PAID_PARTICIPANTS"?(T[e].type="AUTO",T[e].autoKey="PAID_PARTICIPANTS"):n==="AUTO_CATEGORIES"?(T[e].type="AUTO",T[e].autoKey="TOTAL_CATEGORIES"):n==="AUTO_CAPACITY"?(T[e].type="AUTO",T[e].autoKey="TOTAL_CAPACITY"):n==="AUTO_AVAILABLE"?(T[e].type="AUTO",T[e].autoKey="AVAILABLE_SLOTS"):(T[e].type="CUSTOM",T[e].autoKey=""),T[e].type==="AUTO"){const i=bn[T[e].autoKey];T[e].unit=i.unit,T[e].desc=i.desc}be()})}),t.querySelectorAll(".stat-input-val").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));T[e].val=a.value})}),t.querySelectorAll(".stat-input-unit").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));T[e].unit=a.value})}),t.querySelectorAll(".stat-input-desc").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));T[e].desc=a.value})}),t.querySelectorAll(".stat-input-visible").forEach(a=>{a.addEventListener("change",()=>{T[Number(a.getAttribute("data-idx"))].visible=a.checked})})}}function Le(){const t=document.getElementById("cmsFacilitiesItemsContainer");if(t){if(G.length===0){t.innerHTML='<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada kartu fasilitas. Klik "Tambah Kartu Fasilitas" di atas.</div>';return}t.innerHTML=G.map((a,e)=>`
    <div class="cms-item-card">
      <div class="cms-item-card-header">
        <span class="cms-item-card-title">
          <span class="cms-item-card-icon"><i class="fa-solid ${j(a.icon||"fa-gift")}"></i></span>
          Fasilitas #${e+1}
        </span>
        <div class="cms-item-card-actions">
          <label class="cms-toggle cms-toggle-compact">
            <input type="checkbox" class="fac-input-visible" data-idx="${e}" ${a.visible!==!1?"checked":""}>
            <span class="cms-toggle-switch" aria-hidden="true"></span>
            <span class="cms-toggle-label">Tampilkan</span>
          </label>
          <button type="button" class="btn btn-outline btn-sm btn-delete-facility cms-delete-button" data-idx="${e}" title="Hapus kartu ini" aria-label="Hapus kartu fasilitas">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Ikon fasilitas</label>
        ${He("facility",e,a.icon||"fa-gift")}
      </div>

      <div class="form-group">
        <label class="form-label">Judul fasilitas</label>
        <input type="text" class="form-input fac-input-title" data-idx="${e}" value="${j(a.title||"")}" placeholder="Nama fasilitas atau racepack">
      </div>

      <div class="form-group cms-last-form-group">
        <label class="form-label">Deskripsi fasilitas</label>
        <textarea class="form-input fac-input-desc" data-idx="${e}" rows="2" placeholder="Uraian fasilitas bagi peserta">${j(a.desc||"")}</textarea>
      </div>
    </div>
  `).join(""),Ue(t,"facility",G,Le),t.querySelectorAll(".btn-delete-facility").forEach(a=>{a.addEventListener("click",()=>{const e=Number(a.getAttribute("data-idx"));G.splice(e,1),Le()})}),t.querySelectorAll(".fac-input-title").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));G[e].title=a.value})}),t.querySelectorAll(".fac-input-desc").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));G[e].desc=a.value})}),t.querySelectorAll(".fac-input-visible").forEach(a=>{a.addEventListener("change",()=>{G[Number(a.getAttribute("data-idx"))].visible=a.checked})})}}function Me(){const t=document.getElementById("cmsLegalItemsContainer");if(t){if($.length===0){t.innerHTML='<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada butir legalitas. Klik "Tambah Poin Legalitas" di atas.</div>';return}t.innerHTML=$.map((a,e)=>`
    <div class="cms-item-card">
      <div class="cms-item-card-header">
        <span class="cms-item-card-title">
          <span class="cms-item-card-icon"><i class="fa-solid ${j(a.icon||"fa-certificate")}"></i></span>
          Poin Legalitas #${e+1}
        </span>
        <div class="cms-item-card-actions">
          <label class="cms-toggle cms-toggle-compact">
            <input type="checkbox" class="legal-input-visible" data-idx="${e}" ${a.visible!==!1?"checked":""}>
            <span class="cms-toggle-switch" aria-hidden="true"></span>
            <span class="cms-toggle-label">Tampilkan</span>
          </label>
          <button type="button" class="btn btn-outline btn-sm btn-delete-legal cms-delete-button" data-idx="${e}" title="Hapus poin ini" aria-label="Hapus poin legalitas">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Ikon legalitas</label>
        ${He("legal",e,a.icon||"fa-certificate")}
      </div>

      <div class="form-group">
        <label class="form-label">Judul legalitas</label>
        <input type="text" class="form-input legal-input-title" data-idx="${e}" value="${j(a.title||"")}" placeholder="Contoh: Rekomendasi Resmi PB PASI">
      </div>

      <div class="form-group cms-last-form-group">
        <label class="form-label">Deskripsi legalitas</label>
        <textarea class="form-input legal-input-desc" data-idx="${e}" rows="2" placeholder="Uraian kepatuhan hukum atau perizinan">${j(a.desc||"")}</textarea>
      </div>
    </div>
  `).join(""),Ue(t,"legal",$,Me),t.querySelectorAll(".btn-delete-legal").forEach(a=>{a.addEventListener("click",()=>{const e=Number(a.getAttribute("data-idx"));$.splice(e,1),Me()})}),t.querySelectorAll(".legal-input-title").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));$[e].title=a.value})}),t.querySelectorAll(".legal-input-desc").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));$[e].desc=a.value})}),t.querySelectorAll(".legal-input-visible").forEach(a=>{a.addEventListener("change",()=>{$[Number(a.getAttribute("data-idx"))].visible=a.checked})})}}function pa(){const t=document.getElementById("cmsFaqItemsContainer");if(t){if(!q.length){t.innerHTML='<div class="cms-repeater-empty">Belum ada pertanyaan. Tambahkan FAQ atau matikan seluruhnya untuk menampilkan Coming Soon.</div>';return}t.innerHTML=q.map((a,e)=>`
    <article class="cms-repeater-card cms-faq-item">
      <div class="cms-faq-item-heading">
        <strong>Pertanyaan ${e+1}</strong>
        <button type="button" class="btn btn-outline btn-sm cms-faq-remove" data-index="${e}" aria-label="Hapus pertanyaan ${e+1}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <label class="form-label" for="cmsFaqQuestion-${e}">Pertanyaan</label>
      <input class="form-input cms-faq-question" id="cmsFaqQuestion-${e}" maxlength="240" required value="${j(a.question||"")}" data-index="${e}">
      <label class="form-label" for="cmsFaqAnswer-${e}">Jawaban</label>
      <textarea class="form-input cms-faq-answer" id="cmsFaqAnswer-${e}" rows="3" maxlength="3000" required data-index="${e}">${j(a.answer||"")}</textarea>
      <label class="cms-toggle cms-faq-enabled">
        <input type="checkbox" class="cms-faq-enabled-input" data-index="${e}" ${a.enabled!==!1?"checked":""}>
        <span class="cms-toggle-switch" aria-hidden="true"></span>
        <span class="cms-toggle-label">Tampilkan pertanyaan ini</span>
      </label>
    </article>
  `).join(""),t.querySelectorAll(".cms-faq-question, .cms-faq-answer").forEach(a=>{a.addEventListener("input",()=>{const e=q[Number(a.dataset.index)];e&&(e[a.classList.contains("cms-faq-question")?"question":"answer"]=a.value)})}),t.querySelectorAll(".cms-faq-enabled-input").forEach(a=>{a.addEventListener("change",()=>{const e=q[Number(a.dataset.index)];e&&(e.enabled=a.checked)})}),t.querySelectorAll(".cms-faq-remove").forEach(a=>{a.addEventListener("click",()=>{q.splice(Number(a.dataset.index),1),pa()})})}}function le(){var d;const t=document.getElementById("cmsNavbarIcon"),a=document.getElementById("cmsNavbarIconUrl"),e=document.getElementById("cmsNavbarIconPreview"),n=document.getElementById("cmsNavbarTitlePreview"),i=document.getElementById("cmsNavbarTitle"),s=((d=document.querySelector('input[name="cmsNavbarIconMode"]:checked'))==null?void 0:d.value)||"ICON",o=document.getElementById("cmsNavbarIconField"),r=document.getElementById("cmsNavbarIconUrlField");if(!t||!e)return;o&&(o.hidden=s!=="ICON"),r&&(r.hidden=s!=="IMAGE"),a&&(a.disabled=s!=="IMAGE",a.required=s==="IMAGE"),n&&(n.textContent=(i==null?void 0:i.value.trim())||"Nama Website");const l=s==="IMAGE"&&(a==null?void 0:a.value.trim())||"";if(l)try{const u=new URL(l);if(["http:","https:"].includes(u.protocol)){const g=document.createElement("img");g.src=u.href,g.alt="",g.onerror=()=>{const y=document.createElement("i");y.className="fa-solid fa-image",e.replaceChildren(y)},e.replaceChildren(g);return}}catch{}if(s==="IMAGE"){const u=document.createElement("i");u.className="fa-regular fa-image",e.replaceChildren(u);return}const c=Z.includes(t.value)?t.value:Z[0],m=document.createElement("i");m.className=`fa-solid ${c}`,e.replaceChildren(m)}function ua(){const t=document.getElementById("cmsNavbarIconPicker"),a=document.getElementById("cmsNavbarIcon");!t||!a||(t.innerHTML=He("navbar",0,a.value),Ue(t,"navbar",[],ua))}function De(){const t=document.getElementById("cmsFaviconUrl"),a=document.getElementById("cmsFaviconPreview"),e=document.getElementById("cmsFaviconFallback");if(!t||!a||!e)return;const n=t.value.trim();if(!n){a.hidden=!0,e.hidden=!1,a.removeAttribute("src");return}try{const i=new URL(n);if(!["http:","https:"].includes(i.protocol))throw new Error("URL favicon harus menggunakan HTTP atau HTTPS.");a.onerror=()=>{a.hidden=!0,e.hidden=!1},a.onload=()=>{a.hidden=!1,e.hidden=!0},a.src=i.href}catch{a.hidden=!0,e.hidden=!1}}function fn(){ua(),ot||(document.addEventListener("click",B=>{B.target.closest(".cms-icon-dropdown")||document.querySelectorAll(".cms-icon-dropdown.is-open").forEach(I=>{var x;I.classList.remove("is-open"),(x=I.querySelector(".cms-icon-dropdown-trigger"))==null||x.setAttribute("aria-expanded","false")})}),document.addEventListener("keydown",B=>{if(B.key!=="Escape")return;const I=document.querySelector(".cms-icon-dropdown.is-open");if(!I)return;I.classList.remove("is-open");const x=I.querySelector(".cms-icon-dropdown-trigger");x==null||x.setAttribute("aria-expanded","false"),x==null||x.focus()}),ot=!0),document.querySelectorAll('input[name="cmsNavbarIconMode"]').forEach(B=>{B.onchange=le});const t=document.getElementById("cmsNavbarIconUrl");t&&(t.oninput=le);const a=document.getElementById("cmsNavbarTitle");a&&(a.oninput=le);const e=document.getElementById("cmsFaviconUrl");e&&(e.oninput=De);const n=document.getElementById("cmsComingSoonTitle"),i=document.getElementById("cmsComingSoonMessage"),s=document.getElementById("cmsComingSoonImageUrl"),o=()=>{const B=document.getElementById("cmsComingSoonPreviewTitle"),I=document.getElementById("cmsComingSoonPreviewMessage"),x=document.getElementById("cmsComingSoonPreviewImage"),F=document.getElementById("cmsComingSoonPreviewFallback");B&&(B.textContent=(n==null?void 0:n.value.trim())||"COMING SOON EVENT!"),I&&(I.textContent=(i==null?void 0:i.value.trim())||"",I.hidden=!(i!=null&&i.value.trim()));const L=(s==null?void 0:s.value.trim())||"";let E="";try{const S=new URL(L);["http:","https:"].includes(S.protocol)&&(E=S.href)}catch{E=""}x&&F&&(x.onerror=()=>{x.hidden=!0,F.hidden=!1},E?(x.src=E,x.hidden=!1,F.hidden=!0):(x.removeAttribute("src"),x.hidden=!0,F.hidden=!1))};[n,i,s].forEach(B=>{B&&(B.oninput=o)}),o(),le(),De();const r=document.getElementById("btnAddCmsStatItem");r&&(r.onclick=()=>{T.push({type:"CUSTOM",autoKey:"",icon:"fa-chart-simple",val:"100+",unit:"Statistik Baru",desc:"Keterangan statistik"}),be()});const l=document.getElementById("btnAddCmsFacilityItem");l&&(l.onclick=()=>{G.push({icon:"fa-gift",title:"Fasilitas Baru",desc:"Deskripsi fasilitas pelari..."}),Le()});const c=document.getElementById("btnAddCmsLegalItem");c&&(c.onclick=()=>{$.push({icon:"fa-certificate",title:"Poin Legalitas Baru",desc:"Deskripsi perizinan atau kepatuhan hukum..."}),Me()});const m=document.getElementById("btnAddCmsFaqItem");m&&(m.onclick=()=>{q.push({question:"Pertanyaan baru",answer:"Tulis jawaban FAQ di sini.",enabled:!0}),pa()});const d=document.getElementById("cmsWebsitePreview"),u=document.getElementById("cmsPreviewUpdated"),g=()=>{d&&(d.src=`${window.location.origin}/?cmsPreview=${Date.now()}`,u&&(u.textContent="Memuat ulang..."))};d&&(d.onload=()=>{u&&(u.textContent=`Diperbarui ${new Date().toLocaleTimeString("id-ID")}`)});const y=document.getElementById("btnRefreshCmsPreview");y&&(y.onclick=g);const v=document.getElementById("cmsLivePreview"),k=document.getElementById("btnToggleCmsPreview"),P=document.getElementById("cmsPreviewViewport"),N=B=>{P&&(P.classList.toggle("is-mobile-mode",B==="mobile"),P.classList.toggle("is-desktop-mode",B==="desktop"),document.querySelectorAll(".cms-device-button").forEach(I=>{const x=I.dataset.previewMode===B;I.classList.toggle("is-active",x),I.setAttribute("aria-pressed",String(x))}))};if(document.querySelectorAll(".cms-device-button").forEach(B=>{B.onclick=()=>{const I=B.dataset.previewMode;if(I==="desktop"&&v){const x=Math.min(Math.max(v.offsetWidth,760),window.innerWidth-48);v.style.width=`${x}px`}else I==="mobile"&&v&&(v.style.width="");N(I)}}),v&&k){let B=0,I=0,x=0,F=0,L=!1,E=!1,S=!1;const M=A=>{v.classList.toggle("is-open",A),v.classList.remove("is-dragging"),v.style.transform="",k.setAttribute("aria-expanded",String(A)),k.setAttribute("aria-label",A?"Lipat pratinjau halaman utama":"Buka pratinjau halaman utama"),k.title=A?"Tarik ke kanan untuk melipat; tarik ke kiri untuk memperlebar":"Tarik ke kiri untuk membuka dan memperlebar pratinjau",k.querySelector(".cms-preview-handle-label").textContent=A?"LIPAT":"PREVIEW",A&&d&&d.dataset.loaded!=="true"&&(d.dataset.loaded="true",g())};k.onclick=()=>{if(S){S=!1;return}M(!v.classList.contains("is-open"))},k.onpointerdown=A=>{if(A.button!==0)return;B=A.clientX,I=A.clientX,L=v.classList.contains("is-open"),x=v.offsetWidth;const C=Number.parseFloat(getComputedStyle(v).right)||0;F=Math.max(0,x+C),E=!1,v.classList.add("is-dragging"),k.setPointerCapture(A.pointerId)},k.onpointermove=A=>{if(!v.classList.contains("is-dragging"))return;I=A.clientX;const C=B-A.clientX;if(Math.abs(C)>8&&(E=!0),!E)return;const O=Math.min(window.innerWidth-48,1100),R=F;if(L&&C<0){const Be=Math.min(R,Math.abs(C));v.style.transform=`translateX(${Be}px)`;return}if(!L&&C<=R){v.style.transform=`translateX(${Math.min(R,Math.max(0,R-C))}px)`;return}const Ae=L?C:C-R,pe=Math.max(360,Math.min(O,x+Ae));v.style.width=`${pe}px`,v.style.transform="translateX(0)",v.classList.add("is-open"),N(pe>=720?"desktop":"mobile")},k.onpointerup=A=>{if(v.classList.contains("is-dragging"))if(E){const C=B-A.clientX,O=F,R=L?!(C<0&&Math.abs(C)>O/2):C>O/2;M(R),S=!0}else v.classList.remove("is-dragging"),v.style.transform=""},k.onpointercancel=()=>{if(v.classList.contains("is-dragging")){const A=B-I,C=L?!(A<0&&Math.abs(A)>F/2):A>F/2;M(C)}},M(!0)}}async function vt(){try{const t=await h("/admin/settings/website");if(t.status!=="success"||!t.data)throw new Error(t.message||"Pengaturan CMS tidak dapat dimuat dari backend.");const a=t.data,e=(o,r)=>{const l=document.getElementById(o);l&&(l.value=r??"")};e("cmsSiteTitle",a.site_title),e("cmsSiteTagline",a.site_tagline),e("cmsNavbarTitle",typeof a.navbar_title=="string"?a.navbar_title:"TEGAL RUN 2027"),e("cmsNavbarIcon",Z.includes(a.navbar_icon)?a.navbar_icon:Z[0]),e("cmsNavbarIconUrl",a.navbar_icon_url),e("cmsFaviconUrl",a.favicon_url);const n=a.navbar_icon_mode||(a.navbar_icon_url?"IMAGE":"ICON"),i=document.querySelector(`input[name="cmsNavbarIconMode"][value="${n==="IMAGE"?"IMAGE":"ICON"}"]`);if(i&&(i.checked=!0),le(),De(),e("cmsHeroBadge",a.hero_badge),e("cmsHeroTitle",a.hero_title),e("cmsHeroSubtitle",a.hero_subtitle),e("cmsHeroBgImage",a.hero_bg_image),e("cmsComingSoonTitle",a.coming_soon_title||"COMING SOON EVENT!"),e("cmsComingSoonMessage",typeof a.coming_soon_message=="string"?a.coming_soon_message:"Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!"),e("cmsComingSoonImageUrl",a.coming_soon_image_url),a.stats_banner_items)try{T=JSON.parse(a.stats_banner_items)}catch{T=[]}else T=[1,2,3,4].map(o=>({type:"CUSTOM",val:a[`stat_${o}_val`]||"",unit:a[`stat_${o}_unit`]||"",desc:a[`stat_${o}_desc`]||""})).filter(o=>o.val||o.unit||o.desc);be();try{q=a.faq_items?JSON.parse(a.faq_items):[...We],Array.isArray(q)||(q=[...We])}catch{q=[...We]}pa();let s={};try{s=a.cms_visibility?JSON.parse(a.cms_visibility):{}}catch(o){console.warn("Pengaturan visibilitas CMS tidak valid:",o)}if(Object.entries(ht).forEach(([o,r])=>{const l=document.getElementById(r);l&&(l.checked=s[o]!==!1)}),e("cmsFacilitiesTitle",a.facilities_title),e("cmsFacilitiesDesc",a.facilities_desc),e("cmsFacilitiesImage",a.facilities_image),a.facilities_items)try{G=JSON.parse(a.facilities_items)}catch{G=[...rt]}else G=[...rt];if(Le(),e("cmsTicketsTitle",a.tickets_title),e("cmsTicketsDesc",a.tickets_desc),e("cmsMedalImage",a.medal_image),e("cmsLegalTitle",a.legal_title),e("cmsLegalDesc",a.legal_desc),a.legal_items)try{$=JSON.parse(a.legal_items)}catch{$=[...gn]}else $=[{icon:"fa-certificate",title:a.legal_item_1_title||"Rekomendasi Resmi PB PASI",desc:a.legal_item_1_desc||"Tersertifikasi standar teknis rute dan aturan perlombaan atletik resmi nasional."},{icon:"fa-road-barrier",title:a.legal_item_2_title||"Izin Kepolisian & Dishub",desc:a.legal_item_2_desc||"Pengamanan jalur dan rekayasa lalu lintas penuh demi keselamatan pelari."},{icon:"fa-shield-heart",title:a.legal_item_3_title||"Asuransi Medis Peserta",desc:a.legal_item_3_desc||"Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri selama perlombaan berlangsung."},{icon:"fa-user-lock",title:a.legal_item_4_title||"Perlindungan Data Pribadi (UU PDP)",desc:a.legal_item_4_desc||"Enkripsi data pendaftaran dan kepatuhan penuh perlindungan data konsumen."}];Me(),e("cmsContactEmail",a.contact_email),e("cmsContactPhone",a.contact_phone),e("cmsContactAddress",a.contact_address),e("cmsFooterCopyright",a.footer_copyright),fn()}catch(t){console.error("Gagal memuat pengaturan website CMS:",t),p("error","Gagal Memuat CMS",t.message||"Tidak dapat memuat pengaturan website dari backend.")}}async function lt(t){var o,r,l,c,m,d,u,g,y,v,k,P,N,B,I,x,F,L,E,S,M,A;t.preventDefault();const a=document.getElementById("btnSaveCmsSubmit"),e=a?a.innerHTML:"";a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Menyimpan Pengaturan...');const n=C=>{var O,R;return((R=(O=document.getElementById(C))==null?void 0:O.value)==null?void 0:R.trim())||""},i=((o=document.querySelector('input[name="cmsNavbarIconMode"]:checked'))==null?void 0:o.value)==="IMAGE"?"IMAGE":"ICON",s={site_title:n("cmsSiteTitle"),site_tagline:n("cmsSiteTagline"),navbar_title:n("cmsNavbarTitle"),navbar_icon_mode:i,navbar_icon:Z.includes(n("cmsNavbarIcon"))?n("cmsNavbarIcon"):Z[0],navbar_icon_url:i==="IMAGE"?n("cmsNavbarIconUrl"):"",favicon_url:n("cmsFaviconUrl"),hero_badge:n("cmsHeroBadge"),hero_title:n("cmsHeroTitle"),hero_subtitle:n("cmsHeroSubtitle"),hero_bg_image:n("cmsHeroBgImage"),coming_soon_title:n("cmsComingSoonTitle")||"COMING SOON EVENT!",coming_soon_message:n("cmsComingSoonMessage"),coming_soon_image_url:n("cmsComingSoonImageUrl"),stats_banner_items:JSON.stringify(T),facilities_items:JSON.stringify(G),legal_items:JSON.stringify($),faq_items:JSON.stringify(q),cms_visibility:JSON.stringify(Object.fromEntries(Object.entries(ht).map(([C,O])=>{var R;return[C,((R=document.getElementById(O))==null?void 0:R.checked)!==!1]}))),stat_1_val:((r=T[0])==null?void 0:r.val)||"",stat_1_unit:((l=T[0])==null?void 0:l.unit)||"",stat_1_desc:((c=T[0])==null?void 0:c.desc)||"",stat_2_val:((m=T[1])==null?void 0:m.val)||"",stat_2_unit:((d=T[1])==null?void 0:d.unit)||"",stat_2_desc:((u=T[1])==null?void 0:u.desc)||"",stat_3_val:((g=T[2])==null?void 0:g.val)||"",stat_3_unit:((y=T[2])==null?void 0:y.unit)||"",stat_3_desc:((v=T[2])==null?void 0:v.desc)||"",stat_4_val:((k=T[3])==null?void 0:k.val)||"",stat_4_unit:((P=T[3])==null?void 0:P.unit)||"",stat_4_desc:((N=T[3])==null?void 0:N.desc)||"",facilities_title:n("cmsFacilitiesTitle"),facilities_desc:n("cmsFacilitiesDesc"),facilities_image:n("cmsFacilitiesImage"),tickets_title:n("cmsTicketsTitle"),tickets_desc:n("cmsTicketsDesc"),medal_image:n("cmsMedalImage"),legal_title:n("cmsLegalTitle"),legal_desc:n("cmsLegalDesc"),legal_item_1_title:((B=$[0])==null?void 0:B.title)||"",legal_item_1_desc:((I=$[0])==null?void 0:I.desc)||"",legal_item_2_title:((x=$[1])==null?void 0:x.title)||"",legal_item_2_desc:((F=$[1])==null?void 0:F.desc)||"",legal_item_3_title:((L=$[2])==null?void 0:L.title)||"",legal_item_3_desc:((E=$[2])==null?void 0:E.desc)||"",legal_item_4_title:((S=$[3])==null?void 0:S.title)||"",legal_item_4_desc:((M=$[3])==null?void 0:M.desc)||"",contact_email:n("cmsContactEmail"),contact_phone:n("cmsContactPhone"),contact_address:n("cmsContactAddress"),footer_copyright:n("cmsFooterCopyright")};try{const C=await h("/admin/settings/website",{method:"PUT",body:JSON.stringify(s)});if(C.status==="success"){p("success","Tersimpan","Konten website, branding navbar, favicon, statistik, fasilitas, dan legalitas berhasil disimpan!");const O=document.getElementById("cmsFaviconUrl");O&&typeof((A=C.data)==null?void 0:A.favicon_url)=="string"&&(O.value=C.data.favicon_url,De());const R=document.getElementById("cmsWebsitePreview");R&&R.dataset.loaded==="true"&&(R.src=`${window.location.origin}/?cmsPreview=${Date.now()}`)}else p("error","Gagal Menyimpan",C.message||"Terjadi kesalahan")}catch(C){p("error","Kesalahan Server",C.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}window.loadCmsSettings=vt;let fe=null;function ue(){const t=document.getElementById("routeMapMode"),a=document.getElementById("routeCheckpointMode"),e=document.getElementById("routeMapUrlField"),n=document.getElementById("routeMapImageField"),i=document.getElementById("routeCheckpointImageField"),s=document.querySelectorAll(".route-manual-only");if(!t||!a)return;e.hidden=t.value!=="GMAPS",n.hidden=t.value!=="IMAGE",i.hidden=a.value!=="IMAGE",s.forEach(r=>{r.hidden=a.value!=="MANUAL"});const o=(r,l)=>{var g;const c=((g=document.getElementById(r))==null?void 0:g.value.trim())||"",m=document.getElementById(l),d=m==null?void 0:m.querySelector("img");let u=!1;try{u=["http:","https:"].includes(new URL(c).protocol)}catch{u=!1}m&&(m.hidden=!u),d&&(u?d.src=c:d.removeAttribute("src"))};o("routeSettingsMapImage","routeMapImagePreview"),o("routeSettingsCheckpointImage","routeCheckpointImagePreview")}async function yn(){try{const t=await h("/admin/settings/website");if(t.status!=="success"||!t.data)throw new Error(t.message||"Pengaturan rute tidak dapat dimuat.");const a=t.data;document.getElementById("routeSettingsBadgeLabel").value=a.route_badge_label||"",document.getElementById("routeSettingsTitle").value=a.route_title||"",document.getElementById("routeSettingsDescription").value=a.route_desc||"",document.getElementById("routeSettingsGpx").value=a.route_gpx_url||"",document.getElementById("routeSettingsGmaps").value=a.route_gmaps_url||a.gmaps_embed_url||"",document.getElementById("routeSettingsMapImage").value=a.route_map_image||"",document.getElementById("routeSettingsCheckpointImage").value=a.route_checkpoint_image||"",document.getElementById("routeMapMode").value=a.route_map_mode==="IMAGE"?"IMAGE":"GMAPS",document.getElementById("routeCheckpointMode").value=a.route_checkpoint_mode==="IMAGE"?"IMAGE":"MANUAL",ue()}catch(t){console.error("Failed to load route settings:",t),p("error","Gagal Memuat Pengaturan Rute",t.message)}}async function hn(t){t.preventDefault();const a=document.getElementById("btnSaveRouteSettings"),e=a.innerHTML;a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';const n={route_badge_label:document.getElementById("routeSettingsBadgeLabel").value.trim(),route_title:document.getElementById("routeSettingsTitle").value.trim(),route_desc:document.getElementById("routeSettingsDescription").value.trim(),route_gpx_url:document.getElementById("routeSettingsGpx").value.trim(),route_gmaps_url:document.getElementById("routeSettingsGmaps").value.trim(),route_map_image:document.getElementById("routeSettingsMapImage").value.trim(),route_map_mode:document.getElementById("routeMapMode").value,route_checkpoint_mode:document.getElementById("routeCheckpointMode").value,route_checkpoint_image:document.getElementById("routeSettingsCheckpointImage").value.trim()};try{const i=await h("/admin/settings/website",{method:"PUT",body:JSON.stringify(n)});if(i.status!=="success")throw new Error(i.message||"Pengaturan rute gagal disimpan.");p("success","Pengaturan Rute Tersimpan","Peta dan mode checkpoint sudah tersinkron ke website."),await Ee({showLoading:!1,loadSettings:!1})}catch(i){p("error","Gagal Menyimpan Rute",i.message)}finally{a.disabled=!1,a.innerHTML=e}}async function Ee({showLoading:t=!0,loadSettings:a=!0}={}){const e=document.getElementById("routePointsTableBody");if(e){a&&await yn(),t&&(e.innerHTML='<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--color-text-muted);">Memuat data...</td></tr>');try{const n=await h("/admin/routes/points");n.status==="success"?(f.routePoints=n.data,vn(n.data)):t?e.innerHTML='<tr><td colspan="8" style="text-align:center;padding:20px;color:#EF4444;">Gagal memuat data checkpoint.</td></tr>':console.error("Failed to refresh route points:",n.message||"Unexpected response")}catch(n){console.error("Failed to load route points:",n),t&&(e.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:20px;color:#EF4444;">${n.message}</td></tr>`)}}}function vn(t){const a=document.getElementById("routePointsTableBody");if(a){if(!t||t.length===0){a.innerHTML='<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--color-text-muted);">Belum ada checkpoint. Klik "Tambah Checkpoint" untuk menambahkan.</td></tr>';return}a.innerHTML=t.map(e=>`
    <tr>
      <td style="font-weight:700;">${e.orderIndex}</td>
      <td><strong>${e.name}</strong></td>
      <td>${e.distanceKm} Km</td>
      <td><span class="status-badge" style="background:${e.category==="10K"?"#FFF7ED":e.category==="5K"?"#EFF6FF":"#F0FDF4"};color:${e.category==="10K"?"#C2410C":e.category==="5K"?"#2563EB":"#15803D"};">${e.category}</span></td>
      <td style="text-align:center;">${e.isWaterStation?'<span style="color:#2563EB;font-size:1.1rem;">💧</span>':'<span style="color:#CBD5E1;">—</span>'}</td>
      <td style="text-align:center;">${e.isMedicalSpot?'<span style="color:#16A34A;font-size:1.1rem;">🏥</span>':'<span style="color:#CBD5E1;">—</span>'}</td>
      <td style="color:#64748B;font-size:0.82rem;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.description||"—"}</td>
      <td>
        <div style="display:flex;gap:6px;justify-content:center;">
          <button class="btn btn-secondary btn-sm" data-permission="routes:manage" onclick="openEditRoutePoint(${JSON.stringify(JSON.stringify(e))})" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-sm" data-permission="routes:manage" style="background:#FEE2E2;color:#EF4444;border:1px solid #FECACA;" onclick="deleteRoutePointApi('${e.id}')" title="Hapus">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join(""),te(f.profile)}}function kn(){fe=null;const t=document.getElementById("modalRoutePointTitle");t&&(t.innerHTML='<i class="fa-solid fa-map-pin" style="color:var(--color-primary);"></i> Tambah Checkpoint Baru'),document.getElementById("routeFormId").value="",document.getElementById("routeFormOrderIndex").value="",document.getElementById("routeFormDistanceKm").value="",document.getElementById("routeFormName").value="",document.getElementById("routeFormCategory").value="ALL",document.getElementById("routeFormIcon").value="",document.getElementById("routeFormDescription").value="",document.getElementById("routeFormImage").value="",document.getElementById("routeFormIsWaterStation").checked=!1,document.getElementById("routeFormIsMedicalSpot").checked=!1,document.getElementById("modalRoutePointBackdrop").classList.add("open")}function En(t){const a=typeof t=="string"?JSON.parse(t):t;fe=a.id;const e=document.getElementById("modalRoutePointTitle");e&&(e.innerHTML='<i class="fa-solid fa-pen" style="color:var(--color-primary);"></i> Edit Checkpoint'),document.getElementById("routeFormId").value=a.id,document.getElementById("routeFormOrderIndex").value=a.orderIndex,document.getElementById("routeFormDistanceKm").value=a.distanceKm,document.getElementById("routeFormName").value=a.name,document.getElementById("routeFormCategory").value=a.category||"ALL",document.getElementById("routeFormIcon").value=a.icon||"",document.getElementById("routeFormDescription").value=a.description||"",document.getElementById("routeFormImage").value=a.image||"",document.getElementById("routeFormIsWaterStation").checked=!!a.isWaterStation,document.getElementById("routeFormIsMedicalSpot").checked=!!a.isMedicalSpot,document.getElementById("modalRoutePointBackdrop").classList.add("open")}async function In(t){t.preventDefault();const a=document.getElementById("btnSaveRouteSubmit");a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');const e={orderIndex:parseInt(document.getElementById("routeFormOrderIndex").value,10),distanceKm:parseFloat(document.getElementById("routeFormDistanceKm").value),name:document.getElementById("routeFormName").value.trim(),category:document.getElementById("routeFormCategory").value,icon:document.getElementById("routeFormIcon").value.trim()||null,description:document.getElementById("routeFormDescription").value.trim()||null,image:document.getElementById("routeFormImage").value.trim()||null,isWaterStation:document.getElementById("routeFormIsWaterStation").checked,isMedicalSpot:document.getElementById("routeFormIsMedicalSpot").checked};try{let n;fe?n=await h(`/admin/routes/points/${fe}`,"PUT",e):n=await h("/admin/routes/points","POST",e),n.status==="success"?(p("success","Berhasil!",fe?"Checkpoint berhasil diperbarui.":"Checkpoint baru berhasil ditambahkan."),document.getElementById("modalRoutePointBackdrop").classList.remove("open"),await Ee()):p("error","Gagal",n.message||"Terjadi kesalahan.")}catch(n){p("error","Error",n.message)}finally{a&&(a.disabled=!1,a.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Simpan Checkpoint')}}async function xn(t){if(await K({title:"Hapus Checkpoint",message:"Checkpoint ini akan dihapus permanen dari database. Lanjutkan?",confirmText:"Ya, Hapus",type:"danger"}))try{const e=await h(`/admin/routes/points/${t}`,"DELETE");e.status==="success"?(p("success","Dihapus!","Checkpoint berhasil dihapus."),await Ee()):p("error","Gagal",e.message||"Gagal menghapus checkpoint.")}catch(e){p("error","Error",e.message)}}window.openEditRoutePoint=En;window.deleteRoutePointApi=xn;let Y=[],_=null;async function Ze(){const t=document.getElementById("waContactListContainer");t&&(t.innerHTML=`
      <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--color-primary); display: block;"></i>
        Menghubungkan konsol WhatsApp Web...
      </div>
    `);try{const a=await h("/admin/notifications/whatsapp/session");a&&a.status==="success"&&a.data&&_e(a.data);const e=await h("/admin/notifications/logs");e&&e.status==="success"&&e.data&&(Y=e.data.items||[],Ge(Y),Y.length>0&&!_&&ga(Y[0]))}catch(a){console.warn("Gagal memuat konsol WhatsApp Web:",a),t&&(t.innerHTML=`<div style="padding: 20px; text-align: center; color: #EF4444; font-size: 0.85rem;">Gagal memuat kontak: ${a.message}</div>`)}}function _e(t){const a=document.getElementById("waWebHeaderStatus"),e=document.getElementById("waWebMyNumber"),n=document.getElementById("waWebMyStatusText");if(!t||t.status==="DISCONNECTED"){a&&(a.innerHTML=`
        <span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; padding: 6px 14px; font-weight: 700;">
          <i class="fa-solid fa-circle-xmark"></i> Status: Terputus (Belum Scan QR)
        </span>
      `),e&&(e.textContent="WhatsApp Belum Terhubung"),n&&(n.innerHTML='<span style="width: 7px; height: 7px; background: #DC2626; border-radius: 50%; display: inline-block;"></span> Offline (Klik Scan QR)',n.style.color="#DC2626");return}if(t.status==="SCAN_QR"){a&&(a.innerHTML=`
        <span class="badge" style="background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; padding: 6px 14px; font-weight: 700;">
          <i class="fa-solid fa-spinner fa-spin"></i> Menunggu Scan QR di Ponsel
        </span>
      `),e&&(e.textContent="Menunggu Scan Ponsel..."),n&&(n.innerHTML='<span style="width: 7px; height: 7px; background: #F59E0B; border-radius: 50%; display: inline-block;"></span> Pindai Kode QR',n.style.color="#F59E0B");return}t.status==="CONNECTED"&&(a&&(a.innerHTML=`
        <span class="badge" style="background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; padding: 6px 14px; font-weight: 700;">
          <i class="fa-solid fa-circle-check"></i> Gateway Aktif (${t.connectedNumber||"Online"})
        </span>
      `),e&&(e.textContent=t.connectedNumber||"Server WhatsApp Web"),n&&(n.innerHTML='<span style="width: 7px; height: 7px; background: #22C55E; border-radius: 50%; display: inline-block;"></span> Online &amp; Terhubung',n.style.color="#22C55E"))}function Ge(t){const a=document.getElementById("waContactListContainer");if(a){if(!t||t.length===0){a.innerHTML=`
      <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        Tidak ada kontak peserta ditemukan.
      </div>
    `;return}a.innerHTML=t.map(e=>{const n=_&&_.orderId===e.orderId,i=(e.customerName||"P").charAt(0).toUpperCase(),s=e.orderStatus==="SETTLEMENT"||e.orderStatus==="CAPTURE",o=s?"#10B981":"#F59E0B",r=s?"#ECFDF5":"#FFFBEB",l=s?"LUNAS":e.orderStatus||"PENDING";return`
      <div class="wa-contact-card ${n?"active":""}" onclick="selectWhatsAppContactByOrderId('${e.orderId}')">
        <div class="wa-avatar" style="width: 38px; height: 38px; font-size: 0.85rem; background: ${s?"#22C55E":"#64748B"};">
          ${i}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <div style="font-weight: 700; font-size: 0.88rem; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${b(e.customerName)}
            </div>
            <span style="font-size: 0.68rem; background: ${r}; color: ${o}; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
              ${l}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #64748B;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${b(e.ticketName)} • ${b(e.customerPhone)}
            </span>
            ${e.whatsappSent?'<i class="fa-solid fa-check-double" style="color: #38BDF8; font-size: 0.75rem;" title="Terkirim via WhatsApp"></i>':""}
          </div>
        </div>
      </div>
    `}).join("")}}window.selectWhatsAppContactByOrderId=function(t){const a=Y.find(e=>e.orderId===t);a&&ga(a)};function ga(t){_=t,Ge(Y);const a=document.getElementById("waActiveName"),e=document.getElementById("waActivePhone"),n=document.getElementById("waActiveBadge"),i=document.getElementById("waActiveAvatar"),s=document.getElementById("waChatMessagesBox");a&&(a.textContent=t.customerName),e&&(e.textContent=t.customerPhone),i&&(i.textContent=(t.customerName||"P").charAt(0).toUpperCase());const o=t.orderStatus==="SETTLEMENT"||t.orderStatus==="CAPTURE";if(n&&(n.innerHTML=`
      <span class="badge" style="background: ${o?"#ECFDF5":"#FFFBEB"}; color: ${o?"#059669":"#D97706"}; font-size: 0.7rem; padding: 2px 8px;">
        ${t.ticketName} • ${o?"Lunas":"Belum Bayar"}
      </span>
    `),s){const r=t.createdAt?new Date(t.createdAt).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}):"10:00";let l=`Halo ${t.customerName} 👋

Terima kasih telah mendaftar di *Tegal Run 2027*!

📋 *Detail Tiket Lari:*
• Kategori: ${t.ticketName}
• Order ID: ${t.midtransOrderId||t.orderId}
• Status: ${o?"✅ LUNAS (SETTLEMENT)":"⏳ MENUNGGU PEMBAYARAN"}
• Nomor BIB: ${t.bibNumbers||"-"}

${o?"🎉 E-Tiket PDF resmi dan QR Check-in Anda telah terverifikasi.":"Silakan selesaikan pembayaran untuk mengamankan slot race Anda."}

Salam,
*Komite Resmi Tegal Run 2027*`;s.innerHTML=`
      <div class="wa-system-pill">
        <i class="fa-solid fa-lock"></i> Sesi chat langsung WhatsApp Web Server (Multi-Device Engine)
      </div>
      <div class="wa-bubble wa-bubble-out">
        ${b(l).replace(/\n/g,"<br>")}
        <div class="wa-bubble-time">
          <span>${r}</span>
          <i class="fa-solid fa-check-double" style="color: #38BDF8;"></i>
        </div>
      </div>
    `,s.scrollTop=s.scrollHeight}}async function An(){var i;const t=document.getElementById("waDirectChatInput"),a=(i=t==null?void 0:t.value)==null?void 0:i.trim();if(!a){p("warning","Pesan Kosong","Tuliskan teks pesan WhatsApp terlebih dahulu.");return}if(!_||!_.customerPhone){p("warning","Pilih Peserta","Pilih kontak peserta terlebih dahulu dari daftar di sebelah kiri.");return}const e=document.getElementById("btnSendWaDirectMsg"),n=e==null?void 0:e.innerHTML;e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const s=await h("/admin/notifications/whatsapp/send-direct",{method:"POST",body:JSON.stringify({phoneNumber:_.customerPhone,message:a})});if(s&&s.status==="success"){p("success","Terkirim","Pesan WhatsApp berhasil terkirim ke "+_.customerPhone);const o=document.getElementById("waChatMessagesBox");if(o){const r=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}),l=document.createElement("div");l.className="wa-bubble wa-bubble-out",l.innerHTML=`
          ${b(a).replace(/\n/g,"<br>")}
          <div class="wa-bubble-time">
            <span>${r}</span>
            <i class="fa-solid fa-check-double" style="color: #38BDF8;"></i>
          </div>
        `,o.appendChild(l),o.scrollTop=o.scrollHeight}t&&(t.value="")}else p("error","Gagal Kirim",(s==null?void 0:s.message)||"Gagal mengirim pesan.")}catch(s){p("error","Kesalahan",s.message)}finally{e&&(e.disabled=!1,e.innerHTML=n)}}function Bn(){const t=document.getElementById("waQuickTemplateSelect"),a=document.getElementById("waDirectChatInput");if(!t||!a)return;const e=t.value;if(!e)return;const n=_||{customerName:"Peserta",ticketName:"Tegal Run 2027",midtransOrderId:"TR-ORD-001",bibNumbers:"10K-001",totalAmount:25e4};e==="PAID_TICKET"?a.value=`Halo ${n.customerName},

Pembayaran tiket ${n.ticketName} (Order ID: ${n.midtransOrderId||n.orderId}) telah BERHASIL diverifikasi ✅.

Nomor BIB: ${n.bibNumbers||"-"}
Total: Rp${(n.totalAmount||0).toLocaleString("id-ID")}

E-Tiket resmi Anda siap digunakan untuk pengambilan Race Pack. Simpan bukti ini dengan baik. Sampai jumpa di Race Day Tegal Run 2027! 🏃‍♂️🔥`:e==="PENDING_INVOICE"?a.value=`Halo ${n.customerName},

Pesanan tiket ${n.ticketName} Anda (Order ID: ${n.midtransOrderId||n.orderId}) masih menunggu pembayaran ⏳.

Total Tagihan: Rp${(n.totalAmount||0).toLocaleString("id-ID")}

Mohon selesaikan pembayaran sebelum batas waktu berakhir agar slot Anda tidak dibatalkan otomatis oleh sistem. Terima kasih!`:e==="RACEPACK_INFO"?a.value=`Halo ${n.customerName},

Pengambilan Race Pack (BIB, Jersey & Goodie Bag) Tegal Run 2027 akan dilaksanakan pada:
📅 H-2 & H-1 Race Day
📍 Race Village Alun-Alun Kota Tegal
⏰ 09.00 - 18.00 WIB

Tunjukkan E-Tiket & KTP asli saat pengambilan. Terima kasih!`:e==="THANK_YOU"&&(a.value=`Halo ${n.customerName},

Terima kasih telah menjadi bagian dari Tegal Run 2027! Semangat berlatih dan jaga kesehatan menuju garis start. Jika membutuhkan bantuan, hubungi kami di sini. Salam Pelari! 🏅`)}async function dt(t){if(!_){p("warning","Pilih Peserta","Pilih kontak peserta terlebih dahulu.");return}try{const a=await h("/admin/notifications/dispatch-single",{method:"POST",body:JSON.stringify({orderId:_.orderId})});a&&a.status==="success"?(p("success","Terkirim",`Notifikasi berhasil diproses ke ${_.customerName}.`),_.whatsappSent=!0,Ge(Y),ga(_)):p("error","Gagal Kirim",(a==null?void 0:a.message)||"Gagal mengirim notifikasi.")}catch(a){p("error","Kesalahan",a.message)}}async function Sn(){var t;try{const a=await h("/admin/notifications/settings");if(a&&a.status==="success"&&a.data){const e=a.data,n=document.getElementById("notifSettingChannel");n&&e.notif_channel&&(n.value=e.notif_channel);const i=document.getElementById("notifSettingDispatchMode");i&&e.wa_dispatch_mode&&(i.value=e.wa_dispatch_mode);const s=(o,r)=>{const l=document.getElementById(o);l&&(l.value=r||"")};s("notifSettingWaUrl",e.wa_gateway_url),s("notifSettingWaToken",e.wa_api_token),s("notifSettingWaSender",e.wa_sender_number),s("notifSettingSmtpHost",e.email_smtp_host),s("notifSettingSmtpPort",e.email_smtp_port),s("notifSettingSmtpUser",e.email_smtp_user),s("notifSettingSmtpPass",e.email_smtp_pass),s("notifSettingEmailFromName",e.email_from_name),s("notifSettingTemplatePaid",e.template_msg_paid),s("notifSettingTemplatePending",e.template_msg_pending),s("notifSettingTemplateCancel",e.template_msg_cancel),ea=((t=e.wa_session)==null?void 0:t.status)||null,je(e.wa_session)}}catch(a){p("error","Gagal Memuat Pengaturan",a.message)}}function je(t){const a=document.getElementById("waSessionStatusBadge"),e=document.getElementById("waQrImageContainer"),n=document.getElementById("waQrCountdown"),i=document.getElementById("waDeviceInfo"),s=document.getElementById("waLastSyncInfo"),o=document.getElementById("btnDisconnectWa");if(!t||t.status==="DISCONNECTED"){a&&(a.innerHTML=`
        <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-circle-xmark"></i> Terputus (Belum Scan QR)
        </span>
      `),e&&(e.innerHTML=`
        <div style="color: #64748B; padding: 30px 10px; font-size: 0.85rem;">
          <i class="fa-solid fa-qrcode" style="font-size: 3rem; margin-bottom: 10px; color: #94A3B8; display: block;"></i>
          Klik tombol <strong>"Generate QR Code"</strong> di samping untuk memulai sesi WhatsApp Web.
        </div>
      `),n&&(n.style.display="none"),i&&(i.textContent="Tidak ada nomor tertaut"),s&&(s.textContent="Status: Belum Terkoneksi"),o&&(o.style.display="none");return}if(t.status==="SCAN_QR"){a&&(a.innerHTML=`
        <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-spinner fa-spin"></i> Menunggu Scan QR Code
        </span>
      `),e&&t.qrCodeUrl&&(e.innerHTML=`
        <img src="${b(t.qrCodeUrl)}" alt="WhatsApp Web QR Code" style="width: 220px; height: 220px; display: block; border-radius: 8px; margin: 0 auto; object-fit: contain;" />
      `),n&&(n.style.display="block",n.innerHTML='<i class="fa-solid fa-clock"></i> Buka WhatsApp &gt; <strong>Perangkat Tertaut (Linked Devices)</strong> &gt; Tautkan Perangkat &gt; Pindai QR.'),i&&(i.textContent="Menunggu scan dari WhatsApp ponsel..."),s&&(s.textContent="QR Code aktif dari server"),o&&(o.style.display="inline-block");return}if(t.status==="CONNECTED"){if(a&&(a.innerHTML=`
        <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-circle-check"></i> TERHUBUNG (WhatsApp Web Online)
        </span>
      `),e&&(e.innerHTML=`
        <div style="color: #10B981; padding: 25px 10px; font-size: 0.88rem; text-align: center;">
          <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; margin-bottom: 12px; color: #10B981; display: block;"></i>
          <strong>WhatsApp Web Aktif</strong><br>
          <span style="color: #64748B; font-size: 0.78rem;">Sesi siap digunakan untuk pengiriman tiket otomatis.</span>
        </div>
      `),n&&(n.style.display="none"),i&&(i.innerHTML=`<span style="color: #10B981;"><i class="fa-solid fa-phone"></i> ${b(t.connectedNumber||"+62 812-3456-7890")}</span> <small style="color:#64748B;">(${b(t.deviceName||"WhatsApp Web")})</small>`),s){const r=t.syncedAt?new Date(t.syncedAt).toLocaleString("id-ID"):"Hari ini";s.textContent=`Tersinkronisasi sejak: ${r}`}o&&(o.style.display="inline-block")}}async function wn(){const t=document.getElementById("btnGenerateWaQr"),a=t==null?void 0:t.innerHTML;t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Membuat QR...');try{const e=await h("/admin/notifications/whatsapp/qr",{method:"POST"});e&&e.status==="success"&&e.data?(je(e.data),_e(e.data),p("success","QR Code Siap","Silakan buka WhatsApp di ponsel dan scan QR Code di layar.")):p("error","Gagal",(e==null?void 0:e.message)||"Gagal menghasilkan QR code.")}catch(e){p("error","Kesalahan",e.message)}finally{t&&(t.disabled=!1,t.innerHTML=a)}}async function Tn(){if(await K({title:"Putuskan Sesi WhatsApp?",message:"Apakah Anda yakin ingin memutuskan (logout) sesi WhatsApp Web ini? Pengiriman otomatis via WhatsApp Web akan dijeda sampai Anda scan ulang.",confirmText:"Ya, Putuskan Sesi",type:"danger"}))try{const a=await h("/admin/notifications/whatsapp/disconnect",{method:"POST"});a&&a.status==="success"&&a.data&&(je(a.data),_e(a.data),p("success","Sesi Diputuskan","Sesi WhatsApp Web telah berhasil keluar (logout)."))}catch(a){p("error","Gagal",a.message)}}let ea=null;function Cn(t){const a=ea;ea=t.status,je(t),_e(t),a==="SCAN_QR"&&t.status==="CONNECTED"&&p("success","WhatsApp Terhubung Otomatis!",`Perangkat ${t.connectedNumber||""} berhasil diverifikasi dan siap kirim.`)}async function Pn(t){var s,o;t.preventDefault();const a=r=>{var l;return(((l=document.getElementById(r))==null?void 0:l.value)||"").trim()},e={notif_channel:((s=document.getElementById("notifSettingChannel"))==null?void 0:s.value)||"WA",wa_dispatch_mode:((o=document.getElementById("notifSettingDispatchMode"))==null?void 0:o.value)||"AUTO",email_smtp_host:a("notifSettingSmtpHost"),email_smtp_port:a("notifSettingSmtpPort"),email_smtp_user:a("notifSettingSmtpUser"),email_smtp_pass:a("notifSettingSmtpPass"),email_from_name:a("notifSettingEmailFromName"),template_msg_paid:a("notifSettingTemplatePaid"),template_msg_pending:a("notifSettingTemplatePending"),template_msg_cancel:a("notifSettingTemplateCancel")},n=document.getElementById("btnSaveNotifSettings"),i=n==null?void 0:n.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const r=await h("/admin/notifications/settings",{method:"PUT",body:JSON.stringify(e)});r&&r.status==="success"?p("success","Berhasil","Seluruh konfigurasi notifikasi, mode pengiriman & template pesan berhasil disimpan."):p("error","Gagal Menyimpan",(r==null?void 0:r.message)||"Terjadi kesalahan.")}catch(r){p("error","Gagal",r.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}async function Fn(){var s,o,r;const t=((s=document.getElementById("testNotifChannel"))==null?void 0:s.value)||"WA",a=(((o=document.getElementById("testNotifTarget"))==null?void 0:o.value)||"").trim(),e=(((r=document.getElementById("testNotifMessage"))==null?void 0:r.value)||"").trim();if(!a){p("warning","Validasi Gagal","Harap isi nomor WhatsApp atau alamat Email tujuan uji coba.");return}const n=document.getElementById("btnSendTestNotif"),i=n==null?void 0:n.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...');try{const l=await h("/admin/notifications/test",{method:"POST",body:JSON.stringify({channel:t,targetPhone:a,targetEmail:a,message:e})});l&&l.status==="success"?p("success","Uji Coba Berhasil",l.message||"Pesan tes berhasil dikirim!"):p("error","Uji Coba Gagal",(l==null?void 0:l.message)||"Gagal mengirim pesan pengujian.")}catch(l){p("error","Kesalahan Server",l.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}let Je={items:[],stats:{}};async function ne({showLoading:t=!0}={}){var s,o;const a=document.getElementById("notifLogsTableBody");a&&t&&(a.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
          <i class="fa-solid fa-spinner fa-spin"></i> Memuat log pengiriman notifikasi...
        </td>
      </tr>
    `);const e=(((s=document.getElementById("searchNotifLogs"))==null?void 0:s.value)||"").trim(),n=((o=document.getElementById("filterNotifDeliveryStatus"))==null?void 0:o.value)||"",i=new URLSearchParams;e&&i.append("search",e),n&&i.append("status",n);try{const r=await h(`/admin/notifications/logs?${i.toString()}`);if(r&&r.status==="success"&&r.data){Je.items=r.data.items||[],Je.stats=r.data.stats||{};const l=document.getElementById("kpiNotifTotalOrders"),c=document.getElementById("kpiNotifSentCount"),m=document.getElementById("kpiNotifPendingCount"),d=document.getElementById("kpiNotifDispatchMode");l&&(l.textContent=r.data.stats.totalOrders||0),c&&(c.textContent=r.data.stats.sentCount||0),m&&(m.textContent=r.data.stats.pendingCount||0),d&&(d.textContent=r.data.stats.dispatchMode==="MANUAL"?"MANUAL (ADMIN)":"OTOMATIS (INSTANT)",d.style.color=r.data.stats.dispatchMode==="MANUAL"?"#F59E0B":"#10B981");const u=await h("/admin/notifications/whatsapp/session"),g=document.getElementById("kpiNotifSessionStatus");g&&(u!=null&&u.data)&&(u.data.status==="CONNECTED"?g.innerHTML=`<span style="color: #10B981;"><i class="fa-solid fa-circle-check"></i> WA Web Online (${b(u.data.connectedNumber||"Aktif")})</span>`:g.innerHTML='<span style="color: #EF4444;"><i class="fa-solid fa-circle-xmark"></i> WA Web Terputus</span>'),Nn(Je.items)}else r&&(console.error("Failed to load notification logs:",r.message||"Unexpected response"),a&&t&&(a.innerHTML='<tr><td colspan="10" style="text-align:center;padding:25px;color:#EF4444;">Gagal memuat log notifikasi.</td></tr>'))}catch(r){console.error("Failed to load notification logs:",r),a&&t&&(a.innerHTML=`
        <tr>
          <td colspan="10" style="text-align: center; padding: 25px; color: #EF4444;">
            <i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat log notifikasi: ${b(r.message)}
          </td>
        </tr>
      `)}}function Nn(t){const a=document.getElementById("notifLogsTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 35px; color: var(--color-text-muted);">
          <i class="fa-solid fa-inbox" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
          Tidak ada data pesanan atau log pengiriman yang cocok.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{let i='<span class="badge" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A;"><i class="fa-solid fa-clock"></i> Belum Dikirim</span>';e.whatsappSent?i='<span class="badge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;"><i class="fa-solid fa-circle-check"></i> Terkirim (WA)</span>':e.deliveryStatus==="FAILED"&&(i='<span class="badge" style="background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA;"><i class="fa-solid fa-circle-xmark"></i> Gagal</span>');let s='<span class="badge" style="background:#F8FAFC;color:#64748B;border:1px solid #E2E8F0;"><i class="fa-solid fa-minus"></i> -</span>';e.emailSent&&(s='<span class="badge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;"><i class="fa-solid fa-envelope-circle-check"></i> Terkirim</span>');const r=e.orderStatus==="SETTLEMENT"||e.orderStatus==="CAPTURE"?'<span class="badge" style="background:#ECFDF5;color:#047857;font-weight:700;">LUNAS</span>':'<span class="badge" style="background:#FFFBEB;color:#B45309;font-weight:700;">PENDING</span>',l=e.lastDispatchedAt?new Date(e.lastDispatchedAt).toLocaleString("id-ID",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):'<span style="color: #94A3B8;">Belum Pernah</span>';return`
      <tr>
        <td>${n+1}</td>
        <td><code>${b(e.midtransOrderId||e.orderId.slice(0,10))}</code></td>
        <td><strong>${b(e.customerName)}</strong></td>
        <td>
          <div style="font-size: 0.82rem;">
            <div><i class="fa-brands fa-whatsapp" style="color: #25D366;"></i> ${b(e.customerPhone)}</div>
            <div style="color: #64748B; font-size: 0.76rem;"><i class="fa-solid fa-envelope" style="color: #38BDF8;"></i> ${b(e.customerEmail)}</div>
          </div>
        </td>
        <td>
          <span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;">${b(e.ticketCategory)}</span>
          <div style="font-size: 0.74rem; color: #64748B; margin-top: 2px;">BIB: ${b(e.bibNumbers)}</div>
        </td>
        <td>${r}</td>
        <td>${i}</td>
        <td>${s}</td>
        <td style="font-size: 0.78rem;">${l}</td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn btn-sm ${e.whatsappSent?"btn-secondary":"btn-primary"} btn-dispatch-single" data-id="${e.orderId}" data-name="${b(e.customerName)}" data-permission="notifications:dispatch" title="Kirim Notifikasi via WhatsApp & Email">
              <i class="fa-solid fa-paper-plane"></i> ${e.whatsappSent?"Kirim Ulang":"Kirim"}
            </button>
            <a href="/e-ticket.html?orderId=${e.orderId}" target="_blank" class="btn btn-secondary btn-sm" title="Lihat E-Tiket Digital PDF">
              <i class="fa-solid fa-file-pdf"></i>
            </a>
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-dispatch-single").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");Ln(n,i,e)})}),te(f.profile)}}async function Ln(t,a,e){e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const n=await h("/admin/notifications/dispatch-single",{method:"POST",body:JSON.stringify({orderId:t})});n&&n.status==="success"?(p("success","Terkirim!",`Notifikasi tiket untuk ${a||"peserta"} berhasil dikirim.`),ne()):p("error","Gagal Mengirim",(n==null?void 0:n.message)||"Pengiriman notifikasi gagal.")}catch(n){p("error","Kesalahan",n.message)}finally{e&&(e.disabled=!1,e.innerHTML='<i class="fa-solid fa-paper-plane"></i> Kirim')}}async function Mn(){if(!await K({title:"Kirim Notifikasi Massal?",message:"Apakah Anda ingin mengirimkan notifikasi tiket (WhatsApp & Email) untuk SEMUA peserta yang berstatus Lunas / Menunggu Pembayaran?",confirmText:"Ya, Kirim Sekarang",type:"warning"}))return;const a=document.getElementById("btnBatchSendNotif"),e=a==null?void 0:a.innerHTML;a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Memproses Batch...');try{const n=await h("/admin/notifications/dispatch-batch",{method:"POST"});n&&n.status==="success"?(p("success","Batch Selesai",n.message||"Notifikasi massal berhasil diproses."),ne()):p("error","Gagal",(n==null?void 0:n.message)||"Gagal memproses pengiriman batch.")}catch(n){p("error","Kesalahan",n.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}let D=null,J=null,de=null,Ce=null,ce=null;if(typeof window<"u"&&"BarcodeDetector"in window)try{ce=new window.BarcodeDetector({formats:["qr_code","code_128","ean_13"]})}catch{ce=null}async function Ie(){try{const t=await h("/admin/racepack/stats");if(t&&t.status==="success"&&t.data){const a=t.data,e=document.getElementById("rpcKpiCheckedIn"),n=document.getElementById("rpcKpiRemaining"),i=document.getElementById("rpcKpiPaidTotal"),s=document.getElementById("rpcKpiPercentage"),o=(r,l)=>{r&&(r.textContent=l)};o(e,a.checkedInCount),o(n,a.remainingToCollect),o(i,a.paidParticipants),o(s,`${a.percentage}% dari peserta lunas`),o(document.getElementById("rpcInfoCheckedIn"),a.checkedInCount),o(document.getElementById("rpcInfoRemaining"),a.remainingToCollect),o(document.getElementById("rpcInfoPaidTotal"),a.paidParticipants),o(document.getElementById("rpcInfoPercentage"),`${a.percentage}% dari peserta lunas`)}}catch(t){console.warn("Gagal memuat statistik racepack:",t)}}async function ee(t){var s;if(!t||!String(t).trim())return;const a=String(t).trim(),e=document.getElementById("rpcManualSearchInput");if(e)if(a.includes("|")){const o=a.split("|").map(r=>r.trim()).filter(Boolean);e.value=o[2]||o[1]||a}else e.value=a;const n=document.getElementById("btnRpcSearchSubmit"),i=n?n.innerHTML:"";n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const o=await h(`/admin/racepack/verify/${encodeURIComponent(a)}`);o&&o.status==="success"&&o.data?(D=o.data,he(o.data),p("success","E-Tiket Ditemukan",`Data pelari: ${(s=o.data.participant)==null?void 0:s.fullNameKtp}`)):p("error","Tidak Ditemukan",(o==null?void 0:o.message)||"Data peserta tidak ditemukan.")}catch(o){p("error","Gagal Verifikasi",o.message||"Terjadi kesalahan sistem.")}finally{n&&(n.disabled=!1,n.innerHTML=i)}}function he(t){var N,B,I,x,F,L,E,S,M;const a=document.getElementById("rpcEmptyState"),e=document.getElementById("rpcDetailsState"),n=document.getElementById("rpcMasterState");if(t.isMaster&&Array.isArray(t.participants)){a&&(a.style.display="none"),e&&(e.style.display="none"),n&&(n.style.display="block",Dn(t,n));return}n&&(n.style.display="none"),a&&(a.style.display="none"),e&&(e.style.display="block");const i=t.participant,s=t.isPaid,o=t.racepack,r=document.getElementById("rpcPaymentBanner"),l=document.getElementById("rpcPaymentIcon"),c=document.getElementById("rpcPaymentTitle"),m=document.getElementById("rpcPaymentSub"),d=document.getElementById("rpcPaymentBadge"),u=document.getElementById("btnConfirmRpcCheckin"),g=document.getElementById("rpcActionBtnWrapper");if(r&&l&&c&&d)if(s)r.style.background="#F0FDF4",r.style.border="1px solid #BBF7D0",r.style.color="#15803D",l.innerHTML='<i class="fa-solid fa-circle-check" style="color: #22C55E;"></i>',c.textContent="PEMBAYARAN TERVERIFIKASI & LUNAS",m&&(m.textContent=`Status Midtrans: ${((N=i.order)==null?void 0:N.status)||"SETTLEMENT"} • Berhak mengambil racepack resmi.`),d.style.background="#DCFCE7",d.style.color="#15803D",d.textContent="LUNAS (PAID)",u&&(u.disabled=!1,u.style.opacity="1",u.style.cursor="pointer");else{const A=((B=i.order)==null?void 0:B.status)==="PENDING";r.style.background=A?"#FFFBEB":"#FEF2F2",r.style.border=`1px solid ${A?"#FDE68A":"#FECACA"}`,r.style.color=A?"#B45309":"#B91C1C",l.innerHTML=A?'<i class="fa-solid fa-clock" style="color: #F59E0B;"></i>':'<i class="fa-solid fa-triangle-exclamation" style="color: #EF4444;"></i>',c.textContent=A?"PERINGATAN: PEMBAYARAN MASIH MENUNGGU (PENDING)":`DIBATALKAN (${((I=i.order)==null?void 0:I.status)||"EXPIRED"})`,m&&(m.textContent="DILARANG menyerahkan racepack sebelum pembayaran berstatus LUNAS."),d.style.background=A?"#FEF3C7":"#FEE2E2",d.style.color=A?"#92400E":"#991B1B",d.textContent=((x=i.order)==null?void 0:x.status)||"BELUM LUNAS",u&&(u.disabled=!0,u.style.opacity="0.6",u.style.cursor="not-allowed")}const y=(A,C)=>{const O=document.getElementById(A);O&&(O.textContent=C||"-")};y("rpcFullName",i.fullNameKtp),y("rpcBibNumber",i.bibNumber||"BELUM ADA"),y("rpcBibName",i.bibName||i.fullNameKtp),y("rpcNik",i.nik),y("rpcGender",i.gender==="MALE"?"LAKI-LAKI":"PEREMPUAN"),y("rpcBloodType",i.bloodType||"O"),y("rpcEventCategory",`Kategori ${((F=i.event)==null?void 0:F.category)||"10K"}`),y("rpcPhone",((E=(L=i.order)==null?void 0:L.user)==null?void 0:E.phoneNumber)||"-"),y("rpcEmergency",`${i.emergencyContactName} (${i.emergencyContactPhone})`),y("rpcOrderId",((S=i.order)==null?void 0:S.midtransOrderId)||i.orderId);const v=i.selectedSize||"M";y("rpcJerseyBadge",`Ukuran Jersey: ${v}`),y("chkJerseySizeText",v),y("chkJerseyTypeText",((M=i.jersey)==null?void 0:M.name)||"Dry-Fit Official Tegal Run"),y("chkBibText",i.bibNumber||"Auto-assigned");const k=document.getElementById("rpcAlreadyCheckedInBox"),P=document.getElementById("rpcCheckinTimestampText");if(o&&o.checkedIn){if(k&&(k.style.display="block"),g&&(g.style.display="none"),P){const A=new Date(o.checkedInAt).toLocaleString("id-ID");P.textContent=`Diserahkan pada: ${A} WIB oleh Petugas: ${o.checkedInBy||"Admin"}`}u&&(u.innerHTML='<i class="fa-solid fa-arrows-rotate"></i> Perbarui Catatan Serah Terima',u.className="btn btn-secondary btn-sm")}else k&&(k.style.display="none"),g&&(g.style.display="block"),u&&(o!=null&&o.queued?(u.innerHTML='<i class="fa-solid fa-box-check"></i> Konfirmasi Check-in',u.className="btn btn-primary btn-glow",u.disabled=!1,u.style.opacity="1",u.style.cursor="pointer"):(u.innerHTML='<i class="fa-solid fa-paper-plane"></i> Kirim ke Antrean',u.className="btn btn-primary btn-glow",u.disabled=!s))}function Dn(t,a){var l,c,m;const e=t.order,n=t.participants||[],i=t.isPaid,s=e.midtransOrderId||e.id,o=n.every(d=>{var u;return(u=d.racepack)==null?void 0:u.checkedIn});a.innerHTML=`
    <!-- Master Header Banner -->
    <div style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); color: #FFFFFF; border-radius: 14px; padding: 18px 20px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
        <span style="background: #FEF3C7; color: #92400E; font-size: 0.72rem; font-weight: 900; padding: 4px 10px; border-radius: 9999px;">
          <i class="fa-solid fa-layer-group"></i> QR CODE MASTER (${n.length} PESERTA)
        </span>
        <span class="badge" style="background: ${i?"#DCFCE7":"#FEE2E2"}; color: ${i?"#15803D":"#991B1B"}; font-weight: 800; font-size: 0.74rem;">
          ${i?"LUNAS (PAID)":e.status||"BELUM LUNAS"}
        </span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0 0 4px 0;">ORDER REF: ${b(s)}</h3>
      <p style="font-size: 0.8rem; color: #E0E7FF; margin: 0;">Pemesan: <strong>${b(((l=e.user)==null?void 0:l.fullName)||"-")}</strong> (${b(((c=e.user)==null?void 0:c.phoneNumber)||((m=e.user)==null?void 0:m.email)||"-")})</p>
    </div>

    <!-- Participant List Table -->
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
        <span>Daftar Peserta dalam Pesanan (${n.length} Orang):</span>
        <span style="font-size: 0.78rem; font-weight: 600; color: #64748B;">
          ${n.filter(d=>{var u;return(u=d.racepack)==null?void 0:u.checkedIn}).length} / ${n.length} Sudah Diambil
        </span>
      </h4>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${n.map((d,u)=>{var y,v,k;const g=(y=d.racepack)==null?void 0:y.checkedIn;return`
            <div style="background: ${g?"#F0FDF4":"#F8FAFC"}; border: 1px solid ${g?"#BBF7D0":"#E2E8F0"}; border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <strong style="color: #0F172A; font-size: 0.95rem;">#${u+1} ${b(d.fullNameKtp)}</strong>
                  <span style="background: #E0F2FE; color: #0369A1; font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
                    ${b(((v=d.event)==null?void 0:v.category)||"10K")}
                  </span>
                </div>
                <div style="font-size: 0.76rem; color: #64748B; margin-top: 3px;">
                  BIB: <strong style="color: #FF6B00; font-family: monospace;">${b(d.bibNumber||"Saat RPC")}</strong> &bull; Size: <strong>${b(d.selectedSize||"M")}</strong> (${b(((k=d.jersey)==null?void 0:k.type)||"Jersey")})
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge" style="background: ${g?"#DCFCE7":"#FEF3C7"}; color: ${g?"#15803D":"#92400E"}; font-size: 0.72rem; font-weight: 800;">
                  <i class="fa-solid ${g?"fa-check":"fa-clock"}"></i> ${g?"Sudah Diambil":"Belum Diambil"}
                </span>
                <button type="button" class="btn btn-outline btn-sm btnViewSingleRunner" data-participant-id="${d.id}" style="font-size: 0.74rem; padding: 4px 8px;">
                  Detail
                </button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>

    <!-- Batch Checkin Button -->
    <div style="background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 16px; text-align: center;">
      ${o?`
        <div style="color: #15803D; font-weight: 800; font-size: 0.95rem; margin-bottom: 6px;">
          <i class="fa-solid fa-circle-check" style="font-size: 1.5rem; display: block; margin-bottom: 6px; color: #22C55E;"></i>
          Seluruh Peserta (${n.length}) Sudah Menyelesaikan Check-in Racepack!
        </div>
      `:`
        <button type="button" class="btn btn-primary btn-glow" id="btnBatchCheckinAll" style="width: 100%; padding: 14px; font-size: 1rem; font-weight: 800;" ${i?"":'disabled style="opacity: 0.5;"'}>
          <i class="fa-solid fa-paper-plane"></i> Kirim Semua ke Antrean
        </button>
        <span style="font-size: 0.75rem; color: #64748B; margin-top: 8px; display: block;">
          Pilih detail peserta untuk konfirmasi check-in setelah racepack diserahkan.
        </span>
      `}
    </div>
  `,a.querySelectorAll(".btnViewSingleRunner").forEach(d=>{d.addEventListener("click",()=>{const u=d.getAttribute("data-participant-id"),g=n.find(y=>y.id===u);g&&(D={isMaster:!1,participant:g,isPaid:i,racepack:g.racepack||{checkedIn:!1}},he(D))})});const r=document.getElementById("btnBatchCheckinAll");r&&r.addEventListener("click",()=>Rn(t))}async function Rn(t){const e=(t.participants||[]).filter(s=>{var o;return!((o=s.racepack)!=null&&o.checkedIn)}),n=document.getElementById("btnBatchCheckinAll"),i=n?n.innerHTML:"";n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mengirim peserta ke antrean...');try{let s=0;for(const o of e){const r=await h("/admin/racepack/queue",{method:"POST",body:JSON.stringify({participantId:o.id})});if(!r||r.status!=="success")throw new Error(`${(r==null?void 0:r.message)||"Gagal mengirim peserta ke antrean."} (${s} peserta sudah terkirim)`);s+=1}p("success","Peserta Dikirim ke Antrean",`${s} peserta dikirim ke Live View Antrean Racepack.`),ee(t.order.midtransOrderId||t.order.id)}catch(s){p("error","Pengiriman Antrean Gagal",s.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}async function $n(){var i,s,o,r;if(!D||!D.participant){p("warning","Peringatan","Tidak ada data peserta yang sedang dipilih.");return}const t=D.participant;if(!D.isPaid){p("error","Dilarang","Pembayaran tiket belum lunas!");return}const e=document.getElementById("btnConfirmRpcCheckin"),n=!!((i=D.racepack)!=null&&i.queued);if(!(n&&!await K({title:"Konfirmasi Check-in Racepack",message:`Pastikan racepack sudah diserahkan kepada ${t.fullNameKtp}. Konfirmasi check-in sekarang?`,confirmText:"Ya, Konfirmasi Check-in",type:"warning"}))){e&&(e.disabled=!0,e.innerHTML=n?'<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan check-in...':'<i class="fa-solid fa-spinner fa-spin"></i> Mengirim ke antrean...');try{if(n){const l=[["chkItemBib","Nomor BIB"],["chkItemJersey","Jersey"],["chkItemChip","Timing Chip"],["chkItemBag","Drawstring Bag & Race Guide"],["chkItemRefreshment","Suplemen & Refreshment"]].filter(([m])=>{var d;return(d=document.getElementById(m))==null?void 0:d.checked}).map(([,m])=>m),c=await h("/admin/racepack/checkin",{method:"POST",body:JSON.stringify({participantId:t.id,items:l,notes:"Serah terima dikonfirmasi melalui halaman Pengambilan Racepack & Check-in."})});if(!c||c.status!=="success")throw new Error((c==null?void 0:c.message)||"Gagal menyimpan check-in racepack.");D.racepack=c.data,(s=c.data)!=null&&s.bibNumber&&(t.bibNumber=c.data.bibNumber),he(D),p("success","Racepack Diserahkan",c.message),await Promise.all([Ie(),se()])}else{const l=await h("/admin/racepack/queue",{method:"POST",body:JSON.stringify({participantId:t.id})});if(!l||l.status!=="success")throw new Error((l==null?void 0:l.message)||"Gagal mengirim peserta ke antrean.");D.racepack={...D.racepack,queued:!0},he(D),p("success","Dikirim ke Antrean",`${t.fullNameKtp} siap dikonfirmasi di halaman ini.`)}}catch(l){p("error",n?"Gagal Check-in":"Gagal Mengirim",l.message)}finally{e&&!((o=D.racepack)!=null&&o.checkedIn)&&(e.disabled=!1,e.innerHTML=(r=D.racepack)!=null&&r.queued?'<i class="fa-solid fa-box-check"></i> Konfirmasi Check-in':'<i class="fa-solid fa-paper-plane"></i> Kirim ke Antrean')}}}async function On(){if(!(!D||!D.participant||!await K({title:"Batalkan Status Check-in?",message:`Apakah Anda yakin ingin membatalkan status pengambilan racepack untuk "${D.participant.fullNameKtp}"?`,confirmText:"Ya, Batalkan Check-in",type:"danger"})))try{const a=await h("/admin/racepack/revert",{method:"POST",body:JSON.stringify({participantId:D.participant.id})});a&&a.status==="success"?(p("success","Dibatalkan","Status pengambilan racepack berhasil dibatalkan."),D.racepack={checkedIn:!1},he(D),Ie(),se()):p("error","Gagal",a==null?void 0:a.message)}catch(a){p("error","Kesalahan",a.message)}}async function Kn(){document.getElementById("rpcCameraContainer");const t=document.getElementById("rpcCameraPlaceholder"),a=document.getElementById("rpcScanCrosshair"),e=document.getElementById("rpcCameraStatusBadge"),n=document.getElementById("btnStartRpcCamera"),i=document.getElementById("btnStopRpcCamera");if(typeof window<"u"&&window.Html5Qrcode)try{if(t&&(t.style.display="none"),a&&(a.style.display="none"),J){try{await J.stop()}catch{}J=null}J=new window.Html5Qrcode("rpcCameraContainer");const s={fps:15,qrbox:(o,r)=>{const l=Math.min(320,Math.floor(Math.min(o,r)*.82));return{width:l,height:l}},aspectRatio:1};await J.start({facingMode:"environment"},s,o=>{Re(),ze(),ee(o)},()=>{}),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"),e&&(e.textContent="Kamera Live Aktif",e.style.background="#DCFCE7",e.style.color="#15803D"),p("success","Kamera Aktif","Arahkan kamera ke QR Code E-Tiket pelari.");return}catch(s){console.warn("Html5Qrcode live camera start failed, trying fallback stream...",s)}if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){p("warning","Live Stream Memerlukan HTTPS",'Browser HP Anda membatasi live camera pada HTTP lokal. Silakan gunakan tombol "Foto E-Tiket" di samping.'),aa();return}try{const s=document.getElementById("rpcVideoElem"),o=document.getElementById("rpcCameraPlaceholder");let r=null;try{r=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:!1})}catch{r=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1})}de=r,s&&(s.srcObject=de,s.setAttribute("playsinline","true"),await s.play(),s.style.display="block"),o&&(o.style.display="none"),a&&(a.style.display="block"),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"),e&&(e.textContent="Kamera Aktif",e.style.background="#DCFCE7",e.style.color="#15803D"),p("success","Kamera Aktif","Arahkan kamera ke QR Code E-Tiket pelari."),kt()}catch(s){console.error("Camera access error:",s),p("error","Izin Kamera Ditolak / Gagal",'Tidak dapat mengakses live stream kamera. Silakan gunakan tombol "Foto E-Tiket".'),aa()}}async function kt(){const t=document.getElementById("rpcVideoElem");if(!(!t||!de||t.paused||t.ended)){if(t.readyState===t.HAVE_ENOUGH_DATA&&ce)try{const a=await ce.detect(t);if(a&&a.length>0&&a[0].rawValue){Re(),ze(),ee(a[0].rawValue);return}}catch{}Ce=setTimeout(kt,100)}}async function ze(){if(Ce&&(clearTimeout(Ce),Ce=null),J){try{await J.stop(),J.clear()}catch{}J=null}de&&(de.getTracks().forEach(o=>o.stop()),de=null);const t=document.getElementById("rpcVideoElem"),a=document.getElementById("rpcCameraPlaceholder"),e=document.getElementById("rpcScanCrosshair"),n=document.getElementById("rpcCameraStatusBadge"),i=document.getElementById("btnStartRpcCamera"),s=document.getElementById("btnStopRpcCamera");t&&(t.pause(),t.srcObject=null,t.style.display="none"),a&&(a.style.display="block"),e&&(e.style.display="none"),i&&(i.style.display="inline-flex"),s&&(s.style.display="none"),n&&(n.textContent="Standby",n.style.background="#F1F5F9",n.style.color="#475569")}function aa(){const t=document.getElementById("rpcNativeCameraInput");t&&(t.value="",t.click())}async function Hn(t){var e;const a=(e=t.target.files)==null?void 0:e[0];if(a){if(p("info","Memindai Foto QR...","Sedang membaca kode QR dari foto kamera..."),typeof window<"u"&&window.Html5Qrcode)try{const i=await new window.Html5Qrcode("rpcCameraContainer").scanFile(a,!0);if(i){Re(),ee(i);return}}catch(n){console.warn("Html5Qrcode file scan failed, trying BarcodeDetector fallback...",n)}if(ce)try{const n=await createImageBitmap(a),i=await ce.detect(n);if(i&&i.length>0&&i[0].rawValue){Re(),ee(i[0].rawValue);return}}catch{}p("warning","QR Tidak Terbaca Jelas","Pastikan foto QR E-Tiket fokus dan tidak buram, atau masukkan kode secara manual.")}}function Re(){try{const t=new(window.AudioContext||window.webkitAudioContext),a=t.createOscillator(),e=t.createGain();a.connect(e),e.connect(t.destination),a.type="sine",a.frequency.setValueAtTime(880,t.currentTime),e.gain.setValueAtTime(.3,t.currentTime),a.start(),a.stop(t.currentTime+.15)}catch{}}window.verifyRacepackByCode=ee;let Qe=!1;function Un(t){const a=document.getElementById("racepackQueueContainer");if(a){if(!t.length){a.innerHTML='<div class="glass-card" style="padding:28px; text-align:center; color:#64748B;"><i class="fa-solid fa-inbox" style="font-size:2rem; display:block; margin-bottom:8px;"></i>Belum ada peserta di antrean.</div>';return}a.innerHTML=t.map((e,n)=>{var o,r,l,c,m,d,u,g,y,v,k,P,N,B,I;const i=(o=e.queue)!=null&&o.queuedAt?new Date(e.queue.queuedAt).toLocaleString("id-ID"):"-",s=((r=e.event)==null?void 0:r.ticketName)||((l=e.event)==null?void 0:l.category)||"-";return`
      <article class="glass-card" style="padding:18px; border:1px solid #E2E8F0; background:#FFFFFF; border-radius:14px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
          <div>
            <span class="badge" style="background:#FFF7ED; color:#C2410C; font-weight:800;">ANTREAN #${n+1}</span>
            <h4 style="margin:8px 0 4px; color:#0F172A;">${b(e.fullNameKtp)}</h4>
            <div style="color:#475569; font-size:.86rem;">
              ${b(s)} · BIB ${b(e.bibNumber||"Belum diterbitkan")} · Jersey ${b(e.selectedSize||"-")}
            </div>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:8px; margin-top:14px; font-size:.82rem; color:#475569;">
          <div><strong>NIK:</strong> ${b(e.nik||"-")}</div>
          <div><strong>Jenis kelamin / golongan darah:</strong> ${b(e.gender||"-")} / ${b(e.bloodType||"-")}</div>
          <div><strong>Telepon peserta:</strong> ${b(e.phoneNumber||((m=(c=e.order)==null?void 0:c.user)==null?void 0:m.phoneNumber)||"-")}</div>
          <div><strong>Kontak darurat:</strong> ${b(e.emergencyContactName||"-")} (${b(e.emergencyContactPhone||"-")})</div>
          <div><strong>Nama BIB:</strong> ${b(e.bibName||"-")}</div>
          <div><strong>Komunitas:</strong> ${b(e.communityName||"-")}</div>
          <div><strong>Masuk antrean:</strong> ${b(i)}</div>
          <div><strong>Dikirim petugas:</strong> ${b(((d=e.queue)==null?void 0:d.queuedBy)||"-")}</div>
        </div>
        <details style="margin-top:12px; color:#475569; font-size:.82rem;">
          <summary style="cursor:pointer; font-weight:700;">Informasi lengkap peserta &amp; tiket</summary>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:8px; margin-top:10px;">
            <div><strong>Tanggal lahir:</strong> ${b(e.birthDate?new Date(e.birthDate).toLocaleDateString("id-ID"):"-")}</div>
            <div><strong>Tempat lahir:</strong> ${b(e.birthPlace||"-")}</div>
            <div><strong>Alamat:</strong> ${b(e.fullAddress||"-")}</div>
            <div><strong>Riwayat medis:</strong> ${b(e.medicalHistory||"-")}</div>
            <div><strong>Pemesan:</strong> ${b(((g=(u=e.order)==null?void 0:u.user)==null?void 0:g.fullName)||"-")}</div>
            <div><strong>Email pemesan:</strong> ${b(((v=(y=e.order)==null?void 0:y.user)==null?void 0:v.email)||"-")}</div>
            <div><strong>Order:</strong> ${b(((k=e.order)==null?void 0:k.midtransOrderId)||((P=e.order)==null?void 0:P.id)||"-")}</div>
            <div><strong>Status pembayaran:</strong> ${b(((N=e.order)==null?void 0:N.status)||"-")}</div>
            <div><strong>Nama / jenis jersey:</strong> ${b(((B=e.jersey)==null?void 0:B.name)||"-")} / ${b(((I=e.jersey)==null?void 0:I.type)||"-")}</div>
          </div>
        </details>
      </article>
    `}).join("")}}async function ba(){var t;if(!(Qe||!((t=document.getElementById("pane-racepack-view"))!=null&&t.classList.contains("active")))){Qe=!0;try{const a=await h("/admin/racepack/queue");if(!a||a.status!=="success"||!Array.isArray(a.data))throw new Error((a==null?void 0:a.message)||"Gagal memuat data antrean.");Un(a.data);const e=document.getElementById("racepackQueueLastUpdated");e&&(e.textContent=`Diperbarui ${new Date().toLocaleTimeString("id-ID")}`)}catch(a){const e=document.getElementById("racepackQueueContainer");e&&(e.innerHTML=`<div class="glass-card" style="padding:20px; color:#B91C1C;">${b(a.message)}</div>`),console.error("Gagal memuat antrean racepack:",a)}finally{Qe=!1}}}let _n=null;function Et(){var r,l,c,m;const t=((r=document.getElementById("bibInputPrefix"))==null?void 0:r.value)||"",a=parseInt(((l=document.getElementById("bibInputDigitLength"))==null?void 0:l.value)||"4",10),e=parseInt(((c=document.getElementById("bibInputStartNumber"))==null?void 0:c.value)||"1001",10),n=((m=document.getElementById("bibInputSuffix"))==null?void 0:m.value)||"",i=String(e).padStart(a,"0"),s=`${t}${i}${n}`,o=document.getElementById("bibFormatPreviewText");o&&(o.textContent=s)}async function qe(){try{const t=await h("/admin/bib/settings");if(t&&t.status==="success"&&t.data){_n=t.data;const{settings:a,qrPrefix:e,unassignedCount:n,assignedCount:i}=t.data,s=document.getElementById("kpiBibAssigned"),o=document.getElementById("kpiBibUnassigned"),r=document.getElementById("kpiQrFormatPreview");s&&(s.textContent=i),o&&(o.textContent=n),r&&(r.textContent=`${e||"TEGALRUN"}|...`),document.querySelectorAll('input[name="bibTiming"]').forEach(v=>{v.value===a.timing&&(v.checked=!0)});const c=document.getElementById("bibInputPrefix"),m=document.getElementById("bibInputDigitLength"),d=document.getElementById("bibInputStartNumber"),u=document.getElementById("bibInputSuffix");c&&(c.value=a.defaultPrefix||"10-"),m&&(m.value=a.digitLength||4),d&&(d.value=a.startNumber||1001),u&&(u.value=a.suffix||""),Et();const g=document.getElementById("qrInputPrefix"),y=document.getElementById("qrPrefixExample");g&&(g.value=e||"TEGALRUN"),y&&(y.textContent=e||"TEGALRUN")}}catch(t){console.warn("Gagal memuat pengaturan BIB:",t)}try{const t=await h("/admin/settings/racepack-instructions");if(t&&t.status==="success"&&t.data){const a=document.getElementById("rpcInstructionsTitle"),e=document.getElementById("rpcInstructionsTextarea");a&&(a.value=t.data.title||"Petunjuk Pengambilan Racepack & Race Day:"),e&&Array.isArray(t.data.points)&&(e.value=t.data.points.join(`
`))}}catch(t){console.warn("Gagal memuat petunjuk racepack:",t)}try{const t=await h("/admin/settings/payment-fee");if(t&&t.status==="success"&&t.data){const{paymentTimerMinutes:a,feeEnabled:e,feeType:n,feeAmount:i}=t.data,s=document.getElementById("settingPaymentTimerMinutes"),o=document.getElementById("settingFeeEnabled"),r=document.getElementById("settingFeeType"),l=document.getElementById("settingFeeAmount"),c=document.getElementById("groupFeeConfig"),m=document.getElementById("badgeFeeStatus");s&&(s.value=a||30),o&&(o.checked=!!e,c&&(c.style.display=e?"block":"none"),m&&(m.textContent=e?"Aktif":"Nonaktif",m.style.background=e?"#DCFCE7":"#E2E8F0",m.style.color=e?"#166534":"#475569")),r&&(r.value=n||"PER_TRANSACTION"),l&&(l.value=i||0)}}catch(t){console.warn("Gagal memuat pengaturan biaya layanan & timer:",t)}}async function Gn(t){var c,m,d,u;t.preventDefault();const a=document.querySelector('input[name="bibTiming"]:checked'),e=a?a.value:"PAYMENT_SUCCESS",n=((c=document.getElementById("bibInputPrefix"))==null?void 0:c.value)||"",i=parseInt(((m=document.getElementById("bibInputDigitLength"))==null?void 0:m.value)||"4",10),s=parseInt(((d=document.getElementById("bibInputStartNumber"))==null?void 0:d.value)||"1001",10),o=((u=document.getElementById("bibInputSuffix"))==null?void 0:u.value)||"",r=document.getElementById("btnSaveBibSettings"),l=r?r.innerHTML:"";r&&(r.disabled=!0,r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const g=await h("/admin/bib/settings",{method:"PUT",body:JSON.stringify({timing:e,defaultPrefix:n,digitLength:i,startNumber:s,suffix:o})});g&&g.status==="success"?(p("success","Tersimpan",g.message||"Pengaturan penomoran BIB berhasil diperbarui."),qe()):p("error","Gagal",(g==null?void 0:g.message)||"Gagal menyimpan pengaturan BIB.")}catch(g){p("error","Terjadi Kesalahan",g.message)}finally{r&&(r.disabled=!1,r.innerHTML=l)}}async function jn(){if(!await K({title:"Generate Nomor BIB Massal?",message:"Sistem akan mengenerate nomor BIB unik untuk seluruh peserta lunas yang belum memiliki nomor dada. Lanjutkan proses?",confirmText:"Ya, Generate Massal"}))return;const a=document.getElementById("btnTriggerBulkGenerate"),e=a?a.innerHTML:"";a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Memproses...');try{const n=await h("/admin/bib/bulk-generate",{method:"POST",body:JSON.stringify({})});n&&n.status==="success"?(p("success","Berhasil",n.message),qe()):p("error","Gagal",(n==null?void 0:n.message)||"Gagal generate nomor BIB.")}catch(n){p("error","Terjadi Kesalahan",n.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}async function zn(t){var i;t.preventDefault();const a=((i=document.getElementById("qrInputPrefix"))==null?void 0:i.value)||"";if(!a.trim()){p("error","Validasi Gagal","Prefix QR code tidak boleh kosong.");return}const e=document.getElementById("btnSaveQrPrefix"),n=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const s=await h("/admin/settings/qr",{method:"PUT",body:JSON.stringify({prefix:a})});if(s&&s.status==="success"){p("success","Prefix Disimpan",s.message);const o=document.getElementById("qrPrefixExample"),r=document.getElementById("kpiQrFormatPreview");o&&(o.textContent=s.data.prefix),r&&(r.textContent=`${s.data.prefix}|...`)}else p("error","Gagal",(s==null?void 0:s.message)||"Gagal menyimpan prefix QR.")}catch(s){p("error","Terjadi Kesalahan",s.message)}finally{e&&(e.disabled=!1,e.innerHTML=n)}}async function qn(t){var o,r;t.preventDefault();const a=((o=document.getElementById("rpcInstructionsTitle"))==null?void 0:o.value)||"",n=(((r=document.getElementById("rpcInstructionsTextarea"))==null?void 0:r.value)||"").split(`
`).map(l=>l.trim()).filter(Boolean),i=document.getElementById("btnSaveRpcInstructions"),s=i?i.innerHTML:"";i&&(i.disabled=!0,i.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const l=await h("/admin/settings/racepack-instructions",{method:"PUT",body:JSON.stringify({title:a,points:n})});l&&l.status==="success"?p("success","Tersimpan","Petunjuk pengambilan racepack E-Tiket berhasil diperbarui."):p("error","Gagal",(l==null?void 0:l.message)||"Gagal menyimpan petunjuk.")}catch(l){p("error","Terjadi Kesalahan",l.message)}finally{i&&(i.disabled=!1,i.innerHTML=s)}}async function Wn(t){var r,l,c,m;t.preventDefault();const a=parseInt(((r=document.getElementById("settingPaymentTimerMinutes"))==null?void 0:r.value)||"30",10),e=((l=document.getElementById("settingFeeEnabled"))==null?void 0:l.checked)||!1,n=((c=document.getElementById("settingFeeType"))==null?void 0:c.value)||"PER_TRANSACTION",i=parseFloat(((m=document.getElementById("settingFeeAmount"))==null?void 0:m.value)||"0"),s=document.getElementById("btnSavePaymentFeeSettings"),o=s?s.innerHTML:"";s&&(s.disabled=!0,s.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const d=await h("/admin/settings/payment-fee",{method:"PUT",body:JSON.stringify({paymentTimerMinutes:a,feeEnabled:e,feeType:n,feeAmount:i})});if(d&&d.status==="success"){p("success","Tersimpan","Pengaturan batas waktu pembayaran dan biaya layanan berhasil diperbarui.");const u=document.getElementById("badgeFeeStatus");u&&(u.textContent=e?"Aktif":"Nonaktif",u.style.background=e?"#DCFCE7":"#E2E8F0",u.style.color=e?"#166534":"#475569")}else p("error","Gagal",(d==null?void 0:d.message)||"Gagal menyimpan pengaturan.")}catch(d){p("error","Terjadi Kesalahan",d.message)}finally{s&&(s.disabled=!1,s.innerHTML=o)}}function Jn(){var t,a,e,n,i,s,o;["bibInputPrefix","bibInputDigitLength","bibInputStartNumber","bibInputSuffix"].forEach(r=>{var l;(l=document.getElementById(r))==null||l.addEventListener("input",Et)}),(t=document.getElementById("formBibGenerationSettings"))==null||t.addEventListener("submit",Gn),(a=document.getElementById("btnTriggerBulkGenerate"))==null||a.addEventListener("click",jn),(e=document.getElementById("formQrPrefixSettings"))==null||e.addEventListener("submit",zn),(n=document.getElementById("formRacepackInstructions"))==null||n.addEventListener("submit",qn),(i=document.getElementById("formPaymentFeeSettings"))==null||i.addEventListener("submit",Wn),(s=document.getElementById("settingFeeEnabled"))==null||s.addEventListener("change",r=>{const l=document.getElementById("groupFeeConfig"),c=document.getElementById("badgeFeeStatus");l&&(l.style.display=r.target.checked?"block":"none"),c&&(c.textContent=r.target.checked?"Aktif":"Nonaktif",c.style.background=r.target.checked?"#DCFCE7":"#E2E8F0",c.style.color=r.target.checked?"#166534":"#475569")}),(o=document.getElementById("btnRefreshBibSettings"))==null||o.addEventListener("click",qe)}let ct=!1;async function xe(){var a;const t=document.getElementById("roleMonitoringList");if(t){ct||((a=document.getElementById("btnRefreshRoleMonitoring"))==null||a.addEventListener("click",xe),t.addEventListener("click",Vn),ct=!0),t.innerHTML='<p class="role-monitoring-empty">Memuat data pemantauan role...</p>';try{const e=await h("/admin/role-monitoring");if(e.status!=="success"||!Array.isArray(e.data))throw new Error(e.message||"Data pemantauan role tidak tersedia.");Qn(e.data)}catch(e){console.error("Gagal memuat pemantauan role:",e),t.innerHTML='<p class="role-monitoring-empty is-error">Pemantauan role gagal dimuat. Silakan coba muat ulang.</p>',p("error","Gagal Memuat","Data pemantauan role tidak dapat dimuat.")}}}function Qn(t){var c;const a=t.reduce((m,d)=>m+d.activeAdmins,0),e=t.reduce((m,d)=>m+d.onlineAdmins,0),n=document.getElementById("monitoringRoleCount"),i=document.getElementById("monitoringActiveCount"),s=document.getElementById("monitoringOnlineCount");n&&(n.textContent=t.length.toLocaleString("id-ID")),i&&(i.textContent=a.toLocaleString("id-ID")),s&&(s.textContent=e.toLocaleString("id-ID"));const o=(c=f.profile)==null?void 0:c.id,r=t.map(m=>{const d=m.admins.length?m.admins.map(u=>{const g=u.id===o,y=m.name==="SUPERADMIN"||g||!u.isActive,v=u.isOnline?'<span class="role-monitoring-presence is-online">Online</span>':'<span class="role-monitoring-presence">Offline</span>',k=u.isActive?"":'<span class="role-monitoring-account-state">Nonaktif</span>',P=m.name==="SUPERADMIN"?'<span class="role-monitoring-protected">Dilindungi</span>':g?'<span class="role-monitoring-protected">Sesi Anda</span>':`<button type="button" class="btn btn-outline btn-sm btn-force-admin-logout" data-force-logout-admin="${b(u.id)}" data-role-id="${b(m.id)}" data-role-name="${b(m.name)}" data-admin-name="${b(u.fullName)}" ${y?"disabled":""}>
                <i class="fa-solid fa-right-from-bracket"></i> Logout Paksa
              </button>`;return`
          <li class="role-monitoring-member">
            <span class="dashboard-presence-dot ${u.isOnline?"online":"offline"}"></span>
            <span class="role-monitoring-member-name">
              <strong>${b(u.fullName)}</strong>
              <small>@${b(u.username)}${g?" · Sesi Anda":""}</small>
            </span>
            <span class="role-monitoring-member-actions">${v}${k}${P}</span>
          </li>
        `}).join(""):'<li class="role-monitoring-empty">Belum ada akun pada role ini.</li>';return`
      <article class="role-monitoring-card">
        <header class="role-monitoring-card-header">
          <div>
            <h4>${b(m.name)}</h4>
            <p>${m.onlineAdmins} sesi online · ${m.activeAdmins} akun aktif · ${m.totalAdmins} total akun</p>
          </div>
          <span class="role-monitoring-online-count"><i class="fa-solid fa-circle"></i>${m.onlineAdmins} online</span>
        </header>
        <ul class="role-monitoring-members">${d}</ul>
        <footer class="role-monitoring-card-footer">
          <span>${m.name==="SUPERADMIN"?'<i class="fa-solid fa-lock"></i> Role ini dilindungi dari logout paksa.':'<i class="fa-solid fa-circle-info"></i> Logout paksa tersedia per akun aktif.'}</span>
        </footer>
      </article>
    `}),l=document.getElementById("roleMonitoringList");l&&(l.innerHTML=r.join("")||'<p class="role-monitoring-empty">Belum ada role untuk dipantau.</p>')}async function Vn(t){if(!(t.target instanceof Element))return;const a=t.target.closest("[data-force-logout-admin]");if(!(a instanceof HTMLButtonElement)||a.disabled)return;const e=a.dataset.roleId,n=a.dataset.forceLogoutAdmin,i=a.dataset.roleName||"role ini",s=a.dataset.adminName||"akun ini";if(!(!e||!n||!await K({title:"Logout Paksa Akun",message:`Cabut sesi akun ${s} dengan role ${i}? Tindakan ini tidak dapat diterapkan pada role SUPERADMIN.`,confirmText:"Ya, Cabut Sesi",type:"danger"}))){a.disabled=!0;try{const r=await h(`/admin/role-monitoring/${encodeURIComponent(e)}/admins/${encodeURIComponent(n)}/force-logout`,{method:"POST"});if(r.status!=="success")throw new Error(r.message||"Sesi role gagal dicabut.");p("success","Logout Paksa Berhasil",b(r.message||`Sesi ${s} berhasil dicabut.`)),await xe()}catch(r){console.error("Gagal melakukan logout paksa akun:",r),p("error","Logout Paksa Gagal","Sesi akun tidak dapat dicabut. Silakan coba lagi."),a.disabled=!1}}}async function Yn(){const t=document.getElementById("sidebarMount");if(t)try{t.innerHTML=un,Xn()}catch(a){console.error("Sidebar load failed:",a)}}function Xn(){var t,a,e,n,i,s;if(f.profile){const o=document.getElementById("sidebarAdminFullName"),r=document.getElementById("sidebarAdminRole");o&&(o.textContent=f.profile.fullName),r&&(r.textContent=((t=f.profile.role)==null?void 0:t.name)||"ADMIN")}if(document.querySelectorAll(".sidebar-nav .nav-item").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-nav");r&&(ve(r),ta())})}),(a=document.getElementById("btnCloseSidebar"))==null||a.addEventListener("click",ta),(e=document.getElementById("btnSidebarLogout"))==null||e.addEventListener("click",ke),f.profile){te(f.profile);const o=((n=f.profile.role)==null?void 0:n.name)||"",r=Array.isArray((i=f.profile.role)==null?void 0:i.permissions)?f.profile.role.permissions:[];if(!(o==="SUPERADMIN")&&!r.includes("page:dashboard")){const c=(s=Array.from(document.querySelectorAll(".sidebar-nav .nav-item")).find(m=>{const d=m.getAttribute("data-page");return d&&r.includes(d)}))==null?void 0:s.getAttribute("data-nav");c&&ve(c)}}}function ve(t){if(f.profile&&f.profile.role){const o=f.profile.role.name||"",r=Array.isArray(f.profile.role.permissions)?f.profile.role.permissions:[];if(!(o==="SUPERADMIN")){const c=document.querySelector(`.sidebar-nav .nav-item[data-nav="${t}"]`),m=(c==null?void 0:c.getAttribute("data-page"))||`page:${t}`;if(!r.includes(m)){p("warning","Akses Dibatasi",`Role Anda (${o}) tidak memiliki izin mengakses modul ini.`);return}}}f.activeTab=t,document.querySelectorAll(".sidebar-nav .nav-item").forEach(o=>{o.getAttribute("data-nav")===t?o.classList.add("active"):o.classList.remove("active")}),document.querySelectorAll(".admin-tab-pane").forEach(o=>{o.classList.remove("active")});const a=document.getElementById(`pane-${t}`);a&&a.classList.add("active");const e={dashboard:{title:"Dashboard Overview",sub:"Portal Admin / Ringkasan Real-Time"},events:{title:"Manajemen Event & Kategori",sub:"Portal Admin / Manajemen Tiket Lomba"},participants:{title:"Manajemen Peserta",sub:"Portal Admin / Database Pelari & BIB"},racepack:{title:"Pengambilan Racepack & Check-in",sub:"Portal Admin / Validasi E-Tiket & Serah Terima RPC"},"racepack-view":{title:"Live View Antrean Racepack",sub:"Portal Admin / Pemantauan Antrean Real-Time"},orders:{title:"Transaksi & Order",sub:"Portal Admin / Status Pembayaran Tiket"},countdown:{title:"Countdown & Status Event",sub:"Portal Admin / Konfigurasi Race Day"},"bib-settings":{title:"Pengaturan BIB & E-Tiket",sub:"Portal Admin / Aturan BIB, Format QR & Petunjuk"},cms:{title:"Konten Website & CMS",sub:"Portal Admin / Pengaturan Teks, Peta & Media"},routes:{title:"Manajemen Rute & Checkpoint",sub:"Portal Admin / Titik Kumpul & Water Station"},notifications:{title:"Konfigurasi Notifikasi & Gateway",sub:"Portal Admin / WhatsApp & Email Gateway"},"notif-logs":{title:"Log Pengiriman Notifikasi & Peserta",sub:"Portal Admin / WhatsApp & Email Delivery Tracking"},"whatsapp-web":{title:"WhatsApp Web Enterprise Console",sub:"Portal Admin / Real-Time Messaging & Session Hub"},admins:{title:"Kelola Admin & Hak Akses",sub:"Portal Admin / Manajemen RBAC Superadmin"},"role-monitoring":{title:"Pemantauan Semua Role",sub:"Portal Admin / Sesi Online & Kontrol Akses"},logs:{title:"Log Audit Sistem",sub:"Portal Admin / Rekam Jejak Keamanan"}},n=e[t]||e.dashboard,i=document.getElementById("pageTitle"),s=document.getElementById("pageBreadcrumb");i&&(i.textContent=n.title),s&&(s.textContent=n.sub),t==="cms"&&vt(),t==="countdown"&&sa(),t==="bib-settings"&&qe(),t==="routes"&&Ee(),t==="racepack"?Ie():ze(),t==="racepack-view"&&ba(),t==="notifications"?Sn():t==="whatsapp-web"&&Ze(),t==="notif-logs"&&ne(),t==="role-monitoring"&&xe(),window.dispatchEvent(new CustomEvent("admin:tab-changed",{detail:{tabKey:t}}))}function Zn(){var t,a;(t=document.getElementById("adminSidebar"))==null||t.classList.add("open"),(a=document.getElementById("sidebarOverlay"))==null||a.classList.add("active")}function ta(){var t,a;(t=document.getElementById("adminSidebar"))==null||t.classList.remove("open"),(a=document.getElementById("sidebarOverlay"))==null||a.classList.remove("active")}window.switchAdminTab=ve;let re="ALL";async function se(){var t,a,e,n;try{const i=await h("/admin/participants?limit=100");if(i.status==="success"){f.participants=Array.isArray(i.data)?i.data:((t=i.data)==null?void 0:t.participants)||[],ei(f.participants),$e();const s=document.getElementById("kpiTotalParticipants");s&&(s.textContent=((a=i.meta)==null?void 0:a.total)||((n=(e=i.data)==null?void 0:e.pagination)==null?void 0:n.total)||f.participants.length)}}catch(i){console.error("Failed to load participants:",i)}}function ei(t){const a=t.length;let e=0,n=0,i=0,s=0,o=0;t.forEach(l=>{var m,d;const c=((m=l.order)==null?void 0:m.status)||"PENDING";c==="SETTLEMENT"||c==="CAPTURE"||c==="PAID"?e++:c==="CANCEL"||c==="EXPIRE"||c==="DENY"||c==="REFUND"?i++:n++,(d=l.racepack)!=null&&d.checkedIn?s++:o++});const r=(l,c)=>{const m=document.getElementById(l);m&&(m.textContent=c)};r("countPartAll",a),r("countPartSettled",e),r("countPartPending",n),r("countPartCancelled",i),r("countPartRacepackDone",s),r("countPartRacepackPending",o)}function ai(t){re=t,document.querySelectorAll(".participant-tabs-nav .part-tab-btn").forEach(n=>{n.getAttribute("data-tab")===t?n.className="btn btn-primary btn-sm part-tab-btn active":n.className="btn btn-outline btn-sm part-tab-btn"});const a={ALL:"Semua Peserta Terdaftar",SETTLED:"Pembayaran Sukses / Lunas (Lomba & Tiket Terverifikasi)",PENDING:"Menunggu Pembayaran (Pending Order)",CANCELLED:"Dibatalkan / Kadaluarsa / Refund",RACEPACK_DONE:"Racepack Sudah Diserahterimakan (Checked-in)",RACEPACK_PENDING:"Racepack Belum Diambil"},e=document.getElementById("participantActiveTabTitle");e&&(e.textContent=a[t]||"Semua Peserta Terdaftar"),$e()}function $e(){var i,s;const t=(((i=document.getElementById("searchParticipant"))==null?void 0:i.value)||"").toLowerCase(),a=((s=document.getElementById("filterParticipantCategory"))==null?void 0:s.value)||"";let e=f.participants||[];re==="SETTLED"?e=e.filter(o=>{var l;const r=((l=o.order)==null?void 0:l.status)||"PENDING";return r==="SETTLEMENT"||r==="CAPTURE"||r==="PAID"}):re==="PENDING"?e=e.filter(o=>{var r;return(((r=o.order)==null?void 0:r.status)||"PENDING")==="PENDING"}):re==="CANCELLED"?e=e.filter(o=>{var l;const r=((l=o.order)==null?void 0:l.status)||"PENDING";return r==="CANCEL"||r==="EXPIRE"||r==="DENY"||r==="REFUND"}):re==="RACEPACK_DONE"?e=e.filter(o=>{var r;return((r=o.racepack)==null?void 0:r.checkedIn)===!0}):re==="RACEPACK_PENDING"&&(e=e.filter(o=>{var r;return!((r=o.racepack)!=null&&r.checkedIn)})),a&&(e=e.filter(o=>{var r;return(((r=o.event)==null?void 0:r.category)||"").includes(a)})),t&&(e=e.filter(o=>{var r;return o.fullNameKtp.toLowerCase().includes(t)||o.bibName&&o.bibName.toLowerCase().includes(t)||o.bibNumber&&o.bibNumber.toLowerCase().includes(t)||o.nik.includes(t)||((r=o.order)==null?void 0:r.midtransOrderId)&&o.order.midtransOrderId.toLowerCase().includes(t)||o.emergencyContactPhone&&o.emergencyContactPhone.includes(t)}));const n=document.getElementById("participantFilteredCount");n&&(n.textContent=e.length),ti(e)}function ti(t){const a=document.getElementById("adminParticipantsTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="11" style="text-align: center; padding: 40px; color: #94A3B8;">
          <i class="fa-solid fa-users-slash" style="font-size: 2rem; margin-bottom: 8px; color: #CBD5E1; display: block;"></i>
          Tidak ada data peserta untuk filter yang dipilih.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{var g,y,v,k,P,N,B,I,x,F,L,E,S;const i=!((g=e.order)!=null&&g.midtransOrderId)||((v=(y=e.order)==null?void 0:y.midtransOrderId)==null?void 0:v.startsWith("OFFLINE-")),s=((k=e.order)==null?void 0:k.status)==="SETTLEMENT"||((P=e.order)==null?void 0:P.status)==="CAPTURE"||((N=e.order)==null?void 0:N.status)==="PAID",o=((B=e.order)==null?void 0:B.status)==="CANCEL"||((I=e.order)==null?void 0:I.status)==="EXPIRE"||((x=e.order)==null?void 0:x.status)==="DENY"||((F=e.order)==null?void 0:F.status)==="REFUND",r=s?"success":o?"danger":"pending",l=((L=e.order)==null?void 0:L.status)==="EXPIRE"?"EXPIRE (expired time)":((E=e.order)==null?void 0:E.status)||"PENDING",c=e.racepack&&e.racepack.checkedIn,m=c?`<small style="display:block; margin-top:4px; color:#475569;">Diserahkan oleh: <strong>${b(e.racepack.checkedInBy||"Admin")}</strong><br>${b(e.racepack.checkedInAt?new Date(e.racepack.checkedInAt).toLocaleString("id-ID"):"-")}</small>`:"",d=c?`<span class="badge" style="background:#DCFCE7; color:#15803D; font-weight:800; font-size:0.75rem; border:1px solid #BBF7D0; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-check"></i> Sudah Check-in</span>${m}`:'<span class="badge" style="background:#FFEDD5; color:#C2410C; font-weight:700; font-size:0.75rem; border:1px solid #FED7AA; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-box-open"></i> Belum Check-in</span>',u=e.bibNumber?`<span class="badge" style="background:#0F172A; color:#38BDF8; font-weight:800; font-size:0.78rem; letter-spacing:0.5px;">${b(e.bibNumber)}</span>`:'<span class="badge" style="background:#F1F5F9; color:#94A3B8; font-size:0.74rem;">-</span>';return`
      <tr>
        <td>${n+1}</td>
        <td>
          <strong style="color: #0F172A; font-size: 0.9rem;">${b(e.fullNameKtp)}</strong>
          ${i?'<span class="badge" style="background:#FFFBEB;color:#B45309;font-size:0.68rem;margin-left:4px;">Manual</span>':""}
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            ${u}
            <small style="color: #64748B; font-size: 0.74rem;">${b(e.bibName||"-")}</small>
          </div>
        </td>
        <td><code>${b(e.nik)}</code></td>
        <td><strong style="color: var(--color-primary);">${b(((S=e.event)==null?void 0:S.category)||"10K")}</strong></td>
        <td>
          <span style="font-size: 0.8rem; color: #334155;">
            ${e.gender==="MALE"?"L (Pria)":"P (Wanita)"} • Gol: <strong>${e.bloodType||"-"}</strong>
          </span>
        </td>
        <td>
          <span class="badge" style="background: #F1F5F9; color: #0F172A; font-weight: 700;">Size ${e.selectedSize||"M"}</span>
        </td>
        <td>
          <small style="color: #64748B; display: block;">
            ${b(e.emergencyContactName||"-")}<br>
            <strong>${b(e.emergencyContactPhone||"-")}</strong>
          </small>
        </td>
        <td>
          <span class="status-pill ${r}">
            ${b(l)}
          </span>
        </td>
        <td>
          ${d}
        </td>
        <td>
          <div class="table-actions" style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn-icon btn-direct-rpc" data-id="${e.id}" data-bib="${b(e.bibNumber||e.id)}" title="Buka Validasi Racepack" style="color: #EA580C; background: #FFEDD5;" data-permission="participants:update">
              <i class="fa-solid fa-box-open"></i>
            </button>
            <button class="btn-icon edit btn-edit-part" data-id="${e.id}" title="Edit Data Peserta" data-permission="participants:update">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-icon delete btn-delete-part" data-id="${e.id}" data-name="${b(e.fullNameKtp)}" title="Hapus Peserta" data-permission="participants:delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `}).join(""),a.querySelectorAll(".btn-direct-rpc").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id");n&&(ve("racepack"),ee(n))})}),a.querySelectorAll(".btn-edit-part").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=f.participants.find(s=>s.id===n);i&&ii(i)})}),a.querySelectorAll(".btn-delete-part").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await K({title:"Hapus Data Peserta?",message:`Apakah Anda yakin ingin menghapus data peserta "${i}"? Nomor BIB dan data peserta ini akan dihapus dari sistem.`,confirmText:"Ya, Hapus Peserta",type:"danger"})&&await oi(n)})}),te(f.profile)}}function ni(){var t;document.getElementById("partFormId").value="",document.getElementById("modalParticipantTitle").innerHTML='<i class="fa-solid fa-user-plus" style="color: var(--color-primary);"></i> Tambah Peserta Manual',document.getElementById("partFormFullName").value="",document.getElementById("partFormBibName").value="",document.getElementById("partFormNik").value="",document.getElementById("partFormEmergencyName").value="",document.getElementById("partFormEmergencyPhone").value="",(t=document.getElementById("modalParticipantBackdrop"))==null||t.classList.add("open")}function ii(t){var a;document.getElementById("partFormId").value=t.id,document.getElementById("modalParticipantTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Data Peserta: ${b(t.fullNameKtp)}`,document.getElementById("partFormEventId").value=t.eventId||"",document.getElementById("partFormFullName").value=t.fullNameKtp,document.getElementById("partFormBibName").value=t.bibName||"",document.getElementById("partFormNik").value=t.nik,document.getElementById("partFormGender").value=t.gender||"MALE",document.getElementById("partFormBloodType").value=t.bloodType||"O",document.getElementById("partFormSize").value=t.selectedSize||"M",document.getElementById("partFormBirthPlace").value=t.birthPlace||"Tegal",document.getElementById("partFormBirthDate").value=t.birthDate?t.birthDate.slice(0,10):"1995-05-15",document.getElementById("partFormAddress").value=t.fullAddress||"Jl. Pancasila No. 12, Tegal",document.getElementById("partFormEmergencyName").value=t.emergencyContactName||"",document.getElementById("partFormEmergencyPhone").value=t.emergencyContactPhone||"",(a=document.getElementById("modalParticipantBackdrop"))==null||a.classList.add("open")}async function si(t){var n;t.preventDefault();const a=document.getElementById("partFormId").value,e={eventId:document.getElementById("partFormEventId").value,fullNameKtp:document.getElementById("partFormFullName").value.trim(),bibName:document.getElementById("partFormBibName").value.trim(),nik:document.getElementById("partFormNik").value.trim(),gender:document.getElementById("partFormGender").value,bloodType:document.getElementById("partFormBloodType").value,selectedSize:document.getElementById("partFormSize").value,birthPlace:document.getElementById("partFormBirthPlace").value.trim(),birthDate:document.getElementById("partFormBirthDate").value,fullAddress:document.getElementById("partFormAddress").value.trim(),country:"Indonesia",emergencyContactName:document.getElementById("partFormEmergencyName").value.trim(),emergencyContactPhone:document.getElementById("partFormEmergencyPhone").value.trim()};try{let i;a?i=await h(`/admin/participants/${a}`,{method:"PUT",body:JSON.stringify(e)}):i=await h("/admin/participants",{method:"POST",body:JSON.stringify(e)}),i.status==="success"?(p("success","Berhasil",a?"Data peserta diperbarui!":"Peserta baru berhasil didaftarkan manual!"),(n=document.getElementById("modalParticipantBackdrop"))==null||n.classList.remove("open"),se()):p("error","Gagal",i.message||"Validasi data peserta gagal")}catch(i){p("error","Kesalahan Server",i.message)}}async function oi(t){try{const a=await h(`/admin/participants/${t}`,{method:"DELETE"});a.status==="success"?(p("success","Terhapus","Data peserta berhasil dihapus!"),se()):p("error","Gagal",a.message)}catch(a){p("error","Kesalahan Server",a.message)}}function ri(){if(f.participants.length===0){p("warning","Peringatan","Tidak ada data peserta untuk diunduh.");return}const t=["No","Nama KTP","Nomor BIB","BIB Name","NIK","Kategori","Gender","Gol Darah","Size Jersey","Emergency Contact","Status Bayar","Status Racepack"],a=f.participants.map((s,o)=>{var r,l,c;return[o+1,`"${s.fullNameKtp}"`,`"${s.bibNumber||""}"`,`"${s.bibName||""}"`,`'${s.nik}`,`"${((r=s.event)==null?void 0:r.category)||""}"`,s.gender,s.bloodType,s.selectedSize,`"${s.emergencyContactPhone||""}"`,((l=s.order)==null?void 0:l.status)||"PENDING",(c=s.racepack)!=null&&c.checkedIn?"Sudah Check-in":"Belum Check-in"]}),e="data:text/csv;charset=utf-8,"+[t.join(","),...a.map(s=>s.join(","))].join(`
`),n=encodeURI(e),i=document.createElement("a");i.setAttribute("href",n),i.setAttribute("download",`peserta_tegal_run_2027_${Date.now()}.csv`),document.body.appendChild(i),i.click(),i.remove()}async function X(){var t,a;try{const e=((t=document.getElementById("filterOrderStatus"))==null?void 0:t.value)||"",n=((a=document.getElementById("searchOrder"))==null?void 0:a.value)||"",i=new URLSearchParams({limit:"50"});e&&i.append("status",e),n&&i.append("search",n);const s=await h(`/admin/orders?${i.toString()}`);s.status==="success"&&(f.orders=s.data,li(s.data))}catch(e){console.error("Failed to load orders:",e)}}function li(t){const a=document.getElementById("adminOrdersTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: #94A3B8;">
          Belum ada data transaksi/order.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{var d,u,g;const i=new Date(e.createdAt).toLocaleString("id-ID"),s=e.status==="SETTLEMENT"||e.status==="CAPTURE",o=e.status==="CANCEL"||e.status==="EXPIRE"||e.status==="DENY",r=s?"success":o?"danger":"pending",l=e.status==="EXPIRE"?"EXPIRE (expired time)":e.status,m=!e.midtransOrderId||e.midtransOrderId.startsWith("OFFLINE-")?'<span class="badge" style="background:#FFFBEB;color:#B45309;font-weight:700;border:1px solid #FDE68A;font-size:0.75rem;"><i class="fa-solid fa-user-pen"></i> Pendaftaran Manual</span>':'<span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;border:1px solid #BFDBFE;font-size:0.75rem;"><i class="fa-solid fa-globe"></i> Website (Midtrans)</span>';return`
      <tr>
        <td>${n+1}</td>
        <td><code>${b(e.midtransOrderId||e.id.slice(0,12))}</code></td>
        <td>${m}</td>
        <td><strong>${b(((d=e.user)==null?void 0:d.fullName)||"Anonim")}</strong></td>
        <td><small>${b(((u=e.user)==null?void 0:u.email)||"-")}<br>${b(((g=e.user)==null?void 0:g.phoneNumber)||"-")}</small></td>
        <td style="text-align: center;"><strong>${e.participantsCount}</strong> Peserta</td>
        <td><strong style="color: var(--color-primary);">${H(e.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${r}">
            ${b(l)}
          </span>
        </td>
        <td><small style="color: #64748B;">${i}</small></td>
        <td>
          <div class="table-actions">
            <button class="btn-icon btn-view-order-details" data-id="${b(e.id)}" title="Lihat detail tiket">
              <i class="fa-solid fa-ticket"></i>
            </button>
            <button class="btn-icon edit btn-update-order-status" data-id="${e.id}" data-display="${b(e.midtransOrderId||e.id)}" data-status="${e.status}" title="Ubah Status Order" data-permission="orders:update">
              <i class="fa-solid fa-file-pen"></i>
            </button>
            <button class="btn-icon delete btn-delete-order" data-id="${e.id}" title="Hapus Order" data-permission="orders:delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `}).join(""),a.querySelectorAll(".btn-view-order-details").forEach(e=>{e.addEventListener("click",()=>di(e.dataset.id))}),document.querySelectorAll(".btn-update-order-status").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-display"),s=e.getAttribute("data-status");ci(n,i,s)})}),document.querySelectorAll(".btn-delete-order").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id");await K({title:"Hapus Data Transaksi?",message:"PERINGATAN: Apakah Anda yakin ingin menghapus data transaksi ini dari riwayat keuangan?",confirmText:"Ya, Hapus Transaksi",type:"danger"})&&await pi(n)})}),te(f.profile)}}async function di(t){var n,i,s;const a=document.getElementById("orderDetailsContent"),e=document.getElementById("modalOrderDetailsBackdrop");if(!(!a||!e)){e.classList.add("open"),a.innerHTML='<div style="text-align:center; color:#64748B; padding:24px;">Memuat detail tiket...</div>';try{const o=await h(`/admin/orders/${encodeURIComponent(t)}`);if(!o||o.status!=="success"||!o.data)throw new Error((o==null?void 0:o.message)||"Detail transaksi tidak dapat dimuat.");const r=o.data,l=g=>b(g==null||g===""?"-":String(g)),c=g=>g?new Date(g).toLocaleString("id-ID"):"-",m=r.status==="EXPIRE"?"EXPIRE (expired time)":r.status,d=(g,y)=>`<div style="padding:8px 0; border-bottom:1px solid #E2E8F0;"><strong>${g}:</strong> ${y}</div>`,u=Array.isArray(r.participants)?r.participants:[];a.innerHTML=`
      <section style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:0 20px; margin-bottom:18px;">
        ${d("Order ID",l(r.midtransOrderId||r.id))}
        ${d("Status pembayaran",l(m))}
        ${d("Total transaksi",H(r.totalAmount))}
        ${d("Waktu transaksi",l(c(r.createdAt)))}
        ${d("Nama pemesan",l((n=r.user)==null?void 0:n.fullName))}
        ${d("Email / telepon",`${l((i=r.user)==null?void 0:i.email)} / ${l((s=r.user)==null?void 0:s.phoneNumber)}`)}
      </section>
      <h5 style="margin:12px 0;">Data Tiket &amp; Peserta (${u.length})</h5>
      <div style="display:grid; gap:12px;">
        ${u.length?u.map((g,y)=>{var v,k,P,N;return`
          <article style="border:1px solid #E2E8F0; border-radius:12px; padding:14px;">
            <h6 style="margin:0 0 8px; color:#0F172A;">${y+1}. ${l(g.fullNameKtp)}</h6>
            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:0 18px; font-size:.88rem;">
              ${d("Kategori tiket",l(((v=g.event)==null?void 0:v.ticketName)||((k=g.event)==null?void 0:k.category)))}
              ${d("BIB",l(g.bibNumber))}
              ${d("NIK",l(g.nik))}
              ${d("Tanggal / tempat lahir",`${l(g.birthDate?new Date(g.birthDate).toLocaleDateString("id-ID"):"-")} / ${l(g.birthPlace)}`)}
              ${d("Jenis kelamin / golongan darah",`${l(g.gender)} / ${l(g.bloodType)}`)}
              ${d("Ukuran jersey",l(g.selectedSize))}
              ${d("Nama jersey / jenis",`${l((P=g.jersey)==null?void 0:P.name)} / ${l((N=g.jersey)==null?void 0:N.type)}`)}
              ${d("Komunitas",l(g.communityName))}
              ${d("Kontak darurat",`${l(g.emergencyContactName)} / ${l(g.emergencyContactPhone)}`)}
              ${d("Alamat",l(g.fullAddress))}
              ${d("Riwayat medis",l(g.medicalHistory))}
            </div>
          </article>
        `}).join(""):'<div style="color:#64748B;">Belum ada data peserta pada transaksi ini.</div>'}
      </div>
    `}catch(o){a.innerHTML=`<div style="color:#B91C1C;">${b(o.message||"Detail transaksi gagal dimuat.")}</div>`,p("error","Gagal Memuat Detail",o.message||"Detail transaksi gagal dimuat.")}}}function ci(t,a,e){var n;document.getElementById("orderFormId").value=t,document.getElementById("orderFormDisplayId").value=a,document.getElementById("orderFormStatus").value=e||"SETTLEMENT",document.getElementById("orderFormReason").value="",(n=document.getElementById("modalOrderBackdrop"))==null||n.classList.add("open")}async function mi(t){var i;t.preventDefault();const a=document.getElementById("orderFormId").value,e=document.getElementById("orderFormStatus").value,n=document.getElementById("orderFormReason").value.trim();try{const s=await h(`/admin/orders/${a}/status`,{method:"PUT",body:JSON.stringify({status:e,reason:n})});s.status==="success"?(p("success","Status Diperbarui",`Status order berhasil diubah menjadi ${e}!`),(i=document.getElementById("modalOrderBackdrop"))==null||i.classList.remove("open"),X(),se(),W()):p("error","Gagal",s.message)}catch(s){p("error","Kesalahan Server",s.message)}}async function pi(t){try{const a=await h(`/admin/orders/${t}`,{method:"DELETE"});a.status==="success"?(p("success","Terhapus","Data transaksi berhasil dihapus!"),X()):p("error","Gagal",a.message)}catch(a){p("error","Kesalahan Server",a.message)}}const fa=[{name:"SUPERADMIN",authority:"Tinggi (Root Access)",authorityColor:"#DC2626",desc:"Pemegang kendali tertinggi seluruh sistem, server, database, konfigurasi keuangan, dan manajemen izin RBAC.",pages:["Dashboard","Event & Tiket","Manajemen Peserta","Transaksi & Keuangan","Log Notifikasi","WhatsApp Web Console","Konten Website/CMS","Countdown & Status","Konfigurasi Notifikasi","Rute & Checkpoint","Kelola Admin & RBAC","Log Audit Sistem"],reason:"Akses tak terbatas (*) ke semua modul untuk kontrol dan audit menyeluruh."},{name:"ADMINISTRATOR",authority:"Tinggi (Operasional)",authorityColor:"#EA580C",desc:"Koordinator operasional utama event. Bertanggung jawab atas ketersediaan tiket, data pelari, jalur lari, dan publikasi website.",pages:["Dashboard","Event & Tiket","Manajemen Peserta","Transaksi & Order","Log Notifikasi","WhatsApp Web Console","Konten Website/CMS","Countdown & Status","Rute & Checkpoint"],reason:"Memerlukan akses operasional penuh namun dibatasi dari konfigurasi sensitif RBAC admin."},{name:"FINANCE",authority:"Tinggi (Finansial)",authorityColor:"#059669",desc:"Divisi keuangan & bendahara event. Mengaudit pembayaran peserta, rekonsiliasi Midtrans, settlement manual, dan refund.",pages:["Dashboard","Transaksi & Order","Log Audit Sistem"],reason:"Khusus mengawasi arus kas tiket, verifikasi pembayaran manual, dan verifikasi status mutasi dana."},{name:"SPONSORSHIP",authority:"Menengah (Kemitraan)",authorityColor:"#2563EB",desc:"Divisi kemitraan sponsor. Mengelola materi promosi sponsor di CMS, benefit tiket sponsor, dan laporan pendaftar.",pages:["Dashboard","Konten Website/CMS","Event & Tiket (Read/Benefit)","Log Notifikasi"],reason:"Memastikan logo dan hak promosi sponsor tampil presisi di web serta laporan jumlah peserta."},{name:"RACEPACK_OFFICER",authority:"Operasional Lapangan",authorityColor:"#7C3AED",desc:"Petugas meja Race Pack Collection (RPC). Memvalidasi E-Tiket pelari, mencatat serah terima racepack/jersey, dan serah terima nomor BIB.",pages:["Dashboard","Manajemen Peserta & RPC","WhatsApp Web Console"],reason:"Membutuhkan akses pencarian data pelari, serah terima jersey, dan kontak langsung pelari bermasalah di booth."},{name:"GATE_OPERATOR",authority:"Operasional Pintu",authorityColor:"#0D9488",desc:"Petugas pemindai tiket di gerbang venue. Scan barcode/QR tiket, verifikasi status lunas, dan validasi akses masuk pelari.",pages:["Dashboard","Manajemen Peserta (Check-in/Scan)"],reason:"Hanya butuh verifikasi cepat keabsahan tiket pelari saat memasuki race village."},{name:"RACE_DIRECTOR",authority:"Tinggi (Teknis Lomba)",authorityColor:"#D97706",desc:"Pimpinan teknis lomba. Mengawasi rute marathon, pos medis, water station, timing cut-off time (COT), dan kontrol countdown lomba.",pages:["Dashboard","Rute & Checkpoint","Countdown & Status Event","Manajemen Peserta","Manajemen Event"],reason:"Memantau kesiapan rute, kondisi titik evakuasi, dan timeline pelepasan pelari (flag-off)."},{name:"TIMING_JUDGE",authority:"Menengah (Juri Timing)",authorityColor:"#4F46E5",desc:"Juri pencatat waktu & komisi timing PASI. Mengelola sinkronisasi nomor BIB dengan timing chip RFID dan checkpoint rute.",pages:["Dashboard","Manajemen Peserta (BIB & Data)","Rute & Checkpoint"],reason:"Memerlukan nomor BIB peserta dan mapping titik timing mat pada rute."},{name:"MEDICAL_OFFICER",authority:"Operasional Medis",authorityColor:"#E11D48",desc:"Tim medis, dokter lapangan, dan rescue. Memerlukan akses cepat data riwayat kesehatan, golongan darah, kontak darurat keluarga, dan pos medis.",pages:["Dashboard","Manajemen Peserta (Rekam Medis & Kontak Darurat)","Rute & Checkpoint (Pos Medis)"],reason:"Penting untuk penanganan darurat kecelakaan atau cedera pelari selama lomba berlangsung."},{name:"VOLUNTEER",authority:"Dasar (Relawan)",authorityColor:"#64748B",desc:"Relawan umum di venue dan rute. Membantu cek informasi peserta di helpdesk dan panduan umum tanpa hak mengubah data kritis.",pages:["Dashboard","Manajemen Peserta (Read-Only)"],reason:"Akses baca terbatas untuk panduan peserta di lapangan tanpa risiko perubahan data."},{name:"BAG_DROP_OFFICER",authority:"Operasional Penitipan",authorityColor:"#0891B2",desc:"Petugas tenda penitipan barang pelari (Bag Drop). Mencocokkan nomor BIB dan identitas pelari saat titip dan ambil barang.",pages:["Dashboard","Manajemen Peserta (Pencarian BIB)"],reason:"Hanya memerlukan pencarian nomor BIB pelari untuk validasi tag barang bawaan."},{name:"CUSTOMER_SERVICE",authority:"Operasional CS",authorityColor:"#16A34A",desc:"Tim helpdesk & CS pelari. Membalas pertanyaan via WhatsApp Web Console, cek status pesanan tiket, log pengiriman, dan kendala pembayaran.",pages:["Dashboard","WhatsApp Web Console","Log Notifikasi Peserta","Manajemen Peserta","Transaksi & Order"],reason:"Membutuhkan akses komunikasi langsung ke pelari serta melihat status order untuk menyelesaikan komplain tiket."}],me=[{key:"page:dashboard",label:"Dashboard Overview",icon:"fa-gauge-high",desc:"Ringkasan statistik, kuota & omzet",apiPermissions:[]},{key:"page:events",label:"Manajemen Event & Tiket",icon:"fa-calendar-days",desc:"Kategori tiket, harga, kuota & benefit",apiPermissions:["events:read","events:create","events:update","events:delete","benefits:manage","jerseys:manage"]},{key:"page:participants",label:"Manajemen Peserta",icon:"fa-users",desc:"Pendaftar, nomor BIB & status",apiPermissions:["participants:read","participants:create","participants:update","participants:delete","bib:manage"]},{key:"page:racepack",label:"Pengambilan Racepack (RPC)",icon:"fa-box-open",desc:"Scan QR kamera HP, verifikasi E-Tiket & serah terima",apiPermissions:["participants:read","participants:update","racepack:checkin"]},{key:"page:racepack-view",label:"Live View Antrean Racepack",icon:"fa-list-check",desc:"Pantau antrean check-in racepack",apiPermissions:["participants:read"]},{key:"page:orders",label:"Transaksi & Keuangan",icon:"fa-receipt",desc:"Audit order, Midtrans & refund",apiPermissions:["orders:read","orders:update","orders:delete","finance:read"]},{key:"page:notif-logs",label:"Log Notifikasi Peserta",icon:"fa-paper-plane",desc:"Riwayat WA & email E-Tiket",apiPermissions:["notifications:read","notifications:dispatch"]},{key:"page:whatsapp-web",label:"WhatsApp Web Console",icon:"fa-brands fa-whatsapp",desc:"Chat langsung & CS peserta",apiPermissions:["notifications:manage","whatsapp:chat","whatsapp:session"]},{key:"page:cms",label:"Konten Website & CMS",icon:"fa-pen-ruler",desc:"Teks website, sponsor & banner",apiPermissions:["cms:manage"]},{key:"page:countdown",label:"Countdown & Status Event",icon:"fa-stopwatch-20",desc:"Status pendaftaran & waktu lomba",apiPermissions:["countdown:manage"]},{key:"page:notifications",label:"Konfigurasi Notifikasi",icon:"fa-bell",desc:"Gateway WA, SMTP & template",apiPermissions:["notifications:manage"]},{key:"page:routes",label:"Rute & Checkpoint",icon:"fa-map-pin",desc:"Pos medis, water station & jalur",apiPermissions:["routes:read","routes:manage"]},{key:"page:bib-settings",label:"Pengaturan BIB & E-Tiket",icon:"fa-id-badge",desc:"Konfigurasi BIB, QR & petunjuk",apiPermissions:["bib:manage"]},{key:"page:admins",label:"Kelola Admin & RBAC",icon:"fa-shield-halved",desc:"Akun staf & hak akses role",apiPermissions:["admins:manage"]},{key:"page:logs",label:"Log Audit Sistem",icon:"fa-clock-rotate-left",desc:"Rekam jejak audit keamanan",apiPermissions:["logs:read"]}];function It(t){const a=document.getElementById("btnRbacTabUsers"),e=document.getElementById("btnRbacTabRoles"),n=document.getElementById("btnRbacTabMatrix"),i=document.getElementById("rbacSectionUsers"),s=document.getElementById("rbacSectionRoles"),o=document.getElementById("rbacSectionMatrix");[a,e,n].forEach((r,l)=>{r&&r.setAttribute("aria-selected",String(l===["users","roles","matrix"].indexOf(t)))}),a&&(a.className=`btn btn-sm rbac-subnav-button ${t==="users"?"btn-primary":"btn-outline"}`),e&&(e.className=`btn btn-sm rbac-subnav-button ${t==="roles"?"btn-primary":"btn-outline"}`),n&&(n.className=`btn btn-sm rbac-subnav-button ${t==="matrix"?"btn-primary":"btn-outline"}`),i&&(i.style.display=t==="users"?"block":"none"),s&&(s.style.display=t==="roles"?"block":"none"),o&&(o.style.display=t==="matrix"?"block":"none")}window.switchRbacSubTab=It;async function oe(){try{const[t,a]=await Promise.all([h("/admin/users-management"),h("/admin/roles")]);if((a==null?void 0:a.status)==="success"){f.roles=a.data||[],f.systemModules=a.modules||me,f.rolePermissions=a.permissions||[],f.dashboardWidgets=(a.dashboardWidgets||[]).filter(n=>n.key!=="dashboard:configured");const e=document.getElementById("adminUserRoleId");e&&(e.innerHTML=f.roles.map(n=>`
          <option value="${n.id}">${b(n.name)} - ${b(n.description||"")}</option>
        `).join("")),gi(f.roles),bi()}else throw new Error((a==null?void 0:a.message)||"Katalog role dan izin tidak dapat dimuat.");if((t==null?void 0:t.status)==="success")f.admins=t.data||[],ui(f.admins);else throw new Error((t==null?void 0:t.message)||"Daftar akun admin tidak dapat dimuat.")}catch(t){console.error("Failed to load admins and roles:",t),p("error","Gagal Memuat Hak Akses",t.message)}}function ui(t){const a=document.getElementById("adminUsersTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="8" style="text-align: center; padding: 20px; color: #94A3B8;">Belum ada akun admin.</td></tr>';return}a.innerHTML=t.map((e,n)=>{var s,o;const i=((s=e.role)==null?void 0:s.name)==="SUPERADMIN";return`
      <tr>
        <td data-label="No">${n+1}</td>
        <td data-label="Nama"><strong>${b(e.fullName)}</strong></td>
        <td data-label="Username"><code>@${b(e.username)}</code></td>
        <td data-label="Email">${b(e.email)}</td>
        <td data-label="Role"><span class="admin-badge-role">${b(((o=e.role)==null?void 0:o.name)||"ADMIN")}</span></td>
        <td data-label="Status">
          <span class="status-pill ${e.isActive?"success":"danger"}">
            ${e.isActive?"AKTIF":"NONAKTIF"}
          </span>
        </td>
        <td data-label="Dibuat"><small style="color: #64748B;">${new Date(e.createdAt).toLocaleDateString("id-ID")}</small></td>
        <td data-label="Aksi">
          <div class="table-actions">
            <button class="btn-icon edit btn-edit-admin-user" data-id="${e.id}" title="Edit Admin">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            ${i?"":`
              <button class="btn-icon delete btn-delete-admin-user" data-id="${e.id}" data-name="${b(e.fullName)}" title="Hapus Admin">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            `}
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-edit-admin-user").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=f.admins.find(s=>s.id===n);i&&Ii(i)})}),document.querySelectorAll(".btn-delete-admin-user").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await K({title:"Hapus Akun Admin?",message:`Apakah Anda yakin ingin menghapus akun admin "${i}"? Akun ini tidak akan dapat login lagi ke portal.`,confirmText:"Ya, Hapus Akun",type:"danger"})&&await Ai(n)})})}}function gi(t){const a=document.getElementById("adminRolesTableBody");if(!a)return;if(t.length===0){a.innerHTML='<tr><td colspan="7" style="text-align: center; padding: 20px; color: #94A3B8;">Belum ada role terdaftar.</td></tr>';return}const e={};(f.systemModules||me).forEach(s=>{e[s.key]=s.label});const n=new Map((f.dashboardWidgets||[]).map(s=>[s.key,s.label])),i=(s,o,r=3)=>{const l=s.slice(0,r).map(m=>`<span class="role-page-pill">${b(o(m))}</span>`).join(""),c=s.length>r?`<span class="role-page-pill role-page-pill-more">+${s.length-r}</span>`:"";return l+c};a.innerHTML=t.map((s,o)=>{var v;const r=s.name==="SUPERADMIN",l=Array.isArray(s.permissions)?s.permissions:[],c=l.includes("*");let m="";if(c)m='<span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; font-weight: 700;"><i class="fa-solid fa-star"></i> Semua Halaman (Akses Penuh)</span>';else{const k=l.filter(P=>P.startsWith("page:"));k.length===0?m='<span style="color: #94A3B8; font-size: 0.75rem;">(Belum ada halaman diizinkan)</span>':m=i(k,P=>e[P]||P.replace("page:",""))}const d=l.filter(k=>k.startsWith("dashboard:")&&k!=="dashboard:configured"),u=!r&&!l.includes("page:dashboard")?'<span class="role-table-muted">Dashboard tidak diizinkan</span>':l.includes("dashboard:configured")?d.length?i(d,k=>n.get(k)||k):'<span class="role-table-muted">Tidak ada widget</span>':'<span class="role-table-muted">Default semua widget</span>',g=((v=s._count)==null?void 0:v.admins)||0,y=fa.some(k=>k.name===s.name);return`
      <tr>
        <td data-label="No">${o+1}</td>
        <td data-label="Role">
          <span class="admin-badge-role" style="font-weight: 800; font-size: 0.8rem;">${b(s.name)}</span>
        </td>
        <td data-label="Deskripsi" style="max-width: 280px; font-size: 0.82rem; color: #475569;">
          ${b(s.description||"-")}
        </td>
        <td data-label="Halaman" style="max-width: 320px;">
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${m}
          </div>
        </td>
        <td data-label="Widget dashboard" style="max-width: 280px;">
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${u}
          </div>
        </td>
        <td data-label="Petugas" style="text-align: center;">
          <span class="badge" style="background: #F8FAFC; color: #0F172A; border: 1px solid #E2E8F0; font-weight: 700; padding: 4px 10px;">
            <i class="fa-solid fa-user"></i> ${g}
          </span>
        </td>
        <td data-label="Aksi">
          <div class="table-actions">
            <button class="btn btn-outline btn-sm btn-edit-role" data-id="${s.id}" title="Atur Hak Akses Halaman">
              <i class="fa-solid fa-sliders"></i> Atur Akses
            </button>
            ${!y&&g===0?`
              <button class="btn-icon delete btn-delete-role" data-id="${s.id}" data-name="${b(s.name)}" title="Hapus Role">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            `:""}
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-edit-role").forEach(s=>{s.addEventListener("click",()=>{const o=s.getAttribute("data-id"),r=f.roles.find(l=>l.id===o);r&&yi(r)})}),document.querySelectorAll(".btn-delete-role").forEach(s=>{s.addEventListener("click",async()=>{const o=s.getAttribute("data-id"),r=s.getAttribute("data-name");await K({title:"Hapus Role?",message:`Apakah Anda yakin ingin menghapus role "${r}"? Tindakan ini tidak dapat dibatalkan.`,confirmText:"Ya, Hapus Role",type:"danger"})&&await vi(o)})})}function bi(){const t=document.getElementById("roleDirectoryTableBody");t&&(t.innerHTML=fa.map((a,e)=>{const n=a.pages.map(i=>`<span class="role-page-pill">${b(i)}</span>`).join("");return`
      <tr>
        <td data-label="Role">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span class="admin-badge-role" style="width: fit-content; font-size: 0.8rem; font-weight: 800;">${a.name}</span>
            <small style="color: #64748B; font-size: 0.72rem;">Divisi #${e+1}</small>
          </div>
        </td>
        <td data-label="Tanggung jawab" style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
          <strong>${b(a.desc)}</strong>
          <div style="font-size: 0.76rem; color: #64748B; margin-top: 4px;">
            <i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> ${b(a.reason)}
          </div>
        </td>
        <td data-label="Cakupan umum">
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${n}
          </div>
        </td>
        <td data-label="Otoritas">
          <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; background: ${a.authorityColor}15; color: ${a.authorityColor}; border: 1px solid ${a.authorityColor}40;">
            ${b(a.authority)}
          </span>
        </td>
      </tr>
    `}).join(""))}function xt(t=[],a=!1){const e=document.getElementById("roleModulesContainer");if(!e)return;const n=(f.systemModules||me).filter(i=>a||i.key!=="page:admins");e.innerHTML=n.map(i=>{const s=a||t.includes(i.key),o=a;return`
      <label class="role-module-card ${s?"checked":""}" id="card-${i.key.replace(":","_")}">
        <input type="checkbox" name="role_page" value="${i.key}" ${s?"checked":""} ${o?"disabled":""} onchange="toggleModuleCardStyle(this)">
        <div class="module-icon">
          <i class="fa-solid ${i.icon}"></i>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 0.84rem; font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${b(i.label)}
          </div>
          <div style="font-size: 0.72rem; color: #64748B; line-height: 1.3; margin-top: 2px;">
            ${b(i.desc||"")}
          </div>
        </div>
      </label>
    `}).join("")}function At(t=[],a=!1){const e=document.getElementById("roleApiPermissionsContainer");if(!e)return;const n=(f.rolePermissions||[]).filter(i=>i.key!=="*"&&i.key!=="admins:manage"&&!i.key.startsWith("page:")&&!i.key.startsWith("dashboard:"));e.innerHTML=n.map(i=>{const s=t.includes(i.key);return`
      <label class="role-permission-option ${s?"checked":""}">
        <input type="checkbox" name="role_api" value="${i.key}" ${s?"checked":""} ${a?"disabled":""} onchange="toggleRolePermissionStyle(this)">
        <span>${b(i.label)}</span>
      </label>
    `}).join("")}function Bt(t=[],a=!1){const e=document.getElementById("roleDashboardWidgetsContainer");e&&(e.innerHTML=(f.dashboardWidgets||[]).map(n=>{const i=a?t.includes(n.key):!0;return`
      <label class="role-widget-card ${i?"checked":""}">
        <input type="checkbox" name="role_widget" value="${n.key}" ${i?"checked":""} onchange="toggleRoleOptionStyle(this)">
        <span class="role-widget-card-copy">
          <strong>${b(n.label)}</strong>
          <small>${b(n.desc||"")}</small>
        </span>
      </label>
    `}).join(""))}window.toggleModuleCardStyle=function(t){const a=t.closest(".role-module-card");a&&(t.checked?a.classList.add("checked"):a.classList.remove("checked"));const e=(f.systemModules||me).find(n=>n.key===t.value);e&&(e.apiPermissions||[]).forEach(n=>{var r;const i=document.querySelector(`input[name="role_api"][value="${n}"]`),s=Array.from(document.querySelectorAll('input[name="role_page"]:checked')).some(l=>{var c,m;return l!==t&&((m=(c=(f.systemModules||me).find(d=>d.key===l.value))==null?void 0:c.apiPermissions)==null?void 0:m.includes(n))}),o=t.checked||s;i&&!i.disabled&&(t.checked||!s)&&(i.checked=o,(r=i.closest(".role-permission-option"))==null||r.classList.toggle("checked",o))})};window.toggleRoleOptionStyle=function(t){var a;(a=t.closest(".role-widget-card"))==null||a.classList.toggle("checked",t.checked)};window.toggleRolePermissionStyle=function(t){var a;(a=t.closest(".role-permission-option"))==null||a.classList.toggle("checked",t.checked)};function fi(){var a;document.getElementById("roleFormId").value="",document.getElementById("modalRoleTitle").innerHTML='<i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Role Akses Baru';const t=document.getElementById("roleFormName");t.value="",t.readOnly=!1,document.getElementById("roleFormDesc").value="",xt(["page:dashboard"],!1),At([],!1),Bt((f.dashboardWidgets||[]).map(e=>e.key),!0),(a=document.getElementById("modalRoleBackdrop"))==null||a.classList.add("open")}function yi(t){var s;document.getElementById("roleFormId").value=t.id,document.getElementById("modalRoleTitle").innerHTML=`<i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Atur Hak Akses Role: ${b(t.name)}`;const a=document.getElementById("roleFormName");a.value=t.name;const e=t.name==="SUPERADMIN";a.readOnly=e,document.getElementById("roleFormDesc").value=t.description||"";const n=Array.isArray(t.permissions)?t.permissions:[];let i=[];e?i=(f.systemModules||me).map(o=>o.key):i=n.filter(o=>o.startsWith("page:")),xt(i,e),At(e?[]:n.filter(o=>!o.startsWith("page:")&&!o.startsWith("dashboard:")&&o!=="*"),e),Bt(n.filter(o=>o.startsWith("dashboard:")&&o!=="dashboard:configured"),n.includes("dashboard:configured")),(s=document.getElementById("modalRoleBackdrop"))==null||s.classList.add("open")}async function hi(t){var r,l,c,m,d;t.preventDefault();const a=document.getElementById("roleFormId").value,e=document.getElementById("roleFormName").value.trim().toUpperCase(),n=document.getElementById("roleFormDesc").value.trim(),i=e==="SUPERADMIN";let s=[];if(i)s=["*","dashboard:configured",...Array.from(document.querySelectorAll('input[name="role_widget"]:checked')).map(g=>g.value)];else{const g=Array.from(document.querySelectorAll('input[name="role_page"]:checked')).map(k=>k.value);if(g.length===0){p("warning","Peringatan","Pilih minimal 1 halaman yang diizinkan untuk role ini.");return}const y=Array.from(document.querySelectorAll('input[name="role_api"]:checked')).map(k=>k.value),v=Array.from(document.querySelectorAll('input[name="role_widget"]:checked')).map(k=>k.value);s=[...g,...y],g.includes("page:dashboard")&&s.push("dashboard:configured",...v)}const o={name:e,description:n,permissions:s};try{let u;a?u=await h(`/admin/roles/${a}`,{method:"PUT",body:JSON.stringify(o)}):u=await h("/admin/roles",{method:"POST",body:JSON.stringify(o)}),u.status==="success"?(p("success","Berhasil",a?`Hak akses role '${e}' berhasil diperbarui ke database!`:`Role '${e}' berhasil dibuat!`),(r=document.getElementById("modalRoleBackdrop"))==null||r.classList.remove("open"),(((c=(l=f.profile)==null?void 0:l.role)==null?void 0:c.id)===a||((d=(m=f.profile)==null?void 0:m.role)==null?void 0:d.name)===e)&&(f.profile.role.permissions=s,applyRbacUi(f.profile)),await oe()):p("error","Gagal",u.message||"Gagal menyimpan role.")}catch(u){p("error","Kesalahan Server",u.message)}}async function vi(t){try{const a=await h(`/admin/roles/${t}`,{method:"DELETE"});a.status==="success"?(p("success","Terhapus","Role berhasil dihapus!"),oe()):p("error","Gagal",a.message)}catch(a){p("error","Kesalahan Server",a.message)}}async function ki(){if(await K({title:"Reset ke 12 Role Default?",message:"Tindakan ini akan mengembalikan seluruh izin hak akses ke-12 role resmi penyelenggara event ke standar sistem default di database.",confirmText:"Ya, Reset Role Default",type:"warning"}))try{const a=await h("/admin/roles/reset-defaults",{method:"POST"});a.status==="success"?(p("success","Role Tersinkron",a.message),oe()):p("error","Gagal",a.message)}catch(a){p("error","Kesalahan Server",a.message)}}function Ei(){var t;document.getElementById("adminUserFormId").value="",document.getElementById("modalAdminUserTitle").innerHTML='<i class="fa-solid fa-user-shield" style="color: var(--color-primary);"></i> Tambah Akun Admin Baru',document.getElementById("adminUserFullName").value="",document.getElementById("adminUserUsername").value="",document.getElementById("adminUserEmail").value="",document.getElementById("adminUserPassword").value="",document.getElementById("adminUserPassword").required=!0,document.getElementById("adminPasswordReq").style.display="inline",document.getElementById("adminPasswordHint").textContent="Wajib diisi untuk akun baru (minimal 8 karakter).",(t=document.getElementById("modalAdminUserBackdrop"))==null||t.classList.add("open")}function Ii(t){var a;document.getElementById("adminUserFormId").value=t.id,document.getElementById("modalAdminUserTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Akun Admin: ${b(t.fullName)}`,document.getElementById("adminUserFullName").value=t.fullName,document.getElementById("adminUserUsername").value=t.username,document.getElementById("adminUserEmail").value=t.email,document.getElementById("adminUserRoleId").value=t.roleId,document.getElementById("adminUserPassword").value="",document.getElementById("adminUserPassword").required=!1,document.getElementById("adminPasswordReq").style.display="none",document.getElementById("adminPasswordHint").textContent="Kosongkan jika tidak ingin mengubah password akun ini.",(a=document.getElementById("modalAdminUserBackdrop"))==null||a.classList.add("open")}async function xi(t){var l;t.preventDefault();const a=document.getElementById("adminUserFormId").value,e=document.getElementById("adminUserFullName").value.trim(),n=document.getElementById("adminUserUsername").value.trim(),i=document.getElementById("adminUserEmail").value.trim(),s=document.getElementById("adminUserRoleId").value,o=document.getElementById("adminUserPassword").value,r={fullName:e,username:n,email:i,roleId:s,isActive:!0};o&&(r.password=o);try{let c;a?c=await h(`/admin/users-management/${a}`,{method:"PUT",body:JSON.stringify(r)}):c=await h("/admin/users-management",{method:"POST",body:JSON.stringify(r)}),c.status==="success"?(p("success","Berhasil",a?"Data akun admin diperbarui!":"Akun admin baru berhasil dibuat!"),(l=document.getElementById("modalAdminUserBackdrop"))==null||l.classList.remove("open"),oe()):p("error","Gagal",c.message||"Validasi admin gagal")}catch(c){p("error","Kesalahan Server",c.message)}}async function Ai(t){try{const a=await h(`/admin/users-management/${t}`,{method:"DELETE"});a.status==="success"?(p("success","Terhapus","Akun admin berhasil dihapus!"),oe()):p("error","Gagal",a.message)}catch(a){p("error","Kesalahan Server",a.message)}}window.switchRbacSubTab=It;async function ya(){try{const t=await h("/admin/logs?limit=25");t&&t.status==="success"&&Bi(t.data.logs||t.data||[])}catch(t){console.error("Failed to load audit logs:",t)}}function Bi(t){const a=document.getElementById("adminAuditLogsTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="4" style="text-align:center; padding:20px; color:#94A3B8;">Tidak ada catatan log audit.</td></tr>';return}a.innerHTML=t.map(e=>{var i,s;return`
      <tr>
        <td><small style="color: #64748B;">${new Date(e.createdAt).toLocaleString("id-ID")}</small></td>
        <td><code>${b(e.action)}</code></td>
        <td>${b(e.description)}</td>
        <td><strong>${b(((i=e.admin)==null?void 0:i.fullName)||((s=e.user)==null?void 0:s.fullName)||"Sistem")}</strong></td>
      </tr>
    `}).join("")}}async function Si(){var o;const t=(o=f.profile)==null?void 0:o.role,a=(t==null?void 0:t.name)||"",e=Array.isArray(t==null?void 0:t.permissions)?t.permissions:[],n=a==="SUPERADMIN",i=r=>n||e.includes(r),s=r=>{const[l]=r.split(":");return n||e.includes(r)||e.includes(`${l}:*`)};if(i("page:dashboard"))try{await ie(),i("page:countdown")&&s("countdown:manage")&&await sa(),i("page:events")&&s("events:read")&&await W(),(i("page:participants")||i("page:racepack"))&&s("participants:read")&&await se(),i("page:orders")&&s("orders:read")&&await X(),n&&await oe(),i("page:logs")&&s("logs:read")&&await ya(),te(f.profile)}catch(r){console.error("Error loading dashboard data:",r)}}async function ie(){try{const t=await h("/admin/stats");if(t&&t.status==="success"&&t.data){const a=t.data,e=document.getElementById("dashboardStatsError");e&&(e.hidden=!0);const n=document.getElementById("btnRetryDashboardStats");n&&(n.onclick=()=>ie());const i=a.financials||{},s=i.settled||{count:0,amount:0},o=i.pending||{count:0,amount:0},r=i.cancelled||{count:0,amount:0},l=i.serviceFee||{count:0,amount:0},c=i.netRevenue??a.netRevenue??0,m=document.getElementById("kpiTotalParticipants"),d=document.getElementById("kpiTotalRevenue"),u=document.getElementById("kpiTotalServiceFee"),g=document.getElementById("kpiNetRevenue");m&&(m.textContent=Number(a.totalParticipants||0).toLocaleString("id-ID")),d&&(d.textContent=H(a.totalRevenue??s.amount)),u&&(u.textContent=H(a.totalServiceFee??l.amount)),g&&(g.textContent=H(c));const y=document.getElementById("finSettledAmount"),v=document.getElementById("finSettledCount");y&&(y.textContent=H(s.amount)),v&&(v.textContent=`${s.count} Order`);const k=document.getElementById("finPendingAmount"),P=document.getElementById("finPendingCount");k&&(k.textContent=H(o.amount)),P&&(P.textContent=`${o.count} Order`);const N=document.getElementById("finCancelledAmount"),B=document.getElementById("finCancelledCount");N&&(N.textContent=H(r.amount)),B&&(B.textContent=`${r.count} Order`);const I=document.getElementById("finServiceFeeAmount"),x=document.getElementById("finServiceFeeCount"),F=a.totalServiceFee!==void 0?a.totalServiceFee:l.amount||0;I&&(I.textContent=H(F)),x&&(x.textContent=`${l.count} Transaksi`);const L=document.getElementById("calcGross"),E=document.getElementById("calcFee"),S=document.getElementById("calcNetResult");L&&(L.textContent=H(s.amount)),E&&(E.textContent=H(F)),S&&(S.textContent=H(c)),wi(a.registrationTrend||[],a.registrationGrowth),Ti(a.revenueTrend||[]),Fi(a.paymentStatusCounts||[]),Ni(a.conversionSummary),Li(a.racepackCheckinSummary),Mi(a.teamPresence),Di(a.participantProfile),Ri(a.jerseySizeCounts||[]),$i(a.categoryPerformance||[]),Oi(a.eventPerformance||[]),Ki(a.recentOrders||[]),Hi(a.recentActivity||[])}else throw new Error((t==null?void 0:t.message)||"Server tidak mengembalikan statistik dashboard.")}catch(t){console.error("Gagal memuat statistik dashboard:",t);const a=document.getElementById("dashboardStatsError"),e=a==null?void 0:a.querySelector("span");e&&(e.textContent=`Statistik dashboard gagal dimuat: ${t.message||"Terjadi kesalahan jaringan."}`),a&&(a.hidden=!1);const n=document.getElementById("btnRetryDashboardStats");n&&(n.onclick=()=>ie())}}function wi(t,a){const e=document.getElementById("dashboardRegistrationTrend");e&&St(e,t,"count",n=>`${Number(n).toLocaleString("id-ID")} peserta`,"#2563eb",a)}function Ti(t){const a=document.getElementById("dashboardRevenueTrend");a&&St(a,t,"amount",e=>H(e),"#16a34a")}function St(t,a,e,n,i,s){if(t.replaceChildren(),!a.length){ae(t,"Belum ada data untuk periode ini.");return}const o="http://www.w3.org/2000/svg",r=640,l=220,c=48,m=12,d=14,u=36,g=r-c-m,y=l-d-u,v=a.map(E=>Number(E[e])||0),k=Math.max(0,...v),P=Pi(k),N=P[0]||1,B=v.map((E,S)=>({x:c+(a.length>1?S/(a.length-1)*g:g/2),y:d+y-E/N*y,value:E})),I=document.createElementNS(o,"svg");if(I.setAttribute("viewBox",`0 0 ${r} ${l}`),I.setAttribute("role","img"),I.setAttribute("preserveAspectRatio","xMidYMid meet"),P.forEach(E=>{const S=N>0?E/N:0,M=d+y-y*S,A=document.createElementNS(o,"line");A.setAttribute("x1",String(c)),A.setAttribute("x2",String(r-m)),A.setAttribute("y1",String(M)),A.setAttribute("y2",String(M)),A.setAttribute("class","dashboard-svg-grid"),I.append(A);const C=document.createElementNS(o,"text");C.setAttribute("x",String(c-8)),C.setAttribute("y",String(M+4)),C.setAttribute("text-anchor","end"),C.setAttribute("class","dashboard-svg-label"),C.textContent=Ci(E,e),I.append(C)}),k===0){const E=document.createElementNS(o,"line");E.setAttribute("x1",String(c)),E.setAttribute("x2",String(r-m)),E.setAttribute("y1",String(d+y)),E.setAttribute("y2",String(d+y)),E.setAttribute("class","dashboard-svg-baseline"),I.append(E)}const x=document.createElementNS(o,"polyline");x.setAttribute("points",B.map(E=>`${E.x},${E.y}`).join(" ")),x.setAttribute("fill","none"),x.setAttribute("stroke",i),x.setAttribute("stroke-width","3"),x.setAttribute("stroke-linecap","round"),x.setAttribute("stroke-linejoin","round"),I.append(x),B.forEach((E,S)=>{if(E.value===0)return;const M=document.createElementNS(o,"circle");M.setAttribute("cx",String(E.x)),M.setAttribute("cy",String(E.y)),M.setAttribute("r",a.length>20?"2.5":"4"),M.setAttribute("fill",i);const A=document.createElementNS(o,"title");A.textContent=`${mt(a[S].date)}: ${n(E.value)}`,M.append(A),I.append(M)}),[0,Math.floor((a.length-1)/2),a.length-1].forEach(E=>{const S=document.createElementNS(o,"text");S.setAttribute("x",String(B[E].x)),S.setAttribute("y",String(l-8)),S.setAttribute("text-anchor",E===0?"start":E===a.length-1?"end":"middle"),S.setAttribute("class","dashboard-svg-label"),S.textContent=mt(a[E].date),I.append(S)}),t.append(I);const F=v.reduce((E,S)=>E+S,0),L=document.createElement("p");if(L.className="dashboard-chart-summary",L.textContent=e==="amount"?`Total pemasukan periode ini: ${H(F)}`:`Total pendaftaran periode ini: ${F.toLocaleString("id-ID")} peserta`,t.append(L),s){const E=document.createElement("p");E.className="dashboard-chart-comparison";const S=s.changePercent;E.textContent=S===null?`${Number(s.current||0).toLocaleString("id-ID")} pendaftar dalam 30 hari terakhir; belum ada data pembanding.`:`${S>0?"+":""}${S}% dibanding 30 hari sebelumnya (${Number(s.current||0).toLocaleString("id-ID")} vs ${Number(s.previous||0).toLocaleString("id-ID")}).`,E.classList.add(S===null||S>=0?"positive":"negative"),t.append(E)}}function Ci(t,a){return a==="amount"?new Intl.NumberFormat("id-ID",{notation:"compact",maximumFractionDigits:0}).format(t):Math.round(t).toLocaleString("id-ID")}function Pi(t){if(t<=0)return[1,0];const a=t/4,e=10**Math.floor(Math.log10(a)),n=a/e,i=n<=1?1:n<=2?2:n<=5?5:10,s=Math.max(1,i*e),o=Math.ceil(t/s)*s,r=[];for(let l=o;l>=0;l-=s)r.push(l);return r}function mt(t){return new Date(`${t}T00:00:00Z`).toLocaleDateString("id-ID",{day:"2-digit",month:"short",timeZone:"UTC"})}function Fi(t){const a=document.getElementById("dashboardPaymentStatuses");if(!a)return;const e={PENDING:"Menunggu",SETTLEMENT:"Lunas",CAPTURE:"Terbayar",CANCEL:"Dibatalkan",EXPIRE:"Kedaluwarsa",DENY:"Ditolak",REFUND:"Dikembalikan"};ha(a,t.map(n=>({label:e[n.status]||n.status,value:Number(n.count)||0,color:["CANCEL","EXPIRE","DENY","REFUND"].includes(n.status)?"#ef4444":n.status==="PENDING"?"#f59e0b":"#16a34a"})),"Order")}function ha(t,a,e){t.replaceChildren();const n=a.reduce((u,g)=>u+g.value,0);if(!n){ae(t,"Belum ada data untuk ditampilkan.");return}const i=document.createElement("div");i.className="dashboard-donut-layout";const s=document.createElement("div");s.className="dashboard-donut";let o=0;const r=a.map(u=>{const g=o;return o+=u.value/n*100,`${u.color} ${g}% ${o}%`});s.style.background=`conic-gradient(${r.join(", ")})`;const l=document.createElement("div");l.className="dashboard-donut-hole";const c=document.createElement("strong");c.textContent=n.toLocaleString("id-ID");const m=document.createElement("span");m.textContent=e,l.append(c,m),s.append(l);const d=document.createElement("div");d.className="dashboard-donut-legend",a.forEach(u=>{const g=document.createElement("div");g.className="dashboard-legend-item";const y=document.createElement("span");y.className="dashboard-legend-dot",y.style.backgroundColor=u.color;const v=document.createElement("span");v.textContent=u.label;const k=document.createElement("strong");k.textContent=`${u.value.toLocaleString("id-ID")} (${Math.round(u.value/n*100)}%)`,g.append(y,v,k),d.append(g)}),i.append(s,d),t.append(i)}function Ni(t){const a=document.getElementById("dashboardConversionSummary");if(!a)return;if(a.replaceChildren(),!t){ae(a,"Belum ada data transaksi.");return}[{label:"Konversi lunas",value:`${Number(t.conversionPercent||0)}%`,detail:`${Number(t.paidOrders||0).toLocaleString("id-ID")} lunas dari ${Number(t.totalOrders||0).toLocaleString("id-ID")} order`,tone:"green"},{label:"Rata-rata transaksi lunas",value:H(t.averagePaidOrder),detail:"Rata-rata nilai per order sukses",tone:"blue"}].forEach(n=>{const i=document.createElement("div");i.className=`dashboard-summary-card ${n.tone}`;const s=document.createElement("span");s.textContent=n.label;const o=document.createElement("strong");o.textContent=n.value;const r=document.createElement("small");r.textContent=n.detail,i.append(s,o,r),a.append(i)})}function Li(t){const a=document.getElementById("dashboardRacepackSummary");if(!a)return;if(a.replaceChildren(),!t){ae(a,"Data check-in racepack tidak tersedia.");return}const e=document.createElement("div");e.className="dashboard-racepack-chart",ha(e,[{label:"Sudah check-in",value:Number(t.checkedInCount)||0,color:"#16a34a"},{label:"Belum check-in",value:Number(t.remainingToCheckIn)||0,color:"#f59e0b"}],"Lunas");const n=document.createElement("div");n.className="dashboard-racepack-metrics";const i=document.createElement("div");i.className="dashboard-racepack-metric checked";const s=document.createElement("span");s.textContent="Sudah check-in";const o=document.createElement("strong");o.textContent=Number(t.checkedInCount||0).toLocaleString("id-ID"),i.append(s,o);const r=document.createElement("div");r.className="dashboard-racepack-metric remaining";const l=document.createElement("span");l.textContent="Belum check-in";const c=document.createElement("strong");c.textContent=Number(t.remainingToCheckIn||0).toLocaleString("id-ID"),r.append(l,c);const m=document.createElement("p");m.className="dashboard-racepack-total",m.textContent=`${Number(t.paidParticipants||0).toLocaleString("id-ID")} peserta lunas · ${Number(t.percentage||0)}% selesai`,n.append(i,r,m),a.append(e,n)}function Mi(t){var o;const a=document.getElementById("dashboardTeamPresence"),e=document.getElementById("dashboardTeamScope");if(!a)return;if(a.replaceChildren(),!t){ae(a,"Informasi kru tidak tersedia.");return}e&&(e.textContent=t.scope==="all"?"Ringkasan anggota aktif untuk semua role.":"Anggota aktif dan status online pada role Anda.");const n=document.createElement("div");n.className="dashboard-team-summary";const i=document.createElement("strong");i.textContent=`${Number(t.onlineCount||0).toLocaleString("id-ID")} online`;const s=document.createElement("span");if(s.textContent=`${Number(t.totalMembers||0).toLocaleString("id-ID")} anggota aktif`,n.append(i,s),a.append(n),!((o=t.teams)!=null&&o.length)){ae(a,"Belum ada anggota aktif pada role ini.");return}t.teams.forEach(r=>{const l=document.createElement("section");l.className="dashboard-team-card";const c=document.createElement("div");c.className="dashboard-team-card-header";const m=document.createElement("strong");m.textContent=r.roleName;const d=document.createElement("span");d.textContent=`${Number(r.onlineCount||0)} online · ${Number(r.memberCount||0)} anggota`,c.append(m,d);const u=document.createElement("ul");u.className="dashboard-team-members",(r.members||[]).forEach(g=>{const y=document.createElement("li"),v=document.createElement("span");v.className=`dashboard-presence-dot ${g.online?"online":"offline"}`;const k=document.createElement("span");k.textContent=g.name;const P=document.createElement("small");P.textContent=g.online?"Online":"Offline",y.append(v,k,P),u.append(y)}),l.append(c,u),a.append(l)})}function Di(t){const a=document.getElementById("dashboardParticipantGender"),e=document.getElementById("dashboardParticipantAge");if(a){const n={MALE:"Laki-laki",FEMALE:"Perempuan"};ha(a,((t==null?void 0:t.gender)||[]).map(i=>({label:n[i.label]||i.label,value:Number(i.count)||0,color:i.label==="MALE"?"#2563eb":"#ec4899"})),"Peserta")}e&&wt(e,(t==null?void 0:t.ageGroups)||[],{labelKey:"label",valueKey:"count",color:"#8b5cf6",emptyMessage:"Belum ada data kelompok usia."})}function Ri(t){const a=document.getElementById("dashboardJerseySizes");a&&wt(a,t,{labelKey:"size",valueKey:"count",color:"#f97316",emptyMessage:"Belum ada pilihan ukuran jersey."})}function $i(t){const a=document.getElementById("dashboardCategoryPerformance");if(!a)return;if(a.replaceChildren(),!t.length){ae(a,"Belum ada data kategori event.");return}const e=Math.max(1,...t.map(n=>Number(n.capacity)||0));t.forEach(n=>{const i=document.createElement("div");i.className="dashboard-category-row";const s=document.createElement("strong");s.textContent=n.category;const o=document.createElement("div");o.className="dashboard-category-track";const r=document.createElement("div");r.className="dashboard-category-fill",r.style.width=`${Math.max(0,Math.min(100,Number(n.capacity)/e*100))}%`;const l=document.createElement("span");l.className="dashboard-category-registered",l.style.width=`${Math.max(0,Math.min(100,Number(n.occupancyPercent)||0))}%`,r.append(l),o.append(r);const c=document.createElement("span");c.textContent=`${Number(n.participants||0).toLocaleString("id-ID")} / ${Number(n.capacity||0).toLocaleString("id-ID")} peserta · ${Number(n.occupancyPercent||0)}%`,i.append(s,o,c),a.append(i)})}function wt(t,a,e){if(t.replaceChildren(),!a.length){ae(t,e.emptyMessage);return}const n=Math.max(1,...a.map(i=>Number(i[e.valueKey])||0));a.forEach(i=>{const s=document.createElement("div");s.className="dashboard-chart-row";const o=document.createElement("span");o.textContent=i[e.labelKey];const r=document.createElement("div");r.className="dashboard-chart-track";const l=document.createElement("div");l.className="dashboard-chart-bar",l.style.background=e.color;const c=Number(i[e.valueKey])||0;l.style.width=`${c?Math.max(4,c/n*100):0}%`,r.append(l);const m=document.createElement("strong");m.textContent=c.toLocaleString("id-ID"),s.append(o,r,m),t.append(s)})}function Oi(t){const a=document.getElementById("dashboardEventPerformance");a&&(a.replaceChildren(),t.forEach(e=>{const n=document.createElement("tr"),i=document.createElement("td"),s=document.createElement("strong");s.textContent=`${e.ticketName} · ${e.category}`,i.append(s);const o=document.createElement("td");o.textContent=`${Number(e.registeredCount||0).toLocaleString("id-ID")} / ${Number(e.capacity||0).toLocaleString("id-ID")}`;const r=document.createElement("td");r.textContent=Number(e.remainingStock||0).toLocaleString("id-ID");const l=document.createElement("td");l.className="dashboard-capacity";const c=document.createElement("span");c.textContent=`${Number(e.occupancyPercent||0)}%`;const m=document.createElement("div");m.className="dashboard-capacity-track";const d=document.createElement("div");d.className="dashboard-capacity-fill",d.style.width=`${Math.max(0,Math.min(100,Number(e.occupancyPercent)||0))}%`,m.append(d),l.append(c,m);const u=document.createElement("td");u.textContent=e.isClosed?"Ditutup":"Dibuka",n.append(i,o,r,l,u),a.append(n)}),t.length||Tt(a,5,"Belum ada data event."))}function Ki(t){const a=document.getElementById("dashboardRecentOrders");if(!a)return;a.replaceChildren();const e={PENDING:"Menunggu",SETTLEMENT:"Lunas",CAPTURE:"Terbayar",CANCEL:"Dibatalkan",EXPIRE:"Kedaluwarsa",DENY:"Ditolak",REFUND:"Dikembalikan"};t.forEach(n=>{const i=document.createElement("tr"),s=document.createElement("td");s.textContent=n.reference;const o=document.createElement("td");o.textContent=e[n.status]||n.status;const r=document.createElement("td");r.textContent=Number(n.participantCount||0).toLocaleString("id-ID");const l=document.createElement("td");l.textContent=H(n.totalAmount),i.append(s,o,r,l),a.append(i)}),t.length||Tt(a,4,"Belum ada transaksi terbaru.")}function Hi(t){const a=document.getElementById("dashboardRecentActivity");if(a&&(a.replaceChildren(),t.forEach(e=>{const n=document.createElement("li"),i=document.createElement("span");i.textContent=[e.action,e.entityType].filter(Boolean).join(" · ");const s=document.createElement("time");s.dateTime=e.createdAt,s.textContent=new Date(e.createdAt).toLocaleString("id-ID",{dateStyle:"short",timeStyle:"short"}),n.append(i,s),a.append(n)}),!t.length)){const e=document.createElement("li");e.className="dashboard-empty-row",e.textContent="Belum ada aktivitas terbaru.",a.append(e)}}function ae(t,a){const e=document.createElement("p");e.className="dashboard-empty-row",e.textContent=a,t.append(e)}function Tt(t,a,e){const n=document.createElement("tr"),i=document.createElement("td");i.colSpan=a,i.className="dashboard-empty-row",i.textContent=e,n.append(i),t.append(n)}function Ui(){ie()}async function _i(){const t=document.getElementById("btnSyncMidtransDashboard"),a=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-arrows-rotate fa-spin"></i> Mensinkronkan...');try{const e=await h("/admin/finance/sync-midtrans",{method:"POST"});e&&e.status==="success"?(p("success","Rekonsiliasi Selesai",e.message||"Status transaksi berhasil disinkronkan dengan Midtrans!"),await ie(),X()):p("error","Gagal",(e==null?void 0:e.message)||"Gagal sinkronisasi dengan Midtrans.")}catch(e){p("error","Kesalahan Server",e.message)}finally{t&&(t.disabled=!1,t.innerHTML=a)}}async function Gi(t){t.preventDefault();const a=document.getElementById("adminIdentifier").value.trim(),e=document.getElementById("adminPassword").value,n=document.getElementById("btnLoginSubmit");n.disabled=!0,n.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Memverifikasi...';try{const i=await na("/admin/auth/login",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({identifier:a,password:e})});n.disabled=!1,n.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Masuk ke Dashboard Admin';const s=await i.text();let o;try{o=s?JSON.parse(s):{}}catch{p("error","Koneksi Gagal","Server backend belum siap atau tidak merespons JSON. Silakan coba beberapa saat lagi.");return}if(!i.ok||o.status!=="success"){p("error","Login Gagal",o.message||"Kredensial tidak valid");return}f.token=o.data.token,localStorage.setItem("tegal_admin_token",o.data.token),f.profile=o.data.admin,p("success","Selamat Datang!",`Berhasil masuk sebagai ${o.data.admin.fullName}`),Ct()}catch(i){n.disabled=!1,n.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Masuk ke Dashboard Admin';const s=i.message&&i.message.includes("Failed to fetch")?"Tidak dapat terhubung ke server backend. Silakan coba beberapa saat lagi.":i.message;p("error","Koneksi Gagal",s)}}function ke(){Ft(),f.token=null,f.profile=null,localStorage.removeItem("tegal_admin_token");const t=document.getElementById("adminDashboardSection"),a=document.getElementById("adminLoginSection");t&&(t.style.display="none"),a&&(a.style.display="flex")}async function Ct(){var t;if(!f.token){const a=document.getElementById("adminLoginSection"),e=document.getElementById("adminDashboardSection");a&&(a.style.display="flex"),e&&(e.style.display="none");return}try{const a=await na("/admin/auth/me",{headers:{Authorization:`Bearer ${f.token}`}}),e=await a.json();if(!a.ok||e.status!=="success"){ke();return}f.profile=e.data;const n=document.getElementById("adminLoginSection"),i=document.getElementById("adminDashboardSection");n&&(n.style.display="none"),i&&(i.style.display="flex");const s=((t=f.profile.role)==null?void 0:t.name)||"ADMIN",o=document.getElementById("adminRoleBadge"),r=document.getElementById("adminFullName"),l=document.getElementById("adminUsername");o&&(o.textContent=s),r&&(r.textContent=f.profile.fullName),l&&(l.textContent=`@${f.profile.username}`),await Yn(),te(f.profile),await Si(),Pt(f.token)}catch(a){console.error("Failed to authenticate:",a),ke()}}let Ve=!1;const Pe=new Set;async function ye(){if(!f.token||!f.profile||document.hidden||Ve)return;const t=f.activeTab,a=document.getElementById(`pane-${t}`);if(!a||document.querySelector(".admin-modal-backdrop.open, .confirm-modal-backdrop.open, dialog[open]"))return;const e=document.activeElement;if(t!=="racepack"&&e instanceof HTMLElement&&a.contains(e)&&e.matches('input, textarea, select, [contenteditable="true"]'))return;const i={dashboard:{topics:["dashboard"],load:ie},events:{topics:["events"],load:W},participants:{topics:["participants"],load:se},orders:{topics:["orders"],load:X},admins:{topics:["admins"],load:oe},logs:{topics:["logs"],load:ya},routes:{topics:["routes"],load:()=>Ee({showLoading:!1})},countdown:{topics:["countdown"],load:sa},"notif-logs":{topics:["notif-logs"],load:()=>ne({showLoading:!1})},racepack:{topics:["racepack"],load:Ie},"racepack-view":{topics:["racepack"],load:ba},"role-monitoring":{topics:["admins"],load:xe}}[t];if(!(!i||!i.topics.some(s=>Pe.has(s)))){Ve=!0;try{i.topics.forEach(s=>Pe.delete(s)),await i.load()}catch(s){console.error(`Failed to refresh admin tab "${t}":`,s)}finally{Ve=!1,i.topics.some(s=>Pe.has(s))&&ye()}}}function pt({topics:t=[]}={}){t.forEach(a=>Pe.add(a)),ye()}window.closeAdminModal=function(t){var a;(a=document.getElementById(t))==null||a.classList.remove("open")};function ji(){const t=document.getElementById("adminPanesContainer")||document.querySelector(".admin-content-body");t&&t.children.length===0&&(t.innerHTML=[Lt,Mt,Dt,Rt,$t,Ot,Kt,Ht,Ut,_t,Gt,jt,zt,qt,Wt,Jt].join(`
`));const a=document.getElementById("rpcInfoDialog");a&&a.parentElement!==document.body&&document.body.appendChild(a);const e=document.getElementById("adminModalsContainer");e&&e.children.length===0&&(e.innerHTML=Qt)}document.addEventListener("DOMContentLoaded",()=>{var e,n,i,s,o,r,l,c,m,d,u,g,y,v,k,P,N,B,I,x,F,L,E,S,M,A,C,O,R,Ae,pe,Be,va,ka,Ea,Ia,xa,Aa,Ba,Sa,wa,Ta,Ca,Pa,Fa,Na,La,Ma,Da,Ra,$a,Oa,Ka,Ha,Ua,_a,Ga,ja,za,qa,Wa,Ja,Qa,Va,Ya,Xa,Za,et,at;ji(),(e=document.getElementById("adminLoginForm"))==null||e.addEventListener("submit",Gi),(n=document.getElementById("btnToggleSidebar"))==null||n.addEventListener("click",Zn),(i=document.getElementById("sidebarOverlay"))==null||i.addEventListener("click",ta),(s=document.getElementById("btnRefreshEvents"))==null||s.addEventListener("click",W),(o=document.getElementById("btnRefreshOrders"))==null||o.addEventListener("click",X),(r=document.getElementById("btnRefreshLogs"))==null||r.addEventListener("click",ya),(l=document.getElementById("btnExportCsv"))==null||l.addEventListener("click",ri),(c=document.getElementById("btnOpenCreateEventModal"))==null||c.addEventListener("click",an),(m=document.getElementById("btnOpenCreateParticipantModal"))==null||m.addEventListener("click",ni),(d=document.getElementById("btnOpenCreateAdminModal"))==null||d.addEventListener("click",Ei),(u=document.getElementById("btnOpenCreateRouteModal"))==null||u.addEventListener("click",kn),(g=document.getElementById("btnOpenCreateRoleModal"))==null||g.addEventListener("click",fi),(y=document.getElementById("btnResetDefaultRoles"))==null||y.addEventListener("click",ki),(v=document.getElementById("formEvent"))==null||v.addEventListener("submit",nn),(k=document.getElementById("formParticipant"))==null||k.addEventListener("submit",si),(P=document.getElementById("formOrderStatus"))==null||P.addEventListener("submit",mi),(N=document.getElementById("formAdminUser"))==null||N.addEventListener("submit",xi),(B=document.getElementById("formRole"))==null||B.addEventListener("submit",hi),(I=document.getElementById("btnSelectAllPages"))==null||I.addEventListener("click",()=>{document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(w=>{w.checked=!0,w.dispatchEvent(new Event("change",{bubbles:!0}))})}),(x=document.getElementById("btnClearAllPages"))==null||x.addEventListener("click",()=>{document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(w=>{w.checked=!1,w.dispatchEvent(new Event("change",{bubbles:!0}))})}),(F=document.getElementById("btnPresetDefaultPages"))==null||F.addEventListener("click",()=>{var V;const w=((V=document.getElementById("roleFormName"))==null?void 0:V.value.trim().toUpperCase())||"",Q=fa.find(z=>z.name===w)?w==="ADMINISTRATOR"?["page:dashboard","page:events","page:participants","page:racepack","page:orders","page:notif-logs","page:whatsapp-web","page:cms","page:countdown","page:routes"]:w==="FINANCE"?["page:dashboard","page:orders","page:logs"]:w==="SPONSORSHIP"?["page:dashboard","page:cms","page:events","page:notif-logs"]:w==="RACEPACK_OFFICER"?["page:dashboard","page:racepack","page:participants","page:whatsapp-web"]:w==="GATE_OPERATOR"?["page:dashboard","page:participants","page:racepack"]:w==="RACE_DIRECTOR"?["page:dashboard","page:routes","page:countdown","page:participants","page:events","page:racepack"]:w==="TIMING_JUDGE"?["page:dashboard","page:participants","page:routes"]:w==="MEDICAL_OFFICER"?["page:dashboard","page:participants","page:routes"]:w==="VOLUNTEER"?["page:dashboard","page:participants","page:racepack"]:w==="BAG_DROP_OFFICER"?["page:dashboard","page:participants"]:w==="CUSTOMER_SERVICE"?["page:dashboard","page:whatsapp-web","page:notif-logs","page:participants","page:orders","page:racepack"]:["page:dashboard"]:["page:dashboard"];document.querySelectorAll('#roleApiPermissionsContainer input[type="checkbox"]:not(:disabled)').forEach(z=>{var Se;z.checked=!1,(Se=z.closest(".role-permission-option"))==null||Se.classList.remove("checked")}),document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(z=>{const Se=Q.includes(z.value);z.checked=Se,z.dispatchEvent(new Event("change",{bubbles:!0}))})}),(L=document.getElementById("formCmsSettings"))==null||L.addEventListener("submit",lt),(E=document.getElementById("formWebsiteCms"))==null||E.addEventListener("submit",lt),(S=document.getElementById("formNotificationSettings"))==null||S.addEventListener("submit",Pn),(M=document.getElementById("btnSendTestNotif"))==null||M.addEventListener("click",Fn),(A=document.getElementById("formEventBenefit"))==null||A.addEventListener("submit",mn),(C=document.getElementById("btnCancelBenefitEdit"))==null||C.addEventListener("click",ma),(O=document.getElementById("formEventJersey"))==null||O.addEventListener("submit",ln),(R=document.getElementById("btnCancelJerseyEdit"))==null||R.addEventListener("click",da),(Ae=document.getElementById("jerseyFormImage"))==null||Ae.addEventListener("input",la),(pe=document.getElementById("formRoutePoint"))==null||pe.addEventListener("submit",In),(Be=document.getElementById("routeSettingsForm"))==null||Be.addEventListener("submit",hn),(va=document.getElementById("routeMapMode"))==null||va.addEventListener("change",ue),(ka=document.getElementById("routeCheckpointMode"))==null||ka.addEventListener("change",ue),(Ea=document.getElementById("routeSettingsMapImage"))==null||Ea.addEventListener("input",ue),(Ia=document.getElementById("routeSettingsCheckpointImage"))==null||Ia.addEventListener("input",ue),(xa=document.getElementById("btnSaveGlobalCountdown"))==null||xa.addEventListener("click",Yt),(Aa=document.getElementById("btnResetGlobalCountdown"))==null||Aa.addEventListener("click",Xt),(Ba=document.getElementById("btnToggleGlobalClosed"))==null||Ba.addEventListener("click",Zt),(Sa=document.getElementById("filterOrderStatus"))==null||Sa.addEventListener("change",X),(wa=document.getElementById("searchOrder"))==null||wa.addEventListener("input",()=>{clearTimeout(window._searchOrderTimer),window._searchOrderTimer=setTimeout(X,300)}),document.querySelectorAll(".participant-tabs-nav .part-tab-btn").forEach(w=>{w.addEventListener("click",()=>{const U=w.getAttribute("data-tab");U&&ai(U)})}),(Ta=document.getElementById("filterParticipantCategory"))==null||Ta.addEventListener("change",$e),(Ca=document.getElementById("searchParticipant"))==null||Ca.addEventListener("input",()=>{clearTimeout(window._searchParticipantTimer),window._searchParticipantTimer=setTimeout($e,250)}),(Pa=document.getElementById("btnRefreshRacepackStats"))==null||Pa.addEventListener("click",Ie);const t=document.getElementById("rpcInfoDialog");(Fa=document.getElementById("btnRpcInfo"))==null||Fa.addEventListener("click",()=>{t instanceof HTMLDialogElement&&!t.open&&t.showModal()}),(Na=document.getElementById("btnCloseRpcInfo"))==null||Na.addEventListener("click",()=>{t instanceof HTMLDialogElement&&t.close()}),t==null||t.addEventListener("click",w=>{w.target===t&&t instanceof HTMLDialogElement&&t.close()}),(La=document.getElementById("btnStartRpcCamera"))==null||La.addEventListener("click",Kn),(Ma=document.getElementById("btnStopRpcCamera"))==null||Ma.addEventListener("click",ze),(Da=document.getElementById("btnTriggerNativeCamera"))==null||Da.addEventListener("click",aa),(Ra=document.getElementById("rpcNativeCameraInput"))==null||Ra.addEventListener("change",Hn),($a=document.getElementById("btnConfirmRpcCheckin"))==null||$a.addEventListener("click",$n),(Oa=document.getElementById("btnRefreshRacepackQueue"))==null||Oa.addEventListener("click",ba),(Ka=document.getElementById("btnRevertRpcCheckin"))==null||Ka.addEventListener("click",On),(Ha=document.getElementById("formRpcManualSearch"))==null||Ha.addEventListener("submit",w=>{w.preventDefault();const U=document.getElementById("rpcSearchInput"),Q=U?U.value.trim():"";Q&&ee(Q)}),(Ua=document.getElementById("btnGenerateWaQr"))==null||Ua.addEventListener("click",wn),(_a=document.getElementById("btnDisconnectWa"))==null||_a.addEventListener("click",Tn),(Ga=document.getElementById("btnRefreshNotifLogs"))==null||Ga.addEventListener("click",ne),(ja=document.getElementById("btnBatchSendNotif"))==null||ja.addEventListener("click",Mn),(za=document.getElementById("filterNotifDeliveryStatus"))==null||za.addEventListener("change",ne),(qa=document.getElementById("searchNotifLogs"))==null||qa.addEventListener("input",()=>{clearTimeout(window._searchNotifTimer),window._searchNotifTimer=setTimeout(ne,300)}),(Wa=document.getElementById("btnRefreshWaWeb"))==null||Wa.addEventListener("click",Ze),(Ja=document.getElementById("btnWaWebSync"))==null||Ja.addEventListener("click",Ze),(Qa=document.getElementById("btnGoToWaQr"))==null||Qa.addEventListener("click",()=>ve("notifications")),(Va=document.getElementById("btnSyncMidtransDashboard"))==null||Va.addEventListener("click",_i),(Ya=document.getElementById("btnSendWaDirectMsg"))==null||Ya.addEventListener("click",An),(Xa=document.getElementById("waQuickTemplateSelect"))==null||Xa.addEventListener("change",Bn),(Za=document.getElementById("btnQuickSendPaidTicket"))==null||Za.addEventListener("click",()=>dt()),(et=document.getElementById("btnQuickSendPending"))==null||et.addEventListener("click",()=>dt()),(at=document.getElementById("waContactSearchInput"))==null||at.addEventListener("input",w=>{const U=(w.target.value||"").toLowerCase(),Q=Y.filter(V=>V.customerName.toLowerCase().includes(U)||V.customerPhone.includes(U)||V.ticketName.toLowerCase().includes(U));Ge(Q)}),Jn();const a=Nt();a.on("admin:data_changed",pt),a.on("admin:whatsapp_session",Cn),a.on("admin:force_logout",()=>{p("warning","Sesi Diakhiri","Superadmin telah mengakhiri sesi Anda. Silakan login kembali jika diperlukan."),ke()}),a.on("admin:presence_changed",()=>{var z;const w=(z=f.profile)==null?void 0:z.role;(w==null?void 0:w.name)==="SUPERADMIN"&&f.activeTab==="role-monitoring"&&xe();const U=Array.isArray(w==null?void 0:w.permissions)?w.permissions:[],Q=(w==null?void 0:w.name)==="SUPERADMIN"||U.includes("page:dashboard"),V=(w==null?void 0:w.name)==="SUPERADMIN"||!U.includes("dashboard:configured")||U.includes("dashboard:team-presence");Q&&V&&ie()}),window.addEventListener("admin:tab-changed",ye),document.addEventListener("focusout",ye),document.addEventListener("visibilitychange",()=>{document.hidden||ye()}),window.addEventListener("realtime:reconnected",()=>{pt({topics:["dashboard","events","participants","orders","admins","logs","routes","notif-logs","racepack"]})}),Ct()});
