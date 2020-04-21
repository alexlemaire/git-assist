module.exports = (opts) => {
  const winston = require('winston')
  const path = require('path')
  const appRoot = require('app-root-path').path
  const getTimestamp = require('./get-timestamp.js')
  const level = 'heading'
  const filename = path.join(appRoot, 'logs', opts.filename)
  const format = winston.format.printf(info => info.level === 'heading' ?
  `\n---------------------------\n${info.message} @${getTimestamp().split('@')[1]}\n---------------------------\n` :
  `${getTimestamp()} || ${info.level.toUpperCase()}: ${info.message}`)
  return new winston.transports.File({ level, filename, format })
}
