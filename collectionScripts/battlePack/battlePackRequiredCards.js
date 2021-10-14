const _ = require("lodash");
const fs = require("fs");

const collection = require("../data/collection.json");
const allCollectionCards = collection.map((card) => ({ card: card["Name"] }));

const battlePackCards = require("./bp01.json");
const allBattlePackCards = battlePackCards.map((card) => ({ card: card.name }));

const battlePack2Cards = require("./bp02.json");
const allBattlePack2Cards = battlePack2Cards.map((card) => ({
  card: card.name,
}));

const cardsNotInStructureDecks = collection.filter(
  (card) => !card["In Deck"].includes("Structure Deck")
);
const allCardsNotInSd = cardsNotInStructureDecks.map((card) => ({
  card: card["Name"],
  code: card["Code"],
  location: card["In Box"],
}));

console.log("All cards in collection: ", allCollectionCards.length);
console.log("Cards in Battle Pack:    ", allBattlePackCards.length);
console.log("Cards in Battle Pack 2:    ", allBattlePack2Cards.length);
console.log("Cards not in Structure Decks:", allCardsNotInSd.length);

const battlePackCardsCopy = [...allBattlePackCards];
const battlePack2CardsCopy = [...allBattlePack2Cards];

const cardsToBuildCube = [];

allCardsNotInSd.map((cc) => {
  const cardIndex = battlePackCardsCopy.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex >= 0) {
    cardsToBuildCube.push(cc);
    battlePackCardsCopy.splice(cardIndex, 1);
    return;
  }

  const cardIndex2 = battlePack2CardsCopy.findIndex(
    (uc) => uc.card.toLowerCase() === cc.card.toLowerCase()
  );

  if (cardIndex2 >= 0) {
    cardsToBuildCube.push(cc);
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
// console.log(cardsToString(battlePackCardsCopy));

console.log(
  "Cards needed to complete battle pack 2 collection: ",
  battlePack2CardsCopy.length
);
// console.log(cardsToString(battlePack2CardsCopy));

console.log("Cards owned from battle pack: ", cardsToBuildCube.length);
// console.log(cardsToBuildCube);

fs.writeFile(
  "./collectionScripts/battlePack/cardsIAlreadyOwnForBattlePacks.json",
  JSON.stringify(cardsToBuildCube, null, 3),
  function (err) {
    if (err) throw err;
  }
);

fs.writeFile(
  "./collectionScripts/battlePack/cardsINeedForBattlePacks.json",
  JSON.stringify([...battlePackCardsCopy, ...battlePack2CardsCopy], null, 3),
  function (err) {
    if (err) throw err;
  }
);
