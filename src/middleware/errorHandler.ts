import { Request, Response, NextFunction } from 'express';
import { BaseError } from 'src/utils/errors';

export function ErrorHandler(err: BaseError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
        return res.status(err.status).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
};