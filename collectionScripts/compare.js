const cardsForSds = require("./structureDecks/cardsIAlreadyOwnToComplete2Sets.json");
const cardsForBattlePack = require("./battlePack/cardsIAlreadyOwnForBattlePacks.json");
const _ = require("lodash");

const overlap = _.intersectionBy(
  cardsForSds,
  cardsForBattlePack,
  ({ card, location, code }) => `${card}${location}${code}`
);

console.log(cardsForSds.length);
console.log(cardsForBattlePack.length);
console.log(overlap.length);
