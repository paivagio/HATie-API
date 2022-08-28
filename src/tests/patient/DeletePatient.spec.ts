/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Delete Patient", () => {
    let token: string;
    let patientId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Patient user",
            email: "deleteMe@patient.com",
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
                name: "Delete Patient Institution"
            });

        const institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Delete Patient Test",
                description: "Description"
            });

        const groupId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/patients`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Delete Patient",
                birthdate: "2000-10-09 00:00:00.00",
                height: 1.78,
                weight: 70,
                groupId: groupId
            });

        patientId = response.body.id;
    });

    it("should delete patient", async () => {

        const response = await request(app)
            .delete(`/patients/${patientId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not delete unexisting patient", async () => {

        const response = await request(app)
            .delete(`/patients/123abc`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});