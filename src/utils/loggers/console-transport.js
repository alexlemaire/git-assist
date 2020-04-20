module.exports = (opts) => {
  const winston = require('winston')
  const level = 'success'
  const format = winston.format.simple()
  return new winston.transports.Console({ level, format })
}
