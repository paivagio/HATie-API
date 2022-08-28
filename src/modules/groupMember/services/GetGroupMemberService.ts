import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetGroupMemberService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Group Member ID is required");

        const groupMember = await prismaClient.groupMember.findFirst({
            where: {
                id,
            }
        })

        if (!groupMember) {
            return new NotFoundError("Group Member not found");
        }

        return groupMember;
    }
}

export { GetGroupMemberService }