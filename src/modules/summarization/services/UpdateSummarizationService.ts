import { Summarization, SummarizationStatus } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";
import { Insights } from "./tools/NaturalLanguageProcessingService";

interface IRequest {
    id: string;
    title?: string;
    transcription?: string;
    audioPath?: string;
    insights?: Insights;
    status?: SummarizationStatus;
}

class UpdateSummarizationService {
    async execute({ id, title, transcription, audioPath, insights, status }: IRequest) {
        let summarization: Summarization;

        if (!id) return new BadRequestError("Summarization ID is required");

        try {
            summarization = await prismaClient.summarization.update({
                where: {
                    id,
                },
                data: {
                    title: title ? title : undefined,
                    transcription: transcription ? transcription : undefined,
                    audioPath: audioPath ? (audioPath === "clear" ? null : audioPath) : undefined,
                    insights: insights ? { ...insights } : undefined,
                    status: status ? status : undefined
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