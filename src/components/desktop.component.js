import React from 'react'
import styled from 'styled-components'

const Background = styled('div')`
  background-color: #1180a8;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const IconGrid = styled('div')`
  padding: 20px;
`

const iconWidth = 50
const dialogBlue = '#000080'

const Icon = styled('div')`
  display: inline-block;
  width: ${iconWidth + 30}px;
  text-align: center;
  outline: none;
`

const IconLabel = styled('div')`
  color: white;
  margin-top: 2px;
  text-align: center;
  font-family: 'Pixelated MS Sans Serif', Arial;
  padding: 2px;
  user-select: none;

  ${Icon}:focus & {
    outline: 1px dotted #fff;
    background-color: ${dialogBlue};
  }
`

const IconImage = styled('img')`
  margin: 0 auto;
  user-select: none;
`

const icons = [
  {
    target: 'dos-prompt',
    image: require('../assets/dos-prompt.png'),
    label: 'DOS Prompt',
  },
  {
    target: 'code-editor',
    image: require('../assets/code-editor.png'),
    label: 'Code Editor',
  },
  {
    target: 'notepad',
    image: require('../assets/notepad.png'),
    label: 'Notepad',
  },
]

export const Desktop = ({ children, onOpenIcon }) => {
  return (
    <Background>
      <IconGrid>
        {icons.map((icon, idx) => (
          <Icon
            key={icon.target}
            tabIndex={idx}
            onDoubleClick={() => onOpenIcon(icon.target)}
          >
            <IconImage src={icon.image} alt={icon.label} width={iconWidth} />
            <IconLabel>{icon.label}</IconLabel>
          </Icon>
        ))}
      </IconGrid>
      {children}
    </Background>
  )
}
