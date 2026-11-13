/**
 * API CONNECTOR - TEGAL RUN 2027
 * Handles communication with Backend API & Midtrans Snap
 */

const isLocalFrontend = typeof window !== 'undefined'
  && ['localhost', '127.0.0.1'].includes(window.location.hostname)
  && ['3000', '4173', '5173', '5174', '5175'].includes(window.location.port);

const configuredApiUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.haisen.my.id/api';
const fallbackApiUrl = import.meta.env.VITE_API_FALLBACK_URL;
export const apiBaseUrls = isLocalFrontend
  ? ['/api']
  : [...new Set([configuredApiUrl, fallbackApiUrl]
    .filter(Boolean)
    .map(url => url.replace(/\/+$/, '')))];

export const API_BASE_URL = apiBaseUrls[0];

export async function apiFetch(path, options = {}) {
  const endpoint = path.startsWith('/') ? path : `/${path}`;
  const method = (options.method || 'GET').toUpperCase();
  const canRetry = ['GET', 'HEAD', 'OPTIONS'].includes(method);
  let lastError;

  for (const [index, baseUrl] of apiBaseUrls.entries()) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options);
      if (canRetry && [502, 503, 504].includes(response.status) && index < apiBaseUrls.length - 1) {
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (options.signal?.aborted) throw error;
      if (!canRetry) throw error;
    }
  }

  throw lastError;
}

let midtransSdkPromise;

export async function loadMidtransSdk() {
  if (typeof window !== 'undefined' && window.snap?.pay) return;
  if (midtransSdkPromise) return midtransSdkPromise;

  midtransSdkPromise = (async () => {
    const response = await apiFetch('/settings/checkout-config', {
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();

    if (!response.ok || result.status !== 'success') {
      throw new Error(result.message || 'Konfigurasi pembayaran tidak dapat dimuat.');
    }

    const { midtransClientKey, midtransIsProduction } = result.data || {};
    if (!midtransClientKey) {
      throw new Error('Client key Midtrans belum dikonfigurasi pada backend.');
    }

    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = midtransIsProduction
        ? 'https://app.midtrans.com/snap/snap.js'
        : 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.dataset.clientKey = midtransClientKey;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Library pembayaran Midtrans gagal dimuat.'));
      document.head.appendChild(script);
    });

    if (!window.snap?.pay) {
      throw new Error('Library pembayaran Midtrans tidak tersedia.');
    }
  })().catch(error => {
    midtransSdkPromise = null;
    throw error;
  });

  return midtransSdkPromise;
}

export const apiClient = {
  /**
   * Mengambil seluruh konfigurasi konten website CMS (Judul, Rute, Google Maps, Gambar)
   */
  async getWebsiteSettings() {
    try {
      const response = await apiFetch('/settings/website', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      const res = await response.json();
      return res.data;
    } catch (err) {
      console.warn('⚠️ Gagal mengambil pengaturan website CMS dari backend:', err);
      return null;
    }
  },

  /**
   * Mengambil tanggal countdown & status penutupan event langsung dari backend (Database)
   */
  async getCountdownSettings() {
    try {
      const response = await apiFetch('/settings/countdown', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      const res = await response.json();
      return res.data;
    } catch (err) {
      console.warn('⚠️ Gagal mengambil pengaturan countdown dari backend:', err);
      return null;
    }
  },

  /**
   * Mengambil pengaturan biaya layanan & timer checkout dari backend
   */
  async getCheckoutConfig() {
    try {
      const response = await apiFetch('/settings/checkout-config', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      const res = await response.json();
      return res.data;
    } catch (err) {
      console.warn('⚠️ Gagal mengambil pengaturan biaya layanan dari backend:', err);
      return null;
    }
  },

  /**
   * Mengambil daftar event aktif dari backend
   */
  async getEvents() {
    try {
      const response = await apiFetch('/events', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        return result.data;
      }
      return [];
    } catch (err) {
      console.warn('⚠️ Gagal mengambil event langsung dari backend:', err);
      return [];
    }
  },

  /**
   * Mengambil detail event lengkap (benefits, jerseys, bibConfig, dll)
   */
  async getEventDetail(id) {
    try {
      const response = await apiFetch(`/events/${id}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      const res = await response.json();
      return res.data;
    } catch (err) {
      console.warn('⚠️ Gagal mengambil detail event dari backend:', err);
      return null;
    }
  },

  /**
   * Mengambil overview rute lari beserta daftar checkpoint dari backend
   */
  async getRouteOverview() {
    try {
      const response = await apiFetch('/routes', {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      const res = await response.json();
      return res.data;
    } catch (err) {
      console.warn('⚠️ Gagal mengambil data rute dari backend:', err);
      return null;
    }
  },

  /**
   * Mengirim pendaftaran / checkout tiket ke backend
   */
  async registerOrder(payload) {
    try {
      const response = await apiFetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      // 1. Tangani Rate Limit (HTTP 429)
      if (response.status === 429) {
        return {
          success: false,
          isRateLimited: true,
          message: data.message || '🚨 Terlalu banyak percobaan war tiket. Mohon tunggu 1 menit sebelum mencoba lagi.'
        };
      }

      // 2. Tangani Kesalahan Validasi Input (HTTP 400)
      if (response.status === 400) {
        let errorDetail = data.message || 'Data pendaftaran tidak valid.';
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          errorDetail = data.errors.map(e => `• ${e.field}: ${e.message}`).join('\n');
        }
        return {
          success: false,
          message: errorDetail,
          rawErrors: data.errors
        };
      }

      // 3. Tangani Bot Detection / Forbidden (HTTP 403)
      if (response.status === 403) {
        return {
          success: false,
          message: '🚨 Akses diblokir oleh sistem anti-bot. Pastikan tidak menggunakan script/ekstensi otomatis.'
        };
      }

      // 4. Tangani Sukses (HTTP 201)
      if (response.status === 201 && data.status === 'success') {
        return {
          success: true,
          message: data.message,
          data: data.data // Berisi orderId, midtransOrderId, paymentToken, paymentUrl
        };
      }

      return {
        success: false,
        message: data.message || 'Terjadi kesalahan sistem saat memproses tiket.'
      };

    } catch (err) {
      console.error('❌ API Request Error:', err);
      return {
        success: false,
        message: 'Koneksi ke server gagal. Silakan coba beberapa saat lagi.'
      };
    }
  }
};
