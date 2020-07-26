import { docClient } from "../aws";
import decks from "../../../decks";

const getDecksCombinations = (result, decks) => {
  if (decks.length === 1) return result;
  const currentDeck = decks[0];
  result[currentDeck.code] = {};
  decks.slice(1).map((opponentDeck) => {
    result[currentDeck.code][opponentDeck.code] = {
      deckCode: currentDeck.code,
      deckName: currentDeck.name,
      wins: 0,
      losses: 0,
      totalGames: 0,
      opponentDeckCode: opponentDeck.code,
      opponentDeckName: opponentDeck.name,
    };
  });
  return getDecksCombinations(result, decks.slice(1));
};

export default (req, res) => {
  const result = getDecksCombinations({}, decks);

  const params = {
    TableName: "yugi-winrates",
  };

  docClient.scan(params, (error, data) => {
    if (error) {
      res.statusCode = 500;
      res.end();
    } else {
      data.Items.map((item) => {
        if (result[item.winner] && result[item.winner][item.loser]) {
          result[item.winner][item.loser].wins++;
          result[item.winner][item.loser].totalGames++;
        }

        if (result[item.loser] && result[item.loser][item.winner]) {
          result[item.loser][item.winner].losses++;
          result[item.loser][item.winner].totalGames++;
        }
      });

      const flattenedResult = [];

      Object.keys(result).map((upperKey) => {
        Object.keys(result[upperKey]).map((lowerKey) => {
          flattenedResult.push(result[upperKey][lowerKey]);
        });
      });

      const recordsWithPercentages = flattenedResult.map((record) => {
        const {
          wins,
          losses,
          totalGames,
          deckCode,
          deckName,
          opponentDeckCode,
          opponentDeckName,
        } = record;
        const winPercentage = totalGames > 0 ? (wins * 100) / totalGames : 0;
        const lossPercentage = totalGames > 0 ? (losses * 100) / totalGames : 0;
        const rating = totalGames > 0 ? 100 - Math.abs(winPercentage - 50) : 0;
        return {
          deckCode,
          deckName,
          opponentDeckCode,
          opponentDeckName,
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
      res.end(JSON.stringify(recordsWithPercentages));
    }
  });
};
