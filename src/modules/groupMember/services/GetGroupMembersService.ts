import { prismaClient } from "src/database/prismaClient";
import { BadRequestError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetGroupMembersService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Group ID is required");

        const groupMember = await prismaClient.groupMember.findMany({
            where: {
                groupId: id,
            },
            select: {
                id: true,
                memberId: true,
                groupId: true,
                authorizations: true,
                Member: {
                    select: {
                        User: {
                            select: {
                                fullname: true
                            }
                        }
                    }
                }
            }
        })

        return groupMember;
    }
}

export { GetGroupMembersService }