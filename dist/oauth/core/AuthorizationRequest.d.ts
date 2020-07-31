import { Storage } from "./OAuth";
/**
 * Реализации Authorization Code Flow. Генерация Authorization URL для доступа к серверу авторизации.
 */
export declare class AuthorizationRequest {
    private clientId;
    private redirectUri;
    private authorizeUrl;
    private responseType;
    private storage;
    private meta;
    private codeVerifier;
    /**
     *
     * @param clientId ID приложения
     * @param redirectUri URL переадресации
     * @param authorizeUrl Base URL авторизации
     * @param responseType Тип ответа
     * @param currentPath Текущий URL приложения
     * @param storage временное хранилище данных
     */
    constructor(clientId: string, redirectUri: string, authorizeUrl: string, responseType: string, currentPath: string, storage: Storage);
    private authorizePKCE;
    private authorizeImplicit;
    authorize: () => Promise<string>;
}
