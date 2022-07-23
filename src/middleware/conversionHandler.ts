import { Request, Response, NextFunction } from 'express';
import { linear16 } from 'src/utils/converters';
import { StatusCodes } from 'src/utils/errors';
import fs from 'fs';

export function FlacConverter(req: Request, res: Response, next: NextFunction) {
    const outPath = req.file.path.replace(/.m4a$/, '.raw');
    const outName = req.file.originalname.replace(/.m4a$/, '.raw');

    return linear16(req.file.path, outPath)
        .then((response) => {
            fs.unlinkSync(req.file.path);
            req.file = {
                fieldname: 'file',
                originalname: outName,
                encoding: '16bit',
                mimetype: 'audio/raw',
                destination: './src/uploads/',
                filename: outName,
                path: response,
                size: req.file.size,
                stream: null,
                buffer: null,
            };
            next();
        }).catch((err) => {
            fs.unlinkSync(req.file.path);
            return res.status(StatusCodes.INTERNAL_SERVER).end(err);
        })
};