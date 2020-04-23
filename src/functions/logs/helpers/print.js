module.exports = (file, filePath) => {
  const fs = require('fs')
  const chalk = require('chalk')
  clog.info(`Printing ${chalk.italic.cyan(file)}...`)
  process.on('exit', function () {
    console.log(fs.readFileSync(filePath, 'utf-8'))
  })
}
