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
  theme_button_text_color: '#FFFFFF'
};

const animations = new Set(['SPEED', 'PULSE', 'RISE', 'NONE']);
const isHexColor = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
export const APPEARANCE_COLOR_FIELDS = Object.keys(DEFAULT_APPEARANCE).filter(key => key.startsWith('theme_'));

export function normalizeAppearance(settings = {}) {
  const appearance = {
    hero_animation: animations.has(settings.hero_animation) ? settings.hero_animation : DEFAULT_APPEARANCE.hero_animation,
    ...Object.fromEntries(APPEARANCE_COLOR_FIELDS.map(key => [
      key, isHexColor(settings[key]) ? settings[key] : DEFAULT_APPEARANCE[key]
    ]))
  };
  if (!isHexColor(settings.theme_button_color)) appearance.theme_button_color = appearance.theme_primary_color;
  return appearance;
}

export function applyAppearanceColors(style, settings) {
  const appearance = normalizeAppearance(settings);
  const color = appearance.theme_primary_color;
  const channels = [1, 3, 5].map(index => parseInt(color.slice(index, index + 2), 16));
  const rgb = channels.join(', ');
  const darken = factor => `rgb(${channels.map(channel => Math.round(channel * factor)).join(', ')})`;
  const root = style;
  root.setProperty('--color-primary', color);
  root.setProperty('--color-primary-hover', darken(0.9));
  root.setProperty('--color-primary-dark', darken(0.75));
  root.setProperty('--color-primary-glow', `rgba(${rgb}, 0.25)`);
  root.setProperty('--color-primary-subtle', `rgba(${rgb}, 0.08)`);
  root.setProperty('--color-border-orange', `rgba(${rgb}, 0.25)`);
  root.setProperty('--border-glass-orange', `rgba(${rgb}, 0.3)`);
  root.setProperty('--color-bg-base', appearance.theme_background_color);
  root.setProperty('--color-bg', appearance.theme_background_color);
  root.setProperty('--color-surface-white', appearance.theme_surface_color);
  root.setProperty('--bg-glass-card', appearance.theme_surface_color);
  root.setProperty('--bg-glass-nav', appearance.theme_nav_color);
  root.setProperty('--nav-bg', appearance.theme_nav_color);
  root.setProperty('--nav-border', appearance.theme_border_color);
  root.setProperty('--nav-text', appearance.theme_text_color);
  root.setProperty('--color-border', appearance.theme_border_color);
  root.setProperty('--color-border-subtle', appearance.theme_border_color);
  root.setProperty('--border-glass', appearance.theme_border_color);
  root.setProperty('--color-text-title', appearance.theme_heading_color);
  root.setProperty('--color-text-main', appearance.theme_text_color);
  root.setProperty('--color-text-body', appearance.theme_text_color);
  root.setProperty('--color-text-muted', appearance.theme_muted_color);
  root.setProperty('--theme-button', appearance.theme_button_color);
  root.setProperty('--theme-button-text', appearance.theme_button_text_color);
  root.setProperty('--nav-text-active', color);
  root.setProperty('--nav-hover-bg', `rgba(${rgb}, 0.08)`);
  return appearance;
}

export function applyHomeAppearance(settings) {
  applyAppearanceColors(document.documentElement.style, settings);
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
