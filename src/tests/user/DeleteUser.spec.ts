/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Delete User", () => {
    let token: string;
    let userId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Delete user",
            email: "deleteMe@email.com",
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

    it("should delete existing user", async () => {

        let response = await request(app)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");

        response = await request(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    it("should not delete unexisting user", async () => {

        const response = await request(app)
            .delete(`/users/1234345abc`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});