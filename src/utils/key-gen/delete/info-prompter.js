const msgs = {
  ssh: 'Warning: if you delete a key via this utility, the associated users will not be able to authenticate via SSH until a new key has been generated for them.',
  gpg: 'Warning: if you delete a key via this utility, the associated users will not be able to sign commits via GPG until a new key has been generated for them.'
}

module.exports = async (type, keys) => {
  const path = require('path')
  clog.info(msgs[type])
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'checkbox',
      name: 'chosenKeys',
      message: `Select all the ${type.toUpperCase()} keys you would like to delete:`,
      choices: keys.map(key => `${key.ref} (user: ${key.user})`),
      filter: input => {
        return input.map(choice => choice.split(' ')[0])
      }
    }
  ]
  return await inquirer.prompt(questions)
}
