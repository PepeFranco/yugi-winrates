jest.mock("../aws", () => ({ docClient: { scan: jest.fn() } }));

import getRecords from "./index";
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
  app.get("/", getRecords);

  //act
  await supertest(app).get("/").expect(500);
});

it("transforms DB Items to Records Array with Percentages", async () => {
  //arrange
  const sampleRecords = [
    { id: "1", winner: "SD2", loser: "SD1" },
    { id: "2", winner: "SD1", loser: "SD2" },
    { id: "3", winner: "SD2", loser: "SD1" },
    { id: "4", winner: "SD3", loser: "SD1" },
    { id: "5", winner: "SD1", loser: "SD3" },
  ];
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: sampleRecords });
  });
  const app = express();
  app.get("/", getRecords);

  //act
  await supertest(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).toEqual([
        {
          deckCode: "SD2",
          deckName: "Zombie Madness",
          deckColor: "#B57EDC",
          opponentDeckCode: "SD1",
          opponentDeckName: "Dragon's Roar",
          opponentDeckColor: "#50C878",
          wins: 2,
          losses: 0,
          totalGames: 2,
          winPercentage: 100,
          lossPercentage: 0,
          rating: 50,
        },
        {
          deckCode: "SD3",
          deckName: "Blaze of Destruction",
          deckColor: "#CD5C5C",
          opponentDeckCode: "SD1",
          opponentDeckName: "Dragon's Roar",
          opponentDeckColor: "#50C878",
          wins: 1,
          losses: 0,
          totalGames: 1,
          winPercentage: 100,
          lossPercentage: 0,
          rating: 50,
        },
        {
          deckCode: "SD1",
          deckName: "Dragon's Roar",
          deckColor: "#50C878",
          opponentDeckCode: "SD3",
          opponentDeckName: "Blaze of Destruction",
          opponentDeckColor: "#CD5C5C",
          wins: 1,
          losses: 0,
          totalGames: 1,
          winPercentage: 100,
          lossPercentage: 0,
          rating: 50,
        },
        {
          deckCode: "SD1",
          deckName: "Dragon's Roar",
          deckColor: "#50C878",
          opponentDeckCode: "SD2",
          opponentDeckName: "Zombie Madness",
          opponentDeckColor: "#B57EDC",
          wins: 1,
          losses: 0,
          totalGames: 1,
          winPercentage: 100,
          lossPercentage: 0,
          rating: 50,
        },
      ]);
    });
});
