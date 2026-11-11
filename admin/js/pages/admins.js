import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog, escapeHtml } from '../core/utils.js';

// --- ADMIN USERS & RBAC (SUPERADMIN ONLY) ---
const DEFAULT_ROLE_DIRECTORY = [
  {
    name: 'SUPERADMIN',
    authority: 'Tinggi (Root Access)',
    authorityColor: '#DC2626',
    desc: 'Pemegang kendali tertinggi seluruh sistem, server, database, konfigurasi keuangan, dan manajemen izin RBAC.',
    pages: ['Dashboard', 'Event & Tiket', 'Manajemen Peserta', 'Transaksi & Keuangan', 'Log Notifikasi', 'WhatsApp Web Console', 'Konten Website/CMS', 'Countdown & Status', 'Konfigurasi Notifikasi', 'Rute & Checkpoint', 'Kelola Admin & RBAC', 'Log Audit Sistem'],
    reason: 'Akses tak terbatas (*) ke semua modul untuk kontrol dan audit menyeluruh.'
  },
  {
    name: 'ADMINISTRATOR',
    authority: 'Tinggi (Operasional)',
    authorityColor: '#EA580C',
    desc: 'Koordinator operasional utama event. Bertanggung jawab atas ketersediaan tiket, data pelari, jalur lari, dan publikasi website.',
    pages: ['Dashboard', 'Event & Tiket', 'Manajemen Peserta', 'Transaksi & Order', 'Log Notifikasi', 'WhatsApp Web Console', 'Konten Website/CMS', 'Countdown & Status', 'Rute & Checkpoint'],
    reason: 'Memerlukan akses operasional penuh namun dibatasi dari konfigurasi sensitif RBAC admin.'
  },
  {
    name: 'FINANCE',
    authority: 'Tinggi (Finansial)',
    authorityColor: '#059669',
    desc: 'Divisi keuangan & bendahara event. Mengaudit pembayaran peserta, rekonsiliasi Midtrans, settlement manual, dan refund.',
    pages: ['Dashboard', 'Transaksi & Order', 'Log Audit Sistem'],
    reason: 'Khusus mengawasi arus kas tiket, verifikasi pembayaran manual, dan verifikasi status mutasi dana.'
  },
  {
    name: 'SPONSORSHIP',
    authority: 'Menengah (Kemitraan)',
    authorityColor: '#2563EB',
    desc: 'Divisi kemitraan sponsor. Mengelola materi promosi sponsor di CMS, benefit tiket sponsor, dan laporan pendaftar.',
    pages: ['Dashboard', 'Konten Website/CMS', 'Event & Tiket (Read/Benefit)', 'Log Notifikasi'],
    reason: 'Memastikan logo dan hak promosi sponsor tampil presisi di web serta laporan jumlah peserta.'
  },
  {
    name: 'RACEPACK_OFFICER',
    authority: 'Operasional Lapangan',
    authorityColor: '#7C3AED',
    desc: 'Petugas meja Race Pack Collection (RPC). Memvalidasi E-Tiket pelari, mencatat serah terima racepack/jersey, dan serah terima nomor BIB.',
    pages: ['Dashboard', 'Manajemen Peserta & RPC', 'WhatsApp Web Console'],
    reason: 'Membutuhkan akses pencarian data pelari, serah terima jersey, dan kontak langsung pelari bermasalah di booth.'
  },
  {
    name: 'GATE_OPERATOR',
    authority: 'Operasional Pintu',
    authorityColor: '#0D9488',
    desc: 'Petugas pemindai tiket di gerbang venue. Scan barcode/QR tiket, verifikasi status lunas, dan validasi akses masuk pelari.',
    pages: ['Dashboard', 'Manajemen Peserta (Check-in/Scan)'],
    reason: 'Hanya butuh verifikasi cepat keabsahan tiket pelari saat memasuki race village.'
  },
  {
    name: 'RACE_DIRECTOR',
    authority: 'Tinggi (Teknis Lomba)',
    authorityColor: '#D97706',
    desc: 'Pimpinan teknis lomba. Mengawasi rute marathon, pos medis, water station, timing cut-off time (COT), dan kontrol countdown lomba.',
    pages: ['Dashboard', 'Rute & Checkpoint', 'Countdown & Status Event', 'Manajemen Peserta', 'Manajemen Event'],
    reason: 'Memantau kesiapan rute, kondisi titik evakuasi, dan timeline pelepasan pelari (flag-off).'
  },
  {
    name: 'TIMING_JUDGE',
    authority: 'Menengah (Juri Timing)',
    authorityColor: '#4F46E5',
    desc: 'Juri pencatat waktu & komisi timing PASI. Mengelola sinkronisasi nomor BIB dengan timing chip RFID dan checkpoint rute.',
    pages: ['Dashboard', 'Manajemen Peserta (BIB & Data)', 'Rute & Checkpoint'],
    reason: 'Memerlukan nomor BIB peserta dan mapping titik timing mat pada rute.'
  },
  {
    name: 'MEDICAL_OFFICER',
    authority: 'Operasional Medis',
    authorityColor: '#E11D48',
    desc: 'Tim medis, dokter lapangan, dan rescue. Memerlukan akses cepat data riwayat kesehatan, golongan darah, kontak darurat keluarga, dan pos medis.',
    pages: ['Dashboard', 'Manajemen Peserta (Rekam Medis & Kontak Darurat)', 'Rute & Checkpoint (Pos Medis)'],
    reason: 'Penting untuk penanganan darurat kecelakaan atau cedera pelari selama lomba berlangsung.'
  },
  {
    name: 'VOLUNTEER',
    authority: 'Dasar (Relawan)',
    authorityColor: '#64748B',
    desc: 'Relawan umum di venue dan rute. Membantu cek informasi peserta di helpdesk dan panduan umum tanpa hak mengubah data kritis.',
    pages: ['Dashboard', 'Manajemen Peserta (Read-Only)'],
    reason: 'Akses baca terbatas untuk panduan peserta di lapangan tanpa risiko perubahan data.'
  },
  {
    name: 'BAG_DROP_OFFICER',
    authority: 'Operasional Penitipan',
    authorityColor: '#0891B2',
    desc: 'Petugas tenda penitipan barang pelari (Bag Drop). Mencocokkan nomor BIB dan identitas pelari saat titip dan ambil barang.',
    pages: ['Dashboard', 'Manajemen Peserta (Pencarian BIB)'],
    reason: 'Hanya memerlukan pencarian nomor BIB pelari untuk validasi tag barang bawaan.'
  },
  {
    name: 'CUSTOMER_SERVICE',
    authority: 'Operasional CS',
    authorityColor: '#16A34A',
    desc: 'Tim helpdesk & CS pelari. Membalas pertanyaan via WhatsApp Web Console, cek status pesanan tiket, log pengiriman, dan kendala pembayaran.',
    pages: ['Dashboard', 'WhatsApp Web Console', 'Log Notifikasi Peserta', 'Manajemen Peserta', 'Transaksi & Order'],
    reason: 'Membutuhkan akses komunikasi langsung ke pelari serta melihat status order untuk menyelesaikan komplain tiket.'
  }
];

