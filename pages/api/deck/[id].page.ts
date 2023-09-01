import { docClient } from "../aws";
import decks from "../../../decks";
import sortRecords from "../sortRecords";

import type { NextApiRequest } from "next";
import { DeckMatchupRecord, DeckMatchupOrder } from "../../../types";

interface Request extends NextApiRequest {
  query: {
    order: DeckMatchupOrder;
    id: string;
  };
}

export default (req: Request, res) => {
  const {
    query: { id, order = "rating" },
  } = req;

  const deckMatchupRecordMap: Record<string, DeckMatchupRecord> = {};

  const getRecordArray = () => {
    const deckMatchupRecordArray: DeckMatchupRecord[] = [];
    Object.keys(deckMatchupRecordMap).map((deckCode) => {
      deckMatchupRecordArray.push(deckMatchupRecordMap[deckCode]);
    });
    return deckMatchupRecordArray;
  };

  const currentDeck = decks.find((deck) => deck.code === id);

  const generateResponse = () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        deck: currentDeck,
        records: sortRecords({
          recordsWithPercentages: getRecordArray(),
          order,
        }),
      })
    );
    return res.send();
  };

  if (!currentDeck) {
    return generateResponse();
  }

  const type = currentDeck.type;

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
      return res.send();
    }
    // console.log(winnerData);
    docClient.scan(loserParams, (loserError, loserData) => {
      if (loserError) {
        res.statusCode = 500;
        res.end();
        return res.send();
      }
      // console.log(loserData);

      const otherDecks = decks.filter(
        (deckToFilter) => deckToFilter.code !== id && deckToFilter.type === type
      );
      otherDecks.map(
        (deck) =>
          (deckMatchupRecordMap[deck.code] = {
            opponentDeckYear: deck.year,
            opponentDeckCode: deck.code,
            opponentDeckName: deck.name,
            opponentDeckColor: deck.color,
            deckName: currentDeck.name,
            deckCode: currentDeck.code,
            deckColor: currentDeck.color,
            year: currentDeck.year,
            type: currentDeck.type,
            wins: 0,
            losses: 0,
            totalGames: 0,
            winPercentage: 0,
            lossPercentage: 0,
            rating: 0,
          })
      );

      winnerData.Items?.map((winnerItem) => {
        deckMatchupRecordMap[winnerItem.loser].wins++;
        deckMatchupRecordMap[winnerItem.loser].totalGames++;
      });

      loserData.Items?.map((loserItem) => {
        deckMatchupRecordMap[loserItem.winner].losses++;
        deckMatchupRecordMap[loserItem.winner].totalGames++;
      });

      Object.keys(deckMatchupRecordMap).map((deckCode) => {
        const { wins, losses, totalGames } = deckMatchupRecordMap[deckCode];

        const winPercentage = totalGames > 0 ? (wins * 100) / totalGames : 0;
        const lossPercentage = totalGames > 0 ? (losses * 100) / totalGames : 0;
        const rating = totalGames > 0 ? 100 - Math.abs(winPercentage - 50) : 0;

        deckMatchupRecordMap[deckCode].winPercentage = winPercentage;
        deckMatchupRecordMap[deckCode].lossPercentage = lossPercentage;
        deckMatchupRecordMap[deckCode].rating = rating;
      });

      return generateResponse();
    });
  });
};
