import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedClassification1,
  mockedClassification2,
} from "../../mocks/classificationsTest.mocks";
import request from "supertest";
import {
  mockedAdminDonor,
  mockedAdminDonorLogin,
  mockedDonationInfoToDelete,
  mockedDonationInfoToCreate,
  mockedUserCharity,
  mockedUserCharityLogin,
  mockedUserCharity2,
  mockedUserCharityLogin2,
} from "../../mocks/reservationsTest.mocks";
import { IDonationRequest } from "../../../interfaces/donations.interface";

describe("/reservations", () => {
  let connection: DataSource;

  const reservations: any = [];

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedAdminDonor);
    await request(app).post("/users").send(mockedUserCharity);
    await request(app).post("/users").send(mockedUserCharity2);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminDonorLogin);

    await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedClassification1);
    await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedClassification2);

    const { body: classifications } = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const donation1: IDonationRequest = {
      ...mockedDonationInfoToDelete,
      classificationId: classifications[0].id,
    };

    const donation2: IDonationRequest = {
      ...mockedDonationInfoToCreate,
      classificationId: classifications[0].id,
    };

    await request(app)
      .post("/donations")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(donation1);

    await request(app)
      .post("/donations")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(donation2);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /reservations - Should not be able to create reservation without authentication", async () => {
    const { body: donations } = await request(app).get("/donations");

    const response = await request(app)
      .post("/reservations")
      .send({ donationId: donations[0].id });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /reservations - Should not be able to create donation without type='charity'", async () => {
    const adminDonorLoginReponse = await request(app)
      .post("/login")
      .send(mockedAdminDonorLogin);

    const { body: donations } = await request(app).get("/donations");

    const response = await request(app)
      .post("/reservations")
      .set("Authorization", `Bearer ${adminDonorLoginReponse.body.token}`)
      .send({ donationId: donations[0].id });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /reservations - Should not be able to create donation with invalid donationId", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserCharityLogin);

    const adminDonorLoginReponse = await request(app)
      .post("/login")
      .send(mockedAdminDonorLogin);

    const { body: donations } = await request(app).get("/donations");

    const marimba = await request(app)
      .delete("/donations/" + donations[0].id)
      .set("Authorization", `Bearer ${adminDonorLoginReponse.body.token}`);

    const { body: donationsterte } = await request(app).get("/donations");

    console.log("donations", donationsterte);
    console.log("erro", marimba.error);

    const response = await request(app)
      .post("/reservations")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ donationId: donations[0].id });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /reservations - Must be able to create reservation", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserCharityLogin);

    const { body: donations } = await request(app).get("/donations");

    const response = await request(app)
      .post("/reservations")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ donationId: donations[0].id });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("donation");
    expect(response.body).toHaveProperty("user");

    reservations.push(response.body);
  });

  test("POST /reservations - Should not be able to create reservation that already exists", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserCharityLogin);

    const { body: donations } = await request(app).get("/donations");

    const response = await request(app)
      .post("/reservations")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ donationId: donations[0].id });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /reservations/user - Must be able to show reservations from user logged", async () => {
    const userCharityLoginReponse = await request(app)
      .post("/login")
      .send(mockedUserCharityLogin);

    const response = await request(app)
      .get("/reservations/user")
      .set("Authorization", `Bearer ${userCharityLoginReponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(reservations[0].id);
  });

  test("GET /reservations/user - Should not be able to show reservations from user without authentication", async () => {
    const response = await request(app).get("/reservations/user");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /reservations/:id - Should not be able to delete reservation without authentication", async () => {
    const response = await request(app).delete(
      "/reservations/" + reservations[0].id
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /reservations/:id - Should not be able to delete reservation if user is not the reservation creator", async () => {
    const wrongUserCharityLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserCharityLogin2);

    const response = await request(app)
      .delete("/reservations/" + reservations[0].id)
      .set(
        "Authorization",
        `Bearer ${wrongUserCharityLoginResponse.body.token}`
      );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /reservations/:id - Must be able to delete reservation", async () => {
    const userCharityLoginReponse = await request(app)
      .post("/login")
      .send(mockedUserCharityLogin);

    const response = await request(app)
      .delete("/reservations/" + reservations[0].id)
      .set("Authorization", `Bearer ${userCharityLoginReponse.body.token}`);

    expect(response.status).toBe(204);
    expect(response.body).not.toHaveProperty("message");
  });
});
