# oauth-context

React Web implementation.

### Usage

Simple usage in React SPA. Uses
[Authorization Code Grant with PKCE extension](https://tools.ietf.org/html/rfc7636)
by default.

```js
import React from "react"
import { OAuthWebContext, OAuthSecuredFragment } from "@jfront/oauth-ui"

function App() {
  return (
    <OAuthWebContext
      clientId={"243j24h246j242gjikh6kllnn5l"} //application client_id
      redirectUri={"http://localhost/app/oauth"} //library uses scheme:[//authority]/context_path/oauth url as default callback endpoint
      oauthContextPath={"http://localhost/oauth/api"} //oauth API base url
    >
      <OAuthSecuredFragment>
        <div>Logged in</div>
      </OAuthSecuredFragment>
    </OAuthWebContext>
  )
}
```
