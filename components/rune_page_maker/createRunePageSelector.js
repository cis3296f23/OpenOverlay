const axios = require("axios");
//const add_new_runepage = require("../../runes/runes.js").add_new_runepage;

function createRunePageSelector() {
  return new Promise((resolve, reject) => {
    const url =
      "http://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/runesReforged.json";
    fetchRuneData(url)
      .then((runeData) => {
        resolve(buildRuneSelectorUI(runeData));
      })
      .catch((error) => {
        var errorDiv = document.createElement("div");
        errorDiv.innerHTML = error;
        reject(errorDiv);
      });
  });
}
function fetchRuneData(url) {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw `Error fetching JSON: ${error.message}`;
    });
}

function buildRuneSelectorUI(runeData) {
  var containerDiv = document.createElement("div");
  var selectCategory = document.createElement("select");

  //console.log(runeData);
  runeData.forEach((runeCategory) => {
    var categoryOption = document.createElement("option");
    categoryOption.value = runeCategory.id;
    categoryOption.text = runeCategory.name;
    selectCategory.appendChild(categoryOption);
  });
  containerDiv.appendChild(selectCategory);
  return containerDiv;
}
