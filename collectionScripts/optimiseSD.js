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
const cardsInSDs = collection.filter((c) =>
  c["In Deck"].toLowerCase().includes("structure deck")
);

const collectionCopy = [...collection];

cardsInSDs.map((c) => {
  const cardIsInItsOwnDeck =
    c["In Deck"].toLowerCase() === c["Set"].toLowerCase();
  if (cardIsInItsOwnDeck) {
    return;
  }

  const correctCardInCollectionIndex = collectionCopy.findIndex(
    (co) =>
      co["Name"] === c["Name"] &&
      co["Set"] === c["In Deck"] &&
      co["Set"] !== co["In Deck"]
  );
  if (correctCardInCollectionIndex >= 0) {
    const cardToMove = collectionCopy[correctCardInCollectionIndex];
    cardsThatCanBeMoved.push(cardToMove);
    collectionCopy.splice(correctCardInCollectionIndex, 1);
  }
});

const makeStringLength = (string, length) => {
  if (string.length > length) return string;
  const l = length - string.length;
  return `${string}${new Array(l).join(" ")}`;
};

let str = "";
_.sortBy(cardsThatCanBeMoved, (c) => `${c["In Box"]}-${c["In Deck"]}`).map(
  (c) => {
    const name = makeStringLength(c["Name"], 45);
    const code = makeStringLength(` (${c["Code"]}) `, 15);
    const box = makeStringLength(` in ${c["In Box"]}`, 30);
    const deck = makeStringLength(`(${c["In Deck"] || ""})`, 50);
    const newDeck = makeStringLength(`could go in deck ${c["Set"]}`, 0);
    str += `${name}${code}${box}${deck}${newDeck}\n`;
    // console.log(str);
  }
);

fs.writeFileSync("./optimisedSDMoves.txt", str);
