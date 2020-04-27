import React from 'react'
import { Window } from '../../components'
import { Prompt } from './prompt.component'

export const DOSPrompt = () => {
  return (
    <Window
      title="MS-DOS Prompt"
      style={{ width: 512, height: 300 }}
      bodyMargin={false}
    >
      <Prompt>Prompt text</Prompt>
    </Window>
  )
}
