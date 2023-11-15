function getRankFlex({summonerName = 'Topfiish'}, callback) {
    var div = document.createElement("div");
    div.classList.add("rank-info");
    //var RankNameHeader = document.createElement("h2");
    //RankNameHeader.innerHTML = summonerName;
    //div.appendChild(RankNameHeader);
  
    try {
        var kayn = Kayn(config["api-key"])();
    } catch (error) {
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Could not intialize API";
        div.appendChild(errorMessage);
        callback(div);
        return;
    }
  
    kayn.Summoner.by.name(summonerName)
    .then((summoner) => {
        // Get ranked information
        return kayn.League.Entries.by.summonerID(summoner.id);
    })
    .then((rankedInfo) => {
        // Find Flex Queue entry
        const flexQueueEntry = rankedInfo.find(entry => entry.queueType === 'RANKED_FLEX_SR');
  
        // Create a paragraph element to display the rank
        var flexRankInfoParagraph = document.createElement("p");
  
        if (flexQueueEntry) {
            // If ranked information is available, display the rank
            flexRankInfoParagraph.innerHTML = `Flex Queue Rank: ${flexQueueEntry.tier} ${flexQueueEntry.rank}`;
        } else {
            // If no ranked information is available, display a message
            flexRankInfoParagraph.innerHTML = "No Flex Queue rank information available.";
        }
  
        // Append the rank information to the div
        div.appendChild(flexRankInfoParagraph);
        callback(div);
    })
    .catch((error) => {
        console.error("Error fetching summoner information:", error);
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Error fetching summoner information";
        div.appendChild(errorMessage);
        callback(div);
    });
  }
  