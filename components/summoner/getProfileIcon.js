/**
 * function to get and create element for players profile icon from API
 * @param {*} param0 
 * @param {*} callback 
 * @returns 
 */

function getProfileIcon({ summonerName = "Topfiish" }, callback) {
  var div = document.createElement("div");
  div.classList.add("Profile-Icon");

  try {
    //var kayn = Kayn(config["api-key"])();
    var kayn = Kayn(process.env.API_KEY)();
  } catch (error) {
    var errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Could not initialize API";
    div.appendChild(errorMessage);
    callback(div);
    return;
  }

  // Get summoner information
  kayn.Summoner.by
    .name(summonerName)
    .then((summoner) => {
      // Get profile icon ID
      const profileIconId = summoner.profileIconId;

      // Construct the URL for the profile picture
      const profilePictureUrl = `http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIconId}.png`;

      // Create an image element for the profile picture
      var profilePicture = document.createElement("img");
      profilePicture.src = profilePictureUrl;
      profilePicture.alt = "Profile Icon";
      div.appendChild(profilePicture);

      // Invoke the callback with the populated div
      callback(div);
    })
    .catch((error) => {
      // Handle errors
      var errorMessage = document.createElement("p");
      errorMessage.innerHTML = `Error: ${error.message}`;
      div.appendChild(errorMessage);
      callback(div);
    });
}
