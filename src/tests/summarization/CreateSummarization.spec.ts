/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Create Summarization", () => {
    let token: string;
    let patientId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Summarization user",
            email: "createMe@summarization.com",
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
                name: "Create Summarization Institution"
            });

        const institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/patients`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Create Summarization",
                birthdate: "2000-10-09 00:00:00.00",
                height: 1.78,
                weight: 70,
                groupId: undefined
            });

        patientId = response.body.id;
    });

    it("should create summarization", async () => {

        const response = await request(app)
            .post(`/patients/${patientId}/summarizations`)
            .set('Authorization', `Bearer ${token}`)
            .attach('file', `${__dirname}/validTestRecording.m4a`);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("should not create summarization without audio file", async () => {

        const response = await request(app)
            .post(`/patients/${patientId}/summarizations`)
            .set('Authorization', `Bearer ${token}`)
            .send({ testEnvironment: true });

        expect(response.status).toBe(404);
    });

    it("should not create summarization with unsupported file format", async () => {

        const response = await request(app)
            .post(`/patients/${patientId}/summarizations`)
            .set('Authorization', `Bearer ${token}`)
            .attach('file', `${__dirname}/unsupportedFormatRecording.mp3`);

        expect(response.status).toBe(400);
    });
});