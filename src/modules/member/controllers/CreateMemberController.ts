import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { CreateMemberService } from '../services/CreateMemberService';

class CreateMemberController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { userId, authorizations } = req.body;

        const createMemberService = new CreateMemberService();

        const member = await createMemberService.execute({ userId, institutionId: id, authorizations });

        if (member instanceof Error) {
            return next(member);
        }

        return res.status(StatusCodes.CREATED).json(member);
    }
}

export { CreateMemberController }