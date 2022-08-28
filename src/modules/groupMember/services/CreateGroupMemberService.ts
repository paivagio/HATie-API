import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    memberId: string;
    id: string;
    authorizations: number;
}

class CreateGroupMemberService {
    async execute({ memberId, id, authorizations }: IRequest) {
        if (!memberId || !id) return new BadRequestError("Group and Member IDs are required");

        const groupMemberAlreadyExists = await prismaClient.groupMember.findFirst({
            where: {
                memberId: memberId,
                groupId: id
            }
        })

        if (groupMemberAlreadyExists) {
            return new BadRequestError("User is already a group member");
        }

        const memberExists = await prismaClient.member.findFirst({
            where: {
                id: memberId
            }
        })

        if (!memberExists) {
            return new NotFoundError("Member does not exist");
        }

        const groupExists = await prismaClient.group.findFirst({
            where: {
                id: id
            }
        })

        if (!groupExists) {
            return new NotFoundError("Group does not exist");
        }

        const groupMember = await prismaClient.groupMember.create({
            data: {
                memberId,
                groupId: id,
                authorizations: authorizations ? authorizations : undefined
            }
        })

        return groupMember;
    }
}

export { CreateGroupMemberService }