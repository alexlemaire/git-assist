module.exports = (type, users) => {
  const Conf = require('conf')
  const config = new Conf({
    configName: 'keys',
    fileExtension: 'conf'
  })
  let keyMap = config.get(type) || {}
  for (const user of users) {
    delete keyMap[user]
  }
  let currentConfig = config.store
  currentConfig[type] = keyMap
  config.store = currentConfig
}
