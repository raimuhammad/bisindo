import reactRefresh from "@vitejs/plugin-react-refresh";
import aliases from "./vite.alias.config";

console.log(aliases);

export default ({ command }: any) => ({
  base: command === "serve" ? "" : "/build/",
  publicDir: "fake_dir_so_nothing_gets_copied",
  build: {
    manifest: true,
    outDir: "public/build",
    rollupOptions: {
      input: "vitejs/entry.ts",
    },
  },
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ["voca", "lodash", "konva", "mobx", "mobx-state-tree"],
  },
  resolve: {
    alias: aliases,
  },
});
