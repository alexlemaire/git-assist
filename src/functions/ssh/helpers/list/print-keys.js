module.exports = async (keys) => {
  const chalk = require('chalk')
  const path = require('path')
  clog.info(`Printing SSH keys generated with ${chalk.italic.cyan('git-assist')}...`)
  keys.forEach(key => {
    console.log(`\n${chalk.italic.blue(path.basename(key.ref))} ${chalk.magenta('information:')}`)
    console.log(`${chalk.italic.green(' • path:')} ${key.ref}`)
    const lastModified = new Date(key.lastModified)
    console.log(`${chalk.italic.cyan(' • last modified:')} ${lastModified.toLocaleDateString()} @ ${lastModified.toLocaleTimeString()}`)
    console.log(`${chalk.italic.yellow(' • users:')}`)
    key.users.forEach(user => {
      console.log(`   - ${user}`)
    })
  })
}
