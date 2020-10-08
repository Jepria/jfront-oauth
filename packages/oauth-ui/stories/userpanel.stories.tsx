import * as React from "react"
import { UserPanel } from "../src/UserPanel"

export default {
  title: "UserPanel",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <UserPanel />
    </>
  )
}
