import { apiClient, apiFetch, loadMidtransSdk } from './api.js';
import { connectRealtimeSocket } from './realtime.js';

// Import Modular HTML Templates
// 1. Layout
import skeletonHtml from '../template/layout/skeleton.html?raw';
import navbarHtml from '../template/layout/navbar.html?raw';
import footerHtml from '../template/layout/footer.html?raw';
import mobileDockHtml from '../template/layout/mobile-dock.html?raw';

// 2. Sections
import heroHtml from '../template/sections/hero.html?raw';
import ticketsHtml from '../template/sections/tickets.html?raw';
import routeHtml from '../template/sections/route.html?raw';
import facilitiesHtml from '../template/sections/facilities.html?raw';
import legalHtml from '../template/sections/legal.html?raw';
import faqHtml from '../template/sections/faq.html?raw';

// 3. Modals
import modalsHtml from '../template/modals/modals.html?raw';

// 1. INJEKSI MODULAR TEMPLATES KE DALAM #APP
const appContainer = document.getElementById('app');
if (appContainer) {
  appContainer.innerHTML = `
    <div class="ambient-glow ambient-1"></div>
    <div class="ambient-glow ambient-2"></div>
    <div class="toast-container" id="toastContainer"></div>
    ${skeletonHtml}
    ${navbarHtml}
    ${heroHtml}
    ${ticketsHtml}
    ${routeHtml}
    ${facilitiesHtml}
    ${legalHtml}
    ${faqHtml}
    ${footerHtml}
    ${mobileDockHtml}
    ${modalsHtml}
  `;
}

// Application State
const state = {
  events: [],
  selectedEvent: null,
  currentStep: 1,
  participantCount: 1,
  isGlobalClosed: true,
  countdownTarget: null,
  countdownInterval: null,
  countdownSettingsLoaded: false,
  cmsHeroBadge: '',
  cmsStatsItems: null,
  cmsVisibility: {},
  cmsRouteMapUrl: '',
  cmsRouteMapImage: '',
  feeSettings: {
    feeEnabled: false,
    feeType: 'PER_TRANSACTION',
    feeAmount: 0,
    paymentTimerMinutes: 30
  }
};

function normalizePhone(p) {
  if (!p) return '';
  let cleaned = String(p).trim().replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('08')) {
    return '+628' + cleaned.slice(2);
  } else if (cleaned.startsWith('628')) {
    return '+' + cleaned;
  }
  return cleaned;
}

function setupPhoneAutoFormat(inputEl) {
  if (!inputEl || inputEl._phoneFormatted) return;
  inputEl._phoneFormatted = true;

  inputEl.addEventListener('input', (e) => {
    let val = e.target.value;
    if (val.startsWith('08')) {
      e.target.value = '+628' + val.substring(2);
    } else if (val.startsWith('628')) {
      e.target.value = '+628' + val.substring(3);
    }
  });
}

// =============================================================================
// 2. TOAST NOTIFICATION SYSTEM
// =============================================================================
export function showToast(type = 'success', title = '', message = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: 'fa-solid fa-circle-check',
    error: 'fa-solid fa-triangle-exclamation',
    warning: 'fa-solid fa-circle-exclamation'
  };

  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${iconMap[type] || iconMap.success}"></i>
    </div>
    <div class="toast-content">
      <h5>${escapeHtml(title)}</h5>
      <p>${escapeHtml(message)}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

