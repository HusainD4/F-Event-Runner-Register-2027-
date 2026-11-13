import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { showAdminToast, formatRupiah } from '../core/utils.js';
import { applyRbacUi } from '../core/rbac.js';
import { loadOrders } from './orders.js';

async function loadDashboardData() {
  const role = adminState.profile?.role;
  const roleName = role?.name || '';
  const permissions = Array.isArray(role?.permissions) ? role.permissions : [];
  const isSuper = roleName === 'SUPERADMIN';
  const hasPage = page => isSuper || permissions.includes(page);

  if (!hasPage('page:dashboard')) return;

  try {
    await loadDashboardStats();
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
      const errorEl = document.getElementById('dashboardStatsError');
      if (errorEl) errorEl.hidden = true;
      const retryButton = document.getElementById('btnRetryDashboardStats');
      if (retryButton) retryButton.onclick = () => loadDashboardStats();
      const fin = d.financials || {};
      const settled = fin.settled || { count: 0, amount: 0 };
      const pending = fin.pending || { count: 0, amount: 0 };
      const cancelled = fin.cancelled || { count: 0, amount: 0 };
      const serviceFee = fin.serviceFee || { count: 0, amount: 0 };
      const netRevenue = fin.netRevenue ?? d.netRevenue ?? 0;

      // 1. Top KPI Cards: Pemisahan Omzet Kotor, Biaya Layanan, dan Hasil Bersih
      const partEl = document.getElementById('kpiTotalParticipants');
      const grossRevEl = document.getElementById('kpiTotalRevenue');
      const feeRevEl = document.getElementById('kpiTotalServiceFee');
      const netRevEl = document.getElementById('kpiNetRevenue');

      if (partEl) partEl.textContent = Number(d.totalParticipants || 0).toLocaleString('id-ID');
      if (grossRevEl) grossRevEl.textContent = formatRupiah(d.totalRevenue ?? settled.amount);
      if (feeRevEl) feeRevEl.textContent = formatRupiah(d.totalServiceFee ?? serviceFee.amount);
      if (netRevEl) netRevEl.textContent = formatRupiah(netRevenue);

      // 2. Financial Breakdown Cards (4 Item: Lunas, Pending, Batal, Biaya Layanan)
      const finSettledAmt = document.getElementById('finSettledAmount');
      const finSettledCnt = document.getElementById('finSettledCount');
      if (finSettledAmt) finSettledAmt.textContent = formatRupiah(settled.amount);
      if (finSettledCnt) finSettledCnt.textContent = `${settled.count} Order`;

      const finPendingAmt = document.getElementById('finPendingAmount');
      const finPendingCnt = document.getElementById('finPendingCount');
      if (finPendingAmt) finPendingAmt.textContent = formatRupiah(pending.amount);
      if (finPendingCnt) finPendingCnt.textContent = `${pending.count} Order`;

      const finCancelledAmt = document.getElementById('finCancelledAmount');
      const finCancelledCnt = document.getElementById('finCancelledCount');
      if (finCancelledAmt) finCancelledAmt.textContent = formatRupiah(cancelled.amount);
      if (finCancelledCnt) finCancelledCnt.textContent = `${cancelled.count} Order`;

      const finServiceFeeAmt = document.getElementById('finServiceFeeAmount');
      const finServiceFeeCnt = document.getElementById('finServiceFeeCount');
      const feeAmountVal = d.totalServiceFee !== undefined ? d.totalServiceFee : (serviceFee.amount || 0);
      if (finServiceFeeAmt) finServiceFeeAmt.textContent = formatRupiah(feeAmountVal);
      if (finServiceFeeCnt) finServiceFeeCnt.textContent = `${serviceFee.count} Transaksi`;

      // 3. Formula Rekonsiliasi Banner: Total Lunas - Biaya Layanan = Bersih
      const calcGross = document.getElementById('calcGross');
      const calcFee = document.getElementById('calcFee');
      const calcNet = document.getElementById('calcNetResult');
      if (calcGross) calcGross.textContent = formatRupiah(settled.amount);
      if (calcFee) calcFee.textContent = formatRupiah(feeAmountVal);
      if (calcNet) calcNet.textContent = formatRupiah(netRevenue);

      renderRegistrationTrend(d.registrationTrend || [], d.registrationGrowth);
      renderRevenueTrend(d.revenueTrend || []);
      renderPaymentStatuses(d.paymentStatusCounts || []);
      renderConversionSummary(d.conversionSummary);
      renderRacepackSummary(d.racepackCheckinSummary);
      renderTeamPresence(d.teamPresence);
      renderParticipantProfile(d.participantProfile);
      renderJerseySizes(d.jerseySizeCounts || []);
      renderCategoryPerformance(d.categoryPerformance || []);
      renderEventPerformance(d.eventPerformance || []);
      renderRecentOrders(d.recentOrders || []);
      renderRecentActivity(d.recentActivity || []);
    } else {
      throw new Error(res?.message || 'Server tidak mengembalikan statistik dashboard.');
    }
  } catch (err) {
    console.error('Gagal memuat statistik dashboard:', err);
    const errorEl = document.getElementById('dashboardStatsError');
    const errorText = errorEl?.querySelector('span');
    if (errorText) errorText.textContent = `Statistik dashboard gagal dimuat: ${err.message || 'Terjadi kesalahan jaringan.'}`;
    if (errorEl) errorEl.hidden = false;
    const retryButton = document.getElementById('btnRetryDashboardStats');
    if (retryButton) retryButton.onclick = () => loadDashboardStats();
  }
}

