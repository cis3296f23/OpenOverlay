const axios = require("axios");
const add_new_runepage = require("../../runes/runes.js").add_new_runepage;

function createRunePageSelector() {
  const url =
    "http://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/runesReforged.json";
  fetchRuneData(url)
    .then((runeData) => {
      return buildPageWithData(runeData);
    })
    .catch((error) => {
      console.log(error);
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
createRunePageSelector();

function buildPageWithData(runeData) {
  //var containerDiv = document.createElement("div");
  //console.log(runeData);
  runeData.forEach((runeCategory) => {
    /*
    var runeCategoryDiv = document.createElement("div");
    runeCategoryDiv.innerHTML = runeCategory.
    */
    console.log(runeCategory.name);
  });
}

function submit() {}