// =============================================================================
// 3. COUNTDOWN TIMER DINAMIS (DARI TANGGAL EVENT BACKEND)
// =============================================================================
function initCountdown(targetTimestamp = null) {
  if (targetTimestamp !== undefined) {
    state.countdownTarget = targetTimestamp;
  }

  if (state.countdownInterval) {
    clearInterval(state.countdownInterval);
    state.countdownInterval = null;
  }

  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');

  if (!state.countdownTarget || !Number.isFinite(Number(state.countdownTarget))) {
    if (dEl) dEl.textContent = '--';
    if (hEl) hEl.textContent = '--';
    if (mEl) mEl.textContent = '--';
    if (sEl) sEl.textContent = '--';
    return;
  }

  function update() {
    const now = new Date().getTime();
    const distance = state.countdownTarget - now;

    if (distance <= 0) {
      if (dEl) dEl.textContent = '00';
      if (hEl) hEl.textContent = '00';
      if (mEl) mEl.textContent = '00';
      if (sEl) sEl.textContent = '00';
      if (state.countdownInterval) {
        clearInterval(state.countdownInterval);
        state.countdownInterval = null;
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(minutes);
    if (sEl) sEl.textContent = pad(seconds);
  }

  update();
  state.countdownInterval = setInterval(update, 1000);
}

// =============================================================================
// 4. LOAD GLOBAL COUNTDOWN & EVENT CARDS (REAL-TIME DARI DATABASE BACKEND)
// =============================================================================
async function loadCountdownSettings() {
  const displayEl = document.getElementById('eventDateDisplay');
  try {
    const settings = await apiClient.getCountdownSettings();
    state.countdownSettingsLoaded = Boolean(settings);
    if (settings && settings.eventCountdownDate) {
      const d = new Date(settings.eventCountdownDate);
      if (!isNaN(d.getTime())) {
        if (state.countdownTarget !== d.getTime()) initCountdown(d.getTime());

        const dateStr = d.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        if (displayEl) {
          displayEl.textContent = `${dateStr.toUpperCase()} • ${timeStr} WIB`;
          displayEl.classList.remove('badge-pending-date');
        }
      } else if (displayEl) {
        displayEl.textContent = 'TANGGAL BELUM DITENTUKAN';
        displayEl.classList.add('badge-pending-date');
      }
    } else if (displayEl) {
      displayEl.textContent = 'TANGGAL BELUM DITENTUKAN';
      displayEl.classList.add('badge-pending-date');
    }

    if (settings) {
      state.isGlobalClosed = settings.isRegistrationClosed === true
        || String(settings.isRegistrationClosed).toLowerCase() === 'true';
      applyRegistrationStatus();
    }
  } catch (err) {
    console.warn('Gagal memuat pengaturan countdown dari backend:', err);
    state.isGlobalClosed = true;
    applyRegistrationStatus();
    if (displayEl) {
      displayEl.textContent = 'TANGGAL BELUM DITENTUKAN';
      displayEl.classList.add('badge-pending-date');
    }
  }
}

function applyRegistrationStatus() {
  const statusBadge = document.getElementById('heroStatusBadge');
  const statusText = document.getElementById('heroStatusText');
  const ctaBtn = document.getElementById('heroCtaBtn');
  const navBtn = document.getElementById('navDaftarBtn');
  const dockBtn = document.getElementById('dockDaftarBtn');

  if (state.isGlobalClosed) {
    if (statusBadge) statusBadge.style.borderColor = '#EF4444';
    if (statusText) statusText.innerHTML = '<span style="color:#EF4444; font-weight:800;">🚨 PENDAFTARAN RESMI TELAH RESMI DITUTUP PANITIA</span>';
    if (ctaBtn) {
      ctaBtn.disabled = true;
      ctaBtn.classList.remove('btn-glow');
      ctaBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup';
    }
    if (navBtn) {
      navBtn.disabled = true;
      navBtn.classList.remove('btn-glow');
      navBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Ditutup';
    }
    if (dockBtn) {
      dockBtn.style.opacity = '0.6';
      dockBtn.style.pointerEvents = 'none';
    }
    if (state.events.length) renderTickets(state.events);
    return;
  }

  if (statusBadge) statusBadge.style.borderColor = '';
  if (statusText) statusText.textContent = state.cmsHeroBadge || 'PENDAFTARAN RESMI DIBUKA';
  if (ctaBtn) {
    ctaBtn.disabled = false;
    ctaBtn.classList.add('btn-glow');
    ctaBtn.innerHTML = '<i class="fa-solid fa-ticket" aria-hidden="true"></i> Amankan Slot Lari Sekarang';
  }
  if (navBtn) {
    navBtn.disabled = false;
    navBtn.classList.add('btn-glow');
    navBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Daftar Tiket';
  }
  if (dockBtn) {
    dockBtn.style.opacity = '';
    dockBtn.style.pointerEvents = '';
  }
  if (state.events.length) renderTickets(state.events);
}

async function loadEvents() {
  const skeleton = document.getElementById('pageSkeleton');

  try {
    const events = await apiClient.getEvents();
    state.events = events;
    renderTickets(events);
    renderStatsBanner(state.cmsStatsItems);

    if (!state.countdownTarget && !state.countdownSettingsLoaded && Array.isArray(events)) {
      const eventDates = events
        .map(event => new Date(event.eventDate).getTime())
        .filter(timestamp => Number.isFinite(timestamp) && timestamp > Date.now())
        .sort((a, b) => a - b);
      if (eventDates.length > 0) initCountdown(eventDates[0]);
    }

    async function refreshPublicEvents() {
      try {
        const response = await apiFetch('/events', {
          method: 'GET',
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        if (result.status !== 'success' || !Array.isArray(result.data)) {
          throw new Error(result.message || 'Respons data event tidak valid.');
        }

        if (JSON.stringify(result.data) !== JSON.stringify(state.events)) {
          state.events = result.data;
          renderTickets(result.data);
          renderStatsBanner(state.cmsStatsItems);
        }

        if (!state.countdownSettingsLoaded) {
          const eventDates = result.data
            .map(event => new Date(event.eventDate).getTime())
            .filter(timestamp => Number.isFinite(timestamp) && timestamp > Date.now())
            .sort((a, b) => a - b);
          if (eventDates.length > 0 && eventDates[0] !== state.countdownTarget) {
            initCountdown(eventDates[0]);
          }
        }
      } catch (error) {
        console.warn('Gagal memperbarui daftar event publik:', error);
      }
    }

    // Ambil konfigurasi batas waktu pembayaran & biaya layanan
    try {
      const cfgRes = await apiFetch('/settings/checkout-config');
      const cfgJson = await cfgRes.json();
      if (cfgJson.status === 'success' && cfgJson.data) {
        state.feeSettings = cfgJson.data;
      }
    } catch {}

    // Cek apakah ada redirect dari halaman detail tiket (?register=...)
    const regParam = new URLSearchParams(window.location.search).get('register');
    if (regParam) {
      const targetEvent = events.find(e => e.id === regParam);
      if (targetEvent && !targetEvent.isClosed && !state.isGlobalClosed) {
        setTimeout(() => openRegistrationModal(targetEvent), 400);
      }
    }
  } catch (err) {
    console.error('Failed to render events:', err);
  } finally {
    if (skeleton) {
      setTimeout(() => {
        skeleton.classList.add('hide');
      }, 350);
    }
  }
}

function renderTickets(events) {
  const grid = document.getElementById('ticketsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  if (!Array.isArray(events) || events.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; grid-column: 1 / -1; padding: 60px 20px;">
        <i class="fa-solid fa-ticket-simple" style="font-size: 3rem; color: #94A3B8; margin-bottom: 16px;"></i>
        <h3 style="color: var(--color-text-title); font-size: 1.25rem; margin-bottom: 6px;">Tidak Ada Kategori Tiket</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Belum ada kategori lomba yang dibuka di database.</p>
      </div>
    `;
    return;
  }

  events.forEach((ev) => {
    const is10k = ev.category === '10K';
    const totalCapacity = ev.stock || 0;
    const currentStock = typeof ev.stock === 'number' ? ev.stock : 0;
    const percentage = totalCapacity > 0 ? Math.max(0, Math.min(100, Math.round((currentStock / totalCapacity) * 100))) : 0;
    const isGlobalClosed = state.isGlobalClosed;
    const isClosed = Boolean(ev.isClosed) || isGlobalClosed;

    const card = document.createElement('div');
    card.className = `glass-card ticket-card ticket-pass-card ${is10k ? 'featured' : ''} ${isClosed ? 'event-closed-card' : ''} ${isGlobalClosed ? 'global-registration-closed' : ''}`;

    const benefitsList = (Array.isArray(ev.benefits) && ev.benefits.length > 0)
      ? ev.benefits.map(b => b.name)
      : [];

    const benefitsHtml = benefitsList.length > 0
      ? benefitsList.map(b => `
          <li class="benefit-item">
            <div class="benefit-icon"><i class="fa-solid fa-check"></i></div>
            <span>${escapeHtml(b)}</span>
          </li>
        `).join('')
      : `<li class="benefit-item" style="color: var(--color-text-muted); font-style: italic;">Belum ada benefit tercantum</li>`;

    const ticketImage = ev.ticketImage || ev.medalImage;
    const bannerHtml = `
      <div class="ticket-card-banner${ticketImage ? '' : ' ticket-card-banner-empty'}">
        ${ticketImage
          ? `<img src="${escapeHtml(ticketImage)}" alt="${escapeHtml(ev.ticketName)}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('ticket-card-banner-empty')">`
          : '<i class="fa-solid fa-person-running" aria-hidden="true"></i>'}
        <div class="ticket-card-banner-overlay">
          <span class="ticket-banner-badge"><i class="fa-solid fa-person-running"></i> ${escapeHtml(ev.category)} Marathon</span>
          ${ev.medalImage ? `<span class="ticket-banner-medal-badge"><i class="fa-solid fa-medal"></i> Medali Finisher</span>` : ''}
        </div>
      </div>
    `;

    card.innerHTML = `
      <!-- E-Tiket Stub Header -->
      <div class="ticket-stub-header">
        <div class="ticket-stub-brand">
          <i class="fa-solid fa-bolt" style="color: var(--color-primary);"></i> TEGAL RUN 2027
        </div>
        <div class="ticket-stub-tag">
          ${isGlobalClosed ? '<span class="global-sold-stamp"><i class="fa-solid fa-ban"></i> SOLD</span>' : (isClosed ? '<span style="color:#ef4444;"><i class="fa-solid fa-lock"></i> CLOSED</span>' : (is10k ? '<span style="color:#ff6b00;"><i class="fa-solid fa-fire"></i> POPULAR</span>' : '<span>OFFICIAL PASS</span>'))}
        </div>
      </div>

      ${bannerHtml}

      <div class="ticket-header">
        <span class="ticket-category-tag">${escapeHtml(ev.category)} MARATHON PASS</span>
        <h3 class="ticket-title">${escapeHtml(ev.ticketName)}</h3>
        <div class="ticket-price">
          <span class="price-currency">Rp</span>
          <span class="price-amount">${Number(ev.price).toLocaleString('id-ID')}</span>
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
          <span class="stock-status" style="color: ${isClosed ? '#EF4444' : '#10B981'};">
            <i class="${isClosed ? 'fa-solid fa-lock' : 'fa-solid fa-fire'}"></i> 
            ${isGlobalClosed ? 'Seluruh Pendaftaran Ditutup' : (isClosed ? 'Pendaftaran Ditutup' : `${currentStock} Tiket Tersedia`)}
          </span>
        </div>
        <div class="stock-bar-bg">
          <div class="stock-bar-fill" style="width: ${isClosed ? 100 : percentage}%; background: ${isClosed ? '#EF4444' : ''};"></div>
        </div>
      </div>

      <ul class="ticket-benefits">
        ${benefitsHtml}
      </ul>

      <!-- Aesthetic Barcode Strip for Authentic Athletic Pass -->
      <div class="ticket-barcode-strip">
        <div class="ticket-barcode-lines"></div>
        <div class="ticket-barcode-serial">RACE PASS • VERIFIED PASI TIMING</div>
      </div>

      <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 14px;">
        <button class="btn btn-secondary btn-sm btn-view-ticket-detail" data-id="${ev.id}" ${isGlobalClosed ? 'disabled aria-disabled="true" title="Detail tiket tidak tersedia saat pendaftaran ditutup"' : 'title="Lihat Fasilitas & Rincian Lengkap"'} style="flex: 1;">
          <i class="fa-solid ${isGlobalClosed ? 'fa-lock' : 'fa-circle-info'}"></i> ${isGlobalClosed ? 'Detail Ditutup' : 'Detail Tiket'}
        </button>
        <button class="btn ${isClosed ? 'btn-secondary' : 'btn-primary btn-glow'} btn-sm btn-select-ticket" data-id="${ev.id}" ${isClosed ? 'disabled aria-disabled="true" title="Pendaftaran sedang ditutup"' : ''} style="flex: 1.3;">
          <i class="${isClosed ? 'fa-solid fa-lock' : 'fa-solid fa-ticket'}"></i> 
          ${isGlobalClosed ? 'SOLD' : (isClosed ? 'Ditutup' : 'Daftar Sekarang')}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Klik kartu tiket atau tombol detail mengarahkan ke halaman detail tiket resmi
  document.querySelectorAll('.ticket-card').forEach(card => {
    card.style.cursor = state.isGlobalClosed ? 'default' : 'pointer';
    card.addEventListener('click', (e) => {
      if (state.isGlobalClosed) return;
      if (e.target.closest('.btn-select-ticket')) return;
      const detailBtn = card.querySelector('.btn-view-ticket-detail');
      if (detailBtn) {
        const eventId = detailBtn.getAttribute('data-id');
        window.location.href = `/ticket-detail.html?id=${eventId}`;
      }
    });
  });

  document.querySelectorAll('.btn-view-ticket-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.isGlobalClosed) {
        e.preventDefault();
        return;
      }
      const eventId = btn.getAttribute('data-id');
      window.location.href = `/ticket-detail.html?id=${eventId}`;
    });
  });

  document.querySelectorAll('.btn-select-ticket').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const eventId = btn.getAttribute('data-id');
      const found = state.events.find(e => e.id === eventId);
      if (!state.isGlobalClosed && found && !found.isClosed) {
        openRegistrationModal(found);
      } else if (state.isGlobalClosed) {
        showToast('error', 'Pendaftaran Ditutup', 'Seluruh pendaftaran saat ini ditutup oleh panitia.');
      }
    });
  });
}

