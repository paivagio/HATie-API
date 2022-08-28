import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetMembersService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Institution ID is required");

        const institutionExists = await prismaClient.institution.findFirst({
            where: { id },
        })

        if (!institutionExists) {
            return new NotFoundError("Institution does not exists");
        }

        const members = await prismaClient.member.findMany({
            where: {
                institutionId: id,
            }
        })

        return members;
    }
}

export { GetMembersService }