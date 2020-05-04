module.exports = async (args) => {
  const keys = require(appRoot + '/src/utils/key-gen/get-keys.js')('ssh')
  if (keys.length === 0) {
    const chalk = require('chalk')
    clog.info(`Woops, seems like no SSH key has been generated with ${chalk.italic.cyan('git-assist')} for now...`)
  } else {
    require('./print-keys.js')(keys)
  }
}
