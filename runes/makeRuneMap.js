const fs = require("fs");

// Read the content of the "runes.json" file
const rawData = fs.readFileSync("runes.json");
const runesData = JSON.parse(rawData);

// Construct a data structure for easy lookup by name or ID
const runesLookup = {};

runesData.forEach((rune) => {
  runesLookup[rune.name] = rune;
  runesLookup[rune.id] = rune;
});

// Save the data structure to a file
const outputFilePath = "runesLookup.json";
fs.writeFileSync(outputFilePath, JSON.stringify(runesLookup, null, 2));

console.log(`Runes lookup data structure saved to ${outputFilePath}`);
