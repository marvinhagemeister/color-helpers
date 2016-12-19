import { assert as t } from "chai";
import { hexToRgb, rgbToHex } from "../index";

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
