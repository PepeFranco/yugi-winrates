const hasOpponent = (record) => Boolean(record.opponentDeckName);

const sortRecordsAlphabetically = (records) =>
  records.sort((recordA, recordB) =>
    hasOpponent(recordA) && hasOpponent(recordB)
      ? recordA.opponentDeckName.localeCompare(recordB.opponentDeckName)
      : recordA.deckName.localeCompare(recordB.deckName)
  );

const sortRecordsByRating = (records) => {
  return records.sort((recordA, recordB) => {
    if (recordA.rating === recordB.rating) {
      return recordA.totalGames < recordB.totalGames ? 1 : -1;
    }
    return recordA.rating < recordB.rating ? 1 : -1;
  });
};

const sortRecordsByWinrate = (records) => {
  return records.sort((recordA, recordB) => {
    if (recordA.winPercentage === recordB.winPercentage)
      return recordA.totalGames < recordB.totalGames ? 1 : -1;
    return recordA.winPercentage < recordB.winPercentage ? 1 : -1;
  });
};

const sortRecordsByTotalGames = (records) =>
  records.sort((recordA, recordB) =>
    recordA.totalGames < recordB.totalGames ? 1 : -1
  );

const sortRecords = ({ recordsWithPercentages, order }) => {
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
