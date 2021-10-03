const fs = require("fs");

const csv = require("csvtojson");
const csvFilePath = "./failedElements.csv";
csv({ delimiter: ["^"] })
  .fromFile(csvFilePath)
  .then((collection) => {
    console.log(collection);
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
