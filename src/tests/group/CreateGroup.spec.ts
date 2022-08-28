/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Create Group", () => {
    let token: string;
    let institutionId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Group user",
            email: "createMe@group.com",
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
                name: "Create Group Institution"
            });

        institutionId = response.body.id;
    });

    it("should create group", async () => {

        const response = await request(app)
            .post(`/institutions/${institutionId}/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Create Group Test",
                description: "Description"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("should not create group with unexisting institution", async () => {

        const response = await request(app)
            .post(`/institutions/123abc/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Create Group Test",
                description: "Description"
            });

        expect(response.status).toBe(404);
    });
});