const SYSTEM_MODULES_FALLBACK = [
  { key: 'page:dashboard', label: 'Dashboard Overview', icon: 'fa-gauge-high', desc: 'Ringkasan statistik, kuota & omzet', apiPermissions: [] },
  { key: 'page:events', label: 'Manajemen Event & Tiket', icon: 'fa-calendar-days', desc: 'Kategori tiket, harga, kuota & benefit', apiPermissions: ['events:read', 'events:create', 'events:update', 'events:delete', 'benefits:manage', 'jerseys:manage'] },
  { key: 'page:participants', label: 'Manajemen Peserta', icon: 'fa-users', desc: 'Pendaftar, nomor BIB & status', apiPermissions: ['participants:read', 'participants:create', 'participants:update', 'participants:delete', 'bib:manage'] },
  { key: 'page:racepack', label: 'Pengambilan Racepack (RPC)', icon: 'fa-box-open', desc: 'Scan QR kamera HP, verifikasi E-Tiket & serah terima', apiPermissions: ['participants:read', 'participants:update', 'racepack:checkin'] },
  { key: 'page:racepack-view', label: 'Live View Antrean Racepack', icon: 'fa-list-check', desc: 'Pantau antrean check-in racepack', apiPermissions: ['participants:read'] },
  { key: 'page:orders', label: 'Transaksi & Keuangan', icon: 'fa-receipt', desc: 'Audit order, Midtrans & refund', apiPermissions: ['orders:read', 'orders:update', 'orders:delete', 'finance:read'] },
  { key: 'page:notif-logs', label: 'Log Notifikasi Peserta', icon: 'fa-paper-plane', desc: 'Riwayat WA & email E-Tiket', apiPermissions: ['notifications:read', 'notifications:dispatch'] },
  { key: 'page:whatsapp-web', label: 'WhatsApp Web Console', icon: 'fa-brands fa-whatsapp', desc: 'Chat langsung & CS peserta', apiPermissions: ['notifications:manage', 'whatsapp:chat', 'whatsapp:session'] },
  { key: 'page:cms', label: 'Konten Website & CMS', icon: 'fa-pen-ruler', desc: 'Teks website, sponsor & banner', apiPermissions: ['cms:manage'] },
  { key: 'page:countdown', label: 'Countdown & Status Event', icon: 'fa-stopwatch-20', desc: 'Status pendaftaran & waktu lomba', apiPermissions: ['countdown:manage'] },
  { key: 'page:notifications', label: 'Konfigurasi Notifikasi', icon: 'fa-bell', desc: 'Gateway WA, SMTP & template', apiPermissions: ['notifications:manage'] },
  { key: 'page:routes', label: 'Rute & Checkpoint', icon: 'fa-map-pin', desc: 'Pos medis, water station & jalur', apiPermissions: ['routes:read', 'routes:manage'] },
  { key: 'page:bib-settings', label: 'Pengaturan BIB & E-Tiket', icon: 'fa-id-badge', desc: 'Konfigurasi BIB, QR & petunjuk', apiPermissions: ['bib:manage'] },
  { key: 'page:admins', label: 'Kelola Admin & RBAC', icon: 'fa-shield-halved', desc: 'Akun staf & hak akses role', apiPermissions: ['admins:manage'] },
  { key: 'page:logs', label: 'Log Audit Sistem', icon: 'fa-clock-rotate-left', desc: 'Rekam jejak audit keamanan', apiPermissions: ['logs:read'] }
];

