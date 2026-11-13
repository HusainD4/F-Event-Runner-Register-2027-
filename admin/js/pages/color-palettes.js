export const COLOR_PALETTES = {
  ocean: { primary: '#006FBA', secondary: '#062C65', accent: '#27C9E8' },
  forest: { primary: '#16804A', secondary: '#163D2D', accent: '#A8D84A' },
  sunset: { primary: '#D85322', secondary: '#542C42', accent: '#FFB547' },
  violet: { primary: '#7148C5', secondary: '#34245F', accent: '#EA78C3' },
  ruby: { primary: '#BE2452', secondary: '#4C2736', accent: '#F58E69' }
};

function mix(a, b, weight) {
  const channels = [1, 3, 5].map(index => {
    const first = parseInt(a.slice(index, index + 2), 16);
    const second = parseInt(b.slice(index, index + 2), 16);
    return Math.round(first * (1 - weight) + second * weight).toString(16).padStart(2, '0');
  });
  return `#${channels.join('')}`;
}

function luminance(color) {
  const channels = [1, 3, 5].map(index => {
    const value = parseInt(color.slice(index, index + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function buttonText(color) {
  return luminance(color) > 0.179 ? '#000000' : '#ffffff';
}

export function createColorPalette({ primary, secondary, accent }) {
  if (![primary, secondary, accent].every(color => typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color))) {
    throw new TypeError('Warna template harus menggunakan HEX 6 digit.');
  }
  const ink = mix(secondary, '#000000', 0.8);
  const muted = mix(secondary, '#000000', 0.65);
  const surface = mix(secondary, '#ffffff', 0.98);
  return {
    theme_primary_color: primary,
    theme_background_color: mix(secondary, '#ffffff', 0.94),
    theme_surface_color: surface,
    theme_border_color: mix(secondary, '#ffffff', 0.78),
    theme_heading_color: ink,
    theme_text_color: ink,
    theme_muted_color: muted,
    theme_nav_color: surface,
    theme_button_color: primary,
    theme_button_text_color: buttonText(primary),
    theme_glow_color: accent,
    theme_ambient_color: accent,
    theme_shadow_color: secondary,
    theme_secondary_button_color: mix(secondary, '#ffffff', 0.88),
    theme_secondary_text_color: ink,
    theme_input_color: '#ffffff',
    theme_input_text_color: ink,
    theme_nav_text_color: ink
  };
}
