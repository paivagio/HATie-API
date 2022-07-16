import { Request, Response } from 'express';
import { Service } from './mockService';

class Controller {
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        const service = new Service();

        const user = await service.execute({ id });

        return res.json(user);
    }
}

export { Controller }