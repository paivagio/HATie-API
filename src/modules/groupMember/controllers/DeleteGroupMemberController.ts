import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { DeleteGroupMemberService } from '../services/DeleteGroupMemberService';

class DeleteGroupMemberController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const deleteGroupMemberService = new DeleteGroupMemberService();

        const groupMember = await deleteGroupMemberService.execute({ id });

        if (groupMember instanceof Error) {
            return next(groupMember);
        }

        return res.status(StatusCodes.OK).json(groupMember);
    }
}

export { DeleteGroupMemberController }