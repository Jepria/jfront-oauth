import { Storage } from "./OAuth";
import * as Crypto from './OAuthCrypto';
import { OAuthMeta } from "./types";

/**
 * Реализации Authorization Code Flow. Генерация Authorization URL для доступа к серверу авторизации.
 */
export class AuthorizationRequest {
  private clientId: string;
  private redirectUri: string;
  private authorizeUrl: string;
  private responseType: string;
  private storage: Storage
  private meta: OAuthMeta;
  private codeVerifier: string;

  /**
   * 
   * @param clientId ID приложения
   * @param redirectUri URL переадресации
   * @param authorizeUrl Base URL авторизации
   * @param responseType Тип ответа
   * @param currentPath Текущий URL приложения
   * @param storage временное хранилище данных
   */
  constructor(clientId: string, redirectUri: string, authorizeUrl: string, responseType: string, currentPath: string, storage: Storage) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.authorizeUrl = authorizeUrl;
    this.responseType = responseType;
    this.storage = storage;
    this.meta = { currentPath: currentPath };
  }

  private authorizePKCE = (nonce: string): Promise<string> => {
    //generate code_verifier && code challenge
    this.codeVerifier = Crypto.getRandomString(43);
    this.meta.codeVerifier = this.codeVerifier;
    this.storage.setItem(nonce, JSON.stringify(this.meta));
    return new Promise<string>((resolve, reject) => {
      try {
        Crypto.sha256(this.codeVerifier).then(result => {
          //build request url
          resolve(`${this.authorizeUrl}?response_type=${this.responseType}&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&code_challenge=${result}&state=${nonce}`);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private authorizeImplicit(nonce: string): Promise<string> {
    this.storage.setItem(nonce, JSON.stringify(this.meta));
    return new Promise<string>((resolve, reject) => {
      //build request url
      resolve(`${this.authorizeUrl}?response_type=${this.responseType}&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&state=${nonce}`);
    });
  }

  authorize = (): Promise<string> => {
    let nonce = Crypto.getRandomString(32);
    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    this.meta.expiresIn = date;
    if (this.responseType === "code") {
      return this.authorizePKCE(nonce);
    } else {
      return this.authorizeImplicit(nonce);
    }
  }
}