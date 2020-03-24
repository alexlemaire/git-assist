const chalk = require('chalk')
const terminalLink = require('terminal-link')

const success = msg => {
  const header = chalk.green('✓')
  const body = chalk.green(formatMsg(msg))
  console.log(`${header} ${body}`)
}

const info = msg => {
  const header = chalk.yellow('ℹ')
  const body = chalk.yellow(formatMsg(msg))
  console.log(`${header} ${body}`)
}

const error = msg => {
  const header = chalk.white.bgRed('Error')
  const body = msg => chalk.red(formatMsg(msg))
  switch (typeof msg) {
    case 'string':
      console.log(`${header} ${body(msg)}`)
      break
    case 'object':
      console.log(`${header} ${body(msg.stack.replace('Error: ', ''))}`)
      break
    default:
      throw new Error('Invalid message type')
      break
  }
}

function formatMsg(msg) {
  const gitAssist = chalk.blue.underline.italic('git-assist')
  const link = terminalLink(gitAssist, 'https://github.com/alexlemaire/git-assist')
  return msg.replace('git-assist', link)
}

module.exports = {
  success,
  info,
  error
}
