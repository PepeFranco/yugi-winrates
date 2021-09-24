const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getCardInfo = async (cardName) => {
  const name = `${cardName}`;
  const result = await axios
    .get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
        encodeURIComponent(name)
    )
    .catch(() => {});
  console.log("==================");
  console.log(name);
  console.log(result.data.data[0]);
  console.log("==================");
  return (result && result.data.data[0]) || null;
};

const cardSets = require("./cardsets.json");
const cardSetsByDate = _.orderBy(cardSets, ["tcg_date"]);
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

const getAllSets = (cardInfo) => {
  let sets = "";
  cardInfo["card_sets"].map((cardSet) => {
    sets += `${JSON.stringify(cardSet["set_name"])}^${cardSet["set_code"]}^`;
  });
  return sets;
};

const cardToRow = (cardInfo, card) => {
  const earliestInfo = getEarliestInfo(cardInfo);
  const image =
    cardInfo.card_images &&
    cardInfo.card_images[0] &&
    cardInfo.card_images[0].image_url;
  let row = "";
  const cardInfoProperties = [
    "id",
    "name",
    "type",
    "atk",
    "def",
    "level",
    "race",
    "attribute",
    "archetype",
    "scale",
    "linkval",
  ];
  cardInfoProperties.map((cip) => {
    row += `${cardInfo[cip] || ""}^`;
  });
  const cardInfoPropertiesToReplace = ["desc"];
  cardInfoPropertiesToReplace.map((cip) => {
    row += `${
      cardInfo[cip] ? JSON.stringify(cardInfo[cip]).replace(/"/g, "`") : ""
    }^`;
  });
  const cardInfoPropertiesToStringify = ["linkmarkers"];
  cardInfoPropertiesToStringify.map((cip) => {
    row += `${cardInfo[cip] ? cardInfo[cip] : ""}^`;
  });
  const earliestInfoProperties = ["earliestSet", "earliestDate"];
  earliestInfoProperties.map((eip) => {
    row += `${earliestInfo[eip] || ""}^`;
  });
  const cardProperties = [
    "Rarity",
    "Edition",
    "In Box",
    "In Sleeve",
    "In Deck",
    "Out of place",
    "Code",
  ];
  cardProperties.map((cp) => {
    row += `${card[cp] || ""}^`;
  });

  if (card["Code"]) {
    const cardSet = cardInfo["card_sets"].find(
      (cs) => cs["set_code"].toLowerCase() === card["Code"].toLowerCase()
    );
    if (cardSet) {
      row += `${cardSet["set_name"]}^`;
    } else {
      row += `^`;
    }
  } else {
    row += `^`;
  }

  return `${row}=IMAGE("${image}")^${getAllSets(cardInfo)}\n`;
};

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
      console.error(card["Card name"]);
      console.error(e);
      fs.appendFile(
        "failedElements.csv",
        `${JSON.stringify(card["Name"])}\n`,
        function () {}
      );
    }
    await sleep(100);
  }
};
mainFunction();
