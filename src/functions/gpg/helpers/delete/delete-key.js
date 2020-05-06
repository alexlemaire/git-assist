module.exports = (key) => {
  const spawnSync = require('child_process').spawnSync
  const chalk = require('chalk')
  clog.info(`Deleting GPG key ${chalk.italic.cyan(key)}...`)
  spawnSync('gpg', ['--delete-secret-keys', key], {stdio: 'inherit'})
  clog.success('Key successfully deleted!')
}
