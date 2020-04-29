const inquirer = require('inquirer')
const fs = require('fs')
const pathMod = require('path')
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))

module.exports = async (args, config) => {
  const path = await getPath(process.cwd(), args[0] === '--list-hidden')
  const repos = require(appRoot + '/src/utils/fs/list-repo.js')(path)
  const { excludedRepos } = await getExcludedRepos(repos)
  const nonExcludedRepos = repos.filter(repo => !excludedRepos.includes(repo))
  const { excludedBranches } = await getExcludedBranches(nonExcludedRepos, path)
  return {
    path,
    excludedRepos,
    excludedBranches
  }
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

async function getExcludedRepos(repos) {
  return await inquirer.prompt([{
    type: 'checkbox',
    name: 'excludedRepos',
    message: 'Select repositories you would like not to enable auto-pulling for:',
    choices: repos
  }])
}

async function getExcludedBranches(repos, path) {
  const git = require('isomorphic-git')
  const reposData = await Promise.all(repos.map(async (repo) => {
    return {
      repo: pathMod.basename(repo),
      branches: await git.listBranches({ fs, dir: pathMod.join(path, repo) })
    }
  }))
  return await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'excludedBranches',
      message: 'Select branches you would like not to enable auto-pulling for:',
      choices: reposData.map(data => [new inquirer.Separator(` --- ${data.repo} branches --- `), ...data.branches.map(branch => `${data.repo}: ${branch}`)]).flat(1),
      filter: function(input) {
        let filteredInput = {}
        const entries = input.map(choice => choice.split(': '))
        entries.forEach(entry => filteredInput[entry[0]] = filteredInput[entry[0]] ? [...filteredInput[entry[0]], entry[1]] : [entry[1]])
        return filteredInput
      }
    }
  ])
}
