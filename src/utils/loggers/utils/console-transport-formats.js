const chalk = require('chalk')

// utils
function headedLog (body, head, bodyOpts, headOpts) {
  if (!headOpts) {
    headOpts = bodyOpts
  }
  return `${format(head, headOpts)} ${format(body, bodyOpts)}`
}

function format (msg, opts) {
  return opts.split('.').reduce((acc, cur) => acc[cur], chalk)(msg)
}

// exports
function success (msg) {
  return headedLog(msg, '✔️', 'green')
}

function info (msg) {
  return headedLog(msg, 'ℹ', 'yellow')
}

function error (msg) {
  return headedLog(msg, 'ERROR', 'red', 'white.bgRed')
}

module.exports = {
  success,
  info,
  error
}
