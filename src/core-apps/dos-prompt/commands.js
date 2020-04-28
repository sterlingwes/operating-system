const commands = {
  echo: (...args) => {
    return args.join(' ')
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
