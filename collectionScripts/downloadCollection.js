const axios = require("axios");
const fs = require("fs");
const csv = require("csvtojson");
const collectionSecret = require("../secret/collectionread.json");

const mainFunction = async () => {
  const result = await axios.get(collectionSecret.url).catch(() => {});
  csv()
    .fromString(result.data)
    .then((collection) => {
      fs.writeFile(
        "./collectionScripts/collection.json",
        JSON.stringify(collection, null, 3),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
    });
};
mainFunction();
