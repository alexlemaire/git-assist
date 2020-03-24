const chalk = require('chalk')

module.exports = (args) => {
  const fs = require('fs')
  const clog = require('../../utils/loggers/console-log.js')
  let fcts = require('../../functions.json')
  delete fcts['--help']
  require('../../scripts/welcome/welcome.js')
  clog.info(`To call any of the functions listed below, you can run ${chalk.cyan.italic('git-assist <function_name> <accepted_arguments>')}`, {
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
  console.log(`  ${chalk.cyan.underline('Command')}: ${chalk.italic(`git-assist ${entry[0]}`)}`)
  for (const arg of entry[1].args) {
    console.log(entry[1].args.indexOf(arg) === 0 ? `  ${chalk.green.underline('Accepted arguments')}:` : '')
    console.log(`    ${chalk.magenta.bold(`• "${arg.arg}"`)}: ${chalk.italic(arg.desc)}`)
  }
  console.log('\n')
}
