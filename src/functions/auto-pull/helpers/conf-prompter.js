module.exports = async () => {
  const inquirer = require('inquirer')
  // inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
  // const questions = [
  //   {
  //     type: 'fuzzypath',
  //     name: 'path',
  //     excludePath: nodePath => nodePath.startsWith('node_modules'),
  //     excludeFilter: nodePath => nodePath == '.',
  //     itemType: 'directory',
  //     rootPath: '/',
  //     message: 'Path to the directory where you would like to setup auto-pulling:',
  //     suggestOnly: false
  //   }
  // ]
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
