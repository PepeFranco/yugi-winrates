import getRecords, { transformDBItemsToRecordsArray } from "./index";
import colours from "../../data/colours.json";
import decks from "../../../decks";
import { docClient } from "../aws";
import _ from "lodash";

jest.mock("../aws", () => ({ docClient: { scan: jest.fn() } }));

const { purple, green, red, aqua } = colours.standard;

const sumTo = (n) => (n * (n + 1)) / 2;

const totalRecords = sumTo(decks.length - 1);

it("returns the correct number of possible records", () => {
  expect(transformDBItemsToRecordsArray([]).length).toEqual(totalRecords);
});

it("transforms DB Items to Records Array with Percentages", () => {
  const sampleRecords = [
    { id: "1596351183154", winner: "SD2", loser: "SD1" },
    { id: "1596937979871", winner: "SD1", loser: "SD2" },
    { id: "1595773811346", winner: "SD2", loser: "SD1" },
    { id: "1596351183155", winner: "SD3", loser: "SD1" },
    { id: "1596937979872", winner: "SD1", loser: "SD3" },
  ];
  const result = transformDBItemsToRecordsArray(sampleRecords);
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        deckCode: "SD2",
        deckName: "Zombie Madness",
        deckColor: purple,
        opponentDeckCode: "SD1",
        opponentDeckName: `Dragon's Roar`,
        opponentDeckColor: green,
        wins: 2,
        losses: 1,
        totalGames: 3,
        winPercentage: 200 / 3,
        lossPercentage: 100 / 3,
        rating: 100 - (200 / 3 - 50),
      }),
      expect.objectContaining({
        deckCode: "SD1",
        deckName: `Dragon's Roar`,
        deckColor: green,
        opponentDeckCode: "SD3",
        opponentDeckName: "Blaze of Destruction",
        opponentDeckColor: red,
        wins: 1,
        losses: 1,
        totalGames: 2,
        winPercentage: 50,
        lossPercentage: 50,
        rating: 100,
      }),
      expect.objectContaining({
        deckCode: "SD3",
        deckName: `Blaze of Destruction`,
        deckColor: red,
        opponentDeckCode: "SD4",
        opponentDeckName: "Fury from the Deep",
        opponentDeckColor: aqua,
        wins: 0,
        losses: 0,
        totalGames: 0,
        winPercentage: 0,
        lossPercentage: 0,
        rating: 0,
      }),
    ])
  );
});

it("returns 500 if scan fails", () => {
  //arrange
  docClient.scan.mockImplementation((params, callback) => {
    callback("fake error");
  });
  const res = { end: jest.fn(), send: jest.fn() };

  //act
  const result = getRecords({ query: {} }, res);

  //assert
  expect(res.statusCode).toEqual(500);
  expect(res.end).toHaveBeenCalled();
  expect(res.end).toHaveBeenCalled();
});
