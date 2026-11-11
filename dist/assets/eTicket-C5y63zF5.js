import{a as S}from"./api-KOLSX-Q2.js";function a(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function A(e){return!e||e.length<8?e||"-":e.substring(0,6)+"******"+e.substring(e.length-4)}function C(e){if(!e)return"Minggu, 28 Feb 2027";try{return new Date(e).toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"short",year:"numeric"})}catch{return"Minggu, 28 Feb 2027"}}async function M(){const e=document.getElementById("ticketMount"),u=document.querySelector(".instructions-box");if(!e)return;const c=new URLSearchParams(window.location.search),p=c.get("orderId")||c.get("id")||c.get("midtransOrderId")||c.get("code")||c.get("q"),f=p?p.trim():"";if(!f){e.innerHTML=`
      <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #EF4444; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">ID Pesanan Tidak Ditemukan</h3>
        <p style="color: #64748B; max-width: 480px; margin: 0 auto;">Silakan buka tautan E-Tiket dari email / WhatsApp konfirmasi Anda atau cari melalui menu Cek Tiket.</p>
        <a href="/cek-tiket.html" class="btn btn-back" style="margin-top: 20px;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Pencarian Tiket
        </a>
      </div>
    `;return}try{const m=await S(`/tickets/e-ticket/${encodeURIComponent(f)}`),d=await m.json();if(!m.ok||d.status!=="success"){e.innerHTML=`
        <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
          <i class="fa-solid fa-circle-xmark" style="font-size: 3rem; color: #EF4444; margin-bottom: 16px;"></i>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">E-Tiket Belum Tersedia</h3>
          <p style="color: #64748B; margin-bottom: 24px; max-width: 480px; margin-left: auto; margin-right: auto;">
            ${a(d.message||"Status pembayaran belum terkonfirmasi lunas.")}
          </p>
          ${d.orderId?`<a href="/payment.html?orderId=${encodeURIComponent(d.orderId)}" class="btn btn-print">
                   <i class="fa-solid fa-credit-card"></i> Selesaikan Pembayaran Sekarang
                 </a>`:'<a href="/cek-tiket.html" class="btn btn-back"><i class="fa-solid fa-magnifying-glass"></i> Cek Status Pesanan</a>'}
        </div>
      `;return}const n=d.data,t=n.participants||[];if(t.length===0){e.innerHTML=`
        <div class="e-ticket-card" style="padding: 40px; text-align: center;">
          <i class="fa-solid fa-user-xmark" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 14px;"></i>
          <p style="color: #64748B;">Tidak ada data peserta terdaftar dalam pesanan ini.</p>
        </div>
      `;return}const r=n.midtransOrderId||n.id;let g="";if(t.length>1){const i=n.masterQrPayload||`TEGALRUN|MASTER_${r}`,l=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=6&data=${encodeURIComponent(i)}`;g=`
        <div class="master-qr-banner">
          <div class="master-qr-info">
            <span class="badge-master"><i class="fa-solid fa-layer-group"></i> QR CODE MASTER (${t.length} TIKET)</span>
            <h3>1 QR Code untuk Seluruh Peserta dalam Pesanan Ini</h3>
            <p>Petugas RPC cukup memindai QR Master ini untuk verifikasi dan serah terima racepack seluruh ${t.length} peserta sekaligus.</p>
            <div class="master-runner-list">
              ${t.map((s,o)=>{var v;return`
                <span class="master-runner-pill">#${o+1} ${a(s.fullNameKtp)} &bull; ${a(((v=s.event)==null?void 0:v.category)||"10K")}</span>
              `}).join("")}
            </div>
          </div>
          <div class="master-qr-code-box">
            <img src="${l}" alt="Master QR ${a(r)}" class="master-qr-img" />
            <span class="master-qr-ref">ORDER: ${a(r.substring(0,18))}</span>
          </div>
        </div>
      `}const $=t.map((i,l)=>{var k,h,y,R,T;const s=(((k=i.event)==null?void 0:k.category)||"10K").toUpperCase(),o=((h=i.event)==null?void 0:h.ticketName)||`TIKET ${s} MARATHON`,v=s.includes("21K")?"05:15 WIB":s.includes("10K")?"05:45 WIB":"06:15 WIB",x=i.qrPayload||`TEGALRUN|${r}|${i.id}|${i.nik}`,I=`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=6&data=${encodeURIComponent(x)}`,b=((y=i.event)==null?void 0:y.benefits)||[],E=b.length>0?b.map(P=>`
            <div class="stub-checklist-item">
              <i class="fa-regular fa-square-check"></i> ${a(P.name)}
            </div>
          `).join(""):`
          <div class="stub-checklist-item">
            <i class="fa-regular fa-square-check"></i> 1x Nomor Dada (BIB) &amp; Timing Chip (Diserahkan saat RPC)
          </div>
          <div class="stub-checklist-item">
            <i class="fa-regular fa-square-check"></i> 1x Jersey Resmi (${a(i.selectedSize||"M")})
          </div>
          <div class="stub-checklist-item">
            <i class="fa-regular fa-square-check"></i> 1x Drawstring Bag &amp; Panduan Lomba
          </div>
          <div class="stub-checklist-item">
            <i class="fa-regular fa-square-check"></i> Refreshment &amp; Hak Medali Finisher
          </div>
        `;return`
        ${l>0&&t.length>1?`
        <div class="ticket-separator">
          <span class="ticket-separator-label">TIKET PESERTA #${l+1} DARI ${t.length}</span>
        </div>
      `:""}
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
                <h2>TEGAL BAHARI MARATHON 2027</h2>
                <p>OFFICIAL RACE ENTRY PASS &bull; VERIFIKASI RESMI</p>
              </div>
            </div>

            <div class="ticket-header-meta">
              <span class="badge-paid-confirmed">
                <i class="fa-solid fa-circle-check"></i> TERDAFTAR &amp; LUNAS
              </span>
              <div class="order-code-text">
                REF ID: <strong>${a(r)}</strong>
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
                  <h3 class="ticket-name-big">${a(o)}</h3>
                  <span class="runner-name-display">${a(i.fullNameKtp)}</span>
                </div>

                <div class="category-pill-box">
                  <div class="category-tag">
                    <i class="fa-solid fa-flag-checkered"></i> KATEGORI ${a(s)}
                  </div>
                  <div class="wave-time-tag">
                    <i class="fa-solid fa-clock"></i> Flag-off: ${v}
                  </div>
                  <span class="pass-serial-text">
                    ${t.length>1?`PESERTA ${l+1} DARI ${t.length}`:"ENTRY PASS RESMI"}
                  </span>
                </div>
              </div>

              <!-- Runner Details Grid -->
              <div class="details-grid">
                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-user-check"></i> Nama Lengkap (KTP)</div>
                  <div class="detail-val">${a(i.fullNameKtp)}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-id-card"></i> Nomor Identitas (NIK)</div>
                  <div class="detail-val" style="font-family: ui-monospace, monospace;">${a(A(i.nik))}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-shirt"></i> Jersey &amp; Ukuran</div>
                  <div class="detail-val">
                    Size <strong>${a(i.selectedSize||"M")}</strong> &bull; ${a(((R=i.jersey)==null?void 0:R.type)||"Dry-Fit Official")}
                  </div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-droplet"></i> Golongan Darah</div>
                  <div class="detail-val">${a(i.bloodType||"-")}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-phone-volume"></i> Kontak Darurat (ICE)</div>
                  <div class="detail-val">${a(i.emergencyContactPhone||"-")} (${a(i.emergencyContactName||"-")})</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-location-dot"></i> Lokasi &amp; Tanggal</div>
                  <div class="detail-val">Alun-Alun Tegal &bull; ${C((T=i.event)==null?void 0:T.eventDate)}</div>
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
                <img src="${I}" alt="QR E-Tiket ${a(i.fullNameKtp)}" class="stub-qr-image" />
                <div class="stub-scan-hint">${a(i.fullNameKtp)} &bull; ${a(s)}</div>
              </div>

              <!-- Simulated Barcode -->
              <div class="stub-barcode-container">
                <div class="simulated-barcode"></div>
                <div class="barcode-code-text">${a(r)}</div>
              </div>

              <!-- RPC Checklist Breakdown (Mengikuti Tiket Event yang didaftar) -->
              <div class="stub-checklist-box">
                <div class="stub-checklist-title">
                  <i class="fa-solid fa-clipboard-check"></i> Hak Paket Lomba Resmi:
                </div>
                ${E}
              </div>

              <!-- Officer Verification Stamp Box -->
              <div class="stub-officer-box">
                <div style="font-weight: 700; text-transform: uppercase;">Paraf &amp; Stempel Petugas RPC</div>
                <div style="height: 16px;"></div>
                <div>Tgl: _____ / _____ / 2027</div>
              </div>
            </div>
          </div>
        </div>
      `}).join("");if(e.innerHTML=g+$,u&&n.racepackInstructions){const i=n.racepackInstructions,l=i.title||"Petunjuk Pengambilan Racepack & Race Day:",s=Array.isArray(i.points)?i.points:[];s.length>0&&(u.innerHTML=`
          <h4><i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> ${a(l)}</h4>
          <ul>
            ${s.map(o=>`<li>${a(o)}</li>`).join("")}
          </ul>
        `)}}catch(m){e.innerHTML=`
      <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #F59E0B; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">Gagal Menghubungkan ke Server</h3>
        <p style="color: #64748B; margin-bottom: 20px;">${a(m.message)}</p>
        <button onclick="location.reload()" class="btn btn-print">
          <i class="fa-solid fa-rotate-right"></i> Coba Muat Ulang
        </button>
      </div>
    `}}document.addEventListener("DOMContentLoaded",M);
