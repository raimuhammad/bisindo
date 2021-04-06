const mix = require("laravel-mix");

const TsConfig = require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;
const ESLintPlugin = require("eslint-webpack-plugin");

mix.webpackConfig((config) => {
  return {
    resolve: {
      plugins: [
        new TsConfig({
          configFile: "./tsconfig.json",
        }),
      ],
      extensions: ["*", ".wasm", ".mjs", ".js", ".jsx", ".json", ".ts", ".tsx"],
    },
  };
});

mix.dumpWebpackConfig();

mix
  .ts("views/app.tsx", "public/js")
  .react()
  .sass("views/styles.scss", "public/css/app.css")
  .disableSuccessNotifications()
;
