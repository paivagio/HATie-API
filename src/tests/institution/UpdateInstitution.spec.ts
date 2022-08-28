/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Update Institution", () => {
    let token: string;
    let institutionId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Institution user",
            email: "updateMe@institution.com",
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
                name: "Update Institution"
            });

        institutionId = response.body.id;
    });

    it("should update institution", async () => {

        const response = await request(app)
            .patch(`/institutions/${institutionId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: "Updated Institution" });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Updated Institution");
    });

    it("should not update unexisting institution", async () => {

        const response = await request(app)
            .patch(`/institutions/123abc`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: "Updated Institution" });

        expect(response.status).toBe(404);
    });

});