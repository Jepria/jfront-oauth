import { OAuth } from "../src/OAuth"
import axios from "axios"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

class TestStorage {
  storage: any = {}

  constructor(storage?: any) {
    storage ? (this.storage = storage) : (this.storage = {})
  }

  getItem(key: string) {
    return this.storage[key]
  }

  removeItem(key: string) {
    delete this.storage.key
  }

  setItem(key: string, value: string) {
    this.storage[key] = value
  }
}

test("OAuth authorization request url generation test", () => {
  const storage = new TestStorage()
  const oauth = new OAuth(
    "clientId",
    "http://localhost",
    "http://localhost/authorize",
    "http://localhost/token",
    "http://localhost/logout",
    storage,
  )

  oauth
    .authorize("code", "http://localhost")
    .then((result) => expect(result).toBeDefined())
    .catch((error) => expect(error).toBeUndefined())
})

test("OAuth token request test", () => {
  const storage = new TestStorage({
    asdasdfef33f2qf3f3fq3qfgwgw5ehhe6eh5: "{}",
  })
  const oauth = new OAuth(
    "clientId",
    "http://localhost",
    "http://localhost/authorize",
    "http://localhost/token",
    "http://localhost/logout",
    storage,
  )

  const resp = {
    status: 200,
    data: {
      token_type: "Bearer",
      expires_in: 12213121434143,
      access_token: "ed33223d2d2d323d32d",
      refresh_token: "12d324g4g46564jbv2421vvvbFECEFCrcR",
    },
  }
  mockedAxios.post.mockResolvedValue(resp)

  oauth
    .getTokenWithAuthCode(
      "312d2f3d23d2d33g",
      "asdasdfef33f2qf3f3fq3qfgwgw5ehhe6eh5",
    )
    .then((result) => expect(result).toBe(resp.data))
    .catch((error) => expect(error).toBeUndefined())
})
