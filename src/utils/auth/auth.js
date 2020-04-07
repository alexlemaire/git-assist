const clog = require('../loggers/console-log.js')
const chalk = require('chalk')
const pwdManager = require('./pwd-manager.js')

module.exports = async () => {
  const username = await getUsername()
  let password = await pwdManager.getPwd(username)
  if (!password) {
     password = (await pwdManager.promptPwd()).password
    await pwdManager.setPwd(username, password)
  }
  return { username, password }
}

async function getUsername() {
  const fs = require('fs')
  if (fs.existsSync('.git/config')) {
    const git = require('isomorphic-git')
    require('../config/sync-config.js')()
    clog.info(`Pulling username from local configuration file. If you would like to work under another identity, please update it with ${chalk.blue.italic('git-assist config')}`, {makeLink: false, format: false})
    return await git.getConfig({
      fs,
      dir: '.',
      path: 'user.email'
    })
  }
  const inquirer = require('inquirer')
  const { username } =  await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'GitHub username:'
    }
  ])
  return username
}
