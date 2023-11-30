const get_item_sets = require("./items.js").get_item_sets;

async function main() {
  var response = await get_item_sets();
  var item_sets = response.itemSets;
  printJson(response);
}
main();

function printJson(jsonObj, indent = 0) {
  const spaces = " ".repeat(indent * 2);

  for (const key in jsonObj) {
    if (jsonObj.hasOwnProperty(key)) {
      const value = jsonObj[key];

      if (typeof value === "object" && value !== null) {
        console.log(`${spaces}${key}:`);
        printJson(value, indent + 1);
      } else {
        console.log(`${spaces}${key}: ${value}`);
      }
    }
  }
}
