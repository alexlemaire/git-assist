const chalk = require('chalk')
const Conf = require('conf')

module.exports = (type, user, key) => {
  updateKeyConfig(type, user, key)
  updateUserConfig(type, user, key)
}

function updateKeyConfig (type, user, key) {
  const keyConfig = new Conf({
    configName: type,
    fileExtension: 'keys',
    accessPropertiesByDotNotation: false
  })
  let infoMsg = `Storing ${type.toUpperCase()} key ${chalk.italic.cyan(key)} information...`
  let successMsg = 'Key information successfully stored!'
  if (keyConfig.has(key)) {
    infoMsg = `${type.toUpperCase()} key ${chalk.italic.cyan(key)} already exists. Updating...`
    successMsg = 'Key information successfully updated!'
  }
  clog.info(infoMsg)
  keyConfig.set(key, {
    user,
    lastModified: Date.now()
  })
  clog.success(successMsg)
}

function updateUserConfig (type, user, key) {
  const userConfig = new Conf({
    configName: 'users',
    fileExtension: 'conf',
    accessPropertiesByDotNotation: false
  })
  let data = {
    lastModified: Date.now()
  }
  data[type] = key
  let infoMsg = `Storing ${chalk.italic.blue(user)} information...`
  let successMsg = 'Information successfully stored!'
  if (userConfig.has(user)) {
    infoMsg = `User ${chalk.italic.blue(user)} already exists. Updating...`
    successMsg = 'User successfully updated!'
    data = {
      ...userConfig.get(user),
      ...data
    }
  }
  clog.info(infoMsg)
  userConfig.set(user, data)
  clog.success(successMsg)
}
