import { apiClient } from './api.js';

export function applyWebsiteFavicon(value) {
  if (typeof value !== 'string' || !value.trim()) return;

  let url;
  try {
    url = new URL(value.trim());
  } catch {
    console.warn('URL favicon website tidak valid.');
    return;
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    console.warn('URL favicon website harus menggunakan HTTP atau HTTPS.');
    return;
  }

  let favicon = document.querySelector('link[rel~="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.append(favicon);
  }

  const extension = url.pathname.split('.').pop()?.toLowerCase();
  const mimeTypes = {
    ico: 'image/x-icon',
    png: 'image/png',
    svg: 'image/svg+xml',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif'
  };
  if (mimeTypes[extension]) favicon.type = mimeTypes[extension];
  else favicon.removeAttribute('type');
  favicon.href = url.href;
}

export async function loadWebsiteBranding() {
  const settings = await apiClient.getWebsiteSettings();
  if (settings) applyWebsiteFavicon(settings.favicon_url);
}
