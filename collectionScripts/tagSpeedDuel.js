const _ = require("lodash");
const fs = require("fs");

const collection = require("./data/collection.json");
const collectionCopy = [...collection];
const speedDuelLegal = collectionCopy
  .filter((c) => c["Is Speed Duel"] === "Yes")
  .map((c) => c["Name"]);

const mainFunction = async () => {
  try {
    for (let i = 0; i < collectionCopy.length; i++) {
      const card = collectionCopy[i];
      card["Is Speed Duel Legal"] = speedDuelLegal.includes(card["Name"]);
      card["Description Length"] = card["Description"].length;
      console.log(card["Name"]);
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
