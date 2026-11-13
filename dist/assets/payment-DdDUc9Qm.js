import{a as u,l as z}from"./api-iQl_QkSJ.js";/* empty css              */import{l as N}from"./branding-D6uQxWn9.js";import"./home-appearance-Db1ttUVV.js";N();function r(t="success",n=""){const s=document.getElementById("paymentToastContainer");if(!s)return;const i=document.createElement("div");i.className=`toast toast-${t}`,i.innerHTML=`<div class="toast-icon"><i class="${t==="success"?"fa-solid fa-circle-check":"fa-solid fa-triangle-exclamation"}"></i></div><div class="toast-content"><h5>${t==="success"?"Berhasil":"Pemberitahuan"}</h5><p>${n}</p></div>`,s.appendChild(i),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),300)},3500)}function g(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function T(t){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(t||0)}let B=null,w=null,E=null;function m(){w&&(clearInterval(w),w=null)}function b(){E&&(clearInterval(E),E=null)}function A(t,n=30){b();const i=new Date(t).getTime()+n*60*1e3,e=document.getElementById("paymentTimerCountdown"),l=document.getElementById("btnPayMidtransNow");function c(){const y=Date.now(),p=Math.floor((i-y)/1e3);if(p<=0){b(),e&&(e.textContent="00:00 (WAKTU HABIS)",e.style.color="#DC2626"),l&&(l.disabled=!0,l.style.opacity="0.5",l.style.cursor="not-allowed",l.innerHTML='<i class="fa-solid fa-clock"></i> Batas Waktu Pembayaran Telah Habis');return}const k=Math.floor(p/60),h=p%60,v=`${String(k).padStart(2,"0")}:${String(h).padStart(2,"0")}`;e&&(e.textContent=v)}c(),E=setInterval(c,1e3)}function C(t){m(),w=setInterval(async()=>{try{const s=await(await u(`/orders/${t}/sync-midtrans`,{method:"POST"})).json();s.status==="success"&&s.data&&(s.data.status==="SETTLEMENT"||s.data.isPaid?(m(),r("success","Pembayaran Lunas Terverifikasi! Mengarahkan ke E-Tiket..."),setTimeout(()=>{window.location.href=`/e-ticket.html?orderId=${t}`},1200)):(s.data.status==="CANCEL"||s.data.status==="EXPIRE")&&(m(),I()))}catch{}},3e3)}async function I(){const t=document.getElementById("paymentContentMount"),n=new URLSearchParams(window.location.search),s=n.get("orderId")||n.get("id");if(!s){t.innerHTML=`
      <div class="payment-card" style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 2.5rem; color: #EF4444; margin-bottom: 12px;"></i>
        <h3>Order ID Tidak Valid</h3>
        <p style="color: #64748B;">Silakan periksa kembali tautan pembayaran Anda.</p>
        <a href="/cek-tiket.html" class="btn btn-secondary" style="margin-top: 16px;">
          <i class="fa-solid fa-search"></i> Cek Status Tiket
        </a>
      </div>
    `;return}try{const i=await u(`/tickets/search?q=${encodeURIComponent(s)}&type=orderId`),e=await i.json();if(!i.ok||e.status!=="success"||!e.data||e.data.length===0){t.innerHTML=`
        <div class="payment-card" style="text-align: center; padding: 40px;">
          <i class="fa-solid fa-circle-xmark" style="font-size: 2.5rem; color: #EF4444; margin-bottom: 12px;"></i>
          <h3>Pesanan Tidak Ditemukan</h3>
          <p style="color: #64748B; margin-bottom: 16px;">Order ID "${g(s)}" tidak terdaftar di sistem.</p>
          <a href="/cek-tiket.html" class="btn btn-secondary">
            <i class="fa-solid fa-search"></i> Cari Tiket Lainnya
          </a>
        </div>
      `;return}B=e.data[0],O(B)}catch(i){t.innerHTML=`
      <div class="payment-card" style="text-align: center; padding: 40px;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #F59E0B; margin-bottom: 12px;"></i>
        <h3>Gagal Terhubung ke Server</h3>
        <p style="color: #64748B; margin-bottom: 16px;">${i.message}</p>
        <button class="btn btn-primary" onclick="loadPaymentDetails()">
          <i class="fa-solid fa-rotate"></i> Coba Lagi
        </button>
      </div>
    `}}function O(t){var k,h,v,M,S,L,P;const n=document.getElementById("paymentContentMount"),s=t.status==="SETTLEMENT"||t.status==="PAID";t.status;const i=t.status==="CANCEL"||t.status==="EXPIRE",e=(k=t.participants)==null?void 0:k[0],l=((h=e==null?void 0:e.event)==null?void 0:h.category)||"10K",c=((v=e==null?void 0:e.event)==null?void 0:v.ticketName)||"Tegal Run 2027",y=(t.participants||[]).reduce((a,d)=>{var o;return a+(Number((o=d.event)==null?void 0:o.price)||0)},0),p=y>0?Math.max(0,Number(t.totalAmount)-y):0;if(s){m(),b(),n.innerHTML=`
      <div class="payment-card" style="text-align: center;">
        <div style="width: 72px; height: 72px; background: #DCFCE7; color: #16A34A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.4rem; margin: 0 auto 16px auto;">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">Pembayaran Berhasil / Lunas!</h2>
        <p style="color: #64748B; font-size: 0.95rem; margin-bottom: 20px;">
          Selamat! Tiket lomba <strong>${g(c)}</strong> Anda telah resmi terverifikasi dan aktif di sistem.
        </p>

        <div class="order-summary-box" style="text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #64748B;">Order ID:</span>
            <strong style="font-family: monospace;">${g(t.midtransOrderId||t.id)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #64748B;">Total Terbayar:</span>
            <strong style="color: var(--color-primary); font-size: 1.05rem;">${T(t.totalAmount)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748B;">Status Pembayaran:</span>
            <span style="color: #16A34A; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-circle-check"></i> LUNAS (SETTLEMENT)
            </span>
          </div>
        </div>

        <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 24px; text-align: left; font-size: 0.85rem; color: #92400E;">
          <i class="fa-solid fa-lock"></i> <strong>Informasi Keamanan:</strong> Tiket yang sudah berstatus <strong>Lunas</strong> tidak dapat dibatalkan secara mandiri. Apabila memerlukan konfirmasi medis darurat, wajib menghubungi panitia pelaksana.
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="/e-ticket.html?orderId=${t.id}" class="btn btn-primary btn-glow" style="min-width: 220px;">
            <i class="fa-solid fa-file-pdf"></i> Unduh / Cetak E-Tiket Resmi
          </a>
          <a href="/cek-tiket.html" class="btn btn-secondary">
            <i class="fa-solid fa-search"></i> Cek Status Tiket
          </a>
        </div>
      </div>
    `;return}if(i){m(),b(),n.innerHTML=`
      <div class="payment-card" style="text-align: center;">
        <div style="width: 72px; height: 72px; background: #FEE2E2; color: #DC2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 16px auto;">
          <i class="fa-solid fa-ban"></i>
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">Pesanan Dibatalkan</h2>
        <p style="color: #64748B; font-size: 0.95rem; margin-bottom: 20px;">
          Pesanan tiket ini telah dibatalkan / kedaluwarsa dan kuota telah dikembalikan ke publik.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="/#kategori" class="btn btn-primary btn-glow">
            <i class="fa-solid fa-ticket"></i> Daftar Ulang Tiket Baru
          </a>
          <a href="/cek-tiket.html" class="btn btn-secondary">
            <i class="fa-solid fa-search"></i> Cari Tiket Lain
          </a>
        </div>
      </div>
    `;return}C(t.id),u("/settings/checkout-config").then(a=>a.json()).then(a=>{var o;const d=a&&a.status==="success"&&((o=a.data)!=null&&o.paymentTimerMinutes)?a.data.paymentTimerMinutes:30;A(t.createdAt,d)}).catch(()=>{A(t.createdAt,30)}),n.innerHTML=`
    <div class="payment-card">
      <div style="text-align: center; margin-bottom: 20px;">
        <div class="realtime-status-pill">
          <span class="pulse-dot"></span> Memantau Pembayaran Realtime...
        </div>
        <div style="width: 64px; height: 64px; background: #FEF3C7; color: #D97706; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 12px auto;">
          <i class="fa-solid fa-clock-rotate-left"></i>
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-title);">Menunggu Pembayaran Tiket</h2>
        <p style="color: #64748B; font-size: 0.9rem;">Selesaikan pembayaran Anda. Sistem akan otomatis mendeteksi ketika transaksi berhasil.</p>
      </div>

      <!-- Expiry Countdown Timer Widget -->
      <div id="paymentTimerBox" style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 20px; text-align: center;">
        <div style="font-size: 0.82rem; color: #991B1B; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fa-solid fa-stopwatch fa-spin" style="--fa-animation-duration: 4s;"></i> Batas Waktu Pembayaran (Expiry):
        </div>
        <div id="paymentTimerCountdown" style="font-size: 1.8rem; font-weight: 900; font-family: monospace; color: #DC2626; margin: 4px 0;">
          Memuat...
        </div>
        <div style="font-size: 0.78rem; color: #7F1D1D;">
          Selesaikan transaksi sebelum timer habis agar pesanan tidak dibatalkan otomatis oleh sistem.
        </div>
      </div>

      <div class="order-summary-box">
        <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 12px; color: #0F172A;">Rincian Pesanan:</h4>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Nama Event:</span>
          <strong>${g(c)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Kategori Lomba:</span>
          <strong>${g(l)} Marathon</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Jumlah Pelari:</span>
          <strong>${((M=t.participants)==null?void 0:M.length)||1} Orang</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Order ID Resmi:</span>
          <code style="font-weight: 700; background: #E2E8F0; padding: 2px 6px; border-radius: 4px;">${g(t.midtransOrderId||t.id)}</code>
        </div>
        ${y>0?`
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
          <span style="color: #64748B;">Subtotal Tiket:</span>
          <strong style="color: #0F172A;">${T(y)}</strong>
        </div>
        `:""}
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem; ${p>0?"color: #EA580C;":"color: #10B981;"}">
          <span>Biaya Layanan:</span>
          <strong>${p>0?`+ ${T(p)}`:"Gratis (Rp 0)"}</strong>
        </div>
        <div style="border-top: 1px dashed #CBD5E1; margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: #0F172A;">
          <span>Total Tagihan:</span>
          <span style="color: var(--color-primary);">${T(t.totalAmount)}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <button class="btn btn-primary btn-glow" id="btnPayMidtransNow" style="width: 100%; padding: 14px; font-size: 1.05rem; margin-bottom: 12px;">
        <i class="fa-solid fa-credit-card"></i> Bayar Sekarang via Midtrans Snap (QRIS, VA, E-Wallet)
      </button>

      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <button class="btn btn-outline btn-sm" id="btnSyncPayment" style="flex: 1;">
          <i class="fa-solid fa-rotate"></i> Cek Status Terkini Sekarang
        </button>
        <button class="btn btn-sm" id="btnOpenCancelOrder" style="background: #FEE2E2; color: #DC2626; border: 1px solid #FECACA; flex: 1;">
          <i class="fa-solid fa-ban"></i> Batalkan Pesanan
        </button>
      </div>
    </div>
  `,(S=document.getElementById("btnSyncPayment"))==null||S.addEventListener("click",async()=>{const a=document.getElementById("btnSyncPayment");a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mengecek Status...';try{const o=await(await u(`/orders/${t.id}/sync-midtrans`,{method:"POST"})).json();if(o.status==="success"&&o.data){if(o.data.status==="SETTLEMENT"||o.data.isPaid){r("success","Pembayaran Terverifikasi! Mengarahkan ke E-Tiket..."),m(),b(),setTimeout(()=>{window.location.href=`/e-ticket.html?orderId=${t.id}`},1200);return}r("warning",`Status Pembayaran: ${o.data.status||"PENDING"}`)}else r("warning",o.message||"Belum ada perubahan status.")}catch(d){r("error",d.message)}finally{a.disabled=!1,a.innerHTML='<i class="fa-solid fa-rotate"></i> Cek Status Terkini Sekarang'}}),(L=document.getElementById("btnOpenCancelOrder"))==null||L.addEventListener("click",()=>{document.getElementById("modalCancelBackdrop").classList.add("open")}),(P=document.getElementById("btnPayMidtransNow"))==null||P.addEventListener("click",async()=>{var o;const a=document.getElementById("btnPayMidtransNow"),d=a.innerHTML;a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Membuka Midtrans Snap...';try{let f=t.snapToken;if(!f){const x=await(await u(`/orders/${t.id}/snap-token`,{method:"POST"})).json();if(x.status==="success"&&((o=x.data)!=null&&o.snapToken))f=x.data.snapToken,t.snapToken=f;else{r("error",x.message||"Token pembayaran tidak dapat dimuat."),a.disabled=!1,a.innerHTML=d;return}}await z(),window.snap&&typeof window.snap.pay=="function"?window.snap.pay(f,{onSuccess:async()=>{r("success","Pembayaran berhasil dikonfirmasi! Memvalidasi..."),m(),b(),await u(`/orders/${t.id}/sync-midtrans`,{method:"POST"}),window.location.href=`/e-ticket.html?orderId=${t.id}`},onPending:async()=>{r("warning","Menunggu transaksi Anda selesai diverifikasi."),C(t.id)},onError:()=>{r("error","Pembayaran gagal diproses melalui gateway Midtrans.")},onClose:()=>{r("warning","Jendela pembayaran ditutup. Sistem tetap memantau secara realtime."),C(t.id)}}):r("error","Library Midtrans Snap sedang memuat. Silakan tunggu 2 detik dan coba lagi.")}catch(f){r("error","Gagal membuka pembayaran: "+f.message)}finally{a.disabled=!1,a.innerHTML=d}})}var $;($=document.getElementById("btnCloseCancelModal"))==null||$.addEventListener("click",()=>{document.getElementById("modalCancelBackdrop").classList.remove("open")});var D;(D=document.getElementById("btnDismissCancelModal"))==null||D.addEventListener("click",()=>{document.getElementById("modalCancelBackdrop").classList.remove("open")});var j;(j=document.getElementById("cancelReasonSelect"))==null||j.addEventListener("change",t=>{const n=document.getElementById("groupCancelCustomReason");t.target.value==="Lainnya"?(n.style.display="block",document.getElementById("cancelCustomReason").required=!0):(n.style.display="none",document.getElementById("cancelCustomReason").required=!1)});var F;(F=document.getElementById("formCancelOrder"))==null||F.addEventListener("submit",async t=>{if(t.preventDefault(),!B)return;const n=document.getElementById("cancelReasonSelect").value,s=document.getElementById("cancelCustomReason").value.trim(),i=n==="Lainnya"?s:n,e=document.getElementById("btnSubmitCancelOrder");e.disabled=!0,e.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Membatalkan...';try{const c=await(await u(`/orders/${B.id}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reason:i})})).json();c.status==="success"?(r("success",c.message),document.getElementById("modalCancelBackdrop").classList.remove("open"),m(),await I()):r("error",c.message)}catch(l){r("error",l.message)}finally{e.disabled=!1,e.innerHTML='<i class="fa-solid fa-ban"></i> Ya, Batalkan Pesanan'}});window.addEventListener("beforeunload",m);document.addEventListener("DOMContentLoaded",I);
