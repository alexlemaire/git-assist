module.exports = async () => {
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'input',
      name: 'url',
      message: 'URL of the GitHub repository to clone:',
      validate: function (input, answer) {
        const regexSsh = new RegExp(/^git@github\.com:.*\.git/, 'g')
        const regexHttp = new RegExp(/^https:\/\/github\.com\/.*\.git/, 'g')
        if (!input.match(regexSsh) && !input.match(regexHttp)) {
          throw new Error(`Wrong GitHub URL. URL must follow the patterns ${regexSsh} for SSH URLs and ${regexHttp} for HTTP URLs.`)
        }
        return true
      }
    }
  ]
  return await inquirer.prompt(questions)
}
