import{a as u}from"./api-MoJDL6vL.js";/* empty css              */function m(e="success",a=""){const t=document.getElementById("cekToastContainer");if(!t)return;const n=document.createElement("div");n.className=`toast toast-${e}`,n.innerHTML=`
    <div class="toast-icon">
      <i class="${e==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i>
    </div>
    <div class="toast-content">
      <h5>${e==="success"?"Berhasil":"Pemberitahuan"}</h5>
      <p>${a}</p>
    </div>
  `,t.appendChild(n),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),300)},4e3)}function r(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function w(e){return!e||e.length<8?e||"":e.substring(0,6)+"******"+e.substring(e.length-4)}function L(e){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e||0)}let h=[],k=null;const v={all:{placeholder:"Ketik Email, WhatsApp (08xxx), NIK (16 digit), atau Order ID",hint:"Sistem akan otomatis mendeteksi format yang Anda masukkan.",icon:"fa-solid fa-wand-magic-sparkles"},email:{placeholder:"Masukkan Email pendaftar (contoh: pelari@gmail.com)",hint:"Gunakan alamat email resmi yang Anda cantumkan saat checkout.",icon:"fa-solid fa-envelope"},phone:{placeholder:"Masukkan nomor WhatsApp aktif (contoh: 081234567890)",hint:"Gunakan awalan 08 atau 628 dengan minimal 10 digit angka.",icon:"fa-brands fa-whatsapp"},nik:{placeholder:"Masukkan 16 digit NIK KTP Anda",hint:"Wajib tepat 16 digit angka sesuai identitas KTP pendaftar.",icon:"fa-solid fa-id-card"},orderId:{placeholder:"Masukkan Order ID (contoh: TR-17283948...)",hint:"Order ID dapat ditemukan pada notifikasi WhatsApp/Email atau invoice Midtrans.",icon:"fa-solid fa-receipt"}};function $(){const e=document.querySelectorAll("#searchTypeTabs .type-pill"),a=document.getElementById("selectedSearchType"),t=document.getElementById("searchKeyword"),n=document.querySelector("#searchFormatHint span"),s=document.getElementById("searchIcon");e.forEach(o=>{o.addEventListener("click",()=>{e.forEach(c=>c.classList.remove("active")),o.classList.add("active");const l=o.getAttribute("data-type")||"all";a&&(a.value=l);const i=v[l]||v.all;t&&(t.placeholder=i.placeholder,l==="nik"?(t.maxLength=16,t.inputMode="numeric"):l==="phone"?(t.maxLength=16,t.inputMode="tel"):(t.removeAttribute("maxlength"),t.inputMode="text")),n&&(n.textContent=i.hint),s&&(s.className=i.icon)})})}function A(e,a){const t=e.replace(/\s+/g,"");if(a==="email"){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return"Format email tidak valid. Contoh yang benar: pelari@gmail.com"}else if(a==="nik"){if(!/^\d{16}$/.test(t))return"NIK KTP wajib terdiri dari tepat 16 digit angka. Anda memasukkan: "+t.length+" digit."}else if(a==="phone"){if(!/^(\+62|62|08)\d{8,13}$/.test(t))return"Nomor WhatsApp tidak valid. Gunakan format 08xxx atau 628xxx (minimal 10 digit)."}else if(a==="orderId"){if(e.length<5)return"Format Order ID tidak valid."}else if(a==="all"){const n=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),s=/^\d{16}$/.test(t),o=/^(\+62|62|08)\d{8,13}$/.test(t),l=/^TR-[\w-]+$/i.test(e)||e.length>=20;if(!n&&!s&&!o&&!l)return"Input tidak sesuai dengan format yang didukung. Masukkan Email valid, Nomor WhatsApp (10-14 digit), NIK KTP (16 digit), atau Order ID resmi."}return null}async function C(e){var l;e.preventDefault();const a=document.getElementById("searchKeyword").value.trim(),t=((l=document.getElementById("selectedSearchType"))==null?void 0:l.value)||"all",n=document.getElementById("resultContainer"),s=document.getElementById("btnSearchTiket");if(!a)return;const o=A(a,t);if(o){m("warning",o),n.innerHTML=`
      <div class="ticket-result-card" style="text-align: center; padding: 40px; border: 1px dashed #EF4444;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #EF4444; margin-bottom: 14px;"></i>
        <h4 style="color: #991B1B;">Format Input Tidak Valid</h4>
        <p style="color: #64748B; font-size: 0.9rem; max-width: 520px; margin: 8px auto 0 auto;">
          ${r(o)}
        </p>
      </div>
    `;return}s.disabled=!0,s.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Mencari Data...',n.innerHTML=`
    <div style="text-align: center; padding: 50px 20px; color: #64748B;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size: 2.2rem; color: var(--color-primary); margin-bottom: 12px;"></i>
      <h4 style="color: var(--color-text-title);">Memverifikasi Data Pendaftaran...</h4>
      <p style="font-size: 0.88rem;">Menghubungkan ke database resmi panitia Tegal Run 2027...</p>
    </div>
  `;try{const i=await u(`/tickets/search?q=${encodeURIComponent(a)}&type=${t}`),c=await i.json();if(!i.ok||c.status!=="success"){n.innerHTML=`
        <div class="ticket-result-card" style="text-align: center; padding: 40px;">
          <i class="fa-solid fa-circle-exclamation" style="font-size: 2.5rem; color: #EF4444; margin-bottom: 14px;"></i>
          <h4 style="color: var(--color-text-title);">Data Tiket Tidak Ditemukan</h4>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: 6px;">
            ${r(c.message||"Tidak ditemukan pesanan tiket dengan data tersebut.")}
          </p>
        </div>
      `;return}h=c.data||[],M(h)}catch(i){n.innerHTML=`
      <div class="ticket-result-card" style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 14px;"></i>
        <h4 style="color: var(--color-text-title);">Gagal Terhubung ke Server</h4>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">${i.message}</p>
      </div>
    `}finally{s.disabled=!1,s.innerHTML='<i class="fa-solid fa-search"></i> Cek Tiket Saya'}}function M(e){const a=document.getElementById("resultContainer");if(a){if(e.length===0){a.innerHTML=`
      <div class="ticket-result-card" style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-ticket-simple" style="font-size: 2.5rem; color: #94A3B8; margin-bottom: 14px;"></i>
        <h4 style="color: var(--color-text-title);">Tidak Ada Pesanan Ditemukan</h4>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Pastikan data yang dimasukkan persis sama dengan saat pendaftaran.</p>
      </div>
    `;return}a.innerHTML=e.map(t=>{var p,f,g,y;const n=t.status==="SETTLEMENT"||t.status==="PAID",s=t.status==="PENDING";t.status==="CANCEL"||t.status;const o=n?'<span class="ticket-badge-pill paid"><i class="fa-solid fa-circle-check"></i> LUNAS (TERVERIFIKASI)</span>':s?'<span class="ticket-badge-pill pending"><i class="fa-solid fa-clock"></i> MENUNGGU PEMBAYARAN</span>':'<span class="ticket-badge-pill cancel"><i class="fa-solid fa-ban"></i> DIBATALKAN</span>',l=(t.participants||[]).map((d,B)=>`
      <div class="participant-row">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; color: #94A3B8; display: block;">PESERTA #${B+1}</span>
          <strong style="color: #0F172A; font-size: 1.05rem;">${r(d.fullNameKtp)}</strong>
          ${d.bibName?`<span style="font-size: 0.85rem; color: #64748B;"> (${r(d.bibName)})</span>`:""}
          <div style="font-size: 0.8rem; color: #64748B; margin-top: 2px;">
            NIK: <code>${w(d.nik)}</code> • Jersey: <strong>${r(d.selectedSize||"M")}</strong> • Gol. Darah: <strong>${r(d.bloodType||"-")}</strong>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="display: block; font-size: 0.75rem; color: #94A3B8; font-weight: 700;">NOMOR BIB RESMI</span>
          <strong style="font-size: 1.25rem; color: var(--color-primary); font-family: monospace;">
            ${r(d.bibNumber||(n?"Sedang Digenerate":"Setelah Lunas"))}
          </strong>
        </div>
      </div>
    `).join(""),i=(p=t.participants)==null?void 0:p[0],c=((f=i==null?void 0:i.event)==null?void 0:f.ticketName)||"Tegal Run 2027",T=((g=i==null?void 0:i.event)==null?void 0:g.category)||"10K";return`
      <div class="ticket-result-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-size: 0.78rem; font-family: monospace; color: #64748B; font-weight: 700;">
              ORDER ID: ${r(t.midtransOrderId||t.id)}
            </span>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin-top: 4px;">
              ${r(c)} <span style="font-size: 0.9rem; color: var(--color-primary);">(${r(T)} Marathon)</span>
            </h3>
            <span style="font-size: 0.84rem; color: #64748B;">
              Tanggal Pesan: ${new Date(t.createdAt).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})} WIB
            </span>
          </div>
          <div>${o}</div>
        </div>

        <div style="margin-bottom: 20px;">
          <h5 style="font-size: 0.88rem; font-weight: 800; color: #334155; margin-bottom: 8px;">
            <i class="fa-solid fa-users"></i> Daftar Pelari Terdaftar (${((y=t.participants)==null?void 0:y.length)||0}):
          </h5>
          ${l}
        </div>

        <div style="border-top: 1px solid #E2E8F0; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <span style="font-size: 0.8rem; color: #64748B; display: block;">Total Pembayaran:</span>
            <strong style="font-size: 1.25rem; color: var(--color-primary); font-weight: 800;">
              ${L(t.totalAmount)}
            </strong>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${n?`
              <a href="/e-ticket.html?orderId=${t.id}" class="btn btn-primary btn-sm btn-glow">
                <i class="fa-solid fa-file-pdf"></i> Unduh / Cetak E-Tiket (PDF)
              </a>
            `:s?`
              <button type="button" class="btn btn-outline btn-sm btn-sync-midtrans" data-id="${t.id}">
                <i class="fa-solid fa-rotate"></i> Cek Status Terkini
              </button>
              <button type="button" class="btn btn-danger btn-sm btn-open-cancel" data-id="${t.id}" style="background:#FEE2E2;color:#DC2626;border:1px solid #FECACA;">
                <i class="fa-solid fa-ban"></i> Batalkan
              </button>
              <a href="/payment.html?orderId=${t.id}" class="btn btn-primary btn-sm btn-glow">
                <i class="fa-solid fa-credit-card"></i> Bayar Sekarang
              </a>
            `:`
              <span style="font-size: 0.82rem; color: #94A3B8; font-style: italic;">
                Pesanan telah dibatalkan / kedaluwarsa.
              </span>
            `}
          </div>
        </div>
      </div>
    `}).join(""),S()}}function S(){document.querySelectorAll(".btn-sync-midtrans").forEach(e=>{e.addEventListener("click",async()=>{var t;const a=e.getAttribute("data-id");e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mengecek...';try{const s=await(await u(`/orders/${a}/sync-midtrans`,{method:"POST"})).json();if(s.status==="success"){if(m("success",s.message),((t=s.data)==null?void 0:t.status)==="SETTLEMENT"){window.location.href=`/e-ticket.html?orderId=${a}`;return}document.getElementById("formCekTiket").dispatchEvent(new Event("submit"))}else m("warning",s.message)}catch(n){m("error",n.message)}finally{e.disabled=!1,e.innerHTML='<i class="fa-solid fa-rotate"></i> Cek Status Terkini'}})}),document.querySelectorAll(".btn-open-cancel").forEach(e=>{e.addEventListener("click",()=>{k=e.getAttribute("data-id"),document.getElementById("cancelTargetOrderId").value=k,document.getElementById("modalCancelBackdrop").classList.add("open")})})}var b;(b=document.getElementById("btnCloseCancelModal"))==null||b.addEventListener("click",()=>{document.getElementById("modalCancelBackdrop").classList.remove("open")});var E;(E=document.getElementById("btnDismissCancelModal"))==null||E.addEventListener("click",()=>{document.getElementById("modalCancelBackdrop").classList.remove("open")});var I;(I=document.getElementById("cancelReasonSelect"))==null||I.addEventListener("change",e=>{const a=document.getElementById("groupCancelCustomReason");e.target.value==="Lainnya"?(a.style.display="block",document.getElementById("cancelCustomReason").required=!0):(a.style.display="none",document.getElementById("cancelCustomReason").required=!1)});var x;(x=document.getElementById("formCancelOrder"))==null||x.addEventListener("submit",async e=>{e.preventDefault();const a=document.getElementById("cancelTargetOrderId").value,t=document.getElementById("cancelReasonSelect").value,n=document.getElementById("cancelCustomReason").value.trim(),s=t==="Lainnya"?n:t,o=document.getElementById("btnSubmitCancelOrder");o.disabled=!0,o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Membatalkan...';try{const i=await(await u(`/orders/${a}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reason:s})})).json();i.status==="success"?(m("success",i.message),document.getElementById("modalCancelBackdrop").classList.remove("open"),document.getElementById("formCekTiket").dispatchEvent(new Event("submit"))):m("error",i.message||"Gagal membatalkan pesanan.")}catch(l){m("error",l.message)}finally{o.disabled=!1,o.innerHTML='<i class="fa-solid fa-ban"></i> Ya, Batalkan Pesanan'}});document.addEventListener("DOMContentLoaded",()=>{var t;$(),(t=document.getElementById("formCekTiket"))==null||t.addEventListener("submit",C);const e=new URLSearchParams(window.location.search),a=e.get("q")||e.get("orderId");a&&(document.getElementById("searchKeyword").value=a,document.getElementById("formCekTiket").dispatchEvent(new Event("submit")))});
