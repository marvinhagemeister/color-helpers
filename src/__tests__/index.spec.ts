import { assert as t } from "chai";
import { hexToRgb, rgbToHex, shade, blend } from "../index";

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

describe("shade", () => {
  it("should lighten a hex color", () => {
    t.equal(shade("#f48000", 0), "f48000");
    t.equal(shade("f48000", 0), "f48000");
    t.equal(shade("f48000", .3), "f7a64d");
    t.equal(shade("f48000", .5), "fac080");
    t.equal(shade("f48000", .7), "fcd9b3");
    t.equal(shade("f48000", 1), "ffffff");
  });

  it("should darken a hex color", () => {
    t.equal(shade("#f48000", 0), "f48000");
    t.equal(shade("f48000", 0), "f48000");
    t.equal(shade("f48000", -.3), "ab5a00");
    t.equal(shade("f48000", -.5), "7a4000");
    t.equal(shade("f48000", -.7), "492600");
    t.equal(shade("f48000", -1), "000000");
  });

  it("should lighten a rgb color", () => {
    t.deepEqual(shade([244, 128, 0], 0), [244, 128, 0]);
    t.deepEqual(shade([244, 128, 0], .3), [247, 166, 77]);
    t.deepEqual(shade([244, 128, 0], .5), [250, 192, 128]);
    t.deepEqual(shade([244, 128, 0], .7), [252, 217, 179]);
    t.deepEqual(shade([244, 128, 0], 1), [255, 255, 255]);
  });

  it("should darken a rgb color", () => {
    t.deepEqual(shade([244, 128, 0], 0), [244, 128, 0]);
    t.deepEqual(shade([244, 128, 0], -.3), [171, 90, 0]);
    t.deepEqual(shade([244, 128, 0], -.5), [122, 64, 0]);
    t.deepEqual(shade([244, 128, 0], -.7), [73, 38, 0]);
    t.deepEqual(shade([244, 128, 0], -1), [0, 0, 0]);
  });
});

describe("blend", () => {
  it("should blend two hex colors together", () => {
    t.equal(blend("#f48000", "3f83a3", 0), "f48000");
    t.equal(blend("#f48000", "3f83a3", .2), "d08121");
    t.equal(blend("#f48000", "3f83a3", .5), "9a8252");
    t.equal(blend("#f48000", "3f83a3", .7), "758272");
    t.equal(blend("#f48000", "3f83a3", 1), "3f83a3");
  });

  it("should blend two rgb colors together", () => {
    t.deepEqual(blend([244, 128, 0], [63, 131, 163], 0), [244, 128, 0]);
    t.deepEqual(blend([244, 128, 0], [63, 131, 163], .2), [208, 129, 33]);
    t.deepEqual(blend([244, 128, 0], [63, 131, 163], .5), [154, 130, 82]);
    t.deepEqual(blend([244, 128, 0], [63, 131, 163], .7), [117, 130, 114]);
    t.deepEqual(blend([244, 128, 0], [63, 131, 163], 1), [63, 131, 163]);
  });
});
