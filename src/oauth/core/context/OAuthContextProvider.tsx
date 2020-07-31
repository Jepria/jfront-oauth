import React, { useReducer, useEffect } from 'react';
import { OAuthContext } from './OAuthContext';
import { OAuthReducer } from '../state/reducer';
import { Storage, OAuth } from '../OAuth';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { authorizationRequest, authorizationRequestFailure, tokenRequest, tokenRequestSuccess, tokenRequestFailure, authorizationRequestSuccess } from '../state/actions';
import { TokenResponse, OAuthMeta } from '../types';

export interface OAuthQueryParams {
  authorizationCode: string | null;
  state: string | null;
  error: string | null;
  errorDescription: string | null;
}

export interface OAuthContextProps {
  onAuthorizationRequest: (authorizationUrl: string) => void;
  isOAuthCallback: () => boolean;
  getQueryParams: () => OAuthQueryParams;
  redirect: (url: string) => void;
  getCurrentUrl: () => string;
  storage: Storage;
  clientId: string;
  redirectUri: string;
  oauthContextPath: string;
  configureAxios?: boolean;
  axiosInstance?: AxiosInstance;
}

/**
 * Базовый Provider OAuth контекста. Не содержит реализаций платформозависимых методов. Они переведены в callback'и в props.
 * 
 * @param param props
 */
export const OAuthContextProvider: React.FC<OAuthContextProps> = ({
  onAuthorizationRequest,
  isOAuthCallback,
  getQueryParams,
  getCurrentUrl,
  redirect,
  storage,
  clientId,
  redirectUri,
  oauthContextPath,
  configureAxios,
  axiosInstance,
  children
}) => {
  const [{
    accessToken,
    expiresIn,
    refreshToken,
    tokenType,
    authorizationCode,
    authorizationUrl,
    state,
    isLoading,
    errorUri,
    errorDescription,
    errorCode
  }, dispatch] = useReducer(OAuthReducer, { isLoading: true })

  const oauth = new OAuth(clientId, redirectUri, oauthContextPath + "/authorize", oauthContextPath + "/token", storage);

  const authorize = () => {
    if (!isOAuthCallback()) {
      oauth.authorize('code', getCurrentUrl())
        .then(result => {
          dispatch(authorizationRequest(result));
        }).catch(error => {
          dispatch(authorizationRequestFailure("UNHANDLED_ERROR", error.message));
        });
    }
  }

  const getToken = (authCode: string, state: string): Promise<TokenResponse> => {
    dispatch(tokenRequest());
    return oauth.getTokenWithAuthCode(authCode, state);
  }

  useEffect(() => {
    if (authorizationUrl) {
      onAuthorizationRequest(authorizationUrl);
    }
  }, [authorizationUrl])

  useEffect(() => {
    if (authorizationCode && state) {
      let metaString = storage.getItem(state);
      getToken(authorizationCode, state).then(result => {
        if (!metaString) {
          throw new Error("state not found");
        }
        let meta: OAuthMeta = JSON.parse(metaString);
        if (result.token_type === 'Bearer') {
          redirect(meta.currentPath);
          dispatch(tokenRequestSuccess(result.access_token, result.expires_in, result.token_type, result.refresh_token));
        } else {
          dispatch(tokenRequestFailure("INVALID_RESPONSE", "Not supported token type"));
        }
      }).catch(error => {
        dispatch(tokenRequestFailure(error.error, error.errorDescription));
      });
    }
  }, [authorizationCode, state])

  useEffect(() => {
    if (isOAuthCallback()) {
      let queryParams = getQueryParams();
      if (queryParams.error) {
        dispatch(authorizationRequestFailure(queryParams.error, queryParams.errorDescription ? queryParams.errorDescription : undefined));
        return;
      }
      if (!queryParams.authorizationCode) {
        dispatch(authorizationRequestFailure("INVALID_REQUEST", "Empty authorization code"));
        return;
      }
      if (!queryParams.state) {
        dispatch(authorizationRequestFailure("INVALID_REQUEST", "Empty state"));
        return;
      }
      dispatch(authorizationRequestSuccess(queryParams.authorizationCode, queryParams.state));
    }
  }, [])

  useEffect(() => {
    if (configureAxios && accessToken) {
      let currentAxios: AxiosInstance = axiosInstance ? axiosInstance : axios;
      currentAxios.interceptors.request.use((config: AxiosRequestConfig) => {
        if (expiresIn && Date.now() < expiresIn) {
          authorize();
        }
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
      });
      currentAxios.interceptors.response.use((response: AxiosResponse) => {
        if (401 === response?.status) {
          authorize();
        }
        return response;
      }, (error: AxiosError) => {
        if (401 === error?.response?.status) {
          authorize();
        }
      });
    }
  }, [accessToken])

  return (
    <OAuthContext.Provider value={{
      authorize,
      accessToken,
      expiresIn,
      refreshToken,
      tokenType,
      isLoading,
      errorUri,
      errorDescription,
      errorCode
    }}>
      {children}
    </OAuthContext.Provider>
  );
}