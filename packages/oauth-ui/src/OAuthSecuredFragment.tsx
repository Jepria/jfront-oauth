import React from "react"
import { useOAuth } from "@jfront/oauth-context"
import { Loader } from "./Loader"
import { OAuthError } from "./OAuthError"

export const OAuthSecuredFragment: React.FC = ({ children }) => {
  const { accessToken, isLoading, errorCode, errorDescription } = useOAuth()

  if (isLoading) {
    return <Loader title="OAuth" text="Загрузка, пожалуйста, подождите..." />
  } else if (errorCode || errorDescription) {
    return (
      <OAuthError errorCode={errorCode} errorDescription={errorDescription} />
    )
  } else if (accessToken) {
    return <>{children}</>
  } else {
    return <></>
  }
}
