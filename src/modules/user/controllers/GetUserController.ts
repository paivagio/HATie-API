import { NextFunction, Request, Response } from 'express';
import { GetUserService } from '../services/GetUserService';

class GetUserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getUserService = new GetUserService();

        const user = await getUserService.execute({ id });

        if (user instanceof Error) {
            return next(user);
        }

        return res.status(200).json(user);
    }
}

export { GetUserController }