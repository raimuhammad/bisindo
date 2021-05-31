const path = require("path");
const fs = require("fs");
const { parse, stringify } = require("envfile");
const pathToenvFile = "./.env";

/**
 *
 * @param {string} key
 * @param {string} value
 * //Function to set environment variables.
 */
function setEnv(key, value) {
  fs.readFile(path.resolve(pathToenvFile), "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = parse(data);
    result[key] = value;
    fs.writeFile(pathToenvFile, stringify(result), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
}

module.exports = { setEnv };
