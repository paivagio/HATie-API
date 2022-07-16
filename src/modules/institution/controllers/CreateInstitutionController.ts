import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { CreateInstitutionService } from '../services/CreateInstitutionService';

class CreateInstitutionController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { ownerId, name } = req.body;

        const createInstitutionService = new CreateInstitutionService();

        const institution = await createInstitutionService.execute({ ownerId, name });

        if (institution instanceof Error) {
            return next(institution);
        }

        return res.status(StatusCodes.CREATED).json(institution);
    }
}

export { CreateInstitutionController }