function switchRbacSubTab(tab) {
  const btnUsers = document.getElementById('btnRbacTabUsers');
  const btnRoles = document.getElementById('btnRbacTabRoles');
  const btnMatrix = document.getElementById('btnRbacTabMatrix');

  const secUsers = document.getElementById('rbacSectionUsers');
  const secRoles = document.getElementById('rbacSectionRoles');
  const secMatrix = document.getElementById('rbacSectionMatrix');

  [btnUsers, btnRoles, btnMatrix].forEach((button, index) => {
    if (button) button.setAttribute('aria-selected', String(index === ['users', 'roles', 'matrix'].indexOf(tab)));
  });
  if (btnUsers) btnUsers.className = `btn btn-sm rbac-subnav-button ${tab === 'users' ? 'btn-primary' : 'btn-outline'}`;
  if (btnRoles) btnRoles.className = `btn btn-sm rbac-subnav-button ${tab === 'roles' ? 'btn-primary' : 'btn-outline'}`;
  if (btnMatrix) btnMatrix.className = `btn btn-sm rbac-subnav-button ${tab === 'matrix' ? 'btn-primary' : 'btn-outline'}`;

  if (secUsers) secUsers.style.display = tab === 'users' ? 'block' : 'none';
  if (secRoles) secRoles.style.display = tab === 'roles' ? 'block' : 'none';
  if (secMatrix) secMatrix.style.display = tab === 'matrix' ? 'block' : 'none';
}
window.switchRbacSubTab = switchRbacSubTab;

async function loadAdminsAndRoles() {
  try {
    const [adminsRes, rolesRes] = await Promise.all([
      fetchAdmin('/admin/users-management'),
      fetchAdmin('/admin/roles')
    ]);

    if (rolesRes?.status === 'success') {
      adminState.roles = rolesRes.data || [];
      adminState.systemModules = rolesRes.modules || SYSTEM_MODULES_FALLBACK;
      adminState.rolePermissions = rolesRes.permissions || [];
      adminState.dashboardWidgets = (rolesRes.dashboardWidgets || []).filter(widget => widget.key !== 'dashboard:configured');

      const select = document.getElementById('adminUserRoleId');
      if (select) {
        select.innerHTML = adminState.roles.map(r => `
          <option value="${r.id}">${escapeHtml(r.name)} - ${escapeHtml(r.description || '')}</option>
        `).join('');
      }

      renderAdminRolesTable(adminState.roles);
      renderRoleDirectoryTable();
    } else {
      throw new Error(rolesRes?.message || 'Katalog role dan izin tidak dapat dimuat.');
    }

    if (adminsRes?.status === 'success') {
      adminState.admins = adminsRes.data || [];
      renderAdminUsersTable(adminState.admins);
    } else {
      throw new Error(adminsRes?.message || 'Daftar akun admin tidak dapat dimuat.');
    }
  } catch (err) {
    console.error('Failed to load admins and roles:', err);
    showAdminToast('error', 'Gagal Memuat Hak Akses', err.message);
  }
}

