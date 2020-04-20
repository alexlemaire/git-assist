module.exports = (path) => {
  const fs = require('fs')
  const appRoot = require('app-root-path').path
  const clog = require(appRoot + '/src/utils/loggers/console-log.js')
  clog.info('Removing key definition file...')
  fs.unlinkSync(path)
  clog.success('File removed!')
}
