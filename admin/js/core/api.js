import { API_BASE_URL, apiFetch } from '../../../js/api.js';
import { adminState } from './state.js';
import { handleLogout } from './auth.js';

export async function fetchAdmin(endpoint, options = {}, maybeBody = null) {
  let opts = {};
  if (typeof options === 'string') {
    opts = {
      method: options,
      ...(maybeBody ? { body: JSON.stringify(maybeBody) } : {})
    };
  } else {
    opts = options || {};
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...opts.headers
  };

  if (adminState.token) {
    headers['Authorization'] = `Bearer ${adminState.token}`;
  }

  try {
    const response = await apiFetch(endpoint, {
      ...opts,
      headers
    });

    if (response.status === 401) {
      handleLogout();
      throw new Error('Sesi autentikasi telah habis. Silakan login kembali.');
    }

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`Server tidak merespons JSON (HTTP ${response.status}). Pastikan backend aktif.`);
    }

    return data;
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error('Gagal terhubung ke server backend. Silakan coba beberapa saat lagi.');
    }
    throw err;
  }
}
