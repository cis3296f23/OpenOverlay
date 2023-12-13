/**
 * function to call getter functions and append them to the div being displayed
 * @param {*} summonerName 
 * @returns 
 */

function summoner_CGF(summonerName) {
    var summonerInfoDiv = document.createElement('div');

    summonerInfoDiv.appendChild(getSummoner({ summonerName: summonerName }));

    var championDetailsContainer = document.createElement('div');
    championDetailsContainer.id = 'championDetails';

    summonerInfoDiv.appendChild(championDetailsContainer);

    getHighestMasteryChampion(summonerName, function (highestMasteryChampion) {
        console.log(`Champion with the highest mastery: ${highestMasteryChampion}`);
        getChampionDetails(highestMasteryChampion, championDetailsContainer);

        getChampionMasteries(summonerName, function (masteryContainer) {
            summonerInfoDiv.appendChild(masteryContainer);
        });
    });

    /*
    getFreeChamp().then(gridContainer => {
        if (gridContainer) {
            // Append the grid container to the document body or any desired parent element
            summonerInfoDiv.appendChild(gridContainer);
        }
    });
    */

    return summonerInfoDiv;
}
function reset_CGF(){
    var resultContainer = document.getElementById('summonerInfo');
    resultContainer.innerHTML = "";
}