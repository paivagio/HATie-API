import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetMemberService } from '../services/GetMemberService';

class GetMemberController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getMemberService = new GetMemberService();

        const member = await getMemberService.execute({ id });

        if (member instanceof Error) {
            return next(member);
        }

        return res.status(StatusCodes.OK).json(member);
    }
}

export { GetMemberController }