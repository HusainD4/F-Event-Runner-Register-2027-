import { apiFetch } from './api.js';
import { loadWebsiteBranding } from './branding.js';

loadWebsiteBranding();

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

    if (participants.length === 0) {
      mount.innerHTML = `
        <div class="e-ticket-card" style="padding: 40px; text-align: center;">
          <i class="fa-solid fa-user-xmark" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 14px;"></i>
          <p style="color: #64748B;">Tidak ada data peserta terdaftar dalam pesanan ini.</p>
        </div>
      `;
      return;
    }

    const orderRef = order.midtransOrderId || order.id;

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
                <span class="master-runner-pill">#${i + 1} ${escapeHtml(pt.fullNameKtp)} &bull; ${escapeHtml(pt.event?.category || '10K')}</span>
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
      const category = (p.event?.category || '10K').toUpperCase();
      const ticketName = p.event?.ticketName || `TIKET ${category} MARATHON`;
      const waveTime = category.includes('21K')
        ? '05:15 WIB'
        : category.includes('10K')
        ? '05:45 WIB'
        : '06:15 WIB';

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
            <i class="fa-regular fa-square-check"></i> 1x Nomor Dada (BIB) &amp; Timing Chip (Diserahkan saat RPC)
          </div>
          <div class="stub-checklist-item">
            <i class="fa-regular fa-square-check"></i> 1x Jersey Resmi (${escapeHtml(p.selectedSize || 'M')})
          </div>
          <div class="stub-checklist-item">
            <i class="fa-regular fa-square-check"></i> 1x Drawstring Bag &amp; Panduan Lomba
          </div>
          <div class="stub-checklist-item">
            <i class="fa-regular fa-square-check"></i> Refreshment &amp; Hak Medali Finisher
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
                <h2>TEGAL BAHARI MARATHON 2026</h2>
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
                  <div class="wave-time-tag">
                    <i class="fa-solid fa-clock"></i> Flag-off: ${waveTime}
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
                    Size <strong>${escapeHtml(p.selectedSize || 'M')}</strong> &bull; ${escapeHtml(p.jersey?.type || 'Dry-Fit Official')}
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
                  <div class="detail-val">Alun-Alun Tegal &bull; ${formatDate(p.event?.eventDate)}</div>
                </div>
              </div>

              <!-- Security Footer -->
              <div class="pass-security-footer">
                <div class="pass-security-item">
                  <i class="fa-solid fa-id-badge"></i>
                  <span>Nomor BIB Diterbitkan Saat RPC</span>
                </div>
                <div class="pass-security-item">
                  <i class="fa-solid fa-shield-halved"></i>
                  <span>Secure QR Entry Verified</span>
                </div>
                <div class="pass-security-item">
                  <i class="fa-solid fa-award"></i>
                  <span>Finisher Medal Entitlement</span>
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
                <div>Tgl: _____ / _____ / 2026</div>
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
      }
    }
  } catch (err) {
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
