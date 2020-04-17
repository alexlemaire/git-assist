const pwdManager = require('./pwd-manager.js')

module.exports = {
  onAuth: async (url, auth) => {
    const username = await getUsername()
    let password = await pwdManager.getPwd(username)
    if (!password) {
      password = await askPwd(username)
    }
    return { username, password }
  },
  onAuthFailure: async (url, auth) => {
    const clog = require('../loggers/console-log.js')
    clog.error('Wrong password, please provide an up-to-date password.')
    return {
      username: auth.username,
      password: await askPwd(auth.username)
    }
  }
}

async function getUsername() {
  const fs = require('fs')
  if (fs.existsSync('.git/config')) {
    const git = require('isomorphic-git')
    return await git.getConfig({
      fs,
      dir: '.',
      path: 'user.email'
    })
  }
  const inquirer = require('inquirer')
  return (await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'GitHub username:'
    }
  ])).username
}

async function askPwd(username) {
  const { password } = await pwdManager.promptPwd()
  await pwdManager.setPwd(username, password)
  return password
}
