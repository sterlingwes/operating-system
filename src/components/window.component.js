import React from 'react'
import { Rnd } from 'react-rnd'
import styled from 'styled-components'

const dims = ({ width, height } = {}) => ({
  width,
  height,
})

const TitleBarWrapper = styled('div')`
  ${(props) => (props.focused ? '' : `background: #7F787F`)}
`

const TitleBarText = styled('div')`
  ${(props) => (props.focused ? '' : `color: silver`)}
`

const TitleBar = ({ title, onMin, onMax, onClose, focusedWindow }) => (
  <TitleBarWrapper className="title-bar" focused={focusedWindow}>
    <TitleBarText className="title-bar-text" focused={focusedWindow}>
      {title}
    </TitleBarText>
    <div className="title-bar-controls">
      {onMin && <button aria-label="Minimize" onClick={onMin} />}
      {onMax && <button aria-label="Maximize" onClick={onMax} />}
      {onClose && <button aria-label="Close" onClick={onClose} />}
    </div>
  </TitleBarWrapper>
)

export const Window = ({
  children,
  style,
  title,
  onMin,
  onMax,
  onClose,
  onFocusWindow,
  focusedWindow,
  resizable = true,
  initialPosition,
  bodyMargin = true,
}) => {
  const windowStyle = {
    ...style,
    width: '100%',
    height: '100%',
  }

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        ...dims(style),
        ...initialPosition,
      }}
      dragHandleClassName="title-bar"
      enableResizing={resizable}
    >
      <div style={windowStyle} className="window" onClick={onFocusWindow}>
        {title && (
          <TitleBar {...{ title, onMin, onMax, onClose, focusedWindow }} />
        )}

        {bodyMargin ? <div className="window-body">{children}</div> : children}
      </div>
    </Rnd>
  )
}
