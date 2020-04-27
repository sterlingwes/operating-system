import React from 'react'
import styled from 'styled-components'

const Background = styled('div')`
  background-color: #1180a8;
  width: 100vw;
  height: 100vh;
`

export const Desktop = ({ children }) => {
  return <Background>{children}</Background>
}
