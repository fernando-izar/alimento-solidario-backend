import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { IUserRequest } from "../../../interfaces/users.interface";
import { IUserLogin } from "../../../interfaces/users.interface";
import { userAdmCharityData, userAdmDonorData, userNotAdmCharityData, userNotAdmDonorData, userNotAdmDonorDataLogin } from "../../mocks/userRoutes.mocks"

describe('/users', () => {

    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((error) => {
            console.error('Error during Data Source Initialization!',error)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /users -> Must be able to create a donor admin user", async () => {

        const resultAdmDonor = await request(app).post("/users").send(userAdmDonorData);

        expect(resultAdmDonor.status).toBe(201);

        expect(resultAdmDonor.body.type).toEqual("Donor");
        expect(resultAdmDonor.body.isAdm).toEqual(true);

        expect(resultAdmDonor.body).toHaveProperty("id");
        expect(resultAdmDonor.body).toHaveProperty("name");
        expect(resultAdmDonor.body).toHaveProperty("email");
        expect(resultAdmDonor.body).toHaveProperty("isAdm");
        expect(resultAdmDonor.body).toHaveProperty("isActive");
        expect(resultAdmDonor.body).toHaveProperty("address");
        expect(resultAdmDonor.body).toHaveProperty("cnpj_cpf");
        expect(resultAdmDonor.body).toHaveProperty("responsible");
        expect(resultAdmDonor.body).toHaveProperty("contact");
        expect(resultAdmDonor.body).not.toHaveProperty("password");
        expect(resultAdmDonor.body.address).toHaveProperty("address");
        expect(resultAdmDonor.body.address).toHaveProperty("complement");
        expect(resultAdmDonor.body.address).toHaveProperty("city");
        expect(resultAdmDonor.body.address).toHaveProperty("state");
        expect(resultAdmDonor.body.address).toHaveProperty("zipCode");
    })
    
    test('POST /users -> Must be able to create a charity adm user', async () => {
        
        const resultAdmCharity = await request(app).post('/users').send(userAdmCharityData);
        
        expect(resultAdmCharity.status).toBe(201);
        expect(resultAdmCharity.body.type).toEqual("Charity");
        expect(resultAdmCharity.body.isAdm).toEqual(true);

        expect(resultAdmCharity.body).toHaveProperty('id');
        expect(resultAdmCharity.body).toHaveProperty("name");
        expect(resultAdmCharity.body).toHaveProperty("email");
        expect(resultAdmCharity.body).toHaveProperty("isAdm");
        expect(resultAdmCharity.body).toHaveProperty("isActive");
        expect(resultAdmCharity.body).toHaveProperty("address");
        expect(resultAdmCharity.body).toHaveProperty("cnpj_cpf");
        expect(resultAdmCharity.body).toHaveProperty("responsible");
        expect(resultAdmCharity.body).toHaveProperty("contact");
        expect(resultAdmCharity.body).not.toHaveProperty("password");
        expect(resultAdmCharity.body.address).toHaveProperty("address");
        expect(resultAdmCharity.body.address).toHaveProperty("complement");
        expect(resultAdmCharity.body.address).toHaveProperty("city");
        expect(resultAdmCharity.body.address).toHaveProperty("state");
        expect(resultAdmCharity.body.address).toHaveProperty("zipCode");
    })

    test('POST /users -> Must be able to create a donor not adm user', async () => {

        const resultNotAdmDonor = await request(app).post("/users").send(userNotAdmDonorData);

        expect(resultNotAdmDonor.status).toBe(201);
        expect(resultNotAdmDonor.body.type).toEqual("Donor");
        expect(resultNotAdmDonor.body.isAdm).toEqual(false);

        expect(resultNotAdmDonor.body).toHaveProperty("id");
        expect(resultNotAdmDonor.body).toHaveProperty("name");
        expect(resultNotAdmDonor.body).toHaveProperty("email");
        expect(resultNotAdmDonor.body).toHaveProperty("isAdm");
        expect(resultNotAdmDonor.body).toHaveProperty("isActive");
        expect(resultNotAdmDonor.body).toHaveProperty("address");
        expect(resultNotAdmDonor.body).toHaveProperty("cnpj_cpf");
        expect(resultNotAdmDonor.body).toHaveProperty("responsible");
        expect(resultNotAdmDonor.body).toHaveProperty("contact");
        expect(resultNotAdmDonor.body).not.toHaveProperty("password");
        expect(resultNotAdmDonor.body.address).toHaveProperty("address");
        expect(resultNotAdmDonor.body.address).toHaveProperty("complement");
        expect(resultNotAdmDonor.body.address).toHaveProperty("city");
        expect(resultNotAdmDonor.body.address).toHaveProperty("state");
        expect(resultNotAdmDonor.body.address).toHaveProperty("zipCode");
    })

    test("POST /users -> Must be able to create a charity not adm user", async () => {

        const resultNotAdmCharity = await request(app).post("/users").send(userNotAdmCharityData);
        
        expect(resultNotAdmCharity.status).toBe(201);
        expect(resultNotAdmCharity.body.type).toEqual("Charity");
        expect(resultNotAdmCharity.body.isAdm).toEqual(false);

        expect(resultNotAdmCharity.body).toHaveProperty("id");
        expect(resultNotAdmCharity.body).toHaveProperty("name");
        expect(resultNotAdmCharity.body).toHaveProperty("email");
        expect(resultNotAdmCharity.body).toHaveProperty("isAdm");
        expect(resultNotAdmCharity.body).toHaveProperty("isActive");
        expect(resultNotAdmCharity.body).toHaveProperty("address");
        expect(resultNotAdmCharity.body).toHaveProperty("cnpj_cpf");
        expect(resultNotAdmCharity.body).toHaveProperty("responsible");
        expect(resultNotAdmCharity.body).toHaveProperty("contact");
        expect(resultNotAdmCharity.body).not.toHaveProperty("password");
        expect(resultNotAdmCharity.body.address).toHaveProperty("address");
        expect(resultNotAdmCharity.body.address).toHaveProperty("complement");
        expect(resultNotAdmCharity.body.address).toHaveProperty("city");
        expect(resultNotAdmCharity.body.address).toHaveProperty("state");
        expect(resultNotAdmCharity.body.address).toHaveProperty("zipCode");
    })

    test("POST /users -> Should not be able to create a user that already exists", async () => {
        const response = await request(app).post("/users").send(userAdmCharityData);
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /users/:id -> Should not be able to list users without authentication", async () => {
        const response = await request(app).get("/users")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /user/:id -> Should not allow listing users without being admin", async () => {
        const userLoginResponse = await request(app).post("/login").send(userNotAdmDonorDataLogin);
        const response = await request(app).get("/users/:id").set("Authorization", `Bearer ${userLoginResponse.body.token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    
})