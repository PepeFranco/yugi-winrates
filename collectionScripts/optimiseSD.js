const _ = require("lodash");
const fs = require("fs");

const collection = [...require("./collection.json")];
const sets = require("./sets.json");
const structureDecks = _.sortBy(
  sets.filter((s) => s["set_name"].toLowerCase().includes("structure deck")),
  (s) => s["tcg_date"]
);
// console.log(structureDecks);

const cardsThatCanBeMoved = [];
const cardsFromSDs = collection.filter((c) =>
  c["Set"].toLowerCase().includes("structure deck")
);

// const cardsInCDDeck = collection.filter(
//   (c) => c["In Deck"] === "Cyber Dragon Revolution Structure Deck"
// );

// console.log({ cardsInCDDeck });

cardsFromSDs.map((c) => {
  const cardIsInItsOwnDeck =
    c["In Deck"].toLowerCase() === c["Set"].toLowerCase();
  if (cardIsInItsOwnDeck) {
    return;
  }
  const sdHasThisCardIndex = collection.findIndex(
    (co) => co["Name"] === c["Name"] && co["Set"] === co["In Deck"]
  );
  // if (c["Name"] === "Falchion Beta") {
  //   const falchionBeta = collection.find(
  //     (c1) => c1["Name"] === "Falchion Beta"
  //   );
  //   console.log({ falchionBeta });
  //   console.log(c);
  //   console.log({ sdHasThisCardIndex });
  // }
  if (sdHasThisCardIndex >= 0) {
    return;
  }

  cardsThatCanBeMoved.push(c);
});

_.sortBy(cardsThatCanBeMoved, (c) => c["In Box"]).map((c) => {
  const str = `${c["Name"]} (${c["Code"]}) in ${c["In Box"]} ${
    c["In Deck"] ? `(${c["In Deck"]})` : ""
  } box could go in ${c["Set"]} \n`;
  // console.log(str);
  fs.appendFileSync("./optimisedSDMoves.txt", str);
});