// =============================================================================
// MODAL DETAIL TIKET LENGKAP & RINCI
// =============================================================================
async function openTicketDetailModal(eventSummary) {
  openModal('ticketDetailModal');

  const titleEl = document.getElementById('tdModalTitle');
  const catEl = document.getElementById('tdModalCategory');
  const bodyEl = document.getElementById('ticketDetailBody');
  const regBtn = document.getElementById('tdModalRegisterBtn');

  if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--color-primary); margin-right: 8px;"></i> ${escapeHtml(eventSummary.ticketName)}`;
  if (catEl) catEl.textContent = `Kategori ${eventSummary.category} Marathon • Biaya ${formatRupiah(eventSummary.price)} / Peserta`;

  if (regBtn) {
    if (eventSummary.isClosed) {
      regBtn.disabled = true;
      regBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup';
    } else {
      regBtn.disabled = false;
      regBtn.innerHTML = `<i class="fa-solid fa-ticket"></i> Daftar Kategori ${eventSummary.category} Sekarang`;
      regBtn.onclick = () => {
        closeModal('ticketDetailModal');
        openRegistrationModal(eventSummary);
      };
    }
  }

  // Ambil detail lengkap dari backend (benefits, jerseys, bibConfig)
  const fullDetail = await apiClient.getEventDetail(eventSummary.id) || eventSummary;

  const is10k = fullDetail.category === '10K';
  const cot = is10k ? '2 Jam (Maksimal pukul 08:00 WIB)' : '1 Jam 15 Menit (Maksimal pukul 07:30 WIB)';
  const flagOff = is10k ? '06:00 WIB (Pagi)' : '06:15 WIB (Pagi)';

  // Format Benefits
  let benefitsListHtml = '';
  if (Array.isArray(fullDetail.benefits) && fullDetail.benefits.length > 0) {
    benefitsListHtml = fullDetail.benefits.map(b => `
      <div style="display: flex; gap: 12px; margin-bottom: 12px; background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 12px 14px;">
        <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--color-primary-subtle); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0;">
          <i class="fa-solid fa-check"></i>
        </div>
        <div>
          <strong style="color: var(--color-text-title); font-size: 0.92rem; display: block; margin-bottom: 2px;">${escapeHtml(b.name)}</strong>
          <p style="font-size: 0.82rem; color: var(--color-text-muted); margin: 0; line-height: 1.45;">${escapeHtml(b.description)}</p>
        </div>
      </div>
    `).join('');
  } else {
    benefitsListHtml = `
      <p style="font-size: 0.88rem; color: var(--color-text-muted);">
        Termasuk Medali Finisher Eksklusif, Jersey Lari Dry-Fit, Nomor Dada BIB Timing Chip, Refreshment, dan Asuransi Medis.
      </p>
    `;
  }

  // Format Jerseys
  let jerseysHtml = '';
  if (Array.isArray(fullDetail.jerseys) && fullDetail.jerseys.length > 0) {
    jerseysHtml = fullDetail.jerseys.map(j => {
      let sizesArr = [];
      try {
        sizesArr = Array.isArray(j.sizes) ? j.sizes : JSON.parse(j.sizes);
      } catch {
        sizesArr = ['S', 'M', 'L', 'XL'];
      }
      return `
        <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="font-size: 0.9rem; color: var(--color-text-title);"><i class="fa-solid fa-shirt" style="color: var(--color-primary); margin-right: 6px;"></i> ${escapeHtml(j.name)} (${j.type})</strong>
            <span class="badge" style="background: #FFFFFF; font-size: 0.75rem; border: 1px solid var(--color-border-subtle);">Official Merchandise</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted);">
            Ukuran Tersedia: <strong>${sizesArr.join(', ')}</strong>
          </div>
        </div>
      `;
    }).join('');
  } else {
    jerseysHtml = `
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 12px 14px;">
        <span style="font-size: 0.85rem; color: var(--color-text-title);"><strong>Official ${fullDetail.category} Jersey Dry-Fit</strong> (Pilihan Ukuran: XS, S, M, L, XL, XXL)</span>
      </div>
    `;
  }

  // Format BIB Config
  let bibFormat = is10k ? '10-XXXX (4 Digit Angka)' : '05-XXXX (4 Digit Angka)';
  if (fullDetail.bibConfig) {
    bibFormat = `Prefix: "${fullDetail.bibConfig.prefix}" • Panjang Digit: ${fullDetail.bibConfig.digitLength} • No. Awal: ${fullDetail.bibConfig.startNumber}`;
  }

  bodyEl.innerHTML = `
    <!-- Ringkasan Cepat -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 22px;">
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 12px; text-align: center;">
        <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Harga Tiket</span>
        <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary); margin-top: 2px;">${formatRupiah(fullDetail.price)}</div>
      </div>
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 12px; text-align: center;">
        <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Flag-Off Start</span>
        <div style="font-size: 1.05rem; font-weight: 800; color: var(--color-text-title); margin-top: 2px;">${flagOff}</div>
      </div>
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 12px; text-align: center;">
        <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Cut-Off Time (COT)</span>
        <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-title); margin-top: 4px;">${cot}</div>
      </div>
    </div>

    <!-- Fasilitas & Benefit Lengkap -->
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 1rem; font-weight: 800; color: var(--color-text-title); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-gift" style="color: var(--color-primary);"></i> Fasilitas & Benefit Peserta
      </h4>
      ${benefitsListHtml}
    </div>

    <!-- Jersey Resmi & Size -->
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 1rem; font-weight: 800; color: var(--color-text-title); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-shirt" style="color: var(--color-primary);"></i> Jersey Resmi Perlombaan
      </h4>
      ${jerseysHtml}
    </div>

    <!-- Nomor BIB & Timing Chip -->
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 1rem; font-weight: 800; color: var(--color-text-title); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-microchip" style="color: var(--color-primary);"></i> Format BIB & RFID Timing Chip
      </h4>
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 12px 14px; font-size: 0.85rem; color: var(--color-text-main);">
        Format Nomor Dada: <strong>${bibFormat}</strong>. Terpasang chip timing PASI untuk rekaman waktu presisi tinggi.
      </div>
    </div>

    <!-- Info Pengambilan Racepack & Lokasi -->
    <div style="background: rgba(255, 107, 0, 0.05); border: 1px solid var(--border-glass-orange); border-radius: var(--radius-md); padding: 14px;">
      <h5 style="color: var(--color-primary); font-size: 0.9rem; margin-bottom: 4px;"><i class="fa-solid fa-location-dot"></i> Pengambilan Race Pack & Syarat</h5>
      <p style="font-size: 0.8rem; color: var(--color-text-main); margin: 0; line-height: 1.5;">
        Pengambilan racepack: <strong>26–27 Februari 2027</strong> di Rita SuperMall Tegal Lantai 2 pukul 10:00 – 21:00 WIB. Wajib membawa e-tiket ber-barcode dan identitas KTP asli. Tidak dapat diambil pada hari perlombaan.
      </p>
    </div>
  `;
}

// =============================================================================
// 5. REGISTRATION MODAL LOGIC
// =============================================================================
function openRegistrationModal(selectedEvent = null) {
  if (state.isGlobalClosed) {
    showToast('error', 'Pendaftaran Ditutup', 'Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.');
    return;
  }

  // Hanya buka event yang tidak ditutup
  const availableEvents = state.events.filter(e => !e.isClosed);
  if (availableEvents.length === 0) {
    showToast('error', 'Pendaftaran Ditutup', 'Seluruh pendaftaran kategori event telah resmi ditutup oleh panitia.');
    return;
  }

  state.selectedEvent = (selectedEvent && !selectedEvent.isClosed) ? selectedEvent : availableEvents[0];
  state.currentStep = 1;
  state.participantCount = 1;

  const modal = document.getElementById('regModal');
  if (!modal) return;

  const eventSelect = document.getElementById('modalEventSelect');
  if (eventSelect) {
    eventSelect.innerHTML = availableEvents.map(ev => `
      <option value="${ev.id}" ${state.selectedEvent && state.selectedEvent.id === ev.id ? 'selected' : ''}>
        ${ev.ticketName} - ${formatRupiah(ev.price)}
      </option>
    `).join('');
  }

  updateModalSteps();
  renderParticipantForms();
  updateOrderPreview();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Sinkronkan data biaya layanan & timer terbaru dari backend / admin secara realtime
  apiClient.getCheckoutConfig().then(cfg => {
    if (cfg) {
      state.feeSettings = cfg;
      updateOrderPreview();
    }
  }).catch(() => {});
}

