import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js", // our source file
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es", // the preferred format
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
    }),
    commonjs(),
    typescript({
      typescript: require("typescript"),
    }),
    terser(), // minifies generated bundles
    livereload({ watch: ["lib", "es"] }),
  ],
};
