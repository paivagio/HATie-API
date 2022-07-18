import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { UpdateInstitutionService } from '../services/UpdateInstitutionService';

class UpdateInstitutionController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name } = req.body;

        const updateInstitutionService = new UpdateInstitutionService();

        const institution = await updateInstitutionService.execute({ id, name });

        if (institution instanceof Error) {
            return next(institution);
        }

        return res.status(StatusCodes.OK).json(institution);
    }
}

export { UpdateInstitutionController }