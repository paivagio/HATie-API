/**
* @jest-environment ./prisma/prisma-environment-jest
*/

import { app } from "../../app";
import request from "supertest";

describe("Update GroupMember", () => {
    let token: string;
    let groupMemberId: string;

    beforeAll(async () => {

        const user = {
            fullname: "GroupMember user",
            email: "updateMe@groupmember.com",
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
                name: "Update GroupMember Institution"
            });

        const institutionId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/groups`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Update GroupMember Test",
                description: "Description"
            });

        const groupId = response.body.id;

        response = await request(app)
            .post(`/institutions/${institutionId}/members`)
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: userId });

        const memberId = response.body.id;

        response = await request(app)
            .post(`/groups/${groupId}/groupmembers`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                memberId: memberId,
                authorizations: 111
            });

        groupMemberId = response.body.id;
    });

    it("should update group member", async () => {

        const response = await request(app)
            .patch(`/groupmembers/${groupMemberId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                authorizations: 110
            });

        expect(response.status).toBe(200);
        expect(response.body.authorizations).toBe(110);
    });

    it("should not update unexisting group member", async () => {

        const response = await request(app)
            .patch(`/groupmembers/123abc`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                authorizations: 110
            });

        expect(response.status).toBe(404);
    });
});