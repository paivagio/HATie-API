import { Summarization } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";

interface IRequest {
    id: string;
    transcription: string;
    audioPath: string;
}

class UpdateSummarizationService {
    async execute({ id, transcription, audioPath }: IRequest) {
        let summarization: Summarization;

        if (!id) {
            return new BadRequestError("ID field is required");
        }

        try {
            summarization = await prismaClient.summarization.update({
                where: {
                    id,
                },
                data: {
                    transcription: transcription ? transcription : undefined,
                    audioPath: audioPath ? (audioPath === "clear" ? null : audioPath) : undefined
                }
            })
            console.log(audioPath === "")
        } catch (error) {
            return new NotFoundError("Summarization entry not found");
        };

        return summarization;
    }
}

export { UpdateSummarizationService }