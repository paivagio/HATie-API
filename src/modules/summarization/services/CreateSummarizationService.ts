import { prismaClient } from "src/database/prismaClient";
import { BadRequestError, NotFoundError } from "src/utils/errors";
import { InformationExtractionResults } from "./tools/NaturalLanguageProcessingService";

interface IRequest {
    id: string;
}

class CreateSummarizationService {
    async execute({ id }: IRequest) {
        if (!id) return new BadRequestError("Patient ID is required");

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
                title: "",
                transcription: "",
                audioPath: null,
                insights: {}
            }
        })

        return summarization;
    }
}

export { CreateSummarizationService }