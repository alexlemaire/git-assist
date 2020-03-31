module.exports = async () => {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'list',
      name: 'protocol',
      message: 'Which protocol do you want to use?',
      choices: ['ssh', 'https'],
      default: 'ssh'
    },
    {
      type: 'input',
      name: 'url',
      message: 'URL of the GitHub repository to clone:',
      validate: function (input, answer) {
        const regex = answer.protocol === 'ssh' ? new RegExp(/^git@github\.com:.*\.git/, 'g') : new RegExp(/^https:\/\/github\.com\/.*\.git/, 'g')
        if (!input.match(regex)) {
          throw new Error(`Wrong GitHub URL. URL must follow the pattern ${regex} for ${answer.protocol} protocol`)
        }
        return true
      }
    }
  ]
  return await inquirer.prompt(questions)
}
