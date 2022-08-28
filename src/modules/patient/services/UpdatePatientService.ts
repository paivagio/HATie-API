import { Patient } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    fullname?: string;
    birthdate?: string;
    height?: number;
    weight?: number;
    groupId?: string;
    institutionId: string;
    id: string;
}

class UpdatePatientService {
    async execute({ id, fullname, birthdate, height, weight, groupId, institutionId }: IRequest) {
        let patient: Patient;

        if (!id) return new BadRequestError("Patient ID is required");

        if (groupId && groupId !== "") {
            if (!institutionId) return new BadRequestError("The institution ID is required if you want to change the patient's group");

            const institutionExists = await prismaClient.institution.findFirst({
                where: {
                    id: institutionId
                }
            });

            if (!institutionExists) return new NotFoundError("Institution does not exist");

            const groupExists = await prismaClient.group.findFirst({
                where: {
                    id: groupId,
                    institutionId: institutionId
                }
            })

            if (!groupExists) {
                return new NotFoundError("Group does not exist or is not linked to the institution");
            }
        }

        try {
            patient = await prismaClient.patient.update({
                where: {
                    id,
                },
                data: {
                    fullname: fullname ? fullname : undefined,
                    birthDate: birthdate ? new Date(birthdate) : undefined,
                    height: height ? height : undefined,
                    weight: weight ? weight : undefined,
                    groupId: groupId ? groupId : (groupId === "" ? null : undefined)
                }
            });
        } catch (error) {
            console.log(error)
            return new NotFoundError("Patient not found");
        }

        return patient;
    }
}

export { UpdatePatientService }