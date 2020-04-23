const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = async (args) => {
  if (args.length === 0) {
    args = (await prompt()).fileNames
  }
  for (const arg of args) {
    printLog(arg)
  }
}

function printLog(name) {
  const file = `${name}.log`
  const filePath = path.join(appRoot, 'logs', file)
  clog.info(`Looking for log file called ${chalk.italic.cyan(file)}...`)
  if (fs.existsSync(filePath)) {
    clog.success(`${chalk.italic.cyan(file)} log file found! Printing...`)
    console.log('\n')
    const content = fs.readFileSync(filePath, 'utf-8')
    console.log(content)
  } else {
    clog.error(`${chalk.italic.cyan(file)} log file does not exist!`)
    console.log('\n')
  }
}

async function prompt() {
  const inquirer = require('inquirer')
  return await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'fileNames',
      message: 'Select log files to print:',
      choices: fs.readdirSync(path.join(appRoot, 'logs'), {withFileTypes: true}).filter(file => file.isFile()).map(file => file.name.replace('.log', ''))
    }
  ])
}
