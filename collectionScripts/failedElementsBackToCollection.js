const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");
const { cardToRow } = require("./common");

const collection = require("./collection.json");
const mainFunction = async () => {
  for (let i = 0; i < collection.length; i++) {
    const card = collection[i];
    try {
      fs.appendFile(
        "collectionWithData.csv",
        cardToRow({}, card),
        function (err) {
          if (err) throw err;
        }
      );
    } catch (e) {
      // Id^Name^Code^Rarity^Edition^In Box^In Sleeve^
      console.error(card["Card name"]);
      console.error(e);
    }
  }
};
mainFunction();
