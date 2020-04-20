module.exports = (opts) => {
  const winston = require('winston')
  const path = require('path')
  const appRoot = require('app-root-path').path
  const level = 'success'
  const filename = path.join(appRoot, 'logs', opts.filename)
  const format = winston.format.printf(info => `${getTimestamp()} || ${info.level.toUpperCase()}: ${info.message}`)
  return new winston.transports.File({ level, filename, format })
}

function getTimestamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = formatTime(now.getMonth() + 1)
  const day = formatTime(now.getDate())
  const hours = formatTime(now.getHours())
  const mins = formatTime(now.getMinutes())
  const secs = formatTime(now.getSeconds())
  const ms = formatMs(now.getMilliseconds())
  return `${year}-${month}-${day} @ ${hours}:${mins}:${secs}.${ms}`
}

function formatTime(time) {
  return time < 10 ? `0${time}` : `${time}`
}

function formatMs(ms) {
  return ms < 100 ? `${ms} ` : `${ms}`
}