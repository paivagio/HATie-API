import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetGroupService } from '../services/GetGroupService';

class GetGroupController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getGroupService = new GetGroupService();

        const group = await getGroupService.execute({ id });

        if (group instanceof Error) {
            return next(group);
        }

        return res.status(StatusCodes.OK).json(group);
    }
}

export { GetGroupController }