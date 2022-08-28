/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Delete Group", () => {
    let token: string;
    let groupId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Group user",
            email: "deleteMe@group.com",
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
                name: "Delete Group Institution"
            });

        const institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Delete Group Test",
                description: "Description"
            });

        groupId = response.body.id;
    });

    it("should delete group", async () => {

        const response = await request(app)
            .delete(`/groups/${groupId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should not delete unexisting group", async () => {

        const response = await request(app)
            .delete(`/groups/123abc`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});