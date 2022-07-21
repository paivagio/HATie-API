import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetPatientService } from '../services/GetPatientService';

class GetPatientController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getPatientService = new GetPatientService();

        const patient = await getPatientService.execute({ id });

        if (patient instanceof Error) {
            return next(patient);
        }

        return res.status(StatusCodes.OK).json(patient);
    }
}

export { GetPatientController }