const questions = [
  {
    type: 'input',
    name: 'fname',
    message: 'First name:'
  },
  {
    type: 'input',
    name: 'lname',
    message: 'Last name:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'GitHub email:'
  },
  {
    type: 'password',
    name: 'pwd',
    message: 'Enter a password:'
  },
  {
    type: 'password',
    name: 'confpwd',
    message: 'Enter password again:',
    validate: function (input, answer) {
      if (input !== answer.pwd) {
        throw new Error('\nError: passwords must match!\n')
      }
      return true
    }
  }
]

module.exports = async () => {
  const inquirer = require('inquirer')
  const answer = await inquirer.prompt(questions)
  return {
    name: `${answer.fname} ${answer.lname}`,
    email: answer.email,
    pwd: answer.pwd
  }
}
