import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedClassification1,
  mockedClassification2,
  mockedUser,
  mockedUserLogin,
} from "../../mocks/classificationsTest.mocks";
import { IClassificationRequest } from "../../../interfaces/classifications.interface";

describe("/classifications", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) =>
        console.log("Error during Data Source initialization", err)
      );

    await request(app).post("/users").send(mockedAdmin);
    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /classifications - Must be able to create a classification", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedClassification1);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  test("POST /classifications - Should not be able to create a classification that already exists", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedClassification1);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /classifications -  should not be able to create category without authentication", async () => {
    const response = await request(app)
      .post("/classifications")
      .send(mockedClassification2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /classifications -  should not be able to create a classification without admin permission", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .post("/classifications")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedClassification2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /classifications -  Must be able to list all classifications", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("POST /classifications -  should not be able to list classifications without authentication", async () => {
    const response = await request(app).get("/classifications");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /classifications -  Should not be able to update classification without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const classificationToBeUpdatedRequest = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const classificationToBeUpdatedId =
      classificationToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch("/classifications/" + classificationToBeUpdatedId)
      .send(mockedClassification2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /classifications -  Should not be able to update classification without admin permission", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const classificationToBeUpdatedRequest = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const classificationToBeUpdatedId =
      classificationToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch("/classifications/" + classificationToBeUpdatedId)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedClassification2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /classifications -  Must be able to update classification", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const classificationToBeUpdatedRequest = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const classificationToBeUpdatedId =
      classificationToBeUpdatedRequest.body[0].id;

    const response = await request(app)
      .patch("/classifications/" + classificationToBeUpdatedId)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedClassification2);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual(mockedClassification2.name);
    expect(response.status).toBe(200);
  });

  test("DELETE /classifications/:id -  Should no be able to delete classification without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const classifications = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/classifications/${classifications.body[0].id}`
    );

    const findClassification = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const classificationNotDeleted = findClassification.body.some(
      (c: any) => c.id === classifications.body[0].id
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(classificationNotDeleted).toBe(true);
  });

  test("DELETE /classifications/:id -  Should not be able to delete classification without admin permission", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const classifications = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/classifications/${classifications.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const findClassification = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const classificationNotDeleted = findClassification.body.some(
      (c: any) => c.id === classifications.body[0].id
    );

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(classificationNotDeleted).toBe(true);
  });

  test("DELETE /classifications/:id -  Must be able to delete classification", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const classifications = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/classifications/${classifications.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const findClassification = await request(app)
      .get("/classifications")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const classificationNotDeleted = findClassification.body.some(
      (c: any) => c.id === classifications.body[0].id
    );

    expect(response.status).toBe(204);
    expect(classificationNotDeleted).toBe(false);
  });
});
