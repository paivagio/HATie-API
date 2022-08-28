import { User } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IDeleteUserRequest {
    id: string;
}

class DeleteUserService {
    async execute({ id }: IDeleteUserRequest) {
        let user: User;

        if (!id) return new BadRequestError("User ID is required");

        try {
            user = await prismaClient.user.delete({
                where: {
                    id
                }
            });
        } catch (err) {
            return new NotFoundError("User not found");
        }

        return user;
    }
}

export { DeleteUserService }