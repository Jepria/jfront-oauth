import { render, act, screen, waitFor } from '@testing-library/react'
import React from 'react';
import axios from 'axios';
import { OAuthContextProvider } from '../src/oauth/core/context/OAuthContextProvider'
import { OAuthSecuredFragment } from '../src/oauth/ui/OAuthSecuredFragment'

jest.mock('axios');

class TestStorage {

  storage = {};

  constructor(storage) {
    storage ? this.storage = storage : this.storage = {};
  }

  getItem(key) {
    return this.storage[key];
  }

  removeItem(key) {
    delete this.storage.key;
  }

  setItem(key, value) {
    this.storage[key] = value;
  }
}

it("Authorization request test", async () => {

  const onAuthorizationRequest = (url) => {
    expect(url).toBeDefined();
  };

  const isOAuthCallback = () => false;

  const getCurrentUrl = () => "http://localhost";

  const storage = new TestStorage();

  await act(async () => {
    const { getByText } = render(
      <OAuthContextProvider
        onAuthorizationRequest={onAuthorizationRequest}
        isOAuthCallback={isOAuthCallback}
        getCurrentUrl={getCurrentUrl}
        clientId={"clientId"}
        redirectUri={"http://redirect"}
        oauthContextPath={"oauth"}
        configureAxios={false}
        storage={storage}>
        <OAuthSecuredFragment>
          <span>123</span>
        </OAuthSecuredFragment>
      </OAuthContextProvider>
    )

    expect(getByText("OAuth")).toBeDefined();
  });
})

it("Token request test", async () => {

  const isOAuthCallback = () => true;

  const redirect = (url) => {
    expect(url).toBe("http://localhost");
  }

  const getQueryParams = () => ({
    authorizationCode: "12123411345143513515geeffeq",
    state: "ad312243g24g42g42g24"
  });

  const storage = new TestStorage({
    "ad312243g24g42g42g24": "{\"currentPath\": \"http://localhost\", \"codeVerifier\":\"231dd211fd3ff1\"}"
  });
  
  const resp = {
    status: 200, data: {
      token_type: "Bearer",
      expires_in: 12213121434143,
      access_token: "ed33223d2d2d323d32d",
      refresh_token: "12d324g4g46564jbv2421vvvbFECEFCrcR"
    }
  };
  axios.post.mockResolvedValue(resp);

  await act(async () => {
    const { getByText } = render(
      <OAuthContextProvider
        isOAuthCallback={isOAuthCallback}
        getQueryParams={getQueryParams}
        redirect={redirect}
        clientId={"clientId"}
        redirectUri={"http://redirect"}
        oauthContextPath={"oauth"}
        configureAxios={false}
        storage={storage}>
        <OAuthSecuredFragment>
          <span>123</span>
        </OAuthSecuredFragment>
      </OAuthContextProvider>
    )

    expect(getByText("OAuth")).toBeDefined();
  });

  await waitFor(() => expect(screen.getByText("123")).toBeDefined())
})