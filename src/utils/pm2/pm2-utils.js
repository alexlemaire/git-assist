function promisifyPm2(method, ...params) {
  const pm2 = require('pm2')
  return new Promise((resolve, reject) => {
    pm2[method](...params, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function buildExport(methods) {
  let exp = {}
  methods.forEach(method => {
    exp[method] = (...params) => promisifyPm2(method, ...params)
  })
  return exp
}

module.exports = buildExport(['connect', 'start', 'stop', 'delete', 'startup', 'dump', 'list', 'disconnect'])