function renderRegistrationTrend(records, growth) {
  const container = document.getElementById('dashboardRegistrationTrend');
  if (!container) return;
  renderLineChart(
    container,
    records,
    'count',
    value => `${Number(value).toLocaleString('id-ID')} peserta`,
    '#2563eb',
    growth
  );
}

function renderRevenueTrend(records) {
  const container = document.getElementById('dashboardRevenueTrend');
  if (!container) return;
  renderLineChart(container, records, 'amount', value => formatRupiah(value), '#16a34a');
}

function renderLineChart(container, records, valueKey, formatValue, color, growth) {
  container.replaceChildren();
  if (!records.length) {
    appendEmptyMessage(container, 'Belum ada data untuk periode ini.');
    return;
  }

  const svgNs = 'http://www.w3.org/2000/svg';
  const width = 640;
  const height = 220;
  const left = 48;
  const right = 12;
  const top = 14;
  const bottom = 36;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const values = records.map(record => Number(record[valueKey]) || 0);
  const maxValue = Math.max(0, ...values);
  const axisTicks = getChartAxisTicks(maxValue);
  const axisMax = axisTicks[0] || 1;
  const points = values.map((value, index) => ({
    x: left + (records.length > 1 ? (index / (records.length - 1)) * plotWidth : plotWidth / 2),
    y: top + plotHeight - (value / axisMax) * plotHeight,
    value,
  }));
  const svg = document.createElementNS(svgNs, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  axisTicks.forEach(value => {
    const ratio = axisMax > 0 ? value / axisMax : 0;
    const y = top + plotHeight - plotHeight * ratio;
    const grid = document.createElementNS(svgNs, 'line');
    grid.setAttribute('x1', String(left));
    grid.setAttribute('x2', String(width - right));
    grid.setAttribute('y1', String(y));
    grid.setAttribute('y2', String(y));
    grid.setAttribute('class', 'dashboard-svg-grid');
    svg.append(grid);

    const axisLabel = document.createElementNS(svgNs, 'text');
    axisLabel.setAttribute('x', String(left - 8));
    axisLabel.setAttribute('y', String(y + 4));
    axisLabel.setAttribute('text-anchor', 'end');
    axisLabel.setAttribute('class', 'dashboard-svg-label');
    axisLabel.textContent = formatAxisValue(value, valueKey);
    svg.append(axisLabel);
  });

  if (maxValue === 0) {
    const baseline = document.createElementNS(svgNs, 'line');
    baseline.setAttribute('x1', String(left));
    baseline.setAttribute('x2', String(width - right));
    baseline.setAttribute('y1', String(top + plotHeight));
    baseline.setAttribute('y2', String(top + plotHeight));
    baseline.setAttribute('class', 'dashboard-svg-baseline');
    svg.append(baseline);
  }

  const line = document.createElementNS(svgNs, 'polyline');
  line.setAttribute('points', points.map(point => `${point.x},${point.y}`).join(' '));
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', '3');
  line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('stroke-linejoin', 'round');
  svg.append(line);

  points.forEach((point, index) => {
    if (point.value === 0) return;
    const circle = document.createElementNS(svgNs, 'circle');
    circle.setAttribute('cx', String(point.x));
    circle.setAttribute('cy', String(point.y));
    circle.setAttribute('r', records.length > 20 ? '2.5' : '4');
    circle.setAttribute('fill', color);
    const title = document.createElementNS(svgNs, 'title');
    title.textContent = `${formatDashboardDate(records[index].date)}: ${formatValue(point.value)}`;
    circle.append(title);
    svg.append(circle);
  });

  [0, Math.floor((records.length - 1) / 2), records.length - 1].forEach(index => {
    const label = document.createElementNS(svgNs, 'text');
    label.setAttribute('x', String(points[index].x));
    label.setAttribute('y', String(height - 8));
    label.setAttribute('text-anchor', index === 0 ? 'start' : index === records.length - 1 ? 'end' : 'middle');
    label.setAttribute('class', 'dashboard-svg-label');
    label.textContent = formatDashboardDate(records[index].date);
    svg.append(label);
  });

  container.append(svg);
  const total = values.reduce((sum, value) => sum + value, 0);
  const summary = document.createElement('p');
  summary.className = 'dashboard-chart-summary';
  summary.textContent = valueKey === 'amount'
    ? `Total pemasukan periode ini: ${formatRupiah(total)}`
    : `Total pendaftaran periode ini: ${total.toLocaleString('id-ID')} peserta`;
  container.append(summary);
  if (growth) {
    const comparison = document.createElement('p');
    comparison.className = 'dashboard-chart-comparison';
    const change = growth.changePercent;
    comparison.textContent = change === null
      ? `${Number(growth.current || 0).toLocaleString('id-ID')} pendaftar dalam 30 hari terakhir; belum ada data pembanding.`
      : `${change > 0 ? '+' : ''}${change}% dibanding 30 hari sebelumnya (${Number(growth.current || 0).toLocaleString('id-ID')} vs ${Number(growth.previous || 0).toLocaleString('id-ID')}).`;
    comparison.classList.add(change === null || change >= 0 ? 'positive' : 'negative');
    container.append(comparison);
  }
}

function formatAxisValue(value, valueKey) {
  if (valueKey === 'amount') {
    return new Intl.NumberFormat('id-ID', {
      notation: 'compact',
      maximumFractionDigits: 0,
    }).format(value);
  }
  return Math.round(value).toLocaleString('id-ID');
}

function getChartAxisTicks(maxValue) {
  if (maxValue <= 0) return [1, 0];

  const rawStep = maxValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalizedStep = rawStep / magnitude;
  const niceStep = normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10;
  const step = Math.max(1, niceStep * magnitude);
  const axisMax = Math.ceil(maxValue / step) * step;
  const ticks = [];
  for (let value = axisMax; value >= 0; value -= step) {
    ticks.push(value);
  }
  return ticks;
}

function formatDashboardDate(dateValue) {
  return new Date(`${dateValue}T00:00:00Z`).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  });
}

