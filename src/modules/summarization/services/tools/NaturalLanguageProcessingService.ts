import { spawn } from 'child_process';
import { InternalServerError } from 'src/utils/errors';
import axios from "axios";


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
    async execute({ transcription, audioPath }: IRequest) {
        try {
            const url = `${process.env.NLP_API_URL}/extract?transcription=${transcription}&audioPath=${audioPath}`;
            const data = await axios.get<InformationExtractionResults>(url);
            return data;
        } catch (error) {
            throw new InternalServerError("A problem occurred with the information extraction pipeline");
        }
    }
}

export { NaturalLanguageProcessingService, InformationExtractionResults, Insights }

/*
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
*/