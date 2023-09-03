jest.mock("../aws", () => ({ docClient: { scan: jest.fn() } }));

import getRecords from "./index.page";
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

it("gets records from structure database", async () => {
  //arrange
  docClient.scan.mockImplementation((params, callback) => {
    callback(null, { Items: [] });
  });
  const app = express();
  app.get("/", getRecords);

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
  app.get("/", getRecords);

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
  app.get("/", getRecords);

  //act
  await supertest(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).toEqual([
        {
          deck: {
            code: "SD2",
            color: "#B57EDC",
            name: "Zombie Madness",
            year: 2005,
            month: 0,
            type: "structure",
          },
          opponentDeck: {
            code: "SD1",
            color: "#50C878",
            name: "Dragon's Roar",
            year: 2005,
            month: 0,
            type: "structure",
          },
          lossPercentage: 50,
          losses: 2,
          rating: 100,
          totalGames: 4,
          winPercentage: 50,
          wins: 2,
        },
        {
          deck: {
            code: "SD6",
            color: "#FADFAD",
            name: "Spellcaster's Judgment",
            year: 2006,
            month: 0,
            type: "structure",
          },
          opponentDeck: {
            code: "SD4",
            color: "#81D8D0",
            name: "Fury from the Deep",
            year: 2005,
            month: 4,
            type: "structure",
          },
          lossPercentage: 0,
          losses: 0,
          rating: 50,
          totalGames: 1,
          winPercentage: 100,
          wins: 1,
        },
        {
          deck: {
            code: "SD5",
            color: "#FF9966",
            name: "Warrior's Triumph",
            year: 2005,
            month: 9,
            type: "structure",
          },
          opponentDeck: {
            code: "SD4",
            color: "#81D8D0",
            name: "Fury from the Deep",
            year: 2005,
            month: 4,
            type: "structure",
          },
          lossPercentage: 0,
          losses: 0,
          rating: 50,
          totalGames: 1,
          winPercentage: 100,
          wins: 1,
        },
        {
          deck: {
            code: "SD3",
            color: "#CD5C5C",
            name: "Blaze of Destruction",
            year: 2005,
            month: 4,
            type: "structure",
          },
          opponentDeck: {
            code: "SD1",
            color: "#50C878",
            name: "Dragon's Roar",
            year: 2005,
            month: 0,
            type: "structure",
          },
          lossPercentage: 0,
          losses: 0,
          rating: 50,
          totalGames: 1,
          winPercentage: 100,
          wins: 1,
        },
        {
          deck: {
            code: "SD2",
            color: "#B57EDC",
            name: "Zombie Madness",
            year: 2005,
            month: 0,
            type: "structure",
          },
          opponentDeck: {
            code: "SD3",
            color: "#CD5C5C",
            name: "Blaze of Destruction",
            year: 2005,
            month: 4,
            type: "structure",
          },
          lossPercentage: 0,
          losses: 0,
          rating: 50,
          totalGames: 1,
          winPercentage: 100,
          wins: 1,
        },
      ]);
    });
});

it("puts winners on the left", async () => {
  //arrange
  const sampleRecords = [
    { id: "1", winner: "SD2", loser: "SD1" },
    { id: "2", winner: "SD1", loser: "SD2" },
    { id: "3", winner: "SD1", loser: "SD2" },
    { id: "3", winner: "SD1", loser: "SD2" },
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
          deck: {
            code: "SD1",
            name: "Dragon's Roar",
            color: "#50C878",
            year: 2005,
            month: 0,
            type: "structure",
          },
          opponentDeck: {
            code: "SD2",
            name: "Zombie Madness",
            color: "#B57EDC",
            year: 2005,
            month: 0,
            type: "structure",
          },
          wins: 3,
          losses: 1,
          totalGames: 4,
          winPercentage: 75,
          lossPercentage: 25,
          rating: 75,
        },
      ]);
    });
});
