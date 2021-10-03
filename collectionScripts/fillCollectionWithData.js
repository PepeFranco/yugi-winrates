const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");
const { cardToRow, cardObjectToCardRow } = require("./common.js");

const getCardInfo = async (cardName) => {
  const name = `${cardName.trim()}`;
  const result = await axios
    .get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
        encodeURIComponent(name)
    )
    .catch(() => {});

  // console.log(result.data.data[0]);
  // console.log("==================");
  return (result && result.data.data[0]) || null;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const collection = require("./collection.json");
const mainFunction = async () => {
  for (let i = 0; i < collection.length; i++) {
    const card = collection[i];
    try {
      const cardInfo = await getCardInfo(card["Name"]);
      fs.appendFile(
        "collectionWithData.csv",
        cardToRow(cardInfo, card),
        function (err) {
          if (err) throw err;
        }
      );
    } catch (e) {
      // Id^Name^Code^Rarity^Edition^In Box^In Sleeve^
      console.error(card["Card name"]);
      console.error(e);
      fs.appendFile(
        "failedElements.csv",
        `${cardObjectToCardRow(card)}\n`,
        function () {}
      );
    }
    await sleep(100);
  }
};
mainFunction();
