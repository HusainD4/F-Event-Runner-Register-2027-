import { fetchAdmin } from '../core/api.js';
import { showAdminToast, showConfirmDialog } from '../core/utils.js';

let bibDataCache = null;

function updateBibPreview() {
  const prefix = document.getElementById('bibInputPrefix')?.value || '';
  const digitLength = parseInt(document.getElementById('bibInputDigitLength')?.value || '4', 10);
  const startNumber = parseInt(document.getElementById('bibInputStartNumber')?.value || '1001', 10);
  const suffix = document.getElementById('bibInputSuffix')?.value || '';

  const padded = String(startNumber).padStart(digitLength, '0');
  const preview = `${prefix}${padded}${suffix}`;

  const previewEl = document.getElementById('bibFormatPreviewText');
  if (previewEl) previewEl.textContent = preview;
}

export async function loadBibSettings() {
  try {
    const res = await fetchAdmin('/admin/bib/settings');
    if (res && res.status === 'success' && res.data) {
      bibDataCache = res.data;
      const { settings, qrPrefix, unassignedCount, assignedCount } = res.data;

      // Update KPI
      const kpiAssigned = document.getElementById('kpiBibAssigned');
      const kpiUnassigned = document.getElementById('kpiBibUnassigned');
      const kpiQrPreview = document.getElementById('kpiQrFormatPreview');

      if (kpiAssigned) kpiAssigned.textContent = assignedCount;
      if (kpiUnassigned) kpiUnassigned.textContent = unassignedCount;
      if (kpiQrPreview) kpiQrPreview.textContent = `${qrPrefix || 'TEGALRUN'}|##########`;

      // Set Timing radio
      const timingRadios = document.querySelectorAll('input[name="bibTiming"]');
      timingRadios.forEach(r => {
        if (r.value === settings.timing) r.checked = true;
      });

      // Set Format inputs
      const prefixEl = document.getElementById('bibInputPrefix');
      const digitEl = document.getElementById('bibInputDigitLength');
      const startEl = document.getElementById('bibInputStartNumber');
      const suffixEl = document.getElementById('bibInputSuffix');

      if (prefixEl) prefixEl.value = settings.defaultPrefix || '10-';
      if (digitEl) digitEl.value = settings.digitLength || 4;
      if (startEl) startEl.value = settings.startNumber || 1001;
      if (suffixEl) suffixEl.value = settings.suffix || '';

      updateBibPreview();

      // Set QR Prefix input
      const qrInput = document.getElementById('qrInputPrefix');
      const qrExample = document.getElementById('qrPrefixExample');
      if (qrInput) qrInput.value = qrPrefix || 'TEGALRUN';
      if (qrExample) qrExample.textContent = qrPrefix || 'TEGALRUN';
    }
  } catch (err) {
    console.warn('Gagal memuat pengaturan BIB:', err);
  }

  // Muat petunjuk pengambilan racepack
  try {
    const resInstr = await fetchAdmin('/admin/settings/racepack-instructions');
    if (resInstr && resInstr.status === 'success' && resInstr.data) {
      const titleEl = document.getElementById('rpcInstructionsTitle');
      const textEl = document.getElementById('rpcInstructionsTextarea');

      if (titleEl) titleEl.value = resInstr.data.title || 'Petunjuk Pengambilan Racepack & Race Day:';
      if (textEl && Array.isArray(resInstr.data.points)) {
        textEl.value = resInstr.data.points.join('\n');
      }
    }
  } catch (err) {
    console.warn('Gagal memuat petunjuk racepack:', err);
  }

  // Muat pengaturan batas waktu pembayaran & biaya layanan
  try {
    const resFee = await fetchAdmin('/admin/settings/payment-fee');
    if (resFee && resFee.status === 'success' && resFee.data) {
      const { paymentTimerMinutes, feeEnabled, feeType, feeAmount } = resFee.data;
      const timerInput = document.getElementById('settingPaymentTimerMinutes');
      const feeEnabledCheck = document.getElementById('settingFeeEnabled');
      const feeTypeSelect = document.getElementById('settingFeeType');
      const feeAmountInput = document.getElementById('settingFeeAmount');
      const groupFee = document.getElementById('groupFeeConfig');
      const badgeFee = document.getElementById('badgeFeeStatus');

      if (timerInput) timerInput.value = paymentTimerMinutes || 30;
      if (feeEnabledCheck) {
        feeEnabledCheck.checked = !!feeEnabled;
        if (groupFee) groupFee.style.display = feeEnabled ? 'block' : 'none';
        if (badgeFee) {
          badgeFee.textContent = feeEnabled ? 'Aktif' : 'Nonaktif';
          badgeFee.style.background = feeEnabled ? '#DCFCE7' : '#E2E8F0';
          badgeFee.style.color = feeEnabled ? '#166534' : '#475569';
        }
      }
      if (feeTypeSelect) feeTypeSelect.value = feeType || 'PER_TRANSACTION';
      if (feeAmountInput) feeAmountInput.value = feeAmount || 0;
    }
  } catch (err) {
    console.warn('Gagal memuat pengaturan biaya layanan & timer:', err);
  }
}

