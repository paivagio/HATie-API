import speech from '@google-cloud/speech';
import { google } from '@google-cloud/speech/build/protos/protos';
import { InternalServerError } from 'src/utils/errors';
require('dotenv/config');

const credentials = JSON.parse(process.env.GOOGLE_API_CREDENTIALS);
const client = new speech.SpeechClient({ credentials });

interface IRequest {
    fileUrl: string;
}

class SpeechToTextService {
    async execute({ fileUrl }: IRequest) {
        const encodings = google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
        const request = {
            audio: {
                uri: fileUrl, // 'gs://cloud-samples-data/speech/brooklyn_bridge.raw'
            },
            config: {
                encoding: encodings.LINEAR16,
                sampleRateHertz: 16000,
                languageCode: 'pt-BR',
                audioChannelCount: 1,
                model: 'default',
                enableAutomaticPunctuation: true
            }
        };

        let transcription: string;
        try {
            const [operation] = await client.longRunningRecognize(request);
            const [response] = await operation.promise();
            transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
        } catch (err) {
            return new InternalServerError(err);
        }

        return transcription;
    }
}

export { SpeechToTextService }