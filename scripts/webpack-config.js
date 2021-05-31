const mix = require("laravel-mix");
const voca = require("voca");
const refresh = require("./webpack-refresh");
const server = require("./webpack-server");
const alias = require("./webpack-alias");
/**
 *
 * @param {Array} rules
 */
const excludeRules = (rules) => {
  const excluded = ["styl(us)", "less"];
  return rules.filter((item) => {
    const str = `${item.test}`;
    return !excluded.find((c) => {
      return voca(str).includes(c);
    });
  });
};

module.exports = () => {
  if (process.argv.includes("--hot")) {
    console.log("hot config loaded");
    mix.webpackConfig({
      devServer: server.load().devServer,
    });
    mix.options({
      hmrOptions: {
        host: process.env["APP_URL"].split("//")[1],
        port: 3000,
      },
    });
  }
  mix.override((config) => {
    config.module.rules = excludeRules(config.module.rules);
    if (process.argv.includes("--hot")) {
      refresh.load(config);
    }
  });
  mix.webpackConfig({
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  });
  mix.alias(alias.load());
  mix.override((c) => {
    c.output.publicPath = process.env.APP_URL + `:${3000}/`;
  });
  mix.typeScript("views/loader.tsx", "public/js/app.js");
  mix.sass("views/app.scss", "public/css/app.css");
  mix.disableSuccessNotifications();
};
