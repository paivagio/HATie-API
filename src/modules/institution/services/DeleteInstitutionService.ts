import { Institution } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class DeleteInstitutionService {
    async execute({ id }: IRequest) {
        let institution: Institution;

        if (!id) return new BadRequestError("Institution ID is required");

        try {
            institution = await prismaClient.institution.delete({
                where: {
                    id,
                }
            })
        } catch (error) {
            return new NotFoundError("Institution not found");
        }

        return institution;
    }
}

export { DeleteInstitutionService }