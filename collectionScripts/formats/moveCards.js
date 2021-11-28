const _ = require("lodash");
const fs = require("fs");

const collection = require("../data/collection.json");
const collectionCopy = [...collection];
const cardsFromFormat = require("./goatOwnedCards.json");

const cardsToMove = cardsFromFormat["Bulk (White)"];

cardsToMove.map((cc) => {
  const cardIndex = collection.findIndex(
    (c) =>
      (c.card === c["Name"] || cc.code === c["Code"]) &&
      cc.location === c["In Box"]
  );
  console.log(cc.card);
  if (cardIndex >= 0) {
    console.log("Moving ", cc.card);
    collection[cardIndex]["In Box"] = "Goat Cards Box";
  }
});

fs.writeFile(
  "./collectionScripts/data/collection.json",
  JSON.stringify(collectionCopy, null, 3),
  function (err) {
    if (err) console.error(err);
  }
);
