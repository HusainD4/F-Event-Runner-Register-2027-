import { fetchAdmin } from '../core/api.js';
import { showAdminToast } from '../core/utils.js';

let statsItems = [];
let facilitiesItems = [];
let legalItems = [];

const DEFAULT_STATS = [
  { type: 'AUTO', autoKey: 'TOTAL_PARTICIPANTS', val: '2,500+', unit: 'Pelari Terdaftar', desc: 'Antusiasme komunitas nasional' },
  { type: 'AUTO', autoKey: 'TOTAL_CATEGORIES', val: '2', unit: 'Kategori Utama', desc: 'Half Marathon 10K & Fun Run 5K' },
  { type: 'CUSTOM', autoKey: 'STERIL_ROUTE', val: '100%', unit: 'Steril & Aman', desc: 'Pengawalan Dishub & Polresta' },
  { type: 'CUSTOM', autoKey: 'TOTAL_PRIZE', val: 'Rp 75Jt', unit: 'Total Hadiah & Doorprize', desc: 'Podium juara & ratusan hadiah menarik' }
];

const DEFAULT_FACILITIES = [
  { icon: 'fa-shirt', title: 'Jersey Running Dry-Fit', desc: 'Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh.' },
  { icon: 'fa-microchip', title: 'Nomor Dada (BIB) & Timing Chip', desc: 'Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online.' },
  { icon: 'fa-medal', title: 'Medali Finisher Logam Cor', desc: 'Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT.' },
  { icon: 'fa-bottle-water', title: 'Water & Isotonic Station', desc: 'Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar.' },
  { icon: 'fa-truck-medical', title: 'Tim Medis & Ambulans Mobile', desc: 'Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute.' },
  { icon: 'fa-utensils', title: 'Refreshment & Finisher Feast', desc: 'Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar.' }
];

const DEFAULT_LEGAL = [
  { icon: 'fa-certificate', title: 'Rekomendasi Resmi PB PASI', desc: 'Tersertifikasi standar teknis rute dan aturan perlombaan atletik resmi nasional.' },
  { icon: 'fa-road-barrier', title: 'Izin Kepolisian & Dishub', desc: 'Pengamanan jalur dan rekayasa lalu lintas penuh demi keselamatan pelari.' },
  { icon: 'fa-shield-heart', title: 'Asuransi Medis Peserta', desc: 'Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri selama perlombaan berlangsung.' },
  { icon: 'fa-user-lock', title: 'Perlindungan Data Pribadi (UU PDP)', desc: 'Enkripsi data pendaftaran dan kepatuhan penuh undang-undang perlindungan data konsumen.' }
];
const CMS_VISIBILITY_IDS = {
  hero: 'cmsShowHero',
  stats: 'cmsShowStats',
  route: 'cmsShowRoute',
  facilities: 'cmsShowFacilities',
  tickets: 'cmsShowTickets',
  legal: 'cmsShowLegal',
  footer: 'cmsShowFooter'
};

