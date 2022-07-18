import { Institution } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
    name: string;
}

class UpdateInstitutionService {
    async execute({ id, name }: IRequest) {
        let institution: Institution;

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