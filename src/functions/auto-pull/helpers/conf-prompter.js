const inquirer = require('inquirer')
const fs = require('fs')
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))

module.exports = async () => {
  const { path } = await getPath()

  return {path}
}

async function getPath() {
  return await inquirer.prompt([{
    type: 'fuzzypath',
    name: 'path',
    excludePath: nodePath => nodePath.includes('node_modules') || fs.existsSync(`${nodePath}/.git`),
    itemType: 'directory',
    rootPath: process.cwd(),
    message: 'Path to the directory where you would like to setup auto-pulling:',
    suggestOnly: false,
    depthLimit: 5
  }])
}

async function getExcludedDirs (path) {
  // this should retrieve dirs to exclude via a checkbox prompt
  // will need an helper function to list all repos at every level beyond the path specified by user
}
