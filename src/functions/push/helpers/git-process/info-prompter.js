module.exports = () => {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'confirm',
      name: 'addAll',
      message: 'Do you want to include all changes you made?'
    },
    {
      type: 'input',
      name: 'params',
      message: 'Parameters for "git add" command:',
      when: function (answer) {
        return !answer.addAll
      },
      filter: function (input) {
        return input.split(' ')
      }
    },
    {
      type: 'input',
      name: 'message',
      message: 'Commit message:'
    }
  ]
  return inquirer.prompt(questions)
}
