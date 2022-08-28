/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Create GroupMember", () => {
    let token: string;
    let groupId: string;
    let memberId: string;

    beforeAll(async () => {

        const user = {
            fullname: "GroupMember user",
            email: "createMe@groupmember.com",
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
                name: "Create GroupMember Institution"
            });

        const institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Create GroupMember Test",
                description: "Description"
            });

        groupId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        memberId = response.body.id;
    });

    it("should create group member", async () => {

        const response = await request(app)
            .post(`/groups/${groupId}/groupmembers`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                memberId: memberId,
                authorizations: 111
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("should not create group member with unexisting group", async () => {

        const response = await request(app)
            .post(`/groups/123abc/groupmembers`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                memberId: memberId,
                authorizations: 111
            });

        expect(response.status).toBe(404);
    });

    it("should not create group member with unexisting member", async () => {

        const response = await request(app)
            .post(`/groups/${groupId}/groupmembers`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                memberId: "123abc",
                authorizations: 111
            });

        expect(response.status).toBe(404);
    });
});