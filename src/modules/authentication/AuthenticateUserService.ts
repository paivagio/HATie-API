import { prismaClient } from "src/database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { UnauthorizedError } from "src/utils/errors";
require('dotenv/config');

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            return new UnauthorizedError("Email/Password Incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return new UnauthorizedError("Email/Password Incorrect!");
        }

        const token = sign(
            { email: user.email },
            process.env.SALT,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return { token: token, user: user };
    }
}

export { AuthenticateUserService }