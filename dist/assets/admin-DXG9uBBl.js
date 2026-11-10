const Ea=`<div class="admin-tab-pane active" id="pane-dashboard">
          <!-- Top KPI Grid -->
          <div class="admin-kpi-grid">
            <div class="kpi-card">
              <div class="kpi-icon orange"><i class="fa-solid fa-users"></i></div>
              <div class="kpi-details">
                <span class="kpi-label">Peserta Terdaftar</span>
                <h3 class="kpi-val" id="kpiTotalParticipants">0</h3>
                <span class="kpi-sub">Dari 1.500 Kuota Target</span>
              </div>
            </div>

            <div class="kpi-card" style="border: 2px solid #86EFAC; background: #F0FDF4;">
              <div class="kpi-icon green" style="background: #22C55E; color: #FFFFFF;"><i class="fa-solid fa-vault"></i></div>
              <div class="kpi-details">
                <span class="kpi-label" style="color: #166534; font-weight: 700;">HASIL AKHIR MURNI (BERSIH)</span>
                <h3 class="kpi-val" id="kpiNetRevenue" style="color: #15803D;">Rp 0</h3>
                <span class="kpi-sub" style="color: #166534;">Total Bersih Diterima (Setelah Potongan &amp; Refund)</span>
              </div>
            </div>

            <div class="kpi-card">
              <div class="kpi-icon blue"><i class="fa-solid fa-ticket"></i></div>
              <div class="kpi-details">
                <span class="kpi-label">Sisa Kuota Tiket</span>
                <h3 class="kpi-val" id="kpiRemainingStock">0</h3>
                <span class="kpi-sub">Tiket Siap Dijual</span>
              </div>
            </div>

            <div class="kpi-card">
              <div class="kpi-icon purple"><i class="fa-solid fa-server"></i></div>
              <div class="kpi-details">
                <span class="kpi-label">Status Server &amp; Gateway</span>
                <h3 class="kpi-val" style="color: #10B981; font-size: 1.25rem;">ONLINE (MIDTRANS)</h3>
                <span class="kpi-sub">MySQL Engine &amp; Midtrans API</span>
              </div>
            </div>
          </div>

          <!-- SECTION: REKONSILIASI KEUANGAN & BREAKDOWN MIDTRANS -->
          <div class="admin-section" style="margin-top: 20px; border: 1px solid #E2E8F0; background: #FFFFFF; border-radius: var(--radius-xl);">
            <div class="admin-section-header" style="flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 style="display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-scale-balanced" style="color: var(--color-primary);"></i>
                  Rekonsiliasi Keuangan &amp; Rincian Transaksi Midtrans
                </h3>
                <p>Pemisahan data real-time: Pembayaran Sukses, Menunggu Pembayaran, Dibatalkan, dan Hasil Akhir Murni Bersih.</p>
              </div>
              <button type="button" class="btn btn-outline btn-sm btn-glow" id="btnSyncMidtransDashboard" title="Cek &amp; perbarui seluruh status transaksi dari server Midtrans">
                <i class="fa-solid fa-arrows-rotate"></i> Sinkronkan Status Midtrans
              </button>
            </div>

            <!-- Financial Breakdown Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px;">
              <!-- 1. Pembayaran Sukses -->
              <div class="glass-card" style="padding: 16px; border: 1px solid #BBF7D0; background: #F0FDF4; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.78rem; font-weight: 700; color: #166534; text-transform: uppercase;">
                    <i class="fa-solid fa-circle-check"></i> Pembayaran Sukses (Lunas)
                  </span>
                  <span class="badge" style="background: #DCFCE7; color: #15803D; font-weight: 800; font-size: 0.7rem;" id="finSettledCount">0 Order</span>
                </div>
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #15803D; margin: 0 0 4px 0;" id="finSettledAmount">Rp 0</h3>
                <small style="color: #166534; font-size: 0.72rem;">Status Midtrans: SETTLEMENT / CAPTURE</small>
              </div>

              <!-- 2. Menunggu Pembayaran -->
              <div class="glass-card" style="padding: 16px; border: 1px solid #FDE68A; background: #FFFBEB; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.78rem; font-weight: 700; color: #92400E; text-transform: uppercase;">
                    <i class="fa-solid fa-clock"></i> Menunggu Bayar (Pending)
                  </span>
                  <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 800; font-size: 0.7rem;" id="finPendingCount">0 Order</span>
                </div>
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #B45309; margin: 0 0 4px 0;" id="finPendingAmount">Rp 0</h3>
                <small style="color: #92400E; font-size: 0.72rem;">Belum dibayar oleh pendaftar (Potensi)</small>
              </div>

              <!-- 3. Dibatalkan / Kadaluarsa -->
              <div class="glass-card" style="padding: 16px; border: 1px solid #FECACA; background: #FEF2F2; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.78rem; font-weight: 700; color: #991B1B; text-transform: uppercase;">
                    <i class="fa-solid fa-ban"></i> Dibatalkan / Expired
                  </span>
                  <span class="badge" style="background: #FEE2E2; color: #B91C1C; font-weight: 800; font-size: 0.7rem;" id="finCancelledCount">0 Order</span>
                </div>
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #B91C1C; margin: 0 0 4px 0;" id="finCancelledAmount">Rp 0</h3>
                <small style="color: #991B1B; font-size: 0.72rem;">Status: CANCEL / EXPIRE / DENY</small>
              </div>

              <!-- 4. Pengembalian Dana -->
              <div class="glass-card" style="padding: 16px; border: 1px solid #E9D5FF; background: #FAF5FF; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.78rem; font-weight: 700; color: #6B21A8; text-transform: uppercase;">
                    <i class="fa-solid fa-rotate-left"></i> Pengembalian Dana
                  </span>
                  <span class="badge" style="background: #F3E8FF; color: #7E22CE; font-weight: 800; font-size: 0.7rem;" id="finRefundCount">0 Order</span>
                </div>
                <h3 style="font-size: 1.45rem; font-weight: 800; color: #7E22CE; margin: 0 0 4px 0;" id="finRefundAmount">Rp 0</h3>
                <small style="color: #6B21A8; font-size: 0.72rem;">Status: REFUND (Dana dikembalikan)</small>
              </div>
            </div>

            <!-- Reconciliation Formula Summary Banner -->
            <div style="padding: 14px 20px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge" style="background: #0F172A; color: #FFFFFF; font-weight: 700; padding: 6px 12px;">
                  <i class="fa-solid fa-calculator"></i> RUMUS AUDIT
                </span>
                <span style="font-size: 0.88rem; color: #334155; font-weight: 600;">
                  Pendapatan Murni = Total Sukses (<span id="calcGross" style="color: #15803D;">Rp 0</span>) − Total Refund (<span id="calcRefund" style="color: #7E22CE;">Rp 0</span>)
                </span>
              </div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #059669;">
                Hasil Bersih: <span id="calcNetResult" style="font-size: 1.15rem; font-weight: 800;">Rp 0</span>
              </div>
            </div>
          </div>

          <!-- Quick Overview Section -->
          <div class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-bolt" style="color: var(--color-primary);"></i> Pintasan Cepat & Ringkasan Operasional</h3>
                <p>Navigasi cepat untuk mengelola event, peserta, dan transaksi secara real-time.</p>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
              <div class="kpi-card" style="cursor: pointer;" onclick="switchAdminTab('events')">
                <div class="kpi-icon orange"><i class="fa-solid fa-calendar-days"></i></div>
                <div>
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Kelola Event & Tiket</h4>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Atur kuota, harga, dan buka/tutup kategori.</p>
                </div>
              </div>

              <div class="kpi-card" style="cursor: pointer;" onclick="switchAdminTab('participants')">
                <div class="kpi-icon blue"><i class="fa-solid fa-users"></i></div>
                <div>
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Database Peserta</h4>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Lihat NIK, nomor BIB, dan ekspor CSV.</p>
                </div>
              </div>

              <div class="kpi-card" style="cursor: pointer;" onclick="switchAdminTab('orders')">
                <div class="kpi-icon green"><i class="fa-solid fa-receipt"></i></div>
                <div>
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Transaksi & Pembayaran</h4>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Konfirmasi pembayaran dan status order.</p>
                </div>
              </div>

              <div class="kpi-card" style="cursor: pointer;" onclick="switchAdminTab('countdown')">
                <div class="kpi-icon purple"><i class="fa-solid fa-stopwatch-20"></i></div>
                <div>
                  <h4 style="font-size: 0.95rem; margin: 0 0 4px 0;">Target Countdown Event</h4>
                  <p style="font-size: 0.78rem; color: #64748B; margin: 0;">Atur tanggal race day dan status registrasi global.</p>
                </div>
              </div>
            </div>
          </div>
        </div>`,xa=`<div class="admin-tab-pane" id="pane-events">
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
        </div>`,Ba=`<div class="admin-tab-pane" id="pane-participants">
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
`,Ia=`<div class="admin-tab-pane" id="pane-racepack">
  <div class="admin-section">
    <div class="admin-section-header" style="flex-wrap: wrap; gap: 14px;">
      <div>
        <h3 style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-box-open" style="color: var(--color-primary);"></i>
          Pengambilan Racepack &amp; Validasi E-Tiket (RPC)
        </h3>
        <p>Pindai QR Code E-Tiket via kamera HP atau cari data peserta secara instan untuk verifikasi status bayar, ukuran jersey, dan serah terima paket lomba.</p>
      </div>
      <div class="admin-action-bar">
        <button type="button" class="btn btn-secondary btn-sm" id="btnRefreshRacepackStats">
          <i class="fa-solid fa-rotate"></i> Segarkan Data
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
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary btn-glow" id="btnStartRpcCamera" style="flex: 1; min-width: 150px; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <i class="fa-solid fa-video"></i> Aktifkan Live Scanner
            </button>
            <button type="button" class="btn btn-secondary" id="btnTriggerNativeCamera" style="flex: 1; min-width: 150px; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <i class="fa-solid fa-camera"></i> Foto E-Tiket (Kamera HP)
            </button>
            <button type="button" class="btn btn-outline btn-sm" id="btnStopRpcCamera" style="display: none; color: #EF4444; border-color: #FECACA;">
              <i class="fa-solid fa-video-slash"></i> Matikan Kamera
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

          <form id="formRpcManualSearch" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <input type="text" class="form-input" id="rpcSearchInput" placeholder="Contoh: 05-0012, ORDER-..., atau NIK" style="flex: 1; min-width: 180px; font-weight: 700;">
            <button type="submit" class="btn btn-secondary" id="btnRpcSearchSubmit">
              <i class="fa-solid fa-magnifying-glass"></i> Cari
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

`,Sa=`<div class="admin-tab-pane" id="pane-orders">
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
        </div>`,Aa=`<div class="admin-tab-pane" id="pane-countdown">
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

            <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: flex-end;">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.9rem;">
                  <i class="fa-solid fa-calendar-days" style="color: var(--color-primary);"></i> Tanggal & Waktu Race Day (Target Hitung Mundur)
                </label>
                <input type="datetime-local" class="form-input" id="globalCountdownInput" style="font-size: 1rem; padding: 12px 16px; font-weight: 700;">
                <div class="form-hint">Contoh: 28 Februari 2027 pukul 06:00 WIB (Waktu Indonesia Barat).</div>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
                <button type="button" class="btn btn-secondary btn-sm" id="btnResetGlobalCountdown" data-permission="events:update" title="Kosongkan tanggal agar landing page menampilkan Tanggal Belum Ditentukan">
                  <i class="fa-solid fa-rotate-left"></i> Belum Ditentukan / Reset
                </button>
                <button type="button" class="btn btn-outline btn-sm" id="btnToggleGlobalClosed" data-permission="events:update">
                  <i class="fa-solid fa-lock"></i> Tutup Seluruh Pendaftaran
                </button>
                <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnSaveGlobalCountdown" data-permission="events:update">
                  <i class="fa-solid fa-floppy-disk"></i> Simpan Tanggal Countdown
                </button>
              </div>
            </div>

            <!-- Preview Status Live Countdown -->
            <div style="margin-top: 24px; padding: 20px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px;">
              <div style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); font-weight: 700; margin-bottom: 8px;">
                <i class="fa-solid fa-eye" style="color: var(--color-primary); margin-right: 6px;"></i> Live Status Landing Page
              </div>
              <div id="adminCountdownLivePreview" style="font-size: 1.15rem; font-weight: 700; color: #fff;">
                Memuat status countdown...
              </div>
            </div>
          </div>
        </div>`,Ta=`<div class="admin-tab-pane" id="pane-bib-settings">
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
            <button type="submit" class="btn btn-primary" id="btnSaveBibSettings" style="flex: 1;">
              <i class="fa-solid fa-floppy-disk"></i> Simpan Pengaturan BIB
            </button>
            <button type="button" class="btn btn-secondary" id="btnTriggerBulkGenerate" style="flex: 1; border-color: #C7D2FE; color: #4338CA;">
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
                <button type="submit" class="btn btn-primary" id="btnSaveQrPrefix">
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

            <button type="submit" class="btn btn-primary" id="btnSaveRpcInstructions" style="width: 100%;">
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

            <button type="submit" class="btn btn-primary" id="btnSavePaymentFeeSettings" style="width: 100%;">
              <i class="fa-solid fa-floppy-disk"></i> Simpan Pengaturan Pembayaran
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</div>

`,Fa=`<div class="admin-tab-pane" id="pane-cms">
          <form id="formCmsSettings">
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
            </div>

            <!-- 1.5. Live Event Stats Grid (4 Statistik Utama) -->
            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-chart-line" style="color: var(--color-primary);"></i> Live Event Stats Grid (Banner Statistik Hero)</h3>
                  <p>Atur 4 kartu statistik highlight yang tampil tepat di bawah banner hero utama.</p>
                </div>
              </div>

              <!-- Stat 1 & Stat 2 -->
              <div class="form-row">
                <div style="flex: 1; padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                  <div style="font-weight: 700; margin-bottom: 12px; color: var(--color-primary);">Statistik #1 (Pelari Terdaftar)</div>
                  <div class="form-group">
                    <label class="form-label">Angka / Nilai</label>
                    <input type="text" class="form-input" id="cmsStat1Val" placeholder="2,500+">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Label / Satuan</label>
                    <input type="text" class="form-input" id="cmsStat1Unit" placeholder="Pelari Terdaftar">
                  </div>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label">Keterangan Singkat</label>
                    <input type="text" class="form-input" id="cmsStat1Desc" placeholder="Antusiasme komunitas nasional">
                  </div>
                </div>

                <div style="flex: 1; padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                  <div style="font-weight: 700; margin-bottom: 12px; color: var(--color-primary);">Statistik #2 (Kategori Lomba)</div>
                  <div class="form-group">
                    <label class="form-label">Angka / Nilai</label>
                    <input type="text" class="form-input" id="cmsStat2Val" placeholder="2">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Label / Satuan</label>
                    <input type="text" class="form-input" id="cmsStat2Unit" placeholder="Kategori Utama">
                  </div>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label">Keterangan Singkat</label>
                    <input type="text" class="form-input" id="cmsStat2Desc" placeholder="Half Marathon 10K & Fun Run 5K">
                  </div>
                </div>
              </div>

              <!-- Stat 3 & Stat 4 -->
              <div class="form-row" style="margin-top: 16px;">
                <div style="flex: 1; padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                  <div style="font-weight: 700; margin-bottom: 12px; color: var(--color-primary);">Statistik #3 (Keamanan Rute)</div>
                  <div class="form-group">
                    <label class="form-label">Angka / Nilai</label>
                    <input type="text" class="form-input" id="cmsStat3Val" placeholder="100%">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Label / Satuan</label>
                    <input type="text" class="form-input" id="cmsStat3Unit" placeholder="Steril & Aman">
                  </div>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label">Keterangan Singkat</label>
                    <input type="text" class="form-input" id="cmsStat3Desc" placeholder="Pengawalan Dishub & Polresta">
                  </div>
                </div>

                <div style="flex: 1; padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                  <div style="font-weight: 700; margin-bottom: 12px; color: var(--color-primary);">Statistik #4 (Hadiah & Doorprize)</div>
                  <div class="form-group">
                    <label class="form-label">Angka / Nilai</label>
                    <input type="text" class="form-input" id="cmsStat4Val" placeholder="Rp 75Jt">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Label / Satuan</label>
                    <input type="text" class="form-input" id="cmsStat4Unit" placeholder="Total Hadiah & Doorprize">
                  </div>
                  <div class="form-group" style="margin-bottom: 0;">
                    <label class="form-label">Keterangan Singkat</label>
                    <input type="text" class="form-input" id="cmsStat4Desc" placeholder="Podium juara & ratusan hadiah menarik">
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. Rute Lari & Google Maps Embed -->
            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-map-location-dot" style="color: var(--color-primary);"></i> Rute Lari & Link Google Maps</h3>
                  <p>Paste link Google Maps (URL langsung atau kode iframe embed) serta gambar rute.</p>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Judul Section Rute</label>
                  <input type="text" class="form-input" id="cmsRouteTitle" placeholder="Rute Lari Resmi & Titik Kumpul">
                </div>
                <div class="form-group">
                  <label class="form-label">URL Gambar Peta Rute Lari</label>
                  <input type="url" class="form-input" id="cmsRouteMapImage" placeholder="https://images.unsplash.com/...">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Deskripsi Rute Lari</label>
                <textarea class="form-input" id="cmsRouteDesc" rows="2" placeholder="Jalur datar beraspal mulus melintasi landmark bersejarah..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">
                  <i class="fa-brands fa-google" style="color: #4285F4;"></i> Link / Embed Google Maps <span class="req">*</span>
                </label>
                <textarea class="form-input" id="cmsGmapsUrl" rows="2" placeholder="Paste link Google Maps Embed atau tag <iframe src='https://www.google.com/maps/embed?...'></iframe> di sini"></textarea>
                <div class="form-hint">
                  Tips: Buka Google Maps > Bagikan (Share) > Sematkan Peta (Embed a map) > Salin HTML / URL src-nya dan paste di sini.
                </div>
              </div>

              <!-- Route Specifications (Start Time & COT) -->
              <div style="margin-top: 16px; padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                <div style="font-weight: 700; margin-bottom: 12px; color: var(--color-primary); font-size: 0.95rem;">
                  <i class="fa-solid fa-stopwatch"></i> Spesifikasi Waktu Flag-Off & Cut Off Time (COT)
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Flag-Off 10K (Waktu Mulai)</label>
                    <input type="text" class="form-input" id="cmsRouteStart10k" placeholder="05:45 WIB">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Cut Off Time (COT) 10K</label>
                    <input type="text" class="form-input" id="cmsRouteCot10k" placeholder="2 Jam 30 Menit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Flag-Off 5K (Waktu Mulai)</label>
                    <input type="text" class="form-input" id="cmsRouteStart5k" placeholder="06:15 WIB">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Cut Off Time (COT) 5K</label>
                    <input type="text" class="form-input" id="cmsRouteCot5k" placeholder="1 Jam 30 Menit">
                  </div>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label">Link Unduh File GPX Rute Resmi</label>
                  <input type="text" class="form-input" id="cmsRouteGpxUrl" placeholder="https://... atau /assets/rute-tegal-run.gpx">
                </div>
              </div>
            </div>

            <!-- 3. Fasilitas, Kategori & Gambar Media -->
            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-images" style="color: var(--color-primary);"></i> Section Fasilitas, Kategori & Media Gambar</h3>
                  <p>Kustomisasi teks pengantar dan gambar preview perlengkapan lomba.</p>
                </div>
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
            </div>

            <!-- 3.5. Perizinan & Kepatuhan Hukum (Legal) -->
            <div class="admin-section">
              <div class="admin-section-header">
                <div>
                  <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary);"></i> Section Perizinan & Kepatuhan Hukum</h3>
                  <p>Pengaturan teks legalitas, rekomendasi PASI, izin instansi, asuransi pelari, dan UU PDP.</p>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Judul Utama Legalitas</label>
                <input type="text" class="form-input" id="cmsLegalTitle" placeholder="Perizinan & Kepatuhan Hukum Resmi">
              </div>

              <div class="form-group">
                <label class="form-label">Deskripsi Legalitas</label>
                <textarea class="form-input" id="cmsLegalDesc" rows="2" placeholder="Tegal Run 2027 diselenggarakan dengan izin resmi pemerintah daerah..."></textarea>
              </div>

              <div class="form-row">
                <div style="flex: 1; padding: 14px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                  <div style="font-weight: 700; margin-bottom: 8px; color: var(--color-primary);">Kartu Legalitas #1 (PASI)</div>
                  <input type="text" class="form-input" id="cmsLegalItem1Title" placeholder="Rekomendasi Resmi PB PASI" style="margin-bottom: 8px;">
                  <textarea class="form-input" id="cmsLegalItem1Desc" rows="2" placeholder="Tersertifikasi standar teknis rute dan aturan perlombaan..."></textarea>
                </div>
                <div style="flex: 1; padding: 14px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                  <div style="font-weight: 700; margin-bottom: 8px; color: var(--color-primary);">Kartu Legalitas #2 (Kepolisian & Dishub)</div>
                  <input type="text" class="form-input" id="cmsLegalItem2Title" placeholder="Izin Kepolisian & Dishub" style="margin-bottom: 8px;">
                  <textarea class="form-input" id="cmsLegalItem2Desc" rows="2" placeholder="Pengamanan jalur dan rekayasa lalu lintas penuh..."></textarea>
                </div>
              </div>

              <div class="form-row" style="margin-top: 14px;">
                <div style="flex: 1; padding: 14px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                  <div style="font-weight: 700; margin-bottom: 8px; color: var(--color-primary);">Kartu Legalitas #3 (Asuransi)</div>
                  <input type="text" class="form-input" id="cmsLegalItem3Title" placeholder="Asuransi Medis Peserta" style="margin-bottom: 8px;">
                  <textarea class="form-input" id="cmsLegalItem3Desc" rows="2" placeholder="Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri..."></textarea>
                </div>
                <div style="flex: 1; padding: 14px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                  <div style="font-weight: 700; margin-bottom: 8px; color: var(--color-primary);">Kartu Legalitas #4 (UU PDP)</div>
                  <input type="text" class="form-input" id="cmsLegalItem4Title" placeholder="Perlindungan Data Pribadi (UU PDP)" style="margin-bottom: 8px;">
                  <textarea class="form-input" id="cmsLegalItem4Desc" rows="2" placeholder="Enkripsi data pendaftaran dan kepatuhan penuh undang-undang..."></textarea>
                </div>
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

              <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border-subtle);">
                <a href="/" target="_blank" class="btn btn-secondary btn-sm">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Lihat Website
                </a>
                <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveCmsSubmit">
                  <i class="fa-solid fa-floppy-disk"></i> Simpan Seluruh Konten Website
                </button>
              </div>
            </div>
          </form>
        </div>`,wa=`<div class="admin-tab-pane" id="pane-admins" data-role="SUPERADMIN">
          <!-- Sub-nav Tabs RBAC -->
          <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary btn-sm" id="btnRbacTabUsers" onclick="switchRbacSubTab('users')">
              <i class="fa-solid fa-users-gear"></i> Daftar Akun Staf Admin
            </button>
            <button type="button" class="btn btn-outline btn-sm" id="btnRbacTabRoles" onclick="switchRbacSubTab('roles')">
              <i class="fa-solid fa-key"></i> Pengaturan Hak Akses 12 Role
            </button>
            <button type="button" class="btn btn-outline btn-sm" id="btnRbacTabMatrix" onclick="switchRbacSubTab('matrix')">
              <i class="fa-solid fa-table-list"></i> Direktori &amp; Arti 12 Role
            </button>
          </div>

          <!-- SUB-SECTION 1: AKUN ADMIN -->
          <div id="rbacSectionUsers" class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-shield-halved" style="color: var(--color-primary);"></i> Manajemen Akun Petugas Admin</h3>
                <p>Kelola akun login staf operasional, divisi keuangan, dan staf lapangan.</p>
              </div>
              <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateAdminModal" data-role="SUPERADMIN">
                <i class="fa-solid fa-user-shield"></i> Tambah Akun Admin
              </button>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
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
          <div id="rbacSectionRoles" class="admin-section" style="display: none;">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-key" style="color: var(--color-primary);"></i> Pengaturan Hak Akses Halaman Role</h3>
                <p>Superadmin dapat menentukan secara fleksibel modul dan halaman apa saja yang boleh diakses oleh setiap role di database.</p>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="btn btn-outline btn-sm" id="btnResetDefaultRoles" style="color: #64748B; border-color: #CBD5E1;">
                  <i class="fa-solid fa-rotate-left"></i> Reset ke 12 Role Default
                </button>
                <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateRoleModal">
                  <i class="fa-solid fa-plus"></i> Tambah Role Baru
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Role</th>
                    <th>Deskripsi Tanggung Jawab</th>
                    <th>Halaman yang Diizinkan</th>
                    <th>Jumlah Petugas</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody id="adminRolesTableBody">
                  <tr>
                    <td colspan="6" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
                      Memuat daftar role...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SUB-SECTION 3: DIREKTORI & PENJELASAN ARTI 12 ROLE -->
          <div id="rbacSectionMatrix" class="admin-section" style="display: none;">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-book-open-reader" style="color: var(--color-primary);"></i> Direktori &amp; Arti Tanggung Jawab 12 Role Resmi</h3>
                <p>Panduan lengkap fungsi operasional dan pembagian wewenang halaman admin untuk setiap divisi kepanitiaan Tegal Run 2027.</p>
              </div>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr style="background: #F8FAFC;">
                    <th style="width: 170px;">Role / Peran</th>
                    <th style="min-width: 250px;">Tugas &amp; Tanggung Jawab Operasional</th>
                    <th style="min-width: 280px;">Akses Halaman yang Diberikan Superadmin</th>
                    <th style="min-width: 140px;">Tingkat Otoritas</th>
                  </tr>
                </thead>
                <tbody id="roleDirectoryTableBody">
                  <!-- Rendered dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>`,Ca=`<div class="admin-tab-pane" id="pane-routes">
          <div class="admin-section">
            <div class="admin-section-header">
              <div>
                <h3><i class="fa-solid fa-map-pin" style="color: var(--color-primary);"></i> Manajemen Rute &amp; Checkpoint</h3>
                <p>Kelola titik-titik checkpoint, water station, dan pos medis pada rute lari.</p>
              </div>
              <button class="btn btn-primary btn-sm btn-glow" id="btnOpenCreateRouteModal" data-permission="events:update">
                <i class="fa-solid fa-plus"></i> Tambah Checkpoint
              </button>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
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
                  <tr><td colspan="8" style="text-align:center;padding:30px;color:var(--color-text-muted);">Memuat data checkpoint...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>`,Pa=`<div class="admin-tab-pane" id="pane-notifications">
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
                    <button type="button" class="btn btn-primary btn-sm btn-glow" id="btnGenerateWaQr">
                      <i class="fa-solid fa-qrcode"></i> Generate QR Code WhatsApp Web
                    </button>
                    <button type="button" class="btn btn-outline btn-sm" id="btnDisconnectWa" style="display: none; border-color: #EF4444; color: #EF4444;">
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
                <button type="submit" class="btn btn-primary btn-glow" id="btnSaveNotifSettings">
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
                <button type="button" class="btn btn-secondary" id="btnSendTestNotif">
                  <i class="fa-solid fa-vial"></i> Kirim Tes
                </button>
              </div>
            </div>
          </div>
        </div>`,Da=`<div class="admin-tab-pane" id="pane-notif-logs">
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
                <button class="btn btn-primary btn-sm btn-glow" id="btnBatchSendNotif">
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
        </div>`,Na=`<div class="admin-tab-pane" id="pane-whatsapp-web">
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
                    <button type="button" class="btn btn-primary btn-glow" id="btnSendWaDirectMsg" style="height: 100%; min-height: 52px; padding: 0 20px;">
                      <i class="fa-solid fa-paper-plane"></i> Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`,La=`<div class="admin-tab-pane" id="pane-logs">
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
        </div>`,Ra=`<!-- MODAL 1: EVENT CREATE / EDIT -->
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
    <div class="admin-modal-dialog" style="max-width: 760px;">
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

          <div style="margin-top: 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <strong style="font-size: 0.9rem; color: #0F172A;">Pilih Halaman Admin yang Dapat Diakses:</strong>
              <div style="font-size: 0.76rem; color: #64748B;">Petugas hanya akan melihat menu dan memiliki hak akses sesuai halaman yang dicentang.</div>
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button type="button" class="btn btn-outline btn-sm" id="btnSelectAllPages" style="padding: 2px 8px; font-size: 0.72rem;">Pilih Semua</button>
              <button type="button" class="btn btn-outline btn-sm" id="btnClearAllPages" style="padding: 2px 8px; font-size: 0.72rem;">Bersihkan</button>
              <button type="button" class="btn btn-outline btn-sm" id="btnPresetDefaultPages" style="padding: 2px 8px; font-size: 0.72rem;">Preset Standar</button>
            </div>
          </div>

          <!-- Module Checkboxes Grid -->
          <div id="roleModulesContainer" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; max-height: 380px; overflow-y: auto; padding: 4px;">
            <!-- Populated dynamically from SYSTEM_MODULES -->
          </div>
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
          <button type="submit" class="btn btn-primary btn-sm btn-glow" id="btnSaveRouteSubmit">
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
  </div>`,Ee=typeof window<"u"&&["5173","5174","5175","4173","3000"].includes(window.location.port)?"/api":"http://localhost:3000/api",f={token:localStorage.getItem("tegal_admin_token")||null,profile:null,activeTab:"dashboard",globalSettings:{eventCountdownDate:null,isRegistrationClosed:!1},events:[],participants:[],orders:[],admins:[],roles:[],auditLogs:[]};function l(t="success",a="",e=""){const n=document.getElementById("adminToastContainer");if(!n)return;const i=document.createElement("div");i.className=`toast toast-${t}`,i.innerHTML=`
    <div class="toast-icon">
      <i class="${t==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${a}</h5>
      <p>${e}</p>
    </div>
  `,n.appendChild(i),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),300)},4e3)}function S({title:t="Konfirmasi Tindakan",message:a="Apakah Anda yakin ingin melanjutkan tindakan ini?",confirmText:e="Ya, Lanjutkan",cancelText:n="Batal",type:i="warning"}={}){return new Promise(s=>{const o=document.getElementById("confirmModalBackdrop"),r=document.getElementById("confirmModalTitle"),d=document.getElementById("confirmModalMessage"),c=document.getElementById("confirmModalIcon"),p=document.getElementById("btnConfirmOk"),m=document.getElementById("btnConfirmCancel");if(!o){s(window.confirm(a));return}r&&(r.textContent=t),d&&(d.textContent=a),p&&(p.textContent=e),m&&(m.textContent=n),c&&(c.className=`confirm-modal-icon ${i}`,c.innerHTML=i==="danger"?'<i class="fa-solid fa-trash-can"></i>':'<i class="fa-solid fa-triangle-exclamation"></i>'),p&&(p.style.background=i==="danger"?"#EF4444":"",p.style.borderColor=i==="danger"?"#EF4444":""),o.classList.add("open");const u=()=>{v(),s(!0)},y=()=>{v(),s(!1)},v=()=>{o.classList.remove("open"),p==null||p.removeEventListener("click",u),m==null||m.removeEventListener("click",y)};p==null||p.addEventListener("click",u),m==null||m.addEventListener("click",y)})}function g(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function C(t){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(t||0)}function j(t){if(!t||!t.role)return;const a=t.role.name||"",e=Array.isArray(t.role.permissions)?t.role.permissions:[],n=a==="SUPERADMIN"||e.includes("*");document.querySelectorAll("[data-role]").forEach(i=>{i.getAttribute("data-role")==="SUPERADMIN"&&!n?i.style.display="none":i.style.display=""}),document.querySelectorAll("[data-page]").forEach(i=>{if(n){i.style.display="";return}const s=i.getAttribute("data-page");e.includes(s)?i.style.display="":i.style.display="none"}),document.querySelectorAll("[data-permission]").forEach(i=>{if(n){i.style.display="";return}const s=i.getAttribute("data-permission"),[o]=s.split(":");e.includes(s)||e.includes(`${o}:*`)?i.style.display="":i.style.display="none"})}async function b(t,a={},e=null){let n={};typeof a=="string"?n={method:a,...e?{body:JSON.stringify(e)}:{}}:n=a||{};const i={Accept:"application/json","Content-Type":"application/json",...n.headers};f.token&&(i.Authorization=`Bearer ${f.token}`);try{const s=await fetch(`${Ee}${t}`,{...n,headers:i});if(s.status===401)throw le(),new Error("Sesi autentikasi telah habis. Silakan login kembali.");const o=await s.text();let r;try{r=o?JSON.parse(o):{}}catch{throw new Error(`Server tidak merespons JSON (HTTP ${s.status}). Pastikan backend aktif.`)}return r}catch(s){throw s.message.includes("Failed to fetch")||s.message.includes("NetworkError")?new Error("Gagal terhubung ke backend. Pastikan server di localhost:3000 sedang aktif."):s}}let ne=null;async function da(){try{const t=await b("/settings/countdown");t.status==="success"&&(f.globalSettings=t.data,ca(t.data))}catch(t){console.warn("Gagal memuat pengaturan global:",t)}}function xe(t){const a=document.getElementById("adminCountdownLivePreview");if(!a)return;if(ne&&(clearInterval(ne),ne=null),!t){a.innerHTML='<span style="color: #f59e0b;"><i class="fa-solid fa-clock-rotate-left"></i> TANGGAL BELUM DITENTUKAN</span> — Tampilan di website menampilkan placeholder status -- Hari -- Jam.';return}const e=new Date(t).getTime(),n=()=>{const i=Date.now(),s=e-i;if(s<=0){a.innerHTML='<span style="color: #ef4444;"><i class="fa-solid fa-flag-checkered"></i> RACE DAY SUDAH LEWAT / SEDANG BERLANGSUNG</span>';return}const o=Math.floor(s/(1e3*60*60*24)),r=Math.floor(s%(1e3*60*60*24)/(1e3*60*60)),d=Math.floor(s%(1e3*60*60)/(1e3*60)),c=Math.floor(s%(1e3*60)/1e3);a.innerHTML=`<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> AKTIF:</span> ${o} Hari : ${r} Jam : ${d} Menit : ${c} Detik (${new Date(t).toLocaleString("id-ID",{dateStyle:"full",timeStyle:"short"})} WIB)`};n(),ne=setInterval(n,1e3)}function ca(t){const a=document.getElementById("globalCountdownInput"),e=document.getElementById("globalStatusBadge"),n=document.getElementById("btnToggleGlobalClosed");if(a)if(t.eventCountdownDate){const i=new Date(t.eventCountdownDate),s=o=>String(o).padStart(2,"0");a.value=`${i.getFullYear()}-${s(i.getMonth()+1)}-${s(i.getDate())}T${s(i.getHours())}:${s(i.getMinutes())}`}else a.value="";xe(t.eventCountdownDate),e&&(t.isRegistrationClosed?(e.className="event-status-tag closed",e.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Resmi Ditutup'):(e.className="event-status-tag open",e.innerHTML='<i class="fa-solid fa-signal"></i> Pendaftaran Aktif / Buka')),n&&(t.isRegistrationClosed?(n.className="btn btn-secondary btn-sm",n.innerHTML='<i class="fa-solid fa-lock-open"></i> Buka Kembali Pendaftaran'):(n.className="btn btn-outline btn-sm",n.innerHTML='<i class="fa-solid fa-lock"></i> Tutup Seluruh Pendaftaran'))}async function Ma(){var e;const t=document.getElementById("globalCountdownInput");if(!t||!t.value){l("warning","Peringatan","Harap tentukan tanggal dan waktu countdown, atau klik tombol Belum Ditentukan.");return}const a=new Date(t.value).toISOString();try{const n=await b("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:a,isRegistrationClosed:((e=f.globalSettings)==null?void 0:e.isRegistrationClosed)||!1})});n.status==="success"?(f.globalSettings.eventCountdownDate=a,xe(a),l("success","Tersimpan","Tanggal target race day berhasil diperbarui di database!")):l("error","Gagal",n.message)}catch(n){l("error","Kesalahan Server",n.message)}}async function Ka(){var a;if(await S({title:"Kosongkan Tanggal Countdown?",message:'Apakah Anda yakin ingin mengosongkan tanggal hitung mundur? Landing page akan menampilkan status "TANGGAL BELUM DITENTUKAN".',confirmText:"Ya, Kosongkan Tanggal",type:"warning"}))try{const e=await b("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:null,isRegistrationClosed:((a=f.globalSettings)==null?void 0:a.isRegistrationClosed)||!1})});if(e.status==="success"){f.globalSettings.eventCountdownDate=null;const n=document.getElementById("globalCountdownInput");n&&(n.value=""),xe(null),l("success","Dikosongkan","Tanggal target race day telah dikosongkan. Landing page menampilkan status belum ditentukan.")}else l("error","Gagal",e.message)}catch(e){l("error","Kesalahan Server",e.message)}}async function Oa(){var n,i;const a=!(((n=f.globalSettings)==null?void 0:n.isRegistrationClosed)||!1);if(await S({title:a?"Tutup Seluruh Pendaftaran?":"Buka Kembali Pendaftaran?",message:a?"Apakah Anda yakin ingin MENUTUP seluruh pendaftaran website? Calon peserta tidak akan dapat mendaftar lagi.":"Apakah Anda ingin MEMBUKA KEMBALI seluruh pendaftaran website?",confirmText:a?"Ya, Tutup Pendaftaran":"Ya, Buka Pendaftaran",type:a?"danger":"warning"}))try{const s=await b("/admin/settings/countdown",{method:"PUT",body:JSON.stringify({eventCountdownDate:((i=f.globalSettings)==null?void 0:i.eventCountdownDate)||null,isRegistrationClosed:a})});s.status==="success"?(f.globalSettings.isRegistrationClosed=a,ca(f.globalSettings),l("success","Status Berubah",a?"Pendaftaran resmi DITUTUP!":"Pendaftaran resmi DIBUKA!")):l("error","Gagal",s.message)}catch(s){l("error","Kesalahan Server",s.message)}}async function K(){try{const t=await b("/admin/events");if(t.status==="success"){f.events=t.data,$a(t.data),Yt();const a=document.getElementById("partFormEventId");a&&(a.innerHTML=t.data.map(n=>`
          <option value="${n.id}">${g(n.ticketName)} (${g(n.category)})</option>
        `).join(""));const e=document.getElementById("navEventsCount");e&&(e.textContent=t.data.length)}}catch(t){console.error("Failed to load events:",t)}}function $a(t){const a=document.getElementById("adminEventsContainer");if(a){if(t.length===0){a.innerHTML='<div style="grid-column: span 2; text-align: center; padding: 40px; color: #94A3B8;">Belum ada event/kategori yang ditambahkan.</div>';return}a.innerHTML="",t.forEach(e=>{var s;const n=document.createElement("div");n.className=`admin-event-card ${e.isClosed?"closed-event":""}`;const i=e.eventDate?new Date(e.eventDate).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})+" WIB":"Belum diatur";n.innerHTML=`
      <div class="admin-event-card-header">
        <div>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0 0 4px 0;">
            ${g(e.ticketName)}
          </h4>
          <span style="font-size: 0.8rem; color: #64748B;">
            Kategori: <strong>${g(e.category)}</strong> • Pelaksanaan: <strong>${i}</strong>
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
            <button class="btn btn-outline btn-sm btn-manage-benefits" data-id="${e.id}" data-name="${g(e.ticketName)}" data-permission="benefits:manage" title="Kelola Fasilitas / Benefit Tiket" style="color: #4F46E5; border-color: #C7D2FE;">
              <i class="fa-solid fa-gift"></i> Benefit (${e.benefits?e.benefits.length:((s=e._count)==null?void 0:s.benefits)||0})
            </button>
            <button class="btn btn-outline btn-sm btn-delete-event" data-id="${e.id}" data-name="${g(e.ticketName)}" data-permission="events:delete" style="color: #EF4444; border-color: #FECACA;">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>

          <button class="btn ${e.isClosed?"btn-secondary":"btn-outline"} btn-sm btn-toggle-close-event" data-id="${e.id}" data-closed="${e.isClosed}" data-permission="events:update">
            <i class="${e.isClosed?"fa-solid fa-lock-open":"fa-solid fa-lock"}"></i>
            ${e.isClosed?"Buka Kategori":"Tutup Kategori"}
          </button>
        </div>
      </div>
    `,a.appendChild(n)}),document.querySelectorAll(".btn-quick-save-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=parseInt(document.getElementById(`eventStock-${n}`).value,10),s=parseFloat(document.getElementById(`eventPrice-${n}`).value);await sa(n,{stock:i,price:s},"Kuota dan harga kategori berhasil diperbarui!")})}),document.querySelectorAll(".btn-toggle-close-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),s=!(e.getAttribute("data-closed")==="true");await S({title:s?"Tutup Kategori Event?":"Buka Kategori Event?",message:`Apakah Anda yakin ingin ${s?"MENUTUP":"MEMBUKA"} pendaftaran untuk kategori event ini?`,confirmText:s?"Ya, Tutup Kategori":"Ya, Buka Kategori",type:s?"danger":"warning"})&&await sa(n,{isClosed:s},s?"Kategori ditutup!":"Kategori dibuka!")})}),document.querySelectorAll(".btn-manage-benefits").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");ma(n,i)})}),document.querySelectorAll(".btn-edit-event").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=f.events.find(s=>s.id===n);i&&Ua(i)})}),document.querySelectorAll(".btn-delete-event").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await S({title:"Hapus Kategori Event?",message:`PERINGATAN: Apakah Anda yakin ingin menghapus kategori "${i}"? Seluruh data yang terkait akan dihapus permanen.`,confirmText:"Ya, Hapus Permanen",type:"danger"})&&await za(n)})}),j(f.profile)}}function Ha(){var t;document.getElementById("eventFormId").value="",document.getElementById("modalEventTitle").innerHTML='<i class="fa-solid fa-calendar-plus" style="color: var(--color-primary);"></i> Tambah Event Baru',document.getElementById("eventFormTicketName").value="",document.getElementById("eventFormCategory").value="10K",document.getElementById("eventFormStock").value=500,document.getElementById("eventFormPrice").value=25e4,document.getElementById("eventFormDate").value="",document.getElementById("eventFormTicketImage").value="",document.getElementById("eventFormMedalImage").value="",document.getElementById("eventFormIsClosed").checked=!1,(t=document.getElementById("modalEventBackdrop"))==null||t.classList.add("open")}function Ua(t){var a;if(document.getElementById("eventFormId").value=t.id,document.getElementById("modalEventTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Event: ${g(t.ticketName)}`,document.getElementById("eventFormTicketName").value=t.ticketName,document.getElementById("eventFormCategory").value=t.category,document.getElementById("eventFormStock").value=t.stock,document.getElementById("eventFormPrice").value=t.price,document.getElementById("eventFormTicketImage").value=t.ticketImage||"",document.getElementById("eventFormMedalImage").value=t.medalImage||"",t.eventDate){const e=new Date(t.eventDate),n=i=>String(i).padStart(2,"0");document.getElementById("eventFormDate").value=`${e.getFullYear()}-${n(e.getMonth()+1)}-${n(e.getDate())}T${n(e.getHours())}:${n(e.getMinutes())}`}else document.getElementById("eventFormDate").value="";document.getElementById("eventFormIsClosed").checked=!!t.isClosed,(a=document.getElementById("modalEventBackdrop"))==null||a.classList.add("open")}async function _a(t){var m;t.preventDefault();const a=document.getElementById("eventFormId").value,e=document.getElementById("eventFormTicketName").value.trim(),n=document.getElementById("eventFormCategory").value.trim(),i=parseInt(document.getElementById("eventFormStock").value,10),s=parseFloat(document.getElementById("eventFormPrice").value),o=document.getElementById("eventFormDate").value,r=document.getElementById("eventFormTicketImage").value.trim()||null,d=document.getElementById("eventFormMedalImage").value.trim()||null,c=document.getElementById("eventFormIsClosed").checked,p={ticketName:e,category:n,stock:i,price:s,ticketImage:r,medalImage:d,eventDate:o?new Date(o).toISOString():null,isClosed:c};try{let u;a?u=await b(`/admin/events/${a}`,{method:"PUT",body:JSON.stringify(p)}):u=await b("/admin/events",{method:"POST",body:JSON.stringify(p)}),u.status==="success"?(l("success","Berhasil",a?"Event berhasil diperbarui!":"Event baru berhasil ditambahkan!"),(m=document.getElementById("modalEventBackdrop"))==null||m.classList.remove("open"),K()):l("error","Gagal",u.message||"Validasi gagal")}catch(u){l("error","Kesalahan Server",u.message)}}async function sa(t,a,e){try{const n=await b(`/admin/events/${t}`,{method:"PUT",body:JSON.stringify(a)});n.status==="success"?(l("success","Berhasil",e),K()):l("error","Gagal",n.message)}catch(n){l("error","Kesalahan Server",n.message)}}async function za(t){try{const a=await b(`/admin/events/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Kategori event berhasil dihapus!"),K()):l("error","Gagal Menghapus",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}let se=null,de=null;async function ma(t,a){var s;se=t,de=null;const e=document.getElementById("benefitFormEventId");e&&(e.value=t);const n=document.getElementById("benefitFormId");n&&(n.value="");const i=document.getElementById("benefitModalSubtitle");i&&(i.textContent=`Kategori: ${a}`),Ie(),(s=document.getElementById("modalEventBenefitsBackdrop"))==null||s.classList.add("open"),await Be(t)}async function Be(t){const a=document.getElementById("eventBenefitsTableBody"),e=document.getElementById("benefitListCount");a&&(a.innerHTML='<tr><td colspan="3" style="text-align: center; padding: 20px; color: #94A3B8;"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat benefit...</td></tr>');try{const n=await b(`/admin/events/${t}/benefits`);if(n.status==="success"){const i=n.data||[];e&&(e.textContent=i.length),Ga(i)}else l("error","Gagal Memuat Benefit",n.message)}catch(n){console.error("Failed to load event benefits:",n),a&&(a.innerHTML=`<tr><td colspan="3" style="text-align: center; padding: 20px; color: #EF4444;">Gagal memuat data: ${g(n.message)}</td></tr>`)}}function Ga(t){const a=document.getElementById("eventBenefitsTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="3" style="text-align: center; padding: 24px; color: #94A3B8;">Belum ada benefit untuk kategori ini. Tambahkan melalui form di atas.</td></tr>';return}a.innerHTML=t.map(e=>`
    <tr>
      <td>
        <div style="font-weight: 700; color: #0F172A; display: flex; align-items: center; gap: 8px;">
          ${e.image?`<img src="${g(e.image)}" alt="" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px;">`:'<i class="fa-solid fa-medal" style="color: #F97316;"></i>'}
          <span>${g(e.name)}</span>
        </div>
      </td>
      <td style="font-size: 0.85rem; color: #475569;">
        ${g(e.description)}
      </td>
      <td style="text-align: center; white-space: nowrap;">
        <div style="display: flex; gap: 6px; justify-content: center;">
          <button type="button" class="btn btn-secondary btn-sm btn-edit-benefit" data-id="${e.id}" data-name="${g(e.name)}" data-desc="${g(e.description)}" data-image="${g(e.image||"")}" style="padding: 4px 8px; font-size: 0.75rem;">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button type="button" class="btn btn-outline btn-sm btn-delete-benefit" data-id="${e.id}" data-name="${g(e.name)}" style="padding: 4px 8px; font-size: 0.75rem; color: #EF4444; border-color: #FECACA;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join(""),a.querySelectorAll(".btn-edit-benefit").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name"),s=e.getAttribute("data-desc"),o=e.getAttribute("data-image");de=n;const r=document.getElementById("benefitFormId");r&&(r.value=n);const d=document.getElementById("benefitFormName");d&&(d.value=i);const c=document.getElementById("benefitFormDesc");c&&(c.value=s);const p=document.getElementById("benefitFormImage");p&&(p.value=o||"");const m=document.getElementById("benefitFormTitle");m&&(m.innerHTML=`<i class="fa-solid fa-pen" style="color: var(--color-primary);"></i> Edit Benefit: ${g(i)}`);const u=document.getElementById("btnCancelBenefitEdit");u&&(u.style.display="inline-block");const y=document.getElementById("btnSaveBenefitSubmit");y&&(y.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Perbarui Benefit')})}),a.querySelectorAll(".btn-delete-benefit").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await S({title:"Hapus Fasilitas / Benefit?",message:`Apakah Anda yakin ingin menghapus "${i}" dari fasilitas event ini?`,confirmText:"Ya, Hapus",type:"danger"})&&await ja(n)})})}}function Ie(){de=null;const t=document.getElementById("benefitFormId");t&&(t.value="");const a=document.getElementById("benefitFormName");a&&(a.value="");const e=document.getElementById("benefitFormDesc");e&&(e.value="");const n=document.getElementById("benefitFormImage");n&&(n.value="");const i=document.getElementById("benefitFormTitle");i&&(i.innerHTML='<i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Fasilitas / Benefit Baru');const s=document.getElementById("btnCancelBenefitEdit");s&&(s.style.display="none");const o=document.getElementById("btnSaveBenefitSubmit");o&&(o.innerHTML='<i class="fa-solid fa-check"></i> Simpan Benefit')}async function Wa(t){var c,p,m,u,y;t.preventDefault();const a=se||((c=document.getElementById("benefitFormEventId"))==null?void 0:c.value),e=de||((p=document.getElementById("benefitFormId"))==null?void 0:p.value),n=(m=document.getElementById("benefitFormName"))==null?void 0:m.value.trim(),i=(u=document.getElementById("benefitFormDesc"))==null?void 0:u.value.trim(),s=((y=document.getElementById("benefitFormImage"))==null?void 0:y.value.trim())||null;if(!a){l("warning","Peringatan","Event ID tidak terdeteksi.");return}if(!n||!i){l("warning","Validasi Gagal","Nama dan deskripsi benefit wajib diisi.");return}const o={name:n,description:i,image:s},r=document.getElementById("btnSaveBenefitSubmit"),d=r?r.innerHTML:"";r&&(r.disabled=!0,r.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Menyimpan...');try{let v;e?v=await b(`/admin/benefits/${e}`,{method:"PUT",body:JSON.stringify(o)}):v=await b(`/admin/events/${a}/benefits`,{method:"POST",body:JSON.stringify(o)}),v.status==="success"?(l("success","Berhasil",e?"Benefit berhasil diperbarui!":"Benefit baru berhasil ditambahkan!"),Ie(),await Be(a),await K()):l("error","Gagal Menyimpan Benefit",v.message||"Terjadi kesalahan")}catch(v){l("error","Kesalahan",v.message)}finally{r&&(r.disabled=!1,r.innerHTML=d)}}async function ja(t){try{const a=await b(`/admin/benefits/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Dihapus","Benefit berhasil dihapus dari database."),se&&await Be(se),await K()):l("error","Gagal Menghapus",a.message)}catch(a){l("error","Kesalahan",a.message)}}window.openEventBenefitsModal=ma;const qa=`<!-- =========================================================================
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

`;async function pa(){try{const t=await b("/admin/settings/website");if(t.status==="success"&&t.data){const a=t.data,e=(n,i)=>{const s=document.getElementById(n);s&&(s.value=i??"")};e("cmsSiteTitle",a.site_title),e("cmsSiteTagline",a.site_tagline),e("cmsHeroBadge",a.hero_badge),e("cmsHeroTitle",a.hero_title),e("cmsHeroSubtitle",a.hero_subtitle),e("cmsHeroBgImage",a.hero_bg_image),e("cmsStat1Val",a.stat_1_val),e("cmsStat1Unit",a.stat_1_unit),e("cmsStat1Desc",a.stat_1_desc),e("cmsStat2Val",a.stat_2_val),e("cmsStat2Unit",a.stat_2_unit),e("cmsStat2Desc",a.stat_2_desc),e("cmsStat3Val",a.stat_3_val),e("cmsStat3Unit",a.stat_3_unit),e("cmsStat3Desc",a.stat_3_desc),e("cmsStat4Val",a.stat_4_val),e("cmsStat4Unit",a.stat_4_unit),e("cmsStat4Desc",a.stat_4_desc),e("cmsRouteTitle",a.route_title),e("cmsRouteDesc",a.route_desc),e("cmsRouteMapImage",a.route_map_image),e("cmsGmapsUrl",a.route_gmaps_url),e("cmsRouteStart10k",a.route_start_10k),e("cmsRouteStart5k",a.route_start_5k),e("cmsRouteCot10k",a.route_cot_10k),e("cmsRouteCot5k",a.route_cot_5k),e("cmsRouteGpxUrl",a.route_gpx_url),e("cmsFacilitiesTitle",a.facilities_title),e("cmsFacilitiesDesc",a.facilities_desc),e("cmsFacilitiesImage",a.facilities_image),e("cmsTicketsTitle",a.tickets_title),e("cmsTicketsDesc",a.tickets_desc),e("cmsMedalImage",a.medal_image),e("cmsLegalTitle",a.legal_title),e("cmsLegalDesc",a.legal_desc),e("cmsLegalItem1Title",a.legal_item_1_title),e("cmsLegalItem1Desc",a.legal_item_1_desc),e("cmsLegalItem2Title",a.legal_item_2_title),e("cmsLegalItem2Desc",a.legal_item_2_desc),e("cmsLegalItem3Title",a.legal_item_3_title),e("cmsLegalItem3Desc",a.legal_item_3_desc),e("cmsLegalItem4Title",a.legal_item_4_title),e("cmsLegalItem4Desc",a.legal_item_4_desc),e("cmsContactEmail",a.contact_email),e("cmsContactPhone",a.contact_phone),e("cmsContactAddress",a.contact_address),e("cmsFooterCopyright",a.footer_copyright)}}catch(t){console.warn("Gagal memuat pengaturan website CMS:",t)}}async function oa(t){var s;t.preventDefault();const a=document.getElementById("btnSaveCmsSubmit"),e=a?a.innerHTML:"";a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Menyimpan Pengaturan...');const n=o=>{var r,d;return((d=(r=document.getElementById(o))==null?void 0:r.value)==null?void 0:d.trim())||""},i={site_title:n("cmsSiteTitle"),site_tagline:n("cmsSiteTagline"),hero_badge:n("cmsHeroBadge"),hero_title:n("cmsHeroTitle"),hero_subtitle:n("cmsHeroSubtitle"),hero_bg_image:n("cmsHeroBgImage"),stat_1_val:n("cmsStat1Val"),stat_1_unit:n("cmsStat1Unit"),stat_1_desc:n("cmsStat1Desc"),stat_2_val:n("cmsStat2Val"),stat_2_unit:n("cmsStat2Unit"),stat_2_desc:n("cmsStat2Desc"),stat_3_val:n("cmsStat3Val"),stat_3_unit:n("cmsStat3Unit"),stat_3_desc:n("cmsStat3Desc"),stat_4_val:n("cmsStat4Val"),stat_4_unit:n("cmsStat4Unit"),stat_4_desc:n("cmsStat4Desc"),route_title:n("cmsRouteTitle"),route_desc:n("cmsRouteDesc"),route_map_image:n("cmsRouteMapImage"),route_gmaps_url:n("cmsGmapsUrl"),route_start_10k:n("cmsRouteStart10k"),route_start_5k:n("cmsRouteStart5k"),route_cot_10k:n("cmsRouteCot10k"),route_cot_5k:n("cmsRouteCot5k"),route_gpx_url:n("cmsRouteGpxUrl"),facilities_title:n("cmsFacilitiesTitle"),facilities_desc:n("cmsFacilitiesDesc"),facilities_image:n("cmsFacilitiesImage"),tickets_title:n("cmsTicketsTitle"),tickets_desc:n("cmsTicketsDesc"),medal_image:n("cmsMedalImage"),legal_title:n("cmsLegalTitle"),legal_desc:n("cmsLegalDesc"),legal_item_1_title:n("cmsLegalItem1Title"),legal_item_1_desc:n("cmsLegalItem1Desc"),legal_item_2_title:n("cmsLegalItem2Title"),legal_item_2_desc:n("cmsLegalItem2Desc"),legal_item_3_title:n("cmsLegalItem3Title"),legal_item_3_desc:n("cmsLegalItem3Desc"),legal_item_4_title:n("cmsLegalItem4Title"),legal_item_4_desc:n("cmsLegalItem4Desc"),contact_email:n("cmsContactEmail"),contact_phone:n("cmsContactPhone"),contact_address:n("cmsContactAddress"),footer_copyright:n("cmsFooterCopyright")};try{const o=await b("/admin/settings/website",{method:"PUT",body:JSON.stringify(i)});if(o.status==="success"){if(l("success","Tersimpan","Konten website dan Google Maps berhasil diperbarui!"),(s=o.data)!=null&&s.route_gmaps_url){const r=document.getElementById("cmsGmapsUrl");r&&(r.value=o.data.route_gmaps_url)}}else l("error","Gagal Menyimpan",o.message||"Terjadi kesalahan")}catch(o){l("error","Kesalahan Server",o.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}window.loadCmsSettings=pa;let Z=null;async function Se(){const t=document.getElementById("routePointsTableBody");if(t){t.innerHTML='<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--color-text-muted);">Memuat data...</td></tr>';try{const a=await b("/admin/routes/points");a.status==="success"?(adminState.routePoints=a.data,Ja(a.data)):t.innerHTML='<tr><td colspan="8" style="text-align:center;padding:20px;color:#EF4444;">Gagal memuat data checkpoint.</td></tr>'}catch(a){t.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:20px;color:#EF4444;">${a.message}</td></tr>`}}}function Ja(t){const a=document.getElementById("routePointsTableBody");if(a){if(!t||t.length===0){a.innerHTML='<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--color-text-muted);">Belum ada checkpoint. Klik "Tambah Checkpoint" untuk menambahkan.</td></tr>';return}a.innerHTML=t.map(e=>`
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
  `).join("")}}function Qa(){Z=null;const t=document.getElementById("modalRoutePointTitle");t&&(t.innerHTML='<i class="fa-solid fa-map-pin" style="color:var(--color-primary);"></i> Tambah Checkpoint Baru'),document.getElementById("routeFormId").value="",document.getElementById("routeFormOrderIndex").value="",document.getElementById("routeFormDistanceKm").value="",document.getElementById("routeFormName").value="",document.getElementById("routeFormCategory").value="ALL",document.getElementById("routeFormIcon").value="",document.getElementById("routeFormDescription").value="",document.getElementById("routeFormImage").value="",document.getElementById("routeFormIsWaterStation").checked=!1,document.getElementById("routeFormIsMedicalSpot").checked=!1,document.getElementById("modalRoutePointBackdrop").classList.add("open")}function Va(t){const a=typeof t=="string"?JSON.parse(t):t;Z=a.id;const e=document.getElementById("modalRoutePointTitle");e&&(e.innerHTML='<i class="fa-solid fa-pen" style="color:var(--color-primary);"></i> Edit Checkpoint'),document.getElementById("routeFormId").value=a.id,document.getElementById("routeFormOrderIndex").value=a.orderIndex,document.getElementById("routeFormDistanceKm").value=a.distanceKm,document.getElementById("routeFormName").value=a.name,document.getElementById("routeFormCategory").value=a.category||"ALL",document.getElementById("routeFormIcon").value=a.icon||"",document.getElementById("routeFormDescription").value=a.description||"",document.getElementById("routeFormImage").value=a.image||"",document.getElementById("routeFormIsWaterStation").checked=!!a.isWaterStation,document.getElementById("routeFormIsMedicalSpot").checked=!!a.isMedicalSpot,document.getElementById("modalRoutePointBackdrop").classList.add("open")}async function Ya(t){t.preventDefault();const a=document.getElementById("btnSaveRouteSubmit");a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');const e={orderIndex:parseInt(document.getElementById("routeFormOrderIndex").value,10),distanceKm:parseFloat(document.getElementById("routeFormDistanceKm").value),name:document.getElementById("routeFormName").value.trim(),category:document.getElementById("routeFormCategory").value,icon:document.getElementById("routeFormIcon").value.trim()||null,description:document.getElementById("routeFormDescription").value.trim()||null,image:document.getElementById("routeFormImage").value.trim()||null,isWaterStation:document.getElementById("routeFormIsWaterStation").checked,isMedicalSpot:document.getElementById("routeFormIsMedicalSpot").checked};try{let n;Z?n=await b(`/admin/routes/points/${Z}`,"PUT",e):n=await b("/admin/routes/points","POST",e),n.status==="success"?(l("success","Berhasil!",Z?"Checkpoint berhasil diperbarui.":"Checkpoint baru berhasil ditambahkan."),document.getElementById("modalRoutePointBackdrop").classList.remove("open"),await Se()):l("error","Gagal",n.message||"Terjadi kesalahan.")}catch(n){l("error","Error",n.message)}finally{a&&(a.disabled=!1,a.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Simpan Checkpoint')}}async function Xa(t){if(await S({title:"Hapus Checkpoint",message:"Checkpoint ini akan dihapus permanen dari database. Lanjutkan?",confirmText:"Ya, Hapus",type:"danger"}))try{const e=await b(`/admin/routes/points/${t}`,"DELETE");e.status==="success"?(l("success","Dihapus!","Checkpoint berhasil dihapus."),await Se()):l("error","Gagal",e.message||"Gagal menghapus checkpoint.")}catch(e){l("error","Error",e.message)}}window.openEditRoutePoint=Va;window.deleteRoutePointApi=Xa;async function Za(){try{const t=await b("/admin/notifications/settings");if(t&&t.status==="success"&&t.data){const a=t.data,e=document.getElementById("notifSettingChannel");e&&a.notif_channel&&(e.value=a.notif_channel);const n=document.getElementById("notifSettingDispatchMode");n&&a.wa_dispatch_mode&&(n.value=a.wa_dispatch_mode);const i=(s,o)=>{const r=document.getElementById(s);r&&(r.value=o||"")};i("notifSettingWaUrl",a.wa_gateway_url),i("notifSettingWaToken",a.wa_api_token),i("notifSettingWaSender",a.wa_sender_number),i("notifSettingSmtpHost",a.email_smtp_host),i("notifSettingSmtpPort",a.email_smtp_port),i("notifSettingSmtpUser",a.email_smtp_user),i("notifSettingSmtpPass",a.email_smtp_pass),i("notifSettingEmailFromName",a.email_from_name),i("notifSettingTemplatePaid",a.template_msg_paid),i("notifSettingTemplatePending",a.template_msg_pending),i("notifSettingTemplateCancel",a.template_msg_cancel),ce(a.wa_session)}}catch(t){l("error","Gagal Memuat Pengaturan",t.message)}}function ce(t){const a=document.getElementById("waSessionStatusBadge"),e=document.getElementById("waQrImageContainer"),n=document.getElementById("waQrCountdown"),i=document.getElementById("waDeviceInfo"),s=document.getElementById("waLastSyncInfo"),o=document.getElementById("btnDisconnectWa");if(!t||t.status==="DISCONNECTED"){a&&(a.innerHTML=`
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
        <img src="${g(t.qrCodeUrl)}" alt="WhatsApp Web QR Code" style="width: 220px; height: 220px; display: block; border-radius: 8px; margin: 0 auto; object-fit: contain;" />
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
      `),n&&(n.style.display="none"),i&&(i.innerHTML=`<span style="color: #10B981;"><i class="fa-solid fa-phone"></i> ${g(t.connectedNumber||"+62 812-3456-7890")}</span> <small style="color:#64748B;">(${g(t.deviceName||"WhatsApp Web")})</small>`),s){const r=t.syncedAt?new Date(t.syncedAt).toLocaleString("id-ID"):"Hari ini";s.textContent=`Tersinkronisasi sejak: ${r}`}o&&(o.style.display="inline-block")}}async function et(){const t=document.getElementById("btnGenerateWaQr"),a=t==null?void 0:t.innerHTML;t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Membuat QR...');try{const e=await b("/admin/notifications/whatsapp/qr",{method:"POST"});e&&e.status==="success"&&e.data?(ce(e.data),renderWhatsAppWebConsoleHeader(e.data),ve(2500),l("success","QR Code Siap","Silakan buka WhatsApp di ponsel dan scan QR Code di layar.")):l("error","Gagal",(e==null?void 0:e.message)||"Gagal menghasilkan QR code.")}catch(e){l("error","Kesalahan",e.message)}finally{t&&(t.disabled=!1,t.innerHTML=a)}}async function at(){if(await S({title:"Putuskan Sesi WhatsApp?",message:"Apakah Anda yakin ingin memutuskan (logout) sesi WhatsApp Web ini? Pengiriman otomatis via WhatsApp Web akan dijeda sampai Anda scan ulang.",confirmText:"Ya, Putuskan Sesi",type:"danger"}))try{const a=await b("/admin/notifications/whatsapp/disconnect",{method:"POST"});a&&a.status==="success"&&a.data&&(ce(a.data),renderWhatsAppWebConsoleHeader(a.data),l("success","Sesi Diputuskan","Sesi WhatsApp Web telah berhasil keluar (logout)."))}catch(a){l("error","Gagal",a.message)}}let z=null,be=null;function ve(t=3e3){z&&clearInterval(z),z=setInterval(async()=>{if(f.activeTab!=="notifications"&&f.activeTab!=="whatsapp-web"){ua();return}try{const a=await b("/admin/notifications/whatsapp/session");if(a&&a.status==="success"&&a.data){const e=a.data;if(e.status!==be){const n=be;be=e.status,ce(e),renderWhatsAppWebConsoleHeader(e),n==="SCAN_QR"&&e.status==="CONNECTED"&&l("success","WhatsApp Terhubung Otomatis!",`Perangkat ${e.connectedNumber||""} berhasil diverifikasi dan siap kirim.`)}}}catch{}},t)}function ua(){z&&(clearInterval(z),z=null)}async function tt(t){var s,o;t.preventDefault();const a=r=>{var d;return(((d=document.getElementById(r))==null?void 0:d.value)||"").trim()},e={notif_channel:((s=document.getElementById("notifSettingChannel"))==null?void 0:s.value)||"WA",wa_dispatch_mode:((o=document.getElementById("notifSettingDispatchMode"))==null?void 0:o.value)||"AUTO",email_smtp_host:a("notifSettingSmtpHost"),email_smtp_port:a("notifSettingSmtpPort"),email_smtp_user:a("notifSettingSmtpUser"),email_smtp_pass:a("notifSettingSmtpPass"),email_from_name:a("notifSettingEmailFromName"),template_msg_paid:a("notifSettingTemplatePaid"),template_msg_pending:a("notifSettingTemplatePending"),template_msg_cancel:a("notifSettingTemplateCancel")},n=document.getElementById("btnSaveNotifSettings"),i=n==null?void 0:n.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const r=await b("/admin/notifications/settings",{method:"PUT",body:JSON.stringify(e)});r&&r.status==="success"?l("success","Berhasil","Seluruh konfigurasi notifikasi, mode pengiriman & template pesan berhasil disimpan."):l("error","Gagal Menyimpan",(r==null?void 0:r.message)||"Terjadi kesalahan.")}catch(r){l("error","Gagal",r.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}async function nt(){var s,o,r;const t=((s=document.getElementById("testNotifChannel"))==null?void 0:s.value)||"WA",a=(((o=document.getElementById("testNotifTarget"))==null?void 0:o.value)||"").trim(),e=(((r=document.getElementById("testNotifMessage"))==null?void 0:r.value)||"").trim();if(!a){l("warning","Validasi Gagal","Harap isi nomor WhatsApp atau alamat Email tujuan uji coba.");return}const n=document.getElementById("btnSendTestNotif"),i=n==null?void 0:n.innerHTML;n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...');try{const d=await b("/admin/notifications/test",{method:"POST",body:JSON.stringify({channel:t,targetPhone:a,targetEmail:a,message:e})});d&&d.status==="success"?l("success","Uji Coba Berhasil",d.message||"Pesan tes berhasil dikirim!"):l("error","Uji Coba Gagal",(d==null?void 0:d.message)||"Gagal mengirim pesan pengujian.")}catch(d){l("error","Kesalahan Server",d.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}let M=[],T=null;async function he(){const t=document.getElementById("waContactListContainer");t&&(t.innerHTML=`
      <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--color-primary); display: block;"></i>
        Menghubungkan konsol WhatsApp Web...
      </div>
    `);try{const a=await b("/admin/notifications/whatsapp/session");a&&a.status==="success"&&a.data&&it(a.data);const e=await b("/admin/notifications/logs");e&&e.status==="success"&&e.data&&(M=e.data.items||[],me(M),M.length>0&&!T&&Ae(M[0]))}catch(a){console.warn("Gagal memuat konsol WhatsApp Web:",a),t&&(t.innerHTML=`<div style="padding: 20px; text-align: center; color: #EF4444; font-size: 0.85rem;">Gagal memuat kontak: ${a.message}</div>`)}}function it(t){const a=document.getElementById("waWebHeaderStatus"),e=document.getElementById("waWebMyNumber"),n=document.getElementById("waWebMyStatusText");if(!t||t.status==="DISCONNECTED"){a&&(a.innerHTML=`
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
      `),e&&(e.textContent=t.connectedNumber||"Server WhatsApp Web"),n&&(n.innerHTML='<span style="width: 7px; height: 7px; background: #22C55E; border-radius: 50%; display: inline-block;"></span> Online &amp; Terhubung',n.style.color="#22C55E"))}function me(t){const a=document.getElementById("waContactListContainer");if(a){if(!t||t.length===0){a.innerHTML=`
      <div style="padding: 30px 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        Tidak ada kontak peserta ditemukan.
      </div>
    `;return}a.innerHTML=t.map(e=>{const n=T&&T.orderId===e.orderId,i=(e.customerName||"P").charAt(0).toUpperCase(),s=e.orderStatus==="SETTLEMENT"||e.orderStatus==="CAPTURE",o=s?"#10B981":"#F59E0B",r=s?"#ECFDF5":"#FFFBEB",d=s?"LUNAS":e.orderStatus||"PENDING";return`
      <div class="wa-contact-card ${n?"active":""}" onclick="selectWhatsAppContactByOrderId('${e.orderId}')">
        <div class="wa-avatar" style="width: 38px; height: 38px; font-size: 0.85rem; background: ${s?"#22C55E":"#64748B"};">
          ${i}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <div style="font-weight: 700; font-size: 0.88rem; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${g(e.customerName)}
            </div>
            <span style="font-size: 0.68rem; background: ${r}; color: ${o}; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
              ${d}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #64748B;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${g(e.ticketName)} • ${g(e.customerPhone)}
            </span>
            ${e.whatsappSent?'<i class="fa-solid fa-check-double" style="color: #38BDF8; font-size: 0.75rem;" title="Terkirim via WhatsApp"></i>':""}
          </div>
        </div>
      </div>
    `}).join("")}}window.selectWhatsAppContactByOrderId=function(t){const a=M.find(e=>e.orderId===t);a&&Ae(a)};function Ae(t){T=t,me(M);const a=document.getElementById("waActiveName"),e=document.getElementById("waActivePhone"),n=document.getElementById("waActiveBadge"),i=document.getElementById("waActiveAvatar"),s=document.getElementById("waChatMessagesBox");a&&(a.textContent=t.customerName),e&&(e.textContent=t.customerPhone),i&&(i.textContent=(t.customerName||"P").charAt(0).toUpperCase());const o=t.orderStatus==="SETTLEMENT"||t.orderStatus==="CAPTURE";if(n&&(n.innerHTML=`
      <span class="badge" style="background: ${o?"#ECFDF5":"#FFFBEB"}; color: ${o?"#059669":"#D97706"}; font-size: 0.7rem; padding: 2px 8px;">
        ${t.ticketName} • ${o?"Lunas":"Belum Bayar"}
      </span>
    `),s){const r=t.createdAt?new Date(t.createdAt).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}):"10:00";let d=`Halo ${t.customerName} 👋

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
        ${g(d).replace(/\n/g,"<br>")}
        <div class="wa-bubble-time">
          <span>${r}</span>
          <i class="fa-solid fa-check-double" style="color: #38BDF8;"></i>
        </div>
      </div>
    `,s.scrollTop=s.scrollHeight}}async function st(){var i;const t=document.getElementById("waDirectChatInput"),a=(i=t==null?void 0:t.value)==null?void 0:i.trim();if(!a){l("warning","Pesan Kosong","Tuliskan teks pesan WhatsApp terlebih dahulu.");return}if(!T||!T.customerPhone){l("warning","Pilih Peserta","Pilih kontak peserta terlebih dahulu dari daftar di sebelah kiri.");return}const e=document.getElementById("btnSendWaDirectMsg"),n=e==null?void 0:e.innerHTML;e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const s=await b("/admin/notifications/whatsapp/send-direct",{method:"POST",body:JSON.stringify({phoneNumber:T.customerPhone,message:a})});if(s&&s.status==="success"){l("success","Terkirim","Pesan WhatsApp berhasil terkirim ke "+T.customerPhone);const o=document.getElementById("waChatMessagesBox");if(o){const r=new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}),d=document.createElement("div");d.className="wa-bubble wa-bubble-out",d.innerHTML=`
          ${g(a).replace(/\n/g,"<br>")}
          <div class="wa-bubble-time">
            <span>${r}</span>
            <i class="fa-solid fa-check-double" style="color: #38BDF8;"></i>
          </div>
        `,o.appendChild(d),o.scrollTop=o.scrollHeight}t&&(t.value="")}else l("error","Gagal Kirim",(s==null?void 0:s.message)||"Gagal mengirim pesan.")}catch(s){l("error","Kesalahan",s.message)}finally{e&&(e.disabled=!1,e.innerHTML=n)}}function ot(){const t=document.getElementById("waQuickTemplateSelect"),a=document.getElementById("waDirectChatInput");if(!t||!a)return;const e=t.value;if(!e)return;const n=T||{customerName:"Peserta",ticketName:"Tegal Run 2027",midtransOrderId:"TR-ORD-001",bibNumbers:"10K-001",totalAmount:25e4};e==="PAID_TICKET"?a.value=`Halo ${n.customerName},

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

Terima kasih telah menjadi bagian dari Tegal Run 2027! Semangat berlatih dan jaga kesehatan menuju garis start. Jika membutuhkan bantuan, hubungi kami di sini. Salam Pelari! 🏅`)}async function ra(t){if(!T){l("warning","Pilih Peserta","Pilih kontak peserta terlebih dahulu.");return}try{const a=await b("/admin/notifications/dispatch-single",{method:"POST",body:JSON.stringify({orderId:T.orderId})});a&&a.status==="success"?(l("success","Terkirim",`Notifikasi berhasil diproses ke ${T.customerName}.`),T.whatsappSent=!0,me(M),Ae(T)):l("error","Gagal Kirim",(a==null?void 0:a.message)||"Gagal mengirim notifikasi.")}catch(a){l("error","Kesalahan",a.message)}}let ye={items:[],stats:{}};async function G(){var i,s;const t=document.getElementById("notifLogsTableBody");t&&(t.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: var(--color-text-muted);">
          <i class="fa-solid fa-spinner fa-spin"></i> Memuat log pengiriman notifikasi...
        </td>
      </tr>
    `);const a=(((i=document.getElementById("searchNotifLogs"))==null?void 0:i.value)||"").trim(),e=((s=document.getElementById("filterNotifDeliveryStatus"))==null?void 0:s.value)||"",n=new URLSearchParams;a&&n.append("search",a),e&&n.append("status",e);try{const o=await b(`/admin/notifications/logs?${n.toString()}`);if(o&&o.status==="success"&&o.data){ye.items=o.data.items||[],ye.stats=o.data.stats||{};const r=document.getElementById("kpiNotifTotalOrders"),d=document.getElementById("kpiNotifSentCount"),c=document.getElementById("kpiNotifPendingCount"),p=document.getElementById("kpiNotifDispatchMode");r&&(r.textContent=o.data.stats.totalOrders||0),d&&(d.textContent=o.data.stats.sentCount||0),c&&(c.textContent=o.data.stats.pendingCount||0),p&&(p.textContent=o.data.stats.dispatchMode==="MANUAL"?"MANUAL (ADMIN)":"OTOMATIS (INSTANT)",p.style.color=o.data.stats.dispatchMode==="MANUAL"?"#F59E0B":"#10B981");const m=await b("/admin/notifications/whatsapp/session"),u=document.getElementById("kpiNotifSessionStatus");u&&(m!=null&&m.data)&&(m.data.status==="CONNECTED"?u.innerHTML=`<span style="color: #10B981;"><i class="fa-solid fa-circle-check"></i> WA Web Online (${g(m.data.connectedNumber||"Aktif")})</span>`:u.innerHTML='<span style="color: #EF4444;"><i class="fa-solid fa-circle-xmark"></i> WA Web Terputus</span>'),rt(ye.items)}}catch(o){t&&(t.innerHTML=`
        <tr>
          <td colspan="10" style="text-align: center; padding: 25px; color: #EF4444;">
            <i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat log notifikasi: ${g(o.message)}
          </td>
        </tr>
      `)}}function rt(t){const a=document.getElementById("notifLogsTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 35px; color: var(--color-text-muted);">
          <i class="fa-solid fa-inbox" style="font-size: 2rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
          Tidak ada data pesanan atau log pengiriman yang cocok.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{let i='<span class="badge" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A;"><i class="fa-solid fa-clock"></i> Belum Dikirim</span>';e.whatsappSent?i='<span class="badge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;"><i class="fa-solid fa-circle-check"></i> Terkirim (WA)</span>':e.deliveryStatus==="FAILED"&&(i='<span class="badge" style="background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA;"><i class="fa-solid fa-circle-xmark"></i> Gagal</span>');let s='<span class="badge" style="background:#F8FAFC;color:#64748B;border:1px solid #E2E8F0;"><i class="fa-solid fa-minus"></i> -</span>';e.emailSent&&(s='<span class="badge" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;"><i class="fa-solid fa-envelope-circle-check"></i> Terkirim</span>');const r=e.orderStatus==="SETTLEMENT"||e.orderStatus==="CAPTURE"?'<span class="badge" style="background:#ECFDF5;color:#047857;font-weight:700;">LUNAS</span>':'<span class="badge" style="background:#FFFBEB;color:#B45309;font-weight:700;">PENDING</span>',d=e.lastDispatchedAt?new Date(e.lastDispatchedAt).toLocaleString("id-ID",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):'<span style="color: #94A3B8;">Belum Pernah</span>';return`
      <tr>
        <td>${n+1}</td>
        <td><code>${g(e.midtransOrderId||e.orderId.slice(0,10))}</code></td>
        <td><strong>${g(e.customerName)}</strong></td>
        <td>
          <div style="font-size: 0.82rem;">
            <div><i class="fa-brands fa-whatsapp" style="color: #25D366;"></i> ${g(e.customerPhone)}</div>
            <div style="color: #64748B; font-size: 0.76rem;"><i class="fa-solid fa-envelope" style="color: #38BDF8;"></i> ${g(e.customerEmail)}</div>
          </div>
        </td>
        <td>
          <span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;">${g(e.ticketCategory)}</span>
          <div style="font-size: 0.74rem; color: #64748B; margin-top: 2px;">BIB: ${g(e.bibNumbers)}</div>
        </td>
        <td>${r}</td>
        <td>${i}</td>
        <td>${s}</td>
        <td style="font-size: 0.78rem;">${d}</td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn btn-sm ${e.whatsappSent?"btn-secondary":"btn-primary"} btn-dispatch-single" data-id="${e.orderId}" data-name="${g(e.customerName)}" title="Kirim Notifikasi via WhatsApp & Email">
              <i class="fa-solid fa-paper-plane"></i> ${e.whatsappSent?"Kirim Ulang":"Kirim"}
            </button>
            <a href="/e-ticket.html?orderId=${e.orderId}" target="_blank" class="btn btn-secondary btn-sm" title="Lihat E-Tiket Digital PDF">
              <i class="fa-solid fa-file-pdf"></i>
            </a>
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-dispatch-single").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");lt(n,i,e)})})}}async function lt(t,a,e){e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const n=await b("/admin/notifications/dispatch-single",{method:"POST",body:JSON.stringify({orderId:t})});n&&n.status==="success"?(l("success","Terkirim!",`Notifikasi tiket untuk ${a||"peserta"} berhasil dikirim.`),G()):l("error","Gagal Mengirim",(n==null?void 0:n.message)||"Pengiriman notifikasi gagal.")}catch(n){l("error","Kesalahan",n.message)}finally{e&&(e.disabled=!1,e.innerHTML='<i class="fa-solid fa-paper-plane"></i> Kirim')}}async function dt(){if(!await S({title:"Kirim Notifikasi Massal?",message:"Apakah Anda ingin mengirimkan notifikasi tiket (WhatsApp & Email) untuk SEMUA peserta yang berstatus Lunas / Menunggu Pembayaran?",confirmText:"Ya, Kirim Sekarang",type:"warning"}))return;const a=document.getElementById("btnBatchSendNotif"),e=a==null?void 0:a.innerHTML;a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Memproses Batch...');try{const n=await b("/admin/notifications/dispatch-batch",{method:"POST"});n&&n.status==="success"?(l("success","Batch Selesai",n.message||"Notifikasi massal berhasil diproses."),G()):l("error","Gagal",(n==null?void 0:n.message)||"Gagal memproses pengiriman batch.")}catch(n){l("error","Kesalahan",n.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}let F=null,D=null,W=null,ie=null,oe=null;if(typeof window<"u"&&"BarcodeDetector"in window)try{oe=new window.BarcodeDetector({formats:["qr_code","code_128","ean_13"]})}catch{oe=null}async function ee(){try{const t=await b("/admin/racepack/stats");if(t&&t.status==="success"&&t.data){const a=t.data,e=document.getElementById("rpcKpiCheckedIn"),n=document.getElementById("rpcKpiRemaining"),i=document.getElementById("rpcKpiPaidTotal"),s=document.getElementById("rpcKpiPercentage");e&&(e.textContent=a.checkedInCount),n&&(n.textContent=a.remainingToCollect),i&&(i.textContent=a.paidParticipants),s&&(s.textContent=`${a.percentage}% dari peserta lunas`)}}catch(t){console.warn("Gagal memuat statistik racepack:",t)}}async function q(t){var s;if(!t||!String(t).trim())return;const a=String(t).trim(),e=document.getElementById("rpcManualSearchInput");if(e)if(a.includes("|")){const o=a.split("|").map(r=>r.trim()).filter(Boolean);e.value=o[2]||o[1]||a}else e.value=a;const n=document.getElementById("btnRpcSearchSubmit"),i=n?n.innerHTML:"";n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const o=await b(`/admin/racepack/verify/${encodeURIComponent(a)}`);o&&o.status==="success"&&o.data?(F=o.data,pe(o.data),l("success","E-Tiket Ditemukan",`Data pelari: ${(s=o.data.participant)==null?void 0:s.fullNameKtp}`)):l("error","Tidak Ditemukan",(o==null?void 0:o.message)||"Data peserta tidak ditemukan.")}catch(o){l("error","Gagal Verifikasi",o.message||"Terjadi kesalahan sistem.")}finally{n&&(n.disabled=!1,n.innerHTML=i)}}function pe(t){var B,I,w,N,L,R,Q,V,Y;const a=document.getElementById("rpcEmptyState"),e=document.getElementById("rpcDetailsState"),n=document.getElementById("rpcMasterState");if(t.isMaster&&Array.isArray(t.participants)){a&&(a.style.display="none"),e&&(e.style.display="none"),n&&(n.style.display="block",ct(t,n));return}n&&(n.style.display="none"),a&&(a.style.display="none"),e&&(e.style.display="block");const i=t.participant,s=t.isPaid,o=t.racepack,r=document.getElementById("rpcPaymentBanner"),d=document.getElementById("rpcPaymentIcon"),c=document.getElementById("rpcPaymentTitle"),p=document.getElementById("rpcPaymentSub"),m=document.getElementById("rpcPaymentBadge"),u=document.getElementById("btnConfirmRpcCheckin");if(r&&d&&c&&m)if(s)r.style.background="#F0FDF4",r.style.border="1px solid #BBF7D0",r.style.color="#15803D",d.innerHTML='<i class="fa-solid fa-circle-check" style="color: #22C55E;"></i>',c.textContent="PEMBAYARAN TERVERIFIKASI & LUNAS",p&&(p.textContent=`Status Midtrans: ${((B=i.order)==null?void 0:B.status)||"SETTLEMENT"} • Berhak mengambil racepack resmi.`),m.style.background="#DCFCE7",m.style.color="#15803D",m.textContent="LUNAS (PAID)",u&&(u.disabled=!1,u.style.opacity="1",u.style.cursor="pointer");else{const A=((I=i.order)==null?void 0:I.status)==="PENDING";r.style.background=A?"#FFFBEB":"#FEF2F2",r.style.border=`1px solid ${A?"#FDE68A":"#FECACA"}`,r.style.color=A?"#B45309":"#B91C1C",d.innerHTML=A?'<i class="fa-solid fa-clock" style="color: #F59E0B;"></i>':'<i class="fa-solid fa-triangle-exclamation" style="color: #EF4444;"></i>',c.textContent=A?"PERINGATAN: PEMBAYARAN MASIH MENUNGGU (PENDING)":`DIBATALKAN (${((w=i.order)==null?void 0:w.status)||"EXPIRED"})`,p&&(p.textContent="DILARANG menyerahkan racepack sebelum pembayaran berstatus LUNAS."),m.style.background=A?"#FEF3C7":"#FEE2E2",m.style.color=A?"#92400E":"#991B1B",m.textContent=((N=i.order)==null?void 0:N.status)||"BELUM LUNAS",u&&(u.disabled=!0,u.style.opacity="0.6",u.style.cursor="not-allowed")}const y=(A,te)=>{const X=document.getElementById(A);X&&(X.textContent=te||"-")};y("rpcFullName",i.fullNameKtp),y("rpcBibNumber",i.bibNumber||"BELUM ADA"),y("rpcBibName",i.bibName||i.fullNameKtp),y("rpcNik",i.nik),y("rpcGender",i.gender==="MALE"?"LAKI-LAKI":"PEREMPUAN"),y("rpcBloodType",i.bloodType||"O"),y("rpcEventCategory",`Kategori ${((L=i.event)==null?void 0:L.category)||"10K"}`),y("rpcPhone",((Q=(R=i.order)==null?void 0:R.user)==null?void 0:Q.phoneNumber)||"-"),y("rpcEmergency",`${i.emergencyContactName} (${i.emergencyContactPhone})`),y("rpcOrderId",((V=i.order)==null?void 0:V.midtransOrderId)||i.orderId);const v=i.selectedSize||"M";y("rpcJerseyBadge",`Ukuran Jersey: ${v}`),y("chkJerseySizeText",v),y("chkJerseyTypeText",((Y=i.jersey)==null?void 0:Y.name)||"Dry-Fit Official Tegal Run"),y("chkBibText",i.bibNumber||"Auto-assigned");const k=document.getElementById("rpcAlreadyCheckedInBox"),E=document.getElementById("rpcCheckinTimestampText");if(o&&o.checkedIn){if(k&&(k.style.display="block"),E){const A=new Date(o.checkedInAt).toLocaleString("id-ID");E.textContent=`Diserahkan pada: ${A} WIB oleh Petugas: ${o.checkedInBy||"Admin"}`}u&&(u.innerHTML='<i class="fa-solid fa-arrows-rotate"></i> Perbarui Catatan Serah Terima',u.className="btn btn-secondary btn-sm")}else k&&(k.style.display="none"),u&&(u.innerHTML='<i class="fa-solid fa-box-check" style="font-size: 1.25rem;"></i> Konfirmasi & Serahkan Racepack Sekarang',u.className="btn btn-primary btn-glow")}function ct(t,a){var d,c,p;const e=t.order,n=t.participants||[],i=t.isPaid,s=e.midtransOrderId||e.id,o=n.every(m=>{var u;return(u=m.racepack)==null?void 0:u.checkedIn});a.innerHTML=`
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
      <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0 0 4px 0;">ORDER REF: ${g(s)}</h3>
      <p style="font-size: 0.8rem; color: #E0E7FF; margin: 0;">Pemesan: <strong>${g(((d=e.user)==null?void 0:d.fullName)||"-")}</strong> (${g(((c=e.user)==null?void 0:c.phoneNumber)||((p=e.user)==null?void 0:p.email)||"-")})</p>
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
        ${n.map((m,u)=>{var v,k,E;const y=(v=m.racepack)==null?void 0:v.checkedIn;return`
            <div style="background: ${y?"#F0FDF4":"#F8FAFC"}; border: 1px solid ${y?"#BBF7D0":"#E2E8F0"}; border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <strong style="color: #0F172A; font-size: 0.95rem;">#${u+1} ${g(m.fullNameKtp)}</strong>
                  <span style="background: #E0F2FE; color: #0369A1; font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
                    ${g(((k=m.event)==null?void 0:k.category)||"10K")}
                  </span>
                </div>
                <div style="font-size: 0.76rem; color: #64748B; margin-top: 3px;">
                  BIB: <strong style="color: #FF6B00; font-family: monospace;">${g(m.bibNumber||"Saat RPC")}</strong> &bull; Size: <strong>${g(m.selectedSize||"M")}</strong> (${g(((E=m.jersey)==null?void 0:E.type)||"Jersey")})
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge" style="background: ${y?"#DCFCE7":"#FEF3C7"}; color: ${y?"#15803D":"#92400E"}; font-size: 0.72rem; font-weight: 800;">
                  <i class="fa-solid ${y?"fa-check":"fa-clock"}"></i> ${y?"Sudah Diambil":"Belum Diambil"}
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
      ${o?`
        <div style="color: #15803D; font-weight: 800; font-size: 0.95rem; margin-bottom: 6px;">
          <i class="fa-solid fa-circle-check" style="font-size: 1.5rem; display: block; margin-bottom: 6px; color: #22C55E;"></i>
          Seluruh Peserta (${n.length}) Sudah Menyelesaikan Check-in Racepack!
        </div>
      `:`
        <button type="button" class="btn btn-primary btn-glow" id="btnBatchCheckinAll" style="width: 100%; padding: 14px; font-size: 1rem; font-weight: 800;" ${i?"":'disabled style="opacity: 0.5;"'}>
          <i class="fa-solid fa-box-open" style="font-size: 1.2rem;"></i> Check-in Seluruh ${n.length} Peserta Sekaligus
        </button>
        <span style="font-size: 0.75rem; color: #64748B; margin-top: 8px; display: block;">
          Semua nomor BIB yang belum terbit akan otomatis digenerate dan dicatat oleh sistem.
        </span>
      `}
    </div>
  `,a.querySelectorAll(".btnViewSingleRunner").forEach(m=>{m.addEventListener("click",()=>{const u=m.getAttribute("data-participant-id"),y=n.find(v=>v.id===u);y&&pe({isMaster:!1,participant:y,isPaid:i,racepack:y.racepack||{checkedIn:!1}})})});const r=document.getElementById("btnBatchCheckinAll");r&&r.addEventListener("click",()=>mt(t))}async function mt(t){const a=t.participants||[],e=t.order,n=e.midtransOrderId||e.id,i=document.getElementById("btnBatchCheckinAll"),s=i?i.innerHTML:"";i&&(i.disabled=!0,i.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Memproses Check-in Massal...');try{const o=await b("/admin/racepack/batch-checkin",{method:"POST",body:JSON.stringify({orderId:n,participantIds:a.map(r=>r.id),notes:"Check-in massal QR Master oleh petugas"})});o&&o.status==="success"?(l("success","Check-in Massal Berhasil!",o.message),q(n),ee(),$()):l("error","Gagal",(o==null?void 0:o.message)||"Terjadi kesalahan")}catch(o){l("error","Kesalahan",o.message)}finally{i&&(i.disabled=!1,i.innerHTML=s)}}async function pt(){var s,o,r,d,c;if(!F||!F.participant){l("warning","Peringatan","Tidak ada data peserta yang sedang dipilih.");return}const t=F.participant;if(!F.isPaid){l("error","Dilarang","Pembayaran tiket belum lunas!");return}const e=[];(s=document.getElementById("chkItemBib"))!=null&&s.checked&&e.push(`Nomor BIB (${t.bibNumber||"-"})`),(o=document.getElementById("chkItemJersey"))!=null&&o.checked&&e.push(`Jersey Resmi (${t.selectedSize||"M"})`),(r=document.getElementById("chkItemChip"))!=null&&r.checked&&e.push("Timing Chip PASI"),(d=document.getElementById("chkItemBag"))!=null&&d.checked&&e.push("Drawstring Bag & Panduan"),(c=document.getElementById("chkItemRefreshment"))!=null&&c.checked&&e.push("Refreshment & Sponsor");const n=document.getElementById("btnConfirmRpcCheckin"),i=n?n.innerHTML:"";n&&(n.disabled=!0,n.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan Check-in...');try{const p=await b("/admin/racepack/checkin",{method:"POST",body:JSON.stringify({participantId:t.id,items:e,notes:"Check-in di meja RPC oleh petugas resmi"})});p&&p.status==="success"?(l("success","Berhasil Diserahkan!",`Racepack peserta ${t.fullNameKtp} berhasil diserahterimakan.`),F.racepack=p.data,pe(F),ee(),$()):l("error","Gagal Check-in",(p==null?void 0:p.message)||"Terjadi kesalahan")}catch(p){l("error","Kesalahan",p.message)}finally{n&&(n.disabled=!1,n.innerHTML=i)}}async function ut(){if(!(!F||!F.participant||!await S({title:"Batalkan Status Check-in?",message:`Apakah Anda yakin ingin membatalkan status pengambilan racepack untuk "${F.participant.fullNameKtp}"?`,confirmText:"Ya, Batalkan Check-in",type:"danger"})))try{const a=await b("/admin/racepack/revert",{method:"POST",body:JSON.stringify({participantId:F.participant.id})});a&&a.status==="success"?(l("success","Dibatalkan","Status pengambilan racepack berhasil dibatalkan."),F.racepack={checkedIn:!1},pe(F),ee(),$()):l("error","Gagal",a==null?void 0:a.message)}catch(a){l("error","Kesalahan",a.message)}}async function gt(){document.getElementById("rpcCameraContainer");const t=document.getElementById("rpcCameraPlaceholder"),a=document.getElementById("rpcScanCrosshair"),e=document.getElementById("rpcCameraStatusBadge"),n=document.getElementById("btnStartRpcCamera"),i=document.getElementById("btnStopRpcCamera");if(typeof window<"u"&&window.Html5Qrcode)try{if(t&&(t.style.display="none"),a&&(a.style.display="none"),D){try{await D.stop()}catch{}D=null}D=new window.Html5Qrcode("rpcCameraContainer");const s={fps:10,qrbox:{width:220,height:220},aspectRatio:1};await D.start({facingMode:"environment"},s,o=>{fa(),ue(),q(o)},()=>{}),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"),e&&(e.textContent="Kamera Live Aktif",e.style.background="#DCFCE7",e.style.color="#15803D"),l("success","Kamera Aktif","Arahkan kamera ke QR Code E-Tiket pelari.");return}catch(s){console.warn("Html5Qrcode live camera start failed, trying fallback stream...",s)}if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){l("warning","Live Stream Memerlukan HTTPS",'Browser HP Anda membatasi live camera pada HTTP lokal. Silakan gunakan tombol "Foto E-Tiket" di samping.'),la();return}try{const s=document.getElementById("rpcVideoElem"),o=document.getElementById("rpcCameraPlaceholder");let r=null;try{r=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:!1})}catch{r=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1})}W=r,s&&(s.srcObject=W,s.setAttribute("playsinline","true"),await s.play(),s.style.display="block"),o&&(o.style.display="none"),a&&(a.style.display="block"),n&&(n.style.display="none"),i&&(i.style.display="inline-flex"),e&&(e.textContent="Kamera Aktif",e.style.background="#DCFCE7",e.style.color="#15803D"),l("success","Kamera Aktif","Arahkan kamera ke QR Code E-Tiket pelari."),ga()}catch(s){console.error("Camera access error:",s),l("error","Izin Kamera Ditolak / Gagal",'Tidak dapat mengakses live stream kamera. Silakan gunakan tombol "Foto E-Tiket (Kamera HP)".'),la()}}async function ga(){const t=document.getElementById("rpcVideoElem");if(!(!t||!W||t.paused||t.ended)){if(t.readyState===t.HAVE_ENOUGH_DATA&&oe)try{const a=await oe.detect(t);if(a&&a.length>0&&a[0].rawValue){fa(),ue(),q(a[0].rawValue);return}}catch{}ie=setTimeout(ga,200)}}async function ue(){if(ie&&(clearTimeout(ie),ie=null),D){try{await D.stop(),D.clear()}catch{}D=null}W&&(W.getTracks().forEach(o=>o.stop()),W=null);const t=document.getElementById("rpcVideoElem"),a=document.getElementById("rpcCameraPlaceholder"),e=document.getElementById("rpcScanCrosshair"),n=document.getElementById("rpcCameraStatusBadge"),i=document.getElementById("btnStartRpcCamera"),s=document.getElementById("btnStopRpcCamera");t&&(t.pause(),t.srcObject=null,t.style.display="none"),a&&(a.style.display="block"),e&&(e.style.display="none"),i&&(i.style.display="inline-flex"),s&&(s.style.display="none"),n&&(n.textContent="Standby",n.style.background="#F1F5F9",n.style.color="#475569")}function la(){const t=document.getElementById("rpcNativeCameraInput");t&&(t.value="",t.click())}function fa(){try{const t=new(window.AudioContext||window.webkitAudioContext),a=t.createOscillator(),e=t.createGain();a.connect(e),e.connect(t.destination),a.type="sine",a.frequency.setValueAtTime(880,t.currentTime),e.gain.setValueAtTime(.3,t.currentTime),a.start(),a.stop(t.currentTime+.15)}catch{}}window.verifyRacepackByCode=q;let ft=null;function ba(){var r,d,c,p;const t=((r=document.getElementById("bibInputPrefix"))==null?void 0:r.value)||"",a=parseInt(((d=document.getElementById("bibInputDigitLength"))==null?void 0:d.value)||"4",10),e=parseInt(((c=document.getElementById("bibInputStartNumber"))==null?void 0:c.value)||"1001",10),n=((p=document.getElementById("bibInputSuffix"))==null?void 0:p.value)||"",i=String(e).padStart(a,"0"),s=`${t}${i}${n}`,o=document.getElementById("bibFormatPreviewText");o&&(o.textContent=s)}async function ge(){try{const t=await b("/admin/bib/settings");if(t&&t.status==="success"&&t.data){ft=t.data;const{settings:a,qrPrefix:e,unassignedCount:n,assignedCount:i}=t.data,s=document.getElementById("kpiBibAssigned"),o=document.getElementById("kpiBibUnassigned"),r=document.getElementById("kpiQrFormatPreview");s&&(s.textContent=i),o&&(o.textContent=n),r&&(r.textContent=`${e||"TEGALRUN"}|...`),document.querySelectorAll('input[name="bibTiming"]').forEach(k=>{k.value===a.timing&&(k.checked=!0)});const c=document.getElementById("bibInputPrefix"),p=document.getElementById("bibInputDigitLength"),m=document.getElementById("bibInputStartNumber"),u=document.getElementById("bibInputSuffix");c&&(c.value=a.defaultPrefix||"10-"),p&&(p.value=a.digitLength||4),m&&(m.value=a.startNumber||1001),u&&(u.value=a.suffix||""),ba();const y=document.getElementById("qrInputPrefix"),v=document.getElementById("qrPrefixExample");y&&(y.value=e||"TEGALRUN"),v&&(v.textContent=e||"TEGALRUN")}}catch(t){console.warn("Gagal memuat pengaturan BIB:",t)}try{const t=await b("/admin/settings/racepack-instructions");if(t&&t.status==="success"&&t.data){const a=document.getElementById("rpcInstructionsTitle"),e=document.getElementById("rpcInstructionsTextarea");a&&(a.value=t.data.title||"Petunjuk Pengambilan Racepack & Race Day:"),e&&Array.isArray(t.data.points)&&(e.value=t.data.points.join(`
`))}}catch(t){console.warn("Gagal memuat petunjuk racepack:",t)}try{const t=await b("/admin/settings/payment-fee");if(t&&t.status==="success"&&t.data){const{paymentTimerMinutes:a,feeEnabled:e,feeType:n,feeAmount:i}=t.data,s=document.getElementById("settingPaymentTimerMinutes"),o=document.getElementById("settingFeeEnabled"),r=document.getElementById("settingFeeType"),d=document.getElementById("settingFeeAmount"),c=document.getElementById("groupFeeConfig"),p=document.getElementById("badgeFeeStatus");s&&(s.value=a||30),o&&(o.checked=!!e,c&&(c.style.display=e?"block":"none"),p&&(p.textContent=e?"Aktif":"Nonaktif",p.style.background=e?"#DCFCE7":"#E2E8F0",p.style.color=e?"#166534":"#475569")),r&&(r.value=n||"PER_TRANSACTION"),d&&(d.value=i||0)}}catch(t){console.warn("Gagal memuat pengaturan biaya layanan & timer:",t)}}async function bt(t){var c,p,m,u;t.preventDefault();const a=document.querySelector('input[name="bibTiming"]:checked'),e=a?a.value:"PAYMENT_SUCCESS",n=((c=document.getElementById("bibInputPrefix"))==null?void 0:c.value)||"",i=parseInt(((p=document.getElementById("bibInputDigitLength"))==null?void 0:p.value)||"4",10),s=parseInt(((m=document.getElementById("bibInputStartNumber"))==null?void 0:m.value)||"1001",10),o=((u=document.getElementById("bibInputSuffix"))==null?void 0:u.value)||"",r=document.getElementById("btnSaveBibSettings"),d=r?r.innerHTML:"";r&&(r.disabled=!0,r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const y=await b("/admin/bib/settings",{method:"PUT",body:JSON.stringify({timing:e,defaultPrefix:n,digitLength:i,startNumber:s,suffix:o})});y&&y.status==="success"?(l("success","Tersimpan",y.message||"Pengaturan penomoran BIB berhasil diperbarui."),ge()):l("error","Gagal",(y==null?void 0:y.message)||"Gagal menyimpan pengaturan BIB.")}catch(y){l("error","Terjadi Kesalahan",y.message)}finally{r&&(r.disabled=!1,r.innerHTML=d)}}async function yt(){if(!await S({title:"Generate Nomor BIB Massal?",message:"Sistem akan mengenerate nomor BIB unik untuk seluruh peserta lunas yang belum memiliki nomor dada. Lanjutkan proses?",confirmText:"Ya, Generate Massal"}))return;const a=document.getElementById("btnTriggerBulkGenerate"),e=a?a.innerHTML:"";a&&(a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Memproses...');try{const n=await b("/admin/bib/bulk-generate",{method:"POST",body:JSON.stringify({})});n&&n.status==="success"?(l("success","Berhasil",n.message),ge()):l("error","Gagal",(n==null?void 0:n.message)||"Gagal generate nomor BIB.")}catch(n){l("error","Terjadi Kesalahan",n.message)}finally{a&&(a.disabled=!1,a.innerHTML=e)}}async function vt(t){var i;t.preventDefault();const a=((i=document.getElementById("qrInputPrefix"))==null?void 0:i.value)||"";if(!a.trim()){l("error","Validasi Gagal","Prefix QR code tidak boleh kosong.");return}const e=document.getElementById("btnSaveQrPrefix"),n=e?e.innerHTML:"";e&&(e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>');try{const s=await b("/admin/settings/qr",{method:"PUT",body:JSON.stringify({prefix:a})});if(s&&s.status==="success"){l("success","Prefix Disimpan",s.message);const o=document.getElementById("qrPrefixExample"),r=document.getElementById("kpiQrFormatPreview");o&&(o.textContent=s.data.prefix),r&&(r.textContent=`${s.data.prefix}|...`)}else l("error","Gagal",(s==null?void 0:s.message)||"Gagal menyimpan prefix QR.")}catch(s){l("error","Terjadi Kesalahan",s.message)}finally{e&&(e.disabled=!1,e.innerHTML=n)}}async function ht(t){var o,r;t.preventDefault();const a=((o=document.getElementById("rpcInstructionsTitle"))==null?void 0:o.value)||"",n=(((r=document.getElementById("rpcInstructionsTextarea"))==null?void 0:r.value)||"").split(`
`).map(d=>d.trim()).filter(Boolean),i=document.getElementById("btnSaveRpcInstructions"),s=i?i.innerHTML:"";i&&(i.disabled=!0,i.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const d=await b("/admin/settings/racepack-instructions",{method:"PUT",body:JSON.stringify({title:a,points:n})});d&&d.status==="success"?l("success","Tersimpan","Petunjuk pengambilan racepack E-Tiket berhasil diperbarui."):l("error","Gagal",(d==null?void 0:d.message)||"Gagal menyimpan petunjuk.")}catch(d){l("error","Terjadi Kesalahan",d.message)}finally{i&&(i.disabled=!1,i.innerHTML=s)}}async function kt(t){var r,d,c,p;t.preventDefault();const a=parseInt(((r=document.getElementById("settingPaymentTimerMinutes"))==null?void 0:r.value)||"30",10),e=((d=document.getElementById("settingFeeEnabled"))==null?void 0:d.checked)||!1,n=((c=document.getElementById("settingFeeType"))==null?void 0:c.value)||"PER_TRANSACTION",i=parseFloat(((p=document.getElementById("settingFeeAmount"))==null?void 0:p.value)||"0"),s=document.getElementById("btnSavePaymentFeeSettings"),o=s?s.innerHTML:"";s&&(s.disabled=!0,s.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...');try{const m=await b("/admin/settings/payment-fee",{method:"PUT",body:JSON.stringify({paymentTimerMinutes:a,feeEnabled:e,feeType:n,feeAmount:i})});if(m&&m.status==="success"){l("success","Tersimpan","Pengaturan batas waktu pembayaran dan biaya layanan berhasil diperbarui.");const u=document.getElementById("badgeFeeStatus");u&&(u.textContent=e?"Aktif":"Nonaktif",u.style.background=e?"#DCFCE7":"#E2E8F0",u.style.color=e?"#166534":"#475569")}else l("error","Gagal",(m==null?void 0:m.message)||"Gagal menyimpan pengaturan.")}catch(m){l("error","Terjadi Kesalahan",m.message)}finally{s&&(s.disabled=!1,s.innerHTML=o)}}function Et(){var t,a,e,n,i,s,o;["bibInputPrefix","bibInputDigitLength","bibInputStartNumber","bibInputSuffix"].forEach(r=>{var d;(d=document.getElementById(r))==null||d.addEventListener("input",ba)}),(t=document.getElementById("formBibGenerationSettings"))==null||t.addEventListener("submit",bt),(a=document.getElementById("btnTriggerBulkGenerate"))==null||a.addEventListener("click",yt),(e=document.getElementById("formQrPrefixSettings"))==null||e.addEventListener("submit",vt),(n=document.getElementById("formRacepackInstructions"))==null||n.addEventListener("submit",ht),(i=document.getElementById("formPaymentFeeSettings"))==null||i.addEventListener("submit",kt),(s=document.getElementById("settingFeeEnabled"))==null||s.addEventListener("change",r=>{const d=document.getElementById("groupFeeConfig"),c=document.getElementById("badgeFeeStatus");d&&(d.style.display=r.target.checked?"block":"none"),c&&(c.textContent=r.target.checked?"Aktif":"Nonaktif",c.style.background=r.target.checked?"#DCFCE7":"#E2E8F0",c.style.color=r.target.checked?"#166534":"#475569")}),(o=document.getElementById("btnRefreshBibSettings"))==null||o.addEventListener("click",ge)}async function xt(){const t=document.getElementById("sidebarMount");if(t)try{t.innerHTML=qa,Bt()}catch(a){console.error("Sidebar load failed:",a)}}function Bt(){var t,a,e;if(f.profile){const n=document.getElementById("sidebarAdminFullName"),i=document.getElementById("sidebarAdminRole");n&&(n.textContent=f.profile.fullName),i&&(i.textContent=((t=f.profile.role)==null?void 0:t.name)||"ADMIN")}document.querySelectorAll(".sidebar-nav .nav-item").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-nav");i&&(fe(i),ke())})}),(a=document.getElementById("btnCloseSidebar"))==null||a.addEventListener("click",ke),(e=document.getElementById("btnSidebarLogout"))==null||e.addEventListener("click",le),f.profile&&j(f.profile)}function fe(t){if(f.profile&&f.profile.role){const o=f.profile.role.name||"",r=Array.isArray(f.profile.role.permissions)?f.profile.role.permissions:[];if(!(o==="SUPERADMIN"||r.includes("*"))&&t!=="dashboard"){const c=`page:${t}`;if(!r.includes(c)){l("warning","Akses Dibatasi",`Role Anda (${o}) tidak memiliki izin mengakses modul ini.`);return}}}f.activeTab=t,document.querySelectorAll(".sidebar-nav .nav-item").forEach(o=>{o.getAttribute("data-nav")===t?o.classList.add("active"):o.classList.remove("active")}),document.querySelectorAll(".admin-tab-pane").forEach(o=>{o.classList.remove("active")});const a=document.getElementById(`pane-${t}`);a&&a.classList.add("active");const e={dashboard:{title:"Dashboard Overview",sub:"Portal Admin / Ringkasan Real-Time"},events:{title:"Manajemen Event & Kategori",sub:"Portal Admin / Manajemen Tiket Lomba"},participants:{title:"Manajemen Peserta",sub:"Portal Admin / Database Pelari & BIB"},racepack:{title:"Pengambilan Racepack & Check-in",sub:"Portal Admin / Validasi E-Tiket & Serah Terima RPC"},orders:{title:"Transaksi & Order",sub:"Portal Admin / Status Pembayaran Tiket"},countdown:{title:"Countdown & Status Event",sub:"Portal Admin / Konfigurasi Race Day"},"bib-settings":{title:"Pengaturan BIB & E-Tiket",sub:"Portal Admin / Aturan BIB, Format QR & Petunjuk"},cms:{title:"Konten Website & CMS",sub:"Portal Admin / Pengaturan Teks, Peta & Media"},routes:{title:"Manajemen Rute & Checkpoint",sub:"Portal Admin / Titik Kumpul & Water Station"},notifications:{title:"Konfigurasi Notifikasi & Gateway",sub:"Portal Admin / WhatsApp & Email Gateway"},"notif-logs":{title:"Log Pengiriman Notifikasi & Peserta",sub:"Portal Admin / WhatsApp & Email Delivery Tracking"},"whatsapp-web":{title:"WhatsApp Web Enterprise Console",sub:"Portal Admin / Real-Time Messaging & Session Hub"},admins:{title:"Kelola Admin & Hak Akses",sub:"Portal Admin / Manajemen RBAC Superadmin"},logs:{title:"Log Audit Sistem",sub:"Portal Admin / Rekam Jejak Keamanan"}},n=e[t]||e.dashboard,i=document.getElementById("pageTitle"),s=document.getElementById("pageBreadcrumb");i&&(i.textContent=n.title),s&&(s.textContent=n.sub),t==="cms"&&pa(),t==="countdown"&&da(),t==="bib-settings"&&ge(),t==="routes"&&Se(),t==="racepack"?ee():ue(),t==="notifications"?(Za(),ve()):t==="whatsapp-web"?(he(),ve()):ua(),t==="notif-logs"&&G()}function It(){var t,a;(t=document.getElementById("adminSidebar"))==null||t.classList.add("open"),(a=document.getElementById("sidebarOverlay"))==null||a.classList.add("active")}function ke(){var t,a;(t=document.getElementById("adminSidebar"))==null||t.classList.remove("open"),(a=document.getElementById("sidebarOverlay"))==null||a.classList.remove("active")}window.switchAdminTab=fe;let _="ALL";async function $(){var t,a,e,n;try{const i=await b("/admin/participants?limit=100");if(i.status==="success"){f.participants=Array.isArray(i.data)?i.data:((t=i.data)==null?void 0:t.participants)||[],St(f.participants),re();const s=document.getElementById("kpiTotalParticipants");s&&(s.textContent=((a=i.meta)==null?void 0:a.total)||((n=(e=i.data)==null?void 0:e.pagination)==null?void 0:n.total)||f.participants.length)}}catch(i){console.error("Failed to load participants:",i)}}function St(t){const a=t.length;let e=0,n=0,i=0,s=0,o=0;t.forEach(d=>{var p,m;const c=((p=d.order)==null?void 0:p.status)||"PENDING";c==="SETTLEMENT"||c==="CAPTURE"||c==="PAID"?e++:c==="CANCEL"||c==="EXPIRE"||c==="DENY"||c==="REFUND"?i++:n++,(m=d.racepack)!=null&&m.checkedIn?s++:o++});const r=(d,c)=>{const p=document.getElementById(d);p&&(p.textContent=c)};r("countPartAll",a),r("countPartSettled",e),r("countPartPending",n),r("countPartCancelled",i),r("countPartRacepackDone",s),r("countPartRacepackPending",o)}function At(t){_=t,document.querySelectorAll(".participant-tabs-nav .part-tab-btn").forEach(n=>{n.getAttribute("data-tab")===t?n.className="btn btn-primary btn-sm part-tab-btn active":n.className="btn btn-outline btn-sm part-tab-btn"});const a={ALL:"Semua Peserta Terdaftar",SETTLED:"Pembayaran Sukses / Lunas (Lomba & Tiket Terverifikasi)",PENDING:"Menunggu Pembayaran (Pending Order)",CANCELLED:"Dibatalkan / Kadaluarsa / Refund",RACEPACK_DONE:"Racepack Sudah Diserahterimakan (Checked-in)",RACEPACK_PENDING:"Racepack Belum Diambil"},e=document.getElementById("participantActiveTabTitle");e&&(e.textContent=a[t]||"Semua Peserta Terdaftar"),re()}function re(){var i,s;const t=(((i=document.getElementById("searchParticipant"))==null?void 0:i.value)||"").toLowerCase(),a=((s=document.getElementById("filterParticipantCategory"))==null?void 0:s.value)||"";let e=f.participants||[];_==="SETTLED"?e=e.filter(o=>{var d;const r=((d=o.order)==null?void 0:d.status)||"PENDING";return r==="SETTLEMENT"||r==="CAPTURE"||r==="PAID"}):_==="PENDING"?e=e.filter(o=>{var r;return(((r=o.order)==null?void 0:r.status)||"PENDING")==="PENDING"}):_==="CANCELLED"?e=e.filter(o=>{var d;const r=((d=o.order)==null?void 0:d.status)||"PENDING";return r==="CANCEL"||r==="EXPIRE"||r==="DENY"||r==="REFUND"}):_==="RACEPACK_DONE"?e=e.filter(o=>{var r;return((r=o.racepack)==null?void 0:r.checkedIn)===!0}):_==="RACEPACK_PENDING"&&(e=e.filter(o=>{var r;return!((r=o.racepack)!=null&&r.checkedIn)})),a&&(e=e.filter(o=>{var r;return(((r=o.event)==null?void 0:r.category)||"").includes(a)})),t&&(e=e.filter(o=>{var r;return o.fullNameKtp.toLowerCase().includes(t)||o.bibName&&o.bibName.toLowerCase().includes(t)||o.bibNumber&&o.bibNumber.toLowerCase().includes(t)||o.nik.includes(t)||((r=o.order)==null?void 0:r.midtransOrderId)&&o.order.midtransOrderId.toLowerCase().includes(t)||o.emergencyContactPhone&&o.emergencyContactPhone.includes(t)}));const n=document.getElementById("participantFilteredCount");n&&(n.textContent=e.length),Tt(e)}function Tt(t){const a=document.getElementById("adminParticipantsTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="11" style="text-align: center; padding: 40px; color: #94A3B8;">
          <i class="fa-solid fa-users-slash" style="font-size: 2rem; margin-bottom: 8px; color: #CBD5E1; display: block;"></i>
          Tidak ada data peserta untuk filter yang dipilih.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{var m,u,y,v,k,E,B,I,w,N,L,R;const i=!((m=e.order)!=null&&m.midtransOrderId)||((y=(u=e.order)==null?void 0:u.midtransOrderId)==null?void 0:y.startsWith("OFFLINE-")),s=((v=e.order)==null?void 0:v.status)==="SETTLEMENT"||((k=e.order)==null?void 0:k.status)==="CAPTURE"||((E=e.order)==null?void 0:E.status)==="PAID",o=((B=e.order)==null?void 0:B.status)==="CANCEL"||((I=e.order)==null?void 0:I.status)==="EXPIRE"||((w=e.order)==null?void 0:w.status)==="DENY"||((N=e.order)==null?void 0:N.status)==="REFUND",r=s?"success":o?"danger":"pending",c=e.racepack&&e.racepack.checkedIn?`<span class="badge" style="background:#DCFCE7; color:#15803D; font-weight:800; font-size:0.75rem; border:1px solid #BBF7D0; display:inline-flex; align-items:center; gap:4px;" title="Diserahkan: ${e.racepack.checkedInAt||"-"} WIB"><i class="fa-solid fa-circle-check"></i> Sudah Check-in</span>`:'<span class="badge" style="background:#FFEDD5; color:#C2410C; font-weight:700; font-size:0.75rem; border:1px solid #FED7AA; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-box-open"></i> Belum Check-in</span>',p=e.bibNumber?`<span class="badge" style="background:#0F172A; color:#38BDF8; font-weight:800; font-size:0.78rem; letter-spacing:0.5px;">${g(e.bibNumber)}</span>`:'<span class="badge" style="background:#F1F5F9; color:#94A3B8; font-size:0.74rem;">-</span>';return`
      <tr>
        <td>${n+1}</td>
        <td>
          <strong style="color: #0F172A; font-size: 0.9rem;">${g(e.fullNameKtp)}</strong>
          ${i?'<span class="badge" style="background:#FFFBEB;color:#B45309;font-size:0.68rem;margin-left:4px;">Manual</span>':""}
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            ${p}
            <small style="color: #64748B; font-size: 0.74rem;">${g(e.bibName||"-")}</small>
          </div>
        </td>
        <td><code>${g(e.nik)}</code></td>
        <td><strong style="color: var(--color-primary);">${g(((L=e.event)==null?void 0:L.category)||"10K")}</strong></td>
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
            ${g(e.emergencyContactName||"-")}<br>
            <strong>${g(e.emergencyContactPhone||"-")}</strong>
          </small>
        </td>
        <td>
          <span class="status-pill ${r}">
            ${((R=e.order)==null?void 0:R.status)||"PENDING"}
          </span>
        </td>
        <td>
          ${c}
        </td>
        <td>
          <div class="table-actions" style="display: flex; gap: 6px; justify-content: center;">
            <button class="btn-icon btn-direct-rpc" data-id="${e.id}" data-bib="${g(e.bibNumber||e.id)}" title="Buka Validasi Racepack" style="color: #EA580C; background: #FFEDD5;" data-permission="participants:update">
              <i class="fa-solid fa-box-open"></i>
            </button>
            <button class="btn-icon edit btn-edit-part" data-id="${e.id}" title="Edit Data Peserta" data-permission="participants:update">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-icon delete btn-delete-part" data-id="${e.id}" data-name="${g(e.fullNameKtp)}" title="Hapus Peserta" data-permission="participants:delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `}).join(""),a.querySelectorAll(".btn-direct-rpc").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id");n&&(fe("racepack"),q(n))})}),a.querySelectorAll(".btn-edit-part").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=f.participants.find(s=>s.id===n);i&&wt(i)})}),a.querySelectorAll(".btn-delete-part").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await S({title:"Hapus Data Peserta?",message:`Apakah Anda yakin ingin menghapus data peserta "${i}"? Nomor BIB dan data peserta ini akan dihapus dari sistem.`,confirmText:"Ya, Hapus Peserta",type:"danger"})&&await Pt(n)})}),j(f.profile)}}function Ft(){var t;document.getElementById("partFormId").value="",document.getElementById("modalParticipantTitle").innerHTML='<i class="fa-solid fa-user-plus" style="color: var(--color-primary);"></i> Tambah Peserta Manual',document.getElementById("partFormFullName").value="",document.getElementById("partFormBibName").value="",document.getElementById("partFormNik").value="",document.getElementById("partFormEmergencyName").value="",document.getElementById("partFormEmergencyPhone").value="",(t=document.getElementById("modalParticipantBackdrop"))==null||t.classList.add("open")}function wt(t){var a;document.getElementById("partFormId").value=t.id,document.getElementById("modalParticipantTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Data Peserta: ${g(t.fullNameKtp)}`,document.getElementById("partFormEventId").value=t.eventId||"",document.getElementById("partFormFullName").value=t.fullNameKtp,document.getElementById("partFormBibName").value=t.bibName||"",document.getElementById("partFormNik").value=t.nik,document.getElementById("partFormGender").value=t.gender||"MALE",document.getElementById("partFormBloodType").value=t.bloodType||"O",document.getElementById("partFormSize").value=t.selectedSize||"M",document.getElementById("partFormBirthPlace").value=t.birthPlace||"Tegal",document.getElementById("partFormBirthDate").value=t.birthDate?t.birthDate.slice(0,10):"1995-05-15",document.getElementById("partFormAddress").value=t.fullAddress||"Jl. Pancasila No. 12, Tegal",document.getElementById("partFormEmergencyName").value=t.emergencyContactName||"",document.getElementById("partFormEmergencyPhone").value=t.emergencyContactPhone||"",(a=document.getElementById("modalParticipantBackdrop"))==null||a.classList.add("open")}async function Ct(t){var n;t.preventDefault();const a=document.getElementById("partFormId").value,e={eventId:document.getElementById("partFormEventId").value,fullNameKtp:document.getElementById("partFormFullName").value.trim(),bibName:document.getElementById("partFormBibName").value.trim(),nik:document.getElementById("partFormNik").value.trim(),gender:document.getElementById("partFormGender").value,bloodType:document.getElementById("partFormBloodType").value,selectedSize:document.getElementById("partFormSize").value,birthPlace:document.getElementById("partFormBirthPlace").value.trim(),birthDate:document.getElementById("partFormBirthDate").value,fullAddress:document.getElementById("partFormAddress").value.trim(),country:"Indonesia",emergencyContactName:document.getElementById("partFormEmergencyName").value.trim(),emergencyContactPhone:document.getElementById("partFormEmergencyPhone").value.trim()};try{let i;a?i=await b(`/admin/participants/${a}`,{method:"PUT",body:JSON.stringify(e)}):i=await b("/admin/participants",{method:"POST",body:JSON.stringify(e)}),i.status==="success"?(l("success","Berhasil",a?"Data peserta diperbarui!":"Peserta baru berhasil didaftarkan manual!"),(n=document.getElementById("modalParticipantBackdrop"))==null||n.classList.remove("open"),$()):l("error","Gagal",i.message||"Validasi data peserta gagal")}catch(i){l("error","Kesalahan Server",i.message)}}async function Pt(t){try{const a=await b(`/admin/participants/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Data peserta berhasil dihapus!"),$()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}function Dt(){if(f.participants.length===0){l("warning","Peringatan","Tidak ada data peserta untuk diunduh.");return}const t=["No","Nama KTP","Nomor BIB","BIB Name","NIK","Kategori","Gender","Gol Darah","Size Jersey","Emergency Contact","Status Bayar","Status Racepack"],a=f.participants.map((s,o)=>{var r,d,c;return[o+1,`"${s.fullNameKtp}"`,`"${s.bibNumber||""}"`,`"${s.bibName||""}"`,`'${s.nik}`,`"${((r=s.event)==null?void 0:r.category)||""}"`,s.gender,s.bloodType,s.selectedSize,`"${s.emergencyContactPhone||""}"`,((d=s.order)==null?void 0:d.status)||"PENDING",(c=s.racepack)!=null&&c.checkedIn?"Sudah Check-in":"Belum Check-in"]}),e="data:text/csv;charset=utf-8,"+[t.join(","),...a.map(s=>s.join(","))].join(`
`),n=encodeURI(e),i=document.createElement("a");i.setAttribute("href",n),i.setAttribute("download",`peserta_tegal_run_2027_${Date.now()}.csv`),document.body.appendChild(i),i.click(),i.remove()}async function O(){var t,a;try{const e=((t=document.getElementById("filterOrderStatus"))==null?void 0:t.value)||"",n=((a=document.getElementById("searchOrder"))==null?void 0:a.value)||"",i=new URLSearchParams({limit:"50"});e&&i.append("status",e),n&&i.append("search",n);const s=await b(`/admin/orders?${i.toString()}`);s.status==="success"&&(f.orders=s.data,Nt(s.data))}catch(e){console.error("Failed to load orders:",e)}}function Nt(t){const a=document.getElementById("adminOrdersTableBody");if(a){if(t.length===0){a.innerHTML=`
      <tr>
        <td colspan="10" style="text-align: center; padding: 30px; color: #94A3B8;">
          Belum ada data transaksi/order.
        </td>
      </tr>
    `;return}a.innerHTML=t.map((e,n)=>{var p,m,u;const i=new Date(e.createdAt).toLocaleString("id-ID"),s=e.status==="SETTLEMENT"||e.status==="CAPTURE",o=e.status==="CANCEL"||e.status==="EXPIRE"||e.status==="DENY",r=s?"success":o?"danger":"pending",c=!e.midtransOrderId||e.midtransOrderId.startsWith("OFFLINE-")?'<span class="badge" style="background:#FFFBEB;color:#B45309;font-weight:700;border:1px solid #FDE68A;font-size:0.75rem;"><i class="fa-solid fa-user-pen"></i> Pendaftaran Manual</span>':'<span class="badge" style="background:#EFF6FF;color:#1D4ED8;font-weight:700;border:1px solid #BFDBFE;font-size:0.75rem;"><i class="fa-solid fa-globe"></i> Website (Midtrans)</span>';return`
      <tr>
        <td>${n+1}</td>
        <td><code>${g(e.midtransOrderId||e.id.slice(0,12))}</code></td>
        <td>${c}</td>
        <td><strong>${g(((p=e.user)==null?void 0:p.fullName)||"Anonim")}</strong></td>
        <td><small>${g(((m=e.user)==null?void 0:m.email)||"-")}<br>${g(((u=e.user)==null?void 0:u.phoneNumber)||"-")}</small></td>
        <td style="text-align: center;"><strong>${e.participantsCount}</strong> Peserta</td>
        <td><strong style="color: var(--color-primary);">${C(e.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${r}">
            ${e.status}
          </span>
        </td>
        <td><small style="color: #64748B;">${i}</small></td>
        <td>
          <div class="table-actions">
            <button class="btn-icon edit btn-update-order-status" data-id="${e.id}" data-display="${g(e.midtransOrderId||e.id)}" data-status="${e.status}" title="Ubah Status Order" data-permission="orders:update">
              <i class="fa-solid fa-file-pen"></i>
            </button>
            <button class="btn-icon delete btn-delete-order" data-id="${e.id}" title="Hapus Order" data-permission="orders:delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-update-order-status").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-display"),s=e.getAttribute("data-status");Lt(n,i,s)})}),document.querySelectorAll(".btn-delete-order").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id");await S({title:"Hapus Data Transaksi?",message:"PERINGATAN: Apakah Anda yakin ingin menghapus data transaksi ini dari riwayat keuangan?",confirmText:"Ya, Hapus Transaksi",type:"danger"})&&await Mt(n)})}),j(f.profile)}}function Lt(t,a,e){var n;document.getElementById("orderFormId").value=t,document.getElementById("orderFormDisplayId").value=a,document.getElementById("orderFormStatus").value=e||"SETTLEMENT",document.getElementById("orderFormReason").value="",(n=document.getElementById("modalOrderBackdrop"))==null||n.classList.add("open")}async function Rt(t){var i;t.preventDefault();const a=document.getElementById("orderFormId").value,e=document.getElementById("orderFormStatus").value,n=document.getElementById("orderFormReason").value.trim();try{const s=await b(`/admin/orders/${a}/status`,{method:"PUT",body:JSON.stringify({status:e,reason:n})});s.status==="success"?(l("success","Status Diperbarui",`Status order berhasil diubah menjadi ${e}!`),(i=document.getElementById("modalOrderBackdrop"))==null||i.classList.remove("open"),O(),$(),K()):l("error","Gagal",s.message)}catch(s){l("error","Kesalahan Server",s.message)}}async function Mt(t){try{const a=await b(`/admin/orders/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Data transaksi berhasil dihapus!"),O()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}const Te=[{name:"SUPERADMIN",authority:"Tinggi (Root Access)",authorityColor:"#DC2626",desc:"Pemegang kendali tertinggi seluruh sistem, server, database, konfigurasi keuangan, dan manajemen izin RBAC.",pages:["Dashboard","Event & Tiket","Manajemen Peserta","Transaksi & Keuangan","Log Notifikasi","WhatsApp Web Console","Konten Website/CMS","Countdown & Status","Konfigurasi Notifikasi","Rute & Checkpoint","Kelola Admin & RBAC","Log Audit Sistem"],reason:"Akses tak terbatas (*) ke semua modul untuk kontrol dan audit menyeluruh."},{name:"ADMINISTRATOR",authority:"Tinggi (Operasional)",authorityColor:"#EA580C",desc:"Koordinator operasional utama event. Bertanggung jawab atas ketersediaan tiket, data pelari, jalur lari, dan publikasi website.",pages:["Dashboard","Event & Tiket","Manajemen Peserta","Transaksi & Order","Log Notifikasi","WhatsApp Web Console","Konten Website/CMS","Countdown & Status","Rute & Checkpoint"],reason:"Memerlukan akses operasional penuh namun dibatasi dari konfigurasi sensitif RBAC admin."},{name:"FINANCE",authority:"Tinggi (Finansial)",authorityColor:"#059669",desc:"Divisi keuangan & bendahara event. Mengaudit pembayaran peserta, rekonsiliasi Midtrans, settlement manual, dan refund.",pages:["Dashboard","Transaksi & Order","Log Audit Sistem"],reason:"Khusus mengawasi arus kas tiket, verifikasi pembayaran manual, dan verifikasi status mutasi dana."},{name:"SPONSORSHIP",authority:"Menengah (Kemitraan)",authorityColor:"#2563EB",desc:"Divisi kemitraan sponsor. Mengelola materi promosi sponsor di CMS, benefit tiket sponsor, dan laporan pendaftar.",pages:["Dashboard","Konten Website/CMS","Event & Tiket (Read/Benefit)","Log Notifikasi"],reason:"Memastikan logo dan hak promosi sponsor tampil presisi di web serta laporan jumlah peserta."},{name:"RACEPACK_OFFICER",authority:"Operasional Lapangan",authorityColor:"#7C3AED",desc:"Petugas meja Race Pack Collection (RPC). Memvalidasi E-Tiket pelari, mencatat serah terima racepack/jersey, dan serah terima nomor BIB.",pages:["Dashboard","Manajemen Peserta & RPC","WhatsApp Web Console"],reason:"Membutuhkan akses pencarian data pelari, serah terima jersey, dan kontak langsung pelari bermasalah di booth."},{name:"GATE_OPERATOR",authority:"Operasional Pintu",authorityColor:"#0D9488",desc:"Petugas pemindai tiket di gerbang venue. Scan barcode/QR tiket, verifikasi status lunas, dan validasi akses masuk pelari.",pages:["Dashboard","Manajemen Peserta (Check-in/Scan)"],reason:"Hanya butuh verifikasi cepat keabsahan tiket pelari saat memasuki race village."},{name:"RACE_DIRECTOR",authority:"Tinggi (Teknis Lomba)",authorityColor:"#D97706",desc:"Pimpinan teknis lomba. Mengawasi rute marathon, pos medis, water station, timing cut-off time (COT), dan kontrol countdown lomba.",pages:["Dashboard","Rute & Checkpoint","Countdown & Status Event","Manajemen Peserta","Manajemen Event"],reason:"Memantau kesiapan rute, kondisi titik evakuasi, dan timeline pelepasan pelari (flag-off)."},{name:"TIMING_JUDGE",authority:"Menengah (Juri Timing)",authorityColor:"#4F46E5",desc:"Juri pencatat waktu & komisi timing PASI. Mengelola sinkronisasi nomor BIB dengan timing chip RFID dan checkpoint rute.",pages:["Dashboard","Manajemen Peserta (BIB & Data)","Rute & Checkpoint"],reason:"Memerlukan nomor BIB peserta dan mapping titik timing mat pada rute."},{name:"MEDICAL_OFFICER",authority:"Operasional Medis",authorityColor:"#E11D48",desc:"Tim medis, dokter lapangan, dan rescue. Memerlukan akses cepat data riwayat kesehatan, golongan darah, kontak darurat keluarga, dan pos medis.",pages:["Dashboard","Manajemen Peserta (Rekam Medis & Kontak Darurat)","Rute & Checkpoint (Pos Medis)"],reason:"Penting untuk penanganan darurat kecelakaan atau cedera pelari selama lomba berlangsung."},{name:"VOLUNTEER",authority:"Dasar (Relawan)",authorityColor:"#64748B",desc:"Relawan umum di venue dan rute. Membantu cek informasi peserta di helpdesk dan panduan umum tanpa hak mengubah data kritis.",pages:["Dashboard","Manajemen Peserta (Read-Only)"],reason:"Akses baca terbatas untuk panduan peserta di lapangan tanpa risiko perubahan data."},{name:"BAG_DROP_OFFICER",authority:"Operasional Penitipan",authorityColor:"#0891B2",desc:"Petugas tenda penitipan barang pelari (Bag Drop). Mencocokkan nomor BIB dan identitas pelari saat titip dan ambil barang.",pages:["Dashboard","Manajemen Peserta (Pencarian BIB)"],reason:"Hanya memerlukan pencarian nomor BIB pelari untuk validasi tag barang bawaan."},{name:"CUSTOMER_SERVICE",authority:"Operasional CS",authorityColor:"#16A34A",desc:"Tim helpdesk & CS pelari. Membalas pertanyaan via WhatsApp Web Console, cek status pesanan tiket, log pengiriman, dan kendala pembayaran.",pages:["Dashboard","WhatsApp Web Console","Log Notifikasi Peserta","Manajemen Peserta","Transaksi & Order"],reason:"Membutuhkan akses komunikasi langsung ke pelari serta melihat status order untuk menyelesaikan komplain tiket."}],ae=[{key:"page:dashboard",label:"Dashboard Overview",icon:"fa-gauge-high",desc:"Ringkasan statistik, kuota & omzet"},{key:"page:events",label:"Manajemen Event & Tiket",icon:"fa-calendar-days",desc:"Kategori tiket, harga, kuota & benefit"},{key:"page:participants",label:"Manajemen Peserta",icon:"fa-users",desc:"Pendaftar, nomor BIB & status"},{key:"page:racepack",label:"Pengambilan Racepack (RPC)",icon:"fa-box-open",desc:"Scan QR kamera HP, verifikasi E-Tiket & serah terima"},{key:"page:orders",label:"Transaksi & Keuangan",icon:"fa-receipt",desc:"Audit order, Midtrans & refund"},{key:"page:notif-logs",label:"Log Notifikasi Peserta",icon:"fa-paper-plane",desc:"Riwayat WA & email E-Tiket"},{key:"page:whatsapp-web",label:"WhatsApp Web Console",icon:"fa-brands fa-whatsapp",desc:"Chat langsung & CS peserta"},{key:"page:cms",label:"Konten Website & CMS",icon:"fa-pen-ruler",desc:"Teks website, sponsor & banner"},{key:"page:countdown",label:"Countdown & Status Event",icon:"fa-stopwatch-20",desc:"Status pendaftaran & waktu lomba"},{key:"page:notifications",label:"Konfigurasi Notifikasi",icon:"fa-bell",desc:"Gateway WA, SMTP & template"},{key:"page:routes",label:"Rute & Checkpoint",icon:"fa-map-pin",desc:"Pos medis, water station & jalur"},{key:"page:admins",label:"Kelola Admin & RBAC",icon:"fa-shield-halved",desc:"Akun staf & hak akses role"},{key:"page:logs",label:"Log Audit Sistem",icon:"fa-clock-rotate-left",desc:"Rekam jejak audit keamanan"}];function ya(t){const a=document.getElementById("btnRbacTabUsers"),e=document.getElementById("btnRbacTabRoles"),n=document.getElementById("btnRbacTabMatrix"),i=document.getElementById("rbacSectionUsers"),s=document.getElementById("rbacSectionRoles"),o=document.getElementById("rbacSectionMatrix");a&&(a.className=t==="users"?"btn btn-primary btn-sm":"btn btn-outline btn-sm"),e&&(e.className=t==="roles"?"btn btn-primary btn-sm":"btn btn-outline btn-sm"),n&&(n.className=t==="matrix"?"btn btn-primary btn-sm":"btn btn-outline btn-sm"),i&&(i.style.display=t==="users"?"block":"none"),s&&(s.style.display=t==="roles"?"block":"none"),o&&(o.style.display=t==="matrix"?"block":"none")}window.switchRbacSubTab=ya;async function J(){try{const[t,a]=await Promise.all([b("/admin/users-management").catch(()=>null),b("/admin/roles").catch(()=>null)]);if(a&&a.status==="success"){f.roles=a.data||[],f.systemModules=a.modules||ae;const e=document.getElementById("adminUserRoleId");e&&(e.innerHTML=f.roles.map(n=>`
          <option value="${n.id}">${g(n.name)} - ${g(n.description||"")}</option>
        `).join("")),Ot(f.roles),$t()}t&&t.status==="success"&&(f.admins=t.data||[],Kt(f.admins))}catch(t){console.error("Failed to load admins and roles:",t)}}function Kt(t){const a=document.getElementById("adminUsersTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="8" style="text-align: center; padding: 20px; color: #94A3B8;">Belum ada akun admin.</td></tr>';return}a.innerHTML=t.map((e,n)=>{var s,o;const i=((s=e.role)==null?void 0:s.name)==="SUPERADMIN";return`
      <tr>
        <td>${n+1}</td>
        <td><strong>${g(e.fullName)}</strong></td>
        <td><code>@${g(e.username)}</code></td>
        <td>${g(e.email)}</td>
        <td><span class="admin-badge-role">${g(((o=e.role)==null?void 0:o.name)||"ADMIN")}</span></td>
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
              <button class="btn-icon delete btn-delete-admin-user" data-id="${e.id}" data-name="${g(e.fullName)}" title="Hapus Admin">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            `}
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-edit-admin-user").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=f.admins.find(s=>s.id===n);i&&jt(i)})}),document.querySelectorAll(".btn-delete-admin-user").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-id"),i=e.getAttribute("data-name");await S({title:"Hapus Akun Admin?",message:`Apakah Anda yakin ingin menghapus akun admin "${i}"? Akun ini tidak akan dapat login lagi ke portal.`,confirmText:"Ya, Hapus Akun",type:"danger"})&&await Jt(n)})})}}function Ot(t){const a=document.getElementById("adminRolesTableBody");if(!a)return;if(t.length===0){a.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 20px; color: #94A3B8;">Belum ada role terdaftar.</td></tr>';return}const e={};(f.systemModules||ae).forEach(n=>{e[n.key]=n.label}),a.innerHTML=t.map((n,i)=>{var p;n.name;const s=Array.isArray(n.permissions)?n.permissions:[],o=s.includes("*");let r="";if(o)r='<span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; font-weight: 700;"><i class="fa-solid fa-star"></i> Semua Halaman (Akses Penuh)</span>';else{const m=s.filter(u=>u.startsWith("page:"));m.length===0?r='<span style="color: #94A3B8; font-size: 0.75rem;">(Belum ada halaman diizinkan)</span>':r=m.map(u=>{const y=e[u]||u.replace("page:","");return`<span class="role-page-pill">${g(y)}</span>`}).join("")}const d=((p=n._count)==null?void 0:p.admins)||0,c=Te.some(m=>m.name===n.name);return`
      <tr>
        <td>${i+1}</td>
        <td>
          <span class="admin-badge-role" style="font-weight: 800; font-size: 0.8rem;">${g(n.name)}</span>
        </td>
        <td style="max-width: 280px; font-size: 0.82rem; color: #475569;">
          ${g(n.description||"-")}
        </td>
        <td style="max-width: 320px;">
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${r}
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
            ${!c&&d===0?`
              <button class="btn-icon delete btn-delete-role" data-id="${n.id}" data-name="${g(n.name)}" title="Hapus Role">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            `:""}
          </div>
        </td>
      </tr>
    `}).join(""),document.querySelectorAll(".btn-edit-role").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-id"),s=f.roles.find(o=>o.id===i);s&&Ut(s)})}),document.querySelectorAll(".btn-delete-role").forEach(n=>{n.addEventListener("click",async()=>{const i=n.getAttribute("data-id"),s=n.getAttribute("data-name");await S({title:"Hapus Role?",message:`Apakah Anda yakin ingin menghapus role "${s}"? Tindakan ini tidak dapat dibatalkan.`,confirmText:"Ya, Hapus Role",type:"danger"})&&await zt(i)})})}function $t(){const t=document.getElementById("roleDirectoryTableBody");t&&(t.innerHTML=Te.map((a,e)=>{const n=a.pages.map(i=>`<span class="role-page-pill">${g(i)}</span>`).join("");return`
      <tr>
        <td>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span class="admin-badge-role" style="width: fit-content; font-size: 0.8rem; font-weight: 800;">${a.name}</span>
            <small style="color: #64748B; font-size: 0.72rem;">Divisi #${e+1}</small>
          </div>
        </td>
        <td style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
          <strong>${g(a.desc)}</strong>
          <div style="font-size: 0.76rem; color: #64748B; margin-top: 4px;">
            <i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> ${g(a.reason)}
          </div>
        </td>
        <td>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${n}
          </div>
        </td>
        <td>
          <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; background: ${a.authorityColor}15; color: ${a.authorityColor}; border: 1px solid ${a.authorityColor}40;">
            ${g(a.authority)}
          </span>
        </td>
      </tr>
    `}).join(""))}function va(t=[],a=!1){const e=document.getElementById("roleModulesContainer");if(!e)return;const n=f.systemModules||ae;e.innerHTML=n.map(i=>{const s=a||t.includes(i.key),o=a;return`
      <label class="role-module-card ${s?"checked":""}" id="card-${i.key.replace(":","_")}">
        <input type="checkbox" name="role_page" value="${i.key}" ${s?"checked":""} ${o?"disabled":""} onchange="toggleModuleCardStyle(this)">
        <div class="module-icon">
          <i class="fa-solid ${i.icon}"></i>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 0.84rem; font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${g(i.label)}
          </div>
          <div style="font-size: 0.72rem; color: #64748B; line-height: 1.3; margin-top: 2px;">
            ${g(i.desc||"")}
          </div>
        </div>
      </label>
    `}).join("")}window.toggleModuleCardStyle=function(t){const a=t.closest(".role-module-card");a&&(t.checked?a.classList.add("checked"):a.classList.remove("checked"))};function Ht(){var a;document.getElementById("roleFormId").value="",document.getElementById("modalRoleTitle").innerHTML='<i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Role Akses Baru';const t=document.getElementById("roleFormName");t.value="",t.readOnly=!1,document.getElementById("roleFormDesc").value="",va(["page:dashboard"],!1),(a=document.getElementById("modalRoleBackdrop"))==null||a.classList.add("open")}function Ut(t){var s;document.getElementById("roleFormId").value=t.id,document.getElementById("modalRoleTitle").innerHTML=`<i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Atur Hak Akses Role: ${g(t.name)}`;const a=document.getElementById("roleFormName");a.value=t.name;const e=t.name==="SUPERADMIN";a.readOnly=e,document.getElementById("roleFormDesc").value=t.description||"";const n=Array.isArray(t.permissions)?t.permissions:[];let i=[];n.includes("*")?i=(f.systemModules||ae).map(o=>o.key):i=n.filter(o=>o.startsWith("page:")),va(i,e),(s=document.getElementById("modalRoleBackdrop"))==null||s.classList.add("open")}async function _t(t){var r,d,c,p,m;t.preventDefault();const a=document.getElementById("roleFormId").value,e=document.getElementById("roleFormName").value.trim().toUpperCase(),n=document.getElementById("roleFormDesc").value.trim(),i=e==="SUPERADMIN";let s=[];if(i)s=["*"];else{const y=Array.from(document.querySelectorAll('input[name="role_page"]:checked')).map(E=>E.value);if(y.length===0){l("warning","Peringatan","Pilih minimal 1 halaman yang diizinkan untuk role ini.");return}y.includes("page:dashboard")||y.unshift("page:dashboard");const v=f.systemModules||ae,k=new Set;y.forEach(E=>{const B=v.find(I=>I.key===E);B&&Array.isArray(B.apiPermissions)&&B.apiPermissions.forEach(I=>k.add(I))}),s=[...y,...Array.from(k)]}const o={name:e,description:n,permissions:s};try{let u;a?u=await b(`/admin/roles/${a}`,{method:"PUT",body:JSON.stringify(o)}):u=await b("/admin/roles",{method:"POST",body:JSON.stringify(o)}),u.status==="success"?(l("success","Berhasil",a?`Hak akses role '${e}' berhasil diperbarui ke database!`:`Role '${e}' berhasil dibuat!`),(r=document.getElementById("modalRoleBackdrop"))==null||r.classList.remove("open"),(((c=(d=f.profile)==null?void 0:d.role)==null?void 0:c.id)===a||((m=(p=f.profile)==null?void 0:p.role)==null?void 0:m.name)===e)&&(f.profile.role.permissions=s,applyRbacUi(f.profile)),await J()):l("error","Gagal",u.message||"Gagal menyimpan role.")}catch(u){l("error","Kesalahan Server",u.message)}}async function zt(t){try{const a=await b(`/admin/roles/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Role berhasil dihapus!"),J()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}async function Gt(){if(await S({title:"Reset ke 12 Role Default?",message:"Tindakan ini akan mengembalikan seluruh izin hak akses ke-12 role resmi penyelenggara event ke standar sistem default di database.",confirmText:"Ya, Reset Role Default",type:"warning"}))try{const a=await b("/admin/roles/reset-defaults",{method:"POST"});a.status==="success"?(l("success","Role Tersinkron",a.message),J()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}function Wt(){var t;document.getElementById("adminUserFormId").value="",document.getElementById("modalAdminUserTitle").innerHTML='<i class="fa-solid fa-user-shield" style="color: var(--color-primary);"></i> Tambah Akun Admin Baru',document.getElementById("adminUserFullName").value="",document.getElementById("adminUserUsername").value="",document.getElementById("adminUserEmail").value="",document.getElementById("adminUserPassword").value="",document.getElementById("adminUserPassword").required=!0,document.getElementById("adminPasswordReq").style.display="inline",document.getElementById("adminPasswordHint").textContent="Wajib diisi untuk akun baru (minimal 8 karakter).",(t=document.getElementById("modalAdminUserBackdrop"))==null||t.classList.add("open")}function jt(t){var a;document.getElementById("adminUserFormId").value=t.id,document.getElementById("modalAdminUserTitle").innerHTML=`<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Akun Admin: ${g(t.fullName)}`,document.getElementById("adminUserFullName").value=t.fullName,document.getElementById("adminUserUsername").value=t.username,document.getElementById("adminUserEmail").value=t.email,document.getElementById("adminUserRoleId").value=t.roleId,document.getElementById("adminUserPassword").value="",document.getElementById("adminUserPassword").required=!1,document.getElementById("adminPasswordReq").style.display="none",document.getElementById("adminPasswordHint").textContent="Kosongkan jika tidak ingin mengubah password akun ini.",(a=document.getElementById("modalAdminUserBackdrop"))==null||a.classList.add("open")}async function qt(t){var d;t.preventDefault();const a=document.getElementById("adminUserFormId").value,e=document.getElementById("adminUserFullName").value.trim(),n=document.getElementById("adminUserUsername").value.trim(),i=document.getElementById("adminUserEmail").value.trim(),s=document.getElementById("adminUserRoleId").value,o=document.getElementById("adminUserPassword").value,r={fullName:e,username:n,email:i,roleId:s,isActive:!0};o&&(r.password=o);try{let c;a?c=await b(`/admin/users-management/${a}`,{method:"PUT",body:JSON.stringify(r)}):c=await b("/admin/users-management",{method:"POST",body:JSON.stringify(r)}),c.status==="success"?(l("success","Berhasil",a?"Data akun admin diperbarui!":"Akun admin baru berhasil dibuat!"),(d=document.getElementById("modalAdminUserBackdrop"))==null||d.classList.remove("open"),J()):l("error","Gagal",c.message||"Validasi admin gagal")}catch(c){l("error","Kesalahan Server",c.message)}}async function Jt(t){try{const a=await b(`/admin/users-management/${t}`,{method:"DELETE"});a.status==="success"?(l("success","Terhapus","Akun admin berhasil dihapus!"),J()):l("error","Gagal",a.message)}catch(a){l("error","Kesalahan Server",a.message)}}window.switchRbacSubTab=ya;async function ha(){try{const t=await b("/admin/logs?limit=25").catch(()=>null);t&&t.status==="success"&&Qt(t.data.logs||t.data||[])}catch(t){console.error("Failed to load audit logs:",t)}}function Qt(t){const a=document.getElementById("adminAuditLogsTableBody");if(a){if(t.length===0){a.innerHTML='<tr><td colspan="4" style="text-align:center; padding:20px; color:#94A3B8;">Tidak ada catatan log audit.</td></tr>';return}a.innerHTML=t.map(e=>{var i,s;return`
      <tr>
        <td><small style="color: #64748B;">${new Date(e.createdAt).toLocaleString("id-ID")}</small></td>
        <td><code>${g(e.action)}</code></td>
        <td>${g(e.description)}</td>
        <td><strong>${g(((i=e.admin)==null?void 0:i.fullName)||((s=e.user)==null?void 0:s.fullName)||"Sistem")}</strong></td>
      </tr>
    `}).join("")}}async function Vt(){var t,a;try{await Fe(),await da(),await K(),await $(),await O(),((a=(t=f.profile)==null?void 0:t.role)==null?void 0:a.name)==="SUPERADMIN"&&await J(),await ha(),j(f.profile)}catch(e){console.error("Error loading dashboard data:",e)}}async function Fe(){try{const t=await b("/admin/stats");if(t&&t.status==="success"&&t.data){const a=t.data,e=a.financials||{settled:{count:0,amount:a.totalRevenue||0},pending:{count:0,amount:0},cancelled:{count:0,amount:0},refund:{count:0,amount:0},netRevenue:a.netRevenue||a.totalRevenue||0},n=document.getElementById("kpiTotalParticipants"),i=document.getElementById("kpiNetRevenue"),s=document.getElementById("kpiRemainingStock"),o=document.getElementById("kpiTotalRevenue");n&&(n.textContent=Number(a.totalParticipants||0).toLocaleString("id-ID")),i&&(i.textContent=C(e.netRevenue)),o&&(o.textContent=C(e.netRevenue));let r=0;(a.events||[]).forEach(w=>{r+=Number(w.remainingStock||0)}),s&&(s.textContent=r.toLocaleString("id-ID"));const d=document.getElementById("finSettledAmount"),c=document.getElementById("finSettledCount");d&&(d.textContent=C(e.settled.amount)),c&&(c.textContent=`${e.settled.count} Order`);const p=document.getElementById("finPendingAmount"),m=document.getElementById("finPendingCount");p&&(p.textContent=C(e.pending.amount)),m&&(m.textContent=`${e.pending.count} Order`);const u=document.getElementById("finCancelledAmount"),y=document.getElementById("finCancelledCount");u&&(u.textContent=C(e.cancelled.amount)),y&&(y.textContent=`${e.cancelled.count} Order`);const v=document.getElementById("finRefundAmount"),k=document.getElementById("finRefundCount");v&&(v.textContent=C(e.refund.amount)),k&&(k.textContent=`${e.refund.count} Order`);const E=document.getElementById("calcGross"),B=document.getElementById("calcRefund"),I=document.getElementById("calcNetResult");E&&(E.textContent=C(e.settled.amount)),B&&(B.textContent=C(e.refund.amount)),I&&(I.textContent=C(e.netRevenue))}}catch(t){console.warn("Gagal memuat statistik keuangan dashboard:",t)}}function Yt(){Fe()}async function Xt(){const t=document.getElementById("btnSyncMidtransDashboard"),a=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fa-solid fa-arrows-rotate fa-spin"></i> Mensinkronkan...');try{const e=await b("/admin/finance/sync-midtrans",{method:"POST"});e&&e.status==="success"?(l("success","Rekonsiliasi Selesai",e.message||"Status transaksi berhasil disinkronkan dengan Midtrans!"),await Fe(),O()):l("error","Gagal",(e==null?void 0:e.message)||"Gagal sinkronisasi dengan Midtrans.")}catch(e){l("error","Kesalahan Server",e.message)}finally{t&&(t.disabled=!1,t.innerHTML=a)}}async function Zt(t){t.preventDefault();const a=document.getElementById("adminIdentifier").value.trim(),e=document.getElementById("adminPassword").value,n=document.getElementById("btnLoginSubmit");n.disabled=!0,n.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Memverifikasi...';try{const i=await fetch(`${Ee}/admin/auth/login`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({identifier:a,password:e})});n.disabled=!1,n.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Masuk ke Dashboard Admin';const s=await i.text();let o;try{o=s?JSON.parse(s):{}}catch{l("error","Koneksi Gagal","Server backend belum siap atau tidak merespons JSON. Pastikan server backend sedang aktif di Port 3000.");return}if(!i.ok||o.status!=="success"){l("error","Login Gagal",o.message||"Kredensial tidak valid");return}f.token=o.data.token,localStorage.setItem("tegal_admin_token",o.data.token),f.profile=o.data.admin,l("success","Selamat Datang!",`Berhasil masuk sebagai ${o.data.admin.fullName}`),ka()}catch(i){n.disabled=!1,n.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Masuk ke Dashboard Admin';const s=i.message&&i.message.includes("Failed to fetch")?"Tidak dapat terhubung ke server backend di http://localhost:3000. Pastikan server backend sudah menyala.":i.message;l("error","Koneksi Gagal",s)}}function le(){f.token=null,f.profile=null,localStorage.removeItem("tegal_admin_token");const t=document.getElementById("adminDashboardSection"),a=document.getElementById("adminLoginSection");t&&(t.style.display="none"),a&&(a.style.display="flex")}async function ka(){var t;if(!f.token){const a=document.getElementById("adminLoginSection"),e=document.getElementById("adminDashboardSection");a&&(a.style.display="flex"),e&&(e.style.display="none");return}try{const a=await fetch(`${Ee}/admin/auth/me`,{headers:{Authorization:`Bearer ${f.token}`}}),e=await a.json();if(!a.ok||e.status!=="success"){le();return}f.profile=e.data;const n=document.getElementById("adminLoginSection"),i=document.getElementById("adminDashboardSection");n&&(n.style.display="none"),i&&(i.style.display="flex");const s=((t=f.profile.role)==null?void 0:t.name)||"ADMIN",o=document.getElementById("adminRoleBadge"),r=document.getElementById("adminFullName"),d=document.getElementById("adminUsername");o&&(o.textContent=s),r&&(r.textContent=f.profile.fullName),d&&(d.textContent=`@${f.profile.username}`),await xt(),j(f.profile),await Vt()}catch(a){console.error("Failed to authenticate:",a),le()}}window.closeAdminModal=function(t){var a;(a=document.getElementById(t))==null||a.classList.remove("open")};function en(){const t=document.getElementById("adminPanesContainer")||document.querySelector(".admin-content-body");t&&t.children.length===0&&(t.innerHTML=[Ea,xa,Ba,Ia,Sa,Aa,Ta,Fa,wa,Ca,Pa,Da,Na,La].join(`
`));const a=document.getElementById("adminModalsContainer");a&&a.children.length===0&&(a.innerHTML=Ra)}document.addEventListener("DOMContentLoaded",()=>{var t,a,e,n,i,s,o,r,d,c,p,m,u,y,v,k,E,B,I,w,N,L,R,Q,V,Y,A,te,X,we,Ce,Pe,De,Ne,Le,Re,Me,Ke,Oe,$e,He,Ue,_e,ze,Ge,We,je,qe,Je,Qe,Ve,Ye,Xe,Ze,ea,aa;en(),(t=document.getElementById("adminLoginForm"))==null||t.addEventListener("submit",Zt),(a=document.getElementById("btnToggleSidebar"))==null||a.addEventListener("click",It),(e=document.getElementById("sidebarOverlay"))==null||e.addEventListener("click",ke),(n=document.getElementById("btnRefreshEvents"))==null||n.addEventListener("click",K),(i=document.getElementById("btnRefreshOrders"))==null||i.addEventListener("click",O),(s=document.getElementById("btnRefreshLogs"))==null||s.addEventListener("click",ha),(o=document.getElementById("btnExportCsv"))==null||o.addEventListener("click",Dt),(r=document.getElementById("btnOpenCreateEventModal"))==null||r.addEventListener("click",Ha),(d=document.getElementById("btnOpenCreateParticipantModal"))==null||d.addEventListener("click",Ft),(c=document.getElementById("btnOpenCreateAdminModal"))==null||c.addEventListener("click",Wt),(p=document.getElementById("btnOpenCreateRouteModal"))==null||p.addEventListener("click",Qa),(m=document.getElementById("btnOpenCreateRoleModal"))==null||m.addEventListener("click",Ht),(u=document.getElementById("btnResetDefaultRoles"))==null||u.addEventListener("click",Gt),(y=document.getElementById("formEvent"))==null||y.addEventListener("submit",_a),(v=document.getElementById("formParticipant"))==null||v.addEventListener("submit",Ct),(k=document.getElementById("formOrderStatus"))==null||k.addEventListener("submit",Rt),(E=document.getElementById("formAdminUser"))==null||E.addEventListener("submit",qt),(B=document.getElementById("formRole"))==null||B.addEventListener("submit",_t),(I=document.getElementById("btnSelectAllPages"))==null||I.addEventListener("click",()=>{document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(h=>{var x;h.checked=!0,(x=h.closest(".role-module-card"))==null||x.classList.add("checked")})}),(w=document.getElementById("btnClearAllPages"))==null||w.addEventListener("click",()=>{document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(h=>{var x,P;h.value==="page:dashboard"?(h.checked=!0,(x=h.closest(".role-module-card"))==null||x.classList.add("checked")):(h.checked=!1,(P=h.closest(".role-module-card"))==null||P.classList.remove("checked"))})}),(N=document.getElementById("btnPresetDefaultPages"))==null||N.addEventListener("click",()=>{var H;const h=((H=document.getElementById("roleFormName"))==null?void 0:H.value.trim().toUpperCase())||"",P=Te.find(U=>U.name===h)?h==="ADMINISTRATOR"?["page:dashboard","page:events","page:participants","page:racepack","page:orders","page:notif-logs","page:whatsapp-web","page:cms","page:countdown","page:routes"]:h==="FINANCE"?["page:dashboard","page:orders","page:logs"]:h==="SPONSORSHIP"?["page:dashboard","page:cms","page:events","page:notif-logs"]:h==="RACEPACK_OFFICER"?["page:dashboard","page:racepack","page:participants","page:whatsapp-web"]:h==="GATE_OPERATOR"?["page:dashboard","page:participants","page:racepack"]:h==="RACE_DIRECTOR"?["page:dashboard","page:routes","page:countdown","page:participants","page:events","page:racepack"]:h==="TIMING_JUDGE"?["page:dashboard","page:participants","page:routes"]:h==="MEDICAL_OFFICER"?["page:dashboard","page:participants","page:routes"]:h==="VOLUNTEER"?["page:dashboard","page:participants","page:racepack"]:h==="BAG_DROP_OFFICER"?["page:dashboard","page:participants"]:h==="CUSTOMER_SERVICE"?["page:dashboard","page:whatsapp-web","page:notif-logs","page:participants","page:orders","page:racepack"]:["page:dashboard"]:["page:dashboard"];document.querySelectorAll('#roleModulesContainer input[type="checkbox"]:not(:disabled)').forEach(U=>{var na,ia;const ta=P.includes(U.value);U.checked=ta,ta?(na=U.closest(".role-module-card"))==null||na.classList.add("checked"):(ia=U.closest(".role-module-card"))==null||ia.classList.remove("checked")})}),(L=document.getElementById("formCmsSettings"))==null||L.addEventListener("submit",oa),(R=document.getElementById("formWebsiteCms"))==null||R.addEventListener("submit",oa),(Q=document.getElementById("formNotificationSettings"))==null||Q.addEventListener("submit",tt),(V=document.getElementById("btnSendTestNotif"))==null||V.addEventListener("click",nt),(Y=document.getElementById("formEventBenefit"))==null||Y.addEventListener("submit",Wa),(A=document.getElementById("btnCancelBenefitEdit"))==null||A.addEventListener("click",Ie),(te=document.getElementById("formRoutePoint"))==null||te.addEventListener("submit",Ya),(X=document.getElementById("btnSaveGlobalCountdown"))==null||X.addEventListener("click",Ma),(we=document.getElementById("btnResetGlobalCountdown"))==null||we.addEventListener("click",Ka),(Ce=document.getElementById("btnToggleGlobalClosed"))==null||Ce.addEventListener("click",Oa),(Pe=document.getElementById("filterOrderStatus"))==null||Pe.addEventListener("change",O),(De=document.getElementById("searchOrder"))==null||De.addEventListener("input",()=>{clearTimeout(window._searchOrderTimer),window._searchOrderTimer=setTimeout(O,300)}),document.querySelectorAll(".participant-tabs-nav .part-tab-btn").forEach(h=>{h.addEventListener("click",()=>{const x=h.getAttribute("data-tab");x&&At(x)})}),(Ne=document.getElementById("filterParticipantCategory"))==null||Ne.addEventListener("change",re),(Le=document.getElementById("searchParticipant"))==null||Le.addEventListener("input",()=>{clearTimeout(window._searchParticipantTimer),window._searchParticipantTimer=setTimeout(re,250)}),(Re=document.getElementById("btnRefreshRacepackStats"))==null||Re.addEventListener("click",ee),(Me=document.getElementById("btnStartRpcCamera"))==null||Me.addEventListener("click",gt),(Ke=document.getElementById("btnStopRpcCamera"))==null||Ke.addEventListener("click",ue),(Oe=document.getElementById("btnConfirmRpcCheckin"))==null||Oe.addEventListener("click",pt),($e=document.getElementById("btnRevertRpcCheckin"))==null||$e.addEventListener("click",ut),(He=document.getElementById("formRpcManualSearch"))==null||He.addEventListener("submit",h=>{h.preventDefault();const x=document.getElementById("rpcSearchInput"),P=x?x.value.trim():"";P&&q(P)}),(Ue=document.getElementById("btnGenerateWaQr"))==null||Ue.addEventListener("click",et),(_e=document.getElementById("btnDisconnectWa"))==null||_e.addEventListener("click",at),(ze=document.getElementById("btnRefreshNotifLogs"))==null||ze.addEventListener("click",G),(Ge=document.getElementById("btnBatchSendNotif"))==null||Ge.addEventListener("click",dt),(We=document.getElementById("filterNotifDeliveryStatus"))==null||We.addEventListener("change",G),(je=document.getElementById("searchNotifLogs"))==null||je.addEventListener("input",()=>{clearTimeout(window._searchNotifTimer),window._searchNotifTimer=setTimeout(G,300)}),(qe=document.getElementById("btnRefreshWaWeb"))==null||qe.addEventListener("click",he),(Je=document.getElementById("btnWaWebSync"))==null||Je.addEventListener("click",he),(Qe=document.getElementById("btnGoToWaQr"))==null||Qe.addEventListener("click",()=>fe("notifications")),(Ve=document.getElementById("btnSyncMidtransDashboard"))==null||Ve.addEventListener("click",Xt),(Ye=document.getElementById("btnSendWaDirectMsg"))==null||Ye.addEventListener("click",st),(Xe=document.getElementById("waQuickTemplateSelect"))==null||Xe.addEventListener("change",ot),(Ze=document.getElementById("btnQuickSendPaidTicket"))==null||Ze.addEventListener("click",()=>ra()),(ea=document.getElementById("btnQuickSendPending"))==null||ea.addEventListener("click",()=>ra()),(aa=document.getElementById("waContactSearchInput"))==null||aa.addEventListener("input",h=>{const x=(h.target.value||"").toLowerCase(),P=M.filter(H=>H.customerName.toLowerCase().includes(x)||H.customerPhone.includes(x)||H.ticketName.toLowerCase().includes(x));me(P)}),Et(),ka()});
