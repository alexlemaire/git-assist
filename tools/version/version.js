const fs = require('fs')
const clog = require('../../src/utils/loggers/console-log.js')
const args = process.argv.splice(2)
if (args.length === 0) {
  throw new Error('Please specify a new semantic version as argument!')
}
const semVer = args[0]

updateFile('package.json')
updateFile('package-lock.json')

function updateFile (file) {
  let content = JSON.parse(fs.readFileSync(file, 'utf-8'))
  content.version = semVer
  clog.info(`Updating ${file} version to ${semVer}`)
  fs.writeFileSync(`./${file}`, JSON.stringify(content, null, 2), 'utf-8')
  clog.success('Done!')
}
