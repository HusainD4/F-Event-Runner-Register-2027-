import { fetchAdmin } from '../core/api.js';
import { showAdminToast } from '../core/utils.js';

let statsItems = [];
let facilitiesItems = [];
let legalItems = [];
let faqItems = [];
let cmsIconDismissHandlersBound = false;

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
const CMS_NAVBAR_ICONS = [
  'fa-person-running', 'fa-medal', 'fa-trophy', 'fa-flag-checkered', 'fa-bolt',
  'fa-fire', 'fa-star', 'fa-mountain-sun', 'fa-shoe-prints', 'fa-heart-pulse',
  'fa-stopwatch', 'fa-award', 'fa-dumbbell', 'fa-route', 'fa-location-dot',
  'fa-sun', 'fa-water', 'fa-compass', 'fa-crown', 'fa-leaf'
];
const CMS_ICON_LABELS = [
  'Pelari', 'Medali', 'Piala', 'Bendera finis', 'Petir',
  'Api', 'Bintang', 'Gunung', 'Jejak kaki', 'Jantung',
  'Stopwatch', 'Penghargaan', 'Dumbbell', 'Rute', 'Lokasi',
  'Matahari', 'Ombak', 'Kompas', 'Mahkota', 'Daun'
];
const CMS_AUTO_STATS = {
  TOTAL_PARTICIPANTS: { label: 'Total peserta aktif', unit: 'Peserta Terdaftar', desc: 'Termasuk pendaftaran menunggu pembayaran' },
  PAID_PARTICIPANTS: { label: 'Peserta sudah membayar', unit: 'Peserta Lunas', desc: 'Peserta dengan transaksi lunas atau diterima' },
  TOTAL_CATEGORIES: { label: 'Kategori event', unit: 'Kategori Lomba', desc: 'Jumlah kategori event di website' },
  TOTAL_CAPACITY: { label: 'Total kuota awal', unit: 'Total Kuota', desc: 'Kapasitas seluruh kategori event' },
  AVAILABLE_SLOTS: { label: 'Sisa kuota tersedia', unit: 'Slot Tersedia', desc: 'Kuota yang masih dapat didaftarkan' }
};
const CMS_VISIBILITY_IDS = {
  hero: 'cmsShowHero',
  stats: 'cmsShowStats',
  route: 'cmsShowRoute',
  facilities: 'cmsShowFacilities',
  tickets: 'cmsShowTickets',
  legal: 'cmsShowLegal',
  faq: 'cmsShowFaq',
  footer: 'cmsShowFooter'
};

const DEFAULT_FAQ_ITEMS = [
  { question: 'Apakah tiket atau BIB perlombaan dapat dipindahtangankan?', answer: 'Tiket dan nomor BIB terdaftar resmi tidak dapat dipindahtangankan tanpa persetujuan panitia.', enabled: true },
  { question: 'Bagaimana prosedur pengambilan Race Pack (RPC)?', answer: 'Peserta wajib membawa e-tiket resmi dan identitas diri yang sah saat pengambilan racepack.', enabled: true },
  { question: 'Apakah ada ketentuan kualifikasi fisik bagi peserta?', answer: 'Peserta bertanggung jawab atas kondisi fisik dan kesehatannya sebelum mengikuti perlombaan.', enabled: true },
  { question: 'Bagaimana kebijakan acara jika terjadi keadaan kahar?', answer: 'Panitia dapat menyesuaikan jadwal atau rute demi keselamatan seluruh peserta sesuai regulasi yang berlaku.', enabled: true },
  { question: 'Bagaimana kerahasiaan data pribadi peserta dilindungi?', answer: 'Data peserta dijaga kerahasiaannya dan hanya digunakan untuk keperluan operasional acara sesuai peraturan.', enabled: true }
];

