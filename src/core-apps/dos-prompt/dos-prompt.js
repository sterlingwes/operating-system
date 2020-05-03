import React from 'react'
import { Window } from '../../components'
import { Prompt } from './prompt.component'
import { width, height } from './constants'

export const DOSPrompt = ({ initialPosition, onClose }) => {
  return (
    <Window
      {...{ initialPosition, onClose }}
      title="MS-DOS Prompt"
      style={{ width, height }}
      bodyMargin={false}
      resizable={false}
    >
      <Prompt>Prompt text</Prompt>
    </Window>
  )
}
