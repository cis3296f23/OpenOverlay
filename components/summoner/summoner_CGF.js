function summoner_CGF(summonerName) {
    var summonerInfoDiv = document.createElement('div');
    summonerInfoDiv.appendChild(getSummoner({summonerName: summonerName}));

    return summonerInfoDiv
}
