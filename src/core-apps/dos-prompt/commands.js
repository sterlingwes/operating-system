const commands = {
  echo: (...args) => {
    return args.join(' ')
  },
  embiggen: () => {
    document.body.requestFullscreen()
    return 'A noble spirit embiggens the smallest person.'
  },
}

const supportedBins = Object.keys(commands)

const binUnsupported = (cmd) => {
  return supportedBins.includes(cmd) === false
}

export const runCommand = (txt) => {
  const [cmd, ...rest] = txt.split(' ')

  if (binUnsupported(cmd)) {
    return `Unrecognized command '${cmd}'.`
  }

  return commands[cmd](...rest)
}
