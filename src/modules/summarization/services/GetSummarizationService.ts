import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetSummarizationService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Summarization ID is required");

        const summarization = await prismaClient.summarization.findFirst({
            where: {
                id,
            }
        });

        if (!summarization) {
            return new NotFoundError("Summarization entry not found");
        }

        return summarization;
    }
}

export { GetSummarizationService }