const chalk = require('chalk')
const terminalLink = require('terminal-link')

const success = (msg, opts) => {
  headedLog(msg, opts, '✔️', 'green')
}

const info = (msg, opts) => {
  headedLog(msg, opts, 'ℹ', 'yellow')
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
  console.log(formatMsg(msg, processOpts(opts)))
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

function headedLog(msg, opts, icon, color) {
  const header = chalk[color](icon)
  const body = chalk[color](formatMsg(msg, processOpts(opts)))
  console.log(`${header} ${body}`)
}

module.exports = {
  success,
  info,
  error,
  log
}
