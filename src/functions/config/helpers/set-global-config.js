module.exports = (info) => {
  const spawnSync = require('child_process').spawnSync
  const chalk = require('chalk')
  const Conf = require('conf')
  const config = new Conf({
    configName: 'keys',
    fileExtension: 'conf'
  })
  // for global config we cannot use isomorphic-git as they do not currently support global config. May be worth helping them with this
  spawnSync('git', ['config', '--global', 'user.name', info.name])
  spawnSync('git', ['config', '--global', 'user.email', info.email])
  const gpgKeyMap = config.get('gpg') || {}
  const keyId = gpgKeyMap[info.email].id
  if (!keyId) {
    clog.error(`No GPG key was created for GitHub for ${chalk.italic.green(info.email)}: not adding a GPG key to this configuration.`)
    clog.info(`Please run ${chalk.cyan.italic('git-assist generate-gpg')} in order to generate a GPG key then rerun this command to add it automatically to your configuration.\n`)
  } else {
    clog.info(`Automatically pulling GPG key created via ${chalk.italic.cyan('git-assist')}.`)
    spawnSync('git', ['config', '--global', 'user.signingkey', keyId])
    spawnSync('git', ['config', '--global', 'commit.gpgSign', true])
  }
  clog.success('Global configuration successfully updated!')
}
