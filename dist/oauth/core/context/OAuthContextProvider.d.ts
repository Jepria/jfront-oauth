import React from 'react';
import { Storage } from '../OAuth';
import { AxiosInstance } from 'axios';
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
export declare const OAuthContextProvider: React.FC<OAuthContextProps>;
