import {
  DeckMatchupRecord,
  IndividualDeckRecord,
  IndividualDeckOrder,
  DeckMatchupOrder,
} from "../../types";

import _ from "lodash";

const hasOpponent = (record) => Boolean(record.opponentDeckName);

const sortRecordsAlphabetically = (
  records: DeckMatchupRecord[] | IndividualDeckRecord[]
) =>
  _.sortBy(
    records,
    (record) => `${record.opponentDeckName} - ${record.deckName}`
  );

const sortRecordsByRating = (
  records: DeckMatchupRecord[] | IndividualDeckRecord[]
) => {
  return records.sort((recordA, recordB) => {
    if (recordA.rating === recordB.rating) {
      return recordA.totalGames < recordB.totalGames ? 1 : -1;
    }
    return recordA.rating < recordB.rating ? 1 : -1;
  });
};

const sortRecordsByWinrate = (
  records: DeckMatchupRecord[] | IndividualDeckRecord[]
) => {
  return records.sort((recordA, recordB) => {
    if (recordA.winPercentage === recordB.winPercentage)
      return recordA.totalGames < recordB.totalGames ? 1 : -1;
    return recordA.winPercentage < recordB.winPercentage ? 1 : -1;
  });
};

const sortRecordsByTotalGames = (
  records: DeckMatchupRecord[] | IndividualDeckRecord[]
) =>
  records.sort((recordA, recordB) =>
    recordA.totalGames < recordB.totalGames ? 1 : -1
  );

type SortRecordsArgs =
  | {
      recordsWithPercentages: DeckMatchupRecord[];
      order: DeckMatchupOrder;
    }
  | {
      recordsWithPercentages: IndividualDeckRecord[];
      order: IndividualDeckOrder;
    };

const sortRecords = ({ recordsWithPercentages, order }: SortRecordsArgs) => {
  if (order === "alphabetical") {
    return sortRecordsAlphabetically(recordsWithPercentages);
  }
  if (order === "rating") {
    return sortRecordsByRating(recordsWithPercentages);
  }
  if (order === "winrate") {
    return sortRecordsByWinrate(recordsWithPercentages);
  }
  if (order === "totalGames") {
    return sortRecordsByTotalGames(recordsWithPercentages);
  }
  return recordsWithPercentages;
};

export default sortRecords;
