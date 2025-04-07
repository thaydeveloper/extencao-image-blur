const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/background.ts",
    content: "./src/content/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: false,
    concatenateModules: true,
  },
  performance: {
    hints: false,
  },
};