function closeRegistrationModal() {
  const modal = document.getElementById('regModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function updateModalSteps() {
  const steps = [1, 2, 3];
  steps.forEach(s => {
    const el = document.getElementById(`stepIndicator${s}`);
    const section = document.getElementById(`stepSection${s}`);
    if (el) {
      el.classList.remove('active', 'done');
      if (s === state.currentStep) el.classList.add('active');
      if (s < state.currentStep) el.classList.add('done');
    }
    if (section) {
      section.style.display = (s === state.currentStep) ? 'block' : 'none';
    }
  });

  const prevBtn = document.getElementById('btnModalPrev');
  const nextBtn = document.getElementById('btnModalNext');
  const submitBtn = document.getElementById('btnModalSubmit');

  if (prevBtn) prevBtn.style.display = (state.currentStep > 1) ? 'inline-flex' : 'none';
  if (nextBtn) nextBtn.style.display = (state.currentStep < 3) ? 'inline-flex' : 'none';
  if (submitBtn) submitBtn.style.display = (state.currentStep === 3) ? 'inline-flex' : 'none';
}

function calculateTotal() {
  const eventMap = new Map(state.events.map(e => [e.id, e]));

  let ticketsSubtotal = 0;
  for (let i = 0; i < state.participantCount; i++) {
    const pEventSelect = document.querySelector(`.p-event-select[data-index="${i}"]`);
    const evId = pEventSelect ? pEventSelect.value : state.selectedEvent?.id;
    const ev = eventMap.get(evId) || state.selectedEvent;
    if (ev) {
      ticketsSubtotal += Number(ev.price);
    }
  }

  let serviceFee = 0;
  if (state.feeSettings?.feeEnabled && state.feeSettings.feeAmount > 0) {
    if (state.feeSettings.feeType === 'PER_TICKET') {
      serviceFee = state.feeSettings.feeAmount * state.participantCount;
    } else {
      serviceFee = state.feeSettings.feeAmount;
    }
  }

  const grandTotal = ticketsSubtotal + serviceFee;
  return { ticketsSubtotal, serviceFee, grandTotal };
}

function updateOrderPreview() {
  if (!state.selectedEvent) return;

  const { ticketsSubtotal, serviceFee, grandTotal } = calculateTotal();

  const totalAmountEl = document.getElementById('modalTotalAmount');
  if (totalAmountEl) totalAmountEl.textContent = formatRupiah(grandTotal);

  const step1Sub = document.getElementById('step1TicketsSubtotal');
  const step1FeeLabel = document.getElementById('step1FeeLabel');
  const step1Fee = document.getElementById('step1FeeAmount');
  const step1Total = document.getElementById('step1GrandTotal');

  if (step1Sub) step1Sub.textContent = formatRupiah(ticketsSubtotal);
  if (step1Fee) {
    if (serviceFee > 0) {
      step1Fee.textContent = `+ ${formatRupiah(serviceFee)}`;
      step1Fee.style.color = '#EA580C';
      if (step1FeeLabel) {
        const feeType = state.feeSettings?.feeType || 'PER_TRANSACTION';
        step1FeeLabel.textContent = `Biaya Layanan (${feeType === 'PER_TICKET' ? 'Per Tiket' : 'Per Transaksi'}):`;
      }
    } else {
      step1Fee.textContent = 'Gratis (Rp 0)';
      step1Fee.style.color = '#10B981';
      if (step1FeeLabel) step1FeeLabel.textContent = 'Biaya Layanan:';
    }
  }
  if (step1Total) step1Total.textContent = formatRupiah(grandTotal);
}

function syncBookerToParticipant1() {
  const isChecked = document.getElementById('checkSameAsBooker')?.checked;
  if (!isChecked) return;

  const bookerName = document.getElementById('bookerName')?.value.trim() || '';
  const bookerPhone = document.getElementById('bookerPhone')?.value.trim() || '';

  const p1Name = document.querySelector('.p-fullname[data-index="0"]');
  const p1Phone = document.querySelector('.p-phone[data-index="0"]');
  const p1Bib = document.querySelector('.p-bibname[data-index="0"]');

  if (p1Name && bookerName) {
    p1Name.value = bookerName;
  }
  if (p1Bib && bookerName && !p1Bib.value) {
    p1Bib.value = bookerName.substring(0, 15).toUpperCase();
  }
  if (p1Phone && bookerPhone) {
    p1Phone.value = bookerPhone;
  }
}

function renderParticipantForms() {
  const container = document.getElementById('participantsContainer');
  if (!container) return;

  container.innerHTML = '';
  const availableEvents = state.events.filter(e => !e.isClosed);
  const defaultEventId = state.selectedEvent?.id || (availableEvents[0]?.id ?? '');

  for (let i = 0; i < state.participantCount; i++) {
    const pBox = document.createElement('div');
    pBox.className = 'participant-box';
    pBox.innerHTML = `
      <div class="participant-box-header">
        <h4><i class="fa-solid fa-user-tag"></i> Data Peserta #${i + 1}</h4>
        ${state.participantCount > 1 ? `<span class="badge">Peserta ${i + 1}</span>` : ''}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Kategori Lari / Tiket <span class="req">*</span></label>
          <select class="form-select p-event-select" required data-index="${i}">
            ${availableEvents.map(ev => `
              <option value="${ev.id}" ${ev.id === defaultEventId ? 'selected' : ''}>
                ${escapeHtml(ev.ticketName)} - ${formatRupiah(ev.price)}
              </option>
            `).join('')}
          </select>
          <div class="form-hint">Dapat memilih kategori lari berbeda untuk peserta ini.</div>
        </div>

        <div class="form-group">
          <label class="form-label">Nomor WhatsApp Peserta (Aktif) <span class="req">*</span></label>
          <input type="tel" class="form-input p-phone" required placeholder="Contoh: 081234567890" data-index="${i}">
          <div class="form-hint">Wajib nomor aktif untuk pengiriman QR E-Tiket pelari.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Lengkap (Sesuai KTP) <span class="req">*</span></label>
          <input type="text" class="form-input p-fullname" required placeholder="Contoh: Budi Santoso" data-index="${i}">
        </div>
        <div class="form-group">
          <label class="form-label">Nama BIB (Maks. 15 Karakter) <span class="req">*</span></label>
          <input type="text" maxlength="15" class="form-input p-bibname" required placeholder="Contoh: BUDI S" data-index="${i}">
          <div class="form-hint">Akan dicetak pada nomor dada Anda.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">NIK (16 Digit Angka) <span class="req">*</span></label>
          <input type="text" maxlength="16" class="form-input p-nik" required placeholder="3328xxxxxxxxxxxx" data-index="${i}">
          <div class="form-hint">Validasi KTP format resmi Disdukcapil (UU PDP).</div>
        </div>
        <div class="form-group">
          <label class="form-label">Jenis Kelamin <span class="req">*</span></label>
          <select class="form-select p-gender" required data-index="${i}">
            <option value="MALE">Laki-Laki</option>
            <option value="FEMALE">Perempuan</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Tempat Lahir <span class="req">*</span></label>
          <input type="text" class="form-input p-birthplace" required placeholder="Contoh: Tegal" data-index="${i}">
        </div>
        <div class="form-group">
          <label class="form-label">Tanggal Lahir <span class="req">*</span></label>
          <input type="date" class="form-input p-birthdate" required data-index="${i}">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Alamat Lengkap (Domisili KTP) <span class="req">*</span></label>
        <textarea rows="2" class="form-textarea p-address" required placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota" data-index="${i}"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Golongan Darah (Untuk Medis) <span class="req">*</span></label>
          <select class="form-select p-blood" required data-index="${i}">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O" selected>O</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Ukuran Jersey Resmi</label>
          <select class="form-select p-size" data-index="${i}">
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
          <input type="text" class="form-input p-emg-name" required placeholder="Nama Keluarga / Kerabat" data-index="${i}">
        </div>
        <div class="form-group">
          <label class="form-label">No. HP Kontak Darurat (Format +628) <span class="req">*</span></label>
          <input type="text" class="form-input p-emg-phone" required placeholder="+628123456789" data-index="${i}">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nama Komunitas Lari (Opsional)</label>
          <input type="text" class="form-input p-community" placeholder="Contoh: Tegal Runners Club" data-index="${i}">
        </div>
        <div class="form-group">
          <label class="form-label">Riwayat Penyakit / Alergi (Opsional)</label>
          <input type="text" class="form-input p-medical" placeholder="Asma, Alergi, dsb (Jika ada)" data-index="${i}">
        </div>
      </div>
    `;
    container.appendChild(pBox);

    // Pasang auto format telepon
    const phoneInput = pBox.querySelector('.p-phone');
    const emgPhoneInput = pBox.querySelector('.p-emg-phone');
    setupPhoneAutoFormat(phoneInput);
    setupPhoneAutoFormat(emgPhoneInput);

    // Listen event select perubahan harga
    pBox.querySelector('.p-event-select')?.addEventListener('change', () => {
      updateOrderPreview();
    });
  }

  // Auto-sync jika checkbox aktif
  syncBookerToParticipant1();
}

function validateStep(step) {
  if (step === 1) {
    const bookerName = document.getElementById('bookerName')?.value.trim();
    const bookerEmail = document.getElementById('bookerEmail')?.value.trim();
    const bookerPhone = document.getElementById('bookerPhone')?.value.trim();

    if (!bookerName || bookerName.length < 3) {
      showToast('error', 'Validasi Gagal', 'Nama pemesan minimal 3 karakter.');
      return false;
    }
    if (!bookerEmail || !bookerEmail.includes('@')) {
      showToast('error', 'Validasi Gagal', 'Email pemesan tidak valid.');
      return false;
    }
    if (!bookerPhone || !/^(\+62|62|08)\d{8,13}$/.test(bookerPhone.replace(/\s+/g, ''))) {
      showToast('error', 'Validasi Gagal', 'Nomor WhatsApp tidak valid (gunakan awalan 08 atau +628, min 10 digit).');
      return false;
    }

    // Jalankan sync ke Peserta #1 jika checkbox dicentang
    syncBookerToParticipant1();
    return true;
  }

  if (step === 2) {
    for (let i = 0; i < state.participantCount; i++) {
      const name = document.querySelector(`.p-fullname[data-index="${i}"]`)?.value.trim();
      const phone = document.querySelector(`.p-phone[data-index="${i}"]`)?.value.trim();
      const bib = document.querySelector(`.p-bibname[data-index="${i}"]`)?.value.trim();
      const nik = document.querySelector(`.p-nik[data-index="${i}"]`)?.value.trim();
      const birthPlace = document.querySelector(`.p-birthplace[data-index="${i}"]`)?.value.trim();
      const birthDate = document.querySelector(`.p-birthdate[data-index="${i}"]`)?.value.trim();
      const address = document.querySelector(`.p-address[data-index="${i}"]`)?.value.trim();
      const emgName = document.querySelector(`.p-emg-name[data-index="${i}"]`)?.value.trim();
      const emgPhone = document.querySelector(`.p-emg-phone[data-index="${i}"]`)?.value.trim();

      if (!name || name.length < 3) {
        showToast('error', `Peserta #${i + 1}`, 'Nama lengkap KTP minimal 3 karakter.');
        return false;
      }
      if (!phone || !/^(\+62|62|08)\d{7,12}$/.test(phone.replace(/\s+/g, ''))) {
        showToast('error', `Peserta #${i + 1}`, 'Nomor WhatsApp peserta wajib diisi (contoh: 08123456789 atau +628123456789).');
        return false;
      }
      if (!bib || bib.length > 15) {
        showToast('error', `Peserta #${i + 1}`, 'Nama BIB maksimal 15 karakter.');
        return false;
      }
      if (!nik || !/^\d{16}$/.test(nik)) {
        showToast('error', `Peserta #${i + 1}`, 'NIK harus tepat 16 digit angka sesuai KTP.');
        return false;
      }
      if (!birthPlace || birthPlace.length < 3) {
        showToast('error', `Peserta #${i + 1}`, 'Tempat lahir wajib diisi.');
        return false;
      }
      if (!birthDate) {
        showToast('error', `Peserta #${i + 1}`, 'Tanggal lahir wajib diisi.');
        return false;
      }
      if (!address || address.length < 10) {
        showToast('error', `Peserta #${i + 1}`, 'Alamat lengkap wajib diisi minimal 10 karakter.');
        return false;
      }
      if (!emgName || emgName.length < 3) {
        showToast('error', `Peserta #${i + 1}`, 'Nama kontak darurat wajib diisi.');
        return false;
      }
      if (!emgPhone || !/^(\+62|62|08)\d{7,12}$/.test(emgPhone.replace(/\s+/g, ''))) {
        showToast('error', `Peserta #${i + 1}`, 'Nomor kontak darurat harus diawali 08 atau +628.');
        return false;
      }
    }
    return true;
  }

  return true;
}

function updateSummaryReview() {
  const summaryBox = document.getElementById('summaryReviewBox');
  if (!summaryBox || !state.selectedEvent) return;

  const bookerName = document.getElementById('bookerName')?.value.trim();
  const bookerEmail = document.getElementById('bookerEmail')?.value.trim();
  const bookerPhone = document.getElementById('bookerPhone')?.value.trim();

  const { ticketsSubtotal, serviceFee, grandTotal } = calculateTotal();
  const eventMap = new Map(state.events.map(e => [e.id, e]));

  let participantsHtml = '';
  for (let i = 0; i < state.participantCount; i++) {
    const name = document.querySelector(`.p-fullname[data-index="${i}"]`)?.value.trim() || `Peserta #${i + 1}`;
    const evId = document.querySelector(`.p-event-select[data-index="${i}"]`)?.value || state.selectedEvent.id;
    const ev = eventMap.get(evId) || state.selectedEvent;
    const phone = document.querySelector(`.p-phone[data-index="${i}"]`)?.value.trim() || '-';

    participantsHtml += `
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 6px 0; border-bottom: 1px dotted #CBD5E1;">
        <div>
          <strong>#${i + 1} ${escapeHtml(name)}</strong> (${escapeHtml(phone)})<br>
          <span style="color: #64748B; font-size: 0.78rem;">Kategori: ${escapeHtml(ev.ticketName)}</span>
        </div>
        <span style="font-weight: 700; color: #0F172A;">${formatRupiah(ev.price)}</span>
      </div>
    `;
  }

  summaryBox.innerHTML = `
    <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 18px;">
      <h4 style="color: var(--color-primary); font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-receipt"></i> Ringkasan Tiket & Pemesan</h4>
      <p style="font-size: 0.88rem; margin-bottom: 4px;"><strong>Penanggung Jawab:</strong> ${escapeHtml(bookerName)}</p>
      <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 12px;">${escapeHtml(bookerEmail)} | ${escapeHtml(bookerPhone)}</p>

      <div style="margin-bottom: 14px;">
        <span style="font-size: 0.8rem; font-weight: 800; color: #475569; text-transform: uppercase;">Rincian Peserta:</span>
        <div style="margin-top: 6px;">
          ${participantsHtml}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 8px;">
        <span style="color: #64748B;">Subtotal Tiket:</span>
        <strong>${formatRupiah(ticketsSubtotal)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 4px; ${serviceFee > 0 ? 'color: #EA580C;' : 'color: #10B981;'}">
        <span>Biaya Layanan (${state.feeSettings?.feeType === 'PER_TICKET' ? 'Per Tiket' : 'Per Transaksi'}):</span>
        <strong>${serviceFee > 0 ? `+ ${formatRupiah(serviceFee)}` : 'Gratis (Rp 0)'}</strong>
      </div>
      <div style="border-top: 1px solid var(--color-border-subtle); margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: var(--color-text-title);">
        <span>Total Pembayaran:</span>
        <span style="color: var(--color-primary);">${formatRupiah(grandTotal)}</span>
      </div>
    </div>
  `;
}

// =============================================================================
// 6. CHECKOUT VIA BACKEND & MIDTRANS SNAP POPUP
// =============================================================================
async function handleCheckoutSubmit() {
  if (state.selectedEvent?.isClosed) {
    showToast('error', 'Pendaftaran Ditutup', 'Pendaftaran untuk kategori ini telah resmi ditutup.');
    return;
  }

  const consentPDP = document.getElementById('checkConsentPDP')?.checked;
  const consentWaiver = document.getElementById('checkConsentWaiver')?.checked;

  if (!consentPDP) {
    showToast('warning', 'Persetujuan Diperlukan', 'Harap setujui Pemrosesan Data Pribadi sesuai UU PDP No. 27/2022.');
    return;
  }
  if (!consentWaiver) {
    showToast('warning', 'Persetujuan Diperlukan', 'Harap setujui Pelepasan Tanggung Jawab Medis (Liability Waiver).');
    return;
  }

  const submitBtn = document.getElementById('btnModalSubmit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses Pesanan...';
  }

  const participants = [];
  for (let i = 0; i < state.participantCount; i++) {
    const eventId = document.querySelector(`.p-event-select[data-index="${i}"]`)?.value || state.selectedEvent.id;
    const fullNameKtp = document.querySelector(`.p-fullname[data-index="${i}"]`)?.value.trim();
    const phoneNumber = normalizePhone(document.querySelector(`.p-phone[data-index="${i}"]`)?.value.trim());
    const bibName = document.querySelector(`.p-bibname[data-index="${i}"]`)?.value.trim().toUpperCase();
    const nik = document.querySelector(`.p-nik[data-index="${i}"]`)?.value.trim();
    const gender = document.querySelector(`.p-gender[data-index="${i}"]`)?.value;
    const birthPlace = document.querySelector(`.p-birthplace[data-index="${i}"]`)?.value.trim();
    const birthDate = document.querySelector(`.p-birthdate[data-index="${i}"]`)?.value.trim();
    const fullAddress = document.querySelector(`.p-address[data-index="${i}"]`)?.value.trim();
    const bloodType = document.querySelector(`.p-blood[data-index="${i}"]`)?.value;
    const selectedSize = document.querySelector(`.p-size[data-index="${i}"]`)?.value;
    const emergencyContactName = document.querySelector(`.p-emg-name[data-index="${i}"]`)?.value.trim();
    const emergencyContactPhone = normalizePhone(document.querySelector(`.p-emg-phone[data-index="${i}"]`)?.value.trim());
    const communityName = document.querySelector(`.p-community[data-index="${i}"]`)?.value.trim() || null;
    const medicalHistory = document.querySelector(`.p-medical[data-index="${i}"]`)?.value.trim() || null;

    participants.push({
      eventId,
      fullNameKtp,
      phoneNumber,
      bibName,
      nik,
      gender,
      birthPlace,
      birthDate,
      fullAddress,
      bloodType,
      selectedSize,
      emergencyContactName,
      emergencyContactPhone,
      communityName,
      medicalHistory
    });
  }

  const bookerName = document.getElementById('bookerName')?.value.trim() || '';
  const bookerEmail = document.getElementById('bookerEmail')?.value.trim() || '';
  const bookerPhone = document.getElementById('bookerPhone')?.value.trim() || '';

  if (!bookerEmail || !bookerPhone) {
    showToast('warning', 'Data Pemesan Kurang', 'Harap lengkapi Nama, Email aktif, dan Nomor WhatsApp penanggung jawab.');
    return;
  }

  const payload = {
    bookerName,
    bookerEmail,
    bookerPhone,
    eventId: state.selectedEvent.id,
    participants
  };

  showToast('warning', 'Menghubungkan Server', 'Mengamankan slot tiket Anda ke sistem database...');

  const result = await apiClient.registerOrder(payload);

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)';
  }

  if (!result.success) {
    showToast('error', 'Gagal Memesan Tiket', result.message);
    return;
  }

  showToast('success', 'Slot Tiket Diamankan!', 'Membuka gerbang pembayaran resmi Midtrans Snap...');

  const { paymentToken, paymentUrl, orderId, midtransOrderId } = result.data;
  const targetId = orderId || midtransOrderId;

  try {
    await loadMidtransSdk();
  } catch (error) {
    showToast('error', 'Gateway Pembayaran Tidak Tersedia', error.message);
    window.location.href = `/payment.html?orderId=${encodeURIComponent(targetId)}`;
    return;
  }

  if (window.snap && typeof window.snap.pay === 'function') {
    window.snap.pay(paymentToken, {
      onSuccess: function () {
        showToast('success', 'Pembayaran Berhasil!', 'Selamat! Membuka E-Tiket resmi Anda...');
        closeRegistrationModal();
        loadEvents();
        setTimeout(() => {
          window.location.href = `/e-ticket.html?orderId=${targetId}`;
        }, 1200);
      },
      onPending: function () {
        showToast('warning', 'Menunggu Pembayaran', 'Mengarahkan ke halaman rincian instruksi pembayaran...');
        closeRegistrationModal();
        setTimeout(() => {
          window.location.href = `/payment.html?orderId=${targetId}`;
        }, 1200);
      },
      onError: function () {
        showToast('error', 'Pembayaran Gagal', 'Transaksi dibatalkan atau kedaluwarsa.');
      },
      onClose: function () {
        showToast('warning', 'Transaksi Tertunda', 'Mengarahkan ke halaman instruksi pembayaran & pembatalan...');
        setTimeout(() => {
          window.location.href = `/payment.html?orderId=${targetId}`;
        }, 1000);
      }
    });
  } else if (paymentUrl) {
    window.open(paymentUrl, '_blank');
  }
}

