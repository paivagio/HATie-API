import { Patient } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class DeletePatientService {
    async execute({ id }: IRequest) {
        let patient: Patient;

        if (!id) return new BadRequestError("Patient ID is required");

        try {
            patient = await prismaClient.patient.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            return new NotFoundError("Patient not found");
        }

        return patient;
    }
}

export { DeletePatientService }