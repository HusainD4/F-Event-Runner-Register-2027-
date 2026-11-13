export const DEFAULT_APPEARANCE = {
  hero_animation: 'SPEED',
  theme_primary_color: '#FF6B00',
  theme_background_color: '#F8FAFC'
};

const animations = new Set(['SPEED', 'PULSE', 'RISE', 'NONE']);
const isHexColor = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);

export function normalizeAppearance(settings = {}) {
  return {
    hero_animation: animations.has(settings.hero_animation) ? settings.hero_animation : DEFAULT_APPEARANCE.hero_animation,
    theme_primary_color: isHexColor(settings.theme_primary_color) ? settings.theme_primary_color : DEFAULT_APPEARANCE.theme_primary_color,
    theme_background_color: isHexColor(settings.theme_background_color) ? settings.theme_background_color : DEFAULT_APPEARANCE.theme_background_color
  };
}

export function applyHomeAppearance(settings) {
  const appearance = normalizeAppearance(settings);
  const color = appearance.theme_primary_color;
  const channels = [1, 3, 5].map(index => parseInt(color.slice(index, index + 2), 16));
  const rgb = channels.join(', ');
  const darken = factor => `rgb(${channels.map(channel => Math.round(channel * factor)).join(', ')})`;
  const root = document.documentElement.style;
  root.setProperty('--color-primary', color);
  root.setProperty('--color-primary-hover', darken(0.9));
  root.setProperty('--color-primary-dark', darken(0.75));
  root.setProperty('--color-primary-glow', `rgba(${rgb}, 0.25)`);
  root.setProperty('--color-primary-subtle', `rgba(${rgb}, 0.08)`);
  root.setProperty('--color-border-orange', `rgba(${rgb}, 0.25)`);
  root.setProperty('--border-glass-orange', `rgba(${rgb}, 0.3)`);
  root.setProperty('--color-bg-base', appearance.theme_background_color);
  root.setProperty('--nav-text-active', color);
  root.setProperty('--nav-hover-bg', `rgba(${rgb}, 0.08)`);
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
