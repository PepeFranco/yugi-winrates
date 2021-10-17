const _ = require("lodash");
const fs = require("fs");

const collection = require("../data/collection.json");
const collectionCopy = [...collection];
const cardsFromBP = require("./cardsIAlreadyOwnForBattlePacks.json");

const cardsToMove = cardsFromBP.filter((c) => c.location === "Sticker");

cardsToMove.map((cc) => {
  const cardIndex = collection.findIndex(
    (c) => cc.code === c["Code"] && cc.location === c["In Box"]
  );
  if (cardIndex >= 0) {
    collection[cardIndex]["In Deck"] = "Battle Pack Cube";
  }
});

fs.writeFile(
  "./collectionScripts/data/collection.json",
  JSON.stringify(collectionCopy, null, 3),
  function (err) {
    if (err) console.error(err);
  }
);
