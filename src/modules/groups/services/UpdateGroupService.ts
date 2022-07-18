import { Group } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
    name: string;
    description: string;
}

class UpdateGroupService {
    async execute({ id, name, description }: IRequest) {
        let group: Group;

        try {
            group = await prismaClient.group.update({
                where: {
                    id,
                },
                data: {
                    name: name ? name : undefined,
                    description: description ? description : undefined
                }
            })
        } catch (error) {
            return new NotFoundError("Group not found");
        }

        return group;
    }
}

export { UpdateGroupService }