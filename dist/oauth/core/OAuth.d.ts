import { TokenResponse } from './types';
export declare const GrantType: {
    [id: string]: string;
};
export declare const ApplicationType: {
    [id: string]: string;
};
export declare const ApplicationGrantType: {
    [id: string]: Array<string>;
};
export interface Storage {
    /**
     * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
     */
    getItem(key: string): string | null;
    /**
     * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
     */
    removeItem(key: string): void;
    /**
     * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
    */
    setItem(key: string, value: string): void;
}
export declare class OAuth {
    private clientId;
    private redirectUri;
    private authorizeUrl;
    private storage;
    private tokenUrl;
    constructor(clientId: string, redirectUri: string, authorizeUrl: string, tokenUrl: string, storage: Storage);
    authorize: (responseType: string, currentPath: string) => Promise<string>;
    getTokenWithAuthCode: (authorizationCode: string, nonce: string) => Promise<TokenResponse>;
    refreshToken: (refreshToken: string) => Promise<TokenResponse>;
    getTokenWithUserCredentials: (username: string, password: string) => Promise<TokenResponse>;
}
