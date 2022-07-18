import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { CreateGroupService } from '../services/CreateGroupService';

class CreateGroupController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name, description } = req.body;

        const createGroupService = new CreateGroupService();

        const group = await createGroupService.execute({ id, name, description });

        if (group instanceof Error) {
            return next(group);
        }

        return res.status(StatusCodes.CREATED).json(group);
    }
}

export { CreateGroupController }