import { spawn } from 'child_process';
import { InternalServerError } from 'src/utils/errors';

interface IRequest {
    transcription: string;
    audioPath: string;
}

interface Insights {
    tags: Array<{ tag: string; category: string }>;
    highlightedTranscription: Array<{ words: string; category: string }>;
    structuredData: {
        conditions: Array<string>;
        substances: {
            medicines: Array<string>;
            other: Array<string>;
        };
        procedures: {
            imagingExams: Array<string>;
            laboratoryTests: Array<string>;
        };
    }
}

interface InformationExtractionResults {
    title: string
    transcription: string;
    audioPath: string;
    insights: Insights;
}

class NaturalLanguageProcessingService {
    async execute(args: IRequest) {
        return new Promise<InformationExtractionResults>((resolve, reject) => {
            let returnedData = "";
            let returnedErrors = "";

            const python = spawn('python', ['./python/main.py', JSON.stringify(args)]);

            python.stdout.on('data', (data: string) => {
                returnedData += data.toString();
            });

            python.stderr.on('data', (data: string) => {
                returnedErrors += data.toString();
            });

            python.stdout.on('close', (code: number) => {
                if (returnedErrors == "") {
                    resolve(JSON.parse(returnedData));
                } else {
                    reject(new InternalServerError(returnedErrors));
                }
            });
        });
    }
}

export { NaturalLanguageProcessingService, InformationExtractionResults, Insights }