import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GerInstitutionService {
    async execute({ id }: IRequest) {

        const institution = await prismaClient.institution.findFirst({
            where: {
                id,
            },
            include: {
                Group: true
            }
        })

        if (!institution) {
            return new NotFoundError("Institution not found");
        }

        return institution;
    }
}

export { GerInstitutionService }