function renderAdminUsersTable(admins) {
  const tbody = document.getElementById('adminUsersTableBody');
  if (!tbody) return;

  if (admins.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 20px; color: #94A3B8;">Belum ada akun admin.</td></tr>`;
    return;
  }

  tbody.innerHTML = admins.map((a, idx) => {
    const isSuper = a.role?.name === 'SUPERADMIN';
    return `
      <tr>
        <td data-label="No">${idx + 1}</td>
        <td data-label="Nama"><strong>${escapeHtml(a.fullName)}</strong></td>
        <td data-label="Username"><code>@${escapeHtml(a.username)}</code></td>
        <td data-label="Email">${escapeHtml(a.email)}</td>
        <td data-label="Role"><span class="admin-badge-role">${escapeHtml(a.role?.name || 'ADMIN')}</span></td>
        <td data-label="Status">
          <span class="status-pill ${a.isActive ? 'success' : 'danger'}">
            ${a.isActive ? 'AKTIF' : 'NONAKTIF'}
          </span>
        </td>
        <td data-label="Dibuat"><small style="color: #64748B;">${new Date(a.createdAt).toLocaleDateString('id-ID')}</small></td>
        <td data-label="Aksi">
          <div class="table-actions">
            <button class="btn-icon edit btn-edit-admin-user" data-id="${a.id}" title="Edit Admin">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            ${!isSuper ? `
              <button class="btn-icon delete btn-delete-admin-user" data-id="${a.id}" data-name="${escapeHtml(a.fullName)}" title="Hapus Admin">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach Listeners
  document.querySelectorAll('.btn-edit-admin-user').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const found = adminState.admins.find(a => a.id === id);
      if (found) openEditAdminUserModal(found);
    });
  });

  document.querySelectorAll('.btn-delete-admin-user').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');

      const confirmed = await showConfirmDialog({
        title: 'Hapus Akun Admin?',
        message: `Apakah Anda yakin ingin menghapus akun admin "${name}"? Akun ini tidak akan dapat login lagi ke portal.`,
        confirmText: 'Ya, Hapus Akun',
        type: 'danger'
      });

      if (confirmed) {
        await deleteAdminUserApi(id);
      }
    });
  });
}

