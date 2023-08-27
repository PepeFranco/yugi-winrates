import {
  DeckMatchupRecord,
  IndividualDeckRecord,
  IndividualDeckOrder,
  DeckMatchupOrder,
} from "../../types";

import _ from "lodash";

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
  switch (order) {
    case "alphabetical":
      return _.sortBy(recordsWithPercentages, ["opponentDeckName", "deckName"]);
    case "rating":
      return _.reverse(
        _.sortBy(recordsWithPercentages, ["rating", "totalGames"])
      );
    case "winrate":
      return _.reverse(
        _.sortBy(recordsWithPercentages, ["winPercentage", "totalGames"])
      );
    case "totalGames":
      return _.reverse(_.sortBy(recordsWithPercentages, ["totalGames"]));
    default:
      return recordsWithPercentages;
  }
};

export default sortRecords;
