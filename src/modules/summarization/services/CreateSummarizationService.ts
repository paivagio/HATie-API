import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";
import { InformationExtractionResults } from "./tools/NaturalLanguageProcessingService";

interface IRequest {
    id: string;
    data: InformationExtractionResults;
}

class CreateSummarizationService {
    async execute({ id, data }: IRequest) {
        const patientExists = await prismaClient.patient.findFirst({
            where: {
                id
            }
        });

        if (!patientExists) {
            return new NotFoundError("Patient does not exist");
        }

        const summarization = await prismaClient.summarization.create({
            data: {
                patientId: id,
                title: data.title,
                transcription: data.transcription,
                audioPath: data.audioPath,
                insights: data.insights
            }
        })

        return summarization;
    }
}

export { CreateSummarizationService }