function summoner_CGF(summonerName) {
    var summonerInfoDiv = document.createElement('div');

    summonerInfoDiv.appendChild(getSummoner({summonerName: summonerName}));

    getRank({summonerName: summonerName}, function(rankContainer) {
        summonerInfoDiv.appendChild(rankContainer);
    });

    getRankFlex({summonerName: summonerName}, function(rankContainer) {
        summonerInfoDiv.appendChild(rankContainer);
    });

    return summonerInfoDiv
}
