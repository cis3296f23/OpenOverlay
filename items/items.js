var leagueConnect = require("league-connect");
const getCurrentSummoner = require("../getCurrentSummoner.js");

async function add_new_itemset(newRuneSet) {
  const credentials = await leagueConnect.authenticate();
  var current_runes_JSON = await get_item_sets(credentials);
  var id_to_delete = current_runes_JSON.id;
  console.log(id_to_delete);
  const post_runes = await leagueConnect.createHttp1Request(
    {
      method: "POST",
      url: "lol-perks/v1/pages",
      body: newRuneSet,
    },
    credentials
  );
}
async function get_item_sets(credentials) {
  if (credentials === undefined) {
    credentials = await leagueConnect.authenticate();
  }
  var currentSummoner = await getCurrentSummoner();
  var currentSummonerID = currentSummoner.summonerId;

  const item_sets_respnse = await leagueConnect.createHttp1Request(
    {
      method: "GET",
      url: `/lol-item-sets/v1/item-sets/${currentSummonerID}/sets`,
    },
    credentials
  );
  return item_sets_respnse.json();
}
module.exports = {
  get_item_sets,
  add_new_itemset,
};
