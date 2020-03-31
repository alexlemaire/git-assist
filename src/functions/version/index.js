module.exports = (args) => {
  const fs = require('fs')
  const pjson = require('../../../package.json')
  const clog = require('../../utils/loggers/console-log.js')
  clog.info(`Your currently installed git-assist version is ${pjson.version}`)
}
