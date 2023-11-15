const { Kayn, REGIONS } = require("kayn");
const config = require("./data/config.json");

function getRank({summonerName = 'Xzefra'}) {
    var div = document.createElement("div");
    div.classList.add("rank-info");
    var RankNameHeader = document.createElement("h2");
    RankNameHeader.innerHTML = summonerName;
    div.appendChild(RankNameHeader);

    try {
        var kayn = Kayn(config["api-key"])();
      } catch (error) {
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Could not intialize API";
        div.appendChild(errorMessage);
        return div;
      }

      kayn.Summoner.by.name(summonerName)
      .then((summoner) => {
        // Get ranked information
        return kayn.League.Entries.by.summonerID(summoner.id);
      })
      .then((rankedInfo) => {
        // Find Solo/Duo Queue entry
        const soloQueueEntry = rankedInfo.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
  
        // Create a paragraph element to display the rank
        var rankInfoParagraph = document.createElement("p");
  
        if (soloQueueEntry) {
          // If ranked information is available, display the rank
          rankInfoParagraph.innerHTML = `Solo/Duo Queue Rank: ${soloQueueEntry.tier} ${soloQueueEntry.rank}`;
        } else {
          // If no ranked information is available, display a message
          rankInfoParagraph.innerHTML = "No Solo/Duo Queue rank information available.";
        }
  
        // Append the rank information to the div
        div.appendChild(rankInfoParagraph);
      })
      .catch((error) => {
        console.error("Error fetching summoner information:", error);
        var errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Error fetching summoner information";
        div.appendChild(errorMessage);
      });
  
    return div;
}
