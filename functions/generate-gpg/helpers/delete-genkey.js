module.exports = (path) => {
  const fs = require('fs')
  consola.info('Removing key definition file...')
  fs.unlinkSync(path)
  consola.success('File removed!')
}
