import React from 'react'
import styled from 'styled-components'
import { Window } from '../../components'
import { propagatableWindowProps } from '../../utils'

const EditorArea = styled('textarea')`
  resize: none;
  flex-grow: 1;
  font-family: monospace;
  font-weight: bold;
  font-size: 15px;
`

export const Notepad = (props) => {
  return (
    <Window
      {...propagatableWindowProps(props)}
      image={require('../../assets/notepad.png')}
      title="Notepad"
      style={{ width: 600, height: 500 }}
      bodyMargin={false}
    >
      <EditorArea />
    </Window>
  )
}
