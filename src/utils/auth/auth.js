module.exports = async () => {
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
      message: 'GitHub password (access token if using MFA):'
    }
  ]
  return await inquirer.prompt(questions)
}
