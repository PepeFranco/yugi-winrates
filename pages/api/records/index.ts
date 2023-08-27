import { docClient } from "../aws";
import decks from "../../../decks";
import sortRecords from "../sortRecords";

import type { NextApiRequest } from "next";
import { DeckMatchupOrder, DeckType } from "../../../types";

const getDecksCombinations = (result, decks) => {
  if (decks.length === 1) return result;
  const currentDeck = decks[0];
  result[currentDeck.code] = {};
  decks.slice(1).map((opponentDeck) => {
    result[currentDeck.code][opponentDeck.code] = {
      deckCode: currentDeck.code,
      deckName: currentDeck.name,
      deckColor: currentDeck.color,
      wins: 0,
      losses: 0,
      totalGames: 0,
      opponentDeckCode: opponentDeck.code,
      opponentDeckName: opponentDeck.name,
      opponentDeckColor: opponentDeck.color,
    };
  });
  return getDecksCombinations(result, decks.slice(1));
};

const putDBItemsIntoRecordObject = (items) => {
  const result = getDecksCombinations({}, decks);
  items.map((item) => {
    if (result[item.winner] && result[item.winner][item.loser]) {
      result[item.winner][item.loser].wins++;
      result[item.winner][item.loser].totalGames++;
    }

    if (result[item.loser] && result[item.loser][item.winner]) {
      result[item.loser][item.winner].losses++;
      result[item.loser][item.winner].totalGames++;
    }
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
    if (record.wins >= record.losses) return record;
    const {
      deckCode,
      deckName,
      deckColor,
      opponentDeckCode,
      opponentDeckName,
      opponentDeckColor,
      wins,
      losses,
      winPercentage,
      lossPercentage,
      totalGames,
      rating,
    } = record;
    return {
      deckCode: opponentDeckCode,
      deckName: opponentDeckName,
      deckColor: opponentDeckColor,
      opponentDeckCode: deckCode,
      opponentDeckName: deckName,
      opponentDeckColor: deckColor,
      wins: losses,
      losses: wins,
      winPercentage: lossPercentage,
      lossPercentage: winPercentage,
      totalGames,
      rating,
    };
  });

const calculatePercentages = (records) =>
  records.map((record) => {
    const {
      wins,
      losses,
      totalGames,
      deckCode,
      deckName,
      deckColor,
      opponentDeckCode,
      opponentDeckName,
      opponentDeckColor,
    } = record;
    const winPercentage = totalGames > 0 ? (wins * 100) / totalGames : 0;
    const lossPercentage = totalGames > 0 ? (losses * 100) / totalGames : 0;
    const rating = totalGames > 0 ? 100 - Math.abs(winPercentage - 50) : 0;
    return {
      deckCode,
      deckName,
      deckColor,
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

export default (req, res) => {
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
    } else {
      const recordsWithPercentages = transformDBItemsToRecordsArray(data.Items);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(sortRecords({ recordsWithPercentages, order })));
    }
  });
};
