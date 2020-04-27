import { useCallback, useState } from 'react'

const commandSent = (text) => {
  return text.substr(-1) === '\n'
}

const promptPrefix = 'C:>'

const prefixPrompt = (text = '') => {
  return `${promptPrefix}${text}`
}

const supportedBins = ['echo']

const binUnsupported = (txt) => {
  const space = txt.indexOf(' ')
  const cmd = space > 0 ? txt.substr(0, space) : txt
  return supportedBins.includes(cmd) === false
}

export const usePrompt = () => {
  const [commandHistory, setCommandHistory] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')

  const onTextAreaChange = useCallback(
    (currentText) => {
      if (commandSent(currentText)) {
        const txt = currentText.substr(0, currentText.length - 1)
        let newHistory = commandHistory.concat(prefixPrompt(txt))
        if (binUnsupported(txt)) {
          newHistory = newHistory.concat('Unrecognized command')
        }
        setCommandHistory(newHistory)
        setCurrentCommand('')
      } else {
        setCurrentCommand(currentText)
      }
    },
    [commandHistory]
  )

  return {
    commandHistory,
    activeCommand: `${prefixPrompt(currentCommand)}_`,
    textareaContent: currentCommand,
    onTextAreaChange,
  }
}
