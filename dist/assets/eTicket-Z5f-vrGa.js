import{a as K}from"./api-Biu4OxHL.js";import{l as Q}from"./branding-BuOTZVk0.js";import"./home-appearance-Db1ttUVV.js";const B=Q();function a(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function U(t){return!t||t.length<8?t||"-":t.substring(0,6)+"******"+t.substring(t.length-4)}function w(t){if(!t)return"Tanggal belum tersedia";try{const l=new Date(t);return Number.isNaN(l.getTime())?"Tanggal belum tersedia":l.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"short",year:"numeric"})}catch{return"Tanggal belum tersedia"}}async function _(){var k,b;const t=document.getElementById("ticketMount"),l=document.querySelector(".instructions-box");if(!t)return;const o=new URLSearchParams(window.location.search),g=o.get("orderId")||o.get("id")||o.get("midtransOrderId")||o.get("code")||o.get("q"),f=g?g.trim():"";if(!f){t.innerHTML=`
      <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #EF4444; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">ID Pesanan Tidak Ditemukan</h3>
        <p style="color: #64748B; max-width: 480px; margin: 0 auto;">Silakan buka tautan E-Tiket dari email / WhatsApp konfirmasi Anda atau cari melalui menu Cek Tiket.</p>
        <a href="/cek-tiket.html" class="btn btn-back" style="margin-top: 20px;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Pencarian Tiket
        </a>
      </div>
    `;return}try{const v=await K(`/tickets/e-ticket/${encodeURIComponent(f)}`),m=await v.json();if(!v.ok||m.status!=="success"){t.dataset.renderStatus="error",t.innerHTML=`
        <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
          <i class="fa-solid fa-circle-xmark" style="font-size: 3rem; color: #EF4444; margin-bottom: 16px;"></i>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">E-Tiket Belum Tersedia</h3>
          <p style="color: #64748B; margin-bottom: 24px; max-width: 480px; margin-left: auto; margin-right: auto;">
            ${a(m.message||"Status pembayaran belum terkonfirmasi lunas.")}
          </p>
          ${m.orderId?`<a href="/payment.html?orderId=${encodeURIComponent(m.orderId)}" class="btn btn-print">
                   <i class="fa-solid fa-credit-card"></i> Selesaikan Pembayaran Sekarang
                 </a>`:'<a href="/cek-tiket.html" class="btn btn-back"><i class="fa-solid fa-magnifying-glass"></i> Cek Status Pesanan</a>'}
        </div>
      `;return}const r=m.data,i=r.participants||[],c=await B,h=((k=c==null?void 0:c.navbar_title)==null?void 0:k.trim())||"E-Tiket Resmi";if(document.title=`E-Tiket Resmi - ${h}`,i.length===0){t.dataset.renderStatus="error",t.innerHTML=`
        <div class="e-ticket-card" style="padding: 40px; text-align: center;">
          <i class="fa-solid fa-user-xmark" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 14px;"></i>
          <p style="color: #64748B;">Tidak ada data peserta terdaftar dalam pesanan ini.</p>
        </div>
      `;return}const p=r.midtransOrderId||r.id,u=i.length>1,y=u?r.masterQrImageDataUrl:i[0].qrImageDataUrl;if(!y||i.some(e=>!e.qrImageDataUrl))throw new Error("QR racepack tidak tersedia. Silakan coba lagi.");const A=`
      <section class="racepack-qr-page${u?" racepack-qr-page-group":""}" aria-label="QR pengambilan racepack">
        <div class="racepack-qr-heading">
          <span>RACEPACK COLLECTION</span>
          <h2>QR Pengambilan Racepack</h2>
          <p>Tunjukkan kode ini kepada petugas untuk verifikasi.</p>
        </div>
        <div class="racepack-qr-frame">
          <img src="${y}" alt="${u?"QR master pesanan":"QR peserta"} untuk pengambilan racepack" />
        </div>
        <div class="racepack-qr-detail">
          <strong>${u?`QR MASTER &bull; ${i.length} PESERTA`:a(i[0].fullNameKtp)}</strong>
          <span>${u?"Untuk seluruh peserta dalam pesanan ini":a(((b=i[0].event)==null?void 0:b.category)||"Tiket peserta")}</span>
          <span>REF: ${a(p)}</span>
        </div>
        <p class="racepack-qr-note">Jaga kode ini dan hanya tunjukkan kepada petugas resmi.</p>
      </section>
    `;let R="";if(i.length>1){const e=r.masterQrImageDataUrl;R=`
        <div class="master-qr-banner">
          <div class="master-qr-info">
            <span class="badge-master"><i class="fa-solid fa-layer-group"></i> QR CODE MASTER (${i.length} TIKET)</span>
            <h3>1 QR Code untuk Seluruh Peserta dalam Pesanan Ini</h3>
            <p>Petugas RPC cukup memindai QR Master ini untuk verifikasi dan serah terima racepack seluruh ${i.length} peserta sekaligus.</p>
            <div class="master-runner-list">
              ${i.map((s,n)=>{var d;return`
                        <span class="master-runner-pill">#${n+1} ${a(s.fullNameKtp)} &bull; ${a(((d=s.event)==null?void 0:d.category)||"Kategori tidak tersedia")}</span>
              `}).join("")}
            </div>
          </div>
          <div class="master-qr-code-box">
            <img src="${e}" alt="Master QR ${a(p)}" class="master-qr-img" />
            <span class="master-qr-ref">ORDER: ${a(p.substring(0,18))}</span>
          </div>
        </div>
      `}const D=i.map((e,s)=>{var T,E,I,P,S,x,C;const n=(T=e.event)!=null&&T.category?String(e.event.category).toUpperCase():"Kategori tidak tersedia",d=((E=e.event)==null?void 0:E.ticketName)||"Nama kategori belum tersedia",N=((I=c==null?void 0:c.contact_address)==null?void 0:I.trim())||"Lokasi belum tersedia",M=e.qrImageDataUrl,$=((P=e.event)==null?void 0:P.benefits)||[],L=$.length>0?$.map(q=>`
            <div class="stub-checklist-item">
              <i class="fa-regular fa-square-check"></i> ${a(q.name)}
            </div>
          `).join(""):`
          <div class="stub-checklist-item">
            Informasi paket lomba belum tersedia.
          </div>
        `;return`
        ${s>0&&i.length>1?`
        <div class="ticket-separator">
          <span class="ticket-separator-label">TIKET PESERTA #${s+1} DARI ${i.length}</span>
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
                <h2>${a(h)}</h2>
                <p>OFFICIAL RACE ENTRY PASS &bull; VERIFIKASI RESMI</p>
              </div>
            </div>

            <div class="ticket-header-meta">
              <span class="badge-paid-confirmed">
                <i class="fa-solid fa-circle-check"></i> TERDAFTAR &amp; LUNAS
              </span>
              <div class="order-code-text">
                REF ID: <strong>${a(p)}</strong>
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
                  <h3 class="ticket-name-big">${a(d)}</h3>
                  <span class="runner-name-display">${a(e.fullNameKtp)}</span>
                </div>

                <div class="category-pill-box">
                  <div class="category-tag">
                    <i class="fa-solid fa-flag-checkered"></i> KATEGORI ${a(n)}
                  </div>
                  <span class="pass-serial-text">
                    ${i.length>1?`PESERTA ${s+1} DARI ${i.length}`:"ENTRY PASS RESMI"}
                  </span>
                </div>
              </div>

              <!-- Runner Details Grid -->
              <div class="details-grid">
                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-user-check"></i> Nama Lengkap (KTP)</div>
                  <div class="detail-val">${a(e.fullNameKtp)}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-id-card"></i> Nomor Identitas (NIK)</div>
                  <div class="detail-val" style="font-family: ui-monospace, monospace;">${a(U(e.nik))}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-shirt"></i> Jersey &amp; Ukuran</div>
                  <div class="detail-val">
                    ${a(((S=e.jersey)==null?void 0:S.name)||((x=e.jersey)==null?void 0:x.type)||"Data jersey belum tersedia")}
                    ${e.selectedSize?`&bull; Ukuran <strong>${a(e.selectedSize)}</strong>`:""}
                  </div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-droplet"></i> Golongan Darah</div>
                  <div class="detail-val">${a(e.bloodType||"-")}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-phone-volume"></i> Kontak Darurat (ICE)</div>
                  <div class="detail-val">${a(e.emergencyContactPhone||"-")} (${a(e.emergencyContactName||"-")})</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-location-dot"></i> Lokasi &amp; Tanggal</div>
                  <div class="detail-val">${a(N)} &bull; ${w((C=e.event)==null?void 0:C.eventDate)}</div>
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
                <img src="${M}" alt="QR E-Tiket ${a(e.fullNameKtp)}" class="stub-qr-image" />
                <div class="stub-scan-hint">${a(e.fullNameKtp)} &bull; ${a(n)}</div>
              </div>

              <!-- Simulated Barcode -->
              <div class="stub-barcode-container">
                <div class="simulated-barcode"></div>
                <div class="barcode-code-text">${a(p)}</div>
              </div>

              <!-- RPC Checklist Breakdown (Mengikuti Tiket Event yang didaftar) -->
              <div class="stub-checklist-box">
                <div class="stub-checklist-title">
                  <i class="fa-solid fa-clipboard-check"></i> Hak Paket Lomba Resmi:
                </div>
                ${L}
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
        ${s===0?A:""}
      `}).join("");if(t.innerHTML=R+D,l&&r.racepackInstructions){const e=r.racepackInstructions,s=e.title||"Petunjuk Pengambilan Racepack & Race Day:",n=Array.isArray(e.points)?e.points:[];n.length>0&&(l.innerHTML=`
          <h4><i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> ${a(s)}</h4>
          <ul>
            ${n.map(d=>`<li>${a(d)}</li>`).join("")}
          </ul>
        `,l.hidden=!1)}t.dataset.renderStatus="ready"}catch(v){t.dataset.renderStatus="error",t.innerHTML=`
      <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #F59E0B; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">Gagal Menghubungkan ke Server</h3>
        <p style="color: #64748B; margin-bottom: 20px;">${a(v.message)}</p>
        <button onclick="location.reload()" class="btn btn-print">
          <i class="fa-solid fa-rotate-right"></i> Coba Muat Ulang
        </button>
      </div>
    `}}document.addEventListener("DOMContentLoaded",_);
