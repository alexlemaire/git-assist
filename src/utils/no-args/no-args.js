module.exports = async (fcts, args) => {
  const inquirer = require('inquirer')
  require(appRoot + '/src/utils/welcome/welcome.js')
  const { action } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'action',
      message: 'What would you like to do today?',
      choices: Object.entries(fcts).map(entry => entry[1].desc)
    }
  ])
  const matchFct = Object.entries(fcts).filter(entry => entry[1].desc === action)[0]
  const fctName = matchFct[0]
  const fct = matchFct[1]
  args.push(fct.cmds[0])
  if (fct.optsData.length > 0) {
    const { opt } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'opt',
        message: 'Options are available for this function:',
        choices: fct.optsData.map(optData => `${optData.opts.join(', ')}: ${optData.desc}`)
      }
    ])
    args = [...args, ...opt.map(choice => choice.split(':')[0].split(', ')[0])]
  }
  return {
    args,
    fct,
    fctName
  }
}