// =============================================================================
// 7. MODALS MANAGER
// =============================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// =============================================================================
// 7. LOAD DYNAMIC CMS WEBSITE SETTINGS, MAPS & MEDIA GAMBAR
// =============================================================================
function renderStatsBanner(items) {
  const banner = document.getElementById('statsBanner');
  if (!banner || !Array.isArray(items)) return;
  items = items.filter(item => item && typeof item === 'object' && item.visible !== false);

  banner.replaceChildren();
  banner.hidden = items.length === 0 || state.cmsVisibility.stats === false;

  const events = Array.isArray(state.events) ? state.events : [];
  const totals = events.reduce((result, event) => {
    result.participants += Number(event.registeredCount || 0);
    result.capacity += Number(event.stock || 0);
    result.available += Number(event.remainingStock ?? Math.max(0, Number(event.stock || 0) - Number(event.registeredCount || 0)));
    return result;
  }, { participants: 0, capacity: 0, available: 0 });

  const autoValues = {
    TOTAL_PARTICIPANTS: totals.participants,
    TOTAL_CATEGORIES: events.length,
    TOTAL_CAPACITY: totals.capacity,
    AVAILABLE_SLOTS: totals.available
  };

  items.forEach((item, index) => {
    const isAuto = item.type === 'AUTO' && Object.hasOwn(autoValues, item.autoKey);
    const rawValue = isAuto ? autoValues[item.autoKey] : item.val;
    const value = isAuto ? Number(rawValue || 0).toLocaleString('id-ID') : rawValue;
    const card = document.createElement('div');
    card.className = 'stat-item';
    const number = document.createElement('div');
    number.className = 'stat-num';
    if (index < 4) number.id = `statVal${index + 1}`;

    const valueEl = document.createElement('span');
    valueEl.textContent = value === undefined || value === null ? '' : String(value);
    const unitEl = document.createElement('small');
    unitEl.textContent = item.unit || '';
    if (index < 4) unitEl.id = `statUnit${index + 1}`;
    number.append(valueEl, document.createTextNode(' '), unitEl);

    const descEl = document.createElement('div');
    descEl.className = 'stat-desc';
    descEl.textContent = item.desc || '';
    if (index < 4) descEl.id = `statDesc${index + 1}`;
    card.append(number, descEl);
    banner.append(card);
  });
}

