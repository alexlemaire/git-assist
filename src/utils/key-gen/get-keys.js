module.exports = (type) => {
  const keys = readKeys(type)
  return normalize(keys)
}

function readKeys(type) {
  const Conf = require('conf')
  const config = new Conf({
    configName: 'keys',
    fileExtension: 'conf'
  })
  const keyMap = config.get(type) || {}
  return Object.entries(keyMap).map(entry => {
    return {
      key: type === 'ssh' ? entry[1].path : entry[1].id,
      user: entry[0],
      lastModified: entry[1].lastModified
    }
  })
}

function normalize(keys) {
  let normalizedKeys = []
  let filteredKeys = []
  let remainingKeys = keys
  while (remainingKeys.length > 0) {
    const key = remainingKeys[0]
    filteredKeys = remainingKeys.filter(filterKey => filterKey.key === key.key)
    remainingKeys = remainingKeys.filter(filterKey => filterKey.key !== key.key)
    normalizedKeys.push({
      key: key.key,
      users: filteredKeys.map(filteredKey => {
        return {
          user: filteredKey.user,
          lastModified: filteredKey.lastModified
        }
      })
    })
  }
  return normalizedKeys
}
