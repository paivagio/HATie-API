import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { AuthenticateUserService } from './AuthenticateUserService';

interface AuthenticateUserResponse {
    token: string;
    user: User;
}

class AuthenticateUserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const authenticateUserService = new AuthenticateUserService();

        const response = await authenticateUserService.execute({
            email,
            password
        }) as AuthenticateUserResponse;

        if (response instanceof Error) {
            next(response);
            return null;
        }

        return res.status(StatusCodes.OK).json(response);
    }
}

export { AuthenticateUserController }