import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { UpdateGroupMemberService } from '../services/UpdateGroupMemberService';

class UpdateGroupMemberController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { authorizations } = req.body;

        const updateGroupMemberService = new UpdateGroupMemberService();

        const groupMember = await updateGroupMemberService.execute({ id, authorizations });

        if (groupMember instanceof Error) {
            return next(groupMember);
        }

        return res.status(StatusCodes.OK).json(groupMember);
    }
}

export { UpdateGroupMemberController }