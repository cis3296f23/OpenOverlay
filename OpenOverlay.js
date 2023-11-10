var root = document.getElementById("root");
var summonerInfo = getSummoner({});
var titlebar = titlebar({ title: "Open Overlay" });
root.appendChild(titlebar);
var summonerNameDiv = document.createElement("p");
summonerNameDiv.innerHTML = "Summoner Name: ";
root.appendChild(summonerNameDiv);
root.appendChild(summonerInfo);
