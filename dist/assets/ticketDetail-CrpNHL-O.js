import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */const E=typeof window<"u"&&window.location.port==="5173"?"/api":"http://localhost:3000/api";function w(t="success",a=""){const e=document.getElementById("ticketToastContainer");if(!e)return;const n=document.createElement("div");n.className=`toast toast-${t}`,n.innerHTML=`
    <div class="toast-icon">
      <i class="${t==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${t==="success"?"Berhasil":"Peringatan"}</h5>
      <p>${a}</p>
    </div>
  `,e.appendChild(n),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),300)},3500)}function d(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function y(t){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(t||0)}let C=null;function L(t){if(!t)return;const a=new Date(t).getTime();function e(){const n=Date.now(),i=a-n;if(i<=0){document.getElementById("tdDays").textContent="00",document.getElementById("tdHours").textContent="00",document.getElementById("tdMinutes").textContent="00",document.getElementById("tdSeconds").textContent="00",clearInterval(C);return}const s=Math.floor(i/(1e3*60*60*24)),m=Math.floor(i%(1e3*60*60*24)/(1e3*60*60)),g=Math.floor(i%(1e3*60*60)/(1e3*60)),c=Math.floor(i%(1e3*60)/1e3),r=u=>String(u).padStart(2,"0");document.getElementById("tdDays").textContent=r(s),document.getElementById("tdHours").textContent=r(m),document.getElementById("tdMinutes").textContent=r(g),document.getElementById("tdSeconds").textContent=r(c)}e(),C=setInterval(e,1e3)}async function S(){const a=new URLSearchParams(window.location.search).get("id"),e=document.getElementById("tdLoadingState"),n=document.getElementById("tdErrorState"),i=document.getElementById("tdContentSection");if(!a){e.style.display="none",n.style.display="block",document.getElementById("tdErrorMessage").textContent="ID tiket tidak ditemukan dalam URL. Silakan pilih tiket melalui landing page.";return}try{const[s,m]=await Promise.all([fetch(`${E}/events/${a}`),fetch(`${E}/settings/checkout-config`).catch(()=>null)]),g=await s.text();let c=null;try{c=g?JSON.parse(g):{}}catch{throw new Error("Server backend tidak merespons JSON yang valid.")}if(!s.ok||c.status!=="success"||!c.data){e.style.display="none",n.style.display="block",document.getElementById("tdErrorMessage").textContent=c.message||"Data tiket tidak ditemukan di database backend.";return}let r={feeEnabled:!1,feeType:"PER_TRANSACTION",feeAmount:0};if(m&&m.ok)try{const l=await m.json();l.status==="success"&&l.data&&(r=l.data)}catch{}const u=c.data;D(u,r),e.style.display="none",i.style.display="block"}catch(s){e.style.display="none",n.style.display="block",document.getElementById("tdErrorMessage").textContent=`Gagal menghubungi server: ${s.message}. Pastikan backend di localhost:3000 aktif.`}}function D(t,a={}){document.title=`${t.ticketName} - Tegal Run 2027`;const e=document.getElementById("tdTicketCoverImg");e&&(t.ticketImage?(e.src=t.ticketImage,e.style.display="block"):(e.style.display="none",e.parentElement&&(e.parentElement.style.height="140px"))),document.getElementById("tdCategoryTag").textContent=`${d(t.category)} MARATHON`,document.getElementById("tdTicketName").textContent=t.ticketName,document.getElementById("tdTicketSubtitle").textContent=`Kategori Lomba Resmi • Kuota Total ${t.stock.toLocaleString("id-ID")} Peserta`;const n=document.getElementById("tdStatusBadge");t.isClosed?(n.className="td-badge closed",n.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Resmi Ditutup'):(n.className="td-badge open",n.innerHTML='<i class="fa-solid fa-lock-open"></i> Pendaftaran Sedang Buka');const i=Number(t.price)||0,s=!!(a.feeEnabled&&Number(a.feeAmount)>0),m=s?Number(a.feeAmount):0,g=a.feeType||"PER_TRANSACTION",c=i+m;document.getElementById("tdPrice").textContent=y(i);const r=document.getElementById("tdCardBasePrice");r&&(r.textContent=y(i));const u=document.getElementById("tdCardFeeLabel"),l=document.getElementById("tdCardFeeAmount");l&&(s?(l.textContent=`+ ${y(m)}`,l.style.color="#EA580C",u&&(u.textContent=`Biaya Layanan (${g==="PER_TICKET"?"Per Tiket":"Per Transaksi"}):`)):(l.textContent="Gratis (Rp 0)",l.style.color="#10B981",u&&(u.textContent="Biaya Layanan:")));const x=document.getElementById("tdCardPrice");x&&(x.textContent=y(c));const k=typeof t.remainingStock=="number"?t.remainingStock:t.stock,v=typeof t.registeredCount=="number"?t.registeredCount:0;document.getElementById("tdStock").textContent=`${k.toLocaleString("id-ID")} Tiket`,document.getElementById("tdRegisteredCount").textContent=`${v.toLocaleString("id-ID")} Peserta`;const T=t.stock||1,b=Math.max(10,Math.min(100,Math.round(k/T*100)));if(document.getElementById("tdStockPercentage").textContent=`${b}% Kuota Tersedia`,document.getElementById("tdStockFill").style.width=`${b}%`,t.eventDate){const o=new Date(t.eventDate);document.getElementById("tdEventDate").textContent=o.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})+" WIB",L(t.eventDate)}else document.getElementById("tdEventDate").textContent="Belum ditentukan",document.getElementById("tdDays").textContent="--",document.getElementById("tdHours").textContent="--",document.getElementById("tdMinutes").textContent="--",document.getElementById("tdSeconds").textContent="--";const B=document.getElementById("tdBenefitsContainer");Array.isArray(t.benefits)&&t.benefits.length>0?B.innerHTML=t.benefits.map(o=>`
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
    `).join(""):B.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada fasilitas / benefit yang tercantum untuk kategori ini.
      </p>
    `;const h=document.getElementById("tdJerseysContainer");Array.isArray(t.jerseys)&&t.jerseys.length>0?h.innerHTML=t.jerseys.map(o=>{let f=[];try{f=Array.isArray(o.sizes)?o.sizes:JSON.parse(o.sizes)}catch{f=["S","M","L","XL"]}return`
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
            ${f.map(F=>`<span style="background: #FFFFFF; border: 1px solid var(--color-border-subtle); padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; color: var(--color-primary);">${d(F)}</span>`).join("")}
          </div>
        </div>
      `}).join(""):h.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada data jersey resmi untuk kategori ini.
      </p>
    `;const I=document.getElementById("tdBibContainer");if(t.bibConfig){const o=t.bibConfig;I.innerHTML=`
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
    `}else I.innerHTML=`
      <p style="font-size: 0.88rem; color: var(--color-text-muted); padding: 12px; background: #F8FAFC; border-radius: 8px;">
        Belum ada konfigurasi nomor BIB untuk kategori ini.
      </p>
    `;const p=document.getElementById("tdBtnRegisterNow");t.isClosed?(p.classList.remove("btn-glow"),p.style.opacity="0.6",p.style.pointerEvents="none",p.innerHTML='<i class="fa-solid fa-lock"></i> Pendaftaran Ditutup'):(p.href=`/?register=${t.id}#kategori`,p.innerHTML=`<i class="fa-solid fa-ticket"></i> Daftar Kategori ${d(t.category)} Sekarang`)}document.addEventListener("DOMContentLoaded",()=>{var t;S(),(t=document.getElementById("btnShareTicket"))==null||t.addEventListener("click",()=>{navigator.clipboard.writeText(window.location.href),w("success","Tautan tiket berhasil disalin ke papan klip!")})});
