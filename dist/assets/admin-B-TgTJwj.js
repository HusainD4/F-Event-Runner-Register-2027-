import{a as Ce}from"./api-Ub7T_Sm5.js";const Ma=`<div class="admin-tab-pane active" id="pane-dashboard">\r
          <!-- Top KPI Grid: Pemisahan Jelas Total Biaya Layanan & Hasil Akhir Murni Bersih -->\r
          <div class="admin-kpi-grid">\r
            <div class="kpi-card">\r
              <div class="kpi-icon orange"><i class="fa-solid fa-users"></i></div>\r
              <div class="kpi-details">\r
                <span class="kpi-label">Peserta Terdaftar</span>\r
                <h3 class="kpi-val" id="kpiTotalParticipants">0</h3>\r
                <span class="kpi-sub">Total Pelari di Database</span>\r
              </div>\r
            </div>\r
\r
            <div class="kpi-card">\r
              <div class="kpi-icon blue"><i class="fa-solid fa-receipt"></i></div>\r
              <div class="kpi-details">\r
                <span class="kpi-label">Total Omzet Kotor</span>\r
                <h3 class="kpi-val" id="kpiTotalRevenue">Rp 0</h3>\r
                <span class="kpi-sub">Total Masuk Sebelum Potongan</span>\r
              </div>\r
            </div>\r
\r
            <div class="kpi-card" style="border: 2px solid #FCD34D; background: #FFFBEB;">\r
              <div class="kpi-icon purple" style="background: #F59E0B; color: #FFFFFF;"><i class="fa-solid fa-hand-holding-dollar"></i></div>\r
              <div class="kpi-details">\r
                <span class="kpi-label" style="color: #92400E; font-weight: 700;">TOTAL BIAYA LAYANAN</span>\r
                <h3 class="kpi-val" id="kpiTotalServiceFee" style="color: #B45309;">Rp 0</h3>\r
                <span class="kpi-sub" style="color: #92400E;">Akumulasi Fee Sistem & Gateway</span>\r
              </div>\r
            </div>\r
\r
            <div class="kpi-card" style="border: 2px solid #86EFAC; background: #F0FDF4;">\r
              <div class="kpi-icon green" style="background: #22C55E; color: #FFFFFF;"><i class="fa-solid fa-vault"></i></div>\r
              <div class="kpi-details">\r
                <span class="kpi-label" style="color: #166534; font-weight: 700;">HASIL AKHIR MURNI (BERSIH)</span>\r
                <h3 class="kpi-val" id="kpiNetRevenue" style="color: #15803D;">Rp 0</h3>\r
                <span class="kpi-sub" style="color: #166534;">Omzet Bersih (Setelah Potong Biaya Layanan)</span>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- SECTION: REKONSILIASI KEUANGAN & RINCIAN TRANSAKSI (HANYA LUNAS, PENDING, BATAL, BIAYA LAYANAN) -->\r
          <div class="admin-section" style="margin-top: 20px; border: 1px solid #E2E8F0; background: #FFFFFF; border-radius: var(--radius-xl);">\r
            <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">\r
              <div>\r
                <h3 style="display: flex; align-items: center; gap: 8px;">\r
                  <i class="fa-solid fa-scale-balanced" style="color: var(--color-primary);"></i>\r
                  Rekonsiliasi Keuangan &amp; Rincian Transaksi\r
                </h3>\r
                <p>Data keuangan terpisah rapi: Lunas, Menunggu Pembayaran, Dibatalkan, dan Akumulasi Biaya Layanan.</p>\r
              </div>\r
              <button type="button" class="btn btn-outline btn-sm btn-glow" id="btnSyncMidtransDashboard" title="Cek &amp; perbarui seluruh status transaksi dari server Midtrans">\r
                <i class="fa-solid fa-arrows-rotate"></i> Sinkronkan Status Midtrans\r
              </button>\r
            </div>\r
\r
            <!-- Financial Breakdown Grid (4 Item: Lunas, Pending, Batal, Biaya Layanan) -->\r
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px;">\r
              <!-- 1. LUNAS -->\r
              <div class="glass-card" style="padding: 16px; border: 1px solid #BBF7D0; background: #F0FDF4; border-radius: var(--radius-lg);">\r
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">\r
                  <span style="font-size: 0.78rem; font-weight: 700; color: #166534; text-transform: uppercase;">\r
                    <i class="fa-solid fa-circle-check"></i> 1. Lunas (Settlement)\r
                  </span>\r
                  <span class="badge" style="background: #DCFCE7; color: #15803D; font-weight: 800; font-size: 0.7rem;" id="finSettledCount">0 Order</span>\r
                </div>\r
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #15803D; margin: 0 0 4px 0;" id="finSettledAmount">Rp 0</h3>\r
                <small style="color: #166534; font-size: 0.72rem;">Transaksi terverifikasi &amp; dana masuk</small>\r
              </div>\r
\r
              <!-- 2. PENDING -->\r
              <div class="glass-card" style="padding: 16px; border: 1px solid #FDE68A; background: #FFFBEB; border-radius: var(--radius-lg);">\r
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">\r
                  <span style="font-size: 0.78rem; font-weight: 700; color: #92400E; text-transform: uppercase;">\r
                    <i class="fa-solid fa-clock"></i> 2. Pending (Menunggu)\r
                  </span>\r
                  <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 800; font-size: 0.7rem;" id="finPendingCount">0 Order</span>\r
                </div>\r
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #B45309; margin: 0 0 4px 0;" id="finPendingAmount">Rp 0</h3>\r
                <small style="color: #92400E; font-size: 0.72rem;">Belum dibayarkan oleh calon peserta</small>\r
              </div>\r
\r
              <!-- 3. BATAL -->\r
              <div class="glass-card" style="padding: 16px; border: 1px solid #FECACA; background: #FEF2F2; border-radius: var(--radius-lg);">\r
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">\r
                  <span style="font-size: 0.78rem; font-weight: 700; color: #991B1B; text-transform: uppercase;">\r
                    <i class="fa-solid fa-ban"></i> 3. Batal / Expired\r
                  </span>\r
                  <span class="badge" style="background: #FEE2E2; color: #B91C1C; font-weight: 800; font-size: 0.7rem;" id="finCancelledCount">0 Order</span>\r
                </div>\r
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #B91C1C; margin: 0 0 4px 0;" id="finCancelledAmount">Rp 0</h3>\r
                <small style="color: #991B1B; font-size: 0.72rem;">Kadaluarsa atau dibatalkan sistem</small>\r
              </div>\r
\r
              <!-- 4. BIAYA LAYANAN -->\r
              <div class="glass-card" style="padding: 16px; border: 1px solid #E9D5FF; background: #FAF5FF; border-radius: var(--radius-lg);">\r
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">\r
                  <span style="font-size: 0.78rem; font-weight: 700; color: #6B21A8; text-transform: uppercase;">\r
                    <i class="fa-solid fa-hand-holding-dollar"></i> 4. Biaya Layanan\r
                  </span>\r
                  <span class="badge" style="background: #F3E8FF; color: #7E22CE; font-weight: 800; font-size: 0.7rem;" id="finServiceFeeCount">0 Transaksi</span>\r
                </div>\r
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #7E22CE; margin: 0 0 4px 0;" id="finServiceFeeAmount">Rp 0</h3>\r
                <small style="color: #6B21A8; font-size: 0.72rem;">Total akumulasi biaya layanan</small>\r
              </div>\r
            </div>\r
\r
            <!-- Reconciliation Formula Summary Banner -->\r
            <div style="padding: 14px 20px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">\r
              <div style="display: flex; align-items: center; gap: 10px;">\r
                <span class="badge" style="background: #0F172A; color: #FFFFFF; font-weight: 700; padding: 6px 12px;">\r
                  <i class="fa-solid fa-calculator"></i> REKONSILIASI AKHIR\r
                </span>\r
                <span style="font-size: 0.88rem; color: #334155; font-weight: 600;">\r
                  Total Lunas (<span id="calcGross" style="color: #15803D;">Rp 0</span>) − Total Biaya Layanan (<span id="calcFee" style="color: #7E22CE;">Rp 0</span>) = HASIL AKHIR MURNI\r
                </span>\r
              </div>\r
              <div style="font-size: 0.85rem; font-weight: 700; color: #059669;">\r
                Bersih Diterima: <span id="calcNetResult" style="font-size: 1.15rem; font-weight: 800;">Rp 0</span>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Quick Overview Section -->\r
          <div class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-bolt" style="color: var(--color-primary);"></i> Pintasan Cepat & Ringkasan Operasional</h3>\r
                <p>Navigasi cepat untuk mengelola event, peserta, dan transaksi secara real-time.</p>\r
              </div>\r
            </div>\r
\r
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">\r
              <div class="kpi-card" style="cursor: pointer;" onclick="switchAdminTab('events')">\r
                <div class="kpi-icon orange"><i class="fa-solid fa-calendar-days"></i></div>\r
                <div>\r
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Kelola Event & Tiket</h4>\r
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Atur kuota, harga, dan buka/tutup kategori.</p>\r
                </div>\r
              </div>\r
\r
              <div class="kpi-card" style="cursor: pointer;" onclick="switchAdminTab('participants')">\r
                <div class="kpi-icon blue"><i class="fa-solid fa-users"></i></div>\r
                <div>\r
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Database Peserta</h4>\r
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Lihat NIK, nomor BIB, dan ekspor CSV.</p>\r
                </div>\r
              </div>\r
\r
              <div class="kpi-card" style="cursor: pointer;" onclick="switchAdminTab('orders')">\r
                <div class="kpi-icon green"><i class="fa-solid fa-receipt"></i></div>\r
                <div>\r
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Transaksi & Pembayaran</h4>\r
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Konfirmasi pembayaran dan status order.</p>\r
                </div>\r
              </div>\r
\r
              <div class="kpi-card" style="cursor: pointer;" onclick="switchAdminTab('countdown')">\r
                <div class="kpi-icon purple"><i class="fa-solid fa-stopwatch-20"></i></div>\r
                <div>\r
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Target Countdown Event</h4>\r
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Atur tanggal race day dan status registrasi global.</p>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>`,$a=`<div class="admin-tab-pane" id="pane-events">\r
          <div class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-calendar-days" style="color: var(--color-primary);"></i> Manajemen Kategori Lomba & Tiket</h3>\r
                <p>Tambah, edit, hapus, atur kuota, harga, dan status buka/tutup per kategori.</p>\r
              </div>\r
              <div class="admin-action-bar">\r
                <button class="btn btn-secondary btn-sm" id="btnRefreshEvents">\r
                  <i class="fa-solid fa-rotate"></i> Segarkan\r
                </button>\r
                <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateEventModal" data-permission="events:create">\r
                  <i class="fa-solid fa-plus"></i> Tambah Event Baru\r
                </button>\r
              </div>\r
            </div>\r
\r
            <!-- List of Event Cards -->\r
            <div class="admin-events-list" id="adminEventsContainer">\r
              <div style="text-align: center; padding: 40px; grid-column: span 2;">\r
                <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--color-primary);"></i>\r
                <p style="margin-top: 10px; color: var(--color-text-muted);">Memuat daftar event...</p>\r
              </div>\r
            </div>\r
          </div>\r
        </div>`,Oa=`<div class="admin-tab-pane" id="pane-participants">\r
  <div class="admin-section">\r
    <div class="admin-section-header" style="flex-wrap: wrap; gap: 14px;">\r
      <div>\r
        <h3 style="display: flex; align-items: center; gap: 8px;">\r
          <i class="fa-solid fa-users" style="color: var(--color-primary);"></i>\r
          Database Peserta &amp; Validasi Pelari\r
        </h3>\r
        <p>Kelola data lengkap pelari, nomor BIB, status verifikasi pembayaran Midtrans, dan status serah terima Racepack (Check-in).</p>\r
      </div>\r
      <div class="admin-action-bar" style="flex-wrap: wrap; gap: 8px;">\r
        <input type="text" class="form-input form-input-sm" id="searchParticipant" placeholder="Cari Nama, BIB, NIK, No. HP..." style="width: 230px;">\r
        <select class="form-input form-input-sm" id="filterParticipantCategory" style="width: 150px;">\r
          <option value="">Semua Kategori</option>\r
          <option value="10K">10K Only</option>\r
          <option value="5K">5K Only</option>\r
        </select>\r
        <button class="btn btn-secondary btn-sm" id="btnExportCsv">\r
          <i class="fa-solid fa-file-csv"></i> Unduh CSV\r
        </button>\r
        <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateParticipantModal" data-permission="participants:create">\r
          <i class="fa-solid fa-user-plus"></i> Tambah Peserta Manual\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Segmented Tab Filter: Pisahkan per Status Pembayaran & Racepack -->\r
    <div class="participant-tabs-nav" style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; padding-bottom: 6px; border-bottom: 1px solid #E2E8F0;">\r
      <button type="button" class="btn btn-primary btn-sm part-tab-btn active" data-tab="ALL" id="partTabAll" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">\r
        <i class="fa-solid fa-layer-group"></i> Semua Peserta <span class="badge" style="background: rgba(255,255,255,0.3); color: #FFFFFF;" id="countPartAll">0</span>\r
      </button>\r
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="SETTLED" id="partTabSettled" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #86EFAC; color: #15803D;">\r
        <i class="fa-solid fa-circle-check"></i> Pembayaran Sukses (Lunas) <span class="badge" style="background: #DCFCE7; color: #166534;" id="countPartSettled">0</span>\r
      </button>\r
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="PENDING" id="partTabPending" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #FDE68A; color: #B45309;">\r
        <i class="fa-solid fa-clock"></i> Menunggu Bayar (Pending) <span class="badge" style="background: #FEF3C7; color: #92400E;" id="countPartPending">0</span>\r
      </button>\r
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="CANCELLED" id="partTabCancelled" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #FECACA; color: #B91C1C;">\r
        <i class="fa-solid fa-ban"></i> Dibatalkan / Expired <span class="badge" style="background: #FEE2E2; color: #991B1B;" id="countPartCancelled">0</span>\r
      </button>\r
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="RACEPACK_DONE" id="partTabRacepackDone" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #A7F3D0; color: #047857;">\r
        <i class="fa-solid fa-box-check"></i> Racepack Sudah Diambil <span class="badge" style="background: #D1FAE5; color: #065F46;" id="countPartRacepackDone">0</span>\r
      </button>\r
      <button type="button" class="btn btn-outline btn-sm part-tab-btn" data-tab="RACEPACK_PENDING" id="partTabRacepackPending" style="border-radius: 20px; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border-color: #FED7AA; color: #C2410C;">\r
        <i class="fa-solid fa-box-open"></i> Racepack Belum Diambil <span class="badge" style="background: #FFEDD5; color: #9A3412;" id="countPartRacepackPending">0</span>\r
      </button>\r
    </div>\r
\r
    <!-- Info Banner Aktif -->\r
    <div id="participantFilterBanner" style="padding: 10px 16px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-md); margin-bottom: 14px; font-size: 0.82rem; color: #475569; display: flex; justify-content: space-between; align-items: center;">\r
      <div>\r
        Menampilkan tabel: <strong id="participantActiveTabTitle" style="color: #0F172A;">Semua Peserta Terdaftar</strong> (<span id="participantFilteredCount">0</span> peserta)\r
      </div>\r
      <div style="font-size: 0.78rem; color: #64748B;">\r
        <i class="fa-solid fa-info-circle"></i> Gunakan tab di atas untuk memfilter tabel atau tampilkan seluruhnya.\r
      </div>\r
    </div>\r
\r
    <div class="table-responsive">\r
      <table class="admin-table">\r
        <thead>\r
          <tr>\r
            <th>No</th>\r
            <th>Nama Peserta (KTP)</th>\r
            <th>Nomor &amp; Nama BIB</th>\r
            <th>NIK (KTP)</th>\r
            <th>Kategori</th>\r
            <th>Gender &amp; Gol. Darah</th>\r
            <th>Jersey</th>\r
            <th>Kontak Darurat</th>\r
            <th>Status Pembayaran</th>\r
            <th>Status Racepack</th>\r
            <th style="text-align: center; min-width: 110px;">Aksi</th>\r
          </tr>\r
        </thead>\r
        <tbody id="adminParticipantsTableBody">\r
          <tr>\r
            <td colspan="11" style="text-align: center; padding: 30px; color: var(--color-text-muted);">\r
              Memuat data peserta...\r
            </td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
  </div>\r
</div>\r
`,Ka=`<div class="admin-tab-pane" id="pane-racepack">\r
  <div class="admin-section">\r
    <div class="admin-section-header" style="flex-wrap: wrap; gap: 14px;">\r
      <div>\r
        <h3 style="display: flex; align-items: center; gap: 8px;">\r
          <i class="fa-solid fa-box-open" style="color: var(--color-primary);"></i>\r
          Pengambilan Racepack &amp; Validasi E-Tiket (RPC)\r
        </h3>\r
        <p>Pindai QR Code E-Tiket via kamera HP atau cari data peserta secara instan untuk verifikasi status bayar, ukuran jersey, dan serah terima paket lomba.</p>\r
      </div>\r
      <div class="admin-action-bar">\r
        <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshRacepackStats">\r
          <i class="fa-solid fa-rotate"></i> Segarkan Data\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- KPI Summary Grid -->\r
    <div class="admin-kpi-grid" style="margin-bottom: 20px;">\r
      <div class="kpi-card" style="border: 1px solid #BBF7D0; background: #F0FDF4;">\r
        <div class="kpi-icon green" style="background: #22C55E; color: #FFFFFF;"><i class="fa-solid fa-circle-check"></i></div>\r
        <div class="kpi-details">\r
          <span class="kpi-label" style="color: #166534; font-weight: 700;">SUDAH DIAMBIL (CHECK-IN)</span>\r
          <h3 class="kpi-val" id="rpcKpiCheckedIn" style="color: #15803D;">0</h3>\r
          <span class="kpi-sub" style="color: #166534;" id="rpcKpiPercentage">0% dari peserta lunas</span>\r
        </div>\r
      </div>\r
\r
      <div class="kpi-card" style="border: 1px solid #FED7AA; background: #FFF7ED;">\r
        <div class="kpi-icon orange" style="background: #F97316; color: #FFFFFF;"><i class="fa-solid fa-box-open"></i></div>\r
        <div class="kpi-details">\r
          <span class="kpi-label" style="color: #9A3412; font-weight: 700;">BELUM DIAMBIL (SISA)</span>\r
          <h3 class="kpi-val" id="rpcKpiRemaining" style="color: #C2410C;">0</h3>\r
          <span class="kpi-sub" style="color: #9A3412;">Paket lomba siap diserahkan</span>\r
        </div>\r
      </div>\r
\r
      <div class="kpi-card">\r
        <div class="kpi-icon blue"><i class="fa-solid fa-users"></i></div>\r
        <div class="kpi-details">\r
          <span class="kpi-label">Total Peserta Berhak (Lunas)</span>\r
          <h3 class="kpi-val" id="rpcKpiPaidTotal">0</h3>\r
          <span class="kpi-sub">Pembayaran terverifikasi</span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Main 2-Column Interface: Left Scan/Search, Right Checklist Validation -->\r
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px; align-items: start;">\r
      \r
      <!-- LEFT COLUMN: CAMERA SCANNER & MANUAL SEARCH -->\r
      <div>\r
        <!-- Camera Scanner Card (Mobile First) -->\r
        <div class="glass-card" style="padding: 20px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); margin-bottom: 20px;">\r
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">\r
            <h4 style="margin: 0; font-size: 1rem; color: #0F172A; display: flex; align-items: center; gap: 8px;">\r
              <i class="fa-solid fa-camera" style="color: var(--color-primary);"></i>\r
              Kamera Scanner QR E-Tiket (HP / Tablet)\r
            </h4>\r
            <span class="badge" id="rpcCameraStatusBadge" style="background: #F1F5F9; color: #475569; font-size: 0.72rem; font-weight: 700;">\r
              Standby\r
            </span>\r
          </div>\r
\r
          <!-- Video Camera Viewport -->\r
          <div id="rpcCameraContainer" style="position: relative; width: 100%; min-height: 270px; background: #0F172A; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; border: 2px dashed #CBD5E1;">\r
            <video id="rpcVideoElem" playsinline style="width: 100%; height: 100%; object-fit: cover; display: none;"></video>\r
            <canvas id="rpcCanvasElem" style="display: none;"></canvas>\r
\r
            <!-- Crosshair Overlay Scan Guide -->\r
            <div id="rpcScanCrosshair" style="display: none; position: absolute; width: 180px; height: 180px; border: 3px solid #22C55E; border-radius: 16px; box-shadow: 0 0 0 9999px rgba(0,0,0,0.5); pointer-events: none; z-index: 10;">\r
              <div style="position: absolute; top: -28px; width: 100%; text-align: center; color: #22C55E; font-size: 0.72rem; font-weight: 700; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">\r
                ARAHKAN KE QR CODE\r
              </div>\r
            </div>\r
\r
            <!-- Placeholder saat kamera belum dinyalakan -->\r
            <div id="rpcCameraPlaceholder" style="text-align: center; padding: 24px; color: #94A3B8;">\r
              <i class="fa-solid fa-qrcode" style="font-size: 3.5rem; margin-bottom: 12px; color: #64748B; display: block;"></i>\r
              <strong style="color: #F8FAFC; display: block; font-size: 0.95rem; margin-bottom: 4px;">Kamera Siap Digunakan</strong>\r
              <span style="font-size: 0.78rem; color: #94A3B8;">Pilih salah satu mode di bawah: Live Video Scanner atau Foto Kamera HP.</span>\r
            </div>\r
          </div>\r
\r
          <!-- Native Mobile Camera Input: Direct Camera Access on any Smartphone -->\r
          <input type="file" id="rpcNativeCameraInput" accept="image/*" capture="environment" style="display: none;">\r
\r
          <!-- Camera Buttons -->\r
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">\r
            <button type="button" class="btn btn-primary btn-glow" id="btnStartRpcCamera" style="flex: 1; min-width: 150px; display: flex; align-items: center; justify-content: center; gap: 8px;">\r
              <i class="fa-solid fa-video"></i> Aktifkan Live Scanner\r
            </button>\r
            <button type="button" class="btn btn-secondary" id="btnTriggerNativeCamera" style="flex: 1; min-width: 150px; display: flex; align-items: center; justify-content: center; gap: 8px;">\r
              <i class="fa-solid fa-camera"></i> Foto E-Tiket (Kamera HP)\r
            </button>\r
            <button type="button" class="btn btn-outline btn-sm" id="btnStopRpcCamera" style="display: none; color: #EF4444; border-color: #FECACA;">\r
              <i class="fa-solid fa-video-slash"></i> Matikan Kamera\r
            </button>\r
          </div>\r
        </div>\r
\r
        <!-- Manual Search Box -->\r
        <div class="glass-card" style="padding: 20px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">\r
          <h4 style="margin: 0 0 10px 0; font-size: 0.95rem; color: #0F172A; display: flex; align-items: center; gap: 8px;">\r
            <i class="fa-solid fa-keyboard" style="color: #64748B;"></i>\r
            Pencarian Manual (Jika QR Tidak Terbaca)\r
          </h4>\r
          <p style="font-size: 0.78rem; color: #64748B; margin: 0 0 14px 0;">\r
            Masukkan Nomor BIB, Order ID, Invoice, NIK 16 digit, atau Nama lengkap pelari:\r
          </p>\r
\r
          <form id="formRpcManualSearch" style="display: flex; gap: 8px; flex-wrap: wrap;">\r
            <input type="text" class="form-input" id="rpcSearchInput" placeholder="Contoh: 05-0012, ORDER-..., atau NIK" style="flex: 1; min-width: 180px; font-weight: 700;">\r
            <button type="submit" class="btn btn-secondary" id="btnRpcSearchSubmit">\r
              <i class="fa-solid fa-magnifying-glass"></i> Cari\r
            </button>\r
          </form>\r
        </div>\r
      </div>\r
\r
      <!-- RIGHT COLUMN: VERIFICATION DETAILS & RACEPACK CHECKLIST -->\r
      <div>\r
        <div class="glass-card" id="rpcVerificationContainer" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); min-height: 480px;">\r
          \r
          <!-- State 1: Belum Ada Data yang Di-scan -->\r
          <div id="rpcEmptyState" style="text-align: center; padding: 60px 20px; color: #94A3B8;">\r
            <div style="width: 80px; height: 80px; border-radius: 50%; background: #F1F5F9; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; color: #64748B; font-size: 2rem;">\r
              <i class="fa-solid fa-shirt"></i>\r
            </div>\r
            <h4 style="color: #0F172A; font-size: 1.15rem; margin: 0 0 6px 0;">Menunggu Scan E-Tiket Peserta</h4>\r
            <p style="font-size: 0.85rem; color: #64748B; max-width: 380px; margin: 0 auto 20px auto;">\r
              Arahkan kamera ke QR Code E-Tiket pelari atau ketikkan nomor BIB/Order ID pada kolom pencarian di sebelah kiri.\r
            </p>\r
            <div style="display: inline-flex; align-items: center; gap: 8px; background: #FFF7ED; border: 1px solid #FED7AA; padding: 8px 16px; border-radius: 20px; font-size: 0.78rem; color: #9A3412;">\r
              <i class="fa-solid fa-triangle-exclamation"></i> Pastikan status pembayaran telah LUNAS sebelum menyerahkan racepack.\r
            </div>\r
          </div>\r
\r
          <!-- State 2A: Tampilan QR Master (Banyak Peserta dalam 1 Order) -->\r
          <div id="rpcMasterState" style="display: none;"></div>\r
\r
          <!-- State 2: Data Terverifikasi (Tampil setelah Scan / Search) -->\r
          <div id="rpcDetailsState" style="display: none;">\r
            <!-- Status Pembayaran Banner -->\r
            <div id="rpcPaymentBanner" style="padding: 14px 18px; border-radius: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">\r
              <div style="display: flex; align-items: center; gap: 10px;">\r
                <span id="rpcPaymentIcon" style="font-size: 1.5rem;"></span>\r
                <div>\r
                  <div style="font-weight: 800; font-size: 0.95rem;" id="rpcPaymentTitle">MEMERIKSA PEMBAYARAN</div>\r
                  <div style="font-size: 0.76rem;" id="rpcPaymentSub">Status Midtrans</div>\r
                </div>\r
              </div>\r
              <span class="badge" id="rpcPaymentBadge" style="font-weight: 800; font-size: 0.76rem; padding: 6px 12px;"></span>\r
            </div>\r
\r
            <!-- Participant Identity Profile -->\r
            <div style="border-bottom: 1px solid #E2E8F0; padding-bottom: 18px; margin-bottom: 18px;">\r
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px;">\r
                <div>\r
                  <span class="badge" style="background: #EFF6FF; color: #1D4ED8; font-weight: 800; font-size: 0.74rem; margin-bottom: 6px;" id="rpcEventCategory">Kategori 10K</span>\r
                  <h3 style="font-size: 1.4rem; font-weight: 800; color: #0F172A; margin: 0 0 4px 0;" id="rpcFullName">NAMA LENGKAP</h3>\r
                  <div style="font-size: 0.8rem; color: #64748B;">\r
                    NIK: <code id="rpcNik" style="font-weight: 700; color: #334155;">3328...</code> • Gender: <strong id="rpcGender">LAKI-LAKI</strong> • Gol. Darah: <strong id="rpcBloodType">O</strong>\r
                  </div>\r
                </div>\r
                <!-- Nomor BIB Display Besar -->\r
                <div style="background: linear-gradient(135deg, #0F172A 0%, #334155 100%); color: #FFFFFF; padding: 10px 18px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(15,23,42,0.15);">\r
                  <div style="font-size: 0.68rem; color: #94A3B8; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">NOMOR BIB</div>\r
                  <div style="font-size: 1.6rem; font-weight: 900; letter-spacing: 1px; color: #38BDF8;" id="rpcBibNumber">----</div>\r
                  <div style="font-size: 0.7rem; color: #E2E8F0;" id="rpcBibName">NAMA DADA</div>\r
                </div>\r
              </div>\r
\r
              <!-- Kontak Darurat & Order ID -->\r
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.78rem; background: #F8FAFC; padding: 10px 14px; border-radius: 8px;">\r
                <div>\r
                  <span style="color: #64748B;">No. HP Peserta:</span> <strong id="rpcPhone">-</strong>\r
                </div>\r
                <div>\r
                  <span style="color: #64748B;">Kontak Darurat:</span> <strong id="rpcEmergency">-</strong>\r
                </div>\r
                <div style="grid-column: span 2;">\r
                  <span style="color: #64748B;">Order ID / Invoice:</span> <code id="rpcOrderId" style="font-size: 0.76rem;">-</code>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Jersey & Perlengkapan Checklist Box -->\r
            <div style="margin-bottom: 22px;">\r
              <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin: 0 0 12px 0; display: flex; align-items: center; justify-content: space-between;">\r
                <span><i class="fa-solid fa-list-check" style="color: var(--color-primary);"></i> Checklist Perlengkapan Racepack:</span>\r
                <span class="badge" style="background: #F1F5F9; color: #0F172A; font-size: 0.76rem;" id="rpcJerseyBadge">Size: M</span>\r
              </h4>\r
\r
              <div style="display: flex; flex-direction: column; gap: 10px;" id="rpcChecklistGroup">\r
                <!-- Checklist 1: BIB -->\r
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">\r
                  <input type="checkbox" id="chkItemBib" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">\r
                  <div>\r
                    <strong style="font-size: 0.88rem; color: #0F172A;">Nomor Dada Lomba (BIB)</strong>\r
                    <div style="font-size: 0.74rem; color: #64748B;">Sesuai nomor yang tertera di layar (<span id="chkBibText">--</span>)</div>\r
                  </div>\r
                </label>\r
\r
                <!-- Checklist 2: Jersey -->\r
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">\r
                  <input type="checkbox" id="chkItemJersey" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">\r
                  <div>\r
                    <strong style="font-size: 0.88rem; color: #0F172A;">Jersey Resmi Tegal Run 2027</strong>\r
                    <div style="font-size: 0.74rem; color: #64748B;">Ukuran: <strong id="chkJerseySizeText" style="color: var(--color-primary);">M</strong> • Tipe: <span id="chkJerseyTypeText">Dry-Fit Official</span></div>\r
                  </div>\r
                </label>\r
\r
                <!-- Checklist 3: Timing Chip -->\r
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">\r
                  <input type="checkbox" id="chkItemChip" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">\r
                  <div>\r
                    <strong style="font-size: 0.88rem; color: #0F172A;">Timing Chip PASI</strong>\r
                    <div style="font-size: 0.74rem; color: #64748B;">Chip pencatat waktu di balik BIB untuk validasi finish</div>\r
                  </div>\r
                </label>\r
\r
                <!-- Checklist 4: Goodie Bag & Panduan -->\r
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">\r
                  <input type="checkbox" id="chkItemBag" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">\r
                  <div>\r
                    <strong style="font-size: 0.88rem; color: #0F172A;">Drawstring Bag &amp; Race Guide</strong>\r
                    <div style="font-size: 0.74rem; color: #64748B;">Tas serut lomba, nomor penitipan bag drop, buku panduan race</div>\r
                  </div>\r
                </label>\r
\r
                <!-- Checklist 5: Suplemen & Refreshment -->\r
                <label style="display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 12px 14px; border-radius: 8px; border: 1px solid #E2E8F0; cursor: pointer;">\r
                  <input type="checkbox" id="chkItemRefreshment" checked style="width: 18px; height: 18px; accent-color: var(--color-primary);">\r
                  <div>\r
                    <strong style="font-size: 0.88rem; color: #0F172A;">Suplemen &amp; Produk Sponsor</strong>\r
                    <div style="font-size: 0.74rem; color: #64748B;">Minuman isotonik, gel energi, dan voucher mitra lomba</div>\r
                  </div>\r
                </label>\r
              </div>\r
            </div>\r
\r
            <!-- Existing Checkin Status (Jika Sudah Check-in) -->\r
            <div id="rpcAlreadyCheckedInBox" style="display: none; padding: 14px 18px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; margin-bottom: 18px;">\r
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">\r
                <div>\r
                  <div style="font-weight: 800; font-size: 0.92rem; color: #166534; display: flex; align-items: center; gap: 6px;">\r
                    <i class="fa-solid fa-circle-check"></i> RACEPACK SUDAH DISERAHKAN\r
                  </div>\r
                  <div style="font-size: 0.76rem; color: #15803D; margin-top: 2px;" id="rpcCheckinTimestampText">\r
                    Diserahkan pada: -\r
                  </div>\r
                </div>\r
                <button type="button" class="btn btn-outline btn-sm" id="btnRevertRpcCheckin" style="color: #DC2626; border-color: #FECACA; font-size: 0.74rem;">\r
                  <i class="fa-solid fa-rotate-left"></i> Batalkan Check-in (Revert)\r
                </button>\r
              </div>\r
            </div>\r
\r
            <!-- Action Confirm Button -->\r
            <div id="rpcActionBtnWrapper">\r
              <button type="button" class="btn btn-primary btn-glow" id="btnConfirmRpcCheckin" style="width: 100%; font-size: 1.05rem; padding: 14px 20px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px;">\r
                <i class="fa-solid fa-box-check" style="font-size: 1.25rem;"></i>\r
                Konfirmasi &amp; Serahkan Racepack Sekarang\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
`,Ha=`<div class="admin-tab-pane" id="pane-racepack-view">\r
  <div class="admin-section">\r
    <div class="admin-section-header" style="align-items:center; gap:12px; flex-wrap:wrap;">\r
      <div>\r
        <h3><i class="fa-solid fa-list-check" style="color:var(--color-primary);"></i> Antrean Pengambilan Racepack</h3>\r
        <p>Data peserta masuk setelah petugas mengirimkannya dari halaman verifikasi. Konfirmasi serah terima dilakukan di sini.</p>\r
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
`,_a=`<div class="admin-tab-pane" id="pane-orders">\r
          <div class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-receipt" style="color: var(--color-primary);"></i> Transaksi & Pesanan Tiket</h3>\r
                <p>Verifikasi status pembayaran (Midtrans Payment Gateway) dan manajemen order manual.</p>\r
              </div>\r
              <div class="admin-action-bar">\r
                <select class="form-input form-input-sm" id="filterOrderStatus" style="width: 170px;">\r
                  <option value="">Semua Status</option>\r
                  <option value="SETTLEMENT">SETTLEMENT (Lunas)</option>\r
                  <option value="PENDING">PENDING</option>\r
                  <option value="CANCEL">CANCEL (Batal)</option>\r
                  <option value="EXPIRE">EXPIRE (expired time)</option>\r
                  <option value="REFUND">REFUND</option>\r
                </select>\r
                <input type="text" class="form-input form-input-sm" id="searchOrder" placeholder="Cari Order ID / Nama..." style="width: 200px;">\r
                <button class="btn btn-secondary btn-sm" id="btnRefreshOrders">\r
                  <i class="fa-solid fa-rotate"></i> Segarkan\r
                </button>\r
              </div>\r
            </div>\r
\r
            <div class="table-responsive">\r
              <table class="admin-table">\r
                <thead>\r
                  <tr>\r
                    <th>No</th>\r
                    <th>Order ID / Invoice</th>\r
                    <th>Tipe Pendaftaran</th>\r
                    <th>Pemesan</th>\r
                    <th>Email & Telepon</th>\r
                    <th>Jumlah Peserta</th>\r
                    <th>Total Nominal</th>\r
                    <th>Status Pembayaran</th>\r
                    <th>Tanggal Transaksi</th>\r
                    <th>Aksi</th>\r
                  </tr>\r
                </thead>\r
                <tbody id="adminOrdersTableBody">\r
                  <tr>\r
                    <td colspan="10" style="text-align: center; padding: 30px; color: var(--color-text-muted);">\r
                      Memuat data transaksi...\r
                    </td>\r
                  </tr>\r
                </tbody>\r
              </table>\r
            </div>\r
          </div>\r
        </div>`,Ua=`<div class="admin-tab-pane" id="pane-countdown">\r
          <div class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-stopwatch-20" style="color: var(--color-primary);"></i> Pengaturan Tanggal Event & Status Pendaftaran</h3>\r
                <p>Tersimpan langsung di database backend untuk mengontrol countdown landing page dan status penutupan.</p>\r
              </div>\r
              <span class="event-status-tag open" id="globalStatusBadge" style="font-size: 0.82rem; padding: 6px 14px;">\r
                <i class="fa-solid fa-signal"></i> Pendaftaran Aktif\r
              </span>\r
            </div>\r
\r
            <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: flex-end;">\r
              <div class="form-group" style="margin-bottom: 0;">\r
                <label class="form-label" style="font-size: 0.9rem;">\r
                  <i class="fa-solid fa-calendar-days" style="color: var(--color-primary);"></i> Tanggal & Waktu Race Day (Target Hitung Mundur)\r
                </label>\r
                <input type="datetime-local" class="form-input" id="globalCountdownInput" style="font-size: 1rem; padding: 12px 16px; font-weight: 700;">\r
                <div class="form-hint">Contoh: 28 Februari 2027 pukul 06:00 WIB (Waktu Indonesia Barat).</div>\r
              </div>\r
\r
              <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">\r
                <button type="button" class="btn btn-secondary btn-sm" id="btnResetGlobalCountdown" data-permission="events:update" title="Kosongkan tanggal agar landing page menampilkan Tanggal Belum Ditentukan">\r
                  <i class="fa-solid fa-rotate-left"></i> Belum Ditentukan / Reset\r
                </button>\r
                <button type="button" class="btn btn-outline btn-sm" id="btnToggleGlobalClosed" data-permission="events:update">\r
                  <i class="fa-solid fa-lock"></i> Tutup Seluruh Pendaftaran\r
                </button>\r
                <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnSaveGlobalCountdown" data-permission="events:update">\r
                  <i class="fa-solid fa-floppy-disk"></i> Simpan Tanggal Countdown\r
                </button>\r
              </div>\r
            </div>\r
\r
            <!-- Preview Status Live Countdown -->\r
            <div style="margin-top: 24px; padding: 20px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px;">\r
              <div style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); font-weight: 700; margin-bottom: 8px;">\r
                <i class="fa-solid fa-eye" style="color: var(--color-primary); margin-right: 6px;"></i> Live Status Landing Page\r
              </div>\r
              <div id="adminCountdownLivePreview" style="font-size: 1.15rem; font-weight: 700; color: #fff;">\r
                Memuat status countdown...\r
              </div>\r
            </div>\r
          </div>\r
        </div>`,za=`<div class="admin-tab-pane" id="pane-bib-settings">\r
  <div class="admin-section">\r
    <div class="admin-section-header" style="flex-wrap: wrap; gap: 14px;">\r
      <div>\r
        <h3 style="display: flex; align-items: center; gap: 8px;">\r
          <i class="fa-solid fa-id-badge" style="color: #6366F1;"></i>\r
          Pengaturan Nomor BIB, Format QR &amp; Petunjuk E-Tiket\r
        </h3>\r
        <p>Tentukan kapan dan bagaimana nomor BIB digenerate, atur awalan QR Code terenkripsi (<code>BEBASNAMA|enkripsi_teks</code>), serta kelola teks petunjuk E-Tiket secara terpusat.</p>\r
      </div>\r
      <div class="admin-action-bar">\r
        <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshBibSettings">\r
          <i class="fa-solid fa-rotate"></i> Segarkan Pengaturan\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- KPI Summary Grid -->\r
    <div class="admin-kpi-grid" style="margin-bottom: 24px;">\r
      <div class="kpi-card" style="border: 1px solid #C7D2FE; background: #EEF2FF;">\r
        <div class="kpi-icon blue" style="background: #4F46E5; color: #FFFFFF;"><i class="fa-solid fa-id-card"></i></div>\r
        <div class="kpi-details">\r
          <span class="kpi-label" style="color: #3730A3; font-weight: 700;">TOTAL BIB SUDAH DITERBITKAN</span>\r
          <h3 class="kpi-val" id="kpiBibAssigned" style="color: #312E81;">0</h3>\r
          <span class="kpi-sub" style="color: #4338CA;">Peserta telah memegang nomor dada resmi</span>\r
        </div>\r
      </div>\r
\r
      <div class="kpi-card" style="border: 1px solid #FED7AA; background: #FFF7ED;">\r
        <div class="kpi-icon orange" style="background: #EA580C; color: #FFFFFF;"><i class="fa-solid fa-clock-rotate-left"></i></div>\r
        <div class="kpi-details">\r
          <span class="kpi-label" style="color: #9A3412; font-weight: 700;">BELUM MEMILIKI BIB (LUNAS)</span>\r
          <h3 class="kpi-val" id="kpiBibUnassigned" style="color: #C2410C;">0</h3>\r
          <span class="kpi-sub" style="color: #9A3412;">Menunggu generate otomatis / manual</span>\r
        </div>\r
      </div>\r
\r
      <div class="kpi-card" style="border: 1px solid #E2E8F0; background: #FFFFFF;">\r
        <div class="kpi-icon green" style="background: #10B981; color: #FFFFFF;"><i class="fa-solid fa-qrcode"></i></div>\r
        <div class="kpi-details">\r
          <span class="kpi-label">Format Aktif QR Code</span>\r
          <h3 class="kpi-val" id="kpiQrFormatPreview" style="font-size: 1.15rem; font-family: monospace; color: #0F172A;">TEGALRUN|...</h3>\r
          <span class="kpi-sub" style="color: #059669;"><i class="fa-solid fa-lock"></i> AES-256 Enkripsi Aman</span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Main Settings Layout (2 Columns) -->\r
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 24px; align-items: start;">\r
      \r
      <!-- COLUMN 1: PENGATURAN OTOMATISASI & FORMAT NOMOR BIB -->\r
      <div class="glass-card" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">\r
        <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">\r
          <i class="fa-solid fa-gears" style="color: #6366F1;"></i>\r
          Aturan Generate Nomor BIB\r
        </h4>\r
        <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 20px;">\r
          Tentukan waktu generate nomor BIB peserta dan atur pola format penomoran sesuai regulasi lomba.\r
        </p>\r
\r
        <form id="formBibGenerationSettings">\r
          <!-- Timing Selection -->\r
          <div class="form-group" style="margin-bottom: 18px;">\r
            <label class="form-label" style="font-weight: 700; color: #0F172A;">\r
              Kapan Nomor BIB Diterbitkan? <span style="color: #EF4444;">*</span>\r
            </label>\r
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 6px;">\r
              <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1px solid #E2E8F0; border-radius: 10px; cursor: pointer; transition: all 0.2s ease;">\r
                <input type="radio" name="bibTiming" value="PAYMENT_SUCCESS" checked style="margin-top: 3px;">\r
                <div>\r
                  <strong style="display: block; font-size: 0.88rem; color: #0F172A;">Otomatis Saat Pembayaran Lunas (Recommended)</strong>\r
                  <span style="font-size: 0.78rem; color: #64748B;">Nomor BIB langsung diterbitkan begitu status pesanan di Midtrans menjadi SETTLEMENT / CAPTURE.</span>\r
                </div>\r
              </label>\r
\r
              <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1px solid #E2E8F0; border-radius: 10px; cursor: pointer; transition: all 0.2s ease;">\r
                <input type="radio" name="bibTiming" value="RACEPACK_CHECKIN" style="margin-top: 3px;">\r
                <div>\r
                  <strong style="display: block; font-size: 0.88rem; color: #0F172A;">Otomatis Saat Pengambilan Racepack (RPC Check-in)</strong>\r
                  <span style="font-size: 0.78rem; color: #64748B;">Nomor BIB baru digenerate saat panitia memindai E-Tiket dan menyerahkan fisik racepack di booth.</span>\r
                </div>\r
              </label>\r
\r
              <label style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1px solid #E2E8F0; border-radius: 10px; cursor: pointer; transition: all 0.2s ease;">\r
                <input type="radio" name="bibTiming" value="MANUAL" style="margin-top: 3px;">\r
                <div>\r
                  <strong style="display: block; font-size: 0.88rem; color: #0F172A;">Manual Dari Sistem Admin Saja</strong>\r
                  <span style="font-size: 0.78rem; color: #64748B;">Sistem tidak mengenerate otomatis. Admin menetapkan via tombol "Generate Massal" atau input per peserta.</span>\r
                </div>\r
              </label>\r
            </div>\r
          </div>\r
\r
          <!-- Format Rules -->\r
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">\r
            <span style="font-size: 0.76rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">\r
              Pola Format Penomoran BIB Global:\r
            </span>\r
\r
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 12px;">\r
              <div class="form-group" style="margin-bottom: 0;">\r
                <label class="form-label" style="font-size: 0.78rem;">Prefix / Awalan</label>\r
                <input type="text" class="form-input" id="bibInputPrefix" placeholder="10-" value="10-" style="font-family: monospace;">\r
              </div>\r
              <div class="form-group" style="margin-bottom: 0;">\r
                <label class="form-label" style="font-size: 0.78rem;">Panjang Digit Angka</label>\r
                <input type="number" class="form-input" id="bibInputDigitLength" min="2" max="6" value="4">\r
              </div>\r
            </div>\r
\r
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 12px;">\r
              <div class="form-group" style="margin-bottom: 0;">\r
                <label class="form-label" style="font-size: 0.78rem;">Nomor Mulai (Start)</label>\r
                <input type="number" class="form-input" id="bibInputStartNumber" min="1" value="1001">\r
              </div>\r
              <div class="form-group" style="margin-bottom: 0;">\r
                <label class="form-label" style="font-size: 0.78rem;">Suffix / Akhiran (Opsional)</label>\r
                <input type="text" class="form-input" id="bibInputSuffix" placeholder="-2027" style="font-family: monospace;">\r
              </div>\r
            </div>\r
\r
            <!-- Live Preview -->\r
            <div style="background: #FFFFFF; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">\r
              <span style="font-size: 0.75rem; color: #64748B; font-weight: 600;">Contoh Hasil Nomor BIB:</span>\r
              <strong id="bibFormatPreviewText" style="font-family: monospace; font-size: 1.15rem; color: #FF6B00; font-weight: 800;">10-1001</strong>\r
            </div>\r
          </div>\r
\r
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">\r
            <button type="submit" class="btn btn-primary" id="btnSaveBibSettings" style="flex: 1;">\r
              <i class="fa-solid fa-floppy-disk"></i> Simpan Pengaturan BIB\r
            </button>\r
            <button type="button" class="btn btn-secondary" id="btnTriggerBulkGenerate" style="flex: 1; border-color: #C7D2FE; color: #4338CA;">\r
              <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Massal Sekarang\r
            </button>\r
          </div>\r
        </form>\r
      </div>\r
\r
      <!-- COLUMN 2: FORMAT QR CODE & TEKS PETUNJUK E-TIKET -->\r
      <div style="display: flex; flex-direction: column; gap: 24px;">\r
        \r
        <!-- CARD 2A: PENGATURAN AWALAN (PREFIX) QR CODE -->\r
        <div class="glass-card" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">\r
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">\r
            <i class="fa-solid fa-qrcode" style="color: #10B981;"></i>\r
            Pengaturan Awalan (Prefix) &amp; Enkripsi QR Code\r
          </h4>\r
          <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 16px;">\r
            Ganti awalan QR Code dengan nama bebas. Format yang dihasilkan berupa <code>BEBASNAMA|enkripsi_teks</code> yang terlindungi enkripsi kriptografi AES-256.\r
          </p>\r
\r
          <form id="formQrPrefixSettings">\r
            <div class="form-group" style="margin-bottom: 14px;">\r
              <label class="form-label" style="font-weight: 700; color: #0F172A;">\r
                Awalan (Prefix) Nama QR Code <span style="color: #EF4444;">*</span>\r
              </label>\r
              <div style="display: flex; gap: 10px;">\r
                <input type="text" class="form-input" id="qrInputPrefix" placeholder="TEGALRUN" value="TEGALRUN" required style="font-family: monospace; text-transform: uppercase; font-weight: 700;">\r
                <button type="submit" class="btn btn-primary" id="btnSaveQrPrefix">\r
                  <i class="fa-solid fa-check"></i> Simpan\r
                </button>\r
              </div>\r
              <small style="color: #64748B; font-size: 0.74rem; display: block; margin-top: 5px;">\r
                Contoh: <code>TEGALRUN</code>, <code>TR2027</code>, <code>TEGALBAHARI</code>, dll.\r
              </small>\r
            </div>\r
\r
            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 12px 14px; font-size: 0.8rem; color: #166534;">\r
              <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; margin-bottom: 4px;">\r
                <i class="fa-solid fa-shield-check"></i> Keamanan Enkripsi Kriptografi Aktif\r
              </div>\r
              <div>QR Code yang di-generate menggunakan format <code><span id="qrPrefixExample">TEGALRUN</span>|&lt;ciphertext_aes256&gt;</code> untuk menjamin keaslian tiket dari pemalsuan.</div>\r
            </div>\r
          </form>\r
        </div>\r
\r
        <!-- CARD 2B: PENGATURAN TEKS PETUNJUK PENGAMBILAN RACEPACK & RACE DAY -->\r
        <div class="glass-card" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">\r
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">\r
            <i class="fa-solid fa-list-check" style="color: var(--color-primary);"></i>\r
            Petunjuk Pengambilan Racepack &amp; Race Day\r
          </h4>\r
          <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 16px;">\r
            Sesuaikan teks petunjuk yang tampil pada bagian bawah E-Tiket peserta. Masukkan 1 poin per baris.\r
          </p>\r
\r
          <form id="formRacepackInstructions">\r
            <div class="form-group" style="margin-bottom: 12px;">\r
              <label class="form-label" style="font-weight: 700; color: #0F172A;">Judul Petunjuk</label>\r
              <input type="text" class="form-input" id="rpcInstructionsTitle" value="Petunjuk Pengambilan Racepack &amp; Race Day:">\r
            </div>\r
\r
            <div class="form-group" style="margin-bottom: 16px;">\r
              <label class="form-label" style="font-weight: 700; color: #0F172A;">Poin-Poin Petunjuk (1 baris per poin)</label>\r
              <textarea class="form-input" id="rpcInstructionsTextarea" rows="5" style="resize: vertical; font-size: 0.85rem; line-height: 1.6;"></textarea>\r
            </div>\r
\r
            <button type="submit" class="btn btn-primary" id="btnSaveRpcInstructions" style="width: 100%;">\r
              <i class="fa-solid fa-floppy-disk"></i> Simpan Petunjuk E-Tiket\r
            </button>\r
          </form>\r
        </div>\r
\r
        <!-- CARD 2C: PENGATURAN BIAYA LAYANAN & TIMER PEMBAYARAN -->\r
        <div class="glass-card" style="padding: 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.03); margin-top: 24px;">\r
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">\r
            <i class="fa-solid fa-stopwatch-20" style="color: #EA580C;"></i>\r
            Batas Waktu Pembayaran &amp; Biaya Layanan\r
          </h4>\r
          <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 16px;">\r
            Atur countdown timer pembayaran untuk Midtrans serta konfigurasikan biaya layanan transaksi.\r
          </p>\r
\r
          <form id="formPaymentFeeSettings">\r
            <div class="form-group" style="margin-bottom: 14px;">\r
              <label class="form-label" style="font-weight: 700; color: #0F172A;">\r
                Batas Waktu Pembayaran (Menit) <span style="color: #EF4444;">*</span>\r
              </label>\r
              <input type="number" min="5" max="1440" class="form-input" id="settingPaymentTimerMinutes" value="30" required>\r
              <small style="color: #64748B; font-size: 0.74rem; display: block; margin-top: 4px;">\r
                Waktu yang diberikan kepada peserta untuk menyelesaikan pembayaran Midtrans (contoh: 15, 30, atau 60 menit).\r
              </small>\r
            </div>\r
\r
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px; margin-bottom: 16px;">\r
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">\r
                <label style="font-weight: 700; font-size: 0.88rem; color: #0F172A; display: flex; align-items: center; gap: 8px; cursor: pointer;">\r
                  <input type="checkbox" id="settingFeeEnabled">\r
                  <span>Aktifkan Biaya Layanan</span>\r
                </label>\r
                <span class="badge" id="badgeFeeStatus" style="background: #E2E8F0; color: #475569;">Nonaktif</span>\r
              </div>\r
\r
              <div id="groupFeeConfig" style="display: none;">\r
                <div class="form-group" style="margin-bottom: 10px;">\r
                  <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">Metode Penerapan Biaya:</label>\r
                  <select class="form-select" id="settingFeeType">\r
                    <option value="PER_TRANSACTION">Per Transaksi (Dibebankan 1x per checkout)</option>\r
                    <option value="PER_TICKET">Per Tiket (Dikalikan dengan jumlah peserta)</option>\r
                  </select>\r
                </div>\r
\r
                <div class="form-group" style="margin-bottom: 0;">\r
                  <label class="form-label" style="font-size: 0.82rem; font-weight: 600;">Nominal Biaya Layanan (Rp):</label>\r
                  <input type="number" min="0" step="500" class="form-input" id="settingFeeAmount" placeholder="5000" value="5000">\r
                </div>\r
              </div>\r
            </div>\r
\r
            <button type="submit" class="btn btn-primary" id="btnSavePaymentFeeSettings" style="width: 100%;">\r
              <i class="fa-solid fa-floppy-disk"></i> Simpan Pengaturan Pembayaran\r
            </button>\r
          </form>\r
        </div>\r
\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
`,Ga=`<div class="admin-tab-pane" id="pane-cms">\r
          <form id="formCmsSettings">\r
            <!-- 1. Identitas & Hero Section -->\r
            <div class="admin-section">\r
              <div class="admin-section-header">\r
                <div>\r
                  <h3><i class="fa-solid fa-heading" style="color: var(--color-primary);"></i> Identitas Website & Banner Hero Utama</h3>\r
                  <p>Atur judul website, slogan, teks hero banner, dan gambar latar depan.</p>\r
                </div>\r
              </div>\r
\r
              <div class="form-row">\r
                <div class="form-group">\r
                  <label class="form-label">Judul Website (Title Browser Tab)</label>\r
                  <input type="text" class="form-input" id="cmsSiteTitle" placeholder="Tegal Run 2027 - Official Half Marathon">\r
                </div>\r
                <div class="form-group">\r
                  <label class="form-label">Tagline Slogan</label>\r
                  <input type="text" class="form-input" id="cmsSiteTagline" placeholder="Lari Bersama Menembus Batas di Kota Bahari">\r
                </div>\r
              </div>\r
\r
              <div class="form-row">\r
                <div class="form-group">\r
                  <label class="form-label">Teks Badge Hero (Pill)</label>\r
                  <input type="text" class="form-input" id="cmsHeroBadge" placeholder="🔥 PENDAFTARAN RESMI DIBUKA">\r
                </div>\r
                <div class="form-group">\r
                  <label class="form-label">URL Gambar Banner Hero</label>\r
                  <input type="url" class="form-input" id="cmsHeroBgImage" placeholder="https://images.unsplash.com/...">\r
                </div>\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Judul Utama Hero (H1)</label>\r
                <input type="text" class="form-input" id="cmsHeroTitle" placeholder="Tegal Run 2027: Lari Bersama Menembus Batas">\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Subjudul Hero / Deskripsi Singkat</label>\r
                <textarea class="form-input" id="cmsHeroSubtitle" rows="2" placeholder="Kompetisi lari terbesar di Kota Bahari dengan standar race profesional..."></textarea>\r
              </div>\r
              <label class="form-label"><input type="checkbox" id="cmsShowHero" checked> Tampilkan section Hero di website</label>\r
            </div>\r
\r
            <!-- 1.5. Live Event Stats Grid (Bebas Tambah & Bisa Otomatis dari Data) -->\r
            <div class="admin-section">\r
              <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">\r
                <div>\r
                  <h3><i class="fa-solid fa-chart-line" style="color: var(--color-primary);"></i> Live Event Stats Grid (Banner Statistik Hero)</h3>\r
                  <p>Bebas menambahkan, mengubah, atau menghapus kartu statistik. Bisa menggunakan data otomatis real-time dari database atau angka kustom manual.</p>\r
                </div>\r
                <button type="button" class="btn btn-secondary btn-sm" id="btnAddCmsStatItem">\r
                  <i class="fa-solid fa-plus"></i> Tambah Kartu Statistik\r
                </button>\r
              </div>\r
\r
              <!-- Dynamic Repeater Container -->\r
              <div id="cmsStatsItemsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">\r
                <!-- Di-render oleh cms.js -->\r
              </div>\r
              <label class="form-label" style="margin-top: 14px;"><input type="checkbox" id="cmsShowStats" checked> Tampilkan banner statistik</label>\r
            </div>\r
\r
            <!-- 2. Rute Lari & Google Maps Embed -->\r
            <div class="admin-section">\r
              <div class="admin-section-header">\r
                <div>\r
                  <h3><i class="fa-solid fa-map-location-dot" style="color: var(--color-primary);"></i> Rute Lari & Link Google Maps</h3>\r
                  <p>Paste link Google Maps (URL langsung atau kode iframe embed) serta gambar rute.</p>\r
                </div>\r
              </div>\r
\r
              <div class="form-row">\r
                <div class="form-group">\r
                  <label class="form-label">Judul Section Rute</label>\r
                  <input type="text" class="form-input" id="cmsRouteTitle" placeholder="Rute Lari Resmi & Titik Kumpul">\r
                </div>\r
                <div class="form-group">\r
                  <label class="form-label">URL Gambar Peta Rute Lari</label>\r
                  <input type="url" class="form-input" id="cmsRouteMapImage" placeholder="https://images.unsplash.com/...">\r
                </div>\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Deskripsi Rute Lari</label>\r
                <textarea class="form-input" id="cmsRouteDesc" rows="2" placeholder="Jalur datar beraspal mulus melintasi landmark bersejarah..."></textarea>\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">\r
                  <i class="fa-brands fa-google" style="color: #4285F4;"></i> Link / Embed Google Maps <span class="req">*</span>\r
                </label>\r
                <textarea class="form-input" id="cmsGmapsUrl" rows="2" placeholder="Paste link Google Maps Embed atau tag <iframe src='https://www.google.com/maps/embed?...'></iframe> di sini"></textarea>\r
                <div class="form-hint">\r
                  Tips: Buka Google Maps > Bagikan (Share) > Sematkan Peta (Embed a map) > Salin HTML / URL src-nya dan paste di sini.\r
                </div>\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Link Unduh File GPX Rute Resmi</label>\r
                <input type="text" class="form-input" id="cmsRouteGpxUrl" placeholder="https://... atau /assets/rute-tegal-run.gpx">\r
              </div>\r
              <label class="form-label"><input type="checkbox" id="cmsShowRoute" checked> Tampilkan section rute</label>\r
            </div>\r
\r
            <!-- 3. Fasilitas, Kategori & Gambar Media -->\r
            <div class="admin-section">\r
              <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">\r
                <div>\r
                  <h3><i class="fa-solid fa-images" style="color: var(--color-primary);"></i> Section Fasilitas, Kategori & Media Gambar</h3>\r
                  <p>Kustomisasi teks pengantar, media preview, dan daftar fasilitas pelari (bisa tambah/hapus kartu secara bebas).</p>\r
                </div>\r
                <button type="button" class="btn btn-secondary btn-sm" id="btnAddCmsFacilityItem">\r
                  <i class="fa-solid fa-plus"></i> Tambah Kartu Fasilitas\r
                </button>\r
              </div>\r
\r
              <div class="form-row">\r
                <div class="form-group">\r
                  <label class="form-label">Judul Section Fasilitas</label>\r
                  <input type="text" class="form-input" id="cmsFacilitiesTitle" placeholder="Fasilitas & Layanan Unggulan">\r
                </div>\r
                <div class="form-group">\r
                  <label class="form-label">URL Gambar Fasilitas / Race Village</label>\r
                  <input type="url" class="form-input" id="cmsFacilitiesImage" placeholder="https://images.unsplash.com/...">\r
                </div>\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Deskripsi Section Fasilitas</label>\r
                <textarea class="form-input" id="cmsFacilitiesDesc" rows="2" placeholder="Kenyamanan dan keselamatan pelari adalah prioritas utama kami..."></textarea>\r
              </div>\r
\r
              <!-- Dynamic Facilities Repeater Container -->\r
              <div style="margin-top: 16px; margin-bottom: 24px;">\r
                <label class="form-label" style="font-weight: 700; color: var(--color-primary);">Daftar Butir Fasilitas Pelari (Dynamic Cards)</label>\r
                <div id="cmsFacilitiesItemsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">\r
                  <!-- Di-render oleh cms.js -->\r
                </div>\r
                <label class="form-label"><input type="checkbox" id="cmsShowFacilities" checked> Tampilkan section fasilitas</label>\r
              </div>\r
\r
              <div class="form-row">\r
                <div class="form-group">\r
                  <label class="form-label">Judul Section Tiket</label>\r
                  <input type="text" class="form-input" id="cmsTicketsTitle" placeholder="Pilih Tantangan Jarak Lari Anda">\r
                </div>\r
                <div class="form-group">\r
                  <label class="form-label">URL Gambar Preview Medali Finisher</label>\r
                  <input type="url" class="form-input" id="cmsMedalImage" placeholder="https://images.unsplash.com/...">\r
                </div>\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Deskripsi Section Tiket</label>\r
                <textarea class="form-input" id="cmsTicketsDesc" rows="2" placeholder="Tersedia kategori kompetitif bagi atlet dan fun run santai..."></textarea>\r
              </div>\r
              <label class="form-label"><input type="checkbox" id="cmsShowTickets" checked> Tampilkan section kategori tiket</label>\r
            </div>\r
\r
            <!-- 3.5. Perizinan & Kepatuhan Hukum (Legal) -->\r
            <div class="admin-section">\r
              <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">\r
                <div>\r
                  <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary);"></i> Section Perizinan & Kepatuhan Hukum</h3>\r
                  <p>Pengaturan teks legalitas dan daftar poin kepatuhan hukum resmi (bisa tambah/hapus kartu secara bebas).</p>\r
                </div>\r
                <button type="button" class="btn btn-secondary btn-sm" id="btnAddCmsLegalItem">\r
                  <i class="fa-solid fa-plus"></i> Tambah Poin Legalitas\r
                </button>\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Judul Utama Legalitas</label>\r
                <input type="text" class="form-input" id="cmsLegalTitle" placeholder="Perizinan & Kepatuhan Hukum Resmi">\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Deskripsi Legalitas</label>\r
                <textarea class="form-input" id="cmsLegalDesc" rows="2" placeholder="Tegal Run 2027 diselenggarakan dengan izin resmi pemerintah daerah..."></textarea>\r
              </div>\r
\r
              <!-- Dynamic Legal Repeater Container -->\r
              <div style="margin-top: 16px;">\r
                <label class="form-label" style="font-weight: 700; color: var(--color-primary);">Daftar Poin Kepatuhan Hukum (Dynamic Cards)</label>\r
                <div id="cmsLegalItemsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">\r
                  <!-- Di-render oleh cms.js -->\r
                </div>\r
                <label class="form-label" style="margin-top: 14px;"><input type="checkbox" id="cmsShowLegal" checked> Tampilkan section perizinan &amp; kepatuhan</label>\r
              </div>\r
            </div>\r
\r
            <!-- 4. Kontak & Footer -->\r
            <div class="admin-section">\r
              <div class="admin-section-header">\r
                <div>\r
                  <h3><i class="fa-solid fa-address-book" style="color: var(--color-primary);"></i> Informasi Kontak & Footer Website</h3>\r
                  <p>Alamat sekretariat, kontak panitia, dan hak cipta footer.</p>\r
                </div>\r
              </div>\r
\r
              <div class="form-row">\r
                <div class="form-group">\r
                  <label class="form-label">Email Resmi Panitia</label>\r
                  <input type="email" class="form-input" id="cmsContactEmail" placeholder="kontak@tegalrun.id">\r
                </div>\r
                <div class="form-group">\r
                  <label class="form-label">WhatsApp / Telepon Panitia</label>\r
                  <input type="text" class="form-input" id="cmsContactPhone" placeholder="+62 812-3456-7890">\r
                </div>\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Alamat Sekretariat Pelaksana</label>\r
                <input type="text" class="form-input" id="cmsContactAddress" placeholder="Alun-Alun Kota Tegal, Jawa Tengah">\r
              </div>\r
\r
              <div class="form-group">\r
                <label class="form-label">Teks Hak Cipta Footer</label>\r
                <input type="text" class="form-input" id="cmsFooterCopyright" placeholder="Hak Cipta Terpelihara © 2027 Panitia Resmi Tegal Run.">\r
              </div>\r
              <label class="form-label"><input type="checkbox" id="cmsShowFooter" checked> Tampilkan footer website</label>\r
\r
              <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border-subtle);">\r
                <a href="/" target="_blank" class="btn btn-secondary btn-sm">\r
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Lihat Website\r
                </a>\r
                <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveCmsSubmit">\r
                  <i class="fa-solid fa-floppy-disk"></i> Simpan Seluruh Konten Website\r
                </button>\r
              </div>\r
            </div>\r
          </form>\r
        </div>`,Wa=`<div class="admin-tab-pane" id="pane-admins" data-role="SUPERADMIN">\r
          <!-- Sub-nav Tabs RBAC -->\r
          <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">\r
            <button type="button" class="btn btn-primary btn-sm" id="btnRbacTabUsers" onclick="switchRbacSubTab('users')">\r
              <i class="fa-solid fa-users-gear"></i> Daftar Akun Staf Admin\r
            </button>\r
            <button type="button" class="btn btn-outline btn-sm" id="btnRbacTabRoles" onclick="switchRbacSubTab('roles')">\r
              <i class="fa-solid fa-key"></i> Pengaturan Hak Akses 12 Role\r
            </button>\r
            <button type="button" class="btn btn-outline btn-sm" id="btnRbacTabMatrix" onclick="switchRbacSubTab('matrix')">\r
              <i class="fa-solid fa-table-list"></i> Direktori &amp; Arti 12 Role\r
            </button>\r
          </div>\r
\r
          <!-- SUB-SECTION 1: AKUN ADMIN -->\r
          <div id="rbacSectionUsers" class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary);"></i> Manajemen Akun Petugas Admin</h3>\r
                <p>Kelola akun login staf operasional, divisi keuangan, dan staf lapangan.</p>\r
              </div>\r
              <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateAdminModal" data-role="SUPERADMIN">\r
                <i class="fa-solid fa-user-shield"></i> Tambah Akun Admin\r
              </button>\r
            </div>\r
\r
            <div class="table-responsive">\r
              <table class="admin-table">\r
                <thead>\r
                  <tr>\r
                    <th>No</th>\r
                    <th>Nama Lengkap</th>\r
                    <th>Username</th>\r
                    <th>Email</th>\r
                    <th>Role / Peran</th>\r
                    <th>Status</th>\r
                    <th>Tanggal Dibuat</th>\r
                    <th>Aksi</th>\r
                  </tr>\r
                </thead>\r
                <tbody id="adminUsersTableBody">\r
                  <tr>\r
                    <td colspan="8" style="text-align: center; padding: 30px; color: var(--color-text-muted);">\r
                      Memuat daftar admin...\r
                    </td>\r
                  </tr>\r
                </tbody>\r
              </table>\r
            </div>\r
          </div>\r
\r
          <!-- SUB-SECTION 2: MANAJEMEN ROLE & HAK AKSES HALAMAN -->\r
          <div id="rbacSectionRoles" class="admin-section" style="display: none;">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-key" style="color: var(--color-primary);"></i> Pengaturan Hak Akses Halaman Role</h3>\r
                <p>Superadmin dapat menentukan secara fleksibel modul dan halaman apa saja yang boleh diakses oleh setiap role di database.</p>\r
              </div>\r
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">\r
                <button type="button" class="btn btn-outline btn-sm" id="btnResetDefaultRoles" style="color: #64748B; border-color: #CBD5E1;">\r
                  <i class="fa-solid fa-rotate-left"></i> Reset ke 12 Role Default\r
                </button>\r
                <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateRoleModal">\r
                  <i class="fa-solid fa-plus"></i> Tambah Role Baru\r
                </button>\r
              </div>\r
            </div>\r
\r
            <div class="table-responsive">\r
              <table class="admin-table">\r
                <thead>\r
                  <tr>\r
                    <th>No</th>\r
                    <th>Nama Role</th>\r
                    <th>Deskripsi Tanggung Jawab</th>\r
                    <th>Halaman yang Diizinkan</th>\r
                    <th>Jumlah Petugas</th>\r
                    <th>Aksi</th>\r
                  </tr>\r
                </thead>\r
                <tbody id="adminRolesTableBody">\r
                  <tr>\r
                    <td colspan="6" style="text-align: center; padding: 30px; color: var(--color-text-muted);">\r
                      Memuat daftar role...\r
                    </td>\r
                  </tr>\r
                </tbody>\r
              </table>\r
            </div>\r
          </div>\r
\r
          <!-- SUB-SECTION 3: DIREKTORI & PENJELASAN ARTI 12 ROLE -->\r
          <div id="rbacSectionMatrix" class="admin-section" style="display: none;">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-book-open-reader" style="color: var(--color-primary);"></i> Direktori &amp; Arti Tanggung Jawab 12 Role Resmi</h3>\r
                <p>Panduan lengkap fungsi operasional dan pembagian wewenang halaman admin untuk setiap divisi kepanitiaan Tegal Run 2027.</p>\r
              </div>\r
            </div>\r
\r
            <div class="table-responsive">\r
              <table class="admin-table">\r
                <thead>\r
                  <tr style="background: #F8FAFC;">\r
                    <th style="width: 170px;">Role / Peran</th>\r
                    <th style="min-width: 250px;">Tugas &amp; Tanggung Jawab Operasional</th>\r
                    <th style="min-width: 280px;">Akses Halaman yang Diberikan Superadmin</th>\r
                    <th style="min-width: 140px;">Tingkat Otoritas</th>\r
                  </tr>\r
                </thead>\r
                <tbody id="roleDirectoryTableBody">\r
                  <!-- Rendered dynamically -->\r
                </tbody>\r
              </table>\r
            </div>\r
          </div>\r
        </div>`,ja=`<div class="admin-tab-pane" id="pane-routes">\r
          <div class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-map-pin" style="color: var(--color-primary);"></i> Manajemen Rute &amp; Checkpoint</h3>\r
                <p>Kelola titik-titik checkpoint, water station, dan pos medis pada rute lari.</p>\r
              </div>\r
              <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateRouteModal" data-permission="events:update">\r
                <i class="fa-solid fa-plus"></i> Tambah Checkpoint\r
              </button>\r
            </div>\r
\r
            <div class="table-responsive">\r
              <table class="admin-table">\r
                <thead>\r
                  <tr>\r
                    <th style="width:50px;">No</th>\r
                    <th>Nama Checkpoint</th>\r
                    <th>Jarak (Km)</th>\r
                    <th>Kategori</th>\r
                    <th>Water Station</th>\r
                    <th>Pos Medis</th>\r
                    <th>Deskripsi</th>\r
                    <th style="width:120px; text-align:center;">Aksi</th>\r
                  </tr>\r
                </thead>\r
                <tbody id="routePointsTableBody">\r
                  <tr><td colspan="8" style="text-align:center;padding:30px;color:var(--color-text-muted);">Memuat data checkpoint...</td></tr>\r
                </tbody>\r
              </table>\r
            </div>\r
          </div>\r
        </div>`,qa=`<div class="admin-tab-pane" id="pane-notifications">\r
          <div class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-bell" style="color: var(--color-primary);"></i> Konfigurasi Notifikasi & Gateway E-Tiket</h3>\r
                <p>Pengaturan pengiriman otomatis/manual bukti E-Tiket, file PDF, ucapan terima kasih, dan WhatsApp Web Scan QR.</p>\r
              </div>\r
            </div>\r
\r
            <!-- WhatsApp Web QR Code Pairing Box (Native Backend Direct) -->\r
            <div class="wa-qr-box" style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-lg); padding: 24px; margin-bottom: 24px;">\r
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">\r
                <div>\r
                  <h4 style="margin: 0 0 6px 0; font-size: 1.1rem; color: #15803D; display: flex; align-items: center; gap: 8px;">\r
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.4rem; color: #22C55E;"></i> WhatsApp Dedicated Server Gateway (Native Multi-Device Engine)\r
                  </h4>\r
                  <p style="margin: 0; font-size: 0.85rem; color: #475569;">\r
                    Mesin server WhatsApp terintegrasi langsung pada backend engine tanpa perantara pihak ketiga. Pindai QR Code via <strong>Perangkat Tertaut (Linked Devices)</strong> pada aplikasi WhatsApp resmi di ponsel Anda.\r
                  </p>\r
                </div>\r
                <div id="waSessionStatusBadge">\r
                  <span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">\r
                    <i class="fa-solid fa-circle-xmark"></i> Terputus (Belum Scan QR)\r
                  </span>\r
                </div>\r
              </div>\r
\r
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: center; flex-wrap: wrap;" id="waQrGrid">\r
                <!-- QR Code Box -->\r
                <div style="background: #FFFFFF; padding: 16px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 230px; min-height: 230px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #DCFCE7; text-align: center;">\r
                  <div id="waQrImageContainer">\r
                    <div style="color: #64748B; padding: 30px 10px; font-size: 0.85rem;">\r
                      <i class="fa-solid fa-qrcode" style="font-size: 3rem; margin-bottom: 10px; color: #94A3B8; display: block;"></i>\r
                      Klik tombol <strong>"Generate QR Code"</strong> di samping untuk memulai sesi WhatsApp Web langsung dari backend.\r
                    </div>\r
                  </div>\r
                  <small id="waQrCountdown" style="color: #64748B; font-size: 0.72rem; margin-top: 8px; display: none;">\r
                    QR Code aktif. Pindai dalam 60 detik.\r
                  </small>\r
                </div>\r
\r
                <!-- Info & Actions -->\r
                <div style="display: flex; flex-direction: column; gap: 14px;">\r
                  <div style="background: #FFFFFF; border: 1px solid #DCFCE7; border-radius: var(--radius-sm); padding: 14px 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">\r
                    <div style="font-size: 0.82rem; color: #64748B; margin-bottom: 4px;">Informasi WhatsApp Terhubung:</div>\r
                    <div style="font-size: 0.95rem; font-weight: 700; color: #0F172A;" id="waDeviceInfo">\r
                      Tidak ada nomor tertaut\r
                    </div>\r
                    <div style="font-size: 0.78rem; color: #64748B; margin-top: 2px;" id="waLastSyncInfo">\r
                      Status: Belum Terkoneksi\r
                    </div>\r
                  </div>\r
\r
                  <div style="display: flex; gap: 10px; flex-wrap: wrap;">\r
                    <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnGenerateWaQr">\r
                      <i class="fa-solid fa-qrcode"></i> Generate QR Code WhatsApp Web\r
                    </button>\r
                    <button type="button" class="btn btn-outline btn-sm" id="btnDisconnectWa" style="display: none; border-color: #EF4444; color: #EF4444;">\r
                      <i class="fa-solid fa-arrow-right-from-bracket"></i> Putuskan Sesi (Logout)\r
                    </button>\r
                  </div>\r
\r
                  <div style="font-size: 0.8rem; color: #475569; line-height: 1.5; background: #FFFFFF; padding: 10px 14px; border-radius: 8px; border: 1px solid #E2E8F0;">\r
                    <i class="fa-solid fa-circle-check" style="color: #22C55E;"></i> <strong>Koneksi Langsung:</strong>\r
                    Buka WhatsApp di ponsel &gt; Menu Titik Tiga / Pengaturan &gt; <em>Perangkat Tertaut (Linked Devices)</em> &gt; <em>Tautkan Perangkat</em> &gt; Pindai QR Code di layar.\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <form id="formNotificationSettings">\r
              <!-- Dispatch Mode & Channel Selection -->\r
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 24px;">\r
                <!-- Mode Pengiriman: Otomatis vs Manual -->\r
                <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">\r
                  <h4 style="margin-bottom: 12px; font-size: 0.95rem; color: #D97706; display: flex; align-items: center; gap: 8px;">\r
                    <i class="fa-solid fa-paper-plane"></i> Mode Pengiriman Notifikasi\r
                  </h4>\r
                  <div class="form-group" style="margin-bottom: 8px;">\r
                    <label class="form-label">Pilih Mode Eksekusi Pengiriman:</label>\r
                    <select class="form-input" id="notifSettingDispatchMode">\r
                      <option value="AUTO">Otomatis (Instant Auto Dispatch setelah pendaftaran / pembayaran)</option>\r
                      <option value="MANUAL">Manual (Admin kirim secara manual via Halaman Log Notifikasi)</option>\r
                    </select>\r
                    <small style="color: var(--color-text-muted); font-size: 0.76rem; display: block; margin-top: 6px;">\r
                      Jika memilih <strong>Manual</strong>, pesan akan disimpan ke antrean dan admin dapat meninjau serta menekan tombol "Kirim Sekarang" di tab <em>Log Notifikasi &amp; Peserta</em>.\r
                    </small>\r
                  </div>\r
                </div>\r
\r
                <!-- Saluran Pengiriman Aktif -->\r
                <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm);">\r
                  <h4 style="margin-bottom: 12px; font-size: 0.95rem; color: var(--color-text-title); display: flex; align-items: center; gap: 8px;">\r
                    <i class="fa-solid fa-sliders"></i> Saluran Pengiriman Aktif\r
                  </h4>\r
                  <div class="form-group" style="margin-bottom: 8px;">\r
                    <label class="form-label">Kirim Notifikasi Melalui:</label>\r
                    <select class="form-input" id="notifSettingChannel">\r
                      <option value="WA">Hanya WhatsApp (Backend Direct)</option>\r
                      <option value="EMAIL">Hanya Email (SMTP App Password)</option>\r
                      <option value="BOTH">WhatsApp &amp; Email Sekaligus</option>\r
                      <option value="DISABLED">Nonaktifkan Semua Notifikasi</option>\r
                    </select>\r
                    <small style="color: var(--color-text-muted); font-size: 0.76rem; display: block; margin-top: 6px;">\r
                      Pilih media pengiriman yang akan menerima bukti tiket digital PDF dan pemberitahuan transaksi.\r
                    </small>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <!-- Email SMTP Settings -->\r
              <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">\r
                <h4 style="margin-bottom: 16px; font-size: 0.95rem; color: #0284C7; display: flex; align-items: center; gap: 8px;">\r
                  <i class="fa-solid fa-envelope" style="font-size: 1.1rem;"></i> Email SMTP (Gmail / Custom Server)\r
                </h4>\r
                <div class="form-row">\r
                  <div class="form-group">\r
                    <label class="form-label">SMTP Host</label>\r
                    <input type="text" class="form-input" id="notifSettingSmtpHost" placeholder="smtp.gmail.com">\r
                  </div>\r
                  <div class="form-group" style="max-width: 120px;">\r
                    <label class="form-label">Port</label>\r
                    <input type="number" class="form-input" id="notifSettingSmtpPort" placeholder="587">\r
                  </div>\r
                </div>\r
                <div class="form-row">\r
                  <div class="form-group">\r
                    <label class="form-label">SMTP Email / Akun</label>\r
                    <input type="email" class="form-input" id="notifSettingSmtpUser" placeholder="panitia@tegalrun.id">\r
                  </div>\r
                  <div class="form-group">\r
                    <label class="form-label">Password Aplikasi (App Password)</label>\r
                    <input type="password" class="form-input" id="notifSettingSmtpPass" placeholder="App password 16 digit">\r
                  </div>\r
                  <div class="form-group">\r
                    <label class="form-label">Nama Pengirim (From Name)</label>\r
                    <input type="text" class="form-input" id="notifSettingEmailFromName" placeholder="Panitia Tegal Run 2027">\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <!-- Message Templates -->\r
              <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">\r
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 16px;">\r
                  <h4 style="font-size: 1rem; color: var(--color-text-title);"><i class="fa-solid fa-comment-dots"></i> Template Pesan Otomatis (Status, Berkas PDF &amp; Ucapan)</h4>\r
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">\r
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{fullName}</span>\r
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{ticketName}</span>\r
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{bibNumber}</span>\r
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{orderId}</span>\r
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{totalAmount}</span>\r
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{eTicketUrl}</span>\r
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{pdfUrl}</span>\r
                    <span style="font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; background: #F1F5F9; color: #475569; font-weight: 600; font-family: monospace; border: 1px solid #E2E8F0;">{paymentUrl}</span>\r
                  </div>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label class="form-label"><i class="fa-solid fa-circle-check" style="color: #10B981;"></i> Template: Pembayaran Berhasil (E-Tiket Terbit, Berkas PDF &amp; Ucapan Terima Kasih)</label>\r
                  <textarea class="form-input" id="notifSettingTemplatePaid" rows="6" placeholder="Halo {fullName}! Pembayaran tiket {ticketName} ({orderId}) sebesar {totalAmount} telah BERHASIL diverifikasi! Nomor BIB Anda: {bibNumber}. Unduh E-Tiket di: {eTicketUrl}"></textarea>\r
                  <small style="color: var(--color-text-muted); font-size: 0.75rem;">Mencakup status lunas, nomor BIB resmi, tautan cetak file tiket digital PDF, serta ucapan terima kasih panitia.</small>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label class="form-label"><i class="fa-solid fa-clock" style="color: #F59E0B;"></i> Template: Menunggu Pembayaran (Pending Order)</label>\r
                  <textarea class="form-input" id="notifSettingTemplatePending" rows="4" placeholder="Halo {fullName}! Pendaftaran tiket {ticketName} ({orderId}) sedang menunggu pembayaran. Selesaikan di: {paymentUrl}"></textarea>\r
                </div>\r
\r
                <div class="form-group">\r
                  <label class="form-label"><i class="fa-solid fa-ban" style="color: #EF4444;"></i> Template: Pesanan Dibatalkan (Cancel)</label>\r
                  <textarea class="form-input" id="notifSettingTemplateCancel" rows="3" placeholder="Halo {fullName}, pesanan tiket {ticketName} ({orderId}) telah dibatalkan. Kuota telah dilepaskan kembali."></textarea>\r
                </div>\r
              </div>\r
\r
              <!-- Action Bar -->\r
              <div style="display: flex; gap: 12px; align-items: center; justify-content: flex-end; margin-bottom: 30px;">\r
                <button type="submit" class="btn btn-primary btn-glow" id="btnSaveNotifSettings">\r
                  <i class="fa-solid fa-floppy-disk"></i> Simpan Seluruh Konfigurasi Notifikasi\r
                </button>\r
              </div>\r
            </form>\r
\r
            <!-- Test Notification Dispatch Box -->\r
            <div style="background: #EFF6FF; border: 1px dashed #93C5FD; border-radius: var(--radius-md); padding: 20px;">\r
              <h4 style="margin-bottom: 8px; font-size: 0.95rem; color: #1D4ED8;"><i class="fa-solid fa-paper-plane"></i> Uji Coba Pengiriman Pesan Langsung</h4>\r
              <p style="font-size: 0.8rem; color: #475569; margin-bottom: 16px;">Kirim pesan pengujian untuk memastikan WhatsApp Web langsung dari backend dan kredensial SMTP Email berfungsi dengan benar.</p>\r
              \r
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">\r
                <div class="form-group" style="min-width: 140px; margin-bottom: 0;">\r
                  <label class="form-label">Tipe Saluran</label>\r
                  <select class="form-input" id="testNotifChannel">\r
                    <option value="WA">WhatsApp</option>\r
                    <option value="EMAIL">Email</option>\r
                  </select>\r
                </div>\r
                <div class="form-group" style="flex: 1; min-width: 200px; margin-bottom: 0;">\r
                  <label class="form-label">Tujuan (No WA / Email)</label>\r
                  <input type="text" class="form-input" id="testNotifTarget" placeholder="Contoh: 08123456789 atau user@mail.com">\r
                </div>\r
                <div class="form-group" style="flex: 1.5; min-width: 250px; margin-bottom: 0;">\r
                  <label class="form-label">Pesan Uji Coba</label>\r
                  <input type="text" class="form-input" id="testNotifMessage" value="Ini adalah pesan tes notifikasi otomatis dari sistem Tegal Run 2027.">\r
                </div>\r
                <button type="button" class="btn btn-secondary" id="btnSendTestNotif">\r
                  <i class="fa-solid fa-vial"></i> Kirim Tes\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>`,Ja=`<div class="admin-tab-pane" id="pane-notif-logs">\r
          <div class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-paper-plane" style="color: var(--color-primary);"></i> Log Pengiriman Notifikasi &amp; Status Peserta</h3>\r
                <p>Pantau data peserta yang sudah menerima e-tiket / notifikasi WhatsApp &amp; Email, serta kirim manual secara instan.</p>\r
              </div>\r
              <div class="admin-action-bar">\r
                <button class="btn btn-secondary btn-sm" id="btnRefreshNotifLogs">\r
                  <i class="fa-solid fa-rotate"></i> Segarkan Data\r
                </button>\r
                <button class="btn btn-primary btn-sm btn-glow" id="btnBatchSendNotif">\r
                  <i class="fa-solid fa-envelopes-bulk"></i> Kirim Semua yang Belum Terkirim\r
                </button>\r
              </div>\r
            </div>\r
\r
            <!-- KPI Summary Cards -->\r
            <div class="admin-kpi-grid" style="margin-bottom: 24px;">\r
              <div class="kpi-card">\r
                <div class="kpi-icon blue"><i class="fa-solid fa-receipt"></i></div>\r
                <div class="kpi-details">\r
                  <span class="kpi-label">Total Pesanan / Pendaftar</span>\r
                  <h3 class="kpi-val" id="kpiNotifTotalOrders">0</h3>\r
                  <span class="kpi-sub">Seluruh transaksi terdata</span>\r
                </div>\r
              </div>\r
\r
              <div class="kpi-card">\r
                <div class="kpi-icon green"><i class="fa-solid fa-circle-check"></i></div>\r
                <div class="kpi-details">\r
                  <span class="kpi-label">Notifikasi Terkirim</span>\r
                  <h3 class="kpi-val" id="kpiNotifSentCount" style="color: #10B981;">0</h3>\r
                  <span class="kpi-sub">WhatsApp / Email Sukses</span>\r
                </div>\r
              </div>\r
\r
              <div class="kpi-card">\r
                <div class="kpi-icon orange"><i class="fa-solid fa-clock"></i></div>\r
                <div class="kpi-details">\r
                  <span class="kpi-label">Belum Terkirim / Pending</span>\r
                  <h3 class="kpi-val" id="kpiNotifPendingCount" style="color: #F59E0B;">0</h3>\r
                  <span class="kpi-sub">Menunggu pengiriman admin</span>\r
                </div>\r
              </div>\r
\r
              <div class="kpi-card">\r
                <div class="kpi-icon purple"><i class="fa-brands fa-whatsapp"></i></div>\r
                <div class="kpi-details">\r
                  <span class="kpi-label">Mode Pengiriman Saat Ini</span>\r
                  <h3 class="kpi-val" id="kpiNotifDispatchMode" style="font-size: 1.15rem; color: #38BDF8;">OTOMATIS</h3>\r
                  <span class="kpi-sub" id="kpiNotifSessionStatus">Sesi WA: Memeriksa...</span>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Filter & Search Bar -->\r
            <div style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; justify-content: space-between;">\r
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">\r
                <input type="text" class="form-input form-input-sm" id="searchNotifLogs" placeholder="Cari Nama, No WA, Order ID, BIB..." style="width: 260px;">\r
                <select class="form-input form-input-sm" id="filterNotifDeliveryStatus" style="width: 190px;">\r
                  <option value="">Semua Status Pengiriman</option>\r
                  <option value="SENT">Sudah Terkirim (Sent)</option>\r
                  <option value="UNSENT">Belum Terkirim / Pending</option>\r
                </select>\r
              </div>\r
              <div style="font-size: 0.82rem; color: var(--color-text-muted);">\r
                <i class="fa-solid fa-circle-info"></i> Klik <strong>"Kirim Sekarang"</strong> untuk mengirim pesan WhatsApp berisi status pembayaran &amp; file PDF tiket.\r
              </div>\r
            </div>\r
\r
            <!-- Table of Notification Logs -->\r
            <div class="table-responsive">\r
              <table class="admin-table">\r
                <thead>\r
                  <tr>\r
                    <th style="width: 45px;">No</th>\r
                    <th>Order ID / Invoice</th>\r
                    <th>Nama Peserta (KTP)</th>\r
                    <th>Kontak (WA &amp; Email)</th>\r
                    <th>Kategori &amp; BIB</th>\r
                    <th>Status Bayar</th>\r
                    <th>Status Kirim WA</th>\r
                    <th>Status Kirim Email</th>\r
                    <th>Waktu Terkirim</th>\r
                    <th style="text-align: center; width: 140px;">Aksi</th>\r
                  </tr>\r
                </thead>\r
                <tbody id="notifLogsTableBody">\r
                  <tr>\r
                    <td colspan="10" style="text-align: center; padding: 30px; color: var(--color-text-muted);">\r
                      Memuat data log notifikasi...\r
                    </td>\r
                  </tr>\r
                </tbody>\r
              </table>\r
            </div>\r
          </div>\r
        </div>`,Qa=`<div class="admin-tab-pane" id="pane-whatsapp-web">\r
          <div class="admin-section" style="padding: 0; background: transparent; border: none; box-shadow: none;">\r
            <!-- Header Ringkasan Status Gateway -->\r
            <div style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">\r
              <div>\r
                <h3 style="margin: 0 0 4px 0; font-size: 1.25rem; color: #0F172A; display: flex; align-items: center; gap: 10px;">\r
                  <i class="fa-brands fa-whatsapp" style="color: #22C55E; font-size: 1.5rem;"></i>\r
                  WhatsApp Web Enterprise Console\r
                </h3>\r
                <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-muted);">\r
                  Pantau koneksi perangkat tertaut, database nomor peserta, dan kirim pesan interaktif langsung dari admin layaknya WhatsApp Web.\r
                </p>\r
              </div>\r
              <div style="display: flex; align-items: center; gap: 12px;">\r
                <div id="waWebHeaderStatus">\r
                  <span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; padding: 6px 14px; font-weight: 700;">\r
                    <i class="fa-solid fa-circle-xmark"></i> Status: Terputus\r
                  </span>\r
                </div>\r
                <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshWaWeb">\r
                  <i class="fa-solid fa-rotate"></i> Segarkan Status\r
                </button>\r
                <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnGoToWaQr">\r
                  <i class="fa-solid fa-qrcode"></i> Scan QR Baru\r
                </button>\r
              </div>\r
            </div>\r
\r
            <!-- WhatsApp Web 2-Column Console Layout -->\r
            <div class="wa-web-layout">\r
              <!-- Left Sidebar: Profile & Contacts -->\r
              <div class="wa-web-sidebar">\r
                <div class="wa-web-profile-bar">\r
                  <div class="wa-web-profile-info">\r
                    <div class="wa-avatar" id="waWebMyAvatar">\r
                      <i class="fa-brands fa-whatsapp"></i>\r
                    </div>\r
                    <div>\r
                      <div style="font-weight: 700; font-size: 0.92rem; color: #0F172A;" id="waWebMyNumber">\r
                        Memuat nomor...\r
                      </div>\r
                      <div style="font-size: 0.72rem; color: #22C55E; font-weight: 600; display: flex; align-items: center; gap: 4px;" id="waWebMyStatusText">\r
                        <span style="width: 7px; height: 7px; background: #22C55E; border-radius: 50%; display: inline-block;"></span> Online &amp; Terhubung\r
                      </div>\r
                    </div>\r
                  </div>\r
                  <div>\r
                    <button type="button" class="btn-icon" id="btnWaWebSync" title="Sinkronisasi Sesi" style="background: none; border: none; cursor: pointer; color: #64748B; font-size: 1rem;">\r
                      <i class="fa-solid fa-arrows-rotate"></i>\r
                    </button>\r
                  </div>\r
                </div>\r
\r
                <!-- Search Contact Box -->\r
                <div class="wa-web-search-box">\r
                  <div style="position: relative;">\r
                    <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 0.85rem;"></i>\r
                    <input type="text" class="form-input form-input-sm" id="waContactSearchInput" placeholder="Cari pelari / nomor HP..." style="padding-left: 34px; border-radius: 20px; background: #FFFFFF;">\r
                  </div>\r
                </div>\r
\r
                <!-- Contact List Container -->\r
                <div class="wa-web-contact-list" id="waContactListContainer">\r
                  <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">\r
                    <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--color-primary); display: block;"></i>\r
                    Memuat daftar kontak peserta...\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <!-- Right Area: Live Chat Messenger -->\r
              <div class="wa-web-main" id="waChatMainContainer">\r
                <!-- Chat Header -->\r
                <div class="wa-chat-header" id="waChatHeaderBar">\r
                  <div style="display: flex; align-items: center; gap: 12px;">\r
                    <div class="wa-avatar" style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); width: 40px; height: 40px; font-size: 0.88rem;" id="waActiveAvatar">\r
                      TR\r
                    </div>\r
                    <div>\r
                      <div style="font-weight: 700; font-size: 0.95rem; color: #0F172A;" id="waActiveName">\r
                        Pilih Peserta untuk Chat\r
                      </div>\r
                      <div style="font-size: 0.78rem; color: #64748B; display: flex; align-items: center; gap: 8px;">\r
                        <span id="waActivePhone">-</span>\r
                        <span id="waActiveBadge"></span>\r
                      </div>\r
                    </div>\r
                  </div>\r
                  <div style="display: flex; gap: 8px;" id="waChatHeaderActions">\r
                    <button type="button" class="btn btn-secondary btn-sm" id="btnQuickSendPaidTicket" title="Kirim E-Tiket PDF Lunas">\r
                      <i class="fa-solid fa-ticket" style="color: #22C55E;"></i> Kirim Tiket\r
                    </button>\r
                    <button type="button" class="btn btn-secondary btn-sm" id="btnQuickSendPending" title="Kirim Tagihan & Link Bayar">\r
                      <i class="fa-solid fa-clock" style="color: #F59E0B;"></i> Tagihan\r
                    </button>\r
                  </div>\r
                </div>\r
\r
                <!-- Chat Messages Scroll Box -->\r
                <div class="wa-chat-scroll" id="waChatMessagesBox">\r
                  <div class="wa-system-pill">\r
                    <i class="fa-solid fa-lock"></i> Pesan terenkripsi end-to-end melalui WhatsApp Dedicated Server Gateway\r
                  </div>\r
                  <div style="text-align: center; color: #64748B; font-size: 0.85rem; margin: 40px auto; max-width: 360px; background: rgba(255,255,255,0.7); padding: 20px; border-radius: 12px;">\r
                    <i class="fa-brands fa-whatsapp" style="font-size: 3rem; color: #22C55E; margin-bottom: 12px; display: block;"></i>\r
                    <strong>Pilih kontak peserta di sebelah kiri</strong><br>\r
                    <span style="font-size: 0.8rem; color: #64748B;">Anda dapat mengirim notifikasi manual, update bukti bayar, atau chat pesan kustom langsung ke nomor WhatsApp peserta.</span>\r
                  </div>\r
                </div>\r
\r
                <!-- Chat Input Footer -->\r
                <div class="wa-chat-input-bar" id="waChatInputArea">\r
                  <div style="display: flex; gap: 10px; align-items: center;">\r
                    <select class="form-input form-input-sm" id="waQuickTemplateSelect" style="max-width: 260px; font-size: 0.8rem;">\r
                      <option value="">⚡ Pilih Template Cepat...</option>\r
                      <option value="PAID_TICKET">🎫 Konfirmasi Pembayaran &amp; E-Tiket PDF</option>\r
                      <option value="PENDING_INVOICE">⏳ Pengingat Tagihan &amp; Link Pembayaran</option>\r
                      <option value="RACEPACK_INFO">🎽 Informasi Pengambilan Race Pack</option>\r
                      <option value="THANK_YOU">🙏 Ucapan Terima Kasih Panitia Tegal Run</option>\r
                    </select>\r
                    <small style="color: #64748B; font-size: 0.76rem;">Template otomatis terisi dengan nama &amp; data peserta</small>\r
                  </div>\r
                  <div class="wa-chat-input-row">\r
                    <textarea class="form-input" id="waDirectChatInput" rows="2" placeholder="Ketik pesan WhatsApp langsung ke peserta..." style="resize: none; font-size: 0.88rem;"></textarea>\r
                    <button type="button" class="btn btn-primary btn-glow" id="btnSendWaDirectMsg" style="height: 100%; min-height: 52px; padding: 0 20px;">\r
                      <i class="fa-solid fa-paper-plane"></i> Kirim\r
                    </button>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>`,Va=`<div class="admin-tab-pane" id="pane-logs">\r
          <div class="admin-section">\r
            <div class="admin-section-header">\r
              <div>\r
                <h3><i class="fa-solid fa-clock-rotate-left" style="color: var(--color-primary);"></i> Rekam Jejak Audit & Keamanan Sistem</h3>\r
                <p>Audit trail untuk setiap perubahan konfigurasi, pendaftaran, dan mutasi data.</p>\r
              </div>\r
              <button class="btn btn-secondary btn-sm" id="btnRefreshLogs">\r
                <i class="fa-solid fa-rotate"></i> Segarkan Log\r
              </button>\r
            </div>\r
\r
            <div class="table-responsive">\r
              <table class="admin-table">\r
                <thead>\r
                  <tr>\r
                    <th>Waktu (WIB)</th>\r
                    <th>Kode Aksi</th>\r
                    <th>Deskripsi Aktivitas</th>\r
                    <th>Pelaksana / Admin</th>\r
                  </tr>\r
                </thead>\r
                <tbody id="adminAuditLogsTableBody">\r
                  <tr>\r
                    <td colspan="4" style="text-align: center; padding: 20px; color: var(--color-text-muted);">\r
                      Memuat log audit...\r
                    </td>\r
                  </tr>\r
                </tbody>\r
              </table>\r
            </div>\r
          </div>\r
        </div>`,Ya=`<!-- MODAL 1: EVENT CREATE / EDIT -->\r
  <div class="admin-modal-backdrop" id="modalEventBackdrop">\r
    <div class="admin-modal-dialog">\r
      <div class="admin-modal-header">\r
        <h4 id="modalEventTitle"><i class="fa-solid fa-calendar-plus" style="color: var(--color-primary);"></i> Form Kategori Event</h4>\r
        <button class="admin-modal-close" onclick="closeAdminModal('modalEventBackdrop')"><i class="fa-solid fa-xmark"></i></button>\r
      </div>\r
      <form id="formEvent">\r
        <input type="hidden" id="eventFormId">\r
        <div class="admin-modal-body">\r
          <div class="form-group">\r
            <label class="form-label">Nama Tiket / Kategori Event <span class="req">*</span></label>\r
            <input type="text" class="form-input" id="eventFormTicketName" placeholder="Contoh: 10K Open Marathon 2027" required>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Kategori Jarak <span class="req">*</span></label>\r
              <input type="text" class="form-input" id="eventFormCategory" placeholder="10K / 5K / 21K" required>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Total Kuota (Stok) <span class="req">*</span></label>\r
              <input type="number" class="form-input" id="eventFormStock" min="1" placeholder="500" required>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Harga Tiket (Rp) <span class="req">*</span></label>\r
              <input type="number" class="form-input" id="eventFormPrice" min="0" step="5000" placeholder="250000" required>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Tanggal Pelaksanaan</label>\r
              <input type="datetime-local" class="form-input" id="eventFormDate">\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">URL Gambar Tiket / Cover Kategori</label>\r
              <input type="url" class="form-input" id="eventFormTicketImage" placeholder="https://images.unsplash.com/...">\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">URL Gambar Medali Finisher</label>\r
              <input type="url" class="form-input" id="eventFormMedalImage" placeholder="https://images.unsplash.com/...">\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label style="display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;">\r
              <input type="checkbox" id="eventFormIsClosed">\r
              <span>Tutup pendaftaran untuk kategori ini</span>\r
            </label>\r
          </div>\r
        </div>\r
        <div class="admin-modal-footer">\r
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalEventBackdrop')">Batal</button>\r
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveEventSubmit">\r
            <i class="fa-solid fa-floppy-disk"></i> Simpan Event\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
\r
  <!-- MODAL 2: PARTICIPANT CREATE / EDIT -->\r
  <div class="admin-modal-backdrop" id="modalParticipantBackdrop">\r
    <div class="admin-modal-dialog" style="max-width: 700px;">\r
      <div class="admin-modal-header">\r
        <h4 id="modalParticipantTitle"><i class="fa-solid fa-user-plus" style="color: var(--color-primary);"></i> Form Data Peserta</h4>\r
        <button class="admin-modal-close" onclick="closeAdminModal('modalParticipantBackdrop')"><i class="fa-solid fa-xmark"></i></button>\r
      </div>\r
      <form id="formParticipant">\r
        <input type="hidden" id="partFormId">\r
        <div class="admin-modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Pilih Kategori Event <span class="req">*</span></label>\r
              <select class="form-input" id="partFormEventId" required>\r
                <!-- Populated dynamically -->\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Nama BIB Dada <span class="req">*</span></label>\r
              <input type="text" class="form-input" id="partFormBibName" maxlength="15" placeholder="Maks. 15 karakter" required>\r
            </div>\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Nama Lengkap (Sesuai KTP) <span class="req">*</span></label>\r
              <input type="text" class="form-input" id="partFormFullName" placeholder="Nama KTP" required>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Nomor Induk Kependudukan (NIK 16 Digit) <span class="req">*</span></label>\r
              <input type="text" class="form-input" id="partFormNik" maxlength="16" pattern="\\d{16}" placeholder="16 digit angka" required>\r
            </div>\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Jenis Kelamin <span class="req">*</span></label>\r
              <select class="form-input" id="partFormGender" required>\r
                <option value="MALE">Laki-Laki (MALE)</option>\r
                <option value="FEMALE">Perempuan (FEMALE)</option>\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Golongan Darah <span class="req">*</span></label>\r
              <select class="form-input" id="partFormBloodType" required>\r
                <option value="A">A</option>\r
                <option value="B">B</option>\r
                <option value="AB">AB</option>\r
                <option value="O">O</option>\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Ukuran Jersey <span class="req">*</span></label>\r
              <select class="form-input" id="partFormSize" required>\r
                <option value="S">S</option>\r
                <option value="M" selected>M</option>\r
                <option value="L">L</option>\r
                <option value="XL">XL</option>\r
                <option value="XXL">XXL</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Tempat Lahir</label>\r
              <input type="text" class="form-input" id="partFormBirthPlace" placeholder="Tegal" value="Tegal">\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Tanggal Lahir</label>\r
              <input type="date" class="form-input" id="partFormBirthDate" value="1995-05-15">\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label class="form-label">Alamat Lengkap</label>\r
            <input type="text" class="form-input" id="partFormAddress" placeholder="Jl. Pancasila No. 12" value="Jl. Pancasila No. 12, Tegal">\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Nama Kontak Darurat <span class="req">*</span></label>\r
              <input type="text" class="form-input" id="partFormEmergencyName" placeholder="Contoh: Budi Santoso" required>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">No. HP Kontak Darurat <span class="req">*</span></label>\r
              <input type="tel" class="form-input" id="partFormEmergencyPhone" placeholder="Contoh: 081234567890" required>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="admin-modal-footer">\r
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalParticipantBackdrop')">Batal</button>\r
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSavePartSubmit">\r
            <i class="fa-solid fa-floppy-disk"></i> Simpan Data Peserta\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
\r
  <!-- MODAL 3: ORDER STATUS UPDATE -->\r
  <div class="admin-modal-backdrop" id="modalOrderBackdrop">\r
    <div class="admin-modal-dialog" style="max-width: 480px;">\r
      <div class="admin-modal-header">\r
        <h4><i class="fa-solid fa-file-pen" style="color: var(--color-primary);"></i> Update Status Transaksi</h4>\r
        <button class="admin-modal-close" onclick="closeAdminModal('modalOrderBackdrop')"><i class="fa-solid fa-xmark"></i></button>\r
      </div>\r
      <form id="formOrderStatus">\r
        <input type="hidden" id="orderFormId">\r
        <div class="admin-modal-body">\r
          <div class="form-group">\r
            <label class="form-label">Order ID</label>\r
            <input type="text" class="form-input" id="orderFormDisplayId" readonly style="background: #F1F5F9; font-weight: 700;">\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Status Pembayaran Baru <span class="req">*</span></label>\r
            <select class="form-input" id="orderFormStatus" required>\r
              <option value="SETTLEMENT">SETTLEMENT (Pembayaran Berhasil / Lunas)</option>\r
              <option value="PENDING">PENDING (Menunggu Pembayaran)</option>\r
              <option value="CANCEL">CANCEL (Dibatalkan)</option>\r
              <option value="REFUND">REFUND (Pengembalian Dana)</option>\r
            </select>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Alasan / Catatan Perubahan</label>\r
            <input type="text" class="form-input" id="orderFormReason" placeholder="Contoh: Konfirmasi manual transfer bank">\r
          </div>\r
        </div>\r
        <div class="admin-modal-footer">\r
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalOrderBackdrop')">Batal</button>\r
          <button type="submit" class="btn btn-primary btn-sm btn-glow">\r
            <i class="fa-solid fa-check"></i> Perbarui Status\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
\r
  <div class="admin-modal-backdrop" id="modalOrderDetailsBackdrop">\r
    <div class="admin-modal-dialog" style="max-width: 900px; max-height: 90vh; overflow:auto;">\r
      <div class="admin-modal-header">\r
        <h4><i class="fa-solid fa-ticket" style="color:var(--color-primary);"></i> Detail Transaksi &amp; Tiket</h4>\r
        <button class="admin-modal-close" onclick="closeAdminModal('modalOrderDetailsBackdrop')"><i class="fa-solid fa-xmark"></i></button>\r
      </div>\r
      <div class="admin-modal-body" id="orderDetailsContent">\r
        <div style="text-align:center; color:#64748B; padding:24px;">Memuat detail tiket...</div>\r
      </div>\r
      <div class="admin-modal-footer">\r
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalOrderDetailsBackdrop')">Tutup</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- MODAL 4: ADMIN USER CREATE / EDIT (SUPERADMIN ONLY) -->\r
  <div class="admin-modal-backdrop" id="modalAdminUserBackdrop">\r
    <div class="admin-modal-dialog" style="max-width: 520px;">\r
      <div class="admin-modal-header">\r
        <h4 id="modalAdminUserTitle"><i class="fa-solid fa-user-shield" style="color: var(--color-primary);"></i> Form Akun Petugas Admin</h4>\r
        <button class="admin-modal-close" onclick="closeAdminModal('modalAdminUserBackdrop')"><i class="fa-solid fa-xmark"></i></button>\r
      </div>\r
      <form id="formAdminUser">\r
        <input type="hidden" id="adminUserFormId">\r
        <div class="admin-modal-body">\r
          <div class="form-group">\r
            <label class="form-label">Nama Lengkap Petugas <span class="req">*</span></label>\r
            <input type="text" class="form-input" id="adminUserFullName" placeholder="Nama Petugas" required>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Username <span class="req">*</span></label>\r
              <input type="text" class="form-input" id="adminUserUsername" placeholder="username_admin" required>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Email Petugas <span class="req">*</span></label>\r
              <input type="email" class="form-input" id="adminUserEmail" placeholder="admin@tegalrun.id" required>\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Pilih Peran / Role Akses <span class="req">*</span></label>\r
            <select class="form-input" id="adminUserRoleId" required>\r
              <!-- Populated dynamically from /admin/roles -->\r
            </select>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Kata Sandi (Password) <span class="req" id="adminPasswordReq">*</span></label>\r
            <input type="password" class="form-input" id="adminUserPassword" placeholder="Minimal 8 karakter">\r
            <div class="form-hint" id="adminPasswordHint">Wajib diisi untuk akun baru. Kosongkan jika tidak ingin mengubah password saat edit.</div>\r
          </div>\r
        </div>\r
        <div class="admin-modal-footer">\r
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalAdminUserBackdrop')">Batal</button>\r
          <button type="submit" class="btn btn-primary btn-sm btn-glow">\r
            <i class="fa-solid fa-user-check"></i> Simpan Akun Admin\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
\r
  <!-- MODAL: ROLE CREATE / EDIT PERMISSIONS (SUPERADMIN ONLY) -->\r
  <div class="admin-modal-backdrop" id="modalRoleBackdrop">\r
    <div class="admin-modal-dialog" style="max-width: 760px;">\r
      <div class="admin-modal-header">\r
        <h4 id="modalRoleTitle"><i class="fa-solid fa-key" style="color: var(--color-primary);"></i> Atur Hak Akses Halaman Role</h4>\r
        <button class="admin-modal-close" onclick="closeAdminModal('modalRoleBackdrop')"><i class="fa-solid fa-xmark"></i></button>\r
      </div>\r
      <form id="formRole">\r
        <input type="hidden" id="roleFormId">\r
        <div class="admin-modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Nama Role <span class="req">*</span></label>\r
              <input type="text" class="form-input" id="roleFormName" placeholder="CONTOH: SPONSORSHIP" required style="font-weight: 700; text-transform: uppercase;">\r
              <small class="form-hint" id="roleNameHint">Gunakan huruf kapital (A-Z) dan underscore (_).</small>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Deskripsi Singkat Tanggung Jawab</label>\r
              <input type="text" class="form-input" id="roleFormDesc" placeholder="Contoh: Mengelola promosi sponsor dan exposure website">\r
            </div>\r
          </div>\r
\r
          <div style="margin-top: 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">\r
            <div>\r
              <strong style="font-size: 0.9rem; color: #0F172A;">Pilih Halaman Admin yang Dapat Diakses:</strong>\r
              <div style="font-size: 0.76rem; color: #64748B;">Petugas hanya akan melihat menu dan memiliki hak akses sesuai halaman yang dicentang.</div>\r
            </div>\r
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">\r
              <button type="button" class="btn btn-outline btn-sm" id="btnSelectAllPages" style="padding: 2px 8px; font-size: 0.72rem;">Pilih Semua</button>\r
              <button type="button" class="btn btn-outline btn-sm" id="btnClearAllPages" style="padding: 2px 8px; font-size: 0.72rem;">Bersihkan</button>\r
              <button type="button" class="btn btn-outline btn-sm" id="btnPresetDefaultPages" style="padding: 2px 8px; font-size: 0.72rem;">Preset Standar</button>\r
            </div>\r
          </div>\r
\r
          <!-- Module Checkboxes Grid -->\r
          <div id="roleModulesContainer" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; max-height: 380px; overflow-y: auto; padding: 4px;">\r
            <!-- Populated dynamically from SYSTEM_MODULES -->\r
          </div>\r
        </div>\r
        <div class="admin-modal-footer">\r
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalRoleBackdrop')">Batal</button>\r
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveRoleSubmit">\r
            <i class="fa-solid fa-floppy-disk"></i> Simpan Hak Akses ke Database\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
\r
  <!-- MODAL: KELOLA BENEFIT & FASILITAS EVENT (CRUD LENGKAP) -->\r
  <div class="admin-modal-backdrop" id="modalEventBenefitsBackdrop">\r
    <div class="admin-modal-dialog" style="max-width: 680px;">\r
      <div class="admin-modal-header">\r
        <div>\r
          <h4 id="benefitModalHeaderTitle"><i class="fa-solid fa-gift" style="color: var(--color-primary);"></i> Kelola Benefit & Race Pack</h4>\r
          <span style="font-size: 0.8rem; color: #64748B;" id="benefitModalSubtitle">Event Kategori</span>\r
        </div>\r
        <button class="admin-modal-close" onclick="closeAdminModal('modalEventBenefitsBackdrop')"><i class="fa-solid fa-xmark"></i></button>\r
      </div>\r
\r
      <div class="admin-modal-body" style="padding-top: 16px;">\r
        <!-- Form Tambah / Edit Benefit -->\r
        <div class="glass-card" style="padding: 18px; border: 1px solid var(--border-glass-orange); background: #FFF7ED; border-radius: var(--radius-lg); margin-bottom: 20px;">\r
          <h5 style="font-size: 0.92rem; font-weight: 800; color: #0F172A; margin: 0 0 12px 0; display: flex; align-items: center; justify-content: space-between;">\r
            <span id="benefitFormTitle"><i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Fasilitas / Benefit Baru</span>\r
            <button type="button" class="btn btn-outline btn-sm" id="btnCancelBenefitEdit" style="display: none; padding: 2px 8px; font-size: 0.72rem;">Batal Edit</button>\r
          </h5>\r
\r
          <form id="formEventBenefit">\r
            <input type="hidden" id="benefitFormEventId">\r
            <input type="hidden" id="benefitFormId">\r
\r
            <div class="form-row">\r
              <div class="form-group" style="margin-bottom: 10px;">\r
                <label class="form-label">Nama Fasilitas / Benefit <span class="req">*</span></label>\r
                <input type="text" class="form-input" id="benefitFormName" placeholder="Contoh: Official Race Singlet Dry-Fit" required>\r
              </div>\r
              <div class="form-group" style="margin-bottom: 10px;">\r
                <label class="form-label">URL Gambar / Icon (Opsional)</label>\r
                <input type="url" class="form-input" id="benefitFormImage" placeholder="https://...">\r
              </div>\r
            </div>\r
\r
            <div class="form-group" style="margin-bottom: 12px;">\r
              <label class="form-label">Deskripsi Fasilitas <span class="req">*</span></label>\r
              <textarea class="form-input" id="benefitFormDesc" rows="2" placeholder="Contoh: Bahan dry-fit breathable anti-bakteri dengan sablon reflektif" required></textarea>\r
            </div>\r
\r
            <div style="display: flex; justify-content: flex-end;">\r
              <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveBenefitSubmit">\r
                <i class="fa-solid fa-check"></i> Simpan Benefit\r
              </button>\r
            </div>\r
          </form>\r
        </div>\r
\r
        <!-- Tabel Daftar Benefit yang Tersimpan di Database -->\r
        <div>\r
          <h5 style="font-size: 0.88rem; font-weight: 800; color: #0F172A; margin: 0 0 10px 0;">\r
            <i class="fa-solid fa-list-check" style="color: var(--color-primary);"></i> Daftar Benefit yang Tersimpan di Database (<span id="benefitListCount">0</span>)\r
          </h5>\r
          <div class="table-responsive" style="max-height: 280px; overflow-y: auto;">\r
            <table class="admin-table">\r
              <thead>\r
                <tr>\r
                  <th style="width: 35%;">Nama Benefit</th>\r
                  <th>Deskripsi</th>\r
                  <th style="width: 80px; text-align: center;">Aksi</th>\r
                </tr>\r
              </thead>\r
              <tbody id="eventBenefitsTableBody">\r
                <!-- Populated dynamically via JS -->\r
              </tbody>\r
            </table>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="admin-modal-footer">\r
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalEventBenefitsBackdrop')">Tutup</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- MODAL: ROUTE POINT CREATE / EDIT -->\r
  <div class="admin-modal-backdrop" id="modalRoutePointBackdrop">\r
    <div class="admin-modal-dialog" style="max-width: 640px;">\r
      <div class="admin-modal-header">\r
        <h4 id="modalRoutePointTitle"><i class="fa-solid fa-map-pin" style="color: var(--color-primary);"></i> Form Checkpoint Rute</h4>\r
        <button class="admin-modal-close" onclick="closeAdminModal('modalRoutePointBackdrop')"><i class="fa-solid fa-xmark"></i></button>\r
      </div>\r
      <form id="formRoutePoint">\r
        <input type="hidden" id="routeFormId">\r
        <div class="admin-modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Nomor Urutan <span class="req">*</span></label>\r
              <input type="number" class="form-input" id="routeFormOrderIndex" min="1" placeholder="1" required>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Jarak (Km) <span class="req">*</span></label>\r
              <input type="number" class="form-input" id="routeFormDistanceKm" step="0.1" min="0" placeholder="2.5" required>\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label class="form-label">Nama Checkpoint <span class="req">*</span></label>\r
            <input type="text" class="form-input" id="routeFormName" placeholder="Contoh: Start & Finish: Alun-Alun Kota Tegal" required>\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label class="form-label">Kategori <span class="req">*</span></label>\r
              <select class="form-input" id="routeFormCategory" required>\r
                <option value="ALL">ALL (10K &amp; 5K)</option>\r
                <option value="10K">10K Only</option>\r
                <option value="5K">5K Only</option>\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Icon (Emoji / FA class)</label>\r
              <input type="text" class="form-input" id="routeFormIcon" placeholder="🏁 atau fa-flag">\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label class="form-label">Deskripsi Checkpoint</label>\r
            <textarea class="form-input" id="routeFormDescription" rows="2" placeholder="Keterangan titik checkpoint..."></textarea>\r
          </div>\r
\r
          <div class="form-group">\r
            <label class="form-label">URL Gambar Checkpoint (Opsional)</label>\r
            <input type="url" class="form-input" id="routeFormImage" placeholder="https://images.unsplash.com/...">\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label style="display:flex;align-items:center;gap:8px;font-weight:600;cursor:pointer;">\r
                <input type="checkbox" id="routeFormIsWaterStation">\r
                <span>💧 Water Station</span>\r
              </label>\r
            </div>\r
            <div class="form-group">\r
              <label style="display:flex;align-items:center;gap:8px;font-weight:600;cursor:pointer;">\r
                <input type="checkbox" id="routeFormIsMedicalSpot">\r
                <span>🏥 Pos Medis</span>\r
              </label>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="admin-modal-footer">\r
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeAdminModal('modalRoutePointBackdrop')">Batal</button>\r
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveRouteSubmit">\r
            <i class="fa-solid fa-floppy-disk"></i> Simpan Checkpoint\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
\r
  <!-- MODAL 5: CUSTOM ACTION CONFIRMATION DIALOG -->\r
  <div class="confirm-modal-backdrop" id="confirmModalBackdrop">\r
    <div class="confirm-modal-card">\r
      <div class="confirm-modal-icon warning" id="confirmModalIcon">\r
        <i class="fa-solid fa-triangle-exclamation"></i>\r
      </div>\r
      <h4 class="confirm-modal-title" id="confirmModalTitle">Konfirmasi Tindakan</h4>\r
      <p class="confirm-modal-desc" id="confirmModalMessage">Apakah Anda yakin ingin melanjutkan tindakan ini?</p>\r
      <div class="confirm-modal-actions">\r
        <button type="button" class="btn btn-secondary btn-sm" id="btnConfirmCancel">Batal</button>\r
        <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnConfirmOk">Ya, Lanjutkan</button>\r
      </div>\r
    </div>\r
  </div>`,b={token:localStorage.getItem("tegal_admin_token")||null,profile:null,activeTab:"dashboard",globalSettings:{eventCountdownDate:null,isRegistrationClosed:!1},events:[],participants:[],orders:[],admins:[],roles:[],auditLogs:[]};function l(t="success",a="",e=""){const n=document.getElementById("adminToastContainer");if(!n)return;const i=document.createElement("div");i.className=`toast toast-${t}`,i.innerHTML=`
    <div class="toast-icon">
      <i class="${t==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${a}</h5>
      <p>${e}</p>
    </div>
  `,n.appendChild(i),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),300)},4e3)}function C({title:t="Konfirmasi Tindakan",message:a="Apakah Anda yakin ingin melanjutkan tindakan ini?",confirmText:e="Ya, Lanjutkan",cancelText:n="Batal",type:i="warning"}={}){return new Promise(r=>{const s=document.getElementById("confirmModalBackdrop"),o=document.getElementById("confirmModalTitle"),d=document.getElementById("confirmModalMessage"),g=document.getElementById("confirmModalIcon"),f=document.getElementById("btnConfirmOk"),m=document.getElementById("btnConfirmCancel");if(!s){r(window.confirm(a));return}o&&(o.textContent=t),d&&(d.textContent=a),f&&(f.textContent=e),m&&(m.textContent=n),g&&(g.className=`confirm-modal-icon ${i}`,g.innerHTML=i==="danger"?'<i class="fa-solid fa-trash-can"></i>':'<i class="fa-solid fa-triangle-exclamation"></i>'),f&&(f.style.background=i==="danger"?"#EF4444":"",f.style.borderColor=i==="danger"?"#EF4444":""),s.classList.add("open");const u=()=>{h(),r(!0)},p=()=>{h(),r(!1)},h=()=>{s.classList.remove("open"),f==null||f.removeEventListener("click",u),m==null||m.removeEventListener("click",p)};f==null||f.addEventListener("click",u),m==null||m.addEventListener("click",p)})}function c(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function D(t){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(t||0)}function ee(t){if(!t||!t.role)return;const a=t.role.name||"",e=Array.isArray(t.role.permissions)?t.role.permissions:[],n=a==="SUPERADMIN"||e.includes("*");document.querySelectorAll("[data-role]").forEach(i=>{i.getAttribute("data-role")==="SUPERADMIN"&&!n?i.style.display="none":i.style.display=""}),document.querySelectorAll("[data-page]").forEach(i=>{if(n){i.style.display="";return}const r=i.getAttribute("data-page");e.includes(r)?i.style.display="":i.style.display="none"}),document.querySelectorAll("[data-permission]").forEach(i=>{if(n){i.style.display="";return}const r=i.getAttribute("data-permission"),[s]=r.split(":");e.includes(r)||e.includes(`${s}:*`)?i.style.display="":i.style.display="none"})}async function y(t,a={},e=null){let n={};typeof a=="string"?n={method:a,...e?{body:JSON.stringify(e)}:{}}:n=a||{};const i={Accept:"application/json","Content-Type":"application/json",...n.headers};b.token&&(i.Authorization=`Bearer ${b.token}`);try{const r=await Ce(t,{...n,headers:i});if(r.status===401)throw fe(),new Error("Sesi autentikasi telah habis. Silakan login kembali.");const s=await r.text();let o;try{o=s?JSON.parse(s):{}}catch{throw new Error(`Server tidak merespons JSON (HTTP ${r.status}). Pastikan backend aktif.`)}return o}catch(r){throw r.message.includes("Failed to fetch")||r.message.includes("NetworkError")?new Error("Gagal terhubung ke server backend. Silakan coba beberapa saat lagi."):r}}let le=null;async function xa(){try{const t=await y("/admin/settings/countdown");if(t&&(t.status==="success"||t.success)){const a=t.data||t.settings||{};b.globalSettings=a,Ba(a)}}catch(t){console.warn("Gagal memuat pengaturan global:",t)}}function ie(t){const a=document.getElementById("adminCountdownLivePreview");if(!a)return;if(le&&(clearInterval(le),le=null),!t){a.innerHTML='<span style="color: #f59e0b;"><i class="fa-solid fa-clock-rotate-left"></i> TANGGAL BELUM DITENTUKAN</span> — Tampilan di website akan menampilkan status placeholder.';return}const e=new Date(t).getTime();if(isNaN(e)){a.innerHTML='<span style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> FORMAT TANGGAL TIDAK VALID</span>';return}const n=()=>{const i=Date.now(),r=e-i;if(r<=0){a.innerHTML='<span style="color: #ef4444;"><i class="fa-solid fa-flag-checkered"></i> RACE DAY SUDAH LEWAT / SEDANG BERLANGSUNG</span>';return}const s=Math.floor(r/(1e3*60*60*24)),o=Math.floor(r%(1e3*60*60*24)/(1e3*60*60)),d=Math.floor(r%(1e3*60*60)/(1e3*60)),g=Math.floor(r%(1e3*60)/1e3),f=new Date(t).toLocaleString("id-ID",{dateStyle:"full",timeStyle:"short"});a.innerHTML=`<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> AKTIF:</span> ${s} Hari : ${o} Jam : ${d} Menit : ${g} Detik (${f} WIB)`};n(),le=setInterval(n,1e3)}function Ba(t={}){const a=document.getElementById("globalCountdownInput"),e=document.getElementById("globalStatusBadge"),n=document.getElementById("btnToggleGlobalClosed");if(a){if(t.eventCountdownDate){const i=new Date(t.eventCountdownDate);if(isNaN(i.getTime()))a.value="";else{const r=s=>String(s).padStart(2,"0");a.value=`${i.getFullYear()}-${r(i.getMonth()+1)}-${r(i.getDate())}T${r(i.getHours())}:${r(i.getMinutes())}`}}else a.value="";a.removeEventListener("change",ba),a.addEventListener("change",ba)}ie(t.eventCountdownDate),e&&(t.isRegistrationClosed?(e.className="event-status-tag closed",e.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Resmi Ditutup'):(e.className="event-status-tag open",e.innerHTML='<i class="fa-solid fa-signal"></i> Pendaftaran Aktif / Buka')),n&&(t.isRegistrationClosed?(n.className="btn btn-secondary btn-sm",n.innerHTML='<i class="fa-solid fa-lock-open"></i> Buka Kembali Pendaftaran'):(n.className="btn btn-outline btn-sm",n.innerHTML='<i class="fa-solid fa-lock"></i> Tutup Seluruh Pendaftaran'))}function ba(t){const a=t.target.value;ie(a?new Date(a).toISOString():null)}async function Xa(){var e;const t=document.getElementById("globalCountdownInput");if(!t||!t.value){l("warning","Peringatan","Harap tentukan tanggal dan waktu countdown terlebih dahulu.");return}const a=new Date(t.value).toISOString();try{const n=((e=b.globalSettings)==null?void 0:e.isRegistrationClosed)||!1,i=await y("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:a,isRegistrationClosed:n})});i&&(i.status==="success"||i.success)?(b.globalSettings||(b.globalSettings={}),b.globalSettings.eventCountdownDate=a,ie(a),l("success","Tersimpan","Tanggal target race day berhasil diperbarui!")):l("error","Gagal",i.message||"Gagal menyimpan pengaturan countdown.")}catch(n){l("error","Kesalahan Server",n.message)}}async function Za(){var a;if(await C({title:"Kosongkan Tanggal Countdown?",message:'Apakah Anda yakin ingin mengosongkan tanggal hitung mundur? Landing page akan menampilkan status "TANGGAL BELUM DITENTUKAN".',confirmText:"Ya, Kosongkan Tanggal",type:"warning"}))try{const e=((a=b.globalSettings)==null?void 0:a.isRegistrationClosed)||!1,n=await y("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:null,isRegistrationClosed:e})});if(n&&(n.status==="success"||n.success)){b.globalSettings||(b.globalSettings={}),b.globalSettings.eventCountdownDate=null;const i=document.getElementById("globalCountdownInput");i&&(i.value=""),ie(null),l("success","Dikosongkan","Tanggal target race day telah dikosongkan.")}else l("error","Gagal",n.message||"Gagal mengosongkan tanggal.")}catch(e){l("error","Kesalahan Server",e.message)}}async function et(){var n,i;const a=!(((n=b.globalSettings)==null?void 0:n.isRegistrationClosed)||!1);if(await C({title:a?"Tutup Seluruh Pendaftaran?":"Buka Kembali Pendaftaran?",message:a?"Apakah Anda yakin ingin MENUTUP seluruh pendaftaran website? Calon peserta tidak akan dapat mendaftar lagi.":"Apakah Anda ingin MEMBUKA KEMBALI seluruh pendaftaran website?",confirmText:a?"Ya, Tutup Pendaftaran":"Ya, Buka Pendaftaran",type:a?"danger":"warning"}))try{const r=((i=b.globalSettings)==null?void 0:i.eventCountdownDate)||null,s=await y("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:r,isRegistrationClosed:a})});s&&(s.status==="success"||s.success)?(b.globalSettings||(b.globalSettings={}),b.globalSettings.isRegistrationClosed=a,Ba(b.globalSettings),l("success","Status Berubah",a?"Pendaftaran resmi DITUTUP!":"Pendaftaran resmi DIBUKA!")):l("error","Gagal",s.message||"Gagal mengubah status pendaftaran.")}catch(r){l("error","Kesalahan Server",r.message)}}async function j(){try{const t=await y("/admin/events");if(t.status==="success"){b.events=t.data,at(t.data),En();const a=document.getElementById("partFormEventId");a&&(a.innerHTML=t.data.map(n=>`
          <option value="${n.id}">${c(n.ticketName)} (${c(n.category)})</option>
        `).join(""));const e=document.getElementById("navEventsCount");e&&(e.textContent=t.data.length)}}catch(t){console.error("Failed to load events:",t)}}function at(t){const a=document.getElementById("adminEventsContainer");if(a){if(t.length===0){a.innerHTML='<div style="grid-column: span 2; text-align: center; padding: 40px; color: #94A3B8;">Belum ada event/kategori yang ditambahkan.</div>';return}a.innerHTML="",t.forEach(e=>{var r;const n=document.createElement("div");n.className=`admin-event-card ${e.isClosed?"closed-event":""}`;const i=e.eventDate?new Date(e.eventDate).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})+" WIB":"Belum diatur";n.innerHTML=`
      <div class="admin-event-card-header">
        <div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0 0 4px 0;">
            ${c(e.ticketName)}
          </h4>
          <span style="font-size: 0.8rem; color: #64748B;">
            Kategori: <strong>${c(e.category)}</strong> • Pelaksanaan: <strong>${i}</strong>
          </span>
        </div>
        <span class="event-status-tag ${e.isClosed?"closed":"open"}">
          <i class="${e.isClosed?"fa-solid fa-lock":"fa-solid fa-lock-open"}"></i>
          ${e.isClosed?"Ditutup":"Dibuka"}
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

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-subtle); padding-top: 16px; margin-top: 8px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm btn-quick-save-event" data-id="${e.id}" data-permission="events:update">
              <i class="fa-solid fa-check"></i> Simpan
            </button>
            <button class="btn btn-secondary btn-sm btn-edit-event" data-id="${e.id}" data-permission="events:update">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button class="btn btn-outline btn-sm btn-manage-benefits" data-id="${e.id}" data-name="${c(e.ticketName)}" data-permission="benefits:manage" title="Kelola Fasilitas / Benefit Tiket" style="color: #4F46E5; border-color: #C7D2FE;">
              <i class="fa-solid fa-gift"></i> Benefit (${e.benefits?e.benefits.length:((r=e._count)==null?void 0:r.benefits)||0})
            </button>
            <button class="btn btn-outline btn-sm btn-delete-event" data-id="${e.id}" data-name="${c(e.ticketName)}" data-permission="events:delete" style="color: #EF4444; border-color: #FECACA;">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>

          <button class="btn ${e.isClosed?"btn-secondary":"btn-outline"} btn-sm btn-toggle-close-event" data-id="${e.id}" data-closed="${e.isClosed}" data-permission="events:update">
            <i class="${e.isClosed?"fa-solid fa-lock-open":"fa-solid fa-lock"}"></i>
            ${e.isClosed?"Buka Kategori":"Tutup Kategori"}
          </button>
        </div>
      </div>
    `,a.appendChild(n)}),document.querySelectorAll(".btn-quick-save-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=parseInt(document.getElementById(`eventStock-${n}`).value,10),r=parseFloat(document.getElementById(`eventPrice-${n}`).value);await ya(n,{stock:i,price:r},"Kuota dan harga kategori berhasil diperbarui!")})}),document.querySelectorAll(".btn-toggle-close-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),r=!(e.getAttribute("data-closed")==="true");await C({title:r?"Tutup Kategori Event?":"Buka Kategori Event?",message:`Apakah Anda yakin ingin ${r?"MENUTUP":"MEMBUKA"} pendaftaran untuk kategori event ini?`,confirmText:r?"Ya, Tutup Kategori":"Ya, Buka Kategori",type:r?"danger":"warning"})&&await ya(n,{isClosed:r},r?"Kategori ditutup!":"Kategori dibuka!")})}),document.querySelectorAll(".btn-manage-benefits").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");Aa(n,i)})}),document.querySelectorAll(".btn-edit-event").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=b.events.find(r=>r.id===n);i&&nt(i)})}),document.querySelectorAll(".btn-delete-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await C({title:"Hapus Kategori Event?",message:`PERINGATAN: Apakah Anda yakin ingin menghapus kategori "${i}"? Seluruh data yang terkait akan dihapus permanen.`,confirmText:"Ya, Hapus Permanen",type:"danger"})&&await rt(n)})}),ee(b.profile)}}function tt(){var t;document.getElementById("eventFormId").value="",document.getElementById("modalEventTitle").innerHTML='<i class="fa-solid fa-calendar-plus" style="color: var(--color-primary);"></i> Tambah Event Baru',document.getElementById("eventFormTicketName").value="",document.getElementById("eventFormCategory").value="10K",document.getElementById("eventFormStock").value=500,document.getElementById("eventFormPrice").value=25e4,document.getElementById("eventFormDate").value="",document.getElementById("eventFormTicketImage").value="",document.getElementById("eventFormMedalImage").value="",document.getElementById("eventFormIsClosed").checked=!1,(t=document.getElementById("modalEventBackdrop"))==null||t.classList.add("open")}function nt(t){var a;if(document.getElementById("eventFormId").value=t.id,document.getElementById("modalEventTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Event: ${c(t.ticketName)}`,document.getElementById("eventFormTicketName").value=t.ticketName,document.getElementById("eventFormCategory").value=t.category,document.getElementById("eventFormStock").value=t.stock,document.getElementById("eventFormPrice").value=t.price,document.getElementById("eventFormTicketImage").value=t.ticketImage||"",document.getElementById("eventFormMedalImage").value=t.medalImage||"",t.eventDate){const e=new Date(t.eventDate),n=i=>String(i).padStart(2,"0");document.getElementById("eventFormDate").value=`${e.getFullYear()}-${n(e.getMonth()+1)}-${n(e.getDate())}T${n(e.getHours())}:${n(e.getMinutes())}`}else document.getElementById("eventFormDate").value="";document.getElementById("eventFormIsClosed").checked=!!t.isClosed,(a=document.getElementById("modalEventBackdrop"))==null||a.classList.add("open")}async function it(t){var m;t.preventDefault();const a=document.getElementById("eventFormId").value,e=document.getElementById("eventFormTicketName").value.trim(),n=document.getElementById("eventFormCategory").value.trim(),i=parseInt(document.getElementById("eventFormStock").value,10),r=parseFloat(document.getElementById("eventFormPrice").value),s=document.getElementById("eventFormDate").value,o=document.getElementById("eventFormTicketImage").value.trim()||null,d=document.getElementById("eventFormMedalImage").value.trim()||null,g=document.getElementById("eventFormIsClosed").checked,f={ticketName:e,category:n,stock:i,price:r,ticketImage:o,medalImage:d,eventDate:s?new Date(s).toISOString():null,isClosed:g};try{let u;a?u=await y(`/admin/events/${a}`,{method:"PUT",body:JSON.stringify(f)}):u=await y("/admin/events",{method:"POST",body:JSON.stringify(f)}),u.status==="success"?(l("success","Berhasil",a?"Event berhasil diperbarui!":"Event baru berhasil ditambahkan!"),(m=document.getElementById("modalEventBackdrop"))==null||m.classList.remove("open"),j()):l("error","Gagal",u.message||"Validasi gagal")}catch(u){l("error","Kesalahan Server",u.message)}}async function ya(t,a,e){try{const n=await y(`/admin/events/${t}`,{method:"PUT",body:JSON.stringify(a)});n.status==="success"?(l("success","Berhasil",e),j()):l("error","Gagal",n.message)}catch(n){l("error","Kesalahan Server",n.message)}}async function rt(t){try{const a=await y(`/admin/events/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Kategori event berhasil dihapus!"),j()):l("error","Gagal Menghapus",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}let me=null,be=null;async function Aa(t,a){var r;me=t,be=null;const e=document.getElementById("benefitFormEventId");e&&(e.value=t);const n=document.getElementById("benefitFormId");n&&(n.value="");const i=document.getElementById("benefitModalSubtitle");i&&(i.textContent=`Kategori: ${a}`),Ne(),(r=document.getElementById("modalEventBenefitsBackdrop"))==null||r.classList.add("open"),await Pe(t)}async function Pe(t){const a=document.getElementById("eventBenefitsTableBody"),e=document.getElementById("benefitListCount");a&&(a.innerHTML='<tr><td colspan="3" style="text-align: center; padding: 20px; color: #94A3B8;"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat benefit...</td></tr>');try{const n=await y(`/admin/events/${t}/benefits`);if(n.status==="success"){const i=n.data||[];e&&(e.textContent=i.length),st(i)}else l("error","Gagal Memuat Benefit",n.message)}catch(n){console.error("Failed to load event benefits:",n),a&&(a.innerHTML=`<tr><td colspan="3" style="text-align: center; padding: 20px; color: #EF4444;">Gagal memuat data: ${c(n.message)}</td></tr>`)}}function st(t){const a=document.getElementById("eventBenefitsTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="3" style="text-align: center; padding: 24px; color: #94A3B8;">Belum ada benefit untuk kategori ini. Tambahkan melalui form di atas.</td></tr>';return}a.innerHTML=t.map(e=>`
    <tr>
      <td>
        <div style="font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 8px;">
          ${e.image?`<img src="${c(e.image)}" alt="" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px;">`:'<i class="fa-solid fa-medal" style="color: #F97316;"></i>'}
          <span>${c(e.name)}</span>
        </div>
      </td>
      <td style="font-size: 0.85rem; color: #475569;">
        ${c(e.description)}
      </td>
      <td style="text-align: center; white-space: nowrap;">
        <div style="display: flex; gap: 6px; justify-content: center;">
          <button type="button" class="btn btn-secondary btn-sm btn-edit-benefit" data-id="${e.id}" data-name="${c(e.name)}" data-desc="${c(e.description)}" data-image="${c(e.image||"")}" style="padding: 4px 8px; font-size: 0.75rem;">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button type="button" class="btn btn-outline btn-sm btn-delete-benefit" data-id="${e.id}" data-name="${c(e.name)}" style="padding: 4px 8px; font-size: 0.75rem; color: #EF4444; border-color: #FECACA;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join(""),a.querySelectorAll(".btn-edit-benefit").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name"),r=e.getAttribute("data-desc"),s=e.getAttribute("data-image");be=n;const o=document.getElementById("benefitFormId");o&&(o.value=n);const d=document.getElementById("benefitFormName");d&&(d.value=i);const g=document.getElementById("benefitFormDesc");g&&(g.value=r);const f=document.getElementById("benefitFormImage");f&&(f.value=s||"");const m=document.getElementById("benefitFormTitle");m&&(m.innerHTML=`<i class="fa-solid fa-pen" style="color: var(--color-primary);"></i> Edit Benefit: ${c(i)}`);const u=document.getElementById("btnCancelBenefitEdit");u&&(u.style.display="inline-block");const p=document.getElementById("btnSaveBenefitSubmit");p&&(p.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Perbarui Benefit')})}),a.querySelectorAll(".btn-delete-benefit").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await C({title:"Hapus Fasilitas / Benefit?",message:`Apakah Anda yakin ingin menghapus "${i}" dari fasilitas event ini?`,confirmText:"Ya, Hapus",type:"danger"})&&await lt(n)})})}}function Ne(){be=null;const t=document.getElementById("benefitFormId");t&&(t.value="");const a=document.getElementById("benefitFormName");a&&(a.value="");const e=document.getElementById("benefitFormDesc");e&&(e.value="");const n=document.getElementById("benefitFormImage");n&&(n.value="");const i=document.getElementById("benefitFormTitle");i&&(i.innerHTML='<i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Fasilitas / Benefit Baru');const r=document.getElementById("btnCancelBenefitEdit");r&&(r.style.display="none");const s=document.getElementById("btnSaveBenefitSubmit");s&&(s.innerHTML='<i class="fa-solid fa-check"></i> Simpan Benefit')}async function ot(t){var g,f,m,u,p;t.preventDefault();const a=me||((g=document.getElementById("benefitFormEventId"))==null?void 0:g.value),e=be||((f=document.getElementById("benefitFormId"))==null?void 0:f.value),n=(m=document.getElementById("benefitFormName"))==null?void 0:m.value.trim(),i=(u=document.getElementById("benefitFormDesc"))==null?void 0:u.value.trim(),r=((p=document.getElementById("benefitFormImage"))==null?void 0:p.value.trim())||null;if(!a){l("warning","Peringatan","Event ID tidak terdeteksi.");return}if(!n||!i){l("warning","Validasi Gagal","Nama dan deskripsi benefit wajib diisi.");return}const s={name:n,description:i,image:r},o=document.getElementById("btnSaveBenefitSubmit"),d=o?o.innerHTML:"";o&&(o.disabled=!0,o.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Menyimpan...');try{let h;e?h=await y(`/admin/benefits/${e}`,{method:"PUT",body:JSON.stringify(s)}):h=await y(`/admin/events/${a}/benefits`,{method:"POST",body:JSON.stringify(s)}),h.status==="success"?(l("success","Berhasil",e?"Benefit berhasil diperbarui!":"Benefit baru berhasil ditambahkan!"),Ne(),await Pe(a),await j()):l("error","Gagal Menyimpan Benefit",h.message||"Terjadi kesalahan")}catch(h){l("error","Kesalahan",h.message)}finally{o&&(o.disabled=!1,o.innerHTML=d)}}async function lt(t){try{const a=await y(`/admin/benefits/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Dihapus","Benefit berhasil dihapus dari database."),me&&await Pe(me),await j()):l("error","Gagal Menghapus",a.message)}catch(a){l("error","Kesalahan",a.message)}}window.openEventBenefitsModal=Aa;const dt=`<!-- =========================================================================\r
     MODULAR ADMIN SIDEBAR - TEGAL RUN 2027\r
     ========================================================================= -->\r
<aside class="admin-sidebar" id="adminSidebar">\r
  <!-- Sidebar Header / Branding -->\r
  <div class="sidebar-header">\r
    <div class="sidebar-brand">\r
      <div class="brand-icon">\r
        <i class="fa-solid fa-person-running"></i>\r
      </div>\r
      <div class="brand-text">\r
        TEGAL RUN <span>2027</span>\r
        <div class="brand-tag">PORTAL ADMIN</div>\r
      </div>\r
    </div>\r
    <button class="sidebar-close-btn" id="btnCloseSidebar" title="Tutup Menu">\r
      <i class="fa-solid fa-xmark"></i>\r
    </button>\r
  </div>\r
\r
  <!-- Sidebar User Profile Snapshot -->\r
  <div class="sidebar-profile">\r
    <div class="profile-avatar">\r
      <i class="fa-solid fa-user-shield"></i>\r
    </div>\r
    <div class="profile-details">\r
      <h4 id="sidebarAdminFullName">Administrator</h4>\r
      <span class="role-badge" id="sidebarAdminRole">SUPERADMIN</span>\r
    </div>\r
  </div>\r
\r
  <!-- Navigation Menu -->\r
  <nav class="sidebar-nav">\r
    <div class="nav-section-title">MENU UTAMA</div>\r
\r
    <button class="nav-item active" data-nav="dashboard" data-page="page:dashboard">\r
      <i class="fa-solid fa-gauge-high"></i>\r
      <span>Dashboard Overview</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="events" data-page="page:events">\r
      <i class="fa-solid fa-calendar-days"></i>\r
      <span>Manajemen Event</span>\r
      <span class="nav-badge" id="navEventsCount">2</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="participants" data-page="page:participants">\r
      <i class="fa-solid fa-users"></i>\r
      <span>Manajemen Peserta</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="racepack" data-page="page:racepack">\r
      <i class="fa-solid fa-box-open" style="color: #F97316;"></i>\r
      <span>Racepack</span>\r
      <span class="badge" style="background: #FFEDD5; color: #EA580C; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; margin-left: auto;">SCAN</span>\r
    </button>\r
    <button class="nav-item" data-nav="racepack-view" data-page="page:racepack">\r
      <i class="fa-solid fa-list-check" style="color:#0EA5E9;"></i>\r
      <span>Live View Antrean Racepack</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="orders" data-page="page:orders">\r
      <i class="fa-solid fa-receipt"></i>\r
      <span>Transaksi & Order</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="notif-logs" data-page="page:notif-logs">\r
      <i class="fa-solid fa-paper-plane"></i>\r
      <span>Log Notifikasi & Peserta</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="whatsapp-web" data-page="page:whatsapp-web">\r
      <i class="fa-brands fa-whatsapp" style="color: #22C55E;"></i>\r
      <span>WhatsApp Web Console</span>\r
    </button>\r
\r
    <div class="nav-section-title">KONFIGURASI</div>\r
\r
    <button class="nav-item" data-nav="bib-settings" data-page="page:bib-settings">\r
      <i class="fa-solid fa-id-badge" style="color: #6366F1;"></i>\r
      <span>Pengaturan BIB &amp; E-Tiket</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="cms" data-page="page:cms">\r
      <i class="fa-solid fa-pen-ruler"></i>\r
      <span>Konten Website & CMS</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="countdown" data-page="page:countdown">\r
      <i class="fa-solid fa-stopwatch-20"></i>\r
      <span>Countdown & Status Event</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="notifications" data-page="page:notifications">\r
      <i class="fa-solid fa-bell"></i>\r
      <span>Konfigurasi Notifikasi</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="admins" data-page="page:admins" data-role="SUPERADMIN">\r
      <i class="fa-solid fa-shield-halved"></i>\r
      <span>Kelola Admin & RBAC</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="routes" data-page="page:routes">\r
      <i class="fa-solid fa-map-pin"></i>\r
      <span>Rute &amp; Checkpoint</span>\r
    </button>\r
\r
    <button class="nav-item" data-nav="logs" data-page="page:logs">\r
      <i class="fa-solid fa-clock-rotate-left"></i>\r
      <span>Log Audit Sistem</span>\r
    </button>\r
  </nav>\r
\r
  <!-- Sidebar Footer -->\r
  <div class="sidebar-footer">\r
    <a href="/" target="_blank" class="sidebar-action-btn" title="Buka Landing Page">\r
      <i class="fa-solid fa-arrow-up-right-from-square"></i>\r
      <span>Lihat Website</span>\r
    </a>\r
    <button type="button" class="sidebar-action-btn logout-btn" id="btnSidebarLogout" title="Keluar dari Portal Admin">\r
      <i class="fa-solid fa-arrow-right-from-bracket"></i>\r
      <span>Keluar</span>\r
    </button>\r
  </div>\r
</aside>\r
`;let v=[],R=[],T=[];const ct=[{type:"AUTO",autoKey:"TOTAL_PARTICIPANTS",val:"2,500+",unit:"Pelari Terdaftar",desc:"Antusiasme komunitas nasional"},{type:"AUTO",autoKey:"TOTAL_CATEGORIES",val:"2",unit:"Kategori Utama",desc:"Half Marathon 10K & Fun Run 5K"},{type:"CUSTOM",autoKey:"STERIL_ROUTE",val:"100%",unit:"Steril & Aman",desc:"Pengawalan Dishub & Polresta"},{type:"CUSTOM",autoKey:"TOTAL_PRIZE",val:"Rp 75Jt",unit:"Total Hadiah & Doorprize",desc:"Podium juara & ratusan hadiah menarik"}],va=[{icon:"fa-shirt",title:"Jersey Running Dry-Fit",desc:"Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh."},{icon:"fa-microchip",title:"Nomor Dada (BIB) & Timing Chip",desc:"Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online."},{icon:"fa-medal",title:"Medali Finisher Logam Cor",desc:"Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT."},{icon:"fa-bottle-water",title:"Water & Isotonic Station",desc:"Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar."},{icon:"fa-truck-medical",title:"Tim Medis & Ambulans Mobile",desc:"Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute."},{icon:"fa-utensils",title:"Refreshment & Finisher Feast",desc:"Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar."}],mt=[{icon:"fa-certificate",title:"Rekomendasi Resmi PB PASI",desc:"Tersertifikasi standar teknis rute dan aturan perlombaan atletik resmi nasional."},{icon:"fa-road-barrier",title:"Izin Kepolisian & Dishub",desc:"Pengamanan jalur dan rekayasa lalu lintas penuh demi keselamatan pelari."},{icon:"fa-shield-heart",title:"Asuransi Medis Peserta",desc:"Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri selama perlombaan berlangsung."},{icon:"fa-user-lock",title:"Perlindungan Data Pribadi (UU PDP)",desc:"Enkripsi data pendaftaran dan kepatuhan penuh undang-undang perlindungan data konsumen."}],Ia={hero:"cmsShowHero",stats:"cmsShowStats",route:"cmsShowRoute",facilities:"cmsShowFacilities",tickets:"cmsShowTickets",legal:"cmsShowLegal",footer:"cmsShowFooter"};function G(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pe(){const t=document.getElementById("cmsStatsItemsContainer");if(t){if(v.length===0){t.innerHTML='<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada kartu statistik. Klik "Tambah Kartu Statistik" di atas.</div>';return}t.innerHTML=v.map((a,e)=>`
    <div style="padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-weight: 700; color: var(--color-primary); font-size: 0.88rem;">
          <i class="fa-solid fa-chart-simple"></i> Kartu Statistik #${e+1}
        </span>
        <button type="button" class="btn btn-outline btn-sm btn-delete-stat" data-idx="${e}" style="color: #ef4444; border-color: rgba(239,68,68,0.3); padding: 4px 8px;" title="Hapus kartu ini">
          <i class="fa-solid fa-trash"></i>
        </button>
        <label style="font-size:0.76rem;"><input type="checkbox" class="stat-input-visible" data-idx="${e}" ${a.visible!==!1?"checked":""}> Tampilkan</label>
      </div>

      <div class="form-group" style="margin-bottom: 10px;">
        <label class="form-label" style="font-size: 0.78rem;">Sumber Data</label>
        <select class="form-input stat-input-type" data-idx="${e}" style="padding: 6px 10px; font-size: 0.85rem;">
          <option value="CUSTOM" ${a.type==="CUSTOM"?"selected":""}>Manual / Kustom Sendiri</option>
          <option value="AUTO_PARTICIPANTS" ${a.autoKey==="TOTAL_PARTICIPANTS"?"selected":""}>Otomatis: Total Peserta Terdaftar</option>
          <option value="AUTO_CATEGORIES" ${a.autoKey==="TOTAL_CATEGORIES"?"selected":""}>Otomatis: Jumlah Kategori Lomba</option>
          <option value="AUTO_CAPACITY" ${a.autoKey==="TOTAL_CAPACITY"?"selected":""}>Otomatis: Total Kuota</option>
          <option value="AUTO_AVAILABLE" ${a.autoKey==="AVAILABLE_SLOTS"?"selected":""}>Otomatis: Sisa Kuota</option>
        </select>
      </div>

      <div class="form-group" style="margin-bottom: 10px;">
        <label class="form-label" style="font-size: 0.78rem;">Angka / Nilai Highlight ${a.type==="AUTO"?"(otomatis)":"(manual)"}</label>
        <input type="text" class="form-input stat-input-val" data-idx="${e}" value="${G(a.val||"")}" placeholder="2,500+ / 100% / Rp 75Jt" ${a.type==="AUTO"?"disabled":""} style="padding: 6px 10px; font-size: 0.88rem; font-weight: 700;">
      </div>

      <div class="form-group" style="margin-bottom: 10px;">
        <label class="form-label" style="font-size: 0.78rem;">Label / Satuan</label>
        <input type="text" class="form-input stat-input-unit" data-idx="${e}" value="${G(a.unit||"")}" placeholder="Pelari Terdaftar / Steril & Aman" style="padding: 6px 10px; font-size: 0.85rem;">
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 0.78rem;">Keterangan Subtitle</label>
        <input type="text" class="form-input stat-input-desc" data-idx="${e}" value="${G(a.desc||"")}" placeholder="Keterangan singkat pendukung" style="padding: 6px 10px; font-size: 0.82rem;">
      </div>
    </div>
  `).join(""),t.querySelectorAll(".btn-delete-stat").forEach(a=>{a.addEventListener("click",()=>{const e=Number(a.getAttribute("data-idx"));v.splice(e,1),pe()})}),t.querySelectorAll(".stat-input-type").forEach(a=>{a.addEventListener("change",()=>{const e=Number(a.getAttribute("data-idx")),n=a.value;n==="AUTO_PARTICIPANTS"?(v[e].type="AUTO",v[e].autoKey="TOTAL_PARTICIPANTS",v[e].unit="Pelari Terdaftar",v[e].desc="Total pendaftar resmi real-time"):n==="AUTO_CATEGORIES"?(v[e].type="AUTO",v[e].autoKey="TOTAL_CATEGORIES",v[e].unit="Kategori Lomba",v[e].desc="Jumlah kategori lomba yang tersedia"):n==="AUTO_CAPACITY"?(v[e].type="AUTO",v[e].autoKey="TOTAL_CAPACITY",v[e].unit="Total Kuota",v[e].desc="Kapasitas seluruh kategori lomba"):n==="AUTO_AVAILABLE"?(v[e].type="AUTO",v[e].autoKey="AVAILABLE_SLOTS",v[e].unit="Slot Tersedia",v[e].desc="Sisa kuota seluruh kategori lomba"):(v[e].type="CUSTOM",v[e].autoKey=""),pe()})}),t.querySelectorAll(".stat-input-val").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));v[e].val=a.value})}),t.querySelectorAll(".stat-input-unit").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));v[e].unit=a.value})}),t.querySelectorAll(".stat-input-desc").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));v[e].desc=a.value})}),t.querySelectorAll(".stat-input-visible").forEach(a=>{a.addEventListener("change",()=>{v[Number(a.getAttribute("data-idx"))].visible=a.checked})})}}function Le(){const t=document.getElementById("cmsFacilitiesItemsContainer");if(t){if(R.length===0){t.innerHTML='<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada kartu fasilitas. Klik "Tambah Kartu Fasilitas" di atas.</div>';return}t.innerHTML=R.map((a,e)=>`
    <div style="padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="font-weight: 700; color: var(--color-primary); font-size: 0.88rem;">
          <i class="fa-solid ${a.icon||"fa-gift"}"></i> Fasilitas #${e+1}
        </span>
        <button type="button" class="btn btn-outline btn-sm btn-delete-facility" data-idx="${e}" style="color: #ef4444; border-color: rgba(239,68,68,0.3); padding: 4px 8px;" title="Hapus kartu ini">
          <i class="fa-solid fa-trash"></i>
        </button>
        <label style="font-size:0.76rem;"><input type="checkbox" class="fac-input-visible" data-idx="${e}" ${a.visible!==!1?"checked":""}> Tampilkan</label>
      </div>

      <div class="form-group" style="margin-bottom: 8px;">
        <label class="form-label" style="font-size: 0.78rem;">Icon FontAwesome Class</label>
        <input type="text" class="form-input fac-input-icon" data-idx="${e}" value="${G(a.icon||"fa-gift")}" placeholder="fa-shirt / fa-medal / fa-bottle-water" style="padding: 6px 10px; font-size: 0.85rem;">
      </div>

      <div class="form-group" style="margin-bottom: 8px;">
        <label class="form-label" style="font-size: 0.78rem;">Judul Fasilitas</label>
        <input type="text" class="form-input fac-input-title" data-idx="${e}" value="${G(a.title||"")}" placeholder="Nama fasilitas atau racepack" style="padding: 6px 10px; font-size: 0.88rem; font-weight: 700;">
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 0.78rem;">Deskripsi Fasilitas</label>
        <textarea class="form-input fac-input-desc" data-idx="${e}" rows="2" placeholder="Uraian fasilitas bagi peserta" style="padding: 6px 10px; font-size: 0.82rem;">${G(a.desc||"")}</textarea>
      </div>
    </div>
  `).join(""),t.querySelectorAll(".btn-delete-facility").forEach(a=>{a.addEventListener("click",()=>{const e=Number(a.getAttribute("data-idx"));R.splice(e,1),Le()})}),t.querySelectorAll(".fac-input-icon").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));R[e].icon=a.value})}),t.querySelectorAll(".fac-input-title").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));R[e].title=a.value})}),t.querySelectorAll(".fac-input-desc").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));R[e].desc=a.value})}),t.querySelectorAll(".fac-input-visible").forEach(a=>{a.addEventListener("change",()=>{R[Number(a.getAttribute("data-idx"))].visible=a.checked})})}}function De(){const t=document.getElementById("cmsLegalItemsContainer");if(t){if(T.length===0){t.innerHTML='<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada butir legalitas. Klik "Tambah Poin Legalitas" di atas.</div>';return}t.innerHTML=T.map((a,e)=>`
    <div style="padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="font-weight: 700; color: var(--color-primary); font-size: 0.88rem;">
          <i class="fa-solid ${a.icon||"fa-certificate"}"></i> Poin Legalitas #${e+1}
        </span>
        <button type="button" class="btn btn-outline btn-sm btn-delete-legal" data-idx="${e}" style="color: #ef4444; border-color: rgba(239,68,68,0.3); padding: 4px 8px;" title="Hapus poin ini">
          <i class="fa-solid fa-trash"></i>
        </button>
        <label style="font-size:0.76rem;"><input type="checkbox" class="legal-input-visible" data-idx="${e}" ${a.visible!==!1?"checked":""}> Tampilkan</label>
      </div>

      <div class="form-group" style="margin-bottom: 8px;">
        <label class="form-label" style="font-size: 0.78rem;">Icon FontAwesome Class</label>
        <input type="text" class="form-input legal-input-icon" data-idx="${e}" value="${G(a.icon||"fa-certificate")}" placeholder="fa-certificate / fa-user-lock" style="padding: 6px 10px; font-size: 0.85rem;">
      </div>

      <div class="form-group" style="margin-bottom: 8px;">
        <label class="form-label" style="font-size: 0.78rem;">Judul Legalitas</label>
        <input type="text" class="form-input legal-input-title" data-idx="${e}" value="${G(a.title||"")}" placeholder="Contoh: Rekomendasi Resmi PB PASI" style="padding: 6px 10px; font-size: 0.88rem; font-weight: 700;">
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 0.78rem;">Deskripsi Legalitas</label>
        <textarea class="form-input legal-input-desc" data-idx="${e}" rows="2" placeholder="Uraian kepatuhan hukum atau perizinan" style="padding: 6px 10px; font-size: 0.82rem;">${G(a.desc||"")}</textarea>
      </div>
    </div>
  `).join(""),t.querySelectorAll(".btn-delete-legal").forEach(a=>{a.addEventListener("click",()=>{const e=Number(a.getAttribute("data-idx"));T.splice(e,1),De()})}),t.querySelectorAll(".legal-input-icon").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));T[e].icon=a.value})}),t.querySelectorAll(".legal-input-title").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));T[e].title=a.value})}),t.querySelectorAll(".legal-input-desc").forEach(a=>{a.addEventListener("input",()=>{const e=Number(a.getAttribute("data-idx"));T[e].desc=a.value}),t.querySelectorAll(".legal-input-visible").forEach(e=>{e.addEventListener("change",()=>{T[Number(e.getAttribute("data-idx"))].visible=e.checked})})})}}function pt(){const t=document.getElementById("btnAddCmsStatItem");t&&(t.onclick=()=>{v.push({type:"CUSTOM",autoKey:"",val:"100+",unit:"Statistik Baru",desc:"Keterangan statistik"}),pe()});const a=document.getElementById("btnAddCmsFacilityItem");a&&(a.onclick=()=>{R.push({icon:"fa-gift",title:"Fasilitas Baru",desc:"Deskripsi fasilitas pelari..."}),Le()});const e=document.getElementById("btnAddCmsLegalItem");e&&(e.onclick=()=>{T.push({icon:"fa-certificate",title:"Poin Legalitas Baru",desc:"Deskripsi perizinan atau kepatuhan hukum..."}),De()})}async function Ta(){try{const t=await y("/admin/settings/website");if(t.status==="success"&&t.data){const a=t.data,e=(i,r)=>{const s=document.getElementById(i);s&&(s.value=r??"")};if(e("cmsSiteTitle",a.site_title),e("cmsSiteTagline",a.site_tagline),e("cmsHeroBadge",a.hero_badge),e("cmsHeroTitle",a.hero_title),e("cmsHeroSubtitle",a.hero_subtitle),e("cmsHeroBgImage",a.hero_bg_image),a.stats_banner_items)try{v=JSON.parse(a.stats_banner_items)}catch{v=[...ct]}else v=[{type:"AUTO",autoKey:"TOTAL_PARTICIPANTS",val:a.stat_1_val||"2,500+",unit:a.stat_1_unit||"Pelari Terdaftar",desc:a.stat_1_desc||"Antusiasme komunitas nasional"},{type:"AUTO",autoKey:"TOTAL_CATEGORIES",val:a.stat_2_val||"2",unit:a.stat_2_unit||"Kategori Utama",desc:a.stat_2_desc||"Half Marathon 10K & Fun Run 5K"},{type:"CUSTOM",autoKey:"STERIL_ROUTE",val:a.stat_3_val||"100%",unit:a.stat_3_unit||"Steril & Aman",desc:a.stat_3_desc||"Pengawalan Dishub & Polresta"},{type:"CUSTOM",autoKey:"TOTAL_PRIZE",val:a.stat_4_val||"Rp 75Jt",unit:a.stat_4_unit||"Total Hadiah & Doorprize",desc:a.stat_4_desc||"Podium juara & ratusan hadiah menarik"}];pe(),e("cmsRouteTitle",a.route_title),e("cmsRouteDesc",a.route_desc),e("cmsRouteMapImage",a.route_map_image),e("cmsGmapsUrl",a.route_gmaps_url),e("cmsRouteGpxUrl",a.route_gpx_url);let n={};try{n=a.cms_visibility?JSON.parse(a.cms_visibility):{}}catch(i){console.warn("Pengaturan visibilitas CMS tidak valid:",i)}if(Object.entries(Ia).forEach(([i,r])=>{const s=document.getElementById(r);s&&(s.checked=n[i]!==!1)}),e("cmsFacilitiesTitle",a.facilities_title),e("cmsFacilitiesDesc",a.facilities_desc),e("cmsFacilitiesImage",a.facilities_image),a.facilities_items)try{R=JSON.parse(a.facilities_items)}catch{R=[...va]}else R=[...va];if(Le(),e("cmsTicketsTitle",a.tickets_title),e("cmsTicketsDesc",a.tickets_desc),e("cmsMedalImage",a.medal_image),e("cmsLegalTitle",a.legal_title),e("cmsLegalDesc",a.legal_desc),a.legal_items)try{T=JSON.parse(a.legal_items)}catch{T=[...mt]}else T=[{icon:"fa-certificate",title:a.legal_item_1_title||"Rekomendasi Resmi PB PASI",desc:a.legal_item_1_desc||"Tersertifikasi standar teknis rute dan aturan perlombaan atletik resmi nasional."},{icon:"fa-road-barrier",title:a.legal_item_2_title||"Izin Kepolisian & Dishub",desc:a.legal_item_2_desc||"Pengamanan jalur dan rekayasa lalu lintas penuh demi keselamatan pelari."},{icon:"fa-shield-heart",title:a.legal_item_3_title||"Asuransi Medis Peserta",desc:a.legal_item_3_desc||"Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri selama perlombaan berlangsung."},{icon:"fa-user-lock",title:a.legal_item_4_title||"Perlindungan Data Pribadi (UU PDP)",desc:a.legal_item_4_desc||"Enkripsi data pendaftaran dan kepatuhan penuh perlindungan data konsumen."}];De(),e("cmsContactEmail",a.contact_email),e("cmsContactPhone",a.contact_phone),e("cmsContactAddress",a.contact_address),e("cmsFooterCopyright",a.footer_copyright),pt()}}catch(t){console.warn("Gagal memuat pengaturan website CMS:",t)}}async function ha(t){var r,s,o,d,g,f,m,u,p,h,k,x,A,I,S,F,M,$,O,K,H;t.preventDefault();const a=document.getElementById("btnSaveCmsSubmit"),e=a?a.innerHTML:"";a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Menyimpan Pengaturan...');const n=B=>{var L,_;return((_=(L=document.getElementById(B))==null?void 0:L.value)==null?void 0:_.trim())||""},i={site_title:n("cmsSiteTitle"),site_tagline:n("cmsSiteTagline"),hero_badge:n("cmsHeroBadge"),hero_title:n("cmsHeroTitle"),hero_subtitle:n("cmsHeroSubtitle"),hero_bg_image:n("cmsHeroBgImage"),stats_banner_items:JSON.stringify(v),facilities_items:JSON.stringify(R),legal_items:JSON.stringify(T),cms_visibility:JSON.stringify(Object.fromEntries(Object.entries(Ia).map(([B,L])=>{var _;return[B,((_=document.getElementById(L))==null?void 0:_.checked)!==!1]}))),stat_1_val:((r=v[0])==null?void 0:r.val)||"",stat_1_unit:((s=v[0])==null?void 0:s.unit)||"",stat_1_desc:((o=v[0])==null?void 0:o.desc)||"",stat_2_val:((d=v[1])==null?void 0:d.val)||"",stat_2_unit:((g=v[1])==null?void 0:g.unit)||"",stat_2_desc:((f=v[1])==null?void 0:f.desc)||"",stat_3_val:((m=v[2])==null?void 0:m.val)||"",stat_3_unit:((u=v[2])==null?void 0:u.unit)||"",stat_3_desc:((p=v[2])==null?void 0:p.desc)||"",stat_4_val:((h=v[3])==null?void 0:h.val)||"",stat_4_unit:((k=v[3])==null?void 0:k.unit)||"",stat_4_desc:((x=v[3])==null?void 0:x.desc)||"",route_title:n("cmsRouteTitle"),route_desc:n("cmsRouteDesc"),route_map_image:n("cmsRouteMapImage"),route_gmaps_url:n("cmsGmapsUrl"),route_gpx_url:n("cmsRouteGpxUrl"),facilities_title:n("cmsFacilitiesTitle"),facilities_desc:n("cmsFacilitiesDesc"),facilities_image:n("cmsFacilitiesImage"),tickets_title:n("cmsTicketsTitle"),tickets_desc:n("cmsTicketsDesc"),medal_image:n("cmsMedalImage"),legal_title:n("cmsLegalTitle"),legal_desc:n("cmsLegalDesc"),legal_item_1_title:((A=T[0])==null?void 0:A.title)||"",legal_item_1_desc:((I=T[0])==null?void 0:I.desc)||"",legal_item_2_title:((S=T[1])==null?void 0:S.title)||"",legal_item_2_desc:((F=T[1])==null?void 0:F.desc)||"",legal_item_3_title:((M=T[2])==null?void 0:M.title)||"",legal_item_3_desc:(($=T[2])==null?void 0:$.desc)||"",legal_item_4_title:((O=T[3])==null?void 0:O.title)||"",legal_item_4_desc:((K=T[3])==null?void 0:K.desc)||"",contact_email:n("cmsContactEmail"),contact_phone:n("cmsContactPhone"),contact_address:n("cmsContactAddress"),footer_copyright:n("cmsFooterCopyright")};try{const B=await y("/admin/settings/website",{method:"PUT",body:JSON.stringify(i)});if(B.status==="success"){if(l("success","Tersimpan","Konten website, statistik dinamis, fasilitas, dan legalitas berhasil disimpan!"),(H=B.data)!=null&&H.route_gmaps_url){const L=document.getElementById("cmsGmapsUrl");L&&(L.value=B.data.route_gmaps_url)}}else l("error","Gagal Menyimpan",B.message||"Terjadi kesalahan")}catch(B){l("error","Kesalahan Server",B.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}window.loadCmsSettings=Ta;let ne=null;async function Re(){const t=document.getElementById("routePointsTableBody");if(t){t.innerHTML='<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--color-text-muted);">Memuat data...</td></tr>';try{const a=await y("/admin/routes/points");a.status==="success"?(adminState.routePoints=a.data,ut(a.data)):t.innerHTML='<tr><td colspan="8" style="text-align:center;padding:20px;color:#EF4444;">Gagal memuat data checkpoint.</td></tr>'}catch(a){t.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:20px;color:#EF4444;">${a.message}</td></tr>`}}}function ut(t){const a=document.getElementById("routePointsTableBody");if(a){if(!t||t.length===0){a.innerHTML='<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--color-text-muted);">Belum ada checkpoint. Klik "Tambah Checkpoint" untuk menambahkan.</td></tr>';return}a.innerHTML=t.map(e=>`
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
          <button class="btn btn-secondary btn-sm" onclick="openEditRoutePoint(${JSON.stringify(JSON.stringify(e))})" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-sm" style="background:#FEE2E2;color:#EF4444;border:1px solid #FECACA;" onclick="deleteRoutePointApi('${e.id}')" title="Hapus">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("")}}function gt(){ne=null;const t=document.getElementById("modalRoutePointTitle");t&&(t.innerHTML='<i class="fa-solid fa-map-pin" style="color:var(--color-primary);"></i> Tambah Checkpoint Baru'),document.getElementById("routeFormId").value="",document.getElementById("routeFormOrderIndex").value="",document.getElementById("routeFormDistanceKm").value="",document.getElementById("routeFormName").value="",document.getElementById("routeFormCategory").value="ALL",document.getElementById("routeFormIcon").value="",document.getElementById("routeFormDescription").value="",document.getElementById("routeFormImage").value="",document.getElementById("routeFormIsWaterStation").checked=!1,document.getElementById("routeFormIsMedicalSpot").checked=!1,document.getElementById("modalRoutePointBackdrop").classList.add("open")}function ft(t){const a=typeof t=="string"?JSON.parse(t):t;ne=a.id;const e=document.getElementById("modalRoutePointTitle");e&&(e.innerHTML='<i class="fa-solid fa-pen" style="color:var(--color-primary);"></i> Edit Checkpoint'),document.getElementById("routeFormId").value=a.id,document.getElementById("routeFormOrderIndex").value=a.orderIndex,document.getElementById("routeFormDistanceKm").value=a.distanceKm,document.getElementById("routeFormName").value=a.name,document.getElementById("routeFormCategory").value=a.category||"ALL",document.getElementById("routeFormIcon").value=a.icon||"",document.getElementById("routeFormDescription").value=a.description||"",document.getElementById("routeFormImage").value=a.image||"",document.getElementById("routeFormIsWaterStation").checked=!!a.isWaterStation,document.getElementById("routeFormIsMedicalSpot").checked=!!a.isMedicalSpot,document.getElementById("modalRoutePointBackdrop").classList.add("open")}async function bt(t){t.preventDefault();const a=document.getElementById("btnSaveRouteSubmit");a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');const e={orderIndex:parseInt(document.getElementById("routeFormOrderIndex").value,10),distanceKm:parseFloat(document.getElementById("routeFormDistanceKm").value),name:document.getElementById("routeFormName").value.trim(),category:document.getElementById("routeFormCategory").value,icon:document.getElementById("routeFormIcon").value.trim()||null,description:document.getElementById("routeFormDescription").value.trim()||null,image:document.getElementById("routeFormImage").value.trim()||null,isWaterStation:document.getElementById("routeFormIsWaterStation").checked,isMedicalSpot:document.getElementById("routeFormIsMedicalSpot").checked};try{let n;ne?n=await y(`/admin/routes/points/${ne}`,"PUT",e):n=await y("/admin/routes/points","POST",e),n.status==="success"?(l("success","Berhasil!",ne?"Checkpoint berhasil diperbarui.":"Checkpoint baru berhasil ditambahkan."),document.getElementById("modalRoutePointBackdrop").classList.remove("open"),await Re()):l("error","Gagal",n.message||"Terjadi kesalahan.")}catch(n){l("error","Error",n.message)}finally{a&&(a.disabled=!1,a.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Simpan Checkpoint')}}async function yt(t){if(await C({title:"Hapus Checkpoint",message:"Checkpoint ini akan dihapus permanen dari database. Lanjutkan?",confirmText:"Ya, Hapus",type:"danger"}))try{const e=await y(`/admin/routes/points/${t}`,"DELETE");e.status==="success"?(l("success","Dihapus!","Checkpoint berhasil dihapus."),await Re()):l("error","Gagal",e.message||"Gagal menghapus checkpoint.")}catch(e){l("error","Error",e.message)}}window.openEditRoutePoint=ft;window.deleteRoutePointApi=yt;async function vt(){try{const t=await y("/admin/notifications/settings");if(t&&t.status==="success"&&t.data){const a=t.data,e=document.getElementById("notifSettingChannel");e&&a.notif_channel&&(e.value=a.notif_channel);const n=document.getElementById("notifSettingDispatchMode");n&&a.wa_dispatch_mode&&(n.value=a.wa_dispatch_mode);const i=(r,s)=>{const o=document.getElementById(r);o&&(o.value=s||"")};i("notifSettingWaUrl",a.wa_gateway_url),i("notifSettingWaToken",a.wa_api_token),i("notifSettingWaSender",a.wa_sender_number),i("notifSettingSmtpHost",a.email_smtp_host),i("notifSettingSmtpPort",a.email_smtp_port),i("notifSettingSmtpUser",a.email_smtp_user),i("notifSettingSmtpPass",a.email_smtp_pass),i("notifSettingEmailFromName",a.email_from_name),i("notifSettingTemplatePaid",a.template_msg_paid),i("notifSettingTemplatePending",a.template_msg_pending),i("notifSettingTemplateCancel",a.template_msg_cancel),ye(a.wa_session)}}catch(t){l("error","Gagal Memuat Pengaturan",t.message)}}function ye(t){const a=document.getElementById("waSessionStatusBadge"),e=document.getElementById("waQrImageContainer"),n=document.getElementById("waQrCountdown"),i=document.getElementById("waDeviceInfo"),r=document.getElementById("waLastSyncInfo"),s=document.getElementById("btnDisconnectWa");if(!t||t.status==="DISCONNECTED"){a&&(a.innerHTML=`
        <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-circle-xmark"></i> Terputus (Belum Scan QR)
        </span>
      `),e&&(e.innerHTML=`
        <div style="color: #64748B; padding: 30px 10px; font-size: 0.85rem;">
          <i class="fa-solid fa-qrcode" style="font-size: 3rem; margin-bottom: 10px; color: #94A3B8; display: block;"></i>
          Klik tombol <strong>"Generate QR Code"</strong> di samping untuk memulai sesi WhatsApp Web.
        </div>
      `),n&&(n.style.display="none"),i&&(i.textContent="Tidak ada nomor tertaut"),r&&(r.textContent="Status: Belum Terkoneksi"),s&&(s.style.display="none");return}if(t.status==="SCAN_QR"){a&&(a.innerHTML=`
        <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-spinner fa-spin"></i> Menunggu Scan QR Code
        </span>
      `),e&&t.qrCodeUrl&&(e.innerHTML=`
        <img src="${c(t.qrCodeUrl)}" alt="WhatsApp Web QR Code" style="width: 220px; height: 220px; display: block; border-radius: 8px; margin: 0 auto; object-fit: contain;" />
      `),n&&(n.style.display="block",n.innerHTML='<i class="fa-solid fa-clock"></i> Buka WhatsApp &gt; <strong>Perangkat Tertaut (Linked Devices)</strong> &gt; Tautkan Perangkat &gt; Pindai QR.'),i&&(i.textContent="Menunggu scan dari WhatsApp ponsel..."),r&&(r.textContent="QR Code aktif dari server"),s&&(s.style.display="inline-block");return}if(t.status==="CONNECTED"){if(a&&(a.innerHTML=`
        <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.82rem; padding: 6px 12px; font-weight: 700;">
          <i class="fa-solid fa-circle-check"></i> TERHUBUNG (WhatsApp Web Online)
        </span>
      `),e&&(e.innerHTML=`
        <div style="color: #10B981; padding: 25px 10px; font-size: 0.88rem; text-align: center;">
          <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; margin-bottom: 12px; color: #10B981; display: block;"></i>
          <strong>WhatsApp Web Aktif</strong><br>
          <span style="color: #64748B; font-size: 0.78rem;">Sesi siap digunakan untuk pengiriman tiket otomatis.</span>
        </div>
      `),n&&(n.style.display="none"),i&&(i.innerHTML=`<span style="color: #10B981;"><i class="fa-solid fa-phone"></i> ${c(t.connectedNumber||"+62 812-3456-7890")}</span> <small style="color:#64748B;">(${c(t.deviceName||"WhatsApp Web")})</small>`),r){const o=t.syncedAt?new Date(t.syncedAt).toLocaleString("id-ID"):"Hari ini";r.textContent=`Tersinkronisasi sejak: ${o}`}s&&(s.style.display="inline-block")}}async function ht(){const t=document.getElementById("btnGenerateWaQr"),a=t==null?void 0:t.innerHTML;t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Membuat QR...');try{const e=await y("/admin/notifications/whatsapp/qr",{method:"POST"});e&&e.status==="success"&&e.data?(ye(e.data),renderWhatsAppWebConsoleHeader(e.data),Se(2500),l("success","QR Code Siap","Silakan buka WhatsApp di ponsel dan scan QR Code di layar.")):l("error","Gagal",(e==null?void 0:e.message)||"Gagal menghasilkan QR code.")}catch(e){l("error","Kesalahan",e.message)}finally{t&&(t.disabled=!1,t.innerHTML=a)}}async function kt(){if(await C({title:"Putuskan Sesi WhatsApp?",message:"Apakah Anda yakin ingin memutuskan (logout) sesi WhatsApp Web ini? Pengiriman otomatis via WhatsApp Web akan dijeda sampai Anda scan ulang.",confirmText:"Ya, Putuskan Sesi",type:"danger"}))try{const a=await y("/admin/notifications/whatsapp/disconnect",{method:"POST"});a&&a.status==="success"&&a.data&&(ye(a.data),renderWhatsAppWebConsoleHeader(a.data),l("success","Sesi Diputuskan","Sesi WhatsApp Web telah berhasil keluar (logout)."))}catch(a){l("error","Gagal",a.message)}}let Y=null,Ae=null;function Se(t=3e3){Y&&clearInterval(Y),Y=setInterval(async()=>{if(b.activeTab!=="notifications"&&b.activeTab!=="whatsapp-web"){Sa();return}try{const a=await y("/admin/notifications/whatsapp/session");if(a&&a.status==="success"&&a.data){const e=a.data;if(e.status!==Ae){const n=Ae;Ae=e.status,ye(e),renderWhatsAppWebConsoleHeader(e),n==="SCAN_QR"&&e.status==="CONNECTED"&&l("success","WhatsApp Terhubung Otomatis!",`Perangkat ${e.connectedNumber||""} berhasil diverifikasi dan siap kirim.`)}}}catch{}},t)}function Sa(){Y&&(clearInterval(Y),Y=null)}async function Et(t){var r,s;t.preventDefault();const a=o=>{var d;return(((d=document.getElementById(o))==null?void 0:d.value)||"").trim()},e={notif_channel:((r=document.getElementById("notifSettingChannel"))==null?void 0:r.value)||"WA",wa_dispatch_mode:((s=document.getElementById("notifSettingDispatchMode"))==null?void 0:s.value)||"AUTO",email_smtp_host:a("notifSettingSmtpHost"),email_smtp_port:a("notifSettingSmtpPort"),email_smtp_user:a("notifSettingSmtpUser"),email_smtp_pass:a("notifSettingSmtpPass"),email_from_name:a("notifSettingEmailFromName"),template_msg_paid:a("notifSettingTemplatePaid"),template_msg_pending:a("notifSettingTemplatePending"),template_msg_cancel:a("notifSettingTemplateCancel")},n=document.getElementById("btnSaveNotifSettings"),i=n==null?void 0:n.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const o=await y("/admin/notifications/settings",{method:"PUT",body:JSON.stringify(e)});o&&o.status==="success"?l("success","Berhasil","Seluruh konfigurasi notifikasi, mode pengiriman & template pesan berhasil disimpan."):l("error","Gagal Menyimpan",(o==null?void 0:o.message)||"Terjadi kesalahan.")}catch(o){l("error","Gagal",o.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}async function xt(){var r,s,o;const t=((r=document.getElementById("testNotifChannel"))==null?void 0:r.value)||"WA",a=(((s=document.getElementById("testNotifTarget"))==null?void 0:s.value)||"").trim(),e=(((o=document.getElementById("testNotifMessage"))==null?void 0:o.value)||"").trim();if(!a){l("warning","Validasi Gagal","Harap isi nomor WhatsApp atau alamat Email tujuan uji coba.");return}const n=document.getElementById("btnSendTestNotif"),i=n==null?void 0:n.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...');try{const d=await y("/admin/notifications/test",{method:"POST",body:JSON.stringify({channel:t,targetPhone:a,targetEmail:a,message:e})});d&&d.status==="success"?l("success","Uji Coba Berhasil",d.message||"Pesan tes berhasil dikirim!"):l("error","Uji Coba Gagal",(d==null?void 0:d.message)||"Gagal mengirim pesan pengujian.")}catch(d){l("error","Kesalahan Server",d.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}let W=[],N=null;async function Fe(){const t=document.getElementById("waContactListContainer");t&&(t.innerHTML=`
      <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--color-primary); display: block;"></i>
        Menghubungkan konsol WhatsApp Web...
      </div>
    `);try{const a=await y("/admin/notifications/whatsapp/session");a&&a.status==="success"&&a.data&&Bt(a.data);const e=await y("/admin/notifications/logs");e&&e.status==="success"&&e.data&&(W=e.data.items||[],ve(W),W.length>0&&!N&&Me(W[0]))}catch(a){console.warn("Gagal memuat konsol WhatsApp Web:",a),t&&(t.innerHTML=`<div style="padding: 20px; text-align: center; color: #EF4444; font-size: 0.85rem;">Gagal memuat kontak: ${a.message}</div>`)}}function Bt(t){const a=document.getElementById("waWebHeaderStatus"),e=document.getElementById("waWebMyNumber"),n=document.getElementById("waWebMyStatusText");if(!t||t.status==="DISCONNECTED"){a&&(a.innerHTML=`
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
      `),e&&(e.textContent=t.connectedNumber||"Server WhatsApp Web"),n&&(n.innerHTML='<span style="width: 7px; height: 7px; background: #22C55E; border-radius: 50%; display: inline-block;"></span> Online &amp; Terhubung',n.style.color="#22C55E"))}function ve(t){const a=document.getElementById("waContactListContainer");if(a){if(!t||t.length===0){a.innerHTML=`
      <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        Tidak ada kontak peserta ditemukan.
      </div>
    `;return}a.innerHTML=t.map(e=>{const n=N&&N.orderId===e.orderId,i=(e.customerName||"P").charAt(0).toUpperCase(),r=e.orderStatus==="SETTLEMENT"||e.orderStatus==="CAPTURE",s=r?"#10B981":"#F59E0B",o=r?"#ECFDF5":"#FFFBEB",d=r?"LUNAS":e.orderStatus||"PENDING";return`
      <div class="wa-contact-card ${n?"active":""}" onclick="selectWhatsAppContactByOrderId('${e.orderId}')">
        <div class="wa-avatar" style="width: 38px; height: 38px; font-size: 0.85rem; background: ${r?"#22C55E":"#64748B"};">
          ${i}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <div style="font-weight: 700; font-size: 0.88rem; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${c(e.customerName)}
            </div>
            <span style="font-size: 0.68rem; background: ${o}; color: ${s}; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
              ${d}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #64748B;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${c(e.ticketName)} • ${c(e.customerPhone)}
            </span>
            ${e.whatsappSent?'<i class="fa-solid fa-check-double" style="color: #38BDF8; font-size: 0.75rem;" title="Terkirim via WhatsApp"></i>':""}
          </div>
        </div>
      </div>
    `}).join("")}}window.selectWhatsAppContactByOrderId=function(t){const a=W.find(e=>e.orderId===t);a&&Me(a)};function Me(t){N=t,ve(W);const a=document.getElementById("waActiveName"),e=document.getElementById("waActivePhone"),n=document.getElementById("waActiveBadge"),i=document.getElementById("waActiveAvatar"),r=document.getElementById("waChatMessagesBox");a&&(a.textContent=t.customerName),e&&(e.textContent=t.customerPhone),i&&(i.textContent=(t.customerName||"P").charAt(0).toUpperCase());const s=t.orderStatus==="SETTLEMENT"||t.orderStatus==="CAPTURE";if(n&&(n.innerHTML=`
      <span class="badge" style="background: ${s?"#ECFDF5":"#FFFBEB"}; color: ${s?"#059669":"#D97706"}; font-size: 0.7rem; padding: 2px 8px;">
        ${t.ticketName} • ${s?"Lunas":"Belum Bayar"}
      </span>
    `),r){const o=t.createdAt?new Date(t.createdAt).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}):"10:00";let d=`Halo ${t.customerName} 👋

Terima kasih telah mendaftar di *Tegal Run 2027*!

📋 *Detail Tiket Lari:*
• Kategori: ${t.ticketName}
• Order ID: ${t.midtransOrderId||t.orderId}
• Status: ${s?"✅ LUNAS (SETTLEMENT)":"⏳ MENUNGGU PEMBAYARAN"}
• Nomor BIB: ${t.bibNumbers||"-"}

${s?"🎉 E-Tiket PDF resmi dan QR Check-in Anda telah terverifikasi.":"Silakan selesaikan pembayaran untuk mengamankan slot race Anda."}

Salam,
*Komite Resmi Tegal Run 2027*`;r.innerHTML=`
      <div class="wa-system-pill">
        <i class="fa-solid fa-lock"></i> Sesi chat langsung WhatsApp Web Server (Multi-Device Engine)
      </div>
      <div class="wa-bubble wa-bubble-out">
        ${c(d).replace(/\n/g,"<br>")}
        <div class="wa-bubble-time">
          <span>${o}</span>
          <i class="fa-solid fa-check-double" style="color: #38BDF8;"></i>
        </div>
      </div>
    `,r.scrollTop=r.scrollHeight}}async function At(){var i;const t=document.getElementById("waDirectChatInput"),a=(i=t==null?void 0:t.value)==null?void 0:i.trim();if(!a){l("warning","Pesan Kosong","Tuliskan teks pesan WhatsApp terlebih dahulu.");return}if(!N||!N.customerPhone){l("warning","Pilih Peserta","Pilih kontak peserta terlebih dahulu dari daftar di sebelah kiri.");return}const e=document.getElementById("btnSendWaDirectMsg"),n=e==null?void 0:e.innerHTML;e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const r=await y("/admin/notifications/whatsapp/send-direct",{method:"POST",body:JSON.stringify({phoneNumber:N.customerPhone,message:a})});if(r&&r.status==="success"){l("success","Terkirim","Pesan WhatsApp berhasil terkirim ke "+N.customerPhone);const s=document.getElementById("waChatMessagesBox");if(s){const o=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}),d=document.createElement("div");d.className="wa-bubble wa-bubble-out",d.innerHTML=`
          ${c(a).replace(/\n/g,"<br>")}
          <div class="wa-bubble-time">
            <span>${o}</span>
            <i class="fa-solid fa-check-double" style="color: #38BDF8;"></i>
          </div>
        `,s.appendChild(d),s.scrollTop=s.scrollHeight}t&&(t.value="")}else l("error","Gagal Kirim",(r==null?void 0:r.message)||"Gagal mengirim pesan.")}catch(r){l("error","Kesalahan",r.message)}finally{e&&(e.disabled=!1,e.innerHTML=n)}}function It(){const t=document.getElementById("waQuickTemplateSelect"),a=document.getElementById("waDirectChatInput");if(!t||!a)return;const e=t.value;if(!e)return;const n=N||{customerName:"Peserta",ticketName:"Tegal Run 2027",midtransOrderId:"TR-ORD-001",bibNumbers:"10K-001",totalAmount:25e4};e==="PAID_TICKET"?a.value=`Halo ${n.customerName},

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

Terima kasih telah menjadi bagian dari Tegal Run 2027! Semangat berlatih dan jaga kesehatan menuju garis start. Jika membutuhkan bantuan, hubungi kami di sini. Salam Pelari! 🏅`)}async function ka(t){if(!N){l("warning","Pilih Peserta","Pilih kontak peserta terlebih dahulu.");return}try{const a=await y("/admin/notifications/dispatch-single",{method:"POST",body:JSON.stringify({orderId:N.orderId})});a&&a.status==="success"?(l("success","Terkirim",`Notifikasi berhasil diproses ke ${N.customerName}.`),N.whatsappSent=!0,ve(W),Me(N)):l("error","Gagal Kirim",(a==null?void 0:a.message)||"Gagal mengirim notifikasi.")}catch(a){l("error","Kesalahan",a.message)}}let Ie={items:[],stats:{}};async function X(){var i,r;const t=document.getElementById("notifLogsTableBody");t&&(t.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
          <i class="fa-solid fa-spinner fa-spin"></i> Memuat log pengiriman notifikasi...
        </td>
      </tr>
    `);const a=(((i=document.getElementById("searchNotifLogs"))==null?void 0:i.value)||"").trim(),e=((r=document.getElementById("filterNotifDeliveryStatus"))==null?void 0:r.value)||"",n=new URLSearchParams;a&&n.append("search",a),e&&n.append("status",e);try{const s=await y(`/admin/notifications/logs?${n.toString()}`);if(s&&s.status==="success"&&s.data){Ie.items=s.data.items||[],Ie.stats=s.data.stats||{};const o=document.getElementById("kpiNotifTotalOrders"),d=document.getElementById("kpiNotifSentCount"),g=document.getElementById("kpiNotifPendingCount"),f=document.getElementById("kpiNotifDispatchMode");o&&(o.textContent=s.data.stats.totalOrders||0),d&&(d.textContent=s.data.stats.sentCount||0),g&&(g.textContent=s.data.stats.pendingCount||0),f&&(f.textContent=s.data.stats.dispatchMode==="MANUAL"?"MANUAL (ADMIN)":"OTOMATIS (INSTANT)",f.style.color=s.data.stats.dispatchMode==="MANUAL"?"#F59E0B":"#10B981");const m=await y("/admin/notifications/whatsapp/session"),u=document.getElementById("kpiNotifSessionStatus");u&&(m!=null&&m.data)&&(m.data.status==="CONNECTED"?u.innerHTML=`<span style="color: #10B981;"><i class="fa-solid fa-circle-check"></i> WA Web Online (${c(m.data.connectedNumber||"Aktif")})</span>`:u.innerHTML='<span style="color: #EF4444;"><i class="fa-solid fa-circle-xmark"></i> WA Web Terputus</span>'),Tt(Ie.items)}}catch(s){t&&(t.innerHTML=`
        <tr>
          <td colspan="10" style="text-align: center; padding: 25px; color: #EF4444;">
            <i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat log notifikasi: ${c(s.message)}
          </td>
        </tr>
      `)}}function Tt(t){const a=document.getElementById("notifLogsTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 35px; color: var(--color-text-muted);">
          <i class="fa-solid fa-inbox" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
          Tidak ada data pesanan atau log pengiriman yang cocok.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{let i='<span class="badge" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A;"><i class="fa-solid fa-clock"></i> Belum Dikirim</span>';e.whatsappSent?i='<span class="badge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;"><i class="fa-solid fa-circle-check"></i> Terkirim (WA)</span>':e.deliveryStatus==="FAILED"&&(i='<span class="badge" style="background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA;"><i class="fa-solid fa-circle-xmark"></i> Gagal</span>');let r='<span class="badge" style="background:#F8FAFC;color:#64748B;border:1px solid #E2E8F0;"><i class="fa-solid fa-minus"></i> -</span>';e.emailSent&&(r='<span class="badge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;"><i class="fa-solid fa-envelope-circle-check"></i> Terkirim</span>');const o=e.orderStatus==="SETTLEMENT"||e.orderStatus==="CAPTURE"?'<span class="badge" style="background:#ECFDF5;color:#047857;font-weight:700;">LUNAS</span>':'<span class="badge" style="background:#FFFBEB;color:#B45309;font-weight:700;">PENDING</span>',d=e.lastDispatchedAt?new Date(e.lastDispatchedAt).toLocaleString("id-ID",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):'<span style="color: #94A3B8;">Belum Pernah</span>';return`
      <tr>
        <td>${n+1}</td>
        <td><code>${c(e.midtransOrderId||e.orderId.slice(0,10))}</code></td>
        <td><strong>${c(e.customerName)}</strong></td>
        <td>
          <div style="font-size: 0.82rem;">
            <div><i class="fa-brands fa-whatsapp" style="color: #25D366;"></i> ${c(e.customerPhone)}</div>
            <div style="color: #64748B; font-size: 0.76rem;"><i class="fa-solid fa-envelope" style="color: #38BDF8;"></i> ${c(e.customerEmail)}</div>
          </div>
        </td>
        <td>
          <span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;">${c(e.ticketCategory)}</span>
          <div style="font-size: 0.74rem; color: #64748B; margin-top: 2px;">BIB: ${c(e.bibNumbers)}</div>
        </td>
        <td>${o}</td>
        <td>${i}</td>
        <td>${r}</td>
        <td style="font-size: 0.78rem;">${d}</td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn btn-sm ${e.whatsappSent?"btn-secondary":"btn-primary"} btn-dispatch-single" data-id="${e.orderId}" data-name="${c(e.customerName)}" title="Kirim Notifikasi via WhatsApp & Email">
              <i class="fa-solid fa-paper-plane"></i> ${e.whatsappSent?"Kirim Ulang":"Kirim"}
            </button>
            <a href="/e-ticket.html?orderId=${e.orderId}" target="_blank" class="btn btn-secondary btn-sm" title="Lihat E-Tiket Digital PDF">
              <i class="fa-solid fa-file-pdf"></i>
            </a>
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-dispatch-single").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");St(n,i,e)})})}}async function St(t,a,e){e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const n=await y("/admin/notifications/dispatch-single",{method:"POST",body:JSON.stringify({orderId:t})});n&&n.status==="success"?(l("success","Terkirim!",`Notifikasi tiket untuk ${a||"peserta"} berhasil dikirim.`),X()):l("error","Gagal Mengirim",(n==null?void 0:n.message)||"Pengiriman notifikasi gagal.")}catch(n){l("error","Kesalahan",n.message)}finally{e&&(e.disabled=!1,e.innerHTML='<i class="fa-solid fa-paper-plane"></i> Kirim')}}async function Ft(){if(!await C({title:"Kirim Notifikasi Massal?",message:"Apakah Anda ingin mengirimkan notifikasi tiket (WhatsApp & Email) untuk SEMUA peserta yang berstatus Lunas / Menunggu Pembayaran?",confirmText:"Ya, Kirim Sekarang",type:"warning"}))return;const a=document.getElementById("btnBatchSendNotif"),e=a==null?void 0:a.innerHTML;a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Memproses Batch...');try{const n=await y("/admin/notifications/dispatch-batch",{method:"POST"});n&&n.status==="success"?(l("success","Batch Selesai",n.message||"Notifikasi massal berhasil diproses."),X()):l("error","Gagal",(n==null?void 0:n.message)||"Gagal memproses pengiriman batch.")}catch(n){l("error","Kesalahan",n.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}let P=null,z=null,Z=null,de=null,ue=null;if(typeof window<"u"&&"BarcodeDetector"in window)try{ue=new window.BarcodeDetector({formats:["qr_code","code_128","ean_13"]})}catch{ue=null}async function he(){try{const t=await y("/admin/racepack/stats");if(t&&t.status==="success"&&t.data){const a=t.data,e=document.getElementById("rpcKpiCheckedIn"),n=document.getElementById("rpcKpiRemaining"),i=document.getElementById("rpcKpiPaidTotal"),r=document.getElementById("rpcKpiPercentage");e&&(e.textContent=a.checkedInCount),n&&(n.textContent=a.remainingToCollect),i&&(i.textContent=a.paidParticipants),r&&(r.textContent=`${a.percentage}% dari peserta lunas`)}}catch(t){console.warn("Gagal memuat statistik racepack:",t)}}async function ae(t){var r;if(!t||!String(t).trim())return;const a=String(t).trim(),e=document.getElementById("rpcManualSearchInput");if(e)if(a.includes("|")){const s=a.split("|").map(o=>o.trim()).filter(Boolean);e.value=s[2]||s[1]||a}else e.value=a;const n=document.getElementById("btnRpcSearchSubmit"),i=n?n.innerHTML:"";n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const s=await y(`/admin/racepack/verify/${encodeURIComponent(a)}`);s&&s.status==="success"&&s.data?(P=s.data,ke(s.data),l("success","E-Tiket Ditemukan",`Data pelari: ${(r=s.data.participant)==null?void 0:r.fullNameKtp}`)):l("error","Tidak Ditemukan",(s==null?void 0:s.message)||"Data peserta tidak ditemukan.")}catch(s){l("error","Gagal Verifikasi",s.message||"Terjadi kesalahan sistem.")}finally{n&&(n.disabled=!1,n.innerHTML=i)}}function ke(t){var A,I,S,F,M,$,O,K,H;const a=document.getElementById("rpcEmptyState"),e=document.getElementById("rpcDetailsState"),n=document.getElementById("rpcMasterState");if(t.isMaster&&Array.isArray(t.participants)){a&&(a.style.display="none"),e&&(e.style.display="none"),n&&(n.style.display="block",wt(t,n));return}n&&(n.style.display="none"),a&&(a.style.display="none"),e&&(e.style.display="block");const i=t.participant,r=t.isPaid,s=t.racepack,o=document.getElementById("rpcPaymentBanner"),d=document.getElementById("rpcPaymentIcon"),g=document.getElementById("rpcPaymentTitle"),f=document.getElementById("rpcPaymentSub"),m=document.getElementById("rpcPaymentBadge"),u=document.getElementById("btnConfirmRpcCheckin");if(o&&d&&g&&m)if(r)o.style.background="#F0FDF4",o.style.border="1px solid #BBF7D0",o.style.color="#15803D",d.innerHTML='<i class="fa-solid fa-circle-check" style="color: #22C55E;"></i>',g.textContent="PEMBAYARAN TERVERIFIKASI & LUNAS",f&&(f.textContent=`Status Midtrans: ${((A=i.order)==null?void 0:A.status)||"SETTLEMENT"} • Berhak mengambil racepack resmi.`),m.style.background="#DCFCE7",m.style.color="#15803D",m.textContent="LUNAS (PAID)",u&&(u.disabled=!1,u.style.opacity="1",u.style.cursor="pointer");else{const B=((I=i.order)==null?void 0:I.status)==="PENDING";o.style.background=B?"#FFFBEB":"#FEF2F2",o.style.border=`1px solid ${B?"#FDE68A":"#FECACA"}`,o.style.color=B?"#B45309":"#B91C1C",d.innerHTML=B?'<i class="fa-solid fa-clock" style="color: #F59E0B;"></i>':'<i class="fa-solid fa-triangle-exclamation" style="color: #EF4444;"></i>',g.textContent=B?"PERINGATAN: PEMBAYARAN MASIH MENUNGGU (PENDING)":`DIBATALKAN (${((S=i.order)==null?void 0:S.status)||"EXPIRED"})`,f&&(f.textContent="DILARANG menyerahkan racepack sebelum pembayaran berstatus LUNAS."),m.style.background=B?"#FEF3C7":"#FEE2E2",m.style.color=B?"#92400E":"#991B1B",m.textContent=((F=i.order)==null?void 0:F.status)||"BELUM LUNAS",u&&(u.disabled=!0,u.style.opacity="0.6",u.style.cursor="not-allowed")}const p=(B,L)=>{const _=document.getElementById(B);_&&(_.textContent=L||"-")};p("rpcFullName",i.fullNameKtp),p("rpcBibNumber",i.bibNumber||"BELUM ADA"),p("rpcBibName",i.bibName||i.fullNameKtp),p("rpcNik",i.nik),p("rpcGender",i.gender==="MALE"?"LAKI-LAKI":"PEREMPUAN"),p("rpcBloodType",i.bloodType||"O"),p("rpcEventCategory",`Kategori ${((M=i.event)==null?void 0:M.category)||"10K"}`),p("rpcPhone",((O=($=i.order)==null?void 0:$.user)==null?void 0:O.phoneNumber)||"-"),p("rpcEmergency",`${i.emergencyContactName} (${i.emergencyContactPhone})`),p("rpcOrderId",((K=i.order)==null?void 0:K.midtransOrderId)||i.orderId);const h=i.selectedSize||"M";p("rpcJerseyBadge",`Ukuran Jersey: ${h}`),p("chkJerseySizeText",h),p("chkJerseyTypeText",((H=i.jersey)==null?void 0:H.name)||"Dry-Fit Official Tegal Run"),p("chkBibText",i.bibNumber||"Auto-assigned");const k=document.getElementById("rpcAlreadyCheckedInBox"),x=document.getElementById("rpcCheckinTimestampText");if(s&&s.checkedIn){if(k&&(k.style.display="block"),x){const B=new Date(s.checkedInAt).toLocaleString("id-ID");x.textContent=`Diserahkan pada: ${B} WIB oleh Petugas: ${s.checkedInBy||"Admin"}`}u&&(u.innerHTML='<i class="fa-solid fa-arrows-rotate"></i> Perbarui Catatan Serah Terima',u.className="btn btn-secondary btn-sm")}else k&&(k.style.display="none"),u&&(s!=null&&s.queued?(u.innerHTML='<i class="fa-solid fa-check"></i> Data Sudah Dikirim ke Antrean',u.className="btn btn-secondary btn-sm",u.disabled=!0,u.style.opacity="0.7",u.style.cursor="not-allowed"):(u.innerHTML='<i class="fa-solid fa-paper-plane" style="font-size: 1.1rem;"></i> Kirim Data ke Live View Antrean',u.className="btn btn-primary btn-glow",u.disabled=!r))}function wt(t,a){var d,g,f;const e=t.order,n=t.participants||[],i=t.isPaid,r=e.midtransOrderId||e.id,s=n.every(m=>{var u;return(u=m.racepack)==null?void 0:u.checkedIn});a.innerHTML=`
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
      <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0 0 4px 0;">ORDER REF: ${c(r)}</h3>
      <p style="font-size: 0.8rem; color: #E0E7FF; margin: 0;">Pemesan: <strong>${c(((d=e.user)==null?void 0:d.fullName)||"-")}</strong> (${c(((g=e.user)==null?void 0:g.phoneNumber)||((f=e.user)==null?void 0:f.email)||"-")})</p>
    </div>

    <!-- Participant List Table -->
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
        <span>Daftar Peserta dalam Pesanan (${n.length} Orang):</span>
        <span style="font-size: 0.78rem; font-weight: 600; color: #64748B;">
          ${n.filter(m=>{var u;return(u=m.racepack)==null?void 0:u.checkedIn}).length} / ${n.length} Sudah Diambil
        </span>
      </h4>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${n.map((m,u)=>{var h,k,x;const p=(h=m.racepack)==null?void 0:h.checkedIn;return`
            <div style="background: ${p?"#F0FDF4":"#F8FAFC"}; border: 1px solid ${p?"#BBF7D0":"#E2E8F0"}; border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <strong style="color: #0F172A; font-size: 0.95rem;">#${u+1} ${c(m.fullNameKtp)}</strong>
                  <span style="background: #E0F2FE; color: #0369A1; font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
                    ${c(((k=m.event)==null?void 0:k.category)||"10K")}
                  </span>
                </div>
                <div style="font-size: 0.76rem; color: #64748B; margin-top: 3px;">
                  BIB: <strong style="color: #FF6B00; font-family: monospace;">${c(m.bibNumber||"Saat RPC")}</strong> &bull; Size: <strong>${c(m.selectedSize||"M")}</strong> (${c(((x=m.jersey)==null?void 0:x.type)||"Jersey")})
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge" style="background: ${p?"#DCFCE7":"#FEF3C7"}; color: ${p?"#15803D":"#92400E"}; font-size: 0.72rem; font-weight: 800;">
                  <i class="fa-solid ${p?"fa-check":"fa-clock"}"></i> ${p?"Sudah Diambil":"Belum Diambil"}
                </span>
                <button type="button" class="btn btn-outline btn-sm btnViewSingleRunner" data-participant-id="${m.id}" style="font-size: 0.74rem; padding: 4px 8px;">
                  Detail
                </button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>

    <!-- Batch Checkin Button -->
    <div style="background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 16px; text-align: center;">
      ${s?`
        <div style="color: #15803D; font-weight: 800; font-size: 0.95rem; margin-bottom: 6px;">
          <i class="fa-solid fa-circle-check" style="font-size: 1.5rem; display: block; margin-bottom: 6px; color: #22C55E;"></i>
          Seluruh Peserta (${n.length}) Sudah Menyelesaikan Check-in Racepack!
        </div>
      `:`
        <button type="button" class="btn btn-primary btn-glow" id="btnBatchCheckinAll" style="width: 100%; padding: 14px; font-size: 1rem; font-weight: 800;" ${i?"":'disabled style="opacity: 0.5;"'}>
          <i class="fa-solid fa-paper-plane" style="font-size: 1.2rem;"></i> Kirim Peserta Belum Diambil ke Antrean
        </button>
        <span style="font-size: 0.75rem; color: #64748B; margin-top: 8px; display: block;">
          Konfirmasi serah terima setiap peserta dilakukan pada halaman Live View Antrean Racepack.
        </span>
      `}
    </div>
  `,a.querySelectorAll(".btnViewSingleRunner").forEach(m=>{m.addEventListener("click",()=>{const u=m.getAttribute("data-participant-id"),p=n.find(h=>h.id===u);p&&ke({isMaster:!1,participant:p,isPaid:i,racepack:p.racepack||{checkedIn:!1}})})});const o=document.getElementById("btnBatchCheckinAll");o&&o.addEventListener("click",()=>Ct(t))}async function Ct(t){const e=(t.participants||[]).filter(r=>{var s;return!((s=r.racepack)!=null&&s.checkedIn)}),n=document.getElementById("btnBatchCheckinAll"),i=n?n.innerHTML:"";n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mengirim peserta ke antrean...');try{let r=0;for(const s of e){const o=await y("/admin/racepack/queue",{method:"POST",body:JSON.stringify({participantId:s.id})});if(!o||o.status!=="success")throw new Error(`${(o==null?void 0:o.message)||"Gagal mengirim peserta ke antrean."} (${r} peserta sudah terkirim)`);r+=1}l("success","Peserta Dikirim ke Antrean",`${r} peserta dikirim ke Live View Antrean Racepack.`),ae(t.order.midtransOrderId||t.order.id)}catch(r){l("error","Pengiriman Antrean Gagal",r.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}async function Pt(){if(!P||!P.participant){l("warning","Peringatan","Tidak ada data peserta yang sedang dipilih.");return}const t=P.participant;if(!P.isPaid){l("error","Dilarang","Pembayaran tiket belum lunas!");return}const e=document.getElementById("btnConfirmRpcCheckin"),n=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mengirim ke antrean...');try{const i=await y("/admin/racepack/queue",{method:"POST",body:JSON.stringify({participantId:t.id})});i&&i.status==="success"?(l("success","Dikirim ke Antrean",`Data peserta ${t.fullNameKtp} dikirim. Konfirmasi serah terima di Live View Antrean.`),P.racepack={...P.racepack,queued:!0},ke(P)):l("error","Gagal Mengirim",(i==null?void 0:i.message)||"Terjadi kesalahan")}catch(i){l("error","Kesalahan Pengiriman",i.message)}finally{e&&(e.disabled=!1,e.innerHTML=n)}}async function Nt(){if(!(!P||!P.participant||!await C({title:"Batalkan Status Check-in?",message:`Apakah Anda yakin ingin membatalkan status pengambilan racepack untuk "${P.participant.fullNameKtp}"?`,confirmText:"Ya, Batalkan Check-in",type:"danger"})))try{const a=await y("/admin/racepack/revert",{method:"POST",body:JSON.stringify({participantId:P.participant.id})});a&&a.status==="success"?(l("success","Dibatalkan","Status pengambilan racepack berhasil dibatalkan."),P.racepack={checkedIn:!1},ke(P),he(),se()):l("error","Gagal",a==null?void 0:a.message)}catch(a){l("error","Kesalahan",a.message)}}async function Lt(){document.getElementById("rpcCameraContainer");const t=document.getElementById("rpcCameraPlaceholder"),a=document.getElementById("rpcScanCrosshair"),e=document.getElementById("rpcCameraStatusBadge"),n=document.getElementById("btnStartRpcCamera"),i=document.getElementById("btnStopRpcCamera");if(typeof window<"u"&&window.Html5Qrcode)try{if(t&&(t.style.display="none"),a&&(a.style.display="none"),z){try{await z.stop()}catch{}z=null}z=new window.Html5Qrcode("rpcCameraContainer");const r={fps:10,qrbox:{width:220,height:220},aspectRatio:1};await z.start({facingMode:"environment"},r,s=>{wa(),Ee(),ae(s)},()=>{}),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"),e&&(e.textContent="Kamera Live Aktif",e.style.background="#DCFCE7",e.style.color="#15803D"),l("success","Kamera Aktif","Arahkan kamera ke QR Code E-Tiket pelari.");return}catch(r){console.warn("Html5Qrcode live camera start failed, trying fallback stream...",r)}if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){l("warning","Live Stream Memerlukan HTTPS",'Browser HP Anda membatasi live camera pada HTTP lokal. Silakan gunakan tombol "Foto E-Tiket" di samping.'),Ea();return}try{const r=document.getElementById("rpcVideoElem"),s=document.getElementById("rpcCameraPlaceholder");let o=null;try{o=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:!1})}catch{o=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1})}Z=o,r&&(r.srcObject=Z,r.setAttribute("playsinline","true"),await r.play(),r.style.display="block"),s&&(s.style.display="none"),a&&(a.style.display="block"),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"),e&&(e.textContent="Kamera Aktif",e.style.background="#DCFCE7",e.style.color="#15803D"),l("success","Kamera Aktif","Arahkan kamera ke QR Code E-Tiket pelari."),Fa()}catch(r){console.error("Camera access error:",r),l("error","Izin Kamera Ditolak / Gagal",'Tidak dapat mengakses live stream kamera. Silakan gunakan tombol "Foto E-Tiket (Kamera HP)".'),Ea()}}async function Fa(){const t=document.getElementById("rpcVideoElem");if(!(!t||!Z||t.paused||t.ended)){if(t.readyState===t.HAVE_ENOUGH_DATA&&ue)try{const a=await ue.detect(t);if(a&&a.length>0&&a[0].rawValue){wa(),Ee(),ae(a[0].rawValue);return}}catch{}de=setTimeout(Fa,200)}}async function Ee(){if(de&&(clearTimeout(de),de=null),z){try{await z.stop(),z.clear()}catch{}z=null}Z&&(Z.getTracks().forEach(s=>s.stop()),Z=null);const t=document.getElementById("rpcVideoElem"),a=document.getElementById("rpcCameraPlaceholder"),e=document.getElementById("rpcScanCrosshair"),n=document.getElementById("rpcCameraStatusBadge"),i=document.getElementById("btnStartRpcCamera"),r=document.getElementById("btnStopRpcCamera");t&&(t.pause(),t.srcObject=null,t.style.display="none"),a&&(a.style.display="block"),e&&(e.style.display="none"),i&&(i.style.display="inline-flex"),r&&(r.style.display="none"),n&&(n.textContent="Standby",n.style.background="#F1F5F9",n.style.color="#475569")}function Ea(){const t=document.getElementById("rpcNativeCameraInput");t&&(t.value="",t.click())}function wa(){try{const t=new(window.AudioContext||window.webkitAudioContext),a=t.createOscillator(),e=t.createGain();a.connect(e),e.connect(t.destination),a.type="sine",a.frequency.setValueAtTime(880,t.currentTime),e.gain.setValueAtTime(.3,t.currentTime),a.start(),a.stop(t.currentTime+.15)}catch{}}window.verifyRacepackByCode=ae;let ce=null,Te=!1;function Dt(t){const a=document.getElementById("racepackQueueContainer");if(a){if(!t.length){a.innerHTML='<div class="glass-card" style="padding:28px; text-align:center; color:#64748B;"><i class="fa-solid fa-inbox" style="font-size:2rem; display:block; margin-bottom:8px;"></i>Belum ada peserta di antrean.</div>';return}a.innerHTML=t.map((e,n)=>{var s,o,d,g,f,m,u,p,h,k,x,A,I,S,F;const i=(s=e.queue)!=null&&s.queuedAt?new Date(e.queue.queuedAt).toLocaleString("id-ID"):"-",r=((o=e.event)==null?void 0:o.ticketName)||((d=e.event)==null?void 0:d.category)||"-";return`
      <article class="glass-card" style="padding:18px; border:1px solid #E2E8F0; background:#FFFFFF; border-radius:14px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
          <div>
            <span class="badge" style="background:#FFF7ED; color:#C2410C; font-weight:800;">ANTREAN #${n+1}</span>
            <h4 style="margin:8px 0 4px; color:#0F172A;">${c(e.fullNameKtp)}</h4>
            <div style="color:#475569; font-size:.86rem;">
              ${c(r)} · BIB ${c(e.bibNumber||"Belum diterbitkan")} · Jersey ${c(e.selectedSize||"-")}
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-glow btn-confirm-queued-racepack" data-id="${c(e.id)}" data-name="${c(e.fullNameKtp)}">
            <i class="fa-solid fa-box-check"></i> Konfirmasi &amp; Serahkan Racepack
          </button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:8px; margin-top:14px; font-size:.82rem; color:#475569;">
          <div><strong>NIK:</strong> ${c(e.nik||"-")}</div>
          <div><strong>Jenis kelamin / golongan darah:</strong> ${c(e.gender||"-")} / ${c(e.bloodType||"-")}</div>
          <div><strong>Telepon peserta:</strong> ${c(e.phoneNumber||((f=(g=e.order)==null?void 0:g.user)==null?void 0:f.phoneNumber)||"-")}</div>
          <div><strong>Kontak darurat:</strong> ${c(e.emergencyContactName||"-")} (${c(e.emergencyContactPhone||"-")})</div>
          <div><strong>Nama BIB:</strong> ${c(e.bibName||"-")}</div>
          <div><strong>Komunitas:</strong> ${c(e.communityName||"-")}</div>
          <div><strong>Masuk antrean:</strong> ${c(i)}</div>
          <div><strong>Dikirim petugas:</strong> ${c(((m=e.queue)==null?void 0:m.queuedBy)||"-")}</div>
        </div>
        <details style="margin-top:12px; color:#475569; font-size:.82rem;">
          <summary style="cursor:pointer; font-weight:700;">Informasi lengkap peserta &amp; tiket</summary>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:8px; margin-top:10px;">
            <div><strong>Tanggal lahir:</strong> ${c(e.birthDate?new Date(e.birthDate).toLocaleDateString("id-ID"):"-")}</div>
            <div><strong>Tempat lahir:</strong> ${c(e.birthPlace||"-")}</div>
            <div><strong>Alamat:</strong> ${c(e.fullAddress||"-")}</div>
            <div><strong>Riwayat medis:</strong> ${c(e.medicalHistory||"-")}</div>
            <div><strong>Pemesan:</strong> ${c(((p=(u=e.order)==null?void 0:u.user)==null?void 0:p.fullName)||"-")}</div>
            <div><strong>Email pemesan:</strong> ${c(((k=(h=e.order)==null?void 0:h.user)==null?void 0:k.email)||"-")}</div>
            <div><strong>Order:</strong> ${c(((x=e.order)==null?void 0:x.midtransOrderId)||((A=e.order)==null?void 0:A.id)||"-")}</div>
            <div><strong>Status pembayaran:</strong> ${c(((I=e.order)==null?void 0:I.status)||"-")}</div>
            <div><strong>Nama / jenis jersey:</strong> ${c(((S=e.jersey)==null?void 0:S.name)||"-")} / ${c(((F=e.jersey)==null?void 0:F.type)||"-")}</div>
          </div>
        </details>
      </article>
    `}).join(""),a.querySelectorAll(".btn-confirm-queued-racepack").forEach(e=>{e.addEventListener("click",()=>Rt(e))})}}async function re(){var t;if(!(Te||!((t=document.getElementById("pane-racepack-view"))!=null&&t.classList.contains("active")))){Te=!0;try{const a=await y("/admin/racepack/queue");if(!a||a.status!=="success"||!Array.isArray(a.data))throw new Error((a==null?void 0:a.message)||"Gagal memuat data antrean.");Dt(a.data);const e=document.getElementById("racepackQueueLastUpdated");e&&(e.textContent=`Diperbarui ${new Date().toLocaleTimeString("id-ID")}`)}catch(a){const e=document.getElementById("racepackQueueContainer");e&&!e.querySelector(".btn-confirm-queued-racepack")&&(e.innerHTML=`<div class="glass-card" style="padding:20px; color:#B91C1C;">${c(a.message)}</div>`),console.error("Gagal memuat antrean racepack:",a)}finally{Te=!1}}}async function Rt(t){const a=t.dataset.id,e=t.dataset.name||"peserta ini";if(await C({title:"Konfirmasi Serah Terima Racepack",message:`Pastikan racepack sudah diserahkan kepada ${e}. Lanjutkan check-in?`,confirmText:"Ya, Serahkan Racepack",type:"warning"})){t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const i=await y("/admin/racepack/checkin",{method:"POST",body:JSON.stringify({participantId:a,items:["Nomor BIB","Jersey","Timing Chip","Drawstring Bag & Race Guide","Suplemen & Refreshment"],notes:"Serah terima dikonfirmasi melalui tampilan antrean racepack."})});if(!i||i.status!=="success")throw new Error((i==null?void 0:i.message)||"Check-in gagal.");l("success","Racepack Diserahkan",i.message),await Promise.all([re(),he()])}catch(i){l("error","Gagal Check-in",i.message),await re()}}}function Mt(){Ca(),re(),ce=setInterval(re,5e3)}function Ca(){ce&&clearInterval(ce),ce=null}let $t=null;function Pa(){var o,d,g,f;const t=((o=document.getElementById("bibInputPrefix"))==null?void 0:o.value)||"",a=parseInt(((d=document.getElementById("bibInputDigitLength"))==null?void 0:d.value)||"4",10),e=parseInt(((g=document.getElementById("bibInputStartNumber"))==null?void 0:g.value)||"1001",10),n=((f=document.getElementById("bibInputSuffix"))==null?void 0:f.value)||"",i=String(e).padStart(a,"0"),r=`${t}${i}${n}`,s=document.getElementById("bibFormatPreviewText");s&&(s.textContent=r)}async function xe(){try{const t=await y("/admin/bib/settings");if(t&&t.status==="success"&&t.data){$t=t.data;const{settings:a,qrPrefix:e,unassignedCount:n,assignedCount:i}=t.data,r=document.getElementById("kpiBibAssigned"),s=document.getElementById("kpiBibUnassigned"),o=document.getElementById("kpiQrFormatPreview");r&&(r.textContent=i),s&&(s.textContent=n),o&&(o.textContent=`${e||"TEGALRUN"}|...`),document.querySelectorAll('input[name="bibTiming"]').forEach(k=>{k.value===a.timing&&(k.checked=!0)});const g=document.getElementById("bibInputPrefix"),f=document.getElementById("bibInputDigitLength"),m=document.getElementById("bibInputStartNumber"),u=document.getElementById("bibInputSuffix");g&&(g.value=a.defaultPrefix||"10-"),f&&(f.value=a.digitLength||4),m&&(m.value=a.startNumber||1001),u&&(u.value=a.suffix||""),Pa();const p=document.getElementById("qrInputPrefix"),h=document.getElementById("qrPrefixExample");p&&(p.value=e||"TEGALRUN"),h&&(h.textContent=e||"TEGALRUN")}}catch(t){console.warn("Gagal memuat pengaturan BIB:",t)}try{const t=await y("/admin/settings/racepack-instructions");if(t&&t.status==="success"&&t.data){const a=document.getElementById("rpcInstructionsTitle"),e=document.getElementById("rpcInstructionsTextarea");a&&(a.value=t.data.title||"Petunjuk Pengambilan Racepack & Race Day:"),e&&Array.isArray(t.data.points)&&(e.value=t.data.points.join(`
`))}}catch(t){console.warn("Gagal memuat petunjuk racepack:",t)}try{const t=await y("/admin/settings/payment-fee");if(t&&t.status==="success"&&t.data){const{paymentTimerMinutes:a,feeEnabled:e,feeType:n,feeAmount:i}=t.data,r=document.getElementById("settingPaymentTimerMinutes"),s=document.getElementById("settingFeeEnabled"),o=document.getElementById("settingFeeType"),d=document.getElementById("settingFeeAmount"),g=document.getElementById("groupFeeConfig"),f=document.getElementById("badgeFeeStatus");r&&(r.value=a||30),s&&(s.checked=!!e,g&&(g.style.display=e?"block":"none"),f&&(f.textContent=e?"Aktif":"Nonaktif",f.style.background=e?"#DCFCE7":"#E2E8F0",f.style.color=e?"#166534":"#475569")),o&&(o.value=n||"PER_TRANSACTION"),d&&(d.value=i||0)}}catch(t){console.warn("Gagal memuat pengaturan biaya layanan & timer:",t)}}async function Ot(t){var g,f,m,u;t.preventDefault();const a=document.querySelector('input[name="bibTiming"]:checked'),e=a?a.value:"PAYMENT_SUCCESS",n=((g=document.getElementById("bibInputPrefix"))==null?void 0:g.value)||"",i=parseInt(((f=document.getElementById("bibInputDigitLength"))==null?void 0:f.value)||"4",10),r=parseInt(((m=document.getElementById("bibInputStartNumber"))==null?void 0:m.value)||"1001",10),s=((u=document.getElementById("bibInputSuffix"))==null?void 0:u.value)||"",o=document.getElementById("btnSaveBibSettings"),d=o?o.innerHTML:"";o&&(o.disabled=!0,o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const p=await y("/admin/bib/settings",{method:"PUT",body:JSON.stringify({timing:e,defaultPrefix:n,digitLength:i,startNumber:r,suffix:s})});p&&p.status==="success"?(l("success","Tersimpan",p.message||"Pengaturan penomoran BIB berhasil diperbarui."),xe()):l("error","Gagal",(p==null?void 0:p.message)||"Gagal menyimpan pengaturan BIB.")}catch(p){l("error","Terjadi Kesalahan",p.message)}finally{o&&(o.disabled=!1,o.innerHTML=d)}}async function Kt(){if(!await C({title:"Generate Nomor BIB Massal?",message:"Sistem akan mengenerate nomor BIB unik untuk seluruh peserta lunas yang belum memiliki nomor dada. Lanjutkan proses?",confirmText:"Ya, Generate Massal"}))return;const a=document.getElementById("btnTriggerBulkGenerate"),e=a?a.innerHTML:"";a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Memproses...');try{const n=await y("/admin/bib/bulk-generate",{method:"POST",body:JSON.stringify({})});n&&n.status==="success"?(l("success","Berhasil",n.message),xe()):l("error","Gagal",(n==null?void 0:n.message)||"Gagal generate nomor BIB.")}catch(n){l("error","Terjadi Kesalahan",n.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}async function Ht(t){var i;t.preventDefault();const a=((i=document.getElementById("qrInputPrefix"))==null?void 0:i.value)||"";if(!a.trim()){l("error","Validasi Gagal","Prefix QR code tidak boleh kosong.");return}const e=document.getElementById("btnSaveQrPrefix"),n=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const r=await y("/admin/settings/qr",{method:"PUT",body:JSON.stringify({prefix:a})});if(r&&r.status==="success"){l("success","Prefix Disimpan",r.message);const s=document.getElementById("qrPrefixExample"),o=document.getElementById("kpiQrFormatPreview");s&&(s.textContent=r.data.prefix),o&&(o.textContent=`${r.data.prefix}|...`)}else l("error","Gagal",(r==null?void 0:r.message)||"Gagal menyimpan prefix QR.")}catch(r){l("error","Terjadi Kesalahan",r.message)}finally{e&&(e.disabled=!1,e.innerHTML=n)}}async function _t(t){var s,o;t.preventDefault();const a=((s=document.getElementById("rpcInstructionsTitle"))==null?void 0:s.value)||"",n=(((o=document.getElementById("rpcInstructionsTextarea"))==null?void 0:o.value)||"").split(`
`).map(d=>d.trim()).filter(Boolean),i=document.getElementById("btnSaveRpcInstructions"),r=i?i.innerHTML:"";i&&(i.disabled=!0,i.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const d=await y("/admin/settings/racepack-instructions",{method:"PUT",body:JSON.stringify({title:a,points:n})});d&&d.status==="success"?l("success","Tersimpan","Petunjuk pengambilan racepack E-Tiket berhasil diperbarui."):l("error","Gagal",(d==null?void 0:d.message)||"Gagal menyimpan petunjuk.")}catch(d){l("error","Terjadi Kesalahan",d.message)}finally{i&&(i.disabled=!1,i.innerHTML=r)}}async function Ut(t){var o,d,g,f;t.preventDefault();const a=parseInt(((o=document.getElementById("settingPaymentTimerMinutes"))==null?void 0:o.value)||"30",10),e=((d=document.getElementById("settingFeeEnabled"))==null?void 0:d.checked)||!1,n=((g=document.getElementById("settingFeeType"))==null?void 0:g.value)||"PER_TRANSACTION",i=parseFloat(((f=document.getElementById("settingFeeAmount"))==null?void 0:f.value)||"0"),r=document.getElementById("btnSavePaymentFeeSettings"),s=r?r.innerHTML:"";r&&(r.disabled=!0,r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const m=await y("/admin/settings/payment-fee",{method:"PUT",body:JSON.stringify({paymentTimerMinutes:a,feeEnabled:e,feeType:n,feeAmount:i})});if(m&&m.status==="success"){l("success","Tersimpan","Pengaturan batas waktu pembayaran dan biaya layanan berhasil diperbarui.");const u=document.getElementById("badgeFeeStatus");u&&(u.textContent=e?"Aktif":"Nonaktif",u.style.background=e?"#DCFCE7":"#E2E8F0",u.style.color=e?"#166534":"#475569")}else l("error","Gagal",(m==null?void 0:m.message)||"Gagal menyimpan pengaturan.")}catch(m){l("error","Terjadi Kesalahan",m.message)}finally{r&&(r.disabled=!1,r.innerHTML=s)}}function zt(){var t,a,e,n,i,r,s;["bibInputPrefix","bibInputDigitLength","bibInputStartNumber","bibInputSuffix"].forEach(o=>{var d;(d=document.getElementById(o))==null||d.addEventListener("input",Pa)}),(t=document.getElementById("formBibGenerationSettings"))==null||t.addEventListener("submit",Ot),(a=document.getElementById("btnTriggerBulkGenerate"))==null||a.addEventListener("click",Kt),(e=document.getElementById("formQrPrefixSettings"))==null||e.addEventListener("submit",Ht),(n=document.getElementById("formRacepackInstructions"))==null||n.addEventListener("submit",_t),(i=document.getElementById("formPaymentFeeSettings"))==null||i.addEventListener("submit",Ut),(r=document.getElementById("settingFeeEnabled"))==null||r.addEventListener("change",o=>{const d=document.getElementById("groupFeeConfig"),g=document.getElementById("badgeFeeStatus");d&&(d.style.display=o.target.checked?"block":"none"),g&&(g.textContent=o.target.checked?"Aktif":"Nonaktif",g.style.background=o.target.checked?"#DCFCE7":"#E2E8F0",g.style.color=o.target.checked?"#166534":"#475569")}),(s=document.getElementById("btnRefreshBibSettings"))==null||s.addEventListener("click",xe)}async function Gt(){const t=document.getElementById("sidebarMount");if(t)try{t.innerHTML=dt,Wt()}catch(a){console.error("Sidebar load failed:",a)}}function Wt(){var t,a,e;if(b.profile){const n=document.getElementById("sidebarAdminFullName"),i=document.getElementById("sidebarAdminRole");n&&(n.textContent=b.profile.fullName),i&&(i.textContent=((t=b.profile.role)==null?void 0:t.name)||"ADMIN")}document.querySelectorAll(".sidebar-nav .nav-item").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-nav");i&&(Be(i),we())})}),(a=document.getElementById("btnCloseSidebar"))==null||a.addEventListener("click",we),(e=document.getElementById("btnSidebarLogout"))==null||e.addEventListener("click",fe),b.profile&&ee(b.profile)}function Be(t){if(b.profile&&b.profile.role){const s=b.profile.role.name||"",o=Array.isArray(b.profile.role.permissions)?b.profile.role.permissions:[];if(!(s==="SUPERADMIN"||o.includes("*"))&&t!=="dashboard"){const g=document.querySelector(`.sidebar-nav .nav-item[data-nav="${t}"]`),f=(g==null?void 0:g.getAttribute("data-page"))||`page:${t}`;if(!o.includes(f)){l("warning","Akses Dibatasi",`Role Anda (${s}) tidak memiliki izin mengakses modul ini.`);return}}}b.activeTab=t,document.querySelectorAll(".sidebar-nav .nav-item").forEach(s=>{s.getAttribute("data-nav")===t?s.classList.add("active"):s.classList.remove("active")}),document.querySelectorAll(".admin-tab-pane").forEach(s=>{s.classList.remove("active")});const a=document.getElementById(`pane-${t}`);a&&a.classList.add("active");const e={dashboard:{title:"Dashboard Overview",sub:"Portal Admin / Ringkasan Real-Time"},events:{title:"Manajemen Event & Kategori",sub:"Portal Admin / Manajemen Tiket Lomba"},participants:{title:"Manajemen Peserta",sub:"Portal Admin / Database Pelari & BIB"},racepack:{title:"Pengambilan Racepack & Check-in",sub:"Portal Admin / Validasi E-Tiket & Serah Terima RPC"},"racepack-view":{title:"Live View Antrean Racepack",sub:"Portal Admin / Pemantauan Antrean & Konfirmasi Serah Terima"},orders:{title:"Transaksi & Order",sub:"Portal Admin / Status Pembayaran Tiket"},countdown:{title:"Countdown & Status Event",sub:"Portal Admin / Konfigurasi Race Day"},"bib-settings":{title:"Pengaturan BIB & E-Tiket",sub:"Portal Admin / Aturan BIB, Format QR & Petunjuk"},cms:{title:"Konten Website & CMS",sub:"Portal Admin / Pengaturan Teks, Peta & Media"},routes:{title:"Manajemen Rute & Checkpoint",sub:"Portal Admin / Titik Kumpul & Water Station"},notifications:{title:"Konfigurasi Notifikasi & Gateway",sub:"Portal Admin / WhatsApp & Email Gateway"},"notif-logs":{title:"Log Pengiriman Notifikasi & Peserta",sub:"Portal Admin / WhatsApp & Email Delivery Tracking"},"whatsapp-web":{title:"WhatsApp Web Enterprise Console",sub:"Portal Admin / Real-Time Messaging & Session Hub"},admins:{title:"Kelola Admin & Hak Akses",sub:"Portal Admin / Manajemen RBAC Superadmin"},logs:{title:"Log Audit Sistem",sub:"Portal Admin / Rekam Jejak Keamanan"}},n=e[t]||e.dashboard,i=document.getElementById("pageTitle"),r=document.getElementById("pageBreadcrumb");i&&(i.textContent=n.title),r&&(r.textContent=n.sub),t==="cms"&&Ta(),t==="countdown"&&xa(),t==="bib-settings"&&xe(),t==="routes"&&Re(),t==="racepack"?he():Ee(),t==="racepack-view"?Mt():Ca(),t==="notifications"?(vt(),Se()):t==="whatsapp-web"?(Fe(),Se()):Sa(),t==="notif-logs"&&X()}function jt(){var t,a;(t=document.getElementById("adminSidebar"))==null||t.classList.add("open"),(a=document.getElementById("sidebarOverlay"))==null||a.classList.add("active")}function we(){var t,a;(t=document.getElementById("adminSidebar"))==null||t.classList.remove("open"),(a=document.getElementById("sidebarOverlay"))==null||a.classList.remove("active")}window.switchAdminTab=Be;let V="ALL";async function se(){var t,a,e,n;try{const i=await y("/admin/participants?limit=100");if(i.status==="success"){b.participants=Array.isArray(i.data)?i.data:((t=i.data)==null?void 0:t.participants)||[],qt(b.participants),ge();const r=document.getElementById("kpiTotalParticipants");r&&(r.textContent=((a=i.meta)==null?void 0:a.total)||((n=(e=i.data)==null?void 0:e.pagination)==null?void 0:n.total)||b.participants.length)}}catch(i){console.error("Failed to load participants:",i)}}function qt(t){const a=t.length;let e=0,n=0,i=0,r=0,s=0;t.forEach(d=>{var f,m;const g=((f=d.order)==null?void 0:f.status)||"PENDING";g==="SETTLEMENT"||g==="CAPTURE"||g==="PAID"?e++:g==="CANCEL"||g==="EXPIRE"||g==="DENY"||g==="REFUND"?i++:n++,(m=d.racepack)!=null&&m.checkedIn?r++:s++});const o=(d,g)=>{const f=document.getElementById(d);f&&(f.textContent=g)};o("countPartAll",a),o("countPartSettled",e),o("countPartPending",n),o("countPartCancelled",i),o("countPartRacepackDone",r),o("countPartRacepackPending",s)}function Jt(t){V=t,document.querySelectorAll(".participant-tabs-nav .part-tab-btn").forEach(n=>{n.getAttribute("data-tab")===t?n.className="btn btn-primary btn-sm part-tab-btn active":n.className="btn btn-outline btn-sm part-tab-btn"});const a={ALL:"Semua Peserta Terdaftar",SETTLED:"Pembayaran Sukses / Lunas (Lomba & Tiket Terverifikasi)",PENDING:"Menunggu Pembayaran (Pending Order)",CANCELLED:"Dibatalkan / Kadaluarsa / Refund",RACEPACK_DONE:"Racepack Sudah Diserahterimakan (Checked-in)",RACEPACK_PENDING:"Racepack Belum Diambil"},e=document.getElementById("participantActiveTabTitle");e&&(e.textContent=a[t]||"Semua Peserta Terdaftar"),ge()}function ge(){var i,r;const t=(((i=document.getElementById("searchParticipant"))==null?void 0:i.value)||"").toLowerCase(),a=((r=document.getElementById("filterParticipantCategory"))==null?void 0:r.value)||"";let e=b.participants||[];V==="SETTLED"?e=e.filter(s=>{var d;const o=((d=s.order)==null?void 0:d.status)||"PENDING";return o==="SETTLEMENT"||o==="CAPTURE"||o==="PAID"}):V==="PENDING"?e=e.filter(s=>{var o;return(((o=s.order)==null?void 0:o.status)||"PENDING")==="PENDING"}):V==="CANCELLED"?e=e.filter(s=>{var d;const o=((d=s.order)==null?void 0:d.status)||"PENDING";return o==="CANCEL"||o==="EXPIRE"||o==="DENY"||o==="REFUND"}):V==="RACEPACK_DONE"?e=e.filter(s=>{var o;return((o=s.racepack)==null?void 0:o.checkedIn)===!0}):V==="RACEPACK_PENDING"&&(e=e.filter(s=>{var o;return!((o=s.racepack)!=null&&o.checkedIn)})),a&&(e=e.filter(s=>{var o;return(((o=s.event)==null?void 0:o.category)||"").includes(a)})),t&&(e=e.filter(s=>{var o;return s.fullNameKtp.toLowerCase().includes(t)||s.bibName&&s.bibName.toLowerCase().includes(t)||s.bibNumber&&s.bibNumber.toLowerCase().includes(t)||s.nik.includes(t)||((o=s.order)==null?void 0:o.midtransOrderId)&&s.order.midtransOrderId.toLowerCase().includes(t)||s.emergencyContactPhone&&s.emergencyContactPhone.includes(t)}));const n=document.getElementById("participantFilteredCount");n&&(n.textContent=e.length),Qt(e)}function Qt(t){const a=document.getElementById("adminParticipantsTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="11" style="text-align: center; padding: 40px; color: #94A3B8;">
          <i class="fa-solid fa-users-slash" style="font-size: 2rem; margin-bottom: 8px; color: #CBD5E1; display: block;"></i>
          Tidak ada data peserta untuk filter yang dipilih.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{var p,h,k,x,A,I,S,F,M,$,O,K,H;const i=!((p=e.order)!=null&&p.midtransOrderId)||((k=(h=e.order)==null?void 0:h.midtransOrderId)==null?void 0:k.startsWith("OFFLINE-")),r=((x=e.order)==null?void 0:x.status)==="SETTLEMENT"||((A=e.order)==null?void 0:A.status)==="CAPTURE"||((I=e.order)==null?void 0:I.status)==="PAID",s=((S=e.order)==null?void 0:S.status)==="CANCEL"||((F=e.order)==null?void 0:F.status)==="EXPIRE"||((M=e.order)==null?void 0:M.status)==="DENY"||(($=e.order)==null?void 0:$.status)==="REFUND",o=r?"success":s?"danger":"pending",d=((O=e.order)==null?void 0:O.status)==="EXPIRE"?"EXPIRE (expired time)":((K=e.order)==null?void 0:K.status)||"PENDING",g=e.racepack&&e.racepack.checkedIn,f=g?`<small style="display:block; margin-top:4px; color:#475569;">Diserahkan oleh: <strong>${c(e.racepack.checkedInBy||"Admin")}</strong><br>${c(e.racepack.checkedInAt?new Date(e.racepack.checkedInAt).toLocaleString("id-ID"):"-")}</small>`:"",m=g?`<span class="badge" style="background:#DCFCE7; color:#15803D; font-weight:800; font-size:0.75rem; border:1px solid #BBF7D0; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-check"></i> Sudah Check-in</span>${f}`:'<span class="badge" style="background:#FFEDD5; color:#C2410C; font-weight:700; font-size:0.75rem; border:1px solid #FED7AA; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-box-open"></i> Belum Check-in</span>',u=e.bibNumber?`<span class="badge" style="background:#0F172A; color:#38BDF8; font-weight:800; font-size:0.78rem; letter-spacing:0.5px;">${c(e.bibNumber)}</span>`:'<span class="badge" style="background:#F1F5F9; color:#94A3B8; font-size:0.74rem;">-</span>';return`
      <tr>
        <td>${n+1}</td>
        <td>
          <strong style="color: #0F172A; font-size: 0.9rem;">${c(e.fullNameKtp)}</strong>
          ${i?'<span class="badge" style="background:#FFFBEB;color:#B45309;font-size:0.68rem;margin-left:4px;">Manual</span>':""}
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            ${u}
            <small style="color: #64748B; font-size: 0.74rem;">${c(e.bibName||"-")}</small>
          </div>
        </td>
        <td><code>${c(e.nik)}</code></td>
        <td><strong style="color: var(--color-primary);">${c(((H=e.event)==null?void 0:H.category)||"10K")}</strong></td>
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
            ${c(e.emergencyContactName||"-")}<br>
            <strong>${c(e.emergencyContactPhone||"-")}</strong>
          </small>
        </td>
        <td>
          <span class="status-pill ${o}">
            ${c(d)}
          </span>
        </td>
        <td>
          ${m}
        </td>
        <td>
          <div class="table-actions" style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn-icon btn-direct-rpc" data-id="${e.id}" data-bib="${c(e.bibNumber||e.id)}" title="Buka Validasi Racepack" style="color: #EA580C; background: #FFEDD5;" data-permission="participants:update">
              <i class="fa-solid fa-box-open"></i>
            </button>
            <button class="btn-icon edit btn-edit-part" data-id="${e.id}" title="Edit Data Peserta" data-permission="participants:update">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-icon delete btn-delete-part" data-id="${e.id}" data-name="${c(e.fullNameKtp)}" title="Hapus Peserta" data-permission="participants:delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `}).join(""),a.querySelectorAll(".btn-direct-rpc").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id");n&&(Be("racepack"),ae(n))})}),a.querySelectorAll(".btn-edit-part").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=b.participants.find(r=>r.id===n);i&&Yt(i)})}),a.querySelectorAll(".btn-delete-part").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await C({title:"Hapus Data Peserta?",message:`Apakah Anda yakin ingin menghapus data peserta "${i}"? Nomor BIB dan data peserta ini akan dihapus dari sistem.`,confirmText:"Ya, Hapus Peserta",type:"danger"})&&await Zt(n)})}),ee(b.profile)}}function Vt(){var t;document.getElementById("partFormId").value="",document.getElementById("modalParticipantTitle").innerHTML='<i class="fa-solid fa-user-plus" style="color: var(--color-primary);"></i> Tambah Peserta Manual',document.getElementById("partFormFullName").value="",document.getElementById("partFormBibName").value="",document.getElementById("partFormNik").value="",document.getElementById("partFormEmergencyName").value="",document.getElementById("partFormEmergencyPhone").value="",(t=document.getElementById("modalParticipantBackdrop"))==null||t.classList.add("open")}function Yt(t){var a;document.getElementById("partFormId").value=t.id,document.getElementById("modalParticipantTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Data Peserta: ${c(t.fullNameKtp)}`,document.getElementById("partFormEventId").value=t.eventId||"",document.getElementById("partFormFullName").value=t.fullNameKtp,document.getElementById("partFormBibName").value=t.bibName||"",document.getElementById("partFormNik").value=t.nik,document.getElementById("partFormGender").value=t.gender||"MALE",document.getElementById("partFormBloodType").value=t.bloodType||"O",document.getElementById("partFormSize").value=t.selectedSize||"M",document.getElementById("partFormBirthPlace").value=t.birthPlace||"Tegal",document.getElementById("partFormBirthDate").value=t.birthDate?t.birthDate.slice(0,10):"1995-05-15",document.getElementById("partFormAddress").value=t.fullAddress||"Jl. Pancasila No. 12, Tegal",document.getElementById("partFormEmergencyName").value=t.emergencyContactName||"",document.getElementById("partFormEmergencyPhone").value=t.emergencyContactPhone||"",(a=document.getElementById("modalParticipantBackdrop"))==null||a.classList.add("open")}async function Xt(t){var n;t.preventDefault();const a=document.getElementById("partFormId").value,e={eventId:document.getElementById("partFormEventId").value,fullNameKtp:document.getElementById("partFormFullName").value.trim(),bibName:document.getElementById("partFormBibName").value.trim(),nik:document.getElementById("partFormNik").value.trim(),gender:document.getElementById("partFormGender").value,bloodType:document.getElementById("partFormBloodType").value,selectedSize:document.getElementById("partFormSize").value,birthPlace:document.getElementById("partFormBirthPlace").value.trim(),birthDate:document.getElementById("partFormBirthDate").value,fullAddress:document.getElementById("partFormAddress").value.trim(),country:"Indonesia",emergencyContactName:document.getElementById("partFormEmergencyName").value.trim(),emergencyContactPhone:document.getElementById("partFormEmergencyPhone").value.trim()};try{let i;a?i=await y(`/admin/participants/${a}`,{method:"PUT",body:JSON.stringify(e)}):i=await y("/admin/participants",{method:"POST",body:JSON.stringify(e)}),i.status==="success"?(l("success","Berhasil",a?"Data peserta diperbarui!":"Peserta baru berhasil didaftarkan manual!"),(n=document.getElementById("modalParticipantBackdrop"))==null||n.classList.remove("open"),se()):l("error","Gagal",i.message||"Validasi data peserta gagal")}catch(i){l("error","Kesalahan Server",i.message)}}async function Zt(t){try{const a=await y(`/admin/participants/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Data peserta berhasil dihapus!"),se()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}function en(){if(b.participants.length===0){l("warning","Peringatan","Tidak ada data peserta untuk diunduh.");return}const t=["No","Nama KTP","Nomor BIB","BIB Name","NIK","Kategori","Gender","Gol Darah","Size Jersey","Emergency Contact","Status Bayar","Status Racepack"],a=b.participants.map((r,s)=>{var o,d,g;return[s+1,`"${r.fullNameKtp}"`,`"${r.bibNumber||""}"`,`"${r.bibName||""}"`,`'${r.nik}`,`"${((o=r.event)==null?void 0:o.category)||""}"`,r.gender,r.bloodType,r.selectedSize,`"${r.emergencyContactPhone||""}"`,((d=r.order)==null?void 0:d.status)||"PENDING",(g=r.racepack)!=null&&g.checkedIn?"Sudah Check-in":"Belum Check-in"]}),e="data:text/csv;charset=utf-8,"+[t.join(","),...a.map(r=>r.join(","))].join(`
`),n=encodeURI(e),i=document.createElement("a");i.setAttribute("href",n),i.setAttribute("download",`peserta_tegal_run_2027_${Date.now()}.csv`),document.body.appendChild(i),i.click(),i.remove()}async function q(){var t,a;try{const e=((t=document.getElementById("filterOrderStatus"))==null?void 0:t.value)||"",n=((a=document.getElementById("searchOrder"))==null?void 0:a.value)||"",i=new URLSearchParams({limit:"50"});e&&i.append("status",e),n&&i.append("search",n);const r=await y(`/admin/orders?${i.toString()}`);r.status==="success"&&(b.orders=r.data,an(r.data))}catch(e){console.error("Failed to load orders:",e)}}function an(t){const a=document.getElementById("adminOrdersTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: #94A3B8;">
          Belum ada data transaksi/order.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{var m,u,p;const i=new Date(e.createdAt).toLocaleString("id-ID"),r=e.status==="SETTLEMENT"||e.status==="CAPTURE",s=e.status==="CANCEL"||e.status==="EXPIRE"||e.status==="DENY",o=r?"success":s?"danger":"pending",d=e.status==="EXPIRE"?"EXPIRE (expired time)":e.status,f=!e.midtransOrderId||e.midtransOrderId.startsWith("OFFLINE-")?'<span class="badge" style="background:#FFFBEB;color:#B45309;font-weight:700;border:1px solid #FDE68A;font-size:0.75rem;"><i class="fa-solid fa-user-pen"></i> Pendaftaran Manual</span>':'<span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;border:1px solid #BFDBFE;font-size:0.75rem;"><i class="fa-solid fa-globe"></i> Website (Midtrans)</span>';return`
      <tr>
        <td>${n+1}</td>
        <td><code>${c(e.midtransOrderId||e.id.slice(0,12))}</code></td>
        <td>${f}</td>
        <td><strong>${c(((m=e.user)==null?void 0:m.fullName)||"Anonim")}</strong></td>
        <td><small>${c(((u=e.user)==null?void 0:u.email)||"-")}<br>${c(((p=e.user)==null?void 0:p.phoneNumber)||"-")}</small></td>
        <td style="text-align: center;"><strong>${e.participantsCount}</strong> Peserta</td>
        <td><strong style="color: var(--color-primary);">${D(e.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${o}">
            ${c(d)}
          </span>
        </td>
        <td><small style="color: #64748B;">${i}</small></td>
        <td>
          <div class="table-actions">
            <button class="btn-icon btn-view-order-details" data-id="${c(e.id)}" title="Lihat detail tiket">
              <i class="fa-solid fa-ticket"></i>
            </button>
            <button class="btn-icon edit btn-update-order-status" data-id="${e.id}" data-display="${c(e.midtransOrderId||e.id)}" data-status="${e.status}" title="Ubah Status Order" data-permission="orders:update">
              <i class="fa-solid fa-file-pen"></i>
            </button>
            <button class="btn-icon delete btn-delete-order" data-id="${e.id}" title="Hapus Order" data-permission="orders:delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `}).join(""),a.querySelectorAll(".btn-view-order-details").forEach(e=>{e.addEventListener("click",()=>tn(e.dataset.id))}),document.querySelectorAll(".btn-update-order-status").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-display"),r=e.getAttribute("data-status");nn(n,i,r)})}),document.querySelectorAll(".btn-delete-order").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id");await C({title:"Hapus Data Transaksi?",message:"PERINGATAN: Apakah Anda yakin ingin menghapus data transaksi ini dari riwayat keuangan?",confirmText:"Ya, Hapus Transaksi",type:"danger"})&&await sn(n)})}),ee(b.profile)}}async function tn(t){var n,i,r;const a=document.getElementById("orderDetailsContent"),e=document.getElementById("modalOrderDetailsBackdrop");if(!(!a||!e)){e.classList.add("open"),a.innerHTML='<div style="text-align:center; color:#64748B; padding:24px;">Memuat detail tiket...</div>';try{const s=await y(`/admin/orders/${encodeURIComponent(t)}`);if(!s||s.status!=="success"||!s.data)throw new Error((s==null?void 0:s.message)||"Detail transaksi tidak dapat dimuat.");const o=s.data,d=p=>c(p==null||p===""?"-":String(p)),g=p=>p?new Date(p).toLocaleString("id-ID"):"-",f=o.status==="EXPIRE"?"EXPIRE (expired time)":o.status,m=(p,h)=>`<div style="padding:8px 0; border-bottom:1px solid #E2E8F0;"><strong>${p}:</strong> ${h}</div>`,u=Array.isArray(o.participants)?o.participants:[];a.innerHTML=`
      <section style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:0 20px; margin-bottom:18px;">
        ${m("Order ID",d(o.midtransOrderId||o.id))}
        ${m("Status pembayaran",d(f))}
        ${m("Total transaksi",D(o.totalAmount))}
        ${m("Waktu transaksi",d(g(o.createdAt)))}
        ${m("Nama pemesan",d((n=o.user)==null?void 0:n.fullName))}
        ${m("Email / telepon",`${d((i=o.user)==null?void 0:i.email)} / ${d((r=o.user)==null?void 0:r.phoneNumber)}`)}
      </section>
      <h5 style="margin:12px 0;">Data Tiket &amp; Peserta (${u.length})</h5>
      <div style="display:grid; gap:12px;">
        ${u.length?u.map((p,h)=>{var k,x,A,I;return`
          <article style="border:1px solid #E2E8F0; border-radius:12px; padding:14px;">
            <h6 style="margin:0 0 8px; color:#0F172A;">${h+1}. ${d(p.fullNameKtp)}</h6>
            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:0 18px; font-size:.88rem;">
              ${m("Kategori tiket",d(((k=p.event)==null?void 0:k.ticketName)||((x=p.event)==null?void 0:x.category)))}
              ${m("BIB",d(p.bibNumber))}
              ${m("NIK",d(p.nik))}
              ${m("Tanggal / tempat lahir",`${d(p.birthDate?new Date(p.birthDate).toLocaleDateString("id-ID"):"-")} / ${d(p.birthPlace)}`)}
              ${m("Jenis kelamin / golongan darah",`${d(p.gender)} / ${d(p.bloodType)}`)}
              ${m("Ukuran jersey",d(p.selectedSize))}
              ${m("Nama jersey / jenis",`${d((A=p.jersey)==null?void 0:A.name)} / ${d((I=p.jersey)==null?void 0:I.type)}`)}
              ${m("Komunitas",d(p.communityName))}
              ${m("Kontak darurat",`${d(p.emergencyContactName)} / ${d(p.emergencyContactPhone)}`)}
              ${m("Alamat",d(p.fullAddress))}
              ${m("Riwayat medis",d(p.medicalHistory))}
            </div>
          </article>
        `}).join(""):'<div style="color:#64748B;">Belum ada data peserta pada transaksi ini.</div>'}
      </div>
    `}catch(s){a.innerHTML=`<div style="color:#B91C1C;">${c(s.message||"Detail transaksi gagal dimuat.")}</div>`,l("error","Gagal Memuat Detail",s.message||"Detail transaksi gagal dimuat.")}}}function nn(t,a,e){var n;document.getElementById("orderFormId").value=t,document.getElementById("orderFormDisplayId").value=a,document.getElementById("orderFormStatus").value=e||"SETTLEMENT",document.getElementById("orderFormReason").value="",(n=document.getElementById("modalOrderBackdrop"))==null||n.classList.add("open")}async function rn(t){var i;t.preventDefault();const a=document.getElementById("orderFormId").value,e=document.getElementById("orderFormStatus").value,n=document.getElementById("orderFormReason").value.trim();try{const r=await y(`/admin/orders/${a}/status`,{method:"PUT",body:JSON.stringify({status:e,reason:n})});r.status==="success"?(l("success","Status Diperbarui",`Status order berhasil diubah menjadi ${e}!`),(i=document.getElementById("modalOrderBackdrop"))==null||i.classList.remove("open"),q(),se(),j()):l("error","Gagal",r.message)}catch(r){l("error","Kesalahan Server",r.message)}}async function sn(t){try{const a=await y(`/admin/orders/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Data transaksi berhasil dihapus!"),q()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}const $e=[{name:"SUPERADMIN",authority:"Tinggi (Root Access)",authorityColor:"#DC2626",desc:"Pemegang kendali tertinggi seluruh sistem, server, database, konfigurasi keuangan, dan manajemen izin RBAC.",pages:["Dashboard","Event & Tiket","Manajemen Peserta","Transaksi & Keuangan","Log Notifikasi","WhatsApp Web Console","Konten Website/CMS","Countdown & Status","Konfigurasi Notifikasi","Rute & Checkpoint","Kelola Admin & RBAC","Log Audit Sistem"],reason:"Akses tak terbatas (*) ke semua modul untuk kontrol dan audit menyeluruh."},{name:"ADMINISTRATOR",authority:"Tinggi (Operasional)",authorityColor:"#EA580C",desc:"Koordinator operasional utama event. Bertanggung jawab atas ketersediaan tiket, data pelari, jalur lari, dan publikasi website.",pages:["Dashboard","Event & Tiket","Manajemen Peserta","Transaksi & Order","Log Notifikasi","WhatsApp Web Console","Konten Website/CMS","Countdown & Status","Rute & Checkpoint"],reason:"Memerlukan akses operasional penuh namun dibatasi dari konfigurasi sensitif RBAC admin."},{name:"FINANCE",authority:"Tinggi (Finansial)",authorityColor:"#059669",desc:"Divisi keuangan & bendahara event. Mengaudit pembayaran peserta, rekonsiliasi Midtrans, settlement manual, dan refund.",pages:["Dashboard","Transaksi & Order","Log Audit Sistem"],reason:"Khusus mengawasi arus kas tiket, verifikasi pembayaran manual, dan verifikasi status mutasi dana."},{name:"SPONSORSHIP",authority:"Menengah (Kemitraan)",authorityColor:"#2563EB",desc:"Divisi kemitraan sponsor. Mengelola materi promosi sponsor di CMS, benefit tiket sponsor, dan laporan pendaftar.",pages:["Dashboard","Konten Website/CMS","Event & Tiket (Read/Benefit)","Log Notifikasi"],reason:"Memastikan logo dan hak promosi sponsor tampil presisi di web serta laporan jumlah peserta."},{name:"RACEPACK_OFFICER",authority:"Operasional Lapangan",authorityColor:"#7C3AED",desc:"Petugas meja Race Pack Collection (RPC). Memvalidasi E-Tiket pelari, mencatat serah terima racepack/jersey, dan serah terima nomor BIB.",pages:["Dashboard","Manajemen Peserta & RPC","WhatsApp Web Console"],reason:"Membutuhkan akses pencarian data pelari, serah terima jersey, dan kontak langsung pelari bermasalah di booth."},{name:"GATE_OPERATOR",authority:"Operasional Pintu",authorityColor:"#0D9488",desc:"Petugas pemindai tiket di gerbang venue. Scan barcode/QR tiket, verifikasi status lunas, dan validasi akses masuk pelari.",pages:["Dashboard","Manajemen Peserta (Check-in/Scan)"],reason:"Hanya butuh verifikasi cepat keabsahan tiket pelari saat memasuki race village."},{name:"RACE_DIRECTOR",authority:"Tinggi (Teknis Lomba)",authorityColor:"#D97706",desc:"Pimpinan teknis lomba. Mengawasi rute marathon, pos medis, water station, timing cut-off time (COT), dan kontrol countdown lomba.",pages:["Dashboard","Rute & Checkpoint","Countdown & Status Event","Manajemen Peserta","Manajemen Event"],reason:"Memantau kesiapan rute, kondisi titik evakuasi, dan timeline pelepasan pelari (flag-off)."},{name:"TIMING_JUDGE",authority:"Menengah (Juri Timing)",authorityColor:"#4F46E5",desc:"Juri pencatat waktu & komisi timing PASI. Mengelola sinkronisasi nomor BIB dengan timing chip RFID dan checkpoint rute.",pages:["Dashboard","Manajemen Peserta (BIB & Data)","Rute & Checkpoint"],reason:"Memerlukan nomor BIB peserta dan mapping titik timing mat pada rute."},{name:"MEDICAL_OFFICER",authority:"Operasional Medis",authorityColor:"#E11D48",desc:"Tim medis, dokter lapangan, dan rescue. Memerlukan akses cepat data riwayat kesehatan, golongan darah, kontak darurat keluarga, dan pos medis.",pages:["Dashboard","Manajemen Peserta (Rekam Medis & Kontak Darurat)","Rute & Checkpoint (Pos Medis)"],reason:"Penting untuk penanganan darurat kecelakaan atau cedera pelari selama lomba berlangsung."},{name:"VOLUNTEER",authority:"Dasar (Relawan)",authorityColor:"#64748B",desc:"Relawan umum di venue dan rute. Membantu cek informasi peserta di helpdesk dan panduan umum tanpa hak mengubah data kritis.",pages:["Dashboard","Manajemen Peserta (Read-Only)"],reason:"Akses baca terbatas untuk panduan peserta di lapangan tanpa risiko perubahan data."},{name:"BAG_DROP_OFFICER",authority:"Operasional Penitipan",authorityColor:"#0891B2",desc:"Petugas tenda penitipan barang pelari (Bag Drop). Mencocokkan nomor BIB dan identitas pelari saat titip dan ambil barang.",pages:["Dashboard","Manajemen Peserta (Pencarian BIB)"],reason:"Hanya memerlukan pencarian nomor BIB pelari untuk validasi tag barang bawaan."},{name:"CUSTOMER_SERVICE",authority:"Operasional CS",authorityColor:"#16A34A",desc:"Tim helpdesk & CS pelari. Membalas pertanyaan via WhatsApp Web Console, cek status pesanan tiket, log pengiriman, dan kendala pembayaran.",pages:["Dashboard","WhatsApp Web Console","Log Notifikasi Peserta","Manajemen Peserta","Transaksi & Order"],reason:"Membutuhkan akses komunikasi langsung ke pelari serta melihat status order untuk menyelesaikan komplain tiket."}],oe=[{key:"page:dashboard",label:"Dashboard Overview",icon:"fa-gauge-high",desc:"Ringkasan statistik, kuota & omzet"},{key:"page:events",label:"Manajemen Event & Tiket",icon:"fa-calendar-days",desc:"Kategori tiket, harga, kuota & benefit"},{key:"page:participants",label:"Manajemen Peserta",icon:"fa-users",desc:"Pendaftar, nomor BIB & status"},{key:"page:racepack",label:"Pengambilan Racepack (RPC)",icon:"fa-box-open",desc:"Scan QR kamera HP, verifikasi E-Tiket & serah terima"},{key:"page:orders",label:"Transaksi & Keuangan",icon:"fa-receipt",desc:"Audit order, Midtrans & refund"},{key:"page:notif-logs",label:"Log Notifikasi Peserta",icon:"fa-paper-plane",desc:"Riwayat WA & email E-Tiket"},{key:"page:whatsapp-web",label:"WhatsApp Web Console",icon:"fa-brands fa-whatsapp",desc:"Chat langsung & CS peserta"},{key:"page:cms",label:"Konten Website & CMS",icon:"fa-pen-ruler",desc:"Teks website, sponsor & banner"},{key:"page:countdown",label:"Countdown & Status Event",icon:"fa-stopwatch-20",desc:"Status pendaftaran & waktu lomba"},{key:"page:notifications",label:"Konfigurasi Notifikasi",icon:"fa-bell",desc:"Gateway WA, SMTP & template"},{key:"page:routes",label:"Rute & Checkpoint",icon:"fa-map-pin",desc:"Pos medis, water station & jalur"},{key:"page:admins",label:"Kelola Admin & RBAC",icon:"fa-shield-halved",desc:"Akun staf & hak akses role"},{key:"page:logs",label:"Log Audit Sistem",icon:"fa-clock-rotate-left",desc:"Rekam jejak audit keamanan"}];function Na(t){const a=document.getElementById("btnRbacTabUsers"),e=document.getElementById("btnRbacTabRoles"),n=document.getElementById("btnRbacTabMatrix"),i=document.getElementById("rbacSectionUsers"),r=document.getElementById("rbacSectionRoles"),s=document.getElementById("rbacSectionMatrix");a&&(a.className=t==="users"?"btn btn-primary btn-sm":"btn btn-outline btn-sm"),e&&(e.className=t==="roles"?"btn btn-primary btn-sm":"btn btn-outline btn-sm"),n&&(n.className=t==="matrix"?"btn btn-primary btn-sm":"btn btn-outline btn-sm"),i&&(i.style.display=t==="users"?"block":"none"),r&&(r.style.display=t==="roles"?"block":"none"),s&&(s.style.display=t==="matrix"?"block":"none")}window.switchRbacSubTab=Na;async function te(){try{const[t,a]=await Promise.all([y("/admin/users-management").catch(()=>null),y("/admin/roles").catch(()=>null)]);if(a&&a.status==="success"){b.roles=a.data||[],b.systemModules=a.modules||oe;const e=document.getElementById("adminUserRoleId");e&&(e.innerHTML=b.roles.map(n=>`
          <option value="${n.id}">${c(n.name)} - ${c(n.description||"")}</option>
        `).join("")),ln(b.roles),dn()}t&&t.status==="success"&&(b.admins=t.data||[],on(b.admins))}catch(t){console.error("Failed to load admins and roles:",t)}}function on(t){const a=document.getElementById("adminUsersTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="8" style="text-align: center; padding: 20px; color: #94A3B8;">Belum ada akun admin.</td></tr>';return}a.innerHTML=t.map((e,n)=>{var r,s;const i=((r=e.role)==null?void 0:r.name)==="SUPERADMIN";return`
      <tr>
        <td>${n+1}</td>
        <td><strong>${c(e.fullName)}</strong></td>
        <td><code>@${c(e.username)}</code></td>
        <td>${c(e.email)}</td>
        <td><span class="admin-badge-role">${c(((s=e.role)==null?void 0:s.name)||"ADMIN")}</span></td>
        <td>
          <span class="status-pill ${e.isActive?"success":"danger"}">
            ${e.isActive?"AKTIF":"NONAKTIF"}
          </span>
        </td>
        <td><small style="color: #64748B;">${new Date(e.createdAt).toLocaleDateString("id-ID")}</small></td>
        <td>
          <div class="table-actions">
            <button class="btn-icon edit btn-edit-admin-user" data-id="${e.id}" title="Edit Admin">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            ${i?"":`
              <button class="btn-icon delete btn-delete-admin-user" data-id="${e.id}" data-name="${c(e.fullName)}" title="Hapus Admin">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            `}
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-edit-admin-user").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=b.admins.find(r=>r.id===n);i&&bn(i)})}),document.querySelectorAll(".btn-delete-admin-user").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await C({title:"Hapus Akun Admin?",message:`Apakah Anda yakin ingin menghapus akun admin "${i}"? Akun ini tidak akan dapat login lagi ke portal.`,confirmText:"Ya, Hapus Akun",type:"danger"})&&await vn(n)})})}}function ln(t){const a=document.getElementById("adminRolesTableBody");if(!a)return;if(t.length===0){a.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px; color: #94A3B8;">Belum ada role terdaftar.</td></tr>';return}const e={};(b.systemModules||oe).forEach(n=>{e[n.key]=n.label}),a.innerHTML=t.map((n,i)=>{var f;n.name;const r=Array.isArray(n.permissions)?n.permissions:[],s=r.includes("*");let o="";if(s)o='<span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; font-weight: 700;"><i class="fa-solid fa-star"></i> Semua Halaman (Akses Penuh)</span>';else{const m=r.filter(u=>u.startsWith("page:"));m.length===0?o='<span style="color: #94A3B8; font-size: 0.75rem;">(Belum ada halaman diizinkan)</span>':o=m.map(u=>{const p=e[u]||u.replace("page:","");return`<span class="role-page-pill">${c(p)}</span>`}).join("")}const d=((f=n._count)==null?void 0:f.admins)||0,g=$e.some(m=>m.name===n.name);return`
      <tr>
        <td>${i+1}</td>
        <td>
          <span class="admin-badge-role" style="font-weight: 800; font-size: 0.8rem;">${c(n.name)}</span>
        </td>
        <td style="max-width: 280px; font-size: 0.82rem; color: #475569;">
          ${c(n.description||"-")}
        </td>
        <td style="max-width: 320px;">
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${o}
          </div>
        </td>
        <td style="text-align: center;">
          <span class="badge" style="background: #F8FAFC; color: #0F172A; border: 1px solid #E2E8F0; font-weight: 700; padding: 4px 10px;">
            <i class="fa-solid fa-user"></i> ${d}
          </span>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn btn-outline btn-sm btn-edit-role" data-id="${n.id}" title="Atur Hak Akses Halaman">
              <i class="fa-solid fa-sliders"></i> Atur Akses
            </button>
            ${!g&&d===0?`
              <button class="btn-icon delete btn-delete-role" data-id="${n.id}" data-name="${c(n.name)}" title="Hapus Role">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            `:""}
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-edit-role").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-id"),r=b.roles.find(s=>s.id===i);r&&mn(r)})}),document.querySelectorAll(".btn-delete-role").forEach(n=>{n.addEventListener("click",async()=>{const i=n.getAttribute("data-id"),r=n.getAttribute("data-name");await C({title:"Hapus Role?",message:`Apakah Anda yakin ingin menghapus role "${r}"? Tindakan ini tidak dapat dibatalkan.`,confirmText:"Ya, Hapus Role",type:"danger"})&&await un(i)})})}function dn(){const t=document.getElementById("roleDirectoryTableBody");t&&(t.innerHTML=$e.map((a,e)=>{const n=a.pages.map(i=>`<span class="role-page-pill">${c(i)}</span>`).join("");return`
      <tr>
        <td>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span class="admin-badge-role" style="width: fit-content; font-size: 0.8rem; font-weight: 800;">${a.name}</span>
            <small style="color: #64748B; font-size: 0.72rem;">Divisi #${e+1}</small>
          </div>
        </td>
        <td style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
          <strong>${c(a.desc)}</strong>
          <div style="font-size: 0.76rem; color: #64748B; margin-top: 4px;">
            <i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> ${c(a.reason)}
          </div>
        </td>
        <td>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${n}
          </div>
        </td>
        <td>
          <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; background: ${a.authorityColor}15; color: ${a.authorityColor}; border: 1px solid ${a.authorityColor}40;">
            ${c(a.authority)}
          </span>
        </td>
      </tr>
    `}).join(""))}function La(t=[],a=!1){const e=document.getElementById("roleModulesContainer");if(!e)return;const n=b.systemModules||oe;e.innerHTML=n.map(i=>{const r=a||t.includes(i.key),s=a;return`
      <label class="role-module-card ${r?"checked":""}" id="card-${i.key.replace(":","_")}">
        <input type="checkbox" name="role_page" value="${i.key}" ${r?"checked":""} ${s?"disabled":""} onchange="toggleModuleCardStyle(this)">
        <div class="module-icon">
          <i class="fa-solid ${i.icon}"></i>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 0.84rem; font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${c(i.label)}
          </div>
          <div style="font-size: 0.72rem; color: #64748B; line-height: 1.3; margin-top: 2px;">
            ${c(i.desc||"")}
          </div>
        </div>
      </label>
    `}).join("")}window.toggleModuleCardStyle=function(t){const a=t.closest(".role-module-card");a&&(t.checked?a.classList.add("checked"):a.classList.remove("checked"))};function cn(){var a;document.getElementById("roleFormId").value="",document.getElementById("modalRoleTitle").innerHTML='<i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Role Akses Baru';const t=document.getElementById("roleFormName");t.value="",t.readOnly=!1,document.getElementById("roleFormDesc").value="",La(["page:dashboard"],!1),(a=document.getElementById("modalRoleBackdrop"))==null||a.classList.add("open")}function mn(t){var r;document.getElementById("roleFormId").value=t.id,document.getElementById("modalRoleTitle").innerHTML=`<i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Atur Hak Akses Role: ${c(t.name)}`;const a=document.getElementById("roleFormName");a.value=t.name;const e=t.name==="SUPERADMIN";a.readOnly=e,document.getElementById("roleFormDesc").value=t.description||"";const n=Array.isArray(t.permissions)?t.permissions:[];let i=[];n.includes("*")?i=(b.systemModules||oe).map(s=>s.key):i=n.filter(s=>s.startsWith("page:")),La(i,e),(r=document.getElementById("modalRoleBackdrop"))==null||r.classList.add("open")}async function pn(t){var o,d,g,f,m;t.preventDefault();const a=document.getElementById("roleFormId").value,e=document.getElementById("roleFormName").value.trim().toUpperCase(),n=document.getElementById("roleFormDesc").value.trim(),i=e==="SUPERADMIN";let r=[];if(i)r=["*"];else{const p=Array.from(document.querySelectorAll('input[name="role_page"]:checked')).map(x=>x.value);if(p.length===0){l("warning","Peringatan","Pilih minimal 1 halaman yang diizinkan untuk role ini.");return}p.includes("page:dashboard")||p.unshift("page:dashboard");const h=b.systemModules||oe,k=new Set;p.forEach(x=>{const A=h.find(I=>I.key===x);A&&Array.isArray(A.apiPermissions)&&A.apiPermissions.forEach(I=>k.add(I))}),r=[...p,...Array.from(k)]}const s={name:e,description:n,permissions:r};try{let u;a?u=await y(`/admin/roles/${a}`,{method:"PUT",body:JSON.stringify(s)}):u=await y("/admin/roles",{method:"POST",body:JSON.stringify(s)}),u.status==="success"?(l("success","Berhasil",a?`Hak akses role '${e}' berhasil diperbarui ke database!`:`Role '${e}' berhasil dibuat!`),(o=document.getElementById("modalRoleBackdrop"))==null||o.classList.remove("open"),(((g=(d=b.profile)==null?void 0:d.role)==null?void 0:g.id)===a||((m=(f=b.profile)==null?void 0:f.role)==null?void 0:m.name)===e)&&(b.profile.role.permissions=r,applyRbacUi(b.profile)),await te()):l("error","Gagal",u.message||"Gagal menyimpan role.")}catch(u){l("error","Kesalahan Server",u.message)}}async function un(t){try{const a=await y(`/admin/roles/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Role berhasil dihapus!"),te()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}async function gn(){if(await C({title:"Reset ke 12 Role Default?",message:"Tindakan ini akan mengembalikan seluruh izin hak akses ke-12 role resmi penyelenggara event ke standar sistem default di database.",confirmText:"Ya, Reset Role Default",type:"warning"}))try{const a=await y("/admin/roles/reset-defaults",{method:"POST"});a.status==="success"?(l("success","Role Tersinkron",a.message),te()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}function fn(){var t;document.getElementById("adminUserFormId").value="",document.getElementById("modalAdminUserTitle").innerHTML='<i class="fa-solid fa-user-shield" style="color: var(--color-primary);"></i> Tambah Akun Admin Baru',document.getElementById("adminUserFullName").value="",document.getElementById("adminUserUsername").value="",document.getElementById("adminUserEmail").value="",document.getElementById("adminUserPassword").value="",document.getElementById("adminUserPassword").required=!0,document.getElementById("adminPasswordReq").style.display="inline",document.getElementById("adminPasswordHint").textContent="Wajib diisi untuk akun baru (minimal 8 karakter).",(t=document.getElementById("modalAdminUserBackdrop"))==null||t.classList.add("open")}function bn(t){var a;document.getElementById("adminUserFormId").value=t.id,document.getElementById("modalAdminUserTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Akun Admin: ${c(t.fullName)}`,document.getElementById("adminUserFullName").value=t.fullName,document.getElementById("adminUserUsername").value=t.username,document.getElementById("adminUserEmail").value=t.email,document.getElementById("adminUserRoleId").value=t.roleId,document.getElementById("adminUserPassword").value="",document.getElementById("adminUserPassword").required=!1,document.getElementById("adminPasswordReq").style.display="none",document.getElementById("adminPasswordHint").textContent="Kosongkan jika tidak ingin mengubah password akun ini.",(a=document.getElementById("modalAdminUserBackdrop"))==null||a.classList.add("open")}async function yn(t){var d;t.preventDefault();const a=document.getElementById("adminUserFormId").value,e=document.getElementById("adminUserFullName").value.trim(),n=document.getElementById("adminUserUsername").value.trim(),i=document.getElementById("adminUserEmail").value.trim(),r=document.getElementById("adminUserRoleId").value,s=document.getElementById("adminUserPassword").value,o={fullName:e,username:n,email:i,roleId:r,isActive:!0};s&&(o.password=s);try{let g;a?g=await y(`/admin/users-management/${a}`,{method:"PUT",body:JSON.stringify(o)}):g=await y("/admin/users-management",{method:"POST",body:JSON.stringify(o)}),g.status==="success"?(l("success","Berhasil",a?"Data akun admin diperbarui!":"Akun admin baru berhasil dibuat!"),(d=document.getElementById("modalAdminUserBackdrop"))==null||d.classList.remove("open"),te()):l("error","Gagal",g.message||"Validasi admin gagal")}catch(g){l("error","Kesalahan Server",g.message)}}async function vn(t){try{const a=await y(`/admin/users-management/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Akun admin berhasil dihapus!"),te()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}window.switchRbacSubTab=Na;async function Da(){try{const t=await y("/admin/logs?limit=25").catch(()=>null);t&&t.status==="success"&&hn(t.data.logs||t.data||[])}catch(t){console.error("Failed to load audit logs:",t)}}function hn(t){const a=document.getElementById("adminAuditLogsTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="4" style="text-align:center; padding:20px; color:#94A3B8;">Tidak ada catatan log audit.</td></tr>';return}a.innerHTML=t.map(e=>{var i,r;return`
      <tr>
        <td><small style="color: #64748B;">${new Date(e.createdAt).toLocaleString("id-ID")}</small></td>
        <td><code>${c(e.action)}</code></td>
        <td>${c(e.description)}</td>
        <td><strong>${c(((i=e.admin)==null?void 0:i.fullName)||((r=e.user)==null?void 0:r.fullName)||"Sistem")}</strong></td>
      </tr>
    `}).join("")}}async function kn(){var t,a;try{await Oe(),await xa(),await j(),await se(),await q(),((a=(t=b.profile)==null?void 0:t.role)==null?void 0:a.name)==="SUPERADMIN"&&await te(),await Da(),ee(b.profile)}catch(e){console.error("Error loading dashboard data:",e)}}async function Oe(){var t,a;try{const e=await y("/admin/stats");if(e&&e.status==="success"&&e.data){const n=e.data,i=n.financials||{settled:{count:0,amount:n.totalRevenue||0},pending:{count:0,amount:0},cancelled:{count:0,amount:0},serviceFee:{count:0,amount:n.totalServiceFee||0},netRevenue:n.netRevenue||n.totalRevenue||0},r=document.getElementById("kpiTotalParticipants"),s=document.getElementById("kpiTotalRevenue"),o=document.getElementById("kpiTotalServiceFee"),d=document.getElementById("kpiNetRevenue");r&&(r.textContent=Number(n.totalParticipants||0).toLocaleString("id-ID")),s&&(s.textContent=D(n.totalRevenue||i.settled.amount)),o&&(o.textContent=D(n.totalServiceFee||((t=i.serviceFee)==null?void 0:t.amount)||0)),d&&(d.textContent=D(i.netRevenue));const g=document.getElementById("finSettledAmount"),f=document.getElementById("finSettledCount");g&&(g.textContent=D(i.settled.amount)),f&&(f.textContent=`${i.settled.count} Order`);const m=document.getElementById("finPendingAmount"),u=document.getElementById("finPendingCount");m&&(m.textContent=D(i.pending.amount)),u&&(u.textContent=`${i.pending.count} Order`);const p=document.getElementById("finCancelledAmount"),h=document.getElementById("finCancelledCount");p&&(p.textContent=D(i.cancelled.amount)),h&&(h.textContent=`${i.cancelled.count} Order`);const k=document.getElementById("finServiceFeeAmount"),x=document.getElementById("finServiceFeeCount"),A=n.totalServiceFee!==void 0?n.totalServiceFee:((a=i.serviceFee)==null?void 0:a.amount)||0;k&&(k.textContent=D(A)),x&&(x.textContent=`${i.settled.count} Transaksi`);const I=document.getElementById("calcGross"),S=document.getElementById("calcFee"),F=document.getElementById("calcNetResult");I&&(I.textContent=D(i.settled.amount)),S&&(S.textContent=D(A)),F&&(F.textContent=D(i.netRevenue))}}catch(e){console.warn("Gagal memuat statistik keuangan dashboard:",e)}}function En(){Oe()}async function xn(){const t=document.getElementById("btnSyncMidtransDashboard"),a=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-arrows-rotate fa-spin"></i> Mensinkronkan...');try{const e=await y("/admin/finance/sync-midtrans",{method:"POST"});e&&e.status==="success"?(l("success","Rekonsiliasi Selesai",e.message||"Status transaksi berhasil disinkronkan dengan Midtrans!"),await Oe(),q()):l("error","Gagal",(e==null?void 0:e.message)||"Gagal sinkronisasi dengan Midtrans.")}catch(e){l("error","Kesalahan Server",e.message)}finally{t&&(t.disabled=!1,t.innerHTML=a)}}async function Bn(t){t.preventDefault();const a=document.getElementById("adminIdentifier").value.trim(),e=document.getElementById("adminPassword").value,n=document.getElementById("btnLoginSubmit");n.disabled=!0,n.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Memverifikasi...';try{const i=await Ce("/admin/auth/login",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({identifier:a,password:e})});n.disabled=!1,n.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Masuk ke Dashboard Admin';const r=await i.text();let s;try{s=r?JSON.parse(r):{}}catch{l("error","Koneksi Gagal","Server backend belum siap atau tidak merespons JSON. Silakan coba beberapa saat lagi.");return}if(!i.ok||s.status!=="success"){l("error","Login Gagal",s.message||"Kredensial tidak valid");return}b.token=s.data.token,localStorage.setItem("tegal_admin_token",s.data.token),b.profile=s.data.admin,l("success","Selamat Datang!",`Berhasil masuk sebagai ${s.data.admin.fullName}`),Ra()}catch(i){n.disabled=!1,n.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Masuk ke Dashboard Admin';const r=i.message&&i.message.includes("Failed to fetch")?"Tidak dapat terhubung ke server backend. Silakan coba beberapa saat lagi.":i.message;l("error","Koneksi Gagal",r)}}function fe(){b.token=null,b.profile=null,localStorage.removeItem("tegal_admin_token");const t=document.getElementById("adminDashboardSection"),a=document.getElementById("adminLoginSection");t&&(t.style.display="none"),a&&(a.style.display="flex")}async function Ra(){var t;if(!b.token){const a=document.getElementById("adminLoginSection"),e=document.getElementById("adminDashboardSection");a&&(a.style.display="flex"),e&&(e.style.display="none");return}try{const a=await Ce("/admin/auth/me",{headers:{Authorization:`Bearer ${b.token}`}}),e=await a.json();if(!a.ok||e.status!=="success"){fe();return}b.profile=e.data;const n=document.getElementById("adminLoginSection"),i=document.getElementById("adminDashboardSection");n&&(n.style.display="none"),i&&(i.style.display="flex");const r=((t=b.profile.role)==null?void 0:t.name)||"ADMIN",s=document.getElementById("adminRoleBadge"),o=document.getElementById("adminFullName"),d=document.getElementById("adminUsername");s&&(s.textContent=r),o&&(o.textContent=b.profile.fullName),d&&(d.textContent=`@${b.profile.username}`),await Gt(),ee(b.profile),await kn()}catch(a){console.error("Failed to authenticate:",a),fe()}}window.closeAdminModal=function(t){var a;(a=document.getElementById(t))==null||a.classList.remove("open")};function An(){const t=document.getElementById("adminPanesContainer")||document.querySelector(".admin-content-body");t&&t.children.length===0&&(t.innerHTML=[Ma,$a,Oa,Ka,Ha,_a,Ua,za,Ga,Wa,ja,qa,Ja,Qa,Va].join(`
`));const a=document.getElementById("adminModalsContainer");a&&a.children.length===0&&(a.innerHTML=Ya)}document.addEventListener("DOMContentLoaded",()=>{var t,a,e,n,i,r,s,o,d,g,f,m,u,p,h,k,x,A,I,S,F,M,$,O,K,H,B,L,_,Ke,He,_e,Ue,ze,Ge,We,je,qe,Je,Qe,Ve,Ye,Xe,Ze,ea,aa,ta,na,ia,ra,sa,oa,la,da,ca,ma,pa;An(),(t=document.getElementById("adminLoginForm"))==null||t.addEventListener("submit",Bn),(a=document.getElementById("btnToggleSidebar"))==null||a.addEventListener("click",jt),(e=document.getElementById("sidebarOverlay"))==null||e.addEventListener("click",we),(n=document.getElementById("btnRefreshEvents"))==null||n.addEventListener("click",j),(i=document.getElementById("btnRefreshOrders"))==null||i.addEventListener("click",q),(r=document.getElementById("btnRefreshLogs"))==null||r.addEventListener("click",Da),(s=document.getElementById("btnExportCsv"))==null||s.addEventListener("click",en),(o=document.getElementById("btnOpenCreateEventModal"))==null||o.addEventListener("click",tt),(d=document.getElementById("btnOpenCreateParticipantModal"))==null||d.addEventListener("click",Vt),(g=document.getElementById("btnOpenCreateAdminModal"))==null||g.addEventListener("click",fn),(f=document.getElementById("btnOpenCreateRouteModal"))==null||f.addEventListener("click",gt),(m=document.getElementById("btnOpenCreateRoleModal"))==null||m.addEventListener("click",cn),(u=document.getElementById("btnResetDefaultRoles"))==null||u.addEventListener("click",gn),(p=document.getElementById("formEvent"))==null||p.addEventListener("submit",it),(h=document.getElementById("formParticipant"))==null||h.addEventListener("submit",Xt),(k=document.getElementById("formOrderStatus"))==null||k.addEventListener("submit",rn),(x=document.getElementById("formAdminUser"))==null||x.addEventListener("submit",yn),(A=document.getElementById("formRole"))==null||A.addEventListener("submit",pn),(I=document.getElementById("btnSelectAllPages"))==null||I.addEventListener("click",()=>{document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(E=>{var w;E.checked=!0,(w=E.closest(".role-module-card"))==null||w.classList.add("checked")})}),(S=document.getElementById("btnClearAllPages"))==null||S.addEventListener("click",()=>{document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(E=>{var w,U;E.value==="page:dashboard"?(E.checked=!0,(w=E.closest(".role-module-card"))==null||w.classList.add("checked")):(E.checked=!1,(U=E.closest(".role-module-card"))==null||U.classList.remove("checked"))})}),(F=document.getElementById("btnPresetDefaultPages"))==null||F.addEventListener("click",()=>{var J;const E=((J=document.getElementById("roleFormName"))==null?void 0:J.value.trim().toUpperCase())||"",U=$e.find(Q=>Q.name===E)?E==="ADMINISTRATOR"?["page:dashboard","page:events","page:participants","page:racepack","page:orders","page:notif-logs","page:whatsapp-web","page:cms","page:countdown","page:routes"]:E==="FINANCE"?["page:dashboard","page:orders","page:logs"]:E==="SPONSORSHIP"?["page:dashboard","page:cms","page:events","page:notif-logs"]:E==="RACEPACK_OFFICER"?["page:dashboard","page:racepack","page:participants","page:whatsapp-web"]:E==="GATE_OPERATOR"?["page:dashboard","page:participants","page:racepack"]:E==="RACE_DIRECTOR"?["page:dashboard","page:routes","page:countdown","page:participants","page:events","page:racepack"]:E==="TIMING_JUDGE"?["page:dashboard","page:participants","page:routes"]:E==="MEDICAL_OFFICER"?["page:dashboard","page:participants","page:routes"]:E==="VOLUNTEER"?["page:dashboard","page:participants","page:racepack"]:E==="BAG_DROP_OFFICER"?["page:dashboard","page:participants"]:E==="CUSTOMER_SERVICE"?["page:dashboard","page:whatsapp-web","page:notif-logs","page:participants","page:orders","page:racepack"]:["page:dashboard"]:["page:dashboard"];document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(Q=>{var ga,fa;const ua=U.includes(Q.value);Q.checked=ua,ua?(ga=Q.closest(".role-module-card"))==null||ga.classList.add("checked"):(fa=Q.closest(".role-module-card"))==null||fa.classList.remove("checked")})}),(M=document.getElementById("formCmsSettings"))==null||M.addEventListener("submit",ha),($=document.getElementById("formWebsiteCms"))==null||$.addEventListener("submit",ha),(O=document.getElementById("formNotificationSettings"))==null||O.addEventListener("submit",Et),(K=document.getElementById("btnSendTestNotif"))==null||K.addEventListener("click",xt),(H=document.getElementById("formEventBenefit"))==null||H.addEventListener("submit",ot),(B=document.getElementById("btnCancelBenefitEdit"))==null||B.addEventListener("click",Ne),(L=document.getElementById("formRoutePoint"))==null||L.addEventListener("submit",bt),(_=document.getElementById("btnSaveGlobalCountdown"))==null||_.addEventListener("click",Xa),(Ke=document.getElementById("btnResetGlobalCountdown"))==null||Ke.addEventListener("click",Za),(He=document.getElementById("btnToggleGlobalClosed"))==null||He.addEventListener("click",et),(_e=document.getElementById("filterOrderStatus"))==null||_e.addEventListener("change",q),(Ue=document.getElementById("searchOrder"))==null||Ue.addEventListener("input",()=>{clearTimeout(window._searchOrderTimer),window._searchOrderTimer=setTimeout(q,300)}),document.querySelectorAll(".participant-tabs-nav .part-tab-btn").forEach(E=>{E.addEventListener("click",()=>{const w=E.getAttribute("data-tab");w&&Jt(w)})}),(ze=document.getElementById("filterParticipantCategory"))==null||ze.addEventListener("change",ge),(Ge=document.getElementById("searchParticipant"))==null||Ge.addEventListener("input",()=>{clearTimeout(window._searchParticipantTimer),window._searchParticipantTimer=setTimeout(ge,250)}),(We=document.getElementById("btnRefreshRacepackStats"))==null||We.addEventListener("click",he),(je=document.getElementById("btnStartRpcCamera"))==null||je.addEventListener("click",Lt),(qe=document.getElementById("btnStopRpcCamera"))==null||qe.addEventListener("click",Ee),(Je=document.getElementById("btnConfirmRpcCheckin"))==null||Je.addEventListener("click",Pt),(Qe=document.getElementById("btnRefreshRacepackQueue"))==null||Qe.addEventListener("click",re),(Ve=document.getElementById("btnRevertRpcCheckin"))==null||Ve.addEventListener("click",Nt),(Ye=document.getElementById("formRpcManualSearch"))==null||Ye.addEventListener("submit",E=>{E.preventDefault();const w=document.getElementById("rpcSearchInput"),U=w?w.value.trim():"";U&&ae(U)}),(Xe=document.getElementById("btnGenerateWaQr"))==null||Xe.addEventListener("click",ht),(Ze=document.getElementById("btnDisconnectWa"))==null||Ze.addEventListener("click",kt),(ea=document.getElementById("btnRefreshNotifLogs"))==null||ea.addEventListener("click",X),(aa=document.getElementById("btnBatchSendNotif"))==null||aa.addEventListener("click",Ft),(ta=document.getElementById("filterNotifDeliveryStatus"))==null||ta.addEventListener("change",X),(na=document.getElementById("searchNotifLogs"))==null||na.addEventListener("input",()=>{clearTimeout(window._searchNotifTimer),window._searchNotifTimer=setTimeout(X,300)}),(ia=document.getElementById("btnRefreshWaWeb"))==null||ia.addEventListener("click",Fe),(ra=document.getElementById("btnWaWebSync"))==null||ra.addEventListener("click",Fe),(sa=document.getElementById("btnGoToWaQr"))==null||sa.addEventListener("click",()=>Be("notifications")),(oa=document.getElementById("btnSyncMidtransDashboard"))==null||oa.addEventListener("click",xn),(la=document.getElementById("btnSendWaDirectMsg"))==null||la.addEventListener("click",At),(da=document.getElementById("waQuickTemplateSelect"))==null||da.addEventListener("change",It),(ca=document.getElementById("btnQuickSendPaidTicket"))==null||ca.addEventListener("click",()=>ka()),(ma=document.getElementById("btnQuickSendPending"))==null||ma.addEventListener("click",()=>ka()),(pa=document.getElementById("waContactSearchInput"))==null||pa.addEventListener("input",E=>{const w=(E.target.value||"").toLowerCase(),U=W.filter(J=>J.customerName.toLowerCase().includes(w)||J.customerPhone.includes(w)||J.ticketName.toLowerCase().includes(w));ve(U)}),zt(),Ra()});
