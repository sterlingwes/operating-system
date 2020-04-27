import React, { useState } from 'react'
import { Window, Desktop } from './components'
import '98.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Desktop>
      <Window title="Hey, you!">
        <p style={{ textAlign: 'center' }}>Current count: {count}</p>
        <div className="field-row" style={{ justifyContent: 'center' }}>
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>0</button>
        </div>
      </Window>
    </Desktop>
  )
}

export default App
