/**
 * handles searches by inputing the user's search input and displaying the output from summoner info
 * @param {q} searchInput 
 * @returns 
 */

function searchHandler (searchInput) {
     var searchOutput = summoner_CGF(searchInput);

     var resultContainer = document.getElementById('summonerInfo');
     resultContainer.innerHTML = '';
     resultContainer.appendChild(searchOutput);
 
     return searchOutput;
}
