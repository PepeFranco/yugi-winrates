export const sortAlphabetical = (decks) =>
  decks.sort((deckA, deckB) => deckA.name > deckB.name).slice();

export const sortBalanced = (decks, records) =>
  decks
    .sort((deckA, deckB) => {
      const winsA = records[deckA.code]?.wins || 0;
      const lossesA = records[deckA.code]?.losses || 0;
      const totalGamesA = winsA + lossesA;
      const winPercentageA = (winsA * 100) / totalGamesA;
      const percentageAwayFrom50A = Math.abs(winPercentageA - 50);
      const ratingA = totalGamesA / percentageAwayFrom50A;

      const winsB = records[deckB.code]?.wins || 0;
      const lossesB = records[deckB.code]?.losses || 0;
      const totalGamesB = winsB + lossesB;
      const winPercentageB = (winsB * 100) / totalGamesB;
      const percentageAwayFrom50B = Math.abs(winPercentageB - 50);
      const ratingB = totalGamesB / percentageAwayFrom50B;

      if (totalGamesA === 0 && totalGamesB > 0) return 1;
      if (totalGamesA > 0 && totalGamesB === 0) return -1;
      return ratingA < ratingB;
    })
    .slice();

export const sortWinrate = (decks, records) =>
  decks
    .sort((deckA, deckB) => {
      const winsA = records[deckA.code]?.wins || 0;
      const lossesA = records[deckA.code]?.losses || 0;
      const totalGamesA = winsA + lossesA;
      const winPercentageA = (winsA * 100) / totalGamesA;

      const winsB = records[deckB.code]?.wins || 0;
      const lossesB = records[deckB.code]?.losses || 0;
      const totalGamesB = winsB + lossesB;
      const winPercentageB = (winsB * 100) / totalGamesB;

      if (totalGamesA === 0 && totalGamesB > 0) return 1;
      if (totalGamesA > 0 && totalGamesB === 0) return -1;
      return winPercentageA < winPercentageB;
    })
    .slice();
