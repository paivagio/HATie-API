import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetMembersService } from '../services/GetMembersService';

class GetMembersController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getMembersService = new GetMembersService();

        const members = await getMembersService.execute({ id });

        if (members instanceof Error) {
            return next(members);
        }

        return res.status(StatusCodes.OK).json(members);
    }
}

export { GetMembersController }