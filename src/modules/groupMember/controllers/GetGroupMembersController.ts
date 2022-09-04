import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetGroupMembersService } from '../services/GetGroupMembersService';

class GetGroupMembersController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getGroupMembersService = new GetGroupMembersService();

        const groupMember = await getGroupMembersService.execute({ id });

        if (groupMember instanceof Error) {
            return next(groupMember);
        }

        return res.status(StatusCodes.OK).json(groupMember);
    }
}

export { GetGroupMembersController }