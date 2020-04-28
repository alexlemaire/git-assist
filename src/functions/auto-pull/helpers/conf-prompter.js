const inquirer = require('inquirer')
const fs = require('fs')
const pathMod = require('path')
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))

module.exports = async (args, config) => {
  const { confirm } = await promptConfirm(config)
  if (!confirm) {
    clog.info('Aborting process...')
    process.exit()
  }
  const path = await getPath(process.cwd(), args[0] === '--list-hidden')
  const { excludedDirs } = await getExcludedDirs(path)
  return {
    path,
    excludedDirs
  }
}

async function promptConfirm(config) {
  if (config.has('path')) {
    const inquirer = require('inquirer')
    return await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'A configuration for auto-pull already exists. Would you like to update it?'
      }
    ])
  }
  return { confirm: false }
}

async function getPath(root, listHidden) {
  clog.info(`Currently in ${root}`)
  let { path } = await promptPath(root, listHidden)
  while (path === '..') {
    clog.info('Scanning parent folder...')
    if (fs.existsSync(pathMod.join(root, '..'))) {
      root = pathMod.join(root, '..')
    }
    clog.info(`Currently in ${root}`)
    path = (await promptPath(root, listHidden)).path
  }
  return path
}

async function promptPath(root, listHidden) {
  return await inquirer.prompt([{
    type: 'fuzzypath',
    name: 'path',
    excludePath: nodePath =>
    {
      let test = nodePath.includes('node_modules') || fs.existsSync(pathMod.join(nodePath, '.git'))
      if (!listHidden) {
        test = test || pathMod.basename(nodePath).startsWith('.')
      }
      return test
    },
    itemType: 'directory',
    rootPath: root,
    default: '..',
    message: 'Path to the directory where you would like to setup auto-pulling:',
    suggestOnly: false,
    depthLimit: 3
  }])
}

async function getExcludedDirs(path) {
  return await inquirer.prompt([{
    type: 'checkbox',
    name: 'excludedDirs',
    message: 'Select repositories you would like not to enable auto-pulling for:',
    choices: require(appRoot + '/src/utils/fs/list-repo.js')(path)
  }])
}
