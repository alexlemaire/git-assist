module.exports = async (args) => {
  await require('./process-args.js')(args, printLog)
}

function printLog(file, filePath) {
  const fs = require('fs')
  const chalk = require('chalk')
  clog.info(`Printing ${chalk.italic.cyan(file)}...`)
  console.log(fs.readFileSync(filePath, 'utf-8'))
}
