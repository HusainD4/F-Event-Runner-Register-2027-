import { apiFetch } from './api.js';
import { loadWebsiteBranding } from './branding.js';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const websiteBrandingPromise = loadWebsiteBranding();

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function maskNik(nik) {
  if (!nik || nik.length < 8) return nik || '-';
  return nik.substring(0, 6) + '******' + nik.substring(nik.length - 4);
}

function formatDate(dateStr) {
  if (!dateStr) return 'Tanggal belum tersedia';
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return 'Tanggal belum tersedia';
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Tanggal belum tersedia';
  }
}

async function loadETicket() {
  const mount = document.getElementById('ticketMount');
  const instructionsMount = document.querySelector('.instructions-box');
  if (!mount) return;

  const params = new URLSearchParams(window.location.search);
  const rawParam = params.get('orderId') || params.get('id') || params.get('midtransOrderId') || params.get('code') || params.get('q');
  const orderId = rawParam ? rawParam.trim() : '';

  if (!orderId) {
    mount.innerHTML = `
      <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #EF4444; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">ID Pesanan Tidak Ditemukan</h3>
        <p style="color: #64748B; max-width: 480px; margin: 0 auto;">Silakan buka tautan E-Tiket dari email / WhatsApp konfirmasi Anda atau cari melalui menu Cek Tiket.</p>
        <a href="/cek-tiket.html" class="btn btn-back" style="margin-top: 20px;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Pencarian Tiket
        </a>
      </div>
    `;
    return;
  }

  try {
    const res = await apiFetch(`/tickets/e-ticket/${encodeURIComponent(orderId)}`);
    const json = await res.json();

    if (!res.ok || json.status !== 'success') {
      mount.dataset.renderStatus = 'error';
      mount.innerHTML = `
        <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
          <i class="fa-solid fa-circle-xmark" style="font-size: 3rem; color: #EF4444; margin-bottom: 16px;"></i>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">E-Tiket Belum Tersedia</h3>
          <p style="color: #64748B; margin-bottom: 24px; max-width: 480px; margin-left: auto; margin-right: auto;">
            ${escapeHtml(json.message || 'Status pembayaran belum terkonfirmasi lunas.')}
          </p>
          ${
            json.orderId
              ? `<a href="/payment.html?orderId=${encodeURIComponent(json.orderId)}" class="btn btn-print">
                   <i class="fa-solid fa-credit-card"></i> Selesaikan Pembayaran Sekarang
                 </a>`
              : `<a href="/cek-tiket.html" class="btn btn-back"><i class="fa-solid fa-magnifying-glass"></i> Cek Status Pesanan</a>`
          }
        </div>
      `;
      return;
    }

    const order = json.data;
    const participants = order.participants || [];
    const websiteSettings = await websiteBrandingPromise;
    const eventTitle = websiteSettings?.navbar_title?.trim() || 'E-Tiket Resmi';
    document.title = `E-Tiket Resmi - ${eventTitle}`;

    if (participants.length === 0) {
      mount.dataset.renderStatus = 'error';
      mount.innerHTML = `
        <div class="e-ticket-card" style="padding: 40px; text-align: center;">
          <i class="fa-solid fa-user-xmark" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 14px;"></i>
          <p style="color: #64748B;">Tidak ada data peserta terdaftar dalam pesanan ini.</p>
        </div>
      `;
      return;
    }

    const orderRef = order.midtransOrderId || order.id;
    const isGroup = participants.length > 1;
    const racepackQr = isGroup ? order.masterQrImageDataUrl : participants[0].qrImageDataUrl;
    if (!racepackQr || participants.some(participant => !participant.qrImageDataUrl)) {
      throw new Error('QR racepack tidak tersedia. Silakan coba lagi.');
    }
    const racepackPage = `
      <section class="racepack-qr-page${isGroup ? ' racepack-qr-page-group' : ''}" aria-label="QR pengambilan racepack">
        <div class="racepack-qr-heading">
          <span>RACEPACK COLLECTION</span>
          <h2>QR Pengambilan Racepack</h2>
          <p>Tunjukkan kode ini kepada petugas untuk verifikasi.</p>
        </div>
        <div class="racepack-qr-frame">
          <img src="${racepackQr}" alt="${isGroup ? 'QR master pesanan' : 'QR peserta'} untuk pengambilan racepack" />
        </div>
        <div class="racepack-qr-detail">
          <strong>${isGroup ? `QR MASTER &bull; ${participants.length} PESERTA` : escapeHtml(participants[0].fullNameKtp)}</strong>
          <span>${isGroup ? 'Untuk seluruh peserta dalam pesanan ini' : escapeHtml(participants[0].event?.category || 'Tiket peserta')}</span>
          <span>REF: ${escapeHtml(orderRef)}</span>
        </div>
        ${isGroup ? `
          <div class="racepack-participant-heading">QR Peserta</div>
          <div class="racepack-participant-grid">
            ${participants.map((participant, index) => `
              <div class="racepack-participant-item">
                <img src="${participant.qrImageDataUrl}" alt="QR peserta ${escapeHtml(participant.fullNameKtp)}" />
                <span>${index + 1}. ${escapeHtml(participant.fullNameKtp)}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        <p class="racepack-qr-note">Jaga kode ini dan hanya tunjukkan kepada petugas resmi.</p>
      </section>
    `;

    // 1. Tampilkan Banner Master QR jika pesanan memiliki lebih dari 1 tiket
    let masterQrHtml = '';
    if (participants.length > 1) {
      const masterQrUrl = order.masterQrImageDataUrl;

      masterQrHtml = `
        <div class="master-qr-banner">
          <div class="master-qr-info">
            <span class="badge-master"><i class="fa-solid fa-layer-group"></i> QR CODE MASTER (${participants.length} TIKET)</span>
            <h3>1 QR Code untuk Seluruh Peserta dalam Pesanan Ini</h3>
            <p>Petugas RPC cukup memindai QR Master ini untuk verifikasi dan serah terima racepack seluruh ${participants.length} peserta sekaligus.</p>
            <div class="master-runner-list">
              ${participants.map((pt, i) => `
                        <span class="master-runner-pill">#${i + 1} ${escapeHtml(pt.fullNameKtp)} &bull; ${escapeHtml(pt.event?.category || 'Kategori tidak tersedia')}</span>
              `).join('')}
            </div>
          </div>
          <div class="master-qr-code-box">
            <img src="${masterQrUrl}" alt="Master QR ${escapeHtml(orderRef)}" class="master-qr-img" />
            <span class="master-qr-ref">ORDER: ${escapeHtml(orderRef.substring(0, 18))}</span>
          </div>
        </div>
      `;
    }

    // 2. Render Setiap Tiket Peserta (NOMOR BIB TIDAK DITAMPILKAN DI E-TIKET)
    const ticketsHtml = participants.map((p, idx) => {
      const category = p.event?.category ? String(p.event.category).toUpperCase() : 'Kategori tidak tersedia';
      const ticketName = p.event?.ticketName || 'Nama kategori belum tersedia';
      const eventLocation = websiteSettings?.contact_address?.trim() || 'Lokasi belum tersedia';

      // QR Code individual peserta (encrypted payload tanpa mengekspos nomor BIB)
      const qrCodeUrl = p.qrImageDataUrl;

      // Hak Paket Lomba mengikuti tiket event yang didaftar
      const benefits = p.event?.benefits || [];
      const benefitsHtml = benefits.length > 0
        ? benefits.map(b => `
            <div class="stub-checklist-item">
              <i class="fa-regular fa-square-check"></i> ${escapeHtml(b.name)}
            </div>
          `).join('')
        : `
          <div class="stub-checklist-item">
            Informasi paket lomba belum tersedia.
          </div>
        `;

      const separatorHtml = (idx > 0 && participants.length > 1) ? `
        <div class="ticket-separator">
          <span class="ticket-separator-label">TIKET PESERTA #${idx + 1} DARI ${participants.length}</span>
        </div>
      ` : '';

      return `
        ${separatorHtml}
        <div class="e-ticket-card">
          <!-- Top Security Ribbon -->
          <div class="security-ribbon"></div>

          <!-- Official Header -->
          <div class="ticket-header">
            <div class="ticket-brand">
              <div class="ticket-brand-logo">
                <i class="fa-solid fa-person-running"></i>
              </div>
              <div class="ticket-brand-titles">
                <h2>${escapeHtml(eventTitle)}</h2>
                <p>OFFICIAL RACE ENTRY PASS &bull; VERIFIKASI RESMI</p>
              </div>
            </div>

            <div class="ticket-header-meta">
              <span class="badge-paid-confirmed">
                <i class="fa-solid fa-circle-check"></i> TERDAFTAR &amp; LUNAS
              </span>
              <div class="order-code-text">
                REF ID: <strong>${escapeHtml(orderRef)}</strong>
              </div>
            </div>
          </div>

          <!-- Boarding Pass Main Body (Split into Left Pass & Right Stub) -->
          <div class="ticket-body-pass">
            <!-- Left: Main Runner Entry Pass -->
            <div class="pass-main">
              <div class="pass-notch-top"></div>
              <div class="pass-notch-bottom"></div>

              <!-- Ticket Name & Runner Identity Spotlight (TANPA NOMOR BIB) -->
              <div class="ticket-entry-spotlight">
                <div>
                  <div class="ticket-entry-badge">
                    <i class="fa-solid fa-ticket"></i> TIKET RESMI PESERTA
                  </div>
                  <h3 class="ticket-name-big">${escapeHtml(ticketName)}</h3>
                  <span class="runner-name-display">${escapeHtml(p.fullNameKtp)}</span>
                </div>

                <div class="category-pill-box">
                  <div class="category-tag">
                    <i class="fa-solid fa-flag-checkered"></i> KATEGORI ${escapeHtml(category)}
                  </div>
                  <span class="pass-serial-text">
                    ${participants.length > 1 ? `PESERTA ${idx + 1} DARI ${participants.length}` : 'ENTRY PASS RESMI'}
                  </span>
                </div>
              </div>

              <!-- Runner Details Grid -->
              <div class="details-grid">
                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-user-check"></i> Nama Lengkap (KTP)</div>
                  <div class="detail-val">${escapeHtml(p.fullNameKtp)}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-id-card"></i> Nomor Identitas (NIK)</div>
                  <div class="detail-val" style="font-family: ui-monospace, monospace;">${escapeHtml(maskNik(p.nik))}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-shirt"></i> Jersey &amp; Ukuran</div>
                  <div class="detail-val">
                    ${escapeHtml(p.jersey?.name || p.jersey?.type || 'Data jersey belum tersedia')}
                    ${p.selectedSize ? `&bull; Ukuran <strong>${escapeHtml(p.selectedSize)}</strong>` : ''}
                  </div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-droplet"></i> Golongan Darah</div>
                  <div class="detail-val">${escapeHtml(p.bloodType || '-')}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-phone-volume"></i> Kontak Darurat (ICE)</div>
                  <div class="detail-val">${escapeHtml(p.emergencyContactPhone || '-')} (${escapeHtml(p.emergencyContactName || '-')})</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-location-dot"></i> Lokasi &amp; Tanggal</div>
                  <div class="detail-val">${escapeHtml(eventLocation)} &bull; ${formatDate(p.event?.eventDate)}</div>
                </div>
              </div>

              <!-- Security Footer -->
              <div class="pass-security-footer">
                <div class="pass-security-item">
                  <i class="fa-solid fa-id-badge"></i>
                  <span>QR untuk Verifikasi Peserta</span>
                </div>
                <div class="pass-security-item">
                  <i class="fa-solid fa-shield-halved"></i>
                  <span>QR Tersambung ke Data Peserta</span>
                </div>
              </div>
            </div>

            <!-- Right: Racepack Claim Stub (Kupon Pengambilan Racepack) -->
            <div class="pass-stub">
              <div class="stub-header">
                <span class="stub-badge"><i class="fa-solid fa-box-archive"></i> RPC CLAIM STUB</span>
                <div class="stub-title">KUPON RACEPACK</div>
                <div class="stub-subtitle">Tunjukkan QR ini ke Petugas RPC</div>
              </div>

              <!-- QR Code Frame -->
              <div class="stub-qr-box">
                <img src="${qrCodeUrl}" alt="QR E-Tiket ${escapeHtml(p.fullNameKtp)}" class="stub-qr-image" />
                <div class="stub-scan-hint">${escapeHtml(p.fullNameKtp)} &bull; ${escapeHtml(category)}</div>
              </div>

              <!-- Simulated Barcode -->
              <div class="stub-barcode-container">
                <div class="simulated-barcode"></div>
                <div class="barcode-code-text">${escapeHtml(orderRef)}</div>
              </div>

              <!-- RPC Checklist Breakdown (Mengikuti Tiket Event yang didaftar) -->
              <div class="stub-checklist-box">
                <div class="stub-checklist-title">
                  <i class="fa-solid fa-clipboard-check"></i> Hak Paket Lomba Resmi:
                </div>
                ${benefitsHtml}
              </div>

              <!-- Officer Verification Stamp Box -->
              <div class="stub-officer-box">
                <div style="font-weight: 700; text-transform: uppercase;">Paraf &amp; Stempel Petugas RPC</div>
                <div style="height: 16px;"></div>
                <div>Tanggal verifikasi: ____ / ____ / ______</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    mount.innerHTML = masterQrHtml + ticketsHtml;

    // 3. Render Petunjuk Pengambilan Racepack & Race Day dari Database Admin
    if (instructionsMount && order.racepackInstructions) {
      const instr = order.racepackInstructions;
      const title = instr.title || 'Petunjuk Pengambilan Racepack & Race Day:';
      const points = Array.isArray(instr.points) ? instr.points : [];

      if (points.length > 0) {
        instructionsMount.innerHTML = `
          <h4><i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> ${escapeHtml(title)}</h4>
          <ul>
            ${points.map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}
          </ul>
        `;
        instructionsMount.hidden = false;
      }
    }
    if (instructionsMount) mount.appendChild(instructionsMount);
    mount.insertAdjacentHTML('beforeend', racepackPage);
    mount.dataset.renderStatus = 'ready';
  } catch (err) {
    mount.dataset.renderStatus = 'error';
    mount.innerHTML = `
      <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #F59E0B; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">Gagal Menghubungkan ke Server</h3>
        <p style="color: #64748B; margin-bottom: 20px;">${escapeHtml(err.message)}</p>
        <button onclick="location.reload()" class="btn btn-print">
          <i class="fa-solid fa-rotate-right"></i> Coba Muat Ulang
        </button>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadETicket);
