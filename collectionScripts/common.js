const _ = require("lodash");
const cardSets = require("./cardsets.json");

// Name^Id^Type^ATK^DEF^Level^Card Type^Attribute^Archetype^Scale^Link Scale^Description^Earliest Set^Earliest Date^Rarity^Edition^In Box^In Sleeve^In Deck^Out of place^Code^Set^Is Speed Duel^Image
const cardToRow = (cardInfo, card) => {
  console.log("==================");
  console.log(card["Name"]);
  const newCard = {};
  const earliestInfo = getEarliestInfo(cardInfo);
  const image =
    cardInfo.card_images &&
    cardInfo.card_images[0] &&
    cardInfo.card_images[0].image_url;
  newCard.name = card["Name"];
  const cardInfoProperties = [
    "id",
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
    newCard[cip] = cardInfo[cip] || "";
  });
  const cardInfoPropertiesToReplace = ["desc"];
  cardInfoPropertiesToReplace.map((cip) => {
    newCard[cip] = cardInfo[cip]
      ? JSON.stringify(cardInfo[cip]).replace(/"/g, "`")
      : "";
  });
  // const cardInfoPropertiesToStringify = ["linkmarkers"];
  // cardInfoPropertiesToStringify.map((cip) => {
  //   newCard[cip] = cardInfo[cip] ? cardInfo[cip] : "";
  // });
  const earliestInfoProperties = ["earliestSet", "earliestDate"];
  earliestInfoProperties.map((eip) => {
    newCard[eip] = earliestInfo[eip] || "";
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
    newCard[cp] = card[cp] || "";
  });

  newCard["Set"] = getCardSetName(card);
  newCard["Is Speed Duel"] =
    newCard["Set"] && newCard["Set"].toLowerCase().includes("speed duel")
      ? "Yes"
      : "";

  const cardAsRow = cardObjectToCardRow(newCard);

  return `\n${cardAsRow}^=IMAGE("${image}")`;
};

const cardSetsByDate = _.orderBy(cardSets, ["tcg_date"]);
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

const getAllSets = (cardInfo) => {
  let sets = "";
  cardInfo["card_sets"].map((cardSet) => {
    sets += `${JSON.stringify(cardSet["set_name"])}^${cardSet["set_code"]}^`;
  });
  return sets;
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

const cardObjectToCardRow = (cardObject) =>
  Object.entries(cardObject).reduce((previous, current) => {
    if (typeof previous === "string") {
      return `${previous.trim()}^${current[1]}`;
    }
    return `${previous[1]}^${current[1]}`;
  });

module.exports = {
  cardToRow,
  cardObjectToCardRow,
};
