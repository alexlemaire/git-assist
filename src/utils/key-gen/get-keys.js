module.exports = (type) => {
  const Conf = require('conf')
  const config = new Conf({
    configName: type,
    fileExtension: 'keys',
    accessPropertiesByDotNotation: false
  })
  let keys = Object.values(config.store)
  keys.sort((a, b) => {
    const keyA = a.ref.toUpperCase()
    const keyB = b.ref.toUpperCase()
    if (keyA < keyB) {
      return -1
    }
    if (keyA > keyB) {
      return 1
    }
    return 0
  })
  return keys
}
