const request = require("supertest")
const app = require("../../src")
const users = require("../mockData/users")

describe("Auth Endpoints test", () => {
    it("return 400 - User Registration", async () => {
        // request body
        const data = users["badRequestBody"]

        const response = await request(app)
            .post("/api/auth/register")
            .send(data)

        console.log(response)

        expect(response.statusCode).toBe(400)
    })

    it("return 201 - User Registration", async () => {
        // request body
        const data = users["goodRequestBody"]

        const response = await request(app)
            .post("/api/auth/register")
            .send(data)

        expect(response.statusCode).toBe(201)
    })

    it("return 200 - User Login", async () => {
        const { email, password, ...rest } = users["goodRequestBody"]

        const response = await request(app)
            .post("/api/auth/login")
            .send({ email, password })

        expect(response.statusCode).toBe(200)
        expect(response.body.tokens).toBeDefined()
    })
})
