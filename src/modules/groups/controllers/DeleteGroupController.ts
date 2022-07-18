import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { DeleteGroupService } from '../services/DeleteGroupService';

class DeleteGroupController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const deleteGroupService = new DeleteGroupService();

        const group = await deleteGroupService.execute({ id });

        if (group instanceof Error) {
            return next(group);
        }

        return res.status(StatusCodes.OK).json(group);
    }
}

export { DeleteGroupController }