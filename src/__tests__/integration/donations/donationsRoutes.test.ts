import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { IDonationRequest } from "../../../interfaces/donations.interface";
import {
  donationMock,
  donationMockNo2,
  donationMockNo3,
  donationMockNo4,
  donationMockNo5,
  expiratedDonationMock,
} from "../../mocks/donationsRoutes.mocks";
import {
  userAdmDonorData,
  userAdmDonorDataLogin,
  userNotAdmCharityData,
  userNotAdmDonorData,
  userNotAdmDonorDataLogin,
} from "../../mocks/userRoutes.mocks";
import { mockedClassification1 } from "../../mocks/classificationsTest.mocks";
import { Donation } from "../../../entities/donations.entity";

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
    const createAdmResponse = await request(app)
      .post("/users")
      .send(userAdmDonorData);

    const loginAdmResponse = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const response = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${loginAdmResponse.body.token}`)
      .send(mockedClassification1);
    donationMock.classification = response.body.id;

    const resultDonation = await request(app)
      .post("/donations")
      .send(donationMock)
      .set("Authorization", `Bearer ${loginAdmResponse.body.token}`);

    expect(resultDonation.status).toBe(201);

    expect(resultDonation.body).toHaveProperty("food");
    expect(resultDonation.body).toHaveProperty("quantity");
    expect(resultDonation.body).toHaveProperty("expiration");
    expect(resultDonation.body).toHaveProperty("classification");
    expect(resultDonation.body).toHaveProperty("id");
    expect(resultDonation.body).toHaveProperty("available");
    expect(resultDonation.body).toHaveProperty("createdAt");
    expect(resultDonation.body).toHaveProperty("updatedAt");

    expect(resultDonation.body.classification).toHaveProperty("id");
    expect(resultDonation.body.classification).toHaveProperty("name");

    expect(resultDonation.body).toHaveProperty("user");
    expect(resultDonation.body.user).toHaveProperty("id");
    expect(resultDonation.body.user).toHaveProperty("email");
    expect(resultDonation.body.user).toHaveProperty("name");
    expect(resultDonation.body.user).toHaveProperty("responsible");
    expect(resultDonation.body.user).toHaveProperty("contact");
    expect(resultDonation.body.user).toHaveProperty("type");
    expect(resultDonation.body.user).toHaveProperty("isAdm");
    expect(resultDonation.body.user).toHaveProperty("isActive");
    expect(resultDonation.body.user).toHaveProperty("id");

    expect(resultDonation.body.user.address).toHaveProperty("id");
    expect(resultDonation.body.user.address).toHaveProperty("address");
    expect(resultDonation.body.user.address).toHaveProperty("complement");
    expect(resultDonation.body.user.address).toHaveProperty("city");
    expect(resultDonation.body.user.address).toHaveProperty("state");
    expect(resultDonation.body.user.address).toHaveProperty("zipCode");
  });

  test("POST /donations -> Should not be able to create a donation without authetication", async () => {
    const resultDonation = await request(app)
      .post("/donations")
      .send(donationMock);
    expect(resultDonation.status).toBe(401);
    expect(resultDonation.body).toHaveProperty("message");
  });

  test("POST /donations -> Should not be able to create a donation with past expiration date", async () => {
    const loginAdmResponse = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const response = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${loginAdmResponse.body.token}`)
      .send(mockedClassification1);

    const resultDonation = await request(app)
      .post("/donations")
      .send(expiratedDonationMock)
      .set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
    expect(resultDonation.status).toBe(403);
    console.log(resultDonation.body);
    expect(resultDonation.body).toHaveProperty("message");
  });

  test("POST /donations -> Should not be able to create a donation with a charity type user", async () => {
    const createNotDonor = await request(app)
      .post("/users")
      .send(userNotAdmCharityData);

    const loginNotDonorResponse = await request(app)
      .post("/login")
      .send(userNotAdmDonorDataLogin);

    const resultDonation = await request(app)
      .post("/donations")
      .set("Authorization", `Bearer ${loginNotDonorResponse.body.token}`)
      .send(donationMockNo2);
    expect(resultDonation.status).toBe(401);
    expect(resultDonation.body).toHaveProperty("message");
  });

  test("POST /donations -> Should not be able to create a donation with incomplete information", async () => {
    const loginAdmResponse = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const resultDonation = await request(app)
      .post("/donations")
      .set("Authorization", `Bearer ${loginAdmResponse.body.token}`)
      .send(donationMockNo3);

    expect(resultDonation.status).toBe(403);
    expect(resultDonation.body).toHaveProperty("message");
  });

  test("POST /donations -> Should not be able to create donation with invalid classifications Id", async () => {
    const loginAdmResponse = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const resultDonation = await request(app)
      .post("/donations")
      .send(donationMockNo4)
      .set("Authorization", `Bearer ${loginAdmResponse.body.token}`);

    expect(resultDonation.status).toBe(404);
    expect(resultDonation.body).toHaveProperty("message");
  });

  test("GET /donations -> Should be able to list all donations", async () => {
    const result = await request(app).get("/donations");

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  test("GET /donations -> Must be able to show donation by id", async () => {
    const loginAdm = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const createDonationResponse = await request(app)
      .post("/donations")
      .send(donationMock)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const newDonationId = createDonationResponse.body.id;

    const result = await request(app).get(`/donations/${newDonationId}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("food");
  });

  test("GET /donations -> Should not be able to show donation by id with invalid id", async () => {
    const donationInvalidId = "62da0947-4c5a-46c6-8b4d-2cd4df7d1c89";
    const result = await request(app).get(`/donations/${donationInvalidId}`);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });
});
