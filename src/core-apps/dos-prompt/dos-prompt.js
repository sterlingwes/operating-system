import React from 'react'
import { Window } from '../../components'
import { Prompt } from './prompt.component'
import { width, height } from './constants'

export const DOSPrompt = ({ initialPosition, onClose, onFocusWindow }) => {
  return (
    <Window
      {...{ initialPosition, onClose, onFocusWindow }}
      title="MS-DOS Prompt"
      style={{ width, height }}
      bodyMargin={false}
      resizable={false}
    >
      <Prompt>Prompt text</Prompt>
    </Window>
  )
}
