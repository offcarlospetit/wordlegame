import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type {
    SDKConfig,
    NameSpace,
    ClientStorage,
    RequestConfig,
} from '../types';
import { jsonataResponseAdapter } from '../utils';

interface ResponseAdapter<T, V> {
    (rawRes: T, adapterExpression: string): V;
}

export class SDK {
    protected readonly appId: string;
    protected readonly httpClient: AxiosInstance;
    protected readonly platformId: string;
    protected readonly timeout: number;
    protected readonly bffNameSpace: NameSpace;
    // protected readonly clientStorage: ClientStorage;

    constructor(bffNameSpace: NameSpace, config: SDKConfig) {
        this.bffNameSpace = bffNameSpace;
        this.appId = config.appId;
        this.platformId = config.platformId;
        this.timeout = config.timeout ?? 0; // Zero for non timeout at all
        // this.clientStorage = config.clientStorage;
        this.httpClient = axios.create({
            baseURL: config.url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            timeout: this.timeout,
        });
        this.registerInterceptors();
    }

    get httpClientInstance(): AxiosInstance {
        return this.httpClient;
    }

    get NameSpace(): NameSpace {
        return this.bffNameSpace;
    }

    protected adaptResponse<T, V>(rawRes: T, adapterExpression: string): V {
        const adapter = this.provideResponseAdapter<T, V>();
        return adapter(rawRes, adapterExpression);
    }

    private provideResponseAdapter<T, V>(): ResponseAdapter<T, V> {
        return jsonataResponseAdapter;
    }

    /**
     * Registers Request and Response interceptors for handling typical config
     * updates.
     */
    private registerInterceptors() {
        this.httpClient.interceptors.request.use(async config => {
            const requestConfig = config as RequestConfig;
            if (requestConfig.isPublic) {
                return config;
            }
            // const accessToken = await this.clientStorage.getItem('access_token');
            return {
                ...requestConfig,
                // headers: {
                //     ...requestConfig.headers,
                //     Authorization: `Bearer ${accessToken ?? ''}`,
                // },
            };
        });
    }
}

export class SDKError extends Error {
    public status: number;
    public response: AxiosResponse<any> | null; // eslint-disable-line

    constructor(childError: Error | AxiosError) {
        super(childError.message);

        this.message = childError.message;
        this.name = 'SDKError';
        this.response = null;
        this.stack = childError.stack;
        this.status = 500;

        if (axios.isAxiosError(childError)) {
            this.response = childError.response || null;
            this.status = childError.response?.status || 500;
        }
    }
}

export const clientStorageInstanceMock: ClientStorage = {
    getItem: key => Promise.resolve(key),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
};

