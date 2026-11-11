/**
 * API CONNECTOR - TEGAL RUN 2027
 * Handles communication with Backend API & Midtrans Snap
 */

const isLocalFrontend = typeof window !== 'undefined'
  && ['localhost', '127.0.0.1'].includes(window.location.hostname)
  && ['3000', '4173', '5173', '5174', '5175'].includes(window.location.port);

export const API_BASE_URL = isLocalFrontend ? '/api' : 'https://api.haisen.my.id/api';

export const apiClient = {
  /**
   * Mengambil seluruh konfigurasi konten website CMS (Judul, Rute, Google Maps, Gambar)
   */
  async getWebsiteSettings() {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/website`, {
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
      const response = await fetch(`${API_BASE_URL}/settings/countdown`, {
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
      const response = await fetch(`${API_BASE_URL}/settings/checkout-config`, {
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
      const response = await fetch(`${API_BASE_URL}/events`, {
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
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/routes`, {
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
      const response = await fetch(`${API_BASE_URL}/register`, {
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
        message: 'Koneksi ke backend gagal. Pastikan server backend sedang aktif di http://localhost:3000'
      };
    }
  }
};
