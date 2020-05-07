module.exports = (args) => {
  const pjson = require(appRoot + '/package.json')
  const chalk = require('chalk')
  clog.info(`Your currently installed git-assist version is ${chalk.magenta(pjson.version)}`)
}
