import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { CreatePatientService } from '../services/CreatePatientService';

class CreatePatientController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { fullname, birthdate, height, weight, groupId } = req.body;

        const createPatientService = new CreatePatientService();

        const patient = await createPatientService.execute({ id, fullname, birthdate, height, weight, groupId });

        if (patient instanceof Error) {
            return next(patient);
        }

        return res.status(StatusCodes.CREATED).json(patient);
    }
}

export { CreatePatientController }