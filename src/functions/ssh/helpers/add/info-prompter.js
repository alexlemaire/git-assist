module.exports = async (keys) => {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'input',
      name: 'user',
      message: 'Which user would you like to add a key for? (existing users will be updated)'
    },
    {
      type: 'rawlist',
      name: 'key',
      message: 'Select the key you would like to add to this user:',
      choices: keys.map(keyData => keyData.key)
    }
  ]
  return await inquirer.prompt(questions)
}
