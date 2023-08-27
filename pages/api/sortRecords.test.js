import sortRecords from "./sortRecords";
const sampleRecords = [
  {
    deckCode: "SD3",
    deckName: "Blaze of Destruction",
    opponentDeckCode: "SD6",
    opponentDeckName: "Spellcaster's Judgment",
    wins: 0,
    losses: 0,
    totalGames: 0,
    winPercentage: 0,
    lossPercentage: 0,
    rating: 0,
  },
  {
    deckCode: "SD3",
    deckName: "Blaze of Destruction",
    opponentDeckCode: "SD7",
    opponentDeckName: "Invincible Fortress",
    wins: 0,
    losses: 0,
    totalGames: 0,
    winPercentage: 0,
    lossPercentage: 0,
    rating: 0,
  },
  {
    deckCode: "SD3",
    deckName: "Blaze of Destruction",
    opponentDeckCode: "SD8",
    opponentDeckName: "Lord of the Storm",
    wins: 0,
    losses: 0,
    totalGames: 0,
    winPercentage: -1,
    lossPercentage: 0,
    rating: 0,
  },
];

describe("alphabetical", () => {
  const order = "alphabetical";
  it("sorts based on opponent name", () => {
    const recordsWithPercentages = [
      {
        opponentDeckName: "Spellcaster's Judgment",
      },
      {
        opponentDeckName: "Zombie Madness",
      },
      {
        opponentDeckName: "Dinosaur's Rage",
      },
    ];
    const result = [
      {
        opponentDeckName: "Dinosaur's Rage",
      },
      {
        opponentDeckName: "Spellcaster's Judgment",
      },
      {
        opponentDeckName: "Zombie Madness",
      },
    ];
    expect(sortRecords({ recordsWithPercentages, order })).toEqual(result);
  });

  it("sorts based on deck name if no opponents deck name", () => {
    const recordsWithPercentages = [
      {
        deckName: "Spellcaster's Judgment",
      },
      {
        deckName: "Zombie Madness",
      },
      {
        deckName: "Dinosaur's Rage",
      },
    ];
    const result = [
      {
        deckName: "Dinosaur's Rage",
      },
      {
        deckName: "Spellcaster's Judgment",
      },
      {
        deckName: "Zombie Madness",
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
