import { Request, Response, NextFunction } from 'express';
import util from "util";
import Multer from "multer";
import { StatusCodes } from 'src/utils/errors';
import fs from 'fs';
import path from 'path';

export function FileHandler(req: Request, res: Response, next: NextFunction) {
    const maxSize = 10 * 1024 * 1024;

    var multerStorage = Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname.replace(/.m4a$/, '') + path.extname(file.originalname))
        }
    })

    const multer = Multer({
        storage: multerStorage,//Multer.memoryStorage()
        limits: { fileSize: maxSize },
        dest: "./src/uploads/"
    }).single("file");

    let middleware = util.promisify(multer);

    return middleware(req, res)
        .then(() => {
            if (!req.file) {
                return res.status(StatusCodes.NOT_FOUND).end("Please upload a file");
            }
            if (!req.file.filename.match(".m4a")) {
                fs.unlinkSync(req.file.path);
                return res.status(StatusCodes.BAD_REQUEST).end("Invalid file type. Supported types: [ m4a ]")
            }
            return next();
        })
        .catch(err => {
            if (err.code == "LIMIT_FILE_SIZE") {
                return res.status(StatusCodes.BAD_REQUEST).end("File size cannot be larger than 10MB");
            }
            return res.status(StatusCodes.INTERNAL_SERVER).end(err.message);
        });
};