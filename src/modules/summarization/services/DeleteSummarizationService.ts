import { Summarization } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class DeleteSummarizationService {
    async execute({ id }: IRequest) {
        let summarization: Summarization;

        if (!id) return new BadRequestError("Summarization ID is required");

        try {
            summarization = await prismaClient.summarization.delete({
                where: {
                    id,
                }
            })
        } catch (error) {
            return new NotFoundError("Summarization entry not found");
        }

        return summarization;
    }
}

export { DeleteSummarizationService }