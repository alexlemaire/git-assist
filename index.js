#!/usr/bin/env node
// **** PROCESS EVENT LISTENERS ****
process.on('SIGINT', () => {
  console.log('\n')
  finishJob(
    {
      level: 'info',
      content: 'Gracefully shutting down (CTRL + C)...'
    },
    {
      level: 'heading',
      content: 'END (USER REQUESTED)'
    }
  )
})

process.on('beforeExit', () => {
  finishJob({ level: 'heading', content: 'END' })
})

// **** MAIN RUNNER ****
async function main () {
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
}

main().catch(err => {
  finishJob(
    {
      level: 'error',
      content: err.stack
    },
    {
      level: 'heading',
      content: 'END (UNEXPECTED)'
    }
  )
})

// **** HELPERS ****
function getLogger (fctName) {
  const logger = require('./src/utils/loggers/logger.js')
  if (!fctName) {
    return logger()
  }
  switch (fctName) {
    case 'help':
    case 'version':
      return logger({ transports: ['console'] })
    default:
      return logger({ filename: `${fctName}.log` })
  }
}

function getHeading (fctName, args) {
  return `${fctName.toUpperCase()} utility${args.length > 0 ? ` with ${args.join(' & ')} as arguments` : ''}`
}

async function processArgs (args) {
  const fcts = require('./functions.json')
  if (args.length === 0) {
    return require('./src/utils/no-args/no-args.js')(fcts, args)
  } else {
    const matchFct = Object.entries(fcts).filter(entry => entry[1].cmds.includes(args[0]))[0]
    return {
      args,
      ...(matchFct && { fct: matchFct[1], fctName: matchFct[0] })
    }
  }
}

function finishJob (...msgs) {
  const fileTransport = clog.transports.find(transport => transport.name === 'file')
  for (const msg of msgs) {
    clog[msg.level](msg.content)
  }
  clog.end()
  if (fileTransport) {
    fileTransport._dest.on('finish', () => {
      process.exit()
    })
    setTimeout(() => {}, 100000) // pause process until process.exit() is called
  }
}
