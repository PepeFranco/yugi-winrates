const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCardPrice = async (cardName) => {
  await sleep(100);
  const name = `${cardName.trim()}`;
  const result = await axios
    .get("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + name)
    .catch((e) => {});

  const data = (result && result.data && result.data.data[0]) || null;
  if (data === null) {
    return null;
  }
  return data.card_prices[0].ebay_price;
};

const decks = require("./cardsNeededToComplete3Sets.json");

const mainFunction = async () => {
  const newDecks = [];
  for (let i = 0; i < decks.length; i++) {
    const currentDeck = decks[i];
    console.log("=========", currentDeck.deck);
    const newDeck = { deck: currentDeck.deck, cards: [] };
    const cards = currentDeck.cards;
    for (let j = 0; j < cards.length; j++) {
      const currentCard = cards[j];
      console.log(currentCard);
      const newCard = {
        name: currentCard,
        price: await getCardPrice(currentCard),
      };
      newDeck.cards.push(newCard);
    }
    newDecks.push(newDeck);
  }

  const sortedDecks = _.sortBy(newDecks, (deck) => {
    return deck.cards.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
  });

  fs.writeFile(
    "./collectionScripts/structureDecks/cardsNeededToComplete3Sets.json",
    JSON.stringify(sortedDecks, null, 3),
    function (err) {
      console.error(err);
    }
  );
};

mainFunction();
