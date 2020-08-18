# oauth-context

React Context API OAuth 2.0 authorization management.

## Usage

```js
import { OAuthContextProvider, useOAuth } from "@jfront/oauth-context"

function Component() {
  const context = useOAuth()
  return <div>{context.expiresIn}</div>
}

function App() {
  return (
    <OAuthContextProvider
      onAuthorizationRequest={onAuthorizationRequest} //submit redirect after authorization URL is ready
      isOAuthCallback={isOAuthCallback} //pass function which will determine if current route is OAuth callback
      redirect={redirect} //pass function which allows to forward application between routes with URL scheme
      getCurrentUrl={getCurrentUrl} //pass function which gets current route URL scheme
      getQueryParams={getQueryParams} //pass function which gets OAuth params from current URL (code, state, error, errorDescription)
      clientId={"clientId"}
      redirectUri={"http://server/app/cb"}
      oauthContextPath={"http://server/oauth/api"}
      storage={window.sessionStorage} //pass your platform storage, for browser default is HTML5 Session Storage
      onLogout={onLogout} //submit logout URL
    >
      <Component />
    </OAuthContextProvider>
  )
}
```
