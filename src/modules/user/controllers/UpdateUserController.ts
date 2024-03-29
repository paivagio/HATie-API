import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { UpdateUserService } from '../services/UpdateUserService';

class UpdateUserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { fullname, email, password, preferences } = req.body;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({ id, fullname, email, password, preferences });

        if (user instanceof Error) {
            return next(user);
        }

        return res.status(StatusCodes.OK).json(user);
    }
}

export { UpdateUserController };