import * as React from "react"
import { Loader } from "../src/Loader"

export default {
  title: "Loader",
  decorators: [(StoryFn: Function) => <StoryFn />],
}

export const BasicUsage = () => {
  return (
    <>
      <Loader title="Loader" text="loader example" />
    </>
  )
}
