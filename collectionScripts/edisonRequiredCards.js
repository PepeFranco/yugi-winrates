const _ = require("lodash");
const fs = require("fs");
const axios = require("axios");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCardInfo = async (cardId) => {
  const id = `${cardId.trim()}`;
  const result = await axios
    .get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" +
        encodeURIComponent(id)
    )
    .catch(() => {});

  // console.log(result.data.data[0]);
  // console.log("==================");
  return (result && result.data.data[0]) || null;
};

const collection = require("./collection.json");
const edison = require("./edison.json");

const cardsNotInSD = collection.filter(
  (card) =>
    !card["In Deck"].includes("Structure Deck") &&
    !card["In Deck"].includes("Egyptian")
);

const allCollectionCards = cardsNotInSD.map((card) => ({
  card: card["Name"],
  location: card["In Box"],
  code: card["Code"],
}));

const cardsIOwn = [];
const cardsIMiss = [];

const mainFunction = async () => {
  for (let i = 0; i < edison.length; i++) {
    const card = edison[i];
    try {
      const cardInfo = await getCardInfo(card["ID"]);
      const cardIndex = allCollectionCards.findIndex(
        (cc) => cc.card.toLowerCase() === cardInfo["name"].toLowerCase()
      );
      if (cardIndex >= 0) {
        // console.log(
        //   `I own ${cardInfo["name"]} (${allCollectionCards[cardIndex].code}) in ${allCollectionCards[cardIndex].location}`
        // );
        cardsIOwn.push(allCollectionCards[cardIndex]);
        allCollectionCards.splice(cardIndex, 1);
      } else {
        // console.log(`I do NOT own ${cardInfo["name"]}`);
        console.log(`1 ${cardInfo["name"]}`);
        cardsIMiss.push(cardInfo["name"]);
      }
    } catch (e) {}
    await sleep(100);
  }
  console.log(`Own: ${cardsIOwn.length}`);
  console.log(`Miss: ${cardsIMiss.length}`);
};
mainFunction();
