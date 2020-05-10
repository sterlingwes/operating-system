import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Window } from '../../components'
import { propagatableWindowProps } from '../../utils'
import { startEditor } from './monaco-editor'

const EditorArea = styled('div')`
  flex-grow: 1;
`

export const CodeEditor = (props) => {
  const editorRef = useRef()

  useEffect(() => {
    if (editorRef.current) {
      startEditor(editorRef.current)
    }
  }, [editorRef])

  return (
    <Window
      {...propagatableWindowProps(props)}
      title="Visual Basic"
      style={{ width: 600, height: 800 }}
      bodyMargin={false}
    >
      <EditorArea ref={editorRef} />
    </Window>
  )
}
