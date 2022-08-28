import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetGroupService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Group ID is required");

        const group = await prismaClient.group.findFirst({
            where: {
                id,
            },
            include: {
                Patient: true,
                _count: {
                    select: {
                        GroupMember: true
                    }
                }
            }
        });

        if (!group) {
            return new NotFoundError("Institution not found");
        }

        return group;
    }
}

export { GetGroupService }