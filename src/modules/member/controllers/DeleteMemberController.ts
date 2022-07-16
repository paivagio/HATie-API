import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { DeleteMemberService } from '../services/DeleteMemberService';

class DeleteMemberController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const deleteMemberService = new DeleteMemberService();

        const member = await deleteMemberService.execute({ id });

        if (member instanceof Error) {
            return next(member);
        }

        return res.status(StatusCodes.OK).json(member);
    }
}

export { DeleteMemberController }