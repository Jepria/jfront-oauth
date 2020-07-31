export declare const AUTHORIZATION_REQUEST = "AUTHORIZATION_REQUEST";
export declare const AUTHORIZATION_REQUEST_SUCCESS = "AUTHORIZATION_REQUEST_SUCCESS";
export declare const AUTHORIZATION_REQUEST_FAILURE = "AUTHORIZATION_REQUEST_FAILURE";
export declare const TOKEN_REQUEST = "TOKEN_REQUEST";
export declare const TOKEN_REQUEST_SUCCESS = "TOKEN_REQUEST_SUCCESS";
export declare const TOKEN_REQUEST_FAILURE = "TOKEN_REQUEST_FAILURE";
export interface AuthorizationRequestAction {
    type: typeof AUTHORIZATION_REQUEST;
    authorizationUrl: string;
}
export interface AuthorizationRequestSuccessAction {
    type: typeof AUTHORIZATION_REQUEST_SUCCESS;
    authorizationCode: string;
    state: string;
}
export interface AuthorizationRequestFailureAction {
    type: typeof AUTHORIZATION_REQUEST_FAILURE;
    errorCode: string;
    errorDescription?: string;
}
export interface TokenRequestAction {
    type: typeof TOKEN_REQUEST;
}
export interface TokenRequestSuccessAction {
    type: typeof TOKEN_REQUEST_SUCCESS;
    accessToken: string;
    expiresIn: bigint;
    tokenType: string;
    refreshToken?: string;
}
export interface TokenRequestFailureAction {
    type: typeof TOKEN_REQUEST_FAILURE;
    errorCode: string;
    errorUri?: string;
    errorDescription?: string;
}
export declare type OAuthActionTypes = AuthorizationRequestAction | AuthorizationRequestSuccessAction | AuthorizationRequestFailureAction | TokenRequestAction | TokenRequestSuccessAction | TokenRequestFailureAction;
export declare function authorizationRequest(authorizationUrl: string): OAuthActionTypes;
export declare function authorizationRequestSuccess(authorizationCode: string, state: string): OAuthActionTypes;
export declare function authorizationRequestFailure(errorCode: string, errorDescription?: string, errorId?: string): OAuthActionTypes;
export declare function tokenRequest(): OAuthActionTypes;
export declare function tokenRequestSuccess(accessToken: string, expiresIn: bigint, tokenType: string, refreshToken?: string): OAuthActionTypes;
export declare function tokenRequestFailure(errorCode: string, errorUri?: string, errorDescription?: string, errorId?: string): OAuthActionTypes;
