module.exports = (key) => {
  const spawnSync = require('child_process').spawnSync
  const chalk = require('chalk')
  clog.info(`Removing GPG key ${chalk.italic.cyan(key)} from keyring...`)
  clog.info(`All information displayed here afterward are from ${chalk.italic.yellow('gpg')} system utility and will allow you to remove the GPG key from its keyring.`)
  spawnSync('gpg', ['--delete-secret-keys', key], { stdio: 'inherit' })
  clog.success('Key successfully removed from keyring!')
}
