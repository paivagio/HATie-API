import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { UpdatePatientService } from '../services/UpdatePatientService';

class UpdatePatientController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { fullname, birthdate, height, weight, groupId, institutionId } = req.body;

        const updatePatientService = new UpdatePatientService();

        const patient = await updatePatientService.execute({ id, fullname, birthdate, height, weight, groupId, institutionId });

        if (patient instanceof Error) {
            return next(patient);
        }

        return res.status(StatusCodes.OK).json(patient);
    }
}

export { UpdatePatientController }