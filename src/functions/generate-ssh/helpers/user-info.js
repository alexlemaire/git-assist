module.exports = async (keyPath) => {
  const fs = require('fs')
  const path = require('path')
  const staticRoot = path.join(__dirname, '..', 'static')
  const key = fs.readFileSync(`${keyPath}.pub`, 'utf-8')
  require('../../../utils/key-gen/local-instructions.js')(key, 'SSH')
  await require('../../../utils/key-gen/online-instructions.js')(key, 'SSH', staticRoot)
}
