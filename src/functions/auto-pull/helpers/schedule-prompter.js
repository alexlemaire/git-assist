module.exports = async () => {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'confirm',
      name: 'startup',
      message: 'Would you like to auto-pull automatically on machine startup?'
    }
  ]
  return await inquirer.prompt(questions)
}
