module.exports = async (gpgKey) => {
  const path = require('path')
  const staticRoot = path.join(__dirname, '..', 'static')
  require(appRoot + '/src/utils/key-gen/local-instructions.js')(gpgKey, 'GPG')
  await require(appRoot + '/src/utils/key-gen/online-instructions.js')(gpgKey, 'GPG', staticRoot)
}
