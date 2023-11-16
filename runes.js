var leagueConnect = require("league-connect");

async function get_current_runes() {
  const credentials = await leagueConnect.authenticate();
  const session = await leagueConnect.createHttpSession(credentials);

  const response_summoner = await leagueConnect.createHttp2Request(
    {
      method: "GET",
      url: "/lol-summoner/v1/current-summoner",
    },
    session,
    credentials
  );
  console.log(response_summoner.text());
  console.log("\n\n");

  const response_runes = await leagueConnect.createHttp2Request(
    {
      method: "GET",
      url: "/lol-perks/v1/currentpage",
    },
    session,
    credentials
  );

  console.log(response_runes.text());
  /*
  var response_runes_JSON = response_runes.json();
  var id_to_delete = response_runes_JSON.id;
  console.log(id_to_delete);
  const delete_response = await leagueConnect.createHttp2Request(
    {
      method: "DELETE",
      url: "/lol-perks/v1/pages/" + id_to_delete,
    },
    session,
    credentials
  );

  console.log(delete_response);
  */
  /*
  var runeSet = {
    name: "Ponita",
    primaryStyleId: 8300,
    subStyleId: 8400,
    selectedPerkIds: [8351, 8313, 8345, 8347, 8451, 8444, 5007, 5002, 5001],
    current: true,
  };
    const post_runes = await leagueConnect.createHttp2Request(
    {
      method: "POST",
      url: "lol-perks/v1/pages",
      body: runeSet,
    },
    session,
    credentials
  );
  console.log(post_runes.text());
  */
  session.close();
}

async function add_new_runepage(newRuneSet) {
  const credentials = await leagueConnect.authenticate();
  const current_runes = await leagueConnect.createHttp1Request(
    {
      method: "GET",
      url: "/lol-perks/v1/currentpage",
    },
    credentials
  );
  var current_runes_JSON = current_runes.json();
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
