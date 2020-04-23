#!/usr/bin/env node
process.stdin.resume()
function requestedExit() {
  clog.info('\nGracefully shutting down (CTRL + C)...')
  clog.heading('REQUESTED END')
  process.exit()
}
process.on('SIGINT', requestedExit)

async function main() {
  const logger = require('./src/utils/loggers/logger.js')
  const chalk = require('chalk')
  const path = require('path')
  global.appRoot = path.resolve(__dirname)
  let { args, fct, fctName } = await processArgs(process.argv.splice(2))
  global.clog = getLogger(fctName)
  if (!fct) {
    throw new Error(`${chalk.italic.blue(args[0])} is not an accepted command! Call ${chalk.italic.blue('git-assist --help')} or ${chalk.italic.blue('git-assist -h')} to get information on which commands are available.`)
  }
  args = args.splice(1)
  clog.heading(`START ${getHeading(fctName, args)}`)
  await require(fct.handler)(args)
  require('./src/utils/version/check-version.js')()
  clog.heading(`END ${getHeading(fctName, args)}`)
}

function getLogger(fctName) {
  const logger = require('./src/utils/loggers/logger.js')
  if (!fctName) {
    return logger()
  }
  switch (fctName) {
    case 'help':
    case 'version':
      return logger({transports: ['console']})
    default:
      return logger({filename: `${fctName}.log`})
  }
}

function getHeading(fctName, args) {
  return `${fctName.toUpperCase()} utility${args.length > 0 ? ` with ${args.join(' & ')} as arguments` : ''}`
}

async function processArgs(args) {
  const fcts = require('./functions.json')
  if (args.length === 0) {
    return await require('./src/utils/no-args/no-args.js')(fcts, args)
  } else {
    const matchFct = Object.entries(fcts).filter(entry => entry[1].cmds.includes(args[0]))[0]
    return {
      args,
      ...(matchFct && {fct: matchFct[1], fctName: matchFct[0]})
    }
  }
}

main().catch(err => {
  clog.error(err.stack)
  clog.heading('UNEXPECTED END')
})
