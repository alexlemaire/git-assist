module.exports = async (keys) => {
  const chalk = require('chalk')
  const path = require('path')
  clog.info(`Printing SSH keys generated with ${chalk.italic.cyan('git-assist')}...`)
  keys.forEach(key => {
    console.log(`\n${chalk.italic.blue(path.basename(key.key))} ${chalk.magenta('information:')}`)
    console.log(`${chalk.italic.green(' • path:')} ${key.key}`)
    console.log(`${chalk.italic.yellow(' • users:')}`)
    key.users.forEach(user => {
      const lastModified = new Date(user.lastModified)
      console.log(`   - ${user.user} ${chalk.italic.cyan(`(last modified: ${lastModified.toLocaleDateString()} @ ${lastModified.toLocaleTimeString()})`)}`)
    })
  })
}
