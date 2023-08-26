import { docClient } from "../aws";
import decks from "../../../decks";
import sortRecords from "../sortRecords";
import {
  DeckType,
  IndividualDeckRecord,
  IndividualDeckOrder,
} from "../../../types";

import type { NextApiRequest, NextApiResponse } from "next";

interface Request extends NextApiRequest {
  query: {
    order: IndividualDeckOrder;
    type: DeckType;
    skipRecords?: "true" | "false";
  };
}

export default (req: Request, res) => {
  const {
    query: { order = "release", type = "structure", skipRecords = "false" },
  } = req;

  const filteredDecks = decks.filter((deck) => {
    return deck.type === type;
  });

  const individualDeckRecordMap: Record<string, IndividualDeckRecord> = {};
  filteredDecks.map(
    (deck) =>
      (individualDeckRecordMap[deck.code] = {
        deckCode: deck.code,
        deckName: deck.name,
        deckColor: deck.color,
        wins: 0,
        winPercentage: 0,
        lossPercentage: 0,
        losses: 0,
        totalGames: 0,
        type,
      })
  );

  const transformResultObjectToRecordArray = () => {
    const individualDeckRecordArray: IndividualDeckRecord[] = [];
    Object.keys(individualDeckRecordMap).map((deckCode) => {
      individualDeckRecordArray.push(individualDeckRecordMap[deckCode]);
    });
    return individualDeckRecordArray;
  };

  const generateResponse = () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify(
        sortRecords({
          recordsWithPercentages: transformResultObjectToRecordArray(),
          order,
        })
      )
    );
    return res.send();
  };

  if (skipRecords === "true") {
    return generateResponse();
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
      if (!data.Items) {
        return generateResponse();
      }

      data.Items.map((item) => {
        individualDeckRecordMap[item.winner].totalGames++;
        individualDeckRecordMap[item.winner].wins++;
        individualDeckRecordMap[item.loser].totalGames++;
        individualDeckRecordMap[item.loser].losses++;
      });

      const individualDeckRecordArray = transformResultObjectToRecordArray();
      const recordsWithPercentages: IndividualDeckRecord[] =
        individualDeckRecordArray.map((record) => {
          const deckType = type;
          const { wins, losses, totalGames, deckCode, deckName, deckColor } =
            record;
          const winPercentage = totalGames > 0 ? (wins * 100) / totalGames : 0;
          const lossPercentage =
            totalGames > 0 ? (losses * 100) / totalGames : 0;
          return {
            deckType,
            deckCode,
            deckName,
            deckColor,
            wins,
            losses,
            totalGames,
            winPercentage,
            lossPercentage,
            type,
          };
        });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(sortRecords({ recordsWithPercentages, order })));
      return res.send();
    }
  });
};
