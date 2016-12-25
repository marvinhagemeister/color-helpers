import { assert as t } from "chai";
import { rgbToHex, hexToRgb, hsvToHsl, hslToHsv, hsvToRgb, rgbToHsv, rgbToHsl, hslToRgb } from "../conversion";

describe("rgbToHex", () => {
  it("should convert rgb to hex", () => {
    t.equal(rgbToHex(255, 255, 255), "ffffff");
    t.equal(rgbToHex(0, 0, 0), "000000");
    t.equal(rgbToHex(255, 0, 0), "ff0000");
    t.equal(rgbToHex(0, 255, 0), "00ff00");
    t.equal(rgbToHex(0, 0, 255), "0000ff");
  });
});

describe("hexToRgb", () => {
  it("should convert hex to rgb", () => {
    t.deepEqual(hexToRgb("fff"), [255, 255, 255]);
    t.deepEqual(hexToRgb("#fff"), [255, 255, 255]);
    t.deepEqual(hexToRgb("ffffff"), [255, 255, 255]);
    t.deepEqual(hexToRgb("#ffffff"), [255, 255, 255]);

    t.deepEqual(hexToRgb("000"), [0, 0, 0]);
    t.deepEqual(hexToRgb("#000"), [0, 0, 0]);
    t.deepEqual(hexToRgb("000000"), [0, 0, 0]);
    t.deepEqual(hexToRgb("#000000"), [0, 0, 0]);

    t.deepEqual(hexToRgb("#f00"), [255, 0, 0]);
  });
});

describe("hsvToHsl", () => {
  it("should convert hsv to hsl", () => {
    t.deepEqual(hsvToHsl(204, .5, .29), [204, .33, .22]);
    t.deepEqual(hsvToHsl(0, 1, 0), [0, 0, 0]);
    t.deepEqual(hsvToHsl(0, 0, 1), [0, 0, 1]);
  });
});

describe("hslToHsv", () => {
  it("should convert hsl to hsv", () => {
    t.deepEqual(hslToHsv(1, 0, 0), [1, 0, 0]);
    t.deepEqual(hslToHsv(0, 1, 0), [0, 0, 0]);
    t.deepEqual(hslToHsv(204, .33, .22), [204, .5, .29]);
  });
});

describe("hsvToRgb", () => {
  it("should convert hsv to rgb", () => {
    t.deepEqual(hsvToRgb(1, 0, 0), [0, 0, 0]);
    t.deepEqual(hsvToRgb(0, 1, 1), [255, 0, 0]);
    t.deepEqual(hsvToRgb(0, 0, 1), [255, 255, 255]);
  });
});

describe("rgbToHsv", () => {
  it("should convert rgb to hsv", () => {
    t.deepEqual(rgbToHsv(255, 0, 0), [0, 1, 1]);
    t.deepEqual(rgbToHsv(128, 255, 20), [180, .92, 1]);
    t.deepEqual(rgbToHsv(0, 0, 255), [240, 1, 1]);
  });
});

describe("rgbToHsl", () => {
  it("should convert rgb to hsl", () => {
    t.deepEqual(rgbToHsl(255, 0, 0), [0, 1, .5]);
    t.deepEqual(rgbToHsl(128, 255, 20), [180, 1, .54]);
    t.deepEqual(rgbToHsl(0, 0, 255), [240, 1, .5]);
    t.deepEqual(rgbToHsl(36, 39, 41), [204, .06, .15]);
  });
});

describe("hslToRgb", () => {
  it("should convert hsl to rgb", () => {
    t.deepEqual(hslToRgb(1, 0, 0), [0, 0, 0]);
    t.deepEqual(hslToRgb(0, 0, 1), [255, 255, 255]);
    t.deepEqual(hslToRgb(0, 1, .5), [255, 0, 0]);
    t.deepEqual(hslToRgb(204, .06, .15), [36, 39, 41]);
  });
});
