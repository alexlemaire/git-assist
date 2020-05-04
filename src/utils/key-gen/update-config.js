module.exports = (type, user, key) => {
  const Conf = require('conf')
  const config = new Conf({
    configName: 'keys',
    fileExtension: 'conf'
  })
  let keyMap = config.get(type) || {}
  keyMap[user] = {
    lastModified: Date.now()
  }
  keyMap[user][type === 'ssh' ? 'path' : 'id'] = key
  config.set(type, keyMap)
}
