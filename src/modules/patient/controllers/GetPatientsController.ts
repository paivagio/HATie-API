import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'src/utils/errors';
import { GetPatientsService } from '../services/GetPatientsService';

class GetPatientsController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const getPatientsService = new GetPatientsService();

        const patients = await getPatientsService.execute({ id });

        if (patients instanceof Error) {
            return next(patients);
        }

        return res.status(StatusCodes.OK).json(patients);
    }
}

export { GetPatientsController }