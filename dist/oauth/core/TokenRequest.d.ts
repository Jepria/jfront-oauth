import { Storage } from "./OAuth";
import { TokenResponse } from "./types";
/**
 * Получение токена от сервера авторизации.
 */
export declare class TokenRequest {
    private clientId;
    private redirectUri;
    private tokenUrl;
    private storage;
    private nonce?;
    /**
     *
     * @param clientId ID приложения
     * @param redirectUri URL переадресации
     * @param tokenUrl Base URL для получения токенов
     * @param storage временное хранилище данных
     * @param nonce случайная строка
     */
    constructor(clientId: string, redirectUri: string, tokenUrl: string, storage: Storage, nonce?: string);
    /**
     * Получение токена по авторизационному коду.
     * @param authorizationCode
     */
    withAuthorizationCode(authorizationCode: string): Promise<TokenResponse>;
    /**
     * Обновление токена.
     * @param refreshToken
     */
    withRefreshToken(refreshToken: string): Promise<TokenResponse>;
    /**
     * Получение токена по логину/паролю токена.
     * @param username
     * @param password
     */
    withUserCredentials(username: string, password: string): Promise<TokenResponse>;
}
