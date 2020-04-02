module.exports = async () => {
  const inquirer = require('inquirer')
  const git = require('isomorphic-git')
  const fs = require('fs')
  const dir = '.'
  const currentBranch = await git.currentBranch({ fs, dir })
  const questions = [
    {
      type: 'confirm',
      name: 'current',
      message: `Do you want to pull only from the current branch? (${currentBranch})`,
    },
    {
      type: 'confirm',
      name: 'all',
      message: 'Do you want to pull from all local branches?',
      when: function (answer) {
        return !answer.current
      }
    }
  ]
  const { current, all } = await inquirer.prompt(questions)
  if (current) {
    return [currentBranch]
  }
  const localBranches = await git.listBranches({ fs, dir })
  let branches = localBranches
  if (!all) {
    branches = (await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'branches',
        message: 'Select which branches to pull from:',
        choices: localBranches,
        pageSize: localBranches.length
      }
    ])).branches
  }
  return branches
}
