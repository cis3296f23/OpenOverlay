const { Kayn, REGIONS } = require("kayn");
//require("dotenv").config();
//const config = require("./data/config.json");

function getSummoner({ summonerName = "Topfiish" }) {
  var div = document.createElement("div");
  div.classList.add("summoner");
  var summonerNameHeader = document.createElement("h2");
  summonerNameHeader.innerHTML = summonerName;
  div.appendChild(summonerNameHeader);

  try {
    var kayn = Kayn(process.env.API_KEY)();
    //var kayn = Kayn(config["api-key"])();
  } catch (error) {
    var errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Could not intialize API";
    div.appendChild(errorMessage);
    return div;
  }

  kayn.Summoner.by.name(summonerName).callback(function (err, summoner) {
    var info = document.createElement("p");
    info.innerHTML = summoner ? summoner.summonerLevel : "Error";
    info.id = "level";
    div.appendChild(info);
    console.log(summoner);
    console.log(err);
  });

  return div;
}
