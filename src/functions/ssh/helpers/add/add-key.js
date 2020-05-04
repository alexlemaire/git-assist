module.exports = (user, key) => {
  const chalk = require('chalk')
  clog.info(`Updating SSH key for ${chalk.italic.blue(user)}...`)
  require(appRoot + '/src/utils/key-gen/update-config.js')('ssh', user, key)
  clog.success('SSH key successfully updated!')
}
