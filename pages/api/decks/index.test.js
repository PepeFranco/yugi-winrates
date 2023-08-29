jest.mock("../aws", () => ({ docClient: { scan: jest.fn() } }));

import decks from "../../../decks";
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

it("returns deck with no records if skipRecords is true", async () => {
  //arrange
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: [] });
  });
  const app = express();
  app.get("/", getDecks);

  //act
  await supertest(app)
    .get("/")
    .query({ skipRecords: "true" })
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      const structureDecks = decks.filter((deck) => deck.type === "structure");
      expect(res.body.length).toEqual(structureDecks.length);
      expect(res.body).toEqual(
        expect.arrayContaining([
          {
            deckCode: "SD2",
            deckName: "Zombie Madness",
            deckColor: "#B57EDC",
            wins: 0,
            winPercentage: 0,
            lossPercentage: 0,
            losses: 0,
            totalGames: 0,
            type: "structure",
          },
        ])
      );
    });
});

it("returns decks with no records if no items in db", async () => {
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
      const structureDecks = decks.filter((deck) => deck.type === "structure");
      expect(res.body.length).toEqual(structureDecks.length);
      expect(res.body).toEqual(
        expect.arrayContaining([
          {
            deckCode: "SD2",
            deckName: "Zombie Madness",
            deckColor: "#B57EDC",
            wins: 0,
            winPercentage: 0,
            lossPercentage: 0,
            losses: 0,
            totalGames: 0,
            type: "structure",
          },
        ])
      );
    });
});

it("returns decks with no records if no items in db", async () => {
  //arrange
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: undefined });
  });
  const app = express();
  app.get("/", getDecks);

  //act
  await supertest(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      const structureDecks = decks.filter((deck) => deck.type === "structure");
      expect(res.body.length).toEqual(structureDecks.length);
      expect(res.body).toEqual(
        expect.arrayContaining([
          {
            deckCode: "SD2",
            deckName: "Zombie Madness",
            deckColor: "#B57EDC",
            wins: 0,
            winPercentage: 0,
            lossPercentage: 0,
            losses: 0,
            totalGames: 0,
            type: "structure",
          },
        ])
      );
    });
});

it("transforms db items into record array", async () => {
  //arrange
  const sampleRecords = [
    { id: "1", winner: "SD2", loser: "SD1" },
    { id: "2", winner: "SD1", loser: "SD2" },
    { id: "3", winner: "SD3", loser: "SD1" },
    { id: "4", winner: "SD2", loser: "SD3" },
    { id: "5", winner: "SD1", loser: "SD2" },
    { id: "5", winner: "SD2", loser: "SD1" },
    { id: "5", winner: "SD5", loser: "SD4" },
    { id: "5", winner: "SD6", loser: "SD4" },
  ];
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: sampleRecords });
  });
  const app = express();
  app.get("/", getDecks);

  //act
  await supertest(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).toEqual(
        expect.arrayContaining([
          {
            deckCode: "SD1",
            deckName: "Dragon's Roar",
            deckColor: "#50C878",
            wins: 2,
            losses: 3,
            totalGames: 5,
            winPercentage: 40,
            lossPercentage: 60,
            type: "structure",
          },
          {
            deckCode: "SD2",
            deckName: "Zombie Madness",
            deckColor: "#B57EDC",
            wins: 3,
            losses: 2,
            totalGames: 5,
            winPercentage: 60,
            lossPercentage: 40,
            type: "structure",
          },
          {
            deckCode: "SD3",
            deckName: "Blaze of Destruction",
            deckColor: "#CD5C5C",
            wins: 1,
            losses: 1,
            totalGames: 2,
            winPercentage: 50,
            lossPercentage: 50,
            type: "structure",
          },
          {
            deckCode: "SD4",
            deckName: "Fury from the Deep",
            deckColor: "#81D8D0",
            wins: 0,
            losses: 2,
            totalGames: 2,
            winPercentage: 0,
            lossPercentage: 100,
            type: "structure",
          },
          {
            deckCode: "SD5",
            deckName: "Warrior's Triumph",
            deckColor: "#FF9966",
            wins: 1,
            losses: 0,
            totalGames: 1,
            winPercentage: 100,
            lossPercentage: 0,
            type: "structure",
          },
          {
            deckCode: "SD6",
            deckName: "Spellcaster's Judgment",
            deckColor: "#FADFAD",
            wins: 1,
            losses: 0,
            totalGames: 1,
            winPercentage: 100,
            lossPercentage: 0,
            type: "structure",
          },
        ])
      );
    });
});
