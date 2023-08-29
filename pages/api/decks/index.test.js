jest.mock("../aws", () => ({ docClient: { scan: jest.fn() } }));

import getDecks from "./index";
import { docClient } from "../aws";
import _ from "lodash";
import supertest from "supertest";
import express from "express";

it("returns 500 if scan fails", async () => {
  //arrange
  docClient.scan.mockImplementation((__params, callback) => {
    callback("fake error");
  });
  const app = express();
  app.get("/", getDecks);

  //act
  await supertest(app).get("/").expect(500);
});

it("gets records from structure database", async () => {
  //arrange
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: [] });
  });
  const app = express();
  app.get("/", getDecks);

  //act
  await supertest(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(docClient.scan).toHaveBeenCalledWith(
        {
          TableName: "yugi-winrates",
        },
        expect.anything()
      );
    });
});

it("gets records from speed duel database", async () => {
  //arrange
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: [] });
  });
  const app = express();
  app.get("/", getDecks);

  //act
  await supertest(app)
    .get("/")
    .query({ type: "speed" })
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(docClient.scan).toHaveBeenCalledWith(
        {
          TableName: "yugi-winrates-speed",
        },
        expect.anything()
      );
    });
});

// it("transforms db items into record array", async () => {
//   //arrange
//   const sampleRecords = [
//     { id: "1", winner: "SD2", loser: "SD1" },
//     { id: "2", winner: "SD1", loser: "SD2" },
//     { id: "3", winner: "SD3", loser: "SD1" },
//     { id: "4", winner: "SD2", loser: "SD3" },
//     { id: "5", winner: "SD1", loser: "SD2" },
//     { id: "5", winner: "SD2", loser: "SD1" },
//     { id: "5", winner: "SD5", loser: "SD4" },
//     { id: "5", winner: "SD6", loser: "SD4" },
//   ];
//   docClient.scan.mockImplementation((params, callback) => {
//     callback(null, { Items: sampleRecords });
//   });
//   const app = express();
//   app.get("/", getRecords);

//   //act
//   await supertest(app)
//     .get("/")
//     .expect(200)
//     .expect("Content-Type", /json/)
//     .then((res) => {
//       expect(res.body).toEqual([
//         {
//           deckCode: "SD2",
//           deckColor: "#B57EDC",
//           deckName: "Zombie Madness",
//           lossPercentage: 50,
//           losses: 2,
//           opponentDeckCode: "SD1",
//           opponentDeckColor: "#50C878",
//           opponentDeckName: "Dragon's Roar",
//           rating: 100,
//           totalGames: 4,
//           winPercentage: 50,
//           wins: 2,
//           type: "structure",
//         },
//         {
//           deckCode: "SD6",
//           deckColor: "#FADFAD",
//           deckName: "Spellcaster's Judgment",
//           lossPercentage: 0,
//           losses: 0,
//           opponentDeckCode: "SD4",
//           opponentDeckColor: "#81D8D0",
//           opponentDeckName: "Fury from the Deep",
//           rating: 50,
//           totalGames: 1,
//           winPercentage: 100,
//           wins: 1,
//           type: "structure",
//         },
//         {
//           deckCode: "SD5",
//           deckColor: "#FF9966",
//           deckName: "Warrior's Triumph",
//           lossPercentage: 0,
//           losses: 0,
//           opponentDeckCode: "SD4",
//           opponentDeckColor: "#81D8D0",
//           opponentDeckName: "Fury from the Deep",
//           rating: 50,
//           totalGames: 1,
//           winPercentage: 100,
//           wins: 1,
//           type: "structure",
//         },
//         {
//           deckCode: "SD3",
//           deckColor: "#CD5C5C",
//           deckName: "Blaze of Destruction",
//           lossPercentage: 0,
//           losses: 0,
//           opponentDeckCode: "SD1",
//           opponentDeckColor: "#50C878",
//           opponentDeckName: "Dragon's Roar",
//           rating: 50,
//           totalGames: 1,
//           winPercentage: 100,
//           wins: 1,
//           type: "structure",
//         },
//         {
//           deckCode: "SD2",
//           deckColor: "#B57EDC",
//           deckName: "Zombie Madness",
//           lossPercentage: 0,
//           losses: 0,
//           opponentDeckCode: "SD3",
//           opponentDeckColor: "#CD5C5C",
//           opponentDeckName: "Blaze of Destruction",
//           rating: 50,
//           totalGames: 1,
//           winPercentage: 100,
//           wins: 1,
//           type: "structure",
//         },
//       ]);
//     });
// });

// it("puts winners on the left", async () => {
//   //arrange
//   const sampleRecords = [
//     { id: "1", winner: "SD2", loser: "SD1" },
//     { id: "2", winner: "SD1", loser: "SD2" },
//     { id: "3", winner: "SD1", loser: "SD2" },
//     { id: "3", winner: "SD1", loser: "SD2" },
//   ];
//   docClient.scan.mockImplementation((params, callback) => {
//     callback(null, { Items: sampleRecords });
//   });
//   const app = express();
//   app.get("/", getRecords);

//   //act
//   await supertest(app)
//     .get("/")
//     .expect(200)
//     .expect("Content-Type", /json/)
//     .then((res) => {
//       expect(res.body).toEqual([
//         {
//           deckCode: "SD1",
//           deckName: "Dragon's Roar",
//           deckColor: "#50C878",
//           opponentDeckCode: "SD2",
//           opponentDeckName: "Zombie Madness",
//           opponentDeckColor: "#B57EDC",
//           wins: 3,
//           losses: 1,
//           totalGames: 4,
//           winPercentage: 75,
//           lossPercentage: 25,
//           rating: 75,
//           type: "structure",
//         },
//       ]);
//     });
// });
