import React, { useCallback, useState } from 'react'
import { Desktop } from './components'
import '98.css'
import { DOSPrompt } from './core-apps'

const appMap = {
  'dos-prompt': {
    Component: DOSPrompt,
    initialProps: {},
  },
}

const initialWindowOffset = { x: 120, y: 100 }
const windowOffset = { x: 40, y: 40 }

const getOffsetForIndex = (index) => ({
  x: initialWindowOffset.x + windowOffset.x * index,
  y: initialWindowOffset.y + windowOffset.y * index,
})

const naiveId = () => Date.now()

const createApp = (id, createWindowProps) => {
  const generatedId = `${id}-${naiveId()}`
  return {
    id: generatedId,
    ...appMap[id],
    initialProps: {
      ...appMap[id].initialProps,
      ...createWindowProps(generatedId),
    },
  }
}

const filterWindows = (wins, targetId) =>
  wins.filter(({ id }) => id !== targetId)

function App() {
  const [activeWindows, setActiveWindows] = useState([])

  const removeWindow = useCallback(
    (id) => setActiveWindows(filterWindows(activeWindows, id)),
    [activeWindows]
  )

  const openApp = useCallback(
    (id) => {
      const newWindows = activeWindows.concat(
        createApp(id, (generatedId) => ({
          initialPosition: getOffsetForIndex(activeWindows.length),
        }))
      )

      setActiveWindows(newWindows)
    },
    [activeWindows]
  )

  return (
    <Desktop onOpenIcon={openApp}>
      {activeWindows.map(({ id, Component, initialProps }) => (
        <Component
          key={id}
          {...initialProps}
          onClose={() => removeWindow(id)}
        />
      ))}
    </Desktop>
  )
}

export default App
