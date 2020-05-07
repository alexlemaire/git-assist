module.exports = (opts) => {
  const winston = require('winston')
  const level = 'success'
  const format = winston.format.printf(formatHandler)
  return new winston.transports.Console({ level, format })
}

function formatHandler (info) {
  const formats = require('../utils/console-transport-formats.js')
  return formats[info.level](info.message)
}
