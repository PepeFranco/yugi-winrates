import sortRecords from "./sortRecords";

describe("alphabetical", () => {
  const order = "alphabetical";
  it("sorts based on opponent name", () => {
    const recordsWithPercentages = [
      {
        opponentDeck: { name: "Spellcaster's Judgment" },
      },
      {
        opponentDeck: { name: "Zombie Madness" },
      },
      {
        opponentDeck: { name: "Dinosaur's Rage" },
      },
    ];
    const result = [
      {
        opponentDeck: { name: "Dinosaur's Rage" },
      },
      {
        opponentDeck: { name: "Spellcaster's Judgment" },
      },
      {
        opponentDeck: { name: "Zombie Madness" },
      },
    ];
    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });

  it("sorts based on deck name if no opponents deck name", () => {
    const recordsWithPercentages = [
      {
        deck: { name: "Spellcaster's Judgment" },
      },
      {
        deck: { name: "Zombie Madness" },
      },
      {
        deck: { name: "Dinosaur's Rage" },
      },
    ];
    const result = [
      {
        deck: { name: "Dinosaur's Rage" },
      },
      {
        deck: { name: "Spellcaster's Judgment" },
      },
      {
        deck: { name: "Zombie Madness" },
      },
    ];
    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });
});

describe("rating", () => {
  const order = "rating";
  it("sorts based on rating", () => {
    const recordsWithPercentages = [
      {
        rating: 50,
      },
      {
        rating: 100,
      },
      {
        rating: 0,
      },
    ];
    const result = [
      {
        rating: 100,
      },
      {
        rating: 50,
      },
      {
        rating: 0,
      },
    ];
    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });

  it("tie breaks with total games", () => {
    const recordsWithPercentages = [
      {
        rating: 50,
        totalGames: 10,
      },
      {
        rating: 100,
      },
      {
        rating: 50,
        totalGames: 5,
      },
    ];
    const result = [
      {
        rating: 100,
      },
      {
        rating: 50,
        totalGames: 10,
      },
      {
        rating: 50,
        totalGames: 5,
      },
    ];
    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });
});

describe("winrate", () => {
  const order = "winrate";
  it("sorts based on winrate", () => {
    const recordsWithPercentages = [
      {
        winPercentage: 32.3,
      },
      {
        winPercentage: 65.6,
      },
      {
        winPercentage: 49,
      },
    ];
    const result = [
      {
        winPercentage: 65.6,
      },
      {
        winPercentage: 49,
      },
      {
        winPercentage: 32.3,
      },
    ];
    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });

  it("tie breaks with total games", () => {
    const recordsWithPercentages = [
      {
        winPercentage: 32.3,
        totalGames: 9,
      },
      {
        winPercentage: 65.6,
      },
      {
        winPercentage: 32.3,
        totalGames: 4,
      },
    ];
    const result = [
      {
        winPercentage: 65.6,
      },
      {
        winPercentage: 32.3,
        totalGames: 9,
      },
      {
        winPercentage: 32.3,
        totalGames: 4,
      },
    ];
    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });

  it("puts records with games above records with no games", () => {
    const recordsWithPercentages = [
      {
        winPercentage: -1,
        totalGames: 9,
      },
      {
        winPercentage: 65.6,
        totalGames: 2,
      },
      {
        winPercentage: -1,
        totalGames: -1,
      },
    ];
    const result = [
      {
        winPercentage: 65.6,
        totalGames: 2,
      },
      {
        winPercentage: -1,
        totalGames: 9,
      },
      {
        winPercentage: -1,
        totalGames: -1,
      },
    ];

    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });
});

describe("totalGames", () => {
  const order = "totalGames";
  it("sorts based on totalGames", () => {
    const recordsWithPercentages = [
      {
        totalGames: 10,
      },
      {
        totalGames: 20,
      },
      {
        totalGames: 5,
      },
    ];
    const result = [
      {
        totalGames: 20,
      },
      {
        totalGames: 10,
      },
      {
        totalGames: 5,
      },
    ];
    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });
});

it("does not sort if not a valid order argument", () => {
  const recordsWithPercentages = [
    {
      totalGames: 10,
    },
    {
      totalGames: 20,
    },
    {
      totalGames: 5,
    },
  ];
  expect(sortRecords({ recordsWithPercentages, order: "not valid" })).toEqual(
    recordsWithPercentages
  );
});
