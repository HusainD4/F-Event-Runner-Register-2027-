import{a as L}from"./api-iQl_QkSJ.js";/* empty css              */import{l as N}from"./branding-BfJdYcQT.js";import"./home-appearance-Cphxc5oZ.js";N();function D(e="success",d=""){const s=document.getElementById("ticketToastContainer");if(!s)return;const r=document.createElement("div");r.className=`toast toast-${e}`,r.innerHTML=`
    <div class="toast-icon">
      <i class="${e==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${e==="success"?"Berhasil":"Perhatian"}</h5>
      <p>${d}</p>
    </div>
  `,s.appendChild(r),setTimeout(()=>{r.style.opacity="0",setTimeout(()=>r.remove(),300)},3500)}function o(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function v(e){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e||0)}let M=null;function j(e){if(!e)return;const d=new Date(e).getTime();function s(){const r=Date.now(),n=d-r;if(n<=0){document.getElementById("tdDays").textContent="00",document.getElementById("tdHours").textContent="00",document.getElementById("tdMinutes").textContent="00",document.getElementById("tdSeconds").textContent="00",clearInterval(M);return}const l=Math.floor(n/(1e3*60*60*24)),g=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),u=Math.floor(n%(1e3*60*60)/(1e3*60)),f=Math.floor(n%(1e3*60)/1e3),c=k=>String(k).padStart(2,"0");document.getElementById("tdDays").textContent=c(l),document.getElementById("tdHours").textContent=c(g),document.getElementById("tdMinutes").textContent=c(u),document.getElementById("tdSeconds").textContent=c(f)}s(),M=setInterval(s,1e3)}async function P(){var l,g;const d=new URLSearchParams(window.location.search).get("id"),s=document.getElementById("tdLoadingState"),r=document.getElementById("tdErrorState"),n=document.getElementById("tdContentSection");if(!d){s.style.display="none",r.style.display="block",document.getElementById("tdErrorMessage").textContent="Tautan kategori tidak lengkap. Silakan kembali ke beranda dan pilih kategori yang tersedia.";return}try{const[u,f,c]=await Promise.all([L(`/events/${d}`),L("/settings/checkout-config").catch(()=>null),L("/settings/countdown").catch(()=>null)]),k=await u.text();let b=null;try{b=k?JSON.parse(k):{}}catch{throw new Error("Respons server tidak dapat dibaca.")}if(!u.ok||b.status!=="success"||!b.data){s.style.display="none",r.style.display="block",document.getElementById("tdErrorMessage").textContent="Kategori ini tidak ditemukan atau sudah tidak tersedia. Silakan kembali ke beranda untuk melihat pilihan lainnya.";return}let I={feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0};if(f&&f.ok)try{const i=await f.json();i.status==="success"&&i.data&&(I=i.data)}catch{}let h=!1;if(c!=null&&c.ok)try{const i=await c.json();h=((l=i.data)==null?void 0:l.isRegistrationClosed)===!0||String((g=i.data)==null?void 0:g.isRegistrationClosed).toLowerCase()==="true"}catch(i){console.warn("Gagal membaca status pendaftaran global:",i)}if(h){s.style.display="none",r.style.display="block";const i=document.querySelector("#tdErrorState h3");i&&(i.textContent="Pendaftaran Telah Ditutup"),document.getElementById("tdErrorMessage").textContent="Informasi pendaftaran kategori ini tidak tersedia karena pendaftaran telah ditutup.";return}const C=b.data;F(C,I,h),s.style.display="none",n.style.display="block",n.classList.add("td-content-enter")}catch(u){console.error("Gagal memuat detail tiket:",u),s.style.display="none",r.style.display="block",document.getElementById("tdErrorMessage").textContent="Informasi tiket belum dapat dimuat. Periksa koneksi internet Anda, lalu coba kembali."}}function F(e,d={},s=!1){const r=!!e.isClosed||s;document.title=`${e.ticketName} - Tegal Run 2027`;const n=document.getElementById("tdTicketCoverImg"),l=document.getElementById("tdTicketCover");if(n){const t=e.ticketImage||e.medalImage;t?(n.onerror=()=>{n.hidden=!0,l&&l.classList.add("td-ticket-cover-empty")},n.onload=()=>{n.hidden=!1,l&&l.classList.remove("td-ticket-cover-empty")},n.src=t,n.style.display="block"):(n.style.display="none",n.hidden=!0,l&&l.classList.add("td-ticket-cover-empty"))}document.getElementById("tdCategoryTag").textContent=e.category||"Kategori Lomba",document.getElementById("tdTicketName").textContent=e.ticketName,document.getElementById("tdTicketSubtitle").textContent=`Total kuota: ${Number(e.stock||0).toLocaleString("id-ID")} peserta`;const g=document.getElementById("tdStatusBadge");r?(g.className="td-badge closed",g.innerHTML=s?'<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup':'<i class="fa-solid fa-lock"></i> Kategori Ditutup'):(g.className="td-badge open",g.innerHTML='<i class="fa-solid fa-lock-open"></i> Pendaftaran Dibuka');const u=Number(e.price)||0,f=typeof e.remainingStock=="number"?e.remainingStock:e.stock,c=typeof e.registeredCount=="number"?e.registeredCount:0,k=!!(d.feeEnabled&&Number(d.feeAmount)>0),b=k?Number(d.feeAmount):0,I=d.feeType||"PER_TRANSACTION",h=u+b;document.getElementById("tdPrice").textContent=v(u);const C=document.getElementById("tdCardBasePrice");C&&(C.textContent=v(u));const i=document.getElementById("tdCardFeeLabel"),E=document.getElementById("tdCardFeeAmount");E&&(k?(E.textContent=`+ ${v(b)}`,E.style.color="#EA580C",i&&(i.textContent=`Biaya Layanan (${I==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`)):(E.textContent="Tidak dikenakan biaya",E.style.color="#10B981",i&&(i.textContent="Biaya Layanan:")));const $=document.getElementById("tdCardPrice");$&&($.textContent=v(h)),document.getElementById("tdStock").textContent=`${f.toLocaleString("id-ID")} tiket`,document.getElementById("tdRegisteredCount").textContent=`${c.toLocaleString("id-ID")} peserta`;const S=Number(e.stock)||0,A=S>0?Math.max(0,Math.min(100,Math.round(f/S*100))):0;if(document.getElementById("tdStockPercentage").textContent=`${A}% tersedia`,document.getElementById("tdStockFill").style.width=`${A}%`,e.eventDate){const t=new Date(e.eventDate);document.getElementById("tdEventDate").textContent=t.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})+" WIB",j(e.eventDate)}else document.getElementById("tdEventDate").textContent="Belum diumumkan",document.getElementById("tdDays").textContent="--",document.getElementById("tdHours").textContent="--",document.getElementById("tdMinutes").textContent="--",document.getElementById("tdSeconds").textContent="--";const T=document.getElementById("tdBenefitsContainer");Array.isArray(e.benefits)&&e.benefits.length>0?(T.innerHTML=e.benefits.map(t=>`
      <div class="td-benefit-card">
        <div class="td-benefit-media">
          ${t.image?`<img class="td-benefit-image" src="${o(t.image)}" alt="${o(t.name)}" loading="lazy">`:'<span class="td-benefit-icon" aria-hidden="true"><i class="fa-solid fa-gift"></i></span>'}
        </div>
        <div class="td-benefit-content">
          <strong class="td-benefit-name">
            ${o(t.name)}
          </strong>
          <p class="td-benefit-description">
            ${o(t.description)}
          </p>
        </div>
      </div>
    `).join(""),T.querySelectorAll(".td-benefit-image").forEach(t=>{t.addEventListener("error",()=>{const a=document.createElement("span");a.className="td-benefit-icon",a.setAttribute("aria-hidden","true"),a.innerHTML='<i class="fa-solid fa-gift"></i>',t.replaceWith(a)},{once:!0})})):T.innerHTML=`
      <p class="td-empty-state">
        Informasi fasilitas untuk kategori ini belum tersedia.
      </p>
    `;const x=document.getElementById("tdJerseysContainer");Array.isArray(e.jerseys)&&e.jerseys.length>0?(x.innerHTML=e.jerseys.map(t=>{let a=[];try{a=Array.isArray(t.sizes)?t.sizes:JSON.parse(t.sizes)}catch{a=[]}let p=[];try{const y=Array.isArray(t.bannerImages)?t.bannerImages:JSON.parse(t.bannerImages||"[]");Array.isArray(y)&&(p=y.filter(B=>typeof B=="string"&&/^https?:\/\//i.test(B)).slice(0,5))}catch{p=[]}return`
        <article class="td-jersey-card">
          <div class="td-jersey-media">
            ${t.image?`<img class="td-jersey-image" src="${o(t.image)}" alt="${o(t.name)}" loading="lazy">`:'<span class="td-jersey-image-fallback" aria-hidden="true"><i class="fa-solid fa-shirt"></i></span>'}
          </div>
          <div class="td-jersey-content">
            <div class="td-jersey-heading">
              <strong class="td-jersey-name">${o(t.name)}</strong>
              <span class="td-jersey-type">Jenis: ${o(t.type)}</span>
            </div>
          ${a.length?`
            <div class="td-jersey-sizes">
              <span class="td-jersey-size-label">Pilihan ukuran:</span>
              <div class="td-jersey-size-list">
                ${a.map(y=>`<span class="td-jersey-size">${o(y)}</span>`).join("")}
              </div>
            </div>
          `:""}
          ${p.length?`
            <div class="td-jersey-banners">
              <span class="td-jersey-size-label"><i class="fa-regular fa-images" aria-hidden="true"></i> Informasi jersey</span>
              <div class="td-jersey-banner-grid">
                ${p.map((y,B)=>`
                  <figure class="td-jersey-banner">
                    <img src="${o(y)}" alt="Informasi ${o(t.name)} ${B+1}" loading="lazy">
                  </figure>
                `).join("")}
              </div>
            </div>
          `:""}
          </div>
        </article>
      `}).join(""),x.querySelectorAll(".td-jersey-image").forEach(t=>{t.addEventListener("error",()=>{const a=document.createElement("span");a.className="td-jersey-image-fallback",a.setAttribute("aria-hidden","true"),a.innerHTML='<i class="fa-solid fa-shirt"></i>',t.replaceWith(a)},{once:!0})}),x.querySelectorAll(".td-jersey-banner img").forEach(t=>{t.addEventListener("error",()=>{var y;const a=t.closest(".td-jersey-banner"),p=a==null?void 0:a.parentElement;a==null||a.remove(),p&&!p.querySelector(".td-jersey-banner")&&((y=p.closest(".td-jersey-banners"))==null||y.remove())},{once:!0})})):x.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Informasi jersey untuk kategori ini belum tersedia.
      </p>
    `;const w=document.getElementById("tdBibContainer");if(e.bibConfig){const t=e.bibConfig;w.innerHTML=`
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--color-primary-subtle); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800;">
            ${o(t.prefix||"BIB")}
          </div>
          <div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-title);">
              Format Nomor Dada: <code>${o(t.prefix)}${String(t.startNumber||1).padStart(Math.max(1,t.digitLength||4),"0")}${o(t.suffix||"")}</code>
            </div>
            <small style="color: #64748B;">Nomor dada peserta mengikuti format yang ditetapkan untuk kategori ini.</small>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; border-top: 1px dashed var(--color-border-subtle); padding-top: 10px; margin-top: 10px;">
          <i class="fa-solid fa-triangle-exclamation" style="color: #F59E0B; margin-right: 4px;"></i>
          Nomor dada peserta ditetapkan untuk keperluan identifikasi selama perlombaan.
        </div>
      </div>
    `}else w.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Informasi nomor dada untuk kategori ini belum tersedia.
      </p>
    `;const m=document.getElementById("tdBtnRegisterNow");r?(m.classList.remove("btn-glow"),m.style.opacity="0.6",m.style.pointerEvents="none",m.setAttribute("aria-disabled","true"),m.removeAttribute("href"),m.innerHTML=s?'<i class="fa-solid fa-ban"></i> Pendaftaran Ditutup':'<i class="fa-solid fa-lock"></i> Kategori Ditutup'):(m.removeAttribute("aria-disabled"),m.style.opacity="",m.style.pointerEvents="",m.href=`/?register=${e.id}#kategori`,m.innerHTML=`<i class="fa-solid fa-ticket"></i> Daftar Kategori ${o(e.category)}`)}document.addEventListener("DOMContentLoaded",()=>{var e;P(),(e=document.getElementById("btnShareTicket"))==null||e.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(window.location.href),D("success","Tautan kategori berhasil disalin.")}catch(d){console.error("Gagal menyalin tautan kategori:",d),D("error","Tautan tidak dapat disalin. Silakan salin alamat halaman ini secara manual.")}})});
