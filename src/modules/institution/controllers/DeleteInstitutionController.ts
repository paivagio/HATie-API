import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { DeleteInstitutionService } from '../services/DeleteInstitutionService';

class DeleteInstitutionController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const deleteInstitutionService = new DeleteInstitutionService();

        const institution = await deleteInstitutionService.execute({ id });

        if (institution instanceof Error) {
            return next(institution);
        }

        return res.status(StatusCodes.OK).json(institution);
    }
}

export { DeleteInstitutionController }