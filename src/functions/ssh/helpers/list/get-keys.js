module.exports = async () => {
  const Conf = require('conf')
  const config = new Conf({
    configName: 'keys',
    fileExtension: 'conf'
  })
  let sshKeyMap = config.get('ssh') || {}
  return Object.entries(sshKeyMap)
}
