async function getChampionDetails(championName, container) {
    try {
        var kayn = Kayn(process.env.API_KEY)();
    } catch (error) {
        console.error('Could not initialize API:', error.message);
        return;
    }

    try {
        // Fetch champion list
        const championList = await kayn.DDragon.Champion.list();
        const championDetails = Object.values(championList.data).find(champion => champion.name.toLowerCase() === championName.toLowerCase());

        if (!championDetails) {
            console.error('Champion not found for name:', championName);
            return;
        }

        // Fetch full champion details including lore and abilities
        const championFullDetails = await kayn.DDragon.Champion.get(championDetails.id);

        // Create HTML elements
        const championContainer = document.createElement('div');
        championContainer.classList.add('champion-details');

        const championNameHeader = document.createElement('h2');
        championNameHeader.textContent = "Highest Mastery Champion : \n" + championDetails.name;
        championContainer.appendChild(championNameHeader);

        const championImage = document.createElement('img');
        championImage.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championDetails.id}_0.jpg`;
        championImage.alt = `${championDetails.name} Image`;
        championContainer.appendChild(championImage);

        const titleParagraph = document.createElement('champTitle');
        titleParagraph.textContent = `Title: ${championDetails.title}`;
        championContainer.appendChild(titleParagraph);

        const loreParagraph = document.createElement('lore');
        loreParagraph.textContent = championFullDetails.data[championDetails.id].lore ? `Lore: ${championFullDetails.data[championDetails.id].lore}` : 'Lore not available.';
        championContainer.appendChild(loreParagraph);

        // const statsHeader = document.createElement('h3');
        // statsHeader.textContent = 'Stats:';
        // championContainer.appendChild(statsHeader);

        // const statsParagraph = document.createElement('p');
        // statsParagraph.textContent = JSON.stringify(championDetails.stats);
        // championContainer.appendChild(statsParagraph);

        const abilitiesHeader = document.createElement('h3');
        abilitiesHeader.textContent = 'Abilities:';
        championContainer.appendChild(abilitiesHeader);

        if (championFullDetails.data[championDetails.id].spells && championFullDetails.data[championDetails.id].spells.length > 0) {
            championFullDetails.data[championDetails.id].spells.forEach((ability, index) => {
                const abilityContainer = document.createElement('div');
                const abilityClassName = `ability${index + 1}`;
                abilityContainer.classList.add(abilityClassName);

                const abilityName = document.createElement('p');
                abilityName.textContent = `Ability ${index + 1}: ${ability.name}`;
                abilityContainer.appendChild(abilityName);

                const abilityDescription = document.createElement('p');
                abilityDescription.textContent = `Description: ${ability.description}`;
                abilityContainer.appendChild(abilityDescription);

                const cooldownCostParagraph = document.createElement('p');
                cooldownCostParagraph.textContent = `Cooldown: ${ability.cooldownBurn}, Cost: ${ability.costBurn}`;
                abilityContainer.appendChild(cooldownCostParagraph);

                championContainer.appendChild(abilityContainer);
            });
        } else {
            const noAbilitiesMessage = document.createElement('p');
            noAbilitiesMessage.textContent = 'Abilities not available.';
            championContainer.appendChild(noAbilitiesMessage);
        }

        // Append the champion details to the provided container
        container.appendChild(championContainer);
    } catch (error) {
        console.error('Error fetching champion details:', error.message);
    }
}
