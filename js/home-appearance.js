export const DEFAULT_APPEARANCE = {
  hero_animation: 'SPEED',
  theme_primary_color: '#006FBA',
  theme_background_color: '#F3FBFF',
  theme_surface_color: '#FFFFFF',
  theme_border_color: '#CDEBF5',
  theme_heading_color: '#062C65',
  theme_text_color: '#152238',
  theme_muted_color: '#46657C',
  theme_nav_color: '#FFFFFF',
  theme_button_color: '#006FBA',
  theme_button_text_color: '#FFFFFF',
  theme_glow_color: '#006FBA',
  theme_ambient_color: '#B4F0FF',
  theme_shadow_color: '#062C65',
  theme_secondary_button_color: '#FFFFFF',
  theme_secondary_text_color: '#062C65',
  theme_input_color: '#FFFFFF',
  theme_input_text_color: '#152238',
  theme_nav_text_color: '#152238'
};

const animations = new Set(['SPEED', 'PULSE', 'RISE', 'NONE']);
const isHexColor = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
export const APPEARANCE_COLOR_FIELDS = Object.keys(DEFAULT_APPEARANCE).filter(key => key.startsWith('theme_'));
export const HOME_THEME_SECTIONS = [
  { key: 'hero', label: 'Hero & countdown', selector: '#beranda' },
  { key: 'tickets', label: 'Kategori tiket', selector: '#kategori' },
  { key: 'route', label: 'Rute', selector: '#rute' },
  { key: 'facilities', label: 'Fasilitas', selector: '#fasilitas' },
  { key: 'legal', label: 'Legalitas', selector: '#legal' },
  { key: 'faq', label: 'FAQ', selector: '#faq' },
  { key: 'footer', label: 'Footer', selector: '.glass-footer' }
];
export const SECTION_COLOR_LABELS = {
  background: 'Latar bagian',
  heading: 'Judul',
  text: 'Teks',
  accent: 'Aksen & ornamen',
  surface: 'Latar kartu',
  border: 'Garis kartu',
  glow: 'Glow',
  button: 'Latar tombol',
  button_text: 'Teks tombol'
};

export function getSectionDefaults(appearance) {
  return {
    background: appearance.theme_background_color,
    heading: appearance.theme_heading_color,
    text: appearance.theme_text_color,
    accent: appearance.theme_primary_color,
    surface: appearance.theme_surface_color,
    border: appearance.theme_border_color,
    glow: appearance.theme_glow_color,
    button: appearance.theme_button_color,
    button_text: appearance.theme_button_text_color
  };
}

export function normalizeSectionColors(settings, appearance) {
  let parsed = {};
  if (typeof settings?.theme_section_colors === 'string' && settings.theme_section_colors) {
    try {
      parsed = JSON.parse(settings.theme_section_colors);
    } catch (error) {
      console.warn('Pengaturan warna per bagian tidak valid:', error);
    }
  }
  const defaults = getSectionDefaults(appearance);
  return Object.fromEntries(HOME_THEME_SECTIONS.map(({ key }) => [
    key,
    Object.fromEntries(Object.keys(SECTION_COLOR_LABELS).map(field => [
      field, isHexColor(parsed?.[key]?.[field]) ? parsed[key][field] : defaults[field]
    ]))
  ]));
}

export function normalizeAppearance(settings = {}) {
  const appearance = {
    hero_animation: animations.has(settings.hero_animation) ? settings.hero_animation : DEFAULT_APPEARANCE.hero_animation,
    ...Object.fromEntries(APPEARANCE_COLOR_FIELDS.map(key => [
      key, isHexColor(settings[key]) ? settings[key] : DEFAULT_APPEARANCE[key]
    ]))
  };
  if (!isHexColor(settings.theme_button_color)) appearance.theme_button_color = appearance.theme_primary_color;
  if (!isHexColor(settings.theme_glow_color)) appearance.theme_glow_color = appearance.theme_primary_color;
  return appearance;
}

