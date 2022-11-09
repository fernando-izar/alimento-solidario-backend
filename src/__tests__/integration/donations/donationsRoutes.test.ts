import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { IDonationRequest } from "../../../interfaces/donations.interface";
import {
  donationMock,
  donationMock6,
  donationMock7,
  donationMock8,
  donationMock9,
  donationMockNo2,
  donationMockNo3,
  donationMockNo4,
  donationMockNo5,
  expiratedDonationMock,
  updateDonationMock,
} from "../../mocks/donationsRoutes.mocks";
import {
  userAdmCharityData,
  userAdmCharityDataSession,
  userAdmDonorData,
  userAdmDonorDataLogin,
  userLoginDonor,
  userLoginDonorSession,
  userNotAdmCharityData,
  userNotAdmDonorData,
  userNotAdmDonorDataLogin,
  userTestDonorData,
} from "../../mocks/userRoutes.mocks";
import {
  mockedClassification1,
  mockedClassification4,
  mockedClassification5,
  mockedClassification6,
  mockedClassification7,
} from "../../mocks/classificationsTest.mocks";
import { Donation } from "../../../entities/donations.entity";
import { create } from "domain";

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

  test("DELETE /donations/:id -> Must be able to delete donation", async () => {
    const loginAdm = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const donation = await request(app)
      .get("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const response = await request(app)
      .delete(`/donations/${donation.body[0].id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const findDonation = await request(app)
      .get("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const donationNotDeleted = findDonation.body.some(
      (d: any) => d.id === donation.body[0].id
    );

    expect(response.status).toBe(204);
    expect(donationNotDeleted).toBe(false);
  });

  test("DELETE /donations/:id -> Should not be able to delete donations without authentications", async () => {
    const loginAdm = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const donations = await request(app)
      .get("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const response = await request(app).delete(
      `/donations/${donations.body[0].id}`
    );

    const findDonation = await request(app)
      .get("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const donationNotDeleted = findDonation.body.some(
      (d: any) => d.id === donations.body[0].id
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(donationNotDeleted).toBe(true);
  });

  test("DELETE /donations/:id -> Should not be able to delete donation if user is not the donation creator", async () => {
    const createdAdm = await request(app).post("/users").send(userLoginDonor);

    const loginAdm = await request(app)
      .post("/login")
      .send(userLoginDonorSession);

    const createClassification = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(mockedClassification4);
    donationMock6.classification = createClassification.body.id;

    const createdDonation = await request(app)
      .post("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(donationMock6);

    const loginDonorNotCreator = await request(app)
      .post("/login")
      .send(userAdmDonorData);

    const response = await request(app)
      .delete(`/donations/${createdDonation.body.id}`)
      .set("Authorization", `Bearer ${loginDonorNotCreator.body.token}`);

    const notCreatorOfDonation =
      createdDonation.body.user.id !== loginDonorNotCreator.body.id;

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(notCreatorOfDonation).toBe(true);
  });

  test("DELETE /donations/:id -> Should not be able to delete donation if the donation is not available", async () => {
    const createdAdm = await request(app).post("/users").send(userLoginDonor);

    const loginAdm = await request(app)
      .post("/login")
      .send(userLoginDonorSession);

    const createClassification = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(mockedClassification5);
    donationMock7.classification = createClassification.body.id;

    const createdDonation = await request(app)
      .post("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(donationMock7);

    const createCharity = await request(app)
      .post("/users")
      .send(userAdmCharityData);

    const charityLogin = await request(app)
      .post("/login")
      .send(userAdmCharityDataSession);

    const createReservation = await request(app)
      .post(`/reservations/${createdDonation.body.id}`)
      .set("Authorization", `Bearer ${charityLogin.body.token}`);

    await request(app).get("/donations");

    const response = await request(app)
      .delete(`/donations/${createdDonation.body.id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const donations = await request(app)
      .get("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const donationIsAvailable = donations.body.find(
      (donation: any) => donation.id == createdDonation.body.id
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(donationIsAvailable.available).toBe(false);
  });

  test("PATCH /donations/:id -> Should not be able to update donations without authentication", async () => {
    const loginAdm = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const createClassification = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(mockedClassification6);
    donationMock8.classification = createClassification.body.id;

    const donations = await request(app)
      .post("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(donationMock8);

    const response = await request(app)
      .patch(`/donations/${donations.body.id}`)
      .send(updateDonationMock);

    const findDonation = await request(app)
      .get(`/donations/${donations.body.id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const donationUpdated =
      findDonation.body.food !== donations.body.food ||
      findDonation.body.quantity !== donations.body.quantity ||
      findDonation.body.available !== donations.body.available;

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(donationUpdated).toBe(false);
  });

  test("PATCH /donations/:id -> Should not be able to update donation id", async () => {
    const loginAdm = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const createClassification = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(mockedClassification7);
    donationMock9.classification = createClassification.body.id;

    const donations = await request(app)
      .post("/donations")
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(donationMock9);

    const fakeId = "fake-id-123456";

    const response = await request(app)
      .patch(`/donations/${donations.body.id}`)
      .send({
        id: fakeId,
      });

    const findDonation = await request(app)
      .get(`/donations/${donations.body.id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const donationUpdated = fakeId === donations.body.id;

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(donationUpdated).toBe(false);
  });

  test("PATCH /donations/:id -> Should not be able to update donation expiration", async () => {
    const loginAdm = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const donations = await request(app).get("/donations");

    const fakeExpiration = "31/12/2023";
    const response = await request(app)
      .patch(`/donations/${donations.body[0].id}`)
      .send({
        expiration: fakeExpiration,
      });

    const findDonation = await request(app)
      .get(`/donations/${donations.body.id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const donationUpdated = fakeExpiration === donations.body[0].expiration;

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(donationUpdated).toBe(false);
  });

  test("PATCH /donations/:id -> Must be able to update donation", async () => {
    const loginAdm = await request(app)
      .post("/login")
      .send(userAdmDonorDataLogin);

    const donations = await request(app).get("/donations");

    const response = await request(app)
      .patch(`/donations/${donations.body[0].id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`)
      .send(updateDonationMock);

    const findDonation = await request(app)
      .get(`/donations/${donations.body[0].id}`)
      .set("Authorization", `Bearer ${loginAdm.body.token}`);

    const donationUpdated =
      findDonation.body.food === updateDonationMock.food &&
      findDonation.body.quantity === updateDonationMock.quantity &&
      findDonation.body.available === updateDonationMock.available;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("food");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("expiration");
    expect(response.body).toHaveProperty("available");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("classification");
    expect(donationUpdated).toBe(true);
  });
});
