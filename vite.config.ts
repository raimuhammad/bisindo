import react from "@vitejs/plugin-react";
import tsconfig from "vite-tsconfig-paths";
import { readFileSync } from "fs";
import { resolve } from "path";

const homedir = process.env["HOME"] ?? "";
const host = "bisindo.test";
const config = () => ({
  plugins: [
    tsconfig(),
    react({
      babel: {
        plugins: [
          [
            "@emotion",
            {
              importMap: {
                "@mui/material": {
                  styled: {
                    canonicalImport: ["@emotion/styled", "default"],
                    styledBaseImport: ["@mui/material", "styled"],
                  },
                },
                "@mui/material/styles": {
                  styled: {
                    canonicalImport: ["@emotion/styled", "default"],
                    styledBaseImport: ["@mui/material/styles", "styled"],
                  },
                },
              },
            },
          ],
        ],
      },
    }),
  ],
  server: {
    port: "3000",
    host: "bisindo.test",
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
const configWindows = () => {
  const {server : _, ...rest} = config();
  return {...rest}
}
let conf : any = config;
if (process.platform === "win32"){
  conf = configWindows
}
export default conf;