function renderAdminRolesTable(roles) {
  const tbody = document.getElementById('adminRolesTableBody');
  if (!tbody) return;

  if (roles.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: #94A3B8;">Belum ada role terdaftar.</td></tr>`;
    return;
  }

  const moduleMap = {};
  (adminState.systemModules || SYSTEM_MODULES_FALLBACK).forEach(m => {
    moduleMap[m.key] = m.label;
  });
  const widgetMap = new Map((adminState.dashboardWidgets || []).map(widget => [widget.key, widget.label]));
  const compactBadges = (items, labelFor, limit = 3) => {
    const visible = items.slice(0, limit).map(item =>
      `<span class="role-page-pill">${escapeHtml(labelFor(item))}</span>`
    ).join('');
    const remainder = items.length > limit
      ? `<span class="role-page-pill role-page-pill-more">+${items.length - limit}</span>`
      : '';
    return visible + remainder;
  };

  tbody.innerHTML = roles.map((r, idx) => {
    const isSuper = r.name === 'SUPERADMIN';
    const perms = Array.isArray(r.permissions) ? r.permissions : [];
    const hasWildcard = perms.includes('*');

    let pageBadgesHtml = '';
    if (hasWildcard) {
      pageBadgesHtml = `<span class="badge" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; font-weight: 700;"><i class="fa-solid fa-star"></i> Semua Halaman (Akses Penuh)</span>`;
    } else {
      const pages = perms.filter(p => p.startsWith('page:'));
      if (pages.length === 0) {
        pageBadgesHtml = `<span style="color: #94A3B8; font-size: 0.75rem;">(Belum ada halaman diizinkan)</span>`;
      } else {
        pageBadgesHtml = compactBadges(pages, page => moduleMap[page] || page.replace('page:', ''));
      }
    }

    const widgetKeys = perms.filter(permission => permission.startsWith('dashboard:') && permission !== 'dashboard:configured');
    const widgetsHtml = !isSuper && !perms.includes('page:dashboard')
      ? `<span class="role-table-muted">Dashboard tidak diizinkan</span>`
      : perms.includes('dashboard:configured')
      ? (widgetKeys.length
        ? compactBadges(widgetKeys, key => widgetMap.get(key) || key)
        : `<span class="role-table-muted">Tidak ada widget</span>`)
      : `<span class="role-table-muted">Default semua widget</span>`;
    const adminCount = r._count?.admins || 0;
    const isStandardRole = DEFAULT_ROLE_DIRECTORY.some(d => d.name === r.name);

    return `
      <tr>
        <td data-label="No">${idx + 1}</td>
        <td data-label="Role">
          <span class="admin-badge-role" style="font-weight: 800; font-size: 0.8rem;">${escapeHtml(r.name)}</span>
        </td>
        <td data-label="Deskripsi" style="max-width: 280px; font-size: 0.82rem; color: #475569;">
          ${escapeHtml(r.description || '-')}
        </td>
        <td data-label="Halaman" style="max-width: 320px;">
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${pageBadgesHtml}
          </div>
        </td>
        <td data-label="Widget dashboard" style="max-width: 280px;">
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${widgetsHtml}
          </div>
        </td>
        <td data-label="Petugas" style="text-align: center;">
          <span class="badge" style="background: #F8FAFC; color: #0F172A; border: 1px solid #E2E8F0; font-weight: 700; padding: 4px 10px;">
            <i class="fa-solid fa-user"></i> ${adminCount}
          </span>
        </td>
        <td data-label="Aksi">
          <div class="table-actions">
            <button class="btn btn-outline btn-sm btn-edit-role" data-id="${r.id}" title="Atur Hak Akses Halaman">
              <i class="fa-solid fa-sliders"></i> Atur Akses
            </button>
            ${!isStandardRole && adminCount === 0 ? `
              <button class="btn-icon delete btn-delete-role" data-id="${r.id}" data-name="${escapeHtml(r.name)}" title="Hapus Role">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Attach Listeners
  document.querySelectorAll('.btn-edit-role').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const found = adminState.roles.find(r => r.id === id);
      if (found) openEditRoleModal(found);
    });
  });

  document.querySelectorAll('.btn-delete-role').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');

      const confirmed = await showConfirmDialog({
        title: 'Hapus Role?',
        message: `Apakah Anda yakin ingin menghapus role "${name}"? Tindakan ini tidak dapat dibatalkan.`,
        confirmText: 'Ya, Hapus Role',
        type: 'danger'
      });

      if (confirmed) {
        await deleteRoleApi(id);
      }
    });
  });
}

