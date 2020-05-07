module.exports = (type, key) => {
  const chalk = require('chalk')
  const Conf = require('conf')
  const keyConfig = new Conf({
    configName: type,
    fileExtension: 'keys',
    accessPropertiesByDotNotation: false
  })
  const userConfig = new Conf({
    configName: 'users',
    fileExtension: 'conf',
    accessPropertiesByDotNotation: false
  })
  const user = keyConfig.get(key).user
  clog.info(`Deleting ${type.toUpperCase()} key ${chalk.italic.cyan(key)}...`)
  keyConfig.delete(key)
  clog.success('Key successfully deleted!')
  clog.info(`Removing ${type.toUpperCase()} key from associated user ${chalk.italic.blue(user)}...`)
  const userData = userConfig.get(user)
  delete userData[type]
  if (!userData.gpg && !userData.ssh) {
    clog.info(`User ${chalk.italic.blue(user)} does not have any GPG or SSH keys associated, deleting user...`)
    userConfig.delete(user)
    clog.success(`${chalk.italic.blue(user)} successfully deleted!`)
  } else {
    userConfig.set(user, userData)
    clog.success(`Successfully removed ${type.toUpperCase()} key from ${chalk.italic.blue(user)}!`)
  }
}
