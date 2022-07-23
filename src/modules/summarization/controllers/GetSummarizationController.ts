import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetSummarizationService } from '../services/GetSummarizationService';

class GetSummarizationController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getSummarizationService = new GetSummarizationService();

        const summarization = await getSummarizationService.execute({ id });

        if (summarization instanceof Error) {
            return next(summarization);
        }

        return res.status(StatusCodes.OK).json(summarization);
    }
}

export { GetSummarizationController }