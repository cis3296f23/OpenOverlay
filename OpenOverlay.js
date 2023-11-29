var root = document.getElementById("root");
var search = document.getElementById("search");

// Title Bar
var titlebar = titlebar({ title: "Open Overlay" });
root.appendChild(titlebar);

//SearchBar
var searchBar = createSearchBar(searchHandler);
root.appendChild(searchBar);

//CGF to test passing parameterized name
//root.appendChild(summoner_CGF("Topfiish"));

// Summoner Information
//var summonerInfo = getSummoner({});
//root.appendChild(summonerInfo);

// Summoner Rank
//getRank({}, function(rankContainer) {
//    root.appendChild(rankContainer);
//});

// Summoner Rank Flex
//getRankFlex({}, function(rankContainer) {
//    root.appendChild(rankContainer);
//});

// Last 5 Ranked Games
getLast5RankedGames({}, function(matchHistoryContainer) {
    root.appendChild(matchHistoryContainer);
});

