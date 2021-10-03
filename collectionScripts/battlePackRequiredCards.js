const _ = require("lodash");

const collection = require("./collection.json");
const allCollectionCards = collection.map((card) => ({ card: card["Name"] }));

const battlePackCards = require("./bp01.json");
const allBattlePackCards = battlePackCards.map((card) => ({ card: card.name }));

const battlePack2Cards = require("./bp02.json");
const allBattlePack2Cards = battlePack2Cards.map((card) => ({
  card: card.name,
}));

const cardsNotInStructureDecks = collection.filter(
  (card) =>
    !card["In Deck"].includes("Structure Deck") &&
    !card["In Deck"].includes("Egyptian")
);
const allCardsNotInSd = cardsNotInStructureDecks.map((card) => ({
  card: card["Name"],
}));

console.log("All cards in collection: ", allCollectionCards.length);
console.log("Cards in Battle Pack:    ", allBattlePackCards.length);
console.log("Cards in Battle Pack 2:    ", allBattlePack2Cards.length);
console.log("Cards not in Structure Decks:", allCardsNotInSd.length);

const battlePackCardsCopy = [...allBattlePackCards];
const battlePack2CardsCopy = [...allBattlePack2Cards];

allCardsNotInSd.map((cc) => {
  const cardIndex = battlePackCardsCopy.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex >= 0) {
    battlePackCardsCopy.splice(cardIndex, 1);
    return;
  }

  const cardIndex2 = battlePack2CardsCopy.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex2 >= 0) {
    battlePack2CardsCopy.splice(cardIndex2, 1);
    return;
  }
});

const cardsToString = (cardArray) =>
  cardArray.reduce((prev, curr) => {
    if (typeof prev === "string") {
      return `${prev}\n1 ${curr.card}`;
    }
    return `1 ${prev.card}\n1 ${curr.card}`;
  });
// console.log(allBattlePackCards);
console.log("=====After removal=======");
console.log(
  "Cards needed to complete battle pack collection: ",
  battlePackCardsCopy.length
);
console.log(cardsToString(battlePackCardsCopy));

console.log(
  "Cards needed to complete battle pack 2 collection: ",
  battlePack2CardsCopy.length
);
// console.log(cardsToString(battlePackCardsCopy));
