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
      }}
      dragHandleClassName="title-bar"
      enableResizing={resizable}
    >
      <div style={windowStyle} className="window">
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            {onMin && <button aria-label="Minimize" onPress={onMin} />}
            {onMax && <button aria-label="Maximize" onPress={onMax} />}
            {onClose && <button aria-label="Close" onPress={onClose} />}
          </div>
        </div>

        <div className="window-body">{children}</div>
      </div>
    </Rnd>
  )
}
