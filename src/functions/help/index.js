const chalk = require('chalk')

module.exports = (args) => {
  let fcts = require(appRoot + '/functions.json')
  delete fcts['help']
  require(appRoot + '/src/utils/welcome/welcome.js')
  if (args.length === 0) {
    globalHelp(Object.entries(fcts))
    clog.info(`To get help for a specific function, please use ${chalk.italic.cyan('git-assist [-h, --help] <function_name>')}\n`)
  } else {
    help([args[0], fcts[args[0]]])
  }
}

function globalHelp (entries) {
  clog.info('Printing help for all available functions...\n')
  for (const entry of entries) {
    logInfo(entry)
  }
}

function help (entry) {
  clog.info(`Printing help for ${chalk.green.italic(entry[0])} function...\n`)
  logInfo(entry)
}

function logInfo(entry) {
  console.log(`${chalk.yellow('➢')} ${chalk.yellow.underline('Function')}: ${entry[0]}`)
  console.log(`  ${chalk.blue.underline('Description')}: ${entry[1].desc}`)
  console.log(`  ${chalk.cyan.underline('Command')}: ${chalk.italic.magenta(`git-assist ${entry[1].cmds.length === 1 ? entry[1].cmds[0] : `<${entry[1].cmds.join(', ')}>`} ${entry[1].optsData.map(optData => `[${optData.opts.join(', ')}]`).join(' ')}`.trim())}`)
  for (const optData of entry[1].optsData) {
    if (entry[1].optsData.indexOf(optData) === 0) {
      console.log(`  ${chalk.green.underline('Accepted options')}:`)
    }
    console.log(`    ${chalk.magenta.bold.italic(`• ${optData.opts.join(', ')}`)}: ${optData.desc}`)
  }
  console.log('\n')
}
