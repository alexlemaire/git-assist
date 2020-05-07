module.exports = (file, filePath) => {
  const fs = require('fs')
  const chalk = require('chalk')
  clog.info(`Watching ${chalk.italic.cyan(file)}...`)
  console.log(fs.readFileSync(filePath, 'utf-8'))
  const Tail = require('tail').Tail
  const tail = new Tail(filePath)
  tail.on('line', function (data) {
    console.log(data)
  })
  tail.on('error', function (error) {
    clog.error(error)
  })
  process.on('SIGINT', function () {
    tail.unwatch()
  })
}
