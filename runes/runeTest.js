const add_new_runepage = require("./runes.js").add_new_runepage;

var runes = {
  name: "Rune Addition Test",
  primaryStyleId: 8300,
  subStyleId: 8400,
  selectedPerkIds: [8351, 8313, 8345, 8347, 8451, 8444, 5007, 5002, 5001],
  current: true,
};
add_new_runepage(runes);
