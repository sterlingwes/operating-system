import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { usePrompt } from './prompt.hook'
import { width, height } from './constants'

const promptWidth = width - 1
const promptHeight = height - 15

const PromptArea = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`

const VisiblePrompt = styled('div')`
  width: ${promptWidth - 2}px;
  height: ${promptHeight - 2}px;
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
  width: ${promptWidth}px;
  height: ${promptHeight}px;
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

export const Prompt = ({ focused }) => {
  const {
    commandHistory,
    activeCommand,
    textareaContent,
    onTextAreaChange,
  } = usePrompt()

  const promptRef = useRef(React.createRef())
  const textRef = useRef(React.createRef())

  useEffect(() => {
    if (focused && textRef.current) {
      textRef.current.focus()
    }
  }, [focused])

  useEffect(() => {
    promptRef.current.scrollTop = promptRef.current.scrollHeight
  }, [commandHistory])

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
