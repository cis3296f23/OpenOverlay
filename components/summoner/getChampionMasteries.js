const processMastery = (championIdMap, summonerId, masteryEntry) => {
    const champion = championIdMap.data[masteryEntry.championId];
    return {
        championName: champion.name,
        championLevel: masteryEntry.championLevel,
        championPoints: masteryEntry.championPoints,
    };
};

function getHighestMasteryChampion(summonerName, callback) {
    try {
        var kayn = Kayn(process.env.API_KEY)();
        kayn.Summoner.by.name(summonerName)
            .then(summoner => {
                return kayn.DDragon.Champion.listDataByIdWithParentAsId()
                    .then(championIdMap => {
                        return kayn.ChampionMastery.list(summoner.id)
                            .then(masteries => {
                                // Filter masteries for champions with level greater than 5
                                const masteryResults = masteries
                                    .filter(entry => entry.championLevel > 5)
                                    .map(entry => processMastery(championIdMap, summoner.id, entry));

                                if (masteryResults.length > 0) {
                                    // Find the champion with the highest mastery points
                                    const highestMasteryChampion = masteryResults.reduce((maxChampion, currentChampion) => {
                                        return currentChampion.championPoints > maxChampion.championPoints ? currentChampion : maxChampion;
                                    });

                                    callback(highestMasteryChampion.championName);
                                } else {
                                    callback('No Champion Masteries data available.');
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching masteries:', error);
                                callback('Error fetching masteries.');
                            });
                    })
                    .catch(error => {
                        console.error('Error fetching champion data:', error);
                        callback('Error fetching champion data.');
                    });
            })
            .catch(error => {
                console.error('Error fetching summoner:', error);
                callback('Error fetching summoner.');
            });
    } catch (error) {
        console.error('Error:', error);
        callback('Error.');
    }
}


const getChampionMasteries = async (summonerName, callback) => {
    var div = document.createElement('div');
    div.classList.add('champion-masteries-info');

    try {
        var kayn = Kayn(process.env.API_KEY)();
        const summoner = await kayn.Summoner.by.name(summonerName);
        const championIdMap = await kayn.DDragon.Champion.listDataByIdWithParentAsId();
        const masteries = await kayn.ChampionMastery.list(summoner.id);

        // Filter masteries for champions with level greater than 5
        const masteryResults = masteries
            .filter(entry => entry.championLevel > 5)
            .map(entry => processMastery(championIdMap, summoner.id, entry));

        const pieChartContainer = document.createElement('canvas');
        pieChartContainer.classList.add('pieChartContainer');
        div.appendChild(pieChartContainer);

        // Set width and height properties for the pie chart container
        Object.assign(pieChartContainer.style, {
            width: '150px', // Adjust the width as needed
            height: '150px', // Adjust the height as needed
        });

        if (masteryResults.length > 0) {
            // Function to generate an array of random colors
            function getRandomColors(count) {
                const colors = [];
                for (let i = 0; i < count; i++) {
                    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
                    colors.push(randomColor);
                }
                return colors;
            }

            // Calculate total mastery points among all champions
            const totalMastery = masteryResults.reduce((total, data) => total + data.championPoints, 0);

            // Create the pie chart
            const ctx = pieChartContainer.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: masteryResults.map(data => `${data.championName} - ${data.championPoints} Points`),
                    datasets: [{
                        data: masteryResults.map(data => data.championPoints),
                        backgroundColor: getRandomColors(masteryResults.length),
                        hoverOffset: 4,
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    tooltips: {
                        callbacks: {
                            label: (context) => {
                                const data = masteryResults[context.index];
                                return `${data.championName}: ${data.championPoints} Points`;
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: `Champion Mastery Points (Level > 5) - Total: ${totalMastery}`,
                    },
                },
            });

            // Display total mastery points among all champions in text
            const totalMasteryText = document.createElement('p');
            totalMasteryText.textContent = `Total Mastery Points Among All Champions: ${totalMastery}`;
            div.appendChild(totalMasteryText);
        } else {
            const noDataMessage = document.createElement('p');
            noDataMessage.textContent = 'No Champion Masteries data available for champions with mastery level greater than 5.';
            div.appendChild(noDataMessage);
        }

        callback(div);
    } catch (error) {
        console.error('Error fetching champion masteries:', error);
        var errorMessage = document.createElement('p');
        errorMessage.innerHTML = 'Error fetching champion masteries';
        div.appendChild(errorMessage);
        callback(div);
    }
};