function renderPaymentStatuses(records) {
  const container = document.getElementById('dashboardPaymentStatuses');
  if (!container) return;
  const labels = {
    PENDING: 'Menunggu',
    SETTLEMENT: 'Lunas',
    CAPTURE: 'Terbayar',
    CANCEL: 'Dibatalkan',
    EXPIRE: 'Kedaluwarsa',
    DENY: 'Ditolak',
    REFUND: 'Dikembalikan',
  };
  renderDonutChart(container, records.map(record => ({
    label: labels[record.status] || record.status,
    value: Number(record.count) || 0,
    color: ['CANCEL', 'EXPIRE', 'DENY', 'REFUND'].includes(record.status)
      ? '#ef4444'
      : record.status === 'PENDING' ? '#f59e0b' : '#16a34a',
  })), 'Order');
}

function renderDonutChart(container, records, totalLabel) {
  container.replaceChildren();
  const total = records.reduce((sum, item) => sum + item.value, 0);
  if (!total) {
    appendEmptyMessage(container, 'Belum ada data untuk ditampilkan.');
    return;
  }

  const layout = document.createElement('div');
  layout.className = 'dashboard-donut-layout';
  const chart = document.createElement('div');
  chart.className = 'dashboard-donut';
  let accumulated = 0;
  const segments = records.map(item => {
    const start = accumulated;
    accumulated += (item.value / total) * 100;
    return `${item.color} ${start}% ${accumulated}%`;
  });
  chart.style.background = `conic-gradient(${segments.join(', ')})`;
  const hole = document.createElement('div');
  hole.className = 'dashboard-donut-hole';
  const totalValue = document.createElement('strong');
  totalValue.textContent = total.toLocaleString('id-ID');
  const label = document.createElement('span');
  label.textContent = totalLabel;
  hole.append(totalValue, label);
  chart.append(hole);

  const legend = document.createElement('div');
  legend.className = 'dashboard-donut-legend';
  records.forEach(item => {
    const row = document.createElement('div');
    row.className = 'dashboard-legend-item';
    const dot = document.createElement('span');
    dot.className = 'dashboard-legend-dot';
    dot.style.backgroundColor = item.color;
    const text = document.createElement('span');
    text.textContent = item.label;
    const value = document.createElement('strong');
    value.textContent = `${item.value.toLocaleString('id-ID')} (${Math.round((item.value / total) * 100)}%)`;
    row.append(dot, text, value);
    legend.append(row);
  });
  layout.append(chart, legend);
  container.append(layout);
}

