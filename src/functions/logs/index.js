module.exports = async (args) => {
  if (!args[0] || !`${args[0]}`.startsWith('-')) {
    await require('./helpers/print.js')(args)
  } else {
    if (!['--purge', '--watch'].includes(args[0])) {
      const chalk = require('chalk')
      throw new Error(`${args[0]} is not a supported option for ${chalk.italic.blue('logs')} utility. Available options are: [--purge] to purge log file(s) & [--watch] to watch a log file.`)
    }
    await require(`./helpers/${args[0].replace('--', '')}.js`)(args.splice(1))
  }
}
