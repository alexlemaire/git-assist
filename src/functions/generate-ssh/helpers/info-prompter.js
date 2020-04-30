module.exports = async () => {
  const inquirer = require('inquirer')
  return await inquirer.prompt(getQuestions())
}

function getQuestions() {
  return [
    {
      type: 'input',
      name: 'email',
      message: 'GitHub email:'
    },
    {
      type: 'input',
      name: 'path',
      message: 'Enter file in which to save the key:',
      default: getDefaultPath(),
      filter: processPath
    },
    {
      type: 'password',
      name: 'pwd',
      message: 'Enter a password:',
      validate: validateLength
    },
    {
      type: 'password',
      name: 'confpwd',
      message: 'Enter password again:',
      validate: validatePwd
    }
  ]
}

function getDefaultPath() {
  const path = require('path')
  return path.join(process.env.HOME, '.ssh', 'id_rsa')
}

function processPath(input) {
  return input.replace('~', process.env.HOME)
}

function validatePwd(input, answer) {
  if (input !== answer.pwd) {
    throw new Error('passwords must match!')
  }
  return true
}

function validateLength(input, answer) {
  // SSH requires passwords to contain at least 5 characters
  if (input.length < 5) {
    throw new Error('password must contain at least 5 characters!')
  }
  return true
}
