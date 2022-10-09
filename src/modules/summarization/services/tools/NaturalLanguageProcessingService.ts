import { spawn } from 'child_process';
import { InternalServerError } from 'src/utils/errors';
import axios from "axios";


interface IRequest {
    transcription: string;
    audioPath: string;
}

interface Insights {
    tags: Array<{ token: string; category: string }>;
    highlightedTranscription: Array<{ token: string; category: string }>;
    structuredData: {
        clinicaldepartments: Array<string>;
        occurances: Array<string>;
        problems: Array<string>;
        tests: Array<string>;
        treatments: Array<string>;
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
            return data.data;
        } catch (error) {
            return new InternalServerError(error); //"A problem occurred with the information extraction pipeline"
        }
    }
}

export { NaturalLanguageProcessingService, InformationExtractionResults, Insights }