/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Get Member", () => {
    let token: string;
    let memberId: string;
    let institutionId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Member user",
            email: "getMe@member.com",
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
                name: "Get Member Institution"
            });

        institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        memberId = response.body.id;
    });

    it("should get member", async () => {

        const response = await request(app)
            .get(`/members/${memberId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not get unexisting member", async () => {

        const response = await request(app)
            .get(`/members/123abc`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    it("should get all members", async () => {

        const response = await request(app)
            .get(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });

    it("should not get all members from unexisting institution", async () => {

        const response = await request(app)
            .get(`/institutions/123abc/members`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});