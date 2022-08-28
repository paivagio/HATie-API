import { Group } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class DeleteGroupService {
    async execute({ id }: IRequest) {
        let group: Group;

        if (!id) return new BadRequestError("Group ID is required");

        try {
            group = await prismaClient.group.delete({
                where: {
                    id,
                }
            })
        } catch (error) {
            return new NotFoundError("Group not found");
        }

        return group;
    }
}

export { DeleteGroupService }