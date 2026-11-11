import{a as I}from"./api-BxOmbn0x.js";/* empty css              */import{l as $}from"./branding-CYeaw-kO.js";$();function L(t="success",r=""){const o=document.getElementById("ticketToastContainer");if(!o)return;const i=document.createElement("div");i.className=`toast toast-${t}`,i.innerHTML=`
    <div class="toast-icon">
      <i class="${t==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${t==="success"?"Berhasil":"Perhatian"}</h5>
      <p>${r}</p>
    </div>
  `,o.appendChild(i),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),300)},3500)}function c(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function E(t){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(t||0)}let S=null;function A(t){if(!t)return;const r=new Date(t).getTime();function o(){const i=Date.now(),n=r-i;if(n<=0){document.getElementById("tdDays").textContent="00",document.getElementById("tdHours").textContent="00",document.getElementById("tdMinutes").textContent="00",document.getElementById("tdSeconds").textContent="00",clearInterval(S);return}const s=Math.floor(n/(1e3*60*60*24)),u=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),m=Math.floor(n%(1e3*60*60)/(1e3*60)),y=Math.floor(n%(1e3*60)/1e3),d=p=>String(p).padStart(2,"0");document.getElementById("tdDays").textContent=d(s),document.getElementById("tdHours").textContent=d(u),document.getElementById("tdMinutes").textContent=d(m),document.getElementById("tdSeconds").textContent=d(y)}o(),S=setInterval(o,1e3)}async function M(){var s,u;const r=new URLSearchParams(window.location.search).get("id"),o=document.getElementById("tdLoadingState"),i=document.getElementById("tdErrorState"),n=document.getElementById("tdContentSection");if(!r){o.style.display="none",i.style.display="block",document.getElementById("tdErrorMessage").textContent="Tautan kategori tidak lengkap. Silakan kembali ke beranda dan pilih kategori yang tersedia.";return}try{const[m,y,d]=await Promise.all([I(`/events/${r}`),I("/settings/checkout-config").catch(()=>null),I("/settings/countdown").catch(()=>null)]),p=await m.text();let f=null;try{f=p?JSON.parse(p):{}}catch{throw new Error("Respons server tidak dapat dibaca.")}if(!m.ok||f.status!=="success"||!f.data){o.style.display="none",i.style.display="block",document.getElementById("tdErrorMessage").textContent="Kategori ini tidak ditemukan atau sudah tidak tersedia. Silakan kembali ke beranda untuk melihat pilihan lainnya.";return}let x={feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0};if(y&&y.ok)try{const a=await y.json();a.status==="success"&&a.data&&(x=a.data)}catch{}let k=!1;if(d!=null&&d.ok)try{const a=await d.json();k=((s=a.data)==null?void 0:s.isRegistrationClosed)===!0||String((u=a.data)==null?void 0:u.isRegistrationClosed).toLowerCase()==="true"}catch(a){console.warn("Gagal membaca status pendaftaran global:",a)}if(k){o.style.display="none",i.style.display="block";const a=document.querySelector("#tdErrorState h3");a&&(a.textContent="Pendaftaran Telah Ditutup"),document.getElementById("tdErrorMessage").textContent="Informasi pendaftaran kategori ini tidak tersedia karena pendaftaran telah ditutup.";return}const h=f.data;N(h,x,k),o.style.display="none",n.style.display="block",n.classList.add("td-content-enter")}catch(m){console.error("Gagal memuat detail tiket:",m),o.style.display="none",i.style.display="block",document.getElementById("tdErrorMessage").textContent="Informasi tiket belum dapat dimuat. Periksa koneksi internet Anda, lalu coba kembali."}}function N(t,r={},o=!1){const i=!!t.isClosed||o;document.title=`${t.ticketName} - Tegal Run 2027`;const n=document.getElementById("tdTicketCoverImg"),s=document.getElementById("tdTicketCover");if(n){const e=t.ticketImage||t.medalImage;e?(n.onerror=()=>{n.hidden=!0,s&&s.classList.add("td-ticket-cover-empty")},n.onload=()=>{n.hidden=!1,s&&s.classList.remove("td-ticket-cover-empty")},n.src=e,n.style.display="block"):(n.style.display="none",n.hidden=!0,s&&s.classList.add("td-ticket-cover-empty"))}document.getElementById("tdCategoryTag").textContent=t.category||"Kategori Lomba",document.getElementById("tdTicketName").textContent=t.ticketName,document.getElementById("tdTicketSubtitle").textContent=`Total kuota: ${Number(t.stock||0).toLocaleString("id-ID")} peserta`;const u=document.getElementById("tdStatusBadge");i?(u.className="td-badge closed",u.innerHTML=o?'<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup':'<i class="fa-solid fa-lock"></i> Kategori Ditutup'):(u.className="td-badge open",u.innerHTML='<i class="fa-solid fa-lock-open"></i> Pendaftaran Dibuka');const m=Number(t.price)||0,y=typeof t.remainingStock=="number"?t.remainingStock:t.stock,d=typeof t.registeredCount=="number"?t.registeredCount:0,p=!!(r.feeEnabled&&Number(r.feeAmount)>0),f=p?Number(r.feeAmount):0,x=r.feeType||"PER_TRANSACTION",k=m+f;document.getElementById("tdPrice").textContent=E(m);const h=document.getElementById("tdCardBasePrice");h&&(h.textContent=E(m));const a=document.getElementById("tdCardFeeLabel"),b=document.getElementById("tdCardFeeAmount");b&&(p?(b.textContent=`+ ${E(f)}`,b.style.color="#EA580C",a&&(a.textContent=`Biaya Layanan (${x==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`)):(b.textContent="Tidak dikenakan biaya",b.style.color="#10B981",a&&(a.textContent="Biaya Layanan:")));const B=document.getElementById("tdCardPrice");B&&(B.textContent=E(k)),document.getElementById("tdStock").textContent=`${y.toLocaleString("id-ID")} tiket`,document.getElementById("tdRegisteredCount").textContent=`${d.toLocaleString("id-ID")} peserta`;const v=Number(t.stock)||0,T=v>0?Math.max(0,Math.min(100,Math.round(y/v*100))):0;if(document.getElementById("tdStockPercentage").textContent=`${T}% tersedia`,document.getElementById("tdStockFill").style.width=`${T}%`,t.eventDate){const e=new Date(t.eventDate);document.getElementById("tdEventDate").textContent=e.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})+" WIB",A(t.eventDate)}else document.getElementById("tdEventDate").textContent="Belum diumumkan",document.getElementById("tdDays").textContent="--",document.getElementById("tdHours").textContent="--",document.getElementById("tdMinutes").textContent="--",document.getElementById("tdSeconds").textContent="--";const C=document.getElementById("tdBenefitsContainer");Array.isArray(t.benefits)&&t.benefits.length>0?(C.innerHTML=t.benefits.map(e=>`
      <div class="td-benefit-card">
        <div class="td-benefit-media">
          ${e.image?`<img class="td-benefit-image" src="${c(e.image)}" alt="${c(e.name)}" loading="lazy">`:'<span class="td-benefit-icon" aria-hidden="true"><i class="fa-solid fa-gift"></i></span>'}
        </div>
        <div class="td-benefit-content">
          <strong class="td-benefit-name">
            ${c(e.name)}
          </strong>
          <p class="td-benefit-description">
            ${c(e.description)}
          </p>
        </div>
      </div>
    `).join(""),C.querySelectorAll(".td-benefit-image").forEach(e=>{e.addEventListener("error",()=>{const g=document.createElement("span");g.className="td-benefit-icon",g.setAttribute("aria-hidden","true"),g.innerHTML='<i class="fa-solid fa-gift"></i>',e.replaceWith(g)},{once:!0})})):C.innerHTML=`
      <p class="td-empty-state">
        Informasi fasilitas untuk kategori ini belum tersedia.
      </p>
    `;const w=document.getElementById("tdJerseysContainer");Array.isArray(t.jerseys)&&t.jerseys.length>0?w.innerHTML=t.jerseys.map(e=>{let g=[];try{g=Array.isArray(e.sizes)?e.sizes:JSON.parse(e.sizes)}catch{g=[]}return`
        <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 1rem; color: var(--color-text-title);">${c(e.name)}</strong>
            <span class="badge" style="background: #FFFFFF; font-weight: 700;">Jenis: ${c(e.type)}</span>
          </div>
          ${g.length?`
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-muted);">Pilihan ukuran:</span>
              ${g.map(D=>`<span style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; color: var(--color-primary);">${c(D)}</span>`).join("")}
            </div>
          `:""}
        </div>
      `}).join(""):w.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Informasi jersey untuk kategori ini belum tersedia.
      </p>
    `;const F=document.getElementById("tdBibContainer");if(t.bibConfig){const e=t.bibConfig;F.innerHTML=`
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--color-primary-subtle); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800;">
            ${c(e.prefix||"BIB")}
          </div>
          <div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-title);">
              Format Nomor Dada: <code>${c(e.prefix)}${String(e.startNumber||1).padStart(Math.max(1,e.digitLength||4),"0")}${c(e.suffix||"")}</code>
            </div>
            <small style="color: #64748B;">Nomor dada peserta mengikuti format yang ditetapkan untuk kategori ini.</small>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; border-top: 1px dashed var(--color-border-subtle); padding-top: 10px; margin-top: 10px;">
          <i class="fa-solid fa-triangle-exclamation" style="color: #F59E0B; margin-right: 4px;"></i>
          Nomor dada peserta ditetapkan untuk keperluan identifikasi selama perlombaan.
        </div>
      </div>
    `}else F.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Informasi nomor dada untuk kategori ini belum tersedia.
      </p>
    `;const l=document.getElementById("tdBtnRegisterNow");i?(l.classList.remove("btn-glow"),l.style.opacity="0.6",l.style.pointerEvents="none",l.setAttribute("aria-disabled","true"),l.removeAttribute("href"),l.innerHTML=o?'<i class="fa-solid fa-ban"></i> Pendaftaran Ditutup':'<i class="fa-solid fa-lock"></i> Kategori Ditutup'):(l.removeAttribute("aria-disabled"),l.style.opacity="",l.style.pointerEvents="",l.href=`/?register=${t.id}#kategori`,l.innerHTML=`<i class="fa-solid fa-ticket"></i> Daftar Kategori ${c(t.category)}`)}document.addEventListener("DOMContentLoaded",()=>{var t;M(),(t=document.getElementById("btnShareTicket"))==null||t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(window.location.href),L("success","Tautan kategori berhasil disalin.")}catch(r){console.error("Gagal menyalin tautan kategori:",r),L("error","Tautan tidak dapat disalin. Silakan salin alamat halaman ini secara manual.")}})});
