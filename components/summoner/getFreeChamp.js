async function getFreeChamp() {
    try {
        const kayn = Kayn(process.env.API_KEY)();

        // Fetch free champion rotation
        const rotation = await kayn.Champion.Rotation.list();

        if (!rotation || !rotation.freeChampionIds) {
            console.error("Invalid free champion rotation data:", rotation);
            return null;
        }

        const freeChampionIds = rotation.freeChampionIds;

        // Fetch champion list
        const championList = await kayn.DDragon.Champion.list();

        // Create a parent div for the grid
        const gridContainer = document.createElement("div");
        gridContainer.classList.add("free-champion-grid");

        // Add a title for the free champion rotation
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("rotation-title");
        titleDiv.textContent = `Free Champion Rotation (${rotation.freeChampionIds.length} champions) - Available from ${rotation.startDate} to ${rotation.endDate}`;
        gridContainer.appendChild(titleDiv);

        // Create a div for each champion name and image, and append to the grid container
        freeChampionIds.forEach(async (championId) => {
            const championDetails = Object.values(championList.data).find(
                (champion) => champion.key == championId.toString()
            );

            if (championDetails) {
                const championDiv = document.createElement("div");
                championDiv.classList.add("champion");

                const championNameDiv = document.createElement("div");
                championNameDiv.classList.add("champion-name");
                championNameDiv.textContent = championDetails.name;
                championDiv.appendChild(championNameDiv);

                const championImage = document.createElement("img");
                championImage.classList.add("champion-image");
                championImage.alt = `${championDetails.name} Image`;

                // Fetch champion image using championDetails.id
                const championFullDetails = await kayn.DDragon.Champion.get(championDetails.id);
                championImage.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championDetails.id}_0.jpg`;

                championDiv.appendChild(championImage);

                gridContainer.appendChild(championDiv);
            }
        });

        return gridContainer;
    } catch (error) {
        console.error("Error fetching free champion rotation:", error);
        return null;
    }
}
