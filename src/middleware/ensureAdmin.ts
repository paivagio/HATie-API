import { Request, Response, NextFunction } from 'express';
import { prismaClient } from "src/database/prismaClient";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {

    const { user_id } = req;

    const { isAdmin } = await prismaClient.user.findFirst({
        where: {
            id: user_id
        }
    })

    if (isAdmin) {
        return next();
    }

    //status 401 =  Unauthorized
    return res.status(401).json({
        error: "Unauthorized"
    });
}