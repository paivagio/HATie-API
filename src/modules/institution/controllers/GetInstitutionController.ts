import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GerInstitutionService } from '../services/GetInstitutionService';

class GetInstitutionController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getInstitutionService = new GerInstitutionService();

        const institution = await getInstitutionService.execute({ id });

        if (institution instanceof Error) {
            return next(institution);
        }

        return res.status(StatusCodes.OK).json(institution);
    }
}

export { GetInstitutionController }