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
/**
 * Реализация протокола OAuth
 */
export declare class OAuth {
    private clientId;
    private redirectUri;
    private authorizeUrl;
    private logoutUrl;
    private tokenUrl;
    private storage;
    /**
     *
     * @param clientId ID приложения
     * @param redirectUri URL переадресации
     * @param authorizeUrl Base URL авторизации
     * @param tokenUrl Base URL для получения токенов
     * @param storage временное хранилище данных
     */
    constructor(clientId: string, redirectUri: string, authorizeUrl: string, tokenUrl: string, logoutUrl: string, storage: Storage);
    /**
     * Authorization Code/Implicit flow.
     * @param responseType Тип ответа
     * @param currentPath текущий URL приложения
     */
    authorize: (responseType: string, currentPath: string) => Promise<string>;
    /**
     * Получение токена по авторизационному коду.
     * @param authorizationCode
     * @param nonce
     */
    getTokenWithAuthCode: (authorizationCode: string, nonce: string) => Promise<TokenResponse>;
    /**
     * Обновление токена.
     * @param refreshToken
     */
    refreshToken: (refreshToken: string) => Promise<TokenResponse>;
    /**
     * Получение токена по логину/паролю токена.
     * @param username
     * @param password
     */
    getTokenWithUserCredentials: (username: string, password: string) => Promise<TokenResponse>;
    logout: (currentPath: string) => string;
}
