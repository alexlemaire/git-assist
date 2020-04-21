#!/usr/bin/env node
async function main() {
  const logger = require('./src/utils/loggers/logger.js')
  const chalk = require('chalk')
  global.appRoot = require('app-root-path').path
  const { args, fct, fctName } = await processArgs(process.argv.splice(2))
  global.clog = getLogger(fctName)
  if (!fct) {
    throw new Error(`${chalk.italic.blue(args[0])} is not an accepted command! Call ${chalk.italic.blue('git-assist --help')} or ${chalk.italic.blue('git-assist -h')} to get information on which commands are available.`)
  }
  clog.heading(`Started running ${fctName.toUpperCase()}`)
  await require(fct.handler)(args.splice(1))
  require('./src/utils/version/check-version.js')()
  clog.heading(`${fctName.toUpperCase()} ended`)
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

async function processArgs(args) {
  const fcts = require('./functions.json')
  if (args.length === 0) {
    args = await require('./src/utils/no-args/no-args.js')(fcts, args)
  }
  const matchFct = Object.entries(fcts).filter(entry => entry[1].cmds.includes(args[0]))[0]
  return {
    args,
    ...(matchFct && {fct: matchFct[1], fctName: matchFct[0]})
  }
}

main().catch(err => {
  clog.error(err.stack)
})
