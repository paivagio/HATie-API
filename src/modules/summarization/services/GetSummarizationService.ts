import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
}

class GetSummarizationService {
    async execute({ id }: IRequest) {

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