export async function handleSaveBibSettingsSubmit(e) {
  e.preventDefault();

  const timingRadio = document.querySelector('input[name="bibTiming"]:checked');
  const timing = timingRadio ? timingRadio.value : 'PAYMENT_SUCCESS';
  const defaultPrefix = document.getElementById('bibInputPrefix')?.value || '';
  const digitLength = parseInt(document.getElementById('bibInputDigitLength')?.value || '4', 10);
  const startNumber = parseInt(document.getElementById('bibInputStartNumber')?.value || '1001', 10);
  const suffix = document.getElementById('bibInputSuffix')?.value || '';

  const saveBtn = document.getElementById('btnSaveBibSettings');
  const origHtml = saveBtn ? saveBtn.innerHTML : '';
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
  }

  try {
    const res = await fetchAdmin('/admin/bib/settings', {
      method: 'PUT',
      body: JSON.stringify({
        timing,
        defaultPrefix,
        digitLength,
        startNumber,
        suffix,
      }),
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Tersimpan', res.message || 'Pengaturan penomoran BIB berhasil diperbarui.');
      loadBibSettings();
    } else {
      showAdminToast('error', 'Gagal', res?.message || 'Gagal menyimpan pengaturan BIB.');
    }
  } catch (err) {
    showAdminToast('error', 'Terjadi Kesalahan', err.message);
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = origHtml;
    }
  }
}

