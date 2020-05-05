module.exports = async (keyPath) => {
  const chalk = require('chalk')
  const path = require('path')
  const pwdManager = require(appRoot + '/src/utils/auth/pwd-manager.js')
  clog.info(`Deleting password for ${chalk.italic.cyan(path.basename(keyPath))}...`)
  await pwdManager.deletePwd(keyPath)
  clog.success(`Successfully deleted password!`)
}
