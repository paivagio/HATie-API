import { prismaClient } from "src/database/prismaClient";
import { hash } from "bcryptjs";
import { BadRequestError, NotFoundError } from "src/utils/errors";
import { User } from "@prisma/client";

type Preferences = {
    notifications: boolean;
    darkmode: boolean;
    sound: boolean;
}

interface IUpdateUserRequest {
    id: string;
    fullname?: string;
    email?: string;
    password?: string;
    preferences?: Preferences;
}

class UpdateUserService {
    async execute({ id, fullname, email, password, preferences }: IUpdateUserRequest) {
        let user: User;

        if (!id) return new BadRequestError("User ID is required");

        try {
            user = await prismaClient.user.update({
                where: {
                    id
                },
                data: {
                    fullname: fullname ? fullname : undefined,
                    email: email ? email : undefined,
                    password: password ? await hash(password, 8) : undefined,
                    preferences: preferences ? preferences : undefined,
                },
            });
        } catch (err) {
            return new NotFoundError("User not found");
        }

        user.password = null;
        return user;
    }
}

export { UpdateUserService }