const ftp = require("basic-ftp");

deploy();

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: "waws-prod-am2-235.ftp.azurewebsites.windows.net",
      user: "zin\\$zin",
      password: "SwRSiD3FvyauRPPP0fAqHSbibC6Ml7HurJFlKmEeBgFtr8FvTzvjigfjq8e3",
      secure: true,
    });
    await client.uploadFromDir(__dirname + "/build", "site/wwwroot/");
  } catch (err) {
    console.log("Deploy Error", err);
  }
  client.close();
}
