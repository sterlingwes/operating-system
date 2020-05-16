import React, { useCallback, useState } from 'react'
import { Desktop } from '@operating-system/core'
import * as CodeEditor from '@operating-system/code-editor'
import * as DOSPrompt from '@operating-system/dos-prompt'
import * as Notepad from '@operating-system/notepad'
import '98.css'

const appMap = {
  'dos-prompt': DOSPrompt,
  'code-editor': CodeEditor,
  notepad: Notepad,
}

const initialWindowOffset = { x: 120, y: 100 }
const windowOffset = { x: 40, y: 40 }

const getOffsetForIndex = (index) => ({
  x: initialWindowOffset.x + windowOffset.x * index,
  y: initialWindowOffset.y + windowOffset.y * index,
})

const naiveId = () => Date.now()

const createApp = (id, createWindowProps) => {
  if (!appMap[id]) throw new Error(`No app registered for '${id}'`)

  const generatedId = `${id}-${naiveId()}`
  return {
    id: generatedId,
    ...appMap[id],
    initialProps: {
      ...appMap[id].initialProps,
      ...(createWindowProps ? createWindowProps(generatedId) : null),
    },
  }
}

const filterWindows = (wins, targetId) =>
  wins.filter(({ id }) => id !== targetId)

const move = (arr, from, to) => {
  const clone = [...arr]
  Array.prototype.splice.call(
    clone,
    to,
    0,
    Array.prototype.splice.call(clone, from, 1)[0]
  )
  return clone
}

const moveItemToEnd = (arr, itemId) => {
  const targetIndex = arr.findIndex(({ id }) => id === itemId)
  if (~targetIndex) {
    return move(arr, targetIndex, arr.length)
  }
}

const stopPropagation = (wrappedCallback) => (e) => {
  e.stopPropagation()
  return wrappedCallback()
}

function App() {
  const [activeWindows, setActiveWindows] = useState([])

  const removeWindow = useCallback(
    (id) => setActiveWindows(filterWindows(activeWindows, id)),
    [activeWindows]
  )

  const openApp = useCallback(
    (id) => {
      const newWindows = activeWindows.concat(
        createApp(id, () => ({
          initialPosition: getOffsetForIndex(activeWindows.length),
        }))
      )

      setActiveWindows(newWindows)
    },
    [activeWindows]
  )

  const foregroundWindow = useCallback(
    (id) => {
      const newWindows = moveItemToEnd(activeWindows, id)
      setActiveWindows(newWindows)
    },
    [activeWindows]
  )

  return (
    <Desktop onOpenIcon={openApp} apps={appMap}>
      {activeWindows.map(({ id, App, initialProps }, idx) => (
        <App
          key={id}
          {...initialProps}
          focusedWindow={idx === activeWindows.length - 1}
          onFocusWindow={() => foregroundWindow(id)}
          onClose={stopPropagation(() => removeWindow(id))}
        />
      ))}
    </Desktop>
  )
}

export default App
