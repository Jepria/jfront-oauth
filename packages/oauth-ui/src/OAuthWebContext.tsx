import React from "react"
import { OAuthContextProvider, OAuthQueryParams } from "@jfront/oauth-context"
import { AxiosInstance } from "axios"

export interface OAuthWebContextProps {
  clientId: string
  redirectUri: string
  oauthContextPath: string
  configureAxios?: boolean
  axiosInstance?: AxiosInstance
}

export function getOrigin() {
  if (!window.location.origin) {
    /** IE 10 support **/
    return (
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "")
    )
  } else {
    return window.location.origin
  }
}

export const OAuthWebContext: React.FC<OAuthWebContextProps> = ({
  clientId,
  redirectUri,
  oauthContextPath,
  configureAxios,
  axiosInstance,
  children,
}) => {
  const isOAuthCallback = () =>
    window.location.pathname.endsWith("/oauth") ||
    window.location.pathname.endsWith("/oauth/")

  const redirect = (url: string) => window.location.replace(url)

  const forward = (url: string) =>
    window.history.replaceState(window.history.state, "", url)

  const getCurrentUrl = () => window.location.pathname + window.location.search

  const getQueryParams = (): OAuthQueryParams => {
    const queryParams = new URLSearchParams(window.location.search)
    return {
      authorizationCode: queryParams.get("code"),
      state: queryParams.get("state"),
      error: queryParams.get("error"),
      errorDescription: queryParams.get("error_description"),
      errorId: queryParams.get("error_id"),
    }
  }

  const onLogout = (logoutUrl: string) => {
    window.location.replace(logoutUrl)
  }

  return (
    <OAuthContextProvider
      isOAuthCallback={isOAuthCallback}
      redirect={redirect}
      forward={forward}
      getCurrentUrl={getCurrentUrl}
      getQueryParams={getQueryParams}
      clientId={clientId}
      redirectUri={redirectUri}
      oauthContextPath={oauthContextPath}
      axiosInstance={axiosInstance}
      configureAxios={configureAxios}
      storage={window.sessionStorage}
      onLogout={onLogout}
    >
      {children}
    </OAuthContextProvider>
  )
}
