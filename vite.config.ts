import reactRefresh from "@vitejs/plugin-react-refresh";
import aliases from "./vite.alias.config";
import { readFileSync } from "fs";
import { resolve } from "path";

const homedir = process.env["HOME"] ?? "";
const host = "bisindo.d";

export default ({ command }: any) => ({
  base: command === "serve" ? "" : "/build/",
  publicDir: "fake_dir_so_nothing_gets_copied",
  build: {
    manifest: true,
    outDir: "public/build",
    rollupOptions: {
      input: "views/loader.tsx",
    },
  },
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ["voca", "lodash", "mobx", "mobx-state-tree", "moment"],
  },
  esbuild: {
    keepNames: true,
  },
  resolve: {
    alias: aliases,
  },
  server: {
    port: "3000",
    host: "bisindo.d",
    https: {
      key: readFileSync(
        resolve(homedir, `.valet/Certificates/${host}.key`)
      ).toString(),
      cert: readFileSync(
        resolve(homedir, `.valet/Certificates/${host}.crt`)
      ).toString(),
    },
  },
});
