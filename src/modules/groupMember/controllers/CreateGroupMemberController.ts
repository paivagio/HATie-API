import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { CreateGroupMemberService } from '../services/CreateGroupMemberService';

class CreateGroupMemberController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { memberId, authorizations } = req.body;

        const createGroupMemberService = new CreateGroupMemberService();

        const groupMember = await createGroupMemberService.execute({ id, memberId, authorizations });

        if (groupMember instanceof Error) {
            return next(groupMember);
        }

        return res.status(StatusCodes.CREATED).json(groupMember);
    }
}

export { CreateGroupMemberController }