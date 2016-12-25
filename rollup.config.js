import sourcemaps from "rollup-plugin-sourcemaps";
import filesize from "rollup-plugin-filesize";
import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";
const name = require("./package").name;

const isProd = process.env.NODE_ENV === "production";
const suffix = isProd ? ".min" : "";

export default {
  entry: "lib/es/index.js",
  plugins: [
    sourcemaps(),
    buble(),
    isProd ? uglify() : () => {},
    filesize()
  ],
  moduleName: "colorHelpers",
  sourceMap: true,
  targets: [
    { dest: "dist/" + name + suffix + ".js", format: "iife" },
  ]
}
