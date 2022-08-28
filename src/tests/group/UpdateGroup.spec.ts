/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Update Group", () => {
    let token: string;
    let groupId: string;

    beforeAll(async () => {

        const user = {
            fullname: "Group user",
            email: "updateMe@group.com",
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
                name: "Update Group Institution"
            });

        const institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Update Group Test",
                description: "Description"
            });

        groupId = response.body.id;
    });

    it("should update group", async () => {

        const response = await request(app)
            .patch(`/groups/${groupId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                description: "Updated description"
            });

        expect(response.status).toBe(200);
        expect(response.body.description).toEqual("Updated description");
    });

    it("should not update unexisting group", async () => {

        const response = await request(app)
            .patch(`/groups/123abc`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                description: "Updated description"
            });

        expect(response.status).toBe(404);
    });
});