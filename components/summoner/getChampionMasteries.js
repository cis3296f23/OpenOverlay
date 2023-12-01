const processMastery = (championIdMap, summonerId, masteryEntry) => {
    const champion = championIdMap.data[masteryEntry.championId];
    return {
        championName: champion.name,
        championLevel: masteryEntry.championLevel,
        championPoints: masteryEntry.championPoints,
    };
};

const getChampionMasteries = async (summonerName, callback) => {
    var div = document.createElement('div');
    div.classList.add('champion-masteries-info');

    try {
        var kayn = Kayn(config['api-key'])();
        const summoner = await kayn.Summoner.by.name(summonerName);
        const championIdMap = await kayn.DDragon.Champion.listDataByIdWithParentAsId();
        const masteries = await kayn.ChampionMastery.list(summoner.id);

        const masteryResults = masteries.map(entry => processMastery(championIdMap, summoner.id, entry));

        // Display champion mastery information
        masteryResults.forEach(mastery => {
            const masteryInfoElement = document.createElement('p');
            masteryInfoElement.textContent = `Champion: ${mastery.championName}, Level: ${mastery.championLevel}, Points: ${mastery.championPoints}`;
            div.appendChild(masteryInfoElement);
        });

        callback(div);
    } catch (error) {
        console.error('Error fetching champion masteries:', error);
        var errorMessage = document.createElement('p');
        errorMessage.innerHTML = 'Error fetching champion masteries';
        div.appendChild(errorMessage);
        callback(div);
    }
};
