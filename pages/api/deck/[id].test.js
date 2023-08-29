jest.mock("../aws", () => ({ docClient: { scan: jest.fn() } }));

import getDeckRecords from "./[id]";
import { docClient } from "../aws";
import _ from "lodash";
import supertest from "supertest";
import express from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

it("returns 500 if first scan fails", async () => {
  //arrange
  docClient.scan.mockImplementation((__params, callback) => {
    callback("fake error");
  });
  const app = express();
  app.get("/", getDeckRecords);
  //act
  await supertest(app).get("/").query({ id: "SD1" }).expect(500);
  expect(docClient.scan).toHaveBeenCalledTimes(1);
});

it("returns 500 if second scan fails", async () => {
  //arrange
  docClient.scan
    .mockImplementationOnce((params, callback) => {
      callback(null, { Items: [] });
    })
    .mockImplementation((__params, callback) => {
      callback("fake error");
    });
  const app = express();
  app.get("/", getDeckRecords);
  //act
  await supertest(app).get("/").query({ id: "SD1" }).expect(500);
  expect(docClient.scan).toHaveBeenCalledTimes(2);
});

it("returns empty records if no deck", async () => {
  //arrange
  const app = express();
  app.get("/", getDeckRecords);

  //act
  await supertest(app)
    .get("/")
    .query({ id: "SDXX" })
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).toEqual({
        deck: undefined,
        records: [],
      });
    });
});

it("returns records if they exist", async () => {
  //arrange
  const winnerRecords = [
    { id: "2", winner: "SD1", loser: "SD2" },
    { id: "3", winner: "SD1", loser: "SD2" },
    { id: "3", winner: "SD1", loser: "SD2" },
  ];
  const loserRecords = [{ id: "1", winner: "SD2", loser: "SD1" }];
  docClient.scan
    .mockImplementationOnce((params, callback) => {
      callback(null, { Items: winnerRecords });
    })
    .mockImplementationOnce((params, callback) => {
      callback(null, { Items: loserRecords });
    });
  const app = express();
  app.get("/", getDeckRecords);

  //act
  await supertest(app)
    .get("/")
    .query({ id: "SD1" })
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).toEqual({
        deck: {
          code: "SD1",
          color: "#50C878",
          name: "Dragon's Roar",
          type: "structure",
        },
        records: expect.arrayContaining([
          {
            deckCode: "SD1",
            deckName: "Dragon's Roar",
            deckColor: "#50C878",
            opponentDeckCode: "SD2",
            opponentDeckName: "Zombie Madness",
            opponentDeckColor: "#B57EDC",
            wins: 3,
            losses: 1,
            totalGames: 4,
            winPercentage: 75,
            lossPercentage: 25,
            rating: 75,
            type: "structure",
          },
        ]),
      });
    });
});
