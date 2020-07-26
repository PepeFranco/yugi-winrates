import { docClient } from "../aws";
import decks from "../../../decks";
import sortRecords from "../sortRecords";

export default (req, res) => {
  const {
    query: { id, order = "release" },
  } = req;

  const winnerParams = {
    FilterExpression: "winner = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
    TableName: "yugi-winrates",
  };

  const loserParams = {
    FilterExpression: "loser = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
    TableName: "yugi-winrates",
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
            (deckToFilter) => deckToFilter.code !== id
          );
          otherDecks.map(
            (deck) =>
              (result[deck.code] = {
                wins: 0,
                losses: 0,
                totalGames: 0,
                opponentDeckCode: deck.code,
                opponentDeckName: deck.name,
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

          const recordsWithPercentages = Object.keys(result).map(
            (key, index) => {
              const {
                wins,
                losses,
                totalGames,
                opponentDeckCode,
                opponentDeckName,
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
                wins,
                losses,
                totalGames,
                winPercentage,
                lossPercentage,
                rating,
              };
            }
          );

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
