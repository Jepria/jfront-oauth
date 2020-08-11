import { Storage } from "./OAuth"
import axios from "axios"
import { TokenResponse, OAuthMeta } from "./types"

/**
 * Получение токена от сервера авторизации.
 */
export class TokenRequest {
  private clientId: string
  private redirectUri: string
  private tokenUrl: string
  private storage: Storage
  private nonce?: string

  /**
   *
   * @param clientId ID приложения
   * @param redirectUri URL переадресации
   * @param tokenUrl Base URL для получения токенов
   * @param storage временное хранилище данных
   * @param nonce случайная строка
   */
  constructor(
    clientId: string,
    redirectUri: string,
    tokenUrl: string,
    storage: Storage,
    nonce?: string,
  ) {
    this.clientId = clientId
    this.redirectUri = redirectUri
    this.tokenUrl = tokenUrl
    this.storage = storage
    this.nonce = nonce
  }

  /**
   * Получение токена по авторизационному коду.
   * @param authorizationCode
   */
  withAuthorizationCode(authorizationCode: string): Promise<TokenResponse> {
    if (!this.nonce) {
      throw new Error("nonce is undefined")
    }
    const stringState = this.storage.getItem(this.nonce)
    if (!stringState) {
      throw new Error("state not found")
    }
    const state: OAuthMeta = JSON.parse(stringState)
    const codeVerifier = state.codeVerifier
    this.storage.removeItem(this.nonce)
    return new Promise<TokenResponse>((resolve, reject) => {
      axios
        .post(
          this.tokenUrl,
          `grant_type=authorization_code&client_id=${encodeURIComponent(
            this.clientId,
          )}&redirect_uri=${encodeURIComponent(
            this.redirectUri,
          )}&code=${encodeURIComponent(
            authorizationCode,
          )}&code_verifier=${encodeURIComponent(codeVerifier as string)}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        )
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response?.data))
    })
  }

  /**
   * Обновление токена.
   * @param refreshToken
   */
  withRefreshToken(refreshToken: string): Promise<TokenResponse> {
    return new Promise<TokenResponse>((resolve, reject) => {
      axios
        .post(
          this.tokenUrl,
          `grant_type=refresh_token&client_id=${encodeURIComponent(
            this.clientId,
          )}&refresh_token=${encodeURIComponent(refreshToken)}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        )
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(error.response?.data)
        })
    })
  }

  /**
   * Получение токена по логину/паролю токена.
   * @param username
   * @param password
   */
  withUserCredentials(
    username: string,
    password: string,
  ): Promise<TokenResponse> {
    return new Promise<TokenResponse>((resolve, reject) => {
      axios
        .post(
          this.tokenUrl,
          `grant_type=password&client_id=${encodeURIComponent(
            this.clientId,
          )}&username=${encodeURIComponent(
            username,
          )}&password=${encodeURIComponent(password)}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        )
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(error.response?.data)
        })
    })
  }
}
