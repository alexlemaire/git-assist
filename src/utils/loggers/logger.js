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

module.exports = (opts) => {
  const winston = require('winston')
  opts = getOpts(opts)
  const levels = { error: 0, info: 1, success: 2 }
  const transports = Object.entries(opts.transports).filter(entry => entry[1]).map(entry => require(`./${entry[0]}-transport.js`)(opts))
  return winston.createLogger({ levels, transports })
}