function renderConversionSummary(summary) {
  const container = document.getElementById('dashboardConversionSummary');
  if (!container) return;
  container.replaceChildren();
  if (!summary) {
    appendEmptyMessage(container, 'Belum ada data transaksi.');
    return;
  }
  const metrics = [
    { label: 'Konversi lunas', value: `${Number(summary.conversionPercent || 0)}%`, detail: `${Number(summary.paidOrders || 0).toLocaleString('id-ID')} lunas dari ${Number(summary.totalOrders || 0).toLocaleString('id-ID')} order`, tone: 'green' },
    { label: 'Rata-rata transaksi lunas', value: formatRupiah(summary.averagePaidOrder), detail: 'Rata-rata nilai per order sukses', tone: 'blue' },
  ];
  metrics.forEach(metric => {
    const card = document.createElement('div');
    card.className = `dashboard-summary-card ${metric.tone}`;
    const label = document.createElement('span');
    label.textContent = metric.label;
    const value = document.createElement('strong');
    value.textContent = metric.value;
    const detail = document.createElement('small');
    detail.textContent = metric.detail;
    card.append(label, value, detail);
    container.append(card);
  });
}

function renderRacepackSummary(summary) {
  const container = document.getElementById('dashboardRacepackSummary');
  if (!container) return;
  container.replaceChildren();
  if (!summary) {
    appendEmptyMessage(container, 'Data check-in racepack tidak tersedia.');
    return;
  }

  const chart = document.createElement('div');
  chart.className = 'dashboard-racepack-chart';
  renderDonutChart(chart, [
    { label: 'Sudah check-in', value: Number(summary.checkedInCount) || 0, color: '#16a34a' },
    { label: 'Belum check-in', value: Number(summary.remainingToCheckIn) || 0, color: '#f59e0b' },
  ], 'Lunas');

  const metrics = document.createElement('div');
  metrics.className = 'dashboard-racepack-metrics';
  const checked = document.createElement('div');
  checked.className = 'dashboard-racepack-metric checked';
  const checkedLabel = document.createElement('span');
  checkedLabel.textContent = 'Sudah check-in';
  const checkedValue = document.createElement('strong');
  checkedValue.textContent = Number(summary.checkedInCount || 0).toLocaleString('id-ID');
  checked.append(checkedLabel, checkedValue);

  const remaining = document.createElement('div');
  remaining.className = 'dashboard-racepack-metric remaining';
  const remainingLabel = document.createElement('span');
  remainingLabel.textContent = 'Belum check-in';
  const remainingValue = document.createElement('strong');
  remainingValue.textContent = Number(summary.remainingToCheckIn || 0).toLocaleString('id-ID');
  remaining.append(remainingLabel, remainingValue);

  const total = document.createElement('p');
  total.className = 'dashboard-racepack-total';
  total.textContent = `${Number(summary.paidParticipants || 0).toLocaleString('id-ID')} peserta lunas · ${Number(summary.percentage || 0)}% selesai`;
  metrics.append(checked, remaining, total);
  container.append(chart, metrics);
}

