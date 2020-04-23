module.exports = async (args, callback) => {
  if (args.length === 0) {
    args = (await prompt()).fileNames
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

async function prompt() {
  const inquirer = require('inquirer')
  const fs = require('fs')
  const path = require('path')
  return await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'fileNames',
      message: 'Select log files to print:',
      choices: fs.readdirSync(path.join(appRoot, 'logs'), {withFileTypes: true}).filter(file => file.isFile()).map(file => file.name.replace('.log', ''))
    }
  ])
}
