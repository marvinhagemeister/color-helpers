function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

/** Convert rgb color to hexadecimal string without a leading `#` */
export function rgbToHex(r: number, g: number, b: number) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/** Convert hexadecimal color string to RGB. */
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
