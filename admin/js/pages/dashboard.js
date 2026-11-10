import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, formatRupiah } from '../core/utils.js';
import { applyRbacUi } from '../core/rbac.js';
import { loadGlobalSettings } from './countdown.js';
import { loadEvents } from './events.js';
import { loadParticipants } from './participants.js';
import { loadOrders } from './orders.js';
import { loadAdminsAndRoles } from './admins.js';
import { loadAuditLogs } from './logs.js';

async function loadDashboardData() {
  try {
    // 0. Statistik Dashboard & Rekonsiliasi Midtrans
    await loadDashboardStats();

    // 1. Countdown & Global Settings
    await loadGlobalSettings();

    // 2. Events List
    await loadEvents();

    // 3. Participants
    await loadParticipants();

    // 4. Orders
    await loadOrders();

    // 5. Admins & Roles (if Superadmin)
    if (adminState.profile?.role?.name === 'SUPERADMIN') {
      await loadAdminsAndRoles();
    }

    // 6. Audit Logs
    await loadAuditLogs();

    // Re-apply RBAC
    applyRbacUi(adminState.profile);
  } catch (err) {
    console.error('Error loading dashboard data:', err);
  }
}


async function loadDashboardStats() {
  try {
    const res = await fetchAdmin('/admin/stats');
    if (res && res.status === 'success' && res.data) {
      const d = res.data;
      const fin = d.financials || {
        settled: { count: 0, amount: d.totalRevenue || 0 },
        pending: { count: 0, amount: 0 },
        cancelled: { count: 0, amount: 0 },
        serviceFee: { count: 0, amount: d.totalServiceFee || 0 },
        netRevenue: d.netRevenue || d.totalRevenue || 0,
      };

      // 1. Top KPI Cards: Pemisahan Omzet Kotor, Biaya Layanan, dan Hasil Bersih
      const partEl = document.getElementById('kpiTotalParticipants');
      const grossRevEl = document.getElementById('kpiTotalRevenue');
      const feeRevEl = document.getElementById('kpiTotalServiceFee');
      const netRevEl = document.getElementById('kpiNetRevenue');

      if (partEl) partEl.textContent = Number(d.totalParticipants || 0).toLocaleString('id-ID');
      if (grossRevEl) grossRevEl.textContent = formatRupiah(d.totalRevenue || fin.settled.amount);
      if (feeRevEl) feeRevEl.textContent = formatRupiah(d.totalServiceFee || fin.serviceFee?.amount || 0);
      if (netRevEl) netRevEl.textContent = formatRupiah(fin.netRevenue);

      // 2. Financial Breakdown Cards (4 Item: Lunas, Pending, Batal, Biaya Layanan)
      const finSettledAmt = document.getElementById('finSettledAmount');
      const finSettledCnt = document.getElementById('finSettledCount');
      if (finSettledAmt) finSettledAmt.textContent = formatRupiah(fin.settled.amount);
      if (finSettledCnt) finSettledCnt.textContent = `${fin.settled.count} Order`;

      const finPendingAmt = document.getElementById('finPendingAmount');
      const finPendingCnt = document.getElementById('finPendingCount');
      if (finPendingAmt) finPendingAmt.textContent = formatRupiah(fin.pending.amount);
      if (finPendingCnt) finPendingCnt.textContent = `${fin.pending.count} Order`;

      const finCancelledAmt = document.getElementById('finCancelledAmount');
      const finCancelledCnt = document.getElementById('finCancelledCount');
      if (finCancelledAmt) finCancelledAmt.textContent = formatRupiah(fin.cancelled.amount);
      if (finCancelledCnt) finCancelledCnt.textContent = `${fin.cancelled.count} Order`;

      const finServiceFeeAmt = document.getElementById('finServiceFeeAmount');
      const finServiceFeeCnt = document.getElementById('finServiceFeeCount');
      const feeAmountVal = d.totalServiceFee !== undefined ? d.totalServiceFee : (fin.serviceFee?.amount || 0);
      if (finServiceFeeAmt) finServiceFeeAmt.textContent = formatRupiah(feeAmountVal);
      if (finServiceFeeCnt) finServiceFeeCnt.textContent = `${fin.settled.count} Transaksi`;

      // 3. Formula Rekonsiliasi Banner: Total Lunas - Biaya Layanan = Bersih
      const calcGross = document.getElementById('calcGross');
      const calcFee = document.getElementById('calcFee');
      const calcNet = document.getElementById('calcNetResult');
      if (calcGross) calcGross.textContent = formatRupiah(fin.settled.amount);
      if (calcFee) calcFee.textContent = formatRupiah(feeAmountVal);
      if (calcNet) calcNet.textContent = formatRupiah(fin.netRevenue);
    }
  } catch (err) {
    console.warn('Gagal memuat statistik keuangan dashboard:', err);
  }
}

function updateKpis() {
  loadDashboardStats();
}

async function handleSyncMidtransDashboard() {
  const btn = document.getElementById('btnSyncMidtransDashboard');
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Mensinkronkan...';
  }

  try {
    const res = await fetchAdmin('/admin/finance/sync-midtrans', { method: 'POST' });
    if (res && res.status === 'success') {
      showAdminToast('success', 'Rekonsiliasi Selesai', res.message || 'Status transaksi berhasil disinkronkan dengan Midtrans!');
      await loadDashboardStats();
      loadOrders();
    } else {
      showAdminToast('error', 'Gagal', res?.message || 'Gagal sinkronisasi dengan Midtrans.');
    }
  } catch (err) {
    showAdminToast('error', 'Kesalahan Server', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  }
}


export {
  loadDashboardData,
  loadDashboardStats,
  updateKpis,
  handleSyncMidtransDashboard
};
