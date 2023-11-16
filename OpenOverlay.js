var root = document.getElementById("root");

// Title Bar
var titlebar = titlebar({ title: "Open Overlay" });
root.appendChild(titlebar);

// Summoner Information
var summonerInfo = getSummoner({});
root.appendChild(summonerInfo);

// Summoner Rank
getRank({}, function(rankContainer) {
    summonerInfo.appendChild(rankContainer);
});

// Summoner Rank Flex
getRankFlex({}, function(rankContainer) {
    summonerInfo.appendChild(rankContainer);
});