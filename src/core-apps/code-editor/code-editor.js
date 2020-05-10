import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Window } from '../../components'
import { propagatableWindowProps } from '../../utils'
import { startEditor } from './monaco-editor'

const EditorArea = styled('div')`
  flex-grow: 1;
`

const indexFile = {
  path: 'index.ts',
  type: 'file',
  content: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
}

export const CodeEditor = (props) => {
  const editorRef = useRef()

  useEffect(() => {
    if (editorRef.current) {
      startEditor({
        files: [{ item: indexFile }],
        containerElement: editorRef.current,
        onOpenPath: (...args) => console.log('onOpenPath', args),
      })
    }
  }, [editorRef])

  return (
    <Window
      {...propagatableWindowProps(props)}
      title="Code Editor"
      style={{ width: 600, height: 800 }}
      bodyMargin={false}
    >
      <EditorArea ref={editorRef} />
    </Window>
  )
}