function renderRoleDirectoryTable() {
  const tbody = document.getElementById('roleDirectoryTableBody');
  if (!tbody) return;

  tbody.innerHTML = DEFAULT_ROLE_DIRECTORY.map((item, idx) => {
    const pagesPills = item.pages.map(p => `<span class="role-page-pill">${escapeHtml(p)}</span>`).join('');
    return `
      <tr>
        <td data-label="Role">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span class="admin-badge-role" style="width: fit-content; font-size: 0.8rem; font-weight: 800;">${item.name}</span>
            <small style="color: #64748B; font-size: 0.72rem;">Divisi #${idx + 1}</small>
          </div>
        </td>
        <td data-label="Tanggung jawab" style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
          <strong>${escapeHtml(item.desc)}</strong>
          <div style="font-size: 0.76rem; color: #64748B; margin-top: 4px;">
            <i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> ${escapeHtml(item.reason)}
          </div>
        </td>
        <td data-label="Cakupan umum">
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${pagesPills}
          </div>
        </td>
        <td data-label="Otoritas">
          <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; background: ${item.authorityColor}15; color: ${item.authorityColor}; border: 1px solid ${item.authorityColor}40;">
            ${escapeHtml(item.authority)}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderRoleModuleCheckboxes(selectedPages = [], isSuperadmin = false) {
  const container = document.getElementById('roleModulesContainer');
  if (!container) return;

  const modules = (adminState.systemModules || SYSTEM_MODULES_FALLBACK)
    .filter(module => isSuperadmin || module.key !== 'page:admins');

  container.innerHTML = modules.map(m => {
    const isChecked = isSuperadmin || selectedPages.includes(m.key);
    const isDisabled = isSuperadmin;

    return `
      <label class="role-module-card ${isChecked ? 'checked' : ''}" id="card-${m.key.replace(':', '_')}">
        <input type="checkbox" name="role_page" value="${m.key}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''} onchange="toggleModuleCardStyle(this)">
        <div class="module-icon">
          <i class="fa-solid ${m.icon}"></i>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 0.84rem; font-weight: 700; color: #0F172A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${escapeHtml(m.label)}
          </div>
          <div style="font-size: 0.72rem; color: #64748B; line-height: 1.3; margin-top: 2px;">
            ${escapeHtml(m.desc || '')}
          </div>
        </div>
      </label>
    `;
  }).join('');
}

function renderRoleApiPermissions(selectedPermissions = [], isSuperadmin = false) {
  const container = document.getElementById('roleApiPermissionsContainer');
  if (!container) return;
  const permissions = (adminState.rolePermissions || []).filter(item =>
    item.key !== '*' && item.key !== 'admins:manage' && !item.key.startsWith('page:') && !item.key.startsWith('dashboard:')
  );
  container.innerHTML = permissions.map(item => {
    const checked = selectedPermissions.includes(item.key);
    return `
      <label class="role-permission-option ${checked ? 'checked' : ''}">
        <input type="checkbox" name="role_api" value="${item.key}" ${checked ? 'checked' : ''} ${isSuperadmin ? 'disabled' : ''} onchange="toggleRolePermissionStyle(this)">
        <span>${escapeHtml(item.label)}</span>
      </label>
    `;
  }).join('');
}

function renderRoleDashboardWidgets(selectedWidgets = [], isConfigured = false) {
  const container = document.getElementById('roleDashboardWidgetsContainer');
  if (!container) return;
  container.innerHTML = (adminState.dashboardWidgets || []).map(widget => {
    const checked = isConfigured ? selectedWidgets.includes(widget.key) : true;
    return `
      <label class="role-widget-card ${checked ? 'checked' : ''}">
        <input type="checkbox" name="role_widget" value="${widget.key}" ${checked ? 'checked' : ''} onchange="toggleRoleOptionStyle(this)">
        <span class="role-widget-card-copy">
          <strong>${escapeHtml(widget.label)}</strong>
          <small>${escapeHtml(widget.desc || '')}</small>
        </span>
      </label>
    `;
  }).join('');
}

window.toggleModuleCardStyle = function(cb) {
  const card = cb.closest('.role-module-card');
  if (card) {
    if (cb.checked) {
      card.classList.add('checked');
    } else {
      card.classList.remove('checked');
    }
  }
  const module = (adminState.systemModules || SYSTEM_MODULES_FALLBACK).find(item => item.key === cb.value);
  if (module) {
    (module.apiPermissions || []).forEach(permission => {
      const apiCheckbox = document.querySelector(`input[name="role_api"][value="${permission}"]`);
      const selectedByAnotherPage = Array.from(document.querySelectorAll('input[name="role_page"]:checked'))
        .some(pageCheckbox => pageCheckbox !== cb && (adminState.systemModules || SYSTEM_MODULES_FALLBACK)
          .find(item => item.key === pageCheckbox.value)?.apiPermissions?.includes(permission));
      const shouldCheck = cb.checked || selectedByAnotherPage;
      if (apiCheckbox && !apiCheckbox.disabled && (cb.checked || !selectedByAnotherPage)) {
        apiCheckbox.checked = shouldCheck;
        apiCheckbox.closest('.role-permission-option')?.classList.toggle('checked', shouldCheck);
      }
    });
  }
};

window.toggleRoleOptionStyle = function(cb) {
  cb.closest('.role-widget-card')?.classList.toggle('checked', cb.checked);
};

window.toggleRolePermissionStyle = function(cb) {
  cb.closest('.role-permission-option')?.classList.toggle('checked', cb.checked);
};

function openCreateRoleModal() {
  document.getElementById('roleFormId').value = '';
  document.getElementById('modalRoleTitle').innerHTML = '<i class="fa-solid fa-plus-circle" style="color: var(--color-primary);"></i> Tambah Role Akses Baru';
  const nameInput = document.getElementById('roleFormName');
  nameInput.value = '';
  nameInput.readOnly = false;
  document.getElementById('roleFormDesc').value = '';

  renderRoleModuleCheckboxes(['page:dashboard'], false);
  renderRoleApiPermissions([], false);
  renderRoleDashboardWidgets((adminState.dashboardWidgets || []).map(widget => widget.key), true);
  document.getElementById('modalRoleBackdrop')?.classList.add('open');
}

function openEditRoleModal(role) {
  document.getElementById('roleFormId').value = role.id;
  document.getElementById('modalRoleTitle').innerHTML = `<i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Atur Hak Akses Role: ${escapeHtml(role.name)}`;
  
  const nameInput = document.getElementById('roleFormName');
  nameInput.value = role.name;
  const isSuper = role.name === 'SUPERADMIN';
  nameInput.readOnly = isSuper;

  document.getElementById('roleFormDesc').value = role.description || '';

  const perms = Array.isArray(role.permissions) ? role.permissions : [];
  let activePages = [];
  if (isSuper) {
    activePages = (adminState.systemModules || SYSTEM_MODULES_FALLBACK).map(m => m.key);
  } else {
    activePages = perms.filter(p => p.startsWith('page:'));
  }

  renderRoleModuleCheckboxes(activePages, isSuper);
  renderRoleApiPermissions(isSuper ? [] : perms.filter(permission =>
    !permission.startsWith('page:') && !permission.startsWith('dashboard:') && permission !== '*'
  ), isSuper);
  renderRoleDashboardWidgets(
    perms.filter(permission => permission.startsWith('dashboard:') && permission !== 'dashboard:configured'),
    perms.includes('dashboard:configured')
  );
  document.getElementById('modalRoleBackdrop')?.classList.add('open');
}

async function handleRoleSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('roleFormId').value;
  const name = document.getElementById('roleFormName').value.trim().toUpperCase();
  const description = document.getElementById('roleFormDesc').value.trim();

  const isSuper = name === 'SUPERADMIN';
  let permissions = [];

  if (isSuper) {
    const selectedWidgets = Array.from(document.querySelectorAll('input[name="role_widget"]:checked')).map(cb => cb.value);
    permissions = ['*', 'dashboard:configured', ...selectedWidgets];
  } else {
    const checkedBoxes = Array.from(document.querySelectorAll('input[name="role_page"]:checked'));
    const selectedPages = checkedBoxes.map(cb => cb.value);

    if (selectedPages.length === 0) {
      showAdminToast('warning', 'Peringatan', 'Pilih minimal 1 halaman yang diizinkan untuk role ini.');
      return;
    }

    const apiPermissions = Array.from(document.querySelectorAll('input[name="role_api"]:checked')).map(cb => cb.value);
    const selectedWidgets = Array.from(document.querySelectorAll('input[name="role_widget"]:checked')).map(cb => cb.value);
    permissions = [...selectedPages, ...apiPermissions];
    if (selectedPages.includes('page:dashboard')) {
      permissions.push('dashboard:configured', ...selectedWidgets);
    }
  }

  const payload = { name, description, permissions };

  try {
    let res;
    if (id) {
      res = await fetchAdmin(`/admin/roles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetchAdmin('/admin/roles', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    }

    if (res.status === 'success') {
      showAdminToast('success', 'Berhasil', id ? `Hak akses role '${name}' berhasil diperbarui ke database!` : `Role '${name}' berhasil dibuat!`);
      document.getElementById('modalRoleBackdrop')?.classList.remove('open');
      
      // Jika role yang diperbarui adalah role user yang sedang login, update profile lokal & refresh RBAC UI
      if (adminState.profile?.role?.id === id || adminState.profile?.role?.name === name) {
        adminState.profile.role.permissions = permissions;
        applyRbacUi(adminState.profile);
      }

      await loadAdminsAndRoles();
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Gagal menyimpan role.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function deleteRoleApi(id) {
  try {
    const res = await fetchAdmin(`/admin/roles/${id}`, { method: 'DELETE' });
    if (res.status === 'success') {
      showAdminToast('success', 'Terhapus', 'Role berhasil dihapus!');
      loadAdminsAndRoles();
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function handleResetDefaultRoles() {
  const confirmed = await showConfirmDialog({
    title: 'Reset ke 12 Role Default?',
    message: 'Tindakan ini akan mengembalikan seluruh izin hak akses ke-12 role resmi penyelenggara event ke standar sistem default di database.',
    confirmText: 'Ya, Reset Role Default',
    type: 'warning'
  });

  if (!confirmed) return;

  try {
    const res = await fetchAdmin('/admin/roles/reset-defaults', { method: 'POST' });
    if (res.status === 'success') {
      showAdminToast('success', 'Role Tersinkron', res.message);
      loadAdminsAndRoles();
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

function openCreateAdminUserModal() {
  document.getElementById('adminUserFormId').value = '';
  document.getElementById('modalAdminUserTitle').innerHTML = '<i class="fa-solid fa-user-shield" style="color: var(--color-primary);"></i> Tambah Akun Admin Baru';
  document.getElementById('adminUserFullName').value = '';
  document.getElementById('adminUserUsername').value = '';
  document.getElementById('adminUserEmail').value = '';
  document.getElementById('adminUserPassword').value = '';
  document.getElementById('adminUserPassword').required = true;
  document.getElementById('adminPasswordReq').style.display = 'inline';
  document.getElementById('adminPasswordHint').textContent = 'Wajib diisi untuk akun baru (minimal 8 karakter).';

  document.getElementById('modalAdminUserBackdrop')?.classList.add('open');
}

function openEditAdminUserModal(admin) {
  document.getElementById('adminUserFormId').value = admin.id;
  document.getElementById('modalAdminUserTitle').innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: var(--color-primary);"></i> Edit Akun Admin: ${escapeHtml(admin.fullName)}`;
  document.getElementById('adminUserFullName').value = admin.fullName;
  document.getElementById('adminUserUsername').value = admin.username;
  document.getElementById('adminUserEmail').value = admin.email;
  document.getElementById('adminUserRoleId').value = admin.roleId;
  document.getElementById('adminUserPassword').value = '';
  document.getElementById('adminUserPassword').required = false;
  document.getElementById('adminPasswordReq').style.display = 'none';
  document.getElementById('adminPasswordHint').textContent = 'Kosongkan jika tidak ingin mengubah password akun ini.';

  document.getElementById('modalAdminUserBackdrop')?.classList.add('open');
}

async function handleAdminUserSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('adminUserFormId').value;
  const fullName = document.getElementById('adminUserFullName').value.trim();
  const username = document.getElementById('adminUserUsername').value.trim();
  const email = document.getElementById('adminUserEmail').value.trim();
  const roleId = document.getElementById('adminUserRoleId').value;
  const password = document.getElementById('adminUserPassword').value;

  const payload = { fullName, username, email, roleId, isActive: true };
  if (password) payload.password = password;

  try {
    let res;
    if (id) {
      res = await fetchAdmin(`/admin/users-management/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetchAdmin('/admin/users-management', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    }

    if (res.status === 'success') {
      showAdminToast('success', 'Berhasil', id ? 'Data akun admin diperbarui!' : 'Akun admin baru berhasil dibuat!');
      document.getElementById('modalAdminUserBackdrop')?.classList.remove('open');
      loadAdminsAndRoles();
    } else {
      showAdminToast('error', 'Gagal', res.message || 'Validasi admin gagal');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}

async function deleteAdminUserApi(id) {
  try {
    const res = await fetchAdmin(`/admin/users-management/${id}`, {
      method: 'DELETE'
    });

    if (res.status === 'success') {
      showAdminToast('success', 'Terhapus', 'Akun admin berhasil dihapus!');
      loadAdminsAndRoles();
    } else {
      showAdminToast('error', 'Gagal', res.message);
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  }
}


window.switchRbacSubTab = switchRbacSubTab;

export {
  switchRbacSubTab,
  loadAdminsAndRoles,
  renderAdminUsersTable,
  renderAdminRolesTable,
  renderRoleDirectoryTable,
  renderRoleModuleCheckboxes,
  openCreateRoleModal,
  openEditRoleModal,
  handleRoleSubmit,
  deleteRoleApi,
  handleResetDefaultRoles,
  openCreateAdminUserModal,
  openEditAdminUserModal,
  handleAdminUserSubmit,
  deleteAdminUserApi,
  DEFAULT_ROLE_DIRECTORY,
  SYSTEM_MODULES_FALLBACK
};
