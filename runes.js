var leagueConnect = require("league-connect");

async function add_new_runepage(newRuneSet) {
  const credentials = await leagueConnect.authenticate();
  var current_runes_JSON = await get_current_runes(credentials);
  var id_to_delete = current_runes_JSON.id;
  console.log(id_to_delete);
  const delete_response = await leagueConnect.createHttp1Request(
    {
      method: "DELETE",
      url: "/lol-perks/v1/pages/" + id_to_delete,
    },
    credentials
  );
  const post_runes = await leagueConnect.createHttp1Request(
    {
      method: "POST",
      url: "lol-perks/v1/pages",
      body: newRuneSet,
    },
    credentials
  );
}
async function get_current_runes(credentials) {
  if (credentials === undefined) {
    credentials = await leagueConnect.authenticate();
  }
  const current_runes = await leagueConnect.createHttp1Request(
    {
      method: "GET",
      url: "/lol-perks/v1/currentpage",
    },
    credentials
  );
  var current_runes_JSON = current_runes.json();
  return current_runes_JSON;
}
