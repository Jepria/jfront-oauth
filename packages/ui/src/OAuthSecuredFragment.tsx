import React from "react"
import { useOAuth } from "@jfront-oauth/context"
import { Loader } from "./Loader"

export const OAuthSecuredFragment: React.FC = ({ children }) => {
  const { accessToken, isLoading } = useOAuth()

  if (isLoading) {
    return <Loader title="OAuth" text="Загрузка, пожалуйста, подождите..." />
  } else if (accessToken) {
    return <>{children}</>
  } else {
    return <></>
  }
}
