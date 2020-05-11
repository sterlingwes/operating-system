import React from 'react'
import styled from 'styled-components'

const PromptArea = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`

const VisiblePrompt = styled('div')`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #000;
  color: #fff;
  font-family: Menlo, Terminal, monospace;
`

const PromptText = styled('textarea')`
  pointer-events: none;
  resize: none;
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

export const Prompt = ({
  promptRef,
  textRef,
  commandHistory,
  activeCommand,
  onTextAreaChange,
  textareaContent,
}) => {
  return (
    <PromptArea>
      <VisiblePrompt ref={promptRef} onClick={() => textRef.current.focus()}>
        {commandHistory.map((cmd, i) => (
          <Line key={i}>{cmd}</Line>
        ))}
        <Line key="active">{activeCommand}</Line>
      </VisiblePrompt>
      <PromptText
        ref={textRef}
        spellCheck={false}
        onChange={(event) => onTextAreaChange(event.target.value)}
        value={textareaContent}
      ></PromptText>
    </PromptArea>
  )
}
