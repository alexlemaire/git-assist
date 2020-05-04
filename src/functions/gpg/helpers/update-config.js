module.exports = (info, keyId) => {
  const chalk = require('chalk')
  clog.info(`Adding the GPG key to ${chalk.italic.cyan('git-assist')}...`)
  require(appRoot + '/src/utils/key-gen/update-config.js')('gpg', info.email, keyId)
  clog.success(`GPG key successfully added for ${info.email}!`)
}
