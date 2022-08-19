import { Status } from "@prisma/client";
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
                Group: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        institutionId: true,
                        createdAt: true,
                        updatedAt: true,
                        _count: {
                            select: {
                                Patient: true
                            }
                        }
                    }
                },
                User: true,
                _count: {
                    select: {
                        Patient: true,
                        Member: true
                    }
                }
            }
        })

        if (!institution) {
            return new NotFoundError("Institution not found");
        }

        return institution;
    }
}

export { GerInstitutionService }