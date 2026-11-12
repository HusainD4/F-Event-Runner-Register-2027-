localStorage.removeItem('tegal_admin_token');

export const adminState = {
  isAuthenticated: false,
  profile: null,
  activeTab: 'dashboard',
  globalSettings: {
    eventCountdownDate: null,
    isRegistrationClosed: false
  },
  events: [],
  participants: [],
  orders: [],
  admins: [],
  roles: [],
  auditLogs: []
};

export const SYSTEM_MODULES = [
  { key: 'page:dashboard', name: 'Dashboard Overview', desc: 'Akses statistik KPI & omzet' },
  { key: 'page:events', name: 'Event & Tiket', desc: 'Kelola kategori tiket lomba & harga' },
  { key: 'page:participants', name: 'Peserta & BIB', desc: 'Kelola data pelari, BIB, & ekspor CSV' },
  { key: 'page:racepack', name: 'Pengambilan & Konfirmasi Racepack', desc: 'Scan QR, verifikasi pembayaran, dan konfirmasi serah terima RPC' },
  { key: 'page:orders', name: 'Transaksi & Order', desc: 'Verifikasi status bayar Midtrans' },
  { key: 'page:countdown', name: 'Countdown & Status', desc: 'Atur tanggal lomba & tutup pendaftaran' },
  { key: 'page:cms', name: 'Website CMS', desc: 'Kelola teks, foto banner & Google Maps' },
  { key: 'page:admins', name: 'Kelola Admin & RBAC', desc: 'Kelola staf & hak akses 12 role (Khusus Superadmin)' },
  { key: 'page:routes', name: 'Rute & Checkpoint', desc: 'Kelola rute, water station & pos medis' },
  { key: 'page:notifications', name: 'Konfigurasi Notifikasi', desc: 'Atur WhatsApp Gateway & SMTP Email' },
  { key: 'page:notif-logs', name: 'Log Notifikasi', desc: 'Pantau pengiriman e-tiket & resend' },
  { key: 'page:whatsapp-web', name: 'WhatsApp Web Console', desc: 'Live chat & kontak peserta langsung' },
  { key: 'page:logs', name: 'Audit Logs', desc: 'Rekam jejak aktivitas sistem' }
];

export const DEFAULT_ROLE_DIRECTORY = [
  { name: 'SUPERADMIN', title: 'Pemilik Sistem & Kontrol Tertinggi', desc: 'Akses tanpa batas (*) ke seluruh modul, sistem database, dan pengaturan RBAC 12 Role.', allowedPages: ['Semua Halaman (12 Modul)'], badge: 'SUPERADMIN', level: 'Level 1 (Penuh)' },
  { name: 'ADMINISTRATOR', title: 'Koordinator Operasional Harian', desc: 'Mengelola operasional event, pendaftar, status pembayaran, CMS konten, dan rute lari.', allowedPages: ['Dashboard', 'Event & Tiket', 'Peserta', 'Transaksi', 'CMS Website', 'Countdown', 'Rute', 'Log Notifikasi', 'WhatsApp Web'], badge: 'OPERATIONAL', level: 'Level 2 (Tinggi)' },
  { name: 'FINANCE', title: 'Divisi Keuangan & Pembayaran', desc: 'Memantau arus kas, status invoice Midtrans, settlement dana, dan rekonsiliasi audit keuangan.', allowedPages: ['Dashboard', 'Transaksi & Order', 'Audit Logs'], badge: 'FINANCE', level: 'Level 3 (Finansial)' },
  { name: 'SPONSORSHIP', title: 'Divisi Sponsorship & Kemitraan', desc: 'Mengelola konten promosi sponsor pada CMS website, tier sponsorship, dan kategori lomba pendukung.', allowedPages: ['Dashboard', 'Website CMS', 'Event & Tiket', 'Log Notifikasi'], badge: 'MARKETING', level: 'Level 4 (Promosi)' },
  { name: 'RACEPACK_OFFICER', title: 'Petugas Pengambilan Race Pack (RPC)', desc: 'Memverifikasi e-tiket peserta via scan kamera HP/scanner, serah terima jersey & nomor BIB.', allowedPages: ['Dashboard', 'Pengambilan Racepack', 'Peserta & BIB', 'WhatsApp Web Console'], badge: 'FIELD STAFF', level: 'Level 5 (Operasional Lapangan)' },
  { name: 'GATE_OPERATOR', title: 'Operator Pintu Masuk / Gate Scanner', desc: 'Memverifikasi status e-tiket di pintu masuk venue lomba (Start/Finish Gate) dan cek keabsahan pelari.', allowedPages: ['Dashboard', 'Peserta & BIB'], badge: 'FIELD STAFF', level: 'Level 5 (Operasional Lapangan)' },
  { name: 'RACE_DIRECTOR', title: 'Direktur Perlombaan & Teknis', desc: 'Mengawasi rute lomba, titik checkpoint medis, cut-off time (COT), status countdown, dan kategori lomba.', allowedPages: ['Dashboard', 'Rute & Checkpoint', 'Countdown Event', 'Peserta', 'Event & Tiket'], badge: 'EXECUTIVE', level: 'Level 2 (Teknis)' },
  { name: 'TIMING_JUDGE', title: 'Juri Waktu & Hasil Kejuaraan', desc: 'Mencocokkan nomor BIB peserta dengan catatan waktu PASI, verifikasi podium juara, dan titik checkpoint.', allowedPages: ['Dashboard', 'Peserta & BIB', 'Rute & Checkpoint'], badge: 'REFEREE', level: 'Level 4 (Penjurian)' },
  { name: 'MEDICAL_OFFICER', title: 'Petugas Medis & Tanggap Darurat', desc: 'Akses data kesehatan peserta (golongan darah, kontak darurat keluarga) dan titik pos medis di rute.', allowedPages: ['Dashboard', 'Peserta & BIB', 'Rute & Checkpoint'], badge: 'MEDICAL', level: 'Level 4 (Medis)' },
  { name: 'VOLUNTEER', title: 'Relawan & Staf Pendukung', desc: 'Membantu pengecekan daftar peserta, pembagian konsumsi, medali finisher, dan informasi umum pelari.', allowedPages: ['Dashboard', 'Peserta & BIB'], badge: 'SUPPORT', level: 'Level 6 (Relawan)' },
  { name: 'BAG_DROP_OFFICER', title: 'Petugas Titip Barang (Luggage / Bag Drop)', desc: 'Mencatat dan mencocokkan nomor BIB peserta untuk penitipan tas & barang berharga pelari.', allowedPages: ['Dashboard', 'Peserta & BIB'], badge: 'FIELD STAFF', level: 'Level 5 (Operasional Lapangan)' },
  { name: 'CUSTOMER_SERVICE', title: 'Layanan Bantuan Pelari / CS', desc: 'Melayani pertanyaan pendaftar via live WhatsApp Web, resend tiket yang belum terkirim, dan verifikasi order.', allowedPages: ['Dashboard', 'WhatsApp Web Console', 'Log Notifikasi', 'Peserta & BIB', 'Transaksi & Order'], badge: 'SUPPORT', level: 'Level 4 (Layanan Pelanggan)' }
];
