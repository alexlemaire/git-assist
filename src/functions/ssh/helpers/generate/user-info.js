module.exports = async (keyPath) => {
  const fs = require('fs')
  const path = require('path')
  const staticRoot = path.join(appRoot, 'src', 'functions', 'ssh', 'static')
  const key = fs.readFileSync(`${keyPath}.pub`, 'utf-8')
  require(appRoot + '/src/utils/key-gen/local-instructions.js')(key, 'SSH')
  await require(appRoot + '/src/utils/key-gen/online-instructions.js')(key, 'SSH', staticRoot)
}
