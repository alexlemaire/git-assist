module.exports = async (keys, type) => {
  const chalk = require('chalk')
  const path = require('path')
  clog.info(`Printing ${type.toUpperCase()} keys generated with ${chalk.italic.cyan('git-assist')}...`)
  for (const key of keys) {
    console.log(`\n${chalk.italic.blue(key.ref)} ${chalk.magenta('information:')}`)
    const lastModified = new Date(key.lastModified)
    console.log(`${chalk.italic.cyan(' • last modified:')} ${lastModified.toLocaleDateString()} @ ${lastModified.toLocaleTimeString()}`)
    console.log(`${chalk.italic.yellow(' • user:')} ${key.user}`)
  }
}
