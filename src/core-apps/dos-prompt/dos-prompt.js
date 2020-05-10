import React from 'react'
import { Window } from '../../components'
import { Prompt } from './prompt.component'
import { width, height } from './constants'
import { propagatableWindowProps } from '../../utils'

export const DOSPrompt = (props) => {
  return (
    <Window
      {...propagatableWindowProps(props)}
      title="DOS Prompt"
      style={{ width, height }}
      bodyMargin={false}
      resizable={false}
    >
      <Prompt focused={props.focusedWindow}>Prompt text</Prompt>
    </Window>
  )
}