function escapeAttr(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderIconPicker(target, idx, selectedIcon) {
  const selectedIndex = CMS_NAVBAR_ICONS.indexOf(selectedIcon);
  const selectedLabel = selectedIndex >= 0 ? CMS_ICON_LABELS[selectedIndex] : 'Ikon tersimpan';
  const safeIcon = /^[a-z0-9-]+$/.test(selectedIcon || '') ? selectedIcon : 'fa-icons';
  return `
    <div class="cms-icon-dropdown" data-icon-target="${target}" data-idx="${idx}">
      <button type="button" class="cms-icon-dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
        <span class="cms-icon-dropdown-selected"><i class="fa-solid ${safeIcon}"></i><span>${selectedLabel}</span></span>
        <i class="fa-solid fa-chevron-down cms-icon-dropdown-chevron" aria-hidden="true"></i>
      </button>
      <div class="cms-icon-dropdown-menu" role="listbox" aria-label="Pilih ikon">
        ${CMS_NAVBAR_ICONS.map((icon, iconIndex) => `
          <button type="button" class="cms-icon-choice${selectedIcon === icon ? ' is-selected' : ''}"
            data-icon="${icon}" role="option" aria-selected="${selectedIcon === icon}" aria-label="${CMS_ICON_LABELS[iconIndex]}"
            title="${CMS_ICON_LABELS[iconIndex]}">
            <i class="fa-solid ${icon}"></i>
            <span>${CMS_ICON_LABELS[iconIndex]}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function bindIconPickers(container, target, items, rerender) {
  container.querySelectorAll(`.cms-icon-dropdown[data-icon-target="${target}"]`).forEach(dropdown => {
    const trigger = dropdown.querySelector('.cms-icon-dropdown-trigger');
    const menu = dropdown.querySelector('.cms-icon-dropdown-menu');
    trigger?.addEventListener('click', () => {
      const isOpen = dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
    menu?.querySelectorAll('.cms-icon-choice').forEach(button => {
      button.addEventListener('click', () => {
        const icon = button.dataset.icon;
        if (target === 'navbar') {
          const input = document.getElementById('cmsNavbarIcon');
          if (!input || !icon) return;
          input.value = icon;
          renderNavbarIconPicker();
          updateNavbarIconPreview();
          return;
        }
        const idx = Number(dropdown.dataset.idx);
        if (!Number.isInteger(idx) || !items[idx] || !icon) return;
        items[idx].icon = icon;
        rerender();
      });
    });
  });
}

function renderStatsRepeater() {
  const container = document.getElementById('cmsStatsItemsContainer');
  if (!container) return;

  if (statsItems.length === 0) {
    container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 16px;">Belum ada kartu statistik. Klik "Tambah Kartu Statistik" di atas.</div>';
    return;
  }

  container.innerHTML = statsItems.map((item, idx) => `
    <div class="cms-item-card cms-stat-card">
      <div class="cms-item-card-header">
        <span class="cms-item-card-title">
          <span class="cms-item-card-icon"><i class="fa-solid ${escapeAttr(item.icon || 'fa-chart-simple')}"></i></span>
          Kartu Statistik #${idx + 1}
        </span>
        <div class="cms-item-card-actions">
          <label class="cms-toggle cms-toggle-compact">
            <input type="checkbox" class="stat-input-visible" data-idx="${idx}" ${item.visible !== false ? 'checked' : ''}>
            <span class="cms-toggle-switch" aria-hidden="true"></span>
            <span class="cms-toggle-label">Tampilkan</span>
          </label>
          <button type="button" class="btn btn-outline btn-sm btn-delete-stat cms-delete-button" data-idx="${idx}" title="Hapus kartu ini" aria-label="Hapus kartu statistik">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Sumber data</label>
        <select class="form-input stat-input-type" data-idx="${idx}">
          <option value="CUSTOM" ${item.type !== 'AUTO' ? 'selected' : ''}>Isi manual / informasi kustom</option>
          <option value="AUTO_PARTICIPANTS" ${item.autoKey === 'TOTAL_PARTICIPANTS' ? 'selected' : ''}>Live: Total peserta aktif</option>
          <option value="AUTO_PAID_PARTICIPANTS" ${item.autoKey === 'PAID_PARTICIPANTS' ? 'selected' : ''}>Live: Peserta sudah membayar</option>
          <option value="AUTO_CATEGORIES" ${item.autoKey === 'TOTAL_CATEGORIES' ? 'selected' : ''}>Live: Jumlah kategori event</option>
          <option value="AUTO_CAPACITY" ${item.autoKey === 'TOTAL_CAPACITY' ? 'selected' : ''}>Live: Total kuota awal</option>
          <option value="AUTO_AVAILABLE" ${item.autoKey === 'AVAILABLE_SLOTS' ? 'selected' : ''}>Live: Sisa kuota tersedia</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Ikon kartu</label>
        ${renderIconPicker('stat', idx, item.icon || 'fa-chart-simple')}
      </div>

      <div class="form-group">
        <label class="form-label">Nilai statistik ${item.type === 'AUTO' ? '(otomatis dari backend)' : '(bebas diisi)'}</label>
        <input type="text" class="form-input stat-input-val" data-idx="${idx}" value="${escapeAttr(item.val || '')}" placeholder="Contoh: 2.500+, 100%, atau Rp 75 juta" ${item.type === 'AUTO' ? 'disabled' : ''}>
      </div>

      <div class="form-group">
        <label class="form-label">Judul / satuan</label>
        <input type="text" class="form-input stat-input-unit" data-idx="${idx}" value="${escapeAttr(item.unit || '')}" placeholder="Contoh: Pelari Terdaftar">
      </div>

      <div class="form-group cms-last-form-group">
        <label class="form-label">Keterangan tambahan</label>
        <input type="text" class="form-input stat-input-desc" data-idx="${idx}" value="${escapeAttr(item.desc || '')}" placeholder="Teks pendukung opsional">
      </div>
    </div>
  `).join('');
  bindIconPickers(container, 'stat', statsItems, renderStatsRepeater);

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
      } else if (val === 'AUTO_PAID_PARTICIPANTS') {
        statsItems[idx].type = 'AUTO';
        statsItems[idx].autoKey = 'PAID_PARTICIPANTS';
      } else if (val === 'AUTO_CATEGORIES') {
        statsItems[idx].type = 'AUTO';
        statsItems[idx].autoKey = 'TOTAL_CATEGORIES';
      } else if (val === 'AUTO_CAPACITY') {
        statsItems[idx].type = 'AUTO';
        statsItems[idx].autoKey = 'TOTAL_CAPACITY';
      } else if (val === 'AUTO_AVAILABLE') {
        statsItems[idx].type = 'AUTO';
        statsItems[idx].autoKey = 'AVAILABLE_SLOTS';
      } else {
        statsItems[idx].type = 'CUSTOM';
        statsItems[idx].autoKey = '';
      }
      if (statsItems[idx].type === 'AUTO') {
        const defaults = CMS_AUTO_STATS[statsItems[idx].autoKey];
        statsItems[idx].unit = defaults.unit;
        statsItems[idx].desc = defaults.desc;
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
    <div class="cms-item-card">
      <div class="cms-item-card-header">
        <span class="cms-item-card-title">
          <span class="cms-item-card-icon"><i class="fa-solid ${escapeAttr(item.icon || 'fa-gift')}"></i></span>
          Fasilitas #${idx + 1}
        </span>
        <div class="cms-item-card-actions">
          <label class="cms-toggle cms-toggle-compact">
            <input type="checkbox" class="fac-input-visible" data-idx="${idx}" ${item.visible !== false ? 'checked' : ''}>
            <span class="cms-toggle-switch" aria-hidden="true"></span>
            <span class="cms-toggle-label">Tampilkan</span>
          </label>
          <button type="button" class="btn btn-outline btn-sm btn-delete-facility cms-delete-button" data-idx="${idx}" title="Hapus kartu ini" aria-label="Hapus kartu fasilitas">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Ikon fasilitas</label>
        ${renderIconPicker('facility', idx, item.icon || 'fa-gift')}
      </div>

      <div class="form-group">
        <label class="form-label">Judul fasilitas</label>
        <input type="text" class="form-input fac-input-title" data-idx="${idx}" value="${escapeAttr(item.title || '')}" placeholder="Nama fasilitas atau racepack">
      </div>

      <div class="form-group cms-last-form-group">
        <label class="form-label">Deskripsi fasilitas</label>
        <textarea class="form-input fac-input-desc" data-idx="${idx}" rows="2" placeholder="Uraian fasilitas bagi peserta">${escapeAttr(item.desc || '')}</textarea>
      </div>
    </div>
  `).join('');
  bindIconPickers(container, 'facility', facilitiesItems, renderFacilitiesRepeater);

  container.querySelectorAll('.btn-delete-facility').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-idx'));
      facilitiesItems.splice(idx, 1);
      renderFacilitiesRepeater();
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
    <div class="cms-item-card">
      <div class="cms-item-card-header">
        <span class="cms-item-card-title">
          <span class="cms-item-card-icon"><i class="fa-solid ${escapeAttr(item.icon || 'fa-certificate')}"></i></span>
          Poin Legalitas #${idx + 1}
        </span>
        <div class="cms-item-card-actions">
          <label class="cms-toggle cms-toggle-compact">
            <input type="checkbox" class="legal-input-visible" data-idx="${idx}" ${item.visible !== false ? 'checked' : ''}>
            <span class="cms-toggle-switch" aria-hidden="true"></span>
            <span class="cms-toggle-label">Tampilkan</span>
          </label>
          <button type="button" class="btn btn-outline btn-sm btn-delete-legal cms-delete-button" data-idx="${idx}" title="Hapus poin ini" aria-label="Hapus poin legalitas">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Ikon legalitas</label>
        ${renderIconPicker('legal', idx, item.icon || 'fa-certificate')}
      </div>

      <div class="form-group">
        <label class="form-label">Judul legalitas</label>
        <input type="text" class="form-input legal-input-title" data-idx="${idx}" value="${escapeAttr(item.title || '')}" placeholder="Contoh: Rekomendasi Resmi PB PASI">
      </div>

      <div class="form-group cms-last-form-group">
        <label class="form-label">Deskripsi legalitas</label>
        <textarea class="form-input legal-input-desc" data-idx="${idx}" rows="2" placeholder="Uraian kepatuhan hukum atau perizinan">${escapeAttr(item.desc || '')}</textarea>
      </div>
    </div>
  `).join('');
  bindIconPickers(container, 'legal', legalItems, renderLegalRepeater);

  container.querySelectorAll('.btn-delete-legal').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-idx'));
      legalItems.splice(idx, 1);
      renderLegalRepeater();
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
  });

  container.querySelectorAll('.legal-input-visible').forEach(input => {
    input.addEventListener('change', () => {
      legalItems[Number(input.getAttribute('data-idx'))].visible = input.checked;
    });
  });
}

function renderFaqRepeater() {
  const container = document.getElementById('cmsFaqItemsContainer');
  if (!container) return;
  if (!faqItems.length) {
    container.innerHTML = '<div class="cms-repeater-empty">Belum ada pertanyaan. Tambahkan FAQ atau matikan seluruhnya untuk menampilkan Coming Soon.</div>';
    return;
  }
  container.innerHTML = faqItems.map((item, index) => `
    <article class="cms-repeater-card cms-faq-item">
      <div class="cms-faq-item-heading">
        <strong>Pertanyaan ${index + 1}</strong>
        <button type="button" class="btn btn-outline btn-sm cms-faq-remove" data-index="${index}" aria-label="Hapus pertanyaan ${index + 1}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <label class="form-label" for="cmsFaqQuestion-${index}">Pertanyaan</label>
      <input class="form-input cms-faq-question" id="cmsFaqQuestion-${index}" maxlength="240" required value="${escapeAttr(item.question || '')}" data-index="${index}">
      <label class="form-label" for="cmsFaqAnswer-${index}">Jawaban</label>
      <textarea class="form-input cms-faq-answer" id="cmsFaqAnswer-${index}" rows="3" maxlength="3000" required data-index="${index}">${escapeAttr(item.answer || '')}</textarea>
      <label class="cms-toggle cms-faq-enabled">
        <input type="checkbox" class="cms-faq-enabled-input" data-index="${index}" ${item.enabled !== false ? 'checked' : ''}>
        <span class="cms-toggle-switch" aria-hidden="true"></span>
        <span class="cms-toggle-label">Tampilkan pertanyaan ini</span>
      </label>
    </article>
  `).join('');

  container.querySelectorAll('.cms-faq-question, .cms-faq-answer').forEach(input => {
    input.addEventListener('input', () => {
      const item = faqItems[Number(input.dataset.index)];
      if (item) item[input.classList.contains('cms-faq-question') ? 'question' : 'answer'] = input.value;
    });
  });
  container.querySelectorAll('.cms-faq-enabled-input').forEach(input => {
    input.addEventListener('change', () => {
      const item = faqItems[Number(input.dataset.index)];
      if (item) item.enabled = input.checked;
    });
  });
  container.querySelectorAll('.cms-faq-remove').forEach(button => {
    button.addEventListener('click', () => {
      faqItems.splice(Number(button.dataset.index), 1);
      renderFaqRepeater();
    });
  });
}

function updateNavbarIconPreview() {
  const iconInput = document.getElementById('cmsNavbarIcon');
  const imageInput = document.getElementById('cmsNavbarIconUrl');
  const preview = document.getElementById('cmsNavbarIconPreview');
  const previewTitle = document.getElementById('cmsNavbarTitlePreview');
  const navbarTitle = document.getElementById('cmsNavbarTitle');
  const mode = document.querySelector('input[name="cmsNavbarIconMode"]:checked')?.value || 'ICON';
  const iconField = document.getElementById('cmsNavbarIconField');
  const imageField = document.getElementById('cmsNavbarIconUrlField');
  if (!iconInput || !preview) return;

  if (iconField) iconField.hidden = mode !== 'ICON';
  if (imageField) imageField.hidden = mode !== 'IMAGE';
  if (imageInput) {
    imageInput.disabled = mode !== 'IMAGE';
    imageInput.required = mode === 'IMAGE';
  }
  if (previewTitle) previewTitle.textContent = navbarTitle?.value.trim() || 'Nama Website';

  const imageUrl = mode === 'IMAGE' ? (imageInput?.value.trim() || '') : '';
  if (imageUrl) {
    try {
      const parsedUrl = new URL(imageUrl);
      if (['http:', 'https:'].includes(parsedUrl.protocol)) {
        const image = document.createElement('img');
        image.src = parsedUrl.href;
        image.alt = '';
        image.onerror = () => {
          const fallback = document.createElement('i');
          fallback.className = 'fa-solid fa-image';
          preview.replaceChildren(fallback);
        };
        preview.replaceChildren(image);
        return;
      }
    } catch {
      // The URL input and backend validation report invalid values on save.
    }
  }

  if (mode === 'IMAGE') {
    const placeholder = document.createElement('i');
    placeholder.className = 'fa-regular fa-image';
    preview.replaceChildren(placeholder);
    return;
  }

  const iconClass = CMS_NAVBAR_ICONS.includes(iconInput.value) ? iconInput.value : CMS_NAVBAR_ICONS[0];
  const icon = document.createElement('i');
  icon.className = `fa-solid ${iconClass}`;
  preview.replaceChildren(icon);
}

function renderNavbarIconPicker() {
  const picker = document.getElementById('cmsNavbarIconPicker');
  const input = document.getElementById('cmsNavbarIcon');
  if (!picker || !input) return;
  picker.innerHTML = renderIconPicker('navbar', 0, input.value);
  bindIconPickers(picker, 'navbar', [], renderNavbarIconPicker);
}

function updateFaviconPreview() {
  const input = document.getElementById('cmsFaviconUrl');
  const image = document.getElementById('cmsFaviconPreview');
  const fallback = document.getElementById('cmsFaviconFallback');
  if (!input || !image || !fallback) return;

  const url = input.value.trim();
  if (!url) {
    image.hidden = true;
    fallback.hidden = false;
    image.removeAttribute('src');
    return;
  }

  try {
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('URL favicon harus menggunakan HTTP atau HTTPS.');
    image.onerror = () => {
      image.hidden = true;
      fallback.hidden = false;
    };
    image.onload = () => {
      image.hidden = false;
      fallback.hidden = true;
    };
    image.src = parsedUrl.href;
  } catch {
    image.hidden = true;
    fallback.hidden = false;
  }
}

function initCmsButtons() {
  renderNavbarIconPicker();
  if (!cmsIconDismissHandlersBound) {
    document.addEventListener('click', event => {
      if (event.target.closest('.cms-icon-dropdown')) return;
      document.querySelectorAll('.cms-icon-dropdown.is-open').forEach(dropdown => {
        dropdown.classList.remove('is-open');
        dropdown.querySelector('.cms-icon-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const openDropdown = document.querySelector('.cms-icon-dropdown.is-open');
      if (!openDropdown) return;
      openDropdown.classList.remove('is-open');
      const trigger = openDropdown.querySelector('.cms-icon-dropdown-trigger');
      trigger?.setAttribute('aria-expanded', 'false');
      trigger?.focus();
    });
    cmsIconDismissHandlersBound = true;
  }
  document.querySelectorAll('input[name="cmsNavbarIconMode"]').forEach(input => {
    input.onchange = updateNavbarIconPreview;
  });
  const navbarIconUrl = document.getElementById('cmsNavbarIconUrl');
  if (navbarIconUrl) navbarIconUrl.oninput = updateNavbarIconPreview;
  const navbarTitle = document.getElementById('cmsNavbarTitle');
  if (navbarTitle) navbarTitle.oninput = updateNavbarIconPreview;
  const faviconUrl = document.getElementById('cmsFaviconUrl');
  if (faviconUrl) faviconUrl.oninput = updateFaviconPreview;
  const comingSoonTitle = document.getElementById('cmsComingSoonTitle');
  const comingSoonMessage = document.getElementById('cmsComingSoonMessage');
  const comingSoonImageUrl = document.getElementById('cmsComingSoonImageUrl');
  const updateComingSoonPreview = () => {
    const previewTitle = document.getElementById('cmsComingSoonPreviewTitle');
    const previewMessage = document.getElementById('cmsComingSoonPreviewMessage');
    const previewImage = document.getElementById('cmsComingSoonPreviewImage');
    const fallback = document.getElementById('cmsComingSoonPreviewFallback');
    if (previewTitle) previewTitle.textContent = comingSoonTitle?.value.trim() || 'COMING SOON EVENT!';
    if (previewMessage) {
      previewMessage.textContent = comingSoonMessage?.value.trim() || '';
      previewMessage.hidden = !comingSoonMessage?.value.trim();
    }
    const url = comingSoonImageUrl?.value.trim() || '';
    let safeUrl = '';
    try {
      const parsed = new URL(url);
      if (['http:', 'https:'].includes(parsed.protocol)) safeUrl = parsed.href;
    } catch {
      safeUrl = '';
    }
    if (previewImage && fallback) {
      previewImage.onerror = () => {
        previewImage.hidden = true;
        fallback.hidden = false;
      };
      if (safeUrl) {
        previewImage.src = safeUrl;
        previewImage.hidden = false;
        fallback.hidden = true;
      } else {
        previewImage.removeAttribute('src');
        previewImage.hidden = true;
        fallback.hidden = false;
      }
    }
  };
  [comingSoonTitle, comingSoonMessage, comingSoonImageUrl].forEach(input => {
    if (input) input.oninput = updateComingSoonPreview;
  });
  updateComingSoonPreview();
  updateNavbarIconPreview();
  updateFaviconPreview();

  const statBtn = document.getElementById('btnAddCmsStatItem');
  if (statBtn) {
    statBtn.onclick = () => {
      statsItems.push({ type: 'CUSTOM', autoKey: '', icon: 'fa-chart-simple', val: '100+', unit: 'Statistik Baru', desc: 'Keterangan statistik' });
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

  const faqBtn = document.getElementById('btnAddCmsFaqItem');
  if (faqBtn) {
    faqBtn.onclick = () => {
      faqItems.push({ question: 'Pertanyaan baru', answer: 'Tulis jawaban FAQ di sini.', enabled: true });
      renderFaqRepeater();
    };
  }

  const preview = document.getElementById('cmsWebsitePreview');
  const previewUpdated = document.getElementById('cmsPreviewUpdated');
  const refreshPreview = () => {
    if (!preview) return;
    preview.src = `${window.location.origin}/?cmsPreview=${Date.now()}`;
    if (previewUpdated) previewUpdated.textContent = 'Memuat ulang...';
  };
  if (preview) {
    preview.onload = () => {
      if (previewUpdated) previewUpdated.textContent = `Diperbarui ${new Date().toLocaleTimeString('id-ID')}`;
    };
  }
  const refreshPreviewButton = document.getElementById('btnRefreshCmsPreview');
  if (refreshPreviewButton) refreshPreviewButton.onclick = refreshPreview;
  const previewPanel = document.getElementById('cmsLivePreview');
  const previewToggle = document.getElementById('btnToggleCmsPreview');
  const previewViewport = document.getElementById('cmsPreviewViewport');
  const setPreviewMode = mode => {
    if (!previewViewport) return;
    previewViewport.classList.toggle('is-mobile-mode', mode === 'mobile');
    previewViewport.classList.toggle('is-desktop-mode', mode === 'desktop');
    document.querySelectorAll('.cms-device-button').forEach(button => {
      const active = button.dataset.previewMode === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };
  document.querySelectorAll('.cms-device-button').forEach(button => {
    button.onclick = () => {
      const mode = button.dataset.previewMode;
      if (mode === 'desktop' && previewPanel) {
        const desktopWidth = Math.min(Math.max(previewPanel.offsetWidth, 760), window.innerWidth - 48);
        previewPanel.style.width = `${desktopWidth}px`;
      } else if (mode === 'mobile' && previewPanel) {
        previewPanel.style.width = '';
      }
      setPreviewMode(mode);
    };
  });
  if (previewPanel && previewToggle) {
    let previewPointerStart = 0;
    let previewLastX = 0;
    let previewStartWidth = 0;
    let previewStartHiddenWidth = 0;
    let previewStartedOpen = false;
    let previewDragMoved = false;
    let suppressToggleClick = false;
    const setPreviewOpen = (isOpen) => {
      previewPanel.classList.toggle('is-open', isOpen);
      previewPanel.classList.remove('is-dragging');
      previewPanel.style.transform = '';
      previewToggle.setAttribute('aria-expanded', String(isOpen));
      previewToggle.setAttribute('aria-label', isOpen ? 'Lipat pratinjau halaman utama' : 'Buka pratinjau halaman utama');
      previewToggle.title = isOpen ? 'Tarik ke kanan untuk melipat; tarik ke kiri untuk memperlebar' : 'Tarik ke kiri untuk membuka dan memperlebar pratinjau';
      previewToggle.querySelector('.cms-preview-handle-label').textContent = isOpen ? 'LIPAT' : 'PREVIEW';
      if (isOpen && preview && preview.dataset.loaded !== 'true') {
        preview.dataset.loaded = 'true';
        refreshPreview();
      }
    };
    previewToggle.onclick = () => {
      if (suppressToggleClick) {
        suppressToggleClick = false;
        return;
      }
      setPreviewOpen(!previewPanel.classList.contains('is-open'));
    };
    previewToggle.onpointerdown = event => {
      if (event.button !== 0) return;
      previewPointerStart = event.clientX;
      previewLastX = event.clientX;
      previewStartedOpen = previewPanel.classList.contains('is-open');
      previewStartWidth = previewPanel.offsetWidth;
      const previewRightOffset = Number.parseFloat(getComputedStyle(previewPanel).right) || 0;
      previewStartHiddenWidth = Math.max(0, previewStartWidth + previewRightOffset);
      previewDragMoved = false;
      previewPanel.classList.add('is-dragging');
      previewToggle.setPointerCapture(event.pointerId);
    };
    previewToggle.onpointermove = event => {
      if (!previewPanel.classList.contains('is-dragging')) return;
      previewLastX = event.clientX;
      const dragDistance = previewPointerStart - event.clientX;
      if (Math.abs(dragDistance) > 8) previewDragMoved = true;
      if (!previewDragMoved) return;

      const maxWidth = Math.min(window.innerWidth - 48, 1100);
      const hiddenWidth = previewStartHiddenWidth;
      if (previewStartedOpen && dragDistance < 0) {
        const closedOffset = Math.min(hiddenWidth, Math.abs(dragDistance));
        previewPanel.style.transform = `translateX(${closedOffset}px)`;
        return;
      }

      if (!previewStartedOpen && dragDistance <= hiddenWidth) {
        previewPanel.style.transform = `translateX(${Math.min(hiddenWidth, Math.max(0, hiddenWidth - dragDistance))}px)`;
        return;
      }

      const extraDrag = previewStartedOpen ? dragDistance : dragDistance - hiddenWidth;
      const width = Math.max(360, Math.min(maxWidth, previewStartWidth + extraDrag));
      previewPanel.style.width = `${width}px`;
      previewPanel.style.transform = 'translateX(0)';
      previewPanel.classList.add('is-open');
      setPreviewMode(width >= 720 ? 'desktop' : 'mobile');
    };
    previewToggle.onpointerup = event => {
      if (!previewPanel.classList.contains('is-dragging')) return;
      if (previewDragMoved) {
        const dragDistance = previewPointerStart - event.clientX;
        const hiddenWidth = previewStartHiddenWidth;
        const shouldOpen = previewStartedOpen
          ? !(dragDistance < 0 && Math.abs(dragDistance) > hiddenWidth / 2)
          : dragDistance > hiddenWidth / 2;
        setPreviewOpen(shouldOpen);
        suppressToggleClick = true;
      } else {
        previewPanel.classList.remove('is-dragging');
        previewPanel.style.transform = '';
      }
    };
    previewToggle.onpointercancel = () => {
      if (previewPanel.classList.contains('is-dragging')) {
        const dragDistance = previewPointerStart - previewLastX;
        const shouldOpen = previewStartedOpen
          ? !(dragDistance < 0 && Math.abs(dragDistance) > previewStartHiddenWidth / 2)
          : dragDistance > previewStartHiddenWidth / 2;
        setPreviewOpen(shouldOpen);
      }
    };
    setPreviewOpen(true);
  }
}

async function loadCmsSettings() {
  try {
    const res = await fetchAdmin('/admin/settings/website');
    if (res.status !== 'success' || !res.data) {
      throw new Error(res.message || 'Pengaturan CMS tidak dapat dimuat dari backend.');
    }
    const s = res.data;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val !== undefined && val !== null ? val : '';
    };

      setVal('cmsSiteTitle', s.site_title);
      setVal('cmsSiteTagline', s.site_tagline);
      setVal('cmsNavbarTitle', typeof s.navbar_title === 'string' ? s.navbar_title : 'TEGAL RUN 2027');
      setVal('cmsNavbarIcon', CMS_NAVBAR_ICONS.includes(s.navbar_icon) ? s.navbar_icon : CMS_NAVBAR_ICONS[0]);
      setVal('cmsNavbarIconUrl', s.navbar_icon_url);
      setVal('cmsFaviconUrl', s.favicon_url);
      const savedNavbarMode = s.navbar_icon_mode || (s.navbar_icon_url ? 'IMAGE' : 'ICON');
      const modeInput = document.querySelector(`input[name="cmsNavbarIconMode"][value="${savedNavbarMode === 'IMAGE' ? 'IMAGE' : 'ICON'}"]`);
      if (modeInput) modeInput.checked = true;
      updateNavbarIconPreview();
      updateFaviconPreview();
      setVal('cmsHeroBadge', s.hero_badge);
      setVal('cmsHeroTitle', s.hero_title);
      setVal('cmsHeroSubtitle', s.hero_subtitle);
      setVal('cmsHeroBgImage', s.hero_bg_image);
      setVal('cmsComingSoonTitle', s.coming_soon_title || 'COMING SOON EVENT!');
      setVal(
        'cmsComingSoonMessage',
        typeof s.coming_soon_message === 'string'
          ? s.coming_soon_message
          : 'Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!'
      );
      setVal('cmsComingSoonImageUrl', s.coming_soon_image_url);

      // Parse Dynamic Stats Items
      if (s.stats_banner_items) {
        try {
          statsItems = JSON.parse(s.stats_banner_items);
        } catch {
          statsItems = [];
        }
      } else {
        statsItems = [1, 2, 3, 4].map(number => ({
          type: 'CUSTOM',
          val: s[`stat_${number}_val`] || '',
          unit: s[`stat_${number}_unit`] || '',
          desc: s[`stat_${number}_desc`] || ''
        })).filter(item => item.val || item.unit || item.desc);
      }
      renderStatsRepeater();

      // Rute & Specs
      try {
        faqItems = s.faq_items ? JSON.parse(s.faq_items) : [...DEFAULT_FAQ_ITEMS];
        if (!Array.isArray(faqItems)) faqItems = [...DEFAULT_FAQ_ITEMS];
      } catch {
        faqItems = [...DEFAULT_FAQ_ITEMS];
      }
      renderFaqRepeater();
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
  } catch (err) {
    console.error('Gagal memuat pengaturan website CMS:', err);
    showAdminToast('error', 'Gagal Memuat CMS', err.message || 'Tidak dapat memuat pengaturan website dari backend.');
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
  const navbarIconMode = document.querySelector('input[name="cmsNavbarIconMode"]:checked')?.value === 'IMAGE'
    ? 'IMAGE'
    : 'ICON';

  const payload = {
    site_title: getVal('cmsSiteTitle'),
    site_tagline: getVal('cmsSiteTagline'),
    navbar_title: getVal('cmsNavbarTitle'),
    navbar_icon_mode: navbarIconMode,
    navbar_icon: CMS_NAVBAR_ICONS.includes(getVal('cmsNavbarIcon')) ? getVal('cmsNavbarIcon') : CMS_NAVBAR_ICONS[0],
    navbar_icon_url: navbarIconMode === 'IMAGE' ? getVal('cmsNavbarIconUrl') : '',
    favicon_url: getVal('cmsFaviconUrl'),
    hero_badge: getVal('cmsHeroBadge'),
    hero_title: getVal('cmsHeroTitle'),
    hero_subtitle: getVal('cmsHeroSubtitle'),
    hero_bg_image: getVal('cmsHeroBgImage'),
    coming_soon_title: getVal('cmsComingSoonTitle') || 'COMING SOON EVENT!',
    coming_soon_message: getVal('cmsComingSoonMessage'),
    coming_soon_image_url: getVal('cmsComingSoonImageUrl'),

    // Dynamic Lists (JSON)
    stats_banner_items: JSON.stringify(statsItems),
    facilities_items: JSON.stringify(facilitiesItems),
    legal_items: JSON.stringify(legalItems),
    faq_items: JSON.stringify(faqItems),
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
      showAdminToast('success', 'Tersimpan', 'Konten website, branding navbar, favicon, statistik, fasilitas, dan legalitas berhasil disimpan!');
      const faviconInput = document.getElementById('cmsFaviconUrl');
      if (faviconInput && typeof res.data?.favicon_url === 'string') {
        faviconInput.value = res.data.favicon_url;
        updateFaviconPreview();
      }
      const preview = document.getElementById('cmsWebsitePreview');
      if (preview && preview.dataset.loaded === 'true') {
        preview.src = `${window.location.origin}/?cmsPreview=${Date.now()}`;
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
