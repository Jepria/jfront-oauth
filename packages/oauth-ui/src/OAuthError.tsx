import React from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
`

const Dialog = styled.div`
  padding: 1.5em;
  box-sizing: border-box;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: left;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: normal;
  letter-spacing: 4px;
  font: 18px/24px Source Sans Pro, sans-serif;
  color: #444;
`

const Text = styled.div`
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 2px;
  font: 13px/18px Source Sans Pro, sans-serif;
  color: #444;
`

export interface OAuthErrorProps {
  errorId?: string
  errorCode?: string
  errorDescription?: string
}

export const OAuthError = ({
  errorId,
  errorCode,
  errorDescription,
}: OAuthErrorProps) => {
  return (
    <Container>
      <Dialog>
        <Title>{errorCode}</Title>
        {errorId && <Text>error ID - {errorId}</Text>}
        <Text>{errorDescription}</Text>
      </Dialog>
    </Container>
  )
}
