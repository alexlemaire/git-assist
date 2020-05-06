module.exports = async (gpgKey) => {
  const path = require('path')
  const staticRoot = path.join(appRoot, 'src', 'functions', 'gpg', 'static')
  require(appRoot + '/src/utils/key-gen/local-instructions.js')(gpgKey, 'GPG')
  await require(appRoot + '/src/utils/key-gen/online-instructions.js')(gpgKey, 'GPG', staticRoot)
}
