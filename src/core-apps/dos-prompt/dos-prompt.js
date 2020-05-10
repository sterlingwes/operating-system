import React, { useRef, useEffect } from 'react'
import { usePrompt } from './prompt.hook'
import { Window } from '../../components'
import { Prompt } from './prompt.component'
import { width, height } from './constants'
import { propagatableWindowProps } from '../../utils'

export const DOSPrompt = (props) => {
  const {
    commandHistory,
    activeCommand,
    textareaContent,
    onTextAreaChange,
  } = usePrompt()

  const promptRef = useRef(React.createRef())
  const textRef = useRef(React.createRef())
  const focused = props.focusedWindow

  useEffect(() => {
    if (focused && textRef.current) {
      textRef.current.focus()
    }
  }, [focused])

  useEffect(() => {
    promptRef.current.scrollTop = promptRef.current.scrollHeight
  }, [commandHistory])

  return (
    <Window
      {...propagatableWindowProps(props)}
      title="DOS Prompt"
      style={{ width, height }}
      bodyMargin={false}
      resizable={false}
      onDragStop={() => textRef.current.focus()}
    >
      <Prompt
        {...{
          promptRef,
          textRef,
          commandHistory,
          activeCommand,
          onTextAreaChange,
          textareaContent,
        }}
      >
        Prompt text
      </Prompt>
    </Window>
  )
}
