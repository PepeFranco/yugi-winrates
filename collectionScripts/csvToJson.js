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
