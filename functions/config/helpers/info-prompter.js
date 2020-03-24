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
    }
  ]
  const answer = await inquirer.prompt(questions)
  return {
    name: `${answer.fname} ${answer.lname}`,
    email: answer.email
  }
}
