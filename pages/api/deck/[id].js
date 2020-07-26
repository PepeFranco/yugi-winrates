import { docClient } from "../aws";
import decks from "../../../decks";

export default (req, res) => {
  const {
    query: { id },
    method,
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
  // "Items": [
  //   {
  //     "winner": "SD1",
  //     "date": 1529644667834,
  //     "loser": "SD2"
  //   }
  // ],
  // "Count": 1,
  // "ScannedCount": 1
  docClient.query(winnerParams, (winnerError, winnerData) => {
    if (winnerError) {
      res.statusCode = 500;
      res.end();
    } else {
      docClient.scan(loserParams, (loserError, loserData) => {
        if (loserError) {
          console.log(loserError);
          res.statusCode = 500;
          res.end();
        } else {
          const result = {};
          const otherDecks = decks.filter(
            (deckToFilter) => deckToFilter.code !== id
          );
          otherDecks.map(
            (deck) => (result[deck.code] = { wins: 0, losses: 0 })
          );

          winnerData.Items.map((winnerItem) => {
            result[winnerItem.loser].wins = result[winnerItem.loser].wins + 1;
          });

          loserData.Items.map((loserItem) => {
            result[loserItem.winner].losses =
              result[loserItem.winner].losses + 1;
          });

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        }
      });
    }
  });
};
