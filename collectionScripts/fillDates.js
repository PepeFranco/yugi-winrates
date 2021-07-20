const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");
const csv = require("csvtojson");

const csvFilePath = "./collectionScripts/collection.csv";
csv()
  .fromFile(csvFilePath)
  .then((collection) => {
    fs.writeFile(
      "./collectionScripts/collection.json",
      JSON.stringify(collection),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  });

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const getCardInfo = async (cardName) => {
//   const name = `${cardName}`;
//   console.log(name);
//   const result = await axios
//     .get(
//       "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
//         encodeURIComponent(name)
//     )
//     .catch(() => {});
//   return (result && result.data.data[0]) || null;
// };

// const cardSets = require("./cardsets.json");
// const cardSetsByDate = _.orderBy(cardSets, ["tcg_date"]);
// const getEarliestInfo = (cardInfo) => {
//   const earliestSet = _.find(cardSetsByDate, (currentSet) => {
//     const found = cardInfo.card_sets.find(
//       (cardSet) => cardSet.set_name === currentSet.set_name
//     );
//     if (found) {
//       return found;
//     }
//   });
//   return {
//     earliestSet: earliestSet.set_name,
//     earliestDate: earliestSet.tcg_date,
//   };
// };

// const collection = require("./collection.json");
// const mainFunction = async () => {
//   for (let i = 0; i < collection.length; i++) {
//     const card = collection[i];
//     try {
//       const cardInfo = await getCardInfo(card["Card name"]);
//       const earliestInfo = getEarliestInfo(cardInfo);
//       card.Date = earliestInfo.earliestDate;
//       card.Set = earliestInfo.earliestSet;
//       const image =
//         cardInfo.card_images &&
//         cardInfo.card_images[0] &&
//         cardInfo.card_images[0].image_url;
//       fs.appendFile(
//         "collectionWithDate.csv",
//         `"${card["Card name"]}",${card.Date},${
//           card.Set
//         },=IMAGE(${JSON.stringify(image)})\n`,
//         function (err) {
//           if (err) throw err;
//         }
//       );
//     } catch (e) {
//       console.error(card["Card name"]);
//       console.error(e);
//       fs.appendFile(
//         "failedElements.csv",
//         `${JSON.stringify(card["Card name"])}\n`,
//         function () {}
//       );
//     }
//     await sleep(100);
//   }
// };
// mainFunction();
