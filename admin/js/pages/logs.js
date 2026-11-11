import { adminState } from '../core/state.js';
import { fetchAdmin } from '../core/api.js';
import { escapeHtml } from '../core/utils.js';

// --- AUDIT LOGS ---
async function loadAuditLogs() {
  try {
    const res = await fetchAdmin('/admin/logs?limit=25');
    if (res && res.status === 'success') {
      renderAuditLogs(res.data.logs || res.data || []);
    }
  } catch (err) {
    console.error('Failed to load audit logs:', err);
  }
}

function renderAuditLogs(logs) {
  const tbody = document.getElementById('adminAuditLogsTableBody');
  if (!tbody) return;

  if (logs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:20px; color:#94A3B8;">Tidak ada catatan log audit.</td></tr>`;
    return;
  }

  tbody.innerHTML = logs.map(l => {
    const time = new Date(l.createdAt).toLocaleString('id-ID');
    return `
      <tr>
        <td><small style="color: #64748B;">${time}</small></td>
        <td><code>${escapeHtml(l.action)}</code></td>
        <td>${escapeHtml(l.description)}</td>
        <td><strong>${escapeHtml(l.admin?.fullName || l.user?.fullName || 'Sistem')}</strong></td>
      </tr>
    `;
  }).join('');
}


export {
  loadAuditLogs,
  renderAuditLogs
};
