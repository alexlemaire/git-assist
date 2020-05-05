module.exports = (type, key) => {
  const chalk = require('chalk')
  const path = require('path')
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
  const id = type === 'ssh' ? path.basename(key) : key
  const users = keyConfig.get(id).users
  clog.info(`Deleting ${type.toUpperCase()} key ${chalk.italic.cyan(id)}...`)
  keyConfig.delete(id)
  clog.success('Key successfully deleted!')
  clog.info(`Deleting users using ${chalk.italic.cyan(id)}...`)
  for (const user of users) {
    userConfig.delete(user)
  }
  clog.success(`Successfully deleted all users using ${chalk.italic.cyan(id)}!`)
}
