import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import sass from "rollup-plugin-sass";
import resolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.js", // our source file
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es", // the preferred format
      sourcemap: true,
      name: pkg.name,
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      babelHelpers: "runtime",
      exclude: "node_modules/**",
      plugins: [
        "@babel/plugin-transform-runtime",
        [
          "@babel/plugin-proposal-class-properties",
          {
            loose: true,
          },
        ],
        ["@babel/plugin-proposal-private-methods", { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ],
    }),
    sass(),
    resolve(),
    nodePolyfills({
      sourceMap: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      typescript: require("typescript"),
    }),
  ],
};
