module.exports = (keyPath) => {
  const fs = require('fs')
  const path = require('path')
  const chalk = require('chalk')
  clog.info(`Deleting key file for ${chalk.italic.cyan(path.basename(keyPath))}...`)
  fs.unlinkSync(keyPath)
  clog.success('Key file successfully deleted!')
}
