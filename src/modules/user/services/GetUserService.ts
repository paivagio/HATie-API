import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IGetUserRequest {
    id: string;
}

class GetUserService {
    async execute({ id }: IGetUserRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id,
            }
        })

        if (!user) {
            return new NotFoundError("User not found");
        }

        return user;
    }
}

export { GetUserService }