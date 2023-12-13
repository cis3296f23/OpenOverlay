/**
 * function to get current player/summoner info using an HTTP request
 */

var leagueConnect = require("league-connect");
async function getCurrentSummoner() {
  const credentials = await leagueConnect.authenticate();
  const response = await leagueConnect.createHttp1Request(
    {
      method: "GET",
      url: "/lol-summoner/v1/current-summoner",
    },
    credentials
  );
  return response.json();
}
async function getCurrentSummonerName() {
  var currentSummoner = await getCurrentSummoner();
  return currentSummoner.displayName;
}

module.exports = getCurrentSummoner;
