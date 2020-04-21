const winston = require('winston')

module.exports = (opts) => {
  opts = getOpts(opts)
  console.log(opts)
  const levels = { error: 0, info: 1, success: 2, heading: 3 }
  const transports = opts.transports.map(transport => require(`./${transport}-transport.js`)(opts))
  return winston.createLogger({ levels, transports })
}

function getOpts(opts) {
  const defaults = {
    transports: ['console', 'file'],
    filename: 'combined.log'
  }
  return {...defaults, ...opts}
}
