import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { DeleteUserService } from '../services/DeleteUserService';

class DeleteUserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const deleteUserService = new DeleteUserService();

        const user = await deleteUserService.execute({ id });

        if (user instanceof Error) {
            return next(user);
        }

        return res.status(StatusCodes.OK).json(user);
    }
}

export { DeleteUserController }