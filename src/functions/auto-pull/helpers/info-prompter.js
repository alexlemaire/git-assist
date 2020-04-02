module.exports = async () => {
  const inquirer = require('inquirer')
  const clog = require('../../../utils/loggers/console-log.js')
  clog.info('This utility is not finalized. Just a place to test stuff out!')
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Name:'
    },
    {
      type: 'input',
      name: 'age',
      message: 'Age:'
    }
  ]
  return await inquirer.prompt(questions)
}
