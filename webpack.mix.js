const mix = require("laravel-mix");
const paths = require("./tsconfig.json").compilerOptions.paths;
const voca = require("voca");
const path = require("path");
const fs = require("fs");
const parsed = {};
const removeSlashStars = (val) => voca(val).replaceAll("/*", "").value();

Object.keys(paths).forEach((str) => {
  const key = removeSlashStars(str);
  parsed[key] = path.resolve("" + removeSlashStars(paths[str][0]));
});

console.log(parsed);

const host = process.env["APP_URL"].split("//")[1];
const homedir = process.env["HOME"];

const webpackConfig = {
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
};

const isWin = process.platform === "win32";
if (process.argv.includes("--hot") && !isWin) {
  // -- --key $HOME/.valet/Certificates/ecourse.d.key --cert $HOME/.valet/Certificates/ecourse.d.crt
  webpackConfig.devServer = {
    https: {
      key: fs
        .readFileSync(path.resolve(homedir, `.valet/Certificates/${host}.key`))
        .toString(),
      cert: fs
        .readFileSync(path.resolve(homedir, `.valet/Certificates/${host}.crt`))
        .toString(),
    },
  };
}

mix
  .options({
    hmrOptions: {
      host: process.env["APP_URL"].split("//")[1],
      port: 3000,
    },
  })
  .alias(parsed)
  .webpackConfig(webpackConfig)
  .override((c) => {
    c.output.publicPath = process.env.APP_URL + `:${3000}/`;
  })
  .sass("./views/app.scss", "public/css/app.css")
  .ts("./views/loader.tsx", "public/js/app.js")
  .react();
