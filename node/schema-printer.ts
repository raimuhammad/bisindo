import { spawnSync } from 'child_process';
import { copyFileSync, constants } from 'fs'
import { resolve }  from 'path'



const serverPath = process.cwd();

spawnSync('php',[
  "artisan",
  "lighthouse:print-schema",
  "--write"
], {
  stdio: "inherit",
  cwd : serverPath
});
copyFileSync(`${serverPath}/storage/app/lighthouse-schema.graphql`, resolve('./schema.graphql'), constants.W_OK)

spawnSync("mst-gql", [
  "--format=ts",
  "--outDir=vitejs/src/models/stores",
  "schema.graphql"
], {
  stdio: "inherit"
})
