import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "./conversion";

// Shade functions taken from:
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeHexColor(color: string, percent: number) {
  if (color[0] === "#") {
    color = color.slice(1);
  }

  const f = parseInt(color, 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;

  const R = f >> 16;
  const G = f >> 8 & 0x00FF;
  const B = f & 0x0000FF;

  return "" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

function shadeRGBColor(R: number, G: number, B: number, percent: number) {
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;

  R = Math.round((t - R) * p) + R;
  G = Math.round((t - G) * p) + G;
  B = Math.round((t - B) * p) + B;

  return [R, G, B];
}

export interface ShadeOptions {
  /** Always convert to HSL */
  convertHSL?: boolean;
}

/** Darken or lighten a hex or rgb color. Percentage range is `-1.0` - `1.0` */
export function shade(color: string, percent: number, options?: ShadeOptions): string;
export function shade(color: number[], percent: number): number[];
export function shade(color: string | number[], percent: number, options: ShadeOptions = {}) {
  if (typeof color === "string") {
    if (options.convertHSL) {
      const rgb = hexToRgb(color);
      const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
      const outRgb = hslToRgb(hsl[0], hsl[1], hsl[2] + percent)
      return rgbToHex(outRgb[0], outRgb[1], outRgb[2]);
    }
    return shadeHexColor(color, percent);
  }

  return shadeRGBColor(color[0], color[1], color[2], percent);
}

function blendHexColors(color1: string, color2: string, percent: number) {
  if (color1[0] === "#") {
    color1 = color1.slice(1);
  }

  if (color2[0] === "#") {
    color2 = color2.slice(1);
  }

  const f = parseInt(color1, 16);
  const t = parseInt(color2, 16);

  const R1 = f >> 16;
  const G1 = f >> 8 & 0x00FF;
  const B1 = f & 0x0000FF;

  const R2 = t >> 16;
  const G2 = t >> 8 & 0x00FF;
  const B2 = t & 0x0000FF;

  return (0x1000000 + (Math.round((R2 - R1) * percent) + R1) * 0x10000 + (Math.round((G2 - G1) * percent) + G1) * 0x100 + (Math.round((B2 - B1) * percent) + B1)).toString(16).slice(1);
}

function blendRGBColors(color1: number[], color2: number[], percent: number) {
  const R1 = color1[0];
  const G1 = color1[1];
  const B1 = color1[2];

  const R2 = color2[0];
  const G2 = color2[1];
  const B2 = color2[2];

  const R = (Math.round((R2 - R1) * percent) + R1);
  const G = (Math.round((G2 - G1) * percent) + G1);
  const B = (Math.round((B2 - B1) * percent) + B1);

  return [R, G, B];
}

/** Blend two hex or rgb colors together. Percentage range is from `0 - 1` */
export function blend(color1: string, color2: string, percent: number): string;
export function blend(color1: number[], color2: number[], percent: number): number[];
export function blend(color1: string | number[], color2: string | number[], percent: number) {
  if (typeof color1 === "string" && typeof color2 === "string") {
    return blendHexColors(color1, color2, percent);
  }

  return blendRGBColors(color1 as number[], color2 as number[], percent);
}
