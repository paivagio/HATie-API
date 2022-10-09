import { SummarizationStatus } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";
import { InformationExtractionResults, NaturalLanguageProcessingService } from "./tools/NaturalLanguageProcessingService";
import { SpeechToTextService } from "./tools/SpeechToTextService";
import { UpdateSummarizationService } from "./UpdateSummarizationService";

interface IRequest {
    id: string;
    audioPath: string;
    transcription: string;
}

class ValidateSummarizationService {
    async execute({ id, audioPath, transcription }: IRequest) {
        const udpateSummarizationService = new UpdateSummarizationService();
        const naturalLanguageProcessingService = new NaturalLanguageProcessingService();

        const extractedInformation = await naturalLanguageProcessingService.execute({ transcription, audioPath });

        if (extractedInformation instanceof Error) {
            await udpateSummarizationService.execute({ id, status: SummarizationStatus.FAILED });
            return;
        }

        await udpateSummarizationService.execute({ id, ...extractedInformation, status: SummarizationStatus.COMPLETED });
    }
}

export { ValidateSummarizationService }