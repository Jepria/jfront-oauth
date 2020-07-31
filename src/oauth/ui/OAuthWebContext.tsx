import React from 'react';
import { OAuthContextProvider, OAuthQueryParams } from '../core/context/OAuthContextProvider';
import { AxiosInstance } from 'axios';

export interface OAuthWebContextProps {
  clientId: string;
  redirectUri: string;
  oauthContextPath: string;
  configureAxios?: boolean;
  axiosInstance?: AxiosInstance;
}

export function getOrigin() {
  if (!window.location.origin) {
    /** IE 10 support **/
    return window.location.protocol + "//" 
      + window.location.hostname 
      + (window.location.port ? ':' + window.location.port : '');
  } else {
    return window.location.origin;
  }
}

export const OAuthWebContext: React.FC<OAuthWebContextProps> = ({
  clientId,
  redirectUri,
  oauthContextPath,
  configureAxios,
  axiosInstance,
  children
}) => {

  const onAuthorizationRequest = (url: string) => window.location.replace(url);

  const isOAuthCallback = () => window.location.pathname.endsWith('/oauth') || window.location.pathname.endsWith("/oauth/");

  const redirect = (url: string) => window.history.replaceState(window.history.state, '', url);

  const getCurrentUrl = () => window.location.pathname + window.location.search;

  const getQueryParams = (): OAuthQueryParams => {
    let queryParams = new URLSearchParams(window.location.search);
    return {
      authorizationCode: queryParams.get('code'),
      state: queryParams.get('state'),
      error: queryParams.get('error'),
      errorDescription: queryParams.get('errorDescription')
    }
  }

  return (
    <OAuthContextProvider
      onAuthorizationRequest={onAuthorizationRequest}
      isOAuthCallback={isOAuthCallback}
      redirect={redirect}
      getCurrentUrl={getCurrentUrl}
      getQueryParams={getQueryParams}
      clientId={clientId}
      redirectUri={redirectUri}
      oauthContextPath={oauthContextPath}
      axiosInstance={axiosInstance}
      configureAxios={configureAxios}
      storage={window.sessionStorage}>
      {children}
    </OAuthContextProvider>
  );
}