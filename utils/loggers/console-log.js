const chalk = require('chalk')
const terminalLink = require('terminal-link')

const success = (msg, opts) => {
  opts = processOpts(opts)
  const header = chalk.green('✓')
  const body = chalk.green(formatMsg(msg, opts))
  console.log(`${header} ${body}`)
}

const info = (msg, opts) => {
  opts = processOpts(opts)
  const header = chalk.yellow('ℹ')
  const body = chalk.yellow(formatMsg(msg, opts))
  console.log(`${header} ${body}`)
}

const error = (msg, opts) => {
  opts = processOpts(opts)
  const header = chalk.white.bgRed('Error')
  const body = msg => chalk.red(formatMsg(msg, opts))
  switch (typeof msg) {
    case 'string':
      console.log(`${header} ${body(msg)}`)
      break
    case 'object':
      console.log(`${header} ${body(msg.stack)}`)
      break
    default:
      throw new Error('Invalid message type')
      break
  }
}

const log = (msg, opts) => {
  opts = processOpts(opts)
  console.log(formatMsg(msg, opts))
}

function formatMsg(msg, opts) {
  let gitAssist = 'git-assist'
  if (opts.format) {
    gitAssist = chalk.blue.underline.italic('git-assist')
  }
  if (opts.makeLink) {
    const link = terminalLink(gitAssist, 'https://github.com/alexlemaire/git-assist')
    return msg.replace('git-assist', link)
  }
  return msg.replace('git-assist', gitAssist)
}

function processOpts(opts) {
  return {...{makeLink: true, format: true}, ...opts}
}

module.exports = {
  success,
  info,
  error,
  log
}
