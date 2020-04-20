module.exports = (args) => {
  const fs = require('fs')
  const appRoot = require('app-root-path').path
  const pjson = require(appRoot + '/package.json')
  const clog = require(appRoot + '/src/utils/loggers/console-log.js')
  clog.info(`Your currently installed git-assist version is ${pjson.version}`)
}
