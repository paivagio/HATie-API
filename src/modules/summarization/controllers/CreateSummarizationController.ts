import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { CreateSummarizationService } from '../services/CreateSummarizationService';
import { NaturalLanguageProcessingService } from '../services/tools/NaturalLanguageProcessingService';
import { SpeechToTextService } from '../services/tools/SpeechToTextService';

class CreateSummarizationController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { fileUrl } = req.body;

        // REQUEST AUDIO TRANSCRIPTION TO GOOGLE SPEECH-TO-TEXT API
        const speechToTextService = new SpeechToTextService();

        const transcriptedText = await speechToTextService.execute({ fileUrl });

        if (transcriptedText instanceof Error) {
            return next(transcriptedText);
        }

        // EXTRACT INFORMATION WITH NATURAL LANGUAGE PROCESSING PIPELINE
        const naturalLanguageProcessingService = new NaturalLanguageProcessingService();

        const extractedInformation = await naturalLanguageProcessingService.execute({ transcription: transcriptedText, audioPath: fileUrl });

        if (extractedInformation instanceof Error) {
            return next(extractedInformation);
        }

        // CREATE ENTRY ON DATABASE
        const createSummarizationService = new CreateSummarizationService();

        const summarization = await createSummarizationService.execute({ id, data: extractedInformation });

        if (summarization instanceof Error) {
            return next(summarization);
        }

        return res.status(StatusCodes.CREATED).json(summarization);
    }
}

export { CreateSummarizationController }