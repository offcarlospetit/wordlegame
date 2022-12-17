import type { AxiosRequestConfig } from 'axios';

// Core SDK class definitions
export { SDKError, SDK } from '../core';


export interface WordResponse {
    id: string,
    metadata: {
        operation: string,
        provider: string,
        schema: string;
    },
    results: [
        {
            id: string,
            language: string,
            lexicalEntries: [
                {
                    entries: [
                        {
                            senses: [
                                {
                                    definitions: Array<string>,
                                    id: string,
                                    subsenses: Array<{ definitions: Array<string>, id: string; }>;
                                },
                            ];
                        }
                    ],
                    language: string,
                    lexicalCategory: {
                        id: string,
                        text: string;
                    },
                    text: string;
                },
            ],
            type: string,
            word: string;
        }
    ],
    word: string;
}

export interface WordReq {
    word: string;
    language: 'es' | 'en-u' | 'en';
}

export interface WordResAdapt {
    status: {
        code: number;
        message: string;
    },
    data: {
        word: string;
        meanings: string;
    };
}

// SDK available Namespaces
export type NameSpace = 'word';

export interface SDKConfig {
    appId: string;
    platformId: string;
    url: string;
    timeout?: number;
    clientStorage: ClientStorage | null;
}

export interface ResStatus {
    code: string;
    message: string;
}

export interface ResEnvelope<T> {
    status: ResStatus;
    data: T | null;
}

export interface ResEnvelopeNoData {
    status: ResStatus;
    data: null;
}

export interface RequestConfig extends AxiosRequestConfig {
    isPublic?: boolean;
    isRetrying?: boolean; // This is for future implementation of OAuth2 refreshing token flow
}

export interface ClientStorage {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}

