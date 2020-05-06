module.exports = async (args) => {
  let opt = args[0]
  if (!opt) {
    opt = (await require(appRoot + '/src/utils/key-gen/no-args.js')()).opt
  }
  const fct = opt.replace('--', '')
  let keys = []
  if (fct !== 'generate') {
    keys = require(appRoot + '/src/utils/key-gen/get-keys.js')('gpg')
    if (keys.length === 0) {
      const chalk = require('chalk')
      clog.info(`Woops, seems like no GPG key has been generated with ${chalk.italic.cyan('git-assist')} for now...`)
      process.exit(0)
    }
  }
  await require(`./helpers/${fct}/main.js`)(keys)
}
