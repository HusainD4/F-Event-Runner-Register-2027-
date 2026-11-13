import{a as B}from"./api-iQl_QkSJ.js";/* empty css              */import{l as D}from"./branding-Bfj0bFPs.js";import{p as M,r as N}from"./jersey-gallery-Dq1x9sXj.js";import"./home-appearance-Db1ttUVV.js";D().then(e=>{const r=document.getElementById("tdJerseyGallerySection"),i=document.getElementById("tdJerseyGallery"),a=M(e==null?void 0:e.jersey_gallery_images);N(i,a),r.hidden=!a.length});function $(e="success",r=""){const i=document.getElementById("ticketToastContainer");if(!i)return;const a=document.createElement("div");a.className=`toast toast-${e}`,a.innerHTML=`
    <div class="toast-icon">
      <i class="${e==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${e==="success"?"Berhasil":"Perhatian"}</h5>
      <p>${r}</p>
    </div>
  `,i.appendChild(a),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),300)},3500)}function d(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function I(e){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e||0)}let w=null;function P(e){if(!e)return;const r=new Date(e).getTime();function i(){const a=Date.now(),n=r-a;if(n<=0){document.getElementById("tdDays").textContent="00",document.getElementById("tdHours").textContent="00",document.getElementById("tdMinutes").textContent="00",document.getElementById("tdSeconds").textContent="00",clearInterval(w);return}const l=Math.floor(n/(1e3*60*60*24)),g=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),u=Math.floor(n%(1e3*60*60)/(1e3*60)),y=Math.floor(n%(1e3*60)/1e3),c=f=>String(f).padStart(2,"0");document.getElementById("tdDays").textContent=c(l),document.getElementById("tdHours").textContent=c(g),document.getElementById("tdMinutes").textContent=c(u),document.getElementById("tdSeconds").textContent=c(y)}i(),w=setInterval(i,1e3)}async function F(){var l,g;const r=new URLSearchParams(window.location.search).get("id"),i=document.getElementById("tdLoadingState"),a=document.getElementById("tdErrorState"),n=document.getElementById("tdContentSection");if(!r){i.style.display="none",a.style.display="block",document.getElementById("tdErrorMessage").textContent="Tautan kategori tidak lengkap. Silakan kembali ke beranda dan pilih kategori yang tersedia.";return}try{const[u,y,c]=await Promise.all([B(`/events/${r}`),B("/settings/checkout-config").catch(()=>null),B("/settings/countdown").catch(()=>null)]),f=await u.text();let p=null;try{p=f?JSON.parse(f):{}}catch{throw new Error("Respons server tidak dapat dibaca.")}if(!u.ok||p.status!=="success"||!p.data){i.style.display="none",a.style.display="block",document.getElementById("tdErrorMessage").textContent="Kategori ini tidak ditemukan atau sudah tidak tersedia. Silakan kembali ke beranda untuk melihat pilihan lainnya.";return}let h={feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0};if(y&&y.ok)try{const o=await y.json();o.status==="success"&&o.data&&(h=o.data)}catch{}let k=!1;if(c!=null&&c.ok)try{const o=await c.json();k=((l=o.data)==null?void 0:l.isRegistrationClosed)===!0||String((g=o.data)==null?void 0:g.isRegistrationClosed).toLowerCase()==="true"}catch(o){console.warn("Gagal membaca status pendaftaran global:",o)}if(k){i.style.display="none",a.style.display="block";const o=document.querySelector("#tdErrorState h3");o&&(o.textContent="Pendaftaran Telah Ditutup"),document.getElementById("tdErrorMessage").textContent="Informasi pendaftaran kategori ini tidak tersedia karena pendaftaran telah ditutup.";return}const E=p.data;j(E,h,k),i.style.display="none",n.style.display="block",n.classList.add("td-content-enter")}catch(u){console.error("Gagal memuat detail tiket:",u),i.style.display="none",a.style.display="block",document.getElementById("tdErrorMessage").textContent="Informasi tiket belum dapat dimuat. Periksa koneksi internet Anda, lalu coba kembali."}}function j(e,r={},i=!1){const a=!!e.isClosed||i;document.title=`${e.ticketName} - Tegal Run 2026`;const n=document.getElementById("tdTicketCoverImg"),l=document.getElementById("tdTicketCover");if(n){const t=e.ticketImage||e.medalImage;t?(n.onerror=()=>{n.hidden=!0,l&&l.classList.add("td-ticket-cover-empty")},n.onload=()=>{n.hidden=!1,l&&l.classList.remove("td-ticket-cover-empty")},n.src=t,n.style.display="block"):(n.style.display="none",n.hidden=!0,l&&l.classList.add("td-ticket-cover-empty"))}document.getElementById("tdCategoryTag").textContent=e.category||"Kategori Lomba",document.getElementById("tdTicketName").textContent=e.ticketName,document.getElementById("tdTicketSubtitle").textContent=`Total kuota: ${Number(e.stock||0).toLocaleString("id-ID")} peserta`;const g=document.getElementById("tdStatusBadge");a?(g.className="td-badge closed",g.innerHTML=i?'<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup':'<i class="fa-solid fa-lock"></i> Kategori Ditutup'):(g.className="td-badge open",g.innerHTML='<i class="fa-solid fa-lock-open"></i> Pendaftaran Dibuka');const u=Number(e.price)||0,y=typeof e.remainingStock=="number"?e.remainingStock:e.stock,c=typeof e.registeredCount=="number"?e.registeredCount:0,f=!!(r.feeEnabled&&Number(r.feeAmount)>0),p=f?Number(r.feeAmount):0,h=r.feeType||"PER_TRANSACTION",k=u+p;document.getElementById("tdPrice").textContent=I(u);const E=document.getElementById("tdCardBasePrice");E&&(E.textContent=I(u));const o=document.getElementById("tdCardFeeLabel"),b=document.getElementById("tdCardFeeAmount");b&&(f?(b.textContent=`+ ${I(p)}`,b.style.color="#EA580C",o&&(o.textContent=`Biaya Layanan (${h==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`)):(b.textContent="Tidak dikenakan biaya",b.style.color="#10B981",o&&(o.textContent="Biaya Layanan:")));const v=document.getElementById("tdCardPrice");v&&(v.textContent=I(k)),document.getElementById("tdStock").textContent=`${y.toLocaleString("id-ID")} tiket`,document.getElementById("tdRegisteredCount").textContent=`${c.toLocaleString("id-ID")} peserta`;const T=Number(e.stock)||0,L=T>0?Math.max(0,Math.min(100,Math.round(y/T*100))):0;if(document.getElementById("tdStockPercentage").textContent=`${L}% tersedia`,document.getElementById("tdStockFill").style.width=`${L}%`,e.eventDate){const t=new Date(e.eventDate);document.getElementById("tdEventDate").textContent=t.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})+" WIB",P(e.eventDate)}else document.getElementById("tdEventDate").textContent="Belum diumumkan",document.getElementById("tdDays").textContent="--",document.getElementById("tdHours").textContent="--",document.getElementById("tdMinutes").textContent="--",document.getElementById("tdSeconds").textContent="--";const C=document.getElementById("tdBenefitsContainer");Array.isArray(e.benefits)&&e.benefits.length>0?(C.innerHTML=e.benefits.map(t=>`
      <div class="td-benefit-card">
        <div class="td-benefit-media">
          ${t.image?`<img class="td-benefit-image" src="${d(t.image)}" alt="${d(t.name)}" loading="lazy">`:'<span class="td-benefit-icon" aria-hidden="true"><i class="fa-solid fa-gift"></i></span>'}
        </div>
        <div class="td-benefit-content">
          <strong class="td-benefit-name">
            ${d(t.name)}
          </strong>
          <p class="td-benefit-description">
            ${d(t.description)}
          </p>
        </div>
      </div>
    `).join(""),C.querySelectorAll(".td-benefit-image").forEach(t=>{t.addEventListener("error",()=>{const s=document.createElement("span");s.className="td-benefit-icon",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="fa-solid fa-gift"></i>',t.replaceWith(s)},{once:!0})})):C.innerHTML=`
      <p class="td-empty-state">
        Informasi fasilitas untuk kategori ini belum tersedia.
      </p>
    `;const x=document.getElementById("tdJerseysContainer");Array.isArray(e.jerseys)&&e.jerseys.length>0?(x.innerHTML=e.jerseys.map(t=>{let s=[];try{s=Array.isArray(t.sizes)?t.sizes:JSON.parse(t.sizes)}catch{s=[]}return`
        <article class="td-jersey-card">
          <div class="td-jersey-media">
            ${t.image?`<img class="td-jersey-image" src="${d(t.image)}" alt="${d(t.name)}" loading="lazy">`:'<span class="td-jersey-image-fallback" aria-hidden="true"><i class="fa-solid fa-shirt"></i></span>'}
          </div>
          <div class="td-jersey-content">
            <div class="td-jersey-heading">
              <strong class="td-jersey-name">${d(t.name)}</strong>
              <span class="td-jersey-type">Jenis: ${d(t.type)}</span>
            </div>
          ${s.length?`
            <div class="td-jersey-sizes">
              <span class="td-jersey-size-label">Pilihan ukuran:</span>
              <div class="td-jersey-size-list">
                ${s.map(A=>`<span class="td-jersey-size">${d(A)}</span>`).join("")}
              </div>
            </div>
          `:""}
          </div>
        </article>
      `}).join(""),x.querySelectorAll(".td-jersey-image").forEach(t=>{t.addEventListener("error",()=>{const s=document.createElement("span");s.className="td-jersey-image-fallback",s.setAttribute("aria-hidden","true"),s.innerHTML='<i class="fa-solid fa-shirt"></i>',t.replaceWith(s)},{once:!0})})):x.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Informasi jersey untuk kategori ini belum tersedia.
      </p>
    `;const S=document.getElementById("tdBibContainer");if(e.bibConfig){const t=e.bibConfig;S.innerHTML=`
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--color-primary-subtle); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800;">
            ${d(t.prefix||"BIB")}
          </div>
          <div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-title);">
              Format Nomor Dada: <code>${d(t.prefix)}${String(t.startNumber||1).padStart(Math.max(1,t.digitLength||4),"0")}${d(t.suffix||"")}</code>
            </div>
            <small style="color: #64748B;">Nomor dada peserta mengikuti format yang ditetapkan untuk kategori ini.</small>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; border-top: 1px dashed var(--color-border-subtle); padding-top: 10px; margin-top: 10px;">
          <i class="fa-solid fa-triangle-exclamation" style="color: #F59E0B; margin-right: 4px;"></i>
          Nomor dada peserta ditetapkan untuk keperluan identifikasi selama perlombaan.
        </div>
      </div>
    `}else S.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Informasi nomor dada untuk kategori ini belum tersedia.
      </p>
    `;const m=document.getElementById("tdBtnRegisterNow");a?(m.classList.remove("btn-glow"),m.style.opacity="0.6",m.style.pointerEvents="none",m.setAttribute("aria-disabled","true"),m.removeAttribute("href"),m.innerHTML=i?'<i class="fa-solid fa-ban"></i> Pendaftaran Ditutup':'<i class="fa-solid fa-lock"></i> Kategori Ditutup'):(m.removeAttribute("aria-disabled"),m.style.opacity="",m.style.pointerEvents="",m.href=`/?register=${e.id}#kategori`,m.innerHTML=`<i class="fa-solid fa-ticket"></i> Daftar Kategori ${d(e.category)}`)}document.addEventListener("DOMContentLoaded",()=>{var e;F(),(e=document.getElementById("btnShareTicket"))==null||e.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(window.location.href),$("success","Tautan kategori berhasil disalin.")}catch(r){console.error("Gagal menyalin tautan kategori:",r),$("error","Tautan tidak dapat disalin. Silakan salin alamat halaman ini secara manual.")}})});
