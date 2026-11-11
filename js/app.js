import { apiClient, apiFetch, loadMidtransSdk } from './api.js';
import { connectRealtimeSocket } from './realtime.js';
import { applyWebsiteBranding } from './branding.js';

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
import comingSoonHtml from '../template/sections/coming-soon.html?raw';

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
    ${comingSoonHtml}
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
  manualRegistrationClosed: false,
  globalRegistrationPhase: 'UPCOMING',
  globalCountdownTarget: null,
  countdownTarget: null,
  countdownInterval: null,
  registrationTimerInterval: null,
  registrationDeadline: null,
  registrationWarningShown: false,
  checkoutSubmitting: false,
  registrationExpiredDuringSubmit: false,
  countdownSettingsLoaded: false,
  cmsHeroBadge: '',
  cmsStatsItems: null,
  cmsVisibility: {},
  cmsRouteMapUrl: '',
  cmsRouteMapImage: '',
  cmsRouteMapMode: 'GMAPS',
  cmsRouteCheckpointMode: 'MANUAL',
  cmsRouteCheckpointImage: '',
  cmsComingSoonTitle: 'COMING SOON EVENT!',
  cmsComingSoonMessage: 'Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!',
  cmsComingSoonImageUrl: '',
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

function getWibDateKey(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  return ['year', 'month', 'day']
    .map(type => parts.find(part => part.type === type)?.value)
    .join('-');
}

function getTimerPhase(targetDate, now = new Date()) {
  if (!targetDate || Number.isNaN(targetDate.getTime()) || now < targetDate) return 'UPCOMING';
  return getWibDateKey(now) === getWibDateKey(targetDate) ? 'RACE_DAY' : 'COMPLETED';
}

// =============================================================================
// 3. COUNTDOWN TIMER DINAMIS (DARI TANGGAL EVENT BACKEND)
// =============================================================================
function initCountdown(targetTimestamp = null) {
  if (targetTimestamp !== undefined) {
    state.countdownTarget = targetTimestamp;
  }

  const countdownBox = document.getElementById('heroCountdown');
  if (countdownBox) countdownBox.hidden = !Number.isFinite(state.countdownTarget);

  if (state.countdownInterval) {
    clearInterval(state.countdownInterval);
    state.countdownInterval = null;
  }

  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');
  const countdownGrid = countdownBox?.querySelector('.countdown-grid');

  if (!state.countdownTarget || !Number.isFinite(Number(state.countdownTarget))) {
    if (dEl) dEl.textContent = '--';
    if (hEl) hEl.textContent = '--';
    if (mEl) mEl.textContent = '--';
    if (sEl) sEl.textContent = '--';
    countdownGrid?.classList.remove('countdown-sold');
    return;
  }

  function update() {
    const now = new Date().getTime();
    const distance = state.countdownTarget - now;

    if (distance <= 0) {
      if (dEl) dEl.textContent = 'S';
      if (hEl) hEl.textContent = 'O';
      if (mEl) mEl.textContent = 'L';
      if (sEl) sEl.textContent = 'D';
      countdownGrid?.classList.add('countdown-sold');
      updateGlobalRegistrationState();
      if (getTimerPhase(new Date(state.countdownTarget)) === 'COMPLETED' && state.countdownInterval) {
        clearInterval(state.countdownInterval);
        state.countdownInterval = null;
      }
      return;
    }

    countdownGrid?.classList.remove('countdown-sold');
    updateGlobalRegistrationState();
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
  const countdownBox = document.getElementById('heroCountdown');
  try {
    const settings = await apiClient.getCountdownSettings();
    state.countdownSettingsLoaded = Boolean(settings?.eventCountdownDate);
    state.globalCountdownTarget = settings?.eventCountdownDate
      ? new Date(settings.eventCountdownDate).getTime()
      : null;
    if (settings && settings.eventCountdownDate) {
      const d = new Date(settings.eventCountdownDate);
      if (!isNaN(d.getTime())) {
        if (state.countdownTarget !== d.getTime()) initCountdown(d.getTime());
        if (countdownBox) countdownBox.hidden = false;

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
        if (countdownBox) countdownBox.hidden = true;
        state.countdownTarget = null;
        if (state.countdownInterval) {
          clearInterval(state.countdownInterval);
          state.countdownInterval = null;
        }
        displayEl.textContent = '';
        displayEl.classList.add('badge-pending-date');
      }
    } else if (displayEl) {
      if (countdownBox) countdownBox.hidden = true;
      state.countdownTarget = null;
      if (state.countdownInterval) {
        clearInterval(state.countdownInterval);
        state.countdownInterval = null;
      }
      displayEl.textContent = '';
      displayEl.classList.add('badge-pending-date');
    }

    if (settings) {
      state.manualRegistrationClosed = settings.manualRegistrationClosed === true
        || String(settings.manualRegistrationClosed).toLowerCase() === 'true';
      updateGlobalRegistrationState();
      applyRegistrationStatus();
      updateRegistrationCountdown();
    }
  } catch (err) {
    console.warn('Gagal memuat pengaturan countdown dari backend:', err);
    state.isGlobalClosed = true;
    state.manualRegistrationClosed = true;
    state.globalRegistrationPhase = 'CLOSED';
    state.globalCountdownTarget = null;
    applyRegistrationStatus();
    updateRegistrationCountdown();
    state.countdownTarget = null;
    if (state.countdownInterval) {
      clearInterval(state.countdownInterval);
      state.countdownInterval = null;
    }
    if (displayEl) {
      displayEl.textContent = '';
      displayEl.classList.add('badge-pending-date');
    }
    if (countdownBox) countdownBox.hidden = true;
  } finally {
    if (!state.countdownSettingsLoaded) {
      const eventDate = state.events
        .map(event => new Date(event.eventDate).getTime())
        .filter(timestamp => Number.isFinite(timestamp) && timestamp > Date.now())
        .sort((a, b) => a - b)[0];
      if (eventDate) initCountdown(eventDate);
    }
  }
}

function updateGlobalRegistrationState() {
  const globalDate = Number.isFinite(state.globalCountdownTarget)
    ? new Date(state.globalCountdownTarget)
    : null;
  const timerPhase = getTimerPhase(globalDate);
  state.globalRegistrationPhase = timerPhase === 'UPCOMING' && state.manualRegistrationClosed
    ? 'CLOSED'
    : timerPhase;
  state.isGlobalClosed = state.manualRegistrationClosed || timerPhase !== 'UPCOMING';
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

    state.events = result.data;
    const heroCta = document.getElementById('heroCtaBtn');
    if (heroCta) heroCta.hidden = result.data.length === 0;
    renderTickets(result.data);
    renderStatsBanner(state.cmsStatsItems);

    if (!state.countdownSettingsLoaded) {
      const eventDates = result.data
        .map(event => new Date(event.eventDate).getTime())
        .filter(timestamp => Number.isFinite(timestamp) && timestamp > Date.now())
        .sort((a, b) => a - b);
      if (eventDates.length > 0 && eventDates[0] !== state.countdownTarget) {
        initCountdown(eventDates[0]);
      }
    }

    if (state.selectedEvent) {
      const selectedEvent = result.data.find(event => event.id === state.selectedEvent.id);
      const selectedCategoryClosed = [...document.querySelectorAll('.p-event-select')]
        .some(select => {
          const event = result.data.find(item => item.id === select.value);
          return !event || isEventRegistrationClosed(event);
        });
      if (!selectedEvent || isEventRegistrationClosed(selectedEvent) || selectedCategoryClosed) {
        if (state.checkoutSubmitting) {
          state.registrationExpiredDuringSubmit = true;
          const timerMessage = document.getElementById('registrationTimerMessage');
          const timerValue = document.getElementById('registrationTimeRemaining');
          if (timerMessage) timerMessage.textContent = 'Kategori ditutup — memeriksa pendaftaran';
          if (timerValue) timerValue.textContent = '—';
          return;
        }
        stopRegistrationCountdown();
        closeRegistrationModal();
        showToast('warning', 'Kategori Ditutup', 'Pendaftaran kategori ini ditutup saat formulir Anda terbuka. Isian belum dikirim.');
      } else {
        state.selectedEvent = selectedEvent;
        updateRegistrationCountdown();
      }
    }
  } catch (error) {
    console.warn('Gagal memperbarui daftar event publik:', error);
  }
}

