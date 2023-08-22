const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");

const getCardSets = async () => {
  const result = await axios
    .get("https://db.ygoprodeck.com/api/v7/cardsets.php")
    .catch((e) => {
      // console.error(e);
    });

  return (result && result.data) || null;
};

const main = async () => {
  const cardSets = await getCardSets();
  console.log(cardSets.length);
  const structureDeckSets = cardSets.filter((cardSet) => {
    const setName = cardSet["set_name"].toLowerCase();
    return (
      (setName.includes("structure") ||
        setName.includes("legendary hero decks")) &&
      !setName.includes("special")
    );
  });
  console.log(structureDeckSets.length);
  //   console.log(JSON.stringify(structureDeckSets, null, 3));
  fs.writeFileSync(
    "./cardsets.json",
    JSON.stringify(structureDeckSets, null, 3),
    { flag: "w+" },
    function (err) {
      if (err) console.error(err);
    }
  );
};

main();