export async function handleBulkGenerateBibClick() {
  const confirmed = await showConfirmDialog({
    title: 'Generate Nomor BIB Massal?',
    message: 'Sistem akan mengenerate nomor BIB unik untuk seluruh peserta lunas yang belum memiliki nomor dada. Lanjutkan proses?',
    confirmText: 'Ya, Generate Massal',
    icon: 'fa-wand-magic-sparkles',
    danger: false,
  });

  if (!confirmed) return;

  const btn = document.getElementById('btnTriggerBulkGenerate');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
  }

  try {
    const res = await fetchAdmin('/admin/bib/bulk-generate', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Berhasil', res.message);
      loadBibSettings();
    } else {
      showAdminToast('error', 'Gagal', res?.message || 'Gagal generate nomor BIB.');
    }
  } catch (err) {
    showAdminToast('error', 'Terjadi Kesalahan', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

export async function handleSaveQrPrefixSubmit(e) {
  e.preventDefault();

  const prefix = document.getElementById('qrInputPrefix')?.value || '';
  if (!prefix.trim()) {
    showAdminToast('error', 'Validasi Gagal', 'Prefix QR code tidak boleh kosong.');
    return;
  }

  const btn = document.getElementById('btnSaveQrPrefix');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  }

  try {
    const res = await fetchAdmin('/admin/settings/qr', {
      method: 'PUT',
      body: JSON.stringify({ prefix }),
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Prefix Disimpan', res.message);
      const qrExample = document.getElementById('qrPrefixExample');
      const kpiQrPreview = document.getElementById('kpiQrFormatPreview');
      if (qrExample) qrExample.textContent = res.data.prefix;
      if (kpiQrPreview) kpiQrPreview.textContent = `${res.data.prefix}|##########`;
    } else {
      showAdminToast('error', 'Gagal', res?.message || 'Gagal menyimpan prefix QR.');
    }
  } catch (err) {
    showAdminToast('error', 'Terjadi Kesalahan', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

export async function handleSaveRacepackInstructionsSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('rpcInstructionsTitle')?.value || '';
  const textVal = document.getElementById('rpcInstructionsTextarea')?.value || '';
  const points = textVal.split('\n').map(p => p.trim()).filter(Boolean);

  const btn = document.getElementById('btnSaveRpcInstructions');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
  }

  try {
    const res = await fetchAdmin('/admin/settings/racepack-instructions', {
      method: 'PUT',
      body: JSON.stringify({ title, points }),
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Tersimpan', 'Petunjuk pengambilan racepack E-Tiket berhasil diperbarui.');
    } else {
      showAdminToast('error', 'Gagal', res?.message || 'Gagal menyimpan petunjuk.');
    }
  } catch (err) {
    showAdminToast('error', 'Terjadi Kesalahan', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

export async function handleSavePaymentFeeSettingsSubmit(e) {
  e.preventDefault();

  const paymentTimerMinutes = parseInt(document.getElementById('settingPaymentTimerMinutes')?.value || '30', 10);
  const feeEnabled = document.getElementById('settingFeeEnabled')?.checked || false;
  const feeType = document.getElementById('settingFeeType')?.value || 'PER_TRANSACTION';
  const feeAmount = parseFloat(document.getElementById('settingFeeAmount')?.value || '0');

  const btn = document.getElementById('btnSavePaymentFeeSettings');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
  }

  try {
    const res = await fetchAdmin('/admin/settings/payment-fee', {
      method: 'PUT',
      body: JSON.stringify({ paymentTimerMinutes, feeEnabled, feeType, feeAmount }),
    });

    if (res && res.status === 'success') {
      showAdminToast('success', 'Tersimpan', 'Pengaturan batas waktu pembayaran dan biaya layanan berhasil diperbarui.');
      const badgeFee = document.getElementById('badgeFeeStatus');
      if (badgeFee) {
        badgeFee.textContent = feeEnabled ? 'Aktif' : 'Nonaktif';
        badgeFee.style.background = feeEnabled ? '#DCFCE7' : '#E2E8F0';
        badgeFee.style.color = feeEnabled ? '#166534' : '#475569';
      }
    } else {
      showAdminToast('error', 'Gagal', res?.message || 'Gagal menyimpan pengaturan.');
    }
  } catch (err) {
    showAdminToast('error', 'Terjadi Kesalahan', err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

// Event Listeners for inputs
export function initBibSettingsListeners() {
  ['bibInputPrefix', 'bibInputDigitLength', 'bibInputStartNumber', 'bibInputSuffix'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateBibPreview);
  });

  document.getElementById('formBibGenerationSettings')?.addEventListener('submit', handleSaveBibSettingsSubmit);
  document.getElementById('btnTriggerBulkGenerate')?.addEventListener('click', handleBulkGenerateBibClick);
  document.getElementById('formQrPrefixSettings')?.addEventListener('submit', handleSaveQrPrefixSubmit);
  document.getElementById('formRacepackInstructions')?.addEventListener('submit', handleSaveRacepackInstructionsSubmit);
  document.getElementById('formPaymentFeeSettings')?.addEventListener('submit', handleSavePaymentFeeSettingsSubmit);

  document.getElementById('settingFeeEnabled')?.addEventListener('change', (e) => {
    const group = document.getElementById('groupFeeConfig');
    const badge = document.getElementById('badgeFeeStatus');
    if (group) group.style.display = e.target.checked ? 'block' : 'none';
    if (badge) {
      badge.textContent = e.target.checked ? 'Aktif' : 'Nonaktif';
      badge.style.background = e.target.checked ? '#DCFCE7' : '#E2E8F0';
      badge.style.color = e.target.checked ? '#166534' : '#475569';
    }
  });

  document.getElementById('btnRefreshBibSettings')?.addEventListener('click', loadBibSettings);
}
