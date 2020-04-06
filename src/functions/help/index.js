const chalk = require('chalk')

module.exports = (args) => {
  const fs = require('fs')
  const clog = require('../../utils/loggers/console-log.js')
  let fcts = require('../../../functions.json')
  delete fcts['help']
  require('../../utils/welcome/welcome.js')
  clog.info(`To call any of the functions listed below, you can run ${chalk.cyan.italic('git-assist <function_name> [accepted_options]')}`, {
    makeLink: false,
    format: false
  })
  console.log('\n')
  if (args.length === 0) {
    for (const entry of Object.entries(fcts)) {
      logInfo(entry)
    }
  } else {
    logInfo([args[0], fcts[args[0]]])
  }
}

function logInfo(entry) {
  console.log(`${chalk.yellow('➢')} ${chalk.yellow.underline('Function')}: ${entry[0]}`)
  console.log(`  ${chalk.blue.underline('Description')}: ${entry[1].desc}`)
  console.log(`  ${chalk.cyan.underline('Command')}: ${chalk.italic(`git-assist ${entry[0]} ${entry[1].optsData.length > 0 ? `${entry[1].optsData.map(optData => `[${optData.opts.join(', ')}]`).join(' ')}` : ''}`)}`)
  for (const optData of entry[1].optsData) {
    if (entry[1].optsData.indexOf(optData) === 0) {
      console.log(`  ${chalk.green.underline('Accepted options')}:`)
    }
    console.log(`    ${chalk.magenta.bold(`• "${optData.opts.join(', ')}"`)}: ${chalk.italic(optData.desc)}`)
  }
  console.log('\n')
}
