module.exports = async (gpgKey) => {
  const path = require('path')
  const staticRoot = path.join(__dirname, '..', 'static')
  require('../../../utils/key-gen/local-instructions.js')(gpgKey, 'GPG')
  await require('../../../utils/key-gen/online-instructions.js')(gpgKey, 'GPG', staticRoot)
}
