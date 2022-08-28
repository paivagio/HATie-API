/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Delete Institution", () => {
    let token: string;
    let institutionId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Institution user",
            email: "deleteMe@institution.com",
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
                name: "Delete Institution"
            });

        institutionId = response.body.id;
    });

    it("should delete institution", async () => {

        const response = await request(app)
            .delete(`/institutions/${institutionId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not delete unexisting institution", async () => {

        const response = await request(app)
            .delete(`/institutions/123abc`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

});