function renderTeamPresence(presence) {
  const container = document.getElementById('dashboardTeamPresence');
  const scope = document.getElementById('dashboardTeamScope');
  if (!container) return;
  container.replaceChildren();
  if (!presence) {
    appendEmptyMessage(container, 'Informasi kru tidak tersedia.');
    return;
  }

  if (scope) {
    scope.textContent = presence.scope === 'all'
      ? 'Ringkasan anggota aktif untuk semua role.'
      : 'Anggota aktif dan status online pada role Anda.';
  }

  const summary = document.createElement('div');
  summary.className = 'dashboard-team-summary';
  const onlineCount = document.createElement('strong');
  onlineCount.textContent = `${Number(presence.onlineCount || 0).toLocaleString('id-ID')} online`;
  const memberCount = document.createElement('span');
  memberCount.textContent = `${Number(presence.totalMembers || 0).toLocaleString('id-ID')} anggota aktif`;
  summary.append(onlineCount, memberCount);
  container.append(summary);

  if (!presence.teams?.length) {
    appendEmptyMessage(container, 'Belum ada anggota aktif pada role ini.');
    return;
  }

  presence.teams.forEach(team => {
    const section = document.createElement('section');
    section.className = 'dashboard-team-card';
    const header = document.createElement('div');
    header.className = 'dashboard-team-card-header';
    const roleName = document.createElement('strong');
    roleName.textContent = team.roleName;
    const counts = document.createElement('span');
    counts.textContent = `${Number(team.onlineCount || 0)} online · ${Number(team.memberCount || 0)} anggota`;
    header.append(roleName, counts);

    const members = document.createElement('ul');
    members.className = 'dashboard-team-members';
    (team.members || []).forEach(member => {
      const item = document.createElement('li');
      const indicator = document.createElement('span');
      indicator.className = `dashboard-presence-dot ${member.online ? 'online' : 'offline'}`;
      const name = document.createElement('span');
      name.textContent = member.name;
      const status = document.createElement('small');
      status.textContent = member.online ? 'Online' : 'Offline';
      item.append(indicator, name, status);
      members.append(item);
    });

    section.append(header, members);
    container.append(section);
  });
}

function renderParticipantProfile(profile) {
  const genderContainer = document.getElementById('dashboardParticipantGender');
  const ageContainer = document.getElementById('dashboardParticipantAge');
  if (genderContainer) {
    const genderLabels = { MALE: 'Laki-laki', FEMALE: 'Perempuan' };
    renderDonutChart(genderContainer, (profile?.gender || []).map(item => ({
      label: genderLabels[item.label] || item.label,
      value: Number(item.count) || 0,
      color: item.label === 'MALE' ? '#2563eb' : '#ec4899',
    })), 'Peserta');
  }
  if (ageContainer) {
    renderHorizontalBars(ageContainer, profile?.ageGroups || [], {
      labelKey: 'label',
      valueKey: 'count',
      color: '#8b5cf6',
      emptyMessage: 'Belum ada data kelompok usia.',
    });
  }
}

function renderJerseySizes(records) {
  const container = document.getElementById('dashboardJerseySizes');
  if (!container) return;
  renderHorizontalBars(container, records, {
    labelKey: 'size',
    valueKey: 'count',
    color: '#f97316',
    emptyMessage: 'Belum ada pilihan ukuran jersey.',
  });
}

function renderCategoryPerformance(records) {
  const container = document.getElementById('dashboardCategoryPerformance');
  if (!container) return;
  container.replaceChildren();
  if (!records.length) {
    appendEmptyMessage(container, 'Belum ada data kategori event.');
    return;
  }
  const maxCapacity = Math.max(1, ...records.map(item => Number(item.capacity) || 0));
  records.forEach(item => {
    const row = document.createElement('div');
    row.className = 'dashboard-category-row';
    const label = document.createElement('strong');
    label.textContent = item.category;
    const track = document.createElement('div');
    track.className = 'dashboard-category-track';
    const fill = document.createElement('div');
    fill.className = 'dashboard-category-fill';
    fill.style.width = `${Math.max(0, Math.min(100, (Number(item.capacity) / maxCapacity) * 100))}%`;
    const registered = document.createElement('span');
    registered.className = 'dashboard-category-registered';
    registered.style.width = `${Math.max(0, Math.min(100, Number(item.occupancyPercent) || 0))}%`;
    fill.append(registered);
    track.append(fill);
    const detail = document.createElement('span');
    detail.textContent = `${Number(item.participants || 0).toLocaleString('id-ID')} / ${Number(item.capacity || 0).toLocaleString('id-ID')} peserta · ${Number(item.occupancyPercent || 0)}%`;
    row.append(label, track, detail);
    container.append(row);
  });
}

