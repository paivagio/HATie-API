import { prismaClient } from "src/database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { BadRequestError } from "src/utils/errors";
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
            return new BadRequestError("Email/Password Incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return new BadRequestError("Email/Password Incorrect!");
        }

        /*sign vai gerar o token, sendo:
        ---primeiro param -> o payload, infos que quero poder acessar
        ---segundo param -> a chave secreta usada para gerar o token. Bom usar um MD5 Hash Generator para gerar isso
        */
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