import { Institution } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
    name: string;
}

class UpdateInstitutionService {
    async execute({ id, name }: IRequest) {
        let institution: Institution;

        if (!id) return new BadRequestError("Institution ID is required");

        try {
            institution = await prismaClient.institution.update({
                where: {
                    id,
                },
                data: {
                    name: name ? name : undefined
                }
            })
        } catch (error) {
            return new NotFoundError("Institution not found");
        }

        return institution;
    }
}

export { UpdateInstitutionService }