function escapeAttr(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderStatsRepeater() {
  const container = document.getElementById('cmsStatsItemsContainer');
  if (!container) return;

  if (statsItems.length === 0) {
    container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada kartu statistik. Klik "Tambah Kartu Statistik" di atas.</div>';
    return;
  }

  container.innerHTML = statsItems.map((item, idx) => `
    <div style="padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-weight: 700; color: var(--color-primary); font-size: 0.88rem;">
          <i class="fa-solid fa-chart-simple"></i> Kartu Statistik #${idx + 1}
        </span>
        <button type="button" class="btn btn-outline btn-sm btn-delete-stat" data-idx="${idx}" style="color: #ef4444; border-color: rgba(239,68,68,0.3); padding: 4px 8px;" title="Hapus kartu ini">
          <i class="fa-solid fa-trash"></i>
        </button>
        <label style="font-size:0.76rem;"><input type="checkbox" class="stat-input-visible" data-idx="${idx}" ${item.visible !== false ? 'checked' : ''}> Tampilkan</label>
      </div>

      <div class="form-group" style="margin-bottom: 10px;">
        <label class="form-label" style="font-size: 0.78rem;">Sumber Data</label>
        <select class="form-input stat-input-type" data-idx="${idx}" style="padding: 6px 10px; font-size: 0.85rem;">
          <option value="CUSTOM" ${item.type === 'CUSTOM' ? 'selected' : ''}>Manual / Kustom Sendiri</option>
          <option value="AUTO_PARTICIPANTS" ${item.autoKey === 'TOTAL_PARTICIPANTS' ? 'selected' : ''}>Otomatis: Total Peserta Terdaftar</option>
          <option value="AUTO_CATEGORIES" ${item.autoKey === 'TOTAL_CATEGORIES' ? 'selected' : ''}>Otomatis: Jumlah Kategori Lomba</option>
          <option value="AUTO_CAPACITY" ${item.autoKey === 'TOTAL_CAPACITY' ? 'selected' : ''}>Otomatis: Total Kuota</option>
          <option value="AUTO_AVAILABLE" ${item.autoKey === 'AVAILABLE_SLOTS' ? 'selected' : ''}>Otomatis: Sisa Kuota</option>
        </select>
      </div>

      <div class="form-group" style="margin-bottom: 10px;">
        <label class="form-label" style="font-size: 0.78rem;">Angka / Nilai Highlight ${item.type === 'AUTO' ? '(otomatis)' : '(manual)'}</label>
        <input type="text" class="form-input stat-input-val" data-idx="${idx}" value="${escapeAttr(item.val || '')}" placeholder="2,500+ / 100% / Rp 75Jt" ${item.type === 'AUTO' ? 'disabled' : ''} style="padding: 6px 10px; font-size: 0.88rem; font-weight: 700;">
      </div>

      <div class="form-group" style="margin-bottom: 10px;">
        <label class="form-label" style="font-size: 0.78rem;">Label / Satuan</label>
        <input type="text" class="form-input stat-input-unit" data-idx="${idx}" value="${escapeAttr(item.unit || '')}" placeholder="Pelari Terdaftar / Steril & Aman" style="padding: 6px 10px; font-size: 0.85rem;">
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 0.78rem;">Keterangan Subtitle</label>
        <input type="text" class="form-input stat-input-desc" data-idx="${idx}" value="${escapeAttr(item.desc || '')}" placeholder="Keterangan singkat pendukung" style="padding: 6px 10px; font-size: 0.82rem;">
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-delete-stat').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-idx'));
      statsItems.splice(idx, 1);
      renderStatsRepeater();
    });
  });

  container.querySelectorAll('.stat-input-type').forEach(sel => {
    sel.addEventListener('change', () => {
      const idx = Number(sel.getAttribute('data-idx'));
      const val = sel.value;
      if (val === 'AUTO_PARTICIPANTS') {
        statsItems[idx].type = 'AUTO';
        statsItems[idx].autoKey = 'TOTAL_PARTICIPANTS';
        statsItems[idx].unit = 'Pelari Terdaftar';
        statsItems[idx].desc = 'Total pendaftar resmi real-time';
      } else if (val === 'AUTO_CATEGORIES') {
        statsItems[idx].type = 'AUTO';
        statsItems[idx].autoKey = 'TOTAL_CATEGORIES';
        statsItems[idx].unit = 'Kategori Lomba';
        statsItems[idx].desc = 'Jumlah kategori lomba yang tersedia';
      } else if (val === 'AUTO_CAPACITY') {
        statsItems[idx].type = 'AUTO';
        statsItems[idx].autoKey = 'TOTAL_CAPACITY';
        statsItems[idx].unit = 'Total Kuota';
        statsItems[idx].desc = 'Kapasitas seluruh kategori lomba';
      } else if (val === 'AUTO_AVAILABLE') {
        statsItems[idx].type = 'AUTO';
        statsItems[idx].autoKey = 'AVAILABLE_SLOTS';
        statsItems[idx].unit = 'Slot Tersedia';
        statsItems[idx].desc = 'Sisa kuota seluruh kategori lomba';
      } else {
        statsItems[idx].type = 'CUSTOM';
        statsItems[idx].autoKey = '';
      }
      renderStatsRepeater();
    });
  });

  container.querySelectorAll('.stat-input-val').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      statsItems[idx].val = input.value;
    });
  });

  container.querySelectorAll('.stat-input-unit').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      statsItems[idx].unit = input.value;
    });
  });

  container.querySelectorAll('.stat-input-desc').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      statsItems[idx].desc = input.value;
    });
  });

  container.querySelectorAll('.stat-input-visible').forEach(input => {
    input.addEventListener('change', () => {
      statsItems[Number(input.getAttribute('data-idx'))].visible = input.checked;
    });
  });
}

function renderFacilitiesRepeater() {
  const container = document.getElementById('cmsFacilitiesItemsContainer');
  if (!container) return;

  if (facilitiesItems.length === 0) {
    container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada kartu fasilitas. Klik "Tambah Kartu Fasilitas" di atas.</div>';
    return;
  }

  container.innerHTML = facilitiesItems.map((item, idx) => `
    <div style="padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="font-weight: 700; color: var(--color-primary); font-size: 0.88rem;">
          <i class="fa-solid ${item.icon || 'fa-gift'}"></i> Fasilitas #${idx + 1}
        </span>
        <button type="button" class="btn btn-outline btn-sm btn-delete-facility" data-idx="${idx}" style="color: #ef4444; border-color: rgba(239,68,68,0.3); padding: 4px 8px;" title="Hapus kartu ini">
          <i class="fa-solid fa-trash"></i>
        </button>
        <label style="font-size:0.76rem;"><input type="checkbox" class="fac-input-visible" data-idx="${idx}" ${item.visible !== false ? 'checked' : ''}> Tampilkan</label>
      </div>

      <div class="form-group" style="margin-bottom: 8px;">
        <label class="form-label" style="font-size: 0.78rem;">Icon FontAwesome Class</label>
        <input type="text" class="form-input fac-input-icon" data-idx="${idx}" value="${escapeAttr(item.icon || 'fa-gift')}" placeholder="fa-shirt / fa-medal / fa-bottle-water" style="padding: 6px 10px; font-size: 0.85rem;">
      </div>

      <div class="form-group" style="margin-bottom: 8px;">
        <label class="form-label" style="font-size: 0.78rem;">Judul Fasilitas</label>
        <input type="text" class="form-input fac-input-title" data-idx="${idx}" value="${escapeAttr(item.title || '')}" placeholder="Nama fasilitas atau racepack" style="padding: 6px 10px; font-size: 0.88rem; font-weight: 700;">
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 0.78rem;">Deskripsi Fasilitas</label>
        <textarea class="form-input fac-input-desc" data-idx="${idx}" rows="2" placeholder="Uraian fasilitas bagi peserta" style="padding: 6px 10px; font-size: 0.82rem;">${escapeAttr(item.desc || '')}</textarea>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-delete-facility').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-idx'));
      facilitiesItems.splice(idx, 1);
      renderFacilitiesRepeater();
    });
  });

  container.querySelectorAll('.fac-input-icon').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      facilitiesItems[idx].icon = input.value;
    });
  });

  container.querySelectorAll('.fac-input-title').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      facilitiesItems[idx].title = input.value;
    });
  });

  container.querySelectorAll('.fac-input-desc').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      facilitiesItems[idx].desc = input.value;
    });
  });

  container.querySelectorAll('.fac-input-visible').forEach(input => {
    input.addEventListener('change', () => {
      facilitiesItems[Number(input.getAttribute('data-idx'))].visible = input.checked;
    });
  });
}

