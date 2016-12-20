[![Build Status](https://travis-ci.org/marvinhagemeister/color-utils.svg?branch=master)](https://travis-ci.org/marvinhagemeister/color-utils)

# Color Utils

Tiny helper library for color operations or conversions.

## Installation

```bash
npm install color-utils
```

Or if you are using yarn:

```bash
yarn add color-utils
```

## API

### `rgbToHex(r, g, b)`

Convert RGB color to hex.

### `hexToRgb(hex)`

Convert hex color string to RGB. Supports both shorthand `fff` and standard notation `ffffff`.
Leading `#` is also supported, like: `#000`.

### `shade(color, percentage)`

Darken or lighten a color. Color can either be a hex string or an array containing the rgb value.
The percentage range is `-1 - +1`. Use positive numbers to lighten the color and negative
values to darken it.

### `blend(color1, color2, percentage)`

Mix two colors together. Percentage range is from `0 - 1`.

## LICENSE

MIT, see `LICENSE.md`
