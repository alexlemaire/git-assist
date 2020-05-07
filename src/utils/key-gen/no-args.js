module.exports = () => {
  const inquirer = require('inquirer')
  return inquirer.prompt([
    {
      type: 'rawlist',
      name: 'opt',
      message: 'What would you like to do?',
      choices: ['Generate a key', 'List generated keys', 'Delete existing key'],
      filter: input => input.split(' ')[0].toLowerCase()
    }
  ])
}
