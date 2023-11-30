const fs = require("fs");

// Read the content of the "items.json" file
const rawData = fs.readFileSync("items.json");
const itemsData = JSON.parse(rawData);

// Construct a data structure for easy lookup by name or ID
const itemsLookup = {};

itemsData.forEach((item) => {
  itemsLookup[item.name] = item;
  itemsLookup[item.id] = item;
});

// Save the data structure to a file
const outputFilePath = "itemsLookup.json";
fs.writeFileSync(outputFilePath, JSON.stringify(itemsLookup, null, 2));

console.log(`items lookup data structure saved to ${outputFilePath}`);
