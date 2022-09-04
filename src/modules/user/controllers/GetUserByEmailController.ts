import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetUserService } from '../services/GetUserService';

class GetUserByEmailController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { email } = req.params;

        const getUserService = new GetUserService();

        const user = await getUserService.execute({ email });

        if (user instanceof Error) {
            return next(user);
        }

        return res.status(StatusCodes.OK).json(user);
    }
}

export { GetUserByEmailController }