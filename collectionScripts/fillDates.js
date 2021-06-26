const _ = require("lodash");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// const csvFilePath = "./collection.csv";
const axios = require("axios");

const fs = require("fs");

const getCardInfo = async (cardName) => {
  const name = `${cardName}`;
  console.log(name);
  const result = await axios
    .get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
        encodeURIComponent(name)
    )
    .catch(() => {});
  return (result && result.data.data[0]) || null;
};
// {
//     set_name: 'Gold Series',
//     set_code: 'GLD1-EN001',
//     set_rarity: 'Common',
//     set_rarity_code: '(C)',
//     set_price: '3.98'
// },
// getCardInfo("7 Colored Fish");

const cardSets = require("./cardsets.json");
const cardSetsByDate = _.orderBy(cardSets, ["tcg_date"]);
// console.log(cardSetsByDate);
// {
//     set_name: 'Starter Deck: Kaiba',
//     set_code: 'SDK',
//     num_of_cards: 96,
//     tcg_date: '2002-03-29'
// },
const getEarliestInfo = (cardInfo) => {
  const earliestSet = _.find(cardSetsByDate, (currentSet) => {
    const found = cardInfo.card_sets.find(
      (cardSet) => cardSet.set_name === currentSet.set_name
    );
    if (found) {
      return found;
    }
  });
  return {
    earliestSet: earliestSet.set_name,
    earliestDate: earliestSet.tcg_date,
  };
};

const collection = require("./collection.json");
const mainFunction = async () => {
  for (let i = 0; i < collection.length; i++) {
    const card = collection[i];
    try {
      const cardInfo = await getCardInfo(card["Card name"]);
      const earliestInfo = getEarliestInfo(cardInfo);
      card.Date = earliestInfo.earliestDate;
      card.Set = earliestInfo.earliestSet;
      const image =
        cardInfo.card_images &&
        cardInfo.card_images[0] &&
        cardInfo.card_images[0].image_url;
      fs.appendFile(
        "collectionWithDate.csv",
        `"${card["Card name"]}",${card.Date},${
          card.Set
        },=IMAGE(${JSON.stringify(image)})\n`,
        function (err) {
          if (err) throw err;
        }
      );
    } catch (e) {
      console.error(card["Card name"]);
      console.error(e);
      fs.appendFile(
        "failedElements.csv",
        `${JSON.stringify(card["Card name"])}\n`,
        function () {}
      );
    }
    await sleep(100);
  }
};
mainFunction();

// const csv = require("csvtojson");
// csv()
//   .fromFile(csvFilePath)
//   .then((collection) => {
//     // console.log(collection);
//     fs.writeFile("./collection.json", JSON.stringify(collection), (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       //file written successfully
//     });
//   });
