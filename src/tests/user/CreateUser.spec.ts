/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe('Create User', () => {

    it('should create user', async () => {
        const user = {
            fullname: "Fullname2",
            email: "email2@email.com",
            password: "senha2",
            isAdmin: true,
            preferences: {
                darkmode: true
            }
        };

        const response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it('should not create user that already exists', async () => {
        const user = {
            fullname: "Fullname3",
            email: "email3@email.com",
            password: "senha3",
            isAdmin: true,
            preferences: {
                darkmode: true
            }
        };

        let response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(201);

        response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(400);
    });
});