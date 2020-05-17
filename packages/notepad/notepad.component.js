import React from 'react'
import styled from 'styled-components'
import { Window, propagatableWindowProps } from '@operating-system/core'

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
      image={require('./assets/notepad.png')}
      title="Notepad"
      style={{ width: 600, height: 500 }}
      bodyMargin={false}
      menuItems={[
        { label: 'File', childItems: [{ label: 'Open' }] },
        { label: 'Edit', childItems: [] },
        { label: 'Search', childItems: [] },
        { label: 'Help', childItems: [] },
      ]}
    >
      <EditorArea />
    </Window>
  )
}
