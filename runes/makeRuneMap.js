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

// Example usage:
const runeByName = runesLookup["Overheal"];
const runeById = runesLookup[9111];

console.log("Rune by Name:", runeByName);
console.log("Rune by ID:", runeById);

// Read the saved data structure from the file
const savedRunesLookup = JSON.parse(fs.readFileSync(outputFilePath));

// Example usage with the saved data structure
const savedRuneByName = savedRunesLookup["Grasp of the Undying"];
const savedRuneById = savedRunesLookup[8232];

console.log("Saved Rune by Name:", savedRuneByName);
console.log("Saved Rune by ID:", savedRuneById);
