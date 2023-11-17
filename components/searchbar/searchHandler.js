//This is sloppy and should be adjusted - should not be calling getElementById outside of where element is created.
function searchHandler (searchInput) {
     var searchOutput = summoner_CGF(searchInput);

     var resultContainer = document.getElementById('summonerInfo');
     resultContainer.innerHTML = '';
     resultContainer.appendChild(searchOutput);
 
     return searchOutput;
}
