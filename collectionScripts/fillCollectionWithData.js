const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");

const cardSets = require("./data/sets.json");
const cardSetsByDate = _.orderBy(cardSets, ["tcg_date"]);

const getCardInfo = async (cardName) => {
  const name = `${cardName.trim()}`;
  // console.log("==================");
  // console.log(name);
  const result = await axios
    .get("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + name)
    .catch((e) => {
      // console.error(e);
    });

  // console.log(result);
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
    earliestSet: (earliestSet && earliestSet.set_name) || "",
    earliestDate: (earliestSet && earliestSet.tcg_date) || "",
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

const cardIsComplete = (card) => {
  return Boolean(
    card["Set"] &&
      card["ID"] &&
      card["Card Type"] &&
      card["Description"] &&
      card["Earliest Set"] &&
      card["Earliest Date"] &&
      card["Is Speed Duel"]
  );
};

const mainFunction = async () => {
  try {
    for (let i = 0; i < collectionCopy.length; i++) {
      const card = collectionCopy[i];
      if (!card["Image"] && card["ID"]) {
        card[
          "Image"
        ] = `=IMAGE("https://storage.googleapis.com/ygoprodeck.com/pics/${
          card.ID || ""
        }.jpg")`;
      }
      if (!cardIsComplete(card)) {
        const cardInfo = await getCardInfo(card["Name"]);
        console.log("========================");
        console.log(card["Name"], card["Code"], card["In Box"]);
        if (cardInfo) {
          const set = getCardSetName(card);
          card["Set"] = set || "";
          card["ID"] = cardInfo.id || "";
          card["Type"] = cardInfo.type || "";
          card["ATK"] = cardInfo.atk || "";
          card["DEF"] = cardInfo.def || "";
          card["Level"] = cardInfo.level || "";
          card["Card Type"] = cardInfo.race || "";
          card["Attribute"] = cardInfo.attribute || "";
          card["Archetype"] = cardInfo.archetype || "";
          card["Scale"] = cardInfo.scale || "";
          card["Link Scale"] = cardInfo.linkval || "";
          card["Description"] = cardInfo.desc || "";
          const earliestSet = getEarliestInfo(cardInfo);
          card["Earliest Set"] = earliestSet.earliestSet || "";
          card["Earliest Date"] = earliestSet.earliestDate || "";
          const isSpeedDuel = set.toLowerCase().includes("speed duel")
            ? "Yes"
            : "No";
          console.log({ isSpeedDuel });
          card["Is Speed Duel"] = isSpeedDuel;
          card[
            "Image"
          ] = `=IMAGE("https://storage.googleapis.com/ygoprodeck.com/pics/${
            cardInfo.id || ""
          }.jpg")`;
        }
        sleep(100);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    fs.writeFile(
      "./collectionScripts/data/collection.json",
      JSON.stringify(collectionCopy, null, 3),
      function (err) {
        if (err) console.error(err);
      }
    );
  }
};

mainFunction();
