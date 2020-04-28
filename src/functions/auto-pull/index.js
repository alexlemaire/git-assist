module.exports = async (args) => {
  const Conf = require('conf')
  const chalk = require('chalk')
  const config = new Conf({
    configName: 'auto-pull',
    fileExtension: 'conf'
  })
  if (['-c', '--config'].includes(args[0])) {
    clog.info(`Configurating ${chalk.italic.blue('auto-pull')}...`)
    config.set(await require('./helpers/conf-prompter.js')(args.splice(1), config))
    clog.success(`${chalk.italic.blue('auto-pull')} successfully configured!`)
    await require('./helpers/schedule-process.js')(await require('./helpers/schedule-prompter.js')(config))
  } else {
    const path = config.get('path')
    if (!path) {
      throw new Error('No path defined in your auto-pull configuration. Please run git-assist auto-pull [-c, --config] in order to configurate your auto-pull utility.')
    }
    await require('./helpers/auto-pull.js')(path, config.get('excludedDirs'))
  }
}
