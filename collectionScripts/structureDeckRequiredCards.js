const _ = require("lodash");
const fs = require("fs");

const collection = require("./collection.json");

const cardsInStructureDeck = collection.filter(
  (card) =>
    card["In Deck"].includes("Structure Deck") ||
    card["In Deck"].includes("Egyptian")
);

const structureDecks = _.uniq(
  cardsInStructureDeck.map((card) => card["In Deck"])
);

const deckCardPair = cardsInStructureDeck.map((card) => ({
  card: card["Name"],
  deck: card["In Deck"],
}));
const uniqueCardsInSD = _.uniqBy(
  deckCardPair,
  (dcp) => `${dcp.card}-${dcp.deck}`
);

console.log("All SD cards: ", deckCardPair.length);
console.log("Unique SD cards: ", uniqueCardsInSD.length);

const uniqueCardsTimes2 = [...uniqueCardsInSD].concat([...uniqueCardsInSD]);
const uniqueCardsTimes3 = [...uniqueCardsTimes2].concat([...uniqueCardsInSD]);

const allCollectionCards = collection.map((card) => ({ card: card["Name"] }));

console.log("All cards in collection: ", allCollectionCards.length);
console.log("Unique SD cards:    ", uniqueCardsInSD.length);
console.log("Unique SD cards x2: ", uniqueCardsTimes2.length);
console.log("Unique SD cards x3: ", uniqueCardsTimes3.length);

allCollectionCards.map((cc) => {
  const cardIndex = uniqueCardsInSD.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex >= 0) {
    uniqueCardsInSD.splice(cardIndex, 1);
    // console.log(`Removing ${cc.card} is in Structure deck x2 list`);
  }

  const cardIndex2 = uniqueCardsTimes2.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex2 >= 0) {
    uniqueCardsTimes2.splice(cardIndex2, 1);
    // console.log(`Removing ${cc.card} is in Structure deck x2 list`);
  }

  const cardIndex3 = uniqueCardsTimes3.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex3 >= 0) {
    uniqueCardsTimes3.splice(cardIndex3, 1);
    // console.log(`Removing ${cc.card} is in Structure deck x3 list`);
  }
  // console.log(cc.card, cardBelongsInSD);
});

console.log("=====After removal=======");
console.log("Unique SD cards:    ", uniqueCardsInSD.length);
console.log("Unique SD cards x2: ", uniqueCardsTimes2.length);
console.log("Unique SD cards x3: ", uniqueCardsTimes3.length);

const cardsPerDeck2 = _.sortBy(
  structureDecks.map((sd) => {
    const cards = uniqueCardsTimes2.filter((uc) => uc.deck === sd);
    return { deck: sd, cards: cards.length };
  }),
  (cd) => cd.cards
);

const cardsPerDeck3 = _.sortBy(
  structureDecks.map((sd) => {
    const cards = uniqueCardsTimes3.filter((uc) => uc.deck === sd);
    return { deck: sd, cards: cards.length };
  }),
  (cd) => cd.cards
);

console.log(cardsPerDeck2);
console.log(cardsPerDeck3);

const cardsToString = (cardArray) =>
  cardArray.reduce((prev, curr) => {
    if (typeof prev === "string") {
      return `${prev}\n1 ${curr.card}`;
    }
    return `1 ${prev.card}\n1 ${curr.card}`;
  });

const sortedUniqueCardsTimes2 = uniqueCardsTimes2.sort((a, b) => {
  const cardsNeededInDeckA = cardsPerDeck2.find((d) => d.deck === a.deck).cards;
  const cardsNeededInDeckB = cardsPerDeck2.find((d) => d.deck === b.deck).cards;
  if (cardsNeededInDeckA < cardsNeededInDeckB) {
    return -1;
  }
  if (cardsNeededInDeckA > cardsNeededInDeckB) {
    return 1;
  }
  if (a.card < b.card) {
    return -1;
  }
  if (a.card > b.card) {
    return 1;
  }
  return 0;
});

fs.writeFile(
  "cardsNeededToCompleteSDTimes2.json",
  JSON.stringify(sortedUniqueCardsTimes2),
  function (err) {
    console.error(err);
  }
);

const sortedUniqueCardsTimes3 = uniqueCardsTimes3.sort((a, b) => {
  const cardsNeededInDeckA = cardsPerDeck3.find((d) => d.deck === a.deck).cards;
  const cardsNeededInDeckB = cardsPerDeck3.find((d) => d.deck === b.deck).cards;
  if (cardsNeededInDeckA < cardsNeededInDeckB) {
    return -1;
  }
  if (cardsNeededInDeckA > cardsNeededInDeckB) {
    return 1;
  }
  if (a.card < b.card) {
    return -1;
  }
  if (a.card > b.card) {
    return 1;
  }
  return 0;
});

fs.writeFile(
  "cardsNeededToCompleteSDTimes3.json",
  JSON.stringify(sortedUniqueCardsTimes3),
  function (err) {
    console.error(err);
  }
);
