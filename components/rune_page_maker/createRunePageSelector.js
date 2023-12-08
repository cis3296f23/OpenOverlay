/**
 * javascript file to create rune page selector, fetching rune data, 
 * building the selector UI,and creating a submit button
 */

const axios = require("axios");
const { add_new_runepage } = require("./runes/runes.js");
const { stat } = require("graceful-fs");
//const add_new_runepage = require("../../runes/runes.js").add_new_runepage;

var selectorList;
var primaryStyleId;
var secondaryStyleId;
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
  var selectPrimary = document.createElement("select");
  selectorList = [];
  // Create an empty option as the default
  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select a Rune Category"; // Display text for the default option
  selectPrimary.appendChild(defaultOption);

  //console.log(runeData);
  runeData.forEach((runeCategory) => {
    var categoryOption = document.createElement("option");
    categoryOption.value = runeCategory.id;
    categoryOption.text = runeCategory.name;
    selectPrimary.appendChild(categoryOption);
  });
  containerDiv.appendChild(selectPrimary);
  var runeOptionsContainer = document.createElement("div");
  var secondaryRuneContainer = document.createElement("div");
  var statRunesContainer = document.createElement("div");
  // Attach change event listener to the select element
  selectPrimary.addEventListener("change", function () {
    var selectedValue = selectPrimary.value;
    if (selectedValue === "") {
      return;
    }
    primaryStyleId = selectedValue;
    runeOptionsContainer.innerHTML = "";
    var selectedCategory = runeData.find(
      (category) => category.id == selectedValue
    );
    console.log(selectedCategory);
    // show selector for runes in that category

    selectedCategory.slots.forEach((slot, index) => {
      var selectRuneDiv = document.createElement("div");
      var selectRune = document.createElement("select");
      selectorList.push(selectRune);

      var defaultOption = document.createElement("option");
      defaultOption.value = "";

      if (index === 0) {
        defaultOption.text = "Select a Keystone"; // Display text for the default option
      } else {
        defaultOption.text = "Select a rune";
      }
      selectRune.appendChild(defaultOption);
      slot.runes.forEach((rune) => {
        var runeOption = document.createElement("option");
        runeOption.value = rune.id;
        runeOption.text = rune.name;
        selectRune.appendChild(runeOption);
      });
      selectRuneDiv.appendChild(selectRune);
      runeOptionsContainer.appendChild(selectRuneDiv);
    });

    containerDiv.appendChild(runeOptionsContainer);

    secondaryRuneContainer.innerHTML = "";
    var selectSecondary = document.createElement("select");
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a Secondary Rune Category"; // Display text for the default option
    selectSecondary.appendChild(defaultOption);
    //show selector for secondary runes
    runeData.forEach((runeCategory) => {
      if (runeCategory.id != selectedValue) {
        var secondaryCategoryOption = document.createElement("option");
        secondaryCategoryOption.text = runeCategory.name;
        secondaryCategoryOption.value = runeCategory.id;

        selectSecondary.appendChild(secondaryCategoryOption);
      }
    });
    var secondaryRuneOptionsContainer = document.createElement("div");
    selectSecondary.addEventListener("change", function () {
      var selectedValue = selectSecondary.value;
      if (selectedValue === "") {
        return;
      }
      secondaryStyleId = selectedValue;
      secondaryRuneOptionsContainer.innerHTML = "";
      var selectedCategory = runeData.find(
        (category) => category.id == selectedValue
      );
      // show selector for runes in that category
      var selectSecondaryRuneOne = document.createElement("select");
      var defaultOptionOne = document.createElement("option");
      defaultOptionOne.value = "";
      defaultOptionOne.text = "Select a rune";
      selectSecondaryRuneOne.appendChild(defaultOptionOne);
      selectorList.push(selectSecondaryRuneOne);
      var selectSecondaryRuneTwo = document.createElement("select");
      var defaultOptionTwo = document.createElement("option");
      defaultOptionTwo.value = "";
      defaultOptionTwo.text = "Select a rune";
      selectSecondaryRuneTwo.appendChild(defaultOptionTwo);
      selectorList.push(selectSecondaryRuneTwo);
      var selectSecondaryRunesDiv = document.createElement("div");
      var runeGroupLookup = [];
      selectedCategory.slots.forEach((slot, index) => {
        if (index == 0) {
          return;
        }
        slot.runes.forEach((rune) => {
          var runeOptionOne = document.createElement("option");
          runeOptionOne.value = rune.id;
          runeOptionOne.text = rune.name;
          selectSecondaryRuneOne.appendChild(runeOptionOne);
          var runeOptionTwo = document.createElement("option");
          runeOptionTwo.value = rune.id;
          runeOptionTwo.text = rune.name;
          selectSecondaryRuneOne.appendChild(runeOptionTwo);
          selectSecondaryRuneTwo.appendChild(runeOptionTwo);
          runeGroupLookup[rune.id] = slot;
        });
      });
      selectSecondaryRuneOne.addEventListener("change", () => {
        eliminate_secondary_choices(
          selectSecondaryRuneOne,
          selectSecondaryRuneTwo,
          runeGroupLookup
        );
      });
      selectSecondaryRuneTwo.addEventListener("change", () => {
        eliminate_secondary_choices(
          selectSecondaryRuneTwo,
          selectSecondaryRuneOne,
          runeGroupLookup
        );
      });
      selectSecondaryRunesDiv.appendChild(selectSecondaryRuneOne);
      selectSecondaryRunesDiv.appendChild(selectSecondaryRuneTwo);
      secondaryRuneOptionsContainer.appendChild(selectSecondaryRunesDiv);

      var statmods = [
        [
          { name: "Adaptive Force", id: 5008 },
          { name: "Attack Speed", id: 5005 },
          { name: "Ability Haste", id: 5007 },
        ],
        [
          { name: "Adaptive Force", id: 5008 },
          { name: "Armor", id: 5002 },
          { name: "Magic Resist", id: 5003 },
        ],
        [
          { name: "Health Scaling", id: 5001 },
          { name: "Armor", id: 5002 },
          { name: "Magic Resist", id: 5003 },
        ],
      ];
      statRunesContainer.innerHTML = "";
      statmods.forEach((statChoiceRow) => {
        var selectStatRunes = document.createElement("select");
        var defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Select one:";
        selectStatRunes.appendChild(defaultOption);
        statChoiceRow.forEach((statRune) => {
          var statRuneOption = document.createElement("option");
          statRuneOption.text = statRune.name;
          statRuneOption.value = statRune.id;
          selectStatRunes.appendChild(statRuneOption);
        });
        selectorList.push(selectStatRunes);
        statRunesContainer.appendChild(selectStatRunes);
      });
      containerDiv.appendChild(statRunesContainer);
    });
    secondaryRuneContainer.appendChild(selectSecondary);
    secondaryRuneContainer.appendChild(secondaryRuneOptionsContainer);
    containerDiv.appendChild(secondaryRuneContainer);
  });
  var submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.onclick = submit;
  containerDiv.appendChild(submitButton);
  return containerDiv;
}
function submit() {
  var selectedRunes = [];
  selectorList.forEach((selectElement) => {
    selectedRunes.push(selectElement.value);
  });
  console.log(selectedRunes);
  var runes = {
    name: "OO Rune Page",
    primaryStyleId: primaryStyleId,
    subStyleId: secondaryStyleId,
    selectedPerkIds: selectedRunes,
    current: true,
  };
  add_new_runepage(runes);
}
function eliminate_secondary_choices(
  chosenSelector,
  otherSelector,
  runeLookup
) {
  Array.from(otherSelector.options).forEach((option) => {
    option.disabled =
      runeLookup[chosenSelector.value] == runeLookup[option.value];
  });
}
