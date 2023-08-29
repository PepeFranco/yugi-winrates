jest.mock("../aws", () => ({ docClient: { scan: jest.fn() } }));

import getDeckRecords from "./[id]";
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
  app.get("/", getDeckRecords);
  //act
  await supertest(app).get("/").query({ id: "SD1" }).expect(500);
});
