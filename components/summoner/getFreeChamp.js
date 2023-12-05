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

        // Create a parent div for the entire component
        const componentContainer = document.createElement("div");
        componentContainer.classList.add("free-champion-component");

        // Create a title div for the free champion rotation
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("rotation-title");
        titleDiv.textContent = `Free Champion Rotation (${rotation.freeChampionIds.length} champions)`;

        // Calculate the start and end dates dynamically based on the current date
        const currentDate = new Date();
        const daysUntilNextTuesday = (2 - currentDate.getDay() + 7) % 7; // Ensure the correct number of days until the next Tuesday
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() + daysUntilNextTuesday);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);

        // Format dates as "MMM D" (e.g., "Dec 5")
        const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const formattedEndDate = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // Add the date range to the title
        titleDiv.textContent += ` - Available from ${formattedStartDate} to ${formattedEndDate}`;
        componentContainer.appendChild(titleDiv);

        // Create a parent div for the grid
        const gridContainer = document.createElement("div");
        gridContainer.classList.add("free-champion-grid");

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

        // Append the grid container to the component container
        componentContainer.appendChild(gridContainer);

        return componentContainer;
    } catch (error) {
        console.error("Error fetching free champion rotation:", error);
        return null;
    }
}
