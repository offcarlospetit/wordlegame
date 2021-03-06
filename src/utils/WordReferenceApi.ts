import { Word } from "../sdk";
import { SDKConfig } from "../sdk/types";

export const ApiCall = async (wordPayload: string): Promise<boolean> => {
    try {
        const sdkConfig: SDKConfig = {
            appId: "nalgas",
            clientStorage: null,
            platformId: 'app',
            url: 'https://od-api.oxforddictionaries.com',
        }
        const word = new Word(sdkConfig)
        const response = await word.wordRequest({ word: wordPayload.toLowerCase(), language: 'es' })
        if (response.status.code == 200)
            return true

        return false
    } catch (error) {
        console.log({ error })
        return false
    }
}

