const _ = require("lodash");
const fs = require("fs");

const collection = require("../data/collection.json");

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

const allCollectionCards = collection.map((card) => ({
  card: card["Name"],
  location: card["In Box"],
  code: card["Code"],
}));

console.log("All cards in collection: ", allCollectionCards.length);
console.log("Unique SD cards:    ", uniqueCardsInSD.length);
console.log("Unique SD cards x2: ", uniqueCardsTimes2.length);
console.log("Unique SD cards x3: ", uniqueCardsTimes3.length);

const cardsIAlreadyOwnToComplete2Sets = [];
const cardsIAlreadyOwnToComplete3Sets = [];

allCollectionCards.map((cc) => {
  const cardIndex = uniqueCardsInSD.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex >= 0) {
    uniqueCardsInSD.splice(cardIndex, 1);
  }

  const cardIndex2 = uniqueCardsTimes2.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex2 >= 0) {
    if (cc.location.toLowerCase() !== "sticker") {
      cardsIAlreadyOwnToComplete2Sets.push({
        ...cc,
        deck: uniqueCardsTimes2[cardIndex2].deck,
      });
    }
    uniqueCardsTimes2.splice(cardIndex2, 1);
  }

  const cardIndex3 = uniqueCardsTimes3.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex3 >= 0) {
    if (cc.location.toLowerCase() !== "sticker") {
      cardsIAlreadyOwnToComplete3Sets.push({
        ...cc,
        deck: uniqueCardsTimes3[cardIndex3].deck,
      });
    }
    uniqueCardsTimes3.splice(cardIndex3, 1);
  }
});

console.log("=====After removal=======");
console.log("Unique SD cards:    ", uniqueCardsInSD.length);
console.log("Unique SD cards x2: ", uniqueCardsTimes2.length);
console.log("Unique SD cards x3: ", uniqueCardsTimes3.length);

console.log(
  "Cards I own to complete x2 sets: ",
  cardsIAlreadyOwnToComplete2Sets.length
);
console.log(
  "Cards I own to complete x3 sets: ",
  cardsIAlreadyOwnToComplete3Sets.length
);

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

// console.log(cardsPerDeck2);
// console.log(cardsPerDeck3);

const sortPerMissingCards = (a, b) => {
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
};

const sortedUniqueCardsTimes2 = uniqueCardsTimes2.sort(sortPerMissingCards);

fs.writeFile(
  "./collectionScripts/structureDecks/cardsNeededToComplete2Sets.json",
  JSON.stringify(sortedUniqueCardsTimes2, null, 3),
  function (err) {
    console.error(err);
  }
);

const sortedUniqueCardsTimes3 = uniqueCardsTimes3.sort(sortPerMissingCards);

fs.writeFile(
  "./collectionScripts/structureDecks/cardsNeededToComplete3Sets.json",
  JSON.stringify(sortedUniqueCardsTimes3, null, 3),
  function (err) {
    console.error(err);
  }
);

fs.writeFile(
  "./collectionScripts/structureDecks/cardsIAlreadyOwnToComplete2Sets.json",
  JSON.stringify(
    cardsIAlreadyOwnToComplete2Sets.sort(sortPerMissingCards),
    null,
    3
  ),
  function (err) {
    console.error(err);
  }
);

fs.writeFile(
  "./collectionScripts/structureDecks/cardsIAlreadyOwnToComplete3Sets.json",
  JSON.stringify(
    cardsIAlreadyOwnToComplete3Sets.sort(sortPerMissingCards),
    null,
    3
  ),
  function (err) {
    console.error(err);
  }
);
