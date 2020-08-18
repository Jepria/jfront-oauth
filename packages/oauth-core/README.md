# oauth-core

Core functionality for OAuth 2.0 connection.

## Usage

```js
import { OAuth } from "@jfront/oauth-core"

const oauth = new OAuth(
  "clientId",
  "http://localhost/app/oauth",
  "http://localhost/authorize",
  "http://localhost/token",
  "http://localhost/logout",
  window.sessionStorage,
)
```

## API

### authorize

Authorization Code/Implicit flow authorization.

```js
oauth.authorize("code", "http://localhost/app/view")
```

### getTokenWithAuthCode

Get token with authorization code, when authorization step was completed.

```js
oauth.getTokenWithAuthCode("authorization_code", "random_nonce_string")
```

### refreshToken

Refresh access token, if you have refresh_token.

```js
oauth.refreshToken("refresh_token")
```

### getTokenWithUserCredentials

Get token with user login/password.

```js
oauth.getTokenWithUserCredentials("login", "password")
```

### logout

Logout for client-side apps.

```js
oauth.getTokenWithUserCredentials("http://localhost/app/view")
```
