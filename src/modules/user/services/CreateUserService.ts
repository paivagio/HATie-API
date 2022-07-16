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

        if (!email) {
            return new BadRequestError("Please enter a valid email");
        }

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