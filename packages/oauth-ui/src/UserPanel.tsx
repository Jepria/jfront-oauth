import React, { useContext } from "react"
import styled from "styled-components"
import { Exit } from "./images/Exit"
import { useUser } from "@jfront/oauth-user"
import { OAuthContext } from "@jfront/oauth-context"

const Panel = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 0;
  right: 0;
  height: 22px;
  text-align: right;
  font-size: 16px;
  font-family: "Times New Roman";
`

const Text = styled.span`
  margin: 0 5px;
`

const Image = styled.img`
  margin: 0 5px;
  cursor: pointer;
`

export const UserPanel = () => {
  const userContext = useUser()
  const oauthContext = useContext(OAuthContext)

  return (
    <Panel>
      <Text>{userContext.currentUser.username}</Text>
      {userContext.currentUser.username !== "Guest" && (
        <Exit onClick={oauthContext.logout} />
      )}
    </Panel>
  )
}
