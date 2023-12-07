var root = document.getElementById("root");
var search = document.getElementById("search");

// Title Bar
var titlebar = titlebar({ title: "Open Overlay" });
root.appendChild(titlebar);

//SearchBar
var searchBar = createSearchBar(searchHandler);
root.appendChild(searchBar);

// Free Champion Rotation
getFreeChamp().then(gridContainer => {
  if (gridContainer) {
      // Append the grid container to the document body or any desired parent element
      root.appendChild(gridContainer);
  }
});

createRunePageSelector().then((result) => {
  root.appendChild(result);
  console.log("reached result");
});
// Last 5 Ranked Games
//getLast5RankedGames({}, function(matchHistoryContainer) {
//    root.appendChild(matchHistoryContainer);
//});
