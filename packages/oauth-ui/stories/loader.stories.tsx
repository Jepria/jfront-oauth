import * as React from "react"
import { OAuthError } from "../src/OAuthError"

export default {
  title: "Error",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <OAuthError errorCode="Test" errorDescription="Error description" />
    </>
  )
}
