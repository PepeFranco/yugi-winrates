import { docClient } from "../aws";
import decks from "../../../decks";

export default (req, res) => {
  const {
    query: { id, order = "release" },
  } = req;

  const winnerParams = {
    KeyConditionExpression: "winner = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
    TableName: "yugi-winrates",
  };

  const loserParams = {
    KeyConditionExpression: "loser = :id",
    ProjectionExpression: "winner, loser",
    FilterExpression: "loser = :id",
    ExpressionAttributeValues: {
      ":id": id,
    },
    TableName: "yugi-winrates",
  };
  docClient.query(winnerParams, (winnerError, winnerData) => {
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
            JSON.stringify(sortResults({ recordsWithPercentages, order }))
          );
        }
      });
    }
  });
};

const sortResults = ({ recordsWithPercentages, order }) => {
  if (order === "alphabetical") {
    return recordsWithPercentages.sort((recordA, recordB) =>
      recordA.opponentDeckName < recordB.opponentDeckName ? -1 : 1
    );
  }
  if (order === "rating") {
    return recordsWithPercentages.sort((recordA, recordB) => {
      if (recordA.totalGames === 0) return 1;
      return recordA.rating < recordB.rating ? -1 : 1;
    });
  }
  if (order === "winrate") {
    return recordsWithPercentages.sort((recordA, recordB) => {
      if (recordA.totalGames === 0) return 1;
      return recordA.winPercentage < recordB.winPercentage ? -1 : 1;
    });
  }
  return recordsWithPercentages;
};
