import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetGroupMemberService } from '../services/GetGroupMemberService';

class GetGroupMemberController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getGroupMemberService = new GetGroupMemberService();

        const groupMember = await getGroupMemberService.execute({ id });

        if (groupMember instanceof Error) {
            return next(groupMember);
        }

        return res.status(StatusCodes.OK).json(groupMember);
    }
}

export { GetGroupMemberController }