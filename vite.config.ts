import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { resolve } from "path";
import tsconfig from "vite-tsconfig-paths";

const homedir = process.env["HOME"] ?? "";
const host = "bisindo.test";

export default ({ command }: any) => ({
  build: {
    manifest: true,
    outDir: "vite-build",
    rollupOptions: {
      input: "views/loader.tsx",
    },
  },
  plugins: [tsconfig(), react()],
  optimizeDeps: {
    include: ["react", "voca", "lodash", "mobx", "mobx-state-tree", "moment"],
  },
  server: {
    port: "3000",
    host: "bisindo.test",
    hmr: {
      protocol: "wss",
      host: "bisindo.test",
      port: 3000,
    },
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
