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
    clog.error('Wrong password, please provide an up-to-date password.')
    return {
      username: auth.username,
      password: await askPwd(auth.username)
    }
  },
  sshAuth: async () => {
    const username = await getUsername()
    const Conf = require('conf')
    const userConfig = new Conf({
      configName: 'users',
      fileExtension: 'conf',
      accessPropertiesByDotNotation: false
    })
    const userData = userConfig.get(username) || {}
    const key = userData.ssh
    if (!key) {
      const chalk = require('chalk')
      clog.info(`No SSH key was found for ${chalk.italic.green(username)}: not proceeding to authenticate via ${chalk.italic.cyan('git-assist')}. Relying on SSH keys already added to the SSH agent instead.`)
      clog.info(`If this fails/you are unsure and want to authenticate to GitHub via SSH, you can run ${chalk.italic.cyan('git-assist generate-ssh')} in order to generate an SSH key that will work with ${chalk.italic.cyan('git-assist')}`)
      return
    }
    try {
      const execSync = require('child_process').execSync
      // fool ssh-add so that we add the SSH key with its password without user prompt
      execSync(`SSH_PASS=${await pwdManager.getPwd(key)} DISPLAY=1 SSH_ASKPASS=${appRoot}/src/utils/auth/echo-pass.sh ssh-add ${key} < /dev/null`)
    } catch (err) {
      throw err
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
