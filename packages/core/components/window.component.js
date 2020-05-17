import React from 'react'
import { Rnd } from 'react-rnd'
import styled from 'styled-components'

const dims = ({ width, height } = {}) => ({
  width,
  height,
})

const noDims = ({ width, height, ...rest }) => rest

const TitleBarWrapper = styled('div')`
  ${(props) => (props.focused ? '' : `background: #7F787F`)}
`

const TitleBarText = styled('div')`
  ${(props) => (props.focused ? '' : `color: silver`)}
`

const TitleImage = styled('img')`
  height: 12px;
  margin-right: 5px;
`

const TitleBar = ({ image, title, onMin, onMax, onClose, focusedWindow }) => (
  <TitleBarWrapper className="title-bar" focused={focusedWindow}>
    <TitleBarText className="title-bar-text" focused={focusedWindow}>
      {image && <TitleImage src={image} alt={title} />}
      {title}
    </TitleBarText>
    <div className="title-bar-controls">
      {onMin && <button aria-label="Minimize" onClick={onMin} />}
      {onMax && <button aria-label="Maximize" onClick={onMax} />}
      {onClose && <button aria-label="Close" onClick={onClose} />}
    </div>
  </TitleBarWrapper>
)

const MenuBar = ({ menuItems }) => (
  <section className="field-row" style={{ justifyContent: 'flex-start' }}>
    {menuItems.map((item) => (
      <div>
        <button className="menu-bar">{item.label}</button>
        <div className="menu" style={{ width: 160 }}>
          <ul>
            {item.childItems.map(({ type, onClick, disabled, label }) =>
              type === 'separator' ? (
                <div className="separator"></div>
              ) : (
                <li onClick={onClick} className={disabled ? 'disabled' : ''}>
                  {label}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    ))}
  </section>
)

const WindowDialog = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const resizableHandles = (resizable) =>
  resizable
    ? {
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: true,
        topLeft: true,
        topRight: true,
      }
    : false

export const Window = ({
  children,
  style,
  title,
  image,
  menuItems,
  onMin,
  onMax,
  onClose,
  onDragStop,
  onResize,
  onFocusWindow,
  focusedWindow,
  resizable = true,
  initialPosition,
  bodyMargin = true,
}) => {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        ...dims(style),
        ...initialPosition,
      }}
      dragHandleClassName="title-bar"
      enableResizing={resizableHandles(resizable)}
      {...{ onDragStop, onResize }}
    >
      <WindowDialog
        style={noDims(style)}
        className="window"
        onClick={onFocusWindow}
      >
        {title && (
          <TitleBar
            {...{ title, image, onMin, onMax, onClose, focusedWindow }}
          />
        )}

        {menuItems && <MenuBar menuItems={menuItems} />}

        {bodyMargin ? <div className="window-body">{children}</div> : children}
      </WindowDialog>
    </Rnd>
  )
}
