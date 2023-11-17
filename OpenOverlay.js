var root = document.getElementById("root");
var summonerInfo = getSummoner({});
var titlebar = titlebar({ title: "Open Overlay" });
root.appendChild(titlebar);
var summonerNameDiv = document.createElement("p");
summonerNameDiv.innerHTML = "Summoner Name: ";
root.appendChild(summonerNameDiv);
root.appendChild(summonerInfo);
var runeSet = {
  name: "Test",
  primaryStyleId: 8300,
  subStyleId: 8400,
  selectedPerkIds: [8351, 8313, 8345, 8347, 8451, 8444, 5007, 5002, 5001],
  current: true,
};
add_new_runepage(runeSet);