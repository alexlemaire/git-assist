module.exports = (path) => {
  const fs = require('fs')
  clog.info('Removing key definition file...')
  fs.unlinkSync(path)
  clog.success('File removed!')
}
