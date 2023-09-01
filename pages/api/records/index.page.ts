import { docClient } from "../aws";
import decks from "../../../decks";
import sortRecords from "../sortRecords";

import type { NextApiRequest } from "next";
import { DeckMatchupOrder, DeckType, DeckMatchupRecord } from "../../../types";

const putDBItemsIntoRecordObject = (items) => {
  const result: Record<string, Record<string, DeckMatchupRecord>> = {};

  items.map((item): Record<string, Record<string, DeckMatchupRecord>> => {
    // console.log({ item });
    if (result[item.winner] && result[item.winner][item.loser]) {
      // console.log("winner found ", item.winner, " loser found", item.loser);
      result[item.winner][item.loser].wins++;
      result[item.winner][item.loser].totalGames++;
      // console.log(result);
      return;
    }

    if (result[item.loser] && result[item.loser][item.winner]) {
      // console.log("loser found ", item.loser, "winner found", item.winner);
      result[item.loser][item.winner].losses++;
      result[item.loser][item.winner].totalGames++;
      // console.log(result);
      return;
    }

    if (result[item.winner]) {
      // console.log("winner found ", item.winner);
      const deck = decks.find((deck) => deck.code === item.winner);
      const opponentDeck = decks.find((deck) => deck.code === item.loser);
      result[item.winner][item.loser] = {
        deck,
        opponentDeck,
        wins: 1,
        losses: 0,
        totalGames: 1,
        lossPercentage: 0,
        winPercentage: 0,
        rating: 0,
      };
      // console.log(result);
      return;
    }

    // console.log("no winner or loser found");
    const deck = decks.find((deck) => deck.code === item.winner);
    const opponentDeck = decks.find((deck) => deck.code === item.loser);
    result[item.winner] = {};
    result[item.winner][item.loser] = {
      deck,
      opponentDeck,
      wins: 1,
      losses: 0,
      totalGames: 1,
      winPercentage: 0,
      lossPercentage: 0,
      rating: 0,
    };
    // console.log(result);
  });
  return result;
};

const flattenResult = (result) => {
  const flattenedResult = [];

  Object.keys(result).map((upperKey) => {
    Object.keys(result[upperKey]).map((lowerKey) => {
      flattenedResult.push(result[upperKey][lowerKey]);
    });
  });

  return flattenedResult;
};

const putWinnersOnTheLeft = (records) =>
  records.map((record) => {
    if (record.wins >= record.losses) {
      return record;
    }

    const { deck, opponentDeck } = record;

    return {
      ...record,
      deck: opponentDeck,
      opponentDeck: deck,
      wins: record.losses,
      losses: record.wins,
      winPercentage: record.lossPercentage,
      lossPercentage: record.winPercentage,
    };
  });

const calculatePercentages = (records) =>
  records.map((record) => {
    const { wins, losses, totalGames } = record;
    const winPercentage = (wins * 100) / totalGames;
    const lossPercentage = (losses * 100) / totalGames;
    const rating = 100 - Math.abs(winPercentage - 50);
    return {
      ...record,
      winPercentage,
      lossPercentage,
      rating,
    };
  });

export const transformDBItemsToRecordsArray = (dbItems) => {
  const result = putDBItemsIntoRecordObject(dbItems);
  const flattenedResult = flattenResult(result);
  const flattenedResultWithWinnersOnTheLeft =
    putWinnersOnTheLeft(flattenedResult);
  const recordsWithPercentages = calculatePercentages(
    flattenedResultWithWinnersOnTheLeft
  );
  return recordsWithPercentages;
};

interface Request extends NextApiRequest {
  query: {
    order?: DeckMatchupOrder;
    type?: DeckType;
  };
}

export default (req: Request, res) => {
  const {
    query: { order = "rating", type = "structure" },
  } = req;

  const tables = { structure: "yugi-winrates", speed: "yugi-winrates-speed" };
  const params = {
    TableName: tables[type],
  };

  docClient.scan(params, (error, data) => {
    if (error) {
      res.statusCode = 500;
      res.end();
      return res.send();
    }

    const recordsWithPercentages = transformDBItemsToRecordsArray(data.Items);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(sortRecords({ recordsWithPercentages, order })));
    return res.send();
  });
};
