import { docClient } from "../aws";
import decks from "../../../decks";
import sortRecords from "../sortRecords";

export default (req, res) => {
  const {
    query: { order = "release", type = "structure", skipRecords = false },
  } = req;
  const result = {};
  const filteredDecks = decks.filter((deck) => {
    return deck.type === type;
  });
  filteredDecks.map(
    (deck) =>
      (result[deck.code] = {
        deckCode: deck.code,
        deckName: deck.name,
        deckColor: deck.color,
        wins: 0,
        losses: 0,
        totalGames: 0,
      })
  );

  if (skipRecords) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify(
        sortRecords({ recordsWithPercentages: filteredDecks, order })
      )
    );
    return res.send();
  }

  const tables = { structure: "yugi-winrates", speed: "yugi-winrates-speed" };
  const params = {
    TableName: tables[type],
  };

  docClient.scan(params, (error, data) => {
    if (error) {
      console.log(error);
      res.statusCode = 500;
      res.end();
    } else {
      data.Items.map((item) => {
        result[item.winner].totalGames++;
        result[item.winner].wins++;
        result[item.loser].totalGames++;
        result[item.loser].losses++;
      });

      const flattenedResult = [];

      Object.keys(result).map((deckCode) => {
        flattenedResult.push(result[deckCode]);
      });

      const recordsWithPercentages = flattenedResult.map((record) => {
        const { wins, losses, totalGames, deckCode, deckName, deckColor } =
          record;
        const winPercentage = totalGames > 0 ? (wins * 100) / totalGames : 0;
        const lossPercentage = totalGames > 0 ? (losses * 100) / totalGames : 0;
        return {
          deckCode,
          deckName,
          deckColor,
          wins,
          losses,
          totalGames,
          winPercentage,
          lossPercentage,
        };
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(sortRecords({ recordsWithPercentages, order })));
      return res.send();
    }
  });
};
