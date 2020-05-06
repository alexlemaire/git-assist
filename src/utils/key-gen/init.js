module.exports = async (args, type) => {
  let opt = args[0]
  if (!opt) {
    opt = (await require('./no-args.js')()).opt
  }
  const fct = opt.replace('--', '')
  let keys = []
  if (fct !== 'generate') {
    keys = require('./get-keys.js')(type)
    if (keys.length === 0) {
      const chalk = require('chalk')
      clog.info(`Woops, seems like no ${type.toUpperCase()} key has been generated with ${chalk.italic.cyan('git-assist')} for now...`)
      process.exit(0)
    }
  }
  return {fct, keys}
}
