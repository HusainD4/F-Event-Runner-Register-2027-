import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */const L=typeof window<"u"&&["localhost","127.0.0.1"].includes(window.location.hostname)&&["3000","4173","5173","5174","5175"].includes(window.location.port),E=L?"/api":"https://api.haisen.my.id/api";function S(t="success",i=""){const e=document.getElementById("ticketToastContainer");if(!e)return;const n=document.createElement("div");n.className=`toast toast-${t}`,n.innerHTML=`
    <div class="toast-icon">
      <i class="${t==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${t==="success"?"Berhasil":"Peringatan"}</h5>
      <p>${i}</p>
    </div>
  `,e.appendChild(n),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),300)},3500)}function d(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function f(t){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(t||0)}let v=null;function D(t){if(!t)return;const i=new Date(t).getTime();function e(){const n=Date.now(),a=i-n;if(a<=0){document.getElementById("tdDays").textContent="00",document.getElementById("tdHours").textContent="00",document.getElementById("tdMinutes").textContent="00",document.getElementById("tdSeconds").textContent="00",clearInterval(v);return}const r=Math.floor(a/(1e3*60*60*24)),l=Math.floor(a%(1e3*60*60*24)/(1e3*60*60)),u=Math.floor(a%(1e3*60*60)/(1e3*60)),s=Math.floor(a%(1e3*60)/1e3),c=g=>String(g).padStart(2,"0");document.getElementById("tdDays").textContent=c(r),document.getElementById("tdHours").textContent=c(l),document.getElementById("tdMinutes").textContent=c(u),document.getElementById("tdSeconds").textContent=c(s)}e(),v=setInterval(e,1e3)}async function M(){const i=new URLSearchParams(window.location.search).get("id"),e=document.getElementById("tdLoadingState"),n=document.getElementById("tdErrorState"),a=document.getElementById("tdContentSection");if(!i){e.style.display="none",n.style.display="block",document.getElementById("tdErrorMessage").textContent="ID tiket tidak ditemukan dalam URL. Silakan pilih tiket melalui landing page.";return}try{const[r,l]=await Promise.all([fetch(`${E}/events/${i}`),fetch(`${E}/settings/checkout-config`).catch(()=>null)]),u=await r.text();let s=null;try{s=u?JSON.parse(u):{}}catch{throw new Error("Server backend tidak merespons JSON yang valid.")}if(!r.ok||s.status!=="success"||!s.data){e.style.display="none",n.style.display="block",document.getElementById("tdErrorMessage").textContent=s.message||"Data tiket tidak ditemukan di database backend.";return}let c={feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0};if(l&&l.ok)try{const m=await l.json();m.status==="success"&&m.data&&(c=m.data)}catch{}const g=s.data;$(g,c),e.style.display="none",a.style.display="block"}catch(r){e.style.display="none",n.style.display="block",document.getElementById("tdErrorMessage").textContent=`Gagal menghubungi server: ${r.message}. Pastikan backend di localhost:3000 aktif.`}}function $(t,i={}){document.title=`${t.ticketName} - Tegal Run 2027`;const e=document.getElementById("tdTicketCoverImg"),n=document.getElementById("tdTicketCover");if(e){const o=t.ticketImage||t.medalImage;o?(e.onerror=()=>{e.hidden=!0,n&&n.classList.add("td-ticket-cover-empty")},e.onload=()=>{e.hidden=!1,n&&n.classList.remove("td-ticket-cover-empty")},e.src=o,e.style.display="block"):(e.style.display="none",e.hidden=!0,n&&n.classList.add("td-ticket-cover-empty"))}document.getElementById("tdCategoryTag").textContent=`${d(t.category)} MARATHON`,document.getElementById("tdTicketName").textContent=t.ticketName,document.getElementById("tdTicketSubtitle").textContent=`Kategori Lomba Resmi • Kuota Total ${t.stock.toLocaleString("id-ID")} Peserta`;const a=document.getElementById("tdStatusBadge");t.isClosed?(a.className="td-badge closed",a.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Resmi Ditutup'):(a.className="td-badge open",a.innerHTML='<i class="fa-solid fa-lock-open"></i> Pendaftaran Sedang Buka');const r=Number(t.price)||0,l=!!(i.feeEnabled&&Number(i.feeAmount)>0),u=l?Number(i.feeAmount):0,s=i.feeType||"PER_TRANSACTION",c=r+u;document.getElementById("tdPrice").textContent=f(r);const g=document.getElementById("tdCardBasePrice");g&&(g.textContent=f(r));const m=document.getElementById("tdCardFeeLabel"),p=document.getElementById("tdCardFeeAmount");p&&(l?(p.textContent=`+ ${f(u)}`,p.style.color="#EA580C",m&&(m.textContent=`Biaya Layanan (${s==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`)):(p.textContent="Gratis (Rp 0)",p.style.color="#10B981",m&&(m.textContent="Biaya Layanan:")));const x=document.getElementById("tdCardPrice");x&&(x.textContent=f(c));const b=typeof t.remainingStock=="number"?t.remainingStock:t.stock,T=typeof t.registeredCount=="number"?t.registeredCount:0;document.getElementById("tdStock").textContent=`${b.toLocaleString("id-ID")} Tiket`,document.getElementById("tdRegisteredCount").textContent=`${T.toLocaleString("id-ID")} Peserta`;const F=t.stock||1,B=Math.max(10,Math.min(100,Math.round(b/F*100)));if(document.getElementById("tdStockPercentage").textContent=`${B}% Kuota Tersedia`,document.getElementById("tdStockFill").style.width=`${B}%`,t.eventDate){const o=new Date(t.eventDate);document.getElementById("tdEventDate").textContent=o.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})+" WIB",D(t.eventDate)}else document.getElementById("tdEventDate").textContent="Belum ditentukan",document.getElementById("tdDays").textContent="--",document.getElementById("tdHours").textContent="--",document.getElementById("tdMinutes").textContent="--",document.getElementById("tdSeconds").textContent="--";const h=document.getElementById("tdBenefitsContainer");Array.isArray(t.benefits)&&t.benefits.length>0?h.innerHTML=t.benefits.map(o=>`
      <div class="td-benefit-card">
        <div class="td-benefit-icon">
          <i class="fa-solid fa-check"></i>
        </div>
        <div>
          <strong style="color: var(--color-text-title); font-size: 0.95rem; display: block; margin-bottom: 2px;">
            ${d(o.name)}
          </strong>
          <p style="font-size: 0.84rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;">
            ${d(o.description)}
          </p>
        </div>
      </div>
    `).join(""):h.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada fasilitas / benefit yang tercantum untuk kategori ini.
      </p>
    `;const I=document.getElementById("tdJerseysContainer");Array.isArray(t.jerseys)&&t.jerseys.length>0?I.innerHTML=t.jerseys.map(o=>{let k=[];try{k=Array.isArray(o.sizes)?o.sizes:JSON.parse(o.sizes)}catch{k=["S","M","L","XL"]}return`
        <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 1rem; color: var(--color-text-title);">${d(o.name)}</strong>
            <span class="badge" style="background: #FFFFFF; font-weight: 700;">Tipe: ${d(o.type)}</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 12px;">
            Bahan Dry-Fit Breathable Micro-fiber, anti-bakteri dan cepat kering.
          </p>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-muted);">Pilihan Ukuran Resmi:</span>
            ${k.map(w=>`<span style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; color: var(--color-primary);">${d(w)}</span>`).join("")}
          </div>
        </div>
      `}).join(""):I.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada data jersey resmi untuk kategori ini.
      </p>
    `;const C=document.getElementById("tdBibContainer");if(t.bibConfig){const o=t.bibConfig;C.innerHTML=`
      <div style="background: #F8FAFC; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 18px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--color-primary-subtle); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800;">
            ${d(o.prefix||"BIB")}
          </div>
          <div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-title);">
              Format Nomor Dada: <code>${d(o.prefix)}${"0".repeat(Math.max(0,(o.digitLength||4)-1))}1${d(o.suffix||"")}</code>
            </div>
            <small style="color: #64748B;">Nomor BIB unik di-generate otomatis oleh sistem dan terhubung dengan chip RFID resmi.</small>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; border-top: 1px dashed var(--color-border-subtle); padding-top: 10px; margin-top: 10px;">
          <i class="fa-solid fa-triangle-exclamation" style="color: #F59E0B; margin-right: 4px;"></i>
          Nomor BIB tidak dapat dipindahtangankan demi keabsahan asuransi dan pencatatan rekor waktu finish.
        </div>
      </div>
    `}else C.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada konfigurasi nomor BIB untuk kategori ini.
      </p>
    `;const y=document.getElementById("tdBtnRegisterNow");t.isClosed?(y.classList.remove("btn-glow"),y.style.opacity="0.6",y.style.pointerEvents="none",y.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup'):(y.href=`/?register=${t.id}#kategori`,y.innerHTML=`<i class="fa-solid fa-ticket"></i> Daftar Kategori ${d(t.category)} Sekarang`)}document.addEventListener("DOMContentLoaded",()=>{var t;M(),(t=document.getElementById("btnShareTicket"))==null||t.addEventListener("click",()=>{navigator.clipboard.writeText(window.location.href),S("success","Tautan tiket berhasil disalin ke papan klip!")})});
