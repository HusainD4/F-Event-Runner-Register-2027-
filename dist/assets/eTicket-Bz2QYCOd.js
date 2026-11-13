import{a as D}from"./api-Biu4OxHL.js";import{l as M}from"./branding-BuOTZVk0.js";import"./home-appearance-Db1ttUVV.js";const L=M();function a(i){return i?String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function K(i){return!i||i.length<8?i||"-":i.substring(0,6)+"******"+i.substring(i.length-4)}function B(i){if(!i)return"Tanggal belum tersedia";try{const n=new Date(i);return Number.isNaN(n.getTime())?"Tanggal belum tersedia":n.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"short",year:"numeric"})}catch{return"Tanggal belum tersedia"}}async function _(){var f;const i=document.getElementById("ticketMount"),n=document.querySelector(".instructions-box");if(!i)return;const o=new URLSearchParams(window.location.search),g=o.get("orderId")||o.get("id")||o.get("midtransOrderId")||o.get("code")||o.get("q"),p=g?g.trim():"";if(!p){i.innerHTML=`
      <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #EF4444; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">ID Pesanan Tidak Ditemukan</h3>
        <p style="color: #64748B; max-width: 480px; margin: 0 auto;">Silakan buka tautan E-Tiket dari email / WhatsApp konfirmasi Anda atau cari melalui menu Cek Tiket.</p>
        <a href="/cek-tiket.html" class="btn btn-back" style="margin-top: 20px;">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Pencarian Tiket
        </a>
      </div>
    `;return}try{const v=await D(`/tickets/e-ticket/${encodeURIComponent(p)}`),m=await v.json();if(!v.ok||m.status!=="success"){i.innerHTML=`
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
      `;return}const r=m.data,t=r.participants||[],d=await L,b=((f=d==null?void 0:d.navbar_title)==null?void 0:f.trim())||"E-Tiket Resmi";if(document.title=`E-Tiket Resmi - ${b}`,t.length===0){i.innerHTML=`
        <div class="e-ticket-card" style="padding: 40px; text-align: center;">
          <i class="fa-solid fa-user-xmark" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 14px;"></i>
          <p style="color: #64748B;">Tidak ada data peserta terdaftar dalam pesanan ini.</p>
        </div>
      `;return}const u=r.midtransOrderId||r.id;let k="";if(t.length>1){const e=r.masterQrImageDataUrl;k=`
        <div class="master-qr-banner">
          <div class="master-qr-info">
            <span class="badge-master"><i class="fa-solid fa-layer-group"></i> QR CODE MASTER (${t.length} TIKET)</span>
            <h3>1 QR Code untuk Seluruh Peserta dalam Pesanan Ini</h3>
            <p>Petugas RPC cukup memindai QR Master ini untuk verifikasi dan serah terima racepack seluruh ${t.length} peserta sekaligus.</p>
            <div class="master-runner-list">
              ${t.map((s,l)=>{var c;return`
                        <span class="master-runner-pill">#${l+1} ${a(s.fullNameKtp)} &bull; ${a(((c=s.event)==null?void 0:c.category)||"Kategori tidak tersedia")}</span>
              `}).join("")}
            </div>
          </div>
          <div class="master-qr-code-box">
            <img src="${e}" alt="Master QR ${a(u)}" class="master-qr-img" />
            <span class="master-qr-ref">ORDER: ${a(u.substring(0,18))}</span>
          </div>
        </div>
      `}const P=t.map((e,s)=>{var y,R,T,$,x,I,E;const l=(y=e.event)!=null&&y.category?String(e.event.category).toUpperCase():"Kategori tidak tersedia",c=((R=e.event)==null?void 0:R.ticketName)||"Nama kategori belum tersedia",S=((T=d==null?void 0:d.contact_address)==null?void 0:T.trim())||"Lokasi belum tersedia",C=e.qrImageDataUrl,h=(($=e.event)==null?void 0:$.benefits)||[],A=h.length>0?h.map(N=>`
            <div class="stub-checklist-item">
              <i class="fa-regular fa-square-check"></i> ${a(N.name)}
            </div>
          `).join(""):`
          <div class="stub-checklist-item">
            Informasi paket lomba belum tersedia.
          </div>
        `;return`
        ${s>0&&t.length>1?`
        <div class="ticket-separator">
          <span class="ticket-separator-label">TIKET PESERTA #${s+1} DARI ${t.length}</span>
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
                <h2>${a(b)}</h2>
                <p>OFFICIAL RACE ENTRY PASS &bull; VERIFIKASI RESMI</p>
              </div>
            </div>

            <div class="ticket-header-meta">
              <span class="badge-paid-confirmed">
                <i class="fa-solid fa-circle-check"></i> TERDAFTAR &amp; LUNAS
              </span>
              <div class="order-code-text">
                REF ID: <strong>${a(u)}</strong>
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
                  <h3 class="ticket-name-big">${a(c)}</h3>
                  <span class="runner-name-display">${a(e.fullNameKtp)}</span>
                </div>

                <div class="category-pill-box">
                  <div class="category-tag">
                    <i class="fa-solid fa-flag-checkered"></i> KATEGORI ${a(l)}
                  </div>
                  <span class="pass-serial-text">
                    ${t.length>1?`PESERTA ${s+1} DARI ${t.length}`:"ENTRY PASS RESMI"}
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
                  <div class="detail-val" style="font-family: ui-monospace, monospace;">${a(K(e.nik))}</div>
                </div>

                <div class="detail-item">
                  <div class="detail-label"><i class="fa-solid fa-shirt"></i> Jersey &amp; Ukuran</div>
                  <div class="detail-val">
                    ${a(((x=e.jersey)==null?void 0:x.name)||((I=e.jersey)==null?void 0:I.type)||"Data jersey belum tersedia")}
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
                  <div class="detail-val">${a(S)} &bull; ${B((E=e.event)==null?void 0:E.eventDate)}</div>
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
                <img src="${C}" alt="QR E-Tiket ${a(e.fullNameKtp)}" class="stub-qr-image" />
                <div class="stub-scan-hint">${a(e.fullNameKtp)} &bull; ${a(l)}</div>
              </div>

              <!-- Simulated Barcode -->
              <div class="stub-barcode-container">
                <div class="simulated-barcode"></div>
                <div class="barcode-code-text">${a(u)}</div>
              </div>

              <!-- RPC Checklist Breakdown (Mengikuti Tiket Event yang didaftar) -->
              <div class="stub-checklist-box">
                <div class="stub-checklist-title">
                  <i class="fa-solid fa-clipboard-check"></i> Hak Paket Lomba Resmi:
                </div>
                ${A}
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
      `}).join("");if(i.innerHTML=k+P,n&&r.racepackInstructions){const e=r.racepackInstructions,s=e.title||"Petunjuk Pengambilan Racepack & Race Day:",l=Array.isArray(e.points)?e.points:[];l.length>0&&(n.innerHTML=`
          <h4><i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> ${a(s)}</h4>
          <ul>
            ${l.map(c=>`<li>${a(c)}</li>`).join("")}
          </ul>
        `,n.hidden=!1)}}catch(v){i.innerHTML=`
      <div class="e-ticket-card" style="padding: 48px 24px; text-align: center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #F59E0B; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">Gagal Menghubungkan ke Server</h3>
        <p style="color: #64748B; margin-bottom: 20px;">${a(v.message)}</p>
        <button onclick="location.reload()" class="btn btn-print">
          <i class="fa-solid fa-rotate-right"></i> Coba Muat Ulang
        </button>
      </div>
    `}}document.addEventListener("DOMContentLoaded",_);
