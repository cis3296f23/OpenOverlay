var root = document.getElementById("root");

// Title Bar
var titlebar = titlebar({ title: "Open Overlay" });
root.appendChild(titlebar);

//SearchBar
var searchBar = createSearchBar();
root.appendChild(searchBar);

//CGF to test passing parameterized name
root.appendChild(summoner_CGF("Topfiish"));

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