function renderRouteVisual(mapUrl, mapImage) {
  const visualCard = document.querySelector('#rute .route-visual-card');
  if (!visualCard) return;

  const source = String(mapUrl || '').trim();
  let embedUrl = '';
  if (source) {
    const srcMatch = source.match(/src=["']([^"']+)["']/i);
    const candidate = srcMatch?.[1] || source;
    try {
      const parsed = new URL(candidate);
      const host = parsed.hostname.toLowerCase();
      const allowedHost = host === 'google.com' || host.endsWith('.google.com') ||
        host === 'maps.app.goo.gl' || host === 'goo.gl';
      if (parsed.protocol === 'https:' && allowedHost) {
        embedUrl = host.endsWith('google.com') && parsed.pathname.startsWith('/maps/embed')
          ? parsed.href
          : `https://www.google.com/maps?q=${encodeURIComponent(candidate)}&output=embed`;
      }
    } catch (error) {
      console.warn('Link Google Maps CMS tidak valid:', error);
    }
  }

  visualCard.replaceChildren();
  const badge = document.createElement('div');
  badge.className = 'route-badge-float';
  badge.innerHTML = '<i class="fa-solid fa-location-dot"></i> Rute & Lokasi Google Maps';
  visualCard.append(badge);

  if (embedUrl) {
    const wrapper = document.createElement('div');
    wrapper.className = 'gmaps-responsive-wrapper';
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.title = 'Peta rute lari';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    wrapper.append(iframe);
    visualCard.append(wrapper);
  } else if (mapImage) {
    const image = document.createElement('img');
    image.className = 'route-map-image';
    image.src = mapImage;
    image.alt = 'Gambar peta rute lari';
    image.loading = 'lazy';
    visualCard.append(image);
  } else {
    const emptyState = document.createElement('p');
    emptyState.className = 'route-map-empty';
    emptyState.textContent = 'Peta rute belum tersedia.';
    visualCard.append(emptyState);
  }
}

