import React from 'react';
import { AxiosInstance } from 'axios';
export interface OAuthWebContextProps {
    clientId: string;
    redirectUri: string;
    oauthContextPath: string;
    configureAxios?: boolean;
    axiosInstance?: AxiosInstance;
}
export declare function getOrigin(): string;
export declare const OAuthWebContext: React.FC<OAuthWebContextProps>;