function renderLegalRepeater() {
  const container = document.getElementById('cmsLegalItemsContainer');
  if (!container) return;

  if (legalItems.length === 0) {
    container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada butir legalitas. Klik "Tambah Poin Legalitas" di atas.</div>';
    return;
  }

  container.innerHTML = legalItems.map((item, idx) => `
    <div style="padding: 16px; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span style="font-weight: 700; color: var(--color-primary); font-size: 0.88rem;">
          <i class="fa-solid ${item.icon || 'fa-certificate'}"></i> Poin Legalitas #${idx + 1}
        </span>
        <button type="button" class="btn btn-outline btn-sm btn-delete-legal" data-idx="${idx}" style="color: #ef4444; border-color: rgba(239,68,68,0.3); padding: 4px 8px;" title="Hapus poin ini">
          <i class="fa-solid fa-trash"></i>
        </button>
        <label style="font-size:0.76rem;"><input type="checkbox" class="legal-input-visible" data-idx="${idx}" ${item.visible !== false ? 'checked' : ''}> Tampilkan</label>
      </div>

      <div class="form-group" style="margin-bottom: 8px;">
        <label class="form-label" style="font-size: 0.78rem;">Icon FontAwesome Class</label>
        <input type="text" class="form-input legal-input-icon" data-idx="${idx}" value="${escapeAttr(item.icon || 'fa-certificate')}" placeholder="fa-certificate / fa-user-lock" style="padding: 6px 10px; font-size: 0.85rem;">
      </div>

      <div class="form-group" style="margin-bottom: 8px;">
        <label class="form-label" style="font-size: 0.78rem;">Judul Legalitas</label>
        <input type="text" class="form-input legal-input-title" data-idx="${idx}" value="${escapeAttr(item.title || '')}" placeholder="Contoh: Rekomendasi Resmi PB PASI" style="padding: 6px 10px; font-size: 0.88rem; font-weight: 700;">
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" style="font-size: 0.78rem;">Deskripsi Legalitas</label>
        <textarea class="form-input legal-input-desc" data-idx="${idx}" rows="2" placeholder="Uraian kepatuhan hukum atau perizinan" style="padding: 6px 10px; font-size: 0.82rem;">${escapeAttr(item.desc || '')}</textarea>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-delete-legal').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-idx'));
      legalItems.splice(idx, 1);
      renderLegalRepeater();
    });
  });

  container.querySelectorAll('.legal-input-icon').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      legalItems[idx].icon = input.value;
    });
  });

  container.querySelectorAll('.legal-input-title').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      legalItems[idx].title = input.value;
    });
  });

  container.querySelectorAll('.legal-input-desc').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.getAttribute('data-idx'));
      legalItems[idx].desc = input.value;
    });

    container.querySelectorAll('.legal-input-visible').forEach(input => {
      input.addEventListener('change', () => {
        legalItems[Number(input.getAttribute('data-idx'))].visible = input.checked;
      });
    });
  });
}

function initCmsButtons() {
  const statBtn = document.getElementById('btnAddCmsStatItem');
  if (statBtn) {
    statBtn.onclick = () => {
      statsItems.push({ type: 'CUSTOM', autoKey: '', val: '100+', unit: 'Statistik Baru', desc: 'Keterangan statistik' });
      renderStatsRepeater();
    };
  }

  const facBtn = document.getElementById('btnAddCmsFacilityItem');
  if (facBtn) {
    facBtn.onclick = () => {
      facilitiesItems.push({ icon: 'fa-gift', title: 'Fasilitas Baru', desc: 'Deskripsi fasilitas pelari...' });
      renderFacilitiesRepeater();
    };
  }

  const legalBtn = document.getElementById('btnAddCmsLegalItem');
  if (legalBtn) {
    legalBtn.onclick = () => {
      legalItems.push({ icon: 'fa-certificate', title: 'Poin Legalitas Baru', desc: 'Deskripsi perizinan atau kepatuhan hukum...' });
      renderLegalRepeater();
    };
  }
}

async function loadCmsSettings() {
  try {
    const res = await fetchAdmin('/admin/settings/website');
    if (res.status === 'success' && res.data) {
      const s = res.data;
      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val !== undefined && val !== null ? val : '';
      };

      setVal('cmsSiteTitle', s.site_title);
      setVal('cmsSiteTagline', s.site_tagline);
      setVal('cmsHeroBadge', s.hero_badge);
      setVal('cmsHeroTitle', s.hero_title);
      setVal('cmsHeroSubtitle', s.hero_subtitle);
      setVal('cmsHeroBgImage', s.hero_bg_image);

      // Parse Dynamic Stats Items
      if (s.stats_banner_items) {
        try {
          statsItems = JSON.parse(s.stats_banner_items);
        } catch {
          statsItems = [...DEFAULT_STATS];
        }
      } else {
        statsItems = [
          { type: 'AUTO', autoKey: 'TOTAL_PARTICIPANTS', val: s.stat_1_val || '2,500+', unit: s.stat_1_unit || 'Pelari Terdaftar', desc: s.stat_1_desc || 'Antusiasme komunitas nasional' },
          { type: 'AUTO', autoKey: 'TOTAL_CATEGORIES', val: s.stat_2_val || '2', unit: s.stat_2_unit || 'Kategori Utama', desc: s.stat_2_desc || 'Half Marathon 10K & Fun Run 5K' },
          { type: 'CUSTOM', autoKey: 'STERIL_ROUTE', val: s.stat_3_val || '100%', unit: s.stat_3_unit || 'Steril & Aman', desc: s.stat_3_desc || 'Pengawalan Dishub & Polresta' },
          { type: 'CUSTOM', autoKey: 'TOTAL_PRIZE', val: s.stat_4_val || 'Rp 75Jt', unit: s.stat_4_unit || 'Total Hadiah & Doorprize', desc: s.stat_4_desc || 'Podium juara & ratusan hadiah menarik' }
        ];
      }
      renderStatsRepeater();

      // Rute & Specs
      setVal('cmsRouteTitle', s.route_title);
      setVal('cmsRouteDesc', s.route_desc);
      setVal('cmsRouteMapImage', s.route_map_image);
      setVal('cmsGmapsUrl', s.route_gmaps_url);
      setVal('cmsRouteGpxUrl', s.route_gpx_url);
      let visibility = {};
      try {
        visibility = s.cms_visibility ? JSON.parse(s.cms_visibility) : {};
      } catch (error) {
        console.warn('Pengaturan visibilitas CMS tidak valid:', error);
      }
      Object.entries(CMS_VISIBILITY_IDS).forEach(([key, id]) => {
        const toggle = document.getElementById(id);
        if (toggle) toggle.checked = visibility[key] !== false;
      });

      // Fasilitas
      setVal('cmsFacilitiesTitle', s.facilities_title);
      setVal('cmsFacilitiesDesc', s.facilities_desc);
      setVal('cmsFacilitiesImage', s.facilities_image);
      if (s.facilities_items) {
        try {
          facilitiesItems = JSON.parse(s.facilities_items);
        } catch {
          facilitiesItems = [...DEFAULT_FACILITIES];
        }
      } else {
        facilitiesItems = [...DEFAULT_FACILITIES];
      }
      renderFacilitiesRepeater();

      // Tiket
      setVal('cmsTicketsTitle', s.tickets_title);
      setVal('cmsTicketsDesc', s.tickets_desc);
      setVal('cmsMedalImage', s.medal_image);

      // Legal & Perizinan
      setVal('cmsLegalTitle', s.legal_title);
      setVal('cmsLegalDesc', s.legal_desc);
      if (s.legal_items) {
        try {
          legalItems = JSON.parse(s.legal_items);
        } catch {
          legalItems = [...DEFAULT_LEGAL];
        }
      } else {
        legalItems = [
          { icon: 'fa-certificate', title: s.legal_item_1_title || 'Rekomendasi Resmi PB PASI', desc: s.legal_item_1_desc || 'Tersertifikasi standar teknis rute dan aturan perlombaan atletik resmi nasional.' },
          { icon: 'fa-road-barrier', title: s.legal_item_2_title || 'Izin Kepolisian & Dishub', desc: s.legal_item_2_desc || 'Pengamanan jalur dan rekayasa lalu lintas penuh demi keselamatan pelari.' },
          { icon: 'fa-shield-heart', title: s.legal_item_3_title || 'Asuransi Medis Peserta', desc: s.legal_item_3_desc || 'Seluruh pelari terdaftar dilindungi asuransi kecelakaan diri selama perlombaan berlangsung.' },
          { icon: 'fa-user-lock', title: s.legal_item_4_title || 'Perlindungan Data Pribadi (UU PDP)', desc: s.legal_item_4_desc || 'Enkripsi data pendaftaran dan kepatuhan penuh perlindungan data konsumen.' }
        ];
      }
      renderLegalRepeater();

      // Kontak & Footer
      setVal('cmsContactEmail', s.contact_email);
      setVal('cmsContactPhone', s.contact_phone);
      setVal('cmsContactAddress', s.contact_address);
      setVal('cmsFooterCopyright', s.footer_copyright);

      initCmsButtons();
    }
  } catch (err) {
    console.warn('Gagal memuat pengaturan website CMS:', err);
  }
}

async function handleCmsSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSaveCmsSubmit');
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Menyimpan Pengaturan...';
  }

  const getVal = (id) => document.getElementById(id)?.value?.trim() || '';

  const payload = {
    site_title: getVal('cmsSiteTitle'),
    site_tagline: getVal('cmsSiteTagline'),
    hero_badge: getVal('cmsHeroBadge'),
    hero_title: getVal('cmsHeroTitle'),
    hero_subtitle: getVal('cmsHeroSubtitle'),
    hero_bg_image: getVal('cmsHeroBgImage'),

    // Dynamic Lists (JSON)
    stats_banner_items: JSON.stringify(statsItems),
    facilities_items: JSON.stringify(facilitiesItems),
    legal_items: JSON.stringify(legalItems),
    cms_visibility: JSON.stringify(Object.fromEntries(
      Object.entries(CMS_VISIBILITY_IDS).map(([key, id]) => [key, document.getElementById(id)?.checked !== false])
    )),

    // Backward Compatibility Values
    stat_1_val: statsItems[0]?.val || '',
    stat_1_unit: statsItems[0]?.unit || '',
    stat_1_desc: statsItems[0]?.desc || '',
    stat_2_val: statsItems[1]?.val || '',
    stat_2_unit: statsItems[1]?.unit || '',
    stat_2_desc: statsItems[1]?.desc || '',
    stat_3_val: statsItems[2]?.val || '',
    stat_3_unit: statsItems[2]?.unit || '',
    stat_3_desc: statsItems[2]?.desc || '',
    stat_4_val: statsItems[3]?.val || '',
    stat_4_unit: statsItems[3]?.unit || '',
    stat_4_desc: statsItems[3]?.desc || '',

    // Rute & Specs
    route_title: getVal('cmsRouteTitle'),
    route_desc: getVal('cmsRouteDesc'),
    route_map_image: getVal('cmsRouteMapImage'),
    route_gmaps_url: getVal('cmsGmapsUrl'),
    route_gpx_url: getVal('cmsRouteGpxUrl'),

    // Fasilitas & Tiket
    facilities_title: getVal('cmsFacilitiesTitle'),
    facilities_desc: getVal('cmsFacilitiesDesc'),
    facilities_image: getVal('cmsFacilitiesImage'),
    tickets_title: getVal('cmsTicketsTitle'),
    tickets_desc: getVal('cmsTicketsDesc'),
    medal_image: getVal('cmsMedalImage'),

    // Legal
    legal_title: getVal('cmsLegalTitle'),
    legal_desc: getVal('cmsLegalDesc'),
    legal_item_1_title: legalItems[0]?.title || '',
    legal_item_1_desc: legalItems[0]?.desc || '',
    legal_item_2_title: legalItems[1]?.title || '',
    legal_item_2_desc: legalItems[1]?.desc || '',
    legal_item_3_title: legalItems[2]?.title || '',
    legal_item_3_desc: legalItems[2]?.desc || '',
    legal_item_4_title: legalItems[3]?.title || '',
    legal_item_4_desc: legalItems[3]?.desc || '',

    // Kontak & Footer
    contact_email: getVal('cmsContactEmail'),
    contact_phone: getVal('cmsContactPhone'),
    contact_address: getVal('cmsContactAddress'),
    footer_copyright: getVal('cmsFooterCopyright')
  };

  try {
    const res = await fetchAdmin('/admin/settings/website', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    if (res.status === 'success') {
      showAdminToast('success', 'Tersimpan', 'Konten website, statistik dinamis, fasilitas, dan legalitas berhasil disimpan!');
      if (res.data?.route_gmaps_url) {
        const gmapsInput = document.getElementById('cmsGmapsUrl');
        if (gmapsInput) gmapsInput.value = res.data.route_gmaps_url;
      }
    } else {
      showAdminToast('error', 'Gagal Menyimpan', res.message || 'Terjadi kesalahan');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  }
}

window.loadCmsSettings = loadCmsSettings;

export {
  loadCmsSettings,
  handleCmsSubmit
};