async function loadWebsiteSettings() {
  try {
    const cms = await apiClient.getWebsiteSettings();
    if (!cms) return;
    let visibility = {};
    try {
      visibility = cms.cms_visibility ? JSON.parse(cms.cms_visibility) : {};
    } catch (error) {
      console.warn('Pengaturan visibilitas CMS tidak valid:', error);
    }
    state.cmsVisibility = visibility;
    const sectionVisibility = [
      ['beranda', 'hero'],
      ['rute', 'route'],
      ['fasilitas', 'facilities'],
      ['kategori', 'tickets'],
      ['legal', 'legal'],
    ];
    sectionVisibility.forEach(([elementId, key]) => {
      const element = document.getElementById(elementId);
      if (element && visibility[key] === false) element.hidden = true;
    });
    const statsBanner = document.getElementById('statsBanner');
    if (statsBanner && visibility.stats === false) statsBanner.hidden = true;
    document.querySelectorAll('.glass-footer').forEach(element => {
      if (visibility.footer === false) element.hidden = true;
    });

    // 1. Judul Website (Title Browser Tab)
    if (cms.site_title) {
      document.title = cms.site_title;
    }

    // 2. Hero Section
    const heroBadgeText = document.getElementById('heroStatusText') || document.querySelector('.hero-pill-badge span:not(.status-dot)');
    state.cmsHeroBadge = cms.hero_badge || '';
    if (heroBadgeText && state.cmsHeroBadge) heroBadgeText.textContent = state.cmsHeroBadge;
    applyRegistrationStatus();

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && cms.hero_title) {
      heroTitle.innerHTML = cms.hero_title.replace(/\n/g, '<br>');
    }

    const heroSubtitle = document.querySelector('.hero-desc');
    if (heroSubtitle && cms.hero_subtitle) {
      heroSubtitle.textContent = cms.hero_subtitle;
    }

    const heroDisplayImg = document.getElementById('heroDisplayImg');
    if (heroDisplayImg && cms.hero_bg_image) {
      heroDisplayImg.src = cms.hero_bg_image;
    }

    // Live Event Stats Banner
    let statsItems;
    try {
      statsItems = cms.stats_banner_items ? JSON.parse(cms.stats_banner_items) : null;
      if (!Array.isArray(statsItems)) statsItems = null;
    } catch (error) {
      console.warn('Data kartu statistik CMS tidak valid:', error);
      statsItems = null;
    }
    if (!statsItems) {
      statsItems = [1, 2, 3, 4].map((number) => ({
        type: 'CUSTOM',
        val: cms[`stat_${number}_val`] || '',
        unit: cms[`stat_${number}_unit`] || '',
        desc: cms[`stat_${number}_desc`] || ''
      })).filter(item => item.val || item.unit || item.desc);
    }
    state.cmsStatsItems = statsItems;
    renderStatsBanner(statsItems);

    const heroSection = document.getElementById('beranda');
    if (heroSection && cms.hero_bg_image) {
      heroSection.style.backgroundImage = `radial-gradient(circle at 10% 20%, rgba(255, 107, 0, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 107, 0, 0.05) 0%, transparent 40%), linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.98) 100%), url('${cms.hero_bg_image}')`;
      heroSection.style.backgroundSize = 'cover';
      heroSection.style.backgroundPosition = 'center';
    }

    // 3. Rute & Google Maps
    const routeSection = document.getElementById('rute');
    if (routeSection) {
      const routeTitle = document.getElementById('routeSectionTitle') || routeSection.querySelector('.section-title');
      if (routeTitle && typeof cms.route_title === 'string') {
        routeTitle.textContent = cms.route_title;
        routeTitle.hidden = !cms.route_title.trim();
      }

      const routeDesc = document.getElementById('routeSectionDesc') || routeSection.querySelector('.route-info-card > p');
      if (routeDesc && typeof cms.route_desc === 'string') {
        routeDesc.textContent = cms.route_desc;
        routeDesc.hidden = !cms.route_desc.trim();
      }

      const gpxBtn = document.getElementById('btnDownloadGpx');
      if (gpxBtn) {
        gpxBtn.hidden = !cms.route_gpx_url || cms.route_gpx_url === '#';
      }
      if (gpxBtn && cms.route_gpx_url) {
        gpxBtn.href = cms.route_gpx_url;
        if (cms.route_gpx_url === '#') {
          gpxBtn.onclick = (e) => {
            e.preventDefault();
            alert('File GPX Rute Tegal Run 2027 akan dapat diunduh pada H-14 perlombaan.');
          };
        } else if (/^https?:\/\//i.test(cms.route_gpx_url)) {
          gpxBtn.setAttribute('target', '_blank');
          gpxBtn.setAttribute('rel', 'noopener noreferrer');
          gpxBtn.onclick = null;
        } else {
          gpxBtn.removeAttribute('target');
          gpxBtn.removeAttribute('rel');
          gpxBtn.onclick = null;
        }
      }

      state.cmsRouteMapUrl = Object.hasOwn(cms, 'route_gmaps_url')
        ? cms.route_gmaps_url
        : (cms.gmaps_embed_url || '');
      state.cmsRouteMapImage = cms.route_map_image || '';
      renderRouteVisual(state.cmsRouteMapUrl, state.cmsRouteMapImage);
    }

    // 4. Fasilitas Section
    const facSection = document.getElementById('fasilitas');
    if (facSection) {
      const facTitle = facSection.querySelector('.section-title');
      if (facTitle && typeof cms.facilities_title === 'string') {
        facTitle.textContent = cms.facilities_title;
        facTitle.hidden = !cms.facilities_title.trim();
      }

      const facDesc = facSection.querySelector('.section-desc');
      if (facDesc && typeof cms.facilities_desc === 'string') {
        facDesc.textContent = cms.facilities_desc;
        facDesc.hidden = !cms.facilities_desc.trim();
      }
    }

    const facMedia = document.getElementById('facilitiesMedia');
    if (facMedia) {
      facMedia.hidden = !cms.facilities_image;
      if (cms.facilities_image) facMedia.src = cms.facilities_image;
    }

    const facContainer = document.getElementById('facilitiesContainer');
    if (facContainer) {
      const defaultFacilities = [
        { icon: 'fa-shirt', title: 'Jersey Running Dry-Fit', desc: 'Bahan mikro-pori cepat kering dengan sablon sublimasi awet dan nyaman untuk jarak jauh.' },
        { icon: 'fa-microchip', title: 'Nomor Dada (BIB) & Timing Chip', desc: 'Pencatatan waktu akurat berteknologi RFID transponder yang tersinkronisasi online.' },
        { icon: 'fa-medal', title: 'Medali Finisher Logam Cor', desc: 'Medali eksklusif cor tebal berlapis anti-karat untuk seluruh pelari yang finis sebelum COT.' },
        { icon: 'fa-bottle-water', title: 'Water & Isotonic Station', desc: 'Pos hidrasi setiap 2.5 KM dilengkapi air mineral steril, minuman isotonik, dan buah segar.' },
        { icon: 'fa-truck-medical', title: 'Tim Medis & Ambulans Mobile', desc: 'Standar medis PASI dengan pos pertolongan pertama terpadu dan ambulans standby di rute.' },
        { icon: 'fa-utensils', title: 'Refreshment & Finisher Feast', desc: 'Paket nutrisi pemulihan pasca finis berisi susu protein, kudapan sehat khas Tegal, dan buah segar.' }
      ];

      let configuredFacilities;
      try {
        configuredFacilities = cms.facilities_items ? JSON.parse(cms.facilities_items) : defaultFacilities;
      } catch (error) {
        console.warn('Data fasilitas CMS tidak valid:', error);
        configuredFacilities = defaultFacilities;
      }
      if (!Array.isArray(configuredFacilities)) configuredFacilities = defaultFacilities;
      facContainer.innerHTML = configuredFacilities.filter(f => f && typeof f === 'object' && f.visible !== false).map(f => `
        <div class="facility-card">
          <div class="facility-card-head">
            <div class="facility-icon-wrap">
              <i class="fa-solid ${escapeHtml(f.icon || 'fa-gift')}"></i>
            </div>
            <h4 class="facility-title">${escapeHtml(f.title || '')}</h4>
          </div>
          <p class="facility-desc">${escapeHtml(f.desc || '')}</p>
        </div>
      `).join('');
    }

    // 5. Tiket Section
    const ticketSection = document.getElementById('kategori');
    if (ticketSection) {
      const tTitle = ticketSection.querySelector('.section-title');
      if (tTitle && typeof cms.tickets_title === 'string') {
        tTitle.textContent = cms.tickets_title;
        tTitle.hidden = !cms.tickets_title.trim();
      }

      const tDesc = ticketSection.querySelector('.section-desc');
      if (tDesc && typeof cms.tickets_desc === 'string') {
        tDesc.textContent = cms.tickets_desc;
        tDesc.hidden = !cms.tickets_desc.trim();
      }
    }
    const ticketMedia = document.getElementById('ticketsCmsMedia');
    if (ticketMedia) {
      ticketMedia.hidden = !cms.medal_image;
      if (cms.medal_image) ticketMedia.src = cms.medal_image;
    }

    // 5.5. Legal Section
    const legalTitle = document.getElementById('legalSectionTitle');
    if (legalTitle && typeof cms.legal_title === 'string') {
      legalTitle.textContent = cms.legal_title;
      legalTitle.hidden = !cms.legal_title.trim();
    }
    const legalDesc = document.getElementById('legalSectionDesc');
    if (legalDesc && typeof cms.legal_desc === 'string') {
      legalDesc.textContent = cms.legal_desc;
      legalDesc.hidden = !cms.legal_desc.trim();
    }
    const legalGrid = document.getElementById('legalGridContainer');
    if (legalGrid) {
      let configuredLegal;
      try {
        configuredLegal = cms.legal_items ? JSON.parse(cms.legal_items) : null;
        if (!Array.isArray(configuredLegal)) configuredLegal = null;
      } catch (error) {
        console.warn('Data legalitas CMS tidak valid:', error);
        configuredLegal = null;
      }
      if (!configuredLegal) {
        configuredLegal = [1, 2, 3, 4].map((number, index) => ({
          icon: ['fa-certificate', 'fa-road-barrier', 'fa-shield-heart', 'fa-user-lock'][index],
          title: cms[`legal_item_${number}_title`] || '',
          desc: cms[`legal_item_${number}_desc`] || ''
        })).filter(item => item.title || item.desc);
      }
      configuredLegal = configuredLegal.filter(item => item && typeof item === 'object' && item.visible !== false);
      legalGrid.innerHTML = configuredLegal.map(item => `
        <div class="legal-item">
          <i class="fa-solid ${escapeHtml(item.icon || 'fa-certificate')}"></i>
          <h4>${escapeHtml(item.title || '')}</h4>
          <p>${escapeHtml(item.desc || '')}</p>
        </div>
      `).join('');
      legalGrid.hidden = configuredLegal.length === 0;
    }

    // 6. Footer & Kontak
    if (cms.contact_email) {
      document.querySelectorAll('.footer-email').forEach(el => el.textContent = cms.contact_email);
    }
    if (cms.contact_phone) {
      document.querySelectorAll('.footer-phone').forEach(el => el.textContent = cms.contact_phone);
    }
    if (cms.contact_address) {
      const addrEl = document.querySelector('.footer-address');
      if (addrEl) addrEl.textContent = cms.contact_address;
    }
    if (cms.footer_copyright) {
      const copyEl = document.querySelector('.footer-copyright-text') || document.querySelector('.footer-bottom > div:first-child');
      if (copyEl) copyEl.textContent = cms.footer_copyright;
    }
  } catch (err) {
    console.warn('Failed to apply website settings:', err);
  }
}

