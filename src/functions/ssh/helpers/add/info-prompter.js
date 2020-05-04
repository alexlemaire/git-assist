module.exports = async () => {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'input',
      name: 'user',
      message: 'Which user would you like to add a key for? (existing ones will be updated)'
    },
    {
      type: 'rawlist',
      name: 'key',
      message: 'Select the key you would like to add to this user:',
      choices: require(appRoot + '/src/utils/key-gen/get-keys.js')('ssh').map(keyData => keyData.key)
    }
  ]
  return await inquirer.prompt(questions)
}
