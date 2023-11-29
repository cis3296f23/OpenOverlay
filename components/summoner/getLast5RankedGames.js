async function getLast5RankedGames({summonerName = 'LunaMoons'}, callback) {
    var div = document.createElement("div");
    div.classList.add("match-history");

    var kayn;
    try {
        kayn = Kayn(config["api-key"])();
    } catch (error) {
        console.error("Error initializing API:", error);
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Could not initialize API: " + error.message;
        div.appendChild(errorMessage);
        callback(div);
        return;
    }

    var summoner;
    try {
        summoner = await kayn.Summoner.by.name(summonerName);
    } catch (error) {
        console.error("Error fetching summoner:", error);
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Error fetching summoner: " + error.message;
        div.appendChild(errorMessage);
        callback(div);
        return;
    }

    var matchlist;
    try {
        matchlist = await kayn.Matchlist.by.accountID(summoner.accountId).query({
            queue: [420], // Only Ranked Solo/Duo games
            endIndex: 5 // Last 5 games
        });
    } catch (error) {
        console.error("Error fetching matchlist:", error);
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Error fetching matchlist: " + error.message;
        div.appendChild(errorMessage);
        callback(div);
        return;
    }

    var matches;
    try {
        const matchPromises = matchlist.matches.map((matchReference) => {
            return kayn.Match.get(matchReference.gameId);
        });
        matches = await Promise.all(matchPromises);
    } catch (error) {
        console.error("Error fetching matches:", error);
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Error fetching matches: " + error.message;
        div.appendChild(errorMessage);
        callback(div);
        return;
    }

    matches.forEach((match, index) => {
        const { participantId } = match.participantIdentities.find(
            pi => pi.player.summonerId === summoner.id,
        )
        const participant = match.participants.find(
            p => p.participantId === participantId,
        )

        var matchInfoParagraph = document.createElement("p");
        matchInfoParagraph.innerHTML = `Match ${index + 1}: ${participant.stats.kills}/${participant.stats.deaths}/${participant.stats.assists}`;
        div.appendChild(matchInfoParagraph);
    });

    callback(div);
}
