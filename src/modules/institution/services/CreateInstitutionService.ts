import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    ownerId: string;
    name: string;
}

class CreateInstitutionService {
    async execute({ ownerId, name }: IRequest) {

        const ownerExists = await prismaClient.user.findFirst({
            where: { id: ownerId },
        })

        if (!ownerExists) {
            return new NotFoundError("Owner does not exists");
        }

        const institution = await prismaClient.institution.create({
            data: {
                ownerId: ownerId,
                name: name
            }
        });

        return institution;
    }
}

export { CreateInstitutionService }