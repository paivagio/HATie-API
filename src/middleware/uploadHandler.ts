import { NextFunction, Request, Response } from 'express';
import { Storage } from '@google-cloud/storage';
import { InternalServerError, StatusCodes } from "src/utils/errors";
import fs from 'fs';
require('dotenv/config');

const credentials = JSON.parse(process.env.GOOGLE_API_CREDENTIALS);
const storage = new Storage({ credentials });

function UploadFileToGoogleCloudStorageByBuffer(req: Request, res: Response, next: NextFunction) {
    const bucketName = "hatie-speech-api";
    const filename = `audio-files/${Date.now()}-${req.file.originalname}`;

    const file = storage
        .bucket(bucketName)
        .file(filename);

    const upload = file.createWriteStream({
        resumable: false,
        metadata: {
            contentType: req.file.mimetype,
        }
    });

    upload.on("error", (err) => {
        return res.status(StatusCodes.INTERNAL_SERVER).end(err.message);
    });

    upload.on("finish", async () => {
        try {
            await file.makePublic();
            req.body.fileUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
            next();
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER).end(err.message); //"Successfully uploaded file, but public access was denied"
        }
    });

    upload.end(req.file.buffer);
}

function UploadFileToGoogleCloudStorageFromLocalStorage(req: Request, res: Response, next: NextFunction) {
    const bucketName = "hatie-speech-api";
    const filename = `audio-files/${Date.now()}-${req.file.originalname}`;

    storage
        .bucket(bucketName)
        .upload(req.file.path, { destination: filename })
        .then(async () => {
            try {
                await storage.bucket(bucketName).file(filename).makePublic();
                req.body.fileUrl = `gs://${bucketName}/${filename}`;
                fs.unlinkSync(req.file.path);
                next();
            } catch (err) {
                fs.unlinkSync(req.file.path);
                return res.status(StatusCodes.INTERNAL_SERVER).end(err.message); //"Successfully uploaded file, but public access was denied"
            }
        }).catch((err) => {
            fs.unlinkSync(req.file.path);
            return res.status(StatusCodes.INTERNAL_SERVER).end(err.message);
        });
};

export { UploadFileToGoogleCloudStorageByBuffer, UploadFileToGoogleCloudStorageFromLocalStorage };