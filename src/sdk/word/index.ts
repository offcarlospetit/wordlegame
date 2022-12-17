import type { WordReq, WordResponse, WordResAdapt } from '../types';
import type { RequestConfig, SDKConfig } from '../types';
import { SDK, SDKError } from '../core';
import { wordAdapter } from './adapters/word';

interface Encryptor {
    (rawPass: string, secret: string): string;
}

export class Word extends SDK {

    constructor(config: SDKConfig) {
        super('word', config);
    }

    public async wordRequest(payload: WordReq): Promise<WordResAdapt> {
        const reqConfig: RequestConfig = {
            isPublic: true,
            url: `/api/v2/entries/${payload.language}/${payload.word}`,
            method: 'GET',
        };
        try {
            const rawResponse = await this.httpClient.request<WordResponse>(reqConfig);
            return this.adaptResponse<WordResponse, WordResAdapt>(rawResponse.data, wordAdapter);
        } catch (error) {
            throw new SDKError(error as Error);
        }
    }
}

