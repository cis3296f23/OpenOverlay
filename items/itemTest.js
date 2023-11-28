const get_item_sets = require("./items.js").get_item_sets;

async function main() {
  var item_sets = await get_item_sets();
  console.log(item_sets);
  console.log(item_sets.blocks);
}
main();
