import { Storage } from "./OAuth";
import { TokenResponse } from "./types";
export declare class TokenRequest {
    private clientId;
    private redirectUri;
    private tokenUrl;
    private storage;
    private nonce?;
    constructor(clientId: string, redirectUri: string, tokenUrl: string, storage: Storage, nonce?: string);
    withAuthorizationCode(authorizationCode: string): Promise<TokenResponse>;
    withRefreshToken(refreshToken: string): Promise<TokenResponse>;
    withUserCredentials(username: string, password: string): Promise<TokenResponse>;
}
