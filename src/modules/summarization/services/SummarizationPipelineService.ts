import { SummarizationStatus } from "@prisma/client";
import { prismaClient } from "src/database/prismaClient";
import { NotFoundError } from "src/utils/errors";
import { InformationExtractionResults, NaturalLanguageProcessingService } from "./tools/NaturalLanguageProcessingService";
import { SpeechToTextService } from "./tools/SpeechToTextService";
import { UpdateSummarizationService } from "./UpdateSummarizationService";

interface IRequest {
    id: string;
    fileUrl: string;
}

class SummarizationPipelineService {
    async execute({ id, fileUrl }: IRequest) {
        const udpateSummarizationService = new UpdateSummarizationService();

        // REQUEST AUDIO TRANSCRIPTION TO GOOGLE SPEECH-TO-TEXT API
        const speechToTextService = new SpeechToTextService();

        const transcriptedText = await speechToTextService.execute({ fileUrl });

        if (transcriptedText instanceof Error) {
            await udpateSummarizationService.execute({ id, status: SummarizationStatus.FAILED });
            return;
        }

        // EXTRACT INFORMATION WITH NATURAL LANGUAGE PROCESSING PIPELINE
        const naturalLanguageProcessingService = new NaturalLanguageProcessingService();

        const extractedInformation = await naturalLanguageProcessingService.execute({ transcription: transcriptedText, audioPath: fileUrl });

        if (extractedInformation instanceof Error) {
            await udpateSummarizationService.execute({ id, status: SummarizationStatus.FAILED });
            return;
        }

        await udpateSummarizationService.execute({ id, ...extractedInformation, status: SummarizationStatus.COMPLETED });
    }
}

export { SummarizationPipelineService }