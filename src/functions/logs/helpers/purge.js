module.exports = async (args) => {
  await require('./process-args.js')(args, purgeLog)
}

function purgeLog(file, filePath) {
  const fs = require('fs')
  const chalk = require('chalk')
  clog.info(`Purging ${chalk.italic.cyan(file)}...`)
  process.on('exit', function () {
    fs.writeFileSync(filePath, '', 'utf-8')
  })
}
