import React from "react"
import styled, { keyframes } from "styled-components"

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const DualRing = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  &:after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 6px solid black;
    border-color: black transparent #ee3b45 transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
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

export interface LoaderProps {
  title?: string
  text?: string
}

export const Loader: React.FC<LoaderProps> = ({ title, text }) => {
  return (
    <Container>
      <DualRing />
      <div>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </div>
    </Container>
  )
}