// =============================================================================
// 7b. LOAD ROUTE DATA FROM BACKEND
// =============================================================================
async function loadRouteData() {
  const container = document.getElementById('routeChecklistContainer');
  try {
    const data = await apiClient.getRouteOverview();
    if (!data) {
      if (container) container.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>';
      return;
    }

    if (!state.cmsRouteMapUrl) state.cmsRouteMapUrl = data.gmapsUrl || '';
    if (!state.cmsRouteMapImage) state.cmsRouteMapImage = data.routeMapImage || '';
    renderRouteVisual(state.cmsRouteMapUrl, state.cmsRouteMapImage);

    // Render checkpoint list
    if (container) {
      if (Array.isArray(data.points) && data.points.length > 0) {
        container.innerHTML = data.points.map((pt, i) => `
          <div class="route-point">
            <div class="route-point-marker">${String(i + 1).padStart(2, '0')}</div>
            <div class="route-point-content">
              <h4>${escapeHtml(pt.name)}${pt.distanceKm > 0 ? ` <small style="font-weight:500;color:#64748B;">— Km ${pt.distanceKm}</small>` : ''}</h4>
              <p>${escapeHtml(pt.description || '')}</p>
              ${pt.isWaterStation ? '<span class="route-tag" style="display:inline-block;margin-top:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#EFF6FF;color:#3B82F6;font-weight:600;">💧 Water Station</span>' : ''}
              ${pt.isMedicalSpot ? '<span class="route-tag" style="display:inline-block;margin-top:4px;margin-left:4px;font-size:0.75rem;padding:2px 8px;border-radius:20px;background:#F0FDF4;color:#16A34A;font-weight:600;">🏥 Pos Medis</span>' : ''}
            </div>
          </div>
        `).join('');
      } else {
        container.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>';
      }
    }
  } catch (err) {
    if (container) container.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Belum ada titik checkpoint rute yang tersimpan.</p>';
  }
}

function initNavbarDropdowns() {
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.getElementById('navMobileToggle');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  const setMobileMenuOpen = (isOpen) => {
    if (!navMenu || !mobileToggle) return;
    navMenu.classList.toggle('mobile-open', isOpen);
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  };

  mobileToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    setMobileMenuOpen(!navMenu?.classList.contains('mobile-open'));
  });

  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenuOpen(false));
  });

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.nav-dropdown-toggle');
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wasActive = dropdown.classList.contains('active');
      dropdowns.forEach(item => item.classList.remove('active'));
      dropdown.classList.toggle('active', !wasActive);
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    setMobileMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
      setMobileMenuOpen(false);
    }
  });
}

// =============================================================================
// 8. APP INITIALIZATION
// =============================================================================
function initApp() {
  initCountdown();
  loadCountdownSettings();
  loadWebsiteSettings();
  loadRouteData();
  loadEvents();
  initNavbarDropdowns();

  const realtimeSocket = connectRealtimeSocket();
  realtimeSocket.on('public:data_changed', ({ topics = [] } = {}) => {
    if (topics.includes('events')) refreshPublicEvents();
    if (topics.includes('countdown')) loadCountdownSettings();
    if (topics.includes('cms')) loadWebsiteSettings();
    if (topics.includes('routes')) loadRouteData();
  });
  window.addEventListener('realtime:reconnected', () => {
    Promise.all([refreshPublicEvents(), loadCountdownSettings(), loadWebsiteSettings(), loadRouteData()]);
  });

  // CTA Buttons
  const handleGeneralRegisterClick = async (e) => {
    if (e) e.preventDefault();
    if (state.isGlobalClosed) {
      showToast('error', 'Pendaftaran Ditutup', 'Mohon maaf, seluruh pendaftaran Tegal Run 2027 telah resmi ditutup oleh panitia.');
      return;
    }
    if (state.events.length > 0) {
      const openEvent = state.events.find(ev => !ev.isClosed) || state.events[0];
      openRegistrationModal(openEvent);
    } else {
      const ticketsSection = document.getElementById('kategori') || document.getElementById('ticketsSection');
      if (ticketsSection) ticketsSection.scrollIntoView({ behavior: 'smooth' });

      try {
        const events = await apiClient.getEvents();
        if (events && events.length > 0) {
          state.events = events;
          renderTickets(events);
          const openEvent = events.find(ev => !ev.isClosed) || events[0];
          openRegistrationModal(openEvent);
        }
      } catch (err) {
        showToast('error', 'Gagal Memuat Kategori', 'Gagal memuat kategori tiket. Pastikan server backend aktif.');
      }
    }
  };

  document.getElementById('heroCtaBtn')?.addEventListener('click', handleGeneralRegisterClick);
  document.getElementById('navDaftarBtn')?.addEventListener('click', handleGeneralRegisterClick);
  document.getElementById('dockDaftarBtn')?.addEventListener('click', handleGeneralRegisterClick);

  // Modal Close
  document.getElementById('modalCloseBtn')?.addEventListener('click', closeRegistrationModal);
  document.getElementById('regModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'regModal') closeRegistrationModal();
  });

  // Modal Category & Count Change
  document.getElementById('modalEventSelect')?.addEventListener('change', (e) => {
    const ev = state.events.find(x => x.id === e.target.value);
    if (ev) {
      state.selectedEvent = ev;
      renderParticipantForms();
      updateOrderPreview();
    }
  });

  document.getElementById('modalParticipantCount')?.addEventListener('change', (e) => {
    state.participantCount = parseInt(e.target.value, 10) || 1;
    renderParticipantForms();
    updateOrderPreview();
  });

  // Booker Phone Auto-format
  const bookerPhoneInput = document.getElementById('bookerPhone');
  if (bookerPhoneInput) {
    setupPhoneAutoFormat(bookerPhoneInput);
  }

  // Checkbox: Gunakan Data Penanggung Jawab sebagai Peserta #1
  document.getElementById('checkSameAsBooker')?.addEventListener('change', () => {
    syncBookerToParticipant1();
  });

  document.getElementById('bookerName')?.addEventListener('input', () => {
    syncBookerToParticipant1();
  });

  document.getElementById('bookerPhone')?.addEventListener('input', () => {
    syncBookerToParticipant1();
  });

  // Stepper Buttons
  document.getElementById('btnModalNext')?.addEventListener('click', () => {
    if (validateStep(state.currentStep)) {
      state.currentStep++;
      if (state.currentStep === 3) updateSummaryReview();
      updateModalSteps();
    }
  });

  document.getElementById('btnModalPrev')?.addEventListener('click', () => {
    if (state.currentStep > 1) {
      state.currentStep--;
      updateModalSteps();
    }
  });

  document.getElementById('btnModalSubmit')?.addEventListener('click', handleCheckoutSubmit);

  // Privacy Policy Modal Handlers
  const openPrivacy = () => openModal('privacyModal');
  document.getElementById('btnOpenPrivacyModal')?.addEventListener('click', openPrivacy);
  document.getElementById('footerPrivacyLink')?.addEventListener('click', openPrivacy);
  document.getElementById('privacyCloseBtn')?.addEventListener('click', () => closeModal('privacyModal'));
  document.getElementById('privacyOkBtn')?.addEventListener('click', () => closeModal('privacyModal'));

  // Terms & Conditions Modal Handlers
  const openTerms = () => openModal('termsModal');
  document.getElementById('btnOpenTerms')?.addEventListener('click', openTerms);
  document.getElementById('btnOpenTermsModal')?.addEventListener('click', openTerms);
  document.getElementById('footerTermsLink')?.addEventListener('click', openTerms);
  document.getElementById('footerWaiverLink')?.addEventListener('click', openTerms);
  document.getElementById('termsCloseBtn')?.addEventListener('click', () => closeModal('termsModal'));
  document.getElementById('termsOkBtn')?.addEventListener('click', () => closeModal('termsModal'));

  // Size Chart Modal Handlers
  document.getElementById('btnOpenSizeChart')?.addEventListener('click', () => openModal('sizeChartModal'));
  document.getElementById('sizeChartCloseBtn')?.addEventListener('click', () => closeModal('sizeChartModal'));
  document.getElementById('sizeChartOkBtn')?.addEventListener('click', () => closeModal('sizeChartModal'));

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      item.classList.toggle('active');
    });
  });

  // Mobile Bottom Dock Scroll Tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const dockLink = document.querySelector(`.mobile-bottom-dock a[href*="${sectionId}"]`);
      if (dockLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.mobile-bottom-dock a').forEach(a => a.classList.remove('active'));
          dockLink.classList.add('active');
        }
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
