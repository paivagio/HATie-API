import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { UpdateUserService } from '../services/UpdateUserService';

class ResetPasswordController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { password, code } = req.body;

        if (code !== 123) {
            return res.status(StatusCodes.UNAUTHORIZED).json("Invalid code");
        }

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({ id, password });

        if (user instanceof Error) {
            return next(user);
        }

        return res.status(StatusCodes.OK).json();
    }
}

export { ResetPasswordController };