import { COLOR_MODES } from "./shapes";

// Hex & RGB conversion taken from:
// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

/** Convert rgb color to hexadecimal string without a leading `#` */
export function rgbToHex(r: number, g: number, b: number) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/** Convert hexadecimal color string to rgb. */
export function hexToRgb(hex: string) {
  hex = hex[0] === "#" ? hex.substr(1) : hex;

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

// HSV to RGB and HSV to HSL conversion taken from:
// http://stackoverflow.com/a/17243070/755391

/** Convert hsv to hsl. */
export function hsvToHsl(h: number, s: number, v: number) {
  let l = (2 - s) * v;
  s = s * v;
  s /= (l <= 1) ? l : 2 - l;
  l /= 2;
  s = isNaN(s) ? 0 : s;

  return [h, s, l];
}

/** Convert hsl to hsv. */
export function hslToHsv(h: number, s: number, l: number) {
  l *= 2;
  s *= (l <= 1) ? l : 2 - l;

  const v = (l + s) / 2;
  s = (2 * s) / (l + s);
  s = isNaN(s) ? 0 : s;

  return [h, s, v];
}

/** Convert hsv color to rgb. */
export function hsvToRgb(h: number, s: number, v: number) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r, g, b;
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  r = Math.abs(Math.round(r * 255));
  g = Math.abs(Math.round(g * 255));
  b = Math.abs(Math.round(b * 255));

  return [r, g, b];
}

/**
 * Convert color from rgb to hsv.
 *
 * *red*: 0 - 255, *green*: 0 - 255, *blue*: 0 - 255
 */
export function rgbToHsv(r: number, g: number, b: number) {
  return rgbToHslOrHsv(r, g, b, COLOR_MODES.HSV);
}

/**
 * Convert color from rgb to hsl.
 *
 * *red*: 0 - 255, *green*: 0 - 255, *blue*: 0 - 255
 */
export function rgbToHsl(r: number, g: number, b: number) {
  return rgbToHslOrHsv(r, g, b, COLOR_MODES.HSL);
}

function rgbToHslOrHsv(r: number, g: number, b: number, mode: COLOR_MODES) {
  r /= 255, g /= 255, b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    switch (max) {
      case r: h = 60 * ((g - b) / d); break;
      case g: h = 60 * (2 + (g - b) / d); break;
      case b: h = 60 * (4 + (r - g) / d); break;
    }

    if (h < 0) {
      h += 360;
    }

    if (mode & COLOR_MODES.HSB) {
      s = d / max;
    } else if (mode & COLOR_MODES.HSL) {
      if (r === g && r === b && r === 1) {
        s = 0;
      } else {
        s = d / (1 - Math.abs(max + min - 1));
      }
    }
  }

  const l = mode & COLOR_MODES.HSV
    ? max
    : (max + min) / 2;

  return [h, s, l];
}

/**
 * Convert color from hsl to rgb.
 *
 * *Hue*: 0 - 360, *Saturation*: 0 - 1, *Lightness*: 0 - 1
 */
export function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const h1 = h / 60;
    const x = c * (1 - Math.abs((h1 % 2) - 1));

    const d = Math.floor(h1) % 6;
    switch (d) {
      case 0: r = c, g = x, b = 0; break;
      case 1: r = x, g = c, b = 0; break;
      case 2: r = 0, g = c, b = x; break;
      case 3: r = 0, g = x, b = c; break;
      case 4: r = x, g = 0, b = c; break;
      case 5: r = c, g = 0, b = x; break;
    }

    const m = l - c / 2;
    r = r + m;
    g = g + m;
    b = b + m;
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}
