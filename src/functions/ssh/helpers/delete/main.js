module.exports = async (args) => {
  const keys = require(appRoot + '/src/utils/key-gen/get-keys.js')('ssh')
  if (keys.length === 0) {
    const chalk = require('chalk')
    clog.info(`Woops, seems like no SSH key has been generated with ${chalk.italic.cyan('git-assist')} for now...`)
  } else {
    const { chosenKeys } = await require('./info-prompter.js')(keys)
    for (const chosenKey of chosenKeys) {
      require('./delete-key.js')(chosenKey.key)
      await require('./delete-pwd.js')(chosenKey.key)
      require(appRoot + '/src/utils/key-gen/delete-entries.js')('ssh', chosenKey.users.map(user => user.user))
    }
  }
}
