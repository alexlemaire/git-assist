module.exports = async () => {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'confirm',
      name: 'scheduled',
      message: 'Would you like to schedule auto-pull for automatic runs?'
    },
    {
      type: 'rawlist',
      name: 'type',
      message: 'How would you like to schedule auto-pull?',
      choices: ['startup', 'cron']
    },
    {
      type: 'input',
      name: 'cron',
      message: 'Please enter a cron pattern to schedule your auto-pull runs:',
      default: '0 0 * * 1',
      when: function (answer) {
        return answer.type === 'cron'
      }
    }
  ]
  return await inquirer.prompt(questions)
}
