export const AUTHORIZATION_REQUEST = "AUTHORIZATION_REQUEST"
export const AUTHORIZATION_REQUEST_SUCCESS = "AUTHORIZATION_REQUEST_SUCCESS"
export const AUTHORIZATION_REQUEST_FAILURE = "AUTHORIZATION_REQUEST_FAILURE"
export const TOKEN_REQUEST = "TOKEN_REQUEST"
export const TOKEN_REQUEST_SUCCESS = "TOKEN_REQUEST_SUCCESS"
export const TOKEN_REQUEST_FAILURE = "TOKEN_REQUEST_FAILURE"

export interface AuthorizationRequestAction {
  type: typeof AUTHORIZATION_REQUEST
  authorizationUrl: string
}

export interface AuthorizationRequestSuccessAction {
  type: typeof AUTHORIZATION_REQUEST_SUCCESS
  authorizationCode: string
  state: string
}

export interface AuthorizationRequestFailureAction {
  type: typeof AUTHORIZATION_REQUEST_FAILURE
  errorCode: string
  errorDescription?: string
}

export interface TokenRequestAction {
  type: typeof TOKEN_REQUEST
}

export interface TokenRequestSuccessAction {
  type: typeof TOKEN_REQUEST_SUCCESS
  accessToken: string
  expiresIn: bigint
  tokenType: string
  refreshToken?: string
}

export interface TokenRequestFailureAction {
  type: typeof TOKEN_REQUEST_FAILURE
  errorCode: string
  errorUri?: string
  errorDescription?: string
}

export type OAuthActionTypes =
  | AuthorizationRequestAction
  | AuthorizationRequestSuccessAction
  | AuthorizationRequestFailureAction
  | TokenRequestAction
  | TokenRequestSuccessAction
  | TokenRequestFailureAction

export function authorizationRequest(
  authorizationUrl: string,
): OAuthActionTypes {
  return {
    type: AUTHORIZATION_REQUEST,
    authorizationUrl: authorizationUrl,
  }
}

export function authorizationRequestSuccess(
  authorizationCode: string,
  state: string,
): OAuthActionTypes {
  return {
    type: AUTHORIZATION_REQUEST_SUCCESS,
    authorizationCode: authorizationCode,
    state: state,
  }
}

export function authorizationRequestFailure(
  errorCode: string,
  errorDescription?: string,
  errorId?: string,
): OAuthActionTypes {
  return {
    type: AUTHORIZATION_REQUEST_FAILURE,
    errorCode: errorCode,
    errorDescription: errorDescription,
  }
}

export function tokenRequest(): OAuthActionTypes {
  return {
    type: TOKEN_REQUEST,
  }
}

export function tokenRequestSuccess(
  accessToken: string,
  expiresIn: bigint,
  tokenType: string,
  refreshToken?: string,
): OAuthActionTypes {
  return {
    type: TOKEN_REQUEST_SUCCESS,
    accessToken: accessToken,
    expiresIn: expiresIn,
    tokenType: tokenType,
    refreshToken: refreshToken,
  }
}

export function tokenRequestFailure(
  errorCode: string,
  errorUri?: string,
  errorDescription?: string,
  errorId?: string,
): OAuthActionTypes {
  return {
    type: TOKEN_REQUEST_FAILURE,
    errorCode: errorCode,
    errorDescription: errorDescription,
    errorUri: errorUri,
  }
}
