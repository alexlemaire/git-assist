const clog = require('../loggers/console-log.js')
const chalk = require('chalk')
const pwdManager = require('./pwd-manager.js')

module.exports = async () => {
  const username = await pwdManager.getUsername()
  clog.info(`Pulled username ${chalk.green.italic(username)} from local configuration file. If you would like to work under another identity, please update your local configuration file (with ${chalk.blue.italic('git-assist config')})`, {makeLink: false, format: false})
  let password = await pwdManager.getPwd(username)
  if (!password) {
    { password } = await pwdManager.promptPwd()
    await pwdManager.setPwd(username, password)
  }
  return { username, password }
}

async function getUsername() {
  const git = require('isomorphic-git')
  return await git.getConfig({
    fs: require('fs'),
    dir: '.',
    path: 'user.email'
  })
}
