// import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import sass from "rollup-plugin-sass";
import resolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default {
  input: "src/index.js", // our source file
  output: [
    {
      file: pkg.main,
      format: "cjs",
      // exports: "named",
    },
    {
      file: pkg.module,
      format: "es", // the preferred format
      // exports: "named",
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
    }),
    sass(),
    resolve(),
    nodePolyfills({ sourceMap: true }),
    commonjs({
      include: /node_modules/,
    }),
    // typescript({
    //   typescript: require("typescript"),
    // }),
    terser(), // minifies generated bundles
    livereload({ watch: ["lib", "es"] }),
  ],
};
