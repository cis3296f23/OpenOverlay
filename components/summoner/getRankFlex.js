/**
 * function to get player's rank flex from API
 * @param {*} param0 
 * @param {*} callback 
 * @returns 
 */

function getRankFlex({ summonerName = "Topfiish" }, callback) {
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
      // Find Flex Queue entry
      const flexQueueEntry = rankedInfo.find(
        (entry) => entry.queueType === "RANKED_FLEX_SR"
      );

      // Create a paragraph element to display the rank
      var flexRankInfoParagraph = document.createElement("p");

      var flexRankImage = document.createElement("img");
      flexRankImage.setAttribute("align", "center");
      if (flexQueueEntry) {
        // If ranked information is available, display the rank
        if (flexQueueEntry.tier == "CHALLENGER") {
          flexRankImage.src = "components/images/challenger.png";
        } else if (flexQueueEntry.tier == "GRANDMASTER") {
          flexRankImage.src = "components/images/grandmaster.png";
        } else if (flexQueueEntry.tier == "MASTER") {
          flexRankImage.src = "components/images/master.png";
        } else if (flexQueueEntry.tier == "DIAMOND") {
          flexRankImage.src = "components/images/diamond.png";
        } else if (flexQueueEntry.tier == "EMERALD") {
          flexRankImage.src = "components/images/emerald.png";
        } else if (flexQueueEntry.tier == "PLATINUM") {
          flexRankImage.src = "components/images/platinum.png";
        } else if (flexQueueEntry.tier == "GOLD") {
          flexRankImage.src = "components/images/gold.png";
        } else if (flexQueueEntry.tier == "SILVER") {
          flexRankImage.src = "components/images/silver.png";
        } else if (flexQueueEntry.tier == "BRONZE") {
          flexRankImage.src = "components/images/bronze.png";
        } else if (flexQueueEntry.tier == "IRON") {
          flexRankImage.src = "components/images/iron.png";
        } else {
          flexRankImage.src = "components/images/unranked.png";
        }
        flexRankInfoParagraph.innerHTML = `Flex Rank:<br>${flexQueueEntry.tier} ${flexQueueEntry.rank}<br>`;
      } else {
        // If no ranked information is available, display a message
        flexRankImage.src = "components/images/unranked.png";
        flexRankInfoParagraph.innerHTML = "Flex Rank:<br>UNRANKED<br>";
      }
      flexRankInfoParagraph.appendChild(flexRankImage);

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
