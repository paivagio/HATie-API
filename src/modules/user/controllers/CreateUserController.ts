import { NextFunction, Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { fullname, email, password, isAdmin, preferences } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ fullname, email, password, isAdmin, preferences });

        if (user instanceof Error) {
            return next(user);
        }

        return res.status(201).json(user);
    }
}

export { CreateUserController }