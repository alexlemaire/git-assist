#!/usr/bin/env node
let args = process.argv.splice(2)
const chalk = require('chalk')
global.appRoot = require('app-root-path').path
global.clog = require('./src/utils/loggers/console-log.js')

async function main() {
  const fcts = require('./functions.json')
  if (args.length === 0) {
    args = await require('./src/utils/no-args/no-args.js')(fcts, args)
  }
  const fct = Object.values(fcts).filter(value => value.cmds.includes(args[0]))[0]
  if (!fct) {
    throw new Error(`${args[0]} is not an accepted command! Call ${chalk.italic('git-assist --help')} or ${chalk.italic('git-assist -h')} to get information on which commands are available.`)
  }
  await require(fct.handler)(args.splice(1))
  require('./src/utils/version/check-version.js')()
}

main().catch(err => {
  clog.error(err.message, {makeLink: false, format: false})
  process.exit(1)
})
