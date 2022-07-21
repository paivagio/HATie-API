import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { DeletePatientService } from '../services/DeletePatientService';

class DeletePatientController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const deletePatientService = new DeletePatientService();

        const patient = await deletePatientService.execute({ id });

        if (patient instanceof Error) {
            return next(patient);
        }

        return res.status(StatusCodes.OK).json(patient);
    }
}

export { DeletePatientController }