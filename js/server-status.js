import { apiBaseUrls } from './api.js';

export async function isServerAvailable() {
  for (const baseUrl of apiBaseUrls) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(`${baseUrl}/`, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok) {
        console.warn('Pemeriksaan server gagal dengan status HTTP:', response.status, baseUrl);
        continue;
      }
      const result = await response.json();
      if (result?.status !== 'success') {
        console.warn('Respons pemeriksaan server tidak valid:', baseUrl, result);
        continue;
      }
      return true;
    } catch (error) {
      console.warn('Server tidak dapat dijangkau dari browser:', baseUrl, error);
    } finally {
      clearTimeout(timeout);
    }
  }
  return false;
}

export function monitorServer(onResult) {
  let checking = false;

  async function check() {
    if (checking) return;
    checking = true;
    try {
      await onResult(await isServerAvailable());
    } finally {
      checking = false;
    }
  }

  setInterval(() => {
    if (!document.hidden) check();
  }, 30000);
  window.addEventListener('online', check);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) check();
  });
  return check;
}
