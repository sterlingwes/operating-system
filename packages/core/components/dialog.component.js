import React from 'react'
import { Window } from './window.component'

export const Dialog = ({ title }) => (
  <Window {...{ title }}>
    <div className="field-row" style={{ justifyContent: 'center' }}>
      <button>OK</button>
      <button>Cancel</button>
    </div>
  </Window>
)
