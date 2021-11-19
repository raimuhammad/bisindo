import react from "@vitejs/plugin-react";
import tsconfig from "vite-tsconfig-paths";
import { readFileSync } from "fs";
import { resolve } from "path";

const homedir = process.env["HOME"] ?? "";
const host = "bisindo.test";

const plugins = [tsconfig(), react({})];
const config = (withserver: boolean = true) => {
  if (!withserver) {
    return { plugins };
  }
  const server = {};
  return { plugins, server, publicDir: "vite_public" };
};
const configWindows = () => {
  return config(false);
};
let conf: any = config;
if (process.platform === "win32") {
  conf = configWindows;
}
export default conf;
