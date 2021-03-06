module.exports = (info) => {
  const spawnSync = require('child_process').spawnSync
  const chalk = require('chalk')
  const Conf = require('conf')
  const config = new Conf({
    configName: 'users',
    fileExtension: 'conf',
    accessPropertiesByDotNotation: false
  })
  // for global config we cannot use isomorphic-git as they do not currently support global config. May be worth helping them with this
  spawnSync('git', ['config', '--global', 'user.name', info.name])
  spawnSync('git', ['config', '--global', 'user.email', info.email])
  const user = config.get(info.email) || {}
  const key = user.gpg
  if (!key) {
    clog.error(`No GPG key was created via ${chalk.italic.blue('git-assist')} for ${chalk.italic.green(info.email)}: not adding a GPG key to this configuration.`)
    clog.info(`GitHub global configuration is synchronized (if needed) before any operation done with ${chalk.italic.blue('git-assist')}. So if you already generated and assigned a GPG key to your global user, you're good to go!`)
    clog.info(`If you wish to let ${chalk.italic.blue('git-assist')} handle your GPG keys accross users, please run ${chalk.cyan.italic('git-assist gpg --generate')} in order to generate a GPG key then rerun this command to add it automatically to your configuration.\n`)
  } else {
    clog.info(`Automatically pulling GPG key created via ${chalk.italic.cyan('git-assist')} for ${chalk.italic.blue(info.email)}...`)
    spawnSync('git', ['config', '--global', 'user.signingkey', key])
    spawnSync('git', ['config', '--global', 'commit.gpgSign', true])
  }
  clog.success('Global configuration successfully updated!')
}
