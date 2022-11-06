import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { IUserRequest } from "../../../interfaces/users.interface";
import { IUserLogin } from "../../../interfaces/users.interface";
import { userAdmCharityData, userAdmDonorData, userAdmDonorDataLogin, userNotAdmCharityData, userNotAdmDonorData, userNotAdmDonorDataLogin, userTestDonorData, userTestDonorDataLogin } from "../../mocks/userRoutes.mocks"

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

    let idUserAdmCreate: string
    let idUserNotAdmCreate: string

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
        expect(resultAdmDonor.body).not.toHaveProperty("cnpj_cpf");
        expect(resultAdmDonor.body).toHaveProperty("responsible");
        expect(resultAdmDonor.body).toHaveProperty("contact");
        expect(resultAdmDonor.body).not.toHaveProperty("password");
        expect(resultAdmDonor.body.address).toHaveProperty("address");
        expect(resultAdmDonor.body.address).toHaveProperty("complement");
        expect(resultAdmDonor.body.address).toHaveProperty("city");
        expect(resultAdmDonor.body.address).toHaveProperty("state");
        expect(resultAdmDonor.body.address).toHaveProperty("zipCode");

        idUserAdmCreate = resultAdmDonor.body.id
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
        expect(resultAdmCharity.body).not.toHaveProperty("cnpj_cpf");
        expect(resultAdmCharity.body).toHaveProperty("responsible");
        expect(resultAdmCharity.body).toHaveProperty("contact");
        expect(resultAdmCharity.body).not.toHaveProperty("password");
        expect(resultAdmCharity.body.address).toHaveProperty("address");
        expect(resultAdmCharity.body.address).toHaveProperty("complement");
        expect(resultAdmCharity.body.address).toHaveProperty("city");
        expect(resultAdmCharity.body.address).toHaveProperty("state");
        expect(resultAdmCharity.body.address).toHaveProperty("zipCode");

        idUserNotAdmCreate = resultAdmCharity.body.id
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
        expect(resultNotAdmDonor.body).not.toHaveProperty("cnpj_cpf");
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
        expect(resultNotAdmCharity.body).not.toHaveProperty("cnpj_cpf");
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

    test("GET /users/:id -> Must be able to show user by ID", async () => {

        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);

        const response = await request(app).get(`/users/${idUserAdmCreate}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        expect(response.body).toHaveProperty("id")
        expect(response.status).toBe(200)
    })

    test("GET /users -> Should not be able to list users without authentication 401", async () => {
        const response = await request(app).get("/users")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /user -> Should not allow listing users without being admin", async () => {
        const userLoginResponse = await request(app).post("/login").send(userNotAdmDonorDataLogin);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${userLoginResponse.body.token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("GET /users -> Must be able to show users 200", async () => {
        await request(app).post("/users").send(userAdmDonorData)

        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        expect(response.status).toBe(200)
    })

    test("GET /users/:id -> should not be able to show user by id without authentication 401", async () => {
        const response = await request(app).get("/users")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /users should not be able to list users not being admin 403", async () => {
        const userLoginResponse = await request(app).post("/login").send(userNotAdmDonorDataLogin);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("DELETE /users/:id -> should not be able to delete user without authentication 401", async () => {
        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /users/:id -> should not be able to delete user not being admin 403", async () => {
        const notAdminLoginResponse = await request(app).post("/login").send(userNotAdmDonorDataLogin);
        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`).set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    })

    test("DELETE /users/:id -> should not be able to soft delete user without authentication 401", async () => {
        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        const response = await request(app).delete(`/users/soft/${userToBeDeleted.body[0].id}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("DELETE /users/soft/:id -> Must be able to soft delete user 204", async () => {

        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);

        const response = await request(app).delete(`/users/soft/${idUserAdmCreate}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(204);
        expect(findUser.body[0].isActive).toBe(false);
    })

    test("DELETE /users/:id -> should not be able to delete user with isActive = false 400", async () => {
        await request(app).post("/users").send(userAdmDonorData);

        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        const response = await request(app).delete(`/users/${idUserAdmCreate}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.status).toBe(204);

    })

    test("DELETE /users/:id -> should not be able to delete user with invalid id 404", async () => {
        await request(app).post("/users").send(userTestDonorData)

        const adminLoginResponse = await request(app).post("/login").send(userTestDonorDataLogin);

        const response = await request(app).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    })

    test("PATCH /users/:id -> should not be able to update user without authentication 401", async () => {
        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const userToBeUpdated = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = await request(app).patch(`/users/${idUserAdmCreate}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH /users/:id -> should not be able to update user with invalid id 403", async () => {
        await request(app).post("/users").send(userAdmDonorData);
        
        const newKeysValues = {name: "Paulo Coelho", email: "paulocoelho@mail.com"}

        const adminLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/a78sw12y-3uy7-78sd-239v-12qub3e4hj89`).set("Authorization",token).send(newKeysValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("PATCH /users/:id -> should not be able to update isAdm field value 401", async () => {
        const newKeyValue = {isAdm: false}

        const admingLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newKeyValue)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)


    })

    test("PATCH /users/:id -> should not be able to update isActive field value 401", async () => {
        const newKeyValue = {isActive: false}

        const admingLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newKeyValue)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401) 
    })

    test("PATCH /users/:id -> should not be able to update id field value 401", async () => {
        const newKeyValue = {id: false}

        const admingLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newKeyValue)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/:id -> should not be able to update another user without adm permission 401", async () => {
        const newKeyValue = {contact: "Roberta"}

        const admingLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const userLoginResponse = await request(app).post("/login").send(userNotAdmDonorDataLogin);
        const adminToken = `Bearer ${admingLoginResponse.body.token}`
        const userToken = `Bearer ${userLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", adminToken)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",userToken).send(newKeyValue)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/:id -> should be able to update user 200", async () => {
        const newKeysValues = {password: "4321", cnpj_cpf: "32165498700", name: "Hugo D'Leon"}

        const admingLoginResponse = await request(app).post("/login").send(userAdmDonorDataLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newKeysValues)

        const userUpdated = await request(app).get("/users").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(userUpdated.body[0].name).toEqual("Hugo D'Leon")
        expect(userUpdated.body[0]).not.toHaveProperty("password")
        expect(userUpdated.body[0]).not.toHaveProperty("cnpj_cpf")
    })
})