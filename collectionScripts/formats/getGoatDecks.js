const _ = require("lodash");
const fs = require("fs");
const axios = require("axios");
const { parse } = require("node-html-parser");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCardName = async (cardId) => {
  sleep(100);
  const result = await axios
    .get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" +
        encodeURIComponent(cardId)
    )
    .catch((e) => {});

  return (result && result.data.data[0].name) || null;
};

const getGoatDeckLinks = async (page) => {
  const result = await axios
    .get(
      `https://ygoprodeck.com/deck-search/?_sft_category=goat-format-decks&sort_order=_sfm_total_views+desc+num${
        page && page > 1 ? `&sf_paged=${page}` : ""
      }`
    )
    .catch((e) => {
      console.error("Could not get goat decks", e);
    });

  const htmlNode = parse(result.data);
  const links = htmlNode.querySelectorAll("a");
  const goatDeckNodes = _.uniqBy(
    links.filter((l) => l.rawAttrs.includes("goat")),
    (l) => l.rawAttrs
  );
  const goatDeckLinks = goatDeckNodes
    .map((l) => l.rawAttrs)
    .map((l) => l.replace("href=", "").replace(/"/g, ""));
  return goatDeckLinks;
};

const writeCardList = async (deckUrl) => {
  try {
    console.log("=============================");
    console.log("Getting deck from: ", deckUrl);
    const result = await axios.get(deckUrl);
    const htmlNode = parse(result.data);
    const deckName = htmlNode.querySelector("title").innerHTML;
    const links = htmlNode.querySelectorAll("a");
    const deckNodes = _.uniqBy(
      links.filter((l) => l.rawAttrs.includes("YGOPRO_Decks")),
      (l) => l.rawAttrs
    );
    const deckLinks = deckNodes
      .map((l) => l.rawAttrs)
      .map((l) => l.replace("href=", "").replace(/"/g, "").split(" ")[0]);
    const deckLink = deckLinks[0];
    console.log("Getting deck contents from: ", deckLink);
    const deckResult = await axios.get(deckLink).catch(() => {
      throw new Error(`Could not get deck ${deckLink}`);
    });
    const deckData = deckResult.data;
    const cardIds = deckData.split("\n");
    const mainCardIds = [];
    for (let i = 0; i < cardIds.length; i++) {
      const cardId = cardIds[i];
      if (cardId !== "#main") {
        if (cardId === "!side") {
          i = cardIds.length;
        } else {
          mainCardIds.push(cardId);
        }
      }
      i++;
    }
    const mainCardNames = [];
    console.log("Getting cards");
    for (let i = 0; i < mainCardIds.length; i++) {
      const cardId = mainCardIds[i];
      console.log("   Trying to get card ", cardId);
      const cardName = await getCardName(cardId);
      if (cardName) {
        console.log("   Got card ", cardName);
        mainCardNames.push(cardName);
      }
    }
    console.log("Cards obtained, writing file");
    fs.writeFileSync(
      `./collectionScripts/formats/goatDeckLists/${deckName}.json`,
      JSON.stringify(mainCardNames, 3, null),
      (e) => {
        throw e;
      }
    );
  } catch (e) {
    console.error("Could not write card list");
  }
};

const mainFunction = async () => {
  for (let page = 1; page < 10; page++) {
    console.log("Getting decks from page " + page);
    const goatDeckLinks = await getGoatDeckLinks(page);
    for (let i = 0; i < goatDeckLinks.length; i++) {
      await writeCardList(goatDeckLinks[i]);
    }
  }
};
mainFunction();
