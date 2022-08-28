/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Update Member", () => {
    let token: string;
    let memberId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Member user",
            email: "updateMe@member.com",
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
                name: "Update Member Institution"
            });

        const institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        memberId = response.body.id;
    });

    it("should update member", async () => {

        const response = await request(app)
            .patch(`/members/${memberId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ authorizations: 111 });

        expect(response.status).toBe(200);
        expect(response.body.authorizations).toBe(111);
    });

    it("should not update unexisting member", async () => {

        const response = await request(app)
            .patch(`/members/123abc`)
            .set('Authorization', `Bearer ${token}`)
            .send({ authorizations: 111 });

        expect(response.status).toBe(404);
    });
});