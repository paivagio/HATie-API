import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    fullname: string;
    birthdate?: string;
    height?: number;
    weight?: number;
    groupId?: string;
    id: string;
}

class CreatePatientService {
    async execute({ id, fullname, birthdate, height, weight, groupId }: IRequest) {
        const institutionExists = await prismaClient.institution.findFirst({
            where: {
                id
            }
        });

        if (!institutionExists) {
            return new NotFoundError("Institution does not exist");
        }

        if (groupId) {
            const groupExists = await prismaClient.group.findFirst({
                where: {
                    id: groupId,
                    institutionId: id
                }
            })

            if (!groupExists) {
                return new NotFoundError("Group does not exist or is not linked to the institution");
            }
        }

        const patient = await prismaClient.patient.create({
            data: {
                fullname: fullname,
                birthDate: birthdate ? new Date(birthdate) : undefined,
                height: height ? height : undefined,
                weight: weight ? weight : undefined,
                groupId: groupId ? groupId : undefined,
                institutionId: id
            }
        })

        return patient;
    }
}

export { CreatePatientService }