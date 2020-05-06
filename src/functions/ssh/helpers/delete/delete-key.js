module.exports = (key) => {
  const fs = require('fs')
  const path = require('path')
  const chalk = require('chalk')
  clog.info(`Deleting key file for ${chalk.italic.cyan(path.basename(key))}...`)
  fs.unlinkSync(key)
  fs.unlinkSync(`${key}.pub`)
  clog.success('Key file successfully deleted!')
}
