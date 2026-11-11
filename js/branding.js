import { apiClient } from './api.js';

let eventNameObserver;

function replaceConfiguredEventName(value, eventName) {
  return value.replace(/tegal[\s_-]*run[\s_-]*2027/gi, () => eventName);
}

function applyEventNameToElement(element, eventName) {
  if (element.nodeType === Node.TEXT_NODE) {
    if (!element.parentElement?.closest('script, style, textarea, input')) {
      element.textContent = replaceConfiguredEventName(element.textContent, eventName);
    }
    return;
  }
  if (element.nodeType !== Node.ELEMENT_NODE) return;

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) applyEventNameToElement(walker.currentNode, eventName);

  ['alt', 'title', 'aria-label', 'placeholder'].forEach(attribute => {
    const value = element.getAttribute(attribute);
    if (value) element.setAttribute(attribute, replaceConfiguredEventName(value, eventName));
  });
  element.querySelectorAll('[alt], [title], [aria-label], [placeholder]').forEach(child => {
    ['alt', 'title', 'aria-label', 'placeholder'].forEach(attribute => {
      const value = child.getAttribute(attribute);
      if (value) child.setAttribute(attribute, replaceConfiguredEventName(value, eventName));
    });
  });
}

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

export function applyWebsiteBranding(settings) {
  if (!settings || typeof settings !== 'object') return;
  applyWebsiteFavicon(settings.favicon_url);
  const eventName = typeof settings.navbar_title === 'string' ? settings.navbar_title.trim() : '';
  if (!eventName) return;

  const updateDocumentTitle = () => {
    const updatedTitle = replaceConfiguredEventName(document.title, eventName);
    if (updatedTitle !== document.title) document.title = updatedTitle;
  };
  updateDocumentTitle();
  const description = document.querySelector('meta[name="description"]');
  if (description?.content) {
    description.content = replaceConfiguredEventName(description.content, eventName);
  }
  applyEventNameToElement(document.body, eventName);

  if (!eventNameObserver) {
    eventNameObserver = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => applyEventNameToElement(node, eventName)));
      updateDocumentTitle();
    });
    eventNameObserver.observe(document.body, { childList: true, subtree: true });
    eventNameObserver.observe(document.head, { childList: true, subtree: true });
  }
}

export async function loadWebsiteBranding() {
  try {
    const settings = await apiClient.getWebsiteSettings();
    if (settings) applyWebsiteBranding(settings);
  } catch (error) {
    console.warn('Branding website gagal dimuat dari backend:', error);
  }
}
