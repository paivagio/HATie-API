import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    name: string;
    description: string;
    id: string;
}

class CreateGroupService {
    async execute({ name, description = "No description", id }: IRequest) {
        if (!id || !name) return new BadRequestError("Institution ID and group name are required");

        const institutionExists = await prismaClient.institution.findFirst({
            where: { id },
        })

        if (!institutionExists) {
            return new NotFoundError("Institution does not exists");
        }

        const groupAlreadyExists = await prismaClient.group.findFirst({
            where: {
                name,
                institutionId: id,
            }
        })

        if (groupAlreadyExists) {
            return new BadRequestError("Group already exists within institution");
        }

        const group = await prismaClient.group.create({
            data: {
                name,
                description,
                institutionId: id
            }
        });

        return group;
    }
}

export { CreateGroupService }