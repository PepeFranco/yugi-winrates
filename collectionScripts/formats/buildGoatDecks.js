const collection = require("../data/collection.json");
const collectionNames = collection.map((c) => c["Name"]);
const _ = require("lodash");

const fs = require("fs");
const decks = [];

fs.readdirSync(__dirname + "/goatDeckLists/").forEach((deck) => {
  decks.push(deck);
});

decks.map((deck) => {
  const cardsInDeck = require(`./goatDeckLists/${deck}`);
  console.log("============================");
  // console.log(cardsInDeck);
  const cardsFound = [];
  const collectionCopy = [...collectionNames];
  cardsInDeck.map((c) => {
    const cardIndex = collectionCopy.findIndex((cc) => cc === c);
    // console.log(c, cardIndex);
    if (cardIndex > 0) {
      collectionCopy.splice(cardIndex, 1);
      cardsFound.push(c);
    }
  });
  console.log(
    `Deck 1 could be ${deck}: ${cardsFound.length}/${cardsInDeck.length} cards`
  );

  const otherDecks = decks.filter((d) => d !== deck);

  const decksWithFoundCards = otherDecks.map((od) => {
    const cardsFoundForThisDeck = [];
    const cardsInDeck2 = require(`./goatDeckLists/${od}`);
    const collectionCopy2 = [...collectionCopy];
    cardsInDeck2.map((c) => {
      const cardIndex = collectionCopy2.findIndex((cc) => cc === c);
      // console.log(c, cardIndex);
      if (cardIndex > 0) {
        collectionCopy.splice(cardIndex, 1);
        cardsFoundForThisDeck.push(c);
      }
    });
    return {
      deck: od,
      cardsFound: cardsFoundForThisDeck,
      cardsNeeded: cardsInDeck2,
    };
  });

  const orderedOtherDecks = _.reverse(
    _.orderBy(decksWithFoundCards, (d) => d.cardsFound.length)
  );
  const highestOtherDeck = orderedOtherDecks[0];

  console.log(
    `Deck 2 could be ${highestOtherDeck.deck}: ${highestOtherDeck.cardsFound.length}/${highestOtherDeck.cardsNeeded.length} cards`
  );
});
