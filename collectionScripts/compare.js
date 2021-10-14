const cardsForSds = require("./structureDecks/cardsIAlreadyOwnToComplete2Sets.json");
const cardsForBattlePack = require("./battlePack/cardsIAlreadyOwnForBattlePacks.json");
const collection = require("./data/collection.json");

const cardsInSpeedDuel = collection
  .filter((c) => c["Is Speed Duel"] === "Yes")
  .map((c) => ({
    card: c["Name"],
    location: c["In Box"],
    code: c["Code"],
  }));

const _ = require("lodash");

const overlap = _.intersectionBy(
  cardsForSds,
  cardsInSpeedDuel,
  ({ card, location, code }) => `${card}${location}${code}`
);

console.log(cardsForSds.length);
console.log(cardsInSpeedDuel.length);
console.log(overlap.length);

console.log(overlap);
