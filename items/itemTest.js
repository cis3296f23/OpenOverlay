const { add } = require("lodash");

const get_item_sets = require("./items.js").get_item_sets;
const add_new_itemset = require("./items.js").add_new_itemset;

async function main() {
  var response = await get_item_sets();
  var item_sets = response.itemSets;
  printJson(response);

  var item_set = {
    title: "Test set",
    blocks: [
      {
        items: [{ count: 2, id: 6653 }],
        type: "Test Block 1:",
        map: "any",
        mode: "any",
        sortrank: 0,
        type: "custom",
      },
    ],
  };

  var add_response = await add_new_itemset(item_set);
  printJson(add_response);
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
