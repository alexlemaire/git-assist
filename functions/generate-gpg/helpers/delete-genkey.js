module.exports = (path) => {
  const fs = require('fs')
  const clog = require('../../../utils/loggers/console-log.js')
  clog.info('Removing key definition file...')
  fs.unlinkSync(path)
  clog.success('File removed!')
}
