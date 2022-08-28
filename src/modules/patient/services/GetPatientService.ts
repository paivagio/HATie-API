import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetPatientService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Patient ID is required");

        const patient = await prismaClient.patient.findFirst({
            where: {
                id,
            },
            include: {
                Summarization: true
            }
        });

        if (!patient) {
            return new NotFoundError("Patient not found");
        }

        return patient;
    }
}

export { GetPatientService }