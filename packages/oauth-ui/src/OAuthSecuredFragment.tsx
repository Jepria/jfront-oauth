import React from "react"
import { useOAuth } from "@jfront/oauth-context"
import { Loader } from "./Loader"
import { OAuthError } from "./OAuthError"

export const OAuthSecuredFragment: React.FC = ({ children }) => {
  const {
    accessToken,
    isLoading,
    errorCode,
    errorDescription,
    errorId,
  } = useOAuth()

  if (errorId || errorCode || errorDescription) {
    return (
      <OAuthError
        errorId={errorId}
        errorCode={errorCode}
        errorDescription={errorDescription}
      />
    )
  } else if (isLoading) {
    return <Loader title="OAuth" text="Загрузка, пожалуйста, подождите..." />
  } else if (accessToken) {
    return <>{children}</>
  } else {
    return <></>
  }
}
