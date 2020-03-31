let mfa = false

module.exports = async (protocol, mfaValue) => {
  switch (protocol) {
    case 'https':
      const http = require('isomorphic-git/http/node')
      const git = require('isomorphic-git')
      const fs = require('fs')
      const dir = '.'
      mfa = mfaValue
      await git.push({
        fs,
        http,
        dir,
        remote: 'origin',
        ref: await git.currentBranch({
          fs,
          dir
        }),
        onAuth
      })
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

async function onAuth(url, auth) {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'input',
      name: 'username',
      message: 'GitHub username:'
    },
    {
      type: 'password',
      name: 'password',
      message: `GitHub ${mfa ? 'access token' : 'password'}:`
    }
  ]
  return await inquirer.prompt(questions)
}
