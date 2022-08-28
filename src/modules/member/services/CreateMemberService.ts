import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    userId: string;
    institutionId: string;
    authorizations: number;
}

class CreateMemberService {
    async execute({ userId, institutionId, authorizations }: IRequest) {
        if (!userId || !institutionId) return new BadRequestError("User and institution ID are required");

        const memberAlreadyExists = await prismaClient.member.findFirst({
            where: { userId: userId, institutionId: institutionId }
        })

        if (memberAlreadyExists) {
            return new BadRequestError("Member already exists");
        }

        const userExists = await prismaClient.user.findFirst({
            where: { id: userId },
        })

        if (!userExists) {
            return new NotFoundError("User does not exists");
        }

        const institutionExists = await prismaClient.institution.findFirst({
            where: { id: institutionId },
        })

        if (!institutionExists) {
            return new NotFoundError("Institution does not exist");
        }

        const member = await prismaClient.member.create({
            data: {
                User: {
                    connect: { id: userId },
                },
                Institution: {
                    connect: { id: institutionId },
                },
                authorizations: authorizations ? authorizations : undefined
            }
        })

        return member;
    }
}

export { CreateMemberService }