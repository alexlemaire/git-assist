const inquirer = require('inquirer')

module.exports = async () => {
  const questions = [
    {
      type: 'confirm',
      name: 'mfa',
      message: 'Did you enable two-factor authentication for your GitHub account?'
    },
    {
      type: 'confirm',
      name: 'token',
      message: 'Did you already generate a valid access token for your GitHub account?',
      when: function (answer) {
        return answer.mfa
      }
    }
  ]
  const {token, mfa} = await inquirer.prompt(questions)
  if (mfa && !token) {
    await tokenInstructions()
  }
}

async function tokenInstructions() {
  const clog = require('../loggers/console-log.js')
  clog.info('In order to be able to push with two-factor authentication, you should generate an authentication token for your account.')
  clog.info('Please head to https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line to know how.')
  clog.info('When choosing options for your token, you can go with "repo" (all), "admin:repo_hook" (all) and "delete_repo".')
  let confirm = false
  while (!confirm) {
    confirm = (await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Did you generate a token for your GitHub account?'
    })).confirm
    if (!confirm) {
      clog.error('Please follow the instructions to generate a token for your GitHub account!')
    }
  }
  clog.success('Thanks! Now you should use this token in place of your password for GitHub.')
}
