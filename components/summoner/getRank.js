/**
 * function to get player's rank and create an element to display it from API
 * @param {*} param0 
 * @param {*} callback 
 * @returns 
 */

function getRank({ summonerName = "Topfiish" }, callback) {
  var div = document.createElement("div");
  div.classList.add("rank-info");
  //var RankNameHeader = document.createElement("h2");
  //RankNameHeader.innerHTML = summonerName;
  //div.appendChild(RankNameHeader);

  try {
    var kayn = Kayn(process.env.API_KEY)();
  } catch (error) {
    var errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Could not intialize API";
    div.appendChild(errorMessage);
    callback(div);
    return;
  }

  kayn.Summoner.by
    .name(summonerName)
    .then((summoner) => {
      // Get ranked information
      return kayn.League.Entries.by.summonerID(summoner.id);
    })
    .then((rankedInfo) => {
      // Find Solo/Duo Queue entry
      const soloQueueEntry = rankedInfo.find(
        (entry) => entry.queueType === "RANKED_SOLO_5x5"
      );

      // Create a paragraph element to display the rank
      var rankInfoParagraph = document.createElement("p");
      var soloRankImage = document.createElement("img");
      soloRankImage.setAttribute("align", "center");
      if (soloQueueEntry) {
        // If ranked information is available, display the rank
        if (soloQueueEntry.tier == "CHALLENGER") {
          soloRankImage.src = "components/images/challenger.png";
        } else if (soloQueueEntry.tier == "GRANDMASTER") {
          soloRankImage.src = "components/images/grandmaster.png";
        } else if (soloQueueEntry.tier == "MASTER") {
          soloRankImage.src = "components/images/master.png";
        } else if (soloQueueEntry.tier == "DIAMOND") {
          soloRankImage.src = "components/images/diamond.png";
        } else if (soloQueueEntry.tier == "EMERALD") {
          soloRankImage.src = "components/images/emerald.png";
        } else if (soloQueueEntry.tier == "PLATINUM") {
          soloRankImage.src = "components/images/platinum.png";
        } else if (soloQueueEntry.tier == "GOLD") {
          soloRankImage.src = "components/images/gold.png";
        } else if (soloQueueEntry.tier == "SILVER") {
          soloRankImage.src = "components/images/silver.png";
        } else if (soloQueueEntry.tier == "BRONZE") {
          soloRankImage.src = "components/images/bronze.png";
        } else if (soloQueueEntry.tier == "IRON") {
          soloRankImage.src = "components/images/iron.png";
        } else {
          soloRankImage.src = "components/images/unranked.png";
        }
        rankInfoParagraph.innerHTML = `Solo/Duo Rank:<br>${soloQueueEntry.tier} ${soloQueueEntry.rank}<br>`;
      } else {
        // If no ranked information is available, display a message
        soloRankImage.src = "components/images/unranked.png";
        rankInfoParagraph.innerHTML = "Solo/Duo Rank:<br>UNRANKED<br>";
      }
      rankInfoParagraph.appendChild(soloRankImage);

      // Append the rank information to the div
      div.appendChild(rankInfoParagraph);
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
