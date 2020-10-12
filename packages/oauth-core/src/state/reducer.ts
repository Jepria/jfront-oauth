import { OAuthState } from "../types"
import {
  OAuthActionTypes,
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_REQUEST_SUCCESS,
  AUTHORIZATION_REQUEST_FAILURE,
  TOKEN_REQUEST,
  TOKEN_REQUEST_SUCCESS,
  TOKEN_REQUEST_FAILURE,
} from "./actions"
/**
 * Базовый редьюсер OAuth.
 * @param state
 * @param action
 */
export const OAuthReducer = (
  state: OAuthState,
  action: OAuthActionTypes,
): OAuthState => {
  switch (action.type) {
    case AUTHORIZATION_REQUEST: {
      return {
        authorizationUrl: action.authorizationUrl,
        isLoading: true,
      }
    }
    case AUTHORIZATION_REQUEST_SUCCESS: {
      return {
        authorizationCode: action.authorizationCode,
        state: action.state,
        isLoading: false,
      }
    }
    case AUTHORIZATION_REQUEST_FAILURE: {
      return {
        errorCode: action.errorCode,
        errorDescription: action.errorDescription,
        isLoading: false,
      }
    }
    case TOKEN_REQUEST: {
      return {
        authorizationCode: state.authorizationCode,
        state: state.state,
        isLoading: true,
      }
    }
    case TOKEN_REQUEST_SUCCESS: {
      return {
        accessToken: action.accessToken,
        expiresIn: action.expiresIn,
        refreshToken: action.refreshToken,
        tokenType: action.tokenType,
        authorizationCode: undefined,
        isLoading: false,
      }
    }
    case TOKEN_REQUEST_FAILURE: {
      return {
        errorCode: action.errorCode,
        errorDescription: action.errorDescription,
        errorUri: action.errorUri,
        isLoading: false,
      }
    }
  }
}
