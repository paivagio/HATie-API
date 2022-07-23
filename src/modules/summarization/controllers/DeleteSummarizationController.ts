import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { DeleteSummarizationService } from '../services/DeleteSummarizationService';

class DeleteSummarizationController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const deleteSummarizationService = new DeleteSummarizationService();

        const summarization = await deleteSummarizationService.execute({ id });

        if (summarization instanceof Error) {
            return next(summarization);
        }

        return res.status(StatusCodes.OK).json(summarization);
    }
}

export { DeleteSummarizationController }