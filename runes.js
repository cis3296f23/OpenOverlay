var leagueConnect = require("league-connect");

async function main() {
  const credentials = await leagueConnect.authenticate();
  const session = await leagueConnect.createHttpSession(credentials);
  const response = await leagueConnect.createHttp2Request(
    {
      method: "GET",
      url: "/lol-perks/v1/currentpage",
    },
    session,
    credentials
  );
  console.log(response.text());
  session.close();
}

main();
