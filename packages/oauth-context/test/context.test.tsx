import { render, act, screen, waitFor } from "@testing-library/react"
import React from "react"
import axios from "axios"
import {
  OAuthContextProvider,
  OAuthQueryParams,
} from "../src/OAuthContextProvider"
import { useOAuth } from "../src/OAuthContext"

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

  setItem(key: string, value: any) {
    this.storage[key] = value
  }
}

const OAuthTestComponent: React.FC = ({ children }) => {
  const { accessToken, isLoading } = useOAuth()

  if (isLoading) {
    return <div>OAuth</div>
  } else if (accessToken) {
    return <>{children}</>
  } else {
    return <></>
  }
}

it("Authorization request test", async () => {
  const onAuthorizationRequest = (url: any) => {
    expect(url).toBeDefined()
  }

  const isOAuthCallback = () => false

  const getCurrentUrl = () => "http://localhost"

  const getQueryParams = (): OAuthQueryParams => ({
    authorizationCode: null,
    state: null,
    error: null,
    errorDescription: null,
    errorId: null,
  })

  const storage = new TestStorage()

  await act(async () => {
    const { getByText } = render(
      <OAuthContextProvider
        getQueryParams={getQueryParams}
        forward={() => {}}
        onLogout={() => {}}
        redirect={onAuthorizationRequest}
        isOAuthCallback={isOAuthCallback}
        getCurrentUrl={getCurrentUrl}
        clientId={"clientId"}
        redirectUri={"http://redirect"}
        oauthContextPath={"oauth"}
        storage={storage}
      >
        <OAuthTestComponent>
          <span>123</span>
        </OAuthTestComponent>
      </OAuthContextProvider>,
    )

    expect(getByText("OAuth")).toBeDefined()
  })
})

it("Token request test", async () => {
  const isOAuthCallback = () => true

  const forward = (url: any) => {
    expect(url).toBe("http://localhost")
  }

  const getQueryParams = (): OAuthQueryParams => ({
    authorizationCode: "12123411345143513515geeffeq",
    state: "ad312243g24g42g42g24",
    error: null,
    errorDescription: null,
    errorId: null,
  })

  const storage = new TestStorage({
    ad312243g24g42g42g24:
      '{"currentPath": "http://localhost", "codeVerifier":"231dd211fd3ff1"}',
  })

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

  await act(async () => {
    const { getByText } = render(
      <OAuthContextProvider
        isOAuthCallback={isOAuthCallback}
        onLogout={() => {}}
        redirect={() => {}}
        getCurrentUrl={() => ""}
        getQueryParams={getQueryParams}
        forward={forward}
        clientId={"clientId"}
        redirectUri={"http://redirect"}
        oauthContextPath={"oauth"}
        storage={storage}
      >
        <OAuthTestComponent>
          <span>123</span>
        </OAuthTestComponent>
      </OAuthContextProvider>,
    )

    expect(getByText("OAuth")).toBeDefined()
  })

  await waitFor(() => expect(screen.getByText("123")).toBeDefined())
})
