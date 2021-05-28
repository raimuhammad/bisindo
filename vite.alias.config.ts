import path from "path";
import tsConfig from "./tsconfig.json";
import voca from "voca";

const paths = tsConfig.compilerOptions.paths as Record<string, Array<string>>;

const parsed: Record<string, string> = {};

const removeSlashStars = (val: string) =>
  voca(val).replaceAll("/*", "").value();

Object.keys(paths).forEach((str) => {
  const key = removeSlashStars(str);
  parsed[key] = path.resolve("" + removeSlashStars(paths[str][0]));
});

export default parsed;
