const _ = require("lodash");
const fs = require("fs");

const collection = require("../data/collection.json");
const collectionCopy = [...collection];
const cardsFromBP = require("./cardsIAlreadyOwnToComplete3Sets.json");

const cardsToMove = cardsFromBP["Dark Magician"];

cardsToMove.map((cc) => {
  const cardIndex = collection.findIndex(
    (c) =>
      cc.code === c["Code"] &&
      cc.location === c["In Box"] &&
      cc.sleeve === c["In Sleeve"]
  );
  if (cardIndex >= 0) {
    collection[cardIndex]["In Box"] = "Duel Devastator Yellow";
  }
});

fs.writeFile(
  "./collectionScripts/data/collection.json",
  JSON.stringify(collectionCopy, null, 3),
  function (err) {
    if (err) console.error(err);
  }
);
