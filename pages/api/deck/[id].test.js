jest.mock("../aws", () => ({ docClient: { scan: jest.fn() } }));

import decks from "../../../decks";
import getDeckRecords from "./[id].page";
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

it("gets records from structure database", async () => {
  //arrange
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: [] });
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
      expect(docClient.scan).toHaveBeenCalledWith(
        {
          FilterExpression: "winner = :id",
          ExpressionAttributeValues: {
            ":id": "SD1",
          },
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
  app.get("/", getDeckRecords);

  //act
  await supertest(app)
    .get("/")
    .query({ id: "SGX1-ENS05" })
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(docClient.scan).toHaveBeenCalledWith(
        {
          FilterExpression: "winner = :id",
          ExpressionAttributeValues: {
            ":id": "SGX1-ENS05",
          },
          TableName: "yugi-winrates-speed",
        },
        expect.anything()
      );
    });
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
          year: 2005,
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
            year: 2005,
            opponentDeckCode: "SD2",
            opponentDeckName: "Zombie Madness",
            opponentDeckColor: "#B57EDC",
            opponentDeckYear: 2005,
            wins: 3,
            losses: 1,
            totalGames: 4,
            winPercentage: 75,
            lossPercentage: 25,
            rating: 75,
            type: "structure",
          },
          {
            deckCode: "SD1",
            deckName: "Dragon's Roar",
            deckColor: "#50C878",
            year: 2005,
            opponentDeckCode: "SD3",
            opponentDeckName: "Blaze of Destruction",
            opponentDeckColor: "#CD5C5C",
            opponentDeckYear: 2005,
            wins: 0,
            losses: 0,
            totalGames: 0,
            winPercentage: 0,
            lossPercentage: 0,
            rating: 0,
            type: "structure",
          },
        ]),
      });
    });
});

it("returns records for each other opponent deck", async () => {
  //arrange
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: [] });
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
      const structureDecks = decks.filter((deck) => deck.type === "structure");
      expect(res.body.records.length).toEqual(structureDecks.length - 1);
    });
});
