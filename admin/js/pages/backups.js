import { apiFetch } from '../../../js/api.js';
import { fetchAdmin } from '../core/api.js';
import { escapeHtml } from '../core/utils.js';
import { handleLogout } from '../core/auth.js';

let overviewRequestInProgress = false;
let backupOverviewLoaded = false;

export async function loadBackupOverview() {
  const status = document.getElementById('backupTablesStatus');
  const count = document.getElementById('backupTableCount');
  const list = document.getElementById('backupTablesList');
  if (!list || overviewRequestInProgress) return;

  overviewRequestInProgress = true;
  if (status) status.textContent = 'Memuat daftar tabel...';

  try {
    const response = await fetchAdmin('/admin/backups');
    if (!response || response.status !== 'success' || !Array.isArray(response.data?.tables)) {
      throw new Error(response?.message || 'Daftar tabel backup gagal dimuat.');
    }

    const tables = response.data.tables;
    if (count) count.textContent = String(tables.length);
    if (status) status.textContent = 'Semua tabel database akan disertakan pada kedua format backup.';
    list.innerHTML = tables.map(table => `<li>${escapeHtml(table)}</li>`).join('');
  } catch (error) {
    if (status) status.textContent = error.message || 'Daftar tabel gagal dimuat.';
    if (count) count.textContent = '-';
    list.replaceChildren();
    console.error('Gagal memuat cakupan backup database:', error);
  } finally {
    overviewRequestInProgress = false;
  }
}

async function downloadBackup(format) {
  const confirmed = window.confirm(
    `Unduh backup ${format.toUpperCase()} seluruh database? File memuat data sensitif dan harus disimpan secara aman.`
  );
  if (!confirmed) return;

  const buttonId = format === 'sql' ? 'btnDownloadSqlBackup' : 'btnDownloadCsvBackup';
  const button = document.getElementById(buttonId);
  const status = document.getElementById('backupTablesStatus');
  if (button) button.disabled = true;
  if (status) status.textContent = `Menyiapkan backup ${format.toUpperCase()}...`;

  try {
    const response = await apiFetch(`/admin/backups/${format}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': format === 'csv' ? 'text/csv' : 'text/plain',
        'X-Backup-Request': 'download',
      },
    });

    if (response.status === 401) {
      handleLogout({ revoke: false });
      throw new Error('Sesi admin telah berakhir. Silakan login kembali.');
    }
    if (!response.ok) {
      let message = `Unduhan backup gagal (HTTP ${response.status}).`;
      try {
        const result = await response.json();
        if (result.message) message = result.message;
      } catch {
        // Keep the explicit HTTP error if the server response is not JSON.
      }
      throw new Error(message);
    }

    const blob = await response.blob();
    const disposition = response.headers.get('Content-Disposition') || '';
    const filename = disposition.match(/filename="([^"]+)"/)?.[1]
      || `tegal-run-backup.${format}`;
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    if (status) status.textContent = `Backup ${format.toUpperCase()} berhasil disiapkan.`;
  } catch (error) {
    if (status) status.textContent = error.message || 'Unduhan backup gagal.';
    console.error(`Gagal mengunduh backup ${format.toUpperCase()}:`, error);
  } finally {
    if (button) button.disabled = false;
  }
}

export function initBackupPage() {
  document.getElementById('btnRefreshBackupOverview')?.addEventListener('click', loadBackupOverview);
  document.getElementById('btnDownloadSqlBackup')?.addEventListener('click', () => downloadBackup('sql'));
  document.getElementById('btnDownloadCsvBackup')?.addEventListener('click', () => downloadBackup('csv'));
  window.addEventListener('admin:tab-changed', event => {
    if (event.detail?.tabKey === 'backups' && !backupOverviewLoaded) {
      backupOverviewLoaded = true;
      void loadBackupOverview();
    }
  });
}
