import { useCallback, useState } from 'react'
import { runCommand } from './commands'

const commandSent = (text) => {
  return text.substr(-1) === '\n'
}

const promptPrefix = 'C:>'

const prefixPrompt = (text = '') => {
  return `${promptPrefix}${text}`
}

export const usePrompt = () => {
  const [commandHistory, setCommandHistory] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')

  const onTextAreaChange = useCallback(
    (currentText) => {
      if (commandSent(currentText)) {
        const txt = currentText.substr(0, currentText.length - 1)

        if (txt.trim() === 'cls') {
          setCommandHistory([])
          setCurrentCommand('')
          return
        }

        const newHistory = commandHistory
          .concat(prefixPrompt(txt))
          .concat(runCommand(txt))
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
