module.exports = (key, keyType) => {
  const clog = require('../loggers/console-log.js')
  const chalk = require('chalk')
  clog.info(`In order to add your new ${keyType} key on GitHub:`)
  console.log(`  1. please follow this link: ${chalk.underline('https://github.com/settings/keys')}`)
  console.log(`  2. click on "New ${keyType} key"`)
  console.log('  3. give a meaningful title to your new key and paste the content below into the "Key" field:\n')
  console.log(key)
}
