import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import IDonationRequest from "../../../interfaces/donations.interface";

describe("/donations", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source Initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /donations -> Must be able to create a donation", async () => {
    //  const resultDonation = await request(app).post("/donations").send(exemplo);
    // expect(resultDonation.status).toBe(201);
  });
});
