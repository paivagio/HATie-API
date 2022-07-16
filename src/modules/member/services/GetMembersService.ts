import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetMembersService {
    async execute({ id }: IRequest) {

        const members = await prismaClient.member.findMany({
            where: {
                institutionId: id,
            }
        })

        return members;
    }
}

export { GetMembersService }