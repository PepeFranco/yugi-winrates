import { docClient } from "../aws";
import decks from "../../../decks";
import sortRecords from "../sortRecords";

export default (req, res) => {
  const {
    query: { id, order = "rating", type = "structure" },
  } = req;

  const currentDeck = decks.find((deck) => deck.code === id);

  const tables = { structure: "yugi-winrates", speed: "yugi-winrates-speed" };
  const winnerParams = {
    FilterExpression: "winner = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
    TableName: tables[type],
  };

  const loserParams = {
    FilterExpression: "loser = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
    TableName: tables[type],
  };
  docClient.scan(winnerParams, (winnerError, winnerData) => {
    if (winnerError) {
      res.statusCode = 500;
      res.end();
    } else {
      docClient.scan(loserParams, (loserError, loserData) => {
        if (loserError) {
          res.statusCode = 500;
          res.end();
        } else {
          const result = {};
          const otherDecks = decks.filter(
            (deckToFilter) =>
              deckToFilter.code !== id && deckToFilter.type === currentDeck.type
          );
          otherDecks.map(
            (deck) =>
              (result[deck.code] = {
                wins: 0,
                losses: 0,
                totalGames: 0,
                opponentDeckCode: deck.code,
                opponentDeckName: deck.name,
                opponentDeckColor: deck.color,
              })
          );

          winnerData.Items.map((winnerItem) => {
            result[winnerItem.loser].wins++;
            result[winnerItem.loser].totalGames++;
          });

          loserData.Items.map((loserItem) => {
            result[loserItem.winner].losses++;
            result[loserItem.winner].totalGames++;
          });

          const recordsWithPercentages = Object.keys(result).map((key) => {
            const {
              wins,
              losses,
              totalGames,
              opponentDeckCode,
              opponentDeckName,
              opponentDeckColor,
            } = result[key];
            const winPercentage =
              totalGames > 0 ? (wins * 100) / totalGames : 0;
            const lossPercentage =
              totalGames > 0 ? (losses * 100) / totalGames : 0;
            const rating =
              totalGames > 0 ? 100 - Math.abs(winPercentage - 50) : 0;
            return {
              opponentDeckCode,
              opponentDeckName,
              opponentDeckColor,
              wins,
              losses,
              totalGames,
              winPercentage,
              lossPercentage,
              rating,
            };
          });

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify(sortRecords({ recordsWithPercentages, order }))
          );
        }
      });
    }
  });
};