export function applyAppearanceColors(style, settings) {
  const appearance = normalizeAppearance(settings);
  const color = appearance.theme_primary_color;
  const channels = [1, 3, 5].map(index => parseInt(color.slice(index, index + 2), 16));
  const rgb = channels.join(', ');
  const glowRgb = [1, 3, 5].map(index => parseInt(appearance.theme_glow_color.slice(index, index + 2), 16)).join(', ');
  const ambientRgb = [1, 3, 5].map(index => parseInt(appearance.theme_ambient_color.slice(index, index + 2), 16)).join(', ');
  const shadowRgb = [1, 3, 5].map(index => parseInt(appearance.theme_shadow_color.slice(index, index + 2), 16)).join(', ');
  const darken = factor => `rgb(${channels.map(channel => Math.round(channel * factor)).join(', ')})`;
  const root = style;
  root.setProperty('--color-primary', color);
  root.setProperty('--color-primary-hover', darken(0.9));
  root.setProperty('--color-primary-dark', darken(0.75));
  root.setProperty('--color-primary-glow', `rgba(${glowRgb}, 0.35)`);
  root.setProperty('--theme-glow', `rgba(${glowRgb}, 0.35)`);
  root.setProperty('--theme-glow-strong', `rgba(${glowRgb}, 0.55)`);
  root.setProperty('--theme-ambient', `rgba(${ambientRgb}, 0.3)`);
  root.setProperty('--theme-shadow', `rgba(${shadowRgb}, 0.16)`);
  root.setProperty('--shadow-card', `0 10px 25px -5px rgba(${shadowRgb}, 0.16)`);
  root.setProperty('--shadow-hover', `0 20px 35px -8px rgba(${shadowRgb}, 0.24)`);
  root.setProperty('--color-primary-subtle', `rgba(${rgb}, 0.08)`);
  root.setProperty('--color-border-orange', `rgba(${rgb}, 0.25)`);
  root.setProperty('--border-glass-orange', `rgba(${rgb}, 0.3)`);
  root.setProperty('--color-bg-base', appearance.theme_background_color);
  root.setProperty('--color-bg', appearance.theme_background_color);
  root.setProperty('--color-bg-page', appearance.theme_background_color);
  root.setProperty('--color-card-bg', appearance.theme_surface_color);
  root.setProperty('--color-surface-white', appearance.theme_surface_color);
  root.setProperty('--bg-glass-card', appearance.theme_surface_color);
  root.setProperty('--bg-glass-nav', appearance.theme_nav_color);
  root.setProperty('--nav-bg', appearance.theme_nav_color);
  root.setProperty('--nav-border', appearance.theme_border_color);
  root.setProperty('--nav-text', appearance.theme_nav_text_color);
  root.setProperty('--color-border', appearance.theme_border_color);
  root.setProperty('--color-border-subtle', appearance.theme_border_color);
  root.setProperty('--border-glass', appearance.theme_border_color);
  root.setProperty('--color-text-title', appearance.theme_heading_color);
  root.setProperty('--color-text-main', appearance.theme_text_color);
  root.setProperty('--color-text-body', appearance.theme_text_color);
  root.setProperty('--color-text-muted', appearance.theme_muted_color);
  root.setProperty('--theme-button', appearance.theme_button_color);
  root.setProperty('--theme-button-text', appearance.theme_button_text_color);
  root.setProperty('--theme-secondary-button', appearance.theme_secondary_button_color);
  root.setProperty('--theme-secondary-text', appearance.theme_secondary_text_color);
  root.setProperty('--theme-input', appearance.theme_input_color);
  root.setProperty('--theme-input-text', appearance.theme_input_text_color);
  root.setProperty('--nav-text-active', color);
  root.setProperty('--nav-hover-bg', `rgba(${rgb}, 0.08)`);
  return appearance;
}

export function applyHomeAppearance(settings) {
  const appearance = applyAppearanceColors(document.documentElement.style, settings);
  const sections = normalizeSectionColors(settings, appearance);
  HOME_THEME_SECTIONS.forEach(({ key, selector }) => {
    document.querySelectorAll(selector).forEach(element => {
      Object.entries(sections[key]).forEach(([name, value]) => element.style.setProperty(`--section-${name}`, value));
      const glow = sections[key].glow;
      const rgb = [1, 3, 5].map(index => parseInt(glow.slice(index, index + 2), 16)).join(', ');
      element.style.setProperty('--section-glow-soft', `rgba(${rgb}, 0.35)`);
      element.style.setProperty('--section-glow-strong', `rgba(${rgb}, 0.55)`);
    });
  });
  document.body.classList.add('home-custom-theme');
}

export function setAnimatedTitle(element, text, animation) {
  const appearance = normalizeAppearance({ hero_animation: animation });
  const content = document.createElement('span');
  content.className = 'event-title-text';
  content.textContent = text;
  content.dataset.text = text;
  element.classList.add('event-title-effect');
  element.dataset.animation = appearance.hero_animation;
  element.setAttribute('aria-label', text);
  element.replaceChildren(content);
}
import '../css/website-theme.css';
