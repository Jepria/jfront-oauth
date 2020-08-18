# jfront-oauth

JFront OAuth packages.

- @jfront/oauth-core - core functionality for OAuth 2.0 connection.
- @jfront/oauth-context - React Context API OAuth 2.0 authorization management.
- @jfront/oauth-ui - React Web implementation.

Default endpoint URL's taken from
[jepria-oauth](https://github.com/Jepria/oauth) Based on
[OAuth RFC](https://tools.ietf.org/html/rfc6749)

### Installation

Using npm.

```
npm i @jfront/oauth-core --save-dev
npm i @jfront/oauth-context --save-dev
npm i @jfront/oauth-ui --save-dev
```

Using yarn.

```
yarn add @jfront/oauth-core --dev
yarn add @jfront/oauth-context --dev
yarn add @jfront/oauth-ui --dev
```

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
      oauthContextPath={"http://localhost/oauth/api"}
    >
      {" "}
      //oauth API base url
      <OAuthSecuredFragment>
        <div>Logged in</div>
      </OAuthSecuredFragment>
    </OAuthWebContext>
  )
}
```

### Docs

TODO

### Contributing

Feel like contributing? That's awesome! We have a
[contributing guide](./CONTRIBUTING.md) to help guide you.

### License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
