const winston = require('winston')
const path = require('path')
const appRoot = require('app-root-path').path

function getOpts(opts) {
  const defaults = {
    transports: {
      console: true,
      file: true
    },
    filename: 'combined.log'
  }
  return {...defaults, ...opts}
}

function getTransports(transportOpts, filename) {
  let transports = []
  if (transportOpts.console) {
    transports.push(new winston.transports.Console({
      format: winston.format.simple()
    }))
  }
  if (transportOpts.file) {
    transports.push(new winston.transports.File({
      filename: path.join(appRoot, 'logs', filename),
      format: winston.format.json()
    }))
  }
  return transports
}

class Logger {
  constructor(opts) {
    opts = getOpts(opts)
    console.log(opts)
    this.logger = winston.createLogger({
      levels: {
        error: 0,
        info: 1,
        success: 2
      },
      transports: getTransports(opts.transports, opts.filename)
    })
  }
  error(message) {
    this.logger.log({
      level: 'error',
      message
    })
  }
}

module.exports = Logger
