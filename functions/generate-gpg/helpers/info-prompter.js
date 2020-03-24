module.exports = async () => {
  const inquirer = require('inquirer')
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
    }
  ]
  const answer = await inquirer.prompt(questions)
  await inquirer.prompt([
    {
      type: 'password',
      name: 'pwd',
      message: 'Enter password again:',
      validate: function (input) {
        if (input !== answer.pwd) {
          throw new Error('\nError: passwords must match!\n')
        }
        return true
      }
    }
  ])
  return {
    name: `${answer.fname} ${answer.lname}`,
    email: answer.email,
    pwd: answer.pwd
  }
}
