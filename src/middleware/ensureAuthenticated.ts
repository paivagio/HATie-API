import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
require('dotenv/config');

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.SALT) as IPayload;
        req.user_id = sub;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).end();
    }
}