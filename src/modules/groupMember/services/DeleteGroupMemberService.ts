import { GroupMember } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class DeleteGroupMemberService {
    async execute({ id }: IRequest) {
        let groupMember: GroupMember;

        try {
            groupMember = await prismaClient.groupMember.delete({
                where: {
                    id,
                }
            })
        } catch (error) {
            return new NotFoundError("Group Member not found");
        }

        return groupMember;
    }
}

export { DeleteGroupMemberService }