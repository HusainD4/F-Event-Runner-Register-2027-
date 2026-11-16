import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

test('configured website and navbar titles update the footer and page header independently', async () => {
  const source = (await readFile(new URL('../js/branding.js', import.meta.url), 'utf8'))
    .replace(/^import .*;\s*$/gm, '')
    .replace(/^export /gm, '');
  const footer = { textContent: 'TEGAL RUN 2026' };
  const header = { textContent: 'TEGAL RUN 2026' };
  const brand = {
    querySelector: () => header,
    setAttribute(name, value) { this[name] = value; },
  };
  const document = {
    title: 'Halaman - Tegal Run 2026',
    body: { nodeType: 1, querySelectorAll: () => [], getAttribute: () => null },
    head: {},
    querySelector: () => null,
    querySelectorAll(selector) {
      if (selector === '.footer-brand .brand-text') return [footer];
      if (selector === '.td-header-brand') return [brand];
      return [];
    },
    createTreeWalker: () => ({ nextNode: () => false }),
  };
  const context = vm.createContext({
    document, Node: { TEXT_NODE: 3, ELEMENT_NODE: 1 }, NodeFilter: { SHOW_TEXT: 4 },
    MutationObserver: class { observe() {} },
    applyHomeAppearance() {}, console, URL,
  });
  vm.runInContext(source, context);

  context.applyWebsiteBranding({ site_title: 'Judul website', navbar_title: 'Nama navbar' });
  assert.equal(footer.textContent, 'Judul website');
  assert.equal(header.textContent, 'Nama navbar');
  assert.equal(brand['aria-label'], 'Nama navbar, beranda');
  context.applyWebsiteBranding({ site_title: '', navbar_title: 'Nama alternatif' });
  assert.equal(footer.textContent, 'Nama alternatif');
  context.applyWebsiteBranding({ site_title: 'Judul tanpa navbar', navbar_title: '' });
  assert.equal(footer.textContent, 'Judul tanpa navbar');
});
