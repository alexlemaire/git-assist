module.exports = async (keys, type) => {
  const chalk = require('chalk')
  const path = require('path')
  clog.info(`Printing ${type.toUpperCase()} keys generated with ${chalk.italic.cyan('git-assist')}...`)
  for (const key of keys) {
    const id = type === 'ssh' ? path.basename(key.ref) : key.ref
    console.log(`\n${chalk.italic.blue(id)} ${chalk.magenta('information:')}`)
    console.log(`${chalk.italic.green(` • ${type === 'ssh' ? 'path' : 'ID'}:`)} ${key.ref}`)
    const lastModified = new Date(key.lastModified)
    console.log(`${chalk.italic.cyan(' • last modified:')} ${lastModified.toLocaleDateString()} @ ${lastModified.toLocaleTimeString()}`)
    console.log(`${chalk.italic.yellow(' • users:')}`)
    for (const user of key.users) {
      console.log(`   - ${user}`)
    }
  }
}
