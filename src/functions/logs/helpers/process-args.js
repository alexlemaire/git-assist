module.exports = async (args, callback, multi = true) => {
  if (args.length === 0) {
    args = await prompt(multi)
  }
  for (const arg of args) {
    process(arg, callback)
  }
}

function process(arg, callback) {
  const fs = require('fs')
  const path = require('path')
  const chalk = require('chalk')
  const file = `${arg}.log`
  const filePath = path.join(appRoot, 'logs', file)
  clog.info(`Looking for log file called ${chalk.italic.cyan(file)}...`)
  if (fs.existsSync(filePath)) {
    clog.success(`${chalk.italic.cyan(file)} log file found!`)
    callback(file, filePath)
  } else {
    clog.error(`${chalk.italic.cyan(file)} log file does not exist!`)
    console.log('\n')
  }
}

async function prompt(multi) {
  const inquirer = require('inquirer')
  const fs = require('fs')
  const path = require('path')
  const answer = await inquirer.prompt([
    {
      type: multi ? 'checkbox' : 'rawlist',
      name: 'fileNames',
      message: 'Select log files:',
      choices: fs.readdirSync(path.join(appRoot, 'logs'), {withFileTypes: true}).filter(file => file.isFile()).map(file => file.name.replace('.log', ''))
    }
  ])
  return multi ? answer.fileNames : [answer.fileNames]
}
