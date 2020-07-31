import { Storage } from "./OAuth";
export declare class AuthorizationRequest {
    private clientId;
    private redirectUri;
    private authorizeUrl;
    private responseType;
    private storage;
    private meta;
    private codeVerifier;
    constructor(clientId: string, redirectUri: string, authorizeUrl: string, responseType: string, currentPath: string, storage: Storage);
    private authorizePKCE;
    private authorizeImplicit;
    authorize: () => Promise<string>;
}
