/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Update Patient", () => {
    let token: string;
    let patientId: string;
    let institutionId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Patient user",
            email: "updateMe@patient.com",
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
                name: "Update Patient Institution"
            });

        institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Update Patient Test",
                description: "Description"
            });

        const groupId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/patients`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Update Patient",
                birthdate: "2000-10-09 00:00:00.00",
                height: 1.78,
                weight: 70,
                groupId: groupId
            });

        patientId = response.body.id;
    });

    it("should update patient", async () => {

        const response = await request(app)
            .patch(`/patients/${patientId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Updated Patient",
                groupId: "",
                institutionId: institutionId
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.fullname).toBe("Updated Patient");
        expect(response.body.groupId).toBeNull();
    });

    it("should not update unexisting patient", async () => {

        const response = await request(app)
            .patch(`/patients/123abc`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Updated Patient",
                groupId: "",
                institutionId: institutionId
            });

        expect(response.status).toBe(404);
    });

    it("should not update patient with unexisting institution", async () => {

        const response = await request(app)
            .patch(`/patients/${patientId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Updated Patient",
                groupId: "123abc",
                institutionId: "123abc"
            });

        expect(response.status).toBe(404);
    });

    it("should not update patient with unexisting group", async () => {

        const response = await request(app)
            .patch(`/patients/${patientId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                fullname: "Updated Patient",
                groupId: "123abc",
                institutionId: institutionId
            });

        expect(response.status).toBe(404);
    });
});