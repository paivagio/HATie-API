/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Get User", () => {
    let token: string;
    let userId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Get user",
            email: "getMe@email.com",
            password: "senha2",
            isAdmin: true,
            preferences: {
                darkmode: true
            }
        };

        let response = await request(app)
            .post('/users')
            .send(user);

        userId = response.body.id;

        response = await request(app)
            .post("/auth")
            .send(user);

        token = response.body.token;
    });

    it("should get existing user", async () => {

        const response = await request(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not get unexisting user", async () => {

        const response = await request(app)
            .get(`/users/1234345abc`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});