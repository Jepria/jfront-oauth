export declare type TokenResponse = {
    token_type: string;
    expires_in: bigint;
    access_token: string;
    refresh_token?: string;
};
export declare type OAuthMeta = {
    currentPath: string;
    codeVerifier?: string;
    expiresIn?: Date;
};
export interface OAuthState {
    accessToken?: string;
    expiresIn?: bigint;
    refreshToken?: string;
    tokenType?: string;
    authorizationCode?: string;
    authorizationUrl?: string;
    state?: string;
    isLoading: boolean;
    errorUri?: string;
    errorDescription?: string;
    errorCode?: string;
}
