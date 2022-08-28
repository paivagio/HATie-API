/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe('Authenticate User', () => {

    var user = {}

    beforeAll(async () => {

        user = {
            fullname: "Fullname",
            email: "email@email.com",
            password: "senha",
            isAdmin: true,
            preferences: {
                darkmode: true
            }
        }

        await request(app)
            .post('/users')
            .send(user);

    });

    it('should authenticate user ', async () => {

        const response = await request(app)
            .post('/auth')
            .send(user);

        expect(response.status).toBe(200);
    });

    it('should not authenticate user with incorrect email', async () => {

        const response = await request(app)
            .post('/auth')
            .send({ ...user, email: 'emailIncorrect@email.com' });

        expect(response.status).toBe(401);
    });

    it('should not authenticate user with incorrect password', async () => {

        const response = await request(app)
            .post('/auth')
            .send({ ...user, password: "123" });

        expect(response.status).toBe(401);
    });
});