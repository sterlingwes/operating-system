import React from 'react'
import styled from 'styled-components'
import { usePrompt } from './prompt.hook'

const PromptArea = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`

const VisiblePrompt = styled('div')`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  font-family: Menlo, Terminal, monospace;
`

const PromptText = styled('textarea')`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: transparent;
  text-align: center;

  &:focus {
    outline: none;
    background-color: transparent;
  }

  &::selection {
    background-color: transparent;
  }
`

const Line = styled('p')`
  margin: 0;
  padding: 4px;
`

export const Prompt = ({ children }) => {
  const {
    commandHistory,
    activeCommand,
    textareaContent,
    onTextAreaChange,
  } = usePrompt()
  return (
    <PromptArea>
      <VisiblePrompt>
        {commandHistory.map((cmd, i) => (
          <Line key={i}>{cmd}</Line>
        ))}
        <Line key="active">{activeCommand}</Line>
      </VisiblePrompt>
      <PromptText
        spellCheck={false}
        onChange={(event) => onTextAreaChange(event.target.value)}
        value={textareaContent}
      ></PromptText>
    </PromptArea>
  )
}
