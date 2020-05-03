import React from 'react'
import { Rnd } from 'react-rnd'

const dims = ({ width, height } = {}) => ({
  width,
  height,
})

export const Window = ({
  children,
  style,
  title,
  onMin,
  onMax,
  onClose,
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
      <div style={windowStyle} className="window">
        {title && (
          <div className="title-bar">
            <div className="title-bar-text">{title}</div>
            <div className="title-bar-controls">
              {onMin && <button aria-label="Minimize" onClick={onMin} />}
              {onMax && <button aria-label="Maximize" onClick={onMax} />}
              {onClose && <button aria-label="Close" onClick={onClose} />}
            </div>
          </div>
        )}

        {bodyMargin ? <div className="window-body">{children}</div> : children}
      </div>
    </Rnd>
  )
}
