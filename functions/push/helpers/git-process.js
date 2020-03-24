const git = require('isomorphic-git')
const fs = require('fs')
const dir = '.'

module.exports = async (protocol) => {
  const answer = await infoPrompter()
  await stage(answer.addAll, answer.params)
  await commit(answer.message)
  await push(protocol)
}

async function infoPrompter() {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'confirm',
      name: 'addAll',
      message: 'Do you want to include all changes you made?'
    },
    {
      type: 'input',
      name: 'params',
      message: 'Parameters for "git add" command:',
      when: function (answer) {
        return !answer.addAll
      },
      filter: function (input) {
        return input.split(' ')
      }
    },
    {
      type: 'input',
      name: 'message',
      message: 'Commit message:'
    }
  ]
  return await inquirer.prompt(questions)
}

async function push(protocol) {
  switch (protocol) {
    case 'https':
      const http = require('isomorphic-git/http/node')
      await git.push({
        fs,
        http,
        dir,
        remote: 'origin',
        ref: await git.currentBranch({
          fs,
          dir
        })
      }).then(res => {console.log(res)})
      break
    case 'ssh':
      // isomorphic-git is not supporting ssh yet so we use the regular bash call to git to operate over ssh
      const spawnSync = require('child_process').spawnSync
      spawnSync('git' , ['push'])
      break
    default:
      break
  }
}

async function stage(addAll, params) {
  if (addAll){
    await stageAll()
  } else {
    // TODO: rewrite this to work with isomorphic-git. There needs to be a way
    const spawnSync = require('child_process').spawnSync
    spawnSync('git', ['add', ...params])
  }
}

async function commit(message) {
  await git.commit({
    fs,
    dir,
    message
  }).then(res => {console.log(res)})
}

async function stageAll() {
  const repo = {fs, dir}
  await git.statusMatrix(repo).then((status) =>
    Promise.all(
      status.map(([filepath, , worktreeStatus]) =>
        worktreeStatus ? git.add({ ...repo, filepath }) : git.remove({ ...repo, filepath })
      )
    )
  )
}
