import React, { useCallback, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import styled from 'styled-components'
import { Window } from '../../components'
import { propagatableWindowProps } from '../../utils'
import { startEditor } from './monaco-editor'

const EditorArea = styled('div')`
  height: 100%;
`

const indexFile = {
  path: 'index.ts',
  type: 'file',
  content: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
}

export const CodeEditor = (props) => {
  const editorRef = useRef()
  const editorInstanceRef = useRef()

  useEffect(() => {
    if (editorRef.current) {
      editorInstanceRef.current = startEditor({
        files: [{ item: indexFile }],
        containerElement: editorRef.current,
        onOpenPath: (...args) => console.log('onOpenPath', args),
      })
    }
  }, [editorRef])

  const handleResize = useCallback(
    debounce(
      () => {
        editorInstanceRef.current && editorInstanceRef.current.layout()
      },
      50,
      { trailing: true, leading: true }
    )
  )

  return (
    <Window
      {...propagatableWindowProps(props)}
      title="Code Editor"
      style={{ width: 600, height: 500 }}
      bodyMargin={false}
      onResize={handleResize}
    >
      <EditorArea ref={editorRef} />
    </Window>
  )
}
