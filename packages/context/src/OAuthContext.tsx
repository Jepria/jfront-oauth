import React, { createContext, useContext, useEffect } from "react"

export interface SecurityContext {
  authorize(): void
  logout?: () => void
  accessToken?: string
  expiresIn?: bigint
  refreshToken?: string
  tokenType?: string
  isLoading: boolean
  errorUri?: string
  errorDescription?: string
  errorCode?: string
}

/**
 * OAuth security context instance
 */
export const OAuthContext = createContext<SecurityContext>({
  isLoading: false,
  authorize: () => {
    throw new Error("Not implemented")
  },
})

/**
 * Hook для подключения контекста OAuth
 */
export const useOAuth = (): SecurityContext => {
  const context = useContext(OAuthContext)

  useEffect(() => {
    if (
      !context.accessToken ||
      (context.expiresIn && Date.now() < context.expiresIn)
    ) {
      context.authorize()
    }
  }, [context.accessToken])

  return context
}

/**
 * HOC для подключения контекста OAuth
 * @param WrappedComponent
 */
export const withOAuth = (WrappedComponent: React.ComponentType) => {
  return class extends React.Component {
    static contextType = OAuthContext

    componentDidMount() {
      if (
        !this.context.accessToken ||
        (this.context.expiresIn && Date.now() < this.context.expiresIn)
      ) {
        this.context.authorize()
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