function applyRegistrationStatus() {
  const statusBadge = document.getElementById('heroStatusBadge');
  const statusText = document.getElementById('heroStatusText');
  const statusDot = statusBadge?.querySelector('.status-dot');
  const ctaBtn = document.getElementById('heroCtaBtn');
  const navBtn = document.getElementById('navDaftarBtn');
  const dockBtn = document.getElementById('dockDaftarBtn');
  const allCategoriesClosed = state.events.length > 0
    && state.events.every(isEventRegistrationClosed);

  if (state.isGlobalClosed || allCategoriesClosed) {
    const status = state.isGlobalClosed
      ? state.globalRegistrationPhase === 'RACE_DAY'
        ? { label: 'ACARA TELAH DIMULAI', color: '#F97316', icon: 'fa-flag-checkered' }
        : state.globalRegistrationPhase === 'COMPLETED'
          ? { label: 'EVENT TELAH SELESAI • SOLD', color: '#EF4444', icon: 'fa-ticket-slash' }
          : { label: 'PENDAFTARAN RESMI DITUTUP', color: '#EF4444', icon: 'fa-lock' }
      : { label: 'PENDAFTARAN KATEGORI DITUTUP', color: '#EF4444', icon: 'fa-lock' };
    if (statusBadge) {
      statusBadge.hidden = false;
      statusBadge.style.borderColor = status.color;
    }
    if (statusText) {
      statusText.textContent = status.label;
      statusText.style.color = status.color;
    }
    if (statusDot) {
      statusDot.style.background = status.color;
      statusDot.style.boxShadow = `0 0 8px ${status.color}`;
    }
    if (ctaBtn) {
      ctaBtn.disabled = true;
      ctaBtn.classList.remove('btn-glow');
      ctaBtn.innerHTML = `<i class="fa-solid ${status.icon}"></i> ${status.label}`;
    }
    if (navBtn) {
      navBtn.disabled = true;
      navBtn.classList.remove('btn-glow');
      navBtn.innerHTML = `<i class="fa-solid ${status.icon}"></i> ${status.label}`;
    }
    if (dockBtn) {
      dockBtn.style.opacity = '0.6';
      dockBtn.style.pointerEvents = 'none';
    }
    if (state.events.length) renderTickets(state.events);
    return;
  }

  if (statusBadge) {
    statusBadge.hidden = false;
    statusBadge.style.borderColor = '';
  }
  if (statusText) {
    statusText.textContent = state.cmsHeroBadge || 'PENDAFTARAN RESMI DIBUKA';
    statusText.style.color = '';
  }
  if (statusDot) {
    statusDot.style.background = '';
    statusDot.style.boxShadow = '';
  }
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
    state.events = Array.isArray(events) ? events : [];
    const heroCta = document.getElementById('heroCtaBtn');
    if (heroCta) heroCta.hidden = state.events.length === 0;
    applyRegistrationStatus();
    renderStatsBanner(state.cmsStatsItems);

    if (!state.countdownTarget && !state.countdownSettingsLoaded) {
      const eventDates = state.events
        .map(event => new Date(event.eventDate).getTime())
        .filter(timestamp => Number.isFinite(timestamp) && timestamp > Date.now())
        .sort((a, b) => a - b);
      if (eventDates.length > 0) initCountdown(eventDates[0]);
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
      if (targetEvent && !isEventRegistrationClosed(targetEvent) && !state.isGlobalClosed) {
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
    const currentStock = Number(ev.remainingStock ?? ev.stock ?? 0);
    const totalCapacity = Number(ev.totalCapacity ?? (currentStock + Number(ev.registeredCount || 0)));
    const percentage = totalCapacity > 0 ? Math.max(0, Math.min(100, Math.round((currentStock / totalCapacity) * 100))) : 0;
    const isGlobalClosed = state.isGlobalClosed;
    const eventPhase = ev.registrationPhase || (ev.eventDate ? getTimerPhase(new Date(ev.eventDate)) : 'UPCOMING');
    const eventDateClosed = typeof ev.registrationClosedByTimer === 'boolean'
      ? ev.registrationClosedByTimer
      : eventPhase === 'RACE_DAY' || eventPhase === 'COMPLETED';
    const categoryClosed = typeof ev.registrationClosed === 'boolean'
      ? ev.registrationClosed
      : Boolean(ev.isClosed) || eventDateClosed;
    const isClosed = categoryClosed || isGlobalClosed;
    const globalStatusLabel = state.globalRegistrationPhase === 'RACE_DAY'
      ? 'ACARA TELAH DIMULAI'
      : state.globalRegistrationPhase === 'COMPLETED'
        ? 'SOLD'
        : 'PENDAFTARAN DITUTUP';
    const closedStatusLabel = isGlobalClosed
      ? globalStatusLabel
      : eventPhase === 'RACE_DAY'
        ? 'ACARA TELAH DIMULAI'
        : eventPhase === 'COMPLETED'
          ? 'SOLD'
          : 'PENDAFTARAN DITUTUP';
    const eventDateLabel = ev.eventDate
      ? `${new Date(ev.eventDate).toLocaleString('id-ID', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'Asia/Jakarta'
      })} WIB`
      : '';
    const closedPhase = isGlobalClosed ? state.globalRegistrationPhase : eventPhase;

    const card = document.createElement('div');
    card.className = `glass-card ticket-card ticket-pass-card ${is10k ? 'featured' : ''} ${isClosed ? 'event-closed-card ticket-sale-closed' : ''} ${isGlobalClosed ? 'global-registration-closed' : ''} ${isClosed ? `registration-phase-${closedPhase.toLowerCase()}` : ''}`;

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
          ${closedStatusLabel === 'SOLD'
            ? '<span class="global-sold-stamp"><i class="fa-solid fa-ticket-slash"></i> SOLD</span>'
            : (isClosed
              ? `<span class="global-closed-stamp"><i class="${eventPhase === 'RACE_DAY' || state.globalRegistrationPhase === 'RACE_DAY' ? 'fa-solid fa-flag-checkered' : 'fa-solid fa-lock'}"></i> ${escapeHtml(closedStatusLabel)}</span>`
              : (is10k ? '<span style="color:#ff6b00;"><i class="fa-solid fa-fire"></i> POPULAR</span>' : '<span>OFFICIAL PASS</span>'))}
        </div>
      </div>

      ${bannerHtml}

      <div class="ticket-header">
        <span class="ticket-category-tag">${escapeHtml(ev.category)} MARATHON PASS</span>
        <h3 class="ticket-title">${escapeHtml(ev.ticketName)}</h3>
        ${eventDateLabel ? `<div class="ticket-event-date"><i class="fa-regular fa-calendar-check"></i> ${escapeHtml(eventDateLabel)}${ev.followGlobalTimer ? '<span><i class="fa-solid fa-link"></i> Timer Global</span>' : ''}</div>` : ''}
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
            ${isClosed ? escapeHtml(closedStatusLabel) : `${currentStock} Tiket Tersedia`}
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

      <div class="ticket-pass-actions" style="display: flex; gap: 8px; margin-top: auto; padding-top: 14px;">
        <button class="btn btn-secondary btn-sm btn-view-ticket-detail" data-id="${ev.id}" ${isGlobalClosed ? 'disabled aria-disabled="true" title="Detail tiket tidak tersedia saat pendaftaran ditutup"' : 'title="Lihat Fasilitas & Rincian Lengkap"'} style="flex: 1;">
          <i class="fa-solid ${isGlobalClosed ? 'fa-lock' : 'fa-circle-info'}"></i> ${isGlobalClosed ? 'Detail Ditutup' : 'Detail Tiket'}
        </button>
        <button class="btn ${isClosed ? 'btn-secondary' : 'btn-primary btn-glow'} btn-sm btn-select-ticket" data-id="${ev.id}" ${isClosed ? 'disabled aria-disabled="true" title="Pendaftaran sedang ditutup"' : ''} style="flex: 1.3;">
          <i class="${isClosed ? 'fa-solid fa-lock' : 'fa-solid fa-ticket'}"></i> 
          ${isClosed ? escapeHtml(closedStatusLabel) : 'Daftar Sekarang'}
        </button>
      </div>
    `;

    if (isClosed && closedStatusLabel !== 'SOLD') {
      card.insertAdjacentHTML('beforeend', '<span class="global-sold-stamp"><i class="fa-solid fa-ticket-slash"></i> SOLD</span>');
    }

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
function isEventRegistrationClosed(event) {
  if (typeof event?.registrationClosed === 'boolean') return event.registrationClosed;
  return Boolean(event?.isClosed)
    || getTimerPhase(event?.eventDate ? new Date(event.eventDate) : null) !== 'UPCOMING';
}

function getRegistrationDeadline() {
  const deadlines = [];
  if (Number.isFinite(state.globalCountdownTarget)) {
    deadlines.push(state.globalCountdownTarget);
  }

  const eventIds = new Set([state.selectedEvent?.id]);
  document.querySelectorAll('.p-event-select').forEach(select => eventIds.add(select.value));
  eventIds.delete(undefined);
  for (const id of eventIds) {
    const event = state.events.find(item => item.id === id);
    const date = event?.eventDate ? new Date(event.eventDate).getTime() : NaN;
    if (Number.isFinite(date)) deadlines.push(date);
  }

  return deadlines.length ? Math.min(...deadlines) : null;
}

function getSelectedRegistrationEvents() {
  const eventIds = new Set([state.selectedEvent?.id]);
  document.querySelectorAll('.p-event-select').forEach(select => eventIds.add(select.value));
  eventIds.delete(undefined);
  return [...eventIds]
    .map(id => state.events.find(event => event.id === id))
    .filter(Boolean);
}

function formatRegistrationTimeLeft(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);
  const clock = [hours, minutes, seconds].map(value => String(value).padStart(2, '0')).join(':');
  return days > 0 ? `${days} hari ${clock}` : clock;
}

function stopRegistrationCountdown() {
  if (state.registrationTimerInterval) {
    clearInterval(state.registrationTimerInterval);
    state.registrationTimerInterval = null;
  }
  state.registrationDeadline = null;
}

function updateRegistrationCountdown() {
  const modal = document.getElementById('regModal');
  const timer = document.getElementById('registrationTimeRemaining');
  const message = document.getElementById('registrationTimerMessage');
  const submitBtn = document.getElementById('btnModalSubmit');
  if (!modal?.classList.contains('active') || !timer || !message) return;

  const deadline = getRegistrationDeadline();
  state.registrationDeadline = deadline;
  if (state.isGlobalClosed || getSelectedRegistrationEvents().some(isEventRegistrationClosed)) {
    if (state.checkoutSubmitting) {
      state.registrationExpiredDuringSubmit = true;
      message.textContent = 'Batas pendaftaran tercapai — memeriksa status';
      timer.textContent = '—';
      if (submitBtn) submitBtn.disabled = true;
      return;
    }
    stopRegistrationCountdown();
    closeRegistrationModal();
    showToast('warning', 'Pendaftaran Ditutup', 'Waktu pendaftaran telah berakhir. Formulir Anda dibatalkan dan belum dikirim.');
    return;
  }

  if (!Number.isFinite(deadline)) {
    timer.textContent = '—';
    message.textContent = 'Batas waktu pendaftaran belum ditentukan';
    timer.classList.remove('urgent');
    return;
  }

  const remaining = deadline - Date.now();
  if (remaining <= 0) {
    if (state.checkoutSubmitting) {
      state.registrationExpiredDuringSubmit = true;
      message.textContent = 'Batas pendaftaran tercapai — memeriksa status';
      timer.textContent = '—';
      timer.classList.add('urgent');
      if (submitBtn) submitBtn.disabled = true;
      return;
    }
    stopRegistrationCountdown();
    if (submitBtn) submitBtn.disabled = true;
    closeRegistrationModal();
    showToast('warning', 'Pendaftaran Berakhir', 'Waktu pendaftaran telah habis. Formulir Anda dibatalkan dan belum dikirim.');
    return;
  }

  timer.textContent = formatRegistrationTimeLeft(remaining);
  timer.classList.toggle('urgent', remaining < 10 * 60 * 1000);
  message.textContent = remaining < 10 * 60 * 1000
    ? 'Pendaftaran akan segera ditutup'
    : 'Sisa waktu pendaftaran';

  if (remaining < 10 * 60 * 1000 && !state.registrationWarningShown) {
    state.registrationWarningShown = true;
    showToast('warning', 'Pendaftaran Hampir Ditutup', 'Waktu pendaftaran tersisa kurang dari 10 menit. Selesaikan formulir dan lanjutkan pembayaran segera.');
  }
}

function startRegistrationCountdown() {
  stopRegistrationCountdown();
  state.registrationWarningShown = false;
  state.registrationExpiredDuringSubmit = false;
  updateRegistrationCountdown();
  if (document.getElementById('regModal')?.classList.contains('active')) {
    state.registrationTimerInterval = setInterval(updateRegistrationCountdown, 1000);
  }
}

function openRegistrationModal(selectedEvent = null) {
  if (state.isGlobalClosed) {
    const message = state.globalRegistrationPhase === 'RACE_DAY'
      ? 'Pendaftaran ditutup otomatis karena acara telah dimulai.'
      : state.globalRegistrationPhase === 'COMPLETED'
        ? 'Pendaftaran ditutup karena hari pelaksanaan acara telah lewat.'
        : 'Seluruh pendaftaran Tegal Run 2027 telah ditutup oleh panitia.';
    showToast('error', 'Pendaftaran Ditutup', message);
    return;
  }

  // Hanya buka event yang tidak ditutup
  const availableEvents = state.events.filter(e => !isEventRegistrationClosed(e));
  if (availableEvents.length === 0) {
    const timerClosed = state.events.some(event => typeof event.registrationClosedByTimer === 'boolean'
      ? event.registrationClosedByTimer
      : getTimerPhase(event.eventDate ? new Date(event.eventDate) : null) !== 'UPCOMING');
    showToast(
      'error',
      'Pendaftaran Ditutup',
      timerClosed
        ? 'Tanggal pelaksanaan seluruh kategori telah tiba atau lewat. Ubah tanggal kategori atau sinkronkan dengan timer global di halaman admin.'
        : 'Seluruh pendaftaran kategori event telah ditutup oleh panitia.'
    );
    return;
  }

  state.selectedEvent = (selectedEvent && !isEventRegistrationClosed(selectedEvent)) ? selectedEvent : availableEvents[0];
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
  startRegistrationCountdown();

  // Sinkronkan data biaya layanan & timer terbaru dari backend / admin secara realtime
  apiClient.getCheckoutConfig().then(cfg => {
    if (cfg) {
      state.feeSettings = cfg;
      updateOrderPreview();
    }
  }).catch(() => {});
}

function closeRegistrationModal() {
  stopRegistrationCountdown();
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
  const availableEvents = state.events.filter(e => !isEventRegistrationClosed(e));
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
        <div class="form-group p-jersey-fields" data-index="${i}"></div>
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
    const eventSelect = pBox.querySelector('.p-event-select');
    renderParticipantJerseyFields(pBox, i, eventSelect?.value || defaultEventId);
    eventSelect?.addEventListener('change', () => {
      renderParticipantJerseyFields(pBox, i, eventSelect.value);
      updateOrderPreview();
    });
  }

  // Auto-sync jika checkbox aktif
  syncBookerToParticipant1();
}

function getConfiguredJerseySizes(jersey) {
  if (Array.isArray(jersey?.sizes)) return jersey.sizes.filter(size => typeof size === 'string' && size.trim());
  if (typeof jersey?.sizes === 'string') {
    try {
      const sizes = JSON.parse(jersey.sizes);
      return Array.isArray(sizes) ? sizes.filter(size => typeof size === 'string' && size.trim()) : [];
    } catch (error) {
      console.warn('Ukuran jersey dari backend tidak valid:', error);
    }
  }
  return [];
}

function renderParticipantJerseyFields(participantBox, index, eventId, selectedJerseyId = '', selectedSize = '') {
  const container = participantBox.querySelector('.p-jersey-fields');
  if (!container) return;
  const event = state.events.find(item => item.id === eventId);
  const jerseys = Array.isArray(event?.jerseys) ? event.jerseys : [];

  if (jerseys.length === 0) {
    container.innerHTML = `
      <label class="form-label" for="participantSize-${index}">Ukuran Jersey Resmi</label>
      <select class="form-select p-size" id="participantSize-${index}" data-index="${index}">
        <option value="XS">XS (46 x 66 cm)</option>
        <option value="S">S (48 x 68 cm)</option>
        <option value="M" selected>M (50 x 70 cm)</option>
        <option value="L">L (52 x 72 cm)</option>
        <option value="XL">XL (54 x 74 cm)</option>
        <option value="XXL">XXL (56 x 76 cm)</option>
      </select>
      <div class="form-hint">Ukuran jersey standar event.</div>
    `;
    return;
  }

  const selectedJersey = jerseys.find(jersey => jersey.id === selectedJerseyId) || jerseys[0];
  const sizes = getConfiguredJerseySizes(selectedJersey);
  const typeControl = jerseys.length > 1
    ? `<label class="form-label" for="participantJersey-${index}">Tipe Jersey</label>
       <select class="form-select p-jersey" id="participantJersey-${index}" data-index="${index}" required>
         ${jerseys.map(jersey => `<option value="${escapeHtml(jersey.id)}" ${jersey.id === selectedJersey.id ? 'selected' : ''}>${escapeHtml(jersey.name)} — ${escapeHtml(jersey.type)}</option>`).join('')}
       </select>`
    : `<input type="hidden" class="p-jersey-id" data-index="${index}" value="${escapeHtml(selectedJersey.id)}">
       <label class="form-label">Tipe Jersey</label>
       <div class="participant-jersey-type"><i class="fa-solid fa-shirt" aria-hidden="true"></i> ${escapeHtml(selectedJersey.name)} — ${escapeHtml(selectedJersey.type)}</div>`;
  const jerseyImage = selectedJersey.image
    ? `<img class="participant-jersey-preview" src="${escapeHtml(selectedJersey.image)}" alt="Pratinjau ${escapeHtml(selectedJersey.name)}" loading="lazy" onerror="this.hidden=true">`
    : '';

  container.innerHTML = `
    ${typeControl}
    <label class="form-label" for="participantSize-${index}" style="margin-top:8px;">Ukuran Jersey Resmi</label>
    <select class="form-select p-size" id="participantSize-${index}" data-index="${index}" required ${sizes.length ? '' : 'disabled'}>
      ${sizes.map(size => `<option value="${escapeHtml(size)}" ${size === selectedSize ? 'selected' : ''}>${escapeHtml(size)}</option>`).join('')}
    </select>
    ${sizes.length ? '' : '<div class="form-hint">Ukuran untuk tipe ini belum tersedia. Hubungi panitia.</div>'}
    ${jerseyImage}
  `;

  container.querySelector('.p-jersey')?.addEventListener('change', event => {
    const currentSize = container.querySelector('.p-size')?.value || '';
    renderParticipantJerseyFields(participantBox, index, eventId, event.target.value, currentSize);
  });
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
  const registrationDeadline = getRegistrationDeadline();
  if (state.isGlobalClosed
    || getSelectedRegistrationEvents().some(isEventRegistrationClosed)
    || (Number.isFinite(registrationDeadline) && Date.now() >= registrationDeadline)) {
    updateRegistrationCountdown();
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
    const jerseyId = document.querySelector(`.p-jersey[data-index="${i}"]`)?.value
      || document.querySelector(`.p-jersey-id[data-index="${i}"]`)?.value
      || null;
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
      jerseyId,
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

  const submitBtn = document.getElementById('btnModalSubmit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses Pesanan...';
  }

  showToast('warning', 'Menghubungkan Server', 'Mengamankan slot tiket Anda ke sistem database...');

  state.checkoutSubmitting = true;
  state.registrationExpiredDuringSubmit = false;
  const result = await apiClient.registerOrder(payload);
  state.checkoutSubmitting = false;

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-credit-card"></i> Bayar Sekarang (Midtrans)';
  }

  if (!result.success) {
    if (state.registrationExpiredDuringSubmit
      || (Number.isFinite(state.registrationDeadline) && Date.now() >= state.registrationDeadline)
      || state.isGlobalClosed
      || getSelectedRegistrationEvents().some(isEventRegistrationClosed)) {
      closeRegistrationModal();
      showToast('warning', 'Pendaftaran Berakhir', result.message || 'Waktu pendaftaran telah habis. Formulir Anda dibatalkan.');
      return;
    }
    showToast('error', 'Gagal Memesan Tiket', result.message);
    return;
  }

  stopRegistrationCountdown();
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
  const events = Array.isArray(state.events) ? state.events : [];
  items = items.filter(item => {
    if (!item || typeof item !== 'object' || item.visible === false) return false;
    const hasLabel = Boolean(String(item.unit || item.desc || '').trim());
    if (!hasLabel) return false;
    if (item.type === 'AUTO') {
      return ['TOTAL_PARTICIPANTS', 'PAID_PARTICIPANTS', 'TOTAL_CATEGORIES', 'TOTAL_CAPACITY', 'AVAILABLE_SLOTS'].includes(item.autoKey);
    }
    return String(item.val ?? '').trim() !== '';
  });

  banner.replaceChildren();
  banner.hidden = items.length === 0 || state.cmsVisibility.stats === false;

  const totals = events.reduce((result, event) => {
    result.participants += Number(event.registeredCount || 0);
    result.paid += Number(event.paidCount || 0);
    result.capacity += Number(event.totalCapacity ?? (Number(event.remainingStock ?? event.stock ?? 0) + Number(event.registeredCount || 0)));
    result.available += Number(event.remainingStock ?? event.stock ?? 0);
    return result;
  }, { participants: 0, paid: 0, capacity: 0, available: 0 });

  const autoValues = {
    TOTAL_PARTICIPANTS: totals.participants,
    PAID_PARTICIPANTS: totals.paid,
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
    const iconName = typeof item.icon === 'string' && /^[a-z0-9-]+$/.test(item.icon) ? item.icon : 'fa-chart-simple';
    const iconWrap = document.createElement('span');
    iconWrap.className = 'stat-icon';
    const icon = document.createElement('i');
    icon.className = `fa-solid ${iconName}`;
    icon.setAttribute('aria-hidden', 'true');
    iconWrap.append(icon);
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
    card.append(iconWrap, number, descEl);
    banner.append(card);
  });
}

function renderRouteVisual(mapUrl, mapImage) {
  const visualCard = document.querySelector('#rute .route-visual-card');
  if (!visualCard) return;

  const source = String(mapUrl || '').trim();
  const mapMode = state.cmsRouteMapMode;
  let embedUrl = '';
  if (mapMode === 'GMAPS' && source) {
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
  badge.innerHTML = mapMode === 'IMAGE'
    ? '<i class="fa-solid fa-map"></i> Peta Rute'
    : '<i class="fa-solid fa-location-dot"></i> Rute & Lokasi Google Maps';
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
  } else if (mapMode === 'IMAGE' && mapImage) {
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

function renderFaqItems(rawItems) {
  const faqSection = document.getElementById('faq');
  const faqList = document.getElementById('faqList');
  const comingSoon = document.getElementById('faqComingSoon');
  if (!faqSection || !faqList || !comingSoon) return;

  let items = rawItems;
  if (typeof items === 'string') {
    try {
      items = JSON.parse(items);
    } catch (error) {
      console.warn('Data FAQ CMS tidak valid:', error);
      faqList.replaceChildren();
      faqList.hidden = true;
      comingSoon.textContent = 'FAQ tidak dapat dimuat.';
      comingSoon.hidden = false;
      return;
    }
  }
  if (!Array.isArray(items)) {
    console.warn('Data FAQ CMS tidak berbentuk daftar.');
    faqList.replaceChildren();
    faqList.hidden = true;
    comingSoon.textContent = 'FAQ tidak dapat dimuat.';
    comingSoon.hidden = false;
    return;
  }

  const visibleItems = items.filter(item =>
    item && typeof item === 'object' && item.enabled !== false &&
    String(item.question || '').trim() && String(item.answer || '').trim()
  );

  faqList.replaceChildren();
  comingSoon.textContent = 'EVENT COMING SOON!';
  comingSoon.hidden = visibleItems.length > 0;
  faqList.hidden = visibleItems.length === 0;
  visibleItems.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = `faq-item${index === 0 ? ' active' : ''}`;
    article.innerHTML = `
      <button class="faq-question" type="button" aria-expanded="${index === 0}">
        <span>${escapeHtml(item.question)}</span>
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div class="faq-answer-wrapper">
        <div class="faq-answer">${escapeHtml(item.answer)}</div>
      </div>
    `;
    faqList.append(article);
  });
}

function updateComingSoonSection(visibility) {
  const section = document.getElementById('siteComingSoon');
  if (!section) return;
  const allSectionKeys = ['hero', 'stats', 'route', 'facilities', 'tickets', 'legal', 'faq', 'footer'];
  const allSectionsOff = allSectionKeys.every(key => visibility[key] === false);
  section.hidden = !allSectionsOff;
  const mobileDock = document.querySelector('.mobile-bottom-dock');
  if (mobileDock) mobileDock.hidden = allSectionsOff;
  if (!allSectionsOff) return;

  const title = document.getElementById('comingSoonTitle');
  const message = document.getElementById('comingSoonMessage');
  const image = document.getElementById('comingSoonImage');
  const fallback = document.getElementById('comingSoonImageFallback');
  if (title) title.textContent = state.cmsComingSoonTitle;
  if (message) {
    message.textContent = state.cmsComingSoonMessage;
    message.hidden = !state.cmsComingSoonMessage;
  }
  if (!image || !fallback) return;

  image.onerror = () => {
    image.hidden = true;
    fallback.hidden = false;
  };
  if (state.cmsComingSoonImageUrl) {
    image.alt = state.cmsComingSoonTitle;
    image.src = state.cmsComingSoonImageUrl;
    image.hidden = false;
    fallback.hidden = true;
  } else {
    image.removeAttribute('src');
    image.hidden = true;
    fallback.hidden = false;
  }
}

function renderLegalDocument(container, content) {
  if (!container || typeof content !== 'string') return;
  const fragment = document.createDocumentFragment();
  let list = null;
  content.split(/\r?\n/).forEach(rawLine => {
    const line = rawLine.trim();
    if (!line) {
      list = null;
      return;
    }

    if (line.startsWith('- ')) {
      if (!list) {
        list = document.createElement('ul');
        fragment.appendChild(list);
      }
      const item = document.createElement('li');
      item.textContent = line.slice(2).trim();
      list.appendChild(item);
      return;
    }

    list = null;
    const headingMatch = line.match(/^\d+[.)]\s+/);
    const paragraph = document.createElement(headingMatch ? 'h4' : 'p');
    paragraph.textContent = line;
    fragment.appendChild(paragraph);
  });
  container.replaceChildren(fragment);
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
    state.cmsComingSoonTitle = typeof cms.coming_soon_title === 'string' && cms.coming_soon_title.trim()
      ? cms.coming_soon_title.trim()
      : 'COMING SOON EVENT!';
    state.cmsComingSoonMessage = typeof cms.coming_soon_message === 'string'
      ? cms.coming_soon_message.trim()
      : 'Informasi lengkap acara akan segera hadir. Nantikan kabar terbaru dari kami!';
    state.cmsComingSoonImageUrl = '';
    if (typeof cms.coming_soon_image_url === 'string' && cms.coming_soon_image_url.trim()) {
      try {
        const imageUrl = new URL(cms.coming_soon_image_url.trim());
        if (['http:', 'https:'].includes(imageUrl.protocol)) state.cmsComingSoonImageUrl = imageUrl.href;
      } catch (error) {
        console.warn('URL gambar Coming Soon tidak valid:', error);
      }
    }
    const sectionVisibility = [
      ['beranda', 'hero'],
      ['rute', 'route'],
      ['fasilitas', 'facilities'],
      ['kategori', 'tickets'],
      ['legal', 'legal'],
      ['faq', 'faq'],
    ];
    sectionVisibility.forEach(([elementId, key]) => {
      const element = document.getElementById(elementId);
      if (element) element.hidden = visibility[key] === false;
    });
    const statsBanner = document.getElementById('statsBanner');
    if (statsBanner) statsBanner.hidden = visibility.stats === false;
    document.querySelectorAll('.glass-footer').forEach(element => {
      element.hidden = visibility.footer === false;
    });
    updateComingSoonSection(visibility);

    // 1. Judul Website (Title Browser Tab)
    if (cms.site_title) {
      document.title = cms.site_title;
    }
    const navbarBrand = document.querySelector('.top-navbar .nav-brand');
    const navbarText = navbarBrand?.querySelector('.brand-text');
    if (navbarText && typeof cms.navbar_title === 'string') {
      navbarText.textContent = cms.navbar_title.trim();
    }

    const navbarIconContainer = navbarBrand?.querySelector('.brand-icon');
    if (navbarIconContainer) {
      const navbarIcons = new Set([
        'fa-person-running', 'fa-medal', 'fa-trophy', 'fa-flag-checkered', 'fa-bolt',
        'fa-fire', 'fa-star', 'fa-mountain-sun', 'fa-shoe-prints', 'fa-heart-pulse',
        'fa-stopwatch', 'fa-award', 'fa-dumbbell', 'fa-route', 'fa-location-dot',
        'fa-sun', 'fa-water', 'fa-compass', 'fa-crown', 'fa-leaf'
      ]);
      const imageUrl = typeof cms.navbar_icon_url === 'string' ? cms.navbar_icon_url.trim() : '';
      const useImage = cms.navbar_icon_mode === 'IMAGE' || (!cms.navbar_icon_mode && Boolean(imageUrl));
      let safeImageUrl = '';
      if (useImage && imageUrl) {
        try {
          const parsedUrl = new URL(imageUrl);
          if (['http:', 'https:'].includes(parsedUrl.protocol)) safeImageUrl = parsedUrl.href;
        } catch {
          safeImageUrl = '';
        }
      }

      if (safeImageUrl) {
        const image = document.createElement('img');
        image.src = safeImageUrl;
        image.alt = '';
        image.loading = 'lazy';
        image.style.cssText = 'width: 100%; height: 100%; padding: 4px; object-fit: contain; border-radius: inherit; background: #FFFFFF;';
        navbarIconContainer.replaceChildren(image);
      } else {
        const icon = document.createElement('i');
        const iconName = navbarIcons.has(cms.navbar_icon) ? cms.navbar_icon : 'fa-person-running';
        icon.className = `fa-solid ${iconName}`;
        navbarIconContainer.replaceChildren(icon);
      }
    }

    // 2. Hero Section
    const heroBadgeText = document.getElementById('heroStatusText') || document.querySelector('.hero-pill-badge span:not(.status-dot)');
    state.cmsHeroBadge = cms.hero_badge || '';
    if (heroBadgeText && state.cmsHeroBadge) heroBadgeText.textContent = state.cmsHeroBadge;
    applyRegistrationStatus();

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const titleText = typeof cms.hero_title === 'string' ? cms.hero_title.trim() : '';
      heroTitle.textContent = titleText;
      heroTitle.hidden = !titleText;
    }

    const heroSubtitle = document.querySelector('.hero-desc');
    if (heroSubtitle) {
      const subtitleText = typeof cms.hero_subtitle === 'string' ? cms.hero_subtitle.trim() : '';
      heroSubtitle.textContent = subtitleText;
      heroSubtitle.hidden = !subtitleText;
    }

    const heroDisplayImg = document.getElementById('heroDisplayImg');
    const heroVisual = document.getElementById('heroVisual');
    const heroGrid = document.querySelector('#beranda .hero-split-grid');
    if (heroDisplayImg && heroVisual) {
      const imageUrl = typeof cms.hero_bg_image === 'string' ? cms.hero_bg_image.trim() : '';
      heroVisual.hidden = true;
      heroGrid?.classList.toggle('hero-no-visual', !imageUrl);
      heroDisplayImg.onload = () => {
        heroVisual.hidden = false;
        heroGrid?.classList.remove('hero-no-visual');
      };
      heroDisplayImg.onerror = () => {
        heroVisual.hidden = true;
        heroGrid?.classList.add('hero-no-visual');
      };
      if (imageUrl) {
        heroDisplayImg.alt = typeof cms.hero_title === 'string' ? cms.hero_title.trim() : '';
        heroDisplayImg.src = imageUrl;
        if (heroDisplayImg.complete && heroDisplayImg.naturalWidth > 0) {
          heroVisual.hidden = false;
          heroGrid?.classList.remove('hero-no-visual');
        }
      } else {
        heroDisplayImg.removeAttribute('src');
      }
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

    // 3. Rute & Google Maps
    const routeSection = document.getElementById('rute');
    if (routeSection) {
      const routeBadgeLabel = document.getElementById('routeSectionBadgeLabel');
      if (routeBadgeLabel && typeof cms.route_badge_label === 'string') {
        routeBadgeLabel.textContent = cms.route_badge_label;
        routeBadgeLabel.parentElement.hidden = !cms.route_badge_label.trim();
      }

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
      state.cmsRouteMapMode = cms.route_map_mode === 'IMAGE' ? 'IMAGE' : 'GMAPS';
      state.cmsRouteCheckpointMode = cms.route_checkpoint_mode === 'IMAGE' ? 'IMAGE' : 'MANUAL';
      state.cmsRouteCheckpointImage = cms.route_checkpoint_image || '';
      renderRouteVisual(state.cmsRouteMapUrl, state.cmsRouteMapImage);
    }

    renderFaqItems(cms.faq_items);

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
    const legalBadge = document.getElementById('legalSectionBadge');
    if (legalBadge && typeof cms.legal_badge_label === 'string') legalBadge.textContent = cms.legal_badge_label;
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
    const privacyButtonLabel = document.getElementById('legalPrivacyButtonLabel');
    if (privacyButtonLabel && typeof cms.legal_privacy_button === 'string') privacyButtonLabel.textContent = cms.legal_privacy_button;
    const termsButtonLabel = document.getElementById('legalTermsButtonLabel');
    if (termsButtonLabel && typeof cms.legal_terms_button === 'string') termsButtonLabel.textContent = cms.legal_terms_button;

    [
      ['privacyModalTitle', cms.privacy_modal_title],
      ['privacyModalSubtitle', cms.privacy_modal_subtitle],
      ['termsModalTitle', cms.terms_modal_title],
      ['termsModalSubtitle', cms.terms_modal_subtitle]
    ].forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element && typeof value === 'string') element.textContent = value;
    });
    renderLegalDocument(document.getElementById('privacyModalContent'), cms.privacy_modal_content);
    renderLegalDocument(document.getElementById('termsModalContent'), cms.terms_modal_content);

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
    applyWebsiteBranding(cms);
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
    state.cmsRouteMapMode = data.mapMode === 'IMAGE' ? 'IMAGE' : 'GMAPS';
    state.cmsRouteCheckpointMode = data.checkpointMode === 'IMAGE' ? 'IMAGE' : 'MANUAL';
    state.cmsRouteCheckpointImage = data.checkpointImage || '';
    const routeBadgeLabel = document.getElementById('routeSectionBadgeLabel');
    if (routeBadgeLabel && typeof data.badgeLabel === 'string') {
      routeBadgeLabel.textContent = data.badgeLabel;
      routeBadgeLabel.parentElement.hidden = !data.badgeLabel.trim();
    }
    renderRouteVisual(state.cmsRouteMapUrl, state.cmsRouteMapImage);

    // Render checkpoint list
    if (container) {
      if (state.cmsRouteCheckpointMode === 'IMAGE' && state.cmsRouteCheckpointImage) {
        const image = document.createElement('img');
        image.className = 'route-checkpoint-image';
        image.src = state.cmsRouteCheckpointImage;
        image.alt = 'Peta checkpoint dan detail rute event';
        image.loading = 'lazy';
        container.replaceChildren(image);
      } else if (state.cmsRouteCheckpointMode === 'IMAGE') {
        container.innerHTML = '<p class="route-map-empty">Gambar checkpoint belum tersedia.</p>';
      } else if (Array.isArray(data.points) && data.points.length > 0) {
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
    console.error('Gagal memuat data rute:', err);
    if (container) container.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.9rem;padding:12px 0;">Data rute gagal dimuat. Silakan coba beberapa saat lagi.</p>';
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
    if (topics.includes('cms')) {
      loadWebsiteSettings();
      loadRouteData();
    }
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
      updateRegistrationCountdown();
    }
  });

  document.getElementById('regModal')?.addEventListener('change', (e) => {
    if (e.target.matches('.p-event-select')) updateRegistrationCountdown();
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
  document.getElementById('faqList')?.addEventListener('click', (event) => {
    const question = event.target.closest('.faq-question');
    if (!question) return;
    const item = question.closest('.faq-item');
    const isActive = item.classList.contains('active');
    document.querySelectorAll('#faqList .faq-item.active').forEach(activeItem => {
      activeItem.classList.remove('active');
      activeItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });
    if (!isActive) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
    }
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
