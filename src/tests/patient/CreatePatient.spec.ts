/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Create Patient", () => {
    let token: string;
    let institutionId: string;
    let groupId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Patient user",
            email: "createMe@patient.com",
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
                name: "Create Patient Institution"
            });

        institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Create Patient Test",
                description: "Description"
            });

        groupId = response.body.id;
    });

    it("should create patient without assigned group", async () => {

        const response = await request(app)
            .post(`/institutions/${institutionId}/patients`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Create Patient",
                birthdate: "2000-10-09 00:00:00.00",
                height: 1.78,
                weight: 70,
                groupId: undefined
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.groupId).toBeNull();
    });

    it("should create patient with assigned existing group", async () => {

        const response = await request(app)
            .post(`/institutions/${institutionId}/patients`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Create Patient",
                birthdate: "2000-10-09 00:00:00.00",
                height: 1.78,
                weight: 70,
                groupId: groupId
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.groupId).toBe(groupId);
    });

    it("should not create patient with unexisting institution", async () => {

        const response = await request(app)
            .post(`/institutions/123abc/patients`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Create Patient",
                birthdate: "2000-10-09 00:00:00.00",
                height: 1.78,
                weight: 70,
                groupId: undefined
            });

        expect(response.status).toBe(404);
    });

    it("should not create patient with assigned unexisting group", async () => {

        const response = await request(app)
            .post(`/institutions/${institutionId}/patients`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Create Patient",
                birthdate: "2000-10-09 00:00:00.00",
                height: 1.78,
                weight: 70,
                groupId: "123abc"
            });

        expect(response.status).toBe(404);
    });
});