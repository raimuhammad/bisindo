const checkDeps = require("./check-deps").run;
const concurent = require("concurrently");
checkDeps().then(async () => {
  const localtunnel = require("localtunnel");
  const tunnel = await localtunnel({
    port: 8000,
    subdomain: "bisindo",
  });
  console.log(`tunnel url : ${tunnel.url}`);
  return concurent(["php artisan serve --port 8000 --quiet"]);
});
