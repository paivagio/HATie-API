import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { Service } from './mockService';

class Controller {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body;

        const service = new Service();

        const user = await service.execute({ id });

        if (user instanceof Error) {
            return next(user);
        }

        return res.status(StatusCodes.CREATED).json(user);
    }
}

export { Controller }