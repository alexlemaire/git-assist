const chalk = require('chalk')
const Conf = require('conf')

module.exports = (type, user, key) => {
  updateKeyConfig(type, user, key)
  updateUserConfig(type, user, key)
}

function updateKeyConfig(type, user, key) {
  const keyConfig = new Conf({
    configName: type,
    fileExtension: 'keys',
    accessPropertiesByDotNotation: false
  })
  const path = require('path')
  const id = type === 'ssh' ? path.basename(key) : key
  let data = {
    ref: key,
    lastModified: Date.now()
  }
  if (keyConfig.has(id)) {
    clog.info(`${type.toUpperCase()} key ${chalk.italic.cyan(id)} already exists. Updating...`)
    data.users = [...keyConfig.get(id).users, user]
    clog.success('Key information successfully updated!')
  } else {
    clog.info(`Storing ${type.toUpperCase()} key ${chalk.italic.cyan(id)} information...`)
    data.users = [user]
    clog.success('Key information successfully stored!')
  }
  keyConfig.set(id, data)
}

function updateUserConfig(type, user, key) {
  const userConfig = new Conf({
    configName: 'users',
    fileExtension: 'conf',
    accessPropertiesByDotNotation: false
  })
  let data = {
    lastModified: Date.now()
  }
  data[type] = key
  if (userConfig.has(user)) {
    clog.info(`User ${chalk.italic.blue(user)} already exists. Updating...`)
    const userData = userConfig.get(user)
    removeOldRef(type, user, userData[type])
    userConfig.set(user, {
      ...userData,
      ...data
    })
    clog.success('User successfully updated!')
  } else {
    clog.info(`Storing ${chalk.italic.blue(user)} information...`)
    userConfig.set(user, data)
    clog.success('Information successfully stored!')
  }
}

function removeOldRef(type, user, key) {
  const keyConfig = new Conf({
    configName: type,
    fileExtension: 'keys',
    accessPropertiesByDotNotation: false
  })
  const path = require('path')
  const id = type === 'ssh' ? path.basename(key) : key
  clog.info(`Removing user ${chalk.italic.blue(user)} reference from former ${type.toUpperCase()} key ${chalk.italic.cyan(id)}...`)
  const oldKeyConfig = keyConfig.get(id)
  keyConfig.set(id, {
    ...oldKeyConfig,
    ...{
      users: oldKeyConfig.users.filter(filterUser => filterUser !== user),
      lastModified: Date.now()
    }
  })
  clog.success('Successfully removed old reference!')
}
