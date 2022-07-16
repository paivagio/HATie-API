import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { UpdateMemberService } from '../services/UpdateMemberService';

class UpdateMemberController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { authorizations } = req.body;

        const updateMemberService = new UpdateMemberService();

        const member = await updateMemberService.execute({ id, authorizations });

        if (member instanceof Error) {
            return next(member);
        }

        return res.status(StatusCodes.OK).json(member);
    }
}

export { UpdateMemberController }