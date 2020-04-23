module.exports = (file, filePath) => {
  const fs = require('fs')
  const chalk = require('chalk')
  clog.info(`Purging ${chalk.italic.cyan(file)}...`)
  process.on('exit', function () {
    fs.writeFileSync(filePath, '', 'utf-8')
  })
}
