import { sha256 as hashSHA256 } from "js-sha256"
import { Base64 } from "js-base64"
import { getRandomValue } from "./utils"

const isBrowser =
  typeof window !== "undefined" &&
  {}.toString.call(window) === "[object Window]"

export function atob(data: string): string {
  return Base64.decode(data)
}

export function btoa(data: string): string {
  return Base64.encodeURL(data)
}

export function getRandomString(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  let crypto
  if (isBrowser) {
    crypto = window.crypto || (window as any).msCrypto
  }
  if (crypto) {
    const values = new Uint32Array(length)
    crypto.getRandomValues(values)
    for (let i = 0; i < length; i++) {
      result += charset[values[i] % charset.length]
    }
  } else {
    for (let i = 0; i < length; i++) {
      const rand = getRandomValue(8)
      result += charset[rand % charset.length]
    }
  }
  return result
}

export function sha256(str: string) {
  return new Promise<string>((resolve, reject) => {
    try {
      resolve(hashSHA256(str))
    } catch (e) {
      reject(e)
    }
  })
}
