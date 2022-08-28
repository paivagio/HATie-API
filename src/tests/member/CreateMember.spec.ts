/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Create Member", () => {
    let token: string;
    let userId: string;
    let institutionId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Member user",
            email: "createMe@member.com",
            password: "senha",
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

        response = await request(app)
            .post('/institutions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                ownerId: userId,
                name: "Create Member Institution"
            });

        institutionId = response.body.id;
    });

    it("should create member", async () => {

        const response = await request(app)
            .post(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("should not create unexisting member", async () => {

        const response = await request(app)
            .post(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        expect(response.status).toBe(400);
    });

    it("should not create member with unexisting institution", async () => {

        const response = await request(app)
            .post(`/institutions/1234abc/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        expect(response.status).toBe(400);
    });

    it("should not create member with unexisting user", async () => {

        const response = await request(app)
            .post(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: "12345abc" });

        expect(response.status).toBe(400);
    });
});