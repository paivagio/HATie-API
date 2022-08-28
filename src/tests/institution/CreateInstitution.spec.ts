/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Create Institution", () => {
    let token: string;
    let userId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Institution user",
            email: "createMe@institution.com",
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
    });

    it("should create institution", async () => {

        const response = await request(app)
            .post('/institutions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                ownerId: userId,
                name: "Create Institution"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("should not create institution with unexisting user", async () => {

        const response = await request(app)
            .post('/institutions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                ownerId: "123abc",
                name: "Create Institution"
            });

        expect(response.status).toBe(404);
    });

});