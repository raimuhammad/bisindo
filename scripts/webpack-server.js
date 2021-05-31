const host = process.env["APP_URL"].split("//")[1];
const homedir = process.env["HOME"];
const fs = require("fs");
const path = require("path");
const devServer = {
  https: {
    key: fs
      .readFileSync(path.resolve(homedir, `.valet/Certificates/${host}.key`))
      .toString(),
    cert: fs
      .readFileSync(path.resolve(homedir, `.valet/Certificates/${host}.crt`))
      .toString(),
  },
};

module.exports = {
  load() {
    return {
      devServer,
    };
  },
};
