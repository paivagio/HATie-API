'use strict';
//Source: https://github.com/bouiboui/linear16/blob/master/index.js

import ffmpeg from 'fluent-ffmpeg';
import ffmpeg_static from 'ffmpeg-static';
import mime from 'mime';
import fs from 'fs';

async function linear16(filePathIn: string, filePathOut: string): Promise<string> {

    if (('object' === typeof filePathIn) && !filePathOut) {
        const { inPath, outPath } = filePathIn;
        filePathIn = inPath;
        filePathOut = outPath;
    }

    if (!filePathIn || !filePathOut) {
        throw new Error('You must specify a path for both input and output files.');
    }
    if (!fs.existsSync(filePathIn)) {
        throw new Error('Input file must exist.');
    }
    if (mime.getType(filePathIn).indexOf('audio') <= -1) {
        throw new Error('File must have audio mime.');
    }

    return new Promise((resolve, reject) => {
        try {
            ffmpeg()
                .setFfmpegPath(ffmpeg_static)
                .input(filePathIn)
                .outputOptions([
                    '-f s16le',
                    '-acodec pcm_s16le',
                    '-vn',
                    '-ac 1',
                    '-ar 16k',
                    '-map_metadata -1'
                ])
                .save(filePathOut)
                .on('end', () => resolve(filePathOut));

        } catch (e) {
            reject(e);
        }
    });

}

export { linear16 }