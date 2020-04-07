const clog = require('../loggers/console-log.js')
const chalk = require('chalk')
clog.info(`Using username from local configuration file. If you would like to work under another identity, please update it with ${chalk.blue.italic('git-assist config')}`, {makeLink: false, format: false})
