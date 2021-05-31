const voca = require("voca");
const tsConfigPath = require("../tsconfig.json").compilerOptions.paths;
const path = require("path")
const parsed = {};

const removeSlashStars = (val) => voca(val).replaceAll("/*", "").value();

Object.keys(tsConfigPath).forEach((str) => {
  const key = removeSlashStars(str);
  parsed[key] = path.resolve("" + removeSlashStars(tsConfigPath[str][0]));
});

module.exports = {
  load() {
    return parsed;
  },
};
