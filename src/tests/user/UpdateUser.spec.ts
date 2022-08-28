/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Update User", () => {
    let token: string;
    let userId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Update user",
            email: "updateMe@email.com",
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

    it("should update existing user", async () => {

        const response = await request(app)
            .patch(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Updated user"
            });

        expect(response.status).toBe(200);
        expect(response.body.fullname).toBe("Updated user");
    });

    it("should not update unexisting user", async () => {

        const response = await request(app)
            .patch(`/users/1234345abc`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});