/**
 * function to call getter functions and append them to the div being displayed
 * @param {*} summonerName 
 * @returns 
 */

function summoner_CGF(summonerName) {
    var summonerInfoDiv = document.createElement('div');
    

    summonerInfoDiv.appendChild(getSummoner({summonerName: summonerName}));

    getRank({summonerName: summonerName}, function(rankContainer) {
        summonerInfoDiv.appendChild(rankContainer);
    });

    getRankFlex({summonerName: summonerName}, function(rankContainer) {
        summonerInfoDiv.appendChild(rankContainer);
    });

    getProfileIcon({ summonerName: summonerName }, function (profileIconContainer) {
        summonerInfoDiv.appendChild(profileIconContainer);
      });   

    getChampionMasteries(summonerName, function (masteryContainer) {
        summonerInfoDiv.appendChild(masteryContainer);
    });

    var championDetailsContainer = document.createElement('div');
    championDetailsContainer.id = 'championDetails';

    summonerInfoDiv.appendChild(championDetailsContainer);

    getHighestMasteryChampion(summonerName, function (highestMasteryChampion) {
        console.log(`Champion with the highest mastery: ${highestMasteryChampion}`);
        getChampionDetails(highestMasteryChampion, championDetailsContainer);
    });

    return summonerInfoDiv
}
