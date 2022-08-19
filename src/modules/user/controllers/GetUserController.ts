import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetUserService } from '../services/GetUserService';

class GetUserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        console.log(id);

        const getUserService = new GetUserService();

        const user = await getUserService.execute({ id });

        if (user instanceof Error) {
            return next(user);
        }

        return res.status(StatusCodes.OK).json(user);
    }
}

export { GetUserController }