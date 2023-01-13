import decks from "../../../../decks";
import cardSets from "../../../../cardsets.json";

export default (req, res) => {
  const {
    query: { id },
  } = req;

  const deck = decks.filter(
    ({ code }) => code.trim().toLowerCase() === id.trim().toLowerCase()
  )[0];
  const releaseDate = cardSets.filter(
    ({ set_code }) => set_code.trim().toLowerCase() === id.trim().toLowerCase()
  )[0].tcg_date;

  console.log({ deck, releaseDate });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: deck.name, releaseDate }));
};
