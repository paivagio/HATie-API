import { GroupMember } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
    authorizations: number;
}

class UpdateGroupMemberService {
    async execute({ id, authorizations }: IRequest) {
        let groupMember: GroupMember;

        try {
            groupMember = await prismaClient.groupMember.update({
                where: {
                    id,
                },
                data: {
                    authorizations: authorizations ? authorizations : undefined
                }
            })
        } catch (error) {
            return new NotFoundError("Group Member not found");
        }

        return groupMember;
    }
}

export { UpdateGroupMemberService }