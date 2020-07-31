import { AuthorizationRequest } from './AuthorizationRequest';
import { TokenRequest } from './TokenRequest';
import { TokenResponse } from './types';

export const GrantType: { [id: string]: string; } = {
  'authorization_code': 'Authorization code',
  'implicit': 'Implicit',
  'password': 'User credentials',
  'client_credentials': 'Client credentials',
  'refresh_token': 'Refresh token'
}

export const ApplicationType: { [id: string]: string; } = {
  'native': 'Native',
  'web': 'Web application',
  'browser': 'Browser application',
  'service': 'Service',
}

export const ApplicationGrantType: { [id: string]: Array<string>; } = {
  'native': ['authorization_code', 'implicit', 'password', 'refresh_token'],
  'web': ['authorization_code', 'implicit', 'password', 'client_credentials', 'refresh_token'],
  'browser': ['authorization_code', 'implicit', 'password'],
  'service': ['client_credentials', 'refresh_token']
}

export interface Storage {
  /**
   * Returns the current value associated with the given key, or null if the given key does not exist in the list associated with the object.
   */
  getItem(key: string): string | null;
  /**
   * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
   */
  removeItem(key: string): void;
  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
  */
  setItem(key: string, value: string): void;
}

export class OAuth {
  private clientId: string;
  private redirectUri: string;
  private authorizeUrl: string;
  private storage: Storage;
  private tokenUrl: string;

  constructor(clientId: string, redirectUri: string, authorizeUrl: string, tokenUrl: string, storage: Storage) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.authorizeUrl = authorizeUrl;
    this.storage = storage;
    this.tokenUrl = tokenUrl;
  }

  authorize = (responseType: string, currentPath: string): Promise<string> => {
    if (this.authorizeUrl) {
      let authRequest = new AuthorizationRequest(this.clientId, this.redirectUri, this.authorizeUrl, responseType, currentPath, this.storage);
      return authRequest.authorize();
    } else {
      throw new Error("authorizeUrl must me not null");
    }
  }

  getTokenWithAuthCode = (authorizationCode: string, nonce: string): Promise<TokenResponse> => {
    const tokenRequest = new TokenRequest(this.clientId, this.redirectUri, this.tokenUrl, this.storage, nonce);
    return tokenRequest.withAuthorizationCode(authorizationCode);
  }

  refreshToken = (refreshToken: string): Promise<TokenResponse> => {
    const tokenRequest = new TokenRequest(this.clientId, this.redirectUri, this.tokenUrl, this.storage);
    return tokenRequest.withRefreshToken(refreshToken);
  }

  getTokenWithUserCredentials = (username: string, password: string): Promise<TokenResponse> => {
    const tokenRequest = new TokenRequest(this.clientId, this.redirectUri, this.tokenUrl, this.storage);
    return tokenRequest.withUserCredentials(username, password);
  }
}

