const chalk = require('chalk')

// utils
function headedLog(msg, icon, color) {
  const header = chalk[color](icon)
  const body = chalk[color](msg)
  return `${header} ${body}`
}

// exports
function success(msg) {
  return headedLog(msg, '✔️', 'green')
}

function info(msg) {
  return headedLog(msg, 'ℹ', 'yellow')
}

function error(msg) {
  const header = chalk.white.bgRed('Error')
  const body = chalk.red(msg)
  return `${header} ${body}`
}

module.exports = {
  success,
  info,
  error
}
