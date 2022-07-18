import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { UpdateGroupService } from '../services/UpdateGroupService';

class UpdateGroupController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name, description } = req.body;

        const updateGroupService = new UpdateGroupService();

        const group = await updateGroupService.execute({ id, name, description });

        if (group instanceof Error) {
            return next(group);
        }

        return res.status(StatusCodes.OK).json(group);
    }
}

export { UpdateGroupController }