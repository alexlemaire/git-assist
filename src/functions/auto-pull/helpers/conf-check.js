const chalk = require('chalk')

module.exports = (config) => {
  const path = config.get('path')
  if (path) {
    const inquirer = require('inquirer')
    printConfig(path, config.get('excludedRepos'), config.get('excludedBranches'))
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'A configuration for auto-pull already exists (see above). Would you like to update it?'
      }
    ])
  }
  return { confirm: false }
}

function format (msg) {
  return chalk.magenta(msg)
}

function subFormat (msg) {
  return chalk.blue(msg)
}

function printConfig (path, excludedRepos, excludedBranches) {
  const autoPullPrint = chalk.italic.cyan('auto-pull')
  clog.info(`Printing existing ${autoPullPrint} configuration...`)
  console.log(format('\n---------\n'))
  console.log(format(`${autoPullPrint} is currently pulling from: ${subFormat(path)}`))
  if (excludedRepos.length > 0) {
    console.log(format(`\nThe following repositories are not being processed by ${autoPullPrint}:\n${getReposMsg(excludedRepos, path)}`))
  }
  const excludedBranchesEntries = Object.entries(excludedBranches)
  if (excludedBranchesEntries.length > 0) {
    console.log(format(`\nThe following branches are not being processed by ${autoPullPrint}:\n${getBranchesMsg(excludedBranchesEntries)}`))
  }
  console.log(format('\n---------\n'))
}

function getReposMsg (excludedRepos, path) {
  const indent = '    '
  return excludedRepos.map(dir => subFormat(`${indent}- ${path}/${dir}`)).join('\n')
}

function getBranchesMsg (excludedBranchesEntries) {
  const indent = '    '
  const printHeader = repo => `${indent}${indent}*** ${repo} ***`
  const printBranchesList = branches => branches.map(branch => `${indent}- ${branch}`).join('\n')
  return excludedBranchesEntries.map(entry => subFormat(`${printHeader(entry[0])}\n\n${printBranchesList(entry[1])}`)).join('\n')
}
