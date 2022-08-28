import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { CreateSummarizationService } from '../services/CreateSummarizationService';
import { SummarizationPipelineService } from '../services/SummarizationPipelineService';

type RequestBody = {
    fileUrl: string;
}

class CreateSummarizationController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { fileUrl } = req.body as RequestBody;
        const testEnvironment = fileUrl.toLowerCase().includes("validtestrecording");

        // CREATE ENTRY ON DATABASE
        const createSummarizationService = new CreateSummarizationService();

        const summarization = await createSummarizationService.execute({ id });

        if (summarization instanceof Error) {
            return next(summarization);
        }

        const summarizationPipelineService = new SummarizationPipelineService();
        const { id: summarizationId } = summarization;

        if (!testEnvironment) summarizationPipelineService.execute({ id: summarizationId, fileUrl });

        return res.status(StatusCodes.CREATED).json(summarization);
    }
}

export { CreateSummarizationController }