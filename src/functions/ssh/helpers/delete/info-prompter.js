module.exports = async (keys) => {
  const path = require('path')
  clog.info('Warning: if you delete a key via this utility, the associated users will not be able to authenticate via SSH until a new key has been generated for them.')
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'checkbox',
      name: 'chosenKeys',
      message: 'Select all the keys you would like to delete:',
      choices: keys.map(key => `${key.ref} (users: ${key.users.join(', ')})`),
      filter: input => {
        return input.map(choice => choice.split(' ')[0])
      }
    }
  ]
  return await inquirer.prompt(questions)
}
