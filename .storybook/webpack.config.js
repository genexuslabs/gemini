const fs = require("fs");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = async ({ config }) => {
  config.entry.push(path.join(__dirname, "../dist/index.js"));
  config.entry.push(path.join(__dirname, "../dist/gemini/gemini.css"));
  fs.readdirSync(path.join(__dirname, "../dist/collection/components")).map(
    function (file) {
      jsFilePath = path.join(
        __dirname,
        `../dist/collection/components/${file}/${file}.js`
      );
      try {
        if (fs.existsSync(jsFilePath)) {
          config.entry.push(jsFilePath);
        }
      } catch (err) {
        console.error(err);
      }

      cssFilePath = path.join(
        __dirname,
        `../dist/collection/components/${file}/${file}.css`
      );
      try {
        if (fs.existsSync(cssFilePath)) {
          config.entry.push(cssFilePath);
        }
      } catch (err) {
        console.error(err);
      }
    }
  );

  config.plugins.push(
    new CopyPlugin([
      {
        from: "**/*",
        to: "./",
        context: "dist",
      },
      {
        from: "../dist/gemini/**/*",
        to: "./",
        context: "dist",
      },
    ])
  );

  config.plugins.push(new WriteFilePlugin());

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve("@storybook/source-loader")],
    enforce: "pre",
  });

  config.module.rules.push({
    type: "javascript/auto",
    test: /\.mjs$/,
    use: [],
  });

  return config;
};
