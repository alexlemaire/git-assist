module.exports = async (args) => {
  require('./helpers/check-logs.js')()
  if (['-c', '--config'].includes(args[0])) {
    const Conf = require('conf')
    const config = new Conf({
      configName: 'auto-pull',
      fileExtension: 'conf'
    })
    config.store = await require('./helpers/conf-prompter.js')()
  } else {
    const info = await require('./helpers/info-prompter.js')()
    console.log(info.name, info.age)
  }
}
