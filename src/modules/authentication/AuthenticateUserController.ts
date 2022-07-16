import { NextFunction, Request, Response } from 'express';
import { AuthenticateUserService } from './AuthenticateUserService';

class AuthenticateUserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({
            email,
            password
        });

        if (token instanceof Error) {
            next(token);
            return null;
        }

        return res.status(200).json(token);
    }
}

export { AuthenticateUserController }