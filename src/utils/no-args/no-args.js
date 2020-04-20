module.exports = async (fcts, args) => {
  const inquirer = require('inquirer')
  const appRoot = require('app-root-path').path
  require(appRoot + '/src/welcome/welcome.js')
  const {action} = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'action',
      message: 'What would you like to do today?',
      choices: Object.entries(fcts).map(entry => entry[1].desc)
    }
  ])
  const fct = Object.values(fcts).filter(value => value.desc === action)[0]
  args.push(fct.cmds[0])
  if (fct.optsData.length > 0) {
    const {opt} = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'opt',
        message: 'Options are available for this function:',
        choices: [...fct.optsData.map(optData => `${optData.opts.join(', ')}: ${optData.desc}`), 'No option']
      }
    ])
    if (opt !== 'No option') {
      args.push(opt.split(':')[0].split(', ')[0])
    }
  }
  return args
}
