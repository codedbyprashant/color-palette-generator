export function generateRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

export function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function hexToHsl(hex) {
  let { r, g, b } = hexToRgb(hex);
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function rgbToString({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`;
}

export function hslToString({ h, s, l }) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function generatePalette(count, lockedColors = []) {
  const palette = [];
  for (let i = 0; i < count; i++) {
    const locked = lockedColors[i];
    if (locked && locked.locked) {
      palette.push(locked);
    } else {
      palette.push({
        id: `color-${Date.now()}-${i}-${Math.random()}`,
        hex: generateRandomColor(),
        locked: false,
      });
    }
  }
  return palette;
}

export function exportAsJson(palette) {
  const obj = palette.reduce((acc, color, idx) => {
    acc[`color-${idx + 1}`] = {
      hex: color.hex,
      rgb: rgbToString(hexToRgb(color.hex)),
      hsl: hslToString(hexToHsl(color.hex)),
    };
    return acc;
  }, {});
  return JSON.stringify(obj, null, 2);
}

export function exportAsCss(palette) {
  const vars = palette
    .map((color, idx) => `  --color-${idx + 1}: ${color.hex};`)
    .join('\n');
  return `:root {\n${vars}\n}`;
}

export function exportAsTailwind(palette) {
  const colors = palette
    .map((color, idx) => `      'palette-${idx + 1}': '${color.hex}',`)
    .join('\n');
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n${colors}\n      },\n    },\n  },\n}`;
}
