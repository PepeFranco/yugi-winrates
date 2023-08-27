import {
  DeckMatchupRecord,
  IndividualDeckRecord,
  IndividualDeckOrder,
  DeckMatchupOrder,
} from "../../types";

import _ from "lodash";

const sortRecordsAlphabetically = (
  records: DeckMatchupRecord[] | IndividualDeckRecord[]
) => {
  return _.sortBy(records, ["opponentDeckName", "deckName"]);
};

const sortRecordsByRating = (
  records: DeckMatchupRecord[] | IndividualDeckRecord[]
) => {
  return _.reverse(_.sortBy(records, ["rating", "totalGames"]));
};

const sortRecordsByWinrate = (
  records: DeckMatchupRecord[] | IndividualDeckRecord[]
) => {
  return _.reverse(_.sortBy(records, ["winPercentage", "totalGames"]));
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
