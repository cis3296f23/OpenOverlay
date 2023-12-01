var root = document.getElementById("root");
var search = document.getElementById("search");
console.log(process.env.API_KEY);

// Title Bar
var titlebar = titlebar({ title: "Open Overlay" });
root.appendChild(titlebar);

//SearchBar
var searchBar = createSearchBar(searchHandler);
root.appendChild(searchBar);

// Last 5 Ranked Games
//getLast5RankedGames({}, function(matchHistoryContainer) {
//    root.appendChild(matchHistoryContainer);
//});
