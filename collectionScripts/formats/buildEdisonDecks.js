const collection = require("../data/collection.json");
const collectionNames = collection.map((c) => c["Name"]);
const _ = require("lodash");

const fs = require("fs");
const decks = [];

fs.readdirSync(__dirname + "/edisonDeckLists/").forEach((deck) => {
  decks.push(deck);
});

const deckPairs = [];

decks.map((deck) => {
  const deckContents = require(`./edisonDeckLists/${deck}`);
  const cardsInDeck = deckContents.main.concat(deckContents.extra);
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
  // console.log(
  //   `Deck 1 could be ${deck}: ${cardsFound.length}/${cardsInDeck.length} cards`
  // );

  const deckPair = {
    deck1: {
      name: deck,
      cards: cardsInDeck,
      completed: cardsFound.length / cardsInDeck.length,
    },
  };

  const otherDecks = decks.filter((d) => d !== deck);

  const decksWithFoundCards = otherDecks.map((od) => {
    const cardsFoundForThisDeck = [];
    const deckContents2 = require(`./edisonDeckLists/${od}`);
    const cardsInDeck2 = deckContents2.main.concat(deckContents2.extra);
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

  // console.log(
  //   `Deck 2 could be ${highestOtherDeck.deck}: ${highestOtherDeck.cardsFound.length}/${highestOtherDeck.cardsNeeded.length} cards`
  // );
  deckPair.deck2 = {
    name: highestOtherDeck.deck,
    cards: highestOtherDeck.cardsNeeded,
    completed:
      highestOtherDeck.cardsFound.length / highestOtherDeck.cardsNeeded.length,
  };
  deckPairs.push(deckPair);
});

console.log(
  _.sortBy(deckPairs, (dp) => {
    dp.deck1.completed + dp.deck2.completed;
  })
);
