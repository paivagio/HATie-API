import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { CreateSummarizationService } from '../services/CreateSummarizationService';
import { SummarizationPipelineService } from '../services/SummarizationPipelineService';

class CreateSummarizationController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { fileUrl } = req.body;

        // CREATE ENTRY ON DATABASE
        const createSummarizationService = new CreateSummarizationService();

        const summarization = await createSummarizationService.execute({ id });

        if (summarization instanceof Error) {
            return next(summarization);
        }

        const summarizationPipelineService = new SummarizationPipelineService();
        const { id: summarizationId } = summarization;

        summarizationPipelineService.execute({ id: summarizationId, fileUrl });

        return res.status(StatusCodes.CREATED).json(summarization);
    }
}

export { CreateSummarizationController }