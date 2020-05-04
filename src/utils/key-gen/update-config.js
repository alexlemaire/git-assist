module.exports = (type, user, key) => {
  const chalk = require('chalk')
  const Conf = require('conf')
  const config = new Conf({
    configName: 'keys',
    fileExtension: 'conf'
  })
  let keyMap = config.get(type) || {}
  if (keyMap[user]) {
    clog.info(`${type === 'ssh' ? 'An SSH' : 'A GPG'} key already exists for ${chalk.italic.cyan(user)}. Updating existing key...`)
  }
  keyMap[user] = {
    lastModified: Date.now()
  }
  keyMap[user][type === 'ssh' ? 'path' : 'id'] = key
  config.set(type, keyMap)
}
