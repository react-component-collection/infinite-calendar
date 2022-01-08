const path = require("path");

module.exports = {
  mode: "production",
  entry: ["regenerator-runtime/runtime.js", "./src/index.js"],
  output: {
    path: path.resolve("lib"),
    filename: "index.js",
    libraryTarget: "commonjs",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", "jsx", "css", "scss"],
  },
};
