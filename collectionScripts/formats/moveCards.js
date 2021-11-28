const _ = require("lodash");
const fs = require("fs");

const collection = require("../data/collection.json");
const collectionCopy = [...collection];
const cardsFromFormat = require("./edisonOwnedCards.json");

const cardsToMove = cardsFromFormat["Binder"];

let moved = 0;
cardsToMove.map((cc) => {
  const cardIndex = collection.findIndex(
    (c) =>
      //   c.card === c["Name"] &&
      cc.code === c["Code"] && cc.location === c["In Box"]
  );
  if (cardIndex >= 0) {
    moved++;
    console.log("Moving ", cc.card);
    collection[cardIndex]["In Box"] = "Goat Cards Box";
  }
});

console.log("Moved ", moved, " cards");

fs.writeFile(
  "./collectionScripts/data/collection.json",
  JSON.stringify(collectionCopy, null, 3),
  function (err) {
    if (err) console.error(err);
  }
);
