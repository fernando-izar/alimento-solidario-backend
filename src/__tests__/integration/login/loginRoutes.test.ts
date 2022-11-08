import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedAdminLoginWrongPassword,
} from "../../mocks/classificationsTest.mocks";
import app from "../../../app";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - should be able to login with the user", async () => {
    const response = await request(app).post("/login").send(mockedAdminLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login - should not be able to login with the incorrect password or email", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedAdminLoginWrongPassword);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
