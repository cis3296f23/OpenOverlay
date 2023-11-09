const { Kayn, REGIONS } = require("kayn");
require("dotenv").config();

function getSummoner({ summonerName = "Topfiish" }) {
  var div = document.createElement("div");
  div.classList.add("summoner");
  var summonerNameHeader = document.createElement("h2");
  summonerNameHeader.innerHTML = summonerName;
  div.appendChild(summonerNameHeader);

  var kayn = Kayn(process.env.API_KEY)();
  kayn.Summoner.by.name(summonerName).callback(function (err, summoner) {
    var level = document.createElement("p");
    level.innerHTML = summoner.summonerLevel;
    div.appendChild(level);
    console.log(summoner);
  });

  return div;
}
