import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { UpdateSummarizationService } from '../services/UpdateSummarizationService';

class UpdateSummarizationController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { title, transcription, audioPath, insights } = req.body;

        const udpateSummarizationService = new UpdateSummarizationService();

        const summarization = await udpateSummarizationService.execute({ id, title, transcription, audioPath, insights });

        if (summarization instanceof Error) {
            return next(summarization);
        }

        return res.status(StatusCodes.OK).json(summarization);
    }
}

export { UpdateSummarizationController }