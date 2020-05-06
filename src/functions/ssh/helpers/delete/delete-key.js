module.exports = (key) => {
  const fs = require('fs')
  const chalk = require('chalk')
  clog.info(`Deleting key file for ${chalk.italic.cyan(key)}...`)
  fs.unlinkSync(key)
  fs.unlinkSync(`${key}.pub`)
  clog.success('Key file successfully deleted!')
}
