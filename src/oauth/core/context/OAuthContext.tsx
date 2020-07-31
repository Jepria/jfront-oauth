import React, { createContext, useContext, useEffect } from 'react';

export interface SecurityContext {
  authorize(): void,
  accessToken?: string;
  expiresIn?: bigint;
  refreshToken?: string;
  tokenType?: string;
  isLoading: boolean;
  errorUri?: string;
  errorDescription?: string;
  errorCode?: string;
}

export const OAuthContext = createContext<SecurityContext>({
  isLoading: false,
  authorize: () => {
    throw new Error("Not implemented");
  }
});

export const useOAuth = () => {
  const context = useContext(OAuthContext);

  useEffect(() => {
    if (!context.accessToken || (context.expiresIn && Date.now() < context.expiresIn)) {
      context.authorize();
    }
  }, [context.accessToken]);

  return context;
}

export const withOAuth = (WrappedComponent: React.ComponentType) => {
  return class extends React.Component {
    static contextType = OAuthContext;

    componentDidMount() {
      if (!this.context.accessToken || (this.context.expiresIn && Date.now() < this.context.expiresIn)) {
        this.context.authorize();
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
}