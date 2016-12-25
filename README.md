[![Build Status](https://travis-ci.org/marvinhagemeister/color-utils.svg?branch=master)](https://travis-ci.org/marvinhagemeister/color-utils)

# Color Utils

Tiny helper library for color operations or conversions.

## Installation

```bash
npm install color-helpers
```

Or if you are using yarn:

```bash
yarn add color-helpers
```

## API

The following conversions are supported:

- `rgb` ⟷ `hex`
- `hsv` ⟷ `hsl`
- `hsv` ⟷ `rgb`
- `hsl` ⟷ `rgb`

### `shade(color, percentage)`

Darken or lighten a color. Color can either be a hex string or an array containing the rgb value.
The percentage range is `-1 - +1`. Use positive numbers to lighten the color and negative
values to darken it.

### `blend(color1, color2, percentage)`

Mix two colors together. Percentage range is from `0 - 1`.

## LICENSE

MIT, see `LICENSE.md`
