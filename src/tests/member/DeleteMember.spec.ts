/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Delete Member", () => {
    let token: string;
    let memberId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Member user",
            email: "deleteMe@member.com",
            password: "senha",
            isAdmin: true,
            preferences: {
                darkmode: true
            }
        };

        let response = await request(app)
            .post('/users')
            .send(user);

        const userId = response.body.id;

        response = await request(app)
            .post("/auth")
            .send(user);

        token = response.body.token;

        response = await request(app)
            .post('/institutions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                ownerId: userId,
                name: "Delete Member Institution"
            });

        const institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        memberId = response.body.id;
    });

    it("should get delete", async () => {

        const response = await request(app)
            .delete(`/members/${memberId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not delete unexisting member", async () => {

        const response = await request(app)
            .delete(`/members/123abc`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});