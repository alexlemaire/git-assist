module.exports = async () => {
  const chalk = require('chalk')
  const info = await require('./info-prompter.js')()
  const keyId = require('./generate-gpg.js')(info)
  await require('./user-info.js')(getKeyASCII(keyId))
  clog.info(`Your newly generated key will now automatically be added to your GitHub configuration if you run ${chalk.italic.cyan('git-assist config [-g, --global]')} to configure user ${chalk.italic.blue(info.email)}!`)
}

function getKeyASCII (keyId) {
  const spawnSync = require('child_process').spawnSync
  return spawnSync('gpg', [
    '--armor',
    '--export', keyId
  ]).stdout.toString('utf8')
}
