const collection = require("../data/collection.json");

const fs = require("fs");

fs.readdirSync(__dirname + "/goatDeckLists/").forEach((deck) => {
  const cardsInDeck = require(`./goatDeckLists/${deck}`);
  console.log("============================");
  console.log(deck);
  console.log(cardsInDeck.length);
});
