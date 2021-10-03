const _ = require("lodash");
const fs = require("fs");

const collection = [...require("./collection.json")];
const sets = require("./sets.json");
const structureDecks = _.sortBy(
  sets.filter((s) => s["set_name"].toLowerCase().includes("structure deck")),
  (s) => s["tcg_date"]
);
// console.log(structureDecks);

collection.map((c) => {
  const cardSetisSD = c["Set"].toLowerCase().includes("structure deck");
  if (!cardSetisSD) {
    return;
  }
  const cardIsInItsOwnDeck = c["In Deck"].toLowerCase() === c["Set"];
  if (cardIsInItsOwnDeck) {
    return;
  }
  const sdHasThisCard =
    collection.findIndex(
      (co) => co["Name"] === c["Name"] && co["Set"] === co["In Deck"]
    ) >= 0;
  if (sdHasThisCard) {
    return;
  }
  const sdIndex = structureDecks.findIndex((sd) => sd["set_name"] === c["Set"]);

  console.log(
    `${c["Name"]} (${c["Code"]}) in ${c["In Box"]} box could go in ${
      c["Set"]
    } (${sdIndex + 1}th deck on the sticker box)`
  );
});
