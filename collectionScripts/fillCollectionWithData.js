const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");

const cardSets = require("./data/sets.json");

const getCardInfo = async (cardName) => {
  console.log(cardName);
  const name = `${cardName.trim()}`;
  const result = await axios.get(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
      encodeURIComponent(name)
  );

  console.log(result);
  console.log("==================");
  return (result && result.data.data[0]) || null;
};

const getEarliestInfo = (cardInfo) => {
  if (!cardInfo) {
    return {};
  }
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

const getCardSetName = (card) => {
  if (card["Code"]) {
    const cardSet = cardSets.find(
      (cs) =>
        cs["set_code"].toLowerCase().trim().split("-")[0] ===
        card["Code"].toLowerCase().trim().split("-")[0]
    );
    if (cardSet) {
      return cardSet["set_name"];
    }
  }
  return "";
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const collection = require("./data/collection.json");
const collectionCopy = [...collection];

const mainFunction = async () => {
  for (let i = 0; i < collectionCopy.length; i++) {
    const card = collectionCopy[i];
    const cardInfo = await getCardInfo(card["Name"]);
    // const set = getCardSetName(card);

    // card["Set"] = set;
    // card["ID"] = cardInfo.id;
    // card["Type"] = cardInfo.type;
    // card["ATK"] = cardInfo.atk;
    // card["DEF"] = cardInfo.def;
    // card["Level"] = cardInfo.level;
    // card["Card Type"] = cardInfo.race;
    // card["Attribute"] = cardInfo.attribute;
    // card["Archetype"] = cardInfo.archetype;
    // card["Scale"] = cardInfo.scale;
    // card["Link Scale"] = cardInfo.linkval;
    // card["Description"] = cardInfo.desc;
    // const earliestSet = getEarliestInfo(cardInfo);
    // card["Earliest Set"] = earliestSet.earliestSet;
    // card["Earliest Date"] = earliestSet.earliestDate;
    // card["Is Speed Duel"] =
    //   set && set.toLowerCase().includes("speed duel") ? "Yes" : "";
    // const image =
    //   cardInfo.card_images &&
    //   cardInfo.card_images[0] &&
    //   cardInfo.card_images[0].image_url;
    // card["Image"] = `=IMAGE(${image})`;

    sleep(100);
  }

  try {
    fs.appendFile(
      "collectionWithData.json",
      JSON.stringify(collectionCopy, null, 3),
      function (err) {
        if (err) throw err;
      }
    );
  } catch (e) {
    console.error(e);
  }
};

mainFunction();
