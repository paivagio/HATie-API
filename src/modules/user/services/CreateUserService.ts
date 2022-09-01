import { prismaClient } from "src/database/prismaClient";
import { hash } from "bcryptjs";
import { BadRequestError } from "src/utils/errors";

type Preferences = {
    darkmode: boolean;
}

interface ICreateUserRequest {
    fullname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    preferences: Preferences;
}

class CreateUserService {
    async execute({ fullname, email, password, isAdmin, preferences }: ICreateUserRequest) {
        if (!email || !password || !fullname) return new BadRequestError("Email, password and name are required");

        //checar se a senha tem uma letra maiuscula e um caracter especial
        if (!password.match(/[A-Z]/g)) return new BadRequestError("Password must contain at least one upper case character");
        if (!password.match(/[a-z]/g)) return new BadRequestError("Password must contain at least one lower case character");
        if (!password.match(/[!@#$%&*()]/g)) return new BadRequestError("Password must contain at least one special character");
        if (!password.match(/[0-9]/g)) return new BadRequestError("Password must contain at least one number");

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: { email: email }
        })

        if (userAlreadyExists) {
            return new BadRequestError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                fullname: fullname,
                email: email,
                password: passwordHash,
                isAdmin: isAdmin,
                preferences: preferences
            }
        })

        return user;
    }
}

export { CreateUserService }