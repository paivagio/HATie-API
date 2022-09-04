import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetPatientsService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Institution ID is required");

        const institutionExists = await prismaClient.institution.findFirst({
            where: { id },
        })

        if (!institutionExists) {
            return new NotFoundError("Institution does not exists");
        }

        const patients = await prismaClient.patient.findMany({
            where: {
                institutionId: id
            }
        });

        return patients;
    }
}

export { GetPatientsService }