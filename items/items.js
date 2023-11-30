var leagueConnect = require("league-connect");
const getCurrentSummoner = require("../getCurrentSummoner.js");

async function add_new_itemset(newItemSet) {
  const credentials = await leagueConnect.authenticate();
  //var current_runes_JSON = await get_item_sets(credentials);
  //var id_to_delete = current_runes_JSON.id;
  //console.log(id_to_delete);
  var currentSummoner = await getCurrentSummoner();
  var currentSummonerID = currentSummoner.summonerId;
  var current_item_sets = await get_item_sets();
  current_item_sets.itemSets.push(newItemSet);

  const post_items_request = await leagueConnect.createHttp1Request(
    {
      method: "PUT",
      url: `/lol-item-sets/v1/item-sets/${currentSummonerID}/sets`,
      body: current_item_sets,
    },
    credentials
  );
  return post_items_request.json();
}
async function get_item_sets(credentials) {
  if (credentials === undefined) {
    credentials = await leagueConnect.authenticate();
  }
  var currentSummoner = await getCurrentSummoner();
  var currentSummonerID = currentSummoner.summonerId;

  const item_sets_response = await leagueConnect.createHttp1Request(
    {
      method: "GET",
      url: `/lol-item-sets/v1/item-sets/${currentSummonerID}/sets`,
    },
    credentials
  );
  return item_sets_response.json();
}
module.exports = {
  get_item_sets,
  add_new_itemset,
};
