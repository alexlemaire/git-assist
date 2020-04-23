module.exports = async (args) => {
  switch (args[0]) {
    case '--purge':
      console.log('purge')
      break
    case '--watch':
      console.log('watch')
      break
    default:
      const chalk = require('chalk')
      throw new Error(`${args[0]} is not a supported option for ${chalk.italic.blue('logs')} utility. Available options are: [--purge] to purge log file(s) & [--watch] to watch a log file.`)
  }
}
