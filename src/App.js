import React, { useState } from 'react'
import { Desktop } from './components'
import '98.css'
import { DOSPrompt } from './core-apps'

// const supportedApps = [DOSPrompt]
// const WindowManager = createContext({ activeWindows: [] })

function App() {
  const [activeWindows] = useState([
    {
      Component: DOSPrompt,
      initialProps: { initialPosition: { x: 200, y: 100 } },
    },
  ])

  return (
    <Desktop>
      {activeWindows.map(({ Component, initialProps }) => (
        <Component {...initialProps} />
      ))}
    </Desktop>
  )
}

export default App
