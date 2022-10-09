import { SummarizationStatus } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { SummarizationPipelineService } from '../services/SummarizationPipelineService';
import { UpdateSummarizationService } from '../services/UpdateSummarizationService';
import { ValidateSummarizationService } from '../services/ValidateSummarizationService';

type RequestBody = {
    fileUrl: string;
}

class ValidateSummarizationController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { transcription } = req.body;

        const udpateSummarizationService = new UpdateSummarizationService();

        const summarization = await udpateSummarizationService.execute({ id, status: SummarizationStatus.PROCESSING });

        if (summarization instanceof Error) {
            return next(summarization);
        }

        const summarizationPipelineService = new ValidateSummarizationService();
        const { id: summarizationId } = summarization;

        summarizationPipelineService.execute({ id: summarizationId, audioPath: summarization.audioPath, transcription });

        return res.status(StatusCodes.CREATED).json(summarization);
    }
}

export { ValidateSummarizationController }