import React from 'react'
import { Window } from '../../components'
import { Prompt } from './prompt.component'
import { width, height } from './constants'

export const DOSPrompt = ({ initialPosition }) => {
  return (
    <Window
      {...{ initialPosition }}
      title="MS-DOS Prompt"
      style={{ width, height }}
      bodyMargin={false}
      resizable={false}
    >
      <Prompt>Prompt text</Prompt>
    </Window>
  )
}
