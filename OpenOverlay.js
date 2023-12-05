var root = document.getElementById("root");
var search = document.getElementById("search");

// Title Bar
var titlebar = titlebar({ title: "Open Overlay" });
root.appendChild(titlebar);

//SearchBar
var searchBar = createSearchBar(searchHandler);
root.appendChild(searchBar);

createRunePageSelector().then((result) => {
  root.appendChild(result);
  console.log("reached result");
});
// Last 5 Ranked Games
//getLast5RankedGames({}, function(matchHistoryContainer) {
//    root.appendChild(matchHistoryContainer);
//});
