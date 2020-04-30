module.exports = (info, keyId) => {
  const chalk = require('chalk')
  const Conf = require('conf')
  const config = new Conf({
    configName: 'keys',
    fileExtension: 'conf'
  })
  clog.info(`Adding the GPG key to ${chalk.italic.cyan('git-assist')}...`)
  let gpgKeyMap = config.get('gpg') || {}
  if (gpgKeyMap[info.email]) {
    clog.info(`A GPG key already exists for ${info.email}, this key will now be updated with the newly generated key...`)
  }
  gpgKeyMap[info.email] = keyId
  config.set('gpg', gpgKeyMap)
  clog.success(`GPG key successfully added for ${info.email}!`)
}
