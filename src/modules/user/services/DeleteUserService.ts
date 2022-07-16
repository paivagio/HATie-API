import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IDeleteUserRequest {
    id: string;
}

class DeleteUserService {
    async execute({ id }: IDeleteUserRequest) {

        const user = await prismaClient.user.delete({
            where: {
                id
            }
        });

        if (!user) {
            return new NotFoundError("User not found");
        }

        return user;
    }
}

export { DeleteUserService }