import React from 'react'
import { Window } from '../../components'
import { propagatableWindowProps } from '../../utils'

export const CodeEditor = (props) => {
  return (
    <Window
      {...propagatableWindowProps(props)}
      title="Code Editor"
      style={{ width: 600, height: 800 }}
      bodyMargin={false}
    ></Window>
  )
}
