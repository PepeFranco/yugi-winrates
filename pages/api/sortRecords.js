const sortRecords = ({ recordsWithPercentages, order }) => {
  if (order === "alphabetical") {
    return recordsWithPercentages.sort((recordA, recordB) =>
      recordA.opponentDeckName < recordB.opponentDeckName ? -1 : 1
    );
  }
  if (order === "rating") {
    return recordsWithPercentages.sort((recordA, recordB) => {
      if (recordA.totalGames === 0 && recordB.totalGames > 0) return 1;
      if (recordB.totalGames === 0 && recordA.totalGames > 0) return -1;
      return recordA.rating < recordB.rating ? -1 : 1;
    });
  }
  if (order === "winrate") {
    return recordsWithPercentages.sort((recordA, recordB) => {
      if (recordA.totalGames === 0 && recordB.totalGames > 0) return 1;
      if (recordB.totalGames === 0 && recordA.totalGames > 0) return -1;
      return recordA.winPercentage < recordB.winPercentage ? -1 : 1;
    });
  }
  return recordsWithPercentages;
};

export default sortRecords;
