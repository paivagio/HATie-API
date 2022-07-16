import { prismaClient } from "src/database/prismaClient";

interface IRequest {
    id: string;
}

class Service {
    async execute({ id }: IRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id,
            }
        })

        return user;
    }
}

export { Service }