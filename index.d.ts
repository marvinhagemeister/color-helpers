declare module "color-helpers" {
  /** Convert rgb color to hexadecimal string without a leading `#` */
  export function rgbToHex(r: number, g: number, b: number): string;
  /** Convert hexadecimal color string to rgb. */
  export function hexToRgb(hex: string): number[];
  /** Convert hsv to hsl. */
  export function hsvToHsl(h: number, s: number, v: number): number[];
  /** Convert hsl to hsv. */
  export function hslToHsv(h: number, s: number, l: number): number[];
  /** Convert hsv color to rgb. */
  export function hsvToRgb(h: number, s: number, v: number): number[];
  /**
   * Convert color from rgb to hsv.
   *
   * *red*: 0 - 255, *green*: 0 - 255, *blue*: 0 - 255
   */
  export function rgbToHsv(r: number, g: number, b: number): number[];
  /**
   * Convert color from rgb to hsl.
   *
   * *red*: 0 - 255, *green*: 0 - 255, *blue*: 0 - 255
   */
  export function rgbToHsl(r: number, g: number, b: number): number[];
  /**
   * Convert color from hsl to rgb.
   *
   * *Hue*: 0 - 360, *Saturation*: 0 - 1, *Lightness*: 0 - 1
   */
  export function hslToRgb(h: number, s: number, l: number): number[];

  /** Darken or lighten a hex color. Percentage range is `-1.0 - 1.0` */
  export function shade(color: string, percent: number): string;
  /** Darken or lighten a rgb color. Percentage range is `-1.0 - 1.0` */
  export function shade(color: number[], percent: number): number[];
  /** Blend two hex colors together. Percentage range is from `0 - 1` */
  export function blend(color1: string, color2: string, percent: number): string;
  /** Blend two rgb colors together. Percentage range is from `0 - 1` */
  export function blend(color1: number[], color2: number[], percent: number): number[];
}
