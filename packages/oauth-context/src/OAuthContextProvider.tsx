import React, { useReducer, useEffect } from "react"
import {
  OAuthReducer,
  Storage,
  OAuth,
  authorizationRequest,
  authorizationRequestFailure,
  tokenRequest,
  tokenRequestSuccess,
  tokenRequestFailure,
  authorizationRequestSuccess,
  TokenResponse,
  OAuthMeta,
} from "@jfront/oauth-core"
import { AxiosInstance, AxiosResponse, AxiosError } from "axios"
import { OAuthContext } from "./OAuthContext"

export interface OAuthQueryParams {
  authorizationCode: string | null
  state: string | null
  error: string | null
  errorDescription: string | null
  errorId: string | null
}

export interface OAuthContextProps {
  isOAuthCallback: () => boolean
  getQueryParams: () => OAuthQueryParams
  redirect: (url: string) => void
  forward: (url: string) => void
  getCurrentUrl: () => string
  onLogout: (logoutUrl: string) => void
  storage: Storage
  clientId: string
  redirectUri: string
  oauthContextPath: string
  axiosInstance?: AxiosInstance
}

/**
 * Базовый Provider OAuth контекста. Не содержит реализаций платформозависимых методов. Они переведены в callback'и в props.
 *
 * @param param props
 */
export const OAuthContextProvider: React.FC<OAuthContextProps> = ({
  isOAuthCallback,
  getQueryParams,
  getCurrentUrl,
  forward,
  redirect,
  onLogout,
  storage,
  clientId,
  redirectUri,
  oauthContextPath,
  axiosInstance,
  children,
}) => {
  const [
    {
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
      errorCode,
      errorId,
    },
    dispatch,
  ] = useReducer(OAuthReducer, { isLoading: true })

  const oauth = new OAuth(
    clientId,
    redirectUri,
    oauthContextPath + "/authorize",
    oauthContextPath + "/token",
    oauthContextPath + "/logout",
    storage,
  )

  const authorize = () => {
    if (!isOAuthCallback()) {
      oauth
        .authorize("code", getCurrentUrl())
        .then((result) => {
          dispatch(authorizationRequest(result))
        })
        .catch((error) => {
          dispatch(
            authorizationRequestFailure("UNHANDLED_ERROR", error.message),
          )
        })
    }
  }

  const getToken = (
    authCode: string,
    state: string,
  ): Promise<TokenResponse> => {
    dispatch(tokenRequest())
    return oauth.getTokenWithAuthCode(authCode, state)
  }

  useEffect(() => {
    if (authorizationUrl) {
      redirect(authorizationUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationUrl])

  useEffect(() => {
    if (authorizationCode && state) {
      const metaString = storage.getItem(state)
      getToken(authorizationCode, state)
        .then((result) => {
          if (!metaString) {
            throw new Error("state not found")
          }
          const meta: OAuthMeta = JSON.parse(metaString)
          if (result.token_type === "Bearer") {
            forward(meta.currentPath)
            dispatch(
              tokenRequestSuccess(
                result.access_token,
                result.expires_in,
                result.token_type,
                result.refresh_token,
              ),
            )
          } else {
            dispatch(
              tokenRequestFailure(
                "INVALID_RESPONSE",
                "Not supported token type",
              ),
            )
          }
        })
        .catch((error) => {
          dispatch(
            tokenRequestFailure(
              error.error,
              error.errorUri,
              error.errorDescription,
              error.errorId,
            ),
          )
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationCode, state])

  useEffect(() => {
    if (isOAuthCallback()) {
      const queryParams = getQueryParams()
      if (queryParams.error) {
        dispatch(
          authorizationRequestFailure(
            queryParams.error,
            queryParams.errorDescription
              ? queryParams.errorDescription
              : undefined,
            queryParams.errorId ? queryParams.errorId : undefined,
          ),
        )
        return
      }
      if (!queryParams.state) {
        dispatch(authorizationRequestFailure("INVALID_REQUEST", "Empty state"))
        return
      }
      if (!queryParams.authorizationCode && queryParams.state) {
        const metaString = storage.getItem(queryParams.state)
        if (metaString) {
          const meta: OAuthMeta = JSON.parse(metaString)
          if (meta.currentPath) {
            redirect(meta.currentPath)
          }
        }
        dispatch(
          authorizationRequestFailure("INVALID_REQUEST", "Invalid state"),
        )
        return
      }
      if (!queryParams.authorizationCode) {
        dispatch(
          authorizationRequestFailure(
            "INVALID_REQUEST",
            "Authorization code is empty",
          ),
        )
        return
      }
      dispatch(
        authorizationRequestSuccess(
          queryParams.authorizationCode,
          queryParams.state,
        ),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    onLogout(oauth.logout(getCurrentUrl()))
  }

  if (axiosInstance && accessToken) {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (401 === response?.status) {
          authorize()
        }
        return response
      },
      (error: AxiosError) => {
        if (401 === error?.response?.status) {
          authorize()
        }
        return Promise.reject(error)
      },
    )
  }

  return (
    <OAuthContext.Provider
      value={{
        authorize,
        accessToken,
        expiresIn,
        refreshToken,
        tokenType,
        isLoading,
        errorUri,
        errorDescription,
        errorCode,
        errorId,
        logout,
      }}
    >
      {children}
    </OAuthContext.Provider>
  )
}