function renderHorizontalBars(container, records, options) {
  container.replaceChildren();
  if (!records.length) {
    appendEmptyMessage(container, options.emptyMessage);
    return;
  }
  const maxValue = Math.max(1, ...records.map(item => Number(item[options.valueKey]) || 0));
  records.forEach(item => {
    const row = document.createElement('div');
    row.className = 'dashboard-chart-row';
    const label = document.createElement('span');
    label.textContent = item[options.labelKey];
    const track = document.createElement('div');
    track.className = 'dashboard-chart-track';
    const bar = document.createElement('div');
    bar.className = 'dashboard-chart-bar';
    bar.style.background = options.color;
    const value = Number(item[options.valueKey]) || 0;
    bar.style.width = `${value ? Math.max(4, (value / maxValue) * 100) : 0}%`;
    track.append(bar);
    const count = document.createElement('strong');
    count.textContent = value.toLocaleString('id-ID');
    row.append(label, track, count);
    container.append(row);
  });
}

function renderEventPerformance(events) {
  const body = document.getElementById('dashboardEventPerformance');
  if (!body) return;
  body.replaceChildren();

  events.forEach(event => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const name = document.createElement('strong');
    name.textContent = `${event.ticketName} · ${event.category}`;
    nameCell.append(name);

    const participantCell = document.createElement('td');
    participantCell.textContent = `${Number(event.registeredCount || 0).toLocaleString('id-ID')} / ${Number(event.capacity || 0).toLocaleString('id-ID')}`;

    const remainingCell = document.createElement('td');
    remainingCell.textContent = Number(event.remainingStock || 0).toLocaleString('id-ID');

    const capacityCell = document.createElement('td');
    capacityCell.className = 'dashboard-capacity';
    const occupancy = document.createElement('span');
    occupancy.textContent = `${Number(event.occupancyPercent || 0)}%`;
    const track = document.createElement('div');
    track.className = 'dashboard-capacity-track';
    const fill = document.createElement('div');
    fill.className = 'dashboard-capacity-fill';
    fill.style.width = `${Math.max(0, Math.min(100, Number(event.occupancyPercent) || 0))}%`;
    track.append(fill);
    capacityCell.append(occupancy, track);

    const statusCell = document.createElement('td');
    statusCell.textContent = event.isClosed ? 'Ditutup' : 'Dibuka';
    row.append(nameCell, participantCell, remainingCell, capacityCell, statusCell);
    body.append(row);
  });

  if (!events.length) appendTableEmptyRow(body, 5, 'Belum ada data event.');
}

function renderRecentOrders(orders) {
  const body = document.getElementById('dashboardRecentOrders');
  if (!body) return;
  body.replaceChildren();
  const labels = { PENDING: 'Menunggu', SETTLEMENT: 'Lunas', CAPTURE: 'Terbayar', CANCEL: 'Dibatalkan', EXPIRE: 'Kedaluwarsa', DENY: 'Ditolak', REFUND: 'Dikembalikan' };

  orders.forEach(order => {
    const row = document.createElement('tr');
    const reference = document.createElement('td');
    reference.textContent = order.reference;
    const status = document.createElement('td');
    status.textContent = labels[order.status] || order.status;
    const participants = document.createElement('td');
    participants.textContent = Number(order.participantCount || 0).toLocaleString('id-ID');
    const total = document.createElement('td');
    total.textContent = formatRupiah(order.totalAmount);
    row.append(reference, status, participants, total);
    body.append(row);
  });

  if (!orders.length) appendTableEmptyRow(body, 4, 'Belum ada transaksi terbaru.');
}

function renderRecentActivity(activities) {
  const list = document.getElementById('dashboardRecentActivity');
  if (!list) return;
  list.replaceChildren();

  activities.forEach(activity => {
    const item = document.createElement('li');
    const description = document.createElement('span');
    description.textContent = [activity.action, activity.entityType].filter(Boolean).join(' · ');
    const timestamp = document.createElement('time');
    timestamp.dateTime = activity.createdAt;
    timestamp.textContent = new Date(activity.createdAt).toLocaleString('id-ID', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
    item.append(description, timestamp);
    list.append(item);
  });

  if (!activities.length) {
    const empty = document.createElement('li');
    empty.className = 'dashboard-empty-row';
    empty.textContent = 'Belum ada aktivitas terbaru.';
    list.append(empty);
  }
}

function appendEmptyMessage(container, message) {
  const empty = document.createElement('p');
  empty.className = 'dashboard-empty-row';
  empty.textContent = message;
  container.append(empty);
}

function appendTableEmptyRow(body, columnCount, message) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.colSpan = columnCount;
  cell.className = 'dashboard-empty-row';
  cell.textContent = message;
  row.append(cell);
  body.append(row);
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
