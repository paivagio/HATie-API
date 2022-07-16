import { prismaClient } from "src/database/prismaClient";
import { hash } from "bcryptjs";
import { NotFoundError } from "src/utils/errors";
import { User } from "@prisma/client";

type Preferences = {
    darkmode: boolean;
}

interface IUpdateUserRequest {
    id: string;
    fullname: string;
    email: string;
    password: string;
    preferences: Preferences;
}

class UpdateUserService {
    async execute({ id, fullname, email, password, preferences }: IUpdateUserRequest) {
        let user: User;

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

        return user;
    }
}

export { UpdateUserService }