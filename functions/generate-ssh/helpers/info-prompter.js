module.exports = async () => {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'input',
      name: 'email',
      message: 'GitHub email:'
    },
    {
      type: 'input',
      name: 'path',
      message: 'Enter file in which to save the key:',
      default: `${process.env.HOME}/.ssh/test_id_rsa`
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
  return answer
}
