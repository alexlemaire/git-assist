module.exports = (type, user, key) => {
  const chalk = require('chalk')
  clog.info(`Updating ${type.toUpperCase()} key for ${chalk.italic.blue(user)}...`)
  require('../update-config.js')(type, user, key)
  clog.success(`${type.toUpperCase()} key successfully